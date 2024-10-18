import "./Cart.css";
import { nanoid } from "nanoid";
import Confirm from "./Confirm";
import { useEffect, useState } from "react";
const cartImage = "/images/illustration-empty-cart.svg";
const removeIcon = "/images/icon-remove-item.svg";
const carbonNeutral = "/images/icon-carbon-neutral.svg";

const Cart = ({ cartData, showItems, setCartData }) => {
  const [show, setShow] = useState(false);

  const totalValue = cartData.reduce(
    (acc, item) => acc + item.price * item.quantity || 1,
    0
  );

  const hndleShow = () => {
    setShow(true);
  };

  const handleRemoveItem = (id) => {
    setCartData(cartData.filter((item) => item.id !== id));
  };

  return (
    <>
      <div className="cart-container">
        <h3>Your Cart ({cartData.length})</h3>
        {showItems ? (
          cartData.map((item) => (
            <div key={nanoid()} className="cart-items">
              <div>
                <h5>{item.name}</h5>
                <div className="calculation">
                  <p className="quantity">{item.quantity}x</p>
                  <p className="price">@ ${item.price.toFixed(2)}</p>
                  <p className="total">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
              <button
                className="remove"
                onClick={() => handleRemoveItem(item.id)}
              >
                <img src={removeIcon} alt="X" />
              </button>
            </div>
          ))
        ) : (
          <>
            <div className="empty-container">
              <img src={cartImage} alt="Empty Cart" />
            </div>
            <p style={{ color: "hsl(12, 20%, 44%)" }}>
              Your added items will appear here
            </p>
          </>
        )}
        {showItems && (
          <>
            <div className="totalOrder">
              <p>Order Total:</p> <h4>${totalValue.toFixed(2)}</h4>
            </div>
            <div className="carbonNeutral">
              <img src={carbonNeutral} alt="" />
              <p>
                This is a <span>carbon-neutral</span> delivery
              </p>
            </div>
            <button className="Confirm" onClick={hndleShow}>
              Confirm Order
            </button>
          </>
        )}
      </div>
      {show && (
        <Confirm
          cartData={cartData}
          setShow={setShow}
          totalValue={totalValue}
        />
      )}
    </>
  );
};

export default Cart;
