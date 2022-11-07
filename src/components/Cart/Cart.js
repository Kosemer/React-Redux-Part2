import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";
import { useState } from "react";

const Cart = (props) => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  //const [showTotalPrice, setShowTotalPrice] = useState(false);
  let showTotalPrice = false;

  showTotalPrice = totalPrice !== 0;

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={{
              id: item.id,
              title: item.name,
              quantity: item.quantity,
              total: item.totalPrice,
              price: item.price,
            }}
          />
        ))}
      </ul>
      {showTotalPrice && <div className={classes.total}>Total price: ${totalPrice}</div>}
      {!showTotalPrice && <p>Your cart is empty!</p>}
    </Card>
  );
};

export default Cart;
