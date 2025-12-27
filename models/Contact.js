const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const User = require("./User");

const Contact = sequelize.define("Contact", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING },
  service: { type: DataTypes.STRING },
  message: { type: DataTypes.TEXT },
});

User.hasMany(Contact, { foreignKey: "userId" });
Contact.belongsTo(User, { foreignKey: { name: "userId", allowNull: true } });

module.exports = Contact;
