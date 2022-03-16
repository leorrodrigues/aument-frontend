import tokenUnset from '../tokenUnset';

export type tokenDecodeProps = string | undefined | null;

const tokenDecode = (value: tokenDecodeProps = undefined) => {
    const now = Date.now().valueOf() / 1000;
    const splits = (value: string) =>
        value
            .split('.')
            .map(part =>
                Buffer.from(
                    part.replace(/-/g, '+').replace(/_/g, '/'),
                    'base64',
                ).toString(),
            );
    let payload;

    if (value) {
        const parts = splits(value);
        if (parts.length !== 3) {
            return undefined;
        }
        try {
            payload = JSON.parse(parts[1]);
        } catch (e) {
            return undefined;
        }

        if (payload.exp && now < payload.exp) {
            localStorage.setItem('token', value);
        } else {
            return undefined;
        }
        return payload;
    }

    const token = localStorage.getItem('token');

    if (token) {
        const parts = splits(token);
        if (parts.length !== 3) {
            return tokenUnset;
        }
        try {
            payload = JSON.parse(parts[1]);
        } catch (e) {
            return tokenUnset;
        }
        if (payload.exp && now < payload.exp) {
            return payload;
        }
        return tokenUnset;
    }
    return undefined;
};

export default tokenDecode;
