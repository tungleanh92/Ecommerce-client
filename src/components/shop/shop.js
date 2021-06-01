import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Pagination, Select } from 'antd';
import Cart from "../../static/img/core-img/cart.png";
import { useSelector, useDispatch } from 'react-redux';
import { getProductByOption } from '../../states/duck/getProduct/actions';
import { addPopularPoint } from '../../states/duck/addPopularPoint/actions';
import 'antd/dist/antd.css';
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";

const override = css`
  display: block;
  margin: 200px auto 0px;
  border-color: red;
`;

const { Option } = Select;

const Shop = () => {
    const DOCS_PER_PAGE = 5
    const [page, setpage] = useState(1);
    const dispatch = useDispatch();

    const [option, setoption] = useState({
        docsPerPage: DOCS_PER_PAGE,
        skipDocs: (page - 1) * 5,
        category: null,
        brand: null,
        color: null,
        price: null,
        sortOption: 'updatedAt'
    })

    useEffect(() => {
        dispatch(getProductByOption(option))
    }, [option]); // eslint-disable-line react-hooks/exhaustive-deps
    const productList = useSelector(state => state.getProduct);

    function onGoPage(number) {
        setpage(number)
        setoption({
            ...option,
            skipDocs: (number - 1) * 5
        })
    }

    function onSortByDate(value) {
        let sortOption = value === 'newest' ? 'updatedAt' : 'popularPoint';
        setoption({
            ...option,
            sortOption: sortOption
        })
    }

    function onSelectProduct(selectedProduct) {
        dispatch(addPopularPoint(selectedProduct._id))
        localStorage.setItem("selectedProduct", JSON.stringify(selectedProduct))
    }

    if (productList.productList) {
        var renderProduct = productList.productList.map((product, index) => (
            <div key={index} className="col-12 col-sm-6 col-md-12 col-xl-6">
                <div className="single-product-wrapper">
                    <div className="product-img">
                        <img src={`http://localhost:4000/uploads/${product.image[0].name}`} alt="" />
                        <img className="hover-img" src={`http://localhost:4000/uploads/${product.image[1].name}`} alt="" />
                    </div>
                    <div className="product-description d-flex align-items-center justify-content-between">
                        <div className="product-meta-data">
                            <div className="line"></div>
                            <p className="product-price">${product.price}</p>
                            <a href="product-details.html">
                                <h6>{product.name}</h6>
                            </a>
                        </div>
                        <div className="ratings-cart text-right">
                            <div className="ratings">
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <i className="fa fa-star" aria-hidden="true"></i>
                            </div>
                            <div className="cart">
                                <Link onClick={() => onSelectProduct(product)} to="/product-details" title="Add to Cart"><img src={Cart} alt="" /></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ))
    }

    const [loading, setloading] = useState(true)
    useEffect(() => {
        setloading(false)
    }, [productList])

    return (
        <div className="amado_product_area section-padding-100">
            <div className="container-fluid">

                <div className="row">
                    <div className="col-12">
                        <div className="product-topbar d-xl-flex align-items-end justify-content-between">
                            {/* <!-- Total Products --> */}
                            <div className="total-products">
                                <p>Showing {option.skipDocs + 1}-{(option.skipDocs + DOCS_PER_PAGE) < productList.totalProducts ? option.skipDocs + DOCS_PER_PAGE : productList.totalProducts} 0f {`${productList.totalProducts ? productList.totalProducts : 0}`}</p>
                            </div>
                            {/* <!-- Sorting --> */}
                            <div className="product-sorting d-flex">
                                <div className="sort-by-date d-flex align-items-center mr-15">
                                    <p>Sort by</p>
                                    <Select name="select" id="sortBydate" defaultValue="popular" style={{ width: 120 }} onChange={onSortByDate}>
                                        <Option value="newest">Newest</Option>
                                        <Option value="popular">Popular</Option>
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    {/* <!-- Single Product Area --> */}
                    {renderProduct}
                    <ClipLoader loading={loading} css={override} size={150} />
                </div>

                <div className="row">
                    <div className="col-12">
                        {/* <!-- Pagination --> */}
                        <nav aria-label="navigation">
                            <ul className="pagination justify-content-end mt-50">
                                <Pagination current={page} onChange={onGoPage} defaultPageSize={DOCS_PER_PAGE} total={productList.totalProducts ? productList.totalProducts : 0} />
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Shop;