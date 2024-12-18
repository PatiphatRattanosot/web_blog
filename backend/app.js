require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const postRoutes = require("./routes/post.route");
const userRoutes = require("./routes/user.route");

const app = express();

const FRONTEND_URL = process.env.FRONTEND_URL
const corsOptions = {
    origin: FRONTEND_URL,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);

const path = require("path");

app.use(express.static(path.join(__dirname, "public")));

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("Database connection error:", error));



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
