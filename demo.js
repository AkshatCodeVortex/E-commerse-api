// // // const SendOtp = require("sendotp");
// // // const sendOtp = new SendOtp("AuthKey");
// // // var express = require("express");
// // // var app = express();
// // const express = require("express");
// // const bodyparser = require("body-parser");
// // const nodemailer = require("nodemailer");
// // const path = require("path");
// // const exphbs = require("express-handlebars");

// // // sendOtp.send("9310641232", "PRIIND", function (error, data) {
// // //   console.log(data);
// // // });

// // // const PORT = process.env.PORT || 3000;

// // // app.listen(PORT, () => {
// // //   console.log(`app is live at ${PORT}`);
// // // });
// // // sendOtp.send("9310641232", "PRIIND", "4635", function (error, data) {
// // //   console.log(data);
// // // });

// // app.post("/send", function (req, res) {
// //   //   email = req.body.email;
// //   //   function generateOTP() {
// //   //     // Function to generate OTP
// //   //     var digits = "0123456789";
// //   //     let OTP = "";
// //   //     for (let i = 0; i < 4; i++) {
// //   //       OTP += digits[Math.floor(Math.random() * 10)];
// //   //     }
// //   //     return OTP;
// //   //   }
// //   //   var otp = generateOTP();

// //   // send mail with defined transport object
// //   var mailOptions = {
// //     to: "akshatv092@gmail.com",
// //     subject: "Otp for registration is: ",
// //     html:
// //       "<h3>OTP for account verification is </h3>" +
// //       "<h1 style='font-weight:bold;'>" +
// //       448738 +
// //       "</h1>", // html body
// //   };

// //   transporter.sendMail(mailOptions, (error, info) => {
// //     if (error) {
// //       return console.log(error);
// //     }
// //     console.log("Message sent: %s", info.messageId);
// //     console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

// //     res.render("otp");
// //   });
// // });

// // app.listen(4044);
// // console.log("Running on port 4044");
// var express = require("express");
// var path = require("path");
// var bodyParser = require("body-parser");
// const mongoose = require("mongoose");
// const { stringify } = require("querystring");
// var app = express();
// var MongoClient = require("mongodb").MongoClient;

// app.use(bodyParser.urlencoded({ extended: true }));

// // var dbUrl =
// //   "mongodb+srv://Akshat_Verma:akshat1234@cluster0.d4yimus.mongodb.net/";
// // var dbName = "ecommerce";
// mongoose.connect(
//   "mongodb+srv://Akshat_Verma:akshat1234@cluster0.d4yimus.mongodb.net/ecommerce",
//   { useNewUrlParser: true },
//   { useUnifiedTopology: true }
// );

// const detail = {
//   name: String,
//   email: String,
// };

// const data = mongoose.model("data", detail);

// app.get("/", function (req, res) {
//   res.sendFile(__dirname + "/index.html");
//   console.log("web page");
// });

// app.post("/", function (req, res) {
//   let newdata = new data({
//     name: req.body.name,
//     email: req.body.email,
//   });
//   newdata.save();
//   res.redirect("/");
// });
// app.listen(4044);
// console.log("Running on port 4044");

var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "akshatv092@gmail.com",
    pass: "akshatV@123",
  },
});

var mailOptions = {
  from: "akshatv092@gmail.com",
  to: "akshat.cse21@satyug.edu.in",
  subject: "Sending email using nodejs",
  text: `hello this is my first mail from node js`,
};

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log("Email sent: " + info.response);
  }
});

let configOptions = {
  host: "1.2.3.4",
  port: 465,
  secure: true,
  tls: {
    // must provide server name, otherwise TLS certificate check will fail
    servername: "example.com",
  },
};
