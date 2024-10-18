import { nanoid } from "nanoid";
import "./Confirm.css";
import confirm from "/images/icon-order-confirmed.svg";

const Confirm = ({ cartData, setShow, totalValue }) => {
  return (
    <div className="Confirm-container">
      <div onClick={() => setShow(false)} className="overlay"></div>
      <div className="model-content">
        <img src={confirm} alt="✔" />
        <h2>Order Confirmed</h2>
        <p>We hope you enjoy your food</p>
        <div className="list">
          {cartData.map((item) => (
            <div key={nanoid()}>
              <div className="Orderditem">
                <img src={item.image.desktop} alt="" />
                <div className="name">
                  <h5>{item.name}</h5>
                  <div className="total-confirm">
                    <p className="confirm-quantity">{item.quantity}x</p>
                    <p className="confirm-price">@ ${item.price.toFixed(2)}</p>
                  </div>
                </div>
                <p className="total">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
              <hr />
              <div className="totalOrder"></div>
            </div>
          ))}
          <div style={{display:'flex', justifyContent:'space-between', padding:'5px'}}>
            <p>Order Total:</p> <h4>${totalValue.toFixed(2)}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
