export function validateIntegerInput(input) {
  const regex = new RegExp(/^\d+$/);
  return regex.test(input);
}

export function validateDecimalInput(input) {
  const regex = new RegExp(/^\d+(\.\d{1,2})?$/);
  return regex.test(input);
}

export default { validateIntegerInput, validateDecimalInput };