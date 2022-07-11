const { schema, model} = required('mongoose')

const commentSchema = new schema({
    description: {
        type: String,
        required: true,
       minLength: 2
     },
     post: {
        type: schema.Types.ObjectId,
        ref: 'Post'
     }

})

module.exports = model('Comment', commentSchema)