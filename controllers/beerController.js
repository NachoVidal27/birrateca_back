const Beer = require("../models/Beer");
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
  const beer = await Beer.findOne({ beerId: beerId });
  return res.json(beer);
}

// Show the form for creating a new resource
async function create(req, res) {}

// Store a newly created resource in storage.
async function store(req, res) {
  try {
    const form = formidable({
      multiples: false,
      keepExtensions: true,
    });
    form.parse(req, async (err, fields, files) => {
      const { beerId, style, description, location, abv, brewDate, memberId } = fields;
      const ext = path.extname(files.photo.filepath);
      console.log(files);
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
        beerId: beerId,
        style: style,
        description: description,
        location: location,
        abv: abv,
        photo: newFileName,
        brewDate: brewDate,
        memeberId: memberId,
      });

      await newBeer.save();
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
  const beer = await Beer.findOne({ beerId: beerId });
  return res.json(beer);
}

// Update the specified resource in storage.
async function update(req, res) {
  const bodyData = req.body;
  const beerId = req.params.id;
  const beer = await Beer.findOneAndUpdate(
    { beerId: beerId },
    {
      beerId: bodyData.beerId,
      style: bodyData.style,
      description: bodyData.description,
      location: bodyData.location,
      abv: bodyData.abv,
      photo: bodyData.photo,
      brewDate: bodyData.brewDate,
      memberId: bodyData.memberId,
    },
    { returnOriginal: false },
  );

  return res.json(beer);
}

// Remove the specified resource from storage.
async function destroy(req, res) {
  const beerId = req.params.id;
  const beer = await Beer.findOneAndRemove({ beerId: beerId });
  return res.json(beer);
}

// Otros handlers...
// ...

module.exports = {
  index,
  show,
  create,
  store,
  edit,
  update,
  destroy,
};
