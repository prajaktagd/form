const assert = require('assert');
const { Form } = require('../src/form.js');
const { Field } = require('../src/field.js');

describe('Form', () => {
  it('should fill given response for the current field', () => {
    const nameField = new Field('name', 'Enter name');
    const form = new Form(nameField);
    form.fillCurrentField('ABC');
    assert.deepStrictEqual(form.getResponses(), { name: 'ABC' });
  });

  it('should fill multiple responses', () => {
    const nameField = new Field('name', 'Enter name');
    const dobField = new Field('dob', 'Enter dob');
    const form = new Form(nameField, dobField);
    const expected = { name: 'ABC', dob: '2010-10-10' };

    form.fillCurrentField('ABC');
    form.fillCurrentField('2010-10-10');
    assert.deepStrictEqual(form.getResponses(), expected);
  });

  it('should throw error of invalid response for current field', () => {
    const isMinLengthFive = (text) => text.length >= 5;
    const nameField = new Field('name', 'Enter name', isMinLengthFive);
    const form = new Form(nameField);
    const expError = { message: 'Invalid Response' };
    assert.throws(() => form.fillCurrentField('ABC'), expError);
  });

  it('should provide current prompt', () => {
    const nameField = new Field('name', 'Enter name');
    const form = new Form(nameField);
    assert.strictEqual(form.getCurrentPrompt(), 'Enter name');
  });

  it('should assert if form is not filled', () => {
    const nameField = new Field('name', 'Enter name');
    const form = new Form(nameField);
    assert.ok(!form.isFilled());
  });

  it('should assert if form is filled', () => {
    const nameField = new Field('name', 'Enter name');
    const dobField = new Field('dob', 'Enter dob');
    const form = new Form(nameField, dobField);
    form.fillCurrentField('Prince');
    form.fillCurrentField('2011-11-11');
    assert.ok(form.isFilled());
  });
});
