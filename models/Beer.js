const { mongoose, Schema } = require("../db");

const beerSchema = new Schema(
  {
    style: {
      type: String,
      required: [true, "Inserte el estilo BJCP."],
    },
    description: {
      type: String,
      required: [true, "Inserte una descripción."],
    },
    location: {
      type: String,
      required: [true, "Inserte la ubicacion."],
    },
    abv: {
      type: String,
      required: [true, "Inserte el ABV."],
    },
    photo: {
      type: String,
      required: [true, "Inserte una fotografía"],
    },
    brewDate: {
      type: String,
      required: [true, "Inserte la fecha de elaboración"],
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

beerSchema.methods.toJSON = function () {
  const beer = this.toObject();
  beer.id = beer._id.toString();
  delete beer.password;
  return beer;
};

const Beer = mongoose.model("Beer", beerSchema);
module.exports = Beer;
