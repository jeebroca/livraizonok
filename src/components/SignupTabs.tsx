import React, { useState } from 'react';
import { Store, Bike, User } from 'lucide-react';

type UserType = 'customer' | 'restaurant' | 'driver';

interface TabButtonProps {
  active: boolean;
  icon: React.ReactNode;
  title: string;
  onClick: () => void;
}

const TabButton = ({ active, icon, title, onClick }: TabButtonProps) => (
  <button
    onClick={onClick}
    className={`flex-1 flex flex-col items-center p-4 gap-2 transition-all duration-200
      ${active 
        ? 'bg-orange-50 border-b-2 border-orange-500 text-orange-600' 
        : 'text-gray-500 hover:bg-gray-50'}`}
  >
    {icon}
    <span className="font-medium">{title}</span>
  </button>
);

export default function SignupTabs() {
  const [activeTab, setActiveTab] = useState<UserType>('customer');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    restaurantName: '',
    siret: '',
    cuisineType: '',
    vehicleType: '',
    city: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateSiret = (siret: string) => {
    // Remove spaces and dashes
    const cleanSiret = siret.replace(/\s|-/g, '');
    // Check if it's exactly 14 digits
    return /^\d{14}$/.test(cleanSiret);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'restaurant' && !validateSiret(formData.siret)) {
      alert('Veuillez entrer un numéro SIRET valide (14 chiffres)');
      return;
    }
    // Handle form submission
  };

  return (
    <div className="max-w-md w-full mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="flex border-b">
        <TabButton
          active={activeTab === 'customer'}
          icon={<User className="h-6 w-6" />}
          title="Client"
          onClick={() => setActiveTab('customer')}
        />
        <TabButton
          active={activeTab === 'restaurant'}
          icon={<Store className="h-6 w-6" />}
          title="Restaurant"
          onClick={() => setActiveTab('restaurant')}
        />
        <TabButton
          active={activeTab === 'driver'}
          icon={<Bike className="h-6 w-6" />}
          title="Livreur"
          onClick={() => setActiveTab('driver')}
        />
      </div>

      <div className="p-6">
        {activeTab === 'customer' && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Créer votre compte client</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>
            <button className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors duration-200">
              S'inscrire en tant que client
            </button>
          </form>
        )}

        {activeTab === 'restaurant' && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Inscrire votre restaurant</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom du restaurant</label>
              <input
                type="text"
                name="restaurantName"
                value={formData.restaurantName}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Numéro SIRET
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                name="siret"
                value={formData.siret}
                onChange={handleInputChange}
                required
                pattern="\d{14}"
                title="Le numéro SIRET doit contenir 14 chiffres"
                placeholder="12345678901234"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
              <p className="text-xs text-gray-500 mt-1">Format: 14 chiffres sans espaces ni tirets</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email professionnel</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Numéro de téléphone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Adresse du restaurant</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type de cuisine</label>
              <select
                name="cuisineType"
                value={formData.cuisineType}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
              >
                <option value="">Sélectionnez un type de cuisine</option>
                <option value="bebeles">Bébélés</option>
                <option value="bokits">Bokits</option>
                <option value="plats-antillais">Plats Antillais</option>
                <option value="soupes">Soupes</option>
                <option value="pizza">Pizza</option>
                <option value="burgers">Burgers</option>
                <option value="fastfood">FastFood</option>
                <option value="desserts">Desserts</option>
              </select>
            </div>
            <button className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors duration-200">
              Inscrire mon restaurant
            </button>
          </form>
        )}

        {activeTab === 'driver' && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Devenir livreur partenaire</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Numéro de téléphone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type de véhicule</label>
              <select
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
              >
                <option value="">Sélectionnez un type de véhicule</option>
                <option value="bicycle">Vélo</option>
                <option value="scooter">Scooter</option>
                <option value="motorcycle">Moto</option>
                <option value="car">Voiture</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ville</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>
            <button className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors duration-200">
              S'inscrire en tant que livreur
            </button>
          </form>
        )}

        <p className="mt-4 text-center text-sm text-gray-600">
          Vous avez déjà un compte ?{' '}
          <a href="#" className="text-orange-600 hover:text-orange-700 font-medium">
            Se connecter
          </a>
        </p>
      </div>
    </div>
  );
}