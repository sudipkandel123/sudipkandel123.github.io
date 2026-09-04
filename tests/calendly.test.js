"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.join(__dirname, "..");
const filePath = path.join(root, "assets/js/calendly.js");
const indexPath = path.join(root, "index.html");
const appPath = path.join(root, "assets/js/app.js");
const stylePath = path.join(root, "assets/css/style.css");
const expectedMeetingUrl = "https://calendly.com/sudipkandel/new-meeting";

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function createElementMock(tagName) {
  const attributes = {};
  const listeners = {};
  const children = [];
  const element = {
    tagName: tagName,
    id: "",
    innerHTML: "",
    rel: "",
    href: "",
    src: "",
    async: false,
    children: children,
    getAttribute: function getAttribute(name) {
      if (Object.prototype.hasOwnProperty.call(attributes, name)) {
        return attributes[name];
      }
      return null;
    },
    setAttribute: function setAttribute(name, value) {
      attributes[name] = String(value);
      if (name === "id") {
        element.id = String(value);
      }
    },
    addEventListener: function addEventListener(type, handler) {
      if (!listeners[type]) {
        listeners[type] = [];
      }
      listeners[type].push(handler);
    },
    querySelector: function querySelector(selector) {
      if (
        typeof selector === "string" &&
        selector.indexOf("data-calendly-cta") !== -1 &&
        element.innerHTML.indexOf("data-calendly-cta") !== -1
      ) {
        return createElementMock("a");
      }
      return null;
    },
    appendChild: function appendChild(child) {
      children.push(child);
      if (child && child.id) {
        element.ownerDocumentById = element.ownerDocumentById || {};
      }
      return child;
    },
    getClickHandlers: function getClickHandlers() {
      return listeners.click || [];
    },
    getLoadHandlers: function getLoadHandlers() {
      return listeners.load || [];
    },
  };
  return element;
}

function createDocumentMock() {
  const elementsById = {};
  const head = createElementMock("head");
  const body = createElementMock("body");
  const listeners = {};

  function registerChild(child) {
    if (child && child.id) {
      elementsById[child.id] = child;
    }
    return child;
  }

  const originalHeadAppend = head.appendChild;
  const originalBodyAppend = body.appendChild;
  head.appendChild = function appendHeadChild(child) {
    originalHeadAppend(child);
    return registerChild(child);
  };
  body.appendChild = function appendBodyChild(child) {
    originalBodyAppend(child);
    return registerChild(child);
  };

  return {
    readyState: "loading",
    head: head,
    body: body,
    elementsById: elementsById,
    addEventListener: function addEventListener(type, handler) {
      if (!listeners[type]) {
        listeners[type] = [];
      }
      listeners[type].push(handler);
    },
    getReadyListeners: function getReadyListeners() {
      return listeners.DOMContentLoaded || [];
    },
    getElementById: function getElementById(id) {
      if (Object.prototype.hasOwnProperty.call(elementsById, id)) {
        return elementsById[id];
      }
      return null;
    },
    querySelectorAll: function querySelectorAll() {
      return [];
    },
    createElement: function createElement(tagName) {
      return createElementMock(tagName);
    },
    registerElement: function registerElement(id, element) {
      elementsById[id] = element;
      element.id = id;
    },
  };
}

