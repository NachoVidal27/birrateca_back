const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Display a listing of the resource.
async function index(req, res) {
  const users = await User.find();
  res.json(users);
}

// Display the specified resource.
async function show(req, res) {
  const memberId = req.params.id;
  const user = await User.findOne({ memberId: memberId });
  return res.json(user);
}

// Show the form for creating a new resource
async function create(req, res) {}

// Store a newly created resource in storage.
async function store(req, res) {
  const bodyData = req.body;
  console.log(bodyData);
  const newUser = await User.create({
    memberId: bodyData.memberId,
    name: bodyData.name,
    phone: bodyData.phone,
    email: bodyData.email,
    password: await bcrypt.hash(bodyData.password, 8),
  });
  return res.json(newUser);
}

// Show the form for editing the specified resource.
async function edit(req, res) {
  const memberId = req.params.id;
  const user = await User.findOne({ memberId: memberId });
  return res.json(user);
}

// Update the specified resource in storage.
async function update(req, res) {
  const bodyData = req.body;
  const memberId = req.params.id;
  const user = await User.findOneAndUpdate(
    { memberId: memberId },
    {
      memberId: bodyData.memberId,
      name: bodyData.name,
      phone: bodyData.phone,
      email: bodyData.email,
      password: await bcrypt.hash(bodyData.password, 8),
    },
    { returnOriginal: false },
  );

  return res.json(user);
}

// Remove the specified resource from storage.
async function destroy(req, res) {
  const memberId = req.params.id;
  const user = await User.findOneAndRemove({ memberId: memberId });
  return res.json(user);
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
