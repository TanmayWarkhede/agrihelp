const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Initialize Express app
const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Requests
app.use(bodyParser.json()); // Parse JSON bodies

// Connect to MongoDB
const mongoURI = 'mongodb://localhost:27017/agri_value_chain'; // Update with your MongoDB URI
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define Product schema and model
const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String
});
const Product = mongoose.model('Product', productSchema);

// Define Certification schema and model
const certificationSchema = new mongoose.Schema({
  name: String,
  description: String,
  imageUrl: String // Changed to 'imageUrl' to match your Flutter model
});
const Certification = mongoose.model('Certification', certificationSchema);

// Product Routes

// Get all products
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single product by ID
app.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new product
app.post('/products', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update an existing product
app.put('/products/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedProduct) {
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a product
app.delete('/products/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (deletedProduct) {
      res.json({ message: 'Product deleted' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Certification Routes

// Get all certifications
app.get('/certifications', async (req, res) => {
  try {
    const certifications = await Certification.find();
    res.json(certifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single certification by ID
app.get('/certifications/:id', async (req, res) => {
  try {
    const certification = await Certification.findById(req.params.id);
    if (certification) {
      res.json(certification);
    } else {
      res.status(404).json({ message: 'Certification not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new certification
app.post('/certifications', async (req, res) => {
  try {
    const newCertification = new Certification(req.body);
    const savedCertification = await newCertification.save();
    res.status(201).json(savedCertification);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update an existing certification
app.put('/certifications/:id', async (req, res) => {
  try {
    const updatedCertification = await Certification.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedCertification) {
      res.json(updatedCertification);
    } else {
      res.status(404).json({ message: 'Certification not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a certification
app.delete('/certifications/:id', async (req, res) => {
  try {
    const deletedCertification = await Certification.findByIdAndDelete(req.params.id);
    if (deletedCertification) {
      res.json({ message: 'Certification deleted' });
    } else {
      res.status(404).json({ message: 'Certification not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
