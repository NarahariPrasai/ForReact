import React, { UseState } from 'react';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import EmptyState from './components/EmptyState';
import CategoryFilter from './components/CategoryFilter';
import ProductCard from './components/ProductCard';
import { PRODUCTS_DATA } from './data/products';

const CATEGORIES = ["All", "Electronics", "Books", "Clothing", "Accessories"];

export default function App(){
  const [cartCount, setCartCount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [seacrchQuery, setSearchQuery] = useState("");
  const [forceEmptyState, setForceEmptyState] = useState(false);

  const filteredProducts = PRODUCTS_DATA.filter((product) => {
    if (forceEmptyState) return false;

    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;

    const matchesSearchQuery = product.name.toLowerCase().includes(seacrchQuery.toLowerCase());

    return matchesCategory && matchesSearchQuery;
  })

    const handleAddToCart = () => {
      setCartCount((prev) => prev + 1);
    };

    const handleResetFilters =() => {
      setSelectedCategory("All");
      setSearchQuery("")
      setForceEmptyState(false);
    };

    return(
       <div>
        <Navbar />

        <Main>
          <Hero />

          <Section>
            <CategoryFilter />
          </Section>

          <Section>
            <h2>Featured Products</h2>

            <button onClick={() => setForceEmptyState(!forceEmptyState)}>
                {ForceEmptyState ? "Show Products" : "Preview Empty State"}
            </button>

            { filteredProducts.length > 0 ? (
              <div>
                {FilteredProducts.map((product) => (
                    <ProductCard 
                      key = {product.id}
                      onAddToCart = {handleAddToCart}
                      product = {product}
                    />
                ))}
              </div>
            ): ( <EmptyState onReset={handleResetFilters}/>)
             }
          </Section>
        </Main>
       </div>

    );
}
