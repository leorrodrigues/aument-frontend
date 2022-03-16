import { atom } from 'recoil';

export const globalLoadingStore = atom({
    key: 'globalLoadingStore',
    default: false,
});
