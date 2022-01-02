class Hello {
  constructor(config) {
    this.target = config.target;
  }

  run() {
    this.target.innerHTML = `
      <p>
        Hello from ECMAScript 2022
      </p>
    `;
  }
}

export default Hello