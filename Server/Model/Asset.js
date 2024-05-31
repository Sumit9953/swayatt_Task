const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
  motorId: String,
  name: String,
  description: String,
  location: String,
  manufacturer: String,
  modelNumber: String,
  serialNumber: String,
  installationDate: Date,
  lastMaintenanceDate: Date,
  status: String,
  specifications: {
    power: String,
    voltage: String,
    current: String,
    speed: String
  }
});

module.exports = mongoose.model('Asset', assetSchema);
