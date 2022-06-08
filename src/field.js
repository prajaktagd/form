class Field {
  #name;
  #prompt;
  #validate;
  #response;

  constructor(name, prompt, validate = () => true) {
    this.#name = name;
    this.#prompt = prompt;
    this.#validate = validate;
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
    return { name: this.#name, response: this.#response };
  }
}

module.exports = { Field };
