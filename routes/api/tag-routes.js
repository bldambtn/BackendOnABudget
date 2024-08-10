const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// GET all tags
router.get("/", async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findAll({
      include: [{ model: Product, through: ProductTag }], // Include associated Products
    });

    res.status(200).json(tags);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Error retrieving tags", error: err.message });
  }
});

// GET a single tag by ID
router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag }],
    });

    if (!tag) {
      return res.status(404).json({ message: "Tag not found" });
    }

    res.status(200).json(tag);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Error retrieving tag", error: err.message });
  }
});

// POST a new tag
router.post("/", async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create(req.body);
    res.status(201).json(newTag);
  } catch (err) {
    console.error(err);
    res
      .status(400)
      .json({ message: "Error creating tag", error: err.message });
  }
});

// PUT (update) a tag by ID
router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const [updated] = await Tag.update(req.body, {
      where: { id: req.params.id },
    });

    if (!updated) {
      return res.status(404).json({ message: "Tag not found" });
    }

    const updatedTag = await Tag.findByPk(req.params.id);
    res.status(200).json(updatedTag);
  } catch (err) {
    console.error(err);
    res
      .status(400)
      .json({ message: "Error updating tag", error: err.message });
  }
});

// DELETE a tag by ID
router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleted = await Tag.destroy({
      where: { id: req.params.id },
    });

    if (!deleted) {
      return res.status(404).json({ message: "Tag not found" });
    }

    res.status(204).end(); // No content to send back
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Error deleting tag", error: err.message });
  }
});

module.exports = router;
