const fs = require('fs');
const { Form } = require('./form.js');
const { Field } = require('./field.js');

const writeForm = (form) => {
  fs.writeFileSync('../form.json', form, 'utf8');
};

const registerResponse = (form, response, logger, onResponseReady) => {
  form.fillCurrentField(response);
};

const main = () => {
  const form = new Form();
  process.stdin.setEncoding('utf8');
  process.stdout.write(form.getCurrentLabel());

  process.stdin.on('data', (response) => {
    registerResponse(form, response.trimEnd(), console.log, writeForm);
  });
};

// main();

module.exports = { registerResponse };
