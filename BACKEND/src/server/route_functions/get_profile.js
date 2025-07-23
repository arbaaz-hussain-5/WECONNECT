import { connectBase } from "../../database/get_database.js";

export default async function getProfile(req, res) {
  if(req.userId !== req.body.user_id){
    return  res.status(401).send('Unauthorized: Invalid Authorization header');
  }
  const data_base = (connectBase()).db("CHAT-BASE");
  const users = data_base.collection("users");
  const id = req.body.p_id;
  const data = await users.findOne(
    { user_id: id },
    { projection: { user_id: 1, profile_pic: 1 } }
  );
  res.status(200).send(data);
}
