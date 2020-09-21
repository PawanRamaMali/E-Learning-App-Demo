//user controller assist on redirecting authenticated user to
//their dashboards/portals
//=============================================================

//only two user portals for now:
// STUDENT PORTAL
exports.studentPortal = (req, res) => {
    //TODO: placeholder for Student view
    res.status(200).send("Welcome Student!");
}

// INSTRUCTOR PORTAL
exports.instructorPortal = (req, res) => {
    //TODO: placeholder for instructor view
    res.status(200).send("Welcome Instructor!");
}