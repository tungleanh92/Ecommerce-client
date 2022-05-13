import React, { useState } from 'react';
import { InputNumber } from 'antd';
import { Link } from "react-router-dom";

const DELIVERY_FEE = 0;

const Cart = () => {
    const productInCart = JSON.parse(localStorage.getItem("items"))
    const [state, setstate] = useState(true)

    console.log('rerender');
    function onChangeQuantity(value, index) {
        setstate(!state);
        console.log('1');
        productInCart[index].quantity = value;
        localStorage.setItem("items", JSON.stringify(productInCart))
    }

    let totalPrice = 0;

    if (productInCart) {
        var renderProductInCart = productInCart.map((product, index) => {
            totalPrice += product.price * product.quantity
            return (
                (
                    <tr key={index}>
                        <td className="cart_product_img">
                            <img src={`https://ecommerce-server-pt1t.herokuapp.com/${product.image}`} alt="Product" />
                        </td>
                        <td className="cart_product_desc">
                            <h5>{product.name}</h5>
                        </td>
                        <td className="price">
                            <span>${product.price}</span>
                        </td>
                        <td className="qty">
                            <div className="qty-btn d-flex">
                                <p>Qty</p>
                                <InputNumber min={0} max={10 < product.quantity ? 10 : product.quantity} defaultValue={product.quantity} onChange={(value) => onChangeQuantity(value, index)} />
                            </div>
                        </td>
                    </tr>
                )
            )
        })
    }

    return (
        <div className="cart-table-area section-padding-100">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 col-lg-8">
                        <div className="cart-title mt-50">
                            <h2>Shopping Cart</h2>
                        </div>

                        <div className="cart-table clearfix">
                            <table className="table table-responsive">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {renderProductInCart}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-12 col-lg-4">
                        <div className="cart-summary">
                            <h5>Cart Total</h5>
                            <ul className="summary-table">
                                <li><span>subtotal:</span> <span>${totalPrice}</span></li>
                                <li><span>delivery:</span> <span>{DELIVERY_FEE ? `$${DELIVERY_FEE}` : "Free"}</span></li>
                                <li><span>total:</span> <span>${totalPrice + DELIVERY_FEE}</span></li>
                            </ul>
                            <div className="cart-btn mt-100">
                                <Link to="/checkout" className="btn amado-btn w-100">Checkout</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart;