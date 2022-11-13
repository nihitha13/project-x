const port = process.env.PORT || 4000;
const express = require('express');
var bodyParser = require('body-parser');
const app = express();
app.use(express.static('public'));
var nodemailer = require('nodemailer');


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

const dotenv = require('dotenv');
dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = require('twilio')(accountSid, authToken);



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://projectx:1234@projectx.n53lkfe.mongodb.net/?retryWrites=true&w=majority";

const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var SchemaTypes = mongoose.SchemaTypes;

try {
    // Connect to the MongoDB cluster
     mongoose.connect(
      uri,
      { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 },
      () => console.log("Mongoose is connected")
    );

  } catch (e) {
    console.log("could not connect");
  }

con = mongoose.connection;

var UserSchema = new Schema({
    email: { type: String },
    username: { type: String },
    org: { type: SchemaTypes.ObjectId, ref: "organizations" }
})

var OrgSchema = new Schema({
    name: { type: String },
    email: { type: String },
    active: { type: Boolean }
})

var GroupSchema = new Schema({
    user_id: { type: SchemaTypes.ObjectId, ref: "users" },
    group_name: { type: String },
    active: { type: Boolean }
})

var ContactSchema = new Schema({
    group_id: { type: SchemaTypes.ObjectId, ref: "groups"},
    name: { type: String },
    phonenum: {type: String},
    email: { type: String }
});

var IncidentSchema = new Schema({
    user_id: { type: SchemaTypes.ObjectId, ref: "users" },
    active: { type: Boolean },
    location: {
        latitude: { type: String },
        longitude: { type: String }
    },
    timestamp: {type: Date},
    type: {type: String},
    audio_id : { type: SchemaTypes.ObjectId, ref: "audios" },
});


var UserModel = mongoose.model('users', UserSchema);
var OrgModel = mongoose.model('organizations', OrgSchema);
var GroupModel = mongoose.model('groups', GroupSchema);
var ContactModel = mongoose.model('contacts', ContactSchema);
var IncidentModel = mongoose.model('incidents', IncidentSchema);



app.post('/sendsos', async (req, res) => {
    
    console.log(req.body);
    let user_email = req.body.email;
    let location = req.body.location;
    let timestamp = req.body.timestamp;
    if(!user_email){
        res.status(404).send("")
    }
    let user = await UserModel.findOne({email: user_email});
    let userid = user._id;
    let username = user.username;
    let Incident = {
        user_id: userid,
        location: location,
        active: true,
        timestamp: timestamp,
        type: "Other"
    }
    Incident = await IncidentModel.create(Incident);
    let orgid = user.org;
    // console.log(orgid)

    let org = await OrgModel.findById(orgid);
    console.log(org)

    let groups = await GroupModel.find();
    console.log(groups)
    let contact_emails = [];
    let contact_phones = []
    for(let i = 0; i < groups.length; i++){
        let contacts = await ContactModel.find({group_id: groups[i]._id})
        for(let j = 0; j < contacts.length; j++){
            contact_emails.push(contacts[j].email);
            contact_phones.push(contacts[j].phonenum);
        }
    }

    console.log(contact_emails)
    console.log(contact_phones)

   
    console.log(accountSid)
    console.log(authToken)


    let maps_url = `https://maps.google.com/?q=${location.latitude},${location.longitude}`

    let sms_body = `\n Emergency alert! Looks like ${username} is in danger. They are last located at this location: ${maps_url}. Please take action to help them immediately. Please note you are receiving this message as you are added as an emergency contact by ${username}.`

    console.log(sms_body)

    // twilioClient.messages 
    // .create({body: sms_body, from: '+14793832726', to: '+15408248711'})
    // .then(message => console.log(message.sid));

    // var transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //       user: 'youremail@gmail.com',
    //       pass: 'yourpassword'
    //     }
    // });
      
    // var mailOptions = {
    //     from: 'youremail@gmail.com',
    //     to: 'myfriend@yahoo.com',
    //     subject: 'Sending Email using Node.js',
    //     text: 'That was easy!'
    // };
      
    // transporter.sendMail(mailOptions, function(error, info){
    //     if (error) {
    //       console.log(error);
    //     }else {
    //       console.log('Email sent: ' + info.response);
    //     }
    // });

    console.log(Incident._id)

    res.status(200).send({incident_id: Incident._id});
});

app.post('/marksafe', async (req, res) => {
    console.log(req.body)

    let incident_id = req.body.incident_id;
    let email = req.body.email;
    let user = await UserModel.findOne({email: email});
    let userid = user._id;
    let username = user.username;

    const filter = { _id: incident_id};
    const update = { active: false };

    let incident = await IncidentModel.findOneAndUpdate(filter, update);

    let sms_body = `\n Emergency alert! Looks like ${username} marked themself as SAFE now. Contact them to assess the situation. Please note you are receiving this message as you are added as an emergency contact by ${username}.`

    console.log(sms_body)

    res.status(200).send({})

    // twilioClient.messages 
    // .create({body: sms_body, from: '+14793832726', to: '+15408248711'})
    // .then(message => console.log(message.sid));

})


// var user = new UserModel({
//     email: "abc@vt.edu",
//     username: "John",
//     org: ""
// })
// user.save((err, result) => {
//     console.log(result)
//     if (err) {
//         console.log(err);
//         // res.status(500).send(err);
//     }
//     else {
//         console.log('success')
//     }
// });


// app.listen(port, () => console.log(`Listening on port ${port}`));