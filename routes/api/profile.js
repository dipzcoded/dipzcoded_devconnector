const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Profile = require("../../Model/Profile");
const User = require("../../Model/User");
const Post = require("../../Model/Post");
const { check, validationResult } = require("express-validator");
const validId = require("valid-objectid");
const request = require("request");
const config = require("config");

// @route   GET api/profile/me
// @desc    Get current Profiles
// @access   private

router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]);

    // Checking if a profile was retrieved from mongodb database
    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.json(profile);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error!");
  }
});

// @route   POST api/profile
// @desc    create or update user profile
// @access   private

router.post(
  "/",
  [
    auth,
    [
      check("status", "status is required").not().isEmpty(),
      check("skills", "skills is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
    } = req.body;

    // build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;

    if (skills) {
      profileFields.skills = skills.split(",").map((skill) => skill.trim());
    }

    //  build social objects
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      //  if there was a profile then we want to update
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }

      // Create
      profile = new Profile(profileFields);

      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error!");
    }
  }
);

// @route   GET api/profile
// @desc   Get all profiles
// @access   public

router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error!");
  }
});

// @route   GET api/profile/user/:user_id
// @desc   Get profile by user ID
// @access   public

router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      return res.status(400).json({ msg: "Profile not found!" });
    }

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    if (error.kind == "ObjectId") {
      return res.status(400).json({ msg: "Profile not found!" });
    }
    res.status(500).send("Server Error!");
  }
});

// @route   DELETE api/profile
// @desc   Delete profile, user & posts
// @access   private

router.delete("/", auth, async (req, res) => {
  try {
    //  Remove users posts

    await Post.deleteMany({user : req.user.id});

    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });

    // Remove User
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: "User Removed!!!" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Server Error!!!");
  }
});

// @route   PUT api/profile/experience
// @desc   Add profile experience
// @access   private

router.put(
  "/experience",
  [
    auth,
    [
      check("title", "Title is required").not().isEmpty(),
      check("company", "Company is required").not().isEmpty(),
      check("from", "From Date is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    } = req.body;

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.experience.unshift(newExp);

      await profile.save();

      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   DELETE api/profile/experience/:id
// @desc   delete profile experience
// @access   private
router.delete("/experience/:exp_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    if (validId.isValid(req.params.exp_id)) {
      // get remove index

      const removeIndex = profile.experience
        .map((item) => item.id)
        .indexOf(req.params.exp_id);
      profile.experience.splice(removeIndex, 1);
    } else {
      return res.status(400).send("server Error bitch!!!");
    }

    await profile.save();

    res.json(profile);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error!!");
  }
});

// @route   PUT api/profile/education
// @desc   Add profile education
// @access   private

router.put(
  "/education",
  [
    auth,
    [
      check("school", "School is required").not().isEmpty(),
      check("degree", "Degree is required").not().isEmpty(),
      check("fieldofstudy", "FieldOfStudy is required").not().isEmpty(),
      check("from", " From Date is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { school, degree, fieldofstudy, from, to, description } = req.body;

    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.education.unshift(newEdu);

      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error!!");
    }
  }
);

// @route   PUT api/profile/education/:edu_id
// @desc   delete profile education
// @access   private

router.delete("/education/:edu_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    if (validId.isValid(req.params.edu_id)) {
      // get index of the id
      const removeIndex = profile.education
        .map((item) => item.id)
        .indexOf(req.params.edu_id);
      profile.education.splice(removeIndex, 1);
    } else {
      return res.status(400).send("bitch u crazy!!!");
    }

    await profile.save();

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error!!!");
  }
});

// @route   DELETE api/profile/github/:username
// @desc   Get user repos from github
// @access   public

router.get("/github/:username", async (req, res) => {
  try {
    const options = {
      url: `http://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=created:asc&client_id=${config.get(
        "githubClientId"
      )}&client_secret=${config.get("githubClientSecret")}`,
      method: "GET",
      headers: { "user-agent": "node.js" },
    };

    request(options, (error, response, body) => {
      if (error) console.error(error);
      if (response.statusCode !== 200) {
        return res.status(400).json({ msg: "No Github profile found" });
      }

      res.json(JSON.parse(body));
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
