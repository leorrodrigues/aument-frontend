/* istanbul ignore file */
import { useSetRecoilState } from 'recoil';
import { useMutation } from '@apollo/client';
import { Form, Input, notification } from 'antd';

import Modal from '@/components/atoms/Modal';

import { globalLoadingStore } from '@/stores/globalLoading';
import updateUserQuery from './queries/updateUserQuery';

interface props {
    onClose: () => void;
    selectedUser: { id: string; name: string; email: string; login: string };
}

const UpdateUserModal = ({ onClose, selectedUser }: props) => {
    const setGlobalLoading = useSetRecoilState(globalLoadingStore);

    const [form] = Form.useForm();

    const [updateUserFn] = useMutation(updateUserQuery, {
        onCompleted() {
            setGlobalLoading(false);
            notification.success({
                message: 'User updated!',
            });
            onClose();
        },
        onError(err) {
            setGlobalLoading(false);
            console.error('onError', err);
        },
    });

    const handleFormSubmit = (values: Record<string, any>) => {
        const changedData: Record<string, any> = {};
        Object.entries(values).forEach(([key, value]) => {
            if (
                !value ||
                selectedUser[key as keyof typeof selectedUser] === value
            )
                return;
            changedData[key] = value;
        });

        if (Object.keys(changedData).length === 0) {
            notification.info({ message: 'Nothing to update' });
            onClose();
            return;
        }

        setGlobalLoading(true);
        updateUserFn({
            variables: { data: changedData, userId: selectedUser.id },
        });
    };

    return (
        <Modal
            title="Update user"
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
                    label="User Name"
                    name="name"
                    initialValue={selectedUser.name}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="User Email"
                    name="email"
                    rules={[
                        {
                            type: 'email',
                        },
                    ]}
                    initialValue={selectedUser.email}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Current Password"
                    name="password"
                    hasFeedback
                    rules={[
                        ({ getFieldValue }) => ({
                            required:
                                getFieldValue('newPassword') ||
                                getFieldValue('newPasswordConfirmation'),
                            message: 'Please enter your current password!',
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="New Password"
                    name="newPassword"
                    dependencies={['password', 'newPasswordConfirmation']}
                    hasFeedback
                    rules={[
                        ({ getFieldValue }) => ({
                            required:
                                getFieldValue('password') ||
                                getFieldValue('newPasswordConfirmation'),
                            message: 'Please confirm your new password!',
                        }),
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (
                                    !value ||
                                    getFieldValue('newPassword') === value
                                ) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    new Error(
                                        'The two passwords that you entered do not match!',
                                    ),
                                );
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="Confirm Password"
                    name="newPasswordConfirmation"
                    dependencies={['password', 'newPassword']}
                    hasFeedback
                    rules={[
                        ({ getFieldValue }) => ({
                            required:
                                getFieldValue('password') ||
                                getFieldValue('newPassword'),
                            message: 'Please confirm your new password!',
                        }),
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (
                                    !value ||
                                    getFieldValue('newPassword') === value
                                ) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    new Error(
                                        'The two passwords that you entered do not match!',
                                    ),
                                );
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default UpdateUserModal;
