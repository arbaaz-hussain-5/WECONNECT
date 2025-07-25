import { connectBase } from "../../database/get_database.js";

export default async function search(req, res) {
  if (req.userId !== req.body.user_id) {
    return res.status(401).send("Unauthorized: Invalid Authorization header");
  }
  const data_base = (connectBase()).db("CHAT-BASE");
  const users = data_base.collection("users");
  const reg = req.body.reg;
  let regex = new RegExp("^" + reg, "i");
  users
    .find({ user_id: regex }, { projection: { user_id: 1, profile_pic: 1 } })
    .toArray()
    .then((data) => {
      res.status(200).send(data);
    }).catch(() => {
      return res.status(503).send("unable to connect to databas");
    }
    );
}
