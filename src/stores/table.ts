import { atom, selector } from 'recoil';

export const tableState = atom({
    key: 'tableState',
    default: [
        {
            tableName: 'default',
            dataSourceFiltered: [],
            columnsFiltered: {},
            selectedRowKeys: [],
            selectedRows: [],
        },
    ] as any,
});

export const selectorTableState = selector({
    key: 'selectorTableState',
    get: ({ get }) => {
        const table = get(tableState);
        const tableByName = (tableName: string) => {
            return (
                table.find((item: any) => item.tableName === tableName) || {}
            );
        };
        return {
            tableByName,
        };
    },
});
