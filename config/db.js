const mongoose = require('mongoose');

const connectDB = () => {
    mongoose
        .connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => console.log('MongoDB Connected'))
        .catch((error) => {
            console.error('MongoDB Connection Error:', error);
            process.exit(1); // Exit process with failure
        });
};

module.exports = connectDB;
