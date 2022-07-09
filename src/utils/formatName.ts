function formatName(fullName: string) {
  const arrNames = fullName.split(" ");
  let arrFilteredNames = [];

  for (let i = 0; i < arrNames.length; i++) {
    if (arrNames[i].length < 3 && i != 0 && i != arrNames.length - 1) {
      arrNames.splice(i, 1);
    }
  }

  for (let i = 0; i < arrNames.length; i++) {
    if (i != 0 && i != arrNames.length - 1) {
      for (let j = 0; j < 1; j++) {
        arrFilteredNames.push(arrNames[i][j]);
      }
    } else {
      arrFilteredNames.push(arrNames[i]);
    }
  }

  const res = arrFilteredNames.join(" ").toUpperCase();
  return res;
}

export default formatName;
