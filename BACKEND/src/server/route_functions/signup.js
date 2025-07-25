import bcrypt from "bcrypt";
import { connectBase } from "../../database/get_database.js";
export default async function signUp(req, res) {
  const data_base = connectBase().db("CHAT-BASE");
  const users = data_base.collection("users");
  const user_id = req.body.user_id;
  let is_user;
  try {
    is_user = await users.findOne({ user_id: user_id });
  } catch {
    return res.status(503).send("unable to connect to databas");
  }
  if (is_user) {
    return res.status(405).send("user already exist");
  } else {
    const password = req.body.password;
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch {
      return res.status(500).send("somthing went wrong while processing your request");
    }
    const freinds = [];
    const freind_request = [];
    try {
      await users.insertOne({
        user_id: user_id,
        password: hashedPassword,
        freinds: freinds,
        freind_request: freind_request,
        notifications: false,
        user_history:[],
        profile_pic:
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
      });
      return res.status(201).send("user created");
    }
    catch {
      return res.status(503).send("unable to connect to databas");
    }
  }
}
