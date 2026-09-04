"use strict";

const CALENDLY_MEETING_URL = "https://calendly.com/sudipkandel/new-meeting";
const CALENDLY_CTA_LABEL = "Schedule a time together";
const CALENDLY_WIDGET_STYLESHEET_URL =
  "https://assets.calendly.com/assets/external/widget.css";
const CALENDLY_WIDGET_SCRIPT_URL =
  "https://assets.calendly.com/assets/external/widget.js";
const CALENDLY_WIDGET_STYLESHEET_ID = "calendly-widget-stylesheet";
const CALENDLY_WIDGET_SCRIPT_ID = "calendly-widget-script";
const CALENDLY_CTA_ATTRIBUTE = "data-calendly-cta";
const CALENDLY_CTA_ATTRIBUTE_VALUE = "true";
const CALENDLY_BOUND_ATTRIBUTE = "data-calendly-bound";
const CALENDLY_URL_PREFIX = "https://calendly.com/";
const CALENDLY_TEST_ID_PREFIX = "schedule-cta-";
const CALENDLY_ICON_CLASS = "far fa-calendar-alt";

const CALENDLY_CTA_VARIANT = {
  HOME: "home",
  FOOTER: "footer",
};

const CALENDLY_SLOT_ID = {
  HOME: "schedule-cta-home",
  FOOTER: "schedule-cta-footer",
};

function escapeCalendlyText(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function isValidCalendlyUrl(url) {
  if (typeof url !== "string") {
    return false;
  }
  const trimmedUrl = url.trim();
  if (trimmedUrl.indexOf(CALENDLY_URL_PREFIX) !== 0) {
    return false;
  }
  return trimmedUrl.length > CALENDLY_URL_PREFIX.length;
}

function resolveCalendlyLabel(options) {
  if (!options || typeof options.label !== "string") {
    return "";
  }
  return options.label.trim();
}

function resolveCalendlyClassName(extraClass) {
  if (typeof extraClass === "string" && extraClass.trim()) {
    return extraClass.trim();
  }
  return "schedule-cta";
}

function buildCalendlyIconMarkup(includeIcon) {
  if (!includeIcon) {
    return "";
  }
  return (
    '<i class="' +
    CALENDLY_ICON_CLASS +
    '" aria-hidden="true"></i>'
  );
}

function buildCalendlyCtaMarkup(options) {
  if (!options || !isValidCalendlyUrl(options.url)) {
    return "";
  }
  const label = resolveCalendlyLabel(options);
  if (!label) {
    return "";
  }
  const variant = options.variant || CALENDLY_CTA_VARIANT.HOME;
  const className = resolveCalendlyClassName(options.className);
  const classAttribute = className
    ? ' class="' + escapeCalendlyText(className) + '"'
    : "";
  const testId = CALENDLY_TEST_ID_PREFIX + variant;
  const iconMarkup = buildCalendlyIconMarkup(options.includeIcon === true);
  return (
    "<a" +
    classAttribute +
    ' href="' +
    escapeCalendlyText(options.url.trim()) +
    '" target="_blank" rel="noopener noreferrer" ' +
    CALENDLY_CTA_ATTRIBUTE +
    '="' +
    CALENDLY_CTA_ATTRIBUTE_VALUE +
    '" data-testid="' +
    escapeCalendlyText(testId) +
    '">' +
    iconMarkup +
    escapeCalendlyText(label) +
    "</a>"
  );
}

function hasCalendlyPopup() {
  const calendlyApi = window.Calendly;
  return Boolean(
    calendlyApi && typeof calendlyApi.initPopupWidget === "function"
  );
}

function openCalendlyScheduler(event) {
  if (!event || typeof event.preventDefault !== "function") {
    return false;
  }
  if (!hasCalendlyPopup()) {
    return true;
  }
  event.preventDefault();
  window.Calendly.initPopupWidget({ url: CALENDLY_MEETING_URL });
  return false;
}

function bindCalendlyCta(button) {
  if (!button || button.getAttribute(CALENDLY_BOUND_ATTRIBUTE) === "true") {
    return false;
  }
  button.setAttribute(CALENDLY_BOUND_ATTRIBUTE, "true");
  button.addEventListener("click", openCalendlyScheduler);
  return true;
}

function bindCalendlyCtas() {
  const selector = "[" + CALENDLY_CTA_ATTRIBUTE + '="' + CALENDLY_CTA_ATTRIBUTE_VALUE + '"]';
  const buttons = document.querySelectorAll(selector);
  let boundCount = 0;
  for (let index = 0; index < buttons.length; index += 1) {
    if (bindCalendlyCta(buttons[index])) {
      boundCount += 1;
    }
  }
  return boundCount;
}

function slotAlreadyHasCta(slot) {
  if (!slot) {
    return false;
  }
  if (slot.getAttribute(CALENDLY_CTA_ATTRIBUTE) === CALENDLY_CTA_ATTRIBUTE_VALUE) {
    return true;
  }
  return Boolean(slot.querySelector("[" + CALENDLY_CTA_ATTRIBUTE + "]"));
}

function fillCalendlySlot(slotId, markup) {
  const slot = document.getElementById(slotId);
  if (!slot || !markup || slotAlreadyHasCta(slot)) {
    return false;
  }
  slot.innerHTML = markup;
  return true;
}

function renderCalendlyCtas() {
  const homeMarkup = buildCalendlyCtaMarkup({
    url: CALENDLY_MEETING_URL,
    label: CALENDLY_CTA_LABEL,
    variant: CALENDLY_CTA_VARIANT.HOME,
    className: "schedule-cta schedule-cta-home",
    includeIcon: true,
  });
  const footerMarkup = buildCalendlyCtaMarkup({
    url: CALENDLY_MEETING_URL,
    label: CALENDLY_CTA_LABEL,
    variant: CALENDLY_CTA_VARIANT.FOOTER,
    className: "schedule-cta schedule-cta-footer",
    includeIcon: true,
  });
  fillCalendlySlot(CALENDLY_SLOT_ID.HOME, homeMarkup);
  fillCalendlySlot(CALENDLY_SLOT_ID.FOOTER, footerMarkup);
}

function appendCalendlyStylesheet() {
  if (!document.head || document.getElementById(CALENDLY_WIDGET_STYLESHEET_ID)) {
    return false;
  }
  const stylesheet = document.createElement("link");
  stylesheet.id = CALENDLY_WIDGET_STYLESHEET_ID;
  stylesheet.rel = "stylesheet";
  stylesheet.href = CALENDLY_WIDGET_STYLESHEET_URL;
  document.head.appendChild(stylesheet);
  return true;
}

function appendCalendlyScript() {
  if (!document.body || document.getElementById(CALENDLY_WIDGET_SCRIPT_ID)) {
    return false;
  }
  const scriptElement = document.createElement("script");
  scriptElement.id = CALENDLY_WIDGET_SCRIPT_ID;
  scriptElement.src = CALENDLY_WIDGET_SCRIPT_URL;
  scriptElement.async = true;
  document.body.appendChild(scriptElement);
  return true;
}

function loadCalendlyWidget() {
  const stylesheetAdded = appendCalendlyStylesheet();
  const scriptAdded = appendCalendlyScript();
  return stylesheetAdded || scriptAdded;
}

function initCalendly() {
  loadCalendlyWidget();
  renderCalendlyCtas();
  bindCalendlyCtas();
}

function startCalendly() {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCalendly);
    return;
  }
  initCalendly();
}

if (typeof document !== "undefined" && document.addEventListener) {
  startCalendly();
}
