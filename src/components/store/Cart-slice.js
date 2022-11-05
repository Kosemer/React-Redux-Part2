import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],  // Termékek
    totalQuantity: 0,   // Teljes mennyiség
  },
  reducers: {
    // Kosárhoz adás
    addItemToCart(state, action) {
      const newItem = action.payload;   // A "newItem" egyenlő lesz az "action"-ből érkező adatokkal.
      const existingItem = state.items.find((item) => item.id === newItem.id);  // Már a kosárban létező elem. Ugye az "items" tömbömben megnézem (find), hogy van-e olyan termék azonosító (item.id), ami megyegyezik az új termékem azonosítójával (newItem.id).

      if (!existingItem) {  // Ha nincs ilyen (nem része a tömbömnek)...
        state.items.push({  // ...akkor az "items" tömbömbe felveszem egy új termékként, megadva neki az összes szükséges paramétert, ami rajtad múlik, hogy miket szeretnél hozzáadni.
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title
        });
        state.totalQuantity++;
      }else{    // Ha ez a termék már létezik a kosárban, akkor frissíteni szeretném a terméket.
        // Ugye az "itemId" a "price" és a "name" nem változik.
        existingItem.quantity++;    // A teljes mennyiséget kell megpluszolni egyet a termékből. 
        existingItem.totalPrice = existingItem.totalPrice + newItem.price   // És az eddigi teljes összeghez kell hozzáadnunk a termék árát.
        state.totalQuantity++;
      }
    },
    // Kosárból törlés
    removeItemFromCart(state, action) {
        const id = action.payload;  // az "action"-ből érkező adatban megkapjuk a törlendő termék azonosítóját.
        const existingItem = state.items.find(item => item.id === id)   // Megnézem, hogy van-e olyan azonosítójú termékem (item.id), ami megyegyezik az action-ből érkező azonosítóval (id).
        if(existingItem.quantity === 1){    // Ha a létező termék mennyiség egyenlő egyel, akkor el kell távolítani a teljes elemet a tömmből.
            //  A meglévő elemek listájából kiszűrjük (filter()) azt az elemet, amelyik el akarjuk távolítani.
            //  Ez felülírja az elemek tömbjét egy új tömbbel, ahol ez az elem, amelyiket el akarunk távolítnai, hiányozni fog.
            state.items = state.items.filter(item => item.id !== id)    // Azok az elemek, amik nem egyenlőek a keresett termékkel (id) visszaadja őket egy új tömbben, amit ugye feljebb is írtam. A többit nem adja vissza, ergo törölve lesznek.
            state.totalQuantity--;  
        }else{  // Ha nagyobb egynél...
            existingItem.quantity--;    // ...akkor csak csökkenteni szeretnénk a mennyiségét egyel.
            existingItem.totalPrice = existingItem.totalPrice - existingItem.price; // És csökkent kell a teljes fizetendö összeget is az eltávolított termék összegével.
            state.totalQuantity--;
        }
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
