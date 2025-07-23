import { connectBase } from "../../database/get_database.js";

export default async function freindRequest(req, res) {
  if (req.userId !== req.body.r_sender) {
    return res.status(401).send("Unauthorized: Invalid Authorization header");
  }
  const data_base = (connectBase()).db("CHAT-BASE");
  const users = data_base.collection("users");
  const sender = req.body.r_sender;
  const receiver = req.body.r_receiver;
  const data1 = await users.findOne({ user_id: receiver });
  let isExist = false;
  for (let i = 0; i < data1.freind_request.length; i++) {
    if (
      data1.freind_request[i][1] == sender &&
      data1.freind_request[i][0] == "arrived"
    ) {
      isExist = true;
      break;
    }
  }
  if (!isExist) {
    await users.updateOne(
      { user_id: receiver },
      {
        $set: {
          freind_request: [
            ...data1.freind_request,
            ["arrived", sender, "pending"],
          ],
        },
      }
    );
  }

  isExist = false;
  const data2 = await users.findOne({ user_id: sender });
  for (let i = 0; i < data2.freind_request.length; i++) {
    if (
      data2.freind_request[i][1] == receiver &&
      data2.freind_request[i][0] == "dispatch"
    ) {
      isExist = true;
      break;
    }
  }
  if (!isExist) {
    await users.updateOne(
      { user_id: sender },
      {
        $set: {
          freind_request: [
            ...data2.freind_request,
            ["dispatch", receiver, "pending"],
          ],
        },
      }
    );
  }
  await users.updateOne(
    { user_id: receiver },
    {
      $set: {
        notifications: true,
      },
    }
  );

  res.send("done");
}
