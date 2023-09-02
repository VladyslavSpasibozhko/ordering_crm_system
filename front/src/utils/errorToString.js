export function errorToString(response) {
  const error = response.errors.map((error) => error.message).join(' | ');
  return error;
}
