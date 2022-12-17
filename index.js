var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var router = express.Router();
const { v4: uuidv4 } = require("uuid");
var MongoClient = require("mongodb").MongoClient;
app.use(bodyParser.json());
const mongoose = require("mongoose");
app.use(bodyParser.urlencoded({ extended: true }));
var dbUrl =
  "mongodb+srv://Akshat_Verma:akshat1234@cluster0.d4yimus.mongodb.net/";
var dbName = "ecommerce";

// Use connect method to connect to the server
MongoClient.connect(dbUrl, function (err, client) {
  async function run() {
    try {
      await client.connect();

      console.log("MongoDB Connected successfully to server");
    } catch (err) {
      console.log(err.stack);
    } finally {
      await client.close();
    }
  }
  const db = client.db(dbName);
  app.locals.db = db;
});

//HOW TO CREATE AN SIMPLE GET API...
// router.get("/demo", function (req, res) {
//   res.json("DEMO API TEST");
//   console.log("/demo api hit");
// });

//API FOR CKECK THE VERSION...
// app.get("/checkversion/:version", (req, res) => {
//   var version = req.params.version;
//   var condition;
//   if (version >= 3) {
//     condition = false;
//   } else {
//     condition = true;
//   }
//   res.json({ version: version, newversionavaible: condition });
// });

app.get("/register", function (req, res) {
  res.sendFile(__dirname + "/index.html");
  // console.log("web page");
});

// API FOR THE REGISTER///...
app.post("/register", (req, res) => {
  var name = req.body.name; //GET THE DATA FROM BODY
  var email = req.body.email;
  const db = req.app.locals.db;
  const collection = db.collection("otp");

  function generateOTP() {
    // Function to generate OTP
    var digits = "0123456789";
    let OTP = "";
    for (let i = 0; i < 4; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  }
  var newotp = generateOTP();

  collection
    .find({ email: email })
    .limit(1)
    .sort({ _id: -1 })
    .toArray(function (err, result) {
      if (err) {
        console.log(err);
      } else if (result.length) {
        ////////update otp start//////////
        collection.findAndModify(
          { email: email }, // query
          [], // sort order
          { $set: { otp: newotp } }, // replacement, replaces only the field "hi"
          {}, // options
          function (err, object) {}
        );
        ///////update otp close///////////
      } else {
        /////////insert new data start here////////
        var data2 = { name: name, email: email, otp: newotp };

        collection.insert(data2, { w: 1 }, function (err, result) {
          if (err) {
            res.end("Registration Error1");
            console.warn(err.message); // returns error if no matching object found
          } else {
          }
        });
        ///////// insert new data close///////////
      }
    });

  res.json({
    email: email,
    name: name,
    register: true,
    msg: "Register sucessfull",
  });
});
// API FOR THE REGISTER///...

//API FOR THE OTP CHECKER///...
app.post("/otpverify", (req, res) => {
  var email = req.body.email;
  var otp = req.body.otp;
  const db = req.app.locals.db;
  const collection = db.collection("otp");
  const collection2 = db.collection("user");
  var uid = uuidv4();
  collection
    .find({ email: email, otp: otp })
    .limit(1)
    .sort({ _id: -1 })
    .toArray(function (err, result) {
      if (err) {
        console.log(err);
      } else if (result.length) {
        var name = String(result[0]["name"]);
        var data2 = { name: name, email: email, akey: uid };

        collection2.insert(data2, { w: 1 }, function (err, result) {
          if (err) {
            res.end("Registration Error1");
            console.warn(err.message); // returns error if no matching object found
          } else {
          }
        });
        res.json({ email: email, otpverify: true, msg: "login sucessfull" });
      } else {
        res.json({ email: email, otpverify: false, msg: "login failed" });
      }
    });
});
//API FOR THE OTP CHECKER//...

////identify the user////
app.get("/productlist", (req, res) => {
  res.json({ result: true, msg: "product list" });
});

app.get("/user/:key", (req, res) => {
  const db = req.app.locals.db;
  var key = req.params.key;

  const collection = db.collection("user");
  collection
    .find({ akey: key })
    .limit(1)
    .sort({ _id: -1 })
    .toArray(function (err, result2) {
      if (err) {
        console.log(err);
      } else if (result2.length) {
        collection
          .find({})
          .sort({ _id: -1 })
          .toArray(function (err, result) {
            if (err) {
              console.log(err);
            } else if (result.length) {
              res.json({ result: true, data: result });
            } else {
              res.json({ result: false, data: [] });
            }
          });
      } else {
        res.json({ result: false, msg: "you are not authorized", data: [] });
      }
    });
});
////identify the user////

app.get("/products/:key", (req, res) => {
  const db = req.app.locals.db;
  var key = req.params.key;

  const collection = db.collection("user");
  const collectionB = db.collection("products");
  collection
    .find({ akey: key })
    .limit(1)
    .sort({ _id: -1 })
    .toArray(function (err, result2) {
      if (err) {
        console.log(err);
      } else if (result2.length) {
        collectionB
          .find({})
          .sort({ _id: -1 })
          .toArray(function (err, result) {
            if (err) {
              console.log(err);
            } else if (result.length) {
              res.json({ result: true, data: result });
            } else {
              res.json({ result: false, data: [] });
            }
          });
      } else {
        res.json({ result: false, msg: "you are not authorized", data: [] });
      }
    });
});

// add the products...
app.post("/addproduct", (req, res) => {
  const db = req.app.locals.db;
  var name = req.body.name;
  var price = req.body.price;
  var img = req.body.img;
  var desc = req.body.desc;
  var discount = req.body.discount;
  var pid = Math.floor(Math.random() * 900000) + 1000;

  const collectionB = db.collection("products");

  var data2 = {
    pid: pid,
    name: name,
    price: price,
    img: img,
    desc: desc,
    discount: discount,
  };
  collectionB.insert(data2, { w: 1 }, function (err, result) {
    if (err) {
      res.end("Registration Error1");
      console.warn(err.message); // returns error if no matching object found
    } else {
    }
  });
  res.json({ result: true, msg: "PRODUCT ADD SUCCESSFULLY" });
});
// add the products...

// send the otp to email//

app.post("/send", function (req, res) {
  email = req.body.email;
  function generateOTP() {
    // Function to generate OTP
    var digits = "0123456789";
    let OTP = "";
    for (let i = 0; i < 4; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  }
  var otp = generateOTP();

  // send mail with defined transport object
  var mailOptions = {
    to: req.body.email,
    subject: "Otp for registration is: ",
    html:
      "<h3>OTP for account verification is </h3>" +
      "<h1 style='font-weight:bold;'>" +
      otp +
      "</h1>", // html body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    res.render("otp");
  });
});

//HOW TO GENRATE THE LOCALHOST
app.listen(4044);
console.log("Running on port 4044");
