// HTML Escape helper utility
// https://developers.google.com/web/updates/2015/01/ES6-Template-Strings

// Tagged template function
export function html(pieces) {
  var result = pieces[0];
  var substitutions = [].slice.call(arguments, 1);
  for (var i = 0; i < substitutions.length; ++i) {
    result += substitutions[i] + pieces[i + 1];
  }

  return result;
}
