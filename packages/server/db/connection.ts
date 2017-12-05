import * as mongoose from 'mongoose';
import debug = require('../debug');

(<any>mongoose).Promise = global.Promise;
mongoose.connect('mongodb://localhost/zeus', { useMongoClient: true });

mongoose.connection.on('error', (err) => {
  debug(`Mongoose default connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
  debug('Mongoose default connection disconnected');
});

mongoose.connection.on('open', () => {
  debug('Mongoose default connection is open');
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    debug('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

export = mongoose;
