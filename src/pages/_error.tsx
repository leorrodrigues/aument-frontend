import { Result } from 'antd';
import DefaultLayout from 'components/organisms/layouts/DefaultLayout';

export default function Page() {
    return (
        <DefaultLayout>
            <Result status="500" subTitle="Unexpected error occured." />
        </DefaultLayout>
    );
}
