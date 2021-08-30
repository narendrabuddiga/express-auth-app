//Include mongoose library  
const mongoose = require('mongoose');
module.exports = {
    connect: DB_URL => {
        mongoose.connect(DB_URL);

        mongoose.connection.on('error', err => {
            console.error(err);
            console.log(
                'MongoDB connection failed: ' + DB_URL
            );
            process.exit();

        });
    },

    close: () => {
        mongoose.connection.close();
    }
};