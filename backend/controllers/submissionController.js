const Compiler = require('./../compiler/compiler');
const catchAsync = require('./../utils/catchAsync');
const Submisson = require('./../models/submissionModel');
const Problem = require('./../models/problemModel');

exports.compile = catchAsync(async (req, res, next) => {
  const { sourceCode, language, pid, timeLimit } = req.body;
  const compiler = new Compiler(sourceCode, language, pid, timeLimit);
  const output = await compiler.compile();

  //console.log('It takes ' + output.time + ' ms');
  //saveSubmissiontoDatabase(sourceCode, output, req);
  res.status(200).json(output);
});

const saveSubmissiontoDatabase = (sourceCode, output, req) => {
  const newSubmission = Submisson.create({
    sourceCode,
    problem: req.body.pid, // from req
    submittedBy: req.user._id, // from req
    language: req.body.language,
    submittedOn: Date.now(),
    time: output.time,
    memory: 512, // from output
    verdict: 'ac', // from output
  });
};
