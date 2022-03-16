/* istanbul ignore file */
import { useSetRecoilState } from 'recoil';
import { useMutation } from '@apollo/client';
import { Form, Input, notification } from 'antd';

import Modal from '@/components/atoms/Modal';

import { globalLoadingStore } from '@/stores/globalLoading';
import createTagQuery from './queries/createTagQuery';

// import { loginUserQuery } from './queries/loginQuery';

interface props {
    onClose: () => void;
}

const CreateTagModal = ({ onClose }: props) => {
    const setGlobalLoading = useSetRecoilState(globalLoadingStore);

    const [form] = Form.useForm();

    const [createTagFn] = useMutation(createTagQuery, {
        onCompleted() {
            setGlobalLoading(false);
            notification.success({
                message: 'Tag created!',
            });
            onClose();
        },
        onError(err) {
            setGlobalLoading(false);
            console.error('onError', err);
        },
    });

    const handleFormSubmit = (values: Record<string, any>) => {
        const { name } = values;
        setGlobalLoading(true);
        createTagFn({ variables: { data: { name } } });
    };

    return (
        <Modal
            title="Create a new tag"
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
                    label="Tag Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the tag name!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreateTagModal;
