import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Rajesh Ranjan',
    email: 'rajesh@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Waqar',
    email: 'waqar@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;
