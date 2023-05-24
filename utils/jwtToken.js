// create token and saving that in cookies
const sendTokenCookie = (user, statusCode, res) => {
  const token = user.getJwtToken();
  const { roles, firstname, user_image } = user;
  // Options for cookies
  const options = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    Secure: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
    firstname,
    roles,
    user_image,
  });
};

module.exports = sendTokenCookie;
