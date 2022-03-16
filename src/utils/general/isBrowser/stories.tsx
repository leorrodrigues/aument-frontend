import { Story, Meta } from '@storybook/react/types-6-0';

import isBrowser from './';

const isBrowserComponent = () => <div>{JSON.stringify(isBrowser)}</div>;

export default {
    title: 'Utils/General/isBrowser',
    component: isBrowserComponent,

    args: {},
    argTypes: {
        value: {
            description: 'Util para retornar se está em um navegador ou é SSR.',
        },
    },
} as Meta;

export const Basico: Story = () => isBrowserComponent();
Basico.storyName = 'isBrowser';