function loadCalendlyModule(documentMock, windowMock) {
  const context = {
    window: windowMock,
    document: documentMock,
  };
  const source =
    fs.readFileSync(filePath, "utf8") +
    "\nthis.CALENDLY_MEETING_URL = CALENDLY_MEETING_URL;" +
    "\nthis.CALENDLY_CTA_LABEL = CALENDLY_CTA_LABEL;" +
    "\nthis.CALENDLY_CTA_VARIANT = CALENDLY_CTA_VARIANT;" +
    "\nthis.CALENDLY_SLOT_ID = CALENDLY_SLOT_ID;" +
    "\nthis.escapeCalendlyText = escapeCalendlyText;" +
    "\nthis.isValidCalendlyUrl = isValidCalendlyUrl;" +
    "\nthis.resolveCalendlyLabel = resolveCalendlyLabel;" +
    "\nthis.resolveCalendlyClassName = resolveCalendlyClassName;" +
    "\nthis.buildCalendlyIconMarkup = buildCalendlyIconMarkup;" +
    "\nthis.buildCalendlyCtaMarkup = buildCalendlyCtaMarkup;" +
    "\nthis.hasCalendlyPopup = hasCalendlyPopup;" +
    "\nthis.openCalendlyScheduler = openCalendlyScheduler;" +
    "\nthis.bindCalendlyCta = bindCalendlyCta;" +
    "\nthis.bindCalendlyCtas = bindCalendlyCtas;" +
    "\nthis.slotAlreadyHasCta = slotAlreadyHasCta;" +
    "\nthis.fillCalendlySlot = fillCalendlySlot;" +
    "\nthis.renderCalendlyCtas = renderCalendlyCtas;" +
    "\nthis.appendCalendlyStylesheet = appendCalendlyStylesheet;" +
    "\nthis.appendCalendlyScript = appendCalendlyScript;" +
    "\nthis.loadCalendlyWidget = loadCalendlyWidget;" +
    "\nthis.initCalendly = initCalendly;" +
    "\nthis.startCalendly = startCalendly;\n";
  vm.runInNewContext(source, context, { filename: filePath });
  return context;
}

const documentMock = createDocumentMock();
const windowMock = { Calendly: undefined };
const calendly = loadCalendlyModule(documentMock, windowMock);

assert(
  calendly.CALENDLY_MEETING_URL === expectedMeetingUrl,
  "meeting URL must match the public Calendly event"
);
assert(
  calendly.CALENDLY_CTA_LABEL === "Schedule a time together",
  "home and footer CTA must use the schedule label"
);
assert(
  Object.prototype.hasOwnProperty.call(calendly.CALENDLY_CTA_VARIANT, "NAV") === false,
  "booking CTA should not live in the navbar"
);
assert(
  Object.prototype.hasOwnProperty.call(calendly.CALENDLY_CTA_VARIANT, "ABOUT") === false,
  "booking CTA should not live in the about section"
);
assert(
  Object.prototype.hasOwnProperty.call(calendly.CALENDLY_SLOT_ID, "NAV") === false,
  "navbar should not expose a Calendly slot"
);
assert(
  Object.prototype.hasOwnProperty.call(calendly.CALENDLY_SLOT_ID, "ABOUT") === false,
  "about section should not expose a Calendly slot"
);

assert(calendly.isValidCalendlyUrl(expectedMeetingUrl) === true, "valid URL should pass");
assert(calendly.isValidCalendlyUrl(null) === false, "null URL should fail");
assert(calendly.isValidCalendlyUrl(123) === false, "non-string URL should fail");
assert(calendly.isValidCalendlyUrl("") === false, "empty URL should fail");
assert(calendly.isValidCalendlyUrl("http://calendly.com/sudipkandel/new-meeting") === false, "http URL should fail");
assert(calendly.isValidCalendlyUrl("https://evil.example/calendly.com/") === false, "spoofed host should fail");
assert(calendly.isValidCalendlyUrl("https://calendly.com/") === false, "prefix-only URL should fail");
assert(calendly.isValidCalendlyUrl("  https://calendly.com/sudipkandel/new-meeting  ") === true, "trimmed URL should pass");

assert(calendly.resolveCalendlyLabel(null) === "", "missing options should yield an empty label");
assert(calendly.resolveCalendlyLabel({ label: 12 }) === "", "non-string label should be rejected");
assert(calendly.resolveCalendlyLabel({ label: "   " }) === "", "whitespace label should be rejected");
assert(calendly.resolveCalendlyLabel({ label: "  Meet  " }) === "Meet", "label should be trimmed");

assert(
  calendly.resolveCalendlyClassName() === "schedule-cta",
  "missing class should fall back to the button class"
);
assert(
  calendly.resolveCalendlyClassName(12) === "schedule-cta",
  "non-string class should fall back to the button class"
);
assert(
  calendly.resolveCalendlyClassName("  extra  ") === "extra",
  "explicit class should win"
);
assert(
  calendly.resolveCalendlyClassName("   ") === "schedule-cta",
  "blank extra class should fall back"
);

