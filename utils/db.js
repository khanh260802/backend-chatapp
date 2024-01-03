const mongoose = require("mongoose");
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {  useNewUrlParser: true, useUnifiedTopology: true  })
    } catch (error) {
        console.log("connected failed")
        console.log(error)
    }
};
module.exports = connect;