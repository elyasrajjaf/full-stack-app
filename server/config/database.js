import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

const connectionDB = () => {
    mongoose.connect(process.env.URI_MONGODB, { useNewUrlParser: true })
        .then(() => console.log('Connected to MongoDB...'))
        .catch(err => console.error('Could not connect to MongoDB...'));
}

export default connectionDB;