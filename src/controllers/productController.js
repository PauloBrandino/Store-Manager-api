const { query } = require('express');
const { productService } = require('../services');

async function getAll(_req, res) {
  const { message } = await productService.getAll();

  return res.status(200).json(message);
}

async function getById(req, res) {
  const { id } = req.params;
  const { type, message } = await productService.getById(id);
  
  if (type) return res.status(404).json({ message });
  
  return res.status(200).json(message);
}

async function createProduct(req, res) {
  const product = req.body;

  const { message } = await productService.createProduct(product);

  return res.status(201).json(message);
}

async function updateProduct(req, res) {
  const { id } = req.params;
  const { name } = req.body;

  const { type, message } = await productService.updateProduct(Number(id), name);

  if (type) return res.status(404).json({ message });

  return res.status(200).json(message);
}

async function deleteProduct(req, res) {
  const { id } = req.params;
  const { type, message } = await productService.deleteProduct(id);
  if (type) return res.status(404).json({ message });

  return res.status(204).json();
}

async function getProductByName(req, res) {
  const { q } = req.query;

  const { type, message } = await productService.getProductByName(q);
  if (type) return res.status(200).json(message);
  
  return res.status(200).json(message);
}

module.exports = {
  getAll,
  getById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductByName,
};