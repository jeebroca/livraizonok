import React, { useState } from 'react';
import Navbar from './components/Navbar';
import CategoryFilter from './components/CategoryFilter';
import RestaurantCard from './components/RestaurantCard';
import SearchBar from './components/SearchBar';
import PromoBanner from './components/PromoBanner';
import SignupTabs from './components/SignupTabs';
import Footer from './components/Footer';

const restaurants = [
  {
    name: "Ti Bébélé",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800",
    cuisine: "Antillais • Bébélés",
    rating: 4.8,
    deliveryTime: "25-35 min",
    minOrder: "15€",
    promos: ["-20%", "Livraison Gratuite"],
    trending: true
  },
  {
    name: "Bokit Paradise",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800",
    cuisine: "Antillais • Bokits",
    rating: 4.9,
    deliveryTime: "20-30 min",
    minOrder: "12€",
    promos: ["2 Bokits = 15€"]
  },
  {
    name: "Saveurs Créoles",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800",
    cuisine: "Antillais • Plats traditionnels",
    rating: 4.7,
    deliveryTime: "30-45 min",
    minOrder: "20€"
  },
  {
    name: "La Case à Soupe",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800",
    cuisine: "Antillais • Soupes",
    rating: 4.6,
    deliveryTime: "25-40 min",
    minOrder: "15€",
    promos: ["Soupe du jour -10%"]
  },
  {
    name: "Fast & Fresh",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800",
    cuisine: "FastFood • Burgers",
    rating: 4.5,
    deliveryTime: "15-25 min",
    minOrder: "10€",
    trending: true
  },
  {
    name: "Le Gourmet Créole",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800",
    cuisine: "Antillais • Plats traditionnels",
    rating: 4.7,
    deliveryTime: "35-50 min",
    minOrder: "25€",
    promos: ["Menu du jour"]
  }
];

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tout");
  const [showSignup, setShowSignup] = useState(false);

  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "Tout" || 
                          restaurant.cuisine.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onSearch={setSearchQuery} onSignupClick={() => setShowSignup(true)} />
      
      {showSignup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="relative">
            <button 
              onClick={() => setShowSignup(false)}
              className="absolute -top-4 -right-4 bg-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100"
            >
              ✕
            </button>
            <SignupTabs />
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <section className="mt-8">
          <div className="mb-8">
            <PromoBanner />
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-900">
              Des plats délicieux, livrés chez vous
            </h2>
            <SearchBar onSearch={setSearchQuery} />
          </div>
          
          <CategoryFilter 
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.name}
                {...restaurant}
              />
            ))}
          </div>

          {filteredRestaurants.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                Aucun restaurant ne correspond à vos critères.
              </p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;