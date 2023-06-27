const { mongoose, Schema } = require("../db");

const userSchema = new Schema(
  {
    memberId: {
      type: Number,
      required: [true, "Inserte su número de socio."],
      // unique: true,
    },
    name: {
      type: String,
      required: [true, "Inserte su nombre."],
    },
    phone: {
      type: String,
      // unique: true,
    },
    email: {
      type: String,
      required: [true, "Inserte su email."],
      // unique: true,
    },
    password: {
      type: String,
      required: [true, "Inserte una contraseña"],
    },
  },
  { timestamps: true },
);

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  user.id = user._id.toString();
  delete user.password;
  return user;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
