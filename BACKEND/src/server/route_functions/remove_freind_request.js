import { connectBase } from "../../database/get_database.js";

export default async function removeFreindRequest(req, res) {
  if (req.userId !== req.body.user_1) {
    return res.status(401).send("Unauthorized: Invalid Authorization header");
  }
  const data_base = (connectBase()).db("CHAT-BASE");
  const users = data_base.collection("users");
  try {
    const frdreq_1 = (await users.findOne({ user_id: req.body.user_1 }))
      .freind_request;
    const frdreq_2 = (await users.findOne({ user_id: req.body.user_2 }))
      .freind_request;

    const new_frdreq1 = [];
    const new_frdreq2 = [];

    for (let i = 0; i < frdreq_1.length; i++) {
      if (frdreq_1[i][1] != req.body.user_2) {
        new_frdreq1.push(frdreq_1[i]);
      }
    }
    for (let i = 0; i < frdreq_2.length; i++) {
      if (frdreq_2[i][1] != req.body.user_1) {
        new_frdreq2.push(frdreq_2[i]);
      }
    }

    await users.updateOne(
      { user_id: req.body.user_1 },
      {
        $set: {
          freind_request: new_frdreq1,
        },
      }
    );
    await users.updateOne(
      { user_id: req.body.user_2 },
      {
        $set: {
          freind_request: new_frdreq2,
        },
      }
    );

    res.status(200).send("freind request removed successfully");
  }
  catch {
    return res.status(503).send("unable to connect to databas");
  }
}
