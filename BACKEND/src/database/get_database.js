import dotenv from "dotenv";
dotenv.config()
import { MongoClient } from "mongodb";
const database_instance = new MongoClient(process.env.DATABASE_URI)
function connectBase() {
  return database_instance
}
export { connectBase };

