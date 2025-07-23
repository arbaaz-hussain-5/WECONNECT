import { connectBase } from "../../database/get_database.js";

export default async function isNotification(req, res) {
  if (req.userId !== req.body.user_id) {
    return res.status(401).send("Unauthorized: Invalid Authorization header");
  }
  const data_base = (connectBase()).db("CHAT-BASE");
  const users = data_base.collection("users");
  const data = (await users.findOne({ user_id: req.body.user_id })).notifications;
  res.send(data);
}
