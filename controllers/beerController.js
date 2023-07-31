const Beer = require("../models/Beer");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const formidable = require("formidable");
const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Display a listing of the resource.
async function index(req, res) {
  const beers = await Beer.find();
  res.json(beers);
}

// Display the specified resource.
async function show(req, res) {
  const beerId = req.params.id;
  const beer = await Beer.findOne({ _id: beerId });
  return res.json(beer);
}

// Show the form for creating a new resource
async function create(req, res) {}

// Store a newly created resource in storage.
async function store(req, res) {
  console.log(req.auth);
  const user = await User.findOne({ _id: req.auth.userId }).populate("beers");
  try {
    const form = formidable({
      multiples: false,
      keepExtensions: true,
    });
    form.parse(req, async (err, fields, files) => {
      const { beerId, style, description, location, abv, brewDate, memberId } = fields;
      const ext = path.extname(files.photo.filepath);
      const newFileName = `img${Date.now()}${ext}`;
      const { data, error } = await supabase.storage
        .from("birrateca_fotos/birra_fotos")
        .upload(newFileName, fs.createReadStream(files.photo.filepath), {
          cacheControl: "3600",
          upsert: false,
          contentType: files.photo.type,
          duplex: "half",
        });

      const newBeer = await Beer.create({
        user_id: user._id,
        beerId: beerId,
        style: style,
        description: description,
        location: location,
        abv: abv,
        photo: newFileName,
        brewDate: brewDate,
      });

      user.beers.push(newBeer);
      await user.save();
      return res.status(200).json(newBeer);
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("server error");
  }
}

//   }
//   const bodyData = req.body;
//   console.log(bodyData);

//   return res.json(newBeer);
// }

// Show the form for editing the specified resource.
async function edit(req, res) {
  const beerId = req.params.id;
  const beer = await Beer.findOne({ _id: beerId });
  return res.json(beer);
}

// Update the specified resource in storage.
async function update(req, res) {
  const beerId = req.params.id;
  // const beer = await Beer.findOne({ _id: beerId });
  try {
    const form = formidable({
      multiples: false,
      keepExtensions: true,
    });
    form.parse(req, async (err, fields, files) => {
      const { _id, style, description, location, abv, brewDate } = fields;
      const ext = path.extname(files.photo.filepath);
      const newFileName = `img${Date.now()}${ext}`;
      const { data, error } = await supabase.storage
        .from("birrateca_fotos/birra_fotos")
        .upload(newFileName, fs.createReadStream(files.photo.filepath), {
          cacheControl: "3600",
          upsert: false,
          contentType: files.photo.type,
          duplex: "half",
        });
      const updatedBeer = await Beer.findOneAndUpdate(
        { _id: beerId },
        {
          _id: _id,
          style: style,
          description: description,
          location: location,
          abv: abv,
          photo: newFileName,
          brewDate: brewDate,
        },
        { returnOriginal: false },
      );
      await updatedBeer.save();

      return res.json(updatedBeer);
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("server error");
  }
}

// Remove the specified resource from storage.
// async function destroy(req, res) {
//   const beerId = req.params.id;
//   const beer = await Beer.findOneAndRemove({ _id: beerId });
//   ///ahora eliminamos del usuario la relacion///
//   console.log("esto es beer ", beer);
//   const user = await User.findOne({ _id: beer.user_id });
//   const userBeers = user.beers;
//   userBeers.splice(userBeers.indexOf(beerId), 1);
//   await user.save();
//   return res.json(beer);
// }

async function destroy(req, res) {
  const beerId = req.params.id;

  try {
    const beer = await Beer.findOneAndDelete({ _id: beerId });
    if (!beer) {
      return res.status(404).json({ error: "Beer not found" });
    }
    const user = await User.findOne({ _id: beer.user_id });
    console.log(user);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const userBeers = user.beers;
    const beerIndex = userBeers.indexOf(beerId);
    if (beerIndex !== -1) {
      userBeers.splice(beerIndex, 1);
      await user.save();
    }
    return res.json(beer);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
}

module.exports = {
  index,
  show,
  create,
  store,
  edit,
  update,
  destroy,
};
