const { User } = require("../models");
const { Order } = require("../models");
const bcrypt = require("bcryptjs");

// GET ALL USERS
async function index(req, res) {
  try {
    const users = await User.scope("noPassword").findAll({ order: [["createdAt", "DESC"]] });
    return res.status(200).json(users);
  } catch (err) {
    console.log(err);
  }
}

// GET ONE USER
async function show(req, res) {
  try {
    const user = await User.scope("noPassword").findByPk(req.params.id);
    return user
      ? res.status(200).json(user)
      : res.status(404).json({ msg: "We apologize. User not found.", notFound: true });
  } catch (err) {
    console.log(err);
  }
}

// CREATE USER
async function store(req, res) {
  try {
    let password = "";

    if (req.body.password !== "") {
      password = await bcrypt.hash(req.body.password, 10);
    }

    await User.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: password,
      phone: req.body.phone,
      address: req.body.address,
    });
    return res.status(201).json({ msg: "User created successfully." });
  } catch (err) {
    console.log(err);
    return res.json({ msg: err.errors[0].message, constraint: true });
  }
}

// UPDATE USER
async function update(req, res) {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "We apologize. User not found." });
    }
    await User.update(
      {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
      },
      { where: { id: req.params.id } },
    );
    return res.status(200).json({ msg: "User updated successfully" });
  } catch (err) {
    console.log(err);
    return res.json({ msg: err.errors[0].message, constraint: true });
  }
}

// DELETE USER
async function destroy(req, res) {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "We apologize. User not found." });
    }
    const order = await Order.findAll({ where: { userId: req.params.id } });
    await User.destroy({
      where: {
        id: req.params.id,
      },
      force: order.length === 0 && true,
      individualHooks: order.length > 0 && true,
    });
    return res.status(200).json({ msg: "User deleted successfully." });
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
