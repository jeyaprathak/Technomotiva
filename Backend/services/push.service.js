const axios = require("axios");

const sendPushNotification = async (
  expoPushToken,
  title,
  body,
  data = {}
) => {
  if (!expoPushToken) {
    console.log("❌ No push token provided");
    return;
  }

  const message = {
    to: expoPushToken,
    sound: "default",
    title,
    body,
    data,
    priority: "high",
    channelId: "order_updates",
  };

  try {
    const res = await axios.post(
      "https://exp.host/--/api/v2/push/send",
      message,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    console.log("📤 PUSH SENT:", res.data);
    return res.data;
  } catch (err) {
    console.error("❌ PUSH ERROR:", err.response?.data || err.message);
  }
};

module.exports = { sendPushNotification }; // 🔥 THIS LINE IS REQUIRED
