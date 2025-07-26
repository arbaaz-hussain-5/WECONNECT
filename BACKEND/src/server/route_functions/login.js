import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { connectBase } from "../../database/get_database.js";

export default async function login(req, res) {
  const data_base = (connectBase()).db("CHAT-BASE");
  const users = data_base.collection("users");
  let is_user;
  try {
    is_user = await users.findOne({ user_id: req.body.user_id });
  }
  catch {
    return res.status(503).send("Unable To Connect To Databas");
  }
  if (is_user !== null) {
    let password;
    try {
      password = (await users.findOne({ user_id: req.body.user_id }))
        .password;
    } catch {
      return res.status(503).send("Unable To Connect To Databas");
    }
    bcrypt.compare(req.body.password, password, (err, result) => {
      if (result) {
        const token = jwt.sign(req.body.user_id, "CHATAPP");
        res.cookie("ChatToken", token, {
         
           httpOnly: true,
           secure: true,
           sameSite: "none",
           domain:"weconnect-xj4a.onrender.com",
        });
        return res.status(200).send(token);
      } else {
        return res.status(401).send('Invalid Password')
      }
    });
  }
  if (is_user === null) {
    return res.status(204).send('USER NOT REGISTEREd')
  }
}
