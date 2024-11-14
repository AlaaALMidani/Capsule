const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./models/db");
const mongoose = require("mongoose");
app.use(cors());
const fs = require("fs");
const path = require("path");

const uploadsDir = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

//routes
const usersRoutes = require("./routes/usersRoute");
const adminRoutes = require("./routes/adminRoute");
const orderRoutes = require("./routes/orderRoute");
const postRoutes = require("./routes/postRoute");
const offerRoutes = require("./routes/offerRoute");

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/orders", orderRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/offers", offerRoutes);
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

const port = 3002;
const host = "http://localhost:";

db.connect()
  .then(async () => {
    app.listen(port, () => {
      console.log(`Server listening on ${host}${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to start server:", err);
    process.exit(1); // Exit with an error code
  });
