import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  const showCart = useSelector((state) => state.ui.cartIsVisible);

  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    fetch("https://productsredux-4f384-default-rtdb.firebaseio.com/cart.json", {
      method: "PUT",
      body: JSON.stringify(cart)
    }); // A 'PUT' küldés annyiban másabb mint a 'POST', hogy az új adatok (amiket küldünk) felülírják a már meglévőket az adatbázisban.
  }, [cart]); // És kell hozzá a függőség is, hogy a 'useEffect' újra lefusson, amikor a kosár változik.

  return (
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
