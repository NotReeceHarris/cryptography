
## AES file encyption

### CLI
```shell
# Encrypt
npm run encrypt lorem.txt geJ82NPijk5qld90C5SFTqn65Rjrj9529ibQMv79wQI=

# Decrypt
npm run decrypt lorem.txt.enc geJ82NPijk5qld90C5SFTqn65Rjrj9529ibQMv79wQI=
```

### NODE
```js
const aes_file = require('./standard-file')

const key = aes_file.genkey()

aes_file.encrypt(key, 'lorem.txt')
aes_file.decrypt(key, 'lorem.txt.enc')
```