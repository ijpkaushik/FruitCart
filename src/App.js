import React, { useState, useEffect, Fragment } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar, Products, Cart, Checkout } from './components'
import { commerce } from './lib/commerce'

function App() {

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState('')

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  }

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  }

  const handleAddToCart = async (productId, quantity) => {
    const { cart } = await commerce.cart.add(productId, quantity);
    setCart(cart);
  }

  const handleUpdateCartQty = async (productId, quantity) => {
    const { cart } = await commerce.cart.update(productId, { quantity });
    setCart(cart);
  }

  const handleRemoveFromCart = async (productId) => {
    const { cart } = await commerce.cart.remove(productId);
    setCart(cart);
  }

  const handleEmptyCart = async (productId) => {
    const { cart } = await commerce.cart.empty();
    setCart(cart);
  }

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();
    setCart(newCart);
    // console.log('refresh')
  }

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      // console.log('checkoutTokenId: ', checkoutTokenId)
      refreshCart();
      console.log("Order Placed Buddy");
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
      setOrder(incomingOrder);
      // console.log("Order Placed Buddy");
      // refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message)
      // console.log("error in handle checkout")
    }
  }

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, [])

  return (
    <Router>
      <Fragment>
        <Navbar totalItems={cart.total_items} />
        <Routes>
          <Route exact path="/" element={
            <Products
              products={products}
              onAddToCart={handleAddToCart}
            />}>
          </Route>
          <Route exact path="/cart" element={
            <Cart
              cart={cart}
              handleUpdateCartQty={handleUpdateCartQty}
              handleRemoveFromCart={handleRemoveFromCart}
              handleEmptyCart={handleEmptyCart}
            />}
          >
          </Route>
          <Route exact path="/checkout" element={
            <Checkout
              cart={cart}
              order={order}
              onCaptureCheckout={handleCaptureCheckout}
              error={errorMessage}
            />}
          >
          </Route>
        </Routes>
      </Fragment>
    </Router>
  );
}

export default App;
