function isAlphabet(char) {
  return /^[A-Za-z]$/.test(char);
}

function isPalindrome(str) {
  let l = 0;
  let r = str.length - 1;

  while (l < r) {
    while (l < r && !isAlphabet(str[l])) {
      l++;
    }
    while (l < r && !isAlphabet(str[r])) {
      r--;
    }
    if (str[l].toLowerCase() != str[r].toLowerCase()) return false;
    l++;
    r--;
  }
  return true;
}
