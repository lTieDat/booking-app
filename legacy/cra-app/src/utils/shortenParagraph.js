export default function shortenParagraph(paragraph, maxLength) {
  // testcase: DatLT - ShortenText_ShortText_Success (SHORT13.1)
  // testcase: DatLT - ShortenText_ExactLength_Success (SHORT13.2)
  // testcase: DatLT - ShortenText_EmptyString_Success (SHORT13.4)
  // testcase: DatLT - ShortenText_ZeroMaxLength_Success (SHORT13.5)
  // testcase: DatLT - ShortenText_OneCharMax_Success (SHORT13.6)
  // testcase: DatLT - ShortenText_LargeMaxLength_Success (SHORT13.7)
  // testcase: DatLT - ShortenText_NullInput_Success (SHORT13.8)
  // testcase: DatLT - ShortenText_UndefinedInput_Success (SHORT13.9)
  // testcase: DatLT - ShortenText_NonStringInput_Success (SHORT13.10)
  if (paragraph.length <= maxLength) {
    return paragraph
  }
  // testcase: DatLT - ShortenText_Truncated_Success (SHORT13.3)
  return paragraph.slice(0, maxLength) + '...'
}
