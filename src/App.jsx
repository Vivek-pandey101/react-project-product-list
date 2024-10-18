import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import Cart from "./component/Cart";

const addToCartImage = "/images/icon-add-to-cart.svg";

function App() {
  const [data, setData] = useState([]);
  const [cartData, setCartData] = useState([]);
  const [showItems, setShowItems] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("data.json");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleAddToCart = (item) => {
    setCartData((prevData) => {
      const existingItem = prevData.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevData.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevData, { ...item, quantity: 1 }];
      }
    });
    setShowItems(true);
  };

  const handleIncrement = (itemId) => {
    setCartData((prevData) =>
      prevData.map((cartItem) =>
        cartItem.id === itemId
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      )
    );
  };

  const handleDecrement = (itemId) => {
    setCartData((prevData) => {
      const updatedData = prevData.map((cartItem) =>
        cartItem.id === itemId
          ? {
              ...cartItem,
              quantity:
                cartItem.quantity > 1
                  ? cartItem.quantity - 1
                  : cartItem.quantity,
            }
          : cartItem
      );
      return updatedData.filter((cartItem) => cartItem.quantity > 0);
    });
  };

  return (
    <>
      <div className="item-container">
        <div className="products">
          <h1>Desserts</h1>
          <div className="items">
            {data.map((item) => {
              const isInCart = cartData.find(
                (cartItem) => cartItem.name === item.name
              );
              return (
                <div key={nanoid()} className="item">
                  <div>
                    <div className="image-container">
                      <img src={item.image.desktop} alt="Not Available" />
                      <div>
                        {isInCart ? (
                          <div className="quantity-controls">
                            <button onClick={() => handleIncrement(item.id)}>
                              +
                            </button>
                            <p>{isInCart.quantity}</p>
                            <button onClick={() => handleDecrement(item.id)}>
                              -
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleAddToCart(item)}
                            className="button"
                          >
                            <img src={addToCartImage} alt="Add to Cart" />
                            <p>Add to Cart</p>
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="details">
                      <span>{item.category}</span>
                      <h5>{item.name}</h5>
                      <p>${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <Cart
          cartData={cartData}
          showItems={showItems}
          setCartData={setCartData}
        />
      </div>
    </>
  );
}

export default App;
