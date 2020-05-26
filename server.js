const express = require("express");
const app = express();
const connectDB = require("./config/db");
const PORT = process.env.PORT || 5000;
//  connect to database
connectDB();

//  initialize middleware
app.use(express.json({ extened: false }));

//  connecting to the route
app.use("/api/users", require("./routes/api/users"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/auth", require("./routes/api/auth"));

//  listen to a port
app.get("/", (req, res) => res.send("API RUNNING"));

app.listen(PORT, () => {
  console.log(`server started on ${PORT}`);
});
