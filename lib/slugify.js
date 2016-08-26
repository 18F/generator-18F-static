module.exports = function slugify(str) {
  return str.toLowerCase()
    .replace(/\W+/g, '-')
    .replace(/-+$/, '');
};

