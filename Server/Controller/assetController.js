
const Asset = require('../Model/Asset');

// Get all assets
exports.getAllAssets = async (req, res) => {
  try {
    const assets = await Asset.find();
    res.json(assets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Add a new asset
exports.AddNewAssets = async (req, res) => {
  const asset = new Asset(req.body);

  try {
    const newAsset = await asset.save();
    res.status(201).json(newAsset);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// Get a specific asset
exports.getSpecificAssets = async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id);
    if (asset == null) {
      return res.status(404).json({ message: 'Asset not found' });
    }
    res.json(asset);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Update an asset
exports.UpdateAssets = async (req, res) => {
  try {
    const updatedAsset = await Asset.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedAsset);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// Delete an asset
exports.DeleteAssets = async (req, res) => {
  try {
    await Asset.findByIdAndDelete(req.params.id);
    res.json({ message: 'Asset deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


