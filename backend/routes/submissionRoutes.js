const express = require('express');
const submissionController = require('./../controllers/submissionController');
const authController = require('./../controllers/authController');

const router = express.Router();
router.post(
  '/:id/submit',
  authController.protect,
  submissionController.compile
);
//router.post('/', submissionController.compile);

module.exports = router;
