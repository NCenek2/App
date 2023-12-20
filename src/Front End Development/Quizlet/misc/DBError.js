class DBError extends Error {
  constructor(message, response) {
    super(message);
    this.status = 0;
    this.response = response;
  }
}

export default DBError;
