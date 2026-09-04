"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.join(__dirname, "..");
const themePath = path.join(root, "assets/js/theme.js");
const appPath = path.join(root, "assets/js/app.js");
const indexPath = path.join(root, "index.html");

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function createClassList(initialClassName) {
  const classes = {};
  String(initialClassName || "")
    .split(" ")
    .forEach(function addInitialClass(name) {
      if (name) {
        classes[name] = true;
      }
    });
  return {
    add: function add(name) {
      classes[name] = true;
    },
    remove: function remove(name) {
      delete classes[name];
    },
    contains: function contains(name) {
      return Boolean(classes[name]);
    },
    toString: function toString() {
      return Object.keys(classes).join(" ");
    },
  };
}

function createStorageMock(initialValue) {
  const store = {};
  if (typeof initialValue === "string") {
    store.siteTheme = initialValue;
  }
  return {
    getItem: function getItem(key) {
      if (Object.prototype.hasOwnProperty.call(store, key)) {
        return store[key];
      }
      return null;
    },
    setItem: function setItem(key, value) {
      store[key] = String(value);
    },
    store: store,
  };
}

function createDocumentMock() {
  const htmlElement = {
    attributes: {},
    setAttribute: function setAttribute(name, value) {
      this.attributes[name] = String(value);
    },
    getAttribute: function getAttribute(name) {
      if (Object.prototype.hasOwnProperty.call(this.attributes, name)) {
        return this.attributes[name];
      }
      return null;
    },
  };
  const navbar = {
    classList: createClassList(""),
  };
  const toggler = {
    checked: false,
  };
  const socialIcon = {
    classList: createClassList(""),
  };
  const lightBullet = { style: { backgroundColor: "" } };
  const darkBullet = { style: { backgroundColor: "" } };
  const brokenBullet = {};

  return {
    htmlElement: htmlElement,
    navbar: navbar,
    toggler: toggler,
    socialIcon: socialIcon,
    bullets: [lightBullet, darkBullet, brokenBullet],
    getElementsByTagName: function getElementsByTagName(tagName) {
      if (tagName === "HTML") {
        return [htmlElement];
      }
      return [];
    },
    getElementById: function getElementById(id) {
      if (id === "navbar") {
        return navbar;
      }
      if (id === "dark_toggler") {
        return toggler;
      }
      return null;
    },
    getElementsByClassName: function getElementsByClassName(className) {
      if (className === "socialicon") {
        return [socialIcon];
      }
      return [];
    },
    querySelectorAll: function querySelectorAll(selector) {
      if (selector === ".swiper-pagination-bullet") {
        return this.bullets;
      }
      return [];
    },
  };
}

function loadThemeModule(documentMock, storageMock) {
  const context = {
    document: documentMock,
    localStorage: storageMock,
  };
  const source =
    fs.readFileSync(themePath, "utf8") +
    "\nthis.THEME = THEME;" +
    "\nthis.THEME_STORAGE_KEY = THEME_STORAGE_KEY;" +
    "\nthis.THEME_ATTRIBUTE = THEME_ATTRIBUTE;" +
    "\nthis.DARK_NAV_CLASS = DARK_NAV_CLASS;" +
    "\nthis.isDarkTheme = isDarkTheme;" +
    "\nthis.resolveTheme = resolveTheme;" +
    "\nthis.getStoredTheme = getStoredTheme;" +
    "\nthis.persistTheme = persistTheme;" +
    "\nthis.toggleTheme = toggleTheme;" +
    "\nthis.getHtmlElement = getHtmlElement;" +
    "\nthis.applyThemeClass = applyThemeClass;" +
    "\nthis.applyTogglerState = applyTogglerState;" +
    "\nthis.applySocialIconTheme = applySocialIconTheme;" +
    "\nthis.applyThemeToDocument = applyThemeToDocument;" +
    "\nthis.applyStoredTheme = applyStoredTheme;" +
    "\nthis.toggleStoredTheme = toggleStoredTheme;" +
    "\nthis.updateSwiperBulletColors = updateSwiperBulletColors;" +
    "\nthis.startTheme = startTheme;";
  vm.runInNewContext(source, context, { filename: "theme.js" });
  return context;
}

const emptyDocument = {};
const theme = loadThemeModule(emptyDocument, createStorageMock());

