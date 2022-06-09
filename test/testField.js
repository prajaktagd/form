const assert = require('assert');
const { Field } = require('../src/field.js');

describe('Field', () => {
  it('should equate fields of the same Field entity', () => {
    const nameField = new Field('name', 'Enter name');
    const otherNameField = new Field('name', 'Enter name');
    assert.ok(nameField.equals(otherNameField));
  });

  it('should not equate different fields of the same Field entity', () => {
    const nameField = new Field('name', 'Enter name');
    const dobField = new Field('dob', 'Enter DOB');
    assert.ok(!nameField.equals(dobField));
  });

  it('should not equate fields of different Field entity', () => {
    const nameField = new Field('name', 'Enter name');
    const dobField = { name: 'dob', prompt: 'Enter DOB' };
    assert.ok(!nameField.equals(dobField));
  });

  it('should fill the given response', () => {
    const nameField = new Field('name', 'Enter name');
    const response = 'ABC';
    nameField.fill(response);
    const expected = { name: 'name', response: 'ABC' };
    assert.deepStrictEqual(nameField.getResponse(), expected);
  });

  it('should provide the prompt of the field', () => {
    const nameField = new Field('name', 'Enter name');
    assert.strictEqual(nameField.getPrompt(), 'Enter name');
  });

  it('should assert if field is not filled', () => {
    const nameField = new Field('name', 'Enter name');
    assert.ok(!nameField.isFilled());
  });

  it('should assert if field is filled', () => {
    const nameField = new Field('name', 'Enter name');
    nameField.fill('ABC');
    assert.ok(nameField.isFilled());
  });

  it('should validate the response', () => {
    const isMinLengthFive = (text) => text.length >= 5;
    const nameField = new Field('name', 'Enter name', isMinLengthFive);
    assert.ok(!nameField.isValid('ABC'));
    assert.ok(nameField.isValid('ABCDE'));
  });

  it('should provide parsed hobbies', () => {
    const identity = (text) => text;
    const splitByCommas = (text) => text.split(',');
    const hobbiesField = new Field('hobbies', 'likes', identity, splitByCommas);
    hobbiesField.fill('drawing,sketching');
    const expected = { name: 'hobbies', response: ['drawing', 'sketching'] };
    assert.deepStrictEqual(hobbiesField.getResponse(), expected);
  });
});
