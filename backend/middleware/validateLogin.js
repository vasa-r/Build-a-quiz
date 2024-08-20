const z = require("zod");

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  try {
    //checking if all the required fields are present
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the required fields",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password length should be minimum 6",
      });
    }

    //email validation using zod
    const emailSchema = z.string().email();
    const response = emailSchema.safeParse(email);
    if (!response.success) {
      return res.status(400).json({
        success: false,
        message: "Please enter valid email",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = validateLogin;
