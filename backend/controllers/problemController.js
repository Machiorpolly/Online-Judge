const catchAsync = require('./../utils/catchAsync');
const Problem = require('./../models/problemModel');

exports.add = catchAsync(async (req, res, next) => {
  const newProblem = await Problem.create({
    ...req.body,
  });
  res.send(newProblem);
});

exports.update = catchAsync(async (req, res, next) => {
  res.send('updated ' + req.params.id);
});

exports.delete = catchAsync(async (req, res, next) => {
  res.send('deleted ' + req.params.id);
});

exports.get = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  Problem.find({ id: id }, function (err, problem) {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(201).json(problem).send();
    }
  });
});

exports.getAll = catchAsync(async (req, res, next) => {
  Problem.find({}, function (err, problems) {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(201).json([problems]);
    }
  });
});
