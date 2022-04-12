import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button } from 'antd';
import { doLogin } from './../../states/duck/login/actions';
import { useHistory } from "react-router-dom";

const Login = () => {
    let history = useHistory();
    const dispatch = useDispatch();
    const [notice, setNotice] = useState('');

    const onFinish = (values) => {
        dispatch(doLogin(values))
    };

    const isLogin = useSelector(state => state.login);

    useEffect(() => {
        if (isLogin.success == true) {
            console.log(isLogin);
            setNotice(isLogin)
            localStorage.setItem("admin", isLogin.token)
            history.push("/admin");
        }
    }, [isLogin])

    return (
        <div className="login-warp">
            <h3>Welcome admin</h3>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default Login;