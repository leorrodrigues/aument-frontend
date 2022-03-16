/* istanbul ignore file */
import { useSetRecoilState } from 'recoil';
import { useMutation } from '@apollo/client';
import { Form, Input, notification } from 'antd';

import Modal from '@/components/atoms/Modal';

import { globalLoadingStore } from '@/stores/globalLoading';
import updateTagQuery from './queries/updateTagQuery';

interface props {
    onClose: () => void;
    selectedTag: { id: string; name: string };
}

const UpdateTagModal = ({ onClose, selectedTag }: props) => {
    const setGlobalLoading = useSetRecoilState(globalLoadingStore);

    const [form] = Form.useForm();

    const [updateTagResult] = useMutation(updateTagQuery, {
        onCompleted() {
            setGlobalLoading(false);
            notification.success({
                message: 'Tag updated!',
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
        updateTagResult({
            variables: { data: { name }, tagId: selectedTag.id },
        });
    };

    return (
        <Modal
            title="Update tag"
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
                    initialValue={selectedTag.name}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default UpdateTagModal;
