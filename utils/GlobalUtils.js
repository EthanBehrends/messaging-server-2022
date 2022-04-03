const charSets = {
    readable: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ34679',
    base64: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
}

const generateRandomString = (length = 10, charset = charSets.readable) => {
    return Array.from(Array(length)).map(x => charset[Math.floor(Math.random() * charset.length)]).join('')
}


module.exports = {
    charSets,
    generateRandomString
}