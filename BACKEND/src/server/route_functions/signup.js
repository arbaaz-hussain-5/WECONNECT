import bcrypt from "bcrypt";
import { connectBase } from "../../database/get_database.js";

export default async function signUp(req, res) {
  const data_base = connectBase();
  const users = data_base.collection("users");
  const user_id = req.body.user_id;
  const is_user = await users.findOne({ user_id: user_id });
  if (is_user) {
    res.staus(405).send("exist");
    return;
  } else {
    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, 10);
    const freinds = [];
    const freind_request = [];
    await users.insertOne({
      user_id: user_id,
      password: hashedPassword,
      freinds: freinds,
      freind_request: freind_request,
      notifications: false,
      profile_pic:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
    });
    res.staus(201).send("done");
  }
}
