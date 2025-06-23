const ImportLog = require('../models/logs');

const getImportLogs = async (req, res) => {
  try {
    const logs = await ImportLog.find().sort({ timestamp: -1 });
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch logs", error: error.message });
  }
};

module.exports = { getImportLogs };