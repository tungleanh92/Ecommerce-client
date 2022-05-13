import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { InputNumber } from 'antd';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { updateCartSidebar } from './../states/duck/updateCartSidebar/actions'

const Product = () => {
    const dispatch = useDispatch();
    const [nav1, setnav1] = useState(null);
    const [nav2, setnav2] = useState(null);
    const [qty, setqty] = useState(1)

    function onChangeQuantity(value) {
        setqty(value);
    }

    const selectedProduct = JSON.parse(localStorage.getItem("selectedProduct"))
    if (selectedProduct.image) {
        var renderProductImgBig = selectedProduct.image.map((img, index) => (
            <li key={index}>
                <img src={`https://ecommerce-server-pt1t.herokuapp.com/${img.name}`} alt="" />
            </li>
        ))

        var renderProductImgSm = selectedProduct.image.map((img, index) => (
            <li key={index}>
                <img src={`https://ecommerce-server-pt1t.herokuapp.com/${img.name}`} alt="" />
            </li>
        ))
    }

    function onAddToCart() {
        dispatch(updateCartSidebar())
        let items = JSON.parse(localStorage.getItem("items") || "[]");
        let newItem = {
            id: selectedProduct._id,
            name: selectedProduct.name,
            quantity: qty,
            price: selectedProduct.price,
            image: selectedProduct.image[0].name
        };
        let check = 0;
        for (let item of items) {
            if (item.name === selectedProduct.name) {
                check = 1;
                item.quantity += qty;
            }
        }
        if (check === 0) {
            items.push(newItem);
        }
        localStorage.setItem("items", JSON.stringify(items));
    }

    return (
        <div className="single-product-area section-padding-100 clearfix">
            <div className="container-fluid">

                <div className="row">
                    <div className="col-12 col-lg-7">
                        <Slider
                            asNavFor={nav2}
                            ref={slider1 => setnav1(slider1)}
                        >
                            {renderProductImgBig}
                        </Slider>

                        <Slider
                            asNavFor={nav1}
                            ref={slider2 => setnav2(slider2)}
                            slidesToShow={selectedProduct.image.length}
                            swipeToSlide={true}
                            focusOnSelect={true}
                            infinite={true}
                            autoplay={true}
                            autoplaySpeed={3000}
                        >
                            {renderProductImgSm}
                        </Slider>
                    </div>
                    <div className="col-12 col-lg-5">
                        <div className="single_product_desc">
                            {/* <!-- Product Meta Data --> */}
                            <div className="product-meta-data">
                                <div className="line"></div>
                                <p className="product-price">${selectedProduct.price}</p>
                                <a href="product-details.html">
                                    <h6>{selectedProduct.name}</h6>
                                </a>
                                {/* <!-- Ratings & Review --> */}
                                <div className="ratings-review mb-15 d-flex align-items-center justify-content-between">
                                    <div className="ratings">
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                    </div>
                                    <div className="review">
                                        <Link to="#">Write A Review</Link>
                                    </div>
                                </div>
                                {/* <!-- Avaiable --> */}
                                <p className="avaibility"><i className="fa fa-circle"></i> In Stock</p>
                            </div>

                            <div className="short_overview my-5">
                                <p>{selectedProduct.description ? selectedProduct.description : ""}</p>
                            </div>

                            {/* <!-- Add to Cart Form --> */}
                            <div className="cart clearfix">
                                <div className="cart-btn d-flex mb-50">
                                    <p>Qty</p>
                                    <InputNumber min={1} max={10 < selectedProduct.quantity ? 10 : selectedProduct.quantity} defaultValue={qty} onChange={onChangeQuantity} />
                                </div>
                                <button onClick={onAddToCart} name="addtocart" className="btn amado-btn">Add to cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product;