const express = require('express');
const authController = require('./../controllers/authController');
const problemController = require('./../controllers/problemController');

const router = express.Router();

//authController.restrictTo('admin'),

router.post(
  '/add',
  authController.protect,

  problemController.add
);
// router.patch('/update/:id', authController.protect, authController.restrictTo('admin'), problemController.update);
// router.delete('/delete/:id', authController.protect, authController.restrictTo('admin'), problemController.delete);
router.get('/all', problemController.getAll);
router.get('/:id', problemController.get);

module.exports = router;
