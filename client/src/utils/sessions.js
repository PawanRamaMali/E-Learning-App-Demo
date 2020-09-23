//helper functions for local storage operations
//with login sessions.
export const createSession = (authObj) => {
    //create timestamp for session info
    const ts = ~~(Date.now() / 1000);
    //add timestamp into authObject
    authObj["ts"] = authObj["ts"] || ts;
    //send authObj to localStorage
    localStorage.setItem("__session", JSON.stringify(authObj));
    console.log("localStorage DONE");
}
