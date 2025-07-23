import { connectBase } from "../../database/get_database.js";

export default async function removeFreind(req, res) {
  if (req.userId !== req.body.user_1) {
    return res.status(401).send("Unauthorized: Invalid Authorization header");
  }
  const data_base = (connectBase()).db("CHAT-BASE");
  const users = data_base.collection("users");
  const query_1 = { user_id: req.body.user_1 };
  const query_2 = { user_id: req.body.user_2 };
  const options = {
    projection: { user_id: 1, freinds: 1 },
  };

  const user_1 = await users.findOne(query_1, options);
  const user_2 = await users.findOne(query_2, options);
  const h1 = [];
  for (let i = 0; i < user_1.freinds; i++) {
    if (user_1.freinds[i] != user_2.user_id) {
      h1.push(user_1.freinds[i]);
    }
  }
  await users.updateOne(
    { user_id: req.body.user_1 },
    {
      $set: { freinds: [...new Set(h1)] },
    }
  );

  const h2 = [];
  for (let i = 0; i < user_2.freinds; i++) {
    if (user_2.freinds[i] != user_1.user_id) {
      h2.push(user_1.freinds[i]);
    }
  }
  await users.updateOne(
    { user_id: req.body.user_2 },
    {
      $set: { freinds: [...new Set(h2)] },
    }
  );
}
