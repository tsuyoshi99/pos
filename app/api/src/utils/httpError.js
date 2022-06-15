class HttpError extends Error {
  constructor(status, customError) {
    super(customError.name)
    this.status = status
    this.details = customError.description
    Object.setPrototypeOf(this, HttpError.prototype)
  }
}

module.exports = { HttpError }
