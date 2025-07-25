import { connectBase } from "../../database/get_database.js";

export default async function getFreinds(req, res) {
  if (req.userId !== req.body.user_id) {
    return res.status(401).send("Unauthorized: Invalid Authorization header");
  }
  const data_base = (connectBase()).db("CHAT-BASE");
  const users = data_base.collection("users");
  const query = { user_id: req.body.user_id };
  let freinds;
  try {
    freinds = await users.findOne(query);
  }
  catch {
    return res.status(503).send("Unable To Connect To Databas");

  }
  const ids = freinds?.freinds;
  const freind_list = new Map();
  async function getProfilePic(name) {
    const profile_pic = (await users.findOne({ user_id: name })).profile_pic;
    return profile_pic;
  }

  for (let i = 0; i < ids.length; i++) {
    try {
      freind_list.set(ids[i], await getProfilePic(ids[i]));
    }
    catch {
      return res.status(503).send("Unable To Connect Database");
    }
  }
  res.status(200).send(Object.fromEntries(freind_list));
}
