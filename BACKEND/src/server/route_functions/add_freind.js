import { connectBase } from "../../database/get_database.js";

export default async function addFreind(req, res) {
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
  const h1 = [...user_1.freinds];

  h1.push(user_2?.user_id);
  await users.updateOne(
    { user_id: req.body.user_1 },
    {
      $set: { freinds: [...new Set(h1)] },
    }
  );

  const reqlist_1 = (await users.findOne(query_1)).freind_request;
  const newreqlist1 = [];
  for (let i = 0; i < reqlist_1.length; i++) {
    if (reqlist_1[i][1] != user_2?.user_id) {
      newreqlist1.push(reqlist_1[i]);
    }
  }

  await users.updateOne(
    { user_id: user_1.user_id },
    {
      $set: {
        freind_request: newreqlist1,
      },
    }
  );

  const h2 = [...user_2?.freinds];
  h2.push(user_1.user_id);
  await users.updateOne(
    { user_id: req.body.user_2 },
    {
      $set: { freinds: [...new Set(h2)] },
    }
  );

  const reqlist_2 = (await users.findOne(query_2)).freind_request;
  const newreqlist2 = [];
  for (let i = 0; i < reqlist_2.length; i++) {
    if (reqlist_2[i][1] != user_1.user_id) {
      newreqlist2.push(reqlist_2[i]);
    }
  }

  await users.updateOne(
    { user_id: user_2.user_id },
    {
      $set: {
        freind_request: newreqlist2,
      },
    }
  );

  console.log(user_1);
  res.send(user_1);
}
