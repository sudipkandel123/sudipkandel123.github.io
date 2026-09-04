"use strict";

const CAPABILITY_GROUP = {
  DISCOVER: "discover",
  SHAPE: "shape",
  DELIVER: "deliver",
};

const CAPABILITY_GROUPS = [
  {
    id: CAPABILITY_GROUP.DISCOVER,
    title: "Discover",
    accent: "#3b82f6",
    pointers: [
      "Business problem discovery",
      "Commercial acumen",
      "Consultative questioning",
      "Industry knowledge",
      "Stakeholder management",
    ],
  },
  {
    id: CAPABILITY_GROUP.SHAPE,
    title: "Shape",
    accent: "#8b5cf6",
    pointers: [
      "AI use-case prioritisation",
      "Business-case development",
      "Solution storytelling",
      "Presales and proposal development",
      "Executive communication",
    ],
  },
  {
    id: CAPABILITY_GROUP.DELIVER,
    title: "Deliver",
    accent: "#10b981",
    pointers: [
      "Project and delivery management",
      "Change management and adoption",
      "AI governance and risk",
      "Negotiation and expectation management",
      "Benefits realisation",
    ],
  },
];

function escapeCapabilityText(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildCapabilityPointer(pointer) {
  return (
    '<li class="capability-pointer" data-testid="capability-pointer">' +
    '<span class="capability-dot" aria-hidden="true"></span>' +
    escapeCapabilityText(pointer) +
    "</li>"
  );
}

function buildCapabilityGroup(group) {
  return (
    '<article class="capability-card" data-testid="capability-group" data-group="' +
    escapeCapabilityText(group.id) +
    '" style="--capability-accent: ' +
    escapeCapabilityText(group.accent) +
    ';">' +
    "<h3>" +
    escapeCapabilityText(group.title) +
    "</h3>" +
    '<ul class="capability-list">' +
    group.pointers.map(buildCapabilityPointer).join("") +
    "</ul>" +
    "</article>"
  );
}

function renderCapabilities() {
  const container = document.querySelector("#capability-groups");
  if (!container) {
    return;
  }
  container.innerHTML = CAPABILITY_GROUPS.map(buildCapabilityGroup).join("");
}

document.addEventListener("DOMContentLoaded", renderCapabilities);
