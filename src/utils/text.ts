export const toTitleCase = (text: string, delimeter = '-') => {
  const formattedText = text.replace(delimeter, ' ');

  return formattedText.charAt(0).toUpperCase() + formattedText.substring(1);
};
