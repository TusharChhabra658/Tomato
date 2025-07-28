import React, { useState } from "react";
import { ShoppingCart, ArrowLeft, Plus, Minus, Trash2 } from "lucide-react";

const RestaurantApp = () => {
  const [currentView, setCurrentView] = useState("home");
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [cart, setCart] = useState([]);

  const restaurants = [
    {
      id: 1,
      name: "Pasta Junction",
      cuisine: "Italian",
      rating: 4.5,
      image: "🍝",
      deliveryTime: "25-35 min",
      menu: [
        {
          id: 1,
          name: "Spaghetti Carbonara",
          price: 15.99,
          description: "Classic pasta with eggs, cheese, and bacon",
        },
        {
          id: 2,
          name: "Margherita Pizza",
          price: 12.99,
          description: "Fresh tomatoes, mozzarella, and basil",
        },
        {
          id: 3,
          name: "Fettuccine Alfredo",
          price: 14.99,
          description: "Creamy white sauce with parmesan cheese",
        },
        {
          id: 4,
          name: "Caesar Salad",
          price: 8.99,
          description: "Crisp romaine lettuce with caesar dressing",
        },
      ],
    },
    {
      id: 2,
      name: "Burger King",
      cuisine: "American",
      rating: 4.2,
      image: "🍔",
      deliveryTime: "20-30 min",
      menu: [
        {
          id: 5,
          name: "Classic Cheeseburger",
          price: 11.99,
          description: "Chicken patty with cheese, lettuce, and tomato",
        },
        {
          id: 6,
          name: "BBQ Bacon Burger",
          price: 13.99,
          description: "Burger with BBQ sauce and crispy bacon",
        },
        {
          id: 7,
          name: "Chicken Wings",
          price: 9.99,
          description: "Spicy chicken wings with ranch dip",
        },
        {
          id: 8,
          name: "French Fries",
          price: 4.99,
          description: "Crispy golden fries",
        },
      ],
    },
    {
      id: 3,
      name: "Sushi House",
      cuisine: "Japanese",
      rating: 4.7,
      image: "🍣",
      deliveryTime: "30-40 min",
      menu: [
        {
          id: 9,
          name: "California Roll",
          price: 8.99,
          description: "Crab, avocado, and cucumber roll",
        },
        {
          id: 10,
          name: "Salmon Sashimi",
          price: 16.99,
          description: "Fresh salmon slices",
        },
        {
          id: 11,
          name: "Chicken Teriyaki",
          price: 13.99,
          description: "Grilled chicken with teriyaki sauce",
        },
        {
          id: 12,
          name: "Miso Soup",
          price: 3.99,
          description: "Traditional soybean soup",
        },
      ],
    },
    {
      id: 4,
      name: "Taco Bell",
      cuisine: "Mexican",
      rating: 4.3,
      image: "🌮",
      deliveryTime: "15-25 min",
      menu: [
        {
          id: 13,
          name: "Veg Tacos",
          price: 10.99,
          description: "Three tacos with seasoned vegetables",
        },
        {
          id: 14,
          name: "Chicken Quesadilla",
          price: 9.99,
          description: "Grilled chicken with cheese in tortilla",
        },
        {
          id: 15,
          name: "Guacamole & Chips",
          price: 6.99,
          description: "Fresh guacamole with tortilla chips",
        },
        {
          id: 16,
          name: "Burrito Bowl",
          price: 12.99,
          description: "Rice bowl with your choice of protein",
        },
      ],
    },
  ];

  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    const existingItem = cart.find((cartItem) => cartItem.id === itemId);
    if (existingItem && existingItem.quantity > 1) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === itemId
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
    } else {
      setCart(cart.filter((cartItem) => cartItem.id !== itemId));
    }
  };

  const removeItemCompletely = (itemId) => {
    setCart(cart.filter((cartItem) => cartItem.id !== itemId));
  };

  const getCartItemQuantity = (itemId) => {
    const item = cart.find((cartItem) => cartItem.id === itemId);
    return item ? item.quantity : 0;
  };

  const getTotalPrice = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const RestaurantCard = ({ restaurant }) => (
    <div
      className="bg-white rounded-lg shadow-md p-4 sm:p-6 cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => {
        setSelectedRestaurant(restaurant);
        setCurrentView("menu");
      }}
    >
      <div className="text-4xl sm:text-6xl mb-3 sm:mb-4 text-center">
        {restaurant.image}
      </div>
      <h3 className="text-lg sm:text-xl font-bold mb-2">{restaurant.name}</h3>
      <p className="text-gray-600 mb-2 text-sm sm:text-base">
        {restaurant.cuisine}
      </p>
      <div className="flex justify-between items-center text-sm sm:text-base">
        <span className="text-yellow-500">⭐ {restaurant.rating}</span>
        <span className="text-gray-500">{restaurant.deliveryTime}</span>
      </div>
    </div>
  );

  const MenuItem = ({ item }) => (
    <div className="bg-white rounded-lg shadow-md p-3 sm:p-4 mb-3 sm:mb-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
        <h4 className="text-base sm:text-lg font-semibold mb-1 sm:mb-0">
          {item.name}
        </h4>
        <span className="text-lg font-bold text-green-600">${item.price}</span>
      </div>
      <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
        {item.description}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {getCartItemQuantity(item.id) > 0 && (
            <button
              onClick={() => removeFromCart(item.id)}
              className="bg-red-500 text-white p-2 rounded hover:bg-red-600 touch-manipulation"
            >
              <Minus size={16} />
            </button>
          )}

          {getCartItemQuantity(item.id) > 0 && (
            <span className="font-semibold px-2 text-base sm:text-lg">
              {getCartItemQuantity(item.id)}
            </span>
          )}

          <button
            onClick={() => addToCart(item)}
            className="bg-green-500 text-white p-2 rounded hover:bg-green-600 touch-manipulation"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
    </div>
  );

  const CartItem = ({ item }) => (
    <div className="bg-white rounded-lg shadow-md p-3 sm:p-4 mb-3 sm:mb-4">
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <h4 className="text-base sm:text-lg font-semibold mb-1">
            {item.name}
          </h4>
          <p className="text-sm text-gray-600">${item.price} each</p>
        </div>
        <button
          onClick={() => removeItemCompletely(item.id)}
          className="text-red-500 hover:text-red-700 p-1 touch-manipulation"
        >
          <Trash2 size={18} />
        </button>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => removeFromCart(item.id)}
            className="bg-red-500 text-white p-2 rounded hover:bg-red-600 touch-manipulation"
          >
            <Minus size={16} />
          </button>

          <span className="font-semibold text-base sm:text-lg min-w-8 text-center">
            {item.quantity}
          </span>

          <button
            onClick={() => addToCart(item)}
            className="bg-green-500 text-white p-2 rounded hover:bg-green-600 touch-manipulation"
          >
            <Plus size={16} />
          </button>
        </div>

        <div className="text-right">
          <p className="font-bold text-lg text-green-600">
            ${(item.price * item.quantity).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );

  const HomePage = () => (
    <div>
      <header className="bg-red-600 text-white p-4 sm:p-6 mb-6 sm:mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl sm:text-3xl font-bold">🍅Tomato</h1>
          <button
            onClick={() => setCurrentView("cart")}
            className="relative hover:bg-red-700 p-2 rounded touch-manipulation"
          >
            <ShoppingCart size={20} className="sm:w-6 sm:h-6" />
            {getTotalItems() > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-xs sm:text-sm">
                {getTotalItems()}
              </span>
            )}
          </button>
        </div>
      </header>

      <div className="container mx-auto px-3 sm:px-4">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
          Popular Restaurants
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </div>
    </div>
  );

  const MenuPage = () => (
    <div>
      <header className="bg-red-600 text-white p-4 sm:p-6 mb-6 sm:mb-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              onClick={() => setCurrentView("home")}
              className="hover:bg-red-700 p-2 rounded touch-manipulation"
            >
              <ArrowLeft size={20} className="sm:w-6 sm:h-6" />
            </button>
            <h1 className="text-lg sm:text-2xl font-bold truncate">
              {selectedRestaurant?.name}
            </h1>
          </div>
          <button
            onClick={() => setCurrentView("cart")}
            className="relative hover:bg-red-700 p-2 rounded touch-manipulation"
          >
            <ShoppingCart size={20} className="sm:w-6 sm:h-6" />
            {getTotalItems() > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-xs sm:text-sm">
                {getTotalItems()}
              </span>
            )}
          </button>
        </div>
      </header>

      <div className="container mx-auto px-3 sm:px-4 pb-20 sm:pb-24">
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="text-4xl sm:text-6xl mb-3 sm:mb-4 text-center">
            {selectedRestaurant?.image}
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-center mb-2">
            {selectedRestaurant?.name}
          </h2>
          <p className="text-gray-600 text-center mb-2 text-sm sm:text-base">
            {selectedRestaurant?.cuisine}
          </p>
          <div className="flex justify-center items-center space-x-4 text-sm sm:text-base">
            <span className="text-yellow-500">
              ⭐ {selectedRestaurant?.rating}
            </span>
            <span className="text-gray-500">
              {selectedRestaurant?.deliveryTime}
            </span>
          </div>
        </div>

        <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Menu</h3>
        {selectedRestaurant?.menu.map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}

        {cart.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-3 sm:p-4 border-t">
            <div className="container mx-auto flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
              <div className="text-center sm:text-left">
                <span className="font-bold text-base sm:text-lg">
                  Total: ${getTotalPrice()}
                </span>
                <span className="text-gray-600 ml-2 text-sm sm:text-base">
                  ({getTotalItems()} items)
                </span>
              </div>
              <button className="bg-green-500 text-white px-4 sm:px-6 py-2 sm:py-2 rounded-lg hover:bg-green-600 w-full sm:w-auto touch-manipulation">
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const CartPage = () => (
    <div>
      <header className="bg-red-600 text-white p-4 sm:p-6 mb-6 sm:mb-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              onClick={() => setCurrentView("home")}
              className="hover:bg-red-700 p-2 rounded touch-manipulation"
            >
              <ArrowLeft size={20} className="sm:w-6 sm:h-6" />
            </button>
            <h1 className="text-lg sm:text-2xl font-bold">Shopping Cart</h1>
          </div>
          <div className="text-sm sm:text-base">
            {getTotalItems()} {getTotalItems() === 1 ? "item" : "items"}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-3 sm:px-4 pb-20 sm:pb-24">
        {cart.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-xl sm:text-2xl font-bold mb-2 text-gray-600">
              Your cart is empty
            </h2>
            <p className="text-gray-500 mb-6">
              Add some delicious items from our restaurants!
            </p>
            <button
              onClick={() => setCurrentView("home")}
              className="bg-red-500 text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-red-600 touch-manipulation"
            >
              Browse Restaurants
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              {cart.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
              <h3 className="text-lg sm:text-xl font-bold mb-4">
                Order Summary
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm sm:text-base">
                  <span>Subtotal ({getTotalItems()} items)</span>
                  <span>${getTotalPrice()}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                  <span>Delivery Fee</span>
                  <span>$2.99</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                  <span>Tax</span>
                  <span>
                    ${(parseFloat(getTotalPrice()) * 0.08).toFixed(2)}
                  </span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>
                    $
                    {(
                      parseFloat(getTotalPrice()) +
                      2.99 +
                      parseFloat(getTotalPrice()) * 0.08
                    ).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-3 sm:p-4 border-t">
              <div className="container mx-auto">
                <button className="bg-green-500 text-white px-4 sm:px-6 py-3 rounded-lg hover:bg-green-600 w-full touch-manipulation font-semibold">
                  Proceed to Checkout - $
                  {(
                    parseFloat(getTotalPrice()) +
                    2.99 +
                    parseFloat(getTotalPrice()) * 0.08
                  ).toFixed(2)}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {currentView === "home" && <HomePage />}
      {currentView === "menu" && <MenuPage />}
      {currentView === "cart" && <CartPage />}
    </div>
  );
};

export default RestaurantApp;
