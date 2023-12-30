const fs = require('fs');
const AppError = require('../utils/appError');
const { exec, spawn } = require('child_process');

const extensions = {
  cpp: 'cpp',
  'c++': 'cpp',
  'c plus plus': 'cpp',
  python: 'py',
  py: 'py',
  python3: 'py',
  python2: 'py',
};

class Compiler {
  /**
   *
   * @param {String} sourceCode
   * @param {String} language
   * @param {String} pid
   * @param {String} timeLimit
   */
  constructor(sourceCode, language, pid, timeLimit) {
    this.sourceCode = sourceCode;
    this.language = language;
    this.path = `${__dirname}/problems/p${pid}`; // + pid
    this.fileName = (Math.random() * 100000).toFixed().toString();
    this.fileNameWithExt = this.fileName + '.' + extensions[this.language];
    this.timeLimit = timeLimit;

    this.generateCommand();
  }

  generateCppCommand() {
    this.compilingCommand = `cd ${this.path} && g++ ${this.fileNameWithExt} -o ${this.fileName}`;
    this.runCommand = `cd ${this.path} && python3 ../runCpp.py ${this.fileName} input.txt output.txt correctOutput.txt ${this.timeLimit}`;
    this.cleaningCommand = `cd ${this.path} && rm ${this.fileName}* && >output.txt`;
  }

  generatePythonCommand() {
    this.compilingCommand = `cd ${this.path}`;
    this.runCommand = `cd ${this.path} && python3 ../runPython.py ${this.fileNameWithExt} input.txt output.txt correctOutput.txt ${this.timeLimit}`;
    this.cleaningCommand = `cd ${this.path} && rm ${this.fileNameWithExt} && >output.txt`;
  }

  generateCommand() {
    switch (this.language) {
      case 'cpp':
        return this.generateCppCommand();
      case 'python':
        return this.generatePythonCommand();

      default:
        console.error("Couldn't understand the language!");
        return 'Error';
    }
  }

  createTempFolder() {
    return new Promise((resolve, reject) => {
      fs.exists(this.path, (exist) => {
        if (!exist) {
          fs.mkdir(this.path, (err) => {
            if (err) {
              console.error('Error creating temp folder!');
              reject(err);
            }
            resolve('Successfully created the temp folder!');
          });
        } else {
          console.log('already exists');
          resolve('Folder already exists!');
        }
      });
    });
  }

  saveCodeToFile() {
    return new Promise((resolve, reject) => {
      fs.writeFile(
        `${this.path}/${this.fileNameWithExt}`,
        this.sourceCode,
        (err) => {
          if (err) {
            console.error('Error writing the code to the file');
            reject(err);
          }
          console.log('Written the code to the file!');
          resolve('Written the code to the file!');
        }
      );
    });
  }

  compileCode() {
    return new Promise((resolve, reject) => {
      const compileProcess = spawn(this.compilingCommand, { shell: true });

      compileProcess.stderr.on('data', (data) => {
        console.warn('Error came from compilation!');

        console.log(data.toString());
        resolve({
          status: 'ce',
          time: 0,
          message: 'Compilation Error: ' + data.toString(),
        });
      });

      compileProcess.on('error', (err) => {
        console.error('Error compiling the code');
        reject(err);
      });

      compileProcess.on('exit', (code) => {
        if (code === 0) {
          console.log({ message: 'Successfully compiled!' });

          const runProcess = spawn(this.runCommand, {
            maxBuffer: 1024 * 10,
            shell: true,
          });

          runProcess.stderr.on('data', (data) => {
            console.warn('Error! ' + this.runCommand);
            const message = data.toString();
            // put resolve here for TLE
            console.log(message);
            if (message.includes('Time Limit Expired')) {
              resolve({
                status: 'tle',
                time: this.timeLimit * 1000,
                message: message,
              });
            } else {
              resolve({ status: 're', time: 0, message: message });
            }
          });

          runProcess.on('error', (err) => {
            reject(err);
          });
          let time;
          let status;
          runProcess.stdout.on('data', (data) => {
            const temp = `${data}`.split(' ');
            time = temp[0];
            status = temp[1];
            console.log(`${time}ms ${status}`);
          });

          runProcess.on('exit', (runCode) => {
            if (runCode === 0) {
              resolve({
                status: status,
                time: time,
                message: status === 'ac' ? 'Accepted' : 'Wrong Answer',
              });
            } else {
              resolve({ status: 're', time: 0, message: runCode });
            }
          });
        } else {
          reject(new Error('Compilation process exited with code ' + code));
        }
      });
    });
  }

  cleanCode() {
    return new Promise((resolve, reject) => {
      exec(this.cleaningCommand, (err, stdout, stderr) => {
        if (err) {
          console.error('Error cleaning the code!');
          reject(err);
        }
        resolve('Succesfully cleaned!');
      });
    });
  }
  //
  async compile() {
    try {
      await this.createTempFolder();
      await this.saveCodeToFile();
      const output = await this.compileCode();

      await this.cleanCode();
      return output;
    } catch (err) {
      await this.cleanCode();
      throw err;
    }
  }
}

module.exports = Compiler;
