const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
// GET all categories
router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categories = await Category.findAll({
      include: [{ model: Product }], // Include associated Products
    });
    res.status(200).json(categories);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Error retrieving categories", error: err.message });
  }
});

// GET a single category by ID
router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [{ model: Product }], // Include associated Products
    });
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.status(200).json(category);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Error retrieving category", error: err.message });
  }
});

// POST a new category
router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryB = await Category.create(req.body);
    res.status(201).json(categoryB);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error creating category", error: err.message });
  }
});

// PUT (update) a category by ID
router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const [updated] = await Category.update(req.body, {
      where: { id: req.params.id },
    });
    if (!updated) {
      res.status(404).json({ message: "Failed to update category" });
      return;
    }
    const updatedCategory = await Category.findByPk(req.params.id);
    res.status(200).json(updatedCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE a category by ID
router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleted = await Category.destroy({
      where: { id: req.params.id },
    });
    if (!deleted) {
      res.status(404).json({ message: "Failed to delete category" });
      return;
    }
    res.status(204).end();
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;