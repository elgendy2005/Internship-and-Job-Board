/**
 * An error that carries an HTTP status code.
 * Throw it from a route handler and the JSON error handler turns it into
 * `{ "error": message }` with the given status.
 *
 * @example throw new HttpError(409, 'You have already applied to this internship');
 */
export class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
  }
}
