/* istanbul ignore file */
import { useSetRecoilState } from 'recoil';
import { useMutation } from '@apollo/client';
import { Form, Input, notification } from 'antd';

import Modal from '@/components/atoms/Modal';

import tokenDecode from '@/utils/validators/token/tokenDecode';

import { globalLoadingStore } from '@/stores/globalLoading';

import { loginUserQuery } from './queries/loginQuery';

interface props {
    onClose: () => void;
}

const LoginModal = ({ onClose }: props) => {
    const setGlobalLoading = useSetRecoilState(globalLoadingStore);

    const [form] = Form.useForm();

    const [loginQueryFn] = useMutation(loginUserQuery, {
        onCompleted(res) {
            setGlobalLoading(false);
            const {
                loginUser: { accessToken },
            } = res;
            const tokenDecoded = tokenDecode(accessToken);

            if (tokenDecoded) {
                localStorage.setItem('token', accessToken);
                localStorage.setItem(
                    'tokenDecoded',
                    JSON.stringify(tokenDecoded),
                );
            }

            notification.success({
                message: 'You now are logged into Aument!',
            });
            onClose();
        },
        onError(err) {
            setGlobalLoading(false);
            console.error('onError', err);
        },
    });

    const handleFormSubmit = (values: Record<string, any>) => {
        const { login, password } = values;
        setGlobalLoading(true);
        loginQueryFn({ variables: { data: { login, password } } });
    };

    return (
        <Modal
            title="Make your login at Aument!"
            onOk={() => {
                form.submit();
            }}
            onCancel={onClose}
        >
            <Form
                form={form}
                name="basic"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                initialValues={{ remember: true }}
                onFinish={handleFormSubmit}
                autoComplete="off"
            >
                <Form.Item
                    label="Login"
                    name="login"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your login!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default LoginModal;
