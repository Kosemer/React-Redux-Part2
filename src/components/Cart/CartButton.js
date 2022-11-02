import classes from "./CartButton.module.css";
import { useDispatch, useSelector } from "react-redux";
import { uiSliceActions } from "../store/UI-slice";

const CartButton = (props) => {
  const dispatch = useDispatch();
  const cartQuantity = useSelector(state => state.cart.totalQuantity)

  const showCartHandler = () => {
    dispatch(uiSliceActions.toggle());
  };

  return (
    <button onClick={showCartHandler} className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartQuantity}</span>
    </button>
  );
};

export default CartButton;
