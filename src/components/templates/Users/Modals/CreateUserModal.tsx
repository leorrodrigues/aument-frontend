/* istanbul ignore file */
import { useSetRecoilState } from 'recoil';
import { useMutation } from '@apollo/client';
import { Form, Input, notification } from 'antd';

import Modal from '@/components/atoms/Modal';

import { globalLoadingStore } from '@/stores/globalLoading';
import createUserQuery from './queries/createUserQuery';

interface props {
    onClose: () => void;
}

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
    },
};

const CreateUserModal = ({ onClose }: props) => {
    const setGlobalLoading = useSetRecoilState(globalLoadingStore);

    const [form] = Form.useForm();

    const [createUserFn] = useMutation(createUserQuery, {
        onCompleted() {
            setGlobalLoading(false);
            notification.success({
                message: 'User created!',
            });
            onClose();
        },
        onError(err) {
            setGlobalLoading(false);
            console.error('onError', err);
        },
    });

    const handleFormSubmit = (values: Record<string, any>) => {
        const { name, email, login, password } = values;
        setGlobalLoading(true);
        createUserFn({
            variables: { data: { name, email, login, password } },
        });
    };

    return (
        <Modal
            title="Create a new user"
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
                validateMessages={validateMessages}
            >
                <Form.Item
                    label="User Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the user name!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="User Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            type: 'email',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Login"
                    name="login"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the login!',
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
                            message: 'Please input the password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreateUserModal;
