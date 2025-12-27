const Contact = require("../models/Contact");

const createContact = async (req, res) => {
  try {
    const { name, phone, email, service, message } = req.body;
    const userId = req.user ? req.user.id : null;
    const contact = await Contact.create({ 
      name, 
      phone, 
      email, 
      service, 
      message,
      userId 
    });
    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.findAll();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateContact = async (req, res) => {
  try {
    const contact = await Contact.findByPk(req.params.id);
    if (!contact) return res.status(404).json({ message: "Contact not found" });

    await contact.update(req.body);
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByPk(req.params.id);
    if (!contact) return res.status(404).json({ message: "Contact not found" });

    await contact.destroy();
    res.json({ message: "Contact deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createContact, getContacts, updateContact, deleteContact };
