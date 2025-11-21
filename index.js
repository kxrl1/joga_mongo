const express = require('express')
const mongodb = require('mongodb').MongoClient
const dotenv = require('dotenv')
const { connect } = require('http2')
dotenv.config()
const hbs = require ("express-handlebars")
const path = require("path")

const app = express()

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "hbs")
app.engine("hbs", hbs.engine({
    extname: "hbs",
    defaultLayout: "main",
    layoutsDir: __dirname + "/views/layouts/"
}))

connectToDB = async (connectionString)  => {
  try {
    const client = await mongodb.connect(connectionString);
    db = client.db();
    console.log("Connected to MongoDB");
    } catch (err) {
        console.error("Failed to connect to MongoDB", err);
    }
    return db;
}

const user = process.env.MONGO_USER
const password = process.env.MONGO_PASSWORD
const host = process.env.MONGO_HOST
const port = process.env.MONGO_PORT
const dbname = process.env.MONGO_DATABASE

let db, connectionString = 'mongodb://${user}:${password}@${host}:${port}/${dbname}';
db = connectToDB(connectionString);

app.listen(3012, async () => {
    console.log('Server is running on port 3012');
})