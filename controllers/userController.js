const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Display a listing of the resource.
async function index(req, res) {
  const users = await User.find();
  res.json(users);
}

// Display the specified resource.
async function show(req, res) {
  const userId = req.params.id;
  const user = await User.findOne({ _id: userId });
  return res.json(user);
}

async function createToken(req, res) {
  try {
    const user = await User.findOne({ memberId: req.body.memberId }).populate({
      path: "beers",
    });
    const matchPassword = await bcrypt.compare(req.body.password, user.password);
    if (matchPassword) {
      const token = jwt.sign({ userId: user._id }, process.env.SESSION_SECRET);
      res.json({
        user: {
          id: user._id,
          memberId: user.memberId,
          name: user.name,
          phone: user.phone,
          email: user.email,
          token: token,
          beers: user.beers,
        },
      });
      console.log("te has loggeado correctamente");
    } else {
      res.status(401).json("No existe este usuario");
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "User login failed",
      error: err.message,
    });
  }
}

// Store a newly created resource in storage.
async function store(req, res) {
  const bodyData = req.body;
  console.log(bodyData);
  const newUser = await User.create({
    name: bodyData.name,
    memberId: bodyData.memberId,
    phone: bodyData.phone,
    email: bodyData.email,
    password: await bcrypt.hash(bodyData.password, 8),
  });
  // await newUser.save();
  return res.json(newUser);
}

// // Show the form for editing the specified resource.
async function edit(req, res) {
  const memberId = req.params.id;
  const user = await User.findOne({ memberId: memberId });
  return res.json(user);
}

// // Update the specified resource in storage.
async function update(req, res) {
  const bodyData = req.body;
  const userId = req.params.id;
  const user = await User.findOneAndUpdate(
    { _id: userId },
    {
      memberId: bodyData.memberId,
      name: bodyData.name,
      phone: bodyData.phone,
      email: bodyData.email,
      // password: await bcrypt.hash(bodyData.password, 8),
    },
    { returnOriginal: false },
  );

  return res.json(user);
}

// // Remove the specified resource from storage.
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
  store,
  edit,
  update,
  destroy,
  createToken,
};
