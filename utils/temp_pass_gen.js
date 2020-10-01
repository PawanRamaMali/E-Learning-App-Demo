const getTempPassword = () => {
    const arrUpperChar  = "ABCDEFGHIJKLMNOPQRSTUVWXTZ";
    const arrLowerCase  = "abcdefghiklmnopqrstuvwxyz";
    const arrNum	   = "0123456789";
    const arrSpecial = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
    const pswdSrc    = arrUpperChar + arrLowerCase + arrNum + arrSpecial;

    let randomPass = "";
    for (let i = 0; i < 10; i++) {
        let ranChar = Math.floor(Math.random() * pswdSrc.length);
        randomPass += pswdSrc.substring(ranChar,ranChar + 1);
    }
}

module.exports = getTempPassword;