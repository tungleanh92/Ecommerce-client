import React, { useEffect } from 'react';
import { NavLink, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { openSearchBar } from "./../../states/duck/toggleSearchBar/actions";

import Logo from "../../static/img/core-img/logo.png";
import Cart from "../../static/img/core-img/cart.png";
import Fav from "../../static/img/core-img/favorites.png";
import Search from "../../static/img/core-img/search.png";

const SideBar = () => {
    const dispatch = useDispatch();
    function onOpenSearchBar() {
        dispatch(openSearchBar())
    }
    const productInCart = JSON.parse(localStorage.getItem("items"))
    const updateCartSidebar = useSelector(state => state.updateCartSidebar)
    useEffect(() => {
        console.log(updateCartSidebar, productInCart);
    }, [updateCartSidebar, productInCart])
    return (
        <>
            <div className="mobile-nav">
                {/* <!-- Navbar Brand --> */}
                <div className="amado-navbar-brand">
                    <Link to="/"><img src={Logo} alt="" /></Link>
                </div>
                {/* <!-- Navbar Toggler --> */}
                <div className="amado-navbar-toggler">
                    <span></span><span></span><span></span>
                </div>
            </div>
            <header className="header-area clearfix">
                {/* <!-- Close Icon --> */}
                <div className="nav-close">
                    <i className="fa fa-close" aria-hidden="true"></i>
                </div>
                {/* <!-- Logo --> */}
                <div className="logo">
                    <Link to="/"><img src={Logo} alt="" /></Link>
                </div>
                {/* <!-- Amado Nav --> */}
                <nav className="amado-nav">
                    <ul>
                        <li><NavLink activeClassName="active" exact to="/">Home</NavLink></li>
                        <li><NavLink activeClassName="active" exact to="/shop">Shop</NavLink></li>
                        <li><NavLink activeClassName="active" exact to="/product-details">Product</NavLink></li>
                        <li><NavLink activeClassName="active" exact to="/checkout">Checkout</NavLink></li>
                    </ul>
                </nav>
                {/* <!-- Button Group --> */}
                {/* <div className="amado-btn-group mt-30 mb-100">
                    <a href="#" className="btn amado-btn mb-15">%Discount%</a>
                    <a href="#" className="btn amado-btn active">New this week</a>
                </div> */}
                {/* <!-- Cart Menu --> */}
                <div className="cart-fav-search mb-100">
                    <NavLink to="/cart"><img src={Cart} alt="" /> Cart <span>({productInCart ? productInCart.length : 0})</span></NavLink>
                    <p className="fav-nav"><img src={Fav} alt="" /> Favourite</p>
                    <p onClick={onOpenSearchBar} className="search-nav"><img src={Search} alt="" /> Search</p>
                </div>
                {/* <!-- Social Button --> */}
                <div className="social-info d-flex justify-content-between">
                    <Link to='#'><i className="fa fa-pinterest" aria-hidden="true"></i></Link>
                    <Link to='#'><i className="fa fa-instagram" aria-hidden="true"></i></Link>
                    <Link to="#"><i className="fa fa-facebook" aria-hidden="true"></i></Link>
                    <Link to="#"><i className="fa fa-twitter" aria-hidden="true"></i></Link>
                </div>
            </header>
        </>
    )
}

export default SideBar;