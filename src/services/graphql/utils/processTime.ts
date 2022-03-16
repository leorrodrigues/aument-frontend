/* istanbul ignore file */
import { ApolloLink } from '@apollo/client';
import { message } from 'antd';
import isBrowser from 'utils/general/isBrowser';

const seconds = 1000;

const processTime = new ApolloLink((operation, forward) => {
    const token = isBrowser && localStorage.getItem('tokenDecoded');
    let displayMessage = false;
    // Check is user has "dev" role to display warning
    if (token && JSON.parse(token).roles.includes('dev')) displayMessage = true;
    // Called before operation is sent to server
    operation.setContext({ start: new Date() });

    return forward(operation).map(data => {
        // Called after server responds
        const time = +new Date() - operation.getContext().start;
        displayMessage &&
            (time > 25 * seconds ? message.warn : message.info)(
                `A operação ${operation.operationName} levou ${time}ms para ser processada`,
                3,
            );
        return data;
    });
});

export default processTime;
