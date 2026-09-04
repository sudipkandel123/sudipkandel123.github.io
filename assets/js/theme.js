"use strict";

const THEME = {
  LIGHT: "light",
  DARK: "dark",
};

const THEME_STORAGE_KEY = "siteTheme";
const THEME_ATTRIBUTE = "light-mode";
const DARK_NAV_CLASS = "dark-theme";
const DARK_SOCIAL_CLASS = "dsc";
const THEME_TOGGLER_ID = "dark_toggler";
const NAVBAR_ID = "navbar";
const SOCIAL_ICON_CLASS = "socialicon";
const HTML_TAG_NAME = "HTML";
const SWIPER_BULLET_SELECTOR = ".swiper-pagination-bullet";
const SWIPER_BULLET_LIGHT_COLOR = "blue";
const SWIPER_BULLET_DARK_COLOR = "white";

function isDarkTheme(theme) {
  return theme === THEME.DARK;
}

function resolveTheme(storedValue) {
  if (storedValue === THEME.DARK) {
    return THEME.DARK;
  }
  return THEME.LIGHT;
}

function getStoredTheme(storage) {
  if (!storage || typeof storage.getItem !== "function") {
    return THEME.LIGHT;
  }
  return resolveTheme(storage.getItem(THEME_STORAGE_KEY));
}

function persistTheme(storage, theme) {
  if (!storage || typeof storage.setItem !== "function") {
    return false;
  }
  if (theme !== THEME.LIGHT && theme !== THEME.DARK) {
    return false;
  }
  storage.setItem(THEME_STORAGE_KEY, theme);
  return true;
}

function toggleTheme(currentTheme) {
  if (resolveTheme(currentTheme) === THEME.DARK) {
    return THEME.LIGHT;
  }
  return THEME.DARK;
}

function getHtmlElement(documentRef) {
  if (!documentRef || typeof documentRef.getElementsByTagName !== "function") {
    return null;
  }
  const htmlElements = documentRef.getElementsByTagName(HTML_TAG_NAME);
  if (!htmlElements || htmlElements.length === 0) {
    return null;
  }
  return htmlElements[0];
}

function applyThemeClass(element, className, shouldAdd) {
  if (!element || !element.classList) {
    return false;
  }
  if (shouldAdd) {
    element.classList.add(className);
  } else {
    element.classList.remove(className);
  }
  return true;
}

function applyTogglerState(documentRef, isDark) {
  if (!documentRef || typeof documentRef.getElementById !== "function") {
    return false;
  }
  const toggler = documentRef.getElementById(THEME_TOGGLER_ID);
  if (!toggler) {
    return false;
  }
  toggler.checked = isDark;
  return true;
}

function applySocialIconTheme(documentRef, isDark) {
  if (!documentRef || typeof documentRef.getElementsByClassName !== "function") {
    return 0;
  }
  const socialIcons = documentRef.getElementsByClassName(SOCIAL_ICON_CLASS);
  let updatedCount = 0;
  for (let index = 0; index < socialIcons.length; index += 1) {
    if (applyThemeClass(socialIcons[index], DARK_SOCIAL_CLASS, isDark)) {
      updatedCount += 1;
    }
  }
  return updatedCount;
}

function applyThemeToDocument(documentRef, theme) {
  const resolvedTheme = resolveTheme(theme);
  const htmlElement = getHtmlElement(documentRef);
  if (!htmlElement || typeof htmlElement.setAttribute !== "function") {
    return false;
  }
  htmlElement.setAttribute(THEME_ATTRIBUTE, resolvedTheme);
  const isDark = isDarkTheme(resolvedTheme);
  if (typeof documentRef.getElementById === "function") {
    applyThemeClass(documentRef.getElementById(NAVBAR_ID), DARK_NAV_CLASS, isDark);
  }
  applyTogglerState(documentRef, isDark);
  applySocialIconTheme(documentRef, isDark);
  return true;
}

function applyStoredTheme(documentRef, storage) {
  const theme = getStoredTheme(storage);
  persistTheme(storage, theme);
  return applyThemeToDocument(documentRef, theme);
}

function toggleStoredTheme(documentRef, storage) {
  const nextTheme = toggleTheme(getStoredTheme(storage));
  persistTheme(storage, nextTheme);
  return applyThemeToDocument(documentRef, nextTheme);
}

function updateSwiperBulletColors(documentRef, theme) {
  if (!documentRef || typeof documentRef.querySelectorAll !== "function") {
    return 0;
  }
  const bullets = documentRef.querySelectorAll(SWIPER_BULLET_SELECTOR);
  if (!bullets || typeof bullets.length !== "number") {
    return 0;
  }
  const color = isDarkTheme(resolveTheme(theme))
    ? SWIPER_BULLET_DARK_COLOR
    : SWIPER_BULLET_LIGHT_COLOR;
  let updatedCount = 0;
  for (let index = 0; index < bullets.length; index += 1) {
    const bullet = bullets[index];
    if (!bullet || !bullet.style) {
      continue;
    }
    bullet.style.backgroundColor = color;
    updatedCount += 1;
  }
  return updatedCount;
}

function startTheme() {
  if (typeof document === "undefined") {
    return false;
  }
  const storage = typeof localStorage === "undefined" ? null : localStorage;
  return applyStoredTheme(document, storage);
}

if (typeof document !== "undefined") {
  startTheme();
}
