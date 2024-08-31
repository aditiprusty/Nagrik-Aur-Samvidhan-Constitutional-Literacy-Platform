const express = require("express");
const session = require("express-session");
const connectDB = require("./config/db");
const authRoutes = require("./authentication/auth");
require("dotenv").config();
const User = require("./models/User");
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Session Middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// Set view engine
app.set("view engine", "ejs");

// Auth Routes
app.use("/auth", authRoutes);

// Home Route
app.get("/", (req, res) => {
  res.render("landingpage.ejs");
});

app.get("/home", (req, res) => {
  if (req.session.user) {
    res.render("home", { user: req.session.user });
  } else {
    res.redirect("/auth/signin");
  }
});

// Game Routes (Inline)
app.get("/snake-ladder", (req, res) => {
  if (req.session.user) {
    res.render("SnakeAndLadder.ejs", { user: req.session.user });
  } else {
    res.redirect("/auth/signin");
  }
});
app.get("/hangman", (req, res) => {
  if (req.session.user) {
    res.render("HangMan.ejs", { user: req.session.user });
  } else {
    res.redirect("/auth/signin");
  }
});
app.get("/quiz", (req, res) => {
  if (req.session.user) {
    res.render("Quiz.ejs", { user: req.session.user });
  } else {
    res.redirect("/auth/signin");
  }
});
app.get("/spinwheel", (req, res) => {
  if (req.session.user) {
    res.render("SpinWheel.ejs", { user: req.session.user });
  } else {
    res.redirect("/auth/signin");
  }
});
app.get("/scenario", (req, res) => {
  if (req.session.user) {
    res.render("Scenario.ejs", { user: req.session.user });
  } else {
    res.redirect("/auth/signin");
  }
});

app.get("/auth/signin", (req, res) => {
  res.render("signin");
});

app.get("/auth/signup", (req, res) => {
  res.render("signup");
});

app.post("/update-score", async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const user = await User.findById(req.session.user.uid);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.score += req.body.score;
    await user.save();

    res.status(200).json({ message: "Score updated successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error updating score: " + error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
