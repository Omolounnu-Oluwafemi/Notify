import mongoose from "mongoose";
import {config} from "dotenv"

const database = async () => {
    config()
try {
    const dataBase = process.env.DATABASE as string
    const passWord = process.env.DATABASE_PASSWORD as string
    const DB = dataBase.replace('<PASSWORD>',
    passWord,
  );
      await mongoose.connect(DB);  
      console.log('DB connection successful!')
} catch (error:any) {
    console.error(`Error connecting to database: ${error.message}`);
}
}

export default database;

