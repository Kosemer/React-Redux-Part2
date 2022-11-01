import classes from './CartButton.module.css';
import { useDispatch } from 'react-redux';
import { uiSliceActions } from '../store/UI-slice';

const CartButton = (props) => {

  const dispatch = useDispatch();

const showCartHandler = () =>{
  dispatch(uiSliceActions.toggle())
}

  return (
    <button onClick={showCartHandler} className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>1</span>
    </button>
  );
};

export default CartButton;
