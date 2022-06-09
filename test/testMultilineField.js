const assert = require('assert');
const { MultilineField } = require('../src/multilineField.js');

describe('MultilineField', () => {
  it('should equate fields of the same MultilineField entity', () => {
    const addressField = new MultilineField('address', ['1', '2']);
    const otheraddressField = new MultilineField('address', ['1', '2']);
    assert.ok(addressField.equals(otheraddressField));
  });

  it('should not equate different fields of the same MultilineField entity',
    () => {
      const addressField = new MultilineField('address', ['1', '2']);
      const descriptionField = new MultilineField('description', ['1', '2']);
      assert.ok(!addressField.equals(descriptionField));
    });

  it('should not equate fields of different MultilineField entity', () => {
    const addressField = new MultilineField('address', ['1', '2']);
    const descriptionField = { name: 'description', prompts: ['1', '2'] };
    assert.ok(!addressField.equals(descriptionField));
  });

  it('should fill the given response', () => {
    const addressField = new MultilineField('address', ['line1', 'line2']);
    const response = 'Dixi';
    addressField.fill(response);
    const expected = { name: 'address', response: ['Dixi'] };
    assert.deepStrictEqual(addressField.getResponse(), expected);
  });

  it('should fill multiline responses', () => {
    const addressField = new MultilineField('address', ['line1', 'line2']);
    addressField.fill('Dixi');
    addressField.fill('Nashik');
    const expected = { name: 'address', response: ['Dixi', 'Nashik'] };
    assert.deepStrictEqual(addressField.getResponse(), expected);
  });

  it('should provide the current prompt of the field', () => {
    const addressField = new MultilineField('address', ['line1', 'line2']);
    assert.strictEqual(addressField.getPrompt(), 'line1');
  });

  it('should provide the current prompt after filling a response', () => {
    const addressField = new MultilineField('address', ['line1', 'line2']);
    addressField.fill('Dixi');
    assert.strictEqual(addressField.getPrompt(), 'line2');
  });

  it('should assert if field is not filled', () => {
    const addressField = new MultilineField('address', ['line1', 'line2']);
    addressField.fill('Dixi');
    assert.ok(!addressField.isFilled());
  });

  it('should assert if field is filled', () => {
    const addressField = new MultilineField('address', ['line1', 'line2']);
    addressField.fill('Dixi');
    addressField.fill('Nashik');
    assert.ok(addressField.isFilled());
  });

  it('should validate the response', () => {
    const isNotEmpty = (text) => text.length > 0;
    const addressField = new MultilineField('address', ['1', '2'], isNotEmpty);
    assert.ok(!addressField.isValid(''));
    assert.ok(addressField.isValid('abcde'));
  });

  it('should provide parsed response', () => {
    const alwaysTrue = () => true;
    const joinByLines = (lines) => lines.join('\n');
    const addressField = new MultilineField('address', ['1', '2'], alwaysTrue,
      joinByLines);
    addressField.fill('Dixi');
    addressField.fill('Nashik');
    const expected = { name: 'address', response: 'Dixi\nNashik' };
    assert.deepStrictEqual(addressField.getResponse(), expected);
  });
});
