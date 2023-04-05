const fs = require('fs');
const crypto = require('crypto');

const checksum = (file) => {
      const fileBuffer = fs.readFileSync(file);
      return crypto
        .createHash('md5')
        .update(fileBuffer, 'utf8')
        .digest('hex');
}

const genkey = () => {
    return crypto.randomBytes(32).toString('base64')
}

const encrypt = (key, file) => {
    key = Buffer.from(key, 'base64')
    const iv = crypto.randomBytes(16);
    const fileBuffer = fs.readFileSync(file);
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    const encryptedBuffer = Buffer.concat([cipher.update(fileBuffer), cipher.final()]);
    fs.writeFileSync(file + '.enc', Buffer.concat([iv, encryptedBuffer]));
    fs.unlinkSync(file)
}

const decrypt = (key, file) => {
    key = Buffer.from(key, 'base64')
    const encryptedBuffer = fs.readFileSync(file);
    const iv = encryptedBuffer.slice(0, 16);
    const data = encryptedBuffer.slice(16);
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    const decryptedBuffer = Buffer.concat([decipher.update(data), decipher.final()]);
    fs.writeFileSync(file.endsWith('.enc') ? file.slice(0, -4) : file, decryptedBuffer);
    fs.unlinkSync(file)
}

if (require.main === module) {
    let action, filePath, key;

    if (process.argv[2] != null) {
        action = process.argv[2]
    } else {
        throw new Error('Action cannot be null')
    }

    if (process.argv[3] != null) {
        filePath = process.argv[3]
    } else if (process.argv[2] != 'genkey') {
        throw new Error('filePath cannot be null')
    }

    if (process.argv[4] != null && process.argv[2] != 'genkey') {
        key = process.argv[4]
    } else if (process.argv[2] != 'genkey') {
        throw new Error('key cannot be null')
    }

    switch (action) {
        case "encrypt":
            encrypt(key, filePath)
            console.log('File encrypted successfully.');
            break;
        case "decrypt":
            decrypt(key, filePath)
            console.log('File decrypted successfully.');
            break;
        case "genkey":
            console.log(genkey())
            break;
        default:
            console.error('You have to supply the action [encrypt, decrypt, genkey]')
            break;
    }
}


module.exports = {checksum, encrypt, decrypt, genkey};