const mongoose = require('mongoose')

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/zeus', {useMongoClient: true})

mongoose.connection.on('error', function (err) {
    debug('Mongoose default connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
    debug('Mongoose default connection disconnected');
});

mongoose.connection.on('open', function () {
    debug('Mongoose default connection is open');
});

process.on('SIGINT', ()=>{
    mongoose.connection.close(()=>{
        debug('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});

exports.mongoose = mongoose;