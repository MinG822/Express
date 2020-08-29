module.exports.validateForm = function (form) {
  for (const key in form) {
    if (!form[key]) throw Error('Please provide correct Info');
  }
}