assert(theme.THEME.LIGHT === "light", "light theme constant should be light");
assert(theme.THEME.DARK === "dark", "dark theme constant should be dark");
assert(theme.THEME_STORAGE_KEY === "siteTheme", "theme should use a dedicated storage key");
assert(theme.resolveTheme(null) === theme.THEME.LIGHT, "missing storage should resolve to light");
assert(theme.resolveTheme(undefined) === theme.THEME.LIGHT, "undefined storage should resolve to light");
assert(theme.resolveTheme("") === theme.THEME.LIGHT, "empty storage should resolve to light");
assert(theme.resolveTheme("light") === theme.THEME.LIGHT, "light storage should stay light");
assert(theme.resolveTheme("dark") === theme.THEME.DARK, "dark storage should stay dark");
assert(theme.resolveTheme("night") === theme.THEME.LIGHT, "unknown values should fall back to light");
assert(theme.isDarkTheme(theme.THEME.DARK) === true, "dark theme should be detected");
assert(theme.isDarkTheme(theme.THEME.LIGHT) === false, "light theme should not be dark");
assert(theme.getStoredTheme(null) === theme.THEME.LIGHT, "missing storage object should default to light");
assert(
  theme.getStoredTheme({ getItem: "nope" }) === theme.THEME.LIGHT,
  "invalid storage object should default to light"
);
assert(theme.getStoredTheme(createStorageMock()) === theme.THEME.LIGHT, "empty storage should default to light");
assert(
  theme.getStoredTheme(createStorageMock("dark")) === theme.THEME.DARK,
  "stored dark preference should be kept"
);
assert(theme.persistTheme(null, theme.THEME.LIGHT) === false, "missing storage should not persist");
assert(
  theme.persistTheme({ setItem: "nope" }, theme.THEME.LIGHT) === false,
  "invalid storage should not persist"
);
assert(theme.persistTheme(createStorageMock(), "night") === false, "unknown theme should not persist");
assert(theme.toggleTheme(theme.THEME.LIGHT) === theme.THEME.DARK, "light should toggle to dark");
assert(theme.toggleTheme(theme.THEME.DARK) === theme.THEME.LIGHT, "dark should toggle to light");
assert(theme.toggleTheme("night") === theme.THEME.DARK, "unknown theme should toggle as if it were light");
assert(theme.getHtmlElement(null) === null, "missing document should not yield html");
assert(
  theme.getHtmlElement({ getElementsByTagName: function getElementsByTagName() { return []; } }) === null,
  "empty html collection should not yield html"
);
assert(theme.applyThemeClass(null, "dark-theme", true) === false, "missing element should not receive a class");
assert(
  theme.applyThemeClass({ classList: null }, "dark-theme", true) === false,
  "element without classList should be ignored"
);
const classTarget = { classList: createClassList("") };
assert(theme.applyThemeClass(classTarget, "dark-theme", true) === true, "class should be added");
assert(classTarget.classList.contains("dark-theme") === true, "added class should be present");
assert(theme.applyThemeClass(classTarget, "dark-theme", false) === true, "class should be removed");
assert(classTarget.classList.contains("dark-theme") === false, "removed class should be gone");
assert(
  theme.getHtmlElement({ getElementsByTagName: "nope" }) === null,
  "invalid getElementsByTagName should not yield html"
);
assert(
  theme.applyThemeToDocument(
    { getElementsByTagName: function getElementsByTagName() { return [{}]; } },
    theme.THEME.LIGHT
  ) === false,
  "html without setAttribute should not apply a theme"
);
assert(
  theme.applyTogglerState({ getElementById: "nope" }, true) === false,
  "invalid getElementById should not update the toggler"
);
assert(
  theme.applySocialIconTheme({ getElementsByClassName: "nope" }, true) === 0,
  "invalid getElementsByClassName should update no icons"
);
assert(
  theme.applySocialIconTheme(
    {
      getElementsByClassName: function getElementsByClassName() {
        return [{ classList: null }];
      },
    },
    true
  ) === 0,
  "social icons without classList should be skipped"
);
assert(
  theme.updateSwiperBulletColors({ querySelectorAll: function querySelectorAll() { return []; } }, theme.THEME.LIGHT) === 0,
  "empty bullet list should update nothing"
);
assert(theme.applyTogglerState(null, true) === false, "missing document should not update the toggler");
assert(
  theme.applyTogglerState({ getElementById: function getElementById() { return null; } }, true) === false,
  "missing toggler should fail closed"
);
assert(theme.applySocialIconTheme(null, true) === 0, "missing document should update no social icons");
assert(
  theme.applyThemeToDocument(null, theme.THEME.LIGHT) === false,
  "missing document should not apply a theme"
);
assert(theme.updateSwiperBulletColors(null, theme.THEME.LIGHT) === 0, "missing document should update no bullets");
assert(
  theme.updateSwiperBulletColors({ querySelectorAll: function querySelectorAll() { return null; } }, theme.THEME.LIGHT) === 0,
  "invalid bullet list should update nothing"
);

