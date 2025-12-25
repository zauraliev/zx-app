import jwt from "jsonwebtoken";

export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { username, password } = req.body;

  // For debugging
  console.log("ENV_USER:", process.env.AUTH_USER);
  console.log("ENV_PASS:", process.env.AUTH_PASS);
  console.log("REQ BODY:", req.body);

  if (
    username === process.env.AUTH_USER &&
    password === process.env.AUTH_PASS
  ) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.status(200).json({ success: true, token });
  }

  return res.status(401).json({ success: false });
}

