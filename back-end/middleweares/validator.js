const { check, validationResult } = require("express-validator");

exports.registerRules = () => [
  check("fullName", "this field is required").notEmpty(),
  check("email", "this field should be a valid email").isEmail(),
  check("password", "password should have at least 6 char").isLength({
    min: 6,
  }),
];

exports.loginRules = () => [
    check("email", "this field should be a valid email").isEmail(),
    check("password", "password should have at least 6 char").isLength({
      min: 6,
    }),
  ];

exports.validator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }
  next();
};