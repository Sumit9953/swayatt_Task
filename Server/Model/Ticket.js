const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  ticketId: String,
  assetId: String,
  issueDescription: String,
  dateRaised: Date,
  status: String
});

module.exports = mongoose.model('Ticket', ticketSchema);
