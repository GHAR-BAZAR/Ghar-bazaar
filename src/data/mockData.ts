import { Store, Product, Order, Transaction, Review, SHGMember, SHGGroup, LoanScheme } from '../types';

export const INITIAL_STORES: Store[] = [
  {
    id: 'maa-ki-rasoi',
    name: 'Maa Ki Rasoi',
    tagline: 'Ghar jaisa swaad, maa ke haathon se bana',
    category: 'Home Kitchen',
    ownerName: 'Anjali Sharma',
    phone: '+91 98112 45890',
    location: 'Indirapuram, Sector 4',
    city: 'Ghaziabad, NCR',
    logoUrl: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=300&auto=format&fit=crop&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=1200&auto=format&fit=crop&q=80',
    story: 'Started during the lockdown to serve clean, motherly home-cooked meals to working professionals and students away from home. Every meal is cooked fresh with cold-pressed oils, no preservatives, and pure love.',
    hygieneCertified: true,
    upiId: 'maakirasoi@okaxis',
    rating: 4.9,
    reviewCount: 142,
    establishedYear: 2021,
    isSHG: false,
    language: 'hi',
  },
  {
    id: 'sharma-ji-snacks',
    name: 'Sharma Ji Famous Snacks',
    tagline: 'Crispy samosa, kachori & hot masala chai since 1998',
    category: 'Street Food',
    ownerName: 'Ram Prasad Sharma',
    phone: '+91 98734 11223',
    location: 'Near Old Post Office, Chandni Chowk',
    city: 'Delhi',
    logoUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300&auto=format&fit=crop&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=1200&auto=format&fit=crop&q=80',
    story: 'Serving Old Delhi locals and food lovers for 26 years. Our special hing kachori and dry-fruit samosas are fried in fresh groundnut oil and served with sweet saunth and spicy coriander chutneys.',
    hygieneCertified: true,
    upiId: 'sharmajisnacks@icici',
    rating: 4.8,
    reviewCount: 389,
    establishedYear: 1998,
    isSHG: false,
    language: 'hi',
  },
  {
    id: 'ghar-ka-achaar',
    name: 'Sunita Didi Ke Desi Achaar',
    tagline: '100% Sun-dried, handmade authentic Bihari pickles',
    category: 'Pickles & Spices',
    ownerName: 'Sunita Devi',
    phone: '+91 94310 99881',
    location: 'Boring Road, Anandpuri',
    city: 'Patna, Bihar',
    logoUrl: 'https://images.unsplash.com/photo-1628294895950-9805252327bc?w=300&auto=format&fit=crop&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=1200&auto=format&fit=crop&q=80',
    story: 'Traditional grandmother recipes perfected over 3 decades. Made with pure mustard oil from local kolhus and sun-dried on our terrace under the bright Bihar sun. No chemical vinegar or artificial colors.',
    hygieneCertified: true,
    upiId: 'sunitadevi@ybl',
    rating: 4.9,
    reviewCount: 96,
    establishedYear: 2019,
    isSHG: false,
    language: 'hi',
  },
  {
    id: 'sakhi-crafts',
    name: 'Sakhi Mahila SHG Crafts',
    tagline: 'Empowering 18 rural women artisans through handloom & art',
    category: 'Handicrafts & Art',
    ownerName: 'Radha Bai (SHG President)',
    phone: '+91 97841 22334',
    location: 'Sanganer Block, Rural District',
    city: 'Jaipur, Rajasthan',
    logoUrl: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=300&auto=format&fit=crop&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=1200&auto=format&fit=crop&q=80',
    story: 'A government recognized Self-Help Group collective of 18 women artisans. We produce hand-block printed cotton tote bags, indigo cushion covers, terracotta home decor, and festive gift boxes.',
    hygieneCertified: true,
    upiId: 'sakhishgjaipur@sbi',
    rating: 4.7,
    reviewCount: 64,
    establishedYear: 2022,
    isSHG: true,
    shgGroupName: 'Mahila Kalyan Vikas Samiti',
    language: 'en',
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  // Maa Ki Rasoi (Home Kitchen)
  {
    id: 'p-mkr-1',
    storeId: 'maa-ki-rasoi',
    name: 'Special Dal Makhani & Jeera Rice Thali',
    hindiName: 'दाल मखनी और जीरा राइस थाली',
    description: 'Slow-cooked black lentils overnight in slow flame, pure butter, served with fragrant basmati jeera rice, salad & mint raita.',
    price: 180,
    unit: 'thali',
    category: 'Meal Combos',
    imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80',
    status: 'available',
    stockQuantity: 25,
    isVeg: true,
    costToProduce: 82,
    rating: 4.9,
    tags: ['Best Seller', 'Fresh Made', 'Pure Veg']
  },
  {
    id: 'p-mkr-2',
    storeId: 'maa-ki-rasoi',
    name: 'Ghar Ki Rajma Chawal Box',
    hindiName: 'घर का राजमा चावल',
    description: 'Authentic Jammu rajma cooked in tomato-onion-ginger gravy with aromatic whole spices. Served with steamed basmati rice and roasted papad.',
    price: 150,
    unit: 'box',
    category: 'Meal Combos',
    imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80',
    status: 'available',
    stockQuantity: 30,
    isVeg: true,
    costToProduce: 65,
    rating: 4.8,
    tags: ['Comfort Food', 'Pure Veg']
  },
  {
    id: 'p-mkr-3',
    storeId: 'maa-ki-rasoi',
    name: 'Paneer Butter Masala (500ml)',
    hindiName: 'पनीर बटर मसाला',
    description: 'Fresh malai paneer cubes in rich creamy cashew and ripe tomato gravy. Mildly spiced and buttery.',
    price: 220,
    unit: 'container',
    category: 'Curries',
    imageUrl: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&auto=format&fit=crop&q=80',
    status: 'available',
    stockQuantity: 15,
    isVeg: true,
    costToProduce: 110,
    rating: 4.9,
    tags: ['Rich Gravy', 'Party Special']
  },
  {
    id: 'p-mkr-4',
    storeId: 'maa-ki-rasoi',
    name: 'Tawa Phulka Rotis (Pack of 5)',
    hindiName: 'गरमा-गरम तवा फुल्का (5 पीस)',
    description: '100% whole wheat chakki atta rotis, puffed on open flame and brushed with desi ghee.',
    price: 60,
    unit: 'pack',
    category: 'Breads',
    imageUrl: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=600&auto=format&fit=crop&q=80',
    status: 'available',
    stockQuantity: 50,
    isVeg: true,
    costToProduce: 22,
    rating: 4.9,
    tags: ['Desi Ghee', 'Whole Wheat']
  },
  {
    id: 'p-mkr-5',
    storeId: 'maa-ki-rasoi',
    name: 'Gajar Ka Halwa (Desi Ghee)',
    hindiName: 'देसी घी का गाजर का हलवा',
    description: 'Winter red Delhi carrots cooked in khoya, whole milk, desi ghee, roasted almonds and cashews.',
    price: 140,
    unit: 'cup (200g)',
    category: 'Desserts',
    imageUrl: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=600&auto=format&fit=crop&q=80',
    status: 'tomorrow_only',
    stockQuantity: 0,
    isVeg: true,
    costToProduce: 68,
    rating: 5.0,
    tags: ['Seasonal Special', 'Sweet']
  },

  // Sharma Ji Snacks
  {
    id: 'p-sjs-1',
    storeId: 'sharma-ji-snacks',
    name: 'Dry-Fruit Khasta Samosa (2 Pcs)',
    hindiName: 'काजू-किशमिश खस्ता समोसा',
    description: 'Spiced potato filling with crushed cashews, raisins, roasted coriander seeds, served with sweet imli saunth and teekhi hari chutney.',
    price: 40,
    unit: 'plate',
    category: 'Hot Snacks',
    imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&auto=format&fit=crop&q=80',
    status: 'available',
    stockQuantity: 120,
    isVeg: true,
    costToProduce: 16,
    rating: 4.9,
    tags: ['Hot Seller', 'Old Delhi Famous']
  },
  {
    id: 'p-sjs-2',
    storeId: 'sharma-ji-snacks',
    name: 'Urad Dal Bedmi Puri & Aloo Subzi',
    hindiName: 'उरद दाल बेड़मी पूरी और रसेदार आलू',
    description: '4 crispy puffed bedmi puris stuffed with seasoned urad dal paste, served with spicy fenugreek-aloo sabzi and pickled green chillies.',
    price: 80,
    unit: 'plate',
    category: 'Breakfast Combos',
    imageUrl: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=600&auto=format&fit=crop&q=80',
    status: 'available',
    stockQuantity: 65,
    isVeg: true,
    costToProduce: 32,
    rating: 4.8,
    tags: ['Breakfast Favorite']
  },
  {
    id: 'p-sjs-3',
    storeId: 'sharma-ji-snacks',
    name: 'Kulhad Wali Masala Chai',
    hindiName: 'कुल्हड़ वाली मसाला चाय',
    description: 'Brewed with fresh ginger, crushed cardamom, cloves and thick full-cream milk in authentic clay cups.',
    price: 25,
    unit: 'kulhad',
    category: 'Beverages',
    imageUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&auto=format&fit=crop&q=80',
    status: 'available',
    stockQuantity: 200,
    isVeg: true,
    costToProduce: 9,
    rating: 4.9,
    tags: ['Kulhad', 'Signature']
  },

  // Ghar Ka Achaar
  {
    id: 'p-gka-1',
    storeId: 'ghar-ka-achaar',
    name: 'Mithila Aam Ka Achaar (500g Glass Jar)',
    hindiName: 'मिथिला का पारंपरिक आम का अचार',
    description: 'Raw green mangoes marinated in cold-pressed yellow mustard oil, fenugreek, ajwain and sun-baked for 21 days on terrace.',
    price: 280,
    unit: '500g jar',
    category: 'Traditional Pickles',
    imageUrl: 'https://images.unsplash.com/photo-1628294895950-9805252327bc?w=600&auto=format&fit=crop&q=80',
    status: 'available',
    stockQuantity: 40,
    isVeg: true,
    costToProduce: 115,
    rating: 5.0,
    tags: ['Sun-Dried', 'Zero Preservatives']
  },
  {
    id: 'p-gka-2',
    storeId: 'ghar-ka-achaar',
    name: 'Bharwa Lal Mirch Ka Achaar (400g)',
    hindiName: 'बनारसी भरवा लाल मिर्च अचार',
    description: 'Thick red chillies stuffed with ground amchur, fennel, mustard seeds and mustard oil. Piquant and fiery.',
    price: 320,
    unit: '400g jar',
    category: 'Traditional Pickles',
    imageUrl: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&auto=format&fit=crop&q=80',
    status: 'sold_out',
    stockQuantity: 0,
    isVeg: true,
    costToProduce: 135,
    rating: 4.9,
    tags: ['Spicy', 'Handmade']
  },

  // Sakhi SHG Crafts
  {
    id: 'p-shg-1',
    storeId: 'sakhi-crafts',
    name: 'Sanganeri Hand Block-Print Canvas Tote Bag',
    hindiName: 'हाथ की छपाई वाला कॉटन टोट बैग',
    description: 'Eco-friendly 100% thick cotton canvas bag handcrafted with natural vegetable dyes by artisan Meena & Kavita.',
    price: 350,
    unit: 'piece',
    category: 'Eco Bags',
    imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop&q=80',
    status: 'available',
    stockQuantity: 18,
    isVeg: true,
    costToProduce: 140,
    rating: 4.8,
    tags: ['Eco Friendly', 'Handcrafted', 'Women Made']
  },
  {
    id: 'p-shg-2',
    storeId: 'sakhi-crafts',
    name: 'Terracotta Hand-Painted Diya & Decor Set (Pack of 6)',
    hindiName: 'हाथ से रंगे मिट्टी के दीये (6 का सेट)',
    description: 'Locally dug clay hand-thrown on potter wheel and intricately painted with metallic gold and acrylic colors.',
    price: 240,
    unit: 'set',
    category: 'Home Decor',
    imageUrl: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=600&auto=format&fit=crop&q=80',
    status: 'available',
    stockQuantity: 35,
    isVeg: true,
    costToProduce: 75,
    rating: 4.7,
    tags: ['Artisan Pottery', 'Festive']
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-7821',
    storeId: 'maa-ki-rasoi',
    customerName: 'Priya Verma',
    customerPhone: '+91 98991 22345',
    items: [
      { productId: 'p-mkr-1', name: 'Special Dal Makhani & Jeera Rice Thali', quantity: 2, price: 180 },
      { productId: 'p-mkr-4', name: 'Tawa Phulka Rotis (Pack of 5)', quantity: 1, price: 60 }
    ],
    totalAmount: 420,
    paymentMethod: 'UPI',
    paymentStatus: 'Paid',
    status: 'Delivered',
    createdAt: 'Today, 1:15 PM',
    deliveryType: 'Home Delivery'
  },
  {
    id: 'ORD-7822',
    storeId: 'maa-ki-rasoi',
    customerName: 'Rohit Aggarwal',
    customerPhone: '+91 97118 66543',
    items: [
      { productId: 'p-mkr-2', name: 'Ghar Ki Rajma Chawal Box', quantity: 1, price: 150 },
      { productId: 'p-mkr-3', name: 'Paneer Butter Masala (500ml)', quantity: 1, price: 220 }
    ],
    totalAmount: 370,
    paymentMethod: 'Cash',
    paymentStatus: 'Paid',
    status: 'Preparing',
    createdAt: 'Today, 2:40 PM',
    deliveryType: 'Pickup'
  },
  {
    id: 'ORD-7823',
    storeId: 'maa-ki-rasoi',
    customerName: 'Suman Chawla',
    customerPhone: '+91 99102 33411',
    items: [
      { productId: 'p-mkr-1', name: 'Special Dal Makhani & Jeera Rice Thali', quantity: 1, price: 180 }
    ],
    totalAmount: 180,
    paymentMethod: 'UPI',
    paymentStatus: 'Paid',
    status: 'Received',
    createdAt: 'Today, 3:05 PM',
    deliveryType: 'Home Delivery'
  }
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'TXN-10901',
    storeId: 'maa-ki-rasoi',
    amount: 420,
    type: 'UPI',
    customerName: 'Priya Verma',
    customerPhone: '+91 98991 22345',
    note: 'Online order ORD-7821',
    timestamp: 'Today, 1:15 PM'
  },
  {
    id: 'TXN-10902',
    storeId: 'maa-ki-rasoi',
    amount: 370,
    type: 'Cash',
    customerName: 'Rohit Aggarwal',
    customerPhone: '+91 97118 66543',
    note: 'Counter pickup cash payment',
    timestamp: 'Today, 2:40 PM'
  },
  {
    id: 'TXN-10903',
    storeId: 'maa-ki-rasoi',
    amount: 180,
    type: 'UPI',
    customerName: 'Suman Chawla',
    customerPhone: '+91 99102 33411',
    note: 'UPI QR scan at kitchen counter',
    timestamp: 'Today, 3:05 PM'
  },
  {
    id: 'TXN-10899',
    storeId: 'maa-ki-rasoi',
    amount: 650,
    type: 'UPI',
    customerName: 'Kunal Malhotra',
    customerPhone: '+91 98110 54321',
    note: 'Office lunch bulk order',
    timestamp: 'Yesterday, 1:30 PM'
  },
  {
    id: 'TXN-10898',
    storeId: 'maa-ki-rasoi',
    amount: 300,
    type: 'Cash',
    customerName: 'Amit Saxena',
    customerPhone: '+91 98711 23456',
    note: 'Dinner rotis and subzi',
    timestamp: 'Yesterday, 8:45 PM'
  },
  {
    id: 'TXN-10897',
    storeId: 'maa-ki-rasoi',
    amount: 520,
    type: 'UPI',
    customerName: 'Neha Kapoor',
    customerPhone: '+91 96541 98765',
    note: 'Family Sunday thali meal',
    timestamp: '2 days ago'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    storeId: 'maa-ki-rasoi',
    customerName: 'Vikas Mehra',
    rating: 5,
    comment: 'The Dal Makhani reminds me exactly of my mother in Chandigarh. No heavy restaurant cream or excessive coloring, pure homemade taste. Reordering tomorrow!',
    date: '2 days ago',
    verifiedOrder: true,
    vendorReply: 'Thank you so much Vikas ji! Hum har subah taaza masale peeskar hi khana banate hain.'
  },
  {
    id: 'rev-2',
    storeId: 'maa-ki-rasoi',
    customerName: 'Shalini Gupta',
    rating: 5,
    comment: 'Phulkas were soft even after 45 minutes of delivery. Packaging was totally spill-proof and clean. Best home chef in Indirapuram!',
    date: '4 days ago',
    verifiedOrder: true
  },
  {
    id: 'rev-3',
    storeId: 'maa-ki-rasoi',
    customerName: 'Deepak Joshi',
    rating: 4,
    comment: 'Rajma was delicious and light on stomach. Please make Gajar Halwa available on weekdays too!',
    date: 'Last week',
    verifiedOrder: true,
    vendorReply: 'Ji Deepak ji, agle hafte se Gajar Halwa har din subah prepare hoga!'
  }
];

