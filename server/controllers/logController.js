const ImportLog = require('../models/logs');

const getImportLogs = async (req, res) => {
  try {
    
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

   
    const logs = await ImportLog.find()
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(limit);

    const totalLogs = await ImportLog.countDocuments();

    res.status(200).json({
      success: true,
      page,
      totalPages: Math.ceil(totalLogs / limit),
      totalLogs,
      logs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch logs",
      error: error.message,
    });
  }
};

module.exports = { getImportLogs };
