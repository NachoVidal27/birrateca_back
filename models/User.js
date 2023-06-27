const { mongoose, Schema } = require("../db");

const userSchema = new Schema(
  {
    memberId: {
      type: String,
      required: [true, "Inserte su número de socio."],
    },
    name: {
      type: String,
      required: [true, "Inserte su nombre."],
    },
    phone: {
      type: String,
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
  },
  { timestamps: true },
);

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  user.id = user._id.toString();
  delete user.password;
  return user;
};

// Bcrypt - Password;
// userSchema.pre("save", async function (next) {
//   if (this.isModified("password") || this.isNew) {
//     this.password = await bcrypt.hash(this.password, 8);
//     next();
//   }
// });

const User = mongoose.model("User", userSchema);
module.exports = User;
