import jwt from "jsonwebtoken";
function verifyToken(req, res, next) {
  const token = req.cookies.ChatToken;
  console.log("cokieee:");
  console.log(req.cookies.ChatToken);
  if (!token) {
    return res.status(401).json({ error: "Access denied" });
  }

  try {
    const decoded = jwt.verify(token, "CHATAPP");
    req.userId = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
}

export default verifyToken;
