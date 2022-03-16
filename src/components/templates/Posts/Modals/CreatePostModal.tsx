/* istanbul ignore file */
import { useRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { Form, Input, notification, Select, Skeleton, Upload } from 'antd';

import Modal from '@/components/atoms/Modal';

import { globalLoadingStore } from '@/stores/globalLoading';

import createPostQuery from './queries/createPostQuery';

import { TagsQueryPropsData } from '../../Tags/queries/TagsQueryProps';
import listTagsQuery from '../../Tags/queries/listTagsQuery';
import { InboxOutlined } from '@ant-design/icons';

interface props {
    onClose: () => void;
}

const CreatePostModal = ({ onClose }: props) => {
    const [globalLoading, setGlobalLoading] =
        useRecoilState(globalLoadingStore);

    const [tags, setTags] = useState<{ id: string; name: string }[]>([]);

    const [form] = Form.useForm();

    const [createPostFn] = useMutation(createPostQuery, {
        onCompleted() {
            setGlobalLoading(false);
            notification.success({
                message: 'Post created!',
            });
            onClose();
        },
        onError(err) {
            setGlobalLoading(false);
            console.error('onError', err);
        },
    });

    const handleFormSubmit = (values: Record<string, any>) => {
        const { title, text, tagId } = values;
        setGlobalLoading(true);
        const file =
            values.dragger && values.dragger.length > 0
                ? values.dragger[0].originFileObj
                : undefined;
        createPostFn({
            variables: {
                data: { title, text, tagId },
                file,
            },
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
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input the post title!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Post Text"
                            name="text"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input the post text!',
                                },
                            ]}
                        >
                            <Input.TextArea showCount />
                        </Form.Item>
                        <Form.Item
                            label="Select tag"
                            name="tagId"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please select one tag!',
                                },
                            ]}
                        >
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

export default CreatePostModal;
