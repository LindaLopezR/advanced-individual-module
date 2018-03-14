// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by advanced-individual-module.js.
import { name as packageName } from "meteor/advanced-individual-module";

// Write your tests here!
// Here is an example.
Tinytest.add('advanced-individual-module - example', function (test) {
  test.equal(packageName, "advanced-individual-module");
});
