'use strict';
// TODO mixin "soft delete"
module.exports = function(Model, options) {
  Model.belongsTo(Model, {as: 'parent', foreignKey: 'parentId'});
  Model.hasMany(Model, {as: 'children', foreignKey: 'parentId'});
  Model.referencesMany(Model, {
    as: 'ancestors',
    foreignKey: 'ancestorIds',
    options: {
      validate: true,
    },
  });
  Model.observe('before save', function event(ctx, next) {
    // TODO 'instance' n'est pas utilisé dans le cas d'une mise à jour -> updatedInstance???
    if (ctx.instance) {
      if (ctx.instance.parent()) {
        var c = ctx.instance.parent();
        while (c) {
          ctx.instance.ancestors.add(c).then(function(res) {
            console.log(res);
          }).catch(function(err) {
            // TODO error that I don't understand
            console.log(err);
          });
          c = c.parent();
        }
      }
    }
    next();
  });
};
