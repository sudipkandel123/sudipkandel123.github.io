"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.join(__dirname, "..");
const dataPath = path.join(root, "assets/js/recommendations-data.js");
const renderPath = path.join(root, "assets/js/references.js");
const indexPath = path.join(root, "index.html");
const referencePath = path.join(root, "reference.html");
const requiredFields = [
  "id",
  "name",
  "role",
  "relationship",
  "company",
  "date",
  "linkedinUrl",
  "avatarInitials",
  "accent",
  "filters",
  "featuredQuote",
  "message",
];
const expectedNames = [
  "Suganthini Arunachalam",
  "Volha Nestserava",
  "Desmond Nwanugo",
  "Vikas Gurung",
  "Igors Lapinskis",
  "Oleg Koltun",
  "Yury Kutsko",
  "Aniket Pande",
  "Erkan Berk",
  "Mohanapriya Jagannathan",
  "Peter Najm",
  "Razia Sultana",
  "Umesh Gopalappa",
  "Khusboo Agarwal",
  "Monica Gupta",
  "Suresh Gudiputi",
  "Anjana Balagopalan",
  "Akshay Arora",
  "Mahitha Anumukonda",
  "Pravinkumar Subramanian",
  "Ishwarya Sriraman",
  "Lochan Kaushik",
  "Shiva kumar Peruri",
  "Tejaswini S R",
  "Rabindra Neupane",
  "Tamilselvi Uthandi",
  "Pravin Pathak",
  "Vatsal Bhandari",
  "Harshitha Deshpande",
  "Mohd Emad",
  "Vinay Y",
  "Arunima Sarkar",
  "Nishant Sharma",
  "Sanjana Singh",
  "Rushali Raina",
  "Ambreesh Pothuraju",
  "Prathippa Devi",
  "G Ankitha Shetty",
];

function loadScript(filePath, context) {
  const source =
    fs.readFileSync(filePath, "utf8") +
    "\n" +
    "this.RECOMMENDATIONS = typeof RECOMMENDATIONS !== 'undefined' ? RECOMMENDATIONS : this.RECOMMENDATIONS;\n" +
    "this.RECOMMENDATION_FILTER = typeof RECOMMENDATION_FILTER !== 'undefined' ? RECOMMENDATION_FILTER : this.RECOMMENDATION_FILTER;\n" +
    "this.RECOMMENDATION_THEMES = typeof RECOMMENDATION_THEMES !== 'undefined' ? RECOMMENDATION_THEMES : this.RECOMMENDATION_THEMES;\n" +
    "this.buildRecommendationCard = typeof buildRecommendationCard !== 'undefined' ? buildRecommendationCard : this.buildRecommendationCard;\n" +
    "this.getFeaturedRecommendations = typeof getFeaturedRecommendations !== 'undefined' ? getFeaturedRecommendations : this.getFeaturedRecommendations;\n" +
    "this.matchesRecommendationFilter = typeof matchesRecommendationFilter !== 'undefined' ? matchesRecommendationFilter : this.matchesRecommendationFilter;\n";
  vm.runInNewContext(source, context, { filename: filePath });
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function assertNoCountCopy(text, label) {
  assert(text.indexOf("38 recommendations") === -1, label + " should not mention a recommendation count");
  assert(text.indexOf("all 38") === -1, label + " should not use numbered all-copy");
  assert(text.indexOf("View all 38") === -1, label + " should not use numbered view-all copy");
}

const context = {
  document: {
    addEventListener: function noop() {},
    querySelector: function none() {
      return null;
    },
  },
  AOS: { init: function noop() {} },
};

loadScript(dataPath, context);
loadScript(renderPath, context);

const recommendations = context.RECOMMENDATIONS;
const filters = context.RECOMMENDATION_FILTER;
const themes = context.RECOMMENDATION_THEMES;

assert(Array.isArray(recommendations), "recommendations should be an array");
assert(
  recommendations.length === expectedNames.length,
  "every LinkedIn recommendation should be present"
);

const names = recommendations.map(function toName(recommendation) {
  return recommendation.name;
});
expectedNames.forEach(function checkName(name) {
  assert(names.indexOf(name) !== -1, "missing recommendation from " + name);
});

const ids = new Set();
recommendations.forEach(function validateRecommendation(recommendation) {
  requiredFields.forEach(function checkField(fieldName) {
    assert(
      recommendation[fieldName] !== undefined && recommendation[fieldName] !== "",
      recommendation.name + " missing " + fieldName
    );
  });
  assert(Array.isArray(recommendation.filters), recommendation.name + " filters should be an array");
  assert(!ids.has(recommendation.id), "duplicate id " + recommendation.id);
  ids.add(recommendation.id);
  assert(recommendation.message.length > 80, recommendation.name + " message is too short");
  assert(recommendation.featuredQuote.length > 20, recommendation.name + " featured quote is too short");
  assert(recommendation.linkedinUrl.indexOf("linkedin.com") !== -1, recommendation.name + " needs a LinkedIn URL");
  if (recommendation.company === "AWTG") {
    assert(
      recommendation.filters.indexOf(filters.AWTG) !== -1,
      recommendation.name + " should be tagged AWTG"
    );
  }
  if (recommendation.company === "Accenture") {
    assert(
      recommendation.filters.indexOf(filters.ACCENTURE) !== -1,
      recommendation.name + " should be tagged Accenture"
    );
  }
  if (recommendation.company === "EXL") {
    assert(
      recommendation.filters.indexOf(filters.EXL) !== -1,
      recommendation.name + " should be tagged EXL"
    );
  }
});

const featured = context.getFeaturedRecommendations();
assert(featured.length > 0, "featured recommendations should exist for the home preview");
featured.forEach(function validateFeatured(recommendation) {
  assert(recommendation.featured === true, recommendation.name + " should be marked featured");
});

assert(themes.length === 4, "expected four highlight themes");
themes.forEach(function validateTheme(theme) {
  assert(theme.title && theme.summary && theme.source, "theme is incomplete");
});

const suganthiniCard = context.buildRecommendationCard(recommendations[0], { preview: false });
assert(suganthiniCard.indexOf("Suganthini") !== -1, "card should include recommender name");
assert(suganthiniCard.indexOf("<script") === -1, "card should not include raw script tags");

const longPreview = recommendations.filter(function findLong(recommendation) {
  return recommendation.message.length > 220;
})[0];
assert(Boolean(longPreview), "expected at least one long recommendation for preview truncation");
const previewCard = context.buildRecommendationCard(longPreview, { preview: true });
assert(previewCard.indexOf("Read full recommendation") !== -1, "long preview should link to the full page");

assert(
  context.matchesRecommendationFilter(recommendations[0], filters.ALL) === true,
  "all filter should include every recommendation"
);
assert(
  context.matchesRecommendationFilter(
    recommendations.filter(function findExl(recommendation) {
      return recommendation.company === "EXL";
    })[0],
    filters.AWTG
  ) === false,
  "EXL recommendation should not match the AWTG filter"
);

const indexHtml = fs.readFileSync(indexPath, "utf8");
const referenceHtml = fs.readFileSync(referencePath, "utf8");
assertNoCountCopy(indexHtml, "home page");
assertNoCountCopy(referenceHtml, "recommendations page");
assert(indexHtml.indexOf("See all recommendations") !== -1, "home should link to the full recommendations page");
assert(referenceHtml.indexOf("id=\"recommendation-stats\"") === -1, "recommendations page should not show numeric totals");

console.log("recommendations.test.js: full recommendation set - OK");
