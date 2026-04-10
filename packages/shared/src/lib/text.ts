export function shortenParagraph(paragraph: unknown, maxLength: number) {
  const normalized = paragraph == null ? '' : String(paragraph);
  const safeMaxLength = Number.isFinite(maxLength) ? Math.max(0, Math.trunc(maxLength)) : 0;

  if (safeMaxLength === 0) {
    return '';
  }

  if (normalized.length <= safeMaxLength) {
    return normalized;
  }

  return `${normalized.slice(0, safeMaxLength)}...`;
}
