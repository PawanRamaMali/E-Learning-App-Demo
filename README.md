# elearn E-Learning-App-Demo App

![MIT](https://img.shields.io/static/v1?label=License&message=MIT&color=green)

## Description

elearn is a virtual learning solution that enables instructors and students to engage with course content online.

elearn allows instructors to login to a secure portal where they can upload course content, add and manage their student roster. Students can then login to the student portal to view courses and associated content.

## Table of Content

- [User Story](#User-Story)
- [Installation](#Installation)
- [Usage](#Usage)
- [Technologies-Used](#Technologies-Used)
- [Contributing](#Contributing)
- [Tests](#Tests)
- [License](#License)
- [Questions](#Questions)

## User-Story

- INSTRUCTOR:
  Due to COVID-19, my classrooms will transition to a virtual format.
  As an instructor, I want a platform that allows me to move my student roster, courses and course content online
  As an instructor, I want the ability to sign up and identify all the topics I will be teaching
  As an instructor, I want the ability to enroll students in my class and send them a verification email once completed
  When I upload course videos to my instructor portal, then the videos are available to students in the student portal
  When I need to communicate with students, I want the ability to send an email via the instructor portal

- STUDENT:
  Due to COVID-19, my courses will transition to a virtual format.
  As a student, I want a secure platform that allows me to view my courses and course content online
  As a student, I want to receive an account activation link from my instructor that leads me to the student portal login
  When the instructor uploads course videos, then the videos are available to me in the student portal
  When I need to communicate with the instructor, I want the ability to send an email via the student portal

## Installation

For development:

1. Clone Repo
2. Change Directory to the App root folder and execute npm install. This will install Backend dependencies.
3. Once completed, create a .env.dev file with the following information:

```
APP_ENV=development
APP_NAME=elearn E-Learning-App-Demo
DB_HOST= --your mysql host--
DB_USER= --your mysql user--
DB_PASS= --your mysql pass--
DB_NAME=elearn_DB
SQL_DIALECT=mysql
SECRET= -- add a secret keyword for JasonWebToken --
EMAIL_PASS= -- Contact Repo Admin to get a testing password --
```

4. Create elearn DB database.
5. Change Directory to /client. Client contains frontend react app.
6. Run npm install inside client to get frontend dependencies.
7. In development, both the express backend and the react frontend have to be started to run the full app. In the app root folder, execute npm start (or npm run dev to use nodemon).
8. Then in another terminal, move to the client folder and execute npm start.
9. Browse the app.

## Usage

In development: Backend Express app will run on http://localhost:8000 by default.
Frontend React app will run on http://localhost:3000 by default.

Screencaps:
-- Coming soon!

App live link:
-- Coming soon!

## Technologies-Used

Front End

- React (React Router, React DOM, Redux)
- JSX
- CSS3
- JavaScript
- Foundation

Back End

- MySQL
- Sequelize
- Sequelize-Fixtures
- Express
- Node.js
- Nodemailer
- JWT
- Bcryptjs
- Passport

## Tests

Testing is not integrated at the moment.

## License

MIT


