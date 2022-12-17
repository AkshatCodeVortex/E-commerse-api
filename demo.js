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
