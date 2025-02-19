const mongoose = require('mongoose');


module.exports.connect= async ()=>{
  try {
    await mongoose.connect(process.env.MONGOOSE_URL);
    console.log("OK");
  } catch (error) {
    console.log("LOI");

  }
}