const documentMock = createDocumentMock();
const storage = createStorageMock();
assert(theme.applyThemeToDocument(documentMock, theme.THEME.LIGHT) === true, "light theme should apply");
assert(
  documentMock.htmlElement.getAttribute("light-mode") === "light",
  "html should receive the light attribute"
);
assert(documentMock.navbar.classList.contains("dark-theme") === false, "light navbar should not use the dark class");
assert(documentMock.toggler.checked === false, "light toggle should show the day state");
assert(documentMock.socialIcon.classList.contains("dsc") === false, "light social icons should not use dark styles");

assert(theme.applyThemeToDocument(documentMock, theme.THEME.DARK) === true, "dark theme should apply");
assert(
  documentMock.htmlElement.getAttribute("light-mode") === "dark",
  "html should receive the dark attribute"
);
assert(documentMock.navbar.classList.contains("dark-theme") === true, "dark navbar should use the dark class");
assert(documentMock.toggler.checked === true, "dark toggle should show the night state");
assert(documentMock.socialIcon.classList.contains("dsc") === true, "dark social icons should use dark styles");

const persistStorage = createStorageMock();
assert(theme.applyStoredTheme(documentMock, persistStorage) === true, "stored theme should apply");
assert(persistStorage.store.siteTheme === "light", "first visit should persist light as the default");
assert(documentMock.toggler.checked === false, "first visit should keep the day toggle");

persistStorage.setItem("siteTheme", "dark");
assert(theme.applyStoredTheme(documentMock, persistStorage) === true, "stored dark theme should apply");
assert(documentMock.htmlElement.getAttribute("light-mode") === "dark", "returning visitor dark preference should apply");

assert(theme.toggleStoredTheme(documentMock, persistStorage) === true, "toggle should succeed");
assert(persistStorage.store.siteTheme === "light", "toggle from dark should persist light");
assert(documentMock.htmlElement.getAttribute("light-mode") === "light", "toggle from dark should apply light");

assert(theme.updateSwiperBulletColors(documentMock, theme.THEME.LIGHT) === 2, "valid bullets should be recolored");
assert(documentMock.bullets[0].style.backgroundColor === "blue", "light bullets should be blue");
assert(theme.updateSwiperBulletColors(documentMock, theme.THEME.DARK) === 2, "dark bullets should be recolored");
assert(documentMock.bullets[0].style.backgroundColor === "white", "dark bullets should be white");

const liveDocument = createDocumentMock();
const liveStorage = createStorageMock();
const liveTheme = loadThemeModule(liveDocument, liveStorage);
assert(liveTheme.startTheme() === true, "startup should apply the default theme");
assert(liveStorage.store.siteTheme === "light", "startup should persist light by default");
assert(
  liveDocument.htmlElement.getAttribute("light-mode") === "light",
  "startup should paint the site in light mode"
);
assert(liveDocument.toggler.checked === false, "startup should show the bright-mode toggle");

const noStorageDocument = createDocumentMock();
const noStorageTheme = loadThemeModule(noStorageDocument, undefined);
assert(noStorageTheme.startTheme() === true, "startup should work without localStorage");
assert(
  noStorageDocument.htmlElement.getAttribute("light-mode") === "light",
  "missing localStorage should still open in light mode"
);
noStorageTheme.document = undefined;
assert(noStorageTheme.startTheme() === false, "startup without a document should fail closed");

const htmlFiles = fs
  .readdirSync(root)
  .filter(function isHtmlFile(fileName) {
    return fileName.slice(-5) === ".html";
  });

htmlFiles.forEach(function assertHtmlDefaultsToLight(fileName) {
  const html = fs.readFileSync(path.join(root, fileName), "utf8");
  if (html.indexOf("light-mode=") === -1) {
    return;
  }
  assert(
    html.indexOf('light-mode="light"') !== -1,
    fileName + " should open in bright mode"
  );
  assert(
    html.indexOf('light-mode="dark"') === -1,
    fileName + " should not default to dark mode"
  );
});

const indexHtml = fs.readFileSync(indexPath, "utf8");
assert(
  indexHtml.indexOf('src="assets/js/theme.js"') !== -1,
  "home page should load the theme module"
);
assert(
  indexHtml.indexOf("assets/js/theme.js") < indexHtml.indexOf("assets/js/app.js"),
  "theme module should load before app.js"
);

const appSource = fs.readFileSync(appPath, "utf8");
assert(
  appSource.indexOf('class="navbar navbar-expand-lg fixed-top dark-theme"') === -1,
  "navbar markup should not start in dark theme"
);
assert(
  appSource.indexOf("onclick=\"toggle_light_mode()\" checked>") === -1,
  "theme toggle should not start in the checked dark state"
);
assert(
  appSource.indexOf('localStorage.setItem("lightMode", "dark")') === -1,
  "app.js should not force dark mode into storage"
);

console.log("theme.test.js: default bright mode — OK");
