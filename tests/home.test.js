"use strict";

const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const indexPath = path.join(root, "index.html");
const homeCssPath = path.join(root, "assets/css/home.css");
const coverImagePath = path.join(root, "assets/images/cover.jpg");

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const indexHtml = fs.readFileSync(indexPath, "utf8");
const homeCss = fs.readFileSync(homeCssPath, "utf8");

assert(indexHtml.indexOf("profile-cover") === -1, "home page should not render the PwC cover banner");
assert(indexHtml.indexOf("cover.jpg") === -1, "home page should not reference cover.jpg");
assert(homeCss.indexOf("profile-cover") === -1, "home styles should not keep the PwC cover banner");
assert(homeCss.indexOf("cover.jpg") === -1, "home styles should not reference cover.jpg");
assert(fs.existsSync(coverImagePath) === false, "PwC cover image should be removed from assets");
assert(indexHtml.indexOf("particles-js") !== -1, "home page should keep the particle background");
assert(indexHtml.indexOf("schedule-cta-about") === -1, "about section should not include a schedule button");
assert(indexHtml.indexOf("about-schedule") === -1, "about section should not keep schedule button layout");
assert(homeCss.indexOf("about-schedule") === -1, "home styles should not keep about schedule layout");

console.log("home.test.js: PwC cover removed - OK");
