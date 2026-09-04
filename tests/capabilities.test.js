"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const filePath = path.join(__dirname, "../assets/js/capabilities.js");
const expectedPointers = [
  "Business problem discovery",
  "Commercial acumen",
  "AI use-case prioritisation",
  "Business-case development",
  "Consultative questioning",
  "Executive communication",
  "Stakeholder management",
  "Solution storytelling",
  "Presales and proposal development",
  "Project and delivery management",
  "Change management and adoption",
  "AI governance and risk",
  "Negotiation and expectation management",
  "Industry knowledge",
  "Benefits realisation",
];

const context = {
  document: {
    addEventListener: function noop() {},
    querySelector: function none() {
      return null;
    },
  },
};

const source =
  fs.readFileSync(filePath, "utf8") +
  "\nthis.CAPABILITY_GROUPS = CAPABILITY_GROUPS;\nthis.buildCapabilityGroup = buildCapabilityGroup;\n";
vm.runInNewContext(source, context, { filename: filePath });

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const groups = context.CAPABILITY_GROUPS;
assert(groups.length === 3, "expected three capability groups");

const pointers = groups.reduce(function collect(all, group) {
  return all.concat(group.pointers);
}, []);

assert(pointers.length === expectedPointers.length, "expected fifteen key pointers");
expectedPointers.forEach(function checkPointer(pointer) {
  assert(pointers.indexOf(pointer) !== -1, "missing pointer: " + pointer);
});

const markup = context.buildCapabilityGroup(groups[0]);
assert(markup.indexOf("Discover") !== -1, "group markup should include the title");
assert(markup.indexOf("<script") === -1, "group markup should not include scripts");

console.log("capabilities.test.js: " + pointers.length + " pointers - OK");
