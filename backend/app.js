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
//Public
app.use("/uploads", express.static(__dirname + "/uploads"))

app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);

const path = require("path");

app.use(express.static(path.join(__dirname, "public")));

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("Database connection error:", error));


app.get("/", (req, res) => {
    res.send(`
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>API for Web Blog</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                background-color: #f4f7fc;
                margin: 0;
                padding: 0;
                color: #333;
              }
              header {
                background-color: #4CAF50;
                color: white;
                text-align: center;
                padding: 20px;
              }
              h1 {
                font-size: 2.5em;
                margin: 0;
              }
              main {
                padding: 20px;
                text-align: center;
              }
              p {
                font-size: 1.2em;
                margin: 10px 0;
              }
              footer {
                background-color: #333;
                color: white;
                text-align: center;
                padding: 10px;
                position: fixed;
                bottom: 0;
                width: 100%;
              }
              a {
                color: #4CAF50;
                text-decoration: none;
              }
              a:hover {
                text-decoration: underline;
              }
            </style>
          </head>
          <body>
            <header>
              <h1>Welcome to the API for Web Blog</h1>
            </header>
            <main>
              <p>This API provides the backend services for a simple web blog application.</p>
              </main>
            <footer>
              <p>&copy; 2025 Web Blog API. Create by Patiphat Rattanosot.</p>
            </footer>
          </body>
          </html>
        `);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
