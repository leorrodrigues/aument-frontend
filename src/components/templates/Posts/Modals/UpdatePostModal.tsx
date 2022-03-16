/* istanbul ignore file */
import { useRecoilState } from 'recoil';
import { useLazyQuery, useMutation } from '@apollo/client';
import { Form, Input, notification, Select, Skeleton, Upload } from 'antd';

import Modal from '@/components/atoms/Modal';

import { globalLoadingStore } from '@/stores/globalLoading';

import updatePostQuery from './queries/updatePostQuery';
import { useEffect, useState } from 'react';
import listTagsQuery from '../../Tags/queries/listTagsQuery';
import { TagsQueryPropsData } from '../../Tags/queries/TagsQueryProps';
import { InboxOutlined } from '@ant-design/icons';

interface props {
    onClose: () => void;
    selectedPost: { id: string; title: string; text: string; tagName: string };
}

const UpdatePostModal = ({ onClose, selectedPost }: props) => {
    const [globalLoading, setGlobalLoading] =
        useRecoilState(globalLoadingStore);

    const [form] = Form.useForm();

    const [tags, setTags] = useState<{ id: string; name: string }[]>([]);

    const [updatePostFn] = useMutation(updatePostQuery, {
        onCompleted() {
            setGlobalLoading(false);
            notification.success({
                message: 'Post updated!',
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
                selectedPost[key as keyof typeof selectedPost] === value
            )
                return;
            changedData[key] = value;
        });

        if (Object.keys(changedData).length === 0) {
            notification.info({ message: 'Nothing to update' });
            onClose();
            return;
        }

        delete changedData.dragger;

        const file =
            values.dragger && values.dragger.length > 0
                ? values.dragger[0].originFileObj
                : undefined;

        setGlobalLoading(true);
        updatePostFn({
            variables: { data: changedData, postId: selectedPost.id, file },
        });
    };

    const [fetchTags, { data: tagsRawData }] = useLazyQuery<TagsQueryPropsData>(
        listTagsQuery,
        {
            fetchPolicy: 'no-cache',
        },
    );

    useEffect(() => {
        fetchTags();
    }, [fetchTags]);

    useEffect(() => {
        if (!tagsRawData) return;

        const tagsData = tagsRawData.tags.map(data => {
            const tag = {
                id: data._id,
                name: data.name,
            };
            return tag;
        });

        setTags(tagsData);
    }, [tagsRawData]);

    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    return (
        <>
            {globalLoading ? (
                <Skeleton active />
            ) : (
                <Modal
                    title="Create a new post"
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
                            label="Post Title"
                            name="title"
                            initialValue={selectedPost.title}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Post Text"
                            name="text"
                            initialValue={selectedPost.text}
                        >
                            <Input.TextArea showCount />
                        </Form.Item>
                        <Form.Item label="Select tag" name="tagId">
                            <Select>
                                {tags.map(tag => (
                                    <Select.Option key={tag.id} value={tag.id}>
                                        {tag.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item label="Post image">
                            <Form.Item
                                name="dragger"
                                valuePropName="fileList"
                                getValueFromEvent={normFile}
                                noStyle
                            >
                                <Upload.Dragger
                                    name="files"
                                    accept="image/png,image/jpeg"
                                    listType="picture"
                                    multiple={false}
                                >
                                    <p className="ant-upload-drag-icon">
                                        <InboxOutlined />
                                    </p>
                                    <p className="ant-upload-text">
                                        Click or drag file to this area to
                                        upload
                                    </p>
                                    <p className="ant-upload-hint">
                                        Support png or jpeg images.
                                    </p>
                                </Upload.Dragger>
                            </Form.Item>
                        </Form.Item>
                    </Form>
                </Modal>
            )}
        </>
    );
};

export default UpdatePostModal;
