const express = require('express');
const router = express.Router();

const {getAllTicket , AddNewTicket , deleteTicket , UpdateTicket , getSpecificTicket} = require('../Controller/ticketController')

router.get('/getAllticket', getAllTicket);
router.post('/AddTicket', AddNewTicket);
router.delete('/DeleteTicket/:id', deleteTicket);
router.put('/UpdateTicket/:id', UpdateTicket);
router.get('/getTicket/:id', getSpecificTicket);


module.exports = router