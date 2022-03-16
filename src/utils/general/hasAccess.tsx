const hasAccess = () => {
    const token = JSON.parse(localStorage.getItem('tokenDecoded') as string);

    if (!token) {
        return false;
    }

    return true;
};

export default hasAccess;
