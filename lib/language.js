exports.turkishToEnglish = (word) => {
  return word
    .replace("Ğ", "g")
    .replace("Ü", "u")
    .replace("Ş", "s")
    .replace("I", "i")
    .replace("İ", "i")
    .replace("Ö", "o")
    .replace("Ç", "c")
    .replace("ğ", "g")
    .replace("ü", "u")
    .replace("ş", "s")
    .replace("ı", "i")
    .replace("ö", "o")
    .replace("ç", "c");
};
