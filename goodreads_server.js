Goodreads = {};

var urls = {
  requestToken: "https://www.goodreads.com/oauth/request_token",
  authorize: "https://www.goodreads.com/oauth/authorize",
  accessToken: "https://www.goodreads.com/oauth/access_token",
  authenticate: function(item) {
    console.log("\n\n\n\n\n============")
    console.log(item);
    console.log("\n\n\n\n\n============")
    return "https://www.goodreads.com/oauth/authorize?oauth_callback=" + encodeURIComponent(Meteor.absoluteUrl("_oauth/goodreads"))
  }
};


// https://dev.twitter.com/docs/api/1.1/get/account/verify_credentials
Goodreads.whitelistedFields = ['profile_image_url', 'profile_image_url_https', 'lang'];

OAuth.registerService('goodreads', 1, urls, function(oauthBinding) {
  
  var identity = oauthBinding.get('https://www.goodreads.com/api/auth_user').data;

  console.log(identity);

  var serviceData = {
    id: identity.id_str,
    screenName: identity.screen_name,
    accessToken: OAuth.sealSecret(oauthBinding.accessToken),
    accessTokenSecret: OAuth.sealSecret(oauthBinding.accessTokenSecret)
  };

  // include helpful fields from twitter
  var fields = _.pick(identity, Goodreads.whitelistedFields);
  _.extend(serviceData, fields);

  return {
    serviceData: serviceData,
    options: {
      profile: {
        name: identity.name
      }
    }
  };
});


Goodreads.retrieveCredential = function(credentialToken, credentialSecret) {
  return OAuth.retrieveCredential(credentialToken, credentialSecret);
};