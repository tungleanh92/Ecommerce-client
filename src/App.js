import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import SearchBar from "./components/layouts/searchBar";
import Home from "./components/home";
import Footer from "./components/layouts/footer";
import SideBar from "./components/layouts/sidebar";
import Cart from "./components/cart";
import Checkout from "./components/checkout";
import Product from "./components/product";
import Shop from "./components/shop/index";
import ProductManage from "./components/admin/manage_product";
import Login from "./components/admin/login";

const App = () => {

  return (
    <div className="App">
      <SearchBar />

      <Router>
        <div className="main-content-wrapper d-flex clearfix">
          {window.location.pathname == '/admin' || window.location.pathname == '/login' ? (
            <></>
          ) : (
            <SideBar />
          )}
          <Switch>
            <Route path="/admin">
              <ProductManage />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/product-details">
              <Product />
            </Route>
            <Route path="/product-details">
              <Product />
            </Route>
            <Route path="/cart">
              <Cart />
            </Route>
            <Route path="/checkout">
              <Checkout />
            </Route>
            <Route path="/shop">
              <Shop />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
        </div>
        <Footer />

      </Router>

    </div>
  );
}

export default App;
