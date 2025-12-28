
const express = require("express");
const { createContact, getContacts, updateContact, deleteContact } = require("../controllers/contactController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Contacts
 *   description: Contact form management
 */

/**
 * @swagger
 * /api/contacts:
 *   post:
 *     summary: Submit a new contact form
 *     tags: [Contacts]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - message
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               service:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       201:
 *         description: Contact form submitted successfully
 *       500:
 *         description: Server error
 *   get:
 *     summary: Get all contact submissions (Protected)
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of contact submissions
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Server error
 */
// Public route for contact form submissions
router.post("/", createContact);

// Protected routes for authenticated users
router.get("/", protect, getContacts);

/**
 * @swagger
 * /api/contacts/{id}:
 *   put:
 *     summary: Update a contact submission
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The contact ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               service:
 *                 type: string
 *               message:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contact updated
 *       404:
 *         description: Contact not found
 *       500:
 *         description: Server error
 *   delete:
 *     summary: Delete a contact submission
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The contact ID
 *     responses:
 *       200:
 *         description: Contact deleted
 *       404:
 *         description: Contact not found
 *       500:
 *         description: Server error
 */
router.route("/:id")
  .put(protect, updateContact)
  .delete(protect, deleteContact);

module.exports = router;
