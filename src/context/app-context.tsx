'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Product, User } from '@/lib/types';
import { products as initialProducts } from '@/lib/data';

type Cart = {
  [productId: string]: number;
};

type AppContextType = {
  user: User | null;
  products: Product[];
  cart: Cart;
  login: (email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  signup: (displayName: string, email: string, password: string) => { success: boolean; error?: string };
  addProduct: (product: Product) => void;
  addToCart: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateUser: (updatedInfo: Partial<User>) => void;
  removeProduct: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

const getFromLocalStorage = <T>(key: string, defaultValue: T): T => {
  if (typeof window === 'undefined') {
    return defaultValue;
  }
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage key “${key}”:`, error);
    return defaultValue;
  }
};

const setToLocalStorage = <T>(key: string, value: T) => {
  if (typeof window === 'undefined') {
    console.warn(`Tried to set localStorage key “${key}” even though window is not defined.`);
    return;
  }
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing to localStorage key “${key}”:`, error);
  }
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [cart, setCart] = useState<Cart>({});
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setUsers(getFromLocalStorage('users', []));
    setUser(getFromLocalStorage('currentUser', null));

    const localProducts: Product[] = getFromLocalStorage('products', []);
    const allowedHosts = ['picsum.photos', 'placehold.co', 'images.unsplash.com'];

    const sanitizedLocalProducts = localProducts.filter(product => {
      if (!product.imageUrls || product.imageUrls.length === 0) {
        return true;
      }
      const imageUrl = product.imageUrls[0];
      
      if (imageUrl.startsWith('data:image/')) {
        return true;
      }
      try {
        const url = new URL(imageUrl);
        return allowedHosts.includes(url.hostname);
      } catch (e) {
        console.warn(`Filtering out product with invalid image URL: ${imageUrl}`);
        return false;
      }
    });

    setProducts([...initialProducts, ...sanitizedLocalProducts]);
  }, []);

  useEffect(() => {
    if (isMounted && user) {
      setCart(getFromLocalStorage(`cart_${user.id}`, {}));
    } else if (!user) {
      setCart({});
    }
  }, [user, isMounted]);

  useEffect(() => {
    if (isMounted) {
      setToLocalStorage('users', users);
    }
  }, [users, isMounted]);
  
  useEffect(() => {
    if (isMounted) {
      const localProducts = products.filter(p => !initialProducts.some(ip => ip.id === p.id));
      setToLocalStorage('products', localProducts);
    }
  }, [products, isMounted]);

  useEffect(() => {
    if (isMounted && user) {
      setToLocalStorage(`cart_${user.id}`, cart);
    }
  }, [cart, user, isMounted]);


  const signup = (displayName: string, email: string, password: string) => {
    if (users.find((u) => u.email === email)) {
      return { success: false, error: 'An account with this email already exists.' };
    }
    const newUser: User = { id: `user-${Date.now()}`, displayName, email, password, avatarUrl: '' };
    setUsers([...users, newUser]);
    setUser(newUser);
    setToLocalStorage('currentUser', newUser);
    return { success: true };
  };

  const login = (email: string, password: string) => {
    const foundUser = users.find((u) => u.email === email);
    if (!foundUser) {
      return { success: false, error: 'No account found with this email.' };
    }
    if (foundUser.password !== password) {
      return { success: false, error: 'Incorrect password.' };
    }
    setUser(foundUser);
    setToLocalStorage('currentUser', foundUser);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    setToLocalStorage('currentUser', null);
  };
  
  const updateUser = (updatedInfo: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...updatedInfo };
    setUser(updatedUser);
    setToLocalStorage('currentUser', updatedUser);
    
    setUsers(prevUsers => {
        const newUsers = prevUsers.map(u => u.id === user.id ? updatedUser : u);
        setToLocalStorage('users', newUsers);
        return newUsers;
    });
  };

  const addProduct = (product: Product) => {
    setProducts((prevProducts) => [...prevProducts, product]);
  };
  
  const removeProduct = (productId: string) => {
    setProducts(prevProducts => prevProducts.filter(p => p.id !== productId));
  };

  const addToCart = (productId: string, quantity: number) => {
    setCart((prevCart) => ({
      ...prevCart,
      [productId]: (prevCart[productId] || 0) + quantity,
    }));
  };
  
  const removeFromCart = (productId: string) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      delete newCart[productId];
      return newCart;
    });
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(prevCart => ({
        ...prevCart,
        [productId]: quantity,
      }));
    }
  };

  return (
    <AppContext.Provider value={{ user, products, cart, login, logout, signup, addProduct, addToCart, removeFromCart, updateUser, removeProduct, updateCartQuantity }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
