export const mockOrders = [
  {
    id: 'ORD-2026-100231',
    placedAt: '2026-03-25T10:15:00.000Z',
    status: 'Delivered',
    total: 129999,
    deliveryEstimate: 'Delivered on 27 Mar 2026',
    canCancel: false,
    items: [
      {
        id: 'ITEM-1',
        name: 'Apple iPhone 15 Pro Max',
        price: 129999,
        quantity: 1,
        image:
          'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=500&q=80',
      },
    ],
  },
  {
    id: 'ORD-2026-100198',
    placedAt: '2026-03-21T16:45:00.000Z',
    status: 'Pending',
    total: 18498,
    deliveryEstimate: 'Arriving by 30 Mar 2026',
    canCancel: true,
    items: [
      {
        id: 'ITEM-2',
        name: 'Sony WH-1000XM5 Wireless Headphones',
        price: 24999,
        quantity: 1,
        image:
          'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=500&q=80',
      },
      {
        id: 'ITEM-3',
        name: 'Laptop Sleeve 14-inch',
        price: 1499,
        quantity: 1,
        image:
          'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=500&q=80',
      },
    ],
  },
  {
    id: 'ORD-2026-100144',
    placedAt: '2026-03-15T07:30:00.000Z',
    status: 'Cancelled',
    total: 54999,
    deliveryEstimate: 'Cancelled on 16 Mar 2026',
    canCancel: false,
    items: [
      {
        id: 'ITEM-4',
        name: 'Samsung 55-inch Crystal 4K Smart TV',
        price: 54999,
        quantity: 1,
        image:
          'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=500&q=80',
      },
    ],
  },
  {
    id: 'ORD-2026-100087',
    placedAt: '2026-03-07T11:20:00.000Z',
    status: 'Delivered',
    total: 8998,
    deliveryEstimate: 'Delivered on 10 Mar 2026',
    canCancel: false,
    items: [
      {
        id: 'ITEM-5',
        name: 'Amazon Basics Mechanical Keyboard',
        price: 3499,
        quantity: 1,
        image:
          'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=500&q=80',
      },
      {
        id: 'ITEM-6',
        name: 'Wireless Mouse',
        price: 1799,
        quantity: 1,
        image:
          'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=500&q=80',
      },
      {
        id: 'ITEM-7',
        name: 'USB-C Hub',
        price: 3700,
        quantity: 1,
        image:
          'https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=500&q=80',
      },
    ],
  },
];

export const orderFilters = ['All Orders', 'Delivered', 'Pending', 'Cancelled'];