export const INITIAL_SHG_GROUP: SHGGroup = {
  id: 'shg-jaipur-1',
  name: 'Mahila Kalyan Vikas Samiti',
  leaderName: 'Radha Bai',
  villageOrCity: 'Sanganer, Jaipur',
  totalMembers: 18,
  activeOrders: 14,
  totalMonthlyRevenue: 78500,
  pooledFundBalance: 24600,
  bankLinkedAccount: 'SBI Sanganer Branch A/C **4419'
};

export const INITIAL_SHG_MEMBERS: SHGMember[] = [
  {
    id: 'shg-m-1',
    name: 'Radha Bai',
    role: 'Group President & Block Printing',
    phone: '+91 97841 22334',
    itemsContributedCount: 38,
    totalEarningsShare: 14800,
    payoutStatus: 'Paid',
    lastContribution: 'Yesterday',
    specialtySkill: 'Hand Wood-Block Carving & Printing'
  },
  {
    id: 'shg-m-2',
    name: 'Kavita Devi',
    role: 'Master Stitching & Tailoring',
    phone: '+91 96541 33441',
    itemsContributedCount: 45,
    totalEarningsShare: 16500,
    payoutStatus: 'Paid',
    lastContribution: '2 days ago',
    specialtySkill: 'Heavy Canvas Tote Construction'
  },
  {
    id: 'shg-m-3',
    name: 'Meena Kumari',
    role: 'Terracotta Pottery & Firing',
    phone: '+91 98223 55412',
    itemsContributedCount: 60,
    totalEarningsShare: 12400,
    payoutStatus: 'Processing',
    lastContribution: 'Today',
    specialtySkill: 'Wheel Throwing & Clay Diya Art'
  },
  {
    id: 'shg-m-4',
    name: 'Sunita Sharma',
    role: 'Packaging & Quality Check',
    phone: '+91 94112 88990',
    itemsContributedCount: 25,
    totalEarningsShare: 8200,
    payoutStatus: 'Pending',
    lastContribution: '3 days ago',
    specialtySkill: 'Eco-Packaging & Barcode Labeling'
  },
  {
    id: 'shg-m-5',
    name: 'Shanti Meena',
    role: 'Natural Dye & Indigo Specialist',
    phone: '+91 98877 66554',
    itemsContributedCount: 30,
    totalEarningsShare: 11200,
    payoutStatus: 'Paid',
    lastContribution: 'Yesterday',
    specialtySkill: 'Vegetable & Madder Root Dyeing'
  }
];

export const GOV_LOAN_SCHEMES: LoanScheme[] = [
  {
    id: 'pm-svanidhi',
    title: 'PM SVANidhi Micro-Credit Scheme',
    subsidy: '7% Interest Subsidy per annum',
    maxAmount: 50000,
    interestRate: 'Subsidized (eff. ~4-5%)',
    description: 'Ministry of Housing and Urban Affairs special micro-credit facility for street vendors, thelas, and roadside artisans. First tranche ₹10k, second ₹20k, third ₹50k on timely digital repayment.',
    suitableFor: 'Street vendors, food carts, hawkers',
    features: ['No collateral required', 'Cashback on digital UPI transactions up to ₹1,200/yr', 'Immediate credit score boost']
  },
  {
    id: 'pm-mudra-shishu',
    title: 'Pradhan Mantri MUDRA Yojana (Shishu & Kishore)',
    subsidy: 'Direct Credit Guarantee (CGFMU)',
    maxAmount: 500000,
    interestRate: '8.5% - 10.5%',
    description: 'Non-farm small/micro enterprises. Shishu loans cover up to ₹50,000 for purchasing raw ingredients, gas tandoor, small packaging machines, and kitchen inventory.',
    suitableFor: 'Home kitchens, pickle makers, cloud kitchens',
    features: ['MUDRA RuPay Debit Card for instant withdrawals', 'No processing fee', 'Term loans or working capital']
  },
  {
    id: 'shg-bank-linkage',
    title: 'NRLM SHG Bank Linkage & Revolving Fund',
    subsidy: 'Interest subvention down to 7%',
    maxAmount: 1000000,
    interestRate: '7% (with prompt repayment)',
    description: 'National Rural Livelihood Mission collateral-free credit for women Self-Help Groups with collective group liability and revolving community investment funds.',
    suitableFor: 'Registered SHGs, women artisan collectives',
    features: ['Collateral-free up to ₹10 Lakhs', 'Collective responsibility model', 'Direct subsidy credit into group savings account']
  }
];
