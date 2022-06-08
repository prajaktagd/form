const alwaysTrue = () => true;
const identity = (text) => text;

class Field {
  #name;
  #prompt;
  #validate;
  #parse;
  #response;

  constructor(name, prompt, validate = alwaysTrue, parse = identity) {
    this.#name = name;
    this.#prompt = prompt;
    this.#validate = validate;
    this.#parse = parse;
    this.#response = null;
  }

  equals(otherField) {
    return otherField instanceof Field &&
      this.#name === otherField.#name &&
      this.#prompt === otherField.#prompt;
  }

  getPrompt() {
    return this.#prompt;
  }

  isFilled() {
    return this.#response !== null;
  }

  isValid(response) {
    return this.#validate(response);
  }

  fill(response) {
    this.#response = response;
  }

  getResponse() {
    return { name: this.#name, response: this.#parse(this.#response) };
  }
}

module.exports = { Field };
