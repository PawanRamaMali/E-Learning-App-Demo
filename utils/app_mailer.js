const nodemailer = require("nodemailer"); //pkg for sending emails.

//Sender Options
const senderOptions = {
    UserRegistration: {
                        from: "\"elearn E-Learning-App-Demo\" <test@nxtlevelbeauty.com>",
                        subject: "Welcome to elearn E-Learning-App-Demo",
                    }
}

//NODE MAILER SECTION
//===========================
const mailSender = async (destEmailAdd, htmlTemplate) => {
    return new Promise((resolve, reject) => {
        // create reusable transporter object using the SMTP transport
        let transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: true, 
            auth: {
                user: process.env.EMAIL_USER, // user
                pass: process.env.EMAIL_PASS || config.development.secret, // password
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        //setup email data
        let mailOptions = {
            from: senderOptions.UserRegistration.from, // sender address
            to: destEmailAdd, // list of receivers
            subject: senderOptions.UserRegistration.subject, // Subject line
            text: "Welcome to elearn E-Learning-App-Demo", // plain text body
            html: htmlTemplate, // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if(error){
                resolve({sent: false, sendErr: true, msg: error});     
            }
            resolve({sent: true, sendErr: false, msg: info.messageId});
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        });
    })
}

module.exports = mailSender;
