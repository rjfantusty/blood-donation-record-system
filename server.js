require("dotenv").config();
const path = require("path");
const express = require("express");
const DbConnect = require("./dbConnect");
const ejsMate = require("ejs-mate");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
var session = require("express-session");
const app = express();

const donorRoutes = require("./routes/donorRoutes");
const bloodBankRoutes = require("./routes/bloodBankRoutes");
const adminRoutes = require("./routes/adminRoutes");

DbConnect();

app.use(cookieParser());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

const sessionConfig = {
  secret: "thisshouldbeasecret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};
app.use(session(sessionConfig));
app.use(flash());

app.use((req, res, next) => {
  res.locals.success = req.flash("success") ?? "";
  res.locals.error = req.flash("error") ?? "";
  next();
});

app.use("/donor", donorRoutes);
app.use("/blood-bank", bloodBankRoutes);
app.use("/admin", adminRoutes);

app.use("/", (req, res) => {
  res.render("index");
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Something Went Wrong!" } = err;
  console.log("in error hadler", status, message);
  if (!err.status) err.status = 500;
  if (!err.message) err.message = "Something Went Wrong";
  res.status(status).json({ error: err });
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
