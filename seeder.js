import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './config/db.js';

import users from './data/users.js';
import projects from './data/projects.js';
import User from './models/userModel.js';
import Project from './models/projectModel.js';

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Project.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    const sampleProjects = projects.map((project) => {
      return { ...project, user: adminUser };
    });

    await Project.insertMany(sampleProjects);

    console.log('Data imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Project.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
