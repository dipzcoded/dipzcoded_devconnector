const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../../Model/User");
const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

// @route   GET api/users
// @desc    Test route
// @access   public

router.get(
  "/",

  (req, res) => {
    res.send("User route");
  }
);

//   @route  POST api/users
//   @desc   Register users
//  @access  public
router.post(
  "/",

  [
    // name field must not be empty
    check("name", "Name is required").not().isEmpty(),
    // email field must be accurately an email
    check("email", "Please a valid email address").isEmail(),
    // password field
    check(
      "password",
      "Please enter a password with six or more chars"
    ).isLength({ min: 6 }),
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // user exist from the database
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      // get user gravatar from their email
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      user = new User({
        name,
        email,
        avatar,
        password,
      });

      // encrypt the password through bycryptjs
      const salt = await bcrypt.genSalt(10);
      //  hash the password
      user.password = await bcrypt.hash(password, salt);

      //  saving the user to mongoDB
      await user.save();

      // return jsonwebtoken
      const payLoad = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payLoad,
        config.get("jwtSecret"),
        {
          expiresIn: 36000,
        },
        (err, token) => {
          if (err) throw err;

          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
