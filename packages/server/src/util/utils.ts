import { Server } from "http";

import debug = require('../debug');

export const normalizePort = (val: number | string): number | string | boolean => {
    const port: number = (typeof val === 'string') ? parseInt(val, 10) : val;
    if (isNaN(port)) return val;
    else if (port >= 0) return port;
    else return false;
};

export const onError = (server: Server) => {
    return (error: NodeJS.ErrnoException): void => {
        const addressInfo = server.address();
        const port: number | string = (typeof addressInfo === 'string' ? addressInfo : addressInfo.port);
        if (error.syscall !== 'listen') throw error;
        const bind = (typeof port === 'string') ? `pipe ${port}` : `port ${port}`;
        switch (error.code) {
            case 'EACCES':
                debug(`${bind} requires elevated privileges`);
                process.exit(1);
                break;
            case 'EADDRINUSE':
                debug(`${bind} is already in use`);
                process.exit(1);
                break;
            default:
                throw error;
        }
    };
};

export const onListening = (server: Server) => {
    return (): void => {
        const addr = server.address();
        const bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
    };
};

export const handleError = (error: Error) => {
  if (error.name === "SequelizeForeignKeyConstraintError") {
    throw new Error(
      'Ops... Ainda bem que o servidor é esperto... ' +
      'Esse registro é referenciado por outros e não pode ser removido!');
  }
  const errorMessage: string = `${error.name}: ${error.message}`;
  return Promise.reject(new Error(errorMessage));
};

export const throwError = (condition: boolean, message: string): void => {
  if (condition) { throw new Error(message); }
};

export const JWT_SECRET: string = process.env.JWT_SECRET;
