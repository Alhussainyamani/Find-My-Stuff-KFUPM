const nodemailer = require("nodemailer");

// Function to send email
const sendEmail = async ({ to, subject, text, html }) => {
    try {
        // Create a transporter object
        const transporter = nodemailer.createTransport({
        service: "gmail", // Use Gmail (can be changed based on your provider)
        auth: {
            user: process.env.EMAIL_USER, // Your email address
            pass: process.env.EMAIL_PASS, // Your email password or app-specific password
        },
        });

        // Define email options
        const mailOptions = {
        from: process.env.EMAIL_USER, // Sender email
        to, // Receiver email
        subject, // Email subject
        text, // Plain text body
        html, // HTML body (optional)
        };

        // Send the email
        const info = await transporter.sendMail(mailOptions);

        console.log(`Email sent: ${info.messageId}`);
        return info;
    } catch (error) {
        console.error(`Error sending email: ${error.message}`);
        throw error;
    }
};

module.exports = sendEmail;
