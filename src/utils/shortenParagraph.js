export default function shortenParagraph(paragraph, maxLength) {
  if (paragraph.length <= maxLength) {
    return paragraph;
  }
  return paragraph.slice(0, maxLength) + "...";
}
