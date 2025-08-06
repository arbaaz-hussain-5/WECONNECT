import { connectBase } from "../../database/get_database.js";

export default async function saveToHistory(req, res) {

    if (req.userId !== req.body.user_1) {
        return res.status(401).send("Unauthorized: Invalid Authorization header");
    }

    const data_base = (connectBase()).db("CHAT-BASE");
    const users = data_base.collection("users");
    






}