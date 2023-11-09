const cut = (text, clip = 180) => {
  if (!text) return '';
  text = text.trim();
  if (text.length <= clip + 3) return text;
  let cutted = text.substring(0, clip);
  cutted = cutted.substring(0, cutted.lastIndexOf(' '));
  return `${cutted}...`;
};

export default cut;
