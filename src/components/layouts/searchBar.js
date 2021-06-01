import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { closeSearchBar } from "./../../states/duck/toggleSearchBar/actions";
import { getProductByOption } from '../../states/duck/getProduct/actions';
import Search from "../../static/img/core-img/search.png";

const SearchBar = () => {
    const [keyword, setkeyword] = useState('');
    function onChangeKeyword(e) {
        setkeyword(e.target.value);
    }
    const dispatch = useDispatch();
    function onCloseSearchBar() {
        dispatch(closeSearchBar())
    }
    const searchBarState = useSelector(state => state.toggleSearchBar);
    function onSubmit(e) {
        e.preventDefault();
        dispatch(getProductByOption({
            docsPerPage: 5,
            skipDocs: 0,
            category: null,
            brand: null,
            color: null,
            price: null,
            keyword: keyword
        }));
    }
    return (
        <div className={`${searchBarState ? "search-wrapper-on" : ""} search-wrapper section-padding-100`}>
            <div className="search-close" onClick={onCloseSearchBar}>
                <i className="fa fa-close" aria-hidden="true"></i>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="search-content">
                            <form onSubmit={onSubmit}>
                                <input type="search" name="search" id="search" placeholder="Type your keyword..." value={keyword} onChange={onChangeKeyword} />
                                <button type="submit"><img src={Search} alt="" /></button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchBar;