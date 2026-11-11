import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Store, 
  Product, 
  Order, 
  Transaction, 
  Review, 
  SHGMember, 
  SHGGroup, 
  UserRole, 
  Language, 
  CartItem, 
  ProductStatus,
  OrderItem
} from '../types';
import { 
  INITIAL_STORES, 
  INITIAL_PRODUCTS, 
  INITIAL_ORDERS, 
  INITIAL_TRANSACTIONS, 
  INITIAL_REVIEWS, 
  INITIAL_SHG_GROUP, 
  INITIAL_SHG_MEMBERS 
} from '../data/mockData';

interface AppContextType {
  stores: Store[];
  currentStoreId: string;
  currentStore: Store;
  setCurrentStoreId: (id: string) => void;
  products: Product[];
  currentStoreProducts: Product[];
  orders: Order[];
  transactions: Transaction[];
  reviews: Review[];
  currentStoreReviews: Review[];
  shgGroup: SHGGroup;
  shgMembers: SHGMember[];
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  userLanguage: Language;
  setUserLanguage: (lang: Language) => void;
  isAuthenticated: boolean;
  userPhone: string;
  login: (phone: string, role?: UserRole) => void;
  logout: () => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;

  // Product CRUD
  addProduct: (product: Omit<Product, 'id'>) => Product;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  updateProductStatus: (id: string, status: ProductStatus) => void;

  // Store Management
  createNewStore: (storeData: Partial<Store>, initialProducts: Array<Partial<Product>>) => string;
  updateStore: (id: string, updates: Partial<Store>) => void;

  // Transactions & Orders
  recordSale: (data: { amount: number; type: 'Cash' | 'UPI'; customerName: string; customerPhone?: string; note: string; items?: OrderItem[] }) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;

  // Reviews
  addReview: (review: Omit<Review, 'id' | 'date'>) => void;
  replyToReview: (reviewId: string, reply: string) => void;

  // SHG actions
  updateMemberContribution: (memberId: string, countAdded: number) => void;
  recordSHGPayout: (memberId: string) => void;

