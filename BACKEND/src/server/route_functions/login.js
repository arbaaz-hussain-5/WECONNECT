import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { connectBase } from "../../database/get_database.js";

export default async function login(req, res) {
  const data_base = connectBase();
  const users = data_base.collection("users");
  const is_user = await users.findOne({ user_id: req.body.user_id });
  if (is_user !== null) {
    const password = (await users.findOne({ user_id: req.body.user_id }))
      .password;
    console.log(password);
    bcrypt.compare(req.body.password, password, (err, result) => {
      if (result) {
        const token = jwt.sign(req.body.user_id, "CHATAPP");
        res.cookie("ChatToken", token, {
          httpOnly: true,
          secure: true,
          sameSite: "Lax",
        });
        res.json({ token: token });
      } else {
        res.send("wrong password");
      }
    });
  }

  if (is_user === null) {
    res.send("user not found");
  }
}
