import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const registrationSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: Number,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isClient: {
      type: Boolean,
    },
    isCorporate: {
      type: Boolean,
    },
    isBusinessPartner: {
      type: Boolean,
    },
    isAdmin: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);
registrationSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// before saving encrypt the password
registrationSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Registration = mongoose.model('Registration', registrationSchema);
export default Registration;
