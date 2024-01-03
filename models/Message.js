const mongoose = require("mongoose"); 
const MesssageSchema = new mongoose.Schema( 
    {
        conversationId : {
            type : String, 
            required: true
        }, 
        senderId : {
            type : String,
            required: true
        }, 
        text : {
            type : String
        }, 
    }, { 
        timestamps: true
    }
)
module.exports = mongoose.model('Messsage', MesssageSchema); 