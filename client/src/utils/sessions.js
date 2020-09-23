//helper functions for local storage operations
//with login sessions.
//---------------------------------------------

//creating session after successful login
export const createSession = (authObj) => {
    //check if __session exist
    //const __session = localStorage.getItem("__session") || "";
    if(localStorage.getItem("__session")) {localStorage.removeItem("__session")};
    //create timestamp for session info
    const ts = ~~(Date.now() / 1000);
    //add timestamp into authObject
    authObj["ts"] = authObj["ts"] || ts;
    //send authObj to localStorage
    localStorage.setItem("__session", JSON.stringify(authObj));
    console.log("__session created");
}

//destroy __session from localStorage on logout
export const destroySession = () => {
    //remove __session from localStorage
    localStorage.removeItem("__session");
    console.log("__session eliminated");
}

//validating session if exist
export const validateSession = () => {
    //check if __session exist
    //if exists, validate timestamp.
    if(localStorage.getItem("__session")){
        const __session = JSON.parse(localStorage.getItem("__session"));
        //calculate difference in Hrs
        const tsDiffHrs = ((~~(Date.now() / 1000)) - __session.ts) / 3600;
        if(tsDiffHrs >= process.env.SESSION_LENGTH) return false;
        return true;
    }
    else{
        return false;
    }
}