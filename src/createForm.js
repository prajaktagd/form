const { Field } = require('./field.js');
const { Form } = require('./form.js');

const createField = (formField) => {
  const { name, prompt, validate, parse } = formField;
  return new Field(name, prompt, validate, parse);
};

const createForm = (formFields) => {
  const fields = formFields.map(createField);
  return new Form(...fields);
};

module.exports = { createForm };
