const axios = require("axios");

const sendPushNotification = async (expoPushToken, title, body, data = {}) => {
  const message = {
    to: expoPushToken,
    sound: "default",
    title,
    body,
    data,
    channelId: "order_updates", // 🔴 MUST MATCH
  };

  await axios.post(
    "https://exp.host/--/api/v2/push/send",
    message,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
};

module.exports = { sendPushNotification };
