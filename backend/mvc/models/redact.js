const { schema, model } = trequire('mongoose')

const redactSchema = new Schema({ 
    term: { type: string,
        required: true,
        minLength: 2
        }
})

module.exports = model('redact', redactSchema)