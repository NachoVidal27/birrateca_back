const Beer = require("../models/Beer");
const bcrypt = require("bcryptjs");

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
  const bodyData = req.body;
  console.log(bodyData);
  const newBeer = await Beer.create({
    beerId: bodyData.beerId,
    style: bodyData.style,
    description: bodyData.description,
    ingredients: bodyData.ingredients,
    abv: bodyData.abv,
    photo: bodyData.photo,
    brewDate: bodyData.brewDate,
    memeberId: bodyData.memberId,
  });
  return res.json(newBeer);
}

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
      ingredients: bodyData.ingredients,
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
