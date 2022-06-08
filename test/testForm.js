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

  it('should throw error of invalid response for current field', () => {
    const isMinLengthFive = (text) => text.length >= 5;
    const nameField = new Field('name', 'Enter name', isMinLengthFive);
    const form = new Form(nameField);

    assert.throws(() => form.fillCurrentField('ABC'),
      { message: 'Invalid Response' });
  });
});