assert(calendly.buildCalendlyIconMarkup(false) === "", "icon should be omitted by default");
assert(
  calendly.buildCalendlyIconMarkup(true).indexOf("fa-calendar-alt") !== -1,
  "icon markup should include the calendar icon"
);

assert(calendly.buildCalendlyCtaMarkup(null) === "", "null options should yield no markup");
assert(
  calendly.buildCalendlyCtaMarkup({ url: "https://example.com", label: "Meet" }) === "",
  "non-Calendly URL should yield no markup"
);
assert(
  calendly.buildCalendlyCtaMarkup({ url: expectedMeetingUrl }) === "",
  "missing label should yield no markup"
);

const homeMarkup = calendly.buildCalendlyCtaMarkup({
  url: expectedMeetingUrl,
  label: calendly.CALENDLY_CTA_LABEL,
  includeIcon: true,
});
assert(homeMarkup.indexOf(expectedMeetingUrl) !== -1, "home CTA must include the meeting URL");
assert(homeMarkup.indexOf("data-testid=\"schedule-cta-home\"") !== -1, "home CTA must expose a test id");
assert(homeMarkup.indexOf("target=\"_blank\"") !== -1, "CTA must open in a new tab as fallback");
assert(homeMarkup.indexOf("rel=\"noopener noreferrer\"") !== -1, "CTA must use a safe rel");
assert(homeMarkup.indexOf("fa-calendar-alt") !== -1, "home CTA should include the calendar icon");
assert(homeMarkup.indexOf("<script") === -1, "CTA markup must not include scripts");

const footerMarkup = calendly.buildCalendlyCtaMarkup({
  url: expectedMeetingUrl,
  label: calendly.CALENDLY_CTA_LABEL,
  variant: calendly.CALENDLY_CTA_VARIANT.FOOTER,
  className: "schedule-cta schedule-cta-footer",
  includeIcon: true,
});
assert(footerMarkup.indexOf("schedule-cta-footer") !== -1, "footer CTA should use the footer button class");
assert(footerMarkup.indexOf("data-testid=\"schedule-cta-footer\"") !== -1, "footer CTA must expose a test id");
assert(footerMarkup.indexOf("fa-calendar-alt") !== -1, "footer CTA should include the calendar icon");

const escapedMarkup = calendly.buildCalendlyCtaMarkup({
  url: expectedMeetingUrl,
  label: '<img src=x onerror="alert(1)">',
  className: '"><script>alert(1)</script>',
});
assert(escapedMarkup.indexOf("<img") === -1, "label HTML should be escaped");
assert(escapedMarkup.indexOf("<script>alert") === -1, "class HTML should be escaped");
assert(escapedMarkup.indexOf("&lt;img") !== -1, "escaped label should keep the text");

const calendlySource = fs.readFileSync(filePath, "utf8");
assert(
  calendlySource.indexOf("initBadgeWidget") === -1,
  "Calendly floating badge must not be initialised"
);
assert(
  calendlySource.indexOf("Schedule time with me") === -1,
  "floating badge copy must not remain in the widget script"
);

assert(calendly.hasCalendlyPopup() === false, "missing Calendly API should disable the popup");
assert(calendly.openCalendlyScheduler(null) === false, "missing event should fail closed");
assert(
  calendly.openCalendlyScheduler({ preventDefault: "not-a-function" }) === false,
  "invalid event should fail closed"
);

let fallbackPrevented = false;
const fallbackEvent = {
  preventDefault: function preventDefault() {
    fallbackPrevented = true;
  },
};
assert(calendly.openCalendlyScheduler(fallbackEvent) === true, "fallback should allow the default link");
assert(fallbackPrevented === false, "fallback must not prevent default navigation");

