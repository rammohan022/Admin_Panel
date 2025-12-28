
const express = require("express");
const { createContact, getContacts, updateContact, deleteContact } = require("../controllers/contactController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

// Public route for contact form submissions
router.post("/", createContact);

// Protected routes for authenticated users
router.get("/", protect, getContacts);

router.route("/:id")
  .put(protect, updateContact)
  .delete(protect, deleteContact);

module.exports = router;
