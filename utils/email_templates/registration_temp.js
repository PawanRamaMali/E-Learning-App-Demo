//registration template HTML
const sendTemplateHTML = (emailData) => {
    return `
        <h3>Hello, ${emailData.first_name.toUpperCase()}</h3>
        <p>One of your Instructors has created an account for our E-Learning-App-Demo App: elearn.</p>
        <p>Below you can find your account details:</p>
        <ul>
            <li>Username: ${emailData.email}</li>
            <li>Set your password: ${process.env.DOMAIN}/user/auth/set-password?token=${emailData.token}</li>
        </ul>
        <p>Link to the Learning App: <a href="${process.env.DOMAIN}">elearn E-Learning-App-Demo</a></p>
        <h4>Happy Learning!</h4>
        <p>elearn Learning App Support Team</p>
    `;
}

module.exports = sendTemplateHTML;