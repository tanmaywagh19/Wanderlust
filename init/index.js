const mongoose = require("mongoose")
const Listing = require("../models/listing.js")
const initData = require("./data.js")

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust"
async function main() {
    await mongoose.connect(MONGO_URL);
}

main()
    .then(res => console.log('Connected'))
    .catch(err => console.log(err))


// async function initDB() {
//     await Listing.deleteMany({})
//     initData.data = initData.data.map((obj)=>
//         ({...obj , owner : '6a785333ae4ca0f7636e5df6'}))
//     await Listing.insertMany(initData.data)
//     await Listing.createIndexes({country:"text",location:"text"})
//     console.log("Data initialized...")
// }

// initDB();