import { connectBase } from "../../database/get_database.js";

export default async function getProfilePic(req, res) {
  if (req.userId !== req.body.user_id) {
    return res.status(401).send("Unauthorized: Invalid Authorization header");
  }
  const data_base = (connectBase()).db("CHAT-BASE");
  const users = data_base.collection("users");
  try {
    const data = (await users.findOne({ user_id: req.body.pic_id }))?.profile_pic;
    res.status(200).send(data);
  }
  catch {
    return res.status(503).send("unable to connect to databas");
  }
}
