const { mongoose, Schema } = require("../db");

const userSchema = new Schema(
  {
    memberId: {
      type: String,
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
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Inserte una contraseña"],
    },
    beers: [
      {
        type: Schema.Types.ObjectId,
        ref: "Beer",
      },
    ],
  },
  { timestamps: true },
);

// userSchema.methods.toJSON = function () {
//   const user = this.toObject();
//   user.id = user._id.toString();
//   delete user.password;
//   delete returnedObjetc.__v;
// };

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject._v;
    delete returnedObject.password;
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
