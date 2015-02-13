Template.configureLoginServiceDialogForGoodreads.helpers({
  siteUrl: function () {
  // Twitter doesn't recognize localhost as a domain name
    return Meteor.absoluteUrl({replaceLocalhost: true});
  }
});

Template.configureLoginServiceDialogForGoodreads.fields = function () {
  return [
    {property: 'consumerKey', label: 'Key'},
    {property: 'secret', label: 'Secret'}
  ];
};