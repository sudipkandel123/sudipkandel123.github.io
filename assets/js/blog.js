"use strict";

const FILTER_ACTIVE_CLASS = "is-active";
const ARTICLE_DATE_FORMATTER = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

const blogState = {
  topic: ARTICLE_TOPIC.ALL,
  searchQuery: "",
};

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatArticleDate(isoDate) {
  return ARTICLE_DATE_FORMATTER.format(new Date(isoDate + "T00:00:00Z"));
}

function countArticlesByTopic(topic) {
  let matchCount = 0;
  PLAYBOOK_ARTICLES.forEach(function incrementIfTopicMatches(article) {
    if (article.topic === topic) {
      matchCount += 1;
    }
  });
  return matchCount;
}

function matchesArticleFilters(article) {
  const topicMatches = blogState.topic === ARTICLE_TOPIC.ALL || article.topic === blogState.topic;
  if (!topicMatches) {
    return false;
  }
  if (!blogState.searchQuery) {
    return true;
  }
  const haystack = (article.title + " " + article.description).toLowerCase();
  return haystack.indexOf(blogState.searchQuery) !== -1;
}

function getVisibleArticles() {
  return PLAYBOOK_ARTICLES.filter(matchesArticleFilters);
}

function buildArticleCard(article) {
  return (
    '<article class="blog-card" data-testid="blog-card" data-article-id="' +
    escapeHtml(article.id) +
    '">' +
    '<div class="blog-card-meta">' +
    '<span class="blog-topic">' +
    escapeHtml(article.topic) +
    "</span>" +
    '<time class="blog-date" datetime="' +
    escapeHtml(article.date) +
    '">' +
    escapeHtml(formatArticleDate(article.date)) +
    "</time>" +
    "</div>" +
    "<h2><a href=\"" +
    escapeHtml(article.url) +
    '" target="_blank" rel="noopener noreferrer">' +
    escapeHtml(article.title) +
    "</a></h2>" +
    "<p>" +
    escapeHtml(article.description) +
    "</p>" +
    '<a class="blog-read" href="' +
    escapeHtml(article.url) +
    '" target="_blank" rel="noopener noreferrer">Read article</a>' +
    "</article>"
  );
}

function renderStats() {
  const statsRoot = document.getElementById("blog-stats");
  if (!statsRoot) {
    return;
  }
  const items = [
    { value: PLAYBOOK_ARTICLES.length, label: "Selected articles" },
    { value: countArticlesByTopic(ARTICLE_TOPIC.ARCHITECTURE), label: "Architecture" },
    { value: countArticlesByTopic(ARTICLE_TOPIC.AI_ENGINEERING), label: "AI Engineering" },
    { value: countArticlesByTopic(ARTICLE_TOPIC.GOVERNANCE) + countArticlesByTopic(ARTICLE_TOPIC.CONSULTING), label: "Governance & consulting" },
  ];
  statsRoot.innerHTML = items
    .map(function buildStatCard(item) {
      return (
        '<div class="blog-stat">' +
        '<span class="blog-stat-value">' +
        escapeHtml(String(item.value)) +
        "</span>" +
        '<span class="blog-stat-label">' +
        escapeHtml(item.label) +
        "</span>" +
        "</div>"
      );
    })
    .join("");
}

function renderFilters() {
  const filtersRoot = document.getElementById("blog-filters");
  if (!filtersRoot) {
    return;
  }
  const topics = [
    ARTICLE_TOPIC.ALL,
    ARTICLE_TOPIC.ARCHITECTURE,
    ARTICLE_TOPIC.AI_ENGINEERING,
    ARTICLE_TOPIC.GOVERNANCE,
    ARTICLE_TOPIC.CONSULTING,
  ];
  filtersRoot.innerHTML = topics
    .map(function buildFilterButton(topic) {
      const activeClass = topic === blogState.topic ? " " + FILTER_ACTIVE_CLASS : "";
      return (
        '<button type="button" class="blog-filter' +
        activeClass +
        '" data-testid="blog-filter" data-topic="' +
        escapeHtml(topic) +
        '">' +
        escapeHtml(topic) +
        "</button>"
      );
    })
    .join("");
}

function renderArticles() {
  const gridRoot = document.getElementById("blog-grid");
  const countRoot = document.getElementById("blog-count");
  if (!gridRoot || !countRoot) {
    return;
  }
  const visibleArticles = getVisibleArticles();
  countRoot.textContent =
    visibleArticles.length + " of " + PLAYBOOK_ARTICLES.length + " selected articles";
  if (visibleArticles.length === 0) {
    gridRoot.innerHTML = '<p class="blog-empty" data-testid="blog-empty">No articles match that filter.</p>';
    return;
  }
  gridRoot.innerHTML = visibleArticles.map(buildArticleCard).join("");
}

function handleFilterClick(event) {
  const filterButton = event.target.closest("[data-topic]");
  if (!filterButton) {
    return;
  }
  blogState.topic = filterButton.getAttribute("data-topic");
  renderFilters();
  renderArticles();
}

function handleSearchInput(event) {
  blogState.searchQuery = event.target.value.trim().toLowerCase();
  renderArticles();
}

function bindBlogEvents() {
  const filtersRoot = document.getElementById("blog-filters");
  const searchInput = document.getElementById("blog-search");
  if (filtersRoot) {
    filtersRoot.addEventListener("click", handleFilterClick);
  }
  if (searchInput) {
    searchInput.addEventListener("input", handleSearchInput);
  }
}

function initBlogPage() {
  if (!Array.isArray(PLAYBOOK_ARTICLES) || PLAYBOOK_ARTICLES.length === 0) {
    return;
  }
  renderStats();
  renderFilters();
  renderArticles();
  bindBlogEvents();
}

document.addEventListener("DOMContentLoaded", initBlogPage);
