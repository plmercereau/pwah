'use strict';

// TODO put in a helper library?
function capitalizeFirstLetter(input) {
  return input.charAt(0).toUpperCase() + input.slice(1);
}
module.exports = function(Model, options) {
  Model.observe('before save', function event(ctx, next) {
    var dest = ctx.instance ? ctx.instance : ctx.data;
    var index, field; // TODO changer cette version horrible de javacsript et lint
    for (index in options['firstLetter']) {
      field = options['firstLetter'][index];
      if (dest[field]) dest[field] = capitalizeFirstLetter(dest[field]);
    };
    for (index in options['all']) {
      field = options['all'][index];
      if (dest[field]) dest[field] = dest[field].toUpperCase();
    };
    next();
  });
};
