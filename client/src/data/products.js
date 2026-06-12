export const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);

export const products = [
  {
    id: 1,
    name: "Apple iPhone 15",
    brand: "Apple",
    price: 79900,
    priceLabel: formatPrice(79900),
    description:
      "128GB flagship iPhone with Dynamic Island, A16 Bionic chip, bright OLED display, and an advanced dual-camera system for everyday premium photography.",
    category: "phones",
    image:
      "https://source.unsplash.com/featured/800x800/?apple,iphone,smartphone",
    features: [
      "6.1-inch Super Retina XDR display",
      "A16 Bionic chip",
      "48MP main camera",
      "USB-C charging",
    ],
    rating: 4.7,
    reviews: 1824,
    inStock: true,
  },
  {
    id: 2,
    name: "Samsung Galaxy S23",
    brand: "Samsung",
    price: 74999,
    priceLabel: formatPrice(74999),
    description:
      "Premium Galaxy smartphone with Snapdragon performance, pro-grade triple cameras, vivid AMOLED display, and reliable all-day battery life.",
    category: "phones",
    image:
      "https://source.unsplash.com/featured/800x800/?samsung,galaxy,smartphone",
    features: [
      "6.1-inch Dynamic AMOLED 2X",
      "50MP triple camera system",
      "Snapdragon 8 Gen 2",
      "Fast wireless charging",
    ],
    rating: 4.6,
    reviews: 1438,
    inStock: true,
  },
  {
    id: 3,
    name: "OnePlus 11 5G",
    brand: "OnePlus",
    price: 56999,
    priceLabel: formatPrice(56999),
    description:
      "Fast and fluid flagship with Snapdragon 8 Gen 2, Hasselblad camera tuning, 120Hz AMOLED display, and ultra-fast SUPERVOOC charging.",
    category: "phones",
    image:
      "https://source.unsplash.com/featured/800x800/?oneplus,smartphone",
    features: [
      "120Hz QHD+ AMOLED display",
      "100W SUPERVOOC charging",
      "Hasselblad camera system",
      "16GB RAM option",
    ],
    rating: 4.5,
    reviews: 967,
    inStock: true,
  },
  {
    id: 4,
    name: "Xiaomi 13 Pro",
    brand: "Xiaomi",
    price: 69999,
    priceLabel: formatPrice(69999),
    description:
      "High-end Xiaomi phone with Leica-tuned camera hardware, premium ceramic finish, sharp AMOLED display, and flagship-grade performance.",
    category: "phones",
    image:
      "https://source.unsplash.com/featured/800x800/?xiaomi,smartphone",
    features: [
      "Leica professional optics",
      "120W HyperCharge",
      "WQHD+ AMOLED display",
      "Snapdragon 8 Gen 2",
    ],
    rating: 4.4,
    reviews: 651,
    inStock: true,
  },
  {
    id: 5,
    name: "realme GT 6",
    brand: "Realme",
    price: 40999,
    priceLabel: formatPrice(40999),
    description:
      "Performance-focused realme phone with bright 120Hz display, fast charging, capable camera setup, and sleek modern design for power users.",
    category: "phones",
    image:
      "https://source.unsplash.com/featured/800x800/?realme,smartphone",
    features: [
      "120Hz AMOLED display",
      "Snapdragon performance chipset",
      "Fast charging support",
      "Large vapor cooling system",
    ],
    rating: 4.3,
    reviews: 524,
    inStock: true,
  },
  {
    id: 6,
    name: "Vivo V30 Pro",
    brand: "Vivo",
    price: 41999,
    priceLabel: formatPrice(41999),
    description:
      "Style-led Vivo camera phone with ZEISS imaging, slim curved display, smooth multitasking, and portrait-focused photography features.",
    category: "phones",
    image:
      "https://source.unsplash.com/featured/800x800/?vivo,smartphone",
    features: [
      "ZEISS portrait camera",
      "Curved AMOLED display",
      "5000mAh battery",
      "Lightweight slim body",
    ],
    rating: 4.4,
    reviews: 488,
    inStock: true,
  },
  {
    id: 7,
    name: "Oppo Reno 11 Pro",
    brand: "Oppo",
    price: 39999,
    priceLabel: formatPrice(39999),
    description:
      "Premium Reno-series smartphone with polished design, fast charging, crisp OLED display, and strong portrait and selfie camera performance.",
    category: "phones",
    image:
      "https://source.unsplash.com/featured/800x800/?oppo,smartphone",
    features: [
      "67W SUPERVOOC charging",
      "OLED curved display",
      "Portrait telephoto camera",
      "Elegant glass finish",
    ],
    rating: 4.2,
    reviews: 436,
    inStock: true,
  },
  {
    id: 8,
    name: "LG 260L Frost Free Double Door Refrigerator",
    brand: "LG",
    price: 32990,
    priceLabel: formatPrice(32990),
    description:
      "Family-sized frost free refrigerator with smart inverter compressor, multi-air flow cooling, and spacious fresh food storage.",
    category: "electronics",
    image:
      "https://source.unsplash.com/featured/800x800/?refrigerator,kitchen,appliance",
    features: [
      "260L capacity",
      "Smart inverter compressor",
      "Double door design",
      "Toughened glass shelves",
    ],
    rating: 4.5,
    reviews: 812,
    inStock: true,
  },
  {
    id: 9,
    name: "Daikin 1.5 Ton 5 Star Inverter Split AC",
    brand: "Daikin",
    price: 42990,
    priceLabel: formatPrice(42990),
    description:
      "Energy-efficient split AC with inverter cooling, stabilizer-free operation, fast pull-down cooling, and low-noise performance for bedrooms and living rooms.",
    category: "electronics",
    image:
      "https://source.unsplash.com/featured/800x800/?air-conditioner,home,appliance",
    features: [
      "1.5 ton capacity",
      "5 star energy rating",
      "Inverter compressor",
      "Copper condenser",
    ],
    rating: 4.4,
    reviews: 703,
    inStock: true,
  },
  {
    id: 10,
    name: "Sony Bravia 55-inch 4K Ultra HD Smart TV",
    brand: "Sony",
    price: 58990,
    priceLabel: formatPrice(58990),
    description:
      "Large-screen Google TV with 4K picture clarity, Dolby Audio, popular streaming apps, and a slim bezel design for modern living rooms.",
    category: "electronics",
    image:
      "https://source.unsplash.com/featured/800x800/?smart-tv,television,living-room",
    features: [
      "55-inch 4K display",
      "Google TV platform",
      "Dolby Audio",
      "Voice remote included",
    ],
    rating: 4.6,
    reviews: 1098,
    inStock: true,
  },
  {
    id: 11,
    name: "AO Smith 25L Vertical Storage Geyser",
    brand: "AO Smith",
    price: 12499,
    priceLabel: formatPrice(12499),
    description:
      "Reliable storage water heater with glass-coated tank, safety-focused temperature control, and fast hot water delivery for family bathrooms.",
    category: "electronics",
    image:
      "https://source.unsplash.com/featured/800x800/?geyser,water-heater,bathroom",
    features: [
      "25L storage tank",
      "Glass-coated heating element",
      "Thermal cut-out safety",
      "8 bar pressure rating",
    ],
    rating: 4.3,
    reviews: 391,
    inStock: true,
  },
  {
    id: 12,
    name: "IFB 25L Convection Microwave Oven",
    brand: "IFB",
    price: 13990,
    priceLabel: formatPrice(13990),
    description:
      "Versatile convection microwave for reheating, baking, grilling, and Indian auto-cook menus with a compact countertop-friendly footprint.",
    category: "electronics",
    image:
      "https://source.unsplash.com/featured/800x800/?microwave-oven,kitchen,appliance",
    features: [
      "25L capacity",
      "Convection baking mode",
      "Auto-cook menus",
      "Child lock",
    ],
    rating: 4.4,
    reviews: 566,
    inStock: true,
  },
  {
    id: 13,
    name: "Men's Cotton Crew Neck T-Shirt",
    brand: "Roadster",
    price: 799,
    priceLabel: formatPrice(799),
    description:
      "Soft everyday cotton T-shirt with a regular fit, breathable fabric, and clean minimal styling that pairs easily with jeans or joggers.",
    category: "fashion",
    gender: "men",
    image:
      "https://source.unsplash.com/featured/800x800/?mens,tshirt,fashion",
    features: [
      "100% cotton fabric",
      "Regular fit",
      "Breathable everyday wear",
      "Machine washable",
    ],
    rating: 4.2,
    reviews: 284,
    inStock: true,
  },
  {
    id: 14,
    name: "Men's Slim Fit Casual Shirt",
    brand: "Louis Philippe",
    price: 1899,
    priceLabel: formatPrice(1899),
    description:
      "Sharp casual shirt with a slim silhouette, premium cotton blend, and versatile styling suited for office Fridays and evening outings.",
    category: "fashion",
    gender: "men",
    image:
      "https://source.unsplash.com/featured/800x800/?mens,shirt,casual-fashion",
    features: [
      "Slim fit tailoring",
      "Button-down front",
      "Soft cotton blend",
      "Smart-casual styling",
    ],
    rating: 4.3,
    reviews: 198,
    inStock: true,
  },
  {
    id: 15,
    name: "Men's Mid-Rise Blue Jeans",
    brand: "Levi's",
    price: 2499,
    priceLabel: formatPrice(2499),
    description:
      "Classic blue denim jeans with a comfortable mid-rise waist, durable stretch fabric, and a timeless straight profile for daily wear.",
    category: "fashion",
    gender: "men",
    image:
      "https://source.unsplash.com/featured/800x800/?mens,jeans,denim",
    features: [
      "Stretch denim blend",
      "Mid-rise waist",
      "Straight leg fit",
      "Classic five-pocket design",
    ],
    rating: 4.4,
    reviews: 342,
    inStock: true,
  },
  {
    id: 16,
    name: "Women's Floral Midi Dress",
    brand: "Berrylush",
    price: 2199,
    priceLabel: formatPrice(2199),
    description:
      "Flowy midi dress with a floral print, flattering waist definition, and lightweight fabric for brunches, travel, and festive daywear.",
    category: "fashion",
    gender: "women",
    image:
      "https://source.unsplash.com/featured/800x800/?womens,dress,fashion",
    features: [
      "Printed midi silhouette",
      "Lightweight drape",
      "Comfortable fit",
      "Day-to-evening styling",
    ],
    rating: 4.4,
    reviews: 257,
    inStock: true,
  },
  {
    id: 17,
    name: "Women's Traditional Silk Blend Saree",
    brand: "Mitera",
    price: 3499,
    priceLabel: formatPrice(3499),
    description:
      "Elegant silk blend saree with rich woven texture, festive appeal, and a graceful drape suitable for weddings and celebrations.",
    category: "fashion",
    gender: "women",
    image:
      "https://source.unsplash.com/featured/800x800/?saree,womens,fashion",
    features: [
      "Silk blend fabric",
      "Festive woven finish",
      "Unstitched blouse piece included",
      "Ideal for occasions",
    ],
    rating: 4.5,
    reviews: 174,
    inStock: true,
  },
  {
    id: 18,
    name: "Women's Ribbed Casual Top",
    brand: "H&M",
    price: 999,
    priceLabel: formatPrice(999),
    description:
      "Versatile ribbed top with a flattering fit, soft stretch feel, and clean styling that works well with denim, trousers, or skirts.",
    category: "fashion",
    gender: "women",
    image:
      "https://source.unsplash.com/featured/800x800/?womens,top,clothing",
    features: [
      "Stretch rib fabric",
      "Body-skimming fit",
      "Easy layering piece",
      "Casual everyday style",
    ],
    rating: 4.1,
    reviews: 221,
    inStock: true,
  },
];

export const categories = ["All", "Phones", "Electronics", "Men", "Women"];

export const getProductById = (id) =>
  products.find((product) => product.id === parseInt(id, 10));

export const getProductsByCategory = (category) => {
  if (category === "All") {
    return products;
  }

  if (category === "Phones") {
    return products.filter((product) => product.category === "phones");
  }

  if (category === "Electronics") {
    return products.filter((product) => product.category === "electronics");
  }

  if (category === "Men" || category === "Women") {
    const gender = category.toLowerCase();
    return products.filter(
      (product) => product.category === "fashion" && product.gender === gender
    );
  }

  return [];
};

export const searchProducts = (searchTerm, sourceProducts = products) => {
  const term = searchTerm.trim().toLowerCase();

  if (!term) {
    return sourceProducts;
  }

  return sourceProducts.filter((product) =>
    [
      product.name,
      product.brand,
      product.description,
      product.category,
      product.gender,
    ]
      .filter(Boolean)
      .some((value) => value.toLowerCase().includes(term))
  );
};
