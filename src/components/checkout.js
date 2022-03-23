import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { submitCartForm } from './../states/duck/submitCartForm/actions';
import { updateCartSidebar } from './../states/duck/updateCartSidebar/actions';
import { Select, Radio, Form, Input } from 'antd';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const { Option } = Select;

const validateMessages = {
    required: 'Required!',
    types: {
        email: 'Not a valid email!',
        number: 'Not a valid number!',
        zipcode: 'Not a valid zipcode!'
    },
};

const DELIVERY_FEE = 0;

const Checkout = () => {
    const productInCart = JSON.parse(localStorage.getItem("items"))
    let totalPrice = 0
    if (productInCart) {
        for (let product of productInCart) {
            totalPrice += product.price;
        }
    }

    const [validatePhoneMessage, setvalidatePhoneMessage] = useState(null);
    const [validateZipcodeMessage, setvalidateZipcodeMessage] = useState(null);
    const [validateEmailMessage, setvalidateEmailMessage] = useState(null);

    function handleEmailChange(e) {
        let rex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (rex.test(e.target.value)) {
            setvalidateEmailMessage(null)
        } else {
            setvalidateEmailMessage(validateMessages.types.email)
        }
    };

    function handleNumberChange(e) {
        let rex = /([\+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/
        if (rex.test(e.target.value)) {
            setvalidatePhoneMessage(null)
        } else {
            setvalidatePhoneMessage(validateMessages.types.number)
        }
    };

    function handleZipcodeChange(e) {
        let rex = /(^\d{5}$)|(^\d{5}-\d{4}$)/
        if (rex.test(e.target.value)) {
            setvalidateZipcodeMessage(null)
        } else {
            setvalidateZipcodeMessage(validateMessages.types.zipcode)
        }
    };

    const [paymentOption, setpaymentOption] = useState("cod");

    function onSelectPayment(e) {
        setpaymentOption(e.target.value)
    }

    const dispatch = useDispatch();

    const [form] = Form.useForm();
    const handleFinish = (values) => {
        localStorage.removeItem("items")
        values.optionPayment = paymentOption
        values.cart = productInCart
        dispatch(submitCartForm(JSON.stringify(values)))
        dispatch(updateCartSidebar())
    };

    return (
        <div className="cart-table-area section-padding-100">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 col-lg-8">
                        <div className="checkout_details_area mt-50 clearfix">
                            <div className="cart-title">
                                <h2>Checkout</h2>
                            </div>
                            <Form
                                form={form} onFinish={handleFinish}
                                name="formCustomer"
                            >
                                <Form.Item
                                    className="halfRow mg-25"
                                    name="firstName"
                                    rules={[{ required: true, message: validateMessages.required }]}
                                >
                                    <Input placeholder="First Name" />
                                </Form.Item>

                                <Form.Item
                                    className="halfRow"
                                    name="lastName"
                                    rules={[{ required: true, message: validateMessages.required }]}
                                >
                                    <Input placeholder="Last Name" />
                                </Form.Item>

                                <Form.Item
                                    name="companyName"
                                    rules={[{ required: true, message: validateMessages.required }]}
                                >
                                    <Input placeholder="Company Name" />
                                </Form.Item>

                                <Form.Item
                                    validateStatus="error"
                                    help={validateEmailMessage}
                                    name="email"
                                    rules={[{ required: true, message: validateMessages.required }]}
                                >
                                    <Input onChange={handleEmailChange} placeholder="Email" />
                                </Form.Item>

                                <Form.Item name="countryName" rules={[{ required: true, message: 'Please select your country!' }]} >
                                    <Select className="w-100" placeholder="Please select a country" id="countryName">
                                        <Option value="usa">United States</Option>
                                        <Option value="uk">United Kingdom</Option>
                                        <Option value="ger">Germany</Option>
                                        <Option value="fra">France</Option>
                                        <Option value="ind">India</Option>
                                        <Option value="aus">Australia</Option>
                                        <Option value="bra">Brazil</Option>
                                        <Option value="cana">Canada</Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    name="address"
                                    rules={[{ required: true, message: validateMessages.required }]}
                                >
                                    <Input placeholder="Address" />
                                </Form.Item>

                                <Form.Item
                                    name="town"
                                    rules={[{ required: true, message: validateMessages.required }]}
                                >
                                    <Input placeholder="Town" />
                                </Form.Item>

                                <Form.Item
                                    validateStatus="error"
                                    help={validateZipcodeMessage}
                                    className="halfRow mg-25"
                                    name="zipcode"
                                    rules={[{ required: true, message: validateMessages.required }]}
                                >
                                    <Input onChange={handleZipcodeChange} placeholder="Zip Code" />
                                </Form.Item>

                                <Form.Item
                                    validateStatus="error"
                                    help={validatePhoneMessage}
                                    className="halfRow"
                                    name="phoneNo"
                                    rules={[{ required: true, message: validateMessages.required }]}
                                >
                                    <Input onChange={handleNumberChange} placeholder="Phone No" />
                                </Form.Item>

                                <Form.Item name="comment">
                                    <Input.TextArea placeholder="Comment" />
                                </Form.Item>
                            </Form>
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

                            <PayPalScriptProvider
                                options={{ "client-id": "AXIfte7SbZJn-b5KPgL7M0FYpUSaVWAOinLSKF2CjIDN2_xqxFobGh0BbrWuDZcW-OFoII7dIus_bJ3P" }}
                            >
                                <PayPalButtons
                                    createOrder={(data, actions) => {
                                        return actions.order.create({
                                            purchase_units: [
                                                {
                                                    amount: {
                                                        value: totalPrice + DELIVERY_FEE,
                                                    },
                                                },
                                            ],
                                        });
                                    }}
                                    onApprove={async (data, actions) => {
                                        form.submit()
                                        alert("Transaction completed!");
                                    }}
                                />
                            </PayPalScriptProvider>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout;