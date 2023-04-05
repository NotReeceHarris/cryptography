const aes_file = require('./standard-file')

const key = aes_file.genkey()

aes_file.encrypt(key, 'lorem.txt')
aes_file.decrypt(key, 'lorem.txt.enc')