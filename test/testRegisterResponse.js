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

  it('should display next prompt', () => {
    const nameField = new Field('name', 'Enter name');
    const dobField = new Field('dob', 'Enter DOB');
    const form = new Form(nameField, dobField);
    const identity = (text) => text;
    const logger = (text) => logs.push(text);
    const response = 'Prince';
    const logs = [];

    registerResponse(form, response, logger, identity);
    assert.deepStrictEqual(logs, ['Enter DOB']);
  });

  it('should display error of invalid response for the current field', () => {
    const isMinLengthFive = (text) => text.length >= 5;
    const nameField = new Field('name', 'Enter name', isMinLengthFive);
    const form = new Form(nameField);
    const identity = (text) => text;
    const logger = (text) => logs.push(text);
    const response = 'ABC';
    const logs = [];

    registerResponse(form, response, logger, identity);
    assert.deepStrictEqual(logs, ['Invalid Response', 'Enter name']);
  });

  it('should display thank you at the end of filling complete form', () => {
    const nameField = new Field('name', 'Enter name');
    const form = new Form(nameField);
    const identity = (text) => text;
    const logger = (text) => logs.push(text);
    const response = 'ABC';
    const logs = [];

    registerResponse(form, response, logger, identity);
    assert.deepStrictEqual(logs, ['Thank you']);
  });
});
