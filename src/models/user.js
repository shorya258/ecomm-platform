const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: String, required: true },
},
{timestamps:true},
);
export default mongoose.model("User", userSchema);
