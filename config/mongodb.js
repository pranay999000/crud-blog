const mongoose = require('mongoose')

var mongo_url = process.env.MONGO_URL

mongoose.connect(mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB connected!")
}).catch((error) => {
    console.log("MongoDB not connected", error)
})