const fs = require('fs');
const { Form } = require('./src/form.js');
const { Field } = require('./src/field.js');
const { registerResponse } = require('./src/registerResponse.js');

const writeForm = (form) => {
  fs.writeFileSync('./form.json', form, 'utf8');
};

const main = () => {
  const form = new Form();

  process.stdin.setEncoding('utf8');

  process.stdout.write(form.getCurrentPrompt());
  process.stdin.on('data', (response) => {
    registerResponse(form, response.trimEnd(), console.log, writeForm);
  });
};

main();
