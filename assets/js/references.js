"use strict";

const PREVIEW_QUOTE_LIMIT = 220;
const FILTER_ACTIVE_CLASS = "is-active";

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function getInitials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .map(function getFirstLetter(part) {
      return part.charAt(0);
    })
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function matchesRecommendationFilter(recommendation, filterId) {
  if (filterId === RECOMMENDATION_FILTER.ALL) {
    return true;
  }
  return recommendation.filters.indexOf(filterId) !== -1;
}

function buildAvatarMarkup(recommendation) {
  const initials = recommendation.avatarInitials || getInitials(recommendation.name);
  return (
    '<span class="rec-avatar" style="--rec-accent: ' +
    escapeHtml(recommendation.accent) +
    ';" aria-hidden="true">' +
    escapeHtml(initials) +
    "</span>"
  );
}

function buildTagMarkup(label) {
  return '<span class="rec-tag">' + escapeHtml(label) + "</span>";
}

function buildRecommendationCard(recommendation, options) {
  const isPreview = options && options.preview;
  const needsExpand = isPreview && recommendation.message.length > PREVIEW_QUOTE_LIMIT;
  const visibleMessage = needsExpand
    ? recommendation.message.slice(0, PREVIEW_QUOTE_LIMIT).trim() + "…"
    : recommendation.message;

  const expandControl = needsExpand
    ? '<a class="rec-more" href="reference.html#' +
      escapeHtml(recommendation.id) +
      '">Read full recommendation</a>'
    : "";

  return (
    '<article class="rec-card" id="' +
    escapeHtml(recommendation.id) +
    '" data-testid="recommendation-card" data-recommendation-id="' +
    escapeHtml(recommendation.id) +
    '">' +
    '<div class="rec-card-quote-mark" aria-hidden="true"><i class="fas fa-quote-left"></i></div>' +
    '<blockquote class="rec-featured">' +
    escapeHtml(recommendation.featuredQuote) +
    "</blockquote>" +
    '<p class="rec-message">' +
    escapeHtml(visibleMessage) +
    "</p>" +
    expandControl +
    '<footer class="rec-meta">' +
    buildAvatarMarkup(recommendation) +
    '<div class="rec-identity">' +
    '<a class="rec-name" href="' +
    escapeHtml(recommendation.linkedinUrl) +
    '" target="_blank" rel="noopener noreferrer">' +
    escapeHtml(recommendation.name) +
    ' <i class="fab fa-linkedin" aria-hidden="true"></i></a>' +
    '<p class="rec-role">' +
    escapeHtml(recommendation.role) +
    "</p>" +
    '<p class="rec-relationship">' +
    escapeHtml(recommendation.relationship) +
    "</p>" +
    '<div class="rec-tags">' +
    buildTagMarkup(recommendation.company) +
    buildTagMarkup(recommendation.date) +
    "</div>" +
    "</div>" +
    "</footer>" +
    "</article>"
  );
}

function getFeaturedRecommendations() {
  return RECOMMENDATIONS.filter(function keepFeatured(recommendation) {
    return recommendation.featured === true;
  });
}

function renderRecommendationCards(container, filterId, options) {
  const matched = RECOMMENDATIONS.filter(function keepMatching(recommendation) {
    return matchesRecommendationFilter(recommendation, filterId);
  });

  if (matched.length === 0) {
    container.innerHTML =
      '<p class="rec-empty" data-testid="recommendation-empty">No recommendations in this filter yet.</p>';
    return;
  }

  container.innerHTML = matched
    .map(function toCard(recommendation) {
      return buildRecommendationCard(recommendation, options);
    })
    .join("");
}

function setActiveFilterButton(toolbar, filterId) {
  const buttons = toolbar.querySelectorAll("[data-filter]");
  buttons.forEach(function updateButtonState(button) {
    const isActive = button.getAttribute("data-filter") === filterId;
    button.classList.toggle(FILTER_ACTIVE_CLASS, isActive);
    button.setAttribute("aria-pressed", isActive ? "true" : "false");
  });
}

function handleFilterClick(event) {
  const button = event.target.closest("[data-filter]");
  if (!button) {
    return;
  }
  const toolbar = event.currentTarget;
  const grid = document.querySelector("#recommendation-grid");
  const filterId = button.getAttribute("data-filter");
  setActiveFilterButton(toolbar, filterId);
  renderRecommendationCards(grid, filterId, { preview: false });
}

function renderFilterToolbar(toolbar) {
  toolbar.innerHTML = RECOMMENDATION_FILTERS.map(function toFilterButton(filter) {
    const isAll = filter.id === RECOMMENDATION_FILTER.ALL;
    return (
      '<button type="button" class="rec-filter' +
      (isAll ? " " + FILTER_ACTIVE_CLASS : "") +
      '" data-filter="' +
      escapeHtml(filter.id) +
      '" data-testid="recommendation-filter" aria-pressed="' +
      (isAll ? "true" : "false") +
      '">' +
      escapeHtml(filter.label) +
      "</button>"
    );
  }).join("");
  toolbar.addEventListener("click", handleFilterClick);
}

function renderThemes(container) {
  container.innerHTML = RECOMMENDATION_THEMES.map(function toTheme(theme) {
    return (
      '<article class="rec-theme" data-testid="recommendation-theme" style="--rec-accent: ' +
      escapeHtml(theme.accent) +
      ';">' +
      "<h3>" +
      escapeHtml(theme.title) +
      "</h3>" +
      "<p>" +
      escapeHtml(theme.summary) +
      "</p>" +
      '<p class="rec-theme-source">' +
      escapeHtml(theme.source) +
      "</p>" +
      "</article>"
    );
  }).join("");
}

function renderFeaturedQuotes(container) {
  container.innerHTML = getFeaturedRecommendations()
    .map(function toFeatured(recommendation) {
      return (
        '<figure class="rec-pullquote" data-testid="recommendation-pullquote">' +
        "<blockquote>" +
        escapeHtml(recommendation.featuredQuote) +
        "</blockquote>" +
        "<figcaption>- " +
        escapeHtml(recommendation.name) +
        "</figcaption>" +
        "</figure>"
      );
    })
    .join("");
}

function initRecommendationsPage() {
  const quotes = document.querySelector("#recommendation-quotes");
  const themes = document.querySelector("#recommendation-themes");
  const toolbar = document.querySelector("#recommendation-filters");
  const grid = document.querySelector("#recommendation-grid");

  if (!grid) {
    return;
  }

  if (quotes) {
    renderFeaturedQuotes(quotes);
  }
  if (themes) {
    renderThemes(themes);
  }
  if (toolbar) {
    renderFilterToolbar(toolbar);
  }
  renderRecommendationCards(grid, RECOMMENDATION_FILTER.ALL, { preview: false });
}

function initHomeRecommendations() {
  const preview = document.querySelector("#home-recommendation-grid");
  if (!preview) {
    return;
  }
  preview.innerHTML = getFeaturedRecommendations()
    .map(function toCard(recommendation) {
      return buildRecommendationCard(recommendation, { preview: true });
    })
    .join("");
}

function initRecommendations() {
  if (typeof AOS !== "undefined") {
    AOS.init();
  }
  initRecommendationsPage();
  initHomeRecommendations();
}

document.addEventListener("DOMContentLoaded", initRecommendations);
