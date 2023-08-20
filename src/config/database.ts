import mongoose from "mongoose";
import {config} from "dotenv"

const database = async () => {
    config()
try {
    const DB = process.env.DATABASE.replace('<PASSWORD>',
    process.env.DATABASE_PASSWORD,
  );
      await mongoose.connect(DB);  
      console.log('DB connection successful!')
} catch (error) {
    console.error(`Error connecting to database: ${error.message}`);
}
}

export default database;

