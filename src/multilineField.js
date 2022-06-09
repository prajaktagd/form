const { deepEqual } = require('./deepEqual.js');
const alwaysTrue = () => true;
const identity = (text) => text;

class MultilineField {
  #name;
  #prompts;
  #validate;
  #parse;
  #responses;

  constructor(name, prompts, validate = alwaysTrue, parse = identity) {
    this.#name = name;
    this.#prompts = prompts;
    this.#validate = validate;
    this.#parse = parse;
    this.#responses = [];
  }

  equals(otherMultilineField) {
    return otherMultilineField instanceof MultilineField &&
      this.#name === otherMultilineField.#name &&
      deepEqual(this.#prompts, otherMultilineField.#prompts);
  }

  getPrompt() {
    const index = this.#responses.length;
    return this.#prompts[index];
  }

  isFilled() {
    return this.#responses.length === this.#prompts.length;
  }

  isValid(response) {
    return this.#validate(response);
  }

  fill(response) {
    this.#responses.push(response);
  }

  getResponse() {
    return { name: this.#name, response: this.#parse(this.#responses) };
  }
}

module.exports = { MultilineField };
