import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { getProductByOption } from '../../states/duck/getProduct/actions';
import { doDeleteProduct, doUpdateBrand, doUpdateCategory, doUpdateColor, doUpdateProduct } from './../../states/duck/manageProduct/actions';
import { getCCB } from '../../states/duck/getCCB/actions';
import { Tabs, Select, Form, Button, Input, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;
const { Option } = Select;

function callback(key) {
    console.log(key);
}

const ProductManage = () => {
    let history = useHistory();
    const isAdmin = localStorage.getItem("admin")
    if (isAdmin == null) {
        history.push("/login");
    }

    const [option, setoption] = useState({
        category: null,
        brand: null,
        color: null,
        price: null,
        sortOption: 'updatedAt'
    })

    const [selectedProduct, setSelectedProduct] = useState('')
    const [selectedColor, setSelectedColor] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('')
    const [selectedBrand, setSelectedBrand] = useState('')

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductByOption(option))
        dispatch(getCCB())
    }, [option]);

    function onSelectProduct(value) {
        setSelectedProduct(value)
    }

    function onSelectColor(value) {
        setSelectedColor(value)
    }

    function onSelectBrand(value) {
        setSelectedBrand(value)
    }

    function onSelectCategory(value) {
        setSelectedCategory(value)
    }

    function onDeleteProduct() {
        if (selectedProduct == '') {
            message.error('Product is not selected')
        } else {
            dispatch(doDeleteProduct(selectedProduct))
        }
    }

    const onFinish = (values) => {
        if (selectedProduct) {
            values.id = selectedProduct
        }
        console.log('Success:', values);
        dispatch(doUpdateProduct(values))
    };

    const onFinishColor = (values) => {
        if (selectedColor) {
            values.id = selectedColor
        }
        dispatch(doUpdateColor(values))
    };

    const onFinishBrand = (values) => {
        if (selectedBrand) {
            values.id = selectedBrand
        }
        dispatch(doUpdateBrand(values))
    };

    const onFinishCategory = (values) => {
        if (selectedCategory) {
            values.id = selectedCategory
        }
        dispatch(doUpdateCategory(values))
    };

    const customRequest = ({onSuccess}) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 0);
    }

    const getFile = (e) => {
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
    };

    const productList = useSelector(state => state.getProduct);
    const CCB = useSelector(state => state.getCCB);

    if (productList.productList) {
        var renderProduct = productList.productList.map((product, index) => {
            console.log(product);
            return (
                <Option key={product._id}>
                    {product.name}
                </Option>
            )
        })
    }

    if (CCB.brands && CCB.categories && CCB.colors) {
        var renderBrands = CCB.brands.map((brand, index) => (
            <Option key={brand._id}>
                {brand.name}
            </Option>
        ))

        var renderCategories = CCB.categories.map((category, index) => (
            <Option key={category._id}>
                {category.name}
            </Option>
        ))

        var renderColors = CCB.colors.map((color, index) => (
            <Option key={color._id}>
                {color.name}
            </Option>
        ))
    }

    return (
        <div className="ant-row container">
            <h3>Manage Products</h3>
            <div className="ant-col ant-col-24 code-boxes-col-1-1">
                <Tabs defaultActiveKey="1" onChange={callback} className="tab-wrap">
                    <TabPane tab="Product" key="1">
                        <Form.Item
                            label="Product"
                        >
                            <Select style={{ margin: "10px 0px", width: "100%" }} onChange={onSelectProduct}>
                                {renderProduct}
                            </Select>
                            <Button onClick={onDeleteProduct}>Delete</Button>
                        </Form.Item>
                        <Form
                            name="basic"
                            labelCol={{ span: 3 }}
                            wrapperCol={{ span: 25 }}
                            onFinish={onFinish}
                        >
                            <Form.Item
                                label="Name"
                                name="name"
                                rules={[{ required: true, message: 'Please input your name!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Price"
                                name="price"
                                rules={[{ required: true, message: 'Please input your price!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Quantity"
                                name="quantity"
                                rules={[{ required: true, message: 'Please input your quantity!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Brand"
                                name="brand"
                                rules={[{ required: true, message: 'Please select your brand!' }]}
                            >
                                <Select>{renderBrands}</Select>
                            </Form.Item>

                            <Form.Item
                                label="Category"
                                name="category"
                                rules={[{ required: true, message: 'Please category your category!' }]}
                            >
                                <Select>{renderCategories}</Select>
                            </Form.Item>

                            <Form.Item
                                label="Color"
                                name="color"
                                rules={[{ required: true, message: 'Please color your color!' }]}
                            >
                                <Select>{renderColors}</Select>
                            </Form.Item>

                            <Form.Item
                                name="image"
                                label="Images"
                                valuePropName="fileList"
                                getValueFromEvent={getFile}
                            >
                                <Upload customRequest={customRequest} listType="picture">
                                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                                </Upload>
                            </Form.Item>

                            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                <Button type="primary" htmlType="submit">
                                    Update
                                </Button>
                            </Form.Item>
                        </Form>
                    </TabPane>
                    <TabPane tab="Category" key="2">
                        <Form.Item
                            label="Category"
                        >
                            <Select style={{ margin: "10px 0px", width: "100%" }} onChange={onSelectCategory}>
                                {renderCategories}
                            </Select>
                        </Form.Item>
                        <Form
                            name="basic"
                            labelCol={{ span: 3 }}
                            wrapperCol={{ span: 25 }}
                            onFinish={onFinishCategory}
                        >
                            <Form.Item
                                label="Name"
                                name="name"
                                rules={[{ required: true, message: 'Please input new category!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                <Button type="primary" htmlType="submit">
                                    Update
                                </Button>
                            </Form.Item>
                        </Form>
                    </TabPane>
                    <TabPane tab="Brand" key="3">
                        <Form.Item
                            label="Brand"
                        >
                            <Select style={{ margin: "10px 0px", width: "100%" }} onChange={onSelectBrand}>
                                {renderBrands}
                            </Select>
                        </Form.Item>
                        <Form
                            name="basic"
                            labelCol={{ span: 3 }}
                            wrapperCol={{ span: 25 }}
                            onFinish={onFinishBrand}
                        >
                            <Form.Item
                                label="Name"
                                name="name"
                                rules={[{ required: true, message: 'Please input new brand!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                <Button type="primary" htmlType="submit">
                                    Update
                                </Button>
                            </Form.Item>
                        </Form>
                    </TabPane>
                    <TabPane tab="Color" key="4">
                        <Form.Item
                            label="Color"
                        >
                            <Select style={{ margin: "10px 0px", width: "100%" }} onChange={onSelectColor}>
                                {renderColors}
                            </Select>
                        </Form.Item>
                        <Form
                            name="basic"
                            labelCol={{ span: 3 }}
                            wrapperCol={{ span: 25 }}
                            onFinish={onFinishColor}
                        >
                            <Form.Item
                                label="Name"
                                name="name"
                                rules={[{ required: true, message: 'Please input new color!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                <Button type="primary" htmlType="submit">
                                    Update
                                </Button>
                            </Form.Item>
                        </Form>
                    </TabPane>
                </Tabs>
            </div>
        </div>
    );
}

export default ProductManage;