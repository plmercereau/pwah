'use strict';

module.exports = function(app) {
  /*
   * The `app` object provides access to a variety of LoopBack resources such as
   * models (e.g. `app.models.YourModelName`) or data sources (e.g.
   * `app.datasources.YourDataSource`). See
   * http://docs.strongloop.com/display/public/LB/Working+with+LoopBack+objects
   * for more info.
   */
  var OrgUnit = app.models.OrgUnit;
  console.log('Flushing the database...');
  OrgUnit.destroyAll();
  console.log('OrgUnit flushed');
  OrgUnit.create({
    name: 'Root',
    shortName: 'Root',
    code: 'root',
    description: 'Root node, system document, Do not remove!'})
    .then(function(root) {
      // TODO remove the insertions below
      OrgUnit.create({name: 'Test', parent: root}).then(function(child) {
        OrgUnit.create({name: 'Fils de test', parent: child});
      });
      OrgUnit.create({name: 'Autre Test', parent: root})
        .then(function(child) {
          OrgUnit.create({name: 'Fils de test autre', parent: child});
        });
      OrgUnit.create({name: 'Dernier Test', parent: root})
        .then(function(child) {
          OrgUnit.create({name: 'Fils du dernier test', parent: child});
        });
    });
  console.log('Root Org Unit created');
};
