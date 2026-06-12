import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import Cart from '../components/Cart';
import api from '../utils/api';

// ---------------- STYLES ----------------
const ProductsContainer = styled.div`
  display: flex;
  gap: 2rem;
  padding: 2rem;
`;

const ProductsSection = styled.div`
  flex: 1;
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
`;

const categoryHeading = {
  All: 'All Products',
  Phones: 'Phones',
  Electronics: 'Electronics',
  Men: 'Fashion - Men',
  Women: 'Fashion - Women',
};

const categories = Object.keys(categoryHeading);

// ---------------- COMPONENT ----------------
const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  // 🔥 FETCH PRODUCTS
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get('/products');
        setProducts(res.data);
        setFilteredProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProducts();
  }, []);

  // 🔥 FILTER + SEARCH + SORT
  useEffect(() => {
    let result = [...products];

    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }

    result = result.filter(p =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    result.sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      return a.name.localeCompare(b.name);
    });

    setFilteredProducts(result);
  }, [products, selectedCategory, searchTerm, sortBy]);

  return (
    <>
      <Navbar />

      <ProductsContainer>
        {/* FILTER */}
        <div>
          <h3>Categories</h3>
          {categories.map(cat => (
            <div key={cat}>
              <input
                type="radio"
                checked={selectedCategory === cat}
                onChange={() => setSelectedCategory(cat)}
              />
              {cat}
            </div>
          ))}

          <h3>Search</h3>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />

          <h3>Sort</h3>
          <button onClick={() => setSortBy('name')}>Name</button>
          <button onClick={() => setSortBy('price-low')}>Low → High</button>
          <button onClick={() => setSortBy('price-high')}>High → Low</button>
        </div>

        {/* PRODUCTS */}
        <ProductsSection>
          <h2>{categoryHeading[selectedCategory]}</h2>

          <ProductsGrid>
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ProductsGrid>
        </ProductsSection>
      </ProductsContainer>

      <Cart />
    </>
  );
};

export default ProductsPage;
