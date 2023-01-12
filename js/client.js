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

console.log(encrypt("hii, how are you doing my friend?? i hope that you are absolutely fine, i am also doing great thank you"));

console.log(decrypt("U2FsdGVkX1/0BC68oYXN/ON2LyAz3BoILN16as48CwnzMNSo9YKy0ySgm9fI4agh69W522YsO2HEn5zg/nNdoEe1gE0u8rSNhwbbRnvzTYKKEZrw/q29lXqKHiXo8mYKzyL31aHRSDsKkVQCUHWmR13FXXYwq9WRo7v1Jdm5hak="));

