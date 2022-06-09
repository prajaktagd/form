const { Field } = require('./field.js');
const { MultilineField } = require('./multilineField.js');
const { Form } = require('./form.js');

const createField = (formField) => {
  const { name, prompt, validate, parse } = formField;
  return new Field(name, prompt, validate, parse);
};

const createForm = (formFields) => {
  let fields = formFields.slice(0, formFields.length - 1).map(createField);

  const { name, prompt: prompts, validate, parse } = formFields.slice(-1)[0];
  const addressField = new MultilineField(name, prompts, validate, parse);
  fields = fields.concat(addressField);
  return new Form(...fields);
};

module.exports = { createForm };
