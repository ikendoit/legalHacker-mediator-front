// return Boolean
export const checkSectionFilled = (sectionArray: Array<any>) => {
  for (let record of sectionArray) {
    if (record.answer === null) return false
  }
  return true
}

// return index of unfilled question
export const getNextUnFilled = (sectionArray: Array<any>) => {
  const rec = sectionArray.find(record => record.answer === null)
  const id = sectionArray.findIndex(record => record.answer === null)
  return {id, ...rec}
}
