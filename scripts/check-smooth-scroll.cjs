// Exercise navigation and accessibility without a browser or animation timer.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const ts = require("typescript");

function events() {
  const listeners = new Map();
  return {
    listeners,
    addEventListener: (type, callback) => listeners.set(type, callback),
    removeEventListener: (type) => listeners.delete(type),
    emit: (type, event) => listeners.get(type)?.(event),
  };
}

function mount(reduce = false) {
  const effects = [];
  const instances = [];
  const media = { ...events(), matches: reduce };
  const location = new URL("https://portfolio.example/");
  const state = { __NA: true, tree: ["existing Next.js state"] };
  const history = {
    state, entries: [],
    pushState(value, title, url) {
      assert.equal(value, state, "Hash navigation preserves Next.js history state");
      this.entries.push(url.href);
      location.href = url.href;
    },
  };
  class Element {
    attributes = new Map();
    hasAttribute(name) { return this.attributes.has(name); }
    setAttribute(name, value) { this.attributes.set(name, value); }
    removeAttribute(name) { this.attributes.delete(name); }
    closest() { return this; }
  }
  const section = Object.assign(new Element(), events(), {
    focus(options) { this.focusOptions = options; },
  });
  const document = { ...events(), getElementById: (id) => id === "projects" ? section : null };
  const window = { ...events(), scrollY: 540, matchMedia: () => media };
  class Lenis {
    constructor(options) { this.options = options; this.calls = []; instances.push(this); }
    scrollTo(target, options) { this.calls.push({ target, options }); }
    resize() { this.resized = true; }
    destroy() { this.destroyed = true; }
  }
  const exports = {};
  const code = ts.transpileModule(fs.readFileSync("components/SmoothScroll.tsx", "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  const dependencies = {
    lenis: { default: Lenis },
    "next/navigation": { usePathname: () => location.pathname },
    react: { useRef: () => ({ current: null }), useEffect: (effect) => effects.push(effect) },
  };
  vm.runInNewContext(code, {
    exports, require: (name) => dependencies[name], window, document, location, history, Element, URL,
  });
  exports.SmoothScroll();
  const cleanup = effects[0]();
  effects[1]();
  function click(href, properties = {}, linkProperties = {}) {
    const link = Object.assign(new Element(), { href, target: "" }, linkProperties);
    const event = {
      target: link, button: 0, defaultPrevented: false,
      preventDefault() { this.defaultPrevented = true; }, ...properties,
    };
    document.emit("click", event);
    return event;
  }
  return { media, history, section, document, window, instances, effects, cleanup, click };
}

const app = mount();
const lenis = app.instances[0];
assert.equal(lenis.options.autoRaf, true);
assert.equal(lenis.options.smoothWheel, true);
assert.equal(lenis.options.syncTouch, true);
const anchor = "https://portfolio.example/#projects";
assert.equal(app.click(anchor).defaultPrevented, true, "Section navigation avoids a native jump");
assert.equal(lenis.calls.at(-1).target, app.section);
assert.equal(app.section.focusOptions.preventScroll, true, "Keyboard focus moves without jumping");
assert.equal(app.section.attributes.get("tabindex"), "-1");
app.section.emit("blur");
assert.equal(app.section.hasAttribute("tabindex"), false);
app.click(anchor);
assert.equal(app.history.entries.length, 1, "Repeated section links do not duplicate history");

for (const href of [
  "https://portfolio.example/work#projects",
  "https://portfolio.example/?filter=all#projects",
  "https://another.example/#projects",
  "https://portfolio.example/#missing",
  "https://portfolio.example/#%invalid",
]) assert.equal(app.click(href).defaultPrevented, false, href);
assert.equal(app.click(anchor, { ctrlKey: true }).defaultPrevented, false);
assert.equal(app.click(anchor, {}, { target: "_blank" }).defaultPrevented, false);
assert.equal(app.click(anchor, {}, { hasAttribute: () => true }).defaultPrevented, false);

app.window.scrollY = 915;
app.window.emit("popstate");
assert.equal(lenis.calls.at(-1).target, 915, "Back navigation cancels inertia without forcing the top");
app.effects[1]();
assert.equal(lenis.calls.at(-1).options.immediate, true);
assert.equal(lenis.calls.at(-1).target, 915, "Route changes preserve Next.js scroll position");
app.media.matches = true;
app.media.emit("change");
assert.equal(lenis.destroyed, true, "Changing reduced-motion preference removes animation immediately");
assert.equal(app.click(anchor).defaultPrevented, false, "Reduced motion keeps native anchor behavior");
app.media.matches = false;
app.media.emit("change");
assert.equal(app.instances.length, 2);
app.cleanup();
assert.equal(app.instances[1].destroyed, true);
assert.equal(app.document.listeners.size + app.window.listeners.size + app.media.listeners.size, 0);
const reduced = mount(true);
assert.equal(reduced.instances.length, 0, "No animation loop starts with reduced motion enabled");
reduced.cleanup();
console.log("PASS: smooth wheel/touch setup, section focus/history, native link behavior, route restoration, reduced motion and cleanup.");
