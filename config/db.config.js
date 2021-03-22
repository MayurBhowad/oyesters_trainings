const mongoose = require('mongoose');

const keys = require('./keys.config');

const connectDB = () => {
    mongoose.connect(keys.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
        .then(() => console.log('Mongodb connected!'))
}

module.exports = connectDB;