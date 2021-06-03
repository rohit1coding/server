import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import Registration from '../models/registrationModel.js';

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await Registration.findOne({ email }); // find by email

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      isClient: user.isClient,
      isClient: user.isClient,
      isClient: user.isClient,
      isAdmin: user.isAdmin,

      token: generateToken(user._id),
    });
  } else {
    res.status(401); // unauthorised status code
    throw new Error('Invalid email or password');
  }
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await Registration.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      isClient: user.isClient,
      isClient: user.isClient,
      isClient: user.isClient,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
  //console.log(user)
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await Registration.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isClient: user.isClient,
      isClient: user.isClient,
      isClient: user.isClient,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    mobile,
    password,
    isClient,
    isCorporate,
    isBusinessPartner,
    isAdmin,
  } = req.body;

  const userExists = await Registration.findOne({ email }); // find by email

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await Registration.create({
    name,
    email,
    mobile,
    password,
    isClient,
    isCorporate,
    isBusinessPartner,
    isAdmin,
  });

  await user.save();

  if (user) {
    res.status(201);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      isClient: user.isClient,
      isCorporate: user.isCorporate,
      isBusinessPartner: user.isBusinessPartner,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// get all users api/users private and admin

const getUsers = asyncHandler(async (req, res) => {
  const users = await Registration.find({});
  res.json(users);

  //console.log(user)
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await Registration.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await Registration.findById(req.params.id).select('-password');

  if (user) {
    res.json(user);
  } else {
    res.status(400);
    throw new Error('User not found');
  }
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await Registration.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.mobile = req.body.mobile || user.mobile;
    user.isClient = req.body.isClient || user.isClient;
    user.isCorporate = req.body.isCorporate || user.isCorporate;
    user.isBusinessPartner =
      req.body.isBusinessPartner || user.isBusinessPartner;
    user.isAdmin = req.body.isAdmin;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      mobile: updatedUser.mobile,
      isClient: updatedUser.isClient,
      isCorporate: updatedUser.isCorporate,
      isBusinessPartner: updatedUser.isBusinessPartner,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
