const template = (req, res) => {

    `<h3>Hello, ${req.body.first_name.toUpperCase()}</h3>
                <p>Thank you for signing up to our E-Learning App: POD.</p>
                <p>Below you can find your account details:</p>
                <ul>
                  <li>Email: ${req.body.email}</li>
                  <li>Password: ${req.body.password}</li>
                </ul>
                <p>Link to the Learning App: <a href="http://localhost:8000"></a></p>
                <h4>Happy Learning!</h4>
                <p>POD Learning App Support Team</p>`

}

module.exports = template