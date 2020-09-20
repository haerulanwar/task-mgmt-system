const NodeRSA = require('node-rsa')

module.exports = {
  encodePassword (password, keyParam, format = 'base64') {
    const key = new NodeRSA(keyParam)
    const encrypted = key.encrypt(password, format)
    return encrypted
  },
  decodePassword (password, keyParam, format = 'utf8') {
    const key = new NodeRSA(keyParam)
    const decrypt = key.decrypt(password, format)
    return decrypt
  }
}
