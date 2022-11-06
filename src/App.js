import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { uiSliceActions } from "./components/store/UI-slice";
import { Fragment } from "react";
import Notification from "./components/UI/Notification";

let isInitial = true;   // Ez a változó arra kell, hogy ne jelenítsen meg az oldal betöltésekor 'Success' üzenetet felül. Az 'App'-on kívül kell definiálni, hogy újrafutáskor(useEffect) ne értékelje ki.

function App() {
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);


  useEffect(() => {
    const sendCartData = async () => {
      const response = await fetch(
        "https://productsredux-4f384-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );

      if (!response.ok) {
        throw new Error("Sending cart data failed!");
      }

      dispatch(
        uiSliceActions.showNotification({
          status: "success",
          title: "Success",
          message: "Send cart data successfully!",
        })
      );
    }; // A 'PUT' küldés annyiban másabb mint a 'POST', hogy az új adatok (amiket küldünk) felülírják a már meglévőket az adatbázisban.
    if(isInitial){  //  Ha ez 'true' akkor ne hajtsa végre a catch ágat. De egyben beállítom 'false'-ra, hogy újraértékeléskor már jelenítse meg a catch ágat.
      isInitial = false;
      return;
    }
    sendCartData().catch((error) => {
      dispatch(
        uiSliceActions.showNotification({
          status: "error",
          title: "Error",
          message: "Sending cart data failed!",
        })
      );
    });
  }, [cart, dispatch]); // És kell hozzá a függőség is, hogy a 'useEffect' újra lefusson, amikor a kosár változik.

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        ></Notification>
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