  // Reset to demo
  resetToDefaultData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  STORES: 'gharbazaar_stores_v1',
  CURRENT_STORE_ID: 'gharbazaar_current_store_id_v1',
  PRODUCTS: 'gharbazaar_products_v1',
  ORDERS: 'gharbazaar_orders_v1',
  TRANSACTIONS: 'gharbazaar_transactions_v1',
  REVIEWS: 'gharbazaar_reviews_v1',
  SHG_GROUP: 'gharbazaar_shg_group_v1',
  SHG_MEMBERS: 'gharbazaar_shg_members_v1',
  USER_ROLE: 'gharbazaar_user_role_v1',
  LANGUAGE: 'gharbazaar_language_v1',
  AUTH: 'gharbazaar_auth_v1',
  CART: 'gharbazaar_cart_v1'
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Stores
  const [stores, setStores] = useState<Store[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.STORES) || localStorage.getItem('zenx_stores_v1');
    return saved ? JSON.parse(saved) : INITIAL_STORES;
  });

  const [currentStoreId, setCurrentStoreIdState] = useState<string>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_STORE_ID) || localStorage.getItem('zenx_current_store_id_v1');
    return saved || 'maa-ki-rasoi';
  });

  // Products
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS) || localStorage.getItem('zenx_products_v1');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ORDERS) || localStorage.getItem('zenx_orders_v1');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  // Transactions
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS) || localStorage.getItem('zenx_transactions_v1');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  // Reviews
  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.REVIEWS) || localStorage.getItem('zenx_reviews_v1');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  // SHG
  const [shgGroup, setShgGroup] = useState<SHGGroup>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SHG_GROUP) || localStorage.getItem('zenx_shg_group_v1');
    return saved ? JSON.parse(saved) : INITIAL_SHG_GROUP;
  });

  const [shgMembers, setShgMembers] = useState<SHGMember[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SHG_MEMBERS) || localStorage.getItem('zenx_shg_members_v1');
    return saved ? JSON.parse(saved) : INITIAL_SHG_MEMBERS;
  });

  // User Role & Lang
  const [userRole, setUserRoleState] = useState<UserRole>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.USER_ROLE) || localStorage.getItem('zenx_user_role_v1');
    return (saved as UserRole) || 'vendor';
  });

  const [userLanguage, setUserLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LANGUAGE) || localStorage.getItem('zenx_language_v1');
    return (saved as Language) || 'hi';
  });

  // Auth
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.AUTH) || localStorage.getItem('zenx_auth_v1');
    return saved ? JSON.parse(saved).isAuthenticated : true; // default true for immediate investor demo ease
  });

  const [userPhone, setUserPhone] = useState<string>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.AUTH) || localStorage.getItem('zenx_auth_v1');
    return saved ? JSON.parse(saved).phone : '+91 98112 45890';
  });

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CART) || localStorage.getItem('zenx_cart_v1');
    return saved ? JSON.parse(saved) : [];
  });

  // Persistence effects
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.STORES, JSON.stringify(stores));
  }, [stores]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CURRENT_STORE_ID, currentStoreId);
  }, [currentStoreId]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SHG_GROUP, JSON.stringify(shgGroup));
  }, [shgGroup]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SHG_MEMBERS, JSON.stringify(shgMembers));
  }, [shgMembers]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USER_ROLE, userRole);
  }, [userRole]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, userLanguage);
  }, [userLanguage]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify({ isAuthenticated, phone: userPhone }));
  }, [isAuthenticated, userPhone]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  }, [cart]);

  // Derived
  const currentStore = stores.find(s => s.id === currentStoreId) || stores[0];
  const currentStoreProducts = products.filter(p => p.storeId === currentStoreId);
  const currentStoreReviews = reviews.filter(r => r.storeId === currentStoreId);

  const cartTotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Setters
  const setCurrentStoreId = (id: string) => {
    setCurrentStoreIdState(id);
  };

  const setUserRole = (role: UserRole) => {
    setUserRoleState(role);
  };

  const setUserLanguage = (lang: Language) => {
    setUserLanguageState(lang);
  };

  const login = (phone: string, role: UserRole = 'vendor') => {
    setIsAuthenticated(true);
    setUserPhone(phone);
    setUserRoleState(role);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  // Cart operations
  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Product CRUD
  const addProduct = (productData: Omit<Product, 'id'>): Product => {
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}`
    };
    setProducts(prev => [newProduct, ...prev]);
    return newProduct;
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    removeFromCart(id);
  };

  const updateProductStatus = (id: string, status: ProductStatus) => {
    updateProduct(id, { status });
  };

  // Store Management
  const createNewStore = (storeData: Partial<Store>, initialProducts: Array<Partial<Product>>): string => {
    const storeId = (storeData.name || 'my-store')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '') + `-${Date.now().toString().slice(-4)}`;

    const newStore: Store = {
      id: storeId,
      name: storeData.name || 'Mera Naya Brand',
      tagline: storeData.tagline || 'Taaza aur Shuddh',
      category: storeData.category || 'Home Kitchen',
      ownerName: storeData.ownerName || 'Vyapaari',
      phone: storeData.phone || userPhone || '+91 98000 00000',
      location: storeData.location || 'Local Market',
      city: storeData.city || 'India',
      logoUrl: storeData.logoUrl || 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=300&auto=format&fit=crop&q=80',
      bannerUrl: storeData.bannerUrl || 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=1200&auto=format&fit=crop&q=80',
      story: storeData.story || 'Hum taaza aur swadisht utpaad banate hain pure pyaar aur vishwas ke saath.',
      hygieneCertified: true,
      upiId: `${storeId.replace(/-/g, '')}@upi`,
      rating: 5.0,
      reviewCount: 1,
      establishedYear: new Date().getFullYear(),
      language: userLanguage,
    };

    const newCreatedProducts: Product[] = initialProducts.map((p, idx) => ({
      id: `prod-${storeId}-${idx + 1}`,
      storeId: storeId,
      name: p.name || `Special Item ${idx + 1}`,
      hindiName: p.hindiName,
      description: p.description || 'Special authentic item made fresh on order.',
      price: p.price || 99,
      unit: p.unit || 'piece',
      category: p.category || 'Specialties',
      imageUrl: p.imageUrl || 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&auto=format&fit=crop&q=80',
      status: 'available',
      stockQuantity: p.stockQuantity || 20,
      isVeg: p.isVeg !== undefined ? p.isVeg : true,
      costToProduce: p.costToProduce || 45,
      rating: 5.0,
      tags: ['New Launch', 'Fresh']
    }));

    setStores(prev => [newStore, ...prev]);
    setProducts(prev => [...newCreatedProducts, ...prev]);
    setCurrentStoreIdState(storeId);

    // Add a welcome review
    const welcomeReview: Review = {
      id: `rev-${Date.now()}`,
      storeId: storeId,
      customerName: 'First Loyal Customer',
      rating: 5,
      comment: 'Congratulations on taking your business digital! The food is so delicious and authentic.',
      date: 'Just now',
      verifiedOrder: true
    };
    setReviews(prev => [welcomeReview, ...prev]);

    return storeId;
  };

  const updateStore = (id: string, updates: Partial<Store>) => {
    setStores(prev => prev.map(s => (s.id === id ? { ...s, ...updates } : s)));
  };

  // Transactions & Orders
  const recordSale = (data: { 
    amount: number; 
    type: 'Cash' | 'UPI'; 
    customerName: string; 
    customerPhone?: string; 
    note: string; 
    items?: OrderItem[] 
  }) => {
    const newTxn: Transaction = {
      id: `TXN-${Math.floor(10000 + Math.random() * 90000)}`,
      storeId: currentStoreId,
      amount: data.amount,
      type: data.type,
      customerName: data.customerName || 'Walk-in Customer',
      customerPhone: data.customerPhone || '',
      note: data.note || 'Direct counter sale',
      timestamp: 'Just now'
    };

    setTransactions(prev => [newTxn, ...prev]);

    if (data.items && data.items.length > 0) {
      const newOrder: Order = {
        id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
        storeId: currentStoreId,
        customerName: data.customerName || 'Walk-in Customer',
        customerPhone: data.customerPhone || '',
        items: data.items,
        totalAmount: data.amount,
        paymentMethod: data.type,
        paymentStatus: 'Paid',
        status: 'Delivered',
        createdAt: 'Just now',
        deliveryType: 'Pickup'
      };
      setOrders(prev => [newOrder, ...prev]);
    }
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => (o.id === orderId ? { ...o, status } : o)));
  };

  // Reviews
  const addReview = (reviewData: Omit<Review, 'id' | 'date'>) => {
    const newRev: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: 'Today'
    };
    setReviews(prev => [newRev, ...prev]);
  };

  const replyToReview = (reviewId: string, reply: string) => {
    setReviews(prev => prev.map(r => (r.id === reviewId ? { ...r, vendorReply: reply } : r)));
  };

  // SHG actions
  const updateMemberContribution = (memberId: string, countAdded: number) => {
    setShgMembers(prev => prev.map(m => {
      if (m.id === memberId) {
        const newCount = m.itemsContributedCount + countAdded;
        const newEarnings = m.totalEarningsShare + countAdded * 250;
        return {
          ...m,
          itemsContributedCount: newCount,
          totalEarningsShare: newEarnings,
          lastContribution: 'Just now'
        };
      }
      return m;
    }));
  };

  const recordSHGPayout = (memberId: string) => {
    setShgMembers(prev => prev.map(m => {
      if (m.id === memberId) {
        return {
          ...m,
          payoutStatus: 'Paid'
        };
      }
      return m;
    }));
  };

  const resetToDefaultData = () => {
    setStores(INITIAL_STORES);
    setCurrentStoreIdState('maa-ki-rasoi');
    setProducts(INITIAL_PRODUCTS);
    setOrders(INITIAL_ORDERS);
    setTransactions(INITIAL_TRANSACTIONS);
    setReviews(INITIAL_REVIEWS);
    setShgGroup(INITIAL_SHG_GROUP);
    setShgMembers(INITIAL_SHG_MEMBERS);
    setCart([]);
    localStorage.clear();
  };

  return (
    <AppContext.Provider
      value={{
        stores,
        currentStoreId,
        currentStore,
        setCurrentStoreId,
        products,
        currentStoreProducts,
        orders,
        transactions,
        reviews,
        currentStoreReviews,
        shgGroup,
        shgMembers,
        userRole,
        setUserRole,
        userLanguage,
        setUserLanguage,
        isAuthenticated,
        userPhone,
        login,
        logout,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotal,
        cartCount,
        addProduct,
        updateProduct,
        deleteProduct,
        updateProductStatus,
        createNewStore,
        updateStore,
        recordSale,
        updateOrderStatus,
        addReview,
        replyToReview,
        updateMemberContribution,
        recordSHGPayout,
        resetToDefaultData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