let popupCalls = 0;
let popupUrl = "";
let badgeCalls = 0;
windowMock.Calendly = {
  initPopupWidget: function initPopupWidget(config) {
    popupCalls += 1;
    popupUrl = config.url;
  },
  initBadgeWidget: function initBadgeWidget() {
    badgeCalls += 1;
  },
};
assert(calendly.hasCalendlyPopup() === true, "loaded Calendly API should enable the popup");

let popupPrevented = false;
const popupEvent = {
  preventDefault: function preventDefault() {
    popupPrevented = true;
  },
};
assert(calendly.openCalendlyScheduler(popupEvent) === false, "popup path should stop the default link");
assert(popupPrevented === true, "popup path should prevent default");
assert(popupCalls === 1, "popup should be opened once");
assert(popupUrl === expectedMeetingUrl, "popup should open the configured meeting");

assert(calendly.bindCalendlyCta(null) === false, "binding a missing button should fail");
const alreadyBound = createElementMock("a");
alreadyBound.setAttribute("data-calendly-bound", "true");
assert(calendly.bindCalendlyCta(alreadyBound) === false, "already-bound buttons should be skipped");

const freshButton = createElementMock("a");
assert(calendly.bindCalendlyCta(freshButton) === true, "unbound buttons should bind");
assert(freshButton.getAttribute("data-calendly-bound") === "true", "bound flag should be set");
assert(freshButton.getClickHandlers().length === 1, "click handler should be attached");

documentMock.querySelectorAll = function querySelectorAll() {
  return [freshButton, alreadyBound];
};
assert(calendly.bindCalendlyCtas() === 0, "already-bound buttons should not bind twice");

const unboundButton = createElementMock("a");
documentMock.querySelectorAll = function querySelectorAllUnbound() {
  return [unboundButton];
};
assert(calendly.bindCalendlyCtas() === 1, "unbound node list should bind once");

assert(calendly.slotAlreadyHasCta(null) === false, "missing slot should not look populated");
const emptySlot = createElementMock("div");
assert(calendly.slotAlreadyHasCta(emptySlot) === false, "empty slot should be fillable");
const slotWithCtaAttribute = createElementMock("a");
slotWithCtaAttribute.setAttribute("data-calendly-cta", "true");
assert(calendly.slotAlreadyHasCta(slotWithCtaAttribute) === true, "CTA nodes should count as filled");
const nestedSlot = createElementMock("div");
nestedSlot.innerHTML = '<a data-calendly-cta="true">Schedule</a>';
assert(calendly.slotAlreadyHasCta(nestedSlot) === true, "nested CTA should count as filled");

assert(calendly.fillCalendlySlot("missing", homeMarkup) === false, "missing slot should not fill");
assert(calendly.fillCalendlySlot(calendly.CALENDLY_SLOT_ID.HOME, "") === false, "empty markup should not fill");

const homeSlot = createElementMock("div");
documentMock.registerElement(calendly.CALENDLY_SLOT_ID.HOME, homeSlot);
assert(calendly.fillCalendlySlot(calendly.CALENDLY_SLOT_ID.HOME, homeMarkup) === true, "empty home slot should fill");
assert(homeSlot.innerHTML.indexOf(expectedMeetingUrl) !== -1, "filled slot should contain the meeting URL");
assert(
  calendly.fillCalendlySlot(calendly.CALENDLY_SLOT_ID.HOME, homeMarkup) === false,
  "populated slot should not be overwritten"
);

const leftoverAboutSlot = createElementMock("div");
const footerSlot = createElementMock("div");
documentMock.registerElement("schedule-cta-about", leftoverAboutSlot);
documentMock.registerElement(calendly.CALENDLY_SLOT_ID.FOOTER, footerSlot);
calendly.renderCalendlyCtas();
assert(leftoverAboutSlot.innerHTML === "", "a leftover about slot should not receive a CTA");
assert(footerSlot.innerHTML.indexOf("schedule-cta-footer") !== -1, "footer slot should receive the footer CTA");

assert(calendly.appendCalendlyStylesheet() === true, "stylesheet should be injected once");
assert(documentMock.head.children.length === 1, "stylesheet should be appended to head");
assert(calendly.appendCalendlyStylesheet() === false, "stylesheet should not be injected twice");
documentMock.registerElement("calendly-widget-stylesheet", documentMock.head.children[0]);

