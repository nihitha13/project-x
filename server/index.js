const port = process.env.PORT || 4000;
const express = require('express');
var bodyParser = require('body-parser');
const app = express();
app.use(express.static('public'));


app.listen(port, () => console.log(`Listening on port ${port}`));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS,DELETE,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}
);


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://projectx:1234@projectx.n53lkfe.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("projectx").collection("users");
//   // perform actions on the collection object
//   client.close();
// });

const mongoose = require('mongoose');
var Schema = mongoose.Schema;

try {
    // Connect to the MongoDB cluster
     mongoose.connect(
      uri,
      { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 },
      () => console.log(" Mongoose is connected")
    );

  } catch (e) {
    console.log("could not connect");
  }

// mongoose.connect("mongodb://localhost/wannabe", function (err) {
//     if (err) throw err;
//     console.log('connected to db');
// });

con = mongoose.connection;

var UserSchema = new Schema({
    email: { type: String },
    username: { type: String }
})

var UserModel = mongoose.model('user', UserSchema);

var user = new UserModel({
    email: "abc@vt.edu",
    username: "John"
})
user.save((err, result) => {
    console.log(result)
    if (err) {
        console.log(err);
        // res.status(500).send(err);
    }
    else {
        console.log('success')
    }
});


// app.listen(port, () => console.log(`Listening on port ${port}`));