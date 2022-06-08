const fs = require('fs');
const { formFields } = require('./src/formFields.js');
const { createForm } = require('./src/createForm.js');
const { registerResponse } = require('./src/registerResponse.js');

const writeForm = (form) => {
  fs.writeFileSync('./form.json', JSON.stringify(form), 'utf8');
};

const fillForm = () => {
  const form = createForm(formFields);
  process.stdin.setEncoding('utf8');

  console.log(form.getCurrentPrompt());
  process.stdin.on('data', (chunk) => {
    const responses = chunk.trimEnd().split('\n');
    responses.forEach((response) => {
      registerResponse(form, response, console.log, writeForm);
    });
  });
};

fillForm();
