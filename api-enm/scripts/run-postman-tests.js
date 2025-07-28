const newman = require('newman');

newman.run({
  collection: require('../tests/Rarelygroovy_API.postman_collection.json'),
  reporters: ['cli', 'junit'],
  environment: {}, // optional: add your Postman environment file here
}, function (err) {
  if (err) {
    console.error('❌ Postman tests failed.');
    process.exit(1); // fail CI
  } else {
    console.log('✅ Postman tests passed.');
  }
});