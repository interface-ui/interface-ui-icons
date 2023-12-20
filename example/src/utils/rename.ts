const singleDigitNumbers = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
const twoDigitNumbers1 = [
  'Ten',
  'Eleven',
  'Twelve',
  'Thirteen',
  'Fourteen',
  'Fifteen',
  'Sixteen',
  'Seventeen',
  'Eighteen',
  'Nineteen'
];

export const rename = (fileName: string) => {
  fileName = fileName.replace(/(^.)|(_)(.)/g, (_, p1, _p2, p3) => (p1 || p3).toUpperCase());

  if (fileName.startsWith('3dRotation')) {
    return `ThreeD${fileName.slice(2)}`;
  }

  if (fileName.startsWith('3p')) {
    return `ThreeP${fileName.slice(2)}`;
  }

  if (fileName.startsWith('30fps')) {
    return `ThirtyFps${fileName.slice(5)}`;
  }
  if (fileName.startsWith('60fps')) {
    return `SixtyFps${fileName.slice(5)}`;
  }
  if (fileName.startsWith('360')) {
    return `ThreeSixty${fileName.slice(3)}`;
  }

  if (/\dk/.test(fileName)) {
    // @ts-ignore
    return `${singleDigitNumbers[fileName[0]]}K${fileName.slice(2)}`;
  }

  if (/^\dmp/.test(fileName)) {
    // @ts-ignore
    return `${singleDigitNumbers[fileName[0]]}M${fileName.slice(2)}`;
  }
  if (/^1\dmp/.test(fileName)) {
    // @ts-ignore
    return `${twoDigitNumbers1[fileName[1]]}M${fileName.slice(3)}`;
  }
  if (/^2\dmp/.test(fileName)) {
    // @ts-ignore
    return `Twenty${singleDigitNumbers[fileName[1]]}M${fileName.slice(3)}`;
  }

  if (fileName.startsWith('1x')) {
    return `TimesOne${fileName.slice(2)}`;
  }

  if (fileName.startsWith('3g')) {
    return `ThreeG${fileName.slice(2)}`;
  }
  if (fileName.startsWith('4g')) {
    return `FourG${fileName.slice(2)}`;
  }
  if (fileName.startsWith('5g')) {
    return `FiveG${fileName.slice(2)}`;
  }

  // All other names starting with a number between 10 and 19
  if (/^1\d/.test(fileName)) {
    // @ts-ignore
    return `${twoDigitNumbers1[fileName[1]]}${fileName.slice(2)}`;
  }

  return fileName;
}
