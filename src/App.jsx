import { useState } from "react";
import { Routes, Route } from "react-router";
import Shop from "./pages/Shop";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Confirmation from "./pages/Confirmation";
import Header from "./components/Header";
import { Container, useToast } from "@chakra-ui/react";

function App() {
  const [cart, setCart] = useState({});
  const [cartSize, setCartSize] = useState(0);

  const toast = useToast();

  const addToCart = (item, quantity) => {
    setCart((cart) => {
      const currQuantity = cart[item.id]
        ? cart[item.id].quantity + quantity
        : quantity;
        if (currQuantity == 1){
          toast({
            title: `Item added to the cart`,
            status: 'success',
            isClosable: true,
          });
          setCartSize(counter => counter + 1);
        }
      return { ...cart, [item.id]: { ...item, quantity: currQuantity } };
    });
  };

  // PRE: item is already in the cart!
  const updateCart = (item, quantity) => {
    setCart((cart) => {
      if (quantity === 0) {
        delete cart[item.id];
        toast({
          title: `Item removed from the cart`,
          status: 'warning',
          isClosable: true,
        });
        setCartSize(counter => counter - 1);
      } else {
        cart[item.id].quantity = quantity;
      }
      return { ...cart };
    });
  };

  const clearCart = () => {
    setCartSize(0);
    setCart({});
  };

  return (
    <Container>
      <Header numItems={cartSize} />
      <Routes>
        <Route path="/homepage" element={<Shop addToCart={addToCart} />} />
        <Route
          path="/product/:id"
          element={<Product addToCart={addToCart} />}
        />
        <Route
          path="/cart" 
          element={<Cart path="/cart" items={Object.values(cart)} updateCart={updateCart} />}
        />
        <Route
          path="/confirmation"
          element={<Confirmation clearCart={clearCart} />}
        />
      </Routes>
    </Container>
  );
}

export default App;
