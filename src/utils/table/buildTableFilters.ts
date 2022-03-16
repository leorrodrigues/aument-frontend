const buildTableFilters = (index: string, data: Record<string, any>[]) => {
    const dataSet = new Set<string>();
    const dataList: { text: string; value: string }[] = [];
    data.forEach(item => {
        const tag = item[index];
        if (!dataSet.has(tag)) {
            dataSet.add(tag);
            dataList.push({
                text: tag,
                value: tag,
            });
        }
    });
    return dataList;
};

export default buildTableFilters;
