module.exports = [
    {
        "model": "User",
        "data": {
            "first_name": "JOHN",
            "last_name" : "DOE",
            "email"     : "johnnydoe@email.com",
            "password"  : "$2y$12$x9mbOD2eawDl9k77cJuiBuRsyKJmmLENjBDmE8kfm22Whbntlvuh6", //12345
            "confirmed" : 0,
            "createdAt": new Date().toISOString().slice(0, 19).replace('T', ' '),
            "updatedAt": new Date().toISOString().slice(0, 19).replace('T', ' '),
        }
    },
    {
        "model": "User",
        "data": {
            "first_name": "JANE",
            "last_name" : "DOE",
            "email"     : "janiedoe@email.com",
            "password"  : "$2y$12$yXAg7i0fg608ljJSjpzAwePr70hwNXdsgqsik.SRZC.7Kfdd3NddG", //janepass
            "confirmed" : 1,
            "createdAt": new Date().toISOString().slice(0, 19).replace('T', ' '),
            "updatedAt": new Date().toISOString().slice(0, 19).replace('T', ' '),
        },
    },
    {
        "model": "User",
        "data": {
            "first_name": "PAUL",
            "last_name" : "MARTIN",
            "email"     : "paulie@email.com",
            "password"  : "$2y$12$KsiO1sXqttOyaZchQAfqbeO8ueFjgyguxC6r5NLlJeJwmPxW4U4mq", //pauliepass
            "confirmed" : 0,
            "createdAt": new Date().toISOString().slice(0, 19).replace('T', ' '),
            "updatedAt": new Date().toISOString().slice(0, 19).replace('T', ' '),
        }
    },
    {
        "model": "User",
        "data": {
            "first_name": "CHUCK",
            "last_name" : "BARTOWSKY",
            "email"     : "chuckb@email.com",
            "password"  : "$2y$12$R9xeB6HbpZVXzgelvpwO3e6JVX3/bxEthXaofUTXhkHuSG9ZdZS76", //chuck
            "confirmed" : 1,
            "createdAt": new Date().toISOString().slice(0, 19).replace('T', ' '),
            "updatedAt": new Date().toISOString().slice(0, 19).replace('T', ' '),
        }
    },
    {
        "model": "User",
        "data": {
            "first_name": "Admin_name",
            "last_name" : "Admin_Lname",
            "email"     : "admin@email.com",
            "password"  : "$2y$12$x9mbOD2eawDl9k77cJuiBuRsyKJmmLENjBDmE8kfm22Whbntlvuh6", //12345
            "confirmed" : 1,
            "createdAt": new Date().toISOString().slice(0, 19).replace('T', ' '),
            "updatedAt": new Date().toISOString().slice(0, 19).replace('T', ' '),
        }
    },
    {
        "model": "Role",
        "data": {
            "name": "STUDENT",
            "createdAt": new Date().toISOString().slice(0, 19).replace('T', ' '),
            "updatedAt": new Date().toISOString().slice(0, 19).replace('T', ' '),
            "Users": [1, 2, 4]
        }
    },
    {
        "model": "Role",
        "data": {
            "name": "INSTRUCTOR",
            "createdAt": new Date().toISOString().slice(0, 19).replace('T', ' '),
            "updatedAt": new Date().toISOString().slice(0, 19).replace('T', ' '),
            "Users": [3]
        }
    },
    {
        "model": "Role",
        "data": {
            "name": "ADMIN",
            "createdAt": new Date().toISOString().slice(0, 19).replace('T', ' '),
            "updatedAt": new Date().toISOString().slice(0, 19).replace('T', ' '),
            "Users": [5]
        }
    }
];