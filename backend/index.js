// backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/SOFTOLOFICAPP', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const ItemSchema = new mongoose.Schema({
  name: String,
});

const Item = mongoose.model('Item', ItemSchema);

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model('User', UserSchema);

app.get('/items', async (req, res) => {
  const items = await Item.find();
  res.send(items);
});

app.post('/items', async (req, res) => {
  const item = new Item(req.body);
  await item.save();
  res.send(item);
});

app.post('/register', async (req, res) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 8);
  const user = new User({
    username: req.body.username,
    password: hashedPassword,
  });
  await user.save();
  res.send({ message: 'User registered successfully!' });
});

app.post('/login', async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
    return res.status(401).send({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '1h' });
  res.send({ token });
});

const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) return res.status(403).send({ message: 'No token provided' });
  jwt.verify(token, 'secret', (err, decoded) => {
    if (err) return res.status(500).send({ message: 'Failed to authenticate token' });
    req.userId = decoded.id;
    next();
  });
};

app.get('/protected', verifyToken, (req, res) => {
  res.send({ message: 'This is a protected route' });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
