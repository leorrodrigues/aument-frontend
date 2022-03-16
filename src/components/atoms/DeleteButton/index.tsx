import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { Popconfirm, Button } from 'antd';

import { globalLoadingStore } from '@/stores/globalLoading';

interface DeleteButtonProps {
    elementId: string;
    elementIndex?: string;
    executeFn?: (data: { variables: Record<string, any> }) => void;
}

const DeleteButton = ({
    elementId,
    elementIndex = 'id',
    executeFn,
}: DeleteButtonProps) => {
    const [globalLoading, setGlobalLoading] =
        useRecoilState(globalLoadingStore);

    const [visible, setVisible] = useState(false);

    const showPopconfirm = () => {
        setVisible(true);
    };

    const handleOk = () => {
        setGlobalLoading(true);
        if (executeFn) {
            executeFn({ variables: { [`${elementIndex}`]: elementId } });
        }
    };

    const handleCancel = () => {
        setVisible(false);
    };

    return (
        <Popconfirm
            title="Are you sure?"
            visible={visible}
            onConfirm={handleOk}
            okButtonProps={{ loading: globalLoading }}
            onCancel={handleCancel}
        >
            <Button type="text" onClick={showPopconfirm}>
                delete
            </Button>
        </Popconfirm>
    );
};

export default DeleteButton;
