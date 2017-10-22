function speechValidate(str) {
  str = str.toUpperCase();
  str = str.replace(/\s/g, ''); //remove all spaces
  str = str.replace(/[^a-zA-Z0-9 ]/g, ""); //remove all special characters


  return str;
}
