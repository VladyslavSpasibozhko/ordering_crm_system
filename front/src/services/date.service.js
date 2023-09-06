function withZero(value) {
  if (value >= 10) return value;

  return '0' + value;
}

export function getValues(ms) {
  const date = new Date(ms);

  const hours = date.getHours();
  const minutes = date.getMinutes();

  const day = date.getDate();
  const month = date.getMonth() + 1;

  return {
    hours: withZero(hours),
    minutes: withZero(minutes),
    day: withZero(day),
    month: withZero(month),
  };
}
