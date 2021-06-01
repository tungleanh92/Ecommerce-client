import React, { useState, useEffect } from 'react';
import { Slider, Checkbox } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { getCCB } from '../../states/duck/getCCB/actions';
import { getProductByOption } from '../../states/duck/getProduct/actions';
import 'antd/dist/antd.css';

const marks = {
    0: '0',
    100: '20000'
};

const DOCS_PER_PAGE = 5

const Sidebar = () => {
    const dispatch = useDispatch();
    const [option, setoption] = useState({
        docsPerPage: DOCS_PER_PAGE,
        skipDocs: 0,
        category: null,
        brand: null,
        color: null,
        price: null
    })
    useEffect(() => {
        dispatch(getCCB())
    }, []) // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        dispatch(getProductByOption(option))
    }, [option]); // eslint-disable-line react-hooks/exhaustive-deps
    const CCB = useSelector(state => state.getCCB);

    const [activeColor, setactiveColor] = useState()
    const [activeCategory, setactiveCategory] = useState()

    if (CCB.brands && CCB.categories && CCB.colors) {
        var renderBrands = CCB.brands.map((brand, index) => (
            <div key={index}>
                <Checkbox value={`${brand._id}`} id={`${brand.name}`} onChange={handleSelect}>{capitalizeFirstLetter(brand.name)}</Checkbox> <br />
            </div>
        ))

        var renderCategories = CCB.categories.map((category, index) => (
            <li className={` ${category._id === activeCategory ? "active" : ""}`} onClick={() => onSelectCate(category._id)} key={index} >{capitalizeFirstLetter(category.name)}</li>
        ))

        var renderColors = CCB.colors.map((color, index) => (
            <li onClick={() => onSelectColor(color._id)} key={index}><div className={` ${color._id === activeColor ? "active" : ""}`} style={{ backgroundColor: `${color.name}` }}></div></li>
        ))
    }

    const [priceRange, setpriceRange] = useState({ $gte: marks[0], $lte: marks[100] })
    function onSlidePrice([minPercent, maxPercent]) {
        setpriceRange({
            ...priceRange,
            $gte: minPercent * 200,
            $lte: maxPercent * 200
        })
        setoption({
            ...option,
            price: priceRange
        })
    }

    function onSelectCate(cateId) {
        setactiveCategory(cateId)
        setoption({
            ...option,
            category: cateId
        });
    }

    function onSelectColor(colorId) {
        setactiveColor(colorId)
        setoption({
            ...option,
            color: colorId
        });
    }

    const [brandArray, setbrandArray] = useState([]);

    useEffect(() => {
        if (brandArray === []) {
            setoption({
                ...option,
                brand: null
            })
        } else {
            setoption({
                ...option,
                brand: brandArray
            })
        }
    }, [brandArray]) // eslint-disable-line react-hooks/exhaustive-deps

    function handleSelect(e) {
        let selectedBrand = e.target.value
        if (brandArray.includes(selectedBrand)) {
            console.log('include');
            setbrandArray(brandArray.filter(brand => brand !== selectedBrand));
        } else {
            console.log('not-include');
            setbrandArray([...brandArray, selectedBrand])
        }
    }

    return (
        <div className="shop_sidebar_area">

            {/* <!-- ##### Single Widget ##### --> */}
            <div className="widget catagory mb-50">
                {/* <!-- Widget Title --> */}
                <h6 className="widget-title mb-30">Catagories</h6>

                {/* <!--  Catagories  --> */}
                <div className="catagories-menu">
                    <ul>
                        {renderCategories}
                    </ul>
                </div>
            </div>

            {/* <!-- ##### Single Widget ##### --> */}
            <div className="widget brands mb-50">
                {/* <!-- Widget Title --> */}
                <h6 className="widget-title mb-30">Brands</h6>

                <div className="widget-desc">
                    {renderBrands}
                </div>
            </div>

            {/* <!-- ##### Single Widget ##### --> */}
            <div className="widget color mb-50">
                {/* <!-- Widget Title --> */}
                <h6 className="widget-title mb-30">Color</h6>

                <div className="widget-desc">
                    <ul className="d-flex">
                        {renderColors}
                    </ul>
                </div>
            </div>

            {/* <!-- ##### Single Widget ##### --> */}
            <div className="widget price mb-50">
                {/* <!-- Widget Title --> */}
                <h6 className="widget-title mb-30">Price</h6>

                <div className="widget-desc">
                    <div className="slider-range">
                        <Slider onChange={onSlidePrice} range marks={marks} defaultValue={[0, 1000]} />
                        <div className="range-price">${priceRange.$gte} - ${priceRange.$lte}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}