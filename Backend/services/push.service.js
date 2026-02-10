const axios = require("axios");

const sendPushNotification = async (expoPushToken, title, body, data = {}) => {
  const message = {
    to: expoPushToken,
    sound: "default",
    title,
    body,
    data,
  };

  try {
    const res = await axios.post(
      "https://exp.host/--/api/v2/push/send",
      message,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("📤 PUSH RESPONSE:", res.data);
  } catch (err) {
    console.error("❌ PUSH ERROR:", err.response?.data || err.message);
  }
};

module.exports = { sendPushNotification };
