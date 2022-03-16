/* istanbul ignore file */
import { globalLoadingStore } from '@/stores/globalLoading';
import { Modal as AntdModal } from 'antd';
import { useRecoilValue } from 'recoil';

interface props {
    children: JSX.Element;
    title: string;
    onOk: () => void;
    onCancel: () => void;
}

const Modal = ({ children, title, onOk, onCancel }: props) => {
    const globalLoading = useRecoilValue(globalLoadingStore);

    return (
        <AntdModal
            title={title}
            maskClosable={false}
            closable={false}
            cancelText="Cancel"
            visible={true}
            okText={'Confirm'}
            okButtonProps={{ disabled: globalLoading }}
            cancelButtonProps={{
                disabled: globalLoading,
            }}
            confirmLoading={globalLoading}
            onOk={onOk}
            onCancel={onCancel}
            width="75vw"
        >
            {children}
        </AntdModal>
    );
};

export default Modal;
