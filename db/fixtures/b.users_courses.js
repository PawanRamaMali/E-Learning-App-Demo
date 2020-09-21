module.exports = [
    {
        "model": "Course",
        "data": {
            "course_name": "Test Course One",
            "subject" : "Computer Science",
            "user_id"     : 3, //instructor
            "createdAt": new Date().toISOString().slice(0, 19).replace('T', ' '),
            "updatedAt": new Date().toISOString().slice(0, 19).replace('T', ' '),
            "Users": [1,2]
        }
    },
    {
        "model": "Course",
        "data": {
            "course_name": "Test Course Two",
            "subject" : "Math",
            "user_id"     : 3, //instructor
            "createdAt": new Date().toISOString().slice(0, 19).replace('T', ' '),
            "updatedAt": new Date().toISOString().slice(0, 19).replace('T', ' '),
            "Users": [1]
        }
    },
    {
        "model": "Course",
        "data": {
            "course_name": "Test Course Three",
            "subject" : "Physics",
            "user_id"     : 3, //instructor
            "createdAt": new Date().toISOString().slice(0, 19).replace('T', ' '),
            "updatedAt": new Date().toISOString().slice(0, 19).replace('T', ' '),
            "Users": [2,4]
        }
    },
];