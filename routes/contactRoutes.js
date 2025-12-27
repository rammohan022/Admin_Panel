
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
 *     summary: Create a new contact message
 *     tags: [Contacts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - phone
 *               - email
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
 *         description: Contact created successfully
 *       500:
 *         description: Server error
 */
router.post("/", createContact);

/**
 * @swagger
 * /api/contacts:
 *   get:
 *     summary: Get all contact messages (Admin only)
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of contact messages
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Server error
 */
router.get("/", protect, getContacts);

/**
 * @swagger
 * /api/contacts/{id}:
 *   put:
 *     summary: Update a contact message
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Contact ID
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
 *     responses:
 *       200:
 *         description: Contact updated
 *       404:
 *         description: Contact not found
 *       500:
 *         description: Server error
 *   delete:
 *     summary: Delete a contact message
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Contact ID
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
