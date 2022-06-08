const assert = require('assert');
const { registerResponse } = require('../src/registerResponse.js');
const { Form } = require('../src/form.js');
const { Field } = require('../src/field.js');

describe('registerResponse', () => {
  it('should register given response for the current field', () => {
    const nameField = new Field('name', 'Enter name');
    const form = new Form(nameField);
    const identity = (text) => text;
    const response = 'Prince';

    registerResponse(form, response, identity, identity);
    assert.deepStrictEqual(form.getResponses(), { name: 'Prince' });
  });
});
