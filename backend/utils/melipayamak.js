require("dotenv").config();
const https = require("https");
const {bodyId} = require("../endpoint")

const sendSMS = (to, args) => {
  const data = JSON.stringify({
    bodyId: Number(bodyId),
    to: to,
    args: args,
  });

  const options = {
    hostname: "console.melipayamak.com",
    port: 443,
    path: "/api/send/shared/ec16a13ae8694d3180a5577541f8dc99",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": data.length,
    },
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let responseData = "";

      res.on("data", (chunk) => {
        responseData += chunk;
      });

      res.on("end", () => {
        if (res.statusCode === 200) {
          resolve(responseData);
        } else {
          reject(new Error(`Failed with status code: ${res.statusCode}`));
        }
      });
    });

    req.on("error", (error) => {
      reject(error);
    });

    req.write(data);
    req.end();
  });
};

module.exports = sendSMS;
