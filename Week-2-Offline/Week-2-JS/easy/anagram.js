function isAnagram(str1, str2) {
  if (str1.length !== str2.length) return false;

  function sortt(str) {
    return str.toLowerCase().split("").sort().join("");
  }

  return sortt(str1) === sortt(str2);
}
