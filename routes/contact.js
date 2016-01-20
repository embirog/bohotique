var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

// Show Contact Form
router.get('/', function(req, res, next) {
  res.render('contact', { title: 'Contact' });
});

// Send Email
router.post('/send', function(req, res, next) {
	// Send Email
	var options = {
	    service: 'gmail',
	    auth: {
	        user: 'bohotiquefasion@gmail.com',
	        pass: 'Trips001'
	    }
	};
	var transporter = nodemailer.createTransport(smtpTransport(options));


  // setup e-mail data with unicode symbols
	var mailOptions = {
	    from: 'Ed Birog <bohotiquefasion@gmail.com>', // sender address
	    to: 'ed.mil.birog@gmail.com', // list of receivers
	    subject: 'Website Submission',
	    // Plain Text Version
	    text: 'You have a new submission with the following details... Name: '+req.body.name +'Email: '+req.body.email +'Message: '+req.body.message,
	    // HTML Version
	    html: '<p>You got a website submission with the following details...</p><ul><li>Name: <b>'+req.body.name+'</b></li><li>Email: <b>'+req.body.email+'</b></li><li>Message: <b>'+req.body.message+'</b></li></ul>'
	};


  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, response){
      if(error){
          console.log(error);
          res.redirect('/');
      }else{
          console.log("Message sent: " + response.message);
          res.redirect('/contact');
      }

      // if you don't want to use this transport object anymore, uncomment following line
       transporter.close(); // shut down the connection pool, no more messages
  });

});	
module.exports = router;