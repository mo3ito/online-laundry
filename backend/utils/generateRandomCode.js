const generateRandomCode = () => {
  const codeNumber = Math.floor(10000 + Math.random() * 90000);
  const codeString = codeNumber.toString();
  return codeString;
};

module.exports = generateRandomCode;
