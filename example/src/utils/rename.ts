const singleDigitNumbers = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine']

export function rename(fileName: string) {
  return fileName
    .replace(/([a-zA-Z])(\d)|(\d)([a-zA-Z])/g, '$1$3_$2$4')
    .replace(/\d/g, match => (singleDigitNumbers as any)[match])
    .replace(/(^.)|(_)(.)/g, (_, p1, _p2, p3) => (p1 || p3).toUpperCase())
}
