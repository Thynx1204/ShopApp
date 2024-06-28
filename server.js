const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const dotenv = require('dotenv');
const { log } = require('console');

dotenv.config();

const app = express();
const dataFile = 'products.json';

app.use(bodyParser.json());

const readData = () => {
  const data = fs.readFileSync(dataFile, 'utf8');
  return JSON.parse(data);
};

const writeData = (data) => {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
};

const validatePassword = (req, res, next) => {
  if (req.headers.password === process.env.PASSWORD) {
    next();
  } else {
    log(process.env.PASSWORD)
    log(req.headers)
    res.status(403).send('Forbidden');
  }
};

app.get('/products', (req, res) => {
  const data = readData();
  res.json(data);
});

app.get('/products/:id', (req, res) => {
  const data = readData();
  const product = data.find(product => product.id == req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).send('Product not found');
  }
});

app.post('/products', validatePassword, (req, res) => {
  const data = readData();
  const newProduct = req.body;
  console.log(req.body)
  data.push(newProduct);
  writeData(data);
  res.status(201).json(newProduct);
});

app.put('/products/:id', validatePassword, (req, res) => {
  const data = readData();
  const index = data.findIndex(product => product.id == req.params.id);
  if (index !== -1) {
    data[index] = { ...data[index], ...req.body };
    writeData(data);
    res.json(data[index]);
  } else {
    res.status(404).send('Product not found');
  }
});

app.delete('/products/:id', validatePassword, (req, res) => {
  let data = readData();
  const index = data.findIndex(product => product.id == req.params.id);
  if (index !== -1) {
    data = data.filter(product => product.id !== req.params.id);
    writeData(data);
    res.status(204).send();
  } else {
    res.status(404).send('Product not found');
  }
});

app.listen(process.env.PORT , () => console.log(`Server started on http://localhost:${process.env.PORT}`))