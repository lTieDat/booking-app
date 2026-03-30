const pluralize = (count, singular, plural) => {
  // testcase: DatLT - NounPluralization_Singular_Success (PLU12.1)
  // testcase: DatLT - NounPluralization_ZeroCount_Success (PLU12.3)
  // testcase: DatLT - NounPluralization_NonInteger_Success (PLU12.6)
  // testcase: DatLT - NounPluralization_EmptyStrings_Fail (PLU12.7)
  return count > 1 ? plural : singular
  // testcase: DatLT - NounPluralization_Plural_Success (PLU12.2)
  // testcase: DatLT - NounPluralization_CustomPlural_Success (PLU12.5)
}

export default pluralize