assert(calendly.appendCalendlyScript() === true, "widget script should be injected once");
assert(documentMock.body.children.length === 1, "widget script should be appended to body");
assert(
  documentMock.body.children[0].getLoadHandlers().length === 0,
  "widget script should not initialise a floating badge on load"
);
assert(calendly.appendCalendlyScript() === false, "widget script should not be injected twice");
documentMock.registerElement("calendly-widget-script", documentMock.body.children[0]);
assert(calendly.loadCalendlyWidget() === false, "repeat widget load should be a no-op");

const missingHeadDocument = createDocumentMock();
missingHeadDocument.head = null;
const missingBodyDocument = createDocumentMock();
missingBodyDocument.body = null;
const noHeadCalendly = loadCalendlyModule(missingHeadDocument, { Calendly: undefined });
assert(noHeadCalendly.appendCalendlyStylesheet() === false, "missing head should skip stylesheet");
const noBodyCalendly = loadCalendlyModule(missingBodyDocument, { Calendly: undefined });
assert(noBodyCalendly.appendCalendlyScript() === false, "missing body should skip script");

const readyDocument = createDocumentMock();
readyDocument.readyState = "complete";
const readyCalendly = loadCalendlyModule(readyDocument, { Calendly: undefined });
assert(readyDocument.head.children.length === 1, "complete document should load the widget stylesheet");
assert(readyDocument.body.children.length === 1, "complete document should load the widget script");

const loadingDocument = createDocumentMock();
const loadingCalendly = loadCalendlyModule(loadingDocument, { Calendly: undefined });
assert(loadingDocument.getReadyListeners().length === 1, "loading document should wait for DOMContentLoaded");
loadingCalendly.startCalendly();
assert(loadingDocument.getReadyListeners().length === 2, "repeat start while loading should keep waiting");

const indexHtml = fs.readFileSync(indexPath, "utf8");
assert(indexHtml.indexOf(expectedMeetingUrl) !== -1, "home page should include the Calendly URL");
assert(indexHtml.indexOf("data-testid=\"schedule-cta-home\"") !== -1, "home page should expose the home CTA");
assert(indexHtml.indexOf("schedule-cta-home") !== -1, "home CTA should use the prominent hero button class");
assert(indexHtml.indexOf("data-testid=\"schedule-cta-about\"") === -1, "about section should not expose a schedule option");
assert(indexHtml.indexOf("schedule-cta-about") === -1, "about section should not keep a Calendly slot");
assert(indexHtml.indexOf("about-schedule") === -1, "about section should not keep schedule button layout");
assert(indexHtml.indexOf("assets/js/calendly.js") !== -1, "home page should load calendly.js");

const appJs = fs.readFileSync(appPath, "utf8");
assert(appJs.indexOf(expectedMeetingUrl) !== -1, "shared chrome should include the Calendly URL");
assert(appJs.indexOf("data-testid=\"schedule-cta-nav\"") === -1, "navbar should not include a Schedule button");
assert(appJs.indexOf("schedule-nav-cta") === -1, "navbar should not style a Schedule CTA");
assert(appJs.indexOf("nav-item-theme") !== -1, "theme toggle should sit in its own nav cluster");
assert(appJs.indexOf("data-testid=\"schedule-cta-footer\"") !== -1, "footer should include the schedule option");
assert(appJs.indexOf("Prefer a conversation?") !== -1, "footer should present Calendly as an alternative to the form");
assert(appJs.indexOf("typeof initCalendly === \"function\"") !== -1, "footer injection should initialise Calendly");

const styleCss = fs.readFileSync(stylePath, "utf8");
assert(styleCss.indexOf(".schedule-nav-cta") === -1, "shared styles should not keep navbar Schedule button rules");
assert(styleCss.indexOf(".nav-item-theme") !== -1, "theme toggle should have a dedicated nav cluster style");

calendly.initCalendly();
assert(badgeCalls === 0, "floating Calendly badge must not be created");

console.log("calendly.test.js: schedule option - OK");
