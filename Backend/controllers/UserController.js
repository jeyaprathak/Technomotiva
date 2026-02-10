const User = require("../models/User");

const savePushToken = async (req, res) => {
  try {
    const { expoToken } = req.body;

    if (!expoToken) {
      return res.status(400).json({ message: "Expo token required" });
    }

    await User.update(
      { expoPushToken: expoToken },
      { where: { id: req.user.id } }
    );

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to save push token" });
  }
};

module.exports = { savePushToken };
