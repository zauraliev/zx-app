class Hello {
  constructor(config) {
    this.target = config.target;
  }

  run() {
    this.target.innerHTML = `
      <p>
        Hello from ECMAScript 2021
      </p>
    `;
  }
}

export default Hello