import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import jwt from "jsonwebtoken";
import { config } from "@dotenvx/dotenvx"; // Import dotenvx

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables FIRST
config({
  path: ".env.local.encrypted",
  overload: true,
});

console.log("=== ENV CHECK ===");
console.log("AUTH_USER:", process.env.AUTH_USER);
console.log("AUTH_PASS exists:", !!process.env.AUTH_PASS);
console.log("JWT_SECRET exists:", !!process.env.JWT_SECRET);
console.log("=================");

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Login API
app.post("/api/login", (req, res) => {
  if (!req.body || !req.body.password) {
    return res.status(400).json({
      success: false,
      error: "Payload missing or invalid Content-Type",
    });
  }

  const { username } = req.body;
  const incomingHash = req.body.password?.trim().toLowerCase();
  const storedHash = process.env.AUTH_PASS?.trim();
  const storedUser = process.env.AUTH_USER?.trim();
  const jwtSecret = process.env.JWT_SECRET;

  console.log("=== LOGIN DEBUG ===");
  console.log(`Incoming User: [${username}]`);
  console.log(`Stored User:   [${storedUser}]`);
  console.log(`Incoming Hash: [${incomingHash?.substring(0, 10)}...]`);
  console.log(`Stored Hash:   [${storedHash?.substring(0, 10)}...]`);
  console.log(
    `Match: ${username === storedUser && incomingHash === storedHash}`
  );
  console.log("===================");

  if (username === storedUser && incomingHash === storedHash) {
    const token = jwt.sign({ user: username }, jwtSecret, { expiresIn: "2h" });
    return res.status(200).json({ success: true, token });
  }
  return res
    .status(401)
    .json({ success: false, message: "Invalid credentials" });
});

// SPA Routing
app.use((req, res, next) => {
  if (req.path.startsWith("/api/")) return next();
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log("=".repeat(50));
  console.log(`✅ Server: http://localhost:${PORT}`);
  console.log(`✅ Also:   http://127.0.0.1:${PORT}`);
  console.log(`📁 Serving: ${path.join(__dirname, "public")}`);
  console.log("=".repeat(50));

  // Auto-open browser
  import("open")
    .then((open) => {
      open.default(`http://localhost:${PORT}`);
    })
    .catch(() => {
      console.log("Note: Could not auto-open browser");
    });
});


