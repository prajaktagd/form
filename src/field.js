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

  fill(response) {
    this.#response = response;
  }

  isValid(response) {
    return this.#validate(response);
  }

  getResponse() {
    return { name: this.#name, response: this.#response };
  }
}

module.exports = { Field };
