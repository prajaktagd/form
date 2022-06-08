const fs = require('fs');
const { formFields } = require('./src/formFields.js');
const { createForm } = require('./src/createForm.js');
const { registerResponse } = require('./src/registerResponse.js');

const writeForm = (form) => {
  fs.writeFileSync('./form.json', JSON.stringify(form), 'utf8');
};

const main = () => {
  const form = createForm(formFields);
  process.stdin.setEncoding('utf8');

  console.log(form.getCurrentPrompt());
  process.stdin.on('data', (response) => {
    registerResponse(form, response.trimEnd(), console.log, writeForm);
  });
};

main();
