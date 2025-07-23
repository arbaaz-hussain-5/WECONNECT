import ImageKit from "imagekit";
import { connectBase } from "../../database/get_database.js";
export default async function uploadToServer(req, res) {
  //   if (req.userId !== req.tuser) {
  //     return res.status(401).send("Unauthorized: Invalid Authorization header");
  //   }
  const data_base = (connectBase()).db("CHAT-BASE");
  const users = data_base.collection("users");
  
  console.log(req.file.originalname);
  console.log(res.tuser)
  const imagekit = new ImageKit({
    publicKey: "public_Bi3Fw1/CfxW4qBaauJOLkP2CQl0=",
    privateKey: "private_uiPRQ2KYn7aYm28vqTyqlQwcNUA=",
    urlEndpoint: "https://ik.imagekit.io/arbaazhussain",
  });

  imagekit
    .upload({
      file: req.file.buffer,
      fileName: req.file.originalname,
    })
    .then(async (response) => {
      console.log(response.url);
      await users.updateOne(
        { user_id: req.userId },
        {
          $set: { profile_pic: response.url },
        }
      )
       res.send(response.url);;
    })
    .catch((error) => {
      console.log(error);
      res.send("something went wrong");
    });
}
