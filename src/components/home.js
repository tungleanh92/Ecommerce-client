import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { getProductByOption } from './../states/duck/getProduct/actions';
import { addPopularPoint } from './../states/duck/addPopularPoint/actions';
import Masonry from 'react-masonry-css'
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";

const override = css`
  display: block;
  margin: 200px auto 0px;
  border-color: red;
`;

const Home = () => {
    const dispatch = useDispatch();

    const [loading, setloading] = useState(true)

    useEffect(() => {
        dispatch(getProductByOption({
            docsPerPage: 5,
            skipDocs: 0,
            category: null,
            brand: null,
            color: null,
            price: null,
            sortOption: "updatedAt"
        }));
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const productList = useSelector(state => state.getProduct);

    useEffect(() => {
        setloading(false)
    }, [productList])

    if (productList.productList) {
        var renderProducts = productList.productList.map((product, index) => (
            <div key={index} className="single-products-catagory clearfix">
                <Link onClick={() => onSelectProduct(product)} to="/product-details">
                    <img src={`https://ecommerce-server-pt1t.herokuapp.com/${product.image[0].name}`} alt="" />
                    {/* <!-- Hover Content --> */}
                    <div className="hover-content">
                        <div className="line"></div>
                        <p>From ${product.price}</p>
                        <h4>{product.name}</h4>
                    </div>
                </Link>
            </div>
        ));
    }

    function onSelectProduct(selectedProduct) {
        dispatch(addPopularPoint(selectedProduct._id))
        localStorage.setItem("selectedProduct", JSON.stringify(selectedProduct))
    }

    return (
        <div className="products-catagories-area clearfix">
            <div className="amado-pro-catagory clearfix">
                <Masonry
                    breakpointCols={3}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column">
                    {renderProducts}
                </Masonry>
                <ClipLoader loading={loading} css={override} size={150} />
            </div>
        </div>
    )
}

export default Home;