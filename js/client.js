const CryptoJS = require('crypto-js');

var encryptWithAES = (text) => {
    let passphrase = "12354";
    return CryptoJS.AES.encrypt(text, passphrase).toString();
};
var decryptWithAES = (ciphertext) => {
    let passphrase = "12354";
    let bytes = CryptoJS.AES.decrypt(ciphertext, passphrase);
    let originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
};
var encrypt = (texts) => {
    texts = encryptWithAES(texts);
    return texts;
};
var decrypt = (texts) =>{
    texts = decryptWithAES(texts);
    return texts;
};

