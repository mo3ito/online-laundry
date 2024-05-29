const bcrypt = require("bcrypt");

const adminRegister = async (req, res) => {
  const { username, password, adminKey } = req.body;

  try {
    const passwordKey = "onlineLaundry9919022106";
    const saltRounds = 10; // تعداد دفعات تولید salt

    // هش کردن passwordKey
    const hashedPasswordKey = await bcrypt.hash(passwordKey, saltRounds);

    // ارسال hashedPasswordKey به response (فقط برای نمونه، در عمل بهتر است این کار را نکنید)
    res.send({ hashedPasswordKey });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error hashing the password key");
  }
};

module.exports = { adminRegister };
