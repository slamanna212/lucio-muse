export default (error?: string | Error): string => {
  let str = 'unknown error';

  if (error) {
    if (typeof error === 'string') {
      str = `🚫 Aw man: ${error}`;
    } else if (error instanceof Error) {
      str = `🚫 Aw man: ${error.message}`;
    }
  }

  return str;
};
