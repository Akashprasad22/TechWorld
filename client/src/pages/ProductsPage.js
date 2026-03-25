import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import ProductCard from '../components/ProductCard';
import Cart from '../components/Cart';
import { products, categories, getProductsByCategory, searchProducts } from '../data/products';

const ProductsContainer = styled.div`
  display: flex;
  gap: 2rem;
  padding: 2rem 0;
  flex-wrap: wrap;
`;

const FilterSidebar = styled.aside`
  flex: 0 0 250px;
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  height: fit-content;
  position: sticky;
  top: 100px;
  
  h3 {
    margin-bottom: 1.5rem;
    color: #333;
    font-size: 1.3rem;
  }
`;

const FilterGroup = styled.div`
  margin-bottom: 2rem;
  
  h4 {
    margin-bottom: 1rem;
    color: #555;
    font-size: 1.1rem;
  }
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    cursor: pointer;
    transition: color 0.3s;
    
    &:hover {
      color: #667eea;
    }
  }
`;

const PriceDisplay = styled.div`
  text-align: center;
  color: #667eea;
  font-weight: bold;
`;

const ProductsSection = styled.section`
  flex: 1;
  min-width: 300px;
`;

const ProductsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
  
  h2 {
    font-size: 1.8rem;
    color: #333;
  }
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #666;
  font-size: 1.2rem;
`;

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);

  // Apply filters
  useEffect(() => {
    let result = products;

    // Apply category filter
    if (selectedCategory !== 'All') {
      result = getProductsByCategory(selectedCategory);
    }

    // Apply search filter
    if (searchTerm) {
      result = searchProducts(searchTerm);
    }

    // Apply sorting
    result.sort((a, b) => {
      if (sortBy === 'price-low') {
        return a.price - b.price;
      } else if (sortBy === 'price-high') {
        return b.price - a.price;
      } else if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

    setFilteredProducts(result);
  }, [selectedCategory, searchTerm, sortBy]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <ProductsContainer>
      <FilterSidebar>
        <h3>Categories</h3>
        <FilterGroup>
          {categories.map(category => (
            <label key={category}>
              <input
                type="radio"
                name="category"
                value={category}
                checked={selectedCategory === category}
                onChange={() => handleCategoryChange(category)}
              />
              {category}
            </label>
          ))}
        </FilterGroup>

        <FilterGroup>
          <h4>Sort By</h4>
          <label>
            <input
                  type="radio"
                  name="sort"
                  value="name"
                  checked={sortBy === 'name'}
                  onChange={() => handleSortChange('name')}
                />
            Name
          </label>
          <label>
            <input
                  type="radio"
                  name="sort"
                  value="price-low"
                  checked={sortBy === 'price-low'}
                  onChange={() => handleSortChange('price-low')}
                />
            Price: Low to High
          </label>
          <label>
            <input
                  type="radio"
                  name="sort"
                  value="price-high"
                  checked={sortBy === 'price-high'}
                  onChange={() => handleSortChange('price-high')}
                />
            Price: High to Low
          </label>
        </FilterGroup>

        <FilterGroup>
          <label>
            <h4>Search</h4>
            <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={handleSearchChange}
            />
          </label>
        </FilterGroup>
      </FilterSidebar>

      <ProductsSection>
        <ProductsHeader>
          <h2>{selectedCategory === 'All' ? 'All Products' : selectedCategory}</h2>
          <span>{filteredProducts.length} products found</span>
        </ProductsHeader>

        {filteredProducts.length === 0 ? (
          <LoadingMessage>No products found matching your criteria.</LoadingMessage>
        ) : (
          <ProductsGrid>
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ProductsGrid>
        )}
      </ProductsSection>
    </ProductsContainer>
  );
};

export default ProductsPage;
