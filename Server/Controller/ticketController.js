
const Ticket = require('../Model/Ticket');

// Get all tickets
exports.getAllTicket = async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Add a new ticket
exports.AddNewTicket = async (req, res) => {
  const ticket = new Ticket(req.body);
  try {
    const newTicket = await ticket.save();
    res.status(201).json(newTicket);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// Get a specific ticket
exports.getSpecificTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (ticket == null) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    res.json(ticket);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Update a ticket
exports.UpdateTicket = async (req, res) => {
  try {
    const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTicket);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// Delete a ticket
exports.deleteTicket = async (req, res) => {
  try {
    await Ticket.findByIdAndDelete(req.params.id);
    res.json({ message: 'Ticket deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

