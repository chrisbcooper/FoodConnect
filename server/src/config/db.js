import mongoose from 'mongoose';
import config from '../config/index.js';

const connectDB = async () => {
    try {
        await mongoose.connect(config.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
            user: config.DB_USERNAME,
            pass: config.DB_PASSWORD,
        });

        console.log('MongoDB connected');
    } catch (err) {
        console.error(err.message);
        //Exit process with failure
        process.exit(1);
    }
};

export default connectDB;
