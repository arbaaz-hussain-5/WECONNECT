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
  let user_1;
  let user_2;
  try {
    user_1 = await users.findOne(query_1, options);
    user_2 = await users.findOne(query_2, options);
  }
  catch {
    return res.status(503).send("unable to connect to database");
  }
  const h1 = [];
  const h2 = [];
  for (let x of user_1.freinds) {
    if (x !== user_2.user_id) {
      h1.push(x)
    }
  }

  for (let x of user_2.freinds) {
    if (x !== user_1.user_id) {
      h2.push(x)
    }
  }

  try {
    await users.updateOne(
      { user_id: req.body.user_1 },
      {
        $set: { freinds: Array.from(new Set(h1)) },
      }
    );


    await users.updateOne(
      { user_id: req.body.user_2 },
      {
        $set: { freinds: Array.from(new Set(h2)) },
      }
    );

    return res.status(200).send("unfriend successfully")
  }
  catch {
    return res.status(503).send("unable to connect to database");
  }
}
