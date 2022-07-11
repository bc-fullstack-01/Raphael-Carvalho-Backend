const {
    connection,
    Redacted
} = require('./models')

module.exports = Connection
.then(() => Promisse.all([


].map(term => new Redact({ term }) .save())))
.then(() => console.log('mongo is seeded'))