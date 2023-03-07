var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key2, value) => key2 in obj ? __defProp(obj, key2, { enumerable: true, configurable: true, writable: true, value }) : obj[key2] = value;
var __spreadValues = (a2, b) => {
  for (var prop2 in b || (b = {}))
    if (__hasOwnProp.call(b, prop2))
      __defNormalProp(a2, prop2, b[prop2]);
  if (__getOwnPropSymbols)
    for (var prop2 of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop2))
        __defNormalProp(a2, prop2, b[prop2]);
    }
  return a2;
};
var __spreadProps = (a2, b) => __defProps(a2, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop2 in source)
    if (__hasOwnProp.call(source, prop2) && exclude.indexOf(prop2) < 0)
      target[prop2] = source[prop2];
  if (source != null && __getOwnPropSymbols)
    for (var prop2 of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop2) < 0 && __propIsEnum.call(source, prop2))
        target[prop2] = source[prop2];
    }
  return target;
};
const p$1 = function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node4 of mutation.addedNodes) {
        if (node4.tagName === "LINK" && node4.rel === "modulepreload")
          processPreload(node4);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(script) {
    const fetchOpts = {};
    if (script.integrity)
      fetchOpts.integrity = script.integrity;
    if (script.referrerpolicy)
      fetchOpts.referrerPolicy = script.referrerpolicy;
    if (script.crossorigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (script.crossorigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
};
p$1();
function makeMap(str, expectsLowerCase) {
  const map15 = /* @__PURE__ */ Object.create(null);
  const list = str.split(",");
  for (let i2 = 0; i2 < list.length; i2++) {
    map15[list[i2]] = true;
  }
  return expectsLowerCase ? (val) => !!map15[val.toLowerCase()] : (val) => !!map15[val];
}
const specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
const isSpecialBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs);
function includeBooleanAttr(value) {
  return !!value || value === "";
}
function normalizeStyle(value) {
  if (isArray(value)) {
    const res = {};
    for (let i2 = 0; i2 < value.length; i2++) {
      const item = value[i2];
      const normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item);
      if (normalized) {
        for (const key2 in normalized) {
          res[key2] = normalized[key2];
        }
      }
    }
    return res;
  } else if (isString(value)) {
    return value;
  } else if (isObject$1(value)) {
    return value;
  }
}
const listDelimiterRE = /;(?![^(]*\))/g;
const propertyDelimiterRE = /:(.+)/;
function parseStringStyle(cssText) {
  const ret = {};
  cssText.split(listDelimiterRE).forEach((item) => {
    if (item) {
      const tmp = item.split(propertyDelimiterRE);
      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return ret;
}
function normalizeClass(value) {
  let res = "";
  if (isString(value)) {
    res = value;
  } else if (isArray(value)) {
    for (let i2 = 0; i2 < value.length; i2++) {
      const normalized = normalizeClass(value[i2]);
      if (normalized) {
        res += normalized + " ";
      }
    }
  } else if (isObject$1(value)) {
    for (const name in value) {
      if (value[name]) {
        res += name + " ";
      }
    }
  }
  return res.trim();
}
const toDisplayString = (val) => {
  return isString(val) ? val : val == null ? "" : isArray(val) || isObject$1(val) && (val.toString === objectToString || !isFunction$1(val.toString)) ? JSON.stringify(val, replacer, 2) : String(val);
};
const replacer = (_key, val) => {
  if (val && val.__v_isRef) {
    return replacer(_key, val.value);
  } else if (isMap(val)) {
    return {
      [`Map(${val.size})`]: [...val.entries()].reduce((entries, [key2, val2]) => {
        entries[`${key2} =>`] = val2;
        return entries;
      }, {})
    };
  } else if (isSet(val)) {
    return {
      [`Set(${val.size})`]: [...val.values()]
    };
  } else if (isObject$1(val) && !isArray(val) && !isPlainObject$1(val)) {
    return String(val);
  }
  return val;
};
const EMPTY_OBJ = {};
const EMPTY_ARR = [];
const NOOP = () => {
};
const NO = () => false;
const onRE = /^on[^a-z]/;
const isOn = (key2) => onRE.test(key2);
const isModelListener = (key2) => key2.startsWith("onUpdate:");
const extend = Object.assign;
const remove = (arr, el) => {
  const i2 = arr.indexOf(el);
  if (i2 > -1) {
    arr.splice(i2, 1);
  }
};
const hasOwnProperty = Object.prototype.hasOwnProperty;
const hasOwn = (val, key2) => hasOwnProperty.call(val, key2);
const isArray = Array.isArray;
const isMap = (val) => toTypeString(val) === "[object Map]";
const isSet = (val) => toTypeString(val) === "[object Set]";
const isFunction$1 = (val) => typeof val === "function";
const isString = (val) => typeof val === "string";
const isSymbol = (val) => typeof val === "symbol";
const isObject$1 = (val) => val !== null && typeof val === "object";
const isPromise = (val) => {
  return isObject$1(val) && isFunction$1(val.then) && isFunction$1(val.catch);
};
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const toRawType = (value) => {
  return toTypeString(value).slice(8, -1);
};
const isPlainObject$1 = (val) => toTypeString(val) === "[object Object]";
const isIntegerKey = (key2) => isString(key2) && key2 !== "NaN" && key2[0] !== "-" && "" + parseInt(key2, 10) === key2;
const isReservedProp = /* @__PURE__ */ makeMap(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted");
const cacheStringFunction = (fn2) => {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn2(str));
  };
};
const camelizeRE = /-(\w)/g;
const camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
});
const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
const capitalize = cacheStringFunction((str) => str.charAt(0).toUpperCase() + str.slice(1));
const toHandlerKey = cacheStringFunction((str) => str ? `on${capitalize(str)}` : ``);
const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
const invokeArrayFns = (fns, arg) => {
  for (let i2 = 0; i2 < fns.length; i2++) {
    fns[i2](arg);
  }
};
const def = (obj, key2, value) => {
  Object.defineProperty(obj, key2, {
    configurable: true,
    enumerable: false,
    value
  });
};
const toNumber = (val) => {
  const n = parseFloat(val);
  return isNaN(n) ? val : n;
};
let _globalThis;
const getGlobalThis = () => {
  return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
};
let activeEffectScope;
class EffectScope {
  constructor(detached = false) {
    this.active = true;
    this.effects = [];
    this.cleanups = [];
    if (!detached && activeEffectScope) {
      this.parent = activeEffectScope;
      this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(this) - 1;
    }
  }
  run(fn2) {
    if (this.active) {
      const currentEffectScope = activeEffectScope;
      try {
        activeEffectScope = this;
        return fn2();
      } finally {
        activeEffectScope = currentEffectScope;
      }
    }
  }
  on() {
    activeEffectScope = this;
  }
  off() {
    activeEffectScope = this.parent;
  }
  stop(fromParent) {
    if (this.active) {
      let i2, l;
      for (i2 = 0, l = this.effects.length; i2 < l; i2++) {
        this.effects[i2].stop();
      }
      for (i2 = 0, l = this.cleanups.length; i2 < l; i2++) {
        this.cleanups[i2]();
      }
      if (this.scopes) {
        for (i2 = 0, l = this.scopes.length; i2 < l; i2++) {
          this.scopes[i2].stop(true);
        }
      }
      if (this.parent && !fromParent) {
        const last = this.parent.scopes.pop();
        if (last && last !== this) {
          this.parent.scopes[this.index] = last;
          last.index = this.index;
        }
      }
      this.active = false;
    }
  }
}
function recordEffectScope(effect3, scope = activeEffectScope) {
  if (scope && scope.active) {
    scope.effects.push(effect3);
  }
}
const createDep = (effects) => {
  const dep = new Set(effects);
  dep.w = 0;
  dep.n = 0;
  return dep;
};
const wasTracked = (dep) => (dep.w & trackOpBit) > 0;
const newTracked = (dep) => (dep.n & trackOpBit) > 0;
const initDepMarkers = ({ deps }) => {
  if (deps.length) {
    for (let i2 = 0; i2 < deps.length; i2++) {
      deps[i2].w |= trackOpBit;
    }
  }
};
const finalizeDepMarkers = (effect3) => {
  const { deps } = effect3;
  if (deps.length) {
    let ptr = 0;
    for (let i2 = 0; i2 < deps.length; i2++) {
      const dep = deps[i2];
      if (wasTracked(dep) && !newTracked(dep)) {
        dep.delete(effect3);
      } else {
        deps[ptr++] = dep;
      }
      dep.w &= ~trackOpBit;
      dep.n &= ~trackOpBit;
    }
    deps.length = ptr;
  }
};
const targetMap = /* @__PURE__ */ new WeakMap();
let effectTrackDepth = 0;
let trackOpBit = 1;
const maxMarkerBits = 30;
let activeEffect;
const ITERATE_KEY = Symbol("");
const MAP_KEY_ITERATE_KEY = Symbol("");
class ReactiveEffect {
  constructor(fn2, scheduler = null, scope) {
    this.fn = fn2;
    this.scheduler = scheduler;
    this.active = true;
    this.deps = [];
    this.parent = void 0;
    recordEffectScope(this, scope);
  }
  run() {
    if (!this.active) {
      return this.fn();
    }
    let parent = activeEffect;
    let lastShouldTrack = shouldTrack;
    while (parent) {
      if (parent === this) {
        return;
      }
      parent = parent.parent;
    }
    try {
      this.parent = activeEffect;
      activeEffect = this;
      shouldTrack = true;
      trackOpBit = 1 << ++effectTrackDepth;
      if (effectTrackDepth <= maxMarkerBits) {
        initDepMarkers(this);
      } else {
        cleanupEffect(this);
      }
      return this.fn();
    } finally {
      if (effectTrackDepth <= maxMarkerBits) {
        finalizeDepMarkers(this);
      }
      trackOpBit = 1 << --effectTrackDepth;
      activeEffect = this.parent;
      shouldTrack = lastShouldTrack;
      this.parent = void 0;
      if (this.deferStop) {
        this.stop();
      }
    }
  }
  stop() {
    if (activeEffect === this) {
      this.deferStop = true;
    } else if (this.active) {
      cleanupEffect(this);
      if (this.onStop) {
        this.onStop();
      }
      this.active = false;
    }
  }
}
function cleanupEffect(effect3) {
  const { deps } = effect3;
  if (deps.length) {
    for (let i2 = 0; i2 < deps.length; i2++) {
      deps[i2].delete(effect3);
    }
    deps.length = 0;
  }
}
let shouldTrack = true;
const trackStack = [];
function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}
function resetTracking() {
  const last = trackStack.pop();
  shouldTrack = last === void 0 ? true : last;
}
function track(target, type, key2) {
  if (shouldTrack && activeEffect) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
    }
    let dep = depsMap.get(key2);
    if (!dep) {
      depsMap.set(key2, dep = createDep());
    }
    trackEffects(dep);
  }
}
function trackEffects(dep, debuggerEventExtraInfo) {
  let shouldTrack2 = false;
  if (effectTrackDepth <= maxMarkerBits) {
    if (!newTracked(dep)) {
      dep.n |= trackOpBit;
      shouldTrack2 = !wasTracked(dep);
    }
  } else {
    shouldTrack2 = !dep.has(activeEffect);
  }
  if (shouldTrack2) {
    dep.add(activeEffect);
    activeEffect.deps.push(dep);
  }
}
function trigger(target, type, key2, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  let deps = [];
  if (type === "clear") {
    deps = [...depsMap.values()];
  } else if (key2 === "length" && isArray(target)) {
    depsMap.forEach((dep, key3) => {
      if (key3 === "length" || key3 >= newValue) {
        deps.push(dep);
      }
    });
  } else {
    if (key2 !== void 0) {
      deps.push(depsMap.get(key2));
    }
    switch (type) {
      case "add":
        if (!isArray(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        } else if (isIntegerKey(key2)) {
          deps.push(depsMap.get("length"));
        }
        break;
      case "delete":
        if (!isArray(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        }
        break;
      case "set":
        if (isMap(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
        }
        break;
    }
  }
  if (deps.length === 1) {
    if (deps[0]) {
      {
        triggerEffects(deps[0]);
      }
    }
  } else {
    const effects = [];
    for (const dep of deps) {
      if (dep) {
        effects.push(...dep);
      }
    }
    {
      triggerEffects(createDep(effects));
    }
  }
}
function triggerEffects(dep, debuggerEventExtraInfo) {
  for (const effect3 of isArray(dep) ? dep : [...dep]) {
    if (effect3 !== activeEffect || effect3.allowRecurse) {
      if (effect3.scheduler) {
        effect3.scheduler();
      } else {
        effect3.run();
      }
    }
  }
}
const isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
const builtInSymbols = new Set(/* @__PURE__ */ Object.getOwnPropertyNames(Symbol).map((key2) => Symbol[key2]).filter(isSymbol));
const get = /* @__PURE__ */ createGetter();
const shallowGet = /* @__PURE__ */ createGetter(false, true);
const readonlyGet = /* @__PURE__ */ createGetter(true);
const arrayInstrumentations = /* @__PURE__ */ createArrayInstrumentations();
function createArrayInstrumentations() {
  const instrumentations = {};
  ["includes", "indexOf", "lastIndexOf"].forEach((key2) => {
    instrumentations[key2] = function(...args) {
      const arr = toRaw(this);
      for (let i2 = 0, l = this.length; i2 < l; i2++) {
        track(arr, "get", i2 + "");
      }
      const res = arr[key2](...args);
      if (res === -1 || res === false) {
        return arr[key2](...args.map(toRaw));
      } else {
        return res;
      }
    };
  });
  ["push", "pop", "shift", "unshift", "splice"].forEach((key2) => {
    instrumentations[key2] = function(...args) {
      pauseTracking();
      const res = toRaw(this)[key2].apply(this, args);
      resetTracking();
      return res;
    };
  });
  return instrumentations;
}
function createGetter(isReadonly2 = false, shallow = false) {
  return function get4(target, key2, receiver) {
    if (key2 === "__v_isReactive") {
      return !isReadonly2;
    } else if (key2 === "__v_isReadonly") {
      return isReadonly2;
    } else if (key2 === "__v_isShallow") {
      return shallow;
    } else if (key2 === "__v_raw" && receiver === (isReadonly2 ? shallow ? shallowReadonlyMap : readonlyMap : shallow ? shallowReactiveMap : reactiveMap).get(target)) {
      return target;
    }
    const targetIsArray = isArray(target);
    if (!isReadonly2 && targetIsArray && hasOwn(arrayInstrumentations, key2)) {
      return Reflect.get(arrayInstrumentations, key2, receiver);
    }
    const res = Reflect.get(target, key2, receiver);
    if (isSymbol(key2) ? builtInSymbols.has(key2) : isNonTrackableKeys(key2)) {
      return res;
    }
    if (!isReadonly2) {
      track(target, "get", key2);
    }
    if (shallow) {
      return res;
    }
    if (isRef(res)) {
      const shouldUnwrap = !targetIsArray || !isIntegerKey(key2);
      return shouldUnwrap ? res.value : res;
    }
    if (isObject$1(res)) {
      return isReadonly2 ? readonly(res) : reactive(res);
    }
    return res;
  };
}
const set = /* @__PURE__ */ createSetter();
const shallowSet = /* @__PURE__ */ createSetter(true);
function createSetter(shallow = false) {
  return function set3(target, key2, value, receiver) {
    let oldValue = target[key2];
    if (isReadonly(oldValue) && isRef(oldValue) && !isRef(value)) {
      return false;
    }
    if (!shallow && !isReadonly(value)) {
      if (!isShallow(value)) {
        value = toRaw(value);
        oldValue = toRaw(oldValue);
      }
      if (!isArray(target) && isRef(oldValue) && !isRef(value)) {
        oldValue.value = value;
        return true;
      }
    }
    const hadKey = isArray(target) && isIntegerKey(key2) ? Number(key2) < target.length : hasOwn(target, key2);
    const result2 = Reflect.set(target, key2, value, receiver);
    if (target === toRaw(receiver)) {
      if (!hadKey) {
        trigger(target, "add", key2, value);
      } else if (hasChanged(value, oldValue)) {
        trigger(target, "set", key2, value);
      }
    }
    return result2;
  };
}
function deleteProperty(target, key2) {
  const hadKey = hasOwn(target, key2);
  target[key2];
  const result2 = Reflect.deleteProperty(target, key2);
  if (result2 && hadKey) {
    trigger(target, "delete", key2, void 0);
  }
  return result2;
}
function has(target, key2) {
  const result2 = Reflect.has(target, key2);
  if (!isSymbol(key2) || !builtInSymbols.has(key2)) {
    track(target, "has", key2);
  }
  return result2;
}
function ownKeys(target) {
  track(target, "iterate", isArray(target) ? "length" : ITERATE_KEY);
  return Reflect.ownKeys(target);
}
const mutableHandlers = {
  get,
  set,
  deleteProperty,
  has,
  ownKeys
};
const readonlyHandlers = {
  get: readonlyGet,
  set(target, key2) {
    return true;
  },
  deleteProperty(target, key2) {
    return true;
  }
};
const shallowReactiveHandlers = /* @__PURE__ */ extend({}, mutableHandlers, {
  get: shallowGet,
  set: shallowSet
});
const toShallow = (value) => value;
const getProto = (v) => Reflect.getPrototypeOf(v);
function get$1(target, key2, isReadonly2 = false, isShallow2 = false) {
  target = target["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key2);
  if (key2 !== rawKey) {
    !isReadonly2 && track(rawTarget, "get", key2);
  }
  !isReadonly2 && track(rawTarget, "get", rawKey);
  const { has: has2 } = getProto(rawTarget);
  const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
  if (has2.call(rawTarget, key2)) {
    return wrap(target.get(key2));
  } else if (has2.call(rawTarget, rawKey)) {
    return wrap(target.get(rawKey));
  } else if (target !== rawTarget) {
    target.get(key2);
  }
}
function has$1(key2, isReadonly2 = false) {
  const target = this["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key2);
  if (key2 !== rawKey) {
    !isReadonly2 && track(rawTarget, "has", key2);
  }
  !isReadonly2 && track(rawTarget, "has", rawKey);
  return key2 === rawKey ? target.has(key2) : target.has(key2) || target.has(rawKey);
}
function size(target, isReadonly2 = false) {
  target = target["__v_raw"];
  !isReadonly2 && track(toRaw(target), "iterate", ITERATE_KEY);
  return Reflect.get(target, "size", target);
}
function add(value) {
  value = toRaw(value);
  const target = toRaw(this);
  const proto = getProto(target);
  const hadKey = proto.has.call(target, value);
  if (!hadKey) {
    target.add(value);
    trigger(target, "add", value, value);
  }
  return this;
}
function set$1(key2, value) {
  value = toRaw(value);
  const target = toRaw(this);
  const { has: has2, get: get4 } = getProto(target);
  let hadKey = has2.call(target, key2);
  if (!hadKey) {
    key2 = toRaw(key2);
    hadKey = has2.call(target, key2);
  }
  const oldValue = get4.call(target, key2);
  target.set(key2, value);
  if (!hadKey) {
    trigger(target, "add", key2, value);
  } else if (hasChanged(value, oldValue)) {
    trigger(target, "set", key2, value);
  }
  return this;
}
function deleteEntry(key2) {
  const target = toRaw(this);
  const { has: has2, get: get4 } = getProto(target);
  let hadKey = has2.call(target, key2);
  if (!hadKey) {
    key2 = toRaw(key2);
    hadKey = has2.call(target, key2);
  }
  get4 ? get4.call(target, key2) : void 0;
  const result2 = target.delete(key2);
  if (hadKey) {
    trigger(target, "delete", key2, void 0);
  }
  return result2;
}
function clear() {
  const target = toRaw(this);
  const hadItems = target.size !== 0;
  const result2 = target.clear();
  if (hadItems) {
    trigger(target, "clear", void 0, void 0);
  }
  return result2;
}
function createForEach(isReadonly2, isShallow2) {
  return function forEach6(callback, thisArg) {
    const observed = this;
    const target = observed["__v_raw"];
    const rawTarget = toRaw(target);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", ITERATE_KEY);
    return target.forEach((value, key2) => {
      return callback.call(thisArg, wrap(value), wrap(key2), observed);
    });
  };
}
function createIterableMethod(method, isReadonly2, isShallow2) {
  return function(...args) {
    const target = this["__v_raw"];
    const rawTarget = toRaw(target);
    const targetIsMap = isMap(rawTarget);
    const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
    const isKeyOnly = method === "keys" && targetIsMap;
    const innerIterator = target[method](...args);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
    return {
      next() {
        const { value, done: done2 } = innerIterator.next();
        return done2 ? { value, done: done2 } : {
          value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
          done: done2
        };
      },
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function createReadonlyMethod(type) {
  return function(...args) {
    return type === "delete" ? false : this;
  };
}
function createInstrumentations() {
  const mutableInstrumentations2 = {
    get(key2) {
      return get$1(this, key2);
    },
    get size() {
      return size(this);
    },
    has: has$1,
    add,
    set: set$1,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, false)
  };
  const shallowInstrumentations2 = {
    get(key2) {
      return get$1(this, key2, false, true);
    },
    get size() {
      return size(this);
    },
    has: has$1,
    add,
    set: set$1,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, true)
  };
  const readonlyInstrumentations2 = {
    get(key2) {
      return get$1(this, key2, true);
    },
    get size() {
      return size(this, true);
    },
    has(key2) {
      return has$1.call(this, key2, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, false)
  };
  const shallowReadonlyInstrumentations2 = {
    get(key2) {
      return get$1(this, key2, true, true);
    },
    get size() {
      return size(this, true);
    },
    has(key2) {
      return has$1.call(this, key2, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, true)
  };
  const iteratorMethods = ["keys", "values", "entries", Symbol.iterator];
  iteratorMethods.forEach((method) => {
    mutableInstrumentations2[method] = createIterableMethod(method, false, false);
    readonlyInstrumentations2[method] = createIterableMethod(method, true, false);
    shallowInstrumentations2[method] = createIterableMethod(method, false, true);
    shallowReadonlyInstrumentations2[method] = createIterableMethod(method, true, true);
  });
  return [
    mutableInstrumentations2,
    readonlyInstrumentations2,
    shallowInstrumentations2,
    shallowReadonlyInstrumentations2
  ];
}
const [mutableInstrumentations, readonlyInstrumentations, shallowInstrumentations, shallowReadonlyInstrumentations] = /* @__PURE__ */ createInstrumentations();
function createInstrumentationGetter(isReadonly2, shallow) {
  const instrumentations = shallow ? isReadonly2 ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly2 ? readonlyInstrumentations : mutableInstrumentations;
  return (target, key2, receiver) => {
    if (key2 === "__v_isReactive") {
      return !isReadonly2;
    } else if (key2 === "__v_isReadonly") {
      return isReadonly2;
    } else if (key2 === "__v_raw") {
      return target;
    }
    return Reflect.get(hasOwn(instrumentations, key2) && key2 in target ? instrumentations : target, key2, receiver);
  };
}
const mutableCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, false)
};
const shallowCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, true)
};
const readonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, false)
};
const reactiveMap = /* @__PURE__ */ new WeakMap();
const shallowReactiveMap = /* @__PURE__ */ new WeakMap();
const readonlyMap = /* @__PURE__ */ new WeakMap();
const shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
function targetTypeMap(rawType) {
  switch (rawType) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function getTargetType(value) {
  return value["__v_skip"] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
}
function reactive(target) {
  if (isReadonly(target)) {
    return target;
  }
  return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
}
function shallowReactive(target) {
  return createReactiveObject(target, false, shallowReactiveHandlers, shallowCollectionHandlers, shallowReactiveMap);
}
function readonly(target) {
  return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
}
function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
  if (!isObject$1(target)) {
    return target;
  }
  if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
    return target;
  }
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  const targetType = getTargetType(target);
  if (targetType === 0) {
    return target;
  }
  const proxy = new Proxy(target, targetType === 2 ? collectionHandlers : baseHandlers);
  proxyMap.set(target, proxy);
  return proxy;
}
function isReactive(value) {
  if (isReadonly(value)) {
    return isReactive(value["__v_raw"]);
  }
  return !!(value && value["__v_isReactive"]);
}
function isReadonly(value) {
  return !!(value && value["__v_isReadonly"]);
}
function isShallow(value) {
  return !!(value && value["__v_isShallow"]);
}
function isProxy(value) {
  return isReactive(value) || isReadonly(value);
}
function toRaw(observed) {
  const raw = observed && observed["__v_raw"];
  return raw ? toRaw(raw) : observed;
}
function markRaw(value) {
  def(value, "__v_skip", true);
  return value;
}
const toReactive = (value) => isObject$1(value) ? reactive(value) : value;
const toReadonly = (value) => isObject$1(value) ? readonly(value) : value;
function trackRefValue(ref2) {
  if (shouldTrack && activeEffect) {
    ref2 = toRaw(ref2);
    {
      trackEffects(ref2.dep || (ref2.dep = createDep()));
    }
  }
}
function triggerRefValue(ref2, newVal) {
  ref2 = toRaw(ref2);
  if (ref2.dep) {
    {
      triggerEffects(ref2.dep);
    }
  }
}
function isRef(r) {
  return !!(r && r.__v_isRef === true);
}
function ref(value) {
  return createRef(value, false);
}
function shallowRef(value) {
  return createRef(value, true);
}
function createRef(rawValue, shallow) {
  if (isRef(rawValue)) {
    return rawValue;
  }
  return new RefImpl(rawValue, shallow);
}
class RefImpl {
  constructor(value, __v_isShallow) {
    this.__v_isShallow = __v_isShallow;
    this.dep = void 0;
    this.__v_isRef = true;
    this._rawValue = __v_isShallow ? value : toRaw(value);
    this._value = __v_isShallow ? value : toReactive(value);
  }
  get value() {
    trackRefValue(this);
    return this._value;
  }
  set value(newVal) {
    newVal = this.__v_isShallow ? newVal : toRaw(newVal);
    if (hasChanged(newVal, this._rawValue)) {
      this._rawValue = newVal;
      this._value = this.__v_isShallow ? newVal : toReactive(newVal);
      triggerRefValue(this);
    }
  }
}
function unref(ref2) {
  return isRef(ref2) ? ref2.value : ref2;
}
const shallowUnwrapHandlers = {
  get: (target, key2, receiver) => unref(Reflect.get(target, key2, receiver)),
  set: (target, key2, value, receiver) => {
    const oldValue = target[key2];
    if (isRef(oldValue) && !isRef(value)) {
      oldValue.value = value;
      return true;
    } else {
      return Reflect.set(target, key2, value, receiver);
    }
  }
};
function proxyRefs(objectWithRefs) {
  return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
}
class CustomRefImpl {
  constructor(factory) {
    this.dep = void 0;
    this.__v_isRef = true;
    const { get: get4, set: set3 } = factory(() => trackRefValue(this), () => triggerRefValue(this));
    this._get = get4;
    this._set = set3;
  }
  get value() {
    return this._get();
  }
  set value(newVal) {
    this._set(newVal);
  }
}
function customRef(factory) {
  return new CustomRefImpl(factory);
}
function toRefs(object) {
  const ret = isArray(object) ? new Array(object.length) : {};
  for (const key2 in object) {
    ret[key2] = toRef(object, key2);
  }
  return ret;
}
class ObjectRefImpl {
  constructor(_object, _key, _defaultValue) {
    this._object = _object;
    this._key = _key;
    this._defaultValue = _defaultValue;
    this.__v_isRef = true;
  }
  get value() {
    const val = this._object[this._key];
    return val === void 0 ? this._defaultValue : val;
  }
  set value(newVal) {
    this._object[this._key] = newVal;
  }
}
function toRef(object, key2, defaultValue) {
  const val = object[key2];
  return isRef(val) ? val : new ObjectRefImpl(object, key2, defaultValue);
}
class ComputedRefImpl {
  constructor(getter, _setter, isReadonly2, isSSR) {
    this._setter = _setter;
    this.dep = void 0;
    this.__v_isRef = true;
    this._dirty = true;
    this.effect = new ReactiveEffect(getter, () => {
      if (!this._dirty) {
        this._dirty = true;
        triggerRefValue(this);
      }
    });
    this.effect.computed = this;
    this.effect.active = this._cacheable = !isSSR;
    this["__v_isReadonly"] = isReadonly2;
  }
  get value() {
    const self2 = toRaw(this);
    trackRefValue(self2);
    if (self2._dirty || !self2._cacheable) {
      self2._dirty = false;
      self2._value = self2.effect.run();
    }
    return self2._value;
  }
  set value(newValue) {
    this._setter(newValue);
  }
}
function computed$1(getterOrOptions, debugOptions, isSSR = false) {
  let getter;
  let setter;
  const onlyGetter = isFunction$1(getterOrOptions);
  if (onlyGetter) {
    getter = getterOrOptions;
    setter = NOOP;
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter, isSSR);
  return cRef;
}
function callWithErrorHandling(fn2, instance, type, args) {
  let res;
  try {
    res = args ? fn2(...args) : fn2();
  } catch (err2) {
    handleError(err2, instance, type);
  }
  return res;
}
function callWithAsyncErrorHandling(fn2, instance, type, args) {
  if (isFunction$1(fn2)) {
    const res = callWithErrorHandling(fn2, instance, type, args);
    if (res && isPromise(res)) {
      res.catch((err2) => {
        handleError(err2, instance, type);
      });
    }
    return res;
  }
  const values = [];
  for (let i2 = 0; i2 < fn2.length; i2++) {
    values.push(callWithAsyncErrorHandling(fn2[i2], instance, type, args));
  }
  return values;
}
function handleError(err2, instance, type, throwInDev = true) {
  const contextVNode = instance ? instance.vnode : null;
  if (instance) {
    let cur = instance.parent;
    const exposedInstance = instance.proxy;
    const errorInfo = type;
    while (cur) {
      const errorCapturedHooks = cur.ec;
      if (errorCapturedHooks) {
        for (let i2 = 0; i2 < errorCapturedHooks.length; i2++) {
          if (errorCapturedHooks[i2](err2, exposedInstance, errorInfo) === false) {
            return;
          }
        }
      }
      cur = cur.parent;
    }
    const appErrorHandler = instance.appContext.config.errorHandler;
    if (appErrorHandler) {
      callWithErrorHandling(appErrorHandler, null, 10, [err2, exposedInstance, errorInfo]);
      return;
    }
  }
  logError(err2, type, contextVNode, throwInDev);
}
function logError(err2, type, contextVNode, throwInDev = true) {
  {
    console.error(err2);
  }
}
let isFlushing = false;
let isFlushPending = false;
const queue = [];
let flushIndex = 0;
const pendingPreFlushCbs = [];
let activePreFlushCbs = null;
let preFlushIndex = 0;
const pendingPostFlushCbs = [];
let activePostFlushCbs = null;
let postFlushIndex = 0;
const resolvedPromise = /* @__PURE__ */ Promise.resolve();
let currentFlushPromise = null;
let currentPreFlushParentJob = null;
function nextTick(fn2) {
  const p2 = currentFlushPromise || resolvedPromise;
  return fn2 ? p2.then(this ? fn2.bind(this) : fn2) : p2;
}
function findInsertionIndex(id) {
  let start4 = flushIndex + 1;
  let end3 = queue.length;
  while (start4 < end3) {
    const middle = start4 + end3 >>> 1;
    const middleJobId = getId(queue[middle]);
    middleJobId < id ? start4 = middle + 1 : end3 = middle;
  }
  return start4;
}
function queueJob(job) {
  if ((!queue.length || !queue.includes(job, isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex)) && job !== currentPreFlushParentJob) {
    if (job.id == null) {
      queue.push(job);
    } else {
      queue.splice(findInsertionIndex(job.id), 0, job);
    }
    queueFlush();
  }
}
function queueFlush() {
  if (!isFlushing && !isFlushPending) {
    isFlushPending = true;
    currentFlushPromise = resolvedPromise.then(flushJobs);
  }
}
function invalidateJob(job) {
  const i2 = queue.indexOf(job);
  if (i2 > flushIndex) {
    queue.splice(i2, 1);
  }
}
function queueCb(cb, activeQueue, pendingQueue, index2) {
  if (!isArray(cb)) {
    if (!activeQueue || !activeQueue.includes(cb, cb.allowRecurse ? index2 + 1 : index2)) {
      pendingQueue.push(cb);
    }
  } else {
    pendingQueue.push(...cb);
  }
  queueFlush();
}
function queuePreFlushCb(cb) {
  queueCb(cb, activePreFlushCbs, pendingPreFlushCbs, preFlushIndex);
}
function queuePostFlushCb(cb) {
  queueCb(cb, activePostFlushCbs, pendingPostFlushCbs, postFlushIndex);
}
function flushPreFlushCbs(seen, parentJob = null) {
  if (pendingPreFlushCbs.length) {
    currentPreFlushParentJob = parentJob;
    activePreFlushCbs = [...new Set(pendingPreFlushCbs)];
    pendingPreFlushCbs.length = 0;
    for (preFlushIndex = 0; preFlushIndex < activePreFlushCbs.length; preFlushIndex++) {
      activePreFlushCbs[preFlushIndex]();
    }
    activePreFlushCbs = null;
    preFlushIndex = 0;
    currentPreFlushParentJob = null;
    flushPreFlushCbs(seen, parentJob);
  }
}
function flushPostFlushCbs(seen) {
  if (pendingPostFlushCbs.length) {
    const deduped = [...new Set(pendingPostFlushCbs)];
    pendingPostFlushCbs.length = 0;
    if (activePostFlushCbs) {
      activePostFlushCbs.push(...deduped);
      return;
    }
    activePostFlushCbs = deduped;
    activePostFlushCbs.sort((a2, b) => getId(a2) - getId(b));
    for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
      activePostFlushCbs[postFlushIndex]();
    }
    activePostFlushCbs = null;
    postFlushIndex = 0;
  }
}
const getId = (job) => job.id == null ? Infinity : job.id;
function flushJobs(seen) {
  isFlushPending = false;
  isFlushing = true;
  flushPreFlushCbs(seen);
  queue.sort((a2, b) => getId(a2) - getId(b));
  const check2 = NOOP;
  try {
    for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
      const job = queue[flushIndex];
      if (job && job.active !== false) {
        if (false)
          ;
        callWithErrorHandling(job, null, 14);
      }
    }
  } finally {
    flushIndex = 0;
    queue.length = 0;
    flushPostFlushCbs();
    isFlushing = false;
    currentFlushPromise = null;
    if (queue.length || pendingPreFlushCbs.length || pendingPostFlushCbs.length) {
      flushJobs(seen);
    }
  }
}
function emit$1(instance, event, ...rawArgs) {
  if (instance.isUnmounted)
    return;
  const props = instance.vnode.props || EMPTY_OBJ;
  let args = rawArgs;
  const isModelListener2 = event.startsWith("update:");
  const modelArg = isModelListener2 && event.slice(7);
  if (modelArg && modelArg in props) {
    const modifiersKey = `${modelArg === "modelValue" ? "model" : modelArg}Modifiers`;
    const { number, trim } = props[modifiersKey] || EMPTY_OBJ;
    if (trim) {
      args = rawArgs.map((a2) => a2.trim());
    } else if (number) {
      args = rawArgs.map(toNumber);
    }
  }
  let handlerName;
  let handler = props[handlerName = toHandlerKey(event)] || props[handlerName = toHandlerKey(camelize(event))];
  if (!handler && isModelListener2) {
    handler = props[handlerName = toHandlerKey(hyphenate(event))];
  }
  if (handler) {
    callWithAsyncErrorHandling(handler, instance, 6, args);
  }
  const onceHandler = props[handlerName + `Once`];
  if (onceHandler) {
    if (!instance.emitted) {
      instance.emitted = {};
    } else if (instance.emitted[handlerName]) {
      return;
    }
    instance.emitted[handlerName] = true;
    callWithAsyncErrorHandling(onceHandler, instance, 6, args);
  }
}
function normalizeEmitsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.emitsCache;
  const cached = cache.get(comp);
  if (cached !== void 0) {
    return cached;
  }
  const raw = comp.emits;
  let normalized = {};
  let hasExtends = false;
  if (!isFunction$1(comp)) {
    const extendEmits = (raw2) => {
      const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
      if (normalizedFromExtend) {
        hasExtends = true;
        extend(normalized, normalizedFromExtend);
      }
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendEmits);
    }
    if (comp.extends) {
      extendEmits(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendEmits);
    }
  }
  if (!raw && !hasExtends) {
    cache.set(comp, null);
    return null;
  }
  if (isArray(raw)) {
    raw.forEach((key2) => normalized[key2] = null);
  } else {
    extend(normalized, raw);
  }
  cache.set(comp, normalized);
  return normalized;
}
function isEmitListener(options, key2) {
  if (!options || !isOn(key2)) {
    return false;
  }
  key2 = key2.slice(2).replace(/Once$/, "");
  return hasOwn(options, key2[0].toLowerCase() + key2.slice(1)) || hasOwn(options, hyphenate(key2)) || hasOwn(options, key2);
}
let currentRenderingInstance = null;
let currentScopeId = null;
function setCurrentRenderingInstance(instance) {
  const prev = currentRenderingInstance;
  currentRenderingInstance = instance;
  currentScopeId = instance && instance.type.__scopeId || null;
  return prev;
}
function withCtx(fn2, ctx = currentRenderingInstance, isNonScopedSlot) {
  if (!ctx)
    return fn2;
  if (fn2._n) {
    return fn2;
  }
  const renderFnWithContext = (...args) => {
    if (renderFnWithContext._d) {
      setBlockTracking(-1);
    }
    const prevInstance = setCurrentRenderingInstance(ctx);
    const res = fn2(...args);
    setCurrentRenderingInstance(prevInstance);
    if (renderFnWithContext._d) {
      setBlockTracking(1);
    }
    return res;
  };
  renderFnWithContext._n = true;
  renderFnWithContext._c = true;
  renderFnWithContext._d = true;
  return renderFnWithContext;
}
function markAttrsAccessed() {
}
function renderComponentRoot(instance) {
  const { type: Component, vnode, proxy, withProxy, props, propsOptions: [propsOptions], slots, attrs, emit, render: render2, renderCache, data, setupState, ctx, inheritAttrs } = instance;
  let result2;
  let fallthroughAttrs;
  const prev = setCurrentRenderingInstance(instance);
  try {
    if (vnode.shapeFlag & 4) {
      const proxyToUse = withProxy || proxy;
      result2 = normalizeVNode(render2.call(proxyToUse, proxyToUse, renderCache, props, setupState, data, ctx));
      fallthroughAttrs = attrs;
    } else {
      const render3 = Component;
      if (false)
        ;
      result2 = normalizeVNode(render3.length > 1 ? render3(props, false ? {
        get attrs() {
          markAttrsAccessed();
          return attrs;
        },
        slots,
        emit
      } : { attrs, slots, emit }) : render3(props, null));
      fallthroughAttrs = Component.props ? attrs : getFunctionalFallthrough(attrs);
    }
  } catch (err2) {
    blockStack.length = 0;
    handleError(err2, instance, 1);
    result2 = createVNode(Comment);
  }
  let root = result2;
  if (fallthroughAttrs && inheritAttrs !== false) {
    const keys2 = Object.keys(fallthroughAttrs);
    const { shapeFlag } = root;
    if (keys2.length) {
      if (shapeFlag & (1 | 6)) {
        if (propsOptions && keys2.some(isModelListener)) {
          fallthroughAttrs = filterModelListeners(fallthroughAttrs, propsOptions);
        }
        root = cloneVNode(root, fallthroughAttrs);
      }
    }
  }
  if (vnode.dirs) {
    root.dirs = root.dirs ? root.dirs.concat(vnode.dirs) : vnode.dirs;
  }
  if (vnode.transition) {
    root.transition = vnode.transition;
  }
  {
    result2 = root;
  }
  setCurrentRenderingInstance(prev);
  return result2;
}
const getFunctionalFallthrough = (attrs) => {
  let res;
  for (const key2 in attrs) {
    if (key2 === "class" || key2 === "style" || isOn(key2)) {
      (res || (res = {}))[key2] = attrs[key2];
    }
  }
  return res;
};
const filterModelListeners = (attrs, props) => {
  const res = {};
  for (const key2 in attrs) {
    if (!isModelListener(key2) || !(key2.slice(9) in props)) {
      res[key2] = attrs[key2];
    }
  }
  return res;
};
function shouldUpdateComponent(prevVNode, nextVNode, optimized) {
  const { props: prevProps, children: prevChildren, component } = prevVNode;
  const { props: nextProps, children: nextChildren, patchFlag } = nextVNode;
  const emits = component.emitsOptions;
  if (nextVNode.dirs || nextVNode.transition) {
    return true;
  }
  if (optimized && patchFlag >= 0) {
    if (patchFlag & 1024) {
      return true;
    }
    if (patchFlag & 16) {
      if (!prevProps) {
        return !!nextProps;
      }
      return hasPropsChanged(prevProps, nextProps, emits);
    } else if (patchFlag & 8) {
      const dynamicProps = nextVNode.dynamicProps;
      for (let i2 = 0; i2 < dynamicProps.length; i2++) {
        const key2 = dynamicProps[i2];
        if (nextProps[key2] !== prevProps[key2] && !isEmitListener(emits, key2)) {
          return true;
        }
      }
    }
  } else {
    if (prevChildren || nextChildren) {
      if (!nextChildren || !nextChildren.$stable) {
        return true;
      }
    }
    if (prevProps === nextProps) {
      return false;
    }
    if (!prevProps) {
      return !!nextProps;
    }
    if (!nextProps) {
      return true;
    }
    return hasPropsChanged(prevProps, nextProps, emits);
  }
  return false;
}
function hasPropsChanged(prevProps, nextProps, emitsOptions) {
  const nextKeys = Object.keys(nextProps);
  if (nextKeys.length !== Object.keys(prevProps).length) {
    return true;
  }
  for (let i2 = 0; i2 < nextKeys.length; i2++) {
    const key2 = nextKeys[i2];
    if (nextProps[key2] !== prevProps[key2] && !isEmitListener(emitsOptions, key2)) {
      return true;
    }
  }
  return false;
}
function updateHOCHostEl({ vnode, parent }, el) {
  while (parent && parent.subTree === vnode) {
    (vnode = parent.vnode).el = el;
    parent = parent.parent;
  }
}
const isSuspense = (type) => type.__isSuspense;
function queueEffectWithSuspense(fn2, suspense) {
  if (suspense && suspense.pendingBranch) {
    if (isArray(fn2)) {
      suspense.effects.push(...fn2);
    } else {
      suspense.effects.push(fn2);
    }
  } else {
    queuePostFlushCb(fn2);
  }
}
function provide(key2, value) {
  if (!currentInstance)
    ;
  else {
    let provides = currentInstance.provides;
    const parentProvides = currentInstance.parent && currentInstance.parent.provides;
    if (parentProvides === provides) {
      provides = currentInstance.provides = Object.create(parentProvides);
    }
    provides[key2] = value;
  }
}
function inject(key2, defaultValue, treatDefaultAsFactory = false) {
  const instance = currentInstance || currentRenderingInstance;
  if (instance) {
    const provides = instance.parent == null ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides;
    if (provides && key2 in provides) {
      return provides[key2];
    } else if (arguments.length > 1) {
      return treatDefaultAsFactory && isFunction$1(defaultValue) ? defaultValue.call(instance.proxy) : defaultValue;
    } else
      ;
  }
}
function watchEffect(effect3, options) {
  return doWatch(effect3, null, options);
}
const INITIAL_WATCHER_VALUE = {};
function watch(source, cb, options) {
  return doWatch(source, cb, options);
}
function doWatch(source, cb, { immediate, deep, flush: flush2, onTrack, onTrigger: onTrigger2 } = EMPTY_OBJ) {
  const instance = currentInstance;
  let getter;
  let forceTrigger = false;
  let isMultiSource = false;
  if (isRef(source)) {
    getter = () => source.value;
    forceTrigger = isShallow(source);
  } else if (isReactive(source)) {
    getter = () => source;
    deep = true;
  } else if (isArray(source)) {
    isMultiSource = true;
    forceTrigger = source.some(isReactive);
    getter = () => source.map((s) => {
      if (isRef(s)) {
        return s.value;
      } else if (isReactive(s)) {
        return traverse(s);
      } else if (isFunction$1(s)) {
        return callWithErrorHandling(s, instance, 2);
      } else
        ;
    });
  } else if (isFunction$1(source)) {
    if (cb) {
      getter = () => callWithErrorHandling(source, instance, 2);
    } else {
      getter = () => {
        if (instance && instance.isUnmounted) {
          return;
        }
        if (cleanup) {
          cleanup();
        }
        return callWithAsyncErrorHandling(source, instance, 3, [onCleanup]);
      };
    }
  } else {
    getter = NOOP;
  }
  if (cb && deep) {
    const baseGetter = getter;
    getter = () => traverse(baseGetter());
  }
  let cleanup;
  let onCleanup = (fn2) => {
    cleanup = effect3.onStop = () => {
      callWithErrorHandling(fn2, instance, 4);
    };
  };
  if (isInSSRComponentSetup) {
    onCleanup = NOOP;
    if (!cb) {
      getter();
    } else if (immediate) {
      callWithAsyncErrorHandling(cb, instance, 3, [
        getter(),
        isMultiSource ? [] : void 0,
        onCleanup
      ]);
    }
    return NOOP;
  }
  let oldValue = isMultiSource ? [] : INITIAL_WATCHER_VALUE;
  const job = () => {
    if (!effect3.active) {
      return;
    }
    if (cb) {
      const newValue = effect3.run();
      if (deep || forceTrigger || (isMultiSource ? newValue.some((v, i2) => hasChanged(v, oldValue[i2])) : hasChanged(newValue, oldValue)) || false) {
        if (cleanup) {
          cleanup();
        }
        callWithAsyncErrorHandling(cb, instance, 3, [
          newValue,
          oldValue === INITIAL_WATCHER_VALUE ? void 0 : oldValue,
          onCleanup
        ]);
        oldValue = newValue;
      }
    } else {
      effect3.run();
    }
  };
  job.allowRecurse = !!cb;
  let scheduler;
  if (flush2 === "sync") {
    scheduler = job;
  } else if (flush2 === "post") {
    scheduler = () => queuePostRenderEffect(job, instance && instance.suspense);
  } else {
    scheduler = () => {
      if (!instance || instance.isMounted) {
        queuePreFlushCb(job);
      } else {
        job();
      }
    };
  }
  const effect3 = new ReactiveEffect(getter, scheduler);
  if (cb) {
    if (immediate) {
      job();
    } else {
      oldValue = effect3.run();
    }
  } else if (flush2 === "post") {
    queuePostRenderEffect(effect3.run.bind(effect3), instance && instance.suspense);
  } else {
    effect3.run();
  }
  return () => {
    effect3.stop();
    if (instance && instance.scope) {
      remove(instance.scope.effects, effect3);
    }
  };
}
function instanceWatch(source, value, options) {
  const publicThis = this.proxy;
  const getter = isString(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
  let cb;
  if (isFunction$1(value)) {
    cb = value;
  } else {
    cb = value.handler;
    options = value;
  }
  const cur = currentInstance;
  setCurrentInstance(this);
  const res = doWatch(getter, cb.bind(publicThis), options);
  if (cur) {
    setCurrentInstance(cur);
  } else {
    unsetCurrentInstance();
  }
  return res;
}
function createPathGetter(ctx, path) {
  const segments = path.split(".");
  return () => {
    let cur = ctx;
    for (let i2 = 0; i2 < segments.length && cur; i2++) {
      cur = cur[segments[i2]];
    }
    return cur;
  };
}
function traverse(value, seen) {
  if (!isObject$1(value) || value["__v_skip"]) {
    return value;
  }
  seen = seen || /* @__PURE__ */ new Set();
  if (seen.has(value)) {
    return value;
  }
  seen.add(value);
  if (isRef(value)) {
    traverse(value.value, seen);
  } else if (isArray(value)) {
    for (let i2 = 0; i2 < value.length; i2++) {
      traverse(value[i2], seen);
    }
  } else if (isSet(value) || isMap(value)) {
    value.forEach((v) => {
      traverse(v, seen);
    });
  } else if (isPlainObject$1(value)) {
    for (const key2 in value) {
      traverse(value[key2], seen);
    }
  }
  return value;
}
function useTransitionState() {
  const state = {
    isMounted: false,
    isLeaving: false,
    isUnmounting: false,
    leavingVNodes: /* @__PURE__ */ new Map()
  };
  onMounted(() => {
    state.isMounted = true;
  });
  onBeforeUnmount(() => {
    state.isUnmounting = true;
  });
  return state;
}
const TransitionHookValidator = [Function, Array];
const BaseTransitionImpl = {
  name: `BaseTransition`,
  props: {
    mode: String,
    appear: Boolean,
    persisted: Boolean,
    onBeforeEnter: TransitionHookValidator,
    onEnter: TransitionHookValidator,
    onAfterEnter: TransitionHookValidator,
    onEnterCancelled: TransitionHookValidator,
    onBeforeLeave: TransitionHookValidator,
    onLeave: TransitionHookValidator,
    onAfterLeave: TransitionHookValidator,
    onLeaveCancelled: TransitionHookValidator,
    onBeforeAppear: TransitionHookValidator,
    onAppear: TransitionHookValidator,
    onAfterAppear: TransitionHookValidator,
    onAppearCancelled: TransitionHookValidator
  },
  setup(props, { slots }) {
    const instance = getCurrentInstance();
    const state = useTransitionState();
    let prevTransitionKey;
    return () => {
      const children = slots.default && getTransitionRawChildren(slots.default(), true);
      if (!children || !children.length) {
        return;
      }
      let child3 = children[0];
      if (children.length > 1) {
        for (const c of children) {
          if (c.type !== Comment) {
            child3 = c;
            break;
          }
        }
      }
      const rawProps = toRaw(props);
      const { mode } = rawProps;
      if (state.isLeaving) {
        return emptyPlaceholder(child3);
      }
      const innerChild = getKeepAliveChild(child3);
      if (!innerChild) {
        return emptyPlaceholder(child3);
      }
      const enterHooks = resolveTransitionHooks(innerChild, rawProps, state, instance);
      setTransitionHooks(innerChild, enterHooks);
      const oldChild = instance.subTree;
      const oldInnerChild = oldChild && getKeepAliveChild(oldChild);
      let transitionKeyChanged = false;
      const { getTransitionKey } = innerChild.type;
      if (getTransitionKey) {
        const key2 = getTransitionKey();
        if (prevTransitionKey === void 0) {
          prevTransitionKey = key2;
        } else if (key2 !== prevTransitionKey) {
          prevTransitionKey = key2;
          transitionKeyChanged = true;
        }
      }
      if (oldInnerChild && oldInnerChild.type !== Comment && (!isSameVNodeType(innerChild, oldInnerChild) || transitionKeyChanged)) {
        const leavingHooks = resolveTransitionHooks(oldInnerChild, rawProps, state, instance);
        setTransitionHooks(oldInnerChild, leavingHooks);
        if (mode === "out-in") {
          state.isLeaving = true;
          leavingHooks.afterLeave = () => {
            state.isLeaving = false;
            instance.update();
          };
          return emptyPlaceholder(child3);
        } else if (mode === "in-out" && innerChild.type !== Comment) {
          leavingHooks.delayLeave = (el, earlyRemove, delayedLeave) => {
            const leavingVNodesCache = getLeavingNodesForType(state, oldInnerChild);
            leavingVNodesCache[String(oldInnerChild.key)] = oldInnerChild;
            el._leaveCb = () => {
              earlyRemove();
              el._leaveCb = void 0;
              delete enterHooks.delayedLeave;
            };
            enterHooks.delayedLeave = delayedLeave;
          };
        }
      }
      return child3;
    };
  }
};
const BaseTransition = BaseTransitionImpl;
function getLeavingNodesForType(state, vnode) {
  const { leavingVNodes } = state;
  let leavingVNodesCache = leavingVNodes.get(vnode.type);
  if (!leavingVNodesCache) {
    leavingVNodesCache = /* @__PURE__ */ Object.create(null);
    leavingVNodes.set(vnode.type, leavingVNodesCache);
  }
  return leavingVNodesCache;
}
function resolveTransitionHooks(vnode, props, state, instance) {
  const { appear, mode, persisted = false, onBeforeEnter, onEnter, onAfterEnter, onEnterCancelled, onBeforeLeave, onLeave, onAfterLeave, onLeaveCancelled, onBeforeAppear, onAppear, onAfterAppear, onAppearCancelled } = props;
  const key2 = String(vnode.key);
  const leavingVNodesCache = getLeavingNodesForType(state, vnode);
  const callHook2 = (hook, args) => {
    hook && callWithAsyncErrorHandling(hook, instance, 9, args);
  };
  const hooks = {
    mode,
    persisted,
    beforeEnter(el) {
      let hook = onBeforeEnter;
      if (!state.isMounted) {
        if (appear) {
          hook = onBeforeAppear || onBeforeEnter;
        } else {
          return;
        }
      }
      if (el._leaveCb) {
        el._leaveCb(true);
      }
      const leavingVNode = leavingVNodesCache[key2];
      if (leavingVNode && isSameVNodeType(vnode, leavingVNode) && leavingVNode.el._leaveCb) {
        leavingVNode.el._leaveCb();
      }
      callHook2(hook, [el]);
    },
    enter(el) {
      let hook = onEnter;
      let afterHook = onAfterEnter;
      let cancelHook = onEnterCancelled;
      if (!state.isMounted) {
        if (appear) {
          hook = onAppear || onEnter;
          afterHook = onAfterAppear || onAfterEnter;
          cancelHook = onAppearCancelled || onEnterCancelled;
        } else {
          return;
        }
      }
      let called = false;
      const done2 = el._enterCb = (cancelled) => {
        if (called)
          return;
        called = true;
        if (cancelled) {
          callHook2(cancelHook, [el]);
        } else {
          callHook2(afterHook, [el]);
        }
        if (hooks.delayedLeave) {
          hooks.delayedLeave();
        }
        el._enterCb = void 0;
      };
      if (hook) {
        hook(el, done2);
        if (hook.length <= 1) {
          done2();
        }
      } else {
        done2();
      }
    },
    leave(el, remove3) {
      const key3 = String(vnode.key);
      if (el._enterCb) {
        el._enterCb(true);
      }
      if (state.isUnmounting) {
        return remove3();
      }
      callHook2(onBeforeLeave, [el]);
      let called = false;
      const done2 = el._leaveCb = (cancelled) => {
        if (called)
          return;
        called = true;
        remove3();
        if (cancelled) {
          callHook2(onLeaveCancelled, [el]);
        } else {
          callHook2(onAfterLeave, [el]);
        }
        el._leaveCb = void 0;
        if (leavingVNodesCache[key3] === vnode) {
          delete leavingVNodesCache[key3];
        }
      };
      leavingVNodesCache[key3] = vnode;
      if (onLeave) {
        onLeave(el, done2);
        if (onLeave.length <= 1) {
          done2();
        }
      } else {
        done2();
      }
    },
    clone(vnode2) {
      return resolveTransitionHooks(vnode2, props, state, instance);
    }
  };
  return hooks;
}
function emptyPlaceholder(vnode) {
  if (isKeepAlive(vnode)) {
    vnode = cloneVNode(vnode);
    vnode.children = null;
    return vnode;
  }
}
function getKeepAliveChild(vnode) {
  return isKeepAlive(vnode) ? vnode.children ? vnode.children[0] : void 0 : vnode;
}
function setTransitionHooks(vnode, hooks) {
  if (vnode.shapeFlag & 6 && vnode.component) {
    setTransitionHooks(vnode.component.subTree, hooks);
  } else if (vnode.shapeFlag & 128) {
    vnode.ssContent.transition = hooks.clone(vnode.ssContent);
    vnode.ssFallback.transition = hooks.clone(vnode.ssFallback);
  } else {
    vnode.transition = hooks;
  }
}
function getTransitionRawChildren(children, keepComment = false, parentKey) {
  let ret = [];
  let keyedFragmentCount = 0;
  for (let i2 = 0; i2 < children.length; i2++) {
    let child3 = children[i2];
    const key2 = parentKey == null ? child3.key : String(parentKey) + String(child3.key != null ? child3.key : i2);
    if (child3.type === Fragment$1) {
      if (child3.patchFlag & 128)
        keyedFragmentCount++;
      ret = ret.concat(getTransitionRawChildren(child3.children, keepComment, key2));
    } else if (keepComment || child3.type !== Comment) {
      ret.push(key2 != null ? cloneVNode(child3, { key: key2 }) : child3);
    }
  }
  if (keyedFragmentCount > 1) {
    for (let i2 = 0; i2 < ret.length; i2++) {
      ret[i2].patchFlag = -2;
    }
  }
  return ret;
}
function defineComponent(options) {
  return isFunction$1(options) ? { setup: options, name: options.name } : options;
}
const isAsyncWrapper = (i2) => !!i2.type.__asyncLoader;
const isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
function onActivated(hook, target) {
  registerKeepAliveHook(hook, "a", target);
}
function onDeactivated(hook, target) {
  registerKeepAliveHook(hook, "da", target);
}
function registerKeepAliveHook(hook, type, target = currentInstance) {
  const wrappedHook = hook.__wdc || (hook.__wdc = () => {
    let current = target;
    while (current) {
      if (current.isDeactivated) {
        return;
      }
      current = current.parent;
    }
    return hook();
  });
  injectHook(type, wrappedHook, target);
  if (target) {
    let current = target.parent;
    while (current && current.parent) {
      if (isKeepAlive(current.parent.vnode)) {
        injectToKeepAliveRoot(wrappedHook, type, target, current);
      }
      current = current.parent;
    }
  }
}
function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
  const injected = injectHook(type, hook, keepAliveRoot, true);
  onUnmounted(() => {
    remove(keepAliveRoot[type], injected);
  }, target);
}
function injectHook(type, hook, target = currentInstance, prepend2 = false) {
  if (target) {
    const hooks = target[type] || (target[type] = []);
    const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
      if (target.isUnmounted) {
        return;
      }
      pauseTracking();
      setCurrentInstance(target);
      const res = callWithAsyncErrorHandling(hook, target, type, args);
      unsetCurrentInstance();
      resetTracking();
      return res;
    });
    if (prepend2) {
      hooks.unshift(wrappedHook);
    } else {
      hooks.push(wrappedHook);
    }
    return wrappedHook;
  }
}
const createHook = (lifecycle) => (hook, target = currentInstance) => (!isInSSRComponentSetup || lifecycle === "sp") && injectHook(lifecycle, hook, target);
const onBeforeMount = createHook("bm");
const onMounted = createHook("m");
const onBeforeUpdate = createHook("bu");
const onUpdated = createHook("u");
const onBeforeUnmount = createHook("bum");
const onUnmounted = createHook("um");
const onServerPrefetch = createHook("sp");
const onRenderTriggered = createHook("rtg");
const onRenderTracked = createHook("rtc");
function onErrorCaptured(hook, target = currentInstance) {
  injectHook("ec", hook, target);
}
let shouldCacheAccess = true;
function applyOptions(instance) {
  const options = resolveMergedOptions(instance);
  const publicThis = instance.proxy;
  const ctx = instance.ctx;
  shouldCacheAccess = false;
  if (options.beforeCreate) {
    callHook(options.beforeCreate, instance, "bc");
  }
  const {
    data: dataOptions,
    computed: computedOptions,
    methods,
    watch: watchOptions,
    provide: provideOptions,
    inject: injectOptions,
    created,
    beforeMount,
    mounted,
    beforeUpdate,
    updated,
    activated,
    deactivated,
    beforeDestroy,
    beforeUnmount,
    destroyed,
    unmounted,
    render: render2,
    renderTracked,
    renderTriggered,
    errorCaptured,
    serverPrefetch,
    expose,
    inheritAttrs,
    components,
    directives,
    filters
  } = options;
  const checkDuplicateProperties = null;
  if (injectOptions) {
    resolveInjections(injectOptions, ctx, checkDuplicateProperties, instance.appContext.config.unwrapInjectedRef);
  }
  if (methods) {
    for (const key2 in methods) {
      const methodHandler = methods[key2];
      if (isFunction$1(methodHandler)) {
        {
          ctx[key2] = methodHandler.bind(publicThis);
        }
      }
    }
  }
  if (dataOptions) {
    const data = dataOptions.call(publicThis, publicThis);
    if (!isObject$1(data))
      ;
    else {
      instance.data = reactive(data);
    }
  }
  shouldCacheAccess = true;
  if (computedOptions) {
    for (const key2 in computedOptions) {
      const opt = computedOptions[key2];
      const get4 = isFunction$1(opt) ? opt.bind(publicThis, publicThis) : isFunction$1(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
      const set3 = !isFunction$1(opt) && isFunction$1(opt.set) ? opt.set.bind(publicThis) : NOOP;
      const c = computed({
        get: get4,
        set: set3
      });
      Object.defineProperty(ctx, key2, {
        enumerable: true,
        configurable: true,
        get: () => c.value,
        set: (v) => c.value = v
      });
    }
  }
  if (watchOptions) {
    for (const key2 in watchOptions) {
      createWatcher(watchOptions[key2], ctx, publicThis, key2);
    }
  }
  if (provideOptions) {
    const provides = isFunction$1(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
    Reflect.ownKeys(provides).forEach((key2) => {
      provide(key2, provides[key2]);
    });
  }
  if (created) {
    callHook(created, instance, "c");
  }
  function registerLifecycleHook(register, hook) {
    if (isArray(hook)) {
      hook.forEach((_hook) => register(_hook.bind(publicThis)));
    } else if (hook) {
      register(hook.bind(publicThis));
    }
  }
  registerLifecycleHook(onBeforeMount, beforeMount);
  registerLifecycleHook(onMounted, mounted);
  registerLifecycleHook(onBeforeUpdate, beforeUpdate);
  registerLifecycleHook(onUpdated, updated);
  registerLifecycleHook(onActivated, activated);
  registerLifecycleHook(onDeactivated, deactivated);
  registerLifecycleHook(onErrorCaptured, errorCaptured);
  registerLifecycleHook(onRenderTracked, renderTracked);
  registerLifecycleHook(onRenderTriggered, renderTriggered);
  registerLifecycleHook(onBeforeUnmount, beforeUnmount);
  registerLifecycleHook(onUnmounted, unmounted);
  registerLifecycleHook(onServerPrefetch, serverPrefetch);
  if (isArray(expose)) {
    if (expose.length) {
      const exposed = instance.exposed || (instance.exposed = {});
      expose.forEach((key2) => {
        Object.defineProperty(exposed, key2, {
          get: () => publicThis[key2],
          set: (val) => publicThis[key2] = val
        });
      });
    } else if (!instance.exposed) {
      instance.exposed = {};
    }
  }
  if (render2 && instance.render === NOOP) {
    instance.render = render2;
  }
  if (inheritAttrs != null) {
    instance.inheritAttrs = inheritAttrs;
  }
  if (components)
    instance.components = components;
  if (directives)
    instance.directives = directives;
}
function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP, unwrapRef = false) {
  if (isArray(injectOptions)) {
    injectOptions = normalizeInject(injectOptions);
  }
  for (const key2 in injectOptions) {
    const opt = injectOptions[key2];
    let injected;
    if (isObject$1(opt)) {
      if ("default" in opt) {
        injected = inject(opt.from || key2, opt.default, true);
      } else {
        injected = inject(opt.from || key2);
      }
    } else {
      injected = inject(opt);
    }
    if (isRef(injected)) {
      if (unwrapRef) {
        Object.defineProperty(ctx, key2, {
          enumerable: true,
          configurable: true,
          get: () => injected.value,
          set: (v) => injected.value = v
        });
      } else {
        ctx[key2] = injected;
      }
    } else {
      ctx[key2] = injected;
    }
  }
}
function callHook(hook, instance, type) {
  callWithAsyncErrorHandling(isArray(hook) ? hook.map((h2) => h2.bind(instance.proxy)) : hook.bind(instance.proxy), instance, type);
}
function createWatcher(raw, ctx, publicThis, key2) {
  const getter = key2.includes(".") ? createPathGetter(publicThis, key2) : () => publicThis[key2];
  if (isString(raw)) {
    const handler = ctx[raw];
    if (isFunction$1(handler)) {
      watch(getter, handler);
    }
  } else if (isFunction$1(raw)) {
    watch(getter, raw.bind(publicThis));
  } else if (isObject$1(raw)) {
    if (isArray(raw)) {
      raw.forEach((r) => createWatcher(r, ctx, publicThis, key2));
    } else {
      const handler = isFunction$1(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
      if (isFunction$1(handler)) {
        watch(getter, handler, raw);
      }
    }
  } else
    ;
}
function resolveMergedOptions(instance) {
  const base2 = instance.type;
  const { mixins, extends: extendsOptions } = base2;
  const { mixins: globalMixins, optionsCache: cache, config: { optionMergeStrategies } } = instance.appContext;
  const cached = cache.get(base2);
  let resolved;
  if (cached) {
    resolved = cached;
  } else if (!globalMixins.length && !mixins && !extendsOptions) {
    {
      resolved = base2;
    }
  } else {
    resolved = {};
    if (globalMixins.length) {
      globalMixins.forEach((m) => mergeOptions(resolved, m, optionMergeStrategies, true));
    }
    mergeOptions(resolved, base2, optionMergeStrategies);
  }
  cache.set(base2, resolved);
  return resolved;
}
function mergeOptions(to, from4, strats, asMixin = false) {
  const { mixins, extends: extendsOptions } = from4;
  if (extendsOptions) {
    mergeOptions(to, extendsOptions, strats, true);
  }
  if (mixins) {
    mixins.forEach((m) => mergeOptions(to, m, strats, true));
  }
  for (const key2 in from4) {
    if (asMixin && key2 === "expose")
      ;
    else {
      const strat = internalOptionMergeStrats[key2] || strats && strats[key2];
      to[key2] = strat ? strat(to[key2], from4[key2]) : from4[key2];
    }
  }
  return to;
}
const internalOptionMergeStrats = {
  data: mergeDataFn,
  props: mergeObjectOptions,
  emits: mergeObjectOptions,
  methods: mergeObjectOptions,
  computed: mergeObjectOptions,
  beforeCreate: mergeAsArray,
  created: mergeAsArray,
  beforeMount: mergeAsArray,
  mounted: mergeAsArray,
  beforeUpdate: mergeAsArray,
  updated: mergeAsArray,
  beforeDestroy: mergeAsArray,
  beforeUnmount: mergeAsArray,
  destroyed: mergeAsArray,
  unmounted: mergeAsArray,
  activated: mergeAsArray,
  deactivated: mergeAsArray,
  errorCaptured: mergeAsArray,
  serverPrefetch: mergeAsArray,
  components: mergeObjectOptions,
  directives: mergeObjectOptions,
  watch: mergeWatchOptions,
  provide: mergeDataFn,
  inject: mergeInject
};
function mergeDataFn(to, from4) {
  if (!from4) {
    return to;
  }
  if (!to) {
    return from4;
  }
  return function mergedDataFn() {
    return extend(isFunction$1(to) ? to.call(this, this) : to, isFunction$1(from4) ? from4.call(this, this) : from4);
  };
}
function mergeInject(to, from4) {
  return mergeObjectOptions(normalizeInject(to), normalizeInject(from4));
}
function normalizeInject(raw) {
  if (isArray(raw)) {
    const res = {};
    for (let i2 = 0; i2 < raw.length; i2++) {
      res[raw[i2]] = raw[i2];
    }
    return res;
  }
  return raw;
}
function mergeAsArray(to, from4) {
  return to ? [...new Set([].concat(to, from4))] : from4;
}
function mergeObjectOptions(to, from4) {
  return to ? extend(extend(/* @__PURE__ */ Object.create(null), to), from4) : from4;
}
function mergeWatchOptions(to, from4) {
  if (!to)
    return from4;
  if (!from4)
    return to;
  const merged = extend(/* @__PURE__ */ Object.create(null), to);
  for (const key2 in from4) {
    merged[key2] = mergeAsArray(to[key2], from4[key2]);
  }
  return merged;
}
function initProps(instance, rawProps, isStateful, isSSR = false) {
  const props = {};
  const attrs = {};
  def(attrs, InternalObjectKey, 1);
  instance.propsDefaults = /* @__PURE__ */ Object.create(null);
  setFullProps(instance, rawProps, props, attrs);
  for (const key2 in instance.propsOptions[0]) {
    if (!(key2 in props)) {
      props[key2] = void 0;
    }
  }
  if (isStateful) {
    instance.props = isSSR ? props : shallowReactive(props);
  } else {
    if (!instance.type.props) {
      instance.props = attrs;
    } else {
      instance.props = props;
    }
  }
  instance.attrs = attrs;
}
function updateProps(instance, rawProps, rawPrevProps, optimized) {
  const { props, attrs, vnode: { patchFlag } } = instance;
  const rawCurrentProps = toRaw(props);
  const [options] = instance.propsOptions;
  let hasAttrsChanged = false;
  if ((optimized || patchFlag > 0) && !(patchFlag & 16)) {
    if (patchFlag & 8) {
      const propsToUpdate = instance.vnode.dynamicProps;
      for (let i2 = 0; i2 < propsToUpdate.length; i2++) {
        let key2 = propsToUpdate[i2];
        if (isEmitListener(instance.emitsOptions, key2)) {
          continue;
        }
        const value = rawProps[key2];
        if (options) {
          if (hasOwn(attrs, key2)) {
            if (value !== attrs[key2]) {
              attrs[key2] = value;
              hasAttrsChanged = true;
            }
          } else {
            const camelizedKey = camelize(key2);
            props[camelizedKey] = resolvePropValue(options, rawCurrentProps, camelizedKey, value, instance, false);
          }
        } else {
          if (value !== attrs[key2]) {
            attrs[key2] = value;
            hasAttrsChanged = true;
          }
        }
      }
    }
  } else {
    if (setFullProps(instance, rawProps, props, attrs)) {
      hasAttrsChanged = true;
    }
    let kebabKey;
    for (const key2 in rawCurrentProps) {
      if (!rawProps || !hasOwn(rawProps, key2) && ((kebabKey = hyphenate(key2)) === key2 || !hasOwn(rawProps, kebabKey))) {
        if (options) {
          if (rawPrevProps && (rawPrevProps[key2] !== void 0 || rawPrevProps[kebabKey] !== void 0)) {
            props[key2] = resolvePropValue(options, rawCurrentProps, key2, void 0, instance, true);
          }
        } else {
          delete props[key2];
        }
      }
    }
    if (attrs !== rawCurrentProps) {
      for (const key2 in attrs) {
        if (!rawProps || !hasOwn(rawProps, key2) && true) {
          delete attrs[key2];
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (hasAttrsChanged) {
    trigger(instance, "set", "$attrs");
  }
}
function setFullProps(instance, rawProps, props, attrs) {
  const [options, needCastKeys] = instance.propsOptions;
  let hasAttrsChanged = false;
  let rawCastValues;
  if (rawProps) {
    for (let key2 in rawProps) {
      if (isReservedProp(key2)) {
        continue;
      }
      const value = rawProps[key2];
      let camelKey;
      if (options && hasOwn(options, camelKey = camelize(key2))) {
        if (!needCastKeys || !needCastKeys.includes(camelKey)) {
          props[camelKey] = value;
        } else {
          (rawCastValues || (rawCastValues = {}))[camelKey] = value;
        }
      } else if (!isEmitListener(instance.emitsOptions, key2)) {
        if (!(key2 in attrs) || value !== attrs[key2]) {
          attrs[key2] = value;
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (needCastKeys) {
    const rawCurrentProps = toRaw(props);
    const castValues = rawCastValues || EMPTY_OBJ;
    for (let i2 = 0; i2 < needCastKeys.length; i2++) {
      const key2 = needCastKeys[i2];
      props[key2] = resolvePropValue(options, rawCurrentProps, key2, castValues[key2], instance, !hasOwn(castValues, key2));
    }
  }
  return hasAttrsChanged;
}
function resolvePropValue(options, props, key2, value, instance, isAbsent) {
  const opt = options[key2];
  if (opt != null) {
    const hasDefault = hasOwn(opt, "default");
    if (hasDefault && value === void 0) {
      const defaultValue = opt.default;
      if (opt.type !== Function && isFunction$1(defaultValue)) {
        const { propsDefaults } = instance;
        if (key2 in propsDefaults) {
          value = propsDefaults[key2];
        } else {
          setCurrentInstance(instance);
          value = propsDefaults[key2] = defaultValue.call(null, props);
          unsetCurrentInstance();
        }
      } else {
        value = defaultValue;
      }
    }
    if (opt[0]) {
      if (isAbsent && !hasDefault) {
        value = false;
      } else if (opt[1] && (value === "" || value === hyphenate(key2))) {
        value = true;
      }
    }
  }
  return value;
}
function normalizePropsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.propsCache;
  const cached = cache.get(comp);
  if (cached) {
    return cached;
  }
  const raw = comp.props;
  const normalized = {};
  const needCastKeys = [];
  let hasExtends = false;
  if (!isFunction$1(comp)) {
    const extendProps = (raw2) => {
      hasExtends = true;
      const [props, keys2] = normalizePropsOptions(raw2, appContext, true);
      extend(normalized, props);
      if (keys2)
        needCastKeys.push(...keys2);
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendProps);
    }
    if (comp.extends) {
      extendProps(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendProps);
    }
  }
  if (!raw && !hasExtends) {
    cache.set(comp, EMPTY_ARR);
    return EMPTY_ARR;
  }
  if (isArray(raw)) {
    for (let i2 = 0; i2 < raw.length; i2++) {
      const normalizedKey = camelize(raw[i2]);
      if (validatePropName(normalizedKey)) {
        normalized[normalizedKey] = EMPTY_OBJ;
      }
    }
  } else if (raw) {
    for (const key2 in raw) {
      const normalizedKey = camelize(key2);
      if (validatePropName(normalizedKey)) {
        const opt = raw[key2];
        const prop2 = normalized[normalizedKey] = isArray(opt) || isFunction$1(opt) ? { type: opt } : opt;
        if (prop2) {
          const booleanIndex = getTypeIndex(Boolean, prop2.type);
          const stringIndex = getTypeIndex(String, prop2.type);
          prop2[0] = booleanIndex > -1;
          prop2[1] = stringIndex < 0 || booleanIndex < stringIndex;
          if (booleanIndex > -1 || hasOwn(prop2, "default")) {
            needCastKeys.push(normalizedKey);
          }
        }
      }
    }
  }
  const res = [normalized, needCastKeys];
  cache.set(comp, res);
  return res;
}
function validatePropName(key2) {
  if (key2[0] !== "$") {
    return true;
  }
  return false;
}
function getType$1(ctor) {
  const match = ctor && ctor.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ctor === null ? "null" : "";
}
function isSameType(a2, b) {
  return getType$1(a2) === getType$1(b);
}
function getTypeIndex(type, expectedTypes) {
  if (isArray(expectedTypes)) {
    return expectedTypes.findIndex((t) => isSameType(t, type));
  } else if (isFunction$1(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1;
  }
  return -1;
}
const isInternalKey = (key2) => key2[0] === "_" || key2 === "$stable";
const normalizeSlotValue = (value) => isArray(value) ? value.map(normalizeVNode) : [normalizeVNode(value)];
const normalizeSlot = (key2, rawSlot, ctx) => {
  const normalized = withCtx((...args) => {
    return normalizeSlotValue(rawSlot(...args));
  }, ctx);
  normalized._c = false;
  return normalized;
};
const normalizeObjectSlots = (rawSlots, slots, instance) => {
  const ctx = rawSlots._ctx;
  for (const key2 in rawSlots) {
    if (isInternalKey(key2))
      continue;
    const value = rawSlots[key2];
    if (isFunction$1(value)) {
      slots[key2] = normalizeSlot(key2, value, ctx);
    } else if (value != null) {
      const normalized = normalizeSlotValue(value);
      slots[key2] = () => normalized;
    }
  }
};
const normalizeVNodeSlots = (instance, children) => {
  const normalized = normalizeSlotValue(children);
  instance.slots.default = () => normalized;
};
const initSlots = (instance, children) => {
  if (instance.vnode.shapeFlag & 32) {
    const type = children._;
    if (type) {
      instance.slots = toRaw(children);
      def(children, "_", type);
    } else {
      normalizeObjectSlots(children, instance.slots = {});
    }
  } else {
    instance.slots = {};
    if (children) {
      normalizeVNodeSlots(instance, children);
    }
  }
  def(instance.slots, InternalObjectKey, 1);
};
const updateSlots = (instance, children, optimized) => {
  const { vnode, slots } = instance;
  let needDeletionCheck = true;
  let deletionComparisonTarget = EMPTY_OBJ;
  if (vnode.shapeFlag & 32) {
    const type = children._;
    if (type) {
      if (optimized && type === 1) {
        needDeletionCheck = false;
      } else {
        extend(slots, children);
        if (!optimized && type === 1) {
          delete slots._;
        }
      }
    } else {
      needDeletionCheck = !children.$stable;
      normalizeObjectSlots(children, slots);
    }
    deletionComparisonTarget = children;
  } else if (children) {
    normalizeVNodeSlots(instance, children);
    deletionComparisonTarget = { default: 1 };
  }
  if (needDeletionCheck) {
    for (const key2 in slots) {
      if (!isInternalKey(key2) && !(key2 in deletionComparisonTarget)) {
        delete slots[key2];
      }
    }
  }
};
function invokeDirectiveHook(vnode, prevVNode, instance, name) {
  const bindings = vnode.dirs;
  const oldBindings = prevVNode && prevVNode.dirs;
  for (let i2 = 0; i2 < bindings.length; i2++) {
    const binding = bindings[i2];
    if (oldBindings) {
      binding.oldValue = oldBindings[i2].value;
    }
    let hook = binding.dir[name];
    if (hook) {
      pauseTracking();
      callWithAsyncErrorHandling(hook, instance, 8, [
        vnode.el,
        binding,
        vnode,
        prevVNode
      ]);
      resetTracking();
    }
  }
}
function createAppContext() {
  return {
    app: null,
    config: {
      isNativeTag: NO,
      performance: false,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let uid = 0;
function createAppAPI(render2, hydrate) {
  return function createApp2(rootComponent, rootProps = null) {
    if (!isFunction$1(rootComponent)) {
      rootComponent = Object.assign({}, rootComponent);
    }
    if (rootProps != null && !isObject$1(rootProps)) {
      rootProps = null;
    }
    const context = createAppContext();
    const installedPlugins = /* @__PURE__ */ new Set();
    let isMounted = false;
    const app = context.app = {
      _uid: uid++,
      _component: rootComponent,
      _props: rootProps,
      _container: null,
      _context: context,
      _instance: null,
      version,
      get config() {
        return context.config;
      },
      set config(v) {
      },
      use(plugin, ...options) {
        if (installedPlugins.has(plugin))
          ;
        else if (plugin && isFunction$1(plugin.install)) {
          installedPlugins.add(plugin);
          plugin.install(app, ...options);
        } else if (isFunction$1(plugin)) {
          installedPlugins.add(plugin);
          plugin(app, ...options);
        } else
          ;
        return app;
      },
      mixin(mixin) {
        {
          if (!context.mixins.includes(mixin)) {
            context.mixins.push(mixin);
          }
        }
        return app;
      },
      component(name, component) {
        if (!component) {
          return context.components[name];
        }
        context.components[name] = component;
        return app;
      },
      directive(name, directive) {
        if (!directive) {
          return context.directives[name];
        }
        context.directives[name] = directive;
        return app;
      },
      mount(rootContainer, isHydrate, isSVG) {
        if (!isMounted) {
          const vnode = createVNode(rootComponent, rootProps);
          vnode.appContext = context;
          if (isHydrate && hydrate) {
            hydrate(vnode, rootContainer);
          } else {
            render2(vnode, rootContainer, isSVG);
          }
          isMounted = true;
          app._container = rootContainer;
          rootContainer.__vue_app__ = app;
          return getExposeProxy(vnode.component) || vnode.component.proxy;
        }
      },
      unmount() {
        if (isMounted) {
          render2(null, app._container);
          delete app._container.__vue_app__;
        }
      },
      provide(key2, value) {
        context.provides[key2] = value;
        return app;
      }
    };
    return app;
  };
}
function setRef(rawRef, oldRawRef, parentSuspense, vnode, isUnmount = false) {
  if (isArray(rawRef)) {
    rawRef.forEach((r, i2) => setRef(r, oldRawRef && (isArray(oldRawRef) ? oldRawRef[i2] : oldRawRef), parentSuspense, vnode, isUnmount));
    return;
  }
  if (isAsyncWrapper(vnode) && !isUnmount) {
    return;
  }
  const refValue = vnode.shapeFlag & 4 ? getExposeProxy(vnode.component) || vnode.component.proxy : vnode.el;
  const value = isUnmount ? null : refValue;
  const { i: owner, r: ref2 } = rawRef;
  const oldRef = oldRawRef && oldRawRef.r;
  const refs = owner.refs === EMPTY_OBJ ? owner.refs = {} : owner.refs;
  const setupState = owner.setupState;
  if (oldRef != null && oldRef !== ref2) {
    if (isString(oldRef)) {
      refs[oldRef] = null;
      if (hasOwn(setupState, oldRef)) {
        setupState[oldRef] = null;
      }
    } else if (isRef(oldRef)) {
      oldRef.value = null;
    }
  }
  if (isFunction$1(ref2)) {
    callWithErrorHandling(ref2, owner, 12, [value, refs]);
  } else {
    const _isString = isString(ref2);
    const _isRef = isRef(ref2);
    if (_isString || _isRef) {
      const doSet = () => {
        if (rawRef.f) {
          const existing = _isString ? refs[ref2] : ref2.value;
          if (isUnmount) {
            isArray(existing) && remove(existing, refValue);
          } else {
            if (!isArray(existing)) {
              if (_isString) {
                refs[ref2] = [refValue];
                if (hasOwn(setupState, ref2)) {
                  setupState[ref2] = refs[ref2];
                }
              } else {
                ref2.value = [refValue];
                if (rawRef.k)
                  refs[rawRef.k] = ref2.value;
              }
            } else if (!existing.includes(refValue)) {
              existing.push(refValue);
            }
          }
        } else if (_isString) {
          refs[ref2] = value;
          if (hasOwn(setupState, ref2)) {
            setupState[ref2] = value;
          }
        } else if (isRef(ref2)) {
          ref2.value = value;
          if (rawRef.k)
            refs[rawRef.k] = value;
        } else
          ;
      };
      if (value) {
        doSet.id = -1;
        queuePostRenderEffect(doSet, parentSuspense);
      } else {
        doSet();
      }
    }
  }
}
const queuePostRenderEffect = queueEffectWithSuspense;
function createRenderer(options) {
  return baseCreateRenderer(options);
}
function baseCreateRenderer(options, createHydrationFns) {
  const target = getGlobalThis();
  target.__VUE__ = true;
  const { insert: hostInsert, remove: hostRemove, patchProp: hostPatchProp, createElement: hostCreateElement, createText: hostCreateText, createComment: hostCreateComment, setText: hostSetText, setElementText: hostSetElementText, parentNode: hostParentNode, nextSibling: hostNextSibling, setScopeId: hostSetScopeId = NOOP, cloneNode: hostCloneNode, insertStaticContent: hostInsertStaticContent } = options;
  const patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null, isSVG = false, slotScopeIds = null, optimized = !!n2.dynamicChildren) => {
    if (n1 === n2) {
      return;
    }
    if (n1 && !isSameVNodeType(n1, n2)) {
      anchor = getNextHostNode(n1);
      unmount(n1, parentComponent, parentSuspense, true);
      n1 = null;
    }
    if (n2.patchFlag === -2) {
      optimized = false;
      n2.dynamicChildren = null;
    }
    const { type, ref: ref2, shapeFlag } = n2;
    switch (type) {
      case Text$1:
        processText(n1, n2, container, anchor);
        break;
      case Comment:
        processCommentNode(n1, n2, container, anchor);
        break;
      case Static:
        if (n1 == null) {
          mountStaticNode(n2, container, anchor, isSVG);
        }
        break;
      case Fragment$1:
        processFragment(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        break;
      default:
        if (shapeFlag & 1) {
          processElement(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else if (shapeFlag & 6) {
          processComponent(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else if (shapeFlag & 64) {
          type.process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals);
        } else if (shapeFlag & 128) {
          type.process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals);
        } else
          ;
    }
    if (ref2 != null && parentComponent) {
      setRef(ref2, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
    }
  };
  const processText = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(n2.el = hostCreateText(n2.children), container, anchor);
    } else {
      const el = n2.el = n1.el;
      if (n2.children !== n1.children) {
        hostSetText(el, n2.children);
      }
    }
  };
  const processCommentNode = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(n2.el = hostCreateComment(n2.children || ""), container, anchor);
    } else {
      n2.el = n1.el;
    }
  };
  const mountStaticNode = (n2, container, anchor, isSVG) => {
    [n2.el, n2.anchor] = hostInsertStaticContent(n2.children, container, anchor, isSVG, n2.el, n2.anchor);
  };
  const moveStaticNode = ({ el, anchor }, container, nextSibling) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostInsert(el, container, nextSibling);
      el = next;
    }
    hostInsert(anchor, container, nextSibling);
  };
  const removeStaticNode = ({ el, anchor }) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostRemove(el);
      el = next;
    }
    hostRemove(anchor);
  };
  const processElement = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    isSVG = isSVG || n2.type === "svg";
    if (n1 == null) {
      mountElement(n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    } else {
      patchElement(n1, n2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    }
  };
  const mountElement = (vnode, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    let el;
    let vnodeHook;
    const { type, props, shapeFlag, transition, patchFlag, dirs } = vnode;
    if (vnode.el && hostCloneNode !== void 0 && patchFlag === -1) {
      el = vnode.el = hostCloneNode(vnode.el);
    } else {
      el = vnode.el = hostCreateElement(vnode.type, isSVG, props && props.is, props);
      if (shapeFlag & 8) {
        hostSetElementText(el, vnode.children);
      } else if (shapeFlag & 16) {
        mountChildren(vnode.children, el, null, parentComponent, parentSuspense, isSVG && type !== "foreignObject", slotScopeIds, optimized);
      }
      if (dirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "created");
      }
      if (props) {
        for (const key2 in props) {
          if (key2 !== "value" && !isReservedProp(key2)) {
            hostPatchProp(el, key2, null, props[key2], isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
          }
        }
        if ("value" in props) {
          hostPatchProp(el, "value", null, props.value);
        }
        if (vnodeHook = props.onVnodeBeforeMount) {
          invokeVNodeHook(vnodeHook, parentComponent, vnode);
        }
      }
      setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponent);
    }
    if (dirs) {
      invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
    }
    const needCallTransitionHooks = (!parentSuspense || parentSuspense && !parentSuspense.pendingBranch) && transition && !transition.persisted;
    if (needCallTransitionHooks) {
      transition.beforeEnter(el);
    }
    hostInsert(el, container, anchor);
    if ((vnodeHook = props && props.onVnodeMounted) || needCallTransitionHooks || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        needCallTransitionHooks && transition.enter(el);
        dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
      }, parentSuspense);
    }
  };
  const setScopeId = (el, vnode, scopeId, slotScopeIds, parentComponent) => {
    if (scopeId) {
      hostSetScopeId(el, scopeId);
    }
    if (slotScopeIds) {
      for (let i2 = 0; i2 < slotScopeIds.length; i2++) {
        hostSetScopeId(el, slotScopeIds[i2]);
      }
    }
    if (parentComponent) {
      let subTree = parentComponent.subTree;
      if (vnode === subTree) {
        const parentVNode = parentComponent.vnode;
        setScopeId(el, parentVNode, parentVNode.scopeId, parentVNode.slotScopeIds, parentComponent.parent);
      }
    }
  };
  const mountChildren = (children, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, start4 = 0) => {
    for (let i2 = start4; i2 < children.length; i2++) {
      const child3 = children[i2] = optimized ? cloneIfMounted(children[i2]) : normalizeVNode(children[i2]);
      patch(null, child3, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    }
  };
  const patchElement = (n1, n2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    const el = n2.el = n1.el;
    let { patchFlag, dynamicChildren, dirs } = n2;
    patchFlag |= n1.patchFlag & 16;
    const oldProps = n1.props || EMPTY_OBJ;
    const newProps = n2.props || EMPTY_OBJ;
    let vnodeHook;
    parentComponent && toggleRecurse(parentComponent, false);
    if (vnodeHook = newProps.onVnodeBeforeUpdate) {
      invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
    }
    if (dirs) {
      invokeDirectiveHook(n2, n1, parentComponent, "beforeUpdate");
    }
    parentComponent && toggleRecurse(parentComponent, true);
    const areChildrenSVG = isSVG && n2.type !== "foreignObject";
    if (dynamicChildren) {
      patchBlockChildren(n1.dynamicChildren, dynamicChildren, el, parentComponent, parentSuspense, areChildrenSVG, slotScopeIds);
    } else if (!optimized) {
      patchChildren(n1, n2, el, null, parentComponent, parentSuspense, areChildrenSVG, slotScopeIds, false);
    }
    if (patchFlag > 0) {
      if (patchFlag & 16) {
        patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, isSVG);
      } else {
        if (patchFlag & 2) {
          if (oldProps.class !== newProps.class) {
            hostPatchProp(el, "class", null, newProps.class, isSVG);
          }
        }
        if (patchFlag & 4) {
          hostPatchProp(el, "style", oldProps.style, newProps.style, isSVG);
        }
        if (patchFlag & 8) {
          const propsToUpdate = n2.dynamicProps;
          for (let i2 = 0; i2 < propsToUpdate.length; i2++) {
            const key2 = propsToUpdate[i2];
            const prev = oldProps[key2];
            const next = newProps[key2];
            if (next !== prev || key2 === "value") {
              hostPatchProp(el, key2, prev, next, isSVG, n1.children, parentComponent, parentSuspense, unmountChildren);
            }
          }
        }
      }
      if (patchFlag & 1) {
        if (n1.children !== n2.children) {
          hostSetElementText(el, n2.children);
        }
      }
    } else if (!optimized && dynamicChildren == null) {
      patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, isSVG);
    }
    if ((vnodeHook = newProps.onVnodeUpdated) || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
        dirs && invokeDirectiveHook(n2, n1, parentComponent, "updated");
      }, parentSuspense);
    }
  };
  const patchBlockChildren = (oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, isSVG, slotScopeIds) => {
    for (let i2 = 0; i2 < newChildren.length; i2++) {
      const oldVNode = oldChildren[i2];
      const newVNode = newChildren[i2];
      const container = oldVNode.el && (oldVNode.type === Fragment$1 || !isSameVNodeType(oldVNode, newVNode) || oldVNode.shapeFlag & (6 | 64)) ? hostParentNode(oldVNode.el) : fallbackContainer;
      patch(oldVNode, newVNode, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, true);
    }
  };
  const patchProps = (el, vnode, oldProps, newProps, parentComponent, parentSuspense, isSVG) => {
    if (oldProps !== newProps) {
      for (const key2 in newProps) {
        if (isReservedProp(key2))
          continue;
        const next = newProps[key2];
        const prev = oldProps[key2];
        if (next !== prev && key2 !== "value") {
          hostPatchProp(el, key2, prev, next, isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
        }
      }
      if (oldProps !== EMPTY_OBJ) {
        for (const key2 in oldProps) {
          if (!isReservedProp(key2) && !(key2 in newProps)) {
            hostPatchProp(el, key2, oldProps[key2], null, isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
          }
        }
      }
      if ("value" in newProps) {
        hostPatchProp(el, "value", oldProps.value, newProps.value);
      }
    }
  };
  const processFragment = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    const fragmentStartAnchor = n2.el = n1 ? n1.el : hostCreateText("");
    const fragmentEndAnchor = n2.anchor = n1 ? n1.anchor : hostCreateText("");
    let { patchFlag, dynamicChildren, slotScopeIds: fragmentSlotScopeIds } = n2;
    if (fragmentSlotScopeIds) {
      slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
    }
    if (n1 == null) {
      hostInsert(fragmentStartAnchor, container, anchor);
      hostInsert(fragmentEndAnchor, container, anchor);
      mountChildren(n2.children, container, fragmentEndAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    } else {
      if (patchFlag > 0 && patchFlag & 64 && dynamicChildren && n1.dynamicChildren) {
        patchBlockChildren(n1.dynamicChildren, dynamicChildren, container, parentComponent, parentSuspense, isSVG, slotScopeIds);
        if (n2.key != null || parentComponent && n2 === parentComponent.subTree) {
          traverseStaticChildren(n1, n2, true);
        }
      } else {
        patchChildren(n1, n2, container, fragmentEndAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      }
    }
  };
  const processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    n2.slotScopeIds = slotScopeIds;
    if (n1 == null) {
      if (n2.shapeFlag & 512) {
        parentComponent.ctx.activate(n2, container, anchor, isSVG, optimized);
      } else {
        mountComponent(n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized);
      }
    } else {
      updateComponent(n1, n2, optimized);
    }
  };
  const mountComponent = (initialVNode, container, anchor, parentComponent, parentSuspense, isSVG, optimized) => {
    const instance = initialVNode.component = createComponentInstance(initialVNode, parentComponent, parentSuspense);
    if (isKeepAlive(initialVNode)) {
      instance.ctx.renderer = internals;
    }
    {
      setupComponent(instance);
    }
    if (instance.asyncDep) {
      parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect);
      if (!initialVNode.el) {
        const placeholder = instance.subTree = createVNode(Comment);
        processCommentNode(null, placeholder, container, anchor);
      }
      return;
    }
    setupRenderEffect(instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized);
  };
  const updateComponent = (n1, n2, optimized) => {
    const instance = n2.component = n1.component;
    if (shouldUpdateComponent(n1, n2, optimized)) {
      if (instance.asyncDep && !instance.asyncResolved) {
        updateComponentPreRender(instance, n2, optimized);
        return;
      } else {
        instance.next = n2;
        invalidateJob(instance.update);
        instance.update();
      }
    } else {
      n2.component = n1.component;
      n2.el = n1.el;
      instance.vnode = n2;
    }
  };
  const setupRenderEffect = (instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized) => {
    const componentUpdateFn = () => {
      if (!instance.isMounted) {
        let vnodeHook;
        const { el, props } = initialVNode;
        const { bm, m, parent } = instance;
        const isAsyncWrapperVNode = isAsyncWrapper(initialVNode);
        toggleRecurse(instance, false);
        if (bm) {
          invokeArrayFns(bm);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeBeforeMount)) {
          invokeVNodeHook(vnodeHook, parent, initialVNode);
        }
        toggleRecurse(instance, true);
        if (el && hydrateNode) {
          const hydrateSubTree = () => {
            instance.subTree = renderComponentRoot(instance);
            hydrateNode(el, instance.subTree, instance, parentSuspense, null);
          };
          if (isAsyncWrapperVNode) {
            initialVNode.type.__asyncLoader().then(() => !instance.isUnmounted && hydrateSubTree());
          } else {
            hydrateSubTree();
          }
        } else {
          const subTree = instance.subTree = renderComponentRoot(instance);
          patch(null, subTree, container, anchor, instance, parentSuspense, isSVG);
          initialVNode.el = subTree.el;
        }
        if (m) {
          queuePostRenderEffect(m, parentSuspense);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeMounted)) {
          const scopedInitialVNode = initialVNode;
          queuePostRenderEffect(() => invokeVNodeHook(vnodeHook, parent, scopedInitialVNode), parentSuspense);
        }
        if (initialVNode.shapeFlag & 256) {
          instance.a && queuePostRenderEffect(instance.a, parentSuspense);
        }
        instance.isMounted = true;
        initialVNode = container = anchor = null;
      } else {
        let { next, bu, u, parent, vnode } = instance;
        let originNext = next;
        let vnodeHook;
        toggleRecurse(instance, false);
        if (next) {
          next.el = vnode.el;
          updateComponentPreRender(instance, next, optimized);
        } else {
          next = vnode;
        }
        if (bu) {
          invokeArrayFns(bu);
        }
        if (vnodeHook = next.props && next.props.onVnodeBeforeUpdate) {
          invokeVNodeHook(vnodeHook, parent, next, vnode);
        }
        toggleRecurse(instance, true);
        const nextTree = renderComponentRoot(instance);
        const prevTree = instance.subTree;
        instance.subTree = nextTree;
        patch(prevTree, nextTree, hostParentNode(prevTree.el), getNextHostNode(prevTree), instance, parentSuspense, isSVG);
        next.el = nextTree.el;
        if (originNext === null) {
          updateHOCHostEl(instance, nextTree.el);
        }
        if (u) {
          queuePostRenderEffect(u, parentSuspense);
        }
        if (vnodeHook = next.props && next.props.onVnodeUpdated) {
          queuePostRenderEffect(() => invokeVNodeHook(vnodeHook, parent, next, vnode), parentSuspense);
        }
      }
    };
    const effect3 = instance.effect = new ReactiveEffect(componentUpdateFn, () => queueJob(instance.update), instance.scope);
    const update4 = instance.update = effect3.run.bind(effect3);
    update4.id = instance.uid;
    toggleRecurse(instance, true);
    update4();
  };
  const updateComponentPreRender = (instance, nextVNode, optimized) => {
    nextVNode.component = instance;
    const prevProps = instance.vnode.props;
    instance.vnode = nextVNode;
    instance.next = null;
    updateProps(instance, nextVNode.props, prevProps, optimized);
    updateSlots(instance, nextVNode.children, optimized);
    pauseTracking();
    flushPreFlushCbs(void 0, instance.update);
    resetTracking();
  };
  const patchChildren = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized = false) => {
    const c1 = n1 && n1.children;
    const prevShapeFlag = n1 ? n1.shapeFlag : 0;
    const c2 = n2.children;
    const { patchFlag, shapeFlag } = n2;
    if (patchFlag > 0) {
      if (patchFlag & 128) {
        patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        return;
      } else if (patchFlag & 256) {
        patchUnkeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        return;
      }
    }
    if (shapeFlag & 8) {
      if (prevShapeFlag & 16) {
        unmountChildren(c1, parentComponent, parentSuspense);
      }
      if (c2 !== c1) {
        hostSetElementText(container, c2);
      }
    } else {
      if (prevShapeFlag & 16) {
        if (shapeFlag & 16) {
          patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else {
          unmountChildren(c1, parentComponent, parentSuspense, true);
        }
      } else {
        if (prevShapeFlag & 8) {
          hostSetElementText(container, "");
        }
        if (shapeFlag & 16) {
          mountChildren(c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        }
      }
    }
  };
  const patchUnkeyedChildren = (c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    c1 = c1 || EMPTY_ARR;
    c2 = c2 || EMPTY_ARR;
    const oldLength = c1.length;
    const newLength = c2.length;
    const commonLength = Math.min(oldLength, newLength);
    let i2;
    for (i2 = 0; i2 < commonLength; i2++) {
      const nextChild = c2[i2] = optimized ? cloneIfMounted(c2[i2]) : normalizeVNode(c2[i2]);
      patch(c1[i2], nextChild, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    }
    if (oldLength > newLength) {
      unmountChildren(c1, parentComponent, parentSuspense, true, false, commonLength);
    } else {
      mountChildren(c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, commonLength);
    }
  };
  const patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    let i2 = 0;
    const l2 = c2.length;
    let e1 = c1.length - 1;
    let e2 = l2 - 1;
    while (i2 <= e1 && i2 <= e2) {
      const n1 = c1[i2];
      const n2 = c2[i2] = optimized ? cloneIfMounted(c2[i2]) : normalizeVNode(c2[i2]);
      if (isSameVNodeType(n1, n2)) {
        patch(n1, n2, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      } else {
        break;
      }
      i2++;
    }
    while (i2 <= e1 && i2 <= e2) {
      const n1 = c1[e1];
      const n2 = c2[e2] = optimized ? cloneIfMounted(c2[e2]) : normalizeVNode(c2[e2]);
      if (isSameVNodeType(n1, n2)) {
        patch(n1, n2, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      } else {
        break;
      }
      e1--;
      e2--;
    }
    if (i2 > e1) {
      if (i2 <= e2) {
        const nextPos = e2 + 1;
        const anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;
        while (i2 <= e2) {
          patch(null, c2[i2] = optimized ? cloneIfMounted(c2[i2]) : normalizeVNode(c2[i2]), container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          i2++;
        }
      }
    } else if (i2 > e2) {
      while (i2 <= e1) {
        unmount(c1[i2], parentComponent, parentSuspense, true);
        i2++;
      }
    } else {
      const s1 = i2;
      const s2 = i2;
      const keyToNewIndexMap = /* @__PURE__ */ new Map();
      for (i2 = s2; i2 <= e2; i2++) {
        const nextChild = c2[i2] = optimized ? cloneIfMounted(c2[i2]) : normalizeVNode(c2[i2]);
        if (nextChild.key != null) {
          keyToNewIndexMap.set(nextChild.key, i2);
        }
      }
      let j;
      let patched = 0;
      const toBePatched = e2 - s2 + 1;
      let moved = false;
      let maxNewIndexSoFar = 0;
      const newIndexToOldIndexMap = new Array(toBePatched);
      for (i2 = 0; i2 < toBePatched; i2++)
        newIndexToOldIndexMap[i2] = 0;
      for (i2 = s1; i2 <= e1; i2++) {
        const prevChild = c1[i2];
        if (patched >= toBePatched) {
          unmount(prevChild, parentComponent, parentSuspense, true);
          continue;
        }
        let newIndex;
        if (prevChild.key != null) {
          newIndex = keyToNewIndexMap.get(prevChild.key);
        } else {
          for (j = s2; j <= e2; j++) {
            if (newIndexToOldIndexMap[j - s2] === 0 && isSameVNodeType(prevChild, c2[j])) {
              newIndex = j;
              break;
            }
          }
        }
        if (newIndex === void 0) {
          unmount(prevChild, parentComponent, parentSuspense, true);
        } else {
          newIndexToOldIndexMap[newIndex - s2] = i2 + 1;
          if (newIndex >= maxNewIndexSoFar) {
            maxNewIndexSoFar = newIndex;
          } else {
            moved = true;
          }
          patch(prevChild, c2[newIndex], container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          patched++;
        }
      }
      const increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : EMPTY_ARR;
      j = increasingNewIndexSequence.length - 1;
      for (i2 = toBePatched - 1; i2 >= 0; i2--) {
        const nextIndex = s2 + i2;
        const nextChild = c2[nextIndex];
        const anchor = nextIndex + 1 < l2 ? c2[nextIndex + 1].el : parentAnchor;
        if (newIndexToOldIndexMap[i2] === 0) {
          patch(null, nextChild, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else if (moved) {
          if (j < 0 || i2 !== increasingNewIndexSequence[j]) {
            move2(nextChild, container, anchor, 2);
          } else {
            j--;
          }
        }
      }
    }
  };
  const move2 = (vnode, container, anchor, moveType, parentSuspense = null) => {
    const { el, type, transition, children, shapeFlag } = vnode;
    if (shapeFlag & 6) {
      move2(vnode.component.subTree, container, anchor, moveType);
      return;
    }
    if (shapeFlag & 128) {
      vnode.suspense.move(container, anchor, moveType);
      return;
    }
    if (shapeFlag & 64) {
      type.move(vnode, container, anchor, internals);
      return;
    }
    if (type === Fragment$1) {
      hostInsert(el, container, anchor);
      for (let i2 = 0; i2 < children.length; i2++) {
        move2(children[i2], container, anchor, moveType);
      }
      hostInsert(vnode.anchor, container, anchor);
      return;
    }
    if (type === Static) {
      moveStaticNode(vnode, container, anchor);
      return;
    }
    const needTransition = moveType !== 2 && shapeFlag & 1 && transition;
    if (needTransition) {
      if (moveType === 0) {
        transition.beforeEnter(el);
        hostInsert(el, container, anchor);
        queuePostRenderEffect(() => transition.enter(el), parentSuspense);
      } else {
        const { leave, delayLeave, afterLeave } = transition;
        const remove4 = () => hostInsert(el, container, anchor);
        const performLeave = () => {
          leave(el, () => {
            remove4();
            afterLeave && afterLeave();
          });
        };
        if (delayLeave) {
          delayLeave(el, remove4, performLeave);
        } else {
          performLeave();
        }
      }
    } else {
      hostInsert(el, container, anchor);
    }
  };
  const unmount = (vnode, parentComponent, parentSuspense, doRemove = false, optimized = false) => {
    const { type, props, ref: ref2, children, dynamicChildren, shapeFlag, patchFlag, dirs } = vnode;
    if (ref2 != null) {
      setRef(ref2, null, parentSuspense, vnode, true);
    }
    if (shapeFlag & 256) {
      parentComponent.ctx.deactivate(vnode);
      return;
    }
    const shouldInvokeDirs = shapeFlag & 1 && dirs;
    const shouldInvokeVnodeHook = !isAsyncWrapper(vnode);
    let vnodeHook;
    if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeBeforeUnmount)) {
      invokeVNodeHook(vnodeHook, parentComponent, vnode);
    }
    if (shapeFlag & 6) {
      unmountComponent(vnode.component, parentSuspense, doRemove);
    } else {
      if (shapeFlag & 128) {
        vnode.suspense.unmount(parentSuspense, doRemove);
        return;
      }
      if (shouldInvokeDirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "beforeUnmount");
      }
      if (shapeFlag & 64) {
        vnode.type.remove(vnode, parentComponent, parentSuspense, optimized, internals, doRemove);
      } else if (dynamicChildren && (type !== Fragment$1 || patchFlag > 0 && patchFlag & 64)) {
        unmountChildren(dynamicChildren, parentComponent, parentSuspense, false, true);
      } else if (type === Fragment$1 && patchFlag & (128 | 256) || !optimized && shapeFlag & 16) {
        unmountChildren(children, parentComponent, parentSuspense);
      }
      if (doRemove) {
        remove3(vnode);
      }
    }
    if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeUnmounted) || shouldInvokeDirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        shouldInvokeDirs && invokeDirectiveHook(vnode, null, parentComponent, "unmounted");
      }, parentSuspense);
    }
  };
  const remove3 = (vnode) => {
    const { type, el, anchor, transition } = vnode;
    if (type === Fragment$1) {
      {
        removeFragment(el, anchor);
      }
      return;
    }
    if (type === Static) {
      removeStaticNode(vnode);
      return;
    }
    const performRemove = () => {
      hostRemove(el);
      if (transition && !transition.persisted && transition.afterLeave) {
        transition.afterLeave();
      }
    };
    if (vnode.shapeFlag & 1 && transition && !transition.persisted) {
      const { leave, delayLeave } = transition;
      const performLeave = () => leave(el, performRemove);
      if (delayLeave) {
        delayLeave(vnode.el, performRemove, performLeave);
      } else {
        performLeave();
      }
    } else {
      performRemove();
    }
  };
  const removeFragment = (cur, end3) => {
    let next;
    while (cur !== end3) {
      next = hostNextSibling(cur);
      hostRemove(cur);
      cur = next;
    }
    hostRemove(end3);
  };
  const unmountComponent = (instance, parentSuspense, doRemove) => {
    const { bum, scope, update: update4, subTree, um } = instance;
    if (bum) {
      invokeArrayFns(bum);
    }
    scope.stop();
    if (update4) {
      update4.active = false;
      unmount(subTree, instance, parentSuspense, doRemove);
    }
    if (um) {
      queuePostRenderEffect(um, parentSuspense);
    }
    queuePostRenderEffect(() => {
      instance.isUnmounted = true;
    }, parentSuspense);
    if (parentSuspense && parentSuspense.pendingBranch && !parentSuspense.isUnmounted && instance.asyncDep && !instance.asyncResolved && instance.suspenseId === parentSuspense.pendingId) {
      parentSuspense.deps--;
      if (parentSuspense.deps === 0) {
        parentSuspense.resolve();
      }
    }
  };
  const unmountChildren = (children, parentComponent, parentSuspense, doRemove = false, optimized = false, start4 = 0) => {
    for (let i2 = start4; i2 < children.length; i2++) {
      unmount(children[i2], parentComponent, parentSuspense, doRemove, optimized);
    }
  };
  const getNextHostNode = (vnode) => {
    if (vnode.shapeFlag & 6) {
      return getNextHostNode(vnode.component.subTree);
    }
    if (vnode.shapeFlag & 128) {
      return vnode.suspense.next();
    }
    return hostNextSibling(vnode.anchor || vnode.el);
  };
  const render2 = (vnode, container, isSVG) => {
    if (vnode == null) {
      if (container._vnode) {
        unmount(container._vnode, null, null, true);
      }
    } else {
      patch(container._vnode || null, vnode, container, null, null, null, isSVG);
    }
    flushPostFlushCbs();
    container._vnode = vnode;
  };
  const internals = {
    p: patch,
    um: unmount,
    m: move2,
    r: remove3,
    mt: mountComponent,
    mc: mountChildren,
    pc: patchChildren,
    pbc: patchBlockChildren,
    n: getNextHostNode,
    o: options
  };
  let hydrate;
  let hydrateNode;
  if (createHydrationFns) {
    [hydrate, hydrateNode] = createHydrationFns(internals);
  }
  return {
    render: render2,
    hydrate,
    createApp: createAppAPI(render2, hydrate)
  };
}
function toggleRecurse({ effect: effect3, update: update4 }, allowed) {
  effect3.allowRecurse = update4.allowRecurse = allowed;
}
function traverseStaticChildren(n1, n2, shallow = false) {
  const ch1 = n1.children;
  const ch2 = n2.children;
  if (isArray(ch1) && isArray(ch2)) {
    for (let i2 = 0; i2 < ch1.length; i2++) {
      const c1 = ch1[i2];
      let c2 = ch2[i2];
      if (c2.shapeFlag & 1 && !c2.dynamicChildren) {
        if (c2.patchFlag <= 0 || c2.patchFlag === 32) {
          c2 = ch2[i2] = cloneIfMounted(ch2[i2]);
          c2.el = c1.el;
        }
        if (!shallow)
          traverseStaticChildren(c1, c2);
      }
    }
  }
}
function getSequence(arr) {
  const p2 = arr.slice();
  const result2 = [0];
  let i2, j, u, v, c;
  const len = arr.length;
  for (i2 = 0; i2 < len; i2++) {
    const arrI = arr[i2];
    if (arrI !== 0) {
      j = result2[result2.length - 1];
      if (arr[j] < arrI) {
        p2[i2] = j;
        result2.push(i2);
        continue;
      }
      u = 0;
      v = result2.length - 1;
      while (u < v) {
        c = u + v >> 1;
        if (arr[result2[c]] < arrI) {
          u = c + 1;
        } else {
          v = c;
        }
      }
      if (arrI < arr[result2[u]]) {
        if (u > 0) {
          p2[i2] = result2[u - 1];
        }
        result2[u] = i2;
      }
    }
  }
  u = result2.length;
  v = result2[u - 1];
  while (u-- > 0) {
    result2[u] = v;
    v = p2[v];
  }
  return result2;
}
const isTeleport = (type) => type.__isTeleport;
const isTeleportDisabled = (props) => props && (props.disabled || props.disabled === "");
const isTargetSVG = (target) => typeof SVGElement !== "undefined" && target instanceof SVGElement;
const resolveTarget = (props, select) => {
  const targetSelector = props && props.to;
  if (isString(targetSelector)) {
    if (!select) {
      return null;
    } else {
      const target = select(targetSelector);
      return target;
    }
  } else {
    return targetSelector;
  }
};
const TeleportImpl = {
  __isTeleport: true,
  process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals) {
    const { mc: mountChildren, pc: patchChildren, pbc: patchBlockChildren, o: { insert, querySelector, createText, createComment } } = internals;
    const disabled = isTeleportDisabled(n2.props);
    let { shapeFlag, children, dynamicChildren } = n2;
    if (n1 == null) {
      const placeholder = n2.el = createText("");
      const mainAnchor = n2.anchor = createText("");
      insert(placeholder, container, anchor);
      insert(mainAnchor, container, anchor);
      const target = n2.target = resolveTarget(n2.props, querySelector);
      const targetAnchor = n2.targetAnchor = createText("");
      if (target) {
        insert(targetAnchor, target);
        isSVG = isSVG || isTargetSVG(target);
      }
      const mount = (container2, anchor2) => {
        if (shapeFlag & 16) {
          mountChildren(children, container2, anchor2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        }
      };
      if (disabled) {
        mount(container, mainAnchor);
      } else if (target) {
        mount(target, targetAnchor);
      }
    } else {
      n2.el = n1.el;
      const mainAnchor = n2.anchor = n1.anchor;
      const target = n2.target = n1.target;
      const targetAnchor = n2.targetAnchor = n1.targetAnchor;
      const wasDisabled = isTeleportDisabled(n1.props);
      const currentContainer = wasDisabled ? container : target;
      const currentAnchor = wasDisabled ? mainAnchor : targetAnchor;
      isSVG = isSVG || isTargetSVG(target);
      if (dynamicChildren) {
        patchBlockChildren(n1.dynamicChildren, dynamicChildren, currentContainer, parentComponent, parentSuspense, isSVG, slotScopeIds);
        traverseStaticChildren(n1, n2, true);
      } else if (!optimized) {
        patchChildren(n1, n2, currentContainer, currentAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, false);
      }
      if (disabled) {
        if (!wasDisabled) {
          moveTeleport(n2, container, mainAnchor, internals, 1);
        }
      } else {
        if ((n2.props && n2.props.to) !== (n1.props && n1.props.to)) {
          const nextTarget = n2.target = resolveTarget(n2.props, querySelector);
          if (nextTarget) {
            moveTeleport(n2, nextTarget, null, internals, 0);
          }
        } else if (wasDisabled) {
          moveTeleport(n2, target, targetAnchor, internals, 1);
        }
      }
    }
  },
  remove(vnode, parentComponent, parentSuspense, optimized, { um: unmount, o: { remove: hostRemove } }, doRemove) {
    const { shapeFlag, children, anchor, targetAnchor, target, props } = vnode;
    if (target) {
      hostRemove(targetAnchor);
    }
    if (doRemove || !isTeleportDisabled(props)) {
      hostRemove(anchor);
      if (shapeFlag & 16) {
        for (let i2 = 0; i2 < children.length; i2++) {
          const child3 = children[i2];
          unmount(child3, parentComponent, parentSuspense, true, !!child3.dynamicChildren);
        }
      }
    }
  },
  move: moveTeleport,
  hydrate: hydrateTeleport
};
function moveTeleport(vnode, container, parentAnchor, { o: { insert }, m: move2 }, moveType = 2) {
  if (moveType === 0) {
    insert(vnode.targetAnchor, container, parentAnchor);
  }
  const { el, anchor, shapeFlag, children, props } = vnode;
  const isReorder = moveType === 2;
  if (isReorder) {
    insert(el, container, parentAnchor);
  }
  if (!isReorder || isTeleportDisabled(props)) {
    if (shapeFlag & 16) {
      for (let i2 = 0; i2 < children.length; i2++) {
        move2(children[i2], container, parentAnchor, 2);
      }
    }
  }
  if (isReorder) {
    insert(anchor, container, parentAnchor);
  }
}
function hydrateTeleport(node4, vnode, parentComponent, parentSuspense, slotScopeIds, optimized, { o: { nextSibling, parentNode: parentNode2, querySelector } }, hydrateChildren) {
  const target = vnode.target = resolveTarget(vnode.props, querySelector);
  if (target) {
    const targetNode = target._lpa || target.firstChild;
    if (vnode.shapeFlag & 16) {
      if (isTeleportDisabled(vnode.props)) {
        vnode.anchor = hydrateChildren(nextSibling(node4), vnode, parentNode2(node4), parentComponent, parentSuspense, slotScopeIds, optimized);
        vnode.targetAnchor = targetNode;
      } else {
        vnode.anchor = nextSibling(node4);
        vnode.targetAnchor = hydrateChildren(targetNode, vnode, target, parentComponent, parentSuspense, slotScopeIds, optimized);
      }
      target._lpa = vnode.targetAnchor && nextSibling(vnode.targetAnchor);
    }
  }
  return vnode.anchor && nextSibling(vnode.anchor);
}
const Teleport = TeleportImpl;
const COMPONENTS = "components";
function resolveComponent(name, maybeSelfReference) {
  return resolveAsset(COMPONENTS, name, true, maybeSelfReference) || name;
}
const NULL_DYNAMIC_COMPONENT = Symbol();
function resolveAsset(type, name, warnMissing = true, maybeSelfReference = false) {
  const instance = currentRenderingInstance || currentInstance;
  if (instance) {
    const Component = instance.type;
    if (type === COMPONENTS) {
      const selfName = getComponentName(Component);
      if (selfName && (selfName === name || selfName === camelize(name) || selfName === capitalize(camelize(name)))) {
        return Component;
      }
    }
    const res = resolve(instance[type] || Component[type], name) || resolve(instance.appContext[type], name);
    if (!res && maybeSelfReference) {
      return Component;
    }
    return res;
  }
}
function resolve(registry, name) {
  return registry && (registry[name] || registry[camelize(name)] || registry[capitalize(camelize(name))]);
}
const Fragment$1 = Symbol(void 0);
const Text$1 = Symbol(void 0);
const Comment = Symbol(void 0);
const Static = Symbol(void 0);
const blockStack = [];
let currentBlock = null;
function openBlock(disableTracking = false) {
  blockStack.push(currentBlock = disableTracking ? null : []);
}
function closeBlock() {
  blockStack.pop();
  currentBlock = blockStack[blockStack.length - 1] || null;
}
let isBlockTreeEnabled = 1;
function setBlockTracking(value) {
  isBlockTreeEnabled += value;
}
function setupBlock(vnode) {
  vnode.dynamicChildren = isBlockTreeEnabled > 0 ? currentBlock || EMPTY_ARR : null;
  closeBlock();
  if (isBlockTreeEnabled > 0 && currentBlock) {
    currentBlock.push(vnode);
  }
  return vnode;
}
function createElementBlock(type, props, children, patchFlag, dynamicProps, shapeFlag) {
  return setupBlock(createBaseVNode(type, props, children, patchFlag, dynamicProps, shapeFlag, true));
}
function createBlock(type, props, children, patchFlag, dynamicProps) {
  return setupBlock(createVNode(type, props, children, patchFlag, dynamicProps, true));
}
function isVNode(value) {
  return value ? value.__v_isVNode === true : false;
}
function isSameVNodeType(n1, n2) {
  return n1.type === n2.type && n1.key === n2.key;
}
const InternalObjectKey = `__vInternal`;
const normalizeKey = ({ key: key2 }) => key2 != null ? key2 : null;
const normalizeRef = ({ ref: ref2, ref_key, ref_for }) => {
  return ref2 != null ? isString(ref2) || isRef(ref2) || isFunction$1(ref2) ? { i: currentRenderingInstance, r: ref2, k: ref_key, f: !!ref_for } : ref2 : null;
};
function createBaseVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, shapeFlag = type === Fragment$1 ? 0 : 1, isBlockNode2 = false, needFullChildrenNormalization = false) {
  const vnode = {
    __v_isVNode: true,
    __v_skip: true,
    type,
    props,
    key: props && normalizeKey(props),
    ref: props && normalizeRef(props),
    scopeId: currentScopeId,
    slotScopeIds: null,
    children,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag,
    patchFlag,
    dynamicProps,
    dynamicChildren: null,
    appContext: null
  };
  if (needFullChildrenNormalization) {
    normalizeChildren(vnode, children);
    if (shapeFlag & 128) {
      type.normalize(vnode);
    }
  } else if (children) {
    vnode.shapeFlag |= isString(children) ? 8 : 16;
  }
  if (isBlockTreeEnabled > 0 && !isBlockNode2 && currentBlock && (vnode.patchFlag > 0 || shapeFlag & 6) && vnode.patchFlag !== 32) {
    currentBlock.push(vnode);
  }
  return vnode;
}
const createVNode = _createVNode;
function _createVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode2 = false) {
  if (!type || type === NULL_DYNAMIC_COMPONENT) {
    type = Comment;
  }
  if (isVNode(type)) {
    const cloned = cloneVNode(type, props, true);
    if (children) {
      normalizeChildren(cloned, children);
    }
    return cloned;
  }
  if (isClassComponent(type)) {
    type = type.__vccOpts;
  }
  if (props) {
    props = guardReactiveProps(props);
    let { class: klass, style: style2 } = props;
    if (klass && !isString(klass)) {
      props.class = normalizeClass(klass);
    }
    if (isObject$1(style2)) {
      if (isProxy(style2) && !isArray(style2)) {
        style2 = extend({}, style2);
      }
      props.style = normalizeStyle(style2);
    }
  }
  const shapeFlag = isString(type) ? 1 : isSuspense(type) ? 128 : isTeleport(type) ? 64 : isObject$1(type) ? 4 : isFunction$1(type) ? 2 : 0;
  return createBaseVNode(type, props, children, patchFlag, dynamicProps, shapeFlag, isBlockNode2, true);
}
function guardReactiveProps(props) {
  if (!props)
    return null;
  return isProxy(props) || InternalObjectKey in props ? extend({}, props) : props;
}
function cloneVNode(vnode, extraProps, mergeRef = false) {
  const { props, ref: ref2, patchFlag, children } = vnode;
  const mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props;
  const cloned = {
    __v_isVNode: true,
    __v_skip: true,
    type: vnode.type,
    props: mergedProps,
    key: mergedProps && normalizeKey(mergedProps),
    ref: extraProps && extraProps.ref ? mergeRef && ref2 ? isArray(ref2) ? ref2.concat(normalizeRef(extraProps)) : [ref2, normalizeRef(extraProps)] : normalizeRef(extraProps) : ref2,
    scopeId: vnode.scopeId,
    slotScopeIds: vnode.slotScopeIds,
    children,
    target: vnode.target,
    targetAnchor: vnode.targetAnchor,
    staticCount: vnode.staticCount,
    shapeFlag: vnode.shapeFlag,
    patchFlag: extraProps && vnode.type !== Fragment$1 ? patchFlag === -1 ? 16 : patchFlag | 16 : patchFlag,
    dynamicProps: vnode.dynamicProps,
    dynamicChildren: vnode.dynamicChildren,
    appContext: vnode.appContext,
    dirs: vnode.dirs,
    transition: vnode.transition,
    component: vnode.component,
    suspense: vnode.suspense,
    ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
    ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
    el: vnode.el,
    anchor: vnode.anchor
  };
  return cloned;
}
function createTextVNode(text2 = " ", flag = 0) {
  return createVNode(Text$1, null, text2, flag);
}
function createCommentVNode(text2 = "", asBlock = false) {
  return asBlock ? (openBlock(), createBlock(Comment, null, text2)) : createVNode(Comment, null, text2);
}
function normalizeVNode(child3) {
  if (child3 == null || typeof child3 === "boolean") {
    return createVNode(Comment);
  } else if (isArray(child3)) {
    return createVNode(Fragment$1, null, child3.slice());
  } else if (typeof child3 === "object") {
    return cloneIfMounted(child3);
  } else {
    return createVNode(Text$1, null, String(child3));
  }
}
function cloneIfMounted(child3) {
  return child3.el === null || child3.memo ? child3 : cloneVNode(child3);
}
function normalizeChildren(vnode, children) {
  let type = 0;
  const { shapeFlag } = vnode;
  if (children == null) {
    children = null;
  } else if (isArray(children)) {
    type = 16;
  } else if (typeof children === "object") {
    if (shapeFlag & (1 | 64)) {
      const slot = children.default;
      if (slot) {
        slot._c && (slot._d = false);
        normalizeChildren(vnode, slot());
        slot._c && (slot._d = true);
      }
      return;
    } else {
      type = 32;
      const slotFlag = children._;
      if (!slotFlag && !(InternalObjectKey in children)) {
        children._ctx = currentRenderingInstance;
      } else if (slotFlag === 3 && currentRenderingInstance) {
        if (currentRenderingInstance.slots._ === 1) {
          children._ = 1;
        } else {
          children._ = 2;
          vnode.patchFlag |= 1024;
        }
      }
    }
  } else if (isFunction$1(children)) {
    children = { default: children, _ctx: currentRenderingInstance };
    type = 32;
  } else {
    children = String(children);
    if (shapeFlag & 64) {
      type = 16;
      children = [createTextVNode(children)];
    } else {
      type = 8;
    }
  }
  vnode.children = children;
  vnode.shapeFlag |= type;
}
function mergeProps(...args) {
  const ret = {};
  for (let i2 = 0; i2 < args.length; i2++) {
    const toMerge = args[i2];
    for (const key2 in toMerge) {
      if (key2 === "class") {
        if (ret.class !== toMerge.class) {
          ret.class = normalizeClass([ret.class, toMerge.class]);
        }
      } else if (key2 === "style") {
        ret.style = normalizeStyle([ret.style, toMerge.style]);
      } else if (isOn(key2)) {
        const existing = ret[key2];
        const incoming = toMerge[key2];
        if (incoming && existing !== incoming && !(isArray(existing) && existing.includes(incoming))) {
          ret[key2] = existing ? [].concat(existing, incoming) : incoming;
        }
      } else if (key2 !== "") {
        ret[key2] = toMerge[key2];
      }
    }
  }
  return ret;
}
function invokeVNodeHook(hook, instance, vnode, prevVNode = null) {
  callWithAsyncErrorHandling(hook, instance, 7, [
    vnode,
    prevVNode
  ]);
}
const getPublicInstance = (i2) => {
  if (!i2)
    return null;
  if (isStatefulComponent(i2))
    return getExposeProxy(i2) || i2.proxy;
  return getPublicInstance(i2.parent);
};
const publicPropertiesMap = /* @__PURE__ */ extend(/* @__PURE__ */ Object.create(null), {
  $: (i2) => i2,
  $el: (i2) => i2.vnode.el,
  $data: (i2) => i2.data,
  $props: (i2) => i2.props,
  $attrs: (i2) => i2.attrs,
  $slots: (i2) => i2.slots,
  $refs: (i2) => i2.refs,
  $parent: (i2) => getPublicInstance(i2.parent),
  $root: (i2) => getPublicInstance(i2.root),
  $emit: (i2) => i2.emit,
  $options: (i2) => resolveMergedOptions(i2),
  $forceUpdate: (i2) => () => queueJob(i2.update),
  $nextTick: (i2) => nextTick.bind(i2.proxy),
  $watch: (i2) => instanceWatch.bind(i2)
});
const PublicInstanceProxyHandlers = {
  get({ _: instance }, key2) {
    const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
    let normalizedProps;
    if (key2[0] !== "$") {
      const n = accessCache[key2];
      if (n !== void 0) {
        switch (n) {
          case 1:
            return setupState[key2];
          case 2:
            return data[key2];
          case 4:
            return ctx[key2];
          case 3:
            return props[key2];
        }
      } else if (setupState !== EMPTY_OBJ && hasOwn(setupState, key2)) {
        accessCache[key2] = 1;
        return setupState[key2];
      } else if (data !== EMPTY_OBJ && hasOwn(data, key2)) {
        accessCache[key2] = 2;
        return data[key2];
      } else if ((normalizedProps = instance.propsOptions[0]) && hasOwn(normalizedProps, key2)) {
        accessCache[key2] = 3;
        return props[key2];
      } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key2)) {
        accessCache[key2] = 4;
        return ctx[key2];
      } else if (shouldCacheAccess) {
        accessCache[key2] = 0;
      }
    }
    const publicGetter = publicPropertiesMap[key2];
    let cssModule, globalProperties;
    if (publicGetter) {
      if (key2 === "$attrs") {
        track(instance, "get", key2);
      }
      return publicGetter(instance);
    } else if ((cssModule = type.__cssModules) && (cssModule = cssModule[key2])) {
      return cssModule;
    } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key2)) {
      accessCache[key2] = 4;
      return ctx[key2];
    } else if (globalProperties = appContext.config.globalProperties, hasOwn(globalProperties, key2)) {
      {
        return globalProperties[key2];
      }
    } else
      ;
  },
  set({ _: instance }, key2, value) {
    const { data, setupState, ctx } = instance;
    if (setupState !== EMPTY_OBJ && hasOwn(setupState, key2)) {
      setupState[key2] = value;
      return true;
    } else if (data !== EMPTY_OBJ && hasOwn(data, key2)) {
      data[key2] = value;
      return true;
    } else if (hasOwn(instance.props, key2)) {
      return false;
    }
    if (key2[0] === "$" && key2.slice(1) in instance) {
      return false;
    } else {
      {
        ctx[key2] = value;
      }
    }
    return true;
  },
  has({ _: { data, setupState, accessCache, ctx, appContext, propsOptions } }, key2) {
    let normalizedProps;
    return !!accessCache[key2] || data !== EMPTY_OBJ && hasOwn(data, key2) || setupState !== EMPTY_OBJ && hasOwn(setupState, key2) || (normalizedProps = propsOptions[0]) && hasOwn(normalizedProps, key2) || hasOwn(ctx, key2) || hasOwn(publicPropertiesMap, key2) || hasOwn(appContext.config.globalProperties, key2);
  },
  defineProperty(target, key2, descriptor) {
    if (descriptor.get != null) {
      target._.accessCache[key2] = 0;
    } else if (hasOwn(descriptor, "value")) {
      this.set(target, key2, descriptor.value, null);
    }
    return Reflect.defineProperty(target, key2, descriptor);
  }
};
const emptyAppContext = createAppContext();
let uid$1 = 0;
function createComponentInstance(vnode, parent, suspense) {
  const type = vnode.type;
  const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
  const instance = {
    uid: uid$1++,
    vnode,
    type,
    parent,
    appContext,
    root: null,
    next: null,
    subTree: null,
    effect: null,
    update: null,
    scope: new EffectScope(true),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: parent ? parent.provides : Object.create(appContext.provides),
    accessCache: null,
    renderCache: [],
    components: null,
    directives: null,
    propsOptions: normalizePropsOptions(type, appContext),
    emitsOptions: normalizeEmitsOptions(type, appContext),
    emit: null,
    emitted: null,
    propsDefaults: EMPTY_OBJ,
    inheritAttrs: type.inheritAttrs,
    ctx: EMPTY_OBJ,
    data: EMPTY_OBJ,
    props: EMPTY_OBJ,
    attrs: EMPTY_OBJ,
    slots: EMPTY_OBJ,
    refs: EMPTY_OBJ,
    setupState: EMPTY_OBJ,
    setupContext: null,
    suspense,
    suspenseId: suspense ? suspense.pendingId : 0,
    asyncDep: null,
    asyncResolved: false,
    isMounted: false,
    isUnmounted: false,
    isDeactivated: false,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  {
    instance.ctx = { _: instance };
  }
  instance.root = parent ? parent.root : instance;
  instance.emit = emit$1.bind(null, instance);
  if (vnode.ce) {
    vnode.ce(instance);
  }
  return instance;
}
let currentInstance = null;
const getCurrentInstance = () => currentInstance || currentRenderingInstance;
const setCurrentInstance = (instance) => {
  currentInstance = instance;
  instance.scope.on();
};
const unsetCurrentInstance = () => {
  currentInstance && currentInstance.scope.off();
  currentInstance = null;
};
function isStatefulComponent(instance) {
  return instance.vnode.shapeFlag & 4;
}
let isInSSRComponentSetup = false;
function setupComponent(instance, isSSR = false) {
  isInSSRComponentSetup = isSSR;
  const { props, children } = instance.vnode;
  const isStateful = isStatefulComponent(instance);
  initProps(instance, props, isStateful, isSSR);
  initSlots(instance, children);
  const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
  isInSSRComponentSetup = false;
  return setupResult;
}
function setupStatefulComponent(instance, isSSR) {
  const Component = instance.type;
  instance.accessCache = /* @__PURE__ */ Object.create(null);
  instance.proxy = markRaw(new Proxy(instance.ctx, PublicInstanceProxyHandlers));
  const { setup } = Component;
  if (setup) {
    const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
    setCurrentInstance(instance);
    pauseTracking();
    const setupResult = callWithErrorHandling(setup, instance, 0, [instance.props, setupContext]);
    resetTracking();
    unsetCurrentInstance();
    if (isPromise(setupResult)) {
      setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
      if (isSSR) {
        return setupResult.then((resolvedResult) => {
          handleSetupResult(instance, resolvedResult, isSSR);
        }).catch((e) => {
          handleError(e, instance, 0);
        });
      } else {
        instance.asyncDep = setupResult;
      }
    } else {
      handleSetupResult(instance, setupResult, isSSR);
    }
  } else {
    finishComponentSetup(instance, isSSR);
  }
}
function handleSetupResult(instance, setupResult, isSSR) {
  if (isFunction$1(setupResult)) {
    if (instance.type.__ssrInlineRender) {
      instance.ssrRender = setupResult;
    } else {
      instance.render = setupResult;
    }
  } else if (isObject$1(setupResult)) {
    instance.setupState = proxyRefs(setupResult);
  } else
    ;
  finishComponentSetup(instance, isSSR);
}
let compile;
function finishComponentSetup(instance, isSSR, skipOptions) {
  const Component = instance.type;
  if (!instance.render) {
    if (!isSSR && compile && !Component.render) {
      const template = Component.template;
      if (template) {
        const { isCustomElement, compilerOptions } = instance.appContext.config;
        const { delimiters, compilerOptions: componentCompilerOptions } = Component;
        const finalCompilerOptions = extend(extend({
          isCustomElement,
          delimiters
        }, compilerOptions), componentCompilerOptions);
        Component.render = compile(template, finalCompilerOptions);
      }
    }
    instance.render = Component.render || NOOP;
  }
  {
    setCurrentInstance(instance);
    pauseTracking();
    applyOptions(instance);
    resetTracking();
    unsetCurrentInstance();
  }
}
function createAttrsProxy(instance) {
  return new Proxy(instance.attrs, {
    get(target, key2) {
      track(instance, "get", "$attrs");
      return target[key2];
    }
  });
}
function createSetupContext(instance) {
  const expose = (exposed) => {
    instance.exposed = exposed || {};
  };
  let attrs;
  {
    return {
      get attrs() {
        return attrs || (attrs = createAttrsProxy(instance));
      },
      slots: instance.slots,
      emit: instance.emit,
      expose
    };
  }
}
function getExposeProxy(instance) {
  if (instance.exposed) {
    return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
      get(target, key2) {
        if (key2 in target) {
          return target[key2];
        } else if (key2 in publicPropertiesMap) {
          return publicPropertiesMap[key2](instance);
        }
      }
    }));
  }
}
function getComponentName(Component) {
  return isFunction$1(Component) ? Component.displayName || Component.name : Component.name;
}
function isClassComponent(value) {
  return isFunction$1(value) && "__vccOpts" in value;
}
const computed = (getterOrOptions, debugOptions) => {
  return computed$1(getterOrOptions, debugOptions, isInSSRComponentSetup);
};
function h(type, propsOrChildren, children) {
  const l = arguments.length;
  if (l === 2) {
    if (isObject$1(propsOrChildren) && !isArray(propsOrChildren)) {
      if (isVNode(propsOrChildren)) {
        return createVNode(type, null, [propsOrChildren]);
      }
      return createVNode(type, propsOrChildren);
    } else {
      return createVNode(type, null, propsOrChildren);
    }
  } else {
    if (l > 3) {
      children = Array.prototype.slice.call(arguments, 2);
    } else if (l === 3 && isVNode(children)) {
      children = [children];
    }
    return createVNode(type, propsOrChildren, children);
  }
}
const version = "3.2.33";
const svgNS = "http://www.w3.org/2000/svg";
const doc$1 = typeof document !== "undefined" ? document : null;
const templateContainer = doc$1 && /* @__PURE__ */ doc$1.createElement("template");
const nodeOps = {
  insert: (child3, parent, anchor) => {
    parent.insertBefore(child3, anchor || null);
  },
  remove: (child3) => {
    const parent = child3.parentNode;
    if (parent) {
      parent.removeChild(child3);
    }
  },
  createElement: (tag, isSVG, is2, props) => {
    const el = isSVG ? doc$1.createElementNS(svgNS, tag) : doc$1.createElement(tag, is2 ? { is: is2 } : void 0);
    if (tag === "select" && props && props.multiple != null) {
      el.setAttribute("multiple", props.multiple);
    }
    return el;
  },
  createText: (text2) => doc$1.createTextNode(text2),
  createComment: (text2) => doc$1.createComment(text2),
  setText: (node4, text2) => {
    node4.nodeValue = text2;
  },
  setElementText: (el, text2) => {
    el.textContent = text2;
  },
  parentNode: (node4) => node4.parentNode,
  nextSibling: (node4) => node4.nextSibling,
  querySelector: (selector) => doc$1.querySelector(selector),
  setScopeId(el, id) {
    el.setAttribute(id, "");
  },
  cloneNode(el) {
    const cloned = el.cloneNode(true);
    if (`_value` in el) {
      cloned._value = el._value;
    }
    return cloned;
  },
  insertStaticContent(content2, parent, anchor, isSVG, start4, end3) {
    const before2 = anchor ? anchor.previousSibling : parent.lastChild;
    if (start4 && (start4 === end3 || start4.nextSibling)) {
      while (true) {
        parent.insertBefore(start4.cloneNode(true), anchor);
        if (start4 === end3 || !(start4 = start4.nextSibling))
          break;
      }
    } else {
      templateContainer.innerHTML = isSVG ? `<svg>${content2}</svg>` : content2;
      const template = templateContainer.content;
      if (isSVG) {
        const wrapper = template.firstChild;
        while (wrapper.firstChild) {
          template.appendChild(wrapper.firstChild);
        }
        template.removeChild(wrapper);
      }
      parent.insertBefore(template, anchor);
    }
    return [
      before2 ? before2.nextSibling : parent.firstChild,
      anchor ? anchor.previousSibling : parent.lastChild
    ];
  }
};
function patchClass(el, value, isSVG) {
  const transitionClasses = el._vtc;
  if (transitionClasses) {
    value = (value ? [value, ...transitionClasses] : [...transitionClasses]).join(" ");
  }
  if (value == null) {
    el.removeAttribute("class");
  } else if (isSVG) {
    el.setAttribute("class", value);
  } else {
    el.className = value;
  }
}
function patchStyle(el, prev, next) {
  const style2 = el.style;
  const isCssString = isString(next);
  if (next && !isCssString) {
    for (const key2 in next) {
      setStyle(style2, key2, next[key2]);
    }
    if (prev && !isString(prev)) {
      for (const key2 in prev) {
        if (next[key2] == null) {
          setStyle(style2, key2, "");
        }
      }
    }
  } else {
    const currentDisplay = style2.display;
    if (isCssString) {
      if (prev !== next) {
        style2.cssText = next;
      }
    } else if (prev) {
      el.removeAttribute("style");
    }
    if ("_vod" in el) {
      style2.display = currentDisplay;
    }
  }
}
const importantRE = /\s*!important$/;
function setStyle(style2, name, val) {
  if (isArray(val)) {
    val.forEach((v) => setStyle(style2, name, v));
  } else {
    if (val == null)
      val = "";
    if (name.startsWith("--")) {
      style2.setProperty(name, val);
    } else {
      const prefixed = autoPrefix(style2, name);
      if (importantRE.test(val)) {
        style2.setProperty(hyphenate(prefixed), val.replace(importantRE, ""), "important");
      } else {
        style2[prefixed] = val;
      }
    }
  }
}
const prefixes = ["Webkit", "Moz", "ms"];
const prefixCache = {};
function autoPrefix(style2, rawName) {
  const cached = prefixCache[rawName];
  if (cached) {
    return cached;
  }
  let name = camelize(rawName);
  if (name !== "filter" && name in style2) {
    return prefixCache[rawName] = name;
  }
  name = capitalize(name);
  for (let i2 = 0; i2 < prefixes.length; i2++) {
    const prefixed = prefixes[i2] + name;
    if (prefixed in style2) {
      return prefixCache[rawName] = prefixed;
    }
  }
  return rawName;
}
const xlinkNS = "http://www.w3.org/1999/xlink";
function patchAttr(el, key2, value, isSVG, instance) {
  if (isSVG && key2.startsWith("xlink:")) {
    if (value == null) {
      el.removeAttributeNS(xlinkNS, key2.slice(6, key2.length));
    } else {
      el.setAttributeNS(xlinkNS, key2, value);
    }
  } else {
    const isBoolean = isSpecialBooleanAttr(key2);
    if (value == null || isBoolean && !includeBooleanAttr(value)) {
      el.removeAttribute(key2);
    } else {
      el.setAttribute(key2, isBoolean ? "" : value);
    }
  }
}
function patchDOMProp(el, key2, value, prevChildren, parentComponent, parentSuspense, unmountChildren) {
  if (key2 === "innerHTML" || key2 === "textContent") {
    if (prevChildren) {
      unmountChildren(prevChildren, parentComponent, parentSuspense);
    }
    el[key2] = value == null ? "" : value;
    return;
  }
  if (key2 === "value" && el.tagName !== "PROGRESS" && !el.tagName.includes("-")) {
    el._value = value;
    const newValue = value == null ? "" : value;
    if (el.value !== newValue || el.tagName === "OPTION") {
      el.value = newValue;
    }
    if (value == null) {
      el.removeAttribute(key2);
    }
    return;
  }
  let needRemove = false;
  if (value === "" || value == null) {
    const type = typeof el[key2];
    if (type === "boolean") {
      value = includeBooleanAttr(value);
    } else if (value == null && type === "string") {
      value = "";
      needRemove = true;
    } else if (type === "number") {
      value = 0;
      needRemove = true;
    }
  }
  try {
    el[key2] = value;
  } catch (e) {
  }
  needRemove && el.removeAttribute(key2);
}
const [_getNow, skipTimestampCheck] = /* @__PURE__ */ (() => {
  let _getNow2 = Date.now;
  let skipTimestampCheck2 = false;
  if (typeof window !== "undefined") {
    if (Date.now() > document.createEvent("Event").timeStamp) {
      _getNow2 = () => performance.now();
    }
    const ffMatch = navigator.userAgent.match(/firefox\/(\d+)/i);
    skipTimestampCheck2 = !!(ffMatch && Number(ffMatch[1]) <= 53);
  }
  return [_getNow2, skipTimestampCheck2];
})();
let cachedNow = 0;
const p = /* @__PURE__ */ Promise.resolve();
const reset = () => {
  cachedNow = 0;
};
const getNow = () => cachedNow || (p.then(reset), cachedNow = _getNow());
function addEventListener(el, event, handler, options) {
  el.addEventListener(event, handler, options);
}
function removeEventListener(el, event, handler, options) {
  el.removeEventListener(event, handler, options);
}
function patchEvent(el, rawName, prevValue, nextValue, instance = null) {
  const invokers = el._vei || (el._vei = {});
  const existingInvoker = invokers[rawName];
  if (nextValue && existingInvoker) {
    existingInvoker.value = nextValue;
  } else {
    const [name, options] = parseName(rawName);
    if (nextValue) {
      const invoker = invokers[rawName] = createInvoker(nextValue, instance);
      addEventListener(el, name, invoker, options);
    } else if (existingInvoker) {
      removeEventListener(el, name, existingInvoker, options);
      invokers[rawName] = void 0;
    }
  }
}
const optionsModifierRE = /(?:Once|Passive|Capture)$/;
function parseName(name) {
  let options;
  if (optionsModifierRE.test(name)) {
    options = {};
    let m;
    while (m = name.match(optionsModifierRE)) {
      name = name.slice(0, name.length - m[0].length);
      options[m[0].toLowerCase()] = true;
    }
  }
  return [hyphenate(name.slice(2)), options];
}
function createInvoker(initialValue, instance) {
  const invoker = (e) => {
    const timeStamp = e.timeStamp || _getNow();
    if (skipTimestampCheck || timeStamp >= invoker.attached - 1) {
      callWithAsyncErrorHandling(patchStopImmediatePropagation(e, invoker.value), instance, 5, [e]);
    }
  };
  invoker.value = initialValue;
  invoker.attached = getNow();
  return invoker;
}
function patchStopImmediatePropagation(e, value) {
  if (isArray(value)) {
    const originalStop = e.stopImmediatePropagation;
    e.stopImmediatePropagation = () => {
      originalStop.call(e);
      e._stopped = true;
    };
    return value.map((fn2) => (e2) => !e2._stopped && fn2 && fn2(e2));
  } else {
    return value;
  }
}
const nativeOnRE = /^on[a-z]/;
const patchProp = (el, key2, prevValue, nextValue, isSVG = false, prevChildren, parentComponent, parentSuspense, unmountChildren) => {
  if (key2 === "class") {
    patchClass(el, nextValue, isSVG);
  } else if (key2 === "style") {
    patchStyle(el, prevValue, nextValue);
  } else if (isOn(key2)) {
    if (!isModelListener(key2)) {
      patchEvent(el, key2, prevValue, nextValue, parentComponent);
    }
  } else if (key2[0] === "." ? (key2 = key2.slice(1), true) : key2[0] === "^" ? (key2 = key2.slice(1), false) : shouldSetAsProp(el, key2, nextValue, isSVG)) {
    patchDOMProp(el, key2, nextValue, prevChildren, parentComponent, parentSuspense, unmountChildren);
  } else {
    if (key2 === "true-value") {
      el._trueValue = nextValue;
    } else if (key2 === "false-value") {
      el._falseValue = nextValue;
    }
    patchAttr(el, key2, nextValue, isSVG);
  }
};
function shouldSetAsProp(el, key2, value, isSVG) {
  if (isSVG) {
    if (key2 === "innerHTML" || key2 === "textContent") {
      return true;
    }
    if (key2 in el && nativeOnRE.test(key2) && isFunction$1(value)) {
      return true;
    }
    return false;
  }
  if (key2 === "spellcheck" || key2 === "draggable" || key2 === "translate") {
    return false;
  }
  if (key2 === "form") {
    return false;
  }
  if (key2 === "list" && el.tagName === "INPUT") {
    return false;
  }
  if (key2 === "type" && el.tagName === "TEXTAREA") {
    return false;
  }
  if (nativeOnRE.test(key2) && isString(value)) {
    return false;
  }
  return key2 in el;
}
const DOMTransitionPropsValidators = {
  name: String,
  type: String,
  css: {
    type: Boolean,
    default: true
  },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String
};
/* @__PURE__ */ extend({}, BaseTransition.props, DOMTransitionPropsValidators);
const rendererOptions = /* @__PURE__ */ extend({ patchProp }, nodeOps);
let renderer;
function ensureRenderer() {
  return renderer || (renderer = createRenderer(rendererOptions));
}
const createApp = (...args) => {
  const app = ensureRenderer().createApp(...args);
  const { mount } = app;
  app.mount = (containerOrSelector) => {
    const container = normalizeContainer(containerOrSelector);
    if (!container)
      return;
    const component = app._component;
    if (!isFunction$1(component) && !component.render && !component.template) {
      component.template = container.innerHTML;
    }
    container.innerHTML = "";
    const proxy = mount(container, false, container instanceof SVGElement);
    if (container instanceof Element) {
      container.removeAttribute("v-cloak");
      container.setAttribute("data-v-app", "");
    }
    return proxy;
  };
  return app;
};
function normalizeContainer(container) {
  if (isString(container)) {
    const res = document.querySelector(container);
    return res;
  }
  return container;
}
var _imports_0 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIwAAACMBAMAAABc7lwNAAAAHlBMVEUG+3//AAD/////f3//v7//Hx//Pz//39//X1//n5/fDlzAAAAAAXRSTlMAQObYZgAAA9JJREFUaN7dmlty5CAMRaUdSPvfbDK2MXpcAXaTysz4I1Xpbh+DBFcPTPR96UeX0Hmp7uCo7uDw5xjdMphjOHswO+b0PatNGP1hjJzjlKWbyJgpmq2aNTAolV+eGPkUc+2U9xhy13+CaTB+4ymCnkIY+8trT5J1TIkRGl0dA4TwBUaAQe3yW8Qgx5xDa4YeXNwwh5b+eW6bV3jWoqcO5PHlcdtk2QwwxgoBAyVTV5afDMeyjJnJ9D+LGVh4FTN3eI0xHk5LPdwI/iPw+LzW/YQ9hipM1pY1jNTLVoiMOgGMWL2pw/kcw+sYKTFUYsTOjnLwDBgtMIQ8/imGdSJ/Op7UIoZ1bmJ5ghE2oSSmFeuYa35ovTaPCQ1zUOo59vknrFBexjQD3BjnhimmC8W1L/iES9juyxh1GHXme46hCyMurL7DFEUFzU3chBBjeAeGdmEmBdMSRm4Ml4UdxODQuYahGYY+w9AUYyX9xmiJ0RUMjzGjytamkOyGlGwzxBDASIHhQfHcMSGR3I+hHRidY6Btoi1RYlJj+vKrEhMedjnq0iMkJgulh1XxKjFZiuFSJp6tx7AWw2XWnhJIaI/98Y7Jr2G8uTh/pN4iubVDqQy7dDmkfs7DrtK/95S4m2I2ADC0A8MRw9HErQKe9PFmGLkx+hwjZAPA09EQtg0B2zzF8CUtqSwrPSWgLDMBYgUT9QaMOMYpv/w49HwmmCCWLt5I1puhJvVxgcGpSyGnHIvR9JAlpU0YgZiZ7ifMxeEoFJOWvXDHCIOmBq2kHWeP6cIQlRguyzuDoYTpNR0NensaOl43RmDfr2UCMKoaDMulWfQC03WoKQAojQ0GJgFmar7Aqvp+EGOzLSGUHSYMmpTbiwSqUX6OuXO73O/puRR0eMZIMrHHaO2oq8S+4ikXnpqWOTGG5ybGIqYOFRQTWtDv64ukzDElJ7SlbUKnSspeOvaUlxAwtI8wo9FQ6txw6toqHE7AKMwuQm3SRRQl+1DXQ/0MGpJtv94YGWPIRHfN3nuMyZthHdOOMfD8PQbIVghvXT5eYurNQL4rMJ6UlkncL2GKw4E1DCWMM7FrvIi7w6xyMbJlMDnx73oDjwbc3SYFvDGSMehoj+JR5vEJ3yeYHlMFmNxow70Q11wYBBhewBBKotl9w0XeDDBAB0H/JrXJQxMc6aCYQhBn8SPMaDQlxvkhxAMiBb+Am6FXAi3kx5NfscUsF30/5+9YKOWiogq+dvVxKAmEZgevBtMfaNXFnoIMGjx34sipg9P/mb8RwxtfnPm7Xira9abUpve2trxF9gX1+cMTRxyCnQAAAABJRU5ErkJggg==";
var Header_vue_vue_type_style_index_0_lang = "";
const _hoisted_1$3 = ["id"];
const _hoisted_2$3 = /* @__PURE__ */ createBaseVNode("h1", null, "\u53E4\u8BD7\u8D4F\u6790\u751F\u6210\u5668", -1);
const _hoisted_3$2 = { key: 0 };
const _hoisted_4$1 = { key: 1 };
const _hoisted_5$1 = {
  key: 2,
  class: "author"
};
const _hoisted_6$1 = ["innerHTML"];
const _sfc_main$3 = {
  props: {
    msg: String,
    sticky: Boolean
  },
  setup(__props) {
    ref(0);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        id: __props.sticky ? "header" : "",
        class: normalizeClass(["flexv center trans", __props.sticky ? "sticky" : ""])
      }, [
        _hoisted_2$3,
        !__props.sticky ? (openBlock(), createElementBlock("h3", _hoisted_3$2, "nlp-chinese-poetry-appreciation")) : createCommentVNode("", true),
        !__props.sticky ? (openBlock(), createElementBlock("span", _hoisted_4$1, "\xA0")) : createCommentVNode("", true),
        !__props.sticky ? (openBlock(), createElementBlock("h3", _hoisted_5$1, "\u4F5C\u8005")) : createCommentVNode("", true),
        !__props.sticky ? (openBlock(), createElementBlock("h3", {
          key: 3,
          class: "author",
          innerHTML: __props.msg.replace(/[ ]/g, "<br/>")
        }, null, 8, _hoisted_6$1)) : createCommentVNode("", true)
      ], 10, _hoisted_1$3);
    };
  }
};
var shanshui_vue_vue_type_style_index_0_lang = "";
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key2, val] of props) {
    target[key2] = val;
  }
  return target;
};
let MEM = {};
var Prng = new function() {
  this.s = 1234;
  this.p = 999979;
  this.q = 999983;
  this.m = this.p * this.q;
  this.hash = function(x) {
    var y = window.btoa(JSON.stringify(x));
    var z = 0;
    for (var i2 = 0; i2 < y.length; i2++) {
      z += y.charCodeAt(i2) * Math.pow(128, i2);
    }
    return z;
  };
  this.seed = function(x) {
    if (x == void 0) {
      x = new Date().getTime();
    }
    var y = 0;
    var z = 0;
    function redo2() {
      y = (Prng.hash(x) + z) % Prng.m;
      z += 1;
    }
    while (y % Prng.p == 0 || y % Prng.q == 0 || y == 0 || y == 1) {
      redo2();
    }
    Prng.s = y;
    console.log(["int seed", Prng.s]);
    for (var i2 = 0; i2 < 10; i2++) {
      Prng.next();
    }
  };
  this.next = function() {
    Prng.s = Prng.s * Prng.s % Prng.m;
    return Prng.s / Prng.m;
  };
  this.test = function(f) {
    var F = f || function() {
      return Prng.next();
    };
    var t0 = new Date().getTime();
    var chart = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (var i2 = 0; i2 < 1e7; i2++) {
      chart[Math.floor(F() * 10)] += 1;
    }
    console.log(chart);
    console.log("finished in " + (new Date().getTime() - t0));
    return chart;
  };
}();
Math.random = function() {
  return Prng.next();
};
Math.seed = function(x) {
  return Prng.seed(x);
};
function parseArgs(key2f) {
  var par = window.location.href.split("?")[1];
  if (par == void 0) {
    return;
  }
  par = par.split("&");
  for (var i2 = 0; i2 < par.length; i2++) {
    var e = par[i2].split("=");
    try {
      key2f[e[0]](e[1]);
    } catch (e2) {
      console.log(e2);
    }
  }
}
let SEED = "" + new Date().getTime();
parseArgs({
  seed: function(x) {
    SEED = x == "" ? SEED : x;
  }
});
Math.seed(SEED);
console.log(Prng.seed);
var Noise = new function() {
  var PERLIN_YWRAPB = 4;
  var PERLIN_YWRAP = 1 << PERLIN_YWRAPB;
  var PERLIN_ZWRAPB = 8;
  var PERLIN_ZWRAP = 1 << PERLIN_ZWRAPB;
  var PERLIN_SIZE = 4095;
  var perlin_octaves = 4;
  var perlin_amp_falloff = 0.5;
  var scaled_cosine = function(i2) {
    return 0.5 * (1 - Math.cos(i2 * Math.PI));
  };
  var perlin;
  this.noise = function(x, y, z) {
    y = y || 0;
    z = z || 0;
    if (perlin == null) {
      perlin = new Array(PERLIN_SIZE + 1);
      for (var i2 = 0; i2 < PERLIN_SIZE + 1; i2++) {
        perlin[i2] = Math.random();
      }
    }
    if (x < 0) {
      x = -x;
    }
    if (y < 0) {
      y = -y;
    }
    if (z < 0) {
      z = -z;
    }
    var xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z);
    var xf = x - xi;
    var yf = y - yi;
    var zf = z - zi;
    var rxf, ryf;
    var r = 0;
    var ampl = 0.5;
    var n1, n2, n3;
    for (var o = 0; o < perlin_octaves; o++) {
      var of = xi + (yi << PERLIN_YWRAPB) + (zi << PERLIN_ZWRAPB);
      rxf = scaled_cosine(xf);
      ryf = scaled_cosine(yf);
      n1 = perlin[of & PERLIN_SIZE];
      n1 += rxf * (perlin[of + 1 & PERLIN_SIZE] - n1);
      n2 = perlin[of + PERLIN_YWRAP & PERLIN_SIZE];
      n2 += rxf * (perlin[of + PERLIN_YWRAP + 1 & PERLIN_SIZE] - n2);
      n1 += ryf * (n2 - n1);
      of += PERLIN_ZWRAP;
      n2 = perlin[of & PERLIN_SIZE];
      n2 += rxf * (perlin[of + 1 & PERLIN_SIZE] - n2);
      n3 = perlin[of + PERLIN_YWRAP & PERLIN_SIZE];
      n3 += rxf * (perlin[of + PERLIN_YWRAP + 1 & PERLIN_SIZE] - n3);
      n2 += ryf * (n3 - n2);
      n1 += scaled_cosine(zf) * (n2 - n1);
      r += n1 * ampl;
      ampl *= perlin_amp_falloff;
      xi <<= 1;
      xf *= 2;
      yi <<= 1;
      yf *= 2;
      zi <<= 1;
      zf *= 2;
      if (xf >= 1) {
        xi++;
        xf--;
      }
      if (yf >= 1) {
        yi++;
        yf--;
      }
      if (zf >= 1) {
        zi++;
        zf--;
      }
    }
    return r;
  };
  this.noiseDetail = function(lod, falloff) {
    if (lod > 0) {
      perlin_octaves = lod;
    }
    if (falloff > 0) {
      perlin_amp_falloff = falloff;
    }
  };
  this.noiseSeed = function(seed) {
    var lcg = function() {
      var m = 4294967296, a2 = 1664525, c = 1013904223, seed2, z;
      return {
        setSeed: function(val) {
          z = seed2 = (val == null ? Math.random() * m : val) >>> 0;
        },
        getSeed: function() {
          return seed2;
        },
        rand: function() {
          z = (a2 * z + c) % m;
          return z / m;
        }
      };
    }();
    lcg.setSeed(seed);
    perlin = new Array(PERLIN_SIZE + 1);
    for (var i2 = 0; i2 < PERLIN_SIZE + 1; i2++) {
      perlin[i2] = lcg.rand();
    }
  };
}();
var PolyTools = new function() {
  this.midPt = function() {
    var plist = arguments.length == 1 ? arguments[0] : Array.apply(null, arguments);
    return plist.reduce(function(acc, v) {
      return [v[0] / plist.length + acc[0], v[1] / plist.length + acc[1]];
    }, [0, 0]);
  };
  this.triangulate = function(plist, args) {
    var args = args != void 0 ? args : {};
    var area = args.area != void 0 ? args.area : 100;
    var convex = args.convex != void 0 ? args.convex : false;
    var optimize = args.optimize != void 0 ? args.optimize : true;
    function lineExpr(pt0, pt1) {
      var den = pt1[0] - pt0[0];
      var m = den == 0 ? Infinity : (pt1[1] - pt0[1]) / den;
      var k = pt0[1] - m * pt0[0];
      return [m, k];
    }
    function intersect(ln0, ln1) {
      var le0 = lineExpr(...ln0);
      var le1 = lineExpr(...ln1);
      var den = le0[0] - le1[0];
      if (den == 0) {
        return false;
      }
      var x = (le1[1] - le0[1]) / den;
      var y = le0[0] * x + le0[1];
      function onSeg(p2, ln) {
        return Math.min(ln[0][0], ln[1][0]) <= p2[0] && p2[0] <= Math.max(ln[0][0], ln[1][0]) && Math.min(ln[0][1], ln[1][1]) <= p2[1] && p2[1] <= Math.max(ln[0][1], ln[1][1]);
      }
      if (onSeg([x, y], ln0) && onSeg([x, y], ln1)) {
        return [x, y];
      }
      return false;
    }
    function ptInPoly(pt, plist2) {
      var scount = 0;
      for (var i2 = 0; i2 < plist2.length; i2++) {
        var np = plist2[i2 != plist2.length - 1 ? i2 + 1 : 0];
        var sect = intersect([plist2[i2], np], [pt, [pt[0] + 999, pt[1] + 999]]);
        if (sect != false) {
          scount++;
        }
      }
      return scount % 2 == 1;
    }
    function lnInPoly(ln, plist2) {
      var lnc = [
        [0, 0],
        [0, 0]
      ];
      var ep = 0.01;
      lnc[0][0] = ln[0][0] * (1 - ep) + ln[1][0] * ep;
      lnc[0][1] = ln[0][1] * (1 - ep) + ln[1][1] * ep;
      lnc[1][0] = ln[0][0] * ep + ln[1][0] * (1 - ep);
      lnc[1][1] = ln[0][1] * ep + ln[1][1] * (1 - ep);
      for (var i2 = 0; i2 < plist2.length; i2++) {
        var pt = plist2[i2];
        var np = plist2[i2 != plist2.length - 1 ? i2 + 1 : 0];
        if (intersect(lnc, [pt, np]) != false) {
          return false;
        }
      }
      var mid = PolyTools.midPt(ln);
      if (ptInPoly(mid, plist2) == false) {
        return false;
      }
      return true;
    }
    function sidesOf(plist2) {
      var slist = [];
      for (var i2 = 0; i2 < plist2.length; i2++) {
        var pt = plist2[i2];
        var np = plist2[i2 != plist2.length - 1 ? i2 + 1 : 0];
        var s = Math.sqrt(Math.pow(np[0] - pt[0], 2) + Math.pow(np[1] - pt[1], 2));
        slist.push(s);
      }
      return slist;
    }
    function areaOf(plist2) {
      var slist = sidesOf(plist2);
      var a2 = slist[0], b = slist[1], c = slist[2];
      var s = (a2 + b + c) / 2;
      return Math.sqrt(s * (s - a2) * (s - b) * (s - c));
    }
    function sliverRatio(plist2) {
      var A = areaOf(plist2);
      var P = sidesOf(plist2).reduce(function(m, n) {
        return m + n;
      }, 0);
      return A / P;
    }
    function bestEar(plist2) {
      var cuts = [];
      for (var i2 = 0; i2 < plist2.length; i2++) {
        var pt = plist2[i2];
        var lp = plist2[i2 != 0 ? i2 - 1 : plist2.length - 1];
        var np = plist2[i2 != plist2.length - 1 ? i2 + 1 : 0];
        var qlist = plist2.slice();
        qlist.splice(i2, 1);
        if (convex || lnInPoly([lp, np], plist2)) {
          var c = [[lp, pt, np], qlist];
          if (!optimize)
            return c;
          cuts.push(c);
        }
      }
      var best = [plist2, []];
      var bestRatio = 0;
      for (var i2 = 0; i2 < cuts.length; i2++) {
        var r = sliverRatio(cuts[i2][0]);
        if (r >= bestRatio) {
          best = cuts[i2];
          bestRatio = r;
        }
      }
      return best;
    }
    function shatter(plist2, a2) {
      if (plist2.length == 0) {
        return [];
      }
      if (areaOf(plist2) < a2) {
        return [plist2];
      } else {
        var slist = sidesOf(plist2);
        var ind = slist.reduce((iMax, x, i2, arr) => x > arr[iMax] ? i2 : iMax, 0);
        var nind = (ind + 1) % plist2.length;
        var lind = (ind + 2) % plist2.length;
        try {
          var mid = PolyTools.midPt([plist2[ind], plist2[nind]]);
        } catch (err2) {
          console.log(plist2);
          console.log(err2);
          return [];
        }
        return shatter([plist2[ind], mid, plist2[lind]], a2).concat(shatter([plist2[lind], plist2[nind], mid], a2));
      }
    }
    if (plist.length <= 3) {
      return shatter(plist, area);
    } else {
      var cut3 = bestEar(plist);
      return shatter(cut3[0], area).concat(PolyTools.triangulate(cut3[1], args));
    }
  };
}();
function distance(p0, p1) {
  return Math.sqrt(Math.pow(p0[0] - p1[0], 2) + Math.pow(p0[1] - p1[1], 2));
}
function mapval(value, istart, istop, ostart, ostop) {
  return ostart + (ostop - ostart) * ((value - istart) * 1 / (istop - istart));
}
function loopNoise(nslist) {
  var dif = nslist[nslist.length - 1] - nslist[0];
  var bds = [100, -100];
  for (var i2 = 0; i2 < nslist.length; i2++) {
    nslist[i2] += dif * (nslist.length - 1 - i2) / (nslist.length - 1);
    if (nslist[i2] < bds[0])
      bds[0] = nslist[i2];
    if (nslist[i2] > bds[1])
      bds[1] = nslist[i2];
  }
  for (var i2 = 0; i2 < nslist.length; i2++) {
    nslist[i2] = mapval(nslist[i2], bds[0], bds[1], 0, 1);
  }
}
function randChoice(arr) {
  return arr[Math.floor(arr.length * Math.random())];
}
function normRand(m, M) {
  return mapval(Math.random(), 0, 1, m, M);
}
function wtrand(func) {
  var x = Math.random();
  var y = Math.random();
  if (y < func(x)) {
    return x;
  } else {
    return wtrand(func);
  }
}
function randGaussian() {
  return wtrand(function(x) {
    return Math.pow(Math.E, -24 * Math.pow(x - 0.5, 2));
  }) * 2 - 1;
}
function bezmh(P, w) {
  w = w == void 0 ? 1 : w;
  if (P.length == 2) {
    P = [P[0], PolyTools.midPt(P[0], P[1]), P[1]];
  }
  var plist = [];
  for (var j = 0; j < P.length - 2; j++) {
    var p0;
    var p1;
    var p2;
    if (j == 0) {
      p0 = P[j];
    } else {
      p0 = PolyTools.midPt(P[j], P[j + 1]);
    }
    p1 = P[j + 1];
    if (j == P.length - 3) {
      p2 = P[j + 2];
    } else {
      p2 = PolyTools.midPt(P[j + 1], P[j + 2]);
    }
    var pl = 20;
    for (var i2 = 0; i2 < pl + (j == P.length - 3); i2 += 1) {
      var t = i2 / pl;
      var u = Math.pow(1 - t, 2) + 2 * t * (1 - t) * w + t * t;
      plist.push([
        (Math.pow(1 - t, 2) * p0[0] + 2 * t * (1 - t) * p1[0] * w + t * t * p2[0]) / u,
        (Math.pow(1 - t, 2) * p0[1] + 2 * t * (1 - t) * p1[1] * w + t * t * p2[1]) / u
      ]);
    }
  }
  return plist;
}
function poly(plist, args) {
  var args = args != void 0 ? args : {};
  var xof = args.xof != void 0 ? args.xof : 0;
  var yof = args.yof != void 0 ? args.yof : 0;
  var fil = args.fil != void 0 ? args.fil : "rgba(0,0,0,0)";
  var str = args.str != void 0 ? args.str : fil;
  var wid = args.wid != void 0 ? args.wid : 0;
  var canv = "<polyline points='";
  for (var i2 = 0; i2 < plist.length; i2++) {
    canv += " " + (plist[i2][0] + xof).toFixed(1) + "," + (plist[i2][1] + yof).toFixed(1);
  }
  canv += "' style='fill:" + fil + ";stroke:" + str + ";stroke-width:" + wid + "'/>";
  return canv;
}
console.log("************************************************");
function stroke(ptlist, args) {
  var args = args != void 0 ? args : {};
  var xof = args.xof != void 0 ? args.xof : 0;
  var yof = args.yof != void 0 ? args.yof : 0;
  var wid = args.wid != void 0 ? args.wid : 2;
  var col = args.col != void 0 ? args.col : "rgba(200,200,200,0.9)";
  var noi = args.noi != void 0 ? args.noi : 0.5;
  var out = args.out != void 0 ? args.out : 1;
  var fun = args.fun != void 0 ? args.fun : function(x) {
    return Math.sin(x * Math.PI);
  };
  if (ptlist.length == 0) {
    return "";
  }
  let vtxlist0 = [];
  let vtxlist1 = [];
  let vtxlist = [];
  var n0 = Math.random() * 10;
  for (var i2 = 1; i2 < ptlist.length - 1; i2++) {
    var w = wid * fun(i2 / ptlist.length);
    w = w * (1 - noi) + w * noi * Noise.noise(i2 * 0.5, n0);
    var a1 = Math.atan2(ptlist[i2][1] - ptlist[i2 - 1][1], ptlist[i2][0] - ptlist[i2 - 1][0]);
    var a2 = Math.atan2(ptlist[i2][1] - ptlist[i2 + 1][1], ptlist[i2][0] - ptlist[i2 + 1][0]);
    var a3 = (a1 + a2) / 2;
    if (a3 < a2) {
      a3 += Math.PI;
    }
    vtxlist0.push([ptlist[i2][0] + w * Math.cos(a3), ptlist[i2][1] + w * Math.sin(a3)]);
    vtxlist1.push([ptlist[i2][0] - w * Math.cos(a3), ptlist[i2][1] - w * Math.sin(a3)]);
  }
  vtxlist = [ptlist[0]].concat(vtxlist0.concat(vtxlist1.concat([ptlist[ptlist.length - 1]]).reverse())).concat([ptlist[0]]);
  var canv = poly(vtxlist.map(function(x) {
    return [x[0] + xof, x[1] + yof];
  }), { fil: col, str: col, wid: out });
  return canv;
}
function blob(x, y, args) {
  var args = args != void 0 ? args : {};
  var len = args.len != void 0 ? args.len : 20;
  var wid = args.wid != void 0 ? args.wid : 5;
  var ang = args.ang != void 0 ? args.ang : 0;
  var col = args.col != void 0 ? args.col : "rgba(200,200,200,0.9)";
  var noi = args.noi != void 0 ? args.noi : 0.5;
  var ret = args.ret != void 0 ? args.ret : 0;
  var fun = args.fun != void 0 ? args.fun : function(x2) {
    return x2 <= 1 ? Math.pow(Math.sin(x2 * Math.PI), 0.5) : -Math.pow(Math.sin((x2 + 1) * Math.PI), 0.5);
  };
  var reso = 20;
  var lalist = [];
  for (var i2 = 0; i2 < reso + 1; i2++) {
    var p2 = i2 / reso * 2;
    var xo = len / 2 - Math.abs(p2 - 1) * len;
    var yo = fun(p2) * wid / 2;
    var a2 = Math.atan2(yo, xo);
    var l = Math.sqrt(xo * xo + yo * yo);
    lalist.push([l, a2]);
  }
  var nslist = [];
  var n0 = Math.random() * 10;
  for (var i2 = 0; i2 < reso + 1; i2++) {
    nslist.push(Noise.noise(i2 * 0.05, n0));
  }
  loopNoise(nslist);
  var plist = [];
  for (var i2 = 0; i2 < lalist.length; i2++) {
    var ns = nslist[i2] * noi + (1 - noi);
    var nx = x + Math.cos(lalist[i2][1] + ang) * lalist[i2][0] * ns;
    var ny = y + Math.sin(lalist[i2][1] + ang) * lalist[i2][0] * ns;
    plist.push([nx, ny]);
  }
  if (ret == 0) {
    return poly(plist, { fil: col, str: col, wid: 0 });
  } else {
    return plist;
  }
}
function div$1(plist, reso) {
  var tl = (plist.length - 1) * reso;
  var rlist = [];
  for (var i2 = 0; i2 < tl; i2 += 1) {
    var lastp = plist[Math.floor(i2 / reso)];
    var nextp = plist[Math.ceil(i2 / reso)];
    var p2 = i2 % reso / reso;
    var nx = lastp[0] * (1 - p2) + nextp[0] * p2;
    var ny = lastp[1] * (1 - p2) + nextp[1] * p2;
    rlist.push([nx, ny]);
  }
  if (plist.length > 0) {
    rlist.push(plist[plist.length - 1]);
  }
  return rlist;
}
var texture = function(ptlist, args) {
  var args = args != void 0 ? args : {};
  var xof = args.xof != void 0 ? args.xof : 0;
  var yof = args.yof != void 0 ? args.yof : 0;
  var tex = args.tex != void 0 ? args.tex : 400;
  var wid = args.wid != void 0 ? args.wid : 1.5;
  var len = args.len != void 0 ? args.len : 0.2;
  var sha = args.sha != void 0 ? args.sha : 0;
  var ret = args.ret != void 0 ? args.ret : 0;
  var noi = args.noi != void 0 ? args.noi : function(x2) {
    return 30 / x2;
  };
  var col = args.col != void 0 ? args.col : function(x2) {
    return "rgba(100,100,100," + (Math.random() * 0.3).toFixed(3) + ")";
  };
  var dis = args.dis != void 0 ? args.dis : function() {
    if (Math.random() > 0.5) {
      return 1 / 3 * Math.random();
    } else {
      return 1 * 2 / 3 + 1 / 3 * Math.random();
    }
  };
  var reso = [ptlist.length, ptlist[0].length];
  var texlist = [];
  for (var i2 = 0; i2 < tex; i2++) {
    var mid = dis() * reso[1] | 0;
    var hlen = Math.floor(Math.random() * (reso[1] * len));
    var start4 = mid - hlen;
    var end3 = mid + hlen;
    start4 = Math.min(Math.max(start4, 0), reso[1]);
    end3 = Math.min(Math.max(end3, 0), reso[1]);
    var layer = i2 / tex * (reso[0] - 1);
    texlist.push([]);
    for (var j = start4; j < end3; j++) {
      var p2 = layer - Math.floor(layer);
      var x = ptlist[Math.floor(layer)][j][0] * p2 + ptlist[Math.ceil(layer)][j][0] * (1 - p2);
      var y = ptlist[Math.floor(layer)][j][1] * p2 + ptlist[Math.ceil(layer)][j][1] * (1 - p2);
      var ns = [
        noi(layer + 1) * (Noise.noise(x, j * 0.5) - 0.5),
        noi(layer + 1) * (Noise.noise(y, j * 0.5) - 0.5)
      ];
      texlist[texlist.length - 1].push([x + ns[0], y + ns[1]]);
    }
  }
  var canv = "";
  if (sha) {
    for (var j = 0; j < texlist.length; j += 1 + (sha != 0)) {
      canv += stroke(texlist[j].map(function(x2) {
        return [x2[0] + xof, x2[1] + yof];
      }), { col: "rgba(100,100,100,0.1)", wid: sha });
    }
  }
  for (var j = 0 + sha; j < texlist.length; j += 1 + sha) {
    canv += stroke(texlist[j].map(function(x2) {
      return [x2[0] + xof, x2[1] + yof];
    }), { col: col(j / texlist.length), wid });
  }
  return ret ? texlist : canv;
};
var Tree = new function() {
  this.tree01 = function(x, y, args) {
    var args = args != void 0 ? args : {};
    var hei = args.hei != void 0 ? args.hei : 50;
    var wid = args.wid != void 0 ? args.wid : 3;
    var col = args.col != void 0 ? args.col : "rgba(100,100,100,0.5)";
    args.noi != void 0 ? args.noi : 0.5;
    let reso = 10;
    var nslist = [];
    for (var i2 = 0; i2 < reso; i2++) {
      nslist.push([Noise.noise(i2 * 0.5), Noise.noise(i2 * 0.5, 0.5)]);
    }
    var leafcol;
    if (col.includes("rgba(")) {
      leafcol = col.replace("rgba(", "").replace(")", "").split(",");
    } else {
      leafcol = ["100", "100", "100", "0.5"];
    }
    var canv = "";
    var line1 = [];
    var line2 = [];
    for (var i2 = 0; i2 < reso; i2++) {
      var nx = x;
      var ny = y - i2 * hei / reso;
      if (i2 >= reso / 4) {
        for (var j = 0; j < (reso - i2) / 5; j++) {
          canv += blob(nx + (Math.random() - 0.5) * wid * 1.2 * (reso - i2), ny + (Math.random() - 0.5) * wid, {
            len: Math.random() * 20 * (reso - i2) * 0.2 + 10,
            wid: Math.random() * 6 + 3,
            ang: (Math.random() - 0.5) * Math.PI / 6,
            col: "rgba(" + leafcol[0] + "," + leafcol[1] + "," + leafcol[2] + "," + (Math.random() * 0.2 + parseFloat(leafcol[3])).toFixed(1) + ")"
          });
        }
      }
      line1.push([nx + (nslist[i2][0] - 0.5) * wid - wid / 2, ny]);
      line2.push([nx + (nslist[i2][1] - 0.5) * wid + wid / 2, ny]);
    }
    canv += poly(line1, { fil: "none", str: col, wid: 1.5 }) + poly(line2, { fil: "none", str: col, wid: 1.5 });
    return canv;
  };
  this.tree02 = function(x, y, args) {
    var args = args != void 0 ? args : {};
    var hei = args.hei != void 0 ? args.hei : 16;
    var wid = args.wid != void 0 ? args.wid : 8;
    var clu = args.clu != void 0 ? args.clu : 5;
    var col = args.col != void 0 ? args.col : "rgba(100,100,100,0.5)";
    args.noi != void 0 ? args.noi : 0.5;
    if (col.includes("rgba(")) {
      col.replace("rgba(", "").replace(")", "").split(",");
    }
    var canv = "";
    for (var i2 = 0; i2 < clu; i2++) {
      canv += blob(x + randGaussian() * clu * 4, y + randGaussian() * clu * 4, {
        ang: Math.PI / 2,
        col: "rgba(100,100,100,0.8)",
        fun: function(x2) {
          return x2 <= 1 ? Math.pow(Math.sin(x2 * Math.PI) * x2, 0.5) : -Math.pow(Math.sin((x2 - 2) * Math.PI * (x2 - 2)), 0.5);
        },
        wid: Math.random() * wid * 0.75 + wid * 0.5,
        len: Math.random() * hei * 0.75 + hei * 0.5,
        col
      });
    }
    return canv;
  };
  this.tree03 = function(x, y, args) {
    var args = args != void 0 ? args : {};
    var hei = args.hei != void 0 ? args.hei : 50;
    var wid = args.wid != void 0 ? args.wid : 5;
    var ben = args.ben != void 0 ? args.ben : function(x2) {
      return 0;
    };
    var col = args.col != void 0 ? args.col : "rgba(100,100,100,0.5)";
    args.noi != void 0 ? args.noi : 0.5;
    let reso = 10;
    var nslist = [];
    for (var i2 = 0; i2 < reso; i2++) {
      nslist.push([Noise.noise(i2 * 0.5), Noise.noise(i2 * 0.5, 0.5)]);
    }
    var leafcol;
    if (col.includes("rgba(")) {
      leafcol = col.replace("rgba(", "").replace(")", "").split(",");
    } else {
      leafcol = ["100", "100", "100", "0.5"];
    }
    var canv = "";
    var blobs = "";
    var line1 = [];
    var line2 = [];
    for (var i2 = 0; i2 < reso; i2++) {
      var nx = x + ben(i2 / reso) * 100;
      var ny = y - i2 * hei / reso;
      if (i2 >= reso / 5) {
        for (var j = 0; j < (reso - i2) * 2; j++) {
          var shape = function(x2) {
            return Math.log(50 * x2 + 1) / 3.95;
          };
          var ox = Math.random() * wid * 2 * shape((reso - i2) / reso);
          blobs += blob(nx + ox * randChoice([-1, 1]), ny + (Math.random() - 0.5) * wid * 2, {
            len: ox * 2,
            wid: Math.random() * 6 + 3,
            ang: (Math.random() - 0.5) * Math.PI / 6,
            col: "rgba(" + leafcol[0] + "," + leafcol[1] + "," + leafcol[2] + "," + (Math.random() * 0.2 + parseFloat(leafcol[3])).toFixed(3) + ")"
          });
        }
      }
      line1.push([nx + ((nslist[i2][0] - 0.5) * wid - wid / 2) * (reso - i2) / reso, ny]);
      line2.push([nx + ((nslist[i2][1] - 0.5) * wid + wid / 2) * (reso - i2) / reso, ny]);
    }
    var lc = line1.concat(line2.reverse());
    canv += poly(lc, { fil: "white", str: col, wid: 1.5 });
    canv += blobs;
    return canv;
  };
  var branch = function(args) {
    var args = args != void 0 ? args : {};
    var hei = args.hei != void 0 ? args.hei : 300;
    var wid = args.wid != void 0 ? args.wid : 6;
    var ang = args.ang != void 0 ? args.ang : 0;
    var det = args.det != void 0 ? args.det : 10;
    var ben = args.ben != void 0 ? args.ben : Math.PI * 0.2;
    var tlist;
    var nx = 0;
    var ny = 0;
    tlist = [[nx, ny]];
    var a0 = 0;
    var g = 3;
    for (var i2 = 0; i2 < g; i2++) {
      a0 += (ben / 2 + Math.random() * ben / 2) * randChoice([-1, 1]);
      nx += Math.cos(a0) * hei / g;
      ny -= Math.sin(a0) * hei / g;
      tlist.push([nx, ny]);
    }
    var ta = Math.atan2(tlist[tlist.length - 1][1], tlist[tlist.length - 1][0]);
    for (var i2 = 0; i2 < tlist.length; i2++) {
      var a2 = Math.atan2(tlist[i2][1], tlist[i2][0]);
      var d = Math.sqrt(tlist[i2][0] * tlist[i2][0] + tlist[i2][1] * tlist[i2][1]);
      tlist[i2][0] = d * Math.cos(a2 - ta + ang);
      tlist[i2][1] = d * Math.sin(a2 - ta + ang);
    }
    var trlist1 = [];
    var trlist2 = [];
    var span = det;
    var tl = (tlist.length - 1) * span;
    var lx = 0;
    var ly = 0;
    for (var i2 = 0; i2 < tl; i2 += 1) {
      var lastp = tlist[Math.floor(i2 / span)];
      var nextp = tlist[Math.ceil(i2 / span)];
      var p2 = i2 % span / span;
      var nx = lastp[0] * (1 - p2) + nextp[0] * p2;
      var ny = lastp[1] * (1 - p2) + nextp[1] * p2;
      var ang = Math.atan2(ny - ly, nx - lx);
      var woff = (Noise.noise(i2 * 0.3) - 0.5) * wid * hei / 80;
      var b = 0;
      if (p2 == 0) {
        b = Math.random() * wid;
      }
      var nw = wid * ((tl - i2) / tl * 0.5 + 0.5);
      trlist1.push([
        nx + Math.cos(ang + Math.PI / 2) * (nw + woff + b),
        ny + Math.sin(ang + Math.PI / 2) * (nw + woff + b)
      ]);
      trlist2.push([
        nx + Math.cos(ang - Math.PI / 2) * (nw - woff + b),
        ny + Math.sin(ang - Math.PI / 2) * (nw - woff + b)
      ]);
      lx = nx;
      ly = ny;
    }
    return [trlist1, trlist2];
  };
  var twig = function(tx, ty, dep, args) {
    var args = args != void 0 ? args : {};
    var dir = args.dir != void 0 ? args.dir : 1;
    var sca = args.sca != void 0 ? args.sca : 1;
    var wid = args.wid != void 0 ? args.wid : 1;
    var ang = args.ang != void 0 ? args.ang : 0;
    var lea = args.lea != void 0 ? args.lea : [true, 12];
    var canv = "";
    var twlist = [];
    var tl = 10;
    var hs = Math.random() * 0.5 + 0.5;
    var fun2 = function(x) {
      return -1 / Math.pow(i2 / tl + 1, 5) + 1;
    };
    var tfun = randChoice([fun2]);
    var a0 = Math.random() * Math.PI / 6 * dir + ang;
    for (var i2 = 0; i2 < tl; i2++) {
      var mx = dir * tfun(i2 / tl) * 50 * sca * hs;
      var my = -i2 * 5 * sca;
      var a2 = Math.atan2(my, mx);
      var d = Math.pow(mx * mx + my * my, 0.5);
      var nx = Math.cos(a2 + a0) * d;
      var ny = Math.sin(a2 + a0) * d;
      twlist.push([nx + tx, ny + ty]);
      if ((i2 == (tl / 3 | 0) || i2 == (tl * 2 / 3 | 0)) && dep > 0) {
        canv += twig(nx + tx, ny + ty, dep - 1, {
          ang,
          sca: sca * 0.8,
          wid,
          dir: dir * randChoice([-1, 1]),
          lea
        });
      }
      if (i2 == tl - 1 && lea[0] == true) {
        for (var j = 0; j < 5; j++) {
          var dj = (j - 2.5) * 5;
          canv += blob(nx + tx + Math.cos(ang) * dj * wid, ny + ty + (Math.sin(ang) * dj - lea[1] / (dep + 1)) * wid, {
            wid: (6 + 3 * Math.random()) * wid,
            len: (15 + 12 * Math.random()) * wid,
            ang: ang / 2 + Math.PI / 2 + Math.PI * 0.2 * (Math.random() - 0.5),
            col: "rgba(100,100,100," + (0.5 + dep * 0.2).toFixed(3) + ")",
            fun: function(x) {
              return x <= 1 ? Math.pow(Math.sin(x * Math.PI) * x, 0.5) : -Math.pow(Math.sin((x - 2) * Math.PI * (x - 2)), 0.5);
            }
          });
        }
      }
    }
    canv += stroke(twlist, {
      wid: 1,
      fun: function(x) {
        return Math.cos(x * Math.PI / 2);
      },
      col: "rgba(100,100,100,0.5)"
    });
    return canv;
  };
  var barkify = function(x, y, trlist) {
    function bark(x2, y2, wid, ang) {
      var len = 10 + 10 * Math.random();
      var noi = 0.5;
      var fun = function(x3) {
        return x3 <= 1 ? Math.pow(Math.sin(x3 * Math.PI), 0.5) : -Math.pow(Math.sin((x3 + 1) * Math.PI), 0.5);
      };
      var reso = 20;
      var canv2 = "";
      var lalist = [];
      for (var i3 = 0; i3 < reso + 1; i3++) {
        var p3 = i3 / reso * 2;
        var xo = len / 2 - Math.abs(p3 - 1) * len;
        var yo = fun(p3) * wid / 2;
        var a2 = Math.atan2(yo, xo);
        var l = Math.sqrt(xo * xo + yo * yo);
        lalist.push([l, a2]);
      }
      var nslist = [];
      var n0 = Math.random() * 10;
      for (var i3 = 0; i3 < reso + 1; i3++) {
        nslist.push(Noise.noise(i3 * 0.05, n0));
      }
      loopNoise(nslist);
      var brklist = [];
      for (var i3 = 0; i3 < lalist.length; i3++) {
        var ns = nslist[i3] * noi + (1 - noi);
        var nx2 = x2 + Math.cos(lalist[i3][1] + ang) * lalist[i3][0] * ns;
        var ny2 = y2 + Math.sin(lalist[i3][1] + ang) * lalist[i3][0] * ns;
        brklist.push([nx2, ny2]);
      }
      var fr = Math.random();
      canv2 += stroke(brklist, {
        wid: 0.8,
        noi: 0,
        col: "rgba(100,100,100,0.4)",
        out: 0,
        fun: function(x3) {
          return Math.sin((x3 + fr) * Math.PI * 3);
        }
      });
      return canv2;
    }
    var canv = "";
    for (var i2 = 2; i2 < trlist[0].length - 1; i2++) {
      var a0 = Math.atan2(trlist[0][i2][1] - trlist[0][i2 - 1][1], trlist[0][i2][0] - trlist[0][i2 - 1][0]);
      var a1 = Math.atan2(trlist[1][i2][1] - trlist[1][i2 - 1][1], trlist[1][i2][0] - trlist[1][i2 - 1][0]);
      var p2 = Math.random();
      var nx = trlist[0][i2][0] * (1 - p2) + trlist[1][i2][0] * p2;
      var ny = trlist[0][i2][1] * (1 - p2) + trlist[1][i2][1] * p2;
      if (Math.random() < 0.2) {
        canv += blob(nx + x, ny + y, {
          noi: 1,
          len: 15,
          wid: 6 - Math.abs(p2 - 0.5) * 10,
          ang: (a0 + a1) / 2,
          col: "rgba(100,100,100,0.6)"
        });
      } else {
        canv += bark(nx + x, ny + y, 5 - Math.abs(p2 - 0.5) * 10, (a0 + a1) / 2);
      }
      if (Math.random() < 0.05) {
        var jl = Math.random() * 2 + 2;
        var xya = randChoice([
          [trlist[0][i2][0], trlist[0][i2][1], a0],
          [trlist[1][i2][0], trlist[1][i2][1], a1]
        ]);
        for (var j = 0; j < jl; j++) {
          canv += blob(xya[0] + x + Math.cos(xya[2]) * (j - jl / 2) * 4, xya[1] + y + Math.sin(xya[2]) * (j - jl / 2) * 4, {
            wid: 4,
            len: 4 + 6 * Math.random(),
            ang: a0 + Math.PI / 2,
            col: "rgba(100,100,100,0.6)"
          });
        }
      }
    }
    var trflist = trlist[0].concat(trlist[1].slice().reverse());
    var rglist = [[]];
    for (var i2 = 0; i2 < trflist.length; i2++) {
      if (Math.random() < 0.5) {
        rglist.push([]);
      } else {
        rglist[rglist.length - 1].push(trflist[i2]);
      }
    }
    for (var i2 = 0; i2 < rglist.length; i2++) {
      rglist[i2] = div$1(rglist[i2], 4);
      for (var j = 0; j < rglist[i2].length; j++) {
        rglist[i2][j][0] += (Noise.noise(i2, j * 0.1, 1) - 0.5) * (15 + 5 * randGaussian());
        rglist[i2][j][1] += (Noise.noise(i2, j * 0.1, 2) - 0.5) * (15 + 5 * randGaussian());
      }
      canv += stroke(rglist[i2].map(function(v) {
        return [v[0] + x, v[1] + y];
      }), { wid: 1.5, col: "rgba(100,100,100,0.7)", out: 0 });
    }
    return canv;
  };
  this.tree04 = function(x, y, args) {
    var args = args != void 0 ? args : {};
    var hei = args.hei != void 0 ? args.hei : 300;
    var wid = args.wid != void 0 ? args.wid : 6;
    var col = args.col != void 0 ? args.col : "rgba(100,100,100,0.5)";
    args.noi != void 0 ? args.noi : 0.5;
    var canv = "";
    var txcanv = "";
    var twcanv = "";
    var trlist = branch({ hei, wid, ang: -Math.PI / 2 });
    txcanv += barkify(x, y, trlist);
    trlist = trlist[0].concat(trlist[1].reverse());
    var trmlist = [];
    for (var i2 = 0; i2 < trlist.length; i2++) {
      if (i2 >= trlist.length * 0.3 && i2 <= trlist.length * 0.7 && Math.random() < 0.1 || i2 == trlist.length / 2 - 1) {
        var ba = Math.PI * 0.2 - Math.PI * 1.4 * (i2 > trlist.length / 2);
        var brlist = branch({
          hei: hei * (Math.random() + 1) * 0.3,
          wid: wid * 0.5,
          ang: ba
        });
        brlist[0].splice(0, 1);
        brlist[1].splice(0, 1);
        var foff = function(v) {
          return [v[0] + trlist[i2][0], v[1] + trlist[i2][1]];
        };
        txcanv += barkify(x, y, [brlist[0].map(foff), brlist[1].map(foff)]);
        for (var j = 0; j < brlist[0].length; j++) {
          if (Math.random() < 0.2 || j == brlist[0].length - 1) {
            twcanv += twig(brlist[0][j][0] + trlist[i2][0] + x, brlist[0][j][1] + trlist[i2][1] + y, 1, {
              wid: hei / 300,
              ang: ba > -Math.PI / 2 ? ba : ba + Math.PI,
              sca: 0.5 * hei / 300,
              dir: ba > -Math.PI / 2 ? 1 : -1
            });
          }
        }
        brlist = brlist[0].concat(brlist[1].reverse());
        trmlist = trmlist.concat(brlist.map(function(v) {
          return [v[0] + trlist[i2][0], v[1] + trlist[i2][1]];
        }));
      } else {
        trmlist.push(trlist[i2]);
      }
    }
    canv += poly(trmlist, { xof: x, yof: y, fil: "white", str: col, wid: 0 });
    trmlist.splice(0, 1);
    trmlist.splice(trmlist.length - 1, 1);
    canv += stroke(trmlist.map(function(v) {
      return [v[0] + x, v[1] + y];
    }), {
      col: "rgba(100,100,100," + (0.4 + Math.random() * 0.1).toFixed(3) + ")",
      wid: 2.5,
      fun: function(x2) {
        return Math.sin(1);
      },
      noi: 0.9,
      out: 0
    });
    canv += txcanv;
    canv += twcanv;
    return canv;
  };
  this.tree05 = function(x, y, args) {
    var args = args != void 0 ? args : {};
    var hei = args.hei != void 0 ? args.hei : 300;
    var wid = args.wid != void 0 ? args.wid : 5;
    var col = args.col != void 0 ? args.col : "rgba(100,100,100,0.5)";
    args.noi != void 0 ? args.noi : 0.5;
    var canv = "";
    var txcanv = "";
    var twcanv = "";
    var trlist = branch({ hei, wid, ang: -Math.PI / 2, ben: 0 });
    txcanv += barkify(x, y, trlist);
    trlist = trlist[0].concat(trlist[1].reverse());
    var trmlist = [];
    for (var i2 = 0; i2 < trlist.length; i2++) {
      var p2 = Math.abs(i2 - trlist.length * 0.5) / (trlist.length * 0.5);
      if (i2 >= trlist.length * 0.2 && i2 <= trlist.length * 0.8 && i2 % 3 == 0 && Math.random() > p2 || i2 == trlist.length / 2 - 1) {
        var bar = Math.random() * 0.2;
        var ba = -bar * Math.PI - (1 - bar * 2) * Math.PI * (i2 > trlist.length / 2);
        var brlist = branch({
          hei: hei * (0.3 * p2 - Math.random() * 0.05),
          wid: wid * 0.5,
          ang: ba,
          ben: 0.5
        });
        brlist[0].splice(0, 1);
        brlist[1].splice(0, 1);
        for (var j = 0; j < brlist[0].length; j++) {
          if (j % 20 == 0 || j == brlist[0].length - 1) {
            twcanv += twig(brlist[0][j][0] + trlist[i2][0] + x, brlist[0][j][1] + trlist[i2][1] + y, 0, {
              wid: hei / 300,
              ang: ba > -Math.PI / 2 ? ba : ba + Math.PI,
              sca: 0.2 * hei / 300,
              dir: ba > -Math.PI / 2 ? 1 : -1,
              lea: [true, 5]
            });
          }
        }
        brlist = brlist[0].concat(brlist[1].reverse());
        trmlist = trmlist.concat(brlist.map(function(v) {
          return [v[0] + trlist[i2][0], v[1] + trlist[i2][1]];
        }));
      } else {
        trmlist.push(trlist[i2]);
      }
    }
    canv += poly(trmlist, { xof: x, yof: y, fil: "white", str: col, wid: 0 });
    trmlist.splice(0, 1);
    trmlist.splice(trmlist.length - 1, 1);
    canv += stroke(trmlist.map(function(v) {
      return [v[0] + x, v[1] + y];
    }), {
      col: "rgba(100,100,100," + (0.4 + Math.random() * 0.1).toFixed(3) + ")",
      wid: 2.5,
      fun: function(x2) {
        return Math.sin(1);
      },
      noi: 0.9,
      out: 0
    });
    canv += txcanv;
    canv += twcanv;
    return canv;
  };
  this.tree06 = function(x, y, args) {
    var args = args != void 0 ? args : {};
    var hei = args.hei != void 0 ? args.hei : 100;
    var wid = args.wid != void 0 ? args.wid : 6;
    var col = args.col != void 0 ? args.col : "rgba(100,100,100,0.5)";
    args.noi != void 0 ? args.noi : 0.5;
    var canv = "";
    var txcanv = "";
    var twcanv = "";
    function fracTree(xoff, yoff, dep, args2) {
      var args2 = args2 != void 0 ? args2 : {};
      var hei2 = args2.hei != void 0 ? args2.hei : 300;
      var wid2 = args2.wid != void 0 ? args2.wid : 5;
      var ang = args2.ang != void 0 ? args2.ang : 0;
      var ben = args2.ben != void 0 ? args2.ben : Math.PI * 0.2;
      var trlist = branch({
        hei: hei2,
        wid: wid2,
        ang,
        ben,
        det: hei2 / 20
      });
      txcanv += barkify(xoff, yoff, trlist);
      trlist = trlist[0].concat(trlist[1].reverse());
      var trmlist2 = [];
      for (var i2 = 0; i2 < trlist.length; i2++) {
        Math.abs(i2 - trlist.length * 0.5) / (trlist.length * 0.5);
        if ((Math.random() < 0.025 && i2 >= trlist.length * 0.2 && i2 <= trlist.length * 0.8 || i2 == (trlist.length / 2 | 0) - 1 || i2 == (trlist.length / 2 | 0) + 1) && dep > 0) {
          var bar = 0.02 + Math.random() * 0.08;
          var ba = bar * Math.PI - bar * 2 * Math.PI * (i2 > trlist.length / 2);
          var brlist = fracTree(trlist[i2][0] + xoff, trlist[i2][1] + yoff, dep - 1, {
            hei: hei2 * (0.7 + Math.random() * 0.2),
            wid: wid2 * 0.6,
            ang: ang + ba,
            ben: 0.55
          });
          for (var j = 0; j < brlist.length; j++) {
            if (Math.random() < 0.03) {
              twcanv += twig(brlist[j][0] + trlist[i2][0] + xoff, brlist[j][1] + trlist[i2][1] + yoff, 2, {
                ang: ba * (Math.random() * 0.5 + 0.75),
                sca: 0.3,
                dir: ba > 0 ? 1 : -1,
                lea: [false, 0]
              });
            }
          }
          trmlist2 = trmlist2.concat(brlist.map(function(v) {
            return [v[0] + trlist[i2][0], v[1] + trlist[i2][1]];
          }));
        } else {
          trmlist2.push(trlist[i2]);
        }
      }
      return trmlist2;
    }
    var trmlist = fracTree(x, y, 3, {
      hei,
      wid,
      ang: -Math.PI / 2,
      ben: 0
    });
    canv += poly(trmlist, { xof: x, yof: y, fil: "white", str: col, wid: 0 });
    trmlist.splice(0, 1);
    trmlist.splice(trmlist.length - 1, 1);
    canv += stroke(trmlist.map(function(v) {
      return [v[0] + x, v[1] + y];
    }), {
      col: "rgba(100,100,100," + (0.4 + Math.random() * 0.1).toFixed(3) + ")",
      wid: 2.5,
      fun: function(x2) {
        return Math.sin(1);
      },
      noi: 0.9,
      out: 0
    });
    canv += txcanv;
    canv += twcanv;
    return canv;
  };
  this.tree07 = function(x, y, args) {
    var args = args != void 0 ? args : {};
    var hei = args.hei != void 0 ? args.hei : 60;
    var wid = args.wid != void 0 ? args.wid : 4;
    var ben = args.ben != void 0 ? args.ben : function(x2) {
      return Math.sqrt(x2) * 0.2;
    };
    var col = args.col != void 0 ? args.col : "rgba(100,100,100,1)";
    args.noi != void 0 ? args.noi : 0.5;
    let reso = 10;
    var nslist = [];
    for (var i2 = 0; i2 < reso; i2++) {
      nslist.push([Noise.noise(i2 * 0.5), Noise.noise(i2 * 0.5, 0.5)]);
    }
    var leafcol;
    if (col.includes("rgba(")) {
      leafcol = col.replace("rgba(", "").replace(")", "").split(",");
    } else {
      leafcol = ["100", "100", "100", "1"];
    }
    var canv = "";
    var line1 = [];
    var line2 = [];
    var T = [];
    for (var i2 = 0; i2 < reso; i2++) {
      var nx = x + ben(i2 / reso) * 100;
      var ny = y - i2 * hei / reso;
      if (i2 >= reso / 4) {
        for (var j = 0; j < 1; j++) {
          var bpl = blob(nx + (Math.random() - 0.5) * wid * 1.2 * (reso - i2) * 0.5, ny + (Math.random() - 0.5) * wid * 0.5, {
            len: Math.random() * 50 + 20,
            wid: Math.random() * 12 + 12,
            ang: -Math.random() * Math.PI / 6,
            col: "rgba(" + leafcol[0] + "," + leafcol[1] + "," + leafcol[2] + "," + parseFloat(leafcol[3]).toFixed(3) + ")",
            fun: function(x2) {
              return x2 <= 1 ? 2.75 * x2 * Math.pow(1 - x2, 1 / 1.8) : 2.75 * (x2 - 2) * Math.pow(x2 - 1, 1 / 1.8);
            },
            ret: 1
          });
          T = T.concat(PolyTools.triangulate(bpl, {
            area: 50,
            convex: true,
            optimize: false
          }));
        }
      }
      line1.push([nx + (nslist[i2][0] - 0.5) * wid - wid / 2, ny]);
      line2.push([nx + (nslist[i2][1] - 0.5) * wid + wid / 2, ny]);
    }
    T = PolyTools.triangulate(line1.concat(line2.reverse()), {
      area: 50,
      convex: true,
      optimize: true
    }).concat(T);
    for (var k = 0; k < T.length; k++) {
      var m = PolyTools.midPt(T[k]);
      var c = Noise.noise(m[0] * 0.02, m[1] * 0.02) * 200 + 50 | 0;
      var co = "rgba(" + c + "," + c + "," + c + ",0.8)";
      canv += poly(T[k], { fil: co, str: co, wid: 0 });
    }
    return canv;
  };
  this.tree08 = function(x, y, args) {
    var args = args != void 0 ? args : {};
    var hei = args.hei != void 0 ? args.hei : 80;
    var wid = args.wid != void 0 ? args.wid : 1;
    var col = args.col != void 0 ? args.col : "rgba(100,100,100,0.5)";
    args.noi != void 0 ? args.noi : 0.5;
    var canv = "";
    var txcanv = "";
    var twcanv = "";
    var ang = normRand(-1, 1) * Math.PI * 0.2;
    var trlist = branch({
      hei,
      wid,
      ang: -Math.PI / 2 + ang,
      ben: Math.PI * 0.2,
      det: hei / 20
    });
    trlist = trlist[0].concat(trlist[1].reverse());
    function fracTree(xoff, yoff, dep, args2) {
      var args2 = args2 != void 0 ? args2 : {};
      var ang2 = args2.ang != void 0 ? args2.ang : -Math.PI / 2;
      var len = args2.len != void 0 ? args2.len : 15;
      var ben = args2.ben != void 0 ? args2.ben : 0;
      var fun = dep == 0 ? function(x2) {
        return Math.cos(0.5 * Math.PI * x2);
      } : function(x2) {
        return 1;
      };
      var spt = [xoff, yoff];
      var ept = [xoff + Math.cos(ang2) * len, yoff + Math.sin(ang2) * len];
      var trmlist = [
        [xoff, yoff],
        [xoff + len, yoff]
      ];
      var bfun = randChoice([
        function(x2) {
          return Math.sin(x2 * Math.PI);
        },
        function(x2) {
          return -Math.sin(x2 * Math.PI);
        }
      ]);
      trmlist = div$1(trmlist, 10);
      for (var i3 = 0; i3 < trmlist.length; i3++) {
        trmlist[i3][1] += bfun(i3 / trmlist.length) * 2;
      }
      for (var i3 = 0; i3 < trmlist.length; i3++) {
        var d = distance(trmlist[i3], spt);
        var a2 = Math.atan2(trmlist[i3][1] - spt[1], trmlist[i3][0] - spt[0]);
        trmlist[i3][0] = spt[0] + d * Math.cos(a2 + ang2);
        trmlist[i3][1] = spt[1] + d * Math.sin(a2 + ang2);
      }
      var tcanv = "";
      tcanv += stroke(trmlist, {
        fun,
        wid: 0.8,
        col: "rgba(100,100,100,0.5)"
      });
      if (dep != 0) {
        var nben = ben + randChoice([-1, 1]) * Math.PI * 1e-3 * dep * dep;
        if (Math.random() < 0.5) {
          tcanv += fracTree(ept[0], ept[1], dep - 1, {
            ang: ang2 + ben + Math.PI * randChoice([normRand(-1, 0.5), normRand(0.5, 1)]) * 0.2,
            len: len * normRand(0.8, 0.9),
            ben: nben
          });
          tcanv += fracTree(ept[0], ept[1], dep - 1, {
            ang: ang2 + ben + Math.PI * randChoice([normRand(-1, -0.5), normRand(0.5, 1)]) * 0.2,
            len: len * normRand(0.8, 0.9),
            ben: nben
          });
        } else {
          tcanv += fracTree(ept[0], ept[1], dep - 1, {
            ang: ang2 + ben,
            len: len * normRand(0.8, 0.9),
            ben: nben
          });
        }
      }
      return tcanv;
    }
    for (var i2 = 0; i2 < trlist.length; i2++) {
      if (Math.random() < 0.2) {
        twcanv += fracTree(x + trlist[i2][0], y + trlist[i2][1], Math.floor(4 * Math.random()), { hei: 20, ang: -Math.PI / 2 - ang * Math.random() });
      } else if (i2 == Math.floor(trlist.length / 2)) {
        twcanv += fracTree(x + trlist[i2][0], y + trlist[i2][1], 3, {
          hei: 25,
          ang: -Math.PI / 2 + ang
        });
      }
    }
    canv += poly(trlist, { xof: x, yof: y, fil: "white", str: col, wid: 0 });
    canv += stroke(trlist.map(function(v) {
      return [v[0] + x, v[1] + y];
    }), {
      col: "rgba(100,100,100," + (0.6 + Math.random() * 0.1).toFixed(3) + ")",
      wid: 2.5,
      fun: function(x2) {
        return Math.sin(1);
      },
      noi: 0.9,
      out: 0
    });
    canv += txcanv;
    canv += twcanv;
    return canv;
  };
}();
var Mount = new function() {
  var foot = function(ptlist, args) {
    var args = args != void 0 ? args : {};
    var xof = args.xof != void 0 ? args.xof : 0;
    var yof = args.yof != void 0 ? args.yof : 0;
    var ret = args.ret != void 0 ? args.ret : 0;
    var ftlist = [];
    var span = 10;
    var ni = 0;
    for (var i2 = 0; i2 < ptlist.length - 2; i2 += 1) {
      if (i2 == ni) {
        ni = Math.min(ni + randChoice([1, 2]), ptlist.length - 1);
        ftlist.push([]);
        ftlist.push([]);
        for (var j = 0; j < Math.min(ptlist[i2].length / 8, 10); j++) {
          ftlist[ftlist.length - 2].push([
            ptlist[i2][j][0] + Noise.noise(j * 0.1, i2) * 10,
            ptlist[i2][j][1]
          ]);
          ftlist[ftlist.length - 1].push([
            ptlist[i2][ptlist[i2].length - 1 - j][0] - Noise.noise(j * 0.1, i2) * 10,
            ptlist[i2][ptlist[i2].length - 1 - j][1]
          ]);
        }
        ftlist[ftlist.length - 2] = ftlist[ftlist.length - 2].reverse();
        ftlist[ftlist.length - 1] = ftlist[ftlist.length - 1].reverse();
        for (var j = 0; j < span; j++) {
          var p2 = j / span;
          var x1 = ptlist[i2][0][0] * (1 - p2) + ptlist[ni][0][0] * p2;
          var y1 = ptlist[i2][0][1] * (1 - p2) + ptlist[ni][0][1] * p2;
          var x2 = ptlist[i2][ptlist[i2].length - 1][0] * (1 - p2) + ptlist[ni][ptlist[i2].length - 1][0] * p2;
          var y2 = ptlist[i2][ptlist[i2].length - 1][1] * (1 - p2) + ptlist[ni][ptlist[i2].length - 1][1] * p2;
          var vib = -1.7 * (p2 - 1) * Math.pow(p2, 1 / 5);
          y1 += vib * 5 + Noise.noise(xof * 0.05, i2) * 5;
          y2 += vib * 5 + Noise.noise(xof * 0.05, i2) * 5;
          ftlist[ftlist.length - 2].push([x1, y1]);
          ftlist[ftlist.length - 1].push([x2, y2]);
        }
      }
    }
    var canv = "";
    for (var i2 = 0; i2 < ftlist.length; i2++) {
      canv += poly(ftlist[i2], {
        xof,
        yof,
        fil: "white",
        str: "none"
      });
    }
    for (var j = 0; j < ftlist.length; j++) {
      canv += stroke(ftlist[j].map(function(x) {
        return [x[0] + xof, x[1] + yof];
      }), {
        col: "rgba(100,100,100," + (0.1 + Math.random() * 0.1).toFixed(3) + ")",
        wid: 1
      });
    }
    return ret ? ftlist : canv;
  };
  this.mountain = function(xoff, yoff, seed, args) {
    var args = args != void 0 ? args : {};
    var hei = args.hei != void 0 ? args.hei : 100 + Math.random() * 400;
    var wid = args.wid != void 0 ? args.wid : 400 + Math.random() * 200;
    var tex = args.tex != void 0 ? args.tex : 200;
    var veg = args.veg != void 0 ? args.veg : true;
    var ret = args.ret != void 0 ? args.ret : 0;
    var col = args.col != void 0 ? args.col : void 0;
    seed = seed != void 0 ? seed : 0;
    var canv = "";
    var ptlist = [];
    var h2 = hei;
    var w = wid;
    var reso = [10, 50];
    var hoff = 0;
    for (var j = 0; j < reso[0]; j++) {
      hoff += Math.random() * yoff / 100;
      ptlist.push([]);
      for (var i2 = 0; i2 < reso[1]; i2++) {
        var x = (i2 / reso[1] - 0.5) * Math.PI;
        var y = Math.cos(x);
        y *= Noise.noise(x + 10, j * 0.15, seed);
        var p2 = 1 - j / reso[0];
        ptlist[ptlist.length - 1].push([x / Math.PI * w * p2, -y * h2 * p2 + hoff]);
      }
    }
    function vegetate(treeFunc, growthRule, proofRule) {
      var veglist = [];
      for (var i3 = 0; i3 < ptlist.length; i3 += 1) {
        for (var j2 = 0; j2 < ptlist[i3].length; j2 += 1) {
          if (growthRule(i3, j2)) {
            veglist.push([ptlist[i3][j2][0], ptlist[i3][j2][1]]);
          }
        }
      }
      for (var i3 = 0; i3 < veglist.length; i3++) {
        if (proofRule(veglist, i3)) {
          canv += treeFunc(veglist[i3][0], veglist[i3][1]);
        }
      }
    }
    vegetate(function(x2, y2) {
      return Tree.tree02(x2 + xoff, y2 + yoff - 5, {
        col: "rgba(100,100,100," + (Noise.noise(0.01 * x2, 0.01 * y2) * 0.5 * 0.3 + 0.5).toFixed(3) + ")",
        clu: 2
      });
    }, function(i3, j2) {
      var ns = Noise.noise(j2 * 0.1, seed);
      return i3 == 0 && ns * ns * ns < 0.1 && Math.abs(ptlist[i3][j2][1]) / h2 > 0.2;
    }, function(veglist, i3) {
      return true;
    });
    canv += poly(ptlist[0].concat([[0, reso[0] * 4]]), {
      xof: xoff,
      yof: yoff,
      fil: "white",
      str: "none"
    });
    canv += stroke(ptlist[0].map(function(x2) {
      return [x2[0] + xoff, x2[1] + yoff];
    }), { col: "rgba(100,100,100,0.3)", noi: 1, wid: 3 });
    canv += foot(ptlist, { xof: xoff, yof: yoff });
    canv += texture(ptlist, {
      xof: xoff,
      yof: yoff,
      tex,
      sha: randChoice([0, 0, 0, 0, 5]),
      col
    });
    vegetate(function(x2, y2) {
      return Tree.tree02(x2 + xoff, y2 + yoff, {
        col: "rgba(100,100,100," + (Noise.noise(0.01 * x2, 0.01 * y2) * 0.5 * 0.3 + 0.5).toFixed(3) + ")"
      });
    }, function(i3, j2) {
      var ns = Noise.noise(i3 * 0.1, j2 * 0.1, seed + 2);
      return ns * ns * ns < 0.1 && Math.abs(ptlist[i3][j2][1]) / h2 > 0.5;
    }, function(veglist, i3) {
      return true;
    });
    if (veg) {
      vegetate(function(x2, y2) {
        var ht = (h2 + y2) / h2 * 70;
        ht = ht * 0.3 + Math.random() * ht * 0.7;
        return Tree.tree01(x2 + xoff, y2 + yoff, {
          hei: ht,
          wid: Math.random() * 3 + 1,
          col: "rgba(100,100,100," + (Noise.noise(0.01 * x2, 0.01 * y2) * 0.5 * 0.3 + 0.3).toFixed(3) + ")"
        });
      }, function(i3, j2) {
        var ns = Noise.noise(i3 * 0.2, j2 * 0.05, seed);
        return j2 % 2 && ns * ns * ns * ns < 0.012 && Math.abs(ptlist[i3][j2][1]) / h2 < 0.3;
      }, function(veglist, i3) {
        var counter = 0;
        for (var j2 = 0; j2 < veglist.length; j2++) {
          if (i3 != j2 && Math.pow(veglist[i3][0] - veglist[j2][0], 2) + Math.pow(veglist[i3][1] - veglist[j2][1], 2) < 30 * 30) {
            counter++;
          }
          if (counter > 2) {
            return true;
          }
        }
        return false;
      });
      vegetate(function(x2, y2) {
        var ht = (h2 + y2) / h2 * 120;
        ht = ht * 0.5 + Math.random() * ht * 0.5;
        var bc = Math.random() * 0.1;
        var bp = 1;
        return Tree.tree03(x2 + xoff, y2 + yoff, {
          hei: ht,
          ben: function(x3) {
            return Math.pow(x3 * bc, bp);
          },
          col: "rgba(100,100,100," + (Noise.noise(0.01 * x2, 0.01 * y2) * 0.5 * 0.3 + 0.3).toFixed(3) + ")"
        });
      }, function(i3, j2) {
        var ns = Noise.noise(i3 * 0.2, j2 * 0.05, seed);
        return (j2 == 0 || j2 == ptlist[i3].length - 1) && ns * ns * ns * ns < 0.012;
      }, function(veglist, i3) {
        return true;
      });
    }
    vegetate(function(x2, y2) {
      var tt = randChoice([0, 0, 1, 1, 1, 2]);
      if (tt == 1) {
        return Arch.arch02(x2 + xoff, y2 + yoff, seed, {
          wid: normRand(40, 70),
          sto: randChoice([1, 2, 2, 3]),
          rot: Math.random(),
          sty: randChoice([1, 2, 3])
        });
      } else if (tt == 2) {
        return Arch.arch04(x2 + xoff, y2 + yoff, seed, {
          sto: randChoice([1, 1, 1, 2, 2])
        });
      } else {
        return "";
      }
    }, function(i3, j2) {
      var ns = Noise.noise(i3 * 0.2, j2 * 0.05, seed + 10);
      return i3 != 0 && (j2 == 1 || j2 == ptlist[i3].length - 2) && ns * ns * ns * ns < 8e-3;
    }, function(veglist, i3) {
      return true;
    });
    vegetate(function(x2, y2) {
      return Arch.arch03(x2 + xoff, y2 + yoff, seed, {
        sto: randChoice([5, 7]),
        wid: 40 + Math.random() * 20
      });
    }, function(i3, j2) {
      return i3 == 1 && Math.abs(j2 - ptlist[i3].length / 2) < 1 && Math.random() < 0.02;
    }, function(veglist, i3) {
      return true;
    });
    vegetate(function(x2, y2) {
      return Arch.transmissionTower01(x2 + xoff, y2 + yoff, seed);
    }, function(i3, j2) {
      var ns = Noise.noise(i3 * 0.2, j2 * 0.05, seed + 20 * Math.PI);
      return i3 % 2 == 0 && (j2 == 1 || j2 == ptlist[i3].length - 2) && ns * ns * ns * ns < 2e-3;
    }, function(veglist, i3) {
      return true;
    });
    vegetate(function(x2, y2) {
      return Mount.rock(x2 + xoff, y2 + yoff, seed, {
        wid: 20 + Math.random() * 20,
        hei: 20 + Math.random() * 20,
        sha: 2
      });
    }, function(i3, j2) {
      return (j2 == 0 || j2 == ptlist[i3].length - 1) && Math.random() < 0.1;
    }, function(veglist, i3) {
      return true;
    });
    if (ret == 0) {
      return canv;
    } else {
      return [ptlist];
    }
  };
  this.flatMount = function(xoff, yoff, seed, args) {
    var args = args != void 0 ? args : {};
    var hei = args.hei != void 0 ? args.hei : 40 + Math.random() * 400;
    var wid = args.wid != void 0 ? args.wid : 400 + Math.random() * 200;
    var tex = args.tex != void 0 ? args.tex : 80;
    var cho = args.cho != void 0 ? args.cho : 0.5;
    args.ret != void 0 ? args.ret : 0;
    seed = seed != void 0 ? seed : 0;
    var canv = "";
    var ptlist = [];
    var reso = [5, 50];
    var hoff = 0;
    var flat = [];
    for (var j = 0; j < reso[0]; j++) {
      hoff += Math.random() * yoff / 100;
      ptlist.push([]);
      flat.push([]);
      for (var i2 = 0; i2 < reso[1]; i2++) {
        var x = (i2 / reso[1] - 0.5) * Math.PI;
        var y = Math.cos(x * 2) + 1;
        y *= Noise.noise(x + 10, j * 0.1, seed);
        var p2 = 1 - j / reso[0] * 0.6;
        var nx = x / Math.PI * wid * p2;
        var ny = -y * hei * p2 + hoff;
        var h2 = 100;
        if (ny < -h2 * cho + hoff) {
          ny = -h2 * cho + hoff;
          if (flat[flat.length - 1].length % 2 == 0) {
            flat[flat.length - 1].push([nx, ny]);
          }
        } else {
          if (flat[flat.length - 1].length % 2 == 1) {
            flat[flat.length - 1].push(ptlist[ptlist.length - 1][ptlist[ptlist.length - 1].length - 1]);
          }
        }
        ptlist[ptlist.length - 1].push([nx, ny]);
      }
    }
    canv += poly(ptlist[0].concat([[0, reso[0] * 4]]), {
      xof: xoff,
      yof: yoff,
      fil: "white",
      str: "none"
    });
    canv += stroke(ptlist[0].map(function(x2) {
      return [x2[0] + xoff, x2[1] + yoff];
    }), { col: "rgba(100,100,100,0.3)", noi: 1, wid: 3 });
    canv += texture(ptlist, {
      xof: xoff,
      yof: yoff,
      tex,
      wid: 2,
      dis: function() {
        if (Math.random() > 0.5) {
          return 0.1 + 0.4 * Math.random();
        } else {
          return 0.9 - 0.4 * Math.random();
        }
      }
    });
    var grlist1 = [];
    var grlist2 = [];
    for (var i2 = 0; i2 < flat.length; i2 += 2) {
      if (flat[i2].length >= 2) {
        grlist1.push(flat[i2][0]);
        grlist2.push(flat[i2][flat[i2].length - 1]);
      }
    }
    if (grlist1.length == 0) {
      return canv;
    }
    var wb = [grlist1[0][0], grlist2[0][0]];
    for (var i2 = 0; i2 < 3; i2++) {
      var p2 = 0.8 - i2 * 0.2;
      grlist1.unshift([wb[0] * p2, grlist1[0][1] - 5]);
      grlist2.unshift([wb[1] * p2, grlist2[0][1] - 5]);
    }
    wb = [grlist1[grlist1.length - 1][0], grlist2[grlist2.length - 1][0]];
    for (var i2 = 0; i2 < 3; i2++) {
      var p2 = 0.6 - i2 * i2 * 0.1;
      grlist1.push([wb[0] * p2, grlist1[grlist1.length - 1][1] + 1]);
      grlist2.push([wb[1] * p2, grlist2[grlist2.length - 1][1] + 1]);
    }
    var d = 5;
    grlist1 = div$1(grlist1, d);
    grlist2 = div$1(grlist2, d);
    var grlist = grlist1.reverse().concat(grlist2.concat([grlist1[0]]));
    for (var i2 = 0; i2 < grlist.length; i2++) {
      var v = (1 - Math.abs(i2 % d - d / 2) / (d / 2)) * 0.12;
      grlist[i2][0] *= 1 - v + Noise.noise(grlist[i2][1] * 0.5) * v;
    }
    canv += poly(grlist, {
      xof: xoff,
      yof: yoff,
      str: "none",
      fil: "white",
      wid: 2
    });
    canv += stroke(grlist.map((x2) => [x2[0] + xoff, x2[1] + yoff]), {
      wid: 3,
      col: "rgba(100,100,100,0.2)"
    });
    var bound = function(plist) {
      var xmin;
      var xmax;
      var ymin;
      var ymax;
      for (var i3 = 0; i3 < plist.length; i3++) {
        if (xmin == void 0 || plist[i3][0] < xmin) {
          xmin = plist[i3][0];
        }
        if (xmax == void 0 || plist[i3][0] > xmax) {
          xmax = plist[i3][0];
        }
        if (ymin == void 0 || plist[i3][1] < ymin) {
          ymin = plist[i3][1];
        }
        if (ymax == void 0 || plist[i3][1] > ymax) {
          ymax = plist[i3][1];
        }
      }
      return { xmin, xmax, ymin, ymax };
    };
    canv += this.flatDec(xoff, yoff, bound(grlist));
    return canv;
  };
  this.flatDec = function(xoff, yoff, grbd) {
    var canv = "";
    var tt = randChoice([0, 0, 1, 2, 3, 4]);
    for (var j = 0; j < Math.random() * 5; j++) {
      canv += Mount.rock(xoff + normRand(grbd.xmin, grbd.xmax), yoff + (grbd.ymin + grbd.ymax) / 2 + normRand(-10, 10) + 10, Math.random() * 100, {
        wid: 10 + Math.random() * 20,
        hei: 10 + Math.random() * 20,
        sha: 2
      });
    }
    for (var j = 0; j < randChoice([0, 0, 1, 2]); j++) {
      var xr = xoff + normRand(grbd.xmin, grbd.xmax);
      var yr = yoff + (grbd.ymin + grbd.ymax) / 2 + normRand(-5, 5) + 20;
      for (var k = 0; k < 2 + Math.random() * 3; k++) {
        canv += Tree.tree08(xr + Math.min(Math.max(normRand(-30, 30), grbd.xmin), grbd.xmax), yr, { hei: 60 + Math.random() * 40 });
      }
    }
    if (tt == 0) {
      for (var j = 0; j < Math.random() * 3; j++) {
        canv += Mount.rock(xoff + normRand(grbd.xmin, grbd.xmax), yoff + (grbd.ymin + grbd.ymax) / 2 + normRand(-5, 5) + 20, Math.random() * 100, {
          wid: 50 + Math.random() * 20,
          hei: 40 + Math.random() * 20,
          sha: 5
        });
      }
    }
    if (tt == 1) {
      var pmin = Math.random() * 0.5;
      var pmax = Math.random() * 0.5 + 0.5;
      var xmin = grbd.xmin * (1 - pmin) + grbd.xmax * pmin;
      var xmax = grbd.xmin * (1 - pmax) + grbd.xmax * pmax;
      for (var i2 = xmin; i2 < xmax; i2 += 30) {
        canv += Tree.tree05(xoff + i2 + 20 * normRand(-1, 1), yoff + (grbd.ymin + grbd.ymax) / 2 + 20, { hei: 100 + Math.random() * 200 });
      }
      for (var j = 0; j < Math.random() * 4; j++) {
        canv += Mount.rock(xoff + normRand(grbd.xmin, grbd.xmax), yoff + (grbd.ymin + grbd.ymax) / 2 + normRand(-5, 5) + 20, Math.random() * 100, {
          wid: 50 + Math.random() * 20,
          hei: 40 + Math.random() * 20,
          sha: 5
        });
      }
    } else if (tt == 2) {
      for (var i2 = 0; i2 < randChoice([1, 1, 1, 1, 2, 2, 3]); i2++) {
        var xr = normRand(grbd.xmin, grbd.xmax);
        var yr = (grbd.ymin + grbd.ymax) / 2;
        canv += Tree.tree04(xoff + xr, yoff + yr + 20, {});
        for (var j = 0; j < Math.random() * 2; j++) {
          canv += Mount.rock(xoff + Math.max(grbd.xmin, Math.min(grbd.xmax, xr + normRand(-50, 50))), yoff + yr + normRand(-5, 5) + 20, j * i2 * Math.random() * 100, {
            wid: 50 + Math.random() * 20,
            hei: 40 + Math.random() * 20,
            sha: 5
          });
        }
      }
    } else if (tt == 3) {
      for (var i2 = 0; i2 < randChoice([1, 1, 1, 1, 2, 2, 3]); i2++) {
        canv += Tree.tree06(xoff + normRand(grbd.xmin, grbd.xmax), yoff + (grbd.ymin + grbd.ymax) / 2, { hei: 60 + Math.random() * 60 });
      }
    } else if (tt == 4) {
      var pmin = Math.random() * 0.5;
      var pmax = Math.random() * 0.5 + 0.5;
      var xmin = grbd.xmin * (1 - pmin) + grbd.xmax * pmin;
      var xmax = grbd.xmin * (1 - pmax) + grbd.xmax * pmax;
      for (var i2 = xmin; i2 < xmax; i2 += 20) {
        canv += Tree.tree07(xoff + i2 + 20 * normRand(-1, 1), yoff + (grbd.ymin + grbd.ymax) / 2 + normRand(-1, 1) + 0, { hei: normRand(40, 80) });
      }
    }
    for (var i2 = 0; i2 < 50 * Math.random(); i2++) {
      canv += Tree.tree02(xoff + normRand(grbd.xmin, grbd.xmax), yoff + normRand(grbd.ymin, grbd.ymax));
    }
    var ts = randChoice([0, 0, 0, 0, 1]);
    if (ts == 1 && tt != 4) {
      canv += Arch.arch01(xoff + normRand(grbd.xmin, grbd.xmax), yoff + (grbd.ymin + grbd.ymax) / 2 + 20, Math.random(), {
        wid: normRand(160, 200),
        hei: normRand(80, 100),
        per: Math.random()
      });
    }
    return canv;
  };
  this.distMount = function(xoff, yoff, seed, args) {
    var args = args != void 0 ? args : {};
    var hei = args.hei != void 0 ? args.hei : 300;
    var len = args.len != void 0 ? args.len : 2e3;
    var seg = args.seg != void 0 ? args.seg : 5;
    seed = seed != void 0 ? seed : 0;
    var canv = "";
    var span = 10;
    var ptlist = [];
    for (var i2 = 0; i2 < len / span / seg; i2++) {
      ptlist.push([]);
      for (var j = 0; j < seg + 1; j++) {
        var tran = function(k2) {
          return [
            xoff + k2 * span,
            yoff - hei * Noise.noise(k2 * 0.05, seed) * Math.pow(Math.sin(Math.PI * k2 / (len / span)), 0.5)
          ];
        };
        ptlist[ptlist.length - 1].push(tran(i2 * seg + j));
      }
      for (var j = 0; j < seg / 2 + 1; j++) {
        var tran = function(k2) {
          return [
            xoff + k2 * span,
            yoff + 24 * Noise.noise(k2 * 0.05, 2, seed) * Math.pow(Math.sin(Math.PI * k2 / (len / span)), 1)
          ];
        };
        ptlist[ptlist.length - 1].unshift(tran(i2 * seg + j * 2));
      }
    }
    for (var i2 = 0; i2 < ptlist.length; i2++) {
      var getCol = function(x, y) {
        var c = Noise.noise(x * 0.02, y * 0.02, yoff) * 55 + 200 | 0;
        return "rgb(" + c + "," + c + "," + c + ")";
      };
      canv += poly(ptlist[i2], {
        fil: getCol(...ptlist[i2][ptlist[i2].length - 1]),
        str: "none",
        wid: 1
      });
      var T = PolyTools.triangulate(ptlist[i2], {
        area: 100,
        convex: true,
        optimize: false
      });
      for (var k = 0; k < T.length; k++) {
        var m = PolyTools.midPt(T[k]);
        var co = getCol(m[0], m[1]);
        canv += poly(T[k], { fil: co, str: co, wid: 1 });
      }
    }
    return canv;
  };
  this.rock = function(xoff, yoff, seed, args) {
    var args = args != void 0 ? args : {};
    var hei = args.hei != void 0 ? args.hei : 80;
    var wid = args.wid != void 0 ? args.wid : 100;
    var tex = args.tex != void 0 ? args.tex : 40;
    args.ret != void 0 ? args.ret : 0;
    var sha = args.sha != void 0 ? args.sha : 10;
    seed = seed != void 0 ? seed : 0;
    var canv = "";
    var reso = [10, 50];
    var ptlist = [];
    for (var i2 = 0; i2 < reso[0]; i2++) {
      ptlist.push([]);
      var nslist = [];
      for (var j = 0; j < reso[1]; j++) {
        nslist.push(Noise.noise(i2, j * 0.2, seed));
      }
      loopNoise(nslist);
      for (var j = 0; j < reso[1]; j++) {
        var a2 = j / reso[1] * Math.PI * 2 - Math.PI / 2;
        var l = wid * hei / Math.sqrt(Math.pow(hei * Math.cos(a2), 2) + Math.pow(wid * Math.sin(a2), 2));
        l *= 0.7 + 0.3 * nslist[j];
        var p2 = 1 - i2 / reso[0];
        var nx = Math.cos(a2) * l * p2;
        var ny = -Math.sin(a2) * l * p2;
        if (Math.PI < a2 || a2 < 0) {
          ny *= 0.2;
        }
        ny += hei * (i2 / reso[0]) * 0.2;
        ptlist[ptlist.length - 1].push([nx, ny]);
      }
    }
    canv += poly(ptlist[0].concat([[0, 0]]), {
      xof: xoff,
      yof: yoff,
      fil: "white",
      str: "none"
    });
    canv += stroke(ptlist[0].map(function(x) {
      return [x[0] + xoff, x[1] + yoff];
    }), { col: "rgba(100,100,100,0.3)", noi: 1, wid: 3 });
    canv += texture(ptlist, {
      xof: xoff,
      yof: yoff,
      tex,
      wid: 3,
      sha,
      col: function(x) {
        return "rgba(180,180,180," + (0.3 + Math.random() * 0.3).toFixed(3) + ")";
      },
      dis: function() {
        if (Math.random() > 0.5) {
          return 0.15 + 0.15 * Math.random();
        } else {
          return 0.85 - 0.15 * Math.random();
        }
      }
    });
    for (var i2 = 0; i2 < reso[0]; i2++) {
    }
    return canv;
  };
}();
var Arch = new function() {
  var flip2 = function(ptlist, axis) {
    axis = axis == void 0 ? 0 : axis;
    for (var i2 = 0; i2 < ptlist.length; i2++) {
      if (ptlist[i2].length > 0) {
        if (typeof ptlist[i2][0] == "object") {
          for (var j = 0; j < ptlist[i2].length; j++) {
            ptlist[i2][j][0] = axis - (ptlist[i2][j][0] - axis);
          }
        } else {
          ptlist[i2][0] = axis - (ptlist[i2][0] - axis);
        }
      }
    }
    return ptlist;
  };
  var hut = function(xoff, yoff, args) {
    var args = args != void 0 ? args : {};
    var hei = args.hei != void 0 ? args.hei : 40;
    var wid = args.wid != void 0 ? args.wid : 180;
    var tex = args.tex != void 0 ? args.tex : 300;
    var reso = [10, 10];
    var ptlist = [];
    for (var i2 = 0; i2 < reso[0]; i2++) {
      ptlist.push([]);
      var heir = hei + hei * 0.2 * Math.random();
      for (var j = 0; j < reso[1]; j++) {
        var nx = wid * (i2 / (reso[0] - 1) - 0.5) * Math.pow(j / (reso[1] - 1), 0.7);
        var ny = heir * (j / (reso[1] - 1));
        ptlist[ptlist.length - 1].push([nx, ny]);
      }
    }
    var canv = "";
    canv += poly(ptlist[0].slice(0, -1).concat(ptlist[ptlist.length - 1].slice(0, -1).reverse()), { xof: xoff, yof: yoff, fil: "white", str: "none" });
    canv += poly(ptlist[0], {
      xof: xoff,
      yof: yoff,
      fil: "none",
      str: "rgba(100,100,100,0.3)",
      wid: 2
    });
    canv += poly(ptlist[ptlist.length - 1], {
      xof: xoff,
      yof: yoff,
      fil: "none",
      str: "rgba(100,100,100,0.3)",
      wid: 2
    });
    canv += texture(ptlist, {
      xof: xoff,
      yof: yoff,
      tex,
      wid: 1,
      len: 0.25,
      col: function(x) {
        return "rgba(120,120,120," + (0.3 + Math.random() * 0.3).toFixed(3) + ")";
      },
      dis: function() {
        return wtrand((a2) => a2 * a2);
      },
      noi: function(x) {
        return 5;
      }
    });
    for (var i2 = 0; i2 < reso[0]; i2++) {
    }
    return canv;
  };
  var box = function(xoff, yoff, args) {
    var args = args != void 0 ? args : {};
    var hei = args.hei != void 0 ? args.hei : 20;
    var wid = args.wid != void 0 ? args.wid : 120;
    var rot = args.rot != void 0 ? args.rot : 0.7;
    var per = args.per != void 0 ? args.per : 4;
    var tra = args.tra != void 0 ? args.tra : true;
    var bot = args.bot != void 0 ? args.bot : true;
    var wei = args.wei != void 0 ? args.wei : 3;
    var dec = args.dec != void 0 ? args.dec : function(a2) {
      return [];
    };
    var mid = -wid * 0.5 + wid * rot;
    var bmid = -wid * 0.5 + wid * (1 - rot);
    var ptlist = [];
    ptlist.push(div$1([
      [-wid * 0.5, -hei],
      [-wid * 0.5, 0]
    ], 5));
    ptlist.push(div$1([
      [wid * 0.5, -hei],
      [wid * 0.5, 0]
    ], 5));
    if (bot) {
      ptlist.push(div$1([
        [-wid * 0.5, 0],
        [mid, per]
      ], 5));
      ptlist.push(div$1([
        [wid * 0.5, 0],
        [mid, per]
      ], 5));
    }
    ptlist.push(div$1([
      [mid, -hei],
      [mid, per]
    ], 5));
    if (tra) {
      if (bot) {
        ptlist.push(div$1([
          [-wid * 0.5, 0],
          [bmid, -per]
        ], 5));
        ptlist.push(div$1([
          [wid * 0.5, 0],
          [bmid, -per]
        ], 5));
      }
      ptlist.push(div$1([
        [bmid, -hei],
        [bmid, -per]
      ], 5));
    }
    var surf = (rot < 0.5) * 2 - 1;
    ptlist = ptlist.concat(dec({
      pul: [surf * wid * 0.5, -hei],
      pur: [mid, -hei + per],
      pdl: [surf * wid * 0.5, 0],
      pdr: [mid, per]
    }));
    var polist = [
      [-wid * 0.5, -hei],
      [wid * 0.5, -hei],
      [wid * 0.5, 0],
      [mid, per],
      [-wid * 0.5, 0]
    ];
    var canv = "";
    if (!tra) {
      canv += poly(polist, {
        xof: xoff,
        yof: yoff,
        str: "none",
        fil: "white"
      });
    }
    for (var i2 = 0; i2 < ptlist.length; i2++) {
      canv += stroke(ptlist[i2].map(function(x) {
        return [x[0] + xoff, x[1] + yoff];
      }), {
        col: "rgba(100,100,100,0.4)",
        noi: 1,
        wid: wei,
        fun: function(x) {
          return 1;
        }
      });
    }
    return canv;
  };
  var deco = function(style2, args) {
    var args = args != void 0 ? args : {};
    var pul = args.pul != void 0 ? args.pul : [0, 0];
    var pur = args.pur != void 0 ? args.pur : [0, 100];
    var pdl = args.pdl != void 0 ? args.pdl : [100, 0];
    var pdr = args.pdr != void 0 ? args.pdr : [100, 100];
    var hsp = args.hsp != void 0 ? args.hsp : [1, 3];
    var vsp = args.vsp != void 0 ? args.vsp : [1, 2];
    var plist = [];
    var dl = div$1([pul, pdl], vsp[1]);
    var dr = div$1([pur, pdr], vsp[1]);
    var du = div$1([pul, pur], hsp[1]);
    var dd = div$1([pdl, pdr], hsp[1]);
    if (style2 == 1) {
      var mlu = du[hsp[0]];
      var mru = du[du.length - 1 - hsp[0]];
      var mld = dd[hsp[0]];
      var mrd = dd[du.length - 1 - hsp[0]];
      for (var i2 = vsp[0]; i2 < dl.length - vsp[0]; i2 += vsp[0]) {
        var mml = div$1([mlu, mld], vsp[1])[i2];
        var mmr = div$1([mru, mrd], vsp[1])[i2];
        var ml = dl[i2];
        var mr = dr[i2];
        plist.push(div$1([mml, ml], 5));
        plist.push(div$1([mmr, mr], 5));
      }
      plist.push(div$1([mlu, mld], 5));
      plist.push(div$1([mru, mrd], 5));
    } else if (style2 == 2) {
      for (var i2 = hsp[0]; i2 < du.length - hsp[0]; i2 += hsp[0]) {
        var mu = du[i2];
        var md = dd[i2];
        plist.push(div$1([mu, md], 5));
      }
    } else if (style2 == 3) {
      var mlu = du[hsp[0]];
      var mru = du[du.length - 1 - hsp[0]];
      var mld = dd[hsp[0]];
      var mrd = dd[du.length - 1 - hsp[0]];
      for (var i2 = vsp[0]; i2 < dl.length - vsp[0]; i2 += vsp[0]) {
        var mml = div$1([mlu, mld], vsp[1])[i2];
        var mmr = div$1([mru, mrd], vsp[1])[i2];
        var mmu = div$1([mlu, mru], vsp[1])[i2];
        var mmd = div$1([mld, mrd], vsp[1])[i2];
        var ml = dl[i2];
        var mr = dr[i2];
        plist.push(div$1([mml, mmr], 5));
        plist.push(div$1([mmu, mmd], 5));
      }
      plist.push(div$1([mlu, mld], 5));
      plist.push(div$1([mru, mrd], 5));
    }
    return plist;
  };
  var rail = function(xoff, yoff, seed, args) {
    var args = args != void 0 ? args : {};
    var hei = args.hei != void 0 ? args.hei : 20;
    var wid = args.wid != void 0 ? args.wid : 180;
    var rot = args.rot != void 0 ? args.rot : 0.7;
    var per = args.per != void 0 ? args.per : 4;
    var seg = args.seg != void 0 ? args.seg : 4;
    var wei = args.wei != void 0 ? args.wei : 1;
    var tra = args.tra != void 0 ? args.tra : true;
    var fro = args.fro != void 0 ? args.fro : true;
    seed = seed != void 0 ? seed : 0;
    var mid = -wid * 0.5 + wid * rot;
    var bmid = -wid * 0.5 + wid * (1 - rot);
    var ptlist = [];
    if (fro) {
      ptlist.push(div$1([
        [-wid * 0.5, 0],
        [mid, per]
      ], seg));
      ptlist.push(div$1([
        [mid, per],
        [wid * 0.5, 0]
      ], seg));
    }
    if (tra) {
      ptlist.push(div$1([
        [-wid * 0.5, 0],
        [bmid, -per]
      ], seg));
      ptlist.push(div$1([
        [bmid, -per],
        [wid * 0.5, 0]
      ], seg));
    }
    if (fro) {
      ptlist.push(div$1([
        [-wid * 0.5, -hei],
        [mid, -hei + per]
      ], seg));
      ptlist.push(div$1([
        [mid, -hei + per],
        [wid * 0.5, -hei]
      ], seg));
    }
    if (tra) {
      ptlist.push(div$1([
        [-wid * 0.5, -hei],
        [bmid, -hei - per]
      ], seg));
      ptlist.push(div$1([
        [bmid, -hei - per],
        [wid * 0.5, -hei]
      ], seg));
    }
    if (tra) {
      var open = Math.floor(Math.random() * ptlist.length);
      ptlist[open] = ptlist[open].slice(0, -1);
      ptlist[(open + ptlist.length) % ptlist.length] = ptlist[(open + ptlist.length) % ptlist.length].slice(0, -1);
    }
    var canv = "";
    for (var i2 = 0; i2 < ptlist.length / 2; i2++) {
      for (var j = 0; j < ptlist[i2].length; j++) {
        ptlist[i2][j][1] += (Noise.noise(i2, j * 0.5, seed) - 0.5) * hei;
        ptlist[(ptlist.length / 2 + i2) % ptlist.length][j % ptlist[(ptlist.length / 2 + i2) % ptlist.length].length][1] += (Noise.noise(i2 + 0.5, j * 0.5, seed) - 0.5) * hei;
        var ln = div$1([
          ptlist[i2][j],
          ptlist[(ptlist.length / 2 + i2) % ptlist.length][j % ptlist[(ptlist.length / 2 + i2) % ptlist.length].length]
        ], 2);
        ln[0][0] += (Math.random() - 0.5) * hei * 0.5;
        canv += poly(ln, {
          xof: xoff,
          yof: yoff,
          fil: "none",
          str: "rgba(100,100,100,0.5)",
          wid: 2
        });
      }
    }
    for (var i2 = 0; i2 < ptlist.length; i2++) {
      canv += stroke(ptlist[i2].map(function(x) {
        return [x[0] + xoff, x[1] + yoff];
      }), {
        col: "rgba(100,100,100,0.5)",
        noi: 0.5,
        wid: wei,
        fun: function(x) {
          return 1;
        }
      });
    }
    return canv;
  };
  var roof = function(xoff, yoff, args) {
    var args = args != void 0 ? args : {};
    var hei = args.hei != void 0 ? args.hei : 20;
    var wid = args.wid != void 0 ? args.wid : 120;
    var rot = args.rot != void 0 ? args.rot : 0.7;
    var per = args.per != void 0 ? args.per : 4;
    var cor = args.cor != void 0 ? args.cor : 5;
    var wei = args.wei != void 0 ? args.wei : 3;
    var pla = args.pla != void 0 ? args.pla : [0, ""];
    var opf = function(ptlist2) {
      if (rot < 0.5) {
        return flip2(ptlist2);
      } else {
        return ptlist2;
      }
    };
    var rrot = rot < 0.5 ? 1 - rot : rot;
    var mid = -wid * 0.5 + wid * rrot;
    var quat = (mid + wid * 0.5) * 0.5 - mid;
    var ptlist = [];
    ptlist.push(div$1(opf([
      [-wid * 0.5 + quat, -hei - per / 2],
      [-wid * 0.5 + quat * 0.5, -hei / 2 - per / 4],
      [-wid * 0.5 - cor, 0]
    ]), 5));
    ptlist.push(div$1(opf([
      [mid + quat, -hei],
      [(mid + quat + wid * 0.5) / 2, -hei / 2],
      [wid * 0.5 + cor, 0]
    ]), 5));
    ptlist.push(div$1(opf([
      [mid + quat, -hei],
      [mid + quat / 2, -hei / 2 + per / 2],
      [mid + cor, per]
    ]), 5));
    ptlist.push(div$1(opf([
      [-wid * 0.5 - cor, 0],
      [mid + cor, per]
    ]), 5));
    ptlist.push(div$1(opf([
      [wid * 0.5 + cor, 0],
      [mid + cor, per]
    ]), 5));
    ptlist.push(div$1(opf([
      [-wid * 0.5 + quat, -hei - per / 2],
      [mid + quat, -hei]
    ]), 5));
    var canv = "";
    var polist = opf([
      [-wid * 0.5, 0],
      [-wid * 0.5 + quat, -hei - per / 2],
      [mid + quat, -hei],
      [wid * 0.5, 0],
      [mid, per]
    ]);
    canv += poly(polist, { xof: xoff, yof: yoff, str: "none", fil: "white" });
    for (var i2 = 0; i2 < ptlist.length; i2++) {
      canv += stroke(ptlist[i2].map(function(x) {
        return [x[0] + xoff, x[1] + yoff];
      }), {
        col: "rgba(100,100,100,0.4)",
        noi: 1,
        wid: wei,
        fun: function(x) {
          return 1;
        }
      });
    }
    if (pla[0] == 1) {
      var pp = opf([
        [mid + quat / 2, -hei / 2 + per / 2],
        [-wid * 0.5 + quat * 0.5, -hei / 2 - per / 4]
      ]);
      if (pp[0][0] > pp[1][0]) {
        pp = [pp[1], pp[0]];
      }
      var mp = PolyTools.midPt(pp);
      var a2 = Math.atan2(pp[1][1] - pp[0][1], pp[1][0] - pp[0][0]);
      var adeg = a2 * 180 / Math.PI;
      canv += "<text font-size='" + hei * 0.6 + "' font-family='Verdana' style='fill:rgba(100,100,100,0.9)' text-anchor='middle' transform='translate(" + (mp[0] + xoff) + "," + (mp[1] + yoff) + ") rotate(" + adeg + ")'>" + pla[1] + "</text>";
    }
    return canv;
  };
  var pagroof = function(xoff, yoff, args) {
    var args = args != void 0 ? args : {};
    var hei = args.hei != void 0 ? args.hei : 20;
    var wid = args.wid != void 0 ? args.wid : 120;
    args.rot != void 0 ? args.rot : 0.7;
    var per = args.per != void 0 ? args.per : 4;
    var cor = args.cor != void 0 ? args.cor : 10;
    var sid = args.sid != void 0 ? args.sid : 4;
    var wei = args.wei != void 0 ? args.wei : 3;
    var ptlist = [];
    var polist = [[0, -hei]];
    var canv = "";
    for (var i2 = 0; i2 < sid; i2++) {
      var fx = wid * (i2 * 1 / (sid - 1) - 0.5);
      var fy = per * (1 - Math.abs(i2 * 1 / (sid - 1) - 0.5) * 2);
      var fxx = (wid + cor) * (i2 * 1 / (sid - 1) - 0.5);
      if (i2 > 0) {
        ptlist.push([ptlist[ptlist.length - 1][2], [fxx, fy]]);
      }
      ptlist.push([
        [0, -hei],
        [fx * 0.5, (-hei + fy) * 0.5],
        [fxx, fy]
      ]);
      polist.push([fxx, fy]);
    }
    canv += poly(polist, { xof: xoff, yof: yoff, str: "none", fil: "white" });
    for (var i2 = 0; i2 < ptlist.length; i2++) {
      canv += stroke(div$1(ptlist[i2], 5).map(function(x) {
        return [x[0] + xoff, x[1] + yoff];
      }), {
        col: "rgba(100,100,100,0.4)",
        noi: 1,
        wid: wei,
        fun: function(x) {
          return 1;
        }
      });
    }
    return canv;
  };
  this.arch01 = function(xoff, yoff, seed, args) {
    var args = args != void 0 ? args : {};
    var hei = args.hei != void 0 ? args.hei : 70;
    var wid = args.wid != void 0 ? args.wid : 180;
    args.rot != void 0 ? args.rot : 0.7;
    var per = args.per != void 0 ? args.per : 5;
    seed = seed != void 0 ? seed : 0;
    var p2 = 0.4 + Math.random() * 0.2;
    var h0 = hei * p2;
    var h1 = hei * (1 - p2);
    var canv = "";
    canv += hut(xoff, yoff - hei, { hei: h0, wid });
    canv += box(xoff, yoff, {
      hei: h1,
      wid: wid * 2 / 3,
      per,
      bot: false
    });
    canv += rail(xoff, yoff, seed, {
      tra: true,
      fro: false,
      hei: 10,
      wid,
      per: per * 2,
      seg: 3 + Math.random() * 3 | 0
    });
    var mcnt = randChoice([0, 1, 1, 2]);
    if (mcnt == 1) {
      canv += Man.man(xoff + normRand(-wid / 3, wid / 3), yoff, {
        fli: randChoice([true, false]),
        sca: 0.42
      });
    } else if (mcnt == 2) {
      canv += Man.man(xoff + normRand(-wid / 4, -wid / 5), yoff, {
        fli: false,
        sca: 0.42
      });
      canv += Man.man(xoff + normRand(wid / 5, wid / 4), yoff, {
        fli: true,
        sca: 0.42
      });
    }
    canv += rail(xoff, yoff, seed, {
      tra: false,
      fro: true,
      hei: 10,
      wid,
      per: per * 2,
      seg: 3 + Math.random() * 3 | 0
    });
    return canv;
  };
  this.arch02 = function(xoff, yoff, seed, args) {
    var args = args != void 0 ? args : {};
    var hei = args.hei != void 0 ? args.hei : 10;
    var wid = args.wid != void 0 ? args.wid : 50;
    var rot = args.rot != void 0 ? args.rot : 0.3;
    var per = args.per != void 0 ? args.per : 5;
    var sto = args.sto != void 0 ? args.sto : 3;
    var sty = args.sty != void 0 ? args.sty : 1;
    var rai = args.rai != void 0 ? args.rai : false;
    var canv = "";
    var hoff = 0;
    for (var i2 = 0; i2 < sto; i2++) {
      canv += box(xoff, yoff - hoff, {
        tra: false,
        hei,
        wid: wid * Math.pow(0.85, i2),
        rot,
        wei: 1.5,
        per,
        dec: function(a2) {
          return deco(sty, Object.assign({}, a2, {
            hsp: [[], [1, 5], [1, 5], [1, 4]][sty],
            vsp: [[], [1, 2], [1, 2], [1, 3]][sty]
          }));
        }
      });
      canv += rai ? rail(xoff, yoff - hoff, i2 * 0.2, {
        wid: wid * Math.pow(0.85, i2) * 1.1,
        hei: hei / 2,
        per,
        rot,
        wei: 0.5,
        tra: false
      }) : [];
      var pla = void 0;
      if (sto == 1 && Math.random() < 1 / 3) {
        pla = [1, "Pizza Hut"];
      }
      canv += roof(xoff, yoff - hoff - hei, {
        hei,
        wid: wid * Math.pow(0.9, i2),
        rot,
        wei: 1.5,
        per,
        pla
      });
      hoff += hei * 1.5;
    }
    return canv;
  };
  this.arch03 = function(xoff, yoff, seed, args) {
    var args = args != void 0 ? args : {};
    var hei = args.hei != void 0 ? args.hei : 10;
    var wid = args.wid != void 0 ? args.wid : 50;
    var rot = args.rot != void 0 ? args.rot : 0.7;
    var per = args.per != void 0 ? args.per : 5;
    var sto = args.sto != void 0 ? args.sto : 7;
    var canv = "";
    var hoff = 0;
    for (var i2 = 0; i2 < sto; i2++) {
      canv += box(xoff, yoff - hoff, {
        tra: false,
        hei,
        wid: wid * Math.pow(0.85, i2),
        rot,
        wei: 1.5,
        per: per / 2,
        dec: function(a2) {
          return deco(1, Object.assign({}, a2, { hsp: [1, 4], vsp: [1, 2] }));
        }
      });
      canv += rail(xoff, yoff - hoff, i2 * 0.2, {
        seg: 5,
        wid: wid * Math.pow(0.85, i2) * 1.1,
        hei: hei / 2,
        per: per / 2,
        rot,
        wei: 0.5,
        tra: false
      });
      canv += pagroof(xoff, yoff - hoff - hei, {
        hei: hei * 1.5,
        wid: wid * Math.pow(0.9, i2),
        rot,
        wei: 1.5,
        per
      });
      hoff += hei * 1.5;
    }
    return canv;
  };
  this.arch04 = function(xoff, yoff, seed, args) {
    var args = args != void 0 ? args : {};
    var hei = args.hei != void 0 ? args.hei : 15;
    var wid = args.wid != void 0 ? args.wid : 30;
    var rot = args.rot != void 0 ? args.rot : 0.7;
    var per = args.per != void 0 ? args.per : 5;
    var sto = args.sto != void 0 ? args.sto : 2;
    var canv = "";
    var hoff = 0;
    for (var i2 = 0; i2 < sto; i2++) {
      canv += box(xoff, yoff - hoff, {
        tra: true,
        hei,
        wid: wid * Math.pow(0.85, i2),
        rot,
        wei: 1.5,
        per: per / 2,
        dec: function(a2) {
          return [];
        }
      });
      canv += rail(xoff, yoff - hoff, i2 * 0.2, {
        seg: 3,
        wid: wid * Math.pow(0.85, i2) * 1.2,
        hei: hei / 3,
        per: per / 2,
        rot,
        wei: 0.5,
        tra: true
      });
      canv += pagroof(xoff, yoff - hoff - hei, {
        hei: hei * 1,
        wid: wid * Math.pow(0.9, i2),
        rot,
        wei: 1.5,
        per
      });
      hoff += hei * 1.2;
    }
    return canv;
  };
  this.boat01 = function(xoff, yoff, seed, args) {
    var args = args != void 0 ? args : {};
    var len = args.len != void 0 ? args.len : 120;
    var sca = args.sca != void 0 ? args.sca : 1;
    var fli = args.fli != void 0 ? args.fli : false;
    var canv = "";
    var dir = fli ? -1 : 1;
    canv += Man.man(xoff + 20 * sca * dir, yoff, {
      ite: Man.stick01,
      hat: Man.hat02,
      sca: 0.5 * sca,
      fli: !fli,
      len: [0, 30, 20, 30, 10, 30, 30, 30, 30]
    });
    var plist1 = [];
    var plist2 = [];
    var fun1 = function(x) {
      return Math.pow(Math.sin(x * Math.PI), 0.5) * 7 * sca;
    };
    var fun2 = function(x) {
      return Math.pow(Math.sin(x * Math.PI), 0.5) * 10 * sca;
    };
    for (var i2 = 0; i2 < len * sca; i2 += 5 * sca) {
      plist1.push([i2 * dir, fun1(i2 / len)]);
      plist2.push([i2 * dir, fun2(i2 / len)]);
    }
    var plist = plist1.concat(plist2.reverse());
    canv += poly(plist, { xof: xoff, yof: yoff, fil: "white" });
    canv += stroke(plist.map((v) => [xoff + v[0], yoff + v[1]]), {
      wid: 1,
      fun: function(x) {
        return Math.sin(x * Math.PI * 2);
      },
      col: "rgba(100,100,100,0.4)"
    });
    return canv;
  };
  this.transmissionTower01 = function(xoff, yoff, seed, args) {
    var args = args != void 0 ? args : {};
    var hei = args.hei != void 0 ? args.hei : 100;
    var wid = args.wid != void 0 ? args.wid : 20;
    var canv = "";
    var toGlobal = function(v) {
      return [v[0] + xoff, v[1] + yoff];
    };
    var quickstroke = function(pl) {
      return stroke(div$1(pl, 5).map(toGlobal), {
        wid: 1,
        fun: (x) => 0.5,
        col: "rgba(100,100,100,0.4)"
      });
    };
    var p00 = [-wid * 0.05, -hei];
    var p01 = [wid * 0.05, -hei];
    var p10 = [-wid * 0.1, -hei * 0.9];
    var p11 = [wid * 0.1, -hei * 0.9];
    var p20 = [-wid * 0.2, -hei * 0.5];
    var p21 = [wid * 0.2, -hei * 0.5];
    var p30 = [-wid * 0.5, 0];
    var p31 = [wid * 0.5, 0];
    var bch = [
      [0.7, -0.85],
      [1, -0.675],
      [0.7, -0.5]
    ];
    for (var i2 = 0; i2 < bch.length; i2++) {
      canv += quickstroke([
        [-bch[i2][0] * wid, bch[i2][1] * hei],
        [bch[i2][0] * wid, bch[i2][1] * hei]
      ]);
      canv += quickstroke([
        [-bch[i2][0] * wid, bch[i2][1] * hei],
        [0, (bch[i2][1] - 0.05) * hei]
      ]);
      canv += quickstroke([
        [bch[i2][0] * wid, bch[i2][1] * hei],
        [0, (bch[i2][1] - 0.05) * hei]
      ]);
      canv += quickstroke([
        [-bch[i2][0] * wid, bch[i2][1] * hei],
        [-bch[i2][0] * wid, (bch[i2][1] + 0.1) * hei]
      ]);
      canv += quickstroke([
        [bch[i2][0] * wid, bch[i2][1] * hei],
        [bch[i2][0] * wid, (bch[i2][1] + 0.1) * hei]
      ]);
    }
    var l10 = div$1([p00, p10, p20, p30], 5);
    var l11 = div$1([p01, p11, p21, p31], 5);
    for (var i2 = 0; i2 < l10.length - 1; i2++) {
      canv += quickstroke([l10[i2], l11[i2 + 1]]);
      canv += quickstroke([l11[i2], l10[i2 + 1]]);
    }
    canv += quickstroke([p00, p01]);
    canv += quickstroke([p10, p11]);
    canv += quickstroke([p20, p21]);
    canv += quickstroke([p00, p10, p20, p30]);
    canv += quickstroke([p01, p11, p21, p31]);
    return canv;
  };
}();
var Man = new function() {
  var expand = function(ptlist, wfun) {
    let vtxlist0 = [];
    let vtxlist1 = [];
    for (var i2 = 1; i2 < ptlist.length - 1; i2++) {
      var w = wfun(i2 / ptlist.length);
      var a1 = Math.atan2(ptlist[i2][1] - ptlist[i2 - 1][1], ptlist[i2][0] - ptlist[i2 - 1][0]);
      var a2 = Math.atan2(ptlist[i2][1] - ptlist[i2 + 1][1], ptlist[i2][0] - ptlist[i2 + 1][0]);
      var a3 = (a1 + a2) / 2;
      if (a3 < a2) {
        a3 += Math.PI;
      }
      vtxlist0.push([ptlist[i2][0] + w * Math.cos(a3), ptlist[i2][1] + w * Math.sin(a3)]);
      vtxlist1.push([ptlist[i2][0] - w * Math.cos(a3), ptlist[i2][1] - w * Math.sin(a3)]);
    }
    var l = ptlist.length - 1;
    var a0 = Math.atan2(ptlist[1][1] - ptlist[0][1], ptlist[1][0] - ptlist[0][0]) - Math.PI / 2;
    var a1 = Math.atan2(ptlist[l][1] - ptlist[l - 1][1], ptlist[l][0] - ptlist[l - 1][0]) - Math.PI / 2;
    var w0 = wfun(0);
    var w1 = wfun(1);
    vtxlist0.unshift([
      ptlist[0][0] + w0 * Math.cos(a0),
      ptlist[0][1] + w0 * Math.sin(a0)
    ]);
    vtxlist1.unshift([
      ptlist[0][0] - w0 * Math.cos(a0),
      ptlist[0][1] - w0 * Math.sin(a0)
    ]);
    vtxlist0.push([ptlist[l][0] + w1 * Math.cos(a1), ptlist[l][1] + w1 * Math.sin(a1)]);
    vtxlist1.push([ptlist[l][0] - w1 * Math.cos(a1), ptlist[l][1] - w1 * Math.sin(a1)]);
    return [vtxlist0, vtxlist1];
  };
  var tranpoly = function(p0, p1, ptlist) {
    var plist = ptlist.map(function(v) {
      return [-v[0], v[1]];
    });
    var ang = Math.atan2(p1[1] - p0[1], p1[0] - p0[0]) - Math.PI / 2;
    var scl = distance(p0, p1);
    var qlist = plist.map(function(v) {
      var d = distance(v, [0, 0]);
      var a2 = Math.atan2(v[1], v[0]);
      return [p0[0] + d * scl * Math.cos(ang + a2), p0[1] + d * scl * Math.sin(ang + a2)];
    });
    return qlist;
  };
  var flipper = function(plist) {
    return plist.map(function(v) {
      return [-v[0], v[1]];
    });
  };
  this.hat01 = function(p0, p1, args) {
    var args = args != void 0 ? args : {};
    var fli = args.fli != void 0 ? args.fli : false;
    var canv = "";
    var seed = Math.random();
    var f = fli ? flipper : function(x) {
      return x;
    };
    canv += poly(tranpoly(p0, p1, f([
      [-0.3, 0.5],
      [0.3, 0.8],
      [0.2, 1],
      [0, 1.1],
      [-0.3, 1.15],
      [-0.55, 1],
      [-0.65, 0.5]
    ])), { fil: "rgba(100,100,100,0.8)" });
    var qlist1 = [];
    for (var i2 = 0; i2 < 10; i2++) {
      qlist1.push([-0.3 - Noise.noise(i2 * 0.2, seed) * i2 * 0.1, 0.5 - i2 * 0.3]);
    }
    canv += poly(tranpoly(p0, p1, f(qlist1)), {
      str: "rgba(100,100,100,0.8)",
      wid: 1
    });
    return canv;
  };
  this.hat02 = function(p0, p1, args) {
    var args = args != void 0 ? args : {};
    var fli = args.fli != void 0 ? args.fli : false;
    var canv = "";
    var f = fli ? flipper : function(x) {
      return x;
    };
    canv += poly(tranpoly(p0, p1, f([
      [-0.3, 0.5],
      [-1.1, 0.5],
      [-1.2, 0.6],
      [-1.1, 0.7],
      [-0.3, 0.8],
      [0.3, 0.8],
      [1, 0.7],
      [1.3, 0.6],
      [1.2, 0.5],
      [0.3, 0.5]
    ])), { fil: "rgba(100,100,100,0.8)" });
    return canv;
  };
  this.stick01 = function(p0, p1, args) {
    var args = args != void 0 ? args : {};
    var fli = args.fli != void 0 ? args.fli : false;
    var canv = "";
    var seed = Math.random();
    var f = fli ? flipper : function(x) {
      return x;
    };
    var qlist1 = [];
    var l = 12;
    for (var i2 = 0; i2 < l; i2++) {
      qlist1.push([
        -Noise.noise(i2 * 0.1, seed) * 0.1 * Math.sin(i2 / l * Math.PI) * 5,
        0 + i2 * 0.3
      ]);
    }
    canv += poly(tranpoly(p0, p1, f(qlist1)), {
      str: "rgba(100,100,100,0.5)",
      wid: 1
    });
    return canv;
  };
  this.man = function(xoff, yoff, args) {
    var args = args != void 0 ? args : {};
    var sca = args.sca != void 0 ? args.sca : 0.5;
    var hat = args.hat != void 0 ? args.hat : Man.hat01;
    var ite = args.ite != void 0 ? args.ite : function() {
      return "";
    };
    var fli = args.fli != void 0 ? args.fli : true;
    var ang = args.ang != void 0 ? args.ang : [
      0,
      -Math.PI / 2,
      normRand(0, 0),
      Math.PI / 4 * Math.random(),
      Math.PI * 3 / 4 * Math.random(),
      Math.PI * 3 / 4,
      -Math.PI / 4,
      -Math.PI * 3 / 4 - Math.PI / 4 * Math.random(),
      -Math.PI / 4
    ];
    var len = args.len != void 0 ? args.len : [0, 30, 20, 30, 30, 30, 30, 30, 30];
    len = len.map(function(v) {
      return v * sca;
    });
    var canv = "";
    var sct = {
      0: { 1: { 2: {}, 5: { 6: {} }, 7: { 8: {} } }, 3: { 4: {} } }
    };
    var toGlobal = function(v) {
      return [(fli ? -1 : 1) * v[0] + xoff, v[1] + yoff];
    };
    function gpar(sct2, ind) {
      var keys2 = Object.keys(sct2);
      for (var i3 = 0; i3 < keys2.length; i3++) {
        if (keys2[i3] == ind) {
          return [ind];
        } else {
          var r = gpar(sct2[keys2[i3]], ind);
          if (r != false) {
            return [parseFloat(keys2[i3])].concat(r);
          }
        }
      }
      return false;
    }
    function grot(sct2, ind) {
      var par2 = gpar(sct2, ind);
      var rot = 0;
      for (var i3 = 0; i3 < par2.length; i3++) {
        rot += ang[par2[i3]];
      }
      return rot;
    }
    function gpos(sct2, ind) {
      var par2 = gpar(sct2, ind);
      var pos = [0, 0];
      for (var i3 = 0; i3 < par2.length; i3++) {
        var a2 = grot(sct2, par2[i3]);
        pos[0] += len[par2[i3]] * Math.cos(a2);
        pos[1] += len[par2[i3]] * Math.sin(a2);
      }
      return pos;
    }
    var pts = [];
    for (var i2 = 0; i2 < ang.length; i2++) {
      pts.push(gpos(sct, i2));
    }
    yoff -= pts[4][1];
    for (var i2 = 1; i2 < pts.length; i2++) {
      var par = gpar(sct, i2);
      var p0 = gpos(sct, par[par.length - 2]);
      div$1([p0, pts[i2]], 10);
    }
    var cloth = function(plist, fun) {
      var canv2 = "";
      var tlist = bezmh(plist, 2);
      var [tlist1, tlist2] = expand(tlist, fun);
      canv2 += poly(tlist1.concat(tlist2.reverse()).map(toGlobal), {
        fil: "white"
      });
      canv2 += stroke(tlist1.map(toGlobal), {
        wid: 1,
        col: "rgba(100,100,100,0.5)"
      });
      canv2 += stroke(tlist2.map(toGlobal), {
        wid: 1,
        col: "rgba(100,100,100,0.6)"
      });
      return canv2;
    };
    var fsleeve = function(x) {
      return sca * 8 * (Math.sin(0.5 * x * Math.PI) * Math.pow(Math.sin(x * Math.PI), 0.1) + (1 - x) * 0.4);
    };
    var fbody = function(x) {
      return sca * 11 * (Math.sin(0.5 * x * Math.PI) * Math.pow(Math.sin(x * Math.PI), 0.1) + (1 - x) * 0.5);
    };
    var fhead = function(x) {
      return sca * 7 * Math.pow(0.25 - Math.pow(x - 0.5, 2), 0.3);
    };
    canv += ite(toGlobal(pts[8]), toGlobal(pts[6]), { fli });
    canv += cloth([pts[1], pts[7], pts[8]], fsleeve);
    canv += cloth([pts[1], pts[0], pts[3], pts[4]], fbody);
    canv += cloth([pts[1], pts[5], pts[6]], fsleeve);
    canv += cloth([pts[1], pts[2]], fhead);
    var hlist = bezmh([pts[1], pts[2]], 2);
    var [hlist1, hlist2] = expand(hlist, fhead);
    hlist1.splice(0, Math.floor(hlist1.length * 0.1));
    hlist2.splice(0, Math.floor(hlist2.length * 0.95));
    canv += poly(hlist1.concat(hlist2.reverse()).map(toGlobal), {
      fil: "rgba(100,100,100,0.6)"
    });
    canv += hat(toGlobal(pts[1]), toGlobal(pts[2]), { fli });
    return canv;
  };
}();
function water(xoff, yoff, seed, args) {
  var args = args != void 0 ? args : {};
  var hei = args.hei != void 0 ? args.hei : 2;
  var len = args.len != void 0 ? args.len : 800;
  var clu = args.clu != void 0 ? args.clu : 10;
  var canv = "";
  var ptlist = [];
  var yk = 0;
  for (var i2 = 0; i2 < clu; i2++) {
    ptlist.push([]);
    var xk = (Math.random() - 0.5) * (len / 8);
    yk += Math.random() * 5;
    var lk = len / 4 + Math.random() * (len / 4);
    var reso = 5;
    for (var j = -lk; j < lk; j += reso) {
      ptlist[ptlist.length - 1].push([
        j + xk,
        Math.sin(j * 0.2) * hei * Noise.noise(j * 0.1) - 20 + yk
      ]);
    }
  }
  for (var j = 1; j < ptlist.length; j += 1) {
    canv += stroke(ptlist[j].map(function(x) {
      return [x[0] + xoff, x[1] + yoff];
    }), {
      col: "rgba(100,100,100," + (0.3 + Math.random() * 0.3).toFixed(3) + ")",
      wid: 1
    });
  }
  return canv;
}
function mountplanner(xmin, xmax) {
  function locmax(x, y, f, r2) {
    var z0 = f(x, y);
    if (z0 <= 0.3) {
      return false;
    }
    for (var i3 = x - r2; i3 < x + r2; i3++) {
      for (var j2 = y - r2; j2 < y + r2; j2++) {
        if (f(i3, j2) > z0) {
          return false;
        }
      }
    }
    return true;
  }
  function chadd(r2, mind) {
    mind = mind == void 0 ? 10 : mind;
    for (var k2 = 0; k2 < reg.length; k2++) {
      if (Math.abs(reg[k2].x - r2.x) < mind) {
        return false;
      }
    }
    console.log("+");
    reg.push(r2);
    return true;
  }
  var reg = [];
  var samp = 0.03;
  var ns = function(x, y) {
    return Math.max(Noise.noise(x * samp) - 0.55, 0) * 2;
  };
  var yr = function(x) {
    return Noise.noise(x * 0.01, Math.PI);
  };
  var xstep = 5;
  var mwid = 200;
  for (var i2 = xmin; i2 < xmax; i2 += xstep) {
    var i1 = Math.floor(i2 / xstep);
    MEM.planmtx[i1] = MEM.planmtx[i1] || 0;
  }
  for (var i2 = xmin; i2 < xmax; i2 += xstep) {
    for (var j = 0; j < yr(i2) * 480; j += 30) {
      if (locmax(i2, j, ns, 2)) {
        var xof = i2 + 2 * (Math.random() - 0.5) * 500;
        var yof = j + 300;
        var r = { tag: "mount", x: xof, y: yof, h: ns(i2) };
        var res = chadd(r);
        if (res) {
          for (var k = Math.floor((xof - mwid) / xstep); k < (xof + mwid) / xstep; k++) {
            MEM.planmtx[k] += 1;
          }
        }
      }
    }
    if (Math.abs(i2) % 1e3 < Math.max(1, xstep - 1)) {
      var r = {
        tag: "distmount",
        x: i2,
        y: 280 - Math.random() * 50,
        h: ns(i2)
      };
      chadd(r);
    }
  }
  console.log([xmin, xmax]);
  for (var i2 = xmin; i2 < xmax; i2 += xstep) {
    if (MEM.planmtx[Math.floor(i2 / xstep)] == 0) {
      if (Math.random() < 0.01) {
        for (var j = 0; j < 4 * Math.random(); j++) {
          var r = {
            tag: "flatmount",
            x: i2 + 2 * (Math.random() - 0.5) * 700,
            y: 700 - j * 50,
            h: ns(i2)
          };
          chadd(r);
        }
      }
    }
  }
  for (var i2 = xmin; i2 < xmax; i2 += xstep) {
    if (Math.random() < 0.2) {
      var r = { tag: "boat", x: i2, y: 300 + Math.random() * 390 };
      chadd(r, 400);
    }
  }
  return reg;
}
MEM = {
  canv: "",
  chunks: [],
  xmin: 0,
  xmax: 0,
  cwid: 512,
  cursx: 0,
  lasttick: 0,
  windx: 2e3,
  windy: 800,
  planmtx: []
};
function chunkloader(xmin, xmax) {
  var add3 = function(nch) {
    if (nch.canv.includes("NaN")) {
      console.log("gotcha:");
      console.log(nch.tag);
      nch.canv = nch.canv.replace(/NaN/g, -1e3);
    }
    if (MEM.chunks.length == 0) {
      MEM.chunks.push(nch);
      return;
    } else {
      if (nch.y <= MEM.chunks[0].y) {
        MEM.chunks.unshift(nch);
        return;
      } else if (nch.y >= MEM.chunks[MEM.chunks.length - 1].y) {
        MEM.chunks.push(nch);
        return;
      } else {
        for (var j = 0; j < MEM.chunks.length - 1; j++) {
          if (MEM.chunks[j].y <= nch.y && nch.y <= MEM.chunks[j + 1].y) {
            MEM.chunks.splice(j + 1, 0, nch);
            return;
          }
        }
      }
    }
    console.log("EH?WTF!");
    console.log(MEM.chunks);
    console.log(nch);
  };
  while (xmax > MEM.xmax - MEM.cwid || xmin < MEM.xmin + MEM.cwid) {
    console.log("generating new chunk...");
    var plan;
    if (xmax > MEM.xmax - MEM.cwid) {
      plan = mountplanner(MEM.xmax, MEM.xmax + MEM.cwid);
      MEM.xmax = MEM.xmax + MEM.cwid;
    } else {
      plan = mountplanner(MEM.xmin - MEM.cwid, MEM.xmin);
      MEM.xmin = MEM.xmin - MEM.cwid;
    }
    for (var i2 = 0; i2 < plan.length; i2++) {
      if (plan[i2].tag == "mount") {
        add3({
          tag: plan[i2].tag,
          x: plan[i2].x,
          y: plan[i2].y,
          canv: Mount.mountain(plan[i2].x, plan[i2].y, i2 * 2 * Math.random())
        });
        add3({
          tag: plan[i2].tag,
          x: plan[i2].x,
          y: plan[i2].y - 1e4,
          canv: water(plan[i2].x, plan[i2].y)
        });
      } else if (plan[i2].tag == "flatmount") {
        add3({
          tag: plan[i2].tag,
          x: plan[i2].x,
          y: plan[i2].y,
          canv: Mount.flatMount(plan[i2].x, plan[i2].y, 2 * Math.random() * Math.PI, {
            wid: 600 + Math.random() * 400,
            hei: 100,
            cho: 0.5 + Math.random() * 0.2
          })
        });
      } else if (plan[i2].tag == "distmount") {
        add3({
          tag: plan[i2].tag,
          x: plan[i2].x,
          y: plan[i2].y,
          canv: Mount.distMount(plan[i2].x, plan[i2].y, Math.random() * 100, {
            hei: 150,
            len: randChoice([500, 1e3, 1500])
          })
        });
      } else if (plan[i2].tag == "boat") {
        add3({
          tag: plan[i2].tag,
          x: plan[i2].x,
          y: plan[i2].y,
          canv: Arch.boat01(plan[i2].x, plan[i2].y, Math.random(), {
            sca: plan[i2].y / 800,
            fli: randChoice([true, false])
          })
        });
      } else if (plan[i2].tag == "redcirc") {
        add3({
          tag: plan[i2].tag,
          x: plan[i2].x,
          y: plan[i2].y,
          canv: "<circle cx='" + plan[i2].x + "' cy='" + plan[i2].y + "' r='20' stroke='black' fill='red' />"
        });
      } else if (plan[i2].tag == "greencirc") {
        add3({
          tag: plan[i2].tag,
          x: plan[i2].x,
          y: plan[i2].y,
          canv: "<circle cx='" + plan[i2].x + "' cy='" + plan[i2].y + "' r='20' stroke='black' fill='green' />"
        });
      }
    }
  }
}
function chunkrender(xmin, xmax) {
  MEM.canv = "";
  for (var i2 = 0; i2 < MEM.chunks.length; i2++) {
    if (xmin - MEM.cwid < MEM.chunks[i2].x && MEM.chunks[i2].x < xmax + MEM.cwid) {
      MEM.canv += MEM.chunks[i2].canv;
    }
  }
}
function calcViewBox() {
  var zoom = 1.142;
  return "" + MEM.cursx + " 0 " + MEM.windx / zoom + " " + MEM.windy / zoom;
}
function update() {
  chunkloader(MEM.cursx, MEM.cursx + MEM.windx);
  chunkrender(MEM.cursx, MEM.cursx + MEM.windx);
  document.getElementById("BG").innerHTML = "<svg id='SVG' xmlns='http://www.w3.org/2000/svg' width='" + MEM.windx + "' height='" + MEM.windy + "' style='mix-blend-mode:multiply;'viewBox = '" + calcViewBox() + "'><g id='G' transform='translate(" + 0 + ",0)'>" + MEM.canv + "</g></svg>";
}
var lastScrollX = 0;
var pFrame = 0;
function present() {
  var currScrollX = window.scrollX;
  var step2 = 1;
  document.body.scrollTo(Math.max(0, pFrame - 10), window.scrollY);
  pFrame += step2;
  if (pFrame < 20 || Math.abs(lastScrollX - currScrollX) < step2 * 2) {
    lastScrollX = currScrollX;
    setTimeout(present, 1);
  }
}
setTimeout(function() {
  document.getElementById("BG").setAttribute("style", "width:" + MEM.windx + "px");
  update();
  document.body.scrollTo(0, 0);
  present();
  console.log(["SCROLLX", window.scrollX]);
  var canvas = document.getElementById("bgcanv");
  var ctx = canvas.getContext("2d");
  var reso = 512;
  for (var i2 = 0; i2 < reso / 2 + 1; i2++) {
    for (var j = 0; j < reso / 2 + 1; j++) {
      var c = 245 + Noise.noise(i2 * 0.1, j * 0.1) * 10;
      c -= Math.random() * 20;
      var r = c.toFixed(0);
      var g = (c * 0.95).toFixed(0);
      var b = (c * 0.85).toFixed(0);
      ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
      ctx.fillRect(i2, j, 1, 1);
      ctx.fillRect(reso - i2, j, 1, 1);
      ctx.fillRect(i2, reso - j, 1, 1);
      ctx.fillRect(reso - i2, reso - j, 1, 1);
    }
  }
  var img = canvas.toDataURL("image/png");
  document.getElementById("BG").style.backgroundImage = "url(" + img + ")";
  document.getElementsByTagName("body")[0].style.backgroundImage = "url(" + img + ")";
  window.OnFinishLoading();
}, 100);
const _sfc_main$2 = {
  name: "shanshui",
  data() {
    console.log("shanshui");
  },
  props: {},
  setup(props) {
  },
  mounted() {
  },
  methods: {}
};
const _hoisted_1$2 = /* @__PURE__ */ createBaseVNode("div", {
  id: "BG",
  class: "disable-select"
}, null, -1);
const _hoisted_2$2 = /* @__PURE__ */ createBaseVNode("canvas", {
  id: "bgcanv",
  width: "512",
  height: "512",
  hidden: ""
}, null, -1);
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock(Fragment$1, null, [
    _hoisted_1$2,
    _hoisted_2$2
  ], 64);
}
var shanshui = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1]]);
function OrderedMap(content2) {
  this.content = content2;
}
OrderedMap.prototype = {
  constructor: OrderedMap,
  find: function(key2) {
    for (var i2 = 0; i2 < this.content.length; i2 += 2)
      if (this.content[i2] === key2)
        return i2;
    return -1;
  },
  get: function(key2) {
    var found2 = this.find(key2);
    return found2 == -1 ? void 0 : this.content[found2 + 1];
  },
  update: function(key2, value, newKey) {
    var self2 = newKey && newKey != key2 ? this.remove(newKey) : this;
    var found2 = self2.find(key2), content2 = self2.content.slice();
    if (found2 == -1) {
      content2.push(newKey || key2, value);
    } else {
      content2[found2 + 1] = value;
      if (newKey)
        content2[found2] = newKey;
    }
    return new OrderedMap(content2);
  },
  remove: function(key2) {
    var found2 = this.find(key2);
    if (found2 == -1)
      return this;
    var content2 = this.content.slice();
    content2.splice(found2, 2);
    return new OrderedMap(content2);
  },
  addToStart: function(key2, value) {
    return new OrderedMap([key2, value].concat(this.remove(key2).content));
  },
  addToEnd: function(key2, value) {
    var content2 = this.remove(key2).content.slice();
    content2.push(key2, value);
    return new OrderedMap(content2);
  },
  addBefore: function(place, key2, value) {
    var without = this.remove(key2), content2 = without.content.slice();
    var found2 = without.find(place);
    content2.splice(found2 == -1 ? content2.length : found2, 0, key2, value);
    return new OrderedMap(content2);
  },
  forEach: function(f) {
    for (var i2 = 0; i2 < this.content.length; i2 += 2)
      f(this.content[i2], this.content[i2 + 1]);
  },
  prepend: function(map15) {
    map15 = OrderedMap.from(map15);
    if (!map15.size)
      return this;
    return new OrderedMap(map15.content.concat(this.subtract(map15).content));
  },
  append: function(map15) {
    map15 = OrderedMap.from(map15);
    if (!map15.size)
      return this;
    return new OrderedMap(this.subtract(map15).content.concat(map15.content));
  },
  subtract: function(map15) {
    var result2 = this;
    map15 = OrderedMap.from(map15);
    for (var i2 = 0; i2 < map15.content.length; i2 += 2)
      result2 = result2.remove(map15.content[i2]);
    return result2;
  },
  get size() {
    return this.content.length >> 1;
  }
};
OrderedMap.from = function(value) {
  if (value instanceof OrderedMap)
    return value;
  var content2 = [];
  if (value)
    for (var prop2 in value)
      content2.push(prop2, value[prop2]);
  return new OrderedMap(content2);
};
function findDiffStart(a2, b, pos) {
  for (var i2 = 0; ; i2++) {
    if (i2 == a2.childCount || i2 == b.childCount) {
      return a2.childCount == b.childCount ? null : pos;
    }
    var childA = a2.child(i2), childB = b.child(i2);
    if (childA == childB) {
      pos += childA.nodeSize;
      continue;
    }
    if (!childA.sameMarkup(childB)) {
      return pos;
    }
    if (childA.isText && childA.text != childB.text) {
      for (var j = 0; childA.text[j] == childB.text[j]; j++) {
        pos++;
      }
      return pos;
    }
    if (childA.content.size || childB.content.size) {
      var inner = findDiffStart(childA.content, childB.content, pos + 1);
      if (inner != null) {
        return inner;
      }
    }
    pos += childA.nodeSize;
  }
}
function findDiffEnd(a2, b, posA, posB) {
  for (var iA = a2.childCount, iB = b.childCount; ; ) {
    if (iA == 0 || iB == 0) {
      return iA == iB ? null : { a: posA, b: posB };
    }
    var childA = a2.child(--iA), childB = b.child(--iB), size2 = childA.nodeSize;
    if (childA == childB) {
      posA -= size2;
      posB -= size2;
      continue;
    }
    if (!childA.sameMarkup(childB)) {
      return { a: posA, b: posB };
    }
    if (childA.isText && childA.text != childB.text) {
      var same = 0, minSize = Math.min(childA.text.length, childB.text.length);
      while (same < minSize && childA.text[childA.text.length - same - 1] == childB.text[childB.text.length - same - 1]) {
        same++;
        posA--;
        posB--;
      }
      return { a: posA, b: posB };
    }
    if (childA.content.size || childB.content.size) {
      var inner = findDiffEnd(childA.content, childB.content, posA - 1, posB - 1);
      if (inner) {
        return inner;
      }
    }
    posA -= size2;
    posB -= size2;
  }
}
var Fragment = function Fragment2(content2, size2) {
  this.content = content2;
  this.size = size2 || 0;
  if (size2 == null) {
    for (var i2 = 0; i2 < content2.length; i2++) {
      this.size += content2[i2].nodeSize;
    }
  }
};
var prototypeAccessors$5 = { firstChild: { configurable: true }, lastChild: { configurable: true }, childCount: { configurable: true } };
Fragment.prototype.nodesBetween = function nodesBetween(from4, to, f, nodeStart, parent) {
  if (nodeStart === void 0)
    nodeStart = 0;
  for (var i2 = 0, pos = 0; pos < to; i2++) {
    var child3 = this.content[i2], end3 = pos + child3.nodeSize;
    if (end3 > from4 && f(child3, nodeStart + pos, parent, i2) !== false && child3.content.size) {
      var start4 = pos + 1;
      child3.nodesBetween(Math.max(0, from4 - start4), Math.min(child3.content.size, to - start4), f, nodeStart + start4);
    }
    pos = end3;
  }
};
Fragment.prototype.descendants = function descendants(f) {
  this.nodesBetween(0, this.size, f);
};
Fragment.prototype.textBetween = function textBetween(from4, to, blockSeparator, leafText) {
  var text2 = "", separated = true;
  this.nodesBetween(from4, to, function(node4, pos) {
    if (node4.isText) {
      text2 += node4.text.slice(Math.max(from4, pos) - pos, to - pos);
      separated = !blockSeparator;
    } else if (node4.isLeaf && leafText) {
      text2 += typeof leafText === "function" ? leafText(node4) : leafText;
      separated = !blockSeparator;
    } else if (!separated && node4.isBlock) {
      text2 += blockSeparator;
      separated = true;
    }
  }, 0);
  return text2;
};
Fragment.prototype.append = function append(other) {
  if (!other.size) {
    return this;
  }
  if (!this.size) {
    return other;
  }
  var last = this.lastChild, first2 = other.firstChild, content2 = this.content.slice(), i2 = 0;
  if (last.isText && last.sameMarkup(first2)) {
    content2[content2.length - 1] = last.withText(last.text + first2.text);
    i2 = 1;
  }
  for (; i2 < other.content.length; i2++) {
    content2.push(other.content[i2]);
  }
  return new Fragment(content2, this.size + other.size);
};
Fragment.prototype.cut = function cut(from4, to) {
  if (to == null) {
    to = this.size;
  }
  if (from4 == 0 && to == this.size) {
    return this;
  }
  var result2 = [], size2 = 0;
  if (to > from4) {
    for (var i2 = 0, pos = 0; pos < to; i2++) {
      var child3 = this.content[i2], end3 = pos + child3.nodeSize;
      if (end3 > from4) {
        if (pos < from4 || end3 > to) {
          if (child3.isText) {
            child3 = child3.cut(Math.max(0, from4 - pos), Math.min(child3.text.length, to - pos));
          } else {
            child3 = child3.cut(Math.max(0, from4 - pos - 1), Math.min(child3.content.size, to - pos - 1));
          }
        }
        result2.push(child3);
        size2 += child3.nodeSize;
      }
      pos = end3;
    }
  }
  return new Fragment(result2, size2);
};
Fragment.prototype.cutByIndex = function cutByIndex(from4, to) {
  if (from4 == to) {
    return Fragment.empty;
  }
  if (from4 == 0 && to == this.content.length) {
    return this;
  }
  return new Fragment(this.content.slice(from4, to));
};
Fragment.prototype.replaceChild = function replaceChild(index2, node4) {
  var current = this.content[index2];
  if (current == node4) {
    return this;
  }
  var copy5 = this.content.slice();
  var size2 = this.size + node4.nodeSize - current.nodeSize;
  copy5[index2] = node4;
  return new Fragment(copy5, size2);
};
Fragment.prototype.addToStart = function addToStart(node4) {
  return new Fragment([node4].concat(this.content), this.size + node4.nodeSize);
};
Fragment.prototype.addToEnd = function addToEnd(node4) {
  return new Fragment(this.content.concat(node4), this.size + node4.nodeSize);
};
Fragment.prototype.eq = function eq(other) {
  if (this.content.length != other.content.length) {
    return false;
  }
  for (var i2 = 0; i2 < this.content.length; i2++) {
    if (!this.content[i2].eq(other.content[i2])) {
      return false;
    }
  }
  return true;
};
prototypeAccessors$5.firstChild.get = function() {
  return this.content.length ? this.content[0] : null;
};
prototypeAccessors$5.lastChild.get = function() {
  return this.content.length ? this.content[this.content.length - 1] : null;
};
prototypeAccessors$5.childCount.get = function() {
  return this.content.length;
};
Fragment.prototype.child = function child(index2) {
  var found2 = this.content[index2];
  if (!found2) {
    throw new RangeError("Index " + index2 + " out of range for " + this);
  }
  return found2;
};
Fragment.prototype.maybeChild = function maybeChild(index2) {
  return this.content[index2];
};
Fragment.prototype.forEach = function forEach2(f) {
  for (var i2 = 0, p2 = 0; i2 < this.content.length; i2++) {
    var child3 = this.content[i2];
    f(child3, p2, i2);
    p2 += child3.nodeSize;
  }
};
Fragment.prototype.findDiffStart = function findDiffStart$1(other, pos) {
  if (pos === void 0)
    pos = 0;
  return findDiffStart(this, other, pos);
};
Fragment.prototype.findDiffEnd = function findDiffEnd$1(other, pos, otherPos) {
  if (pos === void 0)
    pos = this.size;
  if (otherPos === void 0)
    otherPos = other.size;
  return findDiffEnd(this, other, pos, otherPos);
};
Fragment.prototype.findIndex = function findIndex(pos, round2) {
  if (round2 === void 0)
    round2 = -1;
  if (pos == 0) {
    return retIndex(0, pos);
  }
  if (pos == this.size) {
    return retIndex(this.content.length, pos);
  }
  if (pos > this.size || pos < 0) {
    throw new RangeError("Position " + pos + " outside of fragment (" + this + ")");
  }
  for (var i2 = 0, curPos = 0; ; i2++) {
    var cur = this.child(i2), end3 = curPos + cur.nodeSize;
    if (end3 >= pos) {
      if (end3 == pos || round2 > 0) {
        return retIndex(i2 + 1, end3);
      }
      return retIndex(i2, curPos);
    }
    curPos = end3;
  }
};
Fragment.prototype.toString = function toString() {
  return "<" + this.toStringInner() + ">";
};
Fragment.prototype.toStringInner = function toStringInner() {
  return this.content.join(", ");
};
Fragment.prototype.toJSON = function toJSON() {
  return this.content.length ? this.content.map(function(n) {
    return n.toJSON();
  }) : null;
};
Fragment.fromJSON = function fromJSON(schema, value) {
  if (!value) {
    return Fragment.empty;
  }
  if (!Array.isArray(value)) {
    throw new RangeError("Invalid input for Fragment.fromJSON");
  }
  return new Fragment(value.map(schema.nodeFromJSON));
};
Fragment.fromArray = function fromArray(array) {
  if (!array.length) {
    return Fragment.empty;
  }
  var joined, size2 = 0;
  for (var i2 = 0; i2 < array.length; i2++) {
    var node4 = array[i2];
    size2 += node4.nodeSize;
    if (i2 && node4.isText && array[i2 - 1].sameMarkup(node4)) {
      if (!joined) {
        joined = array.slice(0, i2);
      }
      joined[joined.length - 1] = node4.withText(joined[joined.length - 1].text + node4.text);
    } else if (joined) {
      joined.push(node4);
    }
  }
  return new Fragment(joined || array, size2);
};
Fragment.from = function from(nodes) {
  if (!nodes) {
    return Fragment.empty;
  }
  if (nodes instanceof Fragment) {
    return nodes;
  }
  if (Array.isArray(nodes)) {
    return this.fromArray(nodes);
  }
  if (nodes.attrs) {
    return new Fragment([nodes], nodes.nodeSize);
  }
  throw new RangeError("Can not convert " + nodes + " to a Fragment" + (nodes.nodesBetween ? " (looks like multiple versions of prosemirror-model were loaded)" : ""));
};
Object.defineProperties(Fragment.prototype, prototypeAccessors$5);
var found = { index: 0, offset: 0 };
function retIndex(index2, offset3) {
  found.index = index2;
  found.offset = offset3;
  return found;
}
Fragment.empty = new Fragment([], 0);
function compareDeep(a2, b) {
  if (a2 === b) {
    return true;
  }
  if (!(a2 && typeof a2 == "object") || !(b && typeof b == "object")) {
    return false;
  }
  var array = Array.isArray(a2);
  if (Array.isArray(b) != array) {
    return false;
  }
  if (array) {
    if (a2.length != b.length) {
      return false;
    }
    for (var i2 = 0; i2 < a2.length; i2++) {
      if (!compareDeep(a2[i2], b[i2])) {
        return false;
      }
    }
  } else {
    for (var p2 in a2) {
      if (!(p2 in b) || !compareDeep(a2[p2], b[p2])) {
        return false;
      }
    }
    for (var p$12 in b) {
      if (!(p$12 in a2)) {
        return false;
      }
    }
  }
  return true;
}
var Mark$1 = function Mark2(type, attrs) {
  this.type = type;
  this.attrs = attrs;
};
Mark$1.prototype.addToSet = function addToSet(set3) {
  var copy5, placed = false;
  for (var i2 = 0; i2 < set3.length; i2++) {
    var other = set3[i2];
    if (this.eq(other)) {
      return set3;
    }
    if (this.type.excludes(other.type)) {
      if (!copy5) {
        copy5 = set3.slice(0, i2);
      }
    } else if (other.type.excludes(this.type)) {
      return set3;
    } else {
      if (!placed && other.type.rank > this.type.rank) {
        if (!copy5) {
          copy5 = set3.slice(0, i2);
        }
        copy5.push(this);
        placed = true;
      }
      if (copy5) {
        copy5.push(other);
      }
    }
  }
  if (!copy5) {
    copy5 = set3.slice();
  }
  if (!placed) {
    copy5.push(this);
  }
  return copy5;
};
Mark$1.prototype.removeFromSet = function removeFromSet(set3) {
  for (var i2 = 0; i2 < set3.length; i2++) {
    if (this.eq(set3[i2])) {
      return set3.slice(0, i2).concat(set3.slice(i2 + 1));
    }
  }
  return set3;
};
Mark$1.prototype.isInSet = function isInSet(set3) {
  for (var i2 = 0; i2 < set3.length; i2++) {
    if (this.eq(set3[i2])) {
      return true;
    }
  }
  return false;
};
Mark$1.prototype.eq = function eq2(other) {
  return this == other || this.type == other.type && compareDeep(this.attrs, other.attrs);
};
Mark$1.prototype.toJSON = function toJSON2() {
  var obj = { type: this.type.name };
  for (var _ in this.attrs) {
    obj.attrs = this.attrs;
    break;
  }
  return obj;
};
Mark$1.fromJSON = function fromJSON2(schema, json) {
  if (!json) {
    throw new RangeError("Invalid input for Mark.fromJSON");
  }
  var type = schema.marks[json.type];
  if (!type) {
    throw new RangeError("There is no mark type " + json.type + " in this schema");
  }
  return type.create(json.attrs);
};
Mark$1.sameSet = function sameSet(a2, b) {
  if (a2 == b) {
    return true;
  }
  if (a2.length != b.length) {
    return false;
  }
  for (var i2 = 0; i2 < a2.length; i2++) {
    if (!a2[i2].eq(b[i2])) {
      return false;
    }
  }
  return true;
};
Mark$1.setFrom = function setFrom(marks2) {
  if (!marks2 || marks2.length == 0) {
    return Mark$1.none;
  }
  if (marks2 instanceof Mark$1) {
    return [marks2];
  }
  var copy5 = marks2.slice();
  copy5.sort(function(a2, b) {
    return a2.type.rank - b.type.rank;
  });
  return copy5;
};
Mark$1.none = [];
function ReplaceError(message) {
  var err2 = Error.call(this, message);
  err2.__proto__ = ReplaceError.prototype;
  return err2;
}
ReplaceError.prototype = Object.create(Error.prototype);
ReplaceError.prototype.constructor = ReplaceError;
ReplaceError.prototype.name = "ReplaceError";
var Slice = function Slice2(content2, openStart, openEnd) {
  this.content = content2;
  this.openStart = openStart;
  this.openEnd = openEnd;
};
var prototypeAccessors$1$3 = { size: { configurable: true } };
prototypeAccessors$1$3.size.get = function() {
  return this.content.size - this.openStart - this.openEnd;
};
Slice.prototype.insertAt = function insertAt(pos, fragment) {
  var content2 = insertInto(this.content, pos + this.openStart, fragment, null);
  return content2 && new Slice(content2, this.openStart, this.openEnd);
};
Slice.prototype.removeBetween = function removeBetween(from4, to) {
  return new Slice(removeRange(this.content, from4 + this.openStart, to + this.openStart), this.openStart, this.openEnd);
};
Slice.prototype.eq = function eq3(other) {
  return this.content.eq(other.content) && this.openStart == other.openStart && this.openEnd == other.openEnd;
};
Slice.prototype.toString = function toString2() {
  return this.content + "(" + this.openStart + "," + this.openEnd + ")";
};
Slice.prototype.toJSON = function toJSON3() {
  if (!this.content.size) {
    return null;
  }
  var json = { content: this.content.toJSON() };
  if (this.openStart > 0) {
    json.openStart = this.openStart;
  }
  if (this.openEnd > 0) {
    json.openEnd = this.openEnd;
  }
  return json;
};
Slice.fromJSON = function fromJSON3(schema, json) {
  if (!json) {
    return Slice.empty;
  }
  var openStart = json.openStart || 0, openEnd = json.openEnd || 0;
  if (typeof openStart != "number" || typeof openEnd != "number") {
    throw new RangeError("Invalid input for Slice.fromJSON");
  }
  return new Slice(Fragment.fromJSON(schema, json.content), openStart, openEnd);
};
Slice.maxOpen = function maxOpen(fragment, openIsolating) {
  if (openIsolating === void 0)
    openIsolating = true;
  var openStart = 0, openEnd = 0;
  for (var n = fragment.firstChild; n && !n.isLeaf && (openIsolating || !n.type.spec.isolating); n = n.firstChild) {
    openStart++;
  }
  for (var n$1 = fragment.lastChild; n$1 && !n$1.isLeaf && (openIsolating || !n$1.type.spec.isolating); n$1 = n$1.lastChild) {
    openEnd++;
  }
  return new Slice(fragment, openStart, openEnd);
};
Object.defineProperties(Slice.prototype, prototypeAccessors$1$3);
function removeRange(content2, from4, to) {
  var ref2 = content2.findIndex(from4);
  var index2 = ref2.index;
  var offset3 = ref2.offset;
  var child3 = content2.maybeChild(index2);
  var ref$1 = content2.findIndex(to);
  var indexTo = ref$1.index;
  var offsetTo = ref$1.offset;
  if (offset3 == from4 || child3.isText) {
    if (offsetTo != to && !content2.child(indexTo).isText) {
      throw new RangeError("Removing non-flat range");
    }
    return content2.cut(0, from4).append(content2.cut(to));
  }
  if (index2 != indexTo) {
    throw new RangeError("Removing non-flat range");
  }
  return content2.replaceChild(index2, child3.copy(removeRange(child3.content, from4 - offset3 - 1, to - offset3 - 1)));
}
function insertInto(content2, dist, insert, parent) {
  var ref2 = content2.findIndex(dist);
  var index2 = ref2.index;
  var offset3 = ref2.offset;
  var child3 = content2.maybeChild(index2);
  if (offset3 == dist || child3.isText) {
    if (parent && !parent.canReplace(index2, index2, insert)) {
      return null;
    }
    return content2.cut(0, dist).append(insert).append(content2.cut(dist));
  }
  var inner = insertInto(child3.content, dist - offset3 - 1, insert);
  return inner && content2.replaceChild(index2, child3.copy(inner));
}
Slice.empty = new Slice(Fragment.empty, 0, 0);
function replace($from, $to, slice4) {
  if (slice4.openStart > $from.depth) {
    throw new ReplaceError("Inserted content deeper than insertion position");
  }
  if ($from.depth - slice4.openStart != $to.depth - slice4.openEnd) {
    throw new ReplaceError("Inconsistent open depths");
  }
  return replaceOuter($from, $to, slice4, 0);
}
function replaceOuter($from, $to, slice4, depth) {
  var index2 = $from.index(depth), node4 = $from.node(depth);
  if (index2 == $to.index(depth) && depth < $from.depth - slice4.openStart) {
    var inner = replaceOuter($from, $to, slice4, depth + 1);
    return node4.copy(node4.content.replaceChild(index2, inner));
  } else if (!slice4.content.size) {
    return close(node4, replaceTwoWay($from, $to, depth));
  } else if (!slice4.openStart && !slice4.openEnd && $from.depth == depth && $to.depth == depth) {
    var parent = $from.parent, content2 = parent.content;
    return close(parent, content2.cut(0, $from.parentOffset).append(slice4.content).append(content2.cut($to.parentOffset)));
  } else {
    var ref2 = prepareSliceForReplace(slice4, $from);
    var start4 = ref2.start;
    var end3 = ref2.end;
    return close(node4, replaceThreeWay($from, start4, end3, $to, depth));
  }
}
function checkJoin(main2, sub) {
  if (!sub.type.compatibleContent(main2.type)) {
    throw new ReplaceError("Cannot join " + sub.type.name + " onto " + main2.type.name);
  }
}
function joinable$1($before, $after, depth) {
  var node4 = $before.node(depth);
  checkJoin(node4, $after.node(depth));
  return node4;
}
function addNode(child3, target) {
  var last = target.length - 1;
  if (last >= 0 && child3.isText && child3.sameMarkup(target[last])) {
    target[last] = child3.withText(target[last].text + child3.text);
  } else {
    target.push(child3);
  }
}
function addRange($start, $end, depth, target) {
  var node4 = ($end || $start).node(depth);
  var startIndex = 0, endIndex = $end ? $end.index(depth) : node4.childCount;
  if ($start) {
    startIndex = $start.index(depth);
    if ($start.depth > depth) {
      startIndex++;
    } else if ($start.textOffset) {
      addNode($start.nodeAfter, target);
      startIndex++;
    }
  }
  for (var i2 = startIndex; i2 < endIndex; i2++) {
    addNode(node4.child(i2), target);
  }
  if ($end && $end.depth == depth && $end.textOffset) {
    addNode($end.nodeBefore, target);
  }
}
function close(node4, content2) {
  if (!node4.type.validContent(content2)) {
    throw new ReplaceError("Invalid content for node " + node4.type.name);
  }
  return node4.copy(content2);
}
function replaceThreeWay($from, $start, $end, $to, depth) {
  var openStart = $from.depth > depth && joinable$1($from, $start, depth + 1);
  var openEnd = $to.depth > depth && joinable$1($end, $to, depth + 1);
  var content2 = [];
  addRange(null, $from, depth, content2);
  if (openStart && openEnd && $start.index(depth) == $end.index(depth)) {
    checkJoin(openStart, openEnd);
    addNode(close(openStart, replaceThreeWay($from, $start, $end, $to, depth + 1)), content2);
  } else {
    if (openStart) {
      addNode(close(openStart, replaceTwoWay($from, $start, depth + 1)), content2);
    }
    addRange($start, $end, depth, content2);
    if (openEnd) {
      addNode(close(openEnd, replaceTwoWay($end, $to, depth + 1)), content2);
    }
  }
  addRange($to, null, depth, content2);
  return new Fragment(content2);
}
function replaceTwoWay($from, $to, depth) {
  var content2 = [];
  addRange(null, $from, depth, content2);
  if ($from.depth > depth) {
    var type = joinable$1($from, $to, depth + 1);
    addNode(close(type, replaceTwoWay($from, $to, depth + 1)), content2);
  }
  addRange($to, null, depth, content2);
  return new Fragment(content2);
}
function prepareSliceForReplace(slice4, $along) {
  var extra = $along.depth - slice4.openStart, parent = $along.node(extra);
  var node4 = parent.copy(slice4.content);
  for (var i2 = extra - 1; i2 >= 0; i2--) {
    node4 = $along.node(i2).copy(Fragment.from(node4));
  }
  return {
    start: node4.resolveNoCache(slice4.openStart + extra),
    end: node4.resolveNoCache(node4.content.size - slice4.openEnd - extra)
  };
}
var ResolvedPos = function ResolvedPos2(pos, path, parentOffset) {
  this.pos = pos;
  this.path = path;
  this.depth = path.length / 3 - 1;
  this.parentOffset = parentOffset;
};
var prototypeAccessors$2$1 = { parent: { configurable: true }, doc: { configurable: true }, textOffset: { configurable: true }, nodeAfter: { configurable: true }, nodeBefore: { configurable: true } };
ResolvedPos.prototype.resolveDepth = function resolveDepth(val) {
  if (val == null) {
    return this.depth;
  }
  if (val < 0) {
    return this.depth + val;
  }
  return val;
};
prototypeAccessors$2$1.parent.get = function() {
  return this.node(this.depth);
};
prototypeAccessors$2$1.doc.get = function() {
  return this.node(0);
};
ResolvedPos.prototype.node = function node(depth) {
  return this.path[this.resolveDepth(depth) * 3];
};
ResolvedPos.prototype.index = function index(depth) {
  return this.path[this.resolveDepth(depth) * 3 + 1];
};
ResolvedPos.prototype.indexAfter = function indexAfter(depth) {
  depth = this.resolveDepth(depth);
  return this.index(depth) + (depth == this.depth && !this.textOffset ? 0 : 1);
};
ResolvedPos.prototype.start = function start2(depth) {
  depth = this.resolveDepth(depth);
  return depth == 0 ? 0 : this.path[depth * 3 - 1] + 1;
};
ResolvedPos.prototype.end = function end2(depth) {
  depth = this.resolveDepth(depth);
  return this.start(depth) + this.node(depth).content.size;
};
ResolvedPos.prototype.before = function before(depth) {
  depth = this.resolveDepth(depth);
  if (!depth) {
    throw new RangeError("There is no position before the top-level node");
  }
  return depth == this.depth + 1 ? this.pos : this.path[depth * 3 - 1];
};
ResolvedPos.prototype.after = function after(depth) {
  depth = this.resolveDepth(depth);
  if (!depth) {
    throw new RangeError("There is no position after the top-level node");
  }
  return depth == this.depth + 1 ? this.pos : this.path[depth * 3 - 1] + this.path[depth * 3].nodeSize;
};
prototypeAccessors$2$1.textOffset.get = function() {
  return this.pos - this.path[this.path.length - 1];
};
prototypeAccessors$2$1.nodeAfter.get = function() {
  var parent = this.parent, index2 = this.index(this.depth);
  if (index2 == parent.childCount) {
    return null;
  }
  var dOff = this.pos - this.path[this.path.length - 1], child3 = parent.child(index2);
  return dOff ? parent.child(index2).cut(dOff) : child3;
};
prototypeAccessors$2$1.nodeBefore.get = function() {
  var index2 = this.index(this.depth);
  var dOff = this.pos - this.path[this.path.length - 1];
  if (dOff) {
    return this.parent.child(index2).cut(0, dOff);
  }
  return index2 == 0 ? null : this.parent.child(index2 - 1);
};
ResolvedPos.prototype.posAtIndex = function posAtIndex(index2, depth) {
  depth = this.resolveDepth(depth);
  var node4 = this.path[depth * 3], pos = depth == 0 ? 0 : this.path[depth * 3 - 1] + 1;
  for (var i2 = 0; i2 < index2; i2++) {
    pos += node4.child(i2).nodeSize;
  }
  return pos;
};
ResolvedPos.prototype.marks = function marks() {
  var parent = this.parent, index2 = this.index();
  if (parent.content.size == 0) {
    return Mark$1.none;
  }
  if (this.textOffset) {
    return parent.child(index2).marks;
  }
  var main2 = parent.maybeChild(index2 - 1), other = parent.maybeChild(index2);
  if (!main2) {
    var tmp = main2;
    main2 = other;
    other = tmp;
  }
  var marks2 = main2.marks;
  for (var i2 = 0; i2 < marks2.length; i2++) {
    if (marks2[i2].type.spec.inclusive === false && (!other || !marks2[i2].isInSet(other.marks))) {
      marks2 = marks2[i2--].removeFromSet(marks2);
    }
  }
  return marks2;
};
ResolvedPos.prototype.marksAcross = function marksAcross($end) {
  var after2 = this.parent.maybeChild(this.index());
  if (!after2 || !after2.isInline) {
    return null;
  }
  var marks2 = after2.marks, next = $end.parent.maybeChild($end.index());
  for (var i2 = 0; i2 < marks2.length; i2++) {
    if (marks2[i2].type.spec.inclusive === false && (!next || !marks2[i2].isInSet(next.marks))) {
      marks2 = marks2[i2--].removeFromSet(marks2);
    }
  }
  return marks2;
};
ResolvedPos.prototype.sharedDepth = function sharedDepth(pos) {
  for (var depth = this.depth; depth > 0; depth--) {
    if (this.start(depth) <= pos && this.end(depth) >= pos) {
      return depth;
    }
  }
  return 0;
};
ResolvedPos.prototype.blockRange = function blockRange(other, pred) {
  if (other === void 0)
    other = this;
  if (other.pos < this.pos) {
    return other.blockRange(this);
  }
  for (var d = this.depth - (this.parent.inlineContent || this.pos == other.pos ? 1 : 0); d >= 0; d--) {
    if (other.pos <= this.end(d) && (!pred || pred(this.node(d)))) {
      return new NodeRange(this, other, d);
    }
  }
};
ResolvedPos.prototype.sameParent = function sameParent(other) {
  return this.pos - this.parentOffset == other.pos - other.parentOffset;
};
ResolvedPos.prototype.max = function max2(other) {
  return other.pos > this.pos ? other : this;
};
ResolvedPos.prototype.min = function min2(other) {
  return other.pos < this.pos ? other : this;
};
ResolvedPos.prototype.toString = function toString3() {
  var str = "";
  for (var i2 = 1; i2 <= this.depth; i2++) {
    str += (str ? "/" : "") + this.node(i2).type.name + "_" + this.index(i2 - 1);
  }
  return str + ":" + this.parentOffset;
};
ResolvedPos.resolve = function resolve2(doc2, pos) {
  if (!(pos >= 0 && pos <= doc2.content.size)) {
    throw new RangeError("Position " + pos + " out of range");
  }
  var path = [];
  var start4 = 0, parentOffset = pos;
  for (var node4 = doc2; ; ) {
    var ref2 = node4.content.findIndex(parentOffset);
    var index2 = ref2.index;
    var offset3 = ref2.offset;
    var rem = parentOffset - offset3;
    path.push(node4, index2, start4 + offset3);
    if (!rem) {
      break;
    }
    node4 = node4.child(index2);
    if (node4.isText) {
      break;
    }
    parentOffset = rem - 1;
    start4 += offset3 + 1;
  }
  return new ResolvedPos(pos, path, parentOffset);
};
ResolvedPos.resolveCached = function resolveCached(doc2, pos) {
  for (var i2 = 0; i2 < resolveCache.length; i2++) {
    var cached = resolveCache[i2];
    if (cached.pos == pos && cached.doc == doc2) {
      return cached;
    }
  }
  var result2 = resolveCache[resolveCachePos] = ResolvedPos.resolve(doc2, pos);
  resolveCachePos = (resolveCachePos + 1) % resolveCacheSize;
  return result2;
};
Object.defineProperties(ResolvedPos.prototype, prototypeAccessors$2$1);
var resolveCache = [], resolveCachePos = 0, resolveCacheSize = 12;
var NodeRange = function NodeRange2($from, $to, depth) {
  this.$from = $from;
  this.$to = $to;
  this.depth = depth;
};
var prototypeAccessors$1$1$1 = { start: { configurable: true }, end: { configurable: true }, parent: { configurable: true }, startIndex: { configurable: true }, endIndex: { configurable: true } };
prototypeAccessors$1$1$1.start.get = function() {
  return this.$from.before(this.depth + 1);
};
prototypeAccessors$1$1$1.end.get = function() {
  return this.$to.after(this.depth + 1);
};
prototypeAccessors$1$1$1.parent.get = function() {
  return this.$from.node(this.depth);
};
prototypeAccessors$1$1$1.startIndex.get = function() {
  return this.$from.index(this.depth);
};
prototypeAccessors$1$1$1.endIndex.get = function() {
  return this.$to.indexAfter(this.depth);
};
Object.defineProperties(NodeRange.prototype, prototypeAccessors$1$1$1);
var emptyAttrs = /* @__PURE__ */ Object.create(null);
var Node$1 = function Node2(type, attrs, content2, marks2) {
  this.type = type;
  this.attrs = attrs;
  this.content = content2 || Fragment.empty;
  this.marks = marks2 || Mark$1.none;
};
var prototypeAccessors$3$1 = { nodeSize: { configurable: true }, childCount: { configurable: true }, textContent: { configurable: true }, firstChild: { configurable: true }, lastChild: { configurable: true }, isBlock: { configurable: true }, isTextblock: { configurable: true }, inlineContent: { configurable: true }, isInline: { configurable: true }, isText: { configurable: true }, isLeaf: { configurable: true }, isAtom: { configurable: true } };
prototypeAccessors$3$1.nodeSize.get = function() {
  return this.isLeaf ? 1 : 2 + this.content.size;
};
prototypeAccessors$3$1.childCount.get = function() {
  return this.content.childCount;
};
Node$1.prototype.child = function child2(index2) {
  return this.content.child(index2);
};
Node$1.prototype.maybeChild = function maybeChild2(index2) {
  return this.content.maybeChild(index2);
};
Node$1.prototype.forEach = function forEach3(f) {
  this.content.forEach(f);
};
Node$1.prototype.nodesBetween = function nodesBetween2(from4, to, f, startPos) {
  if (startPos === void 0)
    startPos = 0;
  this.content.nodesBetween(from4, to, f, startPos, this);
};
Node$1.prototype.descendants = function descendants2(f) {
  this.nodesBetween(0, this.content.size, f);
};
prototypeAccessors$3$1.textContent.get = function() {
  return this.textBetween(0, this.content.size, "");
};
Node$1.prototype.textBetween = function textBetween2(from4, to, blockSeparator, leafText) {
  return this.content.textBetween(from4, to, blockSeparator, leafText);
};
prototypeAccessors$3$1.firstChild.get = function() {
  return this.content.firstChild;
};
prototypeAccessors$3$1.lastChild.get = function() {
  return this.content.lastChild;
};
Node$1.prototype.eq = function eq4(other) {
  return this == other || this.sameMarkup(other) && this.content.eq(other.content);
};
Node$1.prototype.sameMarkup = function sameMarkup(other) {
  return this.hasMarkup(other.type, other.attrs, other.marks);
};
Node$1.prototype.hasMarkup = function hasMarkup(type, attrs, marks2) {
  return this.type == type && compareDeep(this.attrs, attrs || type.defaultAttrs || emptyAttrs) && Mark$1.sameSet(this.marks, marks2 || Mark$1.none);
};
Node$1.prototype.copy = function copy2(content2) {
  if (content2 === void 0)
    content2 = null;
  if (content2 == this.content) {
    return this;
  }
  return new this.constructor(this.type, this.attrs, content2, this.marks);
};
Node$1.prototype.mark = function mark(marks2) {
  return marks2 == this.marks ? this : new this.constructor(this.type, this.attrs, this.content, marks2);
};
Node$1.prototype.cut = function cut2(from4, to) {
  if (from4 == 0 && to == this.content.size) {
    return this;
  }
  return this.copy(this.content.cut(from4, to));
};
Node$1.prototype.slice = function slice(from4, to, includeParents) {
  if (to === void 0)
    to = this.content.size;
  if (includeParents === void 0)
    includeParents = false;
  if (from4 == to) {
    return Slice.empty;
  }
  var $from = this.resolve(from4), $to = this.resolve(to);
  var depth = includeParents ? 0 : $from.sharedDepth(to);
  var start4 = $from.start(depth), node4 = $from.node(depth);
  var content2 = node4.content.cut($from.pos - start4, $to.pos - start4);
  return new Slice(content2, $from.depth - depth, $to.depth - depth);
};
Node$1.prototype.replace = function replace$1(from4, to, slice4) {
  return replace(this.resolve(from4), this.resolve(to), slice4);
};
Node$1.prototype.nodeAt = function nodeAt(pos) {
  for (var node4 = this; ; ) {
    var ref2 = node4.content.findIndex(pos);
    var index2 = ref2.index;
    var offset3 = ref2.offset;
    node4 = node4.maybeChild(index2);
    if (!node4) {
      return null;
    }
    if (offset3 == pos || node4.isText) {
      return node4;
    }
    pos -= offset3 + 1;
  }
};
Node$1.prototype.childAfter = function childAfter(pos) {
  var ref2 = this.content.findIndex(pos);
  var index2 = ref2.index;
  var offset3 = ref2.offset;
  return { node: this.content.maybeChild(index2), index: index2, offset: offset3 };
};
Node$1.prototype.childBefore = function childBefore(pos) {
  if (pos == 0) {
    return { node: null, index: 0, offset: 0 };
  }
  var ref2 = this.content.findIndex(pos);
  var index2 = ref2.index;
  var offset3 = ref2.offset;
  if (offset3 < pos) {
    return { node: this.content.child(index2), index: index2, offset: offset3 };
  }
  var node4 = this.content.child(index2 - 1);
  return { node: node4, index: index2 - 1, offset: offset3 - node4.nodeSize };
};
Node$1.prototype.resolve = function resolve3(pos) {
  return ResolvedPos.resolveCached(this, pos);
};
Node$1.prototype.resolveNoCache = function resolveNoCache(pos) {
  return ResolvedPos.resolve(this, pos);
};
Node$1.prototype.rangeHasMark = function rangeHasMark(from4, to, type) {
  var found2 = false;
  if (to > from4) {
    this.nodesBetween(from4, to, function(node4) {
      if (type.isInSet(node4.marks)) {
        found2 = true;
      }
      return !found2;
    });
  }
  return found2;
};
prototypeAccessors$3$1.isBlock.get = function() {
  return this.type.isBlock;
};
prototypeAccessors$3$1.isTextblock.get = function() {
  return this.type.isTextblock;
};
prototypeAccessors$3$1.inlineContent.get = function() {
  return this.type.inlineContent;
};
prototypeAccessors$3$1.isInline.get = function() {
  return this.type.isInline;
};
prototypeAccessors$3$1.isText.get = function() {
  return this.type.isText;
};
prototypeAccessors$3$1.isLeaf.get = function() {
  return this.type.isLeaf;
};
prototypeAccessors$3$1.isAtom.get = function() {
  return this.type.isAtom;
};
Node$1.prototype.toString = function toString4() {
  if (this.type.spec.toDebugString) {
    return this.type.spec.toDebugString(this);
  }
  var name = this.type.name;
  if (this.content.size) {
    name += "(" + this.content.toStringInner() + ")";
  }
  return wrapMarks(this.marks, name);
};
Node$1.prototype.contentMatchAt = function contentMatchAt(index2) {
  var match = this.type.contentMatch.matchFragment(this.content, 0, index2);
  if (!match) {
    throw new Error("Called contentMatchAt on a node with invalid content");
  }
  return match;
};
Node$1.prototype.canReplace = function canReplace(from4, to, replacement, start4, end3) {
  if (replacement === void 0)
    replacement = Fragment.empty;
  if (start4 === void 0)
    start4 = 0;
  if (end3 === void 0)
    end3 = replacement.childCount;
  var one = this.contentMatchAt(from4).matchFragment(replacement, start4, end3);
  var two = one && one.matchFragment(this.content, to);
  if (!two || !two.validEnd) {
    return false;
  }
  for (var i2 = start4; i2 < end3; i2++) {
    if (!this.type.allowsMarks(replacement.child(i2).marks)) {
      return false;
    }
  }
  return true;
};
Node$1.prototype.canReplaceWith = function canReplaceWith(from4, to, type, marks2) {
  if (marks2 && !this.type.allowsMarks(marks2)) {
    return false;
  }
  var start4 = this.contentMatchAt(from4).matchType(type);
  var end3 = start4 && start4.matchFragment(this.content, to);
  return end3 ? end3.validEnd : false;
};
Node$1.prototype.canAppend = function canAppend(other) {
  if (other.content.size) {
    return this.canReplace(this.childCount, this.childCount, other.content);
  } else {
    return this.type.compatibleContent(other.type);
  }
};
Node$1.prototype.check = function check() {
  if (!this.type.validContent(this.content)) {
    throw new RangeError("Invalid content for node " + this.type.name + ": " + this.content.toString().slice(0, 50));
  }
  var copy5 = Mark$1.none;
  for (var i2 = 0; i2 < this.marks.length; i2++) {
    copy5 = this.marks[i2].addToSet(copy5);
  }
  if (!Mark$1.sameSet(copy5, this.marks)) {
    throw new RangeError("Invalid collection of marks for node " + this.type.name + ": " + this.marks.map(function(m) {
      return m.type.name;
    }));
  }
  this.content.forEach(function(node4) {
    return node4.check();
  });
};
Node$1.prototype.toJSON = function toJSON4() {
  var obj = { type: this.type.name };
  for (var _ in this.attrs) {
    obj.attrs = this.attrs;
    break;
  }
  if (this.content.size) {
    obj.content = this.content.toJSON();
  }
  if (this.marks.length) {
    obj.marks = this.marks.map(function(n) {
      return n.toJSON();
    });
  }
  return obj;
};
Node$1.fromJSON = function fromJSON4(schema, json) {
  if (!json) {
    throw new RangeError("Invalid input for Node.fromJSON");
  }
  var marks2 = null;
  if (json.marks) {
    if (!Array.isArray(json.marks)) {
      throw new RangeError("Invalid mark data for Node.fromJSON");
    }
    marks2 = json.marks.map(schema.markFromJSON);
  }
  if (json.type == "text") {
    if (typeof json.text != "string") {
      throw new RangeError("Invalid text node in JSON");
    }
    return schema.text(json.text, marks2);
  }
  var content2 = Fragment.fromJSON(schema, json.content);
  return schema.nodeType(json.type).create(json.attrs, content2, marks2);
};
Object.defineProperties(Node$1.prototype, prototypeAccessors$3$1);
var TextNode = /* @__PURE__ */ function(Node3) {
  function TextNode2(type, attrs, content2, marks2) {
    Node3.call(this, type, attrs, null, marks2);
    if (!content2) {
      throw new RangeError("Empty text nodes are not allowed");
    }
    this.text = content2;
  }
  if (Node3)
    TextNode2.__proto__ = Node3;
  TextNode2.prototype = Object.create(Node3 && Node3.prototype);
  TextNode2.prototype.constructor = TextNode2;
  var prototypeAccessors$12 = { textContent: { configurable: true }, nodeSize: { configurable: true } };
  TextNode2.prototype.toString = function toString7() {
    if (this.type.spec.toDebugString) {
      return this.type.spec.toDebugString(this);
    }
    return wrapMarks(this.marks, JSON.stringify(this.text));
  };
  prototypeAccessors$12.textContent.get = function() {
    return this.text;
  };
  TextNode2.prototype.textBetween = function textBetween3(from4, to) {
    return this.text.slice(from4, to);
  };
  prototypeAccessors$12.nodeSize.get = function() {
    return this.text.length;
  };
  TextNode2.prototype.mark = function mark3(marks2) {
    return marks2 == this.marks ? this : new TextNode2(this.type, this.attrs, this.text, marks2);
  };
  TextNode2.prototype.withText = function withText(text2) {
    if (text2 == this.text) {
      return this;
    }
    return new TextNode2(this.type, this.attrs, text2, this.marks);
  };
  TextNode2.prototype.cut = function cut3(from4, to) {
    if (from4 === void 0)
      from4 = 0;
    if (to === void 0)
      to = this.text.length;
    if (from4 == 0 && to == this.text.length) {
      return this;
    }
    return this.withText(this.text.slice(from4, to));
  };
  TextNode2.prototype.eq = function eq12(other) {
    return this.sameMarkup(other) && this.text == other.text;
  };
  TextNode2.prototype.toJSON = function toJSON7() {
    var base2 = Node3.prototype.toJSON.call(this);
    base2.text = this.text;
    return base2;
  };
  Object.defineProperties(TextNode2.prototype, prototypeAccessors$12);
  return TextNode2;
}(Node$1);
function wrapMarks(marks2, str) {
  for (var i2 = marks2.length - 1; i2 >= 0; i2--) {
    str = marks2[i2].type.name + "(" + str + ")";
  }
  return str;
}
var ContentMatch = function ContentMatch2(validEnd) {
  this.validEnd = validEnd;
  this.next = [];
  this.wrapCache = [];
};
var prototypeAccessors$4$1 = { inlineContent: { configurable: true }, defaultType: { configurable: true }, edgeCount: { configurable: true } };
ContentMatch.parse = function parse(string, nodeTypes) {
  var stream = new TokenStream(string, nodeTypes);
  if (stream.next == null) {
    return ContentMatch.empty;
  }
  var expr = parseExpr(stream);
  if (stream.next) {
    stream.err("Unexpected trailing text");
  }
  var match = dfa(nfa(expr));
  checkForDeadEnds(match, stream);
  return match;
};
ContentMatch.prototype.matchType = function matchType(type) {
  for (var i2 = 0; i2 < this.next.length; i2 += 2) {
    if (this.next[i2] == type) {
      return this.next[i2 + 1];
    }
  }
  return null;
};
ContentMatch.prototype.matchFragment = function matchFragment(frag, start4, end3) {
  if (start4 === void 0)
    start4 = 0;
  if (end3 === void 0)
    end3 = frag.childCount;
  var cur = this;
  for (var i2 = start4; cur && i2 < end3; i2++) {
    cur = cur.matchType(frag.child(i2).type);
  }
  return cur;
};
prototypeAccessors$4$1.inlineContent.get = function() {
  var first2 = this.next[0];
  return first2 ? first2.isInline : false;
};
prototypeAccessors$4$1.defaultType.get = function() {
  for (var i2 = 0; i2 < this.next.length; i2 += 2) {
    var type = this.next[i2];
    if (!(type.isText || type.hasRequiredAttrs())) {
      return type;
    }
  }
};
ContentMatch.prototype.compatible = function compatible(other) {
  for (var i2 = 0; i2 < this.next.length; i2 += 2) {
    for (var j = 0; j < other.next.length; j += 2) {
      if (this.next[i2] == other.next[j]) {
        return true;
      }
    }
  }
  return false;
};
ContentMatch.prototype.fillBefore = function fillBefore(after2, toEnd, startIndex) {
  if (toEnd === void 0)
    toEnd = false;
  if (startIndex === void 0)
    startIndex = 0;
  var seen = [this];
  function search(match, types) {
    var finished = match.matchFragment(after2, startIndex);
    if (finished && (!toEnd || finished.validEnd)) {
      return Fragment.from(types.map(function(tp) {
        return tp.createAndFill();
      }));
    }
    for (var i2 = 0; i2 < match.next.length; i2 += 2) {
      var type = match.next[i2], next = match.next[i2 + 1];
      if (!(type.isText || type.hasRequiredAttrs()) && seen.indexOf(next) == -1) {
        seen.push(next);
        var found2 = search(next, types.concat(type));
        if (found2) {
          return found2;
        }
      }
    }
  }
  return search(this, []);
};
ContentMatch.prototype.findWrapping = function findWrapping2(target) {
  for (var i2 = 0; i2 < this.wrapCache.length; i2 += 2) {
    if (this.wrapCache[i2] == target) {
      return this.wrapCache[i2 + 1];
    }
  }
  var computed2 = this.computeWrapping(target);
  this.wrapCache.push(target, computed2);
  return computed2;
};
ContentMatch.prototype.computeWrapping = function computeWrapping(target) {
  var seen = /* @__PURE__ */ Object.create(null), active = [{ match: this, type: null, via: null }];
  while (active.length) {
    var current = active.shift(), match = current.match;
    if (match.matchType(target)) {
      var result2 = [];
      for (var obj = current; obj.type; obj = obj.via) {
        result2.push(obj.type);
      }
      return result2.reverse();
    }
    for (var i2 = 0; i2 < match.next.length; i2 += 2) {
      var type = match.next[i2];
      if (!type.isLeaf && !type.hasRequiredAttrs() && !(type.name in seen) && (!current.type || match.next[i2 + 1].validEnd)) {
        active.push({ match: type.contentMatch, type, via: current });
        seen[type.name] = true;
      }
    }
  }
};
prototypeAccessors$4$1.edgeCount.get = function() {
  return this.next.length >> 1;
};
ContentMatch.prototype.edge = function edge(n) {
  var i2 = n << 1;
  if (i2 >= this.next.length) {
    throw new RangeError("There's no " + n + "th edge in this content match");
  }
  return { type: this.next[i2], next: this.next[i2 + 1] };
};
ContentMatch.prototype.toString = function toString5() {
  var seen = [];
  function scan(m) {
    seen.push(m);
    for (var i2 = 1; i2 < m.next.length; i2 += 2) {
      if (seen.indexOf(m.next[i2]) == -1) {
        scan(m.next[i2]);
      }
    }
  }
  scan(this);
  return seen.map(function(m, i2) {
    var out = i2 + (m.validEnd ? "*" : " ") + " ";
    for (var i$1 = 0; i$1 < m.next.length; i$1 += 2) {
      out += (i$1 ? ", " : "") + m.next[i$1].name + "->" + seen.indexOf(m.next[i$1 + 1]);
    }
    return out;
  }).join("\n");
};
Object.defineProperties(ContentMatch.prototype, prototypeAccessors$4$1);
ContentMatch.empty = new ContentMatch(true);
var TokenStream = function TokenStream2(string, nodeTypes) {
  this.string = string;
  this.nodeTypes = nodeTypes;
  this.inline = null;
  this.pos = 0;
  this.tokens = string.split(/\s*(?=\b|\W|$)/);
  if (this.tokens[this.tokens.length - 1] == "") {
    this.tokens.pop();
  }
  if (this.tokens[0] == "") {
    this.tokens.shift();
  }
};
var prototypeAccessors$1$2$1 = { next: { configurable: true } };
prototypeAccessors$1$2$1.next.get = function() {
  return this.tokens[this.pos];
};
TokenStream.prototype.eat = function eat(tok) {
  return this.next == tok && (this.pos++ || true);
};
TokenStream.prototype.err = function err(str) {
  throw new SyntaxError(str + " (in content expression '" + this.string + "')");
};
Object.defineProperties(TokenStream.prototype, prototypeAccessors$1$2$1);
function parseExpr(stream) {
  var exprs = [];
  do {
    exprs.push(parseExprSeq(stream));
  } while (stream.eat("|"));
  return exprs.length == 1 ? exprs[0] : { type: "choice", exprs };
}
function parseExprSeq(stream) {
  var exprs = [];
  do {
    exprs.push(parseExprSubscript(stream));
  } while (stream.next && stream.next != ")" && stream.next != "|");
  return exprs.length == 1 ? exprs[0] : { type: "seq", exprs };
}
function parseExprSubscript(stream) {
  var expr = parseExprAtom(stream);
  for (; ; ) {
    if (stream.eat("+")) {
      expr = { type: "plus", expr };
    } else if (stream.eat("*")) {
      expr = { type: "star", expr };
    } else if (stream.eat("?")) {
      expr = { type: "opt", expr };
    } else if (stream.eat("{")) {
      expr = parseExprRange(stream, expr);
    } else {
      break;
    }
  }
  return expr;
}
function parseNum(stream) {
  if (/\D/.test(stream.next)) {
    stream.err("Expected number, got '" + stream.next + "'");
  }
  var result2 = Number(stream.next);
  stream.pos++;
  return result2;
}
function parseExprRange(stream, expr) {
  var min3 = parseNum(stream), max3 = min3;
  if (stream.eat(",")) {
    if (stream.next != "}") {
      max3 = parseNum(stream);
    } else {
      max3 = -1;
    }
  }
  if (!stream.eat("}")) {
    stream.err("Unclosed braced range");
  }
  return { type: "range", min: min3, max: max3, expr };
}
function resolveName(stream, name) {
  var types = stream.nodeTypes, type = types[name];
  if (type) {
    return [type];
  }
  var result2 = [];
  for (var typeName in types) {
    var type$1 = types[typeName];
    if (type$1.groups.indexOf(name) > -1) {
      result2.push(type$1);
    }
  }
  if (result2.length == 0) {
    stream.err("No node type or group '" + name + "' found");
  }
  return result2;
}
function parseExprAtom(stream) {
  if (stream.eat("(")) {
    var expr = parseExpr(stream);
    if (!stream.eat(")")) {
      stream.err("Missing closing paren");
    }
    return expr;
  } else if (!/\W/.test(stream.next)) {
    var exprs = resolveName(stream, stream.next).map(function(type) {
      if (stream.inline == null) {
        stream.inline = type.isInline;
      } else if (stream.inline != type.isInline) {
        stream.err("Mixing inline and block content");
      }
      return { type: "name", value: type };
    });
    stream.pos++;
    return exprs.length == 1 ? exprs[0] : { type: "choice", exprs };
  } else {
    stream.err("Unexpected token '" + stream.next + "'");
  }
}
function nfa(expr) {
  var nfa2 = [[]];
  connect(compile4(expr, 0), node4());
  return nfa2;
  function node4() {
    return nfa2.push([]) - 1;
  }
  function edge2(from4, to, term) {
    var edge3 = { term, to };
    nfa2[from4].push(edge3);
    return edge3;
  }
  function connect(edges, to) {
    edges.forEach(function(edge3) {
      return edge3.to = to;
    });
  }
  function compile4(expr2, from4) {
    if (expr2.type == "choice") {
      return expr2.exprs.reduce(function(out, expr3) {
        return out.concat(compile4(expr3, from4));
      }, []);
    } else if (expr2.type == "seq") {
      for (var i2 = 0; ; i2++) {
        var next = compile4(expr2.exprs[i2], from4);
        if (i2 == expr2.exprs.length - 1) {
          return next;
        }
        connect(next, from4 = node4());
      }
    } else if (expr2.type == "star") {
      var loop = node4();
      edge2(from4, loop);
      connect(compile4(expr2.expr, loop), loop);
      return [edge2(loop)];
    } else if (expr2.type == "plus") {
      var loop$1 = node4();
      connect(compile4(expr2.expr, from4), loop$1);
      connect(compile4(expr2.expr, loop$1), loop$1);
      return [edge2(loop$1)];
    } else if (expr2.type == "opt") {
      return [edge2(from4)].concat(compile4(expr2.expr, from4));
    } else if (expr2.type == "range") {
      var cur = from4;
      for (var i$1 = 0; i$1 < expr2.min; i$1++) {
        var next$1 = node4();
        connect(compile4(expr2.expr, cur), next$1);
        cur = next$1;
      }
      if (expr2.max == -1) {
        connect(compile4(expr2.expr, cur), cur);
      } else {
        for (var i$2 = expr2.min; i$2 < expr2.max; i$2++) {
          var next$2 = node4();
          edge2(cur, next$2);
          connect(compile4(expr2.expr, cur), next$2);
          cur = next$2;
        }
      }
      return [edge2(cur)];
    } else if (expr2.type == "name") {
      return [edge2(from4, null, expr2.value)];
    }
  }
}
function cmp(a2, b) {
  return b - a2;
}
function nullFrom(nfa2, node4) {
  var result2 = [];
  scan(node4);
  return result2.sort(cmp);
  function scan(node5) {
    var edges = nfa2[node5];
    if (edges.length == 1 && !edges[0].term) {
      return scan(edges[0].to);
    }
    result2.push(node5);
    for (var i2 = 0; i2 < edges.length; i2++) {
      var ref2 = edges[i2];
      var term = ref2.term;
      var to = ref2.to;
      if (!term && result2.indexOf(to) == -1) {
        scan(to);
      }
    }
  }
}
function dfa(nfa2) {
  var labeled = /* @__PURE__ */ Object.create(null);
  return explore(nullFrom(nfa2, 0));
  function explore(states) {
    var out = [];
    states.forEach(function(node4) {
      nfa2[node4].forEach(function(ref2) {
        var term = ref2.term;
        var to = ref2.to;
        if (!term) {
          return;
        }
        var known = out.indexOf(term), set3 = known > -1 && out[known + 1];
        nullFrom(nfa2, to).forEach(function(node5) {
          if (!set3) {
            out.push(term, set3 = []);
          }
          if (set3.indexOf(node5) == -1) {
            set3.push(node5);
          }
        });
      });
    });
    var state = labeled[states.join(",")] = new ContentMatch(states.indexOf(nfa2.length - 1) > -1);
    for (var i2 = 0; i2 < out.length; i2 += 2) {
      var states$1 = out[i2 + 1].sort(cmp);
      state.next.push(out[i2], labeled[states$1.join(",")] || explore(states$1));
    }
    return state;
  }
}
function checkForDeadEnds(match, stream) {
  for (var i2 = 0, work = [match]; i2 < work.length; i2++) {
    var state = work[i2], dead = !state.validEnd, nodes = [];
    for (var j = 0; j < state.next.length; j += 2) {
      var node4 = state.next[j], next = state.next[j + 1];
      nodes.push(node4.name);
      if (dead && !(node4.isText || node4.hasRequiredAttrs())) {
        dead = false;
      }
      if (work.indexOf(next) == -1) {
        work.push(next);
      }
    }
    if (dead) {
      stream.err("Only non-generatable nodes (" + nodes.join(", ") + ") in a required position (see https://prosemirror.net/docs/guide/#generatable)");
    }
  }
}
function defaultAttrs(attrs) {
  var defaults = /* @__PURE__ */ Object.create(null);
  for (var attrName in attrs) {
    var attr = attrs[attrName];
    if (!attr.hasDefault) {
      return null;
    }
    defaults[attrName] = attr.default;
  }
  return defaults;
}
function computeAttrs(attrs, value) {
  var built = /* @__PURE__ */ Object.create(null);
  for (var name in attrs) {
    var given = value && value[name];
    if (given === void 0) {
      var attr = attrs[name];
      if (attr.hasDefault) {
        given = attr.default;
      } else {
        throw new RangeError("No value supplied for attribute " + name);
      }
    }
    built[name] = given;
  }
  return built;
}
function initAttrs(attrs) {
  var result2 = /* @__PURE__ */ Object.create(null);
  if (attrs) {
    for (var name in attrs) {
      result2[name] = new Attribute(attrs[name]);
    }
  }
  return result2;
}
var NodeType$1 = function NodeType2(name, schema, spec) {
  this.name = name;
  this.schema = schema;
  this.spec = spec;
  this.groups = spec.group ? spec.group.split(" ") : [];
  this.attrs = initAttrs(spec.attrs);
  this.defaultAttrs = defaultAttrs(this.attrs);
  this.contentMatch = null;
  this.markSet = null;
  this.inlineContent = null;
  this.isBlock = !(spec.inline || name == "text");
  this.isText = name == "text";
};
var prototypeAccessors$5$1 = { isInline: { configurable: true }, isTextblock: { configurable: true }, isLeaf: { configurable: true }, isAtom: { configurable: true }, whitespace: { configurable: true } };
prototypeAccessors$5$1.isInline.get = function() {
  return !this.isBlock;
};
prototypeAccessors$5$1.isTextblock.get = function() {
  return this.isBlock && this.inlineContent;
};
prototypeAccessors$5$1.isLeaf.get = function() {
  return this.contentMatch == ContentMatch.empty;
};
prototypeAccessors$5$1.isAtom.get = function() {
  return this.isLeaf || this.spec.atom;
};
prototypeAccessors$5$1.whitespace.get = function() {
  return this.spec.whitespace || (this.spec.code ? "pre" : "normal");
};
NodeType$1.prototype.hasRequiredAttrs = function hasRequiredAttrs() {
  for (var n in this.attrs) {
    if (this.attrs[n].isRequired) {
      return true;
    }
  }
  return false;
};
NodeType$1.prototype.compatibleContent = function compatibleContent(other) {
  return this == other || this.contentMatch.compatible(other.contentMatch);
};
NodeType$1.prototype.computeAttrs = function computeAttrs$1(attrs) {
  if (!attrs && this.defaultAttrs) {
    return this.defaultAttrs;
  } else {
    return computeAttrs(this.attrs, attrs);
  }
};
NodeType$1.prototype.create = function create(attrs, content2, marks2) {
  if (this.isText) {
    throw new Error("NodeType.create can't construct text nodes");
  }
  return new Node$1(this, this.computeAttrs(attrs), Fragment.from(content2), Mark$1.setFrom(marks2));
};
NodeType$1.prototype.createChecked = function createChecked(attrs, content2, marks2) {
  content2 = Fragment.from(content2);
  if (!this.validContent(content2)) {
    throw new RangeError("Invalid content for node " + this.name);
  }
  return new Node$1(this, this.computeAttrs(attrs), content2, Mark$1.setFrom(marks2));
};
NodeType$1.prototype.createAndFill = function createAndFill(attrs, content2, marks2) {
  attrs = this.computeAttrs(attrs);
  content2 = Fragment.from(content2);
  if (content2.size) {
    var before2 = this.contentMatch.fillBefore(content2);
    if (!before2) {
      return null;
    }
    content2 = before2.append(content2);
  }
  var after2 = this.contentMatch.matchFragment(content2).fillBefore(Fragment.empty, true);
  if (!after2) {
    return null;
  }
  return new Node$1(this, attrs, content2.append(after2), Mark$1.setFrom(marks2));
};
NodeType$1.prototype.validContent = function validContent(content2) {
  var result2 = this.contentMatch.matchFragment(content2);
  if (!result2 || !result2.validEnd) {
    return false;
  }
  for (var i2 = 0; i2 < content2.childCount; i2++) {
    if (!this.allowsMarks(content2.child(i2).marks)) {
      return false;
    }
  }
  return true;
};
NodeType$1.prototype.allowsMarkType = function allowsMarkType(markType) {
  return this.markSet == null || this.markSet.indexOf(markType) > -1;
};
NodeType$1.prototype.allowsMarks = function allowsMarks(marks2) {
  if (this.markSet == null) {
    return true;
  }
  for (var i2 = 0; i2 < marks2.length; i2++) {
    if (!this.allowsMarkType(marks2[i2].type)) {
      return false;
    }
  }
  return true;
};
NodeType$1.prototype.allowedMarks = function allowedMarks(marks2) {
  if (this.markSet == null) {
    return marks2;
  }
  var copy5;
  for (var i2 = 0; i2 < marks2.length; i2++) {
    if (!this.allowsMarkType(marks2[i2].type)) {
      if (!copy5) {
        copy5 = marks2.slice(0, i2);
      }
    } else if (copy5) {
      copy5.push(marks2[i2]);
    }
  }
  return !copy5 ? marks2 : copy5.length ? copy5 : Mark$1.empty;
};
NodeType$1.compile = function compile2(nodes, schema) {
  var result2 = /* @__PURE__ */ Object.create(null);
  nodes.forEach(function(name, spec) {
    return result2[name] = new NodeType$1(name, schema, spec);
  });
  var topType = schema.spec.topNode || "doc";
  if (!result2[topType]) {
    throw new RangeError("Schema is missing its top node type ('" + topType + "')");
  }
  if (!result2.text) {
    throw new RangeError("Every schema needs a 'text' type");
  }
  for (var _ in result2.text.attrs) {
    throw new RangeError("The text node type should not have attributes");
  }
  return result2;
};
Object.defineProperties(NodeType$1.prototype, prototypeAccessors$5$1);
var Attribute = function Attribute2(options) {
  this.hasDefault = Object.prototype.hasOwnProperty.call(options, "default");
  this.default = options.default;
};
var prototypeAccessors$1$3$1 = { isRequired: { configurable: true } };
prototypeAccessors$1$3$1.isRequired.get = function() {
  return !this.hasDefault;
};
Object.defineProperties(Attribute.prototype, prototypeAccessors$1$3$1);
var MarkType = function MarkType2(name, rank, schema, spec) {
  this.name = name;
  this.schema = schema;
  this.spec = spec;
  this.attrs = initAttrs(spec.attrs);
  this.rank = rank;
  this.excluded = null;
  var defaults = defaultAttrs(this.attrs);
  this.instance = defaults && new Mark$1(this, defaults);
};
MarkType.prototype.create = function create2(attrs) {
  if (!attrs && this.instance) {
    return this.instance;
  }
  return new Mark$1(this, computeAttrs(this.attrs, attrs));
};
MarkType.compile = function compile3(marks2, schema) {
  var result2 = /* @__PURE__ */ Object.create(null), rank = 0;
  marks2.forEach(function(name, spec) {
    return result2[name] = new MarkType(name, rank++, schema, spec);
  });
  return result2;
};
MarkType.prototype.removeFromSet = function removeFromSet2(set3) {
  for (var i2 = 0; i2 < set3.length; i2++) {
    if (set3[i2].type == this) {
      set3 = set3.slice(0, i2).concat(set3.slice(i2 + 1));
      i2--;
    }
  }
  return set3;
};
MarkType.prototype.isInSet = function isInSet2(set3) {
  for (var i2 = 0; i2 < set3.length; i2++) {
    if (set3[i2].type == this) {
      return set3[i2];
    }
  }
};
MarkType.prototype.excludes = function excludes(other) {
  return this.excluded.indexOf(other) > -1;
};
var Schema = function Schema2(spec) {
  this.spec = {};
  for (var prop2 in spec) {
    this.spec[prop2] = spec[prop2];
  }
  this.spec.nodes = OrderedMap.from(spec.nodes);
  this.spec.marks = OrderedMap.from(spec.marks);
  this.nodes = NodeType$1.compile(this.spec.nodes, this);
  this.marks = MarkType.compile(this.spec.marks, this);
  var contentExprCache = /* @__PURE__ */ Object.create(null);
  for (var prop$1 in this.nodes) {
    if (prop$1 in this.marks) {
      throw new RangeError(prop$1 + " can not be both a node and a mark");
    }
    var type = this.nodes[prop$1], contentExpr = type.spec.content || "", markExpr = type.spec.marks;
    type.contentMatch = contentExprCache[contentExpr] || (contentExprCache[contentExpr] = ContentMatch.parse(contentExpr, this.nodes));
    type.inlineContent = type.contentMatch.inlineContent;
    type.markSet = markExpr == "_" ? null : markExpr ? gatherMarks(this, markExpr.split(" ")) : markExpr == "" || !type.inlineContent ? [] : null;
  }
  for (var prop$2 in this.marks) {
    var type$1 = this.marks[prop$2], excl = type$1.spec.excludes;
    type$1.excluded = excl == null ? [type$1] : excl == "" ? [] : gatherMarks(this, excl.split(" "));
  }
  this.nodeFromJSON = this.nodeFromJSON.bind(this);
  this.markFromJSON = this.markFromJSON.bind(this);
  this.topNodeType = this.nodes[this.spec.topNode || "doc"];
  this.cached = /* @__PURE__ */ Object.create(null);
  this.cached.wrappings = /* @__PURE__ */ Object.create(null);
};
Schema.prototype.node = function node2(type, attrs, content2, marks2) {
  if (typeof type == "string") {
    type = this.nodeType(type);
  } else if (!(type instanceof NodeType$1)) {
    throw new RangeError("Invalid node type: " + type);
  } else if (type.schema != this) {
    throw new RangeError("Node type from different schema used (" + type.name + ")");
  }
  return type.createChecked(attrs, content2, marks2);
};
Schema.prototype.text = function text(text$1, marks2) {
  var type = this.nodes.text;
  return new TextNode(type, type.defaultAttrs, text$1, Mark$1.setFrom(marks2));
};
Schema.prototype.mark = function mark2(type, attrs) {
  if (typeof type == "string") {
    type = this.marks[type];
  }
  return type.create(attrs);
};
Schema.prototype.nodeFromJSON = function nodeFromJSON(json) {
  return Node$1.fromJSON(this, json);
};
Schema.prototype.markFromJSON = function markFromJSON(json) {
  return Mark$1.fromJSON(this, json);
};
Schema.prototype.nodeType = function nodeType(name) {
  var found2 = this.nodes[name];
  if (!found2) {
    throw new RangeError("Unknown node type: " + name);
  }
  return found2;
};
function gatherMarks(schema, marks2) {
  var found2 = [];
  for (var i2 = 0; i2 < marks2.length; i2++) {
    var name = marks2[i2], mark3 = schema.marks[name], ok2 = mark3;
    if (mark3) {
      found2.push(mark3);
    } else {
      for (var prop2 in schema.marks) {
        var mark$1 = schema.marks[prop2];
        if (name == "_" || mark$1.spec.group && mark$1.spec.group.split(" ").indexOf(name) > -1) {
          found2.push(ok2 = mark$1);
        }
      }
    }
    if (!ok2) {
      throw new SyntaxError("Unknown mark type: '" + marks2[i2] + "'");
    }
  }
  return found2;
}
var DOMParser = function DOMParser2(schema, rules) {
  var this$1$1 = this;
  this.schema = schema;
  this.rules = rules;
  this.tags = [];
  this.styles = [];
  rules.forEach(function(rule) {
    if (rule.tag) {
      this$1$1.tags.push(rule);
    } else if (rule.style) {
      this$1$1.styles.push(rule);
    }
  });
  this.normalizeLists = !this.tags.some(function(r) {
    if (!/^(ul|ol)\b/.test(r.tag) || !r.node) {
      return false;
    }
    var node4 = schema.nodes[r.node];
    return node4.contentMatch.matchType(node4);
  });
};
DOMParser.prototype.parse = function parse2(dom, options) {
  if (options === void 0)
    options = {};
  var context = new ParseContext(this, options, false);
  context.addAll(dom, null, options.from, options.to);
  return context.finish();
};
DOMParser.prototype.parseSlice = function parseSlice(dom, options) {
  if (options === void 0)
    options = {};
  var context = new ParseContext(this, options, true);
  context.addAll(dom, null, options.from, options.to);
  return Slice.maxOpen(context.finish());
};
DOMParser.prototype.matchTag = function matchTag(dom, context, after2) {
  for (var i2 = after2 ? this.tags.indexOf(after2) + 1 : 0; i2 < this.tags.length; i2++) {
    var rule = this.tags[i2];
    if (matches(dom, rule.tag) && (rule.namespace === void 0 || dom.namespaceURI == rule.namespace) && (!rule.context || context.matchesContext(rule.context))) {
      if (rule.getAttrs) {
        var result2 = rule.getAttrs(dom);
        if (result2 === false) {
          continue;
        }
        rule.attrs = result2;
      }
      return rule;
    }
  }
};
DOMParser.prototype.matchStyle = function matchStyle(prop2, value, context, after2) {
  for (var i2 = after2 ? this.styles.indexOf(after2) + 1 : 0; i2 < this.styles.length; i2++) {
    var rule = this.styles[i2];
    if (rule.style.indexOf(prop2) != 0 || rule.context && !context.matchesContext(rule.context) || rule.style.length > prop2.length && (rule.style.charCodeAt(prop2.length) != 61 || rule.style.slice(prop2.length + 1) != value)) {
      continue;
    }
    if (rule.getAttrs) {
      var result2 = rule.getAttrs(value);
      if (result2 === false) {
        continue;
      }
      rule.attrs = result2;
    }
    return rule;
  }
};
DOMParser.schemaRules = function schemaRules(schema) {
  var result2 = [];
  function insert(rule) {
    var priority = rule.priority == null ? 50 : rule.priority, i2 = 0;
    for (; i2 < result2.length; i2++) {
      var next = result2[i2], nextPriority = next.priority == null ? 50 : next.priority;
      if (nextPriority < priority) {
        break;
      }
    }
    result2.splice(i2, 0, rule);
  }
  var loop = function(name2) {
    var rules = schema.marks[name2].spec.parseDOM;
    if (rules) {
      rules.forEach(function(rule) {
        insert(rule = copy(rule));
        rule.mark = name2;
      });
    }
  };
  for (var name in schema.marks)
    loop(name);
  var loop$1 = function(name2) {
    var rules$1 = schema.nodes[name$1].spec.parseDOM;
    if (rules$1) {
      rules$1.forEach(function(rule) {
        insert(rule = copy(rule));
        rule.node = name$1;
      });
    }
  };
  for (var name$1 in schema.nodes)
    loop$1();
  return result2;
};
DOMParser.fromSchema = function fromSchema(schema) {
  return schema.cached.domParser || (schema.cached.domParser = new DOMParser(schema, DOMParser.schemaRules(schema)));
};
var blockTags = {
  address: true,
  article: true,
  aside: true,
  blockquote: true,
  canvas: true,
  dd: true,
  div: true,
  dl: true,
  fieldset: true,
  figcaption: true,
  figure: true,
  footer: true,
  form: true,
  h1: true,
  h2: true,
  h3: true,
  h4: true,
  h5: true,
  h6: true,
  header: true,
  hgroup: true,
  hr: true,
  li: true,
  noscript: true,
  ol: true,
  output: true,
  p: true,
  pre: true,
  section: true,
  table: true,
  tfoot: true,
  ul: true
};
var ignoreTags = {
  head: true,
  noscript: true,
  object: true,
  script: true,
  style: true,
  title: true
};
var listTags = { ol: true, ul: true };
var OPT_PRESERVE_WS = 1, OPT_PRESERVE_WS_FULL = 2, OPT_OPEN_LEFT = 4;
function wsOptionsFor(type, preserveWhitespace, base2) {
  if (preserveWhitespace != null) {
    return (preserveWhitespace ? OPT_PRESERVE_WS : 0) | (preserveWhitespace === "full" ? OPT_PRESERVE_WS_FULL : 0);
  }
  return type && type.whitespace == "pre" ? OPT_PRESERVE_WS | OPT_PRESERVE_WS_FULL : base2 & ~OPT_OPEN_LEFT;
}
var NodeContext = function NodeContext2(type, attrs, marks2, pendingMarks, solid, match, options) {
  this.type = type;
  this.attrs = attrs;
  this.solid = solid;
  this.match = match || (options & OPT_OPEN_LEFT ? null : type.contentMatch);
  this.options = options;
  this.content = [];
  this.marks = marks2;
  this.activeMarks = Mark$1.none;
  this.pendingMarks = pendingMarks;
  this.stashMarks = [];
};
NodeContext.prototype.findWrapping = function findWrapping3(node4) {
  if (!this.match) {
    if (!this.type) {
      return [];
    }
    var fill = this.type.contentMatch.fillBefore(Fragment.from(node4));
    if (fill) {
      this.match = this.type.contentMatch.matchFragment(fill);
    } else {
      var start4 = this.type.contentMatch, wrap;
      if (wrap = start4.findWrapping(node4.type)) {
        this.match = start4;
        return wrap;
      } else {
        return null;
      }
    }
  }
  return this.match.findWrapping(node4.type);
};
NodeContext.prototype.finish = function finish(openEnd) {
  if (!(this.options & OPT_PRESERVE_WS)) {
    var last = this.content[this.content.length - 1], m;
    if (last && last.isText && (m = /[ \t\r\n\u000c]+$/.exec(last.text))) {
      if (last.text.length == m[0].length) {
        this.content.pop();
      } else {
        this.content[this.content.length - 1] = last.withText(last.text.slice(0, last.text.length - m[0].length));
      }
    }
  }
  var content2 = Fragment.from(this.content);
  if (!openEnd && this.match) {
    content2 = content2.append(this.match.fillBefore(Fragment.empty, true));
  }
  return this.type ? this.type.create(this.attrs, content2, this.marks) : content2;
};
NodeContext.prototype.popFromStashMark = function popFromStashMark(mark3) {
  for (var i2 = this.stashMarks.length - 1; i2 >= 0; i2--) {
    if (mark3.eq(this.stashMarks[i2])) {
      return this.stashMarks.splice(i2, 1)[0];
    }
  }
};
NodeContext.prototype.applyPending = function applyPending(nextType) {
  for (var i2 = 0, pending = this.pendingMarks; i2 < pending.length; i2++) {
    var mark3 = pending[i2];
    if ((this.type ? this.type.allowsMarkType(mark3.type) : markMayApply(mark3.type, nextType)) && !mark3.isInSet(this.activeMarks)) {
      this.activeMarks = mark3.addToSet(this.activeMarks);
      this.pendingMarks = mark3.removeFromSet(this.pendingMarks);
    }
  }
};
NodeContext.prototype.inlineContext = function inlineContext(node4) {
  if (this.type) {
    return this.type.inlineContent;
  }
  if (this.content.length) {
    return this.content[0].isInline;
  }
  return node4.parentNode && !blockTags.hasOwnProperty(node4.parentNode.nodeName.toLowerCase());
};
var ParseContext = function ParseContext2(parser, options, open) {
  this.parser = parser;
  this.options = options;
  this.isOpen = open;
  var topNode = options.topNode, topContext;
  var topOptions = wsOptionsFor(null, options.preserveWhitespace, 0) | (open ? OPT_OPEN_LEFT : 0);
  if (topNode) {
    topContext = new NodeContext(topNode.type, topNode.attrs, Mark$1.none, Mark$1.none, true, options.topMatch || topNode.type.contentMatch, topOptions);
  } else if (open) {
    topContext = new NodeContext(null, null, Mark$1.none, Mark$1.none, true, null, topOptions);
  } else {
    topContext = new NodeContext(parser.schema.topNodeType, null, Mark$1.none, Mark$1.none, true, null, topOptions);
  }
  this.nodes = [topContext];
  this.open = 0;
  this.find = options.findPositions;
  this.needsBlock = false;
};
var prototypeAccessors$6 = { top: { configurable: true }, currentPos: { configurable: true } };
prototypeAccessors$6.top.get = function() {
  return this.nodes[this.open];
};
ParseContext.prototype.addDOM = function addDOM(dom) {
  if (dom.nodeType == 3) {
    this.addTextNode(dom);
  } else if (dom.nodeType == 1) {
    var style2 = dom.getAttribute("style");
    var marks2 = style2 ? this.readStyles(parseStyles(style2)) : null, top2 = this.top;
    if (marks2 != null) {
      for (var i2 = 0; i2 < marks2.length; i2++) {
        this.addPendingMark(marks2[i2]);
      }
    }
    this.addElement(dom);
    if (marks2 != null) {
      for (var i$1 = 0; i$1 < marks2.length; i$1++) {
        this.removePendingMark(marks2[i$1], top2);
      }
    }
  }
};
ParseContext.prototype.addTextNode = function addTextNode(dom) {
  var value = dom.nodeValue;
  var top2 = this.top;
  if (top2.options & OPT_PRESERVE_WS_FULL || top2.inlineContext(dom) || /[^ \t\r\n\u000c]/.test(value)) {
    if (!(top2.options & OPT_PRESERVE_WS)) {
      value = value.replace(/[ \t\r\n\u000c]+/g, " ");
      if (/^[ \t\r\n\u000c]/.test(value) && this.open == this.nodes.length - 1) {
        var nodeBefore = top2.content[top2.content.length - 1];
        var domNodeBefore = dom.previousSibling;
        if (!nodeBefore || domNodeBefore && domNodeBefore.nodeName == "BR" || nodeBefore.isText && /[ \t\r\n\u000c]$/.test(nodeBefore.text)) {
          value = value.slice(1);
        }
      }
    } else if (!(top2.options & OPT_PRESERVE_WS_FULL)) {
      value = value.replace(/\r?\n|\r/g, " ");
    } else {
      value = value.replace(/\r\n?/g, "\n");
    }
    if (value) {
      this.insertNode(this.parser.schema.text(value));
    }
    this.findInText(dom);
  } else {
    this.findInside(dom);
  }
};
ParseContext.prototype.addElement = function addElement(dom, matchAfter) {
  var name = dom.nodeName.toLowerCase(), ruleID;
  if (listTags.hasOwnProperty(name) && this.parser.normalizeLists) {
    normalizeList(dom);
  }
  var rule = this.options.ruleFromNode && this.options.ruleFromNode(dom) || (ruleID = this.parser.matchTag(dom, this, matchAfter));
  if (rule ? rule.ignore : ignoreTags.hasOwnProperty(name)) {
    this.findInside(dom);
    this.ignoreFallback(dom);
  } else if (!rule || rule.skip || rule.closeParent) {
    if (rule && rule.closeParent) {
      this.open = Math.max(0, this.open - 1);
    } else if (rule && rule.skip.nodeType) {
      dom = rule.skip;
    }
    var sync2, top2 = this.top, oldNeedsBlock = this.needsBlock;
    if (blockTags.hasOwnProperty(name)) {
      sync2 = true;
      if (!top2.type) {
        this.needsBlock = true;
      }
    } else if (!dom.firstChild) {
      this.leafFallback(dom);
      return;
    }
    this.addAll(dom);
    if (sync2) {
      this.sync(top2);
    }
    this.needsBlock = oldNeedsBlock;
  } else {
    this.addElementByRule(dom, rule, rule.consuming === false ? ruleID : null);
  }
};
ParseContext.prototype.leafFallback = function leafFallback(dom) {
  if (dom.nodeName == "BR" && this.top.type && this.top.type.inlineContent) {
    this.addTextNode(dom.ownerDocument.createTextNode("\n"));
  }
};
ParseContext.prototype.ignoreFallback = function ignoreFallback(dom) {
  if (dom.nodeName == "BR" && (!this.top.type || !this.top.type.inlineContent)) {
    this.findPlace(this.parser.schema.text("-"));
  }
};
ParseContext.prototype.readStyles = function readStyles(styles) {
  var marks2 = Mark$1.none;
  style:
    for (var i2 = 0; i2 < styles.length; i2 += 2) {
      for (var after2 = null; ; ) {
        var rule = this.parser.matchStyle(styles[i2], styles[i2 + 1], this, after2);
        if (!rule) {
          continue style;
        }
        if (rule.ignore) {
          return null;
        }
        marks2 = this.parser.schema.marks[rule.mark].create(rule.attrs).addToSet(marks2);
        if (rule.consuming === false) {
          after2 = rule;
        } else {
          break;
        }
      }
    }
  return marks2;
};
ParseContext.prototype.addElementByRule = function addElementByRule(dom, rule, continueAfter) {
  var this$1$1 = this;
  var sync2, nodeType2, markType, mark3;
  if (rule.node) {
    nodeType2 = this.parser.schema.nodes[rule.node];
    if (!nodeType2.isLeaf) {
      sync2 = this.enter(nodeType2, rule.attrs, rule.preserveWhitespace);
    } else if (!this.insertNode(nodeType2.create(rule.attrs))) {
      this.leafFallback(dom);
    }
  } else {
    markType = this.parser.schema.marks[rule.mark];
    mark3 = markType.create(rule.attrs);
    this.addPendingMark(mark3);
  }
  var startIn = this.top;
  if (nodeType2 && nodeType2.isLeaf) {
    this.findInside(dom);
  } else if (continueAfter) {
    this.addElement(dom, continueAfter);
  } else if (rule.getContent) {
    this.findInside(dom);
    rule.getContent(dom, this.parser.schema).forEach(function(node4) {
      return this$1$1.insertNode(node4);
    });
  } else {
    var contentDOM = rule.contentElement;
    if (typeof contentDOM == "string") {
      contentDOM = dom.querySelector(contentDOM);
    } else if (typeof contentDOM == "function") {
      contentDOM = contentDOM(dom);
    }
    if (!contentDOM) {
      contentDOM = dom;
    }
    this.findAround(dom, contentDOM, true);
    this.addAll(contentDOM, sync2);
  }
  if (sync2) {
    this.sync(startIn);
    this.open--;
  }
  if (mark3) {
    this.removePendingMark(mark3, startIn);
  }
};
ParseContext.prototype.addAll = function addAll(parent, sync2, startIndex, endIndex) {
  var index2 = startIndex || 0;
  for (var dom = startIndex ? parent.childNodes[startIndex] : parent.firstChild, end3 = endIndex == null ? null : parent.childNodes[endIndex]; dom != end3; dom = dom.nextSibling, ++index2) {
    this.findAtPoint(parent, index2);
    this.addDOM(dom);
    if (sync2 && blockTags.hasOwnProperty(dom.nodeName.toLowerCase())) {
      this.sync(sync2);
    }
  }
  this.findAtPoint(parent, index2);
};
ParseContext.prototype.findPlace = function findPlace(node4) {
  var route, sync2;
  for (var depth = this.open; depth >= 0; depth--) {
    var cx = this.nodes[depth];
    var found2 = cx.findWrapping(node4);
    if (found2 && (!route || route.length > found2.length)) {
      route = found2;
      sync2 = cx;
      if (!found2.length) {
        break;
      }
    }
    if (cx.solid) {
      break;
    }
  }
  if (!route) {
    return false;
  }
  this.sync(sync2);
  for (var i2 = 0; i2 < route.length; i2++) {
    this.enterInner(route[i2], null, false);
  }
  return true;
};
ParseContext.prototype.insertNode = function insertNode(node4) {
  if (node4.isInline && this.needsBlock && !this.top.type) {
    var block = this.textblockFromContext();
    if (block) {
      this.enterInner(block);
    }
  }
  if (this.findPlace(node4)) {
    this.closeExtra();
    var top2 = this.top;
    top2.applyPending(node4.type);
    if (top2.match) {
      top2.match = top2.match.matchType(node4.type);
    }
    var marks2 = top2.activeMarks;
    for (var i2 = 0; i2 < node4.marks.length; i2++) {
      if (!top2.type || top2.type.allowsMarkType(node4.marks[i2].type)) {
        marks2 = node4.marks[i2].addToSet(marks2);
      }
    }
    top2.content.push(node4.mark(marks2));
    return true;
  }
  return false;
};
ParseContext.prototype.enter = function enter2(type, attrs, preserveWS) {
  var ok2 = this.findPlace(type.create(attrs));
  if (ok2) {
    this.enterInner(type, attrs, true, preserveWS);
  }
  return ok2;
};
ParseContext.prototype.enterInner = function enterInner(type, attrs, solid, preserveWS) {
  this.closeExtra();
  var top2 = this.top;
  top2.applyPending(type);
  top2.match = top2.match && top2.match.matchType(type, attrs);
  var options = wsOptionsFor(type, preserveWS, top2.options);
  if (top2.options & OPT_OPEN_LEFT && top2.content.length == 0) {
    options |= OPT_OPEN_LEFT;
  }
  this.nodes.push(new NodeContext(type, attrs, top2.activeMarks, top2.pendingMarks, solid, null, options));
  this.open++;
};
ParseContext.prototype.closeExtra = function closeExtra(openEnd) {
  var i2 = this.nodes.length - 1;
  if (i2 > this.open) {
    for (; i2 > this.open; i2--) {
      this.nodes[i2 - 1].content.push(this.nodes[i2].finish(openEnd));
    }
    this.nodes.length = this.open + 1;
  }
};
ParseContext.prototype.finish = function finish2() {
  this.open = 0;
  this.closeExtra(this.isOpen);
  return this.nodes[0].finish(this.isOpen || this.options.topOpen);
};
ParseContext.prototype.sync = function sync(to) {
  for (var i2 = this.open; i2 >= 0; i2--) {
    if (this.nodes[i2] == to) {
      this.open = i2;
      return;
    }
  }
};
prototypeAccessors$6.currentPos.get = function() {
  this.closeExtra();
  var pos = 0;
  for (var i2 = this.open; i2 >= 0; i2--) {
    var content2 = this.nodes[i2].content;
    for (var j = content2.length - 1; j >= 0; j--) {
      pos += content2[j].nodeSize;
    }
    if (i2) {
      pos++;
    }
  }
  return pos;
};
ParseContext.prototype.findAtPoint = function findAtPoint(parent, offset3) {
  if (this.find) {
    for (var i2 = 0; i2 < this.find.length; i2++) {
      if (this.find[i2].node == parent && this.find[i2].offset == offset3) {
        this.find[i2].pos = this.currentPos;
      }
    }
  }
};
ParseContext.prototype.findInside = function findInside(parent) {
  if (this.find) {
    for (var i2 = 0; i2 < this.find.length; i2++) {
      if (this.find[i2].pos == null && parent.nodeType == 1 && parent.contains(this.find[i2].node)) {
        this.find[i2].pos = this.currentPos;
      }
    }
  }
};
ParseContext.prototype.findAround = function findAround(parent, content2, before2) {
  if (parent != content2 && this.find) {
    for (var i2 = 0; i2 < this.find.length; i2++) {
      if (this.find[i2].pos == null && parent.nodeType == 1 && parent.contains(this.find[i2].node)) {
        var pos = content2.compareDocumentPosition(this.find[i2].node);
        if (pos & (before2 ? 2 : 4)) {
          this.find[i2].pos = this.currentPos;
        }
      }
    }
  }
};
ParseContext.prototype.findInText = function findInText(textNode) {
  if (this.find) {
    for (var i2 = 0; i2 < this.find.length; i2++) {
      if (this.find[i2].node == textNode) {
        this.find[i2].pos = this.currentPos - (textNode.nodeValue.length - this.find[i2].offset);
      }
    }
  }
};
ParseContext.prototype.matchesContext = function matchesContext(context) {
  var this$1$1 = this;
  if (context.indexOf("|") > -1) {
    return context.split(/\s*\|\s*/).some(this.matchesContext, this);
  }
  var parts = context.split("/");
  var option = this.options.context;
  var useRoot = !this.isOpen && (!option || option.parent.type == this.nodes[0].type);
  var minDepth = -(option ? option.depth + 1 : 0) + (useRoot ? 0 : 1);
  var match = function(i2, depth) {
    for (; i2 >= 0; i2--) {
      var part = parts[i2];
      if (part == "") {
        if (i2 == parts.length - 1 || i2 == 0) {
          continue;
        }
        for (; depth >= minDepth; depth--) {
          if (match(i2 - 1, depth)) {
            return true;
          }
        }
        return false;
      } else {
        var next = depth > 0 || depth == 0 && useRoot ? this$1$1.nodes[depth].type : option && depth >= minDepth ? option.node(depth - minDepth).type : null;
        if (!next || next.name != part && next.groups.indexOf(part) == -1) {
          return false;
        }
        depth--;
      }
    }
    return true;
  };
  return match(parts.length - 1, this.open);
};
ParseContext.prototype.textblockFromContext = function textblockFromContext() {
  var $context = this.options.context;
  if ($context) {
    for (var d = $context.depth; d >= 0; d--) {
      var deflt = $context.node(d).contentMatchAt($context.indexAfter(d)).defaultType;
      if (deflt && deflt.isTextblock && deflt.defaultAttrs) {
        return deflt;
      }
    }
  }
  for (var name in this.parser.schema.nodes) {
    var type = this.parser.schema.nodes[name];
    if (type.isTextblock && type.defaultAttrs) {
      return type;
    }
  }
};
ParseContext.prototype.addPendingMark = function addPendingMark(mark3) {
  var found2 = findSameMarkInSet(mark3, this.top.pendingMarks);
  if (found2) {
    this.top.stashMarks.push(found2);
  }
  this.top.pendingMarks = mark3.addToSet(this.top.pendingMarks);
};
ParseContext.prototype.removePendingMark = function removePendingMark(mark3, upto) {
  for (var depth = this.open; depth >= 0; depth--) {
    var level = this.nodes[depth];
    var found2 = level.pendingMarks.lastIndexOf(mark3);
    if (found2 > -1) {
      level.pendingMarks = mark3.removeFromSet(level.pendingMarks);
    } else {
      level.activeMarks = mark3.removeFromSet(level.activeMarks);
      var stashMark = level.popFromStashMark(mark3);
      if (stashMark && level.type && level.type.allowsMarkType(stashMark.type)) {
        level.activeMarks = stashMark.addToSet(level.activeMarks);
      }
    }
    if (level == upto) {
      break;
    }
  }
};
Object.defineProperties(ParseContext.prototype, prototypeAccessors$6);
function normalizeList(dom) {
  for (var child3 = dom.firstChild, prevItem = null; child3; child3 = child3.nextSibling) {
    var name = child3.nodeType == 1 ? child3.nodeName.toLowerCase() : null;
    if (name && listTags.hasOwnProperty(name) && prevItem) {
      prevItem.appendChild(child3);
      child3 = prevItem;
    } else if (name == "li") {
      prevItem = child3;
    } else if (name) {
      prevItem = null;
    }
  }
}
function matches(dom, selector) {
  return (dom.matches || dom.msMatchesSelector || dom.webkitMatchesSelector || dom.mozMatchesSelector).call(dom, selector);
}
function parseStyles(style2) {
  var re = /\s*([\w-]+)\s*:\s*([^;]+)/g, m, result2 = [];
  while (m = re.exec(style2)) {
    result2.push(m[1], m[2].trim());
  }
  return result2;
}
function copy(obj) {
  var copy5 = {};
  for (var prop2 in obj) {
    copy5[prop2] = obj[prop2];
  }
  return copy5;
}
function markMayApply(markType, nodeType2) {
  var nodes = nodeType2.schema.nodes;
  var loop = function(name2) {
    var parent = nodes[name2];
    if (!parent.allowsMarkType(markType)) {
      return;
    }
    var seen = [], scan = function(match) {
      seen.push(match);
      for (var i2 = 0; i2 < match.edgeCount; i2++) {
        var ref2 = match.edge(i2);
        var type = ref2.type;
        var next = ref2.next;
        if (type == nodeType2) {
          return true;
        }
        if (seen.indexOf(next) < 0 && scan(next)) {
          return true;
        }
      }
    };
    if (scan(parent.contentMatch)) {
      return { v: true };
    }
  };
  for (var name in nodes) {
    var returned = loop(name);
    if (returned)
      return returned.v;
  }
}
function findSameMarkInSet(mark3, set3) {
  for (var i2 = 0; i2 < set3.length; i2++) {
    if (mark3.eq(set3[i2])) {
      return set3[i2];
    }
  }
}
var DOMSerializer = function DOMSerializer2(nodes, marks2) {
  this.nodes = nodes || {};
  this.marks = marks2 || {};
};
DOMSerializer.prototype.serializeFragment = function serializeFragment(fragment, options, target) {
  var this$1$1 = this;
  if (options === void 0)
    options = {};
  if (!target) {
    target = doc(options).createDocumentFragment();
  }
  var top2 = target, active = null;
  fragment.forEach(function(node4) {
    if (active || node4.marks.length) {
      if (!active) {
        active = [];
      }
      var keep = 0, rendered = 0;
      while (keep < active.length && rendered < node4.marks.length) {
        var next = node4.marks[rendered];
        if (!this$1$1.marks[next.type.name]) {
          rendered++;
          continue;
        }
        if (!next.eq(active[keep]) || next.type.spec.spanning === false) {
          break;
        }
        keep += 2;
        rendered++;
      }
      while (keep < active.length) {
        top2 = active.pop();
        active.pop();
      }
      while (rendered < node4.marks.length) {
        var add3 = node4.marks[rendered++];
        var markDOM = this$1$1.serializeMark(add3, node4.isInline, options);
        if (markDOM) {
          active.push(add3, top2);
          top2.appendChild(markDOM.dom);
          top2 = markDOM.contentDOM || markDOM.dom;
        }
      }
    }
    top2.appendChild(this$1$1.serializeNodeInner(node4, options));
  });
  return target;
};
DOMSerializer.prototype.serializeNodeInner = function serializeNodeInner(node4, options) {
  if (options === void 0)
    options = {};
  var ref2 = DOMSerializer.renderSpec(doc(options), this.nodes[node4.type.name](node4));
  var dom = ref2.dom;
  var contentDOM = ref2.contentDOM;
  if (contentDOM) {
    if (node4.isLeaf) {
      throw new RangeError("Content hole not allowed in a leaf node spec");
    }
    if (options.onContent) {
      options.onContent(node4, contentDOM, options);
    } else {
      this.serializeFragment(node4.content, options, contentDOM);
    }
  }
  return dom;
};
DOMSerializer.prototype.serializeNode = function serializeNode(node4, options) {
  if (options === void 0)
    options = {};
  var dom = this.serializeNodeInner(node4, options);
  for (var i2 = node4.marks.length - 1; i2 >= 0; i2--) {
    var wrap = this.serializeMark(node4.marks[i2], node4.isInline, options);
    if (wrap) {
      (wrap.contentDOM || wrap.dom).appendChild(dom);
      dom = wrap.dom;
    }
  }
  return dom;
};
DOMSerializer.prototype.serializeMark = function serializeMark(mark3, inline2, options) {
  if (options === void 0)
    options = {};
  var toDOM = this.marks[mark3.type.name];
  return toDOM && DOMSerializer.renderSpec(doc(options), toDOM(mark3, inline2));
};
DOMSerializer.renderSpec = function renderSpec(doc2, structure, xmlNS) {
  if (xmlNS === void 0)
    xmlNS = null;
  if (typeof structure == "string") {
    return { dom: doc2.createTextNode(structure) };
  }
  if (structure.nodeType != null) {
    return { dom: structure };
  }
  if (structure.dom && structure.dom.nodeType != null) {
    return structure;
  }
  var tagName = structure[0], space = tagName.indexOf(" ");
  if (space > 0) {
    xmlNS = tagName.slice(0, space);
    tagName = tagName.slice(space + 1);
  }
  var contentDOM = null, dom = xmlNS ? doc2.createElementNS(xmlNS, tagName) : doc2.createElement(tagName);
  var attrs = structure[1], start4 = 1;
  if (attrs && typeof attrs == "object" && attrs.nodeType == null && !Array.isArray(attrs)) {
    start4 = 2;
    for (var name in attrs) {
      if (attrs[name] != null) {
        var space$1 = name.indexOf(" ");
        if (space$1 > 0) {
          dom.setAttributeNS(name.slice(0, space$1), name.slice(space$1 + 1), attrs[name]);
        } else {
          dom.setAttribute(name, attrs[name]);
        }
      }
    }
  }
  for (var i2 = start4; i2 < structure.length; i2++) {
    var child3 = structure[i2];
    if (child3 === 0) {
      if (i2 < structure.length - 1 || i2 > start4) {
        throw new RangeError("Content hole must be the only child of its parent node");
      }
      return { dom, contentDOM: dom };
    } else {
      var ref2 = DOMSerializer.renderSpec(doc2, child3, xmlNS);
      var inner = ref2.dom;
      var innerContent = ref2.contentDOM;
      dom.appendChild(inner);
      if (innerContent) {
        if (contentDOM) {
          throw new RangeError("Multiple content holes");
        }
        contentDOM = innerContent;
      }
    }
  }
  return { dom, contentDOM };
};
DOMSerializer.fromSchema = function fromSchema2(schema) {
  return schema.cached.domSerializer || (schema.cached.domSerializer = new DOMSerializer(this.nodesFromSchema(schema), this.marksFromSchema(schema)));
};
DOMSerializer.nodesFromSchema = function nodesFromSchema(schema) {
  var result2 = gatherToDOM(schema.nodes);
  if (!result2.text) {
    result2.text = function(node4) {
      return node4.text;
    };
  }
  return result2;
};
DOMSerializer.marksFromSchema = function marksFromSchema(schema) {
  return gatherToDOM(schema.marks);
};
function gatherToDOM(obj) {
  var result2 = {};
  for (var name in obj) {
    var toDOM = obj[name].spec.toDOM;
    if (toDOM) {
      result2[name] = toDOM;
    }
  }
  return result2;
}
function doc(options) {
  return options.document || window.document;
}
var lower16 = 65535;
var factor16 = Math.pow(2, 16);
function makeRecover(index2, offset3) {
  return index2 + offset3 * factor16;
}
function recoverIndex(value) {
  return value & lower16;
}
function recoverOffset(value) {
  return (value - (value & lower16)) / factor16;
}
var MapResult = function MapResult2(pos, deleted, recover2) {
  if (deleted === void 0)
    deleted = false;
  if (recover2 === void 0)
    recover2 = null;
  this.pos = pos;
  this.deleted = deleted;
  this.recover = recover2;
};
var StepMap = function StepMap2(ranges, inverted) {
  if (inverted === void 0)
    inverted = false;
  if (!ranges.length && StepMap2.empty) {
    return StepMap2.empty;
  }
  this.ranges = ranges;
  this.inverted = inverted;
};
StepMap.prototype.recover = function recover(value) {
  var diff = 0, index2 = recoverIndex(value);
  if (!this.inverted) {
    for (var i2 = 0; i2 < index2; i2++) {
      diff += this.ranges[i2 * 3 + 2] - this.ranges[i2 * 3 + 1];
    }
  }
  return this.ranges[index2 * 3] + diff + recoverOffset(value);
};
StepMap.prototype.mapResult = function mapResult(pos, assoc) {
  if (assoc === void 0)
    assoc = 1;
  return this._map(pos, assoc, false);
};
StepMap.prototype.map = function map(pos, assoc) {
  if (assoc === void 0)
    assoc = 1;
  return this._map(pos, assoc, true);
};
StepMap.prototype._map = function _map(pos, assoc, simple) {
  var diff = 0, oldIndex = this.inverted ? 2 : 1, newIndex = this.inverted ? 1 : 2;
  for (var i2 = 0; i2 < this.ranges.length; i2 += 3) {
    var start4 = this.ranges[i2] - (this.inverted ? diff : 0);
    if (start4 > pos) {
      break;
    }
    var oldSize = this.ranges[i2 + oldIndex], newSize = this.ranges[i2 + newIndex], end3 = start4 + oldSize;
    if (pos <= end3) {
      var side = !oldSize ? assoc : pos == start4 ? -1 : pos == end3 ? 1 : assoc;
      var result2 = start4 + diff + (side < 0 ? 0 : newSize);
      if (simple) {
        return result2;
      }
      var recover2 = pos == (assoc < 0 ? start4 : end3) ? null : makeRecover(i2 / 3, pos - start4);
      return new MapResult(result2, assoc < 0 ? pos != start4 : pos != end3, recover2);
    }
    diff += newSize - oldSize;
  }
  return simple ? pos + diff : new MapResult(pos + diff);
};
StepMap.prototype.touches = function touches(pos, recover2) {
  var diff = 0, index2 = recoverIndex(recover2);
  var oldIndex = this.inverted ? 2 : 1, newIndex = this.inverted ? 1 : 2;
  for (var i2 = 0; i2 < this.ranges.length; i2 += 3) {
    var start4 = this.ranges[i2] - (this.inverted ? diff : 0);
    if (start4 > pos) {
      break;
    }
    var oldSize = this.ranges[i2 + oldIndex], end3 = start4 + oldSize;
    if (pos <= end3 && i2 == index2 * 3) {
      return true;
    }
    diff += this.ranges[i2 + newIndex] - oldSize;
  }
  return false;
};
StepMap.prototype.forEach = function forEach4(f) {
  var oldIndex = this.inverted ? 2 : 1, newIndex = this.inverted ? 1 : 2;
  for (var i2 = 0, diff = 0; i2 < this.ranges.length; i2 += 3) {
    var start4 = this.ranges[i2], oldStart = start4 - (this.inverted ? diff : 0), newStart = start4 + (this.inverted ? 0 : diff);
    var oldSize = this.ranges[i2 + oldIndex], newSize = this.ranges[i2 + newIndex];
    f(oldStart, oldStart + oldSize, newStart, newStart + newSize);
    diff += newSize - oldSize;
  }
};
StepMap.prototype.invert = function invert() {
  return new StepMap(this.ranges, !this.inverted);
};
StepMap.prototype.toString = function toString6() {
  return (this.inverted ? "-" : "") + JSON.stringify(this.ranges);
};
StepMap.offset = function offset2(n) {
  return n == 0 ? StepMap.empty : new StepMap(n < 0 ? [0, -n, 0] : [0, 0, n]);
};
StepMap.empty = new StepMap([]);
var Mapping = function Mapping2(maps, mirror, from4, to) {
  this.maps = maps || [];
  this.from = from4 || 0;
  this.to = to == null ? this.maps.length : to;
  this.mirror = mirror;
};
Mapping.prototype.slice = function slice2(from4, to) {
  if (from4 === void 0)
    from4 = 0;
  if (to === void 0)
    to = this.maps.length;
  return new Mapping(this.maps, this.mirror, from4, to);
};
Mapping.prototype.copy = function copy3() {
  return new Mapping(this.maps.slice(), this.mirror && this.mirror.slice(), this.from, this.to);
};
Mapping.prototype.appendMap = function appendMap(map15, mirrors) {
  this.to = this.maps.push(map15);
  if (mirrors != null) {
    this.setMirror(this.maps.length - 1, mirrors);
  }
};
Mapping.prototype.appendMapping = function appendMapping(mapping) {
  for (var i2 = 0, startSize = this.maps.length; i2 < mapping.maps.length; i2++) {
    var mirr = mapping.getMirror(i2);
    this.appendMap(mapping.maps[i2], mirr != null && mirr < i2 ? startSize + mirr : null);
  }
};
Mapping.prototype.getMirror = function getMirror(n) {
  if (this.mirror) {
    for (var i2 = 0; i2 < this.mirror.length; i2++) {
      if (this.mirror[i2] == n) {
        return this.mirror[i2 + (i2 % 2 ? -1 : 1)];
      }
    }
  }
};
Mapping.prototype.setMirror = function setMirror(n, m) {
  if (!this.mirror) {
    this.mirror = [];
  }
  this.mirror.push(n, m);
};
Mapping.prototype.appendMappingInverted = function appendMappingInverted(mapping) {
  for (var i2 = mapping.maps.length - 1, totalSize = this.maps.length + mapping.maps.length; i2 >= 0; i2--) {
    var mirr = mapping.getMirror(i2);
    this.appendMap(mapping.maps[i2].invert(), mirr != null && mirr > i2 ? totalSize - mirr - 1 : null);
  }
};
Mapping.prototype.invert = function invert2() {
  var inverse = new Mapping();
  inverse.appendMappingInverted(this);
  return inverse;
};
Mapping.prototype.map = function map2(pos, assoc) {
  if (assoc === void 0)
    assoc = 1;
  if (this.mirror) {
    return this._map(pos, assoc, true);
  }
  for (var i2 = this.from; i2 < this.to; i2++) {
    pos = this.maps[i2].map(pos, assoc);
  }
  return pos;
};
Mapping.prototype.mapResult = function mapResult2(pos, assoc) {
  if (assoc === void 0)
    assoc = 1;
  return this._map(pos, assoc, false);
};
Mapping.prototype._map = function _map2(pos, assoc, simple) {
  var deleted = false;
  for (var i2 = this.from; i2 < this.to; i2++) {
    var map15 = this.maps[i2], result2 = map15.mapResult(pos, assoc);
    if (result2.recover != null) {
      var corr = this.getMirror(i2);
      if (corr != null && corr > i2 && corr < this.to) {
        i2 = corr;
        pos = this.maps[corr].recover(result2.recover);
        continue;
      }
    }
    if (result2.deleted) {
      deleted = true;
    }
    pos = result2.pos;
  }
  return simple ? pos : new MapResult(pos, deleted);
};
function TransformError(message) {
  var err2 = Error.call(this, message);
  err2.__proto__ = TransformError.prototype;
  return err2;
}
TransformError.prototype = Object.create(Error.prototype);
TransformError.prototype.constructor = TransformError;
TransformError.prototype.name = "TransformError";
var Transform = function Transform2(doc2) {
  this.doc = doc2;
  this.steps = [];
  this.docs = [];
  this.mapping = new Mapping();
};
var prototypeAccessors$4 = { before: { configurable: true }, docChanged: { configurable: true } };
prototypeAccessors$4.before.get = function() {
  return this.docs.length ? this.docs[0] : this.doc;
};
Transform.prototype.step = function step(object) {
  var result2 = this.maybeStep(object);
  if (result2.failed) {
    throw new TransformError(result2.failed);
  }
  return this;
};
Transform.prototype.maybeStep = function maybeStep(step2) {
  var result2 = step2.apply(this.doc);
  if (!result2.failed) {
    this.addStep(step2, result2.doc);
  }
  return result2;
};
prototypeAccessors$4.docChanged.get = function() {
  return this.steps.length > 0;
};
Transform.prototype.addStep = function addStep(step2, doc2) {
  this.docs.push(this.doc);
  this.steps.push(step2);
  this.mapping.appendMap(step2.getMap());
  this.doc = doc2;
};
Object.defineProperties(Transform.prototype, prototypeAccessors$4);
function mustOverride() {
  throw new Error("Override me");
}
var stepsByID = /* @__PURE__ */ Object.create(null);
var Step = function Step2() {
};
Step.prototype.apply = function apply2(_doc) {
  return mustOverride();
};
Step.prototype.getMap = function getMap() {
  return StepMap.empty;
};
Step.prototype.invert = function invert3(_doc) {
  return mustOverride();
};
Step.prototype.map = function map3(_mapping) {
  return mustOverride();
};
Step.prototype.merge = function merge(_other) {
  return null;
};
Step.prototype.toJSON = function toJSON5() {
  return mustOverride();
};
Step.fromJSON = function fromJSON5(schema, json) {
  if (!json || !json.stepType) {
    throw new RangeError("Invalid input for Step.fromJSON");
  }
  var type = stepsByID[json.stepType];
  if (!type) {
    throw new RangeError("No step type " + json.stepType + " defined");
  }
  return type.fromJSON(schema, json);
};
Step.jsonID = function jsonID(id, stepClass) {
  if (id in stepsByID) {
    throw new RangeError("Duplicate use of step JSON ID " + id);
  }
  stepsByID[id] = stepClass;
  stepClass.prototype.jsonID = id;
  return stepClass;
};
var StepResult = function StepResult2(doc2, failed) {
  this.doc = doc2;
  this.failed = failed;
};
StepResult.ok = function ok(doc2) {
  return new StepResult(doc2, null);
};
StepResult.fail = function fail(message) {
  return new StepResult(null, message);
};
StepResult.fromReplace = function fromReplace(doc2, from4, to, slice4) {
  try {
    return StepResult.ok(doc2.replace(from4, to, slice4));
  } catch (e) {
    if (e instanceof ReplaceError) {
      return StepResult.fail(e.message);
    }
    throw e;
  }
};
var ReplaceStep = /* @__PURE__ */ function(Step3) {
  function ReplaceStep2(from4, to, slice4, structure) {
    Step3.call(this);
    this.from = from4;
    this.to = to;
    this.slice = slice4;
    this.structure = !!structure;
  }
  if (Step3)
    ReplaceStep2.__proto__ = Step3;
  ReplaceStep2.prototype = Object.create(Step3 && Step3.prototype);
  ReplaceStep2.prototype.constructor = ReplaceStep2;
  ReplaceStep2.prototype.apply = function apply8(doc2) {
    if (this.structure && contentBetween(doc2, this.from, this.to)) {
      return StepResult.fail("Structure replace would overwrite content");
    }
    return StepResult.fromReplace(doc2, this.from, this.to, this.slice);
  };
  ReplaceStep2.prototype.getMap = function getMap2() {
    return new StepMap([this.from, this.to - this.from, this.slice.size]);
  };
  ReplaceStep2.prototype.invert = function invert4(doc2) {
    return new ReplaceStep2(this.from, this.from + this.slice.size, doc2.slice(this.from, this.to));
  };
  ReplaceStep2.prototype.map = function map15(mapping) {
    var from4 = mapping.mapResult(this.from, 1), to = mapping.mapResult(this.to, -1);
    if (from4.deleted && to.deleted) {
      return null;
    }
    return new ReplaceStep2(from4.pos, Math.max(from4.pos, to.pos), this.slice);
  };
  ReplaceStep2.prototype.merge = function merge3(other) {
    if (!(other instanceof ReplaceStep2) || other.structure || this.structure) {
      return null;
    }
    if (this.from + this.slice.size == other.from && !this.slice.openEnd && !other.slice.openStart) {
      var slice4 = this.slice.size + other.slice.size == 0 ? Slice.empty : new Slice(this.slice.content.append(other.slice.content), this.slice.openStart, other.slice.openEnd);
      return new ReplaceStep2(this.from, this.to + (other.to - other.from), slice4, this.structure);
    } else if (other.to == this.from && !this.slice.openStart && !other.slice.openEnd) {
      var slice$1 = this.slice.size + other.slice.size == 0 ? Slice.empty : new Slice(other.slice.content.append(this.slice.content), other.slice.openStart, this.slice.openEnd);
      return new ReplaceStep2(other.from, this.to, slice$1, this.structure);
    } else {
      return null;
    }
  };
  ReplaceStep2.prototype.toJSON = function toJSON7() {
    var json = { stepType: "replace", from: this.from, to: this.to };
    if (this.slice.size) {
      json.slice = this.slice.toJSON();
    }
    if (this.structure) {
      json.structure = true;
    }
    return json;
  };
  ReplaceStep2.fromJSON = function fromJSON8(schema, json) {
    if (typeof json.from != "number" || typeof json.to != "number") {
      throw new RangeError("Invalid input for ReplaceStep.fromJSON");
    }
    return new ReplaceStep2(json.from, json.to, Slice.fromJSON(schema, json.slice), !!json.structure);
  };
  return ReplaceStep2;
}(Step);
Step.jsonID("replace", ReplaceStep);
var ReplaceAroundStep = /* @__PURE__ */ function(Step3) {
  function ReplaceAroundStep2(from4, to, gapFrom, gapTo, slice4, insert, structure) {
    Step3.call(this);
    this.from = from4;
    this.to = to;
    this.gapFrom = gapFrom;
    this.gapTo = gapTo;
    this.slice = slice4;
    this.insert = insert;
    this.structure = !!structure;
  }
  if (Step3)
    ReplaceAroundStep2.__proto__ = Step3;
  ReplaceAroundStep2.prototype = Object.create(Step3 && Step3.prototype);
  ReplaceAroundStep2.prototype.constructor = ReplaceAroundStep2;
  ReplaceAroundStep2.prototype.apply = function apply8(doc2) {
    if (this.structure && (contentBetween(doc2, this.from, this.gapFrom) || contentBetween(doc2, this.gapTo, this.to))) {
      return StepResult.fail("Structure gap-replace would overwrite content");
    }
    var gap = doc2.slice(this.gapFrom, this.gapTo);
    if (gap.openStart || gap.openEnd) {
      return StepResult.fail("Gap is not a flat range");
    }
    var inserted = this.slice.insertAt(this.insert, gap.content);
    if (!inserted) {
      return StepResult.fail("Content does not fit in gap");
    }
    return StepResult.fromReplace(doc2, this.from, this.to, inserted);
  };
  ReplaceAroundStep2.prototype.getMap = function getMap2() {
    return new StepMap([
      this.from,
      this.gapFrom - this.from,
      this.insert,
      this.gapTo,
      this.to - this.gapTo,
      this.slice.size - this.insert
    ]);
  };
  ReplaceAroundStep2.prototype.invert = function invert4(doc2) {
    var gap = this.gapTo - this.gapFrom;
    return new ReplaceAroundStep2(this.from, this.from + this.slice.size + gap, this.from + this.insert, this.from + this.insert + gap, doc2.slice(this.from, this.to).removeBetween(this.gapFrom - this.from, this.gapTo - this.from), this.gapFrom - this.from, this.structure);
  };
  ReplaceAroundStep2.prototype.map = function map15(mapping) {
    var from4 = mapping.mapResult(this.from, 1), to = mapping.mapResult(this.to, -1);
    var gapFrom = mapping.map(this.gapFrom, -1), gapTo = mapping.map(this.gapTo, 1);
    if (from4.deleted && to.deleted || gapFrom < from4.pos || gapTo > to.pos) {
      return null;
    }
    return new ReplaceAroundStep2(from4.pos, to.pos, gapFrom, gapTo, this.slice, this.insert, this.structure);
  };
  ReplaceAroundStep2.prototype.toJSON = function toJSON7() {
    var json = {
      stepType: "replaceAround",
      from: this.from,
      to: this.to,
      gapFrom: this.gapFrom,
      gapTo: this.gapTo,
      insert: this.insert
    };
    if (this.slice.size) {
      json.slice = this.slice.toJSON();
    }
    if (this.structure) {
      json.structure = true;
    }
    return json;
  };
  ReplaceAroundStep2.fromJSON = function fromJSON8(schema, json) {
    if (typeof json.from != "number" || typeof json.to != "number" || typeof json.gapFrom != "number" || typeof json.gapTo != "number" || typeof json.insert != "number") {
      throw new RangeError("Invalid input for ReplaceAroundStep.fromJSON");
    }
    return new ReplaceAroundStep2(json.from, json.to, json.gapFrom, json.gapTo, Slice.fromJSON(schema, json.slice), json.insert, !!json.structure);
  };
  return ReplaceAroundStep2;
}(Step);
Step.jsonID("replaceAround", ReplaceAroundStep);
function contentBetween(doc2, from4, to) {
  var $from = doc2.resolve(from4), dist = to - from4, depth = $from.depth;
  while (dist > 0 && depth > 0 && $from.indexAfter(depth) == $from.node(depth).childCount) {
    depth--;
    dist--;
  }
  if (dist > 0) {
    var next = $from.node(depth).maybeChild($from.indexAfter(depth));
    while (dist > 0) {
      if (!next || next.isLeaf) {
        return true;
      }
      next = next.firstChild;
      dist--;
    }
  }
  return false;
}
function canCut(node4, start4, end3) {
  return (start4 == 0 || node4.canReplace(start4, node4.childCount)) && (end3 == node4.childCount || node4.canReplace(0, end3));
}
function liftTarget(range) {
  var parent = range.parent;
  var content2 = parent.content.cutByIndex(range.startIndex, range.endIndex);
  for (var depth = range.depth; ; --depth) {
    var node4 = range.$from.node(depth);
    var index2 = range.$from.index(depth), endIndex = range.$to.indexAfter(depth);
    if (depth < range.depth && node4.canReplace(index2, endIndex, content2)) {
      return depth;
    }
    if (depth == 0 || node4.type.spec.isolating || !canCut(node4, index2, endIndex)) {
      break;
    }
  }
}
Transform.prototype.lift = function(range, target) {
  var $from = range.$from;
  var $to = range.$to;
  var depth = range.depth;
  var gapStart = $from.before(depth + 1), gapEnd = $to.after(depth + 1);
  var start4 = gapStart, end3 = gapEnd;
  var before2 = Fragment.empty, openStart = 0;
  for (var d = depth, splitting = false; d > target; d--) {
    if (splitting || $from.index(d) > 0) {
      splitting = true;
      before2 = Fragment.from($from.node(d).copy(before2));
      openStart++;
    } else {
      start4--;
    }
  }
  var after2 = Fragment.empty, openEnd = 0;
  for (var d$1 = depth, splitting$1 = false; d$1 > target; d$1--) {
    if (splitting$1 || $to.after(d$1 + 1) < $to.end(d$1)) {
      splitting$1 = true;
      after2 = Fragment.from($to.node(d$1).copy(after2));
      openEnd++;
    } else {
      end3++;
    }
  }
  return this.step(new ReplaceAroundStep(start4, end3, gapStart, gapEnd, new Slice(before2.append(after2), openStart, openEnd), before2.size - openStart, true));
};
function findWrapping(range, nodeType2, attrs, innerRange) {
  if (innerRange === void 0)
    innerRange = range;
  var around = findWrappingOutside(range, nodeType2);
  var inner = around && findWrappingInside(innerRange, nodeType2);
  if (!inner) {
    return null;
  }
  return around.map(withAttrs).concat({ type: nodeType2, attrs }).concat(inner.map(withAttrs));
}
function withAttrs(type) {
  return { type, attrs: null };
}
function findWrappingOutside(range, type) {
  var parent = range.parent;
  var startIndex = range.startIndex;
  var endIndex = range.endIndex;
  var around = parent.contentMatchAt(startIndex).findWrapping(type);
  if (!around) {
    return null;
  }
  var outer = around.length ? around[0] : type;
  return parent.canReplaceWith(startIndex, endIndex, outer) ? around : null;
}
function findWrappingInside(range, type) {
  var parent = range.parent;
  var startIndex = range.startIndex;
  var endIndex = range.endIndex;
  var inner = parent.child(startIndex);
  var inside = type.contentMatch.findWrapping(inner.type);
  if (!inside) {
    return null;
  }
  var lastType = inside.length ? inside[inside.length - 1] : type;
  var innerMatch = lastType.contentMatch;
  for (var i2 = startIndex; innerMatch && i2 < endIndex; i2++) {
    innerMatch = innerMatch.matchType(parent.child(i2).type);
  }
  if (!innerMatch || !innerMatch.validEnd) {
    return null;
  }
  return inside;
}
Transform.prototype.wrap = function(range, wrappers) {
  var content2 = Fragment.empty;
  for (var i2 = wrappers.length - 1; i2 >= 0; i2--) {
    if (content2.size) {
      var match = wrappers[i2].type.contentMatch.matchFragment(content2);
      if (!match || !match.validEnd) {
        throw new RangeError("Wrapper type given to Transform.wrap does not form valid content of its parent wrapper");
      }
    }
    content2 = Fragment.from(wrappers[i2].type.create(wrappers[i2].attrs, content2));
  }
  var start4 = range.start, end3 = range.end;
  return this.step(new ReplaceAroundStep(start4, end3, start4, end3, new Slice(content2, 0, 0), wrappers.length, true));
};
Transform.prototype.setBlockType = function(from4, to, type, attrs) {
  var this$1$1 = this;
  if (to === void 0)
    to = from4;
  if (!type.isTextblock) {
    throw new RangeError("Type given to setBlockType should be a textblock");
  }
  var mapFrom = this.steps.length;
  this.doc.nodesBetween(from4, to, function(node4, pos) {
    if (node4.isTextblock && !node4.hasMarkup(type, attrs) && canChangeType(this$1$1.doc, this$1$1.mapping.slice(mapFrom).map(pos), type)) {
      this$1$1.clearIncompatible(this$1$1.mapping.slice(mapFrom).map(pos, 1), type);
      var mapping = this$1$1.mapping.slice(mapFrom);
      var startM = mapping.map(pos, 1), endM = mapping.map(pos + node4.nodeSize, 1);
      this$1$1.step(new ReplaceAroundStep(startM, endM, startM + 1, endM - 1, new Slice(Fragment.from(type.create(attrs, null, node4.marks)), 0, 0), 1, true));
      return false;
    }
  });
  return this;
};
function canChangeType(doc2, pos, type) {
  var $pos = doc2.resolve(pos), index2 = $pos.index();
  return $pos.parent.canReplaceWith(index2, index2 + 1, type);
}
Transform.prototype.setNodeMarkup = function(pos, type, attrs, marks2) {
  var node4 = this.doc.nodeAt(pos);
  if (!node4) {
    throw new RangeError("No node at given position");
  }
  if (!type) {
    type = node4.type;
  }
  var newNode = type.create(attrs, null, marks2 || node4.marks);
  if (node4.isLeaf) {
    return this.replaceWith(pos, pos + node4.nodeSize, newNode);
  }
  if (!type.validContent(node4.content)) {
    throw new RangeError("Invalid content for node type " + type.name);
  }
  return this.step(new ReplaceAroundStep(pos, pos + node4.nodeSize, pos + 1, pos + node4.nodeSize - 1, new Slice(Fragment.from(newNode), 0, 0), 1, true));
};
function canSplit(doc2, pos, depth, typesAfter) {
  if (depth === void 0)
    depth = 1;
  var $pos = doc2.resolve(pos), base2 = $pos.depth - depth;
  var innerType = typesAfter && typesAfter[typesAfter.length - 1] || $pos.parent;
  if (base2 < 0 || $pos.parent.type.spec.isolating || !$pos.parent.canReplace($pos.index(), $pos.parent.childCount) || !innerType.type.validContent($pos.parent.content.cutByIndex($pos.index(), $pos.parent.childCount))) {
    return false;
  }
  for (var d = $pos.depth - 1, i2 = depth - 2; d > base2; d--, i2--) {
    var node4 = $pos.node(d), index$1 = $pos.index(d);
    if (node4.type.spec.isolating) {
      return false;
    }
    var rest = node4.content.cutByIndex(index$1, node4.childCount);
    var after2 = typesAfter && typesAfter[i2] || node4;
    if (after2 != node4) {
      rest = rest.replaceChild(0, after2.type.create(after2.attrs));
    }
    if (!node4.canReplace(index$1 + 1, node4.childCount) || !after2.type.validContent(rest)) {
      return false;
    }
  }
  var index2 = $pos.indexAfter(base2);
  var baseType = typesAfter && typesAfter[0];
  return $pos.node(base2).canReplaceWith(index2, index2, baseType ? baseType.type : $pos.node(base2 + 1).type);
}
Transform.prototype.split = function(pos, depth, typesAfter) {
  if (depth === void 0)
    depth = 1;
  var $pos = this.doc.resolve(pos), before2 = Fragment.empty, after2 = Fragment.empty;
  for (var d = $pos.depth, e = $pos.depth - depth, i2 = depth - 1; d > e; d--, i2--) {
    before2 = Fragment.from($pos.node(d).copy(before2));
    var typeAfter = typesAfter && typesAfter[i2];
    after2 = Fragment.from(typeAfter ? typeAfter.type.create(typeAfter.attrs, after2) : $pos.node(d).copy(after2));
  }
  return this.step(new ReplaceStep(pos, pos, new Slice(before2.append(after2), depth, depth), true));
};
function canJoin(doc2, pos) {
  var $pos = doc2.resolve(pos), index2 = $pos.index();
  return joinable($pos.nodeBefore, $pos.nodeAfter) && $pos.parent.canReplace(index2, index2 + 1);
}
function joinable(a2, b) {
  return a2 && b && !a2.isLeaf && a2.canAppend(b);
}
Transform.prototype.join = function(pos, depth) {
  if (depth === void 0)
    depth = 1;
  var step2 = new ReplaceStep(pos - depth, pos + depth, Slice.empty, true);
  return this.step(step2);
};
function insertPoint(doc2, pos, nodeType2) {
  var $pos = doc2.resolve(pos);
  if ($pos.parent.canReplaceWith($pos.index(), $pos.index(), nodeType2)) {
    return pos;
  }
  if ($pos.parentOffset == 0) {
    for (var d = $pos.depth - 1; d >= 0; d--) {
      var index2 = $pos.index(d);
      if ($pos.node(d).canReplaceWith(index2, index2, nodeType2)) {
        return $pos.before(d + 1);
      }
      if (index2 > 0) {
        return null;
      }
    }
  }
  if ($pos.parentOffset == $pos.parent.content.size) {
    for (var d$1 = $pos.depth - 1; d$1 >= 0; d$1--) {
      var index$1 = $pos.indexAfter(d$1);
      if ($pos.node(d$1).canReplaceWith(index$1, index$1, nodeType2)) {
        return $pos.after(d$1 + 1);
      }
      if (index$1 < $pos.node(d$1).childCount) {
        return null;
      }
    }
  }
}
function dropPoint(doc2, pos, slice4) {
  var $pos = doc2.resolve(pos);
  if (!slice4.content.size) {
    return pos;
  }
  var content2 = slice4.content;
  for (var i2 = 0; i2 < slice4.openStart; i2++) {
    content2 = content2.firstChild.content;
  }
  for (var pass = 1; pass <= (slice4.openStart == 0 && slice4.size ? 2 : 1); pass++) {
    for (var d = $pos.depth; d >= 0; d--) {
      var bias = d == $pos.depth ? 0 : $pos.pos <= ($pos.start(d + 1) + $pos.end(d + 1)) / 2 ? -1 : 1;
      var insertPos = $pos.index(d) + (bias > 0 ? 1 : 0);
      var parent = $pos.node(d), fits = false;
      if (pass == 1) {
        fits = parent.canReplace(insertPos, insertPos, content2);
      } else {
        var wrapping = parent.contentMatchAt(insertPos).findWrapping(content2.firstChild.type);
        fits = wrapping && parent.canReplaceWith(insertPos, insertPos, wrapping[0]);
      }
      if (fits) {
        return bias == 0 ? $pos.pos : bias < 0 ? $pos.before(d + 1) : $pos.after(d + 1);
      }
    }
  }
  return null;
}
function mapFragment(fragment, f, parent) {
  var mapped = [];
  for (var i2 = 0; i2 < fragment.childCount; i2++) {
    var child3 = fragment.child(i2);
    if (child3.content.size) {
      child3 = child3.copy(mapFragment(child3.content, f, child3));
    }
    if (child3.isInline) {
      child3 = f(child3, parent, i2);
    }
    mapped.push(child3);
  }
  return Fragment.fromArray(mapped);
}
var AddMarkStep = /* @__PURE__ */ function(Step3) {
  function AddMarkStep2(from4, to, mark3) {
    Step3.call(this);
    this.from = from4;
    this.to = to;
    this.mark = mark3;
  }
  if (Step3)
    AddMarkStep2.__proto__ = Step3;
  AddMarkStep2.prototype = Object.create(Step3 && Step3.prototype);
  AddMarkStep2.prototype.constructor = AddMarkStep2;
  AddMarkStep2.prototype.apply = function apply8(doc2) {
    var this$1$1 = this;
    var oldSlice = doc2.slice(this.from, this.to), $from = doc2.resolve(this.from);
    var parent = $from.node($from.sharedDepth(this.to));
    var slice4 = new Slice(mapFragment(oldSlice.content, function(node4, parent2) {
      if (!node4.isAtom || !parent2.type.allowsMarkType(this$1$1.mark.type)) {
        return node4;
      }
      return node4.mark(this$1$1.mark.addToSet(node4.marks));
    }, parent), oldSlice.openStart, oldSlice.openEnd);
    return StepResult.fromReplace(doc2, this.from, this.to, slice4);
  };
  AddMarkStep2.prototype.invert = function invert4() {
    return new RemoveMarkStep(this.from, this.to, this.mark);
  };
  AddMarkStep2.prototype.map = function map15(mapping) {
    var from4 = mapping.mapResult(this.from, 1), to = mapping.mapResult(this.to, -1);
    if (from4.deleted && to.deleted || from4.pos >= to.pos) {
      return null;
    }
    return new AddMarkStep2(from4.pos, to.pos, this.mark);
  };
  AddMarkStep2.prototype.merge = function merge3(other) {
    if (other instanceof AddMarkStep2 && other.mark.eq(this.mark) && this.from <= other.to && this.to >= other.from) {
      return new AddMarkStep2(Math.min(this.from, other.from), Math.max(this.to, other.to), this.mark);
    }
  };
  AddMarkStep2.prototype.toJSON = function toJSON7() {
    return {
      stepType: "addMark",
      mark: this.mark.toJSON(),
      from: this.from,
      to: this.to
    };
  };
  AddMarkStep2.fromJSON = function fromJSON8(schema, json) {
    if (typeof json.from != "number" || typeof json.to != "number") {
      throw new RangeError("Invalid input for AddMarkStep.fromJSON");
    }
    return new AddMarkStep2(json.from, json.to, schema.markFromJSON(json.mark));
  };
  return AddMarkStep2;
}(Step);
Step.jsonID("addMark", AddMarkStep);
var RemoveMarkStep = /* @__PURE__ */ function(Step3) {
  function RemoveMarkStep2(from4, to, mark3) {
    Step3.call(this);
    this.from = from4;
    this.to = to;
    this.mark = mark3;
  }
  if (Step3)
    RemoveMarkStep2.__proto__ = Step3;
  RemoveMarkStep2.prototype = Object.create(Step3 && Step3.prototype);
  RemoveMarkStep2.prototype.constructor = RemoveMarkStep2;
  RemoveMarkStep2.prototype.apply = function apply8(doc2) {
    var this$1$1 = this;
    var oldSlice = doc2.slice(this.from, this.to);
    var slice4 = new Slice(mapFragment(oldSlice.content, function(node4) {
      return node4.mark(this$1$1.mark.removeFromSet(node4.marks));
    }), oldSlice.openStart, oldSlice.openEnd);
    return StepResult.fromReplace(doc2, this.from, this.to, slice4);
  };
  RemoveMarkStep2.prototype.invert = function invert4() {
    return new AddMarkStep(this.from, this.to, this.mark);
  };
  RemoveMarkStep2.prototype.map = function map15(mapping) {
    var from4 = mapping.mapResult(this.from, 1), to = mapping.mapResult(this.to, -1);
    if (from4.deleted && to.deleted || from4.pos >= to.pos) {
      return null;
    }
    return new RemoveMarkStep2(from4.pos, to.pos, this.mark);
  };
  RemoveMarkStep2.prototype.merge = function merge3(other) {
    if (other instanceof RemoveMarkStep2 && other.mark.eq(this.mark) && this.from <= other.to && this.to >= other.from) {
      return new RemoveMarkStep2(Math.min(this.from, other.from), Math.max(this.to, other.to), this.mark);
    }
  };
  RemoveMarkStep2.prototype.toJSON = function toJSON7() {
    return {
      stepType: "removeMark",
      mark: this.mark.toJSON(),
      from: this.from,
      to: this.to
    };
  };
  RemoveMarkStep2.fromJSON = function fromJSON8(schema, json) {
    if (typeof json.from != "number" || typeof json.to != "number") {
      throw new RangeError("Invalid input for RemoveMarkStep.fromJSON");
    }
    return new RemoveMarkStep2(json.from, json.to, schema.markFromJSON(json.mark));
  };
  return RemoveMarkStep2;
}(Step);
Step.jsonID("removeMark", RemoveMarkStep);
Transform.prototype.addMark = function(from4, to, mark3) {
  var this$1$1 = this;
  var removed = [], added = [], removing = null, adding = null;
  this.doc.nodesBetween(from4, to, function(node4, pos, parent) {
    if (!node4.isInline) {
      return;
    }
    var marks2 = node4.marks;
    if (!mark3.isInSet(marks2) && parent.type.allowsMarkType(mark3.type)) {
      var start4 = Math.max(pos, from4), end3 = Math.min(pos + node4.nodeSize, to);
      var newSet = mark3.addToSet(marks2);
      for (var i2 = 0; i2 < marks2.length; i2++) {
        if (!marks2[i2].isInSet(newSet)) {
          if (removing && removing.to == start4 && removing.mark.eq(marks2[i2])) {
            removing.to = end3;
          } else {
            removed.push(removing = new RemoveMarkStep(start4, end3, marks2[i2]));
          }
        }
      }
      if (adding && adding.to == start4) {
        adding.to = end3;
      } else {
        added.push(adding = new AddMarkStep(start4, end3, mark3));
      }
    }
  });
  removed.forEach(function(s) {
    return this$1$1.step(s);
  });
  added.forEach(function(s) {
    return this$1$1.step(s);
  });
  return this;
};
Transform.prototype.removeMark = function(from4, to, mark3) {
  var this$1$1 = this;
  if (mark3 === void 0)
    mark3 = null;
  var matched = [], step2 = 0;
  this.doc.nodesBetween(from4, to, function(node4, pos) {
    if (!node4.isInline) {
      return;
    }
    step2++;
    var toRemove = null;
    if (mark3 instanceof MarkType) {
      var set3 = node4.marks, found2;
      while (found2 = mark3.isInSet(set3)) {
        (toRemove || (toRemove = [])).push(found2);
        set3 = found2.removeFromSet(set3);
      }
    } else if (mark3) {
      if (mark3.isInSet(node4.marks)) {
        toRemove = [mark3];
      }
    } else {
      toRemove = node4.marks;
    }
    if (toRemove && toRemove.length) {
      var end3 = Math.min(pos + node4.nodeSize, to);
      for (var i2 = 0; i2 < toRemove.length; i2++) {
        var style2 = toRemove[i2], found$1 = void 0;
        for (var j = 0; j < matched.length; j++) {
          var m = matched[j];
          if (m.step == step2 - 1 && style2.eq(matched[j].style)) {
            found$1 = m;
          }
        }
        if (found$1) {
          found$1.to = end3;
          found$1.step = step2;
        } else {
          matched.push({ style: style2, from: Math.max(pos, from4), to: end3, step: step2 });
        }
      }
    }
  });
  matched.forEach(function(m) {
    return this$1$1.step(new RemoveMarkStep(m.from, m.to, m.style));
  });
  return this;
};
Transform.prototype.clearIncompatible = function(pos, parentType, match) {
  if (match === void 0)
    match = parentType.contentMatch;
  var node4 = this.doc.nodeAt(pos);
  var delSteps = [], cur = pos + 1;
  for (var i2 = 0; i2 < node4.childCount; i2++) {
    var child3 = node4.child(i2), end3 = cur + child3.nodeSize;
    var allowed = match.matchType(child3.type, child3.attrs);
    if (!allowed) {
      delSteps.push(new ReplaceStep(cur, end3, Slice.empty));
    } else {
      match = allowed;
      for (var j = 0; j < child3.marks.length; j++) {
        if (!parentType.allowsMarkType(child3.marks[j].type)) {
          this.step(new RemoveMarkStep(cur, end3, child3.marks[j]));
        }
      }
    }
    cur = end3;
  }
  if (!match.validEnd) {
    var fill = match.fillBefore(Fragment.empty, true);
    this.replace(cur, cur, new Slice(fill, 0, 0));
  }
  for (var i$1 = delSteps.length - 1; i$1 >= 0; i$1--) {
    this.step(delSteps[i$1]);
  }
  return this;
};
function replaceStep(doc2, from4, to, slice4) {
  if (to === void 0)
    to = from4;
  if (slice4 === void 0)
    slice4 = Slice.empty;
  if (from4 == to && !slice4.size) {
    return null;
  }
  var $from = doc2.resolve(from4), $to = doc2.resolve(to);
  if (fitsTrivially($from, $to, slice4)) {
    return new ReplaceStep(from4, to, slice4);
  }
  return new Fitter($from, $to, slice4).fit();
}
Transform.prototype.replace = function(from4, to, slice4) {
  if (to === void 0)
    to = from4;
  if (slice4 === void 0)
    slice4 = Slice.empty;
  var step2 = replaceStep(this.doc, from4, to, slice4);
  if (step2) {
    this.step(step2);
  }
  return this;
};
Transform.prototype.replaceWith = function(from4, to, content2) {
  return this.replace(from4, to, new Slice(Fragment.from(content2), 0, 0));
};
Transform.prototype.delete = function(from4, to) {
  return this.replace(from4, to, Slice.empty);
};
Transform.prototype.insert = function(pos, content2) {
  return this.replaceWith(pos, pos, content2);
};
function fitsTrivially($from, $to, slice4) {
  return !slice4.openStart && !slice4.openEnd && $from.start() == $to.start() && $from.parent.canReplace($from.index(), $to.index(), slice4.content);
}
var Fitter = function Fitter2($from, $to, slice4) {
  this.$to = $to;
  this.$from = $from;
  this.unplaced = slice4;
  this.frontier = [];
  for (var i2 = 0; i2 <= $from.depth; i2++) {
    var node4 = $from.node(i2);
    this.frontier.push({
      type: node4.type,
      match: node4.contentMatchAt($from.indexAfter(i2))
    });
  }
  this.placed = Fragment.empty;
  for (var i$1 = $from.depth; i$1 > 0; i$1--) {
    this.placed = Fragment.from($from.node(i$1).copy(this.placed));
  }
};
var prototypeAccessors$1$2 = { depth: { configurable: true } };
prototypeAccessors$1$2.depth.get = function() {
  return this.frontier.length - 1;
};
Fitter.prototype.fit = function fit() {
  while (this.unplaced.size) {
    var fit2 = this.findFittable();
    if (fit2) {
      this.placeNodes(fit2);
    } else {
      this.openMore() || this.dropNode();
    }
  }
  var moveInline = this.mustMoveInline(), placedSize = this.placed.size - this.depth - this.$from.depth;
  var $from = this.$from, $to = this.close(moveInline < 0 ? this.$to : $from.doc.resolve(moveInline));
  if (!$to) {
    return null;
  }
  var content2 = this.placed, openStart = $from.depth, openEnd = $to.depth;
  while (openStart && openEnd && content2.childCount == 1) {
    content2 = content2.firstChild.content;
    openStart--;
    openEnd--;
  }
  var slice4 = new Slice(content2, openStart, openEnd);
  if (moveInline > -1) {
    return new ReplaceAroundStep($from.pos, moveInline, this.$to.pos, this.$to.end(), slice4, placedSize);
  }
  if (slice4.size || $from.pos != this.$to.pos) {
    return new ReplaceStep($from.pos, $to.pos, slice4);
  }
};
Fitter.prototype.findFittable = function findFittable() {
  for (var pass = 1; pass <= 2; pass++) {
    for (var sliceDepth = this.unplaced.openStart; sliceDepth >= 0; sliceDepth--) {
      var fragment = void 0, parent = void 0;
      if (sliceDepth) {
        parent = contentAt(this.unplaced.content, sliceDepth - 1).firstChild;
        fragment = parent.content;
      } else {
        fragment = this.unplaced.content;
      }
      var first2 = fragment.firstChild;
      for (var frontierDepth = this.depth; frontierDepth >= 0; frontierDepth--) {
        var ref2 = this.frontier[frontierDepth];
        var type = ref2.type;
        var match = ref2.match;
        var wrap = void 0, inject2 = void 0;
        if (pass == 1 && (first2 ? match.matchType(first2.type) || (inject2 = match.fillBefore(Fragment.from(first2), false)) : type.compatibleContent(parent.type))) {
          return { sliceDepth, frontierDepth, parent, inject: inject2 };
        } else if (pass == 2 && first2 && (wrap = match.findWrapping(first2.type))) {
          return { sliceDepth, frontierDepth, parent, wrap };
        }
        if (parent && match.matchType(parent.type)) {
          break;
        }
      }
    }
  }
};
Fitter.prototype.openMore = function openMore() {
  var ref2 = this.unplaced;
  var content2 = ref2.content;
  var openStart = ref2.openStart;
  var openEnd = ref2.openEnd;
  var inner = contentAt(content2, openStart);
  if (!inner.childCount || inner.firstChild.isLeaf) {
    return false;
  }
  this.unplaced = new Slice(content2, openStart + 1, Math.max(openEnd, inner.size + openStart >= content2.size - openEnd ? openStart + 1 : 0));
  return true;
};
Fitter.prototype.dropNode = function dropNode() {
  var ref2 = this.unplaced;
  var content2 = ref2.content;
  var openStart = ref2.openStart;
  var openEnd = ref2.openEnd;
  var inner = contentAt(content2, openStart);
  if (inner.childCount <= 1 && openStart > 0) {
    var openAtEnd = content2.size - openStart <= openStart + inner.size;
    this.unplaced = new Slice(dropFromFragment(content2, openStart - 1, 1), openStart - 1, openAtEnd ? openStart - 1 : openEnd);
  } else {
    this.unplaced = new Slice(dropFromFragment(content2, openStart, 1), openStart, openEnd);
  }
};
Fitter.prototype.placeNodes = function placeNodes(ref2) {
  var sliceDepth = ref2.sliceDepth;
  var frontierDepth = ref2.frontierDepth;
  var parent = ref2.parent;
  var inject2 = ref2.inject;
  var wrap = ref2.wrap;
  while (this.depth > frontierDepth) {
    this.closeFrontierNode();
  }
  if (wrap) {
    for (var i2 = 0; i2 < wrap.length; i2++) {
      this.openFrontierNode(wrap[i2]);
    }
  }
  var slice4 = this.unplaced, fragment = parent ? parent.content : slice4.content;
  var openStart = slice4.openStart - sliceDepth;
  var taken = 0, add3 = [];
  var ref$1 = this.frontier[frontierDepth];
  var match = ref$1.match;
  var type = ref$1.type;
  if (inject2) {
    for (var i$1 = 0; i$1 < inject2.childCount; i$1++) {
      add3.push(inject2.child(i$1));
    }
    match = match.matchFragment(inject2);
  }
  var openEndCount = fragment.size + sliceDepth - (slice4.content.size - slice4.openEnd);
  while (taken < fragment.childCount) {
    var next = fragment.child(taken), matches2 = match.matchType(next.type);
    if (!matches2) {
      break;
    }
    taken++;
    if (taken > 1 || openStart == 0 || next.content.size) {
      match = matches2;
      add3.push(closeNodeStart(next.mark(type.allowedMarks(next.marks)), taken == 1 ? openStart : 0, taken == fragment.childCount ? openEndCount : -1));
    }
  }
  var toEnd = taken == fragment.childCount;
  if (!toEnd) {
    openEndCount = -1;
  }
  this.placed = addToFragment(this.placed, frontierDepth, Fragment.from(add3));
  this.frontier[frontierDepth].match = match;
  if (toEnd && openEndCount < 0 && parent && parent.type == this.frontier[this.depth].type && this.frontier.length > 1) {
    this.closeFrontierNode();
  }
  for (var i$2 = 0, cur = fragment; i$2 < openEndCount; i$2++) {
    var node4 = cur.lastChild;
    this.frontier.push({ type: node4.type, match: node4.contentMatchAt(node4.childCount) });
    cur = node4.content;
  }
  this.unplaced = !toEnd ? new Slice(dropFromFragment(slice4.content, sliceDepth, taken), slice4.openStart, slice4.openEnd) : sliceDepth == 0 ? Slice.empty : new Slice(dropFromFragment(slice4.content, sliceDepth - 1, 1), sliceDepth - 1, openEndCount < 0 ? slice4.openEnd : sliceDepth - 1);
};
Fitter.prototype.mustMoveInline = function mustMoveInline() {
  if (!this.$to.parent.isTextblock) {
    return -1;
  }
  var top2 = this.frontier[this.depth], level;
  if (!top2.type.isTextblock || !contentAfterFits(this.$to, this.$to.depth, top2.type, top2.match, false) || this.$to.depth == this.depth && (level = this.findCloseLevel(this.$to)) && level.depth == this.depth) {
    return -1;
  }
  var ref2 = this.$to;
  var depth = ref2.depth;
  var after2 = this.$to.after(depth);
  while (depth > 1 && after2 == this.$to.end(--depth)) {
    ++after2;
  }
  return after2;
};
Fitter.prototype.findCloseLevel = function findCloseLevel($to) {
  scan:
    for (var i2 = Math.min(this.depth, $to.depth); i2 >= 0; i2--) {
      var ref2 = this.frontier[i2];
      var match = ref2.match;
      var type = ref2.type;
      var dropInner = i2 < $to.depth && $to.end(i2 + 1) == $to.pos + ($to.depth - (i2 + 1));
      var fit2 = contentAfterFits($to, i2, type, match, dropInner);
      if (!fit2) {
        continue;
      }
      for (var d = i2 - 1; d >= 0; d--) {
        var ref$1 = this.frontier[d];
        var match$1 = ref$1.match;
        var type$1 = ref$1.type;
        var matches2 = contentAfterFits($to, d, type$1, match$1, true);
        if (!matches2 || matches2.childCount) {
          continue scan;
        }
      }
      return { depth: i2, fit: fit2, move: dropInner ? $to.doc.resolve($to.after(i2 + 1)) : $to };
    }
};
Fitter.prototype.close = function close2($to) {
  var close3 = this.findCloseLevel($to);
  if (!close3) {
    return null;
  }
  while (this.depth > close3.depth) {
    this.closeFrontierNode();
  }
  if (close3.fit.childCount) {
    this.placed = addToFragment(this.placed, close3.depth, close3.fit);
  }
  $to = close3.move;
  for (var d = close3.depth + 1; d <= $to.depth; d++) {
    var node4 = $to.node(d), add3 = node4.type.contentMatch.fillBefore(node4.content, true, $to.index(d));
    this.openFrontierNode(node4.type, node4.attrs, add3);
  }
  return $to;
};
Fitter.prototype.openFrontierNode = function openFrontierNode(type, attrs, content2) {
  var top2 = this.frontier[this.depth];
  top2.match = top2.match.matchType(type);
  this.placed = addToFragment(this.placed, this.depth, Fragment.from(type.create(attrs, content2)));
  this.frontier.push({ type, match: type.contentMatch });
};
Fitter.prototype.closeFrontierNode = function closeFrontierNode() {
  var open = this.frontier.pop();
  var add3 = open.match.fillBefore(Fragment.empty, true);
  if (add3.childCount) {
    this.placed = addToFragment(this.placed, this.frontier.length, add3);
  }
};
Object.defineProperties(Fitter.prototype, prototypeAccessors$1$2);
function dropFromFragment(fragment, depth, count) {
  if (depth == 0) {
    return fragment.cutByIndex(count);
  }
  return fragment.replaceChild(0, fragment.firstChild.copy(dropFromFragment(fragment.firstChild.content, depth - 1, count)));
}
function addToFragment(fragment, depth, content2) {
  if (depth == 0) {
    return fragment.append(content2);
  }
  return fragment.replaceChild(fragment.childCount - 1, fragment.lastChild.copy(addToFragment(fragment.lastChild.content, depth - 1, content2)));
}
function contentAt(fragment, depth) {
  for (var i2 = 0; i2 < depth; i2++) {
    fragment = fragment.firstChild.content;
  }
  return fragment;
}
function closeNodeStart(node4, openStart, openEnd) {
  if (openStart <= 0) {
    return node4;
  }
  var frag = node4.content;
  if (openStart > 1) {
    frag = frag.replaceChild(0, closeNodeStart(frag.firstChild, openStart - 1, frag.childCount == 1 ? openEnd - 1 : 0));
  }
  if (openStart > 0) {
    frag = node4.type.contentMatch.fillBefore(frag).append(frag);
    if (openEnd <= 0) {
      frag = frag.append(node4.type.contentMatch.matchFragment(frag).fillBefore(Fragment.empty, true));
    }
  }
  return node4.copy(frag);
}
function contentAfterFits($to, depth, type, match, open) {
  var node4 = $to.node(depth), index2 = open ? $to.indexAfter(depth) : $to.index(depth);
  if (index2 == node4.childCount && !type.compatibleContent(node4.type)) {
    return null;
  }
  var fit2 = match.fillBefore(node4.content, true, index2);
  return fit2 && !invalidMarks(type, node4.content, index2) ? fit2 : null;
}
function invalidMarks(type, fragment, start4) {
  for (var i2 = start4; i2 < fragment.childCount; i2++) {
    if (!type.allowsMarks(fragment.child(i2).marks)) {
      return true;
    }
  }
  return false;
}
function definesContent(type) {
  return type.spec.defining || type.spec.definingForContent;
}
Transform.prototype.replaceRange = function(from4, to, slice4) {
  if (!slice4.size) {
    return this.deleteRange(from4, to);
  }
  var $from = this.doc.resolve(from4), $to = this.doc.resolve(to);
  if (fitsTrivially($from, $to, slice4)) {
    return this.step(new ReplaceStep(from4, to, slice4));
  }
  var targetDepths = coveredDepths($from, this.doc.resolve(to));
  if (targetDepths[targetDepths.length - 1] == 0) {
    targetDepths.pop();
  }
  var preferredTarget = -($from.depth + 1);
  targetDepths.unshift(preferredTarget);
  for (var d = $from.depth, pos = $from.pos - 1; d > 0; d--, pos--) {
    var spec = $from.node(d).type.spec;
    if (spec.defining || spec.definingAsContext || spec.isolating) {
      break;
    }
    if (targetDepths.indexOf(d) > -1) {
      preferredTarget = d;
    } else if ($from.before(d) == pos) {
      targetDepths.splice(1, 0, -d);
    }
  }
  var preferredTargetIndex = targetDepths.indexOf(preferredTarget);
  var leftNodes = [], preferredDepth = slice4.openStart;
  for (var content2 = slice4.content, i2 = 0; ; i2++) {
    var node4 = content2.firstChild;
    leftNodes.push(node4);
    if (i2 == slice4.openStart) {
      break;
    }
    content2 = node4.content;
  }
  for (var d$1 = preferredDepth - 1; d$1 >= 0; d$1--) {
    var type = leftNodes[d$1].type, def2 = definesContent(type);
    if (def2 && $from.node(preferredTargetIndex).type != type) {
      preferredDepth = d$1;
    } else if (def2 || !type.isTextblock) {
      break;
    }
  }
  for (var j = slice4.openStart; j >= 0; j--) {
    var openDepth = (j + preferredDepth + 1) % (slice4.openStart + 1);
    var insert = leftNodes[openDepth];
    if (!insert) {
      continue;
    }
    for (var i$1 = 0; i$1 < targetDepths.length; i$1++) {
      var targetDepth = targetDepths[(i$1 + preferredTargetIndex) % targetDepths.length], expand = true;
      if (targetDepth < 0) {
        expand = false;
        targetDepth = -targetDepth;
      }
      var parent = $from.node(targetDepth - 1), index2 = $from.index(targetDepth - 1);
      if (parent.canReplaceWith(index2, index2, insert.type, insert.marks)) {
        return this.replace($from.before(targetDepth), expand ? $to.after(targetDepth) : to, new Slice(closeFragment(slice4.content, 0, slice4.openStart, openDepth), openDepth, slice4.openEnd));
      }
    }
  }
  var startSteps = this.steps.length;
  for (var i$2 = targetDepths.length - 1; i$2 >= 0; i$2--) {
    this.replace(from4, to, slice4);
    if (this.steps.length > startSteps) {
      break;
    }
    var depth = targetDepths[i$2];
    if (depth < 0) {
      continue;
    }
    from4 = $from.before(depth);
    to = $to.after(depth);
  }
  return this;
};
function closeFragment(fragment, depth, oldOpen, newOpen, parent) {
  if (depth < oldOpen) {
    var first2 = fragment.firstChild;
    fragment = fragment.replaceChild(0, first2.copy(closeFragment(first2.content, depth + 1, oldOpen, newOpen, first2)));
  }
  if (depth > newOpen) {
    var match = parent.contentMatchAt(0);
    var start4 = match.fillBefore(fragment).append(fragment);
    fragment = start4.append(match.matchFragment(start4).fillBefore(Fragment.empty, true));
  }
  return fragment;
}
Transform.prototype.replaceRangeWith = function(from4, to, node4) {
  if (!node4.isInline && from4 == to && this.doc.resolve(from4).parent.content.size) {
    var point = insertPoint(this.doc, from4, node4.type);
    if (point != null) {
      from4 = to = point;
    }
  }
  return this.replaceRange(from4, to, new Slice(Fragment.from(node4), 0, 0));
};
Transform.prototype.deleteRange = function(from4, to) {
  var $from = this.doc.resolve(from4), $to = this.doc.resolve(to);
  var covered = coveredDepths($from, $to);
  for (var i2 = 0; i2 < covered.length; i2++) {
    var depth = covered[i2], last = i2 == covered.length - 1;
    if (last && depth == 0 || $from.node(depth).type.contentMatch.validEnd) {
      return this.delete($from.start(depth), $to.end(depth));
    }
    if (depth > 0 && (last || $from.node(depth - 1).canReplace($from.index(depth - 1), $to.indexAfter(depth - 1)))) {
      return this.delete($from.before(depth), $to.after(depth));
    }
  }
  for (var d = 1; d <= $from.depth && d <= $to.depth; d++) {
    if (from4 - $from.start(d) == $from.depth - d && to > $from.end(d) && $to.end(d) - to != $to.depth - d) {
      return this.delete($from.before(d), to);
    }
  }
  return this.delete(from4, to);
};
function coveredDepths($from, $to) {
  var result2 = [], minDepth = Math.min($from.depth, $to.depth);
  for (var d = minDepth; d >= 0; d--) {
    var start4 = $from.start(d);
    if (start4 < $from.pos - ($from.depth - d) || $to.end(d) > $to.pos + ($to.depth - d) || $from.node(d).type.spec.isolating || $to.node(d).type.spec.isolating) {
      break;
    }
    if (start4 == $to.start(d) || d == $from.depth && d == $to.depth && $from.parent.inlineContent && $to.parent.inlineContent && d && $to.start(d - 1) == start4 - 1) {
      result2.push(d);
    }
  }
  return result2;
}
var classesById = /* @__PURE__ */ Object.create(null);
var Selection = function Selection2($anchor, $head, ranges) {
  this.ranges = ranges || [new SelectionRange($anchor.min($head), $anchor.max($head))];
  this.$anchor = $anchor;
  this.$head = $head;
};
var prototypeAccessors$3 = { anchor: { configurable: true }, head: { configurable: true }, from: { configurable: true }, to: { configurable: true }, $from: { configurable: true }, $to: { configurable: true }, empty: { configurable: true } };
prototypeAccessors$3.anchor.get = function() {
  return this.$anchor.pos;
};
prototypeAccessors$3.head.get = function() {
  return this.$head.pos;
};
prototypeAccessors$3.from.get = function() {
  return this.$from.pos;
};
prototypeAccessors$3.to.get = function() {
  return this.$to.pos;
};
prototypeAccessors$3.$from.get = function() {
  return this.ranges[0].$from;
};
prototypeAccessors$3.$to.get = function() {
  return this.ranges[0].$to;
};
prototypeAccessors$3.empty.get = function() {
  var ranges = this.ranges;
  for (var i2 = 0; i2 < ranges.length; i2++) {
    if (ranges[i2].$from.pos != ranges[i2].$to.pos) {
      return false;
    }
  }
  return true;
};
Selection.prototype.content = function content() {
  return this.$from.node(0).slice(this.from, this.to, true);
};
Selection.prototype.replace = function replace2(tr, content2) {
  if (content2 === void 0)
    content2 = Slice.empty;
  var lastNode = content2.content.lastChild, lastParent = null;
  for (var i2 = 0; i2 < content2.openEnd; i2++) {
    lastParent = lastNode;
    lastNode = lastNode.lastChild;
  }
  var mapFrom = tr.steps.length, ranges = this.ranges;
  for (var i$1 = 0; i$1 < ranges.length; i$1++) {
    var ref2 = ranges[i$1];
    var $from = ref2.$from;
    var $to = ref2.$to;
    var mapping = tr.mapping.slice(mapFrom);
    tr.replaceRange(mapping.map($from.pos), mapping.map($to.pos), i$1 ? Slice.empty : content2);
    if (i$1 == 0) {
      selectionToInsertionEnd$1(tr, mapFrom, (lastNode ? lastNode.isInline : lastParent && lastParent.isTextblock) ? -1 : 1);
    }
  }
};
Selection.prototype.replaceWith = function replaceWith(tr, node4) {
  var mapFrom = tr.steps.length, ranges = this.ranges;
  for (var i2 = 0; i2 < ranges.length; i2++) {
    var ref2 = ranges[i2];
    var $from = ref2.$from;
    var $to = ref2.$to;
    var mapping = tr.mapping.slice(mapFrom);
    var from4 = mapping.map($from.pos), to = mapping.map($to.pos);
    if (i2) {
      tr.deleteRange(from4, to);
    } else {
      tr.replaceRangeWith(from4, to, node4);
      selectionToInsertionEnd$1(tr, mapFrom, node4.isInline ? -1 : 1);
    }
  }
};
Selection.findFrom = function findFrom($pos, dir, textOnly) {
  var inner = $pos.parent.inlineContent ? new TextSelection($pos) : findSelectionIn($pos.node(0), $pos.parent, $pos.pos, $pos.index(), dir, textOnly);
  if (inner) {
    return inner;
  }
  for (var depth = $pos.depth - 1; depth >= 0; depth--) {
    var found2 = dir < 0 ? findSelectionIn($pos.node(0), $pos.node(depth), $pos.before(depth + 1), $pos.index(depth), dir, textOnly) : findSelectionIn($pos.node(0), $pos.node(depth), $pos.after(depth + 1), $pos.index(depth) + 1, dir, textOnly);
    if (found2) {
      return found2;
    }
  }
};
Selection.near = function near($pos, bias) {
  if (bias === void 0)
    bias = 1;
  return this.findFrom($pos, bias) || this.findFrom($pos, -bias) || new AllSelection($pos.node(0));
};
Selection.atStart = function atStart(doc2) {
  return findSelectionIn(doc2, doc2, 0, 0, 1) || new AllSelection(doc2);
};
Selection.atEnd = function atEnd(doc2) {
  return findSelectionIn(doc2, doc2, doc2.content.size, doc2.childCount, -1) || new AllSelection(doc2);
};
Selection.fromJSON = function fromJSON6(doc2, json) {
  if (!json || !json.type) {
    throw new RangeError("Invalid input for Selection.fromJSON");
  }
  var cls = classesById[json.type];
  if (!cls) {
    throw new RangeError("No selection type " + json.type + " defined");
  }
  return cls.fromJSON(doc2, json);
};
Selection.jsonID = function jsonID2(id, selectionClass) {
  if (id in classesById) {
    throw new RangeError("Duplicate use of selection JSON ID " + id);
  }
  classesById[id] = selectionClass;
  selectionClass.prototype.jsonID = id;
  return selectionClass;
};
Selection.prototype.getBookmark = function getBookmark() {
  return TextSelection.between(this.$anchor, this.$head).getBookmark();
};
Object.defineProperties(Selection.prototype, prototypeAccessors$3);
Selection.prototype.visible = true;
var SelectionRange = function SelectionRange2($from, $to) {
  this.$from = $from;
  this.$to = $to;
};
var TextSelection = /* @__PURE__ */ function(Selection3) {
  function TextSelection2($anchor, $head) {
    if ($head === void 0)
      $head = $anchor;
    Selection3.call(this, $anchor, $head);
  }
  if (Selection3)
    TextSelection2.__proto__ = Selection3;
  TextSelection2.prototype = Object.create(Selection3 && Selection3.prototype);
  TextSelection2.prototype.constructor = TextSelection2;
  var prototypeAccessors$12 = { $cursor: { configurable: true } };
  prototypeAccessors$12.$cursor.get = function() {
    return this.$anchor.pos == this.$head.pos ? this.$head : null;
  };
  TextSelection2.prototype.map = function map15(doc2, mapping) {
    var $head = doc2.resolve(mapping.map(this.head));
    if (!$head.parent.inlineContent) {
      return Selection3.near($head);
    }
    var $anchor = doc2.resolve(mapping.map(this.anchor));
    return new TextSelection2($anchor.parent.inlineContent ? $anchor : $head, $head);
  };
  TextSelection2.prototype.replace = function replace3(tr, content2) {
    if (content2 === void 0)
      content2 = Slice.empty;
    Selection3.prototype.replace.call(this, tr, content2);
    if (content2 == Slice.empty) {
      var marks2 = this.$from.marksAcross(this.$to);
      if (marks2) {
        tr.ensureMarks(marks2);
      }
    }
  };
  TextSelection2.prototype.eq = function eq12(other) {
    return other instanceof TextSelection2 && other.anchor == this.anchor && other.head == this.head;
  };
  TextSelection2.prototype.getBookmark = function getBookmark2() {
    return new TextBookmark(this.anchor, this.head);
  };
  TextSelection2.prototype.toJSON = function toJSON7() {
    return { type: "text", anchor: this.anchor, head: this.head };
  };
  TextSelection2.fromJSON = function fromJSON8(doc2, json) {
    if (typeof json.anchor != "number" || typeof json.head != "number") {
      throw new RangeError("Invalid input for TextSelection.fromJSON");
    }
    return new TextSelection2(doc2.resolve(json.anchor), doc2.resolve(json.head));
  };
  TextSelection2.create = function create5(doc2, anchor, head) {
    if (head === void 0)
      head = anchor;
    var $anchor = doc2.resolve(anchor);
    return new this($anchor, head == anchor ? $anchor : doc2.resolve(head));
  };
  TextSelection2.between = function between($anchor, $head, bias) {
    var dPos = $anchor.pos - $head.pos;
    if (!bias || dPos) {
      bias = dPos >= 0 ? 1 : -1;
    }
    if (!$head.parent.inlineContent) {
      var found2 = Selection3.findFrom($head, bias, true) || Selection3.findFrom($head, -bias, true);
      if (found2) {
        $head = found2.$head;
      } else {
        return Selection3.near($head, bias);
      }
    }
    if (!$anchor.parent.inlineContent) {
      if (dPos == 0) {
        $anchor = $head;
      } else {
        $anchor = (Selection3.findFrom($anchor, -bias, true) || Selection3.findFrom($anchor, bias, true)).$anchor;
        if ($anchor.pos < $head.pos != dPos < 0) {
          $anchor = $head;
        }
      }
    }
    return new TextSelection2($anchor, $head);
  };
  Object.defineProperties(TextSelection2.prototype, prototypeAccessors$12);
  return TextSelection2;
}(Selection);
Selection.jsonID("text", TextSelection);
var TextBookmark = function TextBookmark2(anchor, head) {
  this.anchor = anchor;
  this.head = head;
};
TextBookmark.prototype.map = function map4(mapping) {
  return new TextBookmark(mapping.map(this.anchor), mapping.map(this.head));
};
TextBookmark.prototype.resolve = function resolve4(doc2) {
  return TextSelection.between(doc2.resolve(this.anchor), doc2.resolve(this.head));
};
var NodeSelection = /* @__PURE__ */ function(Selection3) {
  function NodeSelection2($pos) {
    var node4 = $pos.nodeAfter;
    var $end = $pos.node(0).resolve($pos.pos + node4.nodeSize);
    Selection3.call(this, $pos, $end);
    this.node = node4;
  }
  if (Selection3)
    NodeSelection2.__proto__ = Selection3;
  NodeSelection2.prototype = Object.create(Selection3 && Selection3.prototype);
  NodeSelection2.prototype.constructor = NodeSelection2;
  NodeSelection2.prototype.map = function map15(doc2, mapping) {
    var ref2 = mapping.mapResult(this.anchor);
    var deleted = ref2.deleted;
    var pos = ref2.pos;
    var $pos = doc2.resolve(pos);
    if (deleted) {
      return Selection3.near($pos);
    }
    return new NodeSelection2($pos);
  };
  NodeSelection2.prototype.content = function content2() {
    return new Slice(Fragment.from(this.node), 0, 0);
  };
  NodeSelection2.prototype.eq = function eq12(other) {
    return other instanceof NodeSelection2 && other.anchor == this.anchor;
  };
  NodeSelection2.prototype.toJSON = function toJSON7() {
    return { type: "node", anchor: this.anchor };
  };
  NodeSelection2.prototype.getBookmark = function getBookmark2() {
    return new NodeBookmark(this.anchor);
  };
  NodeSelection2.fromJSON = function fromJSON8(doc2, json) {
    if (typeof json.anchor != "number") {
      throw new RangeError("Invalid input for NodeSelection.fromJSON");
    }
    return new NodeSelection2(doc2.resolve(json.anchor));
  };
  NodeSelection2.create = function create5(doc2, from4) {
    return new this(doc2.resolve(from4));
  };
  NodeSelection2.isSelectable = function isSelectable(node4) {
    return !node4.isText && node4.type.spec.selectable !== false;
  };
  return NodeSelection2;
}(Selection);
NodeSelection.prototype.visible = false;
Selection.jsonID("node", NodeSelection);
var NodeBookmark = function NodeBookmark2(anchor) {
  this.anchor = anchor;
};
NodeBookmark.prototype.map = function map5(mapping) {
  var ref2 = mapping.mapResult(this.anchor);
  var deleted = ref2.deleted;
  var pos = ref2.pos;
  return deleted ? new TextBookmark(pos, pos) : new NodeBookmark(pos);
};
NodeBookmark.prototype.resolve = function resolve5(doc2) {
  var $pos = doc2.resolve(this.anchor), node4 = $pos.nodeAfter;
  if (node4 && NodeSelection.isSelectable(node4)) {
    return new NodeSelection($pos);
  }
  return Selection.near($pos);
};
var AllSelection = /* @__PURE__ */ function(Selection3) {
  function AllSelection2(doc2) {
    Selection3.call(this, doc2.resolve(0), doc2.resolve(doc2.content.size));
  }
  if (Selection3)
    AllSelection2.__proto__ = Selection3;
  AllSelection2.prototype = Object.create(Selection3 && Selection3.prototype);
  AllSelection2.prototype.constructor = AllSelection2;
  AllSelection2.prototype.replace = function replace3(tr, content2) {
    if (content2 === void 0)
      content2 = Slice.empty;
    if (content2 == Slice.empty) {
      tr.delete(0, tr.doc.content.size);
      var sel = Selection3.atStart(tr.doc);
      if (!sel.eq(tr.selection)) {
        tr.setSelection(sel);
      }
    } else {
      Selection3.prototype.replace.call(this, tr, content2);
    }
  };
  AllSelection2.prototype.toJSON = function toJSON7() {
    return { type: "all" };
  };
  AllSelection2.fromJSON = function fromJSON8(doc2) {
    return new AllSelection2(doc2);
  };
  AllSelection2.prototype.map = function map15(doc2) {
    return new AllSelection2(doc2);
  };
  AllSelection2.prototype.eq = function eq12(other) {
    return other instanceof AllSelection2;
  };
  AllSelection2.prototype.getBookmark = function getBookmark2() {
    return AllBookmark;
  };
  return AllSelection2;
}(Selection);
Selection.jsonID("all", AllSelection);
var AllBookmark = {
  map: function map6() {
    return this;
  },
  resolve: function resolve6(doc2) {
    return new AllSelection(doc2);
  }
};
function findSelectionIn(doc2, node4, pos, index2, dir, text2) {
  if (node4.inlineContent) {
    return TextSelection.create(doc2, pos);
  }
  for (var i2 = index2 - (dir > 0 ? 0 : 1); dir > 0 ? i2 < node4.childCount : i2 >= 0; i2 += dir) {
    var child3 = node4.child(i2);
    if (!child3.isAtom) {
      var inner = findSelectionIn(doc2, child3, pos + dir, dir < 0 ? child3.childCount : 0, dir, text2);
      if (inner) {
        return inner;
      }
    } else if (!text2 && NodeSelection.isSelectable(child3)) {
      return NodeSelection.create(doc2, pos - (dir < 0 ? child3.nodeSize : 0));
    }
    pos += child3.nodeSize * dir;
  }
}
function selectionToInsertionEnd$1(tr, startLen, bias) {
  var last = tr.steps.length - 1;
  if (last < startLen) {
    return;
  }
  var step2 = tr.steps[last];
  if (!(step2 instanceof ReplaceStep || step2 instanceof ReplaceAroundStep)) {
    return;
  }
  var map15 = tr.mapping.maps[last], end3;
  map15.forEach(function(_from, _to, _newFrom, newTo) {
    if (end3 == null) {
      end3 = newTo;
    }
  });
  tr.setSelection(Selection.near(tr.doc.resolve(end3), bias));
}
var UPDATED_SEL = 1, UPDATED_MARKS = 2, UPDATED_SCROLL = 4;
var Transaction = /* @__PURE__ */ function(Transform3) {
  function Transaction2(state) {
    Transform3.call(this, state.doc);
    this.time = Date.now();
    this.curSelection = state.selection;
    this.curSelectionFor = 0;
    this.storedMarks = state.storedMarks;
    this.updated = 0;
    this.meta = /* @__PURE__ */ Object.create(null);
  }
  if (Transform3)
    Transaction2.__proto__ = Transform3;
  Transaction2.prototype = Object.create(Transform3 && Transform3.prototype);
  Transaction2.prototype.constructor = Transaction2;
  var prototypeAccessors2 = { selection: { configurable: true }, selectionSet: { configurable: true }, storedMarksSet: { configurable: true }, isGeneric: { configurable: true }, scrolledIntoView: { configurable: true } };
  prototypeAccessors2.selection.get = function() {
    if (this.curSelectionFor < this.steps.length) {
      this.curSelection = this.curSelection.map(this.doc, this.mapping.slice(this.curSelectionFor));
      this.curSelectionFor = this.steps.length;
    }
    return this.curSelection;
  };
  Transaction2.prototype.setSelection = function setSelection2(selection) {
    if (selection.$from.doc != this.doc) {
      throw new RangeError("Selection passed to setSelection must point at the current document");
    }
    this.curSelection = selection;
    this.curSelectionFor = this.steps.length;
    this.updated = (this.updated | UPDATED_SEL) & ~UPDATED_MARKS;
    this.storedMarks = null;
    return this;
  };
  prototypeAccessors2.selectionSet.get = function() {
    return (this.updated & UPDATED_SEL) > 0;
  };
  Transaction2.prototype.setStoredMarks = function setStoredMarks(marks2) {
    this.storedMarks = marks2;
    this.updated |= UPDATED_MARKS;
    return this;
  };
  Transaction2.prototype.ensureMarks = function ensureMarks2(marks2) {
    if (!Mark$1.sameSet(this.storedMarks || this.selection.$from.marks(), marks2)) {
      this.setStoredMarks(marks2);
    }
    return this;
  };
  Transaction2.prototype.addStoredMark = function addStoredMark(mark3) {
    return this.ensureMarks(mark3.addToSet(this.storedMarks || this.selection.$head.marks()));
  };
  Transaction2.prototype.removeStoredMark = function removeStoredMark(mark3) {
    return this.ensureMarks(mark3.removeFromSet(this.storedMarks || this.selection.$head.marks()));
  };
  prototypeAccessors2.storedMarksSet.get = function() {
    return (this.updated & UPDATED_MARKS) > 0;
  };
  Transaction2.prototype.addStep = function addStep2(step2, doc2) {
    Transform3.prototype.addStep.call(this, step2, doc2);
    this.updated = this.updated & ~UPDATED_MARKS;
    this.storedMarks = null;
  };
  Transaction2.prototype.setTime = function setTime(time) {
    this.time = time;
    return this;
  };
  Transaction2.prototype.replaceSelection = function replaceSelection(slice4) {
    this.selection.replace(this, slice4);
    return this;
  };
  Transaction2.prototype.replaceSelectionWith = function replaceSelectionWith(node4, inheritMarks) {
    var selection = this.selection;
    if (inheritMarks !== false) {
      node4 = node4.mark(this.storedMarks || (selection.empty ? selection.$from.marks() : selection.$from.marksAcross(selection.$to) || Mark$1.none));
    }
    selection.replaceWith(this, node4);
    return this;
  };
  Transaction2.prototype.deleteSelection = function deleteSelection2() {
    this.selection.replace(this);
    return this;
  };
  Transaction2.prototype.insertText = function insertText(text2, from4, to) {
    if (to === void 0)
      to = from4;
    var schema = this.doc.type.schema;
    if (from4 == null) {
      if (!text2) {
        return this.deleteSelection();
      }
      return this.replaceSelectionWith(schema.text(text2), true);
    } else {
      if (!text2) {
        return this.deleteRange(from4, to);
      }
      var marks2 = this.storedMarks;
      if (!marks2) {
        var $from = this.doc.resolve(from4);
        marks2 = to == from4 ? $from.marks() : $from.marksAcross(this.doc.resolve(to));
      }
      this.replaceRangeWith(from4, to, schema.text(text2, marks2));
      if (!this.selection.empty) {
        this.setSelection(Selection.near(this.selection.$to));
      }
      return this;
    }
  };
  Transaction2.prototype.setMeta = function setMeta2(key2, value) {
    this.meta[typeof key2 == "string" ? key2 : key2.key] = value;
    return this;
  };
  Transaction2.prototype.getMeta = function getMeta(key2) {
    return this.meta[typeof key2 == "string" ? key2 : key2.key];
  };
  prototypeAccessors2.isGeneric.get = function() {
    for (var _ in this.meta) {
      return false;
    }
    return true;
  };
  Transaction2.prototype.scrollIntoView = function scrollIntoView2() {
    this.updated |= UPDATED_SCROLL;
    return this;
  };
  prototypeAccessors2.scrolledIntoView.get = function() {
    return (this.updated & UPDATED_SCROLL) > 0;
  };
  Object.defineProperties(Transaction2.prototype, prototypeAccessors2);
  return Transaction2;
}(Transform);
function bind(f, self2) {
  return !self2 || !f ? f : f.bind(self2);
}
var FieldDesc = function FieldDesc2(name, desc, self2) {
  this.name = name;
  this.init = bind(desc.init, self2);
  this.apply = bind(desc.apply, self2);
};
var baseFields = [
  new FieldDesc("doc", {
    init: function init(config) {
      return config.doc || config.schema.topNodeType.createAndFill();
    },
    apply: function apply3(tr) {
      return tr.doc;
    }
  }),
  new FieldDesc("selection", {
    init: function init2(config, instance) {
      return config.selection || Selection.atStart(instance.doc);
    },
    apply: function apply4(tr) {
      return tr.selection;
    }
  }),
  new FieldDesc("storedMarks", {
    init: function init3(config) {
      return config.storedMarks || null;
    },
    apply: function apply5(tr, _marks, _old, state) {
      return state.selection.$cursor ? tr.storedMarks : null;
    }
  }),
  new FieldDesc("scrollToSelection", {
    init: function init4() {
      return 0;
    },
    apply: function apply6(tr, prev) {
      return tr.scrolledIntoView ? prev + 1 : prev;
    }
  })
];
var Configuration = function Configuration2(schema, plugins) {
  var this$1$1 = this;
  this.schema = schema;
  this.fields = baseFields.concat();
  this.plugins = [];
  this.pluginsByKey = /* @__PURE__ */ Object.create(null);
  if (plugins) {
    plugins.forEach(function(plugin) {
      if (this$1$1.pluginsByKey[plugin.key]) {
        throw new RangeError("Adding different instances of a keyed plugin (" + plugin.key + ")");
      }
      this$1$1.plugins.push(plugin);
      this$1$1.pluginsByKey[plugin.key] = plugin;
      if (plugin.spec.state) {
        this$1$1.fields.push(new FieldDesc(plugin.key, plugin.spec.state, plugin));
      }
    });
  }
};
var EditorState = function EditorState2(config) {
  this.config = config;
};
var prototypeAccessors$1$1 = { schema: { configurable: true }, plugins: { configurable: true }, tr: { configurable: true } };
prototypeAccessors$1$1.schema.get = function() {
  return this.config.schema;
};
prototypeAccessors$1$1.plugins.get = function() {
  return this.config.plugins;
};
EditorState.prototype.apply = function apply7(tr) {
  return this.applyTransaction(tr).state;
};
EditorState.prototype.filterTransaction = function filterTransaction(tr, ignore) {
  if (ignore === void 0)
    ignore = -1;
  for (var i2 = 0; i2 < this.config.plugins.length; i2++) {
    if (i2 != ignore) {
      var plugin = this.config.plugins[i2];
      if (plugin.spec.filterTransaction && !plugin.spec.filterTransaction.call(plugin, tr, this)) {
        return false;
      }
    }
  }
  return true;
};
EditorState.prototype.applyTransaction = function applyTransaction2(rootTr) {
  if (!this.filterTransaction(rootTr)) {
    return { state: this, transactions: [] };
  }
  var trs = [rootTr], newState = this.applyInner(rootTr), seen = null;
  for (; ; ) {
    var haveNew = false;
    for (var i2 = 0; i2 < this.config.plugins.length; i2++) {
      var plugin = this.config.plugins[i2];
      if (plugin.spec.appendTransaction) {
        var n = seen ? seen[i2].n : 0, oldState = seen ? seen[i2].state : this;
        var tr = n < trs.length && plugin.spec.appendTransaction.call(plugin, n ? trs.slice(n) : trs, oldState, newState);
        if (tr && newState.filterTransaction(tr, i2)) {
          tr.setMeta("appendedTransaction", rootTr);
          if (!seen) {
            seen = [];
            for (var j = 0; j < this.config.plugins.length; j++) {
              seen.push(j < i2 ? { state: newState, n: trs.length } : { state: this, n: 0 });
            }
          }
          trs.push(tr);
          newState = newState.applyInner(tr);
          haveNew = true;
        }
        if (seen) {
          seen[i2] = { state: newState, n: trs.length };
        }
      }
    }
    if (!haveNew) {
      return { state: newState, transactions: trs };
    }
  }
};
EditorState.prototype.applyInner = function applyInner(tr) {
  if (!tr.before.eq(this.doc)) {
    throw new RangeError("Applying a mismatched transaction");
  }
  var newInstance = new EditorState(this.config), fields = this.config.fields;
  for (var i2 = 0; i2 < fields.length; i2++) {
    var field = fields[i2];
    newInstance[field.name] = field.apply(tr, this[field.name], this, newInstance);
  }
  for (var i$1 = 0; i$1 < applyListeners.length; i$1++) {
    applyListeners[i$1](this, tr, newInstance);
  }
  return newInstance;
};
prototypeAccessors$1$1.tr.get = function() {
  return new Transaction(this);
};
EditorState.create = function create3(config) {
  var $config = new Configuration(config.doc ? config.doc.type.schema : config.schema, config.plugins);
  var instance = new EditorState($config);
  for (var i2 = 0; i2 < $config.fields.length; i2++) {
    instance[$config.fields[i2].name] = $config.fields[i2].init(config, instance);
  }
  return instance;
};
EditorState.prototype.reconfigure = function reconfigure(config) {
  var $config = new Configuration(this.schema, config.plugins);
  var fields = $config.fields, instance = new EditorState($config);
  for (var i2 = 0; i2 < fields.length; i2++) {
    var name = fields[i2].name;
    instance[name] = this.hasOwnProperty(name) ? this[name] : fields[i2].init(config, instance);
  }
  return instance;
};
EditorState.prototype.toJSON = function toJSON6(pluginFields) {
  var result2 = { doc: this.doc.toJSON(), selection: this.selection.toJSON() };
  if (this.storedMarks) {
    result2.storedMarks = this.storedMarks.map(function(m) {
      return m.toJSON();
    });
  }
  if (pluginFields && typeof pluginFields == "object") {
    for (var prop2 in pluginFields) {
      if (prop2 == "doc" || prop2 == "selection") {
        throw new RangeError("The JSON fields `doc` and `selection` are reserved");
      }
      var plugin = pluginFields[prop2], state = plugin.spec.state;
      if (state && state.toJSON) {
        result2[prop2] = state.toJSON.call(plugin, this[plugin.key]);
      }
    }
  }
  return result2;
};
EditorState.fromJSON = function fromJSON7(config, json, pluginFields) {
  if (!json) {
    throw new RangeError("Invalid input for EditorState.fromJSON");
  }
  if (!config.schema) {
    throw new RangeError("Required config field 'schema' missing");
  }
  var $config = new Configuration(config.schema, config.plugins);
  var instance = new EditorState($config);
  $config.fields.forEach(function(field) {
    if (field.name == "doc") {
      instance.doc = Node$1.fromJSON(config.schema, json.doc);
    } else if (field.name == "selection") {
      instance.selection = Selection.fromJSON(instance.doc, json.selection);
    } else if (field.name == "storedMarks") {
      if (json.storedMarks) {
        instance.storedMarks = json.storedMarks.map(config.schema.markFromJSON);
      }
    } else {
      if (pluginFields) {
        for (var prop2 in pluginFields) {
          var plugin = pluginFields[prop2], state = plugin.spec.state;
          if (plugin.key == field.name && state && state.fromJSON && Object.prototype.hasOwnProperty.call(json, prop2)) {
            instance[field.name] = state.fromJSON.call(plugin, config, json[prop2], instance);
            return;
          }
        }
      }
      instance[field.name] = field.init(config, instance);
    }
  });
  return instance;
};
EditorState.addApplyListener = function addApplyListener(f) {
  applyListeners.push(f);
};
EditorState.removeApplyListener = function removeApplyListener(f) {
  var found2 = applyListeners.indexOf(f);
  if (found2 > -1) {
    applyListeners.splice(found2, 1);
  }
};
Object.defineProperties(EditorState.prototype, prototypeAccessors$1$1);
var applyListeners = [];
function bindProps(obj, self2, target) {
  for (var prop2 in obj) {
    var val = obj[prop2];
    if (val instanceof Function) {
      val = val.bind(self2);
    } else if (prop2 == "handleDOMEvents") {
      val = bindProps(val, self2, {});
    }
    target[prop2] = val;
  }
  return target;
}
var Plugin = function Plugin2(spec) {
  this.props = {};
  if (spec.props) {
    bindProps(spec.props, this, this.props);
  }
  this.spec = spec;
  this.key = spec.key ? spec.key.key : createKey("plugin");
};
Plugin.prototype.getState = function getState(state) {
  return state[this.key];
};
var keys = /* @__PURE__ */ Object.create(null);
function createKey(name) {
  if (name in keys) {
    return name + "$" + ++keys[name];
  }
  keys[name] = 0;
  return name + "$";
}
var PluginKey = function PluginKey2(name) {
  if (name === void 0)
    name = "key";
  this.key = createKey(name);
};
PluginKey.prototype.get = function get2(state) {
  return state.config.pluginsByKey[this.key];
};
PluginKey.prototype.getState = function getState2(state) {
  return state[this.key];
};
function deleteSelection$2(state, dispatch2) {
  if (state.selection.empty) {
    return false;
  }
  if (dispatch2) {
    dispatch2(state.tr.deleteSelection().scrollIntoView());
  }
  return true;
}
function joinBackward$2(state, dispatch2, view) {
  var ref2 = state.selection;
  var $cursor = ref2.$cursor;
  if (!$cursor || (view ? !view.endOfTextblock("backward", state) : $cursor.parentOffset > 0)) {
    return false;
  }
  var $cut = findCutBefore($cursor);
  if (!$cut) {
    var range = $cursor.blockRange(), target = range && liftTarget(range);
    if (target == null) {
      return false;
    }
    if (dispatch2) {
      dispatch2(state.tr.lift(range, target).scrollIntoView());
    }
    return true;
  }
  var before2 = $cut.nodeBefore;
  if (!before2.type.spec.isolating && deleteBarrier(state, $cut, dispatch2)) {
    return true;
  }
  if ($cursor.parent.content.size == 0 && (textblockAt(before2, "end") || NodeSelection.isSelectable(before2))) {
    var delStep = replaceStep(state.doc, $cursor.before(), $cursor.after(), Slice.empty);
    if (delStep.slice.size < delStep.to - delStep.from) {
      if (dispatch2) {
        var tr = state.tr.step(delStep);
        tr.setSelection(textblockAt(before2, "end") ? Selection.findFrom(tr.doc.resolve(tr.mapping.map($cut.pos, -1)), -1) : NodeSelection.create(tr.doc, $cut.pos - before2.nodeSize));
        dispatch2(tr.scrollIntoView());
      }
      return true;
    }
  }
  if (before2.isAtom && $cut.depth == $cursor.depth - 1) {
    if (dispatch2) {
      dispatch2(state.tr.delete($cut.pos - before2.nodeSize, $cut.pos).scrollIntoView());
    }
    return true;
  }
  return false;
}
function textblockAt(node4, side, only) {
  for (; node4; node4 = side == "start" ? node4.firstChild : node4.lastChild) {
    if (node4.isTextblock) {
      return true;
    }
    if (only && node4.childCount != 1) {
      return false;
    }
  }
  return false;
}
function selectNodeBackward$2(state, dispatch2, view) {
  var ref2 = state.selection;
  var $head = ref2.$head;
  var empty2 = ref2.empty;
  var $cut = $head;
  if (!empty2) {
    return false;
  }
  if ($head.parent.isTextblock) {
    if (view ? !view.endOfTextblock("backward", state) : $head.parentOffset > 0) {
      return false;
    }
    $cut = findCutBefore($head);
  }
  var node4 = $cut && $cut.nodeBefore;
  if (!node4 || !NodeSelection.isSelectable(node4)) {
    return false;
  }
  if (dispatch2) {
    dispatch2(state.tr.setSelection(NodeSelection.create(state.doc, $cut.pos - node4.nodeSize)).scrollIntoView());
  }
  return true;
}
function findCutBefore($pos) {
  if (!$pos.parent.type.spec.isolating) {
    for (var i2 = $pos.depth - 1; i2 >= 0; i2--) {
      if ($pos.index(i2) > 0) {
        return $pos.doc.resolve($pos.before(i2 + 1));
      }
      if ($pos.node(i2).type.spec.isolating) {
        break;
      }
    }
  }
  return null;
}
function joinForward$2(state, dispatch2, view) {
  var ref2 = state.selection;
  var $cursor = ref2.$cursor;
  if (!$cursor || (view ? !view.endOfTextblock("forward", state) : $cursor.parentOffset < $cursor.parent.content.size)) {
    return false;
  }
  var $cut = findCutAfter($cursor);
  if (!$cut) {
    return false;
  }
  var after2 = $cut.nodeAfter;
  if (deleteBarrier(state, $cut, dispatch2)) {
    return true;
  }
  if ($cursor.parent.content.size == 0 && (textblockAt(after2, "start") || NodeSelection.isSelectable(after2))) {
    var delStep = replaceStep(state.doc, $cursor.before(), $cursor.after(), Slice.empty);
    if (delStep.slice.size < delStep.to - delStep.from) {
      if (dispatch2) {
        var tr = state.tr.step(delStep);
        tr.setSelection(textblockAt(after2, "start") ? Selection.findFrom(tr.doc.resolve(tr.mapping.map($cut.pos)), 1) : NodeSelection.create(tr.doc, tr.mapping.map($cut.pos)));
        dispatch2(tr.scrollIntoView());
      }
      return true;
    }
  }
  if (after2.isAtom && $cut.depth == $cursor.depth - 1) {
    if (dispatch2) {
      dispatch2(state.tr.delete($cut.pos, $cut.pos + after2.nodeSize).scrollIntoView());
    }
    return true;
  }
  return false;
}
function selectNodeForward$2(state, dispatch2, view) {
  var ref2 = state.selection;
  var $head = ref2.$head;
  var empty2 = ref2.empty;
  var $cut = $head;
  if (!empty2) {
    return false;
  }
  if ($head.parent.isTextblock) {
    if (view ? !view.endOfTextblock("forward", state) : $head.parentOffset < $head.parent.content.size) {
      return false;
    }
    $cut = findCutAfter($head);
  }
  var node4 = $cut && $cut.nodeAfter;
  if (!node4 || !NodeSelection.isSelectable(node4)) {
    return false;
  }
  if (dispatch2) {
    dispatch2(state.tr.setSelection(NodeSelection.create(state.doc, $cut.pos)).scrollIntoView());
  }
  return true;
}
function findCutAfter($pos) {
  if (!$pos.parent.type.spec.isolating) {
    for (var i2 = $pos.depth - 1; i2 >= 0; i2--) {
      var parent = $pos.node(i2);
      if ($pos.index(i2) + 1 < parent.childCount) {
        return $pos.doc.resolve($pos.after(i2 + 1));
      }
      if (parent.type.spec.isolating) {
        break;
      }
    }
  }
  return null;
}
function lift$2(state, dispatch2) {
  var ref2 = state.selection;
  var $from = ref2.$from;
  var $to = ref2.$to;
  var range = $from.blockRange($to), target = range && liftTarget(range);
  if (target == null) {
    return false;
  }
  if (dispatch2) {
    dispatch2(state.tr.lift(range, target).scrollIntoView());
  }
  return true;
}
function newlineInCode$2(state, dispatch2) {
  var ref2 = state.selection;
  var $head = ref2.$head;
  var $anchor = ref2.$anchor;
  if (!$head.parent.type.spec.code || !$head.sameParent($anchor)) {
    return false;
  }
  if (dispatch2) {
    dispatch2(state.tr.insertText("\n").scrollIntoView());
  }
  return true;
}
function defaultBlockAt(match) {
  for (var i2 = 0; i2 < match.edgeCount; i2++) {
    var ref2 = match.edge(i2);
    var type = ref2.type;
    if (type.isTextblock && !type.hasRequiredAttrs()) {
      return type;
    }
  }
  return null;
}
function exitCode$2(state, dispatch2) {
  var ref2 = state.selection;
  var $head = ref2.$head;
  var $anchor = ref2.$anchor;
  if (!$head.parent.type.spec.code || !$head.sameParent($anchor)) {
    return false;
  }
  var above = $head.node(-1), after2 = $head.indexAfter(-1), type = defaultBlockAt(above.contentMatchAt(after2));
  if (!above.canReplaceWith(after2, after2, type)) {
    return false;
  }
  if (dispatch2) {
    var pos = $head.after(), tr = state.tr.replaceWith(pos, pos, type.createAndFill());
    tr.setSelection(Selection.near(tr.doc.resolve(pos), 1));
    dispatch2(tr.scrollIntoView());
  }
  return true;
}
function createParagraphNear$2(state, dispatch2) {
  var sel = state.selection;
  var $from = sel.$from;
  var $to = sel.$to;
  if (sel instanceof AllSelection || $from.parent.inlineContent || $to.parent.inlineContent) {
    return false;
  }
  var type = defaultBlockAt($to.parent.contentMatchAt($to.indexAfter()));
  if (!type || !type.isTextblock) {
    return false;
  }
  if (dispatch2) {
    var side = (!$from.parentOffset && $to.index() < $to.parent.childCount ? $from : $to).pos;
    var tr = state.tr.insert(side, type.createAndFill());
    tr.setSelection(TextSelection.create(tr.doc, side + 1));
    dispatch2(tr.scrollIntoView());
  }
  return true;
}
function liftEmptyBlock$2(state, dispatch2) {
  var ref2 = state.selection;
  var $cursor = ref2.$cursor;
  if (!$cursor || $cursor.parent.content.size) {
    return false;
  }
  if ($cursor.depth > 1 && $cursor.after() != $cursor.end(-1)) {
    var before2 = $cursor.before();
    if (canSplit(state.doc, before2)) {
      if (dispatch2) {
        dispatch2(state.tr.split(before2).scrollIntoView());
      }
      return true;
    }
  }
  var range = $cursor.blockRange(), target = range && liftTarget(range);
  if (target == null) {
    return false;
  }
  if (dispatch2) {
    dispatch2(state.tr.lift(range, target).scrollIntoView());
  }
  return true;
}
function splitBlock$2(state, dispatch2) {
  var ref2 = state.selection;
  var $from = ref2.$from;
  var $to = ref2.$to;
  if (state.selection instanceof NodeSelection && state.selection.node.isBlock) {
    if (!$from.parentOffset || !canSplit(state.doc, $from.pos)) {
      return false;
    }
    if (dispatch2) {
      dispatch2(state.tr.split($from.pos).scrollIntoView());
    }
    return true;
  }
  if (!$from.parent.isBlock) {
    return false;
  }
  if (dispatch2) {
    var atEnd2 = $to.parentOffset == $to.parent.content.size;
    var tr = state.tr;
    if (state.selection instanceof TextSelection || state.selection instanceof AllSelection) {
      tr.deleteSelection();
    }
    var deflt = $from.depth == 0 ? null : defaultBlockAt($from.node(-1).contentMatchAt($from.indexAfter(-1)));
    var types = atEnd2 && deflt ? [{ type: deflt }] : null;
    var can = canSplit(tr.doc, tr.mapping.map($from.pos), 1, types);
    if (!types && !can && canSplit(tr.doc, tr.mapping.map($from.pos), 1, deflt && [{ type: deflt }])) {
      types = [{ type: deflt }];
      can = true;
    }
    if (can) {
      tr.split(tr.mapping.map($from.pos), 1, types);
      if (!atEnd2 && !$from.parentOffset && $from.parent.type != deflt) {
        var first2 = tr.mapping.map($from.before()), $first = tr.doc.resolve(first2);
        if ($from.node(-1).canReplaceWith($first.index(), $first.index() + 1, deflt)) {
          tr.setNodeMarkup(tr.mapping.map($from.before()), deflt);
        }
      }
    }
    dispatch2(tr.scrollIntoView());
  }
  return true;
}
function selectParentNode$2(state, dispatch2) {
  var ref2 = state.selection;
  var $from = ref2.$from;
  var to = ref2.to;
  var pos;
  var same = $from.sharedDepth(to);
  if (same == 0) {
    return false;
  }
  pos = $from.before(same);
  if (dispatch2) {
    dispatch2(state.tr.setSelection(NodeSelection.create(state.doc, pos)));
  }
  return true;
}
function selectAll$2(state, dispatch2) {
  if (dispatch2) {
    dispatch2(state.tr.setSelection(new AllSelection(state.doc)));
  }
  return true;
}
function joinMaybeClear(state, $pos, dispatch2) {
  var before2 = $pos.nodeBefore, after2 = $pos.nodeAfter, index2 = $pos.index();
  if (!before2 || !after2 || !before2.type.compatibleContent(after2.type)) {
    return false;
  }
  if (!before2.content.size && $pos.parent.canReplace(index2 - 1, index2)) {
    if (dispatch2) {
      dispatch2(state.tr.delete($pos.pos - before2.nodeSize, $pos.pos).scrollIntoView());
    }
    return true;
  }
  if (!$pos.parent.canReplace(index2, index2 + 1) || !(after2.isTextblock || canJoin(state.doc, $pos.pos))) {
    return false;
  }
  if (dispatch2) {
    dispatch2(state.tr.clearIncompatible($pos.pos, before2.type, before2.contentMatchAt(before2.childCount)).join($pos.pos).scrollIntoView());
  }
  return true;
}
function deleteBarrier(state, $cut, dispatch2) {
  var before2 = $cut.nodeBefore, after2 = $cut.nodeAfter, conn, match;
  if (before2.type.spec.isolating || after2.type.spec.isolating) {
    return false;
  }
  if (joinMaybeClear(state, $cut, dispatch2)) {
    return true;
  }
  var canDelAfter = $cut.parent.canReplace($cut.index(), $cut.index() + 1);
  if (canDelAfter && (conn = (match = before2.contentMatchAt(before2.childCount)).findWrapping(after2.type)) && match.matchType(conn[0] || after2.type).validEnd) {
    if (dispatch2) {
      var end3 = $cut.pos + after2.nodeSize, wrap = Fragment.empty;
      for (var i2 = conn.length - 1; i2 >= 0; i2--) {
        wrap = Fragment.from(conn[i2].create(null, wrap));
      }
      wrap = Fragment.from(before2.copy(wrap));
      var tr = state.tr.step(new ReplaceAroundStep($cut.pos - 1, end3, $cut.pos, end3, new Slice(wrap, 1, 0), conn.length, true));
      var joinAt = end3 + 2 * conn.length;
      if (canJoin(tr.doc, joinAt)) {
        tr.join(joinAt);
      }
      dispatch2(tr.scrollIntoView());
    }
    return true;
  }
  var selAfter = Selection.findFrom($cut, 1);
  var range = selAfter && selAfter.$from.blockRange(selAfter.$to), target = range && liftTarget(range);
  if (target != null && target >= $cut.depth) {
    if (dispatch2) {
      dispatch2(state.tr.lift(range, target).scrollIntoView());
    }
    return true;
  }
  if (canDelAfter && textblockAt(after2, "start", true) && textblockAt(before2, "end")) {
    var at = before2, wrap$1 = [];
    for (; ; ) {
      wrap$1.push(at);
      if (at.isTextblock) {
        break;
      }
      at = at.lastChild;
    }
    var afterText = after2, afterDepth = 1;
    for (; !afterText.isTextblock; afterText = afterText.firstChild) {
      afterDepth++;
    }
    if (at.canReplace(at.childCount, at.childCount, afterText.content)) {
      if (dispatch2) {
        var end$1 = Fragment.empty;
        for (var i$1 = wrap$1.length - 1; i$1 >= 0; i$1--) {
          end$1 = Fragment.from(wrap$1[i$1].copy(end$1));
        }
        var tr$1 = state.tr.step(new ReplaceAroundStep($cut.pos - wrap$1.length, $cut.pos + after2.nodeSize, $cut.pos + afterDepth, $cut.pos + after2.nodeSize - afterDepth, new Slice(end$1, wrap$1.length, 0), 0, true));
        dispatch2(tr$1.scrollIntoView());
      }
      return true;
    }
  }
  return false;
}
function selectTextblockSide(side) {
  return function(state, dispatch2) {
    var sel = state.selection, $pos = side < 0 ? sel.$from : sel.$to;
    var depth = $pos.depth;
    while ($pos.node(depth).isInline) {
      if (!depth) {
        return false;
      }
      depth--;
    }
    if (!$pos.node(depth).isTextblock) {
      return false;
    }
    if (dispatch2) {
      dispatch2(state.tr.setSelection(TextSelection.create(state.doc, side < 0 ? $pos.start(depth) : $pos.end(depth))));
    }
    return true;
  };
}
var selectTextblockStart$2 = selectTextblockSide(-1);
var selectTextblockEnd$2 = selectTextblockSide(1);
function wrapIn$2(nodeType2, attrs) {
  return function(state, dispatch2) {
    var ref2 = state.selection;
    var $from = ref2.$from;
    var $to = ref2.$to;
    var range = $from.blockRange($to), wrapping = range && findWrapping(range, nodeType2, attrs);
    if (!wrapping) {
      return false;
    }
    if (dispatch2) {
      dispatch2(state.tr.wrap(range, wrapping).scrollIntoView());
    }
    return true;
  };
}
function setBlockType(nodeType2, attrs) {
  return function(state, dispatch2) {
    var ref2 = state.selection;
    var from4 = ref2.from;
    var to = ref2.to;
    var applicable = false;
    state.doc.nodesBetween(from4, to, function(node4, pos) {
      if (applicable) {
        return false;
      }
      if (!node4.isTextblock || node4.hasMarkup(nodeType2, attrs)) {
        return;
      }
      if (node4.type == nodeType2) {
        applicable = true;
      } else {
        var $pos = state.doc.resolve(pos), index2 = $pos.index();
        applicable = $pos.parent.canReplaceWith(index2, index2 + 1, nodeType2);
      }
    });
    if (!applicable) {
      return false;
    }
    if (dispatch2) {
      dispatch2(state.tr.setBlockType(from4, to, nodeType2, attrs).scrollIntoView());
    }
    return true;
  };
}
function chainCommands() {
  var commands = [], len = arguments.length;
  while (len--)
    commands[len] = arguments[len];
  return function(state, dispatch2, view) {
    for (var i2 = 0; i2 < commands.length; i2++) {
      if (commands[i2](state, dispatch2, view)) {
        return true;
      }
    }
    return false;
  };
}
var backspace = chainCommands(deleteSelection$2, joinBackward$2, selectNodeBackward$2);
var del = chainCommands(deleteSelection$2, joinForward$2, selectNodeForward$2);
var pcBaseKeymap = {
  "Enter": chainCommands(newlineInCode$2, createParagraphNear$2, liftEmptyBlock$2, splitBlock$2),
  "Mod-Enter": exitCode$2,
  "Backspace": backspace,
  "Mod-Backspace": backspace,
  "Shift-Backspace": backspace,
  "Delete": del,
  "Mod-Delete": del,
  "Mod-a": selectAll$2
};
var macBaseKeymap = {
  "Ctrl-h": pcBaseKeymap["Backspace"],
  "Alt-Backspace": pcBaseKeymap["Mod-Backspace"],
  "Ctrl-d": pcBaseKeymap["Delete"],
  "Ctrl-Alt-Backspace": pcBaseKeymap["Mod-Delete"],
  "Alt-Delete": pcBaseKeymap["Mod-Delete"],
  "Alt-d": pcBaseKeymap["Mod-Delete"],
  "Ctrl-a": selectTextblockStart$2,
  "Ctrl-e": selectTextblockEnd$2
};
for (var key in pcBaseKeymap) {
  macBaseKeymap[key] = pcBaseKeymap[key];
}
typeof navigator != "undefined" ? /Mac|iP(hone|[oa]d)/.test(navigator.platform) : typeof os != "undefined" ? os.platform() == "darwin" : false;
function wrapInList$2(listType, attrs) {
  return function(state, dispatch2) {
    var ref2 = state.selection;
    var $from = ref2.$from;
    var $to = ref2.$to;
    var range = $from.blockRange($to), doJoin = false, outerRange = range;
    if (!range) {
      return false;
    }
    if (range.depth >= 2 && $from.node(range.depth - 1).type.compatibleContent(listType) && range.startIndex == 0) {
      if ($from.index(range.depth - 1) == 0) {
        return false;
      }
      var $insert = state.doc.resolve(range.start - 2);
      outerRange = new NodeRange($insert, $insert, range.depth);
      if (range.endIndex < range.parent.childCount) {
        range = new NodeRange($from, state.doc.resolve($to.end(range.depth)), range.depth);
      }
      doJoin = true;
    }
    var wrap = findWrapping(outerRange, listType, attrs, range);
    if (!wrap) {
      return false;
    }
    if (dispatch2) {
      dispatch2(doWrapInList(state.tr, range, wrap, doJoin, listType).scrollIntoView());
    }
    return true;
  };
}
function doWrapInList(tr, range, wrappers, joinBefore, listType) {
  var content2 = Fragment.empty;
  for (var i2 = wrappers.length - 1; i2 >= 0; i2--) {
    content2 = Fragment.from(wrappers[i2].type.create(wrappers[i2].attrs, content2));
  }
  tr.step(new ReplaceAroundStep(range.start - (joinBefore ? 2 : 0), range.end, range.start, range.end, new Slice(content2, 0, 0), wrappers.length, true));
  var found2 = 0;
  for (var i$1 = 0; i$1 < wrappers.length; i$1++) {
    if (wrappers[i$1].type == listType) {
      found2 = i$1 + 1;
    }
  }
  var splitDepth = wrappers.length - found2;
  var splitPos = range.start + wrappers.length - (joinBefore ? 2 : 0), parent = range.parent;
  for (var i$2 = range.startIndex, e = range.endIndex, first2 = true; i$2 < e; i$2++, first2 = false) {
    if (!first2 && canSplit(tr.doc, splitPos, splitDepth)) {
      tr.split(splitPos, splitDepth);
      splitPos += 2 * splitDepth;
    }
    splitPos += parent.child(i$2).nodeSize;
  }
  return tr;
}
function liftListItem$2(itemType) {
  return function(state, dispatch2) {
    var ref2 = state.selection;
    var $from = ref2.$from;
    var $to = ref2.$to;
    var range = $from.blockRange($to, function(node4) {
      return node4.childCount && node4.firstChild.type == itemType;
    });
    if (!range) {
      return false;
    }
    if (!dispatch2) {
      return true;
    }
    if ($from.node(range.depth - 1).type == itemType) {
      return liftToOuterList(state, dispatch2, itemType, range);
    } else {
      return liftOutOfList(state, dispatch2, range);
    }
  };
}
function liftToOuterList(state, dispatch2, itemType, range) {
  var tr = state.tr, end3 = range.end, endOfList = range.$to.end(range.depth);
  if (end3 < endOfList) {
    tr.step(new ReplaceAroundStep(end3 - 1, endOfList, end3, endOfList, new Slice(Fragment.from(itemType.create(null, range.parent.copy())), 1, 0), 1, true));
    range = new NodeRange(tr.doc.resolve(range.$from.pos), tr.doc.resolve(endOfList), range.depth);
  }
  dispatch2(tr.lift(range, liftTarget(range)).scrollIntoView());
  return true;
}
function liftOutOfList(state, dispatch2, range) {
  var tr = state.tr, list = range.parent;
  for (var pos = range.end, i2 = range.endIndex - 1, e = range.startIndex; i2 > e; i2--) {
    pos -= list.child(i2).nodeSize;
    tr.delete(pos - 1, pos + 1);
  }
  var $start = tr.doc.resolve(range.start), item = $start.nodeAfter;
  if (tr.mapping.map(range.end) != range.start + $start.nodeAfter.nodeSize) {
    return false;
  }
  var atStart2 = range.startIndex == 0, atEnd2 = range.endIndex == list.childCount;
  var parent = $start.node(-1), indexBefore = $start.index(-1);
  if (!parent.canReplace(indexBefore + (atStart2 ? 0 : 1), indexBefore + 1, item.content.append(atEnd2 ? Fragment.empty : Fragment.from(list)))) {
    return false;
  }
  var start4 = $start.pos, end3 = start4 + item.nodeSize;
  tr.step(new ReplaceAroundStep(start4 - (atStart2 ? 1 : 0), end3 + (atEnd2 ? 1 : 0), start4 + 1, end3 - 1, new Slice((atStart2 ? Fragment.empty : Fragment.from(list.copy(Fragment.empty))).append(atEnd2 ? Fragment.empty : Fragment.from(list.copy(Fragment.empty))), atStart2 ? 0 : 1, atEnd2 ? 0 : 1), atStart2 ? 0 : 1));
  dispatch2(tr.scrollIntoView());
  return true;
}
function sinkListItem$2(itemType) {
  return function(state, dispatch2) {
    var ref2 = state.selection;
    var $from = ref2.$from;
    var $to = ref2.$to;
    var range = $from.blockRange($to, function(node4) {
      return node4.childCount && node4.firstChild.type == itemType;
    });
    if (!range) {
      return false;
    }
    var startIndex = range.startIndex;
    if (startIndex == 0) {
      return false;
    }
    var parent = range.parent, nodeBefore = parent.child(startIndex - 1);
    if (nodeBefore.type != itemType) {
      return false;
    }
    if (dispatch2) {
      var nestedBefore = nodeBefore.lastChild && nodeBefore.lastChild.type == parent.type;
      var inner = Fragment.from(nestedBefore ? itemType.create() : null);
      var slice4 = new Slice(Fragment.from(itemType.create(null, Fragment.from(parent.type.create(null, inner)))), nestedBefore ? 3 : 1, 0);
      var before2 = range.start, after2 = range.end;
      dispatch2(state.tr.step(new ReplaceAroundStep(before2 - (nestedBefore ? 3 : 1), after2, before2, after2, slice4, 1, true)).scrollIntoView());
    }
    return true;
  };
}
var result = {};
if (typeof navigator != "undefined" && typeof document != "undefined") {
  var ie_edge = /Edge\/(\d+)/.exec(navigator.userAgent);
  var ie_upto10 = /MSIE \d/.test(navigator.userAgent);
  var ie_11up = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent);
  var ie$1 = result.ie = !!(ie_upto10 || ie_11up || ie_edge);
  result.ie_version = ie_upto10 ? document.documentMode || 6 : ie_11up ? +ie_11up[1] : ie_edge ? +ie_edge[1] : null;
  result.gecko = !ie$1 && /gecko\/(\d+)/i.test(navigator.userAgent);
  result.gecko_version = result.gecko && +(/Firefox\/(\d+)/.exec(navigator.userAgent) || [0, 0])[1];
  var chrome$1 = !ie$1 && /Chrome\/(\d+)/.exec(navigator.userAgent);
  result.chrome = !!chrome$1;
  result.chrome_version = chrome$1 && +chrome$1[1];
  result.safari = !ie$1 && /Apple Computer/.test(navigator.vendor);
  result.ios = result.safari && (/Mobile\/\w+/.test(navigator.userAgent) || navigator.maxTouchPoints > 2);
  result.mac = result.ios || /Mac/.test(navigator.platform);
  result.android = /Android \d/.test(navigator.userAgent);
  result.webkit = "webkitFontSmoothing" in document.documentElement.style;
  result.webkit_version = result.webkit && +(/\bAppleWebKit\/(\d+)/.exec(navigator.userAgent) || [0, 0])[1];
}
var domIndex = function(node4) {
  for (var index2 = 0; ; index2++) {
    node4 = node4.previousSibling;
    if (!node4) {
      return index2;
    }
  }
};
var parentNode = function(node4) {
  var parent = node4.assignedSlot || node4.parentNode;
  return parent && parent.nodeType == 11 ? parent.host : parent;
};
var reusedRange = null;
var textRange = function(node4, from4, to) {
  var range = reusedRange || (reusedRange = document.createRange());
  range.setEnd(node4, to == null ? node4.nodeValue.length : to);
  range.setStart(node4, from4 || 0);
  return range;
};
var isEquivalentPosition = function(node4, off, targetNode, targetOff) {
  return targetNode && (scanFor(node4, off, targetNode, targetOff, -1) || scanFor(node4, off, targetNode, targetOff, 1));
};
var atomElements = /^(img|br|input|textarea|hr)$/i;
function scanFor(node4, off, targetNode, targetOff, dir) {
  for (; ; ) {
    if (node4 == targetNode && off == targetOff) {
      return true;
    }
    if (off == (dir < 0 ? 0 : nodeSize(node4))) {
      var parent = node4.parentNode;
      if (!parent || parent.nodeType != 1 || hasBlockDesc(node4) || atomElements.test(node4.nodeName) || node4.contentEditable == "false") {
        return false;
      }
      off = domIndex(node4) + (dir < 0 ? 0 : 1);
      node4 = parent;
    } else if (node4.nodeType == 1) {
      node4 = node4.childNodes[off + (dir < 0 ? -1 : 0)];
      if (node4.contentEditable == "false") {
        return false;
      }
      off = dir < 0 ? nodeSize(node4) : 0;
    } else {
      return false;
    }
  }
}
function nodeSize(node4) {
  return node4.nodeType == 3 ? node4.nodeValue.length : node4.childNodes.length;
}
function isOnEdge(node4, offset3, parent) {
  for (var atStart2 = offset3 == 0, atEnd2 = offset3 == nodeSize(node4); atStart2 || atEnd2; ) {
    if (node4 == parent) {
      return true;
    }
    var index2 = domIndex(node4);
    node4 = node4.parentNode;
    if (!node4) {
      return false;
    }
    atStart2 = atStart2 && index2 == 0;
    atEnd2 = atEnd2 && index2 == nodeSize(node4);
  }
}
function hasBlockDesc(dom) {
  var desc;
  for (var cur = dom; cur; cur = cur.parentNode) {
    if (desc = cur.pmViewDesc) {
      break;
    }
  }
  return desc && desc.node && desc.node.isBlock && (desc.dom == dom || desc.contentDOM == dom);
}
var selectionCollapsed = function(domSel) {
  var collapsed = domSel.isCollapsed;
  if (collapsed && result.chrome && domSel.rangeCount && !domSel.getRangeAt(0).collapsed) {
    collapsed = false;
  }
  return collapsed;
};
function keyEvent(keyCode, key2) {
  var event = document.createEvent("Event");
  event.initEvent("keydown", true, true);
  event.keyCode = keyCode;
  event.key = event.code = key2;
  return event;
}
function windowRect(doc2) {
  return {
    left: 0,
    right: doc2.documentElement.clientWidth,
    top: 0,
    bottom: doc2.documentElement.clientHeight
  };
}
function getSide(value, side) {
  return typeof value == "number" ? value : value[side];
}
function clientRect(node4) {
  var rect = node4.getBoundingClientRect();
  var scaleX = rect.width / node4.offsetWidth || 1;
  var scaleY = rect.height / node4.offsetHeight || 1;
  return {
    left: rect.left,
    right: rect.left + node4.clientWidth * scaleX,
    top: rect.top,
    bottom: rect.top + node4.clientHeight * scaleY
  };
}
function scrollRectIntoView(view, rect, startDOM) {
  var scrollThreshold = view.someProp("scrollThreshold") || 0, scrollMargin = view.someProp("scrollMargin") || 5;
  var doc2 = view.dom.ownerDocument;
  for (var parent = startDOM || view.dom; ; parent = parentNode(parent)) {
    if (!parent) {
      break;
    }
    if (parent.nodeType != 1) {
      continue;
    }
    var atTop = parent == doc2.body || parent.nodeType != 1;
    var bounding = atTop ? windowRect(doc2) : clientRect(parent);
    var moveX = 0, moveY = 0;
    if (rect.top < bounding.top + getSide(scrollThreshold, "top")) {
      moveY = -(bounding.top - rect.top + getSide(scrollMargin, "top"));
    } else if (rect.bottom > bounding.bottom - getSide(scrollThreshold, "bottom")) {
      moveY = rect.bottom - bounding.bottom + getSide(scrollMargin, "bottom");
    }
    if (rect.left < bounding.left + getSide(scrollThreshold, "left")) {
      moveX = -(bounding.left - rect.left + getSide(scrollMargin, "left"));
    } else if (rect.right > bounding.right - getSide(scrollThreshold, "right")) {
      moveX = rect.right - bounding.right + getSide(scrollMargin, "right");
    }
    if (moveX || moveY) {
      if (atTop) {
        doc2.defaultView.scrollBy(moveX, moveY);
      } else {
        var startX = parent.scrollLeft, startY = parent.scrollTop;
        if (moveY) {
          parent.scrollTop += moveY;
        }
        if (moveX) {
          parent.scrollLeft += moveX;
        }
        var dX = parent.scrollLeft - startX, dY = parent.scrollTop - startY;
        rect = { left: rect.left - dX, top: rect.top - dY, right: rect.right - dX, bottom: rect.bottom - dY };
      }
    }
    if (atTop) {
      break;
    }
  }
}
function storeScrollPos(view) {
  var rect = view.dom.getBoundingClientRect(), startY = Math.max(0, rect.top);
  var refDOM, refTop;
  for (var x = (rect.left + rect.right) / 2, y = startY + 1; y < Math.min(innerHeight, rect.bottom); y += 5) {
    var dom = view.root.elementFromPoint(x, y);
    if (dom == view.dom || !view.dom.contains(dom)) {
      continue;
    }
    var localRect = dom.getBoundingClientRect();
    if (localRect.top >= startY - 20) {
      refDOM = dom;
      refTop = localRect.top;
      break;
    }
  }
  return { refDOM, refTop, stack: scrollStack(view.dom) };
}
function scrollStack(dom) {
  var stack = [], doc2 = dom.ownerDocument;
  for (; dom; dom = parentNode(dom)) {
    stack.push({ dom, top: dom.scrollTop, left: dom.scrollLeft });
    if (dom == doc2) {
      break;
    }
  }
  return stack;
}
function resetScrollPos(ref2) {
  var refDOM = ref2.refDOM;
  var refTop = ref2.refTop;
  var stack = ref2.stack;
  var newRefTop = refDOM ? refDOM.getBoundingClientRect().top : 0;
  restoreScrollStack(stack, newRefTop == 0 ? 0 : newRefTop - refTop);
}
function restoreScrollStack(stack, dTop) {
  for (var i2 = 0; i2 < stack.length; i2++) {
    var ref2 = stack[i2];
    var dom = ref2.dom;
    var top2 = ref2.top;
    var left2 = ref2.left;
    if (dom.scrollTop != top2 + dTop) {
      dom.scrollTop = top2 + dTop;
    }
    if (dom.scrollLeft != left2) {
      dom.scrollLeft = left2;
    }
  }
}
var preventScrollSupported = null;
function focusPreventScroll(dom) {
  if (dom.setActive) {
    return dom.setActive();
  }
  if (preventScrollSupported) {
    return dom.focus(preventScrollSupported);
  }
  var stored = scrollStack(dom);
  dom.focus(preventScrollSupported == null ? {
    get preventScroll() {
      preventScrollSupported = { preventScroll: true };
      return true;
    }
  } : void 0);
  if (!preventScrollSupported) {
    preventScrollSupported = false;
    restoreScrollStack(stored, 0);
  }
}
function findOffsetInNode(node4, coords) {
  var closest, dxClosest = 2e8, coordsClosest, offset3 = 0;
  var rowBot = coords.top, rowTop = coords.top;
  for (var child3 = node4.firstChild, childIndex = 0; child3; child3 = child3.nextSibling, childIndex++) {
    var rects = void 0;
    if (child3.nodeType == 1) {
      rects = child3.getClientRects();
    } else if (child3.nodeType == 3) {
      rects = textRange(child3).getClientRects();
    } else {
      continue;
    }
    for (var i2 = 0; i2 < rects.length; i2++) {
      var rect = rects[i2];
      if (rect.top <= rowBot && rect.bottom >= rowTop) {
        rowBot = Math.max(rect.bottom, rowBot);
        rowTop = Math.min(rect.top, rowTop);
        var dx = rect.left > coords.left ? rect.left - coords.left : rect.right < coords.left ? coords.left - rect.right : 0;
        if (dx < dxClosest) {
          closest = child3;
          dxClosest = dx;
          coordsClosest = dx && closest.nodeType == 3 ? { left: rect.right < coords.left ? rect.right : rect.left, top: coords.top } : coords;
          if (child3.nodeType == 1 && dx) {
            offset3 = childIndex + (coords.left >= (rect.left + rect.right) / 2 ? 1 : 0);
          }
          continue;
        }
      }
      if (!closest && (coords.left >= rect.right && coords.top >= rect.top || coords.left >= rect.left && coords.top >= rect.bottom)) {
        offset3 = childIndex + 1;
      }
    }
  }
  if (closest && closest.nodeType == 3) {
    return findOffsetInText(closest, coordsClosest);
  }
  if (!closest || dxClosest && closest.nodeType == 1) {
    return { node: node4, offset: offset3 };
  }
  return findOffsetInNode(closest, coordsClosest);
}
function findOffsetInText(node4, coords) {
  var len = node4.nodeValue.length;
  var range = document.createRange();
  for (var i2 = 0; i2 < len; i2++) {
    range.setEnd(node4, i2 + 1);
    range.setStart(node4, i2);
    var rect = singleRect(range, 1);
    if (rect.top == rect.bottom) {
      continue;
    }
    if (inRect(coords, rect)) {
      return { node: node4, offset: i2 + (coords.left >= (rect.left + rect.right) / 2 ? 1 : 0) };
    }
  }
  return { node: node4, offset: 0 };
}
function inRect(coords, rect) {
  return coords.left >= rect.left - 1 && coords.left <= rect.right + 1 && coords.top >= rect.top - 1 && coords.top <= rect.bottom + 1;
}
function targetKludge(dom, coords) {
  var parent = dom.parentNode;
  if (parent && /^li$/i.test(parent.nodeName) && coords.left < dom.getBoundingClientRect().left) {
    return parent;
  }
  return dom;
}
function posFromElement(view, elt, coords) {
  var ref2 = findOffsetInNode(elt, coords);
  var node4 = ref2.node;
  var offset3 = ref2.offset;
  var bias = -1;
  if (node4.nodeType == 1 && !node4.firstChild) {
    var rect = node4.getBoundingClientRect();
    bias = rect.left != rect.right && coords.left > (rect.left + rect.right) / 2 ? 1 : -1;
  }
  return view.docView.posFromDOM(node4, offset3, bias);
}
function posFromCaret(view, node4, offset3, coords) {
  var outside = -1;
  for (var cur = node4; ; ) {
    if (cur == view.dom) {
      break;
    }
    var desc = view.docView.nearestDesc(cur, true);
    if (!desc) {
      return null;
    }
    if (desc.node.isBlock && desc.parent) {
      var rect = desc.dom.getBoundingClientRect();
      if (rect.left > coords.left || rect.top > coords.top) {
        outside = desc.posBefore;
      } else if (rect.right < coords.left || rect.bottom < coords.top) {
        outside = desc.posAfter;
      } else {
        break;
      }
    }
    cur = desc.dom.parentNode;
  }
  return outside > -1 ? outside : view.docView.posFromDOM(node4, offset3);
}
function elementFromPoint(element, coords, box) {
  var len = element.childNodes.length;
  if (len && box.top < box.bottom) {
    for (var startI = Math.max(0, Math.min(len - 1, Math.floor(len * (coords.top - box.top) / (box.bottom - box.top)) - 2)), i2 = startI; ; ) {
      var child3 = element.childNodes[i2];
      if (child3.nodeType == 1) {
        var rects = child3.getClientRects();
        for (var j = 0; j < rects.length; j++) {
          var rect = rects[j];
          if (inRect(coords, rect)) {
            return elementFromPoint(child3, coords, rect);
          }
        }
      }
      if ((i2 = (i2 + 1) % len) == startI) {
        break;
      }
    }
  }
  return element;
}
function posAtCoords(view, coords) {
  var assign, assign$1;
  var doc2 = view.dom.ownerDocument, node4, offset3;
  if (doc2.caretPositionFromPoint) {
    try {
      var pos$1 = doc2.caretPositionFromPoint(coords.left, coords.top);
      if (pos$1) {
        assign = pos$1, node4 = assign.offsetNode, offset3 = assign.offset;
      }
    } catch (_) {
    }
  }
  if (!node4 && doc2.caretRangeFromPoint) {
    var range = doc2.caretRangeFromPoint(coords.left, coords.top);
    if (range) {
      assign$1 = range, node4 = assign$1.startContainer, offset3 = assign$1.startOffset;
    }
  }
  var elt = (view.root.elementFromPoint ? view.root : doc2).elementFromPoint(coords.left, coords.top + 1), pos;
  if (!elt || !view.dom.contains(elt.nodeType != 1 ? elt.parentNode : elt)) {
    var box = view.dom.getBoundingClientRect();
    if (!inRect(coords, box)) {
      return null;
    }
    elt = elementFromPoint(view.dom, coords, box);
    if (!elt) {
      return null;
    }
  }
  if (result.safari) {
    for (var p2 = elt; node4 && p2; p2 = parentNode(p2)) {
      if (p2.draggable) {
        node4 = offset3 = null;
      }
    }
  }
  elt = targetKludge(elt, coords);
  if (node4) {
    if (result.gecko && node4.nodeType == 1) {
      offset3 = Math.min(offset3, node4.childNodes.length);
      if (offset3 < node4.childNodes.length) {
        var next = node4.childNodes[offset3], box$1;
        if (next.nodeName == "IMG" && (box$1 = next.getBoundingClientRect()).right <= coords.left && box$1.bottom > coords.top) {
          offset3++;
        }
      }
    }
    if (node4 == view.dom && offset3 == node4.childNodes.length - 1 && node4.lastChild.nodeType == 1 && coords.top > node4.lastChild.getBoundingClientRect().bottom) {
      pos = view.state.doc.content.size;
    } else if (offset3 == 0 || node4.nodeType != 1 || node4.childNodes[offset3 - 1].nodeName != "BR") {
      pos = posFromCaret(view, node4, offset3, coords);
    }
  }
  if (pos == null) {
    pos = posFromElement(view, elt, coords);
  }
  var desc = view.docView.nearestDesc(elt, true);
  return { pos, inside: desc ? desc.posAtStart - desc.border : -1 };
}
function singleRect(object, bias) {
  var rects = object.getClientRects();
  return !rects.length ? object.getBoundingClientRect() : rects[bias < 0 ? 0 : rects.length - 1];
}
var BIDI = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/;
function coordsAtPos(view, pos, side) {
  var ref2 = view.docView.domFromPos(pos, side < 0 ? -1 : 1);
  var node4 = ref2.node;
  var offset3 = ref2.offset;
  var supportEmptyRange = result.webkit || result.gecko;
  if (node4.nodeType == 3) {
    if (supportEmptyRange && (BIDI.test(node4.nodeValue) || (side < 0 ? !offset3 : offset3 == node4.nodeValue.length))) {
      var rect = singleRect(textRange(node4, offset3, offset3), side);
      if (result.gecko && offset3 && /\s/.test(node4.nodeValue[offset3 - 1]) && offset3 < node4.nodeValue.length) {
        var rectBefore = singleRect(textRange(node4, offset3 - 1, offset3 - 1), -1);
        if (rectBefore.top == rect.top) {
          var rectAfter = singleRect(textRange(node4, offset3, offset3 + 1), -1);
          if (rectAfter.top != rect.top) {
            return flattenV(rectAfter, rectAfter.left < rectBefore.left);
          }
        }
      }
      return rect;
    } else {
      var from4 = offset3, to = offset3, takeSide = side < 0 ? 1 : -1;
      if (side < 0 && !offset3) {
        to++;
        takeSide = -1;
      } else if (side >= 0 && offset3 == node4.nodeValue.length) {
        from4--;
        takeSide = 1;
      } else if (side < 0) {
        from4--;
      } else {
        to++;
      }
      return flattenV(singleRect(textRange(node4, from4, to), takeSide), takeSide < 0);
    }
  }
  if (!view.state.doc.resolve(pos).parent.inlineContent) {
    if (offset3 && (side < 0 || offset3 == nodeSize(node4))) {
      var before2 = node4.childNodes[offset3 - 1];
      if (before2.nodeType == 1) {
        return flattenH(before2.getBoundingClientRect(), false);
      }
    }
    if (offset3 < nodeSize(node4)) {
      var after2 = node4.childNodes[offset3];
      if (after2.nodeType == 1) {
        return flattenH(after2.getBoundingClientRect(), true);
      }
    }
    return flattenH(node4.getBoundingClientRect(), side >= 0);
  }
  if (offset3 && (side < 0 || offset3 == nodeSize(node4))) {
    var before$1 = node4.childNodes[offset3 - 1];
    var target = before$1.nodeType == 3 ? textRange(before$1, nodeSize(before$1) - (supportEmptyRange ? 0 : 1)) : before$1.nodeType == 1 && (before$1.nodeName != "BR" || !before$1.nextSibling) ? before$1 : null;
    if (target) {
      return flattenV(singleRect(target, 1), false);
    }
  }
  if (offset3 < nodeSize(node4)) {
    var after$1 = node4.childNodes[offset3];
    while (after$1.pmViewDesc && after$1.pmViewDesc.ignoreForCoords) {
      after$1 = after$1.nextSibling;
    }
    var target$1 = !after$1 ? null : after$1.nodeType == 3 ? textRange(after$1, 0, supportEmptyRange ? 0 : 1) : after$1.nodeType == 1 ? after$1 : null;
    if (target$1) {
      return flattenV(singleRect(target$1, -1), true);
    }
  }
  return flattenV(singleRect(node4.nodeType == 3 ? textRange(node4) : node4, -side), side >= 0);
}
function flattenV(rect, left2) {
  if (rect.width == 0) {
    return rect;
  }
  var x = left2 ? rect.left : rect.right;
  return { top: rect.top, bottom: rect.bottom, left: x, right: x };
}
function flattenH(rect, top2) {
  if (rect.height == 0) {
    return rect;
  }
  var y = top2 ? rect.top : rect.bottom;
  return { top: y, bottom: y, left: rect.left, right: rect.right };
}
function withFlushedState(view, state, f) {
  var viewState = view.state, active = view.root.activeElement;
  if (viewState != state) {
    view.updateState(state);
  }
  if (active != view.dom) {
    view.focus();
  }
  try {
    return f();
  } finally {
    if (viewState != state) {
      view.updateState(viewState);
    }
    if (active != view.dom && active) {
      active.focus();
    }
  }
}
function endOfTextblockVertical(view, state, dir) {
  var sel = state.selection;
  var $pos = dir == "up" ? sel.$from : sel.$to;
  return withFlushedState(view, state, function() {
    var ref2 = view.docView.domFromPos($pos.pos, dir == "up" ? -1 : 1);
    var dom = ref2.node;
    for (; ; ) {
      var nearest = view.docView.nearestDesc(dom, true);
      if (!nearest) {
        break;
      }
      if (nearest.node.isBlock) {
        dom = nearest.dom;
        break;
      }
      dom = nearest.dom.parentNode;
    }
    var coords = coordsAtPos(view, $pos.pos, 1);
    for (var child3 = dom.firstChild; child3; child3 = child3.nextSibling) {
      var boxes = void 0;
      if (child3.nodeType == 1) {
        boxes = child3.getClientRects();
      } else if (child3.nodeType == 3) {
        boxes = textRange(child3, 0, child3.nodeValue.length).getClientRects();
      } else {
        continue;
      }
      for (var i2 = 0; i2 < boxes.length; i2++) {
        var box = boxes[i2];
        if (box.bottom > box.top + 1 && (dir == "up" ? coords.top - box.top > (box.bottom - coords.top) * 2 : box.bottom - coords.bottom > (coords.bottom - box.top) * 2)) {
          return false;
        }
      }
    }
    return true;
  });
}
var maybeRTL = /[\u0590-\u08ac]/;
function endOfTextblockHorizontal(view, state, dir) {
  var ref2 = state.selection;
  var $head = ref2.$head;
  if (!$head.parent.isTextblock) {
    return false;
  }
  var offset3 = $head.parentOffset, atStart2 = !offset3, atEnd2 = offset3 == $head.parent.content.size;
  var sel = view.root.getSelection();
  if (!maybeRTL.test($head.parent.textContent) || !sel.modify) {
    return dir == "left" || dir == "backward" ? atStart2 : atEnd2;
  }
  return withFlushedState(view, state, function() {
    var oldRange = sel.getRangeAt(0), oldNode = sel.focusNode, oldOff = sel.focusOffset;
    var oldBidiLevel = sel.caretBidiLevel;
    sel.modify("move", dir, "character");
    var parentDOM = $head.depth ? view.docView.domAfterPos($head.before()) : view.dom;
    var result2 = !parentDOM.contains(sel.focusNode.nodeType == 1 ? sel.focusNode : sel.focusNode.parentNode) || oldNode == sel.focusNode && oldOff == sel.focusOffset;
    sel.removeAllRanges();
    sel.addRange(oldRange);
    if (oldBidiLevel != null) {
      sel.caretBidiLevel = oldBidiLevel;
    }
    return result2;
  });
}
var cachedState = null, cachedDir = null, cachedResult = false;
function endOfTextblock(view, state, dir) {
  if (cachedState == state && cachedDir == dir) {
    return cachedResult;
  }
  cachedState = state;
  cachedDir = dir;
  return cachedResult = dir == "up" || dir == "down" ? endOfTextblockVertical(view, state, dir) : endOfTextblockHorizontal(view, state, dir);
}
var NOT_DIRTY = 0, CHILD_DIRTY = 1, CONTENT_DIRTY = 2, NODE_DIRTY = 3;
var ViewDesc = function ViewDesc2(parent, children, dom, contentDOM) {
  this.parent = parent;
  this.children = children;
  this.dom = dom;
  dom.pmViewDesc = this;
  this.contentDOM = contentDOM;
  this.dirty = NOT_DIRTY;
};
var prototypeAccessors = { size: { configurable: true }, border: { configurable: true }, posBefore: { configurable: true }, posAtStart: { configurable: true }, posAfter: { configurable: true }, posAtEnd: { configurable: true }, contentLost: { configurable: true }, domAtom: { configurable: true }, ignoreForCoords: { configurable: true } };
ViewDesc.prototype.matchesWidget = function matchesWidget() {
  return false;
};
ViewDesc.prototype.matchesMark = function matchesMark() {
  return false;
};
ViewDesc.prototype.matchesNode = function matchesNode() {
  return false;
};
ViewDesc.prototype.matchesHack = function matchesHack(_nodeName) {
  return false;
};
ViewDesc.prototype.parseRule = function parseRule() {
  return null;
};
ViewDesc.prototype.stopEvent = function stopEvent() {
  return false;
};
prototypeAccessors.size.get = function() {
  var size2 = 0;
  for (var i2 = 0; i2 < this.children.length; i2++) {
    size2 += this.children[i2].size;
  }
  return size2;
};
prototypeAccessors.border.get = function() {
  return 0;
};
ViewDesc.prototype.destroy = function destroy() {
  this.parent = null;
  if (this.dom.pmViewDesc == this) {
    this.dom.pmViewDesc = null;
  }
  for (var i2 = 0; i2 < this.children.length; i2++) {
    this.children[i2].destroy();
  }
};
ViewDesc.prototype.posBeforeChild = function posBeforeChild(child3) {
  for (var i2 = 0, pos = this.posAtStart; i2 < this.children.length; i2++) {
    var cur = this.children[i2];
    if (cur == child3) {
      return pos;
    }
    pos += cur.size;
  }
};
prototypeAccessors.posBefore.get = function() {
  return this.parent.posBeforeChild(this);
};
prototypeAccessors.posAtStart.get = function() {
  return this.parent ? this.parent.posBeforeChild(this) + this.border : 0;
};
prototypeAccessors.posAfter.get = function() {
  return this.posBefore + this.size;
};
prototypeAccessors.posAtEnd.get = function() {
  return this.posAtStart + this.size - 2 * this.border;
};
ViewDesc.prototype.localPosFromDOM = function localPosFromDOM(dom, offset3, bias) {
  if (this.contentDOM && this.contentDOM.contains(dom.nodeType == 1 ? dom : dom.parentNode)) {
    if (bias < 0) {
      var domBefore, desc;
      if (dom == this.contentDOM) {
        domBefore = dom.childNodes[offset3 - 1];
      } else {
        while (dom.parentNode != this.contentDOM) {
          dom = dom.parentNode;
        }
        domBefore = dom.previousSibling;
      }
      while (domBefore && !((desc = domBefore.pmViewDesc) && desc.parent == this)) {
        domBefore = domBefore.previousSibling;
      }
      return domBefore ? this.posBeforeChild(desc) + desc.size : this.posAtStart;
    } else {
      var domAfter, desc$1;
      if (dom == this.contentDOM) {
        domAfter = dom.childNodes[offset3];
      } else {
        while (dom.parentNode != this.contentDOM) {
          dom = dom.parentNode;
        }
        domAfter = dom.nextSibling;
      }
      while (domAfter && !((desc$1 = domAfter.pmViewDesc) && desc$1.parent == this)) {
        domAfter = domAfter.nextSibling;
      }
      return domAfter ? this.posBeforeChild(desc$1) : this.posAtEnd;
    }
  }
  var atEnd2;
  if (dom == this.dom && this.contentDOM) {
    atEnd2 = offset3 > domIndex(this.contentDOM);
  } else if (this.contentDOM && this.contentDOM != this.dom && this.dom.contains(this.contentDOM)) {
    atEnd2 = dom.compareDocumentPosition(this.contentDOM) & 2;
  } else if (this.dom.firstChild) {
    if (offset3 == 0) {
      for (var search = dom; ; search = search.parentNode) {
        if (search == this.dom) {
          atEnd2 = false;
          break;
        }
        if (search.parentNode.firstChild != search) {
          break;
        }
      }
    }
    if (atEnd2 == null && offset3 == dom.childNodes.length) {
      for (var search$1 = dom; ; search$1 = search$1.parentNode) {
        if (search$1 == this.dom) {
          atEnd2 = true;
          break;
        }
        if (search$1.parentNode.lastChild != search$1) {
          break;
        }
      }
    }
  }
  return (atEnd2 == null ? bias > 0 : atEnd2) ? this.posAtEnd : this.posAtStart;
};
ViewDesc.prototype.nearestDesc = function nearestDesc(dom, onlyNodes) {
  for (var first2 = true, cur = dom; cur; cur = cur.parentNode) {
    var desc = this.getDesc(cur);
    if (desc && (!onlyNodes || desc.node)) {
      if (first2 && desc.nodeDOM && !(desc.nodeDOM.nodeType == 1 ? desc.nodeDOM.contains(dom.nodeType == 1 ? dom : dom.parentNode) : desc.nodeDOM == dom)) {
        first2 = false;
      } else {
        return desc;
      }
    }
  }
};
ViewDesc.prototype.getDesc = function getDesc(dom) {
  var desc = dom.pmViewDesc;
  for (var cur = desc; cur; cur = cur.parent) {
    if (cur == this) {
      return desc;
    }
  }
};
ViewDesc.prototype.posFromDOM = function posFromDOM(dom, offset3, bias) {
  for (var scan = dom; scan; scan = scan.parentNode) {
    var desc = this.getDesc(scan);
    if (desc) {
      return desc.localPosFromDOM(dom, offset3, bias);
    }
  }
  return -1;
};
ViewDesc.prototype.descAt = function descAt(pos) {
  for (var i2 = 0, offset3 = 0; i2 < this.children.length; i2++) {
    var child3 = this.children[i2], end3 = offset3 + child3.size;
    if (offset3 == pos && end3 != offset3) {
      while (!child3.border && child3.children.length) {
        child3 = child3.children[0];
      }
      return child3;
    }
    if (pos < end3) {
      return child3.descAt(pos - offset3 - child3.border);
    }
    offset3 = end3;
  }
};
ViewDesc.prototype.domFromPos = function domFromPos(pos, side) {
  if (!this.contentDOM) {
    return { node: this.dom, offset: 0 };
  }
  var i2 = 0, offset3 = 0;
  for (var curPos = 0; i2 < this.children.length; i2++) {
    var child3 = this.children[i2], end3 = curPos + child3.size;
    if (end3 > pos || child3 instanceof TrailingHackViewDesc) {
      offset3 = pos - curPos;
      break;
    }
    curPos = end3;
  }
  if (offset3) {
    return this.children[i2].domFromPos(offset3 - this.children[i2].border, side);
  }
  for (var prev = void 0; i2 && !(prev = this.children[i2 - 1]).size && prev instanceof WidgetViewDesc && prev.widget.type.side >= 0; i2--) {
  }
  if (side <= 0) {
    var prev$1, enter3 = true;
    for (; ; i2--, enter3 = false) {
      prev$1 = i2 ? this.children[i2 - 1] : null;
      if (!prev$1 || prev$1.dom.parentNode == this.contentDOM) {
        break;
      }
    }
    if (prev$1 && side && enter3 && !prev$1.border && !prev$1.domAtom) {
      return prev$1.domFromPos(prev$1.size, side);
    }
    return { node: this.contentDOM, offset: prev$1 ? domIndex(prev$1.dom) + 1 : 0 };
  } else {
    var next, enter$12 = true;
    for (; ; i2++, enter$12 = false) {
      next = i2 < this.children.length ? this.children[i2] : null;
      if (!next || next.dom.parentNode == this.contentDOM) {
        break;
      }
    }
    if (next && enter$12 && !next.border && !next.domAtom) {
      return next.domFromPos(0, side);
    }
    return { node: this.contentDOM, offset: next ? domIndex(next.dom) : this.contentDOM.childNodes.length };
  }
};
ViewDesc.prototype.parseRange = function parseRange(from4, to, base2) {
  if (base2 === void 0)
    base2 = 0;
  if (this.children.length == 0) {
    return { node: this.contentDOM, from: from4, to, fromOffset: 0, toOffset: this.contentDOM.childNodes.length };
  }
  var fromOffset = -1, toOffset = -1;
  for (var offset3 = base2, i2 = 0; ; i2++) {
    var child3 = this.children[i2], end3 = offset3 + child3.size;
    if (fromOffset == -1 && from4 <= end3) {
      var childBase = offset3 + child3.border;
      if (from4 >= childBase && to <= end3 - child3.border && child3.node && child3.contentDOM && this.contentDOM.contains(child3.contentDOM)) {
        return child3.parseRange(from4, to, childBase);
      }
      from4 = offset3;
      for (var j = i2; j > 0; j--) {
        var prev = this.children[j - 1];
        if (prev.size && prev.dom.parentNode == this.contentDOM && !prev.emptyChildAt(1)) {
          fromOffset = domIndex(prev.dom) + 1;
          break;
        }
        from4 -= prev.size;
      }
      if (fromOffset == -1) {
        fromOffset = 0;
      }
    }
    if (fromOffset > -1 && (end3 > to || i2 == this.children.length - 1)) {
      to = end3;
      for (var j$1 = i2 + 1; j$1 < this.children.length; j$1++) {
        var next = this.children[j$1];
        if (next.size && next.dom.parentNode == this.contentDOM && !next.emptyChildAt(-1)) {
          toOffset = domIndex(next.dom);
          break;
        }
        to += next.size;
      }
      if (toOffset == -1) {
        toOffset = this.contentDOM.childNodes.length;
      }
      break;
    }
    offset3 = end3;
  }
  return { node: this.contentDOM, from: from4, to, fromOffset, toOffset };
};
ViewDesc.prototype.emptyChildAt = function emptyChildAt(side) {
  if (this.border || !this.contentDOM || !this.children.length) {
    return false;
  }
  var child3 = this.children[side < 0 ? 0 : this.children.length - 1];
  return child3.size == 0 || child3.emptyChildAt(side);
};
ViewDesc.prototype.domAfterPos = function domAfterPos(pos) {
  var ref2 = this.domFromPos(pos, 0);
  var node4 = ref2.node;
  var offset3 = ref2.offset;
  if (node4.nodeType != 1 || offset3 == node4.childNodes.length) {
    throw new RangeError("No node after pos " + pos);
  }
  return node4.childNodes[offset3];
};
ViewDesc.prototype.setSelection = function setSelection(anchor, head, root, force) {
  var from4 = Math.min(anchor, head), to = Math.max(anchor, head);
  for (var i2 = 0, offset3 = 0; i2 < this.children.length; i2++) {
    var child3 = this.children[i2], end3 = offset3 + child3.size;
    if (from4 > offset3 && to < end3) {
      return child3.setSelection(anchor - offset3 - child3.border, head - offset3 - child3.border, root, force);
    }
    offset3 = end3;
  }
  var anchorDOM = this.domFromPos(anchor, anchor ? -1 : 1);
  var headDOM = head == anchor ? anchorDOM : this.domFromPos(head, head ? -1 : 1);
  var domSel = root.getSelection();
  var brKludge = false;
  if ((result.gecko || result.safari) && anchor == head) {
    var node4 = anchorDOM.node;
    var offset$12 = anchorDOM.offset;
    if (node4.nodeType == 3) {
      brKludge = offset$12 && node4.nodeValue[offset$12 - 1] == "\n";
      if (brKludge && offset$12 == node4.nodeValue.length) {
        for (var scan = node4, after2 = void 0; scan; scan = scan.parentNode) {
          if (after2 = scan.nextSibling) {
            if (after2.nodeName == "BR") {
              anchorDOM = headDOM = { node: after2.parentNode, offset: domIndex(after2) + 1 };
            }
            break;
          }
          var desc = scan.pmViewDesc;
          if (desc && desc.node && desc.node.isBlock) {
            break;
          }
        }
      }
    } else {
      var prev = node4.childNodes[offset$12 - 1];
      brKludge = prev && (prev.nodeName == "BR" || prev.contentEditable == "false");
    }
  }
  if (result.gecko && domSel.focusNode && domSel.focusNode != headDOM.node && domSel.focusNode.nodeType == 1) {
    var after$1 = domSel.focusNode.childNodes[domSel.focusOffset];
    if (after$1 && after$1.contentEditable == "false") {
      force = true;
    }
  }
  if (!(force || brKludge && result.safari) && isEquivalentPosition(anchorDOM.node, anchorDOM.offset, domSel.anchorNode, domSel.anchorOffset) && isEquivalentPosition(headDOM.node, headDOM.offset, domSel.focusNode, domSel.focusOffset)) {
    return;
  }
  var domSelExtended = false;
  if ((domSel.extend || anchor == head) && !brKludge) {
    domSel.collapse(anchorDOM.node, anchorDOM.offset);
    try {
      if (anchor != head) {
        domSel.extend(headDOM.node, headDOM.offset);
      }
      domSelExtended = true;
    } catch (err2) {
      if (!(err2 instanceof DOMException)) {
        throw err2;
      }
    }
  }
  if (!domSelExtended) {
    if (anchor > head) {
      var tmp = anchorDOM;
      anchorDOM = headDOM;
      headDOM = tmp;
    }
    var range = document.createRange();
    range.setEnd(headDOM.node, headDOM.offset);
    range.setStart(anchorDOM.node, anchorDOM.offset);
    domSel.removeAllRanges();
    domSel.addRange(range);
  }
};
ViewDesc.prototype.ignoreMutation = function ignoreMutation(mutation) {
  return !this.contentDOM && mutation.type != "selection";
};
prototypeAccessors.contentLost.get = function() {
  return this.contentDOM && this.contentDOM != this.dom && !this.dom.contains(this.contentDOM);
};
ViewDesc.prototype.markDirty = function markDirty(from4, to) {
  for (var offset3 = 0, i2 = 0; i2 < this.children.length; i2++) {
    var child3 = this.children[i2], end3 = offset3 + child3.size;
    if (offset3 == end3 ? from4 <= end3 && to >= offset3 : from4 < end3 && to > offset3) {
      var startInside = offset3 + child3.border, endInside = end3 - child3.border;
      if (from4 >= startInside && to <= endInside) {
        this.dirty = from4 == offset3 || to == end3 ? CONTENT_DIRTY : CHILD_DIRTY;
        if (from4 == startInside && to == endInside && (child3.contentLost || child3.dom.parentNode != this.contentDOM)) {
          child3.dirty = NODE_DIRTY;
        } else {
          child3.markDirty(from4 - startInside, to - startInside);
        }
        return;
      } else {
        child3.dirty = child3.dom == child3.contentDOM && child3.dom.parentNode == this.contentDOM && !child3.children.length ? CONTENT_DIRTY : NODE_DIRTY;
      }
    }
    offset3 = end3;
  }
  this.dirty = CONTENT_DIRTY;
};
ViewDesc.prototype.markParentsDirty = function markParentsDirty() {
  var level = 1;
  for (var node4 = this.parent; node4; node4 = node4.parent, level++) {
    var dirty = level == 1 ? CONTENT_DIRTY : CHILD_DIRTY;
    if (node4.dirty < dirty) {
      node4.dirty = dirty;
    }
  }
};
prototypeAccessors.domAtom.get = function() {
  return false;
};
prototypeAccessors.ignoreForCoords.get = function() {
  return false;
};
Object.defineProperties(ViewDesc.prototype, prototypeAccessors);
var nothing = [];
var WidgetViewDesc = /* @__PURE__ */ function(ViewDesc3) {
  function WidgetViewDesc2(parent, widget2, view, pos) {
    var self2, dom = widget2.type.toDOM;
    if (typeof dom == "function") {
      dom = dom(view, function() {
        if (!self2) {
          return pos;
        }
        if (self2.parent) {
          return self2.parent.posBeforeChild(self2);
        }
      });
    }
    if (!widget2.type.spec.raw) {
      if (dom.nodeType != 1) {
        var wrap = document.createElement("span");
        wrap.appendChild(dom);
        dom = wrap;
      }
      dom.contentEditable = false;
      dom.classList.add("ProseMirror-widget");
    }
    ViewDesc3.call(this, parent, nothing, dom, null);
    this.widget = widget2;
    self2 = this;
  }
  if (ViewDesc3)
    WidgetViewDesc2.__proto__ = ViewDesc3;
  WidgetViewDesc2.prototype = Object.create(ViewDesc3 && ViewDesc3.prototype);
  WidgetViewDesc2.prototype.constructor = WidgetViewDesc2;
  var prototypeAccessors$12 = { domAtom: { configurable: true } };
  WidgetViewDesc2.prototype.matchesWidget = function matchesWidget2(widget2) {
    return this.dirty == NOT_DIRTY && widget2.type.eq(this.widget.type);
  };
  WidgetViewDesc2.prototype.parseRule = function parseRule2() {
    return { ignore: true };
  };
  WidgetViewDesc2.prototype.stopEvent = function stopEvent2(event) {
    var stop2 = this.widget.spec.stopEvent;
    return stop2 ? stop2(event) : false;
  };
  WidgetViewDesc2.prototype.ignoreMutation = function ignoreMutation2(mutation) {
    return mutation.type != "selection" || this.widget.spec.ignoreSelection;
  };
  WidgetViewDesc2.prototype.destroy = function destroy5() {
    this.widget.type.destroy(this.dom);
    ViewDesc3.prototype.destroy.call(this);
  };
  prototypeAccessors$12.domAtom.get = function() {
    return true;
  };
  Object.defineProperties(WidgetViewDesc2.prototype, prototypeAccessors$12);
  return WidgetViewDesc2;
}(ViewDesc);
var CompositionViewDesc = /* @__PURE__ */ function(ViewDesc3) {
  function CompositionViewDesc2(parent, dom, textDOM, text2) {
    ViewDesc3.call(this, parent, nothing, dom, null);
    this.textDOM = textDOM;
    this.text = text2;
  }
  if (ViewDesc3)
    CompositionViewDesc2.__proto__ = ViewDesc3;
  CompositionViewDesc2.prototype = Object.create(ViewDesc3 && ViewDesc3.prototype);
  CompositionViewDesc2.prototype.constructor = CompositionViewDesc2;
  var prototypeAccessors$22 = { size: { configurable: true } };
  prototypeAccessors$22.size.get = function() {
    return this.text.length;
  };
  CompositionViewDesc2.prototype.localPosFromDOM = function localPosFromDOM2(dom, offset3) {
    if (dom != this.textDOM) {
      return this.posAtStart + (offset3 ? this.size : 0);
    }
    return this.posAtStart + offset3;
  };
  CompositionViewDesc2.prototype.domFromPos = function domFromPos2(pos) {
    return { node: this.textDOM, offset: pos };
  };
  CompositionViewDesc2.prototype.ignoreMutation = function ignoreMutation2(mut) {
    return mut.type === "characterData" && mut.target.nodeValue == mut.oldValue;
  };
  Object.defineProperties(CompositionViewDesc2.prototype, prototypeAccessors$22);
  return CompositionViewDesc2;
}(ViewDesc);
var MarkViewDesc = /* @__PURE__ */ function(ViewDesc3) {
  function MarkViewDesc2(parent, mark3, dom, contentDOM) {
    ViewDesc3.call(this, parent, [], dom, contentDOM);
    this.mark = mark3;
  }
  if (ViewDesc3)
    MarkViewDesc2.__proto__ = ViewDesc3;
  MarkViewDesc2.prototype = Object.create(ViewDesc3 && ViewDesc3.prototype);
  MarkViewDesc2.prototype.constructor = MarkViewDesc2;
  MarkViewDesc2.create = function create5(parent, mark3, inline2, view) {
    var custom = view.nodeViews[mark3.type.name];
    var spec = custom && custom(mark3, view, inline2);
    if (!spec || !spec.dom) {
      spec = DOMSerializer.renderSpec(document, mark3.type.spec.toDOM(mark3, inline2));
    }
    return new MarkViewDesc2(parent, mark3, spec.dom, spec.contentDOM || spec.dom);
  };
  MarkViewDesc2.prototype.parseRule = function parseRule2() {
    if (this.dirty & NODE_DIRTY || this.mark.type.spec.reparseInView) {
      return null;
    }
    return { mark: this.mark.type.name, attrs: this.mark.attrs, contentElement: this.contentDOM };
  };
  MarkViewDesc2.prototype.matchesMark = function matchesMark2(mark3) {
    return this.dirty != NODE_DIRTY && this.mark.eq(mark3);
  };
  MarkViewDesc2.prototype.markDirty = function markDirty2(from4, to) {
    ViewDesc3.prototype.markDirty.call(this, from4, to);
    if (this.dirty != NOT_DIRTY) {
      var parent = this.parent;
      while (!parent.node) {
        parent = parent.parent;
      }
      if (parent.dirty < this.dirty) {
        parent.dirty = this.dirty;
      }
      this.dirty = NOT_DIRTY;
    }
  };
  MarkViewDesc2.prototype.slice = function slice4(from4, to, view) {
    var copy5 = MarkViewDesc2.create(this.parent, this.mark, true, view);
    var nodes = this.children, size2 = this.size;
    if (to < size2) {
      nodes = replaceNodes(nodes, to, size2, view);
    }
    if (from4 > 0) {
      nodes = replaceNodes(nodes, 0, from4, view);
    }
    for (var i2 = 0; i2 < nodes.length; i2++) {
      nodes[i2].parent = copy5;
    }
    copy5.children = nodes;
    return copy5;
  };
  return MarkViewDesc2;
}(ViewDesc);
var NodeViewDesc = /* @__PURE__ */ function(ViewDesc3) {
  function NodeViewDesc2(parent, node4, outerDeco, innerDeco, dom, contentDOM, nodeDOM2, view, pos) {
    ViewDesc3.call(this, parent, node4.isLeaf ? nothing : [], dom, contentDOM);
    this.nodeDOM = nodeDOM2;
    this.node = node4;
    this.outerDeco = outerDeco;
    this.innerDeco = innerDeco;
    if (contentDOM) {
      this.updateChildren(view, pos);
    }
  }
  if (ViewDesc3)
    NodeViewDesc2.__proto__ = ViewDesc3;
  NodeViewDesc2.prototype = Object.create(ViewDesc3 && ViewDesc3.prototype);
  NodeViewDesc2.prototype.constructor = NodeViewDesc2;
  var prototypeAccessors$32 = { size: { configurable: true }, border: { configurable: true }, domAtom: { configurable: true } };
  NodeViewDesc2.create = function create5(parent, node4, outerDeco, innerDeco, view, pos) {
    var assign;
    var custom = view.nodeViews[node4.type.name], descObj;
    var spec = custom && custom(node4, view, function() {
      if (!descObj) {
        return pos;
      }
      if (descObj.parent) {
        return descObj.parent.posBeforeChild(descObj);
      }
    }, outerDeco, innerDeco);
    var dom = spec && spec.dom, contentDOM = spec && spec.contentDOM;
    if (node4.isText) {
      if (!dom) {
        dom = document.createTextNode(node4.text);
      } else if (dom.nodeType != 3) {
        throw new RangeError("Text must be rendered as a DOM text node");
      }
    } else if (!dom) {
      assign = DOMSerializer.renderSpec(document, node4.type.spec.toDOM(node4)), dom = assign.dom, contentDOM = assign.contentDOM;
    }
    if (!contentDOM && !node4.isText && dom.nodeName != "BR") {
      if (!dom.hasAttribute("contenteditable")) {
        dom.contentEditable = false;
      }
      if (node4.type.spec.draggable) {
        dom.draggable = true;
      }
    }
    var nodeDOM2 = dom;
    dom = applyOuterDeco(dom, outerDeco, node4);
    if (spec) {
      return descObj = new CustomNodeViewDesc(parent, node4, outerDeco, innerDeco, dom, contentDOM, nodeDOM2, spec, view, pos + 1);
    } else if (node4.isText) {
      return new TextViewDesc(parent, node4, outerDeco, innerDeco, dom, nodeDOM2, view);
    } else {
      return new NodeViewDesc2(parent, node4, outerDeco, innerDeco, dom, contentDOM, nodeDOM2, view, pos + 1);
    }
  };
  NodeViewDesc2.prototype.parseRule = function parseRule2() {
    var this$1$1 = this;
    if (this.node.type.spec.reparseInView) {
      return null;
    }
    var rule = { node: this.node.type.name, attrs: this.node.attrs };
    if (this.node.type.whitespace == "pre") {
      rule.preserveWhitespace = "full";
    }
    if (!this.contentDOM) {
      rule.getContent = function() {
        return this$1$1.node.content;
      };
    } else if (!this.contentLost) {
      rule.contentElement = this.contentDOM;
    } else {
      for (var i2 = this.children.length - 1; i2 >= 0; i2--) {
        var child3 = this.children[i2];
        if (this.dom.contains(child3.dom.parentNode)) {
          rule.contentElement = child3.dom.parentNode;
          break;
        }
      }
      if (!rule.contentElement) {
        rule.getContent = function() {
          return Fragment.empty;
        };
      }
    }
    return rule;
  };
  NodeViewDesc2.prototype.matchesNode = function matchesNode2(node4, outerDeco, innerDeco) {
    return this.dirty == NOT_DIRTY && node4.eq(this.node) && sameOuterDeco(outerDeco, this.outerDeco) && innerDeco.eq(this.innerDeco);
  };
  prototypeAccessors$32.size.get = function() {
    return this.node.nodeSize;
  };
  prototypeAccessors$32.border.get = function() {
    return this.node.isLeaf ? 0 : 1;
  };
  NodeViewDesc2.prototype.updateChildren = function updateChildren(view, pos) {
    var this$1$1 = this;
    var inline2 = this.node.inlineContent, off = pos;
    var composition = view.composing && this.localCompositionInfo(view, pos);
    var localComposition = composition && composition.pos > -1 ? composition : null;
    var compositionInChild = composition && composition.pos < 0;
    var updater = new ViewTreeUpdater(this, localComposition && localComposition.node);
    iterDeco(this.node, this.innerDeco, function(widget2, i2, insideNode) {
      if (widget2.spec.marks) {
        updater.syncToMarks(widget2.spec.marks, inline2, view);
      } else if (widget2.type.side >= 0 && !insideNode) {
        updater.syncToMarks(i2 == this$1$1.node.childCount ? Mark$1.none : this$1$1.node.child(i2).marks, inline2, view);
      }
      updater.placeWidget(widget2, view, off);
    }, function(child3, outerDeco, innerDeco, i2) {
      updater.syncToMarks(child3.marks, inline2, view);
      var compIndex;
      if (updater.findNodeMatch(child3, outerDeco, innerDeco, i2))
        ;
      else if (compositionInChild && view.state.selection.from > off && view.state.selection.to < off + child3.nodeSize && (compIndex = updater.findIndexWithChild(composition.node)) > -1 && updater.updateNodeAt(child3, outerDeco, innerDeco, compIndex, view))
        ;
      else if (updater.updateNextNode(child3, outerDeco, innerDeco, view, i2))
        ;
      else {
        updater.addNode(child3, outerDeco, innerDeco, view, off);
      }
      off += child3.nodeSize;
    });
    updater.syncToMarks(nothing, inline2, view);
    if (this.node.isTextblock) {
      updater.addTextblockHacks();
    }
    updater.destroyRest();
    if (updater.changed || this.dirty == CONTENT_DIRTY) {
      if (localComposition) {
        this.protectLocalComposition(view, localComposition);
      }
      renderDescs(this.contentDOM, this.children, view);
      if (result.ios) {
        iosHacks(this.dom);
      }
    }
  };
  NodeViewDesc2.prototype.localCompositionInfo = function localCompositionInfo(view, pos) {
    var ref2 = view.state.selection;
    var from4 = ref2.from;
    var to = ref2.to;
    if (!(view.state.selection instanceof TextSelection) || from4 < pos || to > pos + this.node.content.size) {
      return;
    }
    var sel = view.root.getSelection();
    var textNode = nearbyTextNode(sel.focusNode, sel.focusOffset);
    if (!textNode || !this.dom.contains(textNode.parentNode)) {
      return;
    }
    if (this.node.inlineContent) {
      var text2 = textNode.nodeValue;
      var textPos = findTextInFragment(this.node.content, text2, from4 - pos, to - pos);
      return textPos < 0 ? null : { node: textNode, pos: textPos, text: text2 };
    } else {
      return { node: textNode, pos: -1 };
    }
  };
  NodeViewDesc2.prototype.protectLocalComposition = function protectLocalComposition(view, ref2) {
    var node4 = ref2.node;
    var pos = ref2.pos;
    var text2 = ref2.text;
    if (this.getDesc(node4)) {
      return;
    }
    var topNode = node4;
    for (; ; topNode = topNode.parentNode) {
      if (topNode.parentNode == this.contentDOM) {
        break;
      }
      while (topNode.previousSibling) {
        topNode.parentNode.removeChild(topNode.previousSibling);
      }
      while (topNode.nextSibling) {
        topNode.parentNode.removeChild(topNode.nextSibling);
      }
      if (topNode.pmViewDesc) {
        topNode.pmViewDesc = null;
      }
    }
    var desc = new CompositionViewDesc(this, topNode, node4, text2);
    view.compositionNodes.push(desc);
    this.children = replaceNodes(this.children, pos, pos + text2.length, view, desc);
  };
  NodeViewDesc2.prototype.update = function update4(node4, outerDeco, innerDeco, view) {
    if (this.dirty == NODE_DIRTY || !node4.sameMarkup(this.node)) {
      return false;
    }
    this.updateInner(node4, outerDeco, innerDeco, view);
    return true;
  };
  NodeViewDesc2.prototype.updateInner = function updateInner(node4, outerDeco, innerDeco, view) {
    this.updateOuterDeco(outerDeco);
    this.node = node4;
    this.innerDeco = innerDeco;
    if (this.contentDOM) {
      this.updateChildren(view, this.posAtStart);
    }
    this.dirty = NOT_DIRTY;
  };
  NodeViewDesc2.prototype.updateOuterDeco = function updateOuterDeco(outerDeco) {
    if (sameOuterDeco(outerDeco, this.outerDeco)) {
      return;
    }
    var needsWrap = this.nodeDOM.nodeType != 1;
    var oldDOM = this.dom;
    this.dom = patchOuterDeco(this.dom, this.nodeDOM, computeOuterDeco(this.outerDeco, this.node, needsWrap), computeOuterDeco(outerDeco, this.node, needsWrap));
    if (this.dom != oldDOM) {
      oldDOM.pmViewDesc = null;
      this.dom.pmViewDesc = this;
    }
    this.outerDeco = outerDeco;
  };
  NodeViewDesc2.prototype.selectNode = function selectNode() {
    this.nodeDOM.classList.add("ProseMirror-selectednode");
    if (this.contentDOM || !this.node.type.spec.draggable) {
      this.dom.draggable = true;
    }
  };
  NodeViewDesc2.prototype.deselectNode = function deselectNode() {
    this.nodeDOM.classList.remove("ProseMirror-selectednode");
    if (this.contentDOM || !this.node.type.spec.draggable) {
      this.dom.removeAttribute("draggable");
    }
  };
  prototypeAccessors$32.domAtom.get = function() {
    return this.node.isAtom;
  };
  Object.defineProperties(NodeViewDesc2.prototype, prototypeAccessors$32);
  return NodeViewDesc2;
}(ViewDesc);
function docViewDesc(doc2, outerDeco, innerDeco, dom, view) {
  applyOuterDeco(dom, outerDeco, doc2);
  return new NodeViewDesc(null, doc2, outerDeco, innerDeco, dom, dom, dom, view, 0);
}
var TextViewDesc = /* @__PURE__ */ function(NodeViewDesc2) {
  function TextViewDesc2(parent, node4, outerDeco, innerDeco, dom, nodeDOM2, view) {
    NodeViewDesc2.call(this, parent, node4, outerDeco, innerDeco, dom, null, nodeDOM2, view);
  }
  if (NodeViewDesc2)
    TextViewDesc2.__proto__ = NodeViewDesc2;
  TextViewDesc2.prototype = Object.create(NodeViewDesc2 && NodeViewDesc2.prototype);
  TextViewDesc2.prototype.constructor = TextViewDesc2;
  var prototypeAccessors$42 = { domAtom: { configurable: true } };
  TextViewDesc2.prototype.parseRule = function parseRule2() {
    var skip = this.nodeDOM.parentNode;
    while (skip && skip != this.dom && !skip.pmIsDeco) {
      skip = skip.parentNode;
    }
    return { skip: skip || true };
  };
  TextViewDesc2.prototype.update = function update4(node4, outerDeco, _, view) {
    if (this.dirty == NODE_DIRTY || this.dirty != NOT_DIRTY && !this.inParent() || !node4.sameMarkup(this.node)) {
      return false;
    }
    this.updateOuterDeco(outerDeco);
    if ((this.dirty != NOT_DIRTY || node4.text != this.node.text) && node4.text != this.nodeDOM.nodeValue) {
      this.nodeDOM.nodeValue = node4.text;
      if (view.trackWrites == this.nodeDOM) {
        view.trackWrites = null;
      }
    }
    this.node = node4;
    this.dirty = NOT_DIRTY;
    return true;
  };
  TextViewDesc2.prototype.inParent = function inParent() {
    var parentDOM = this.parent.contentDOM;
    for (var n = this.nodeDOM; n; n = n.parentNode) {
      if (n == parentDOM) {
        return true;
      }
    }
    return false;
  };
  TextViewDesc2.prototype.domFromPos = function domFromPos2(pos) {
    return { node: this.nodeDOM, offset: pos };
  };
  TextViewDesc2.prototype.localPosFromDOM = function localPosFromDOM2(dom, offset3, bias) {
    if (dom == this.nodeDOM) {
      return this.posAtStart + Math.min(offset3, this.node.text.length);
    }
    return NodeViewDesc2.prototype.localPosFromDOM.call(this, dom, offset3, bias);
  };
  TextViewDesc2.prototype.ignoreMutation = function ignoreMutation2(mutation) {
    return mutation.type != "characterData" && mutation.type != "selection";
  };
  TextViewDesc2.prototype.slice = function slice4(from4, to, view) {
    var node4 = this.node.cut(from4, to), dom = document.createTextNode(node4.text);
    return new TextViewDesc2(this.parent, node4, this.outerDeco, this.innerDeco, dom, dom, view);
  };
  TextViewDesc2.prototype.markDirty = function markDirty2(from4, to) {
    NodeViewDesc2.prototype.markDirty.call(this, from4, to);
    if (this.dom != this.nodeDOM && (from4 == 0 || to == this.nodeDOM.nodeValue.length)) {
      this.dirty = NODE_DIRTY;
    }
  };
  prototypeAccessors$42.domAtom.get = function() {
    return false;
  };
  Object.defineProperties(TextViewDesc2.prototype, prototypeAccessors$42);
  return TextViewDesc2;
}(NodeViewDesc);
var TrailingHackViewDesc = /* @__PURE__ */ function(ViewDesc3) {
  function TrailingHackViewDesc2() {
    ViewDesc3.apply(this, arguments);
  }
  if (ViewDesc3)
    TrailingHackViewDesc2.__proto__ = ViewDesc3;
  TrailingHackViewDesc2.prototype = Object.create(ViewDesc3 && ViewDesc3.prototype);
  TrailingHackViewDesc2.prototype.constructor = TrailingHackViewDesc2;
  var prototypeAccessors$52 = { domAtom: { configurable: true }, ignoreForCoords: { configurable: true } };
  TrailingHackViewDesc2.prototype.parseRule = function parseRule2() {
    return { ignore: true };
  };
  TrailingHackViewDesc2.prototype.matchesHack = function matchesHack2(nodeName) {
    return this.dirty == NOT_DIRTY && this.dom.nodeName == nodeName;
  };
  prototypeAccessors$52.domAtom.get = function() {
    return true;
  };
  prototypeAccessors$52.ignoreForCoords.get = function() {
    return this.dom.nodeName == "IMG";
  };
  Object.defineProperties(TrailingHackViewDesc2.prototype, prototypeAccessors$52);
  return TrailingHackViewDesc2;
}(ViewDesc);
var CustomNodeViewDesc = /* @__PURE__ */ function(NodeViewDesc2) {
  function CustomNodeViewDesc2(parent, node4, outerDeco, innerDeco, dom, contentDOM, nodeDOM2, spec, view, pos) {
    NodeViewDesc2.call(this, parent, node4, outerDeco, innerDeco, dom, contentDOM, nodeDOM2, view, pos);
    this.spec = spec;
  }
  if (NodeViewDesc2)
    CustomNodeViewDesc2.__proto__ = NodeViewDesc2;
  CustomNodeViewDesc2.prototype = Object.create(NodeViewDesc2 && NodeViewDesc2.prototype);
  CustomNodeViewDesc2.prototype.constructor = CustomNodeViewDesc2;
  CustomNodeViewDesc2.prototype.update = function update4(node4, outerDeco, innerDeco, view) {
    if (this.dirty == NODE_DIRTY) {
      return false;
    }
    if (this.spec.update) {
      var result2 = this.spec.update(node4, outerDeco, innerDeco);
      if (result2) {
        this.updateInner(node4, outerDeco, innerDeco, view);
      }
      return result2;
    } else if (!this.contentDOM && !node4.isLeaf) {
      return false;
    } else {
      return NodeViewDesc2.prototype.update.call(this, node4, outerDeco, innerDeco, view);
    }
  };
  CustomNodeViewDesc2.prototype.selectNode = function selectNode() {
    this.spec.selectNode ? this.spec.selectNode() : NodeViewDesc2.prototype.selectNode.call(this);
  };
  CustomNodeViewDesc2.prototype.deselectNode = function deselectNode() {
    this.spec.deselectNode ? this.spec.deselectNode() : NodeViewDesc2.prototype.deselectNode.call(this);
  };
  CustomNodeViewDesc2.prototype.setSelection = function setSelection2(anchor, head, root, force) {
    this.spec.setSelection ? this.spec.setSelection(anchor, head, root) : NodeViewDesc2.prototype.setSelection.call(this, anchor, head, root, force);
  };
  CustomNodeViewDesc2.prototype.destroy = function destroy5() {
    if (this.spec.destroy) {
      this.spec.destroy();
    }
    NodeViewDesc2.prototype.destroy.call(this);
  };
  CustomNodeViewDesc2.prototype.stopEvent = function stopEvent2(event) {
    return this.spec.stopEvent ? this.spec.stopEvent(event) : false;
  };
  CustomNodeViewDesc2.prototype.ignoreMutation = function ignoreMutation2(mutation) {
    return this.spec.ignoreMutation ? this.spec.ignoreMutation(mutation) : NodeViewDesc2.prototype.ignoreMutation.call(this, mutation);
  };
  return CustomNodeViewDesc2;
}(NodeViewDesc);
function renderDescs(parentDOM, descs, view) {
  var dom = parentDOM.firstChild, written = false;
  for (var i2 = 0; i2 < descs.length; i2++) {
    var desc = descs[i2], childDOM = desc.dom;
    if (childDOM.parentNode == parentDOM) {
      while (childDOM != dom) {
        dom = rm(dom);
        written = true;
      }
      dom = dom.nextSibling;
    } else {
      written = true;
      parentDOM.insertBefore(childDOM, dom);
    }
    if (desc instanceof MarkViewDesc) {
      var pos = dom ? dom.previousSibling : parentDOM.lastChild;
      renderDescs(desc.contentDOM, desc.children, view);
      dom = pos ? pos.nextSibling : parentDOM.firstChild;
    }
  }
  while (dom) {
    dom = rm(dom);
    written = true;
  }
  if (written && view.trackWrites == parentDOM) {
    view.trackWrites = null;
  }
}
function OuterDecoLevel(nodeName) {
  if (nodeName) {
    this.nodeName = nodeName;
  }
}
OuterDecoLevel.prototype = /* @__PURE__ */ Object.create(null);
var noDeco = [new OuterDecoLevel()];
function computeOuterDeco(outerDeco, node4, needsWrap) {
  if (outerDeco.length == 0) {
    return noDeco;
  }
  var top2 = needsWrap ? noDeco[0] : new OuterDecoLevel(), result2 = [top2];
  for (var i2 = 0; i2 < outerDeco.length; i2++) {
    var attrs = outerDeco[i2].type.attrs;
    if (!attrs) {
      continue;
    }
    if (attrs.nodeName) {
      result2.push(top2 = new OuterDecoLevel(attrs.nodeName));
    }
    for (var name in attrs) {
      var val = attrs[name];
      if (val == null) {
        continue;
      }
      if (needsWrap && result2.length == 1) {
        result2.push(top2 = new OuterDecoLevel(node4.isInline ? "span" : "div"));
      }
      if (name == "class") {
        top2.class = (top2.class ? top2.class + " " : "") + val;
      } else if (name == "style") {
        top2.style = (top2.style ? top2.style + ";" : "") + val;
      } else if (name != "nodeName") {
        top2[name] = val;
      }
    }
  }
  return result2;
}
function patchOuterDeco(outerDOM, nodeDOM2, prevComputed, curComputed) {
  if (prevComputed == noDeco && curComputed == noDeco) {
    return nodeDOM2;
  }
  var curDOM = nodeDOM2;
  for (var i2 = 0; i2 < curComputed.length; i2++) {
    var deco = curComputed[i2], prev = prevComputed[i2];
    if (i2) {
      var parent = void 0;
      if (prev && prev.nodeName == deco.nodeName && curDOM != outerDOM && (parent = curDOM.parentNode) && parent.tagName.toLowerCase() == deco.nodeName) {
        curDOM = parent;
      } else {
        parent = document.createElement(deco.nodeName);
        parent.pmIsDeco = true;
        parent.appendChild(curDOM);
        prev = noDeco[0];
        curDOM = parent;
      }
    }
    patchAttributes(curDOM, prev || noDeco[0], deco);
  }
  return curDOM;
}
function patchAttributes(dom, prev, cur) {
  for (var name in prev) {
    if (name != "class" && name != "style" && name != "nodeName" && !(name in cur)) {
      dom.removeAttribute(name);
    }
  }
  for (var name$1 in cur) {
    if (name$1 != "class" && name$1 != "style" && name$1 != "nodeName" && cur[name$1] != prev[name$1]) {
      dom.setAttribute(name$1, cur[name$1]);
    }
  }
  if (prev.class != cur.class) {
    var prevList = prev.class ? prev.class.split(" ").filter(Boolean) : nothing;
    var curList = cur.class ? cur.class.split(" ").filter(Boolean) : nothing;
    for (var i2 = 0; i2 < prevList.length; i2++) {
      if (curList.indexOf(prevList[i2]) == -1) {
        dom.classList.remove(prevList[i2]);
      }
    }
    for (var i$1 = 0; i$1 < curList.length; i$1++) {
      if (prevList.indexOf(curList[i$1]) == -1) {
        dom.classList.add(curList[i$1]);
      }
    }
    if (dom.classList.length == 0) {
      dom.removeAttribute("class");
    }
  }
  if (prev.style != cur.style) {
    if (prev.style) {
      var prop2 = /\s*([\w\-\xa1-\uffff]+)\s*:(?:"(?:\\.|[^"])*"|'(?:\\.|[^'])*'|\(.*?\)|[^;])*/g, m;
      while (m = prop2.exec(prev.style)) {
        dom.style.removeProperty(m[1]);
      }
    }
    if (cur.style) {
      dom.style.cssText += cur.style;
    }
  }
}
function applyOuterDeco(dom, deco, node4) {
  return patchOuterDeco(dom, dom, noDeco, computeOuterDeco(deco, node4, dom.nodeType != 1));
}
function sameOuterDeco(a2, b) {
  if (a2.length != b.length) {
    return false;
  }
  for (var i2 = 0; i2 < a2.length; i2++) {
    if (!a2[i2].type.eq(b[i2].type)) {
      return false;
    }
  }
  return true;
}
function rm(dom) {
  var next = dom.nextSibling;
  dom.parentNode.removeChild(dom);
  return next;
}
var ViewTreeUpdater = function ViewTreeUpdater2(top2, lockedNode) {
  this.top = top2;
  this.lock = lockedNode;
  this.index = 0;
  this.stack = [];
  this.changed = false;
  this.preMatch = preMatch(top2.node.content, top2);
};
ViewTreeUpdater.prototype.destroyBetween = function destroyBetween(start4, end3) {
  if (start4 == end3) {
    return;
  }
  for (var i2 = start4; i2 < end3; i2++) {
    this.top.children[i2].destroy();
  }
  this.top.children.splice(start4, end3 - start4);
  this.changed = true;
};
ViewTreeUpdater.prototype.destroyRest = function destroyRest() {
  this.destroyBetween(this.index, this.top.children.length);
};
ViewTreeUpdater.prototype.syncToMarks = function syncToMarks(marks2, inline2, view) {
  var keep = 0, depth = this.stack.length >> 1;
  var maxKeep = Math.min(depth, marks2.length);
  while (keep < maxKeep && (keep == depth - 1 ? this.top : this.stack[keep + 1 << 1]).matchesMark(marks2[keep]) && marks2[keep].type.spec.spanning !== false) {
    keep++;
  }
  while (keep < depth) {
    this.destroyRest();
    this.top.dirty = NOT_DIRTY;
    this.index = this.stack.pop();
    this.top = this.stack.pop();
    depth--;
  }
  while (depth < marks2.length) {
    this.stack.push(this.top, this.index + 1);
    var found2 = -1;
    for (var i2 = this.index; i2 < Math.min(this.index + 3, this.top.children.length); i2++) {
      if (this.top.children[i2].matchesMark(marks2[depth])) {
        found2 = i2;
        break;
      }
    }
    if (found2 > -1) {
      if (found2 > this.index) {
        this.changed = true;
        this.destroyBetween(this.index, found2);
      }
      this.top = this.top.children[this.index];
    } else {
      var markDesc = MarkViewDesc.create(this.top, marks2[depth], inline2, view);
      this.top.children.splice(this.index, 0, markDesc);
      this.top = markDesc;
      this.changed = true;
    }
    this.index = 0;
    depth++;
  }
};
ViewTreeUpdater.prototype.findNodeMatch = function findNodeMatch(node4, outerDeco, innerDeco, index2) {
  var found2 = -1, targetDesc;
  if (index2 >= this.preMatch.index && (targetDesc = this.preMatch.matches[index2 - this.preMatch.index]).parent == this.top && targetDesc.matchesNode(node4, outerDeco, innerDeco)) {
    found2 = this.top.children.indexOf(targetDesc, this.index);
  } else {
    for (var i2 = this.index, e = Math.min(this.top.children.length, i2 + 5); i2 < e; i2++) {
      var child3 = this.top.children[i2];
      if (child3.matchesNode(node4, outerDeco, innerDeco) && !this.preMatch.matched.has(child3)) {
        found2 = i2;
        break;
      }
    }
  }
  if (found2 < 0) {
    return false;
  }
  this.destroyBetween(this.index, found2);
  this.index++;
  return true;
};
ViewTreeUpdater.prototype.updateNodeAt = function updateNodeAt(node4, outerDeco, innerDeco, index2, view) {
  var child3 = this.top.children[index2];
  if (!child3.update(node4, outerDeco, innerDeco, view)) {
    return false;
  }
  this.destroyBetween(this.index, index2);
  this.index = index2 + 1;
  return true;
};
ViewTreeUpdater.prototype.findIndexWithChild = function findIndexWithChild(domNode) {
  for (; ; ) {
    var parent = domNode.parentNode;
    if (!parent) {
      return -1;
    }
    if (parent == this.top.contentDOM) {
      var desc = domNode.pmViewDesc;
      if (desc) {
        for (var i2 = this.index; i2 < this.top.children.length; i2++) {
          if (this.top.children[i2] == desc) {
            return i2;
          }
        }
      }
      return -1;
    }
    domNode = parent;
  }
};
ViewTreeUpdater.prototype.updateNextNode = function updateNextNode(node4, outerDeco, innerDeco, view, index2) {
  for (var i2 = this.index; i2 < this.top.children.length; i2++) {
    var next = this.top.children[i2];
    if (next instanceof NodeViewDesc) {
      var preMatch2 = this.preMatch.matched.get(next);
      if (preMatch2 != null && preMatch2 != index2) {
        return false;
      }
      var nextDOM = next.dom;
      var locked = this.lock && (nextDOM == this.lock || nextDOM.nodeType == 1 && nextDOM.contains(this.lock.parentNode)) && !(node4.isText && next.node && next.node.isText && next.nodeDOM.nodeValue == node4.text && next.dirty != NODE_DIRTY && sameOuterDeco(outerDeco, next.outerDeco));
      if (!locked && next.update(node4, outerDeco, innerDeco, view)) {
        this.destroyBetween(this.index, i2);
        if (next.dom != nextDOM) {
          this.changed = true;
        }
        this.index++;
        return true;
      }
      break;
    }
  }
  return false;
};
ViewTreeUpdater.prototype.addNode = function addNode2(node4, outerDeco, innerDeco, view, pos) {
  this.top.children.splice(this.index++, 0, NodeViewDesc.create(this.top, node4, outerDeco, innerDeco, view, pos));
  this.changed = true;
};
ViewTreeUpdater.prototype.placeWidget = function placeWidget(widget2, view, pos) {
  var next = this.index < this.top.children.length ? this.top.children[this.index] : null;
  if (next && next.matchesWidget(widget2) && (widget2 == next.widget || !next.widget.type.toDOM.parentNode)) {
    this.index++;
  } else {
    var desc = new WidgetViewDesc(this.top, widget2, view, pos);
    this.top.children.splice(this.index++, 0, desc);
    this.changed = true;
  }
};
ViewTreeUpdater.prototype.addTextblockHacks = function addTextblockHacks() {
  var lastChild = this.top.children[this.index - 1], parent = this.top;
  while (lastChild instanceof MarkViewDesc) {
    parent = lastChild;
    lastChild = parent.children[parent.children.length - 1];
  }
  if (!lastChild || !(lastChild instanceof TextViewDesc) || /\n$/.test(lastChild.node.text)) {
    if ((result.safari || result.chrome) && lastChild && lastChild.dom.contentEditable == "false") {
      this.addHackNode("IMG", parent);
    }
    this.addHackNode("BR", this.top);
  }
};
ViewTreeUpdater.prototype.addHackNode = function addHackNode(nodeName, parent) {
  if (parent == this.top && this.index < parent.children.length && parent.children[this.index].matchesHack(nodeName)) {
    this.index++;
  } else {
    var dom = document.createElement(nodeName);
    if (nodeName == "IMG") {
      dom.className = "ProseMirror-separator";
      dom.alt = "";
    }
    if (nodeName == "BR") {
      dom.className = "ProseMirror-trailingBreak";
    }
    var hack = new TrailingHackViewDesc(this.top, nothing, dom, null);
    if (parent != this.top) {
      parent.children.push(hack);
    } else {
      parent.children.splice(this.index++, 0, hack);
    }
    this.changed = true;
  }
};
function preMatch(frag, parentDesc) {
  var curDesc = parentDesc, descI = curDesc.children.length;
  var fI = frag.childCount, matched = /* @__PURE__ */ new Map(), matches2 = [];
  outer:
    while (fI > 0) {
      var desc = void 0;
      for (; ; ) {
        if (descI) {
          var next = curDesc.children[descI - 1];
          if (next instanceof MarkViewDesc) {
            curDesc = next;
            descI = next.children.length;
          } else {
            desc = next;
            descI--;
            break;
          }
        } else if (curDesc == parentDesc) {
          break outer;
        } else {
          descI = curDesc.parent.children.indexOf(curDesc);
          curDesc = curDesc.parent;
        }
      }
      var node4 = desc.node;
      if (!node4) {
        continue;
      }
      if (node4 != frag.child(fI - 1)) {
        break;
      }
      --fI;
      matched.set(desc, fI);
      matches2.push(desc);
    }
  return { index: fI, matched, matches: matches2.reverse() };
}
function compareSide(a2, b) {
  return a2.type.side - b.type.side;
}
function iterDeco(parent, deco, onWidget, onNode) {
  var locals3 = deco.locals(parent), offset3 = 0;
  if (locals3.length == 0) {
    for (var i2 = 0; i2 < parent.childCount; i2++) {
      var child3 = parent.child(i2);
      onNode(child3, locals3, deco.forChild(offset3, child3), i2);
      offset3 += child3.nodeSize;
    }
    return;
  }
  var decoIndex = 0, active = [], restNode = null;
  for (var parentIndex = 0; ; ) {
    if (decoIndex < locals3.length && locals3[decoIndex].to == offset3) {
      var widget2 = locals3[decoIndex++], widgets = void 0;
      while (decoIndex < locals3.length && locals3[decoIndex].to == offset3) {
        (widgets || (widgets = [widget2])).push(locals3[decoIndex++]);
      }
      if (widgets) {
        widgets.sort(compareSide);
        for (var i$1 = 0; i$1 < widgets.length; i$1++) {
          onWidget(widgets[i$1], parentIndex, !!restNode);
        }
      } else {
        onWidget(widget2, parentIndex, !!restNode);
      }
    }
    var child$1 = void 0, index2 = void 0;
    if (restNode) {
      index2 = -1;
      child$1 = restNode;
      restNode = null;
    } else if (parentIndex < parent.childCount) {
      index2 = parentIndex;
      child$1 = parent.child(parentIndex++);
    } else {
      break;
    }
    for (var i$2 = 0; i$2 < active.length; i$2++) {
      if (active[i$2].to <= offset3) {
        active.splice(i$2--, 1);
      }
    }
    while (decoIndex < locals3.length && locals3[decoIndex].from <= offset3 && locals3[decoIndex].to > offset3) {
      active.push(locals3[decoIndex++]);
    }
    var end3 = offset3 + child$1.nodeSize;
    if (child$1.isText) {
      var cutAt = end3;
      if (decoIndex < locals3.length && locals3[decoIndex].from < cutAt) {
        cutAt = locals3[decoIndex].from;
      }
      for (var i$3 = 0; i$3 < active.length; i$3++) {
        if (active[i$3].to < cutAt) {
          cutAt = active[i$3].to;
        }
      }
      if (cutAt < end3) {
        restNode = child$1.cut(cutAt - offset3);
        child$1 = child$1.cut(0, cutAt - offset3);
        end3 = cutAt;
        index2 = -1;
      }
    }
    var outerDeco = !active.length ? nothing : child$1.isInline && !child$1.isLeaf ? active.filter(function(d) {
      return !d.inline;
    }) : active.slice();
    onNode(child$1, outerDeco, deco.forChild(offset3, child$1), index2);
    offset3 = end3;
  }
}
function iosHacks(dom) {
  if (dom.nodeName == "UL" || dom.nodeName == "OL") {
    var oldCSS = dom.style.cssText;
    dom.style.cssText = oldCSS + "; list-style: square !important";
    window.getComputedStyle(dom).listStyle;
    dom.style.cssText = oldCSS;
  }
}
function nearbyTextNode(node4, offset3) {
  for (; ; ) {
    if (node4.nodeType == 3) {
      return node4;
    }
    if (node4.nodeType == 1 && offset3 > 0) {
      if (node4.childNodes.length > offset3 && node4.childNodes[offset3].nodeType == 3) {
        return node4.childNodes[offset3];
      }
      node4 = node4.childNodes[offset3 - 1];
      offset3 = nodeSize(node4);
    } else if (node4.nodeType == 1 && offset3 < node4.childNodes.length) {
      node4 = node4.childNodes[offset3];
      offset3 = 0;
    } else {
      return null;
    }
  }
}
function findTextInFragment(frag, text2, from4, to) {
  for (var i2 = 0, pos = 0; i2 < frag.childCount && pos <= to; ) {
    var child3 = frag.child(i2++), childStart = pos;
    pos += child3.nodeSize;
    if (!child3.isText) {
      continue;
    }
    var str = child3.text;
    while (i2 < frag.childCount) {
      var next = frag.child(i2++);
      pos += next.nodeSize;
      if (!next.isText) {
        break;
      }
      str += next.text;
    }
    if (pos >= from4) {
      var found2 = childStart < to ? str.lastIndexOf(text2, to - childStart - 1) : -1;
      if (found2 >= 0 && found2 + text2.length + childStart >= from4) {
        return childStart + found2;
      }
      if (from4 == to && str.length >= to + text2.length - childStart && str.slice(to - childStart, to - childStart + text2.length) == text2) {
        return to;
      }
    }
  }
  return -1;
}
function replaceNodes(nodes, from4, to, view, replacement) {
  var result2 = [];
  for (var i2 = 0, off = 0; i2 < nodes.length; i2++) {
    var child3 = nodes[i2], start4 = off, end3 = off += child3.size;
    if (start4 >= to || end3 <= from4) {
      result2.push(child3);
    } else {
      if (start4 < from4) {
        result2.push(child3.slice(0, from4 - start4, view));
      }
      if (replacement) {
        result2.push(replacement);
        replacement = null;
      }
      if (end3 > to) {
        result2.push(child3.slice(to - start4, child3.size, view));
      }
    }
  }
  return result2;
}
function selectionFromDOM(view, origin) {
  var domSel = view.root.getSelection(), doc2 = view.state.doc;
  if (!domSel.focusNode) {
    return null;
  }
  var nearestDesc2 = view.docView.nearestDesc(domSel.focusNode), inWidget = nearestDesc2 && nearestDesc2.size == 0;
  var head = view.docView.posFromDOM(domSel.focusNode, domSel.focusOffset);
  if (head < 0) {
    return null;
  }
  var $head = doc2.resolve(head), $anchor, selection;
  if (selectionCollapsed(domSel)) {
    $anchor = $head;
    while (nearestDesc2 && !nearestDesc2.node) {
      nearestDesc2 = nearestDesc2.parent;
    }
    if (nearestDesc2 && nearestDesc2.node.isAtom && NodeSelection.isSelectable(nearestDesc2.node) && nearestDesc2.parent && !(nearestDesc2.node.isInline && isOnEdge(domSel.focusNode, domSel.focusOffset, nearestDesc2.dom))) {
      var pos = nearestDesc2.posBefore;
      selection = new NodeSelection(head == pos ? $head : doc2.resolve(pos));
    }
  } else {
    var anchor = view.docView.posFromDOM(domSel.anchorNode, domSel.anchorOffset);
    if (anchor < 0) {
      return null;
    }
    $anchor = doc2.resolve(anchor);
  }
  if (!selection) {
    var bias = origin == "pointer" || view.state.selection.head < $head.pos && !inWidget ? 1 : -1;
    selection = selectionBetween(view, $anchor, $head, bias);
  }
  return selection;
}
function editorOwnsSelection(view) {
  return view.editable ? view.hasFocus() : hasSelection(view) && document.activeElement && document.activeElement.contains(view.dom);
}
function selectionToDOM(view, force) {
  var sel = view.state.selection;
  syncNodeSelection(view, sel);
  if (!editorOwnsSelection(view)) {
    return;
  }
  if (!force && view.mouseDown && view.mouseDown.allowDefault && result.chrome) {
    var domSel = view.root.getSelection(), curSel = view.domObserver.currentSelection;
    if (domSel.anchorNode && isEquivalentPosition(domSel.anchorNode, domSel.anchorOffset, curSel.anchorNode, curSel.anchorOffset)) {
      view.mouseDown.delayedSelectionSync = true;
      view.domObserver.setCurSelection();
      return;
    }
  }
  view.domObserver.disconnectSelection();
  if (view.cursorWrapper) {
    selectCursorWrapper(view);
  } else {
    var anchor = sel.anchor;
    var head = sel.head;
    var resetEditableFrom, resetEditableTo;
    if (brokenSelectBetweenUneditable && !(sel instanceof TextSelection)) {
      if (!sel.$from.parent.inlineContent) {
        resetEditableFrom = temporarilyEditableNear(view, sel.from);
      }
      if (!sel.empty && !sel.$from.parent.inlineContent) {
        resetEditableTo = temporarilyEditableNear(view, sel.to);
      }
    }
    view.docView.setSelection(anchor, head, view.root, force);
    if (brokenSelectBetweenUneditable) {
      if (resetEditableFrom) {
        resetEditable(resetEditableFrom);
      }
      if (resetEditableTo) {
        resetEditable(resetEditableTo);
      }
    }
    if (sel.visible) {
      view.dom.classList.remove("ProseMirror-hideselection");
    } else {
      view.dom.classList.add("ProseMirror-hideselection");
      if ("onselectionchange" in document) {
        removeClassOnSelectionChange(view);
      }
    }
  }
  view.domObserver.setCurSelection();
  view.domObserver.connectSelection();
}
var brokenSelectBetweenUneditable = result.safari || result.chrome && result.chrome_version < 63;
function temporarilyEditableNear(view, pos) {
  var ref2 = view.docView.domFromPos(pos, 0);
  var node4 = ref2.node;
  var offset3 = ref2.offset;
  var after2 = offset3 < node4.childNodes.length ? node4.childNodes[offset3] : null;
  var before2 = offset3 ? node4.childNodes[offset3 - 1] : null;
  if (result.safari && after2 && after2.contentEditable == "false") {
    return setEditable(after2);
  }
  if ((!after2 || after2.contentEditable == "false") && (!before2 || before2.contentEditable == "false")) {
    if (after2) {
      return setEditable(after2);
    } else if (before2) {
      return setEditable(before2);
    }
  }
}
function setEditable(element) {
  element.contentEditable = "true";
  if (result.safari && element.draggable) {
    element.draggable = false;
    element.wasDraggable = true;
  }
  return element;
}
function resetEditable(element) {
  element.contentEditable = "false";
  if (element.wasDraggable) {
    element.draggable = true;
    element.wasDraggable = null;
  }
}
function removeClassOnSelectionChange(view) {
  var doc2 = view.dom.ownerDocument;
  doc2.removeEventListener("selectionchange", view.hideSelectionGuard);
  var domSel = view.root.getSelection();
  var node4 = domSel.anchorNode, offset3 = domSel.anchorOffset;
  doc2.addEventListener("selectionchange", view.hideSelectionGuard = function() {
    if (domSel.anchorNode != node4 || domSel.anchorOffset != offset3) {
      doc2.removeEventListener("selectionchange", view.hideSelectionGuard);
      setTimeout(function() {
        if (!editorOwnsSelection(view) || view.state.selection.visible) {
          view.dom.classList.remove("ProseMirror-hideselection");
        }
      }, 20);
    }
  });
}
function selectCursorWrapper(view) {
  var domSel = view.root.getSelection(), range = document.createRange();
  var node4 = view.cursorWrapper.dom, img = node4.nodeName == "IMG";
  if (img) {
    range.setEnd(node4.parentNode, domIndex(node4) + 1);
  } else {
    range.setEnd(node4, 0);
  }
  range.collapse(false);
  domSel.removeAllRanges();
  domSel.addRange(range);
  if (!img && !view.state.selection.visible && result.ie && result.ie_version <= 11) {
    node4.disabled = true;
    node4.disabled = false;
  }
}
function syncNodeSelection(view, sel) {
  if (sel instanceof NodeSelection) {
    var desc = view.docView.descAt(sel.from);
    if (desc != view.lastSelectedViewDesc) {
      clearNodeSelection(view);
      if (desc) {
        desc.selectNode();
      }
      view.lastSelectedViewDesc = desc;
    }
  } else {
    clearNodeSelection(view);
  }
}
function clearNodeSelection(view) {
  if (view.lastSelectedViewDesc) {
    if (view.lastSelectedViewDesc.parent) {
      view.lastSelectedViewDesc.deselectNode();
    }
    view.lastSelectedViewDesc = null;
  }
}
function selectionBetween(view, $anchor, $head, bias) {
  return view.someProp("createSelectionBetween", function(f) {
    return f(view, $anchor, $head);
  }) || TextSelection.between($anchor, $head, bias);
}
function hasFocusAndSelection(view) {
  if (view.editable && view.root.activeElement != view.dom) {
    return false;
  }
  return hasSelection(view);
}
function hasSelection(view) {
  var sel = view.root.getSelection();
  if (!sel.anchorNode) {
    return false;
  }
  try {
    return view.dom.contains(sel.anchorNode.nodeType == 3 ? sel.anchorNode.parentNode : sel.anchorNode) && (view.editable || view.dom.contains(sel.focusNode.nodeType == 3 ? sel.focusNode.parentNode : sel.focusNode));
  } catch (_) {
    return false;
  }
}
function anchorInRightPlace(view) {
  var anchorDOM = view.docView.domFromPos(view.state.selection.anchor, 0);
  var domSel = view.root.getSelection();
  return isEquivalentPosition(anchorDOM.node, anchorDOM.offset, domSel.anchorNode, domSel.anchorOffset);
}
function moveSelectionBlock(state, dir) {
  var ref2 = state.selection;
  var $anchor = ref2.$anchor;
  var $head = ref2.$head;
  var $side = dir > 0 ? $anchor.max($head) : $anchor.min($head);
  var $start = !$side.parent.inlineContent ? $side : $side.depth ? state.doc.resolve(dir > 0 ? $side.after() : $side.before()) : null;
  return $start && Selection.findFrom($start, dir);
}
function apply(view, sel) {
  view.dispatch(view.state.tr.setSelection(sel).scrollIntoView());
  return true;
}
function selectHorizontally(view, dir, mods) {
  var sel = view.state.selection;
  if (sel instanceof TextSelection) {
    if (!sel.empty || mods.indexOf("s") > -1) {
      return false;
    } else if (view.endOfTextblock(dir > 0 ? "right" : "left")) {
      var next = moveSelectionBlock(view.state, dir);
      if (next && next instanceof NodeSelection) {
        return apply(view, next);
      }
      return false;
    } else if (!(result.mac && mods.indexOf("m") > -1)) {
      var $head = sel.$head, node4 = $head.textOffset ? null : dir < 0 ? $head.nodeBefore : $head.nodeAfter, desc;
      if (!node4 || node4.isText) {
        return false;
      }
      var nodePos = dir < 0 ? $head.pos - node4.nodeSize : $head.pos;
      if (!(node4.isAtom || (desc = view.docView.descAt(nodePos)) && !desc.contentDOM)) {
        return false;
      }
      if (NodeSelection.isSelectable(node4)) {
        return apply(view, new NodeSelection(dir < 0 ? view.state.doc.resolve($head.pos - node4.nodeSize) : $head));
      } else if (result.webkit) {
        return apply(view, new TextSelection(view.state.doc.resolve(dir < 0 ? nodePos : nodePos + node4.nodeSize)));
      } else {
        return false;
      }
    }
  } else if (sel instanceof NodeSelection && sel.node.isInline) {
    return apply(view, new TextSelection(dir > 0 ? sel.$to : sel.$from));
  } else {
    var next$1 = moveSelectionBlock(view.state, dir);
    if (next$1) {
      return apply(view, next$1);
    }
    return false;
  }
}
function nodeLen(node4) {
  return node4.nodeType == 3 ? node4.nodeValue.length : node4.childNodes.length;
}
function isIgnorable(dom) {
  var desc = dom.pmViewDesc;
  return desc && desc.size == 0 && (dom.nextSibling || dom.nodeName != "BR");
}
function skipIgnoredNodesLeft(view) {
  var sel = view.root.getSelection();
  var node4 = sel.focusNode, offset3 = sel.focusOffset;
  if (!node4) {
    return;
  }
  var moveNode, moveOffset, force = false;
  if (result.gecko && node4.nodeType == 1 && offset3 < nodeLen(node4) && isIgnorable(node4.childNodes[offset3])) {
    force = true;
  }
  for (; ; ) {
    if (offset3 > 0) {
      if (node4.nodeType != 1) {
        break;
      } else {
        var before2 = node4.childNodes[offset3 - 1];
        if (isIgnorable(before2)) {
          moveNode = node4;
          moveOffset = --offset3;
        } else if (before2.nodeType == 3) {
          node4 = before2;
          offset3 = node4.nodeValue.length;
        } else {
          break;
        }
      }
    } else if (isBlockNode(node4)) {
      break;
    } else {
      var prev = node4.previousSibling;
      while (prev && isIgnorable(prev)) {
        moveNode = node4.parentNode;
        moveOffset = domIndex(prev);
        prev = prev.previousSibling;
      }
      if (!prev) {
        node4 = node4.parentNode;
        if (node4 == view.dom) {
          break;
        }
        offset3 = 0;
      } else {
        node4 = prev;
        offset3 = nodeLen(node4);
      }
    }
  }
  if (force) {
    setSelFocus(view, sel, node4, offset3);
  } else if (moveNode) {
    setSelFocus(view, sel, moveNode, moveOffset);
  }
}
function skipIgnoredNodesRight(view) {
  var sel = view.root.getSelection();
  var node4 = sel.focusNode, offset3 = sel.focusOffset;
  if (!node4) {
    return;
  }
  var len = nodeLen(node4);
  var moveNode, moveOffset;
  for (; ; ) {
    if (offset3 < len) {
      if (node4.nodeType != 1) {
        break;
      }
      var after2 = node4.childNodes[offset3];
      if (isIgnorable(after2)) {
        moveNode = node4;
        moveOffset = ++offset3;
      } else {
        break;
      }
    } else if (isBlockNode(node4)) {
      break;
    } else {
      var next = node4.nextSibling;
      while (next && isIgnorable(next)) {
        moveNode = next.parentNode;
        moveOffset = domIndex(next) + 1;
        next = next.nextSibling;
      }
      if (!next) {
        node4 = node4.parentNode;
        if (node4 == view.dom) {
          break;
        }
        offset3 = len = 0;
      } else {
        node4 = next;
        offset3 = 0;
        len = nodeLen(node4);
      }
    }
  }
  if (moveNode) {
    setSelFocus(view, sel, moveNode, moveOffset);
  }
}
function isBlockNode(dom) {
  var desc = dom.pmViewDesc;
  return desc && desc.node && desc.node.isBlock;
}
function setSelFocus(view, sel, node4, offset3) {
  if (selectionCollapsed(sel)) {
    var range = document.createRange();
    range.setEnd(node4, offset3);
    range.setStart(node4, offset3);
    sel.removeAllRanges();
    sel.addRange(range);
  } else if (sel.extend) {
    sel.extend(node4, offset3);
  }
  view.domObserver.setCurSelection();
  var state = view.state;
  setTimeout(function() {
    if (view.state == state) {
      selectionToDOM(view);
    }
  }, 50);
}
function selectVertically(view, dir, mods) {
  var sel = view.state.selection;
  if (sel instanceof TextSelection && !sel.empty || mods.indexOf("s") > -1) {
    return false;
  }
  if (result.mac && mods.indexOf("m") > -1) {
    return false;
  }
  var $from = sel.$from;
  var $to = sel.$to;
  if (!$from.parent.inlineContent || view.endOfTextblock(dir < 0 ? "up" : "down")) {
    var next = moveSelectionBlock(view.state, dir);
    if (next && next instanceof NodeSelection) {
      return apply(view, next);
    }
  }
  if (!$from.parent.inlineContent) {
    var side = dir < 0 ? $from : $to;
    var beyond = sel instanceof AllSelection ? Selection.near(side, dir) : Selection.findFrom(side, dir);
    return beyond ? apply(view, beyond) : false;
  }
  return false;
}
function stopNativeHorizontalDelete(view, dir) {
  if (!(view.state.selection instanceof TextSelection)) {
    return true;
  }
  var ref2 = view.state.selection;
  var $head = ref2.$head;
  var $anchor = ref2.$anchor;
  var empty2 = ref2.empty;
  if (!$head.sameParent($anchor)) {
    return true;
  }
  if (!empty2) {
    return false;
  }
  if (view.endOfTextblock(dir > 0 ? "forward" : "backward")) {
    return true;
  }
  var nextNode = !$head.textOffset && (dir < 0 ? $head.nodeBefore : $head.nodeAfter);
  if (nextNode && !nextNode.isText) {
    var tr = view.state.tr;
    if (dir < 0) {
      tr.delete($head.pos - nextNode.nodeSize, $head.pos);
    } else {
      tr.delete($head.pos, $head.pos + nextNode.nodeSize);
    }
    view.dispatch(tr);
    return true;
  }
  return false;
}
function switchEditable(view, node4, state) {
  view.domObserver.stop();
  node4.contentEditable = state;
  view.domObserver.start();
}
function safariDownArrowBug(view) {
  if (!result.safari || view.state.selection.$head.parentOffset > 0) {
    return;
  }
  var ref2 = view.root.getSelection();
  var focusNode = ref2.focusNode;
  var focusOffset = ref2.focusOffset;
  if (focusNode && focusNode.nodeType == 1 && focusOffset == 0 && focusNode.firstChild && focusNode.firstChild.contentEditable == "false") {
    var child3 = focusNode.firstChild;
    switchEditable(view, child3, true);
    setTimeout(function() {
      return switchEditable(view, child3, false);
    }, 20);
  }
}
function getMods(event) {
  var result2 = "";
  if (event.ctrlKey) {
    result2 += "c";
  }
  if (event.metaKey) {
    result2 += "m";
  }
  if (event.altKey) {
    result2 += "a";
  }
  if (event.shiftKey) {
    result2 += "s";
  }
  return result2;
}
function captureKeyDown(view, event) {
  var code2 = event.keyCode, mods = getMods(event);
  if (code2 == 8 || result.mac && code2 == 72 && mods == "c") {
    return stopNativeHorizontalDelete(view, -1) || skipIgnoredNodesLeft(view);
  } else if (code2 == 46 || result.mac && code2 == 68 && mods == "c") {
    return stopNativeHorizontalDelete(view, 1) || skipIgnoredNodesRight(view);
  } else if (code2 == 13 || code2 == 27) {
    return true;
  } else if (code2 == 37) {
    return selectHorizontally(view, -1, mods) || skipIgnoredNodesLeft(view);
  } else if (code2 == 39) {
    return selectHorizontally(view, 1, mods) || skipIgnoredNodesRight(view);
  } else if (code2 == 38) {
    return selectVertically(view, -1, mods) || skipIgnoredNodesLeft(view);
  } else if (code2 == 40) {
    return safariDownArrowBug(view) || selectVertically(view, 1, mods) || skipIgnoredNodesRight(view);
  } else if (mods == (result.mac ? "m" : "c") && (code2 == 66 || code2 == 73 || code2 == 89 || code2 == 90)) {
    return true;
  }
  return false;
}
function parseBetween(view, from_, to_) {
  var ref2 = view.docView.parseRange(from_, to_);
  var parent = ref2.node;
  var fromOffset = ref2.fromOffset;
  var toOffset = ref2.toOffset;
  var from4 = ref2.from;
  var to = ref2.to;
  var domSel = view.root.getSelection(), find2 = null, anchor = domSel.anchorNode;
  if (anchor && view.dom.contains(anchor.nodeType == 1 ? anchor : anchor.parentNode)) {
    find2 = [{ node: anchor, offset: domSel.anchorOffset }];
    if (!selectionCollapsed(domSel)) {
      find2.push({ node: domSel.focusNode, offset: domSel.focusOffset });
    }
  }
  if (result.chrome && view.lastKeyCode === 8) {
    for (var off = toOffset; off > fromOffset; off--) {
      var node4 = parent.childNodes[off - 1], desc = node4.pmViewDesc;
      if (node4.nodeName == "BR" && !desc) {
        toOffset = off;
        break;
      }
      if (!desc || desc.size) {
        break;
      }
    }
  }
  var startDoc = view.state.doc;
  var parser = view.someProp("domParser") || DOMParser.fromSchema(view.state.schema);
  var $from = startDoc.resolve(from4);
  var sel = null, doc2 = parser.parse(parent, {
    topNode: $from.parent,
    topMatch: $from.parent.contentMatchAt($from.index()),
    topOpen: true,
    from: fromOffset,
    to: toOffset,
    preserveWhitespace: $from.parent.type.whitespace == "pre" ? "full" : true,
    editableContent: true,
    findPositions: find2,
    ruleFromNode,
    context: $from
  });
  if (find2 && find2[0].pos != null) {
    var anchor$1 = find2[0].pos, head = find2[1] && find2[1].pos;
    if (head == null) {
      head = anchor$1;
    }
    sel = { anchor: anchor$1 + from4, head: head + from4 };
  }
  return { doc: doc2, sel, from: from4, to };
}
function ruleFromNode(dom) {
  var desc = dom.pmViewDesc;
  if (desc) {
    return desc.parseRule();
  } else if (dom.nodeName == "BR" && dom.parentNode) {
    if (result.safari && /^(ul|ol)$/i.test(dom.parentNode.nodeName)) {
      var skip = document.createElement("div");
      skip.appendChild(document.createElement("li"));
      return { skip };
    } else if (dom.parentNode.lastChild == dom || result.safari && /^(tr|table)$/i.test(dom.parentNode.nodeName)) {
      return { ignore: true };
    }
  } else if (dom.nodeName == "IMG" && dom.getAttribute("mark-placeholder")) {
    return { ignore: true };
  }
}
function readDOMChange(view, from4, to, typeOver, addedNodes) {
  if (from4 < 0) {
    var origin = view.lastSelectionTime > Date.now() - 50 ? view.lastSelectionOrigin : null;
    var newSel = selectionFromDOM(view, origin);
    if (newSel && !view.state.selection.eq(newSel)) {
      var tr$1 = view.state.tr.setSelection(newSel);
      if (origin == "pointer") {
        tr$1.setMeta("pointer", true);
      } else if (origin == "key") {
        tr$1.scrollIntoView();
      }
      view.dispatch(tr$1);
    }
    return;
  }
  var $before = view.state.doc.resolve(from4);
  var shared = $before.sharedDepth(to);
  from4 = $before.before(shared + 1);
  to = view.state.doc.resolve(to).after(shared + 1);
  var sel = view.state.selection;
  var parse3 = parseBetween(view, from4, to);
  if (result.chrome && view.cursorWrapper && parse3.sel && parse3.sel.anchor == view.cursorWrapper.deco.from) {
    var text2 = view.cursorWrapper.deco.type.toDOM.nextSibling;
    var size2 = text2 && text2.nodeValue ? text2.nodeValue.length : 1;
    parse3.sel = { anchor: parse3.sel.anchor + size2, head: parse3.sel.anchor + size2 };
  }
  var doc2 = view.state.doc, compare = doc2.slice(parse3.from, parse3.to);
  var preferredPos, preferredSide;
  if (view.lastKeyCode === 8 && Date.now() - 100 < view.lastKeyCodeTime) {
    preferredPos = view.state.selection.to;
    preferredSide = "end";
  } else {
    preferredPos = view.state.selection.from;
    preferredSide = "start";
  }
  view.lastKeyCode = null;
  var change = findDiff(compare.content, parse3.doc.content, parse3.from, preferredPos, preferredSide);
  if ((result.ios && view.lastIOSEnter > Date.now() - 225 || result.android) && addedNodes.some(function(n) {
    return n.nodeName == "DIV" || n.nodeName == "P";
  }) && (!change || change.endA >= change.endB) && view.someProp("handleKeyDown", function(f) {
    return f(view, keyEvent(13, "Enter"));
  })) {
    view.lastIOSEnter = 0;
    return;
  }
  if (!change) {
    if (typeOver && sel instanceof TextSelection && !sel.empty && sel.$head.sameParent(sel.$anchor) && !view.composing && !(parse3.sel && parse3.sel.anchor != parse3.sel.head)) {
      change = { start: sel.from, endA: sel.to, endB: sel.to };
    } else {
      if (parse3.sel) {
        var sel$1 = resolveSelection(view, view.state.doc, parse3.sel);
        if (sel$1 && !sel$1.eq(view.state.selection)) {
          view.dispatch(view.state.tr.setSelection(sel$1));
        }
      }
      return;
    }
  }
  view.domChangeCount++;
  if (view.state.selection.from < view.state.selection.to && change.start == change.endB && view.state.selection instanceof TextSelection) {
    if (change.start > view.state.selection.from && change.start <= view.state.selection.from + 2 && view.state.selection.from >= parse3.from) {
      change.start = view.state.selection.from;
    } else if (change.endA < view.state.selection.to && change.endA >= view.state.selection.to - 2 && view.state.selection.to <= parse3.to) {
      change.endB += view.state.selection.to - change.endA;
      change.endA = view.state.selection.to;
    }
  }
  if (result.ie && result.ie_version <= 11 && change.endB == change.start + 1 && change.endA == change.start && change.start > parse3.from && parse3.doc.textBetween(change.start - parse3.from - 1, change.start - parse3.from + 1) == " \xA0") {
    change.start--;
    change.endA--;
    change.endB--;
  }
  var $from = parse3.doc.resolveNoCache(change.start - parse3.from);
  var $to = parse3.doc.resolveNoCache(change.endB - parse3.from);
  var inlineChange = $from.sameParent($to) && $from.parent.inlineContent;
  var nextSel;
  if ((result.ios && view.lastIOSEnter > Date.now() - 225 && (!inlineChange || addedNodes.some(function(n) {
    return n.nodeName == "DIV" || n.nodeName == "P";
  })) || !inlineChange && $from.pos < parse3.doc.content.size && (nextSel = Selection.findFrom(parse3.doc.resolve($from.pos + 1), 1, true)) && nextSel.head == $to.pos) && view.someProp("handleKeyDown", function(f) {
    return f(view, keyEvent(13, "Enter"));
  })) {
    view.lastIOSEnter = 0;
    return;
  }
  if (view.state.selection.anchor > change.start && looksLikeJoin(doc2, change.start, change.endA, $from, $to) && view.someProp("handleKeyDown", function(f) {
    return f(view, keyEvent(8, "Backspace"));
  })) {
    if (result.android && result.chrome) {
      view.domObserver.suppressSelectionUpdates();
    }
    return;
  }
  if (result.chrome && result.android && change.toB == change.from) {
    view.lastAndroidDelete = Date.now();
  }
  if (result.android && !inlineChange && $from.start() != $to.start() && $to.parentOffset == 0 && $from.depth == $to.depth && parse3.sel && parse3.sel.anchor == parse3.sel.head && parse3.sel.head == change.endA) {
    change.endB -= 2;
    $to = parse3.doc.resolveNoCache(change.endB - parse3.from);
    setTimeout(function() {
      view.someProp("handleKeyDown", function(f) {
        return f(view, keyEvent(13, "Enter"));
      });
    }, 20);
  }
  var chFrom = change.start, chTo = change.endA;
  var tr, storedMarks, markChange, $from1;
  if (inlineChange) {
    if ($from.pos == $to.pos) {
      if (result.ie && result.ie_version <= 11 && $from.parentOffset == 0) {
        view.domObserver.suppressSelectionUpdates();
        setTimeout(function() {
          return selectionToDOM(view);
        }, 20);
      }
      tr = view.state.tr.delete(chFrom, chTo);
      storedMarks = doc2.resolve(change.start).marksAcross(doc2.resolve(change.endA));
    } else if (change.endA == change.endB && ($from1 = doc2.resolve(change.start)) && (markChange = isMarkChange($from.parent.content.cut($from.parentOffset, $to.parentOffset), $from1.parent.content.cut($from1.parentOffset, change.endA - $from1.start())))) {
      tr = view.state.tr;
      if (markChange.type == "add") {
        tr.addMark(chFrom, chTo, markChange.mark);
      } else {
        tr.removeMark(chFrom, chTo, markChange.mark);
      }
    } else if ($from.parent.child($from.index()).isText && $from.index() == $to.index() - ($to.textOffset ? 0 : 1)) {
      var text$1 = $from.parent.textBetween($from.parentOffset, $to.parentOffset);
      if (view.someProp("handleTextInput", function(f) {
        return f(view, chFrom, chTo, text$1);
      })) {
        return;
      }
      tr = view.state.tr.insertText(text$1, chFrom, chTo);
    }
  }
  if (!tr) {
    tr = view.state.tr.replace(chFrom, chTo, parse3.doc.slice(change.start - parse3.from, change.endB - parse3.from));
  }
  if (parse3.sel) {
    var sel$2 = resolveSelection(view, tr.doc, parse3.sel);
    if (sel$2 && !(result.chrome && result.android && view.composing && sel$2.empty && (change.start != change.endB || view.lastAndroidDelete < Date.now() - 100) && (sel$2.head == chFrom || sel$2.head == tr.mapping.map(chTo) - 1) || result.ie && sel$2.empty && sel$2.head == chFrom)) {
      tr.setSelection(sel$2);
    }
  }
  if (storedMarks) {
    tr.ensureMarks(storedMarks);
  }
  view.dispatch(tr.scrollIntoView());
}
function resolveSelection(view, doc2, parsedSel) {
  if (Math.max(parsedSel.anchor, parsedSel.head) > doc2.content.size) {
    return null;
  }
  return selectionBetween(view, doc2.resolve(parsedSel.anchor), doc2.resolve(parsedSel.head));
}
function isMarkChange(cur, prev) {
  var curMarks = cur.firstChild.marks, prevMarks = prev.firstChild.marks;
  var added = curMarks, removed = prevMarks, type, mark3, update4;
  for (var i2 = 0; i2 < prevMarks.length; i2++) {
    added = prevMarks[i2].removeFromSet(added);
  }
  for (var i$1 = 0; i$1 < curMarks.length; i$1++) {
    removed = curMarks[i$1].removeFromSet(removed);
  }
  if (added.length == 1 && removed.length == 0) {
    mark3 = added[0];
    type = "add";
    update4 = function(node4) {
      return node4.mark(mark3.addToSet(node4.marks));
    };
  } else if (added.length == 0 && removed.length == 1) {
    mark3 = removed[0];
    type = "remove";
    update4 = function(node4) {
      return node4.mark(mark3.removeFromSet(node4.marks));
    };
  } else {
    return null;
  }
  var updated = [];
  for (var i$2 = 0; i$2 < prev.childCount; i$2++) {
    updated.push(update4(prev.child(i$2)));
  }
  if (Fragment.from(updated).eq(cur)) {
    return { mark: mark3, type };
  }
}
function looksLikeJoin(old, start4, end3, $newStart, $newEnd) {
  if (!$newStart.parent.isTextblock || end3 - start4 <= $newEnd.pos - $newStart.pos || skipClosingAndOpening($newStart, true, false) < $newEnd.pos) {
    return false;
  }
  var $start = old.resolve(start4);
  if ($start.parentOffset < $start.parent.content.size || !$start.parent.isTextblock) {
    return false;
  }
  var $next = old.resolve(skipClosingAndOpening($start, true, true));
  if (!$next.parent.isTextblock || $next.pos > end3 || skipClosingAndOpening($next, true, false) < end3) {
    return false;
  }
  return $newStart.parent.content.cut($newStart.parentOffset).eq($next.parent.content);
}
function skipClosingAndOpening($pos, fromEnd, mayOpen) {
  var depth = $pos.depth, end3 = fromEnd ? $pos.end() : $pos.pos;
  while (depth > 0 && (fromEnd || $pos.indexAfter(depth) == $pos.node(depth).childCount)) {
    depth--;
    end3++;
    fromEnd = false;
  }
  if (mayOpen) {
    var next = $pos.node(depth).maybeChild($pos.indexAfter(depth));
    while (next && !next.isLeaf) {
      next = next.firstChild;
      end3++;
    }
  }
  return end3;
}
function findDiff(a2, b, pos, preferredPos, preferredSide) {
  var start4 = a2.findDiffStart(b, pos);
  if (start4 == null) {
    return null;
  }
  var ref2 = a2.findDiffEnd(b, pos + a2.size, pos + b.size);
  var endA = ref2.a;
  var endB = ref2.b;
  if (preferredSide == "end") {
    var adjust = Math.max(0, start4 - Math.min(endA, endB));
    preferredPos -= endA + adjust - start4;
  }
  if (endA < start4 && a2.size < b.size) {
    var move2 = preferredPos <= start4 && preferredPos >= endA ? start4 - preferredPos : 0;
    start4 -= move2;
    endB = start4 + (endB - endA);
    endA = start4;
  } else if (endB < start4) {
    var move$1 = preferredPos <= start4 && preferredPos >= endB ? start4 - preferredPos : 0;
    start4 -= move$1;
    endA = start4 + (endA - endB);
    endB = start4;
  }
  return { start: start4, endA, endB };
}
function serializeForClipboard(view, slice4) {
  var context = [];
  var content2 = slice4.content;
  var openStart = slice4.openStart;
  var openEnd = slice4.openEnd;
  while (openStart > 1 && openEnd > 1 && content2.childCount == 1 && content2.firstChild.childCount == 1) {
    openStart--;
    openEnd--;
    var node4 = content2.firstChild;
    context.push(node4.type.name, node4.attrs != node4.type.defaultAttrs ? node4.attrs : null);
    content2 = node4.content;
  }
  var serializer = view.someProp("clipboardSerializer") || DOMSerializer.fromSchema(view.state.schema);
  var doc2 = detachedDoc(), wrap = doc2.createElement("div");
  wrap.appendChild(serializer.serializeFragment(content2, { document: doc2 }));
  var firstChild = wrap.firstChild, needsWrap;
  while (firstChild && firstChild.nodeType == 1 && (needsWrap = wrapMap[firstChild.nodeName.toLowerCase()])) {
    for (var i2 = needsWrap.length - 1; i2 >= 0; i2--) {
      var wrapper = doc2.createElement(needsWrap[i2]);
      while (wrap.firstChild) {
        wrapper.appendChild(wrap.firstChild);
      }
      wrap.appendChild(wrapper);
      if (needsWrap[i2] != "tbody") {
        openStart++;
        openEnd++;
      }
    }
    firstChild = wrap.firstChild;
  }
  if (firstChild && firstChild.nodeType == 1) {
    firstChild.setAttribute("data-pm-slice", openStart + " " + openEnd + " " + JSON.stringify(context));
  }
  var text2 = view.someProp("clipboardTextSerializer", function(f) {
    return f(slice4);
  }) || slice4.content.textBetween(0, slice4.content.size, "\n\n");
  return { dom: wrap, text: text2 };
}
function parseFromClipboard(view, text2, html, plainText, $context) {
  var dom, inCode = $context.parent.type.spec.code, slice4;
  if (!html && !text2) {
    return null;
  }
  var asText = text2 && (plainText || inCode || !html);
  if (asText) {
    view.someProp("transformPastedText", function(f) {
      text2 = f(text2, inCode || plainText);
    });
    if (inCode) {
      return text2 ? new Slice(Fragment.from(view.state.schema.text(text2.replace(/\r\n?/g, "\n"))), 0, 0) : Slice.empty;
    }
    var parsed = view.someProp("clipboardTextParser", function(f) {
      return f(text2, $context, plainText);
    });
    if (parsed) {
      slice4 = parsed;
    } else {
      var marks2 = $context.marks();
      var ref2 = view.state;
      var schema = ref2.schema;
      var serializer = DOMSerializer.fromSchema(schema);
      dom = document.createElement("div");
      text2.split(/(?:\r\n?|\n)+/).forEach(function(block) {
        var p2 = dom.appendChild(document.createElement("p"));
        if (block) {
          p2.appendChild(serializer.serializeNode(schema.text(block, marks2)));
        }
      });
    }
  } else {
    view.someProp("transformPastedHTML", function(f) {
      html = f(html);
    });
    dom = readHTML(html);
    if (result.webkit) {
      restoreReplacedSpaces(dom);
    }
  }
  var contextNode = dom && dom.querySelector("[data-pm-slice]");
  var sliceData = contextNode && /^(\d+) (\d+) (.*)/.exec(contextNode.getAttribute("data-pm-slice"));
  if (!slice4) {
    var parser = view.someProp("clipboardParser") || view.someProp("domParser") || DOMParser.fromSchema(view.state.schema);
    slice4 = parser.parseSlice(dom, {
      preserveWhitespace: !!(asText || sliceData),
      context: $context,
      ruleFromNode: function ruleFromNode2(dom2) {
        if (dom2.nodeName == "BR" && !dom2.nextSibling && dom2.parentNode && !inlineParents.test(dom2.parentNode.nodeName)) {
          return { ignore: true };
        }
      }
    });
  }
  if (sliceData) {
    slice4 = addContext(closeSlice(slice4, +sliceData[1], +sliceData[2]), sliceData[3]);
  } else {
    slice4 = Slice.maxOpen(normalizeSiblings(slice4.content, $context), true);
    if (slice4.openStart || slice4.openEnd) {
      var openStart = 0, openEnd = 0;
      for (var node4 = slice4.content.firstChild; openStart < slice4.openStart && !node4.type.spec.isolating; openStart++, node4 = node4.firstChild) {
      }
      for (var node$1 = slice4.content.lastChild; openEnd < slice4.openEnd && !node$1.type.spec.isolating; openEnd++, node$1 = node$1.lastChild) {
      }
      slice4 = closeSlice(slice4, openStart, openEnd);
    }
  }
  view.someProp("transformPasted", function(f) {
    slice4 = f(slice4);
  });
  return slice4;
}
var inlineParents = /^(a|abbr|acronym|b|cite|code|del|em|i|ins|kbd|label|output|q|ruby|s|samp|span|strong|sub|sup|time|u|tt|var)$/i;
function normalizeSiblings(fragment, $context) {
  if (fragment.childCount < 2) {
    return fragment;
  }
  var loop = function(d2) {
    var parent = $context.node(d2);
    var match = parent.contentMatchAt($context.index(d2));
    var lastWrap = void 0, result2 = [];
    fragment.forEach(function(node4) {
      if (!result2) {
        return;
      }
      var wrap = match.findWrapping(node4.type), inLast;
      if (!wrap) {
        return result2 = null;
      }
      if (inLast = result2.length && lastWrap.length && addToSibling(wrap, lastWrap, node4, result2[result2.length - 1], 0)) {
        result2[result2.length - 1] = inLast;
      } else {
        if (result2.length) {
          result2[result2.length - 1] = closeRight(result2[result2.length - 1], lastWrap.length);
        }
        var wrapped = withWrappers(node4, wrap);
        result2.push(wrapped);
        match = match.matchType(wrapped.type, wrapped.attrs);
        lastWrap = wrap;
      }
    });
    if (result2) {
      return { v: Fragment.from(result2) };
    }
  };
  for (var d = $context.depth; d >= 0; d--) {
    var returned = loop(d);
    if (returned)
      return returned.v;
  }
  return fragment;
}
function withWrappers(node4, wrap, from4) {
  if (from4 === void 0)
    from4 = 0;
  for (var i2 = wrap.length - 1; i2 >= from4; i2--) {
    node4 = wrap[i2].create(null, Fragment.from(node4));
  }
  return node4;
}
function addToSibling(wrap, lastWrap, node4, sibling, depth) {
  if (depth < wrap.length && depth < lastWrap.length && wrap[depth] == lastWrap[depth]) {
    var inner = addToSibling(wrap, lastWrap, node4, sibling.lastChild, depth + 1);
    if (inner) {
      return sibling.copy(sibling.content.replaceChild(sibling.childCount - 1, inner));
    }
    var match = sibling.contentMatchAt(sibling.childCount);
    if (match.matchType(depth == wrap.length - 1 ? node4.type : wrap[depth + 1])) {
      return sibling.copy(sibling.content.append(Fragment.from(withWrappers(node4, wrap, depth + 1))));
    }
  }
}
function closeRight(node4, depth) {
  if (depth == 0) {
    return node4;
  }
  var fragment = node4.content.replaceChild(node4.childCount - 1, closeRight(node4.lastChild, depth - 1));
  var fill = node4.contentMatchAt(node4.childCount).fillBefore(Fragment.empty, true);
  return node4.copy(fragment.append(fill));
}
function closeRange(fragment, side, from4, to, depth, openEnd) {
  var node4 = side < 0 ? fragment.firstChild : fragment.lastChild, inner = node4.content;
  if (depth < to - 1) {
    inner = closeRange(inner, side, from4, to, depth + 1, openEnd);
  }
  if (depth >= from4) {
    inner = side < 0 ? node4.contentMatchAt(0).fillBefore(inner, fragment.childCount > 1 || openEnd <= depth).append(inner) : inner.append(node4.contentMatchAt(node4.childCount).fillBefore(Fragment.empty, true));
  }
  return fragment.replaceChild(side < 0 ? 0 : fragment.childCount - 1, node4.copy(inner));
}
function closeSlice(slice4, openStart, openEnd) {
  if (openStart < slice4.openStart) {
    slice4 = new Slice(closeRange(slice4.content, -1, openStart, slice4.openStart, 0, slice4.openEnd), openStart, slice4.openEnd);
  }
  if (openEnd < slice4.openEnd) {
    slice4 = new Slice(closeRange(slice4.content, 1, openEnd, slice4.openEnd, 0, 0), slice4.openStart, openEnd);
  }
  return slice4;
}
var wrapMap = {
  thead: ["table"],
  tbody: ["table"],
  tfoot: ["table"],
  caption: ["table"],
  colgroup: ["table"],
  col: ["table", "colgroup"],
  tr: ["table", "tbody"],
  td: ["table", "tbody", "tr"],
  th: ["table", "tbody", "tr"]
};
var _detachedDoc = null;
function detachedDoc() {
  return _detachedDoc || (_detachedDoc = document.implementation.createHTMLDocument("title"));
}
function readHTML(html) {
  var metas = /^(\s*<meta [^>]*>)*/.exec(html);
  if (metas) {
    html = html.slice(metas[0].length);
  }
  var elt = detachedDoc().createElement("div");
  var firstTag = /<([a-z][^>\s]+)/i.exec(html), wrap;
  if (wrap = firstTag && wrapMap[firstTag[1].toLowerCase()]) {
    html = wrap.map(function(n) {
      return "<" + n + ">";
    }).join("") + html + wrap.map(function(n) {
      return "</" + n + ">";
    }).reverse().join("");
  }
  elt.innerHTML = html;
  if (wrap) {
    for (var i2 = 0; i2 < wrap.length; i2++) {
      elt = elt.querySelector(wrap[i2]) || elt;
    }
  }
  return elt;
}
function restoreReplacedSpaces(dom) {
  var nodes = dom.querySelectorAll(result.chrome ? "span:not([class]):not([style])" : "span.Apple-converted-space");
  for (var i2 = 0; i2 < nodes.length; i2++) {
    var node4 = nodes[i2];
    if (node4.childNodes.length == 1 && node4.textContent == "\xA0" && node4.parentNode) {
      node4.parentNode.replaceChild(dom.ownerDocument.createTextNode(" "), node4);
    }
  }
}
function addContext(slice4, context) {
  if (!slice4.size) {
    return slice4;
  }
  var schema = slice4.content.firstChild.type.schema, array;
  try {
    array = JSON.parse(context);
  } catch (e) {
    return slice4;
  }
  var content2 = slice4.content;
  var openStart = slice4.openStart;
  var openEnd = slice4.openEnd;
  for (var i2 = array.length - 2; i2 >= 0; i2 -= 2) {
    var type = schema.nodes[array[i2]];
    if (!type || type.hasRequiredAttrs()) {
      break;
    }
    content2 = Fragment.from(type.create(array[i2 + 1], content2));
    openStart++;
    openEnd++;
  }
  return new Slice(content2, openStart, openEnd);
}
var observeOptions = {
  childList: true,
  characterData: true,
  characterDataOldValue: true,
  attributes: true,
  attributeOldValue: true,
  subtree: true
};
var useCharData = result.ie && result.ie_version <= 11;
var SelectionState = function SelectionState2() {
  this.anchorNode = this.anchorOffset = this.focusNode = this.focusOffset = null;
};
SelectionState.prototype.set = function set2(sel) {
  this.anchorNode = sel.anchorNode;
  this.anchorOffset = sel.anchorOffset;
  this.focusNode = sel.focusNode;
  this.focusOffset = sel.focusOffset;
};
SelectionState.prototype.eq = function eq5(sel) {
  return sel.anchorNode == this.anchorNode && sel.anchorOffset == this.anchorOffset && sel.focusNode == this.focusNode && sel.focusOffset == this.focusOffset;
};
var DOMObserver = function DOMObserver2(view, handleDOMChange) {
  var this$1$1 = this;
  this.view = view;
  this.handleDOMChange = handleDOMChange;
  this.queue = [];
  this.flushingSoon = -1;
  this.observer = window.MutationObserver && new window.MutationObserver(function(mutations) {
    for (var i2 = 0; i2 < mutations.length; i2++) {
      this$1$1.queue.push(mutations[i2]);
    }
    if (result.ie && result.ie_version <= 11 && mutations.some(function(m) {
      return m.type == "childList" && m.removedNodes.length || m.type == "characterData" && m.oldValue.length > m.target.nodeValue.length;
    })) {
      this$1$1.flushSoon();
    } else {
      this$1$1.flush();
    }
  });
  this.currentSelection = new SelectionState();
  if (useCharData) {
    this.onCharData = function(e) {
      this$1$1.queue.push({ target: e.target, type: "characterData", oldValue: e.prevValue });
      this$1$1.flushSoon();
    };
  }
  this.onSelectionChange = this.onSelectionChange.bind(this);
  this.suppressingSelectionUpdates = false;
};
DOMObserver.prototype.flushSoon = function flushSoon() {
  var this$1$1 = this;
  if (this.flushingSoon < 0) {
    this.flushingSoon = window.setTimeout(function() {
      this$1$1.flushingSoon = -1;
      this$1$1.flush();
    }, 20);
  }
};
DOMObserver.prototype.forceFlush = function forceFlush() {
  if (this.flushingSoon > -1) {
    window.clearTimeout(this.flushingSoon);
    this.flushingSoon = -1;
    this.flush();
  }
};
DOMObserver.prototype.start = function start3() {
  if (this.observer) {
    this.observer.observe(this.view.dom, observeOptions);
  }
  if (useCharData) {
    this.view.dom.addEventListener("DOMCharacterDataModified", this.onCharData);
  }
  this.connectSelection();
};
DOMObserver.prototype.stop = function stop() {
  var this$1$1 = this;
  if (this.observer) {
    var take = this.observer.takeRecords();
    if (take.length) {
      for (var i2 = 0; i2 < take.length; i2++) {
        this.queue.push(take[i2]);
      }
      window.setTimeout(function() {
        return this$1$1.flush();
      }, 20);
    }
    this.observer.disconnect();
  }
  if (useCharData) {
    this.view.dom.removeEventListener("DOMCharacterDataModified", this.onCharData);
  }
  this.disconnectSelection();
};
DOMObserver.prototype.connectSelection = function connectSelection() {
  this.view.dom.ownerDocument.addEventListener("selectionchange", this.onSelectionChange);
};
DOMObserver.prototype.disconnectSelection = function disconnectSelection() {
  this.view.dom.ownerDocument.removeEventListener("selectionchange", this.onSelectionChange);
};
DOMObserver.prototype.suppressSelectionUpdates = function suppressSelectionUpdates() {
  var this$1$1 = this;
  this.suppressingSelectionUpdates = true;
  setTimeout(function() {
    return this$1$1.suppressingSelectionUpdates = false;
  }, 50);
};
DOMObserver.prototype.onSelectionChange = function onSelectionChange() {
  if (!hasFocusAndSelection(this.view)) {
    return;
  }
  if (this.suppressingSelectionUpdates) {
    return selectionToDOM(this.view);
  }
  if (result.ie && result.ie_version <= 11 && !this.view.state.selection.empty) {
    var sel = this.view.root.getSelection();
    if (sel.focusNode && isEquivalentPosition(sel.focusNode, sel.focusOffset, sel.anchorNode, sel.anchorOffset)) {
      return this.flushSoon();
    }
  }
  this.flush();
};
DOMObserver.prototype.setCurSelection = function setCurSelection() {
  this.currentSelection.set(this.view.root.getSelection());
};
DOMObserver.prototype.ignoreSelectionChange = function ignoreSelectionChange(sel) {
  if (sel.rangeCount == 0) {
    return true;
  }
  var container = sel.getRangeAt(0).commonAncestorContainer;
  var desc = this.view.docView.nearestDesc(container);
  if (desc && desc.ignoreMutation({ type: "selection", target: container.nodeType == 3 ? container.parentNode : container })) {
    this.setCurSelection();
    return true;
  }
};
DOMObserver.prototype.flush = function flush() {
  if (!this.view.docView || this.flushingSoon > -1) {
    return;
  }
  var mutations = this.observer ? this.observer.takeRecords() : [];
  if (this.queue.length) {
    mutations = this.queue.concat(mutations);
    this.queue.length = 0;
  }
  var sel = this.view.root.getSelection();
  var newSel = !this.suppressingSelectionUpdates && !this.currentSelection.eq(sel) && hasFocusAndSelection(this.view) && !this.ignoreSelectionChange(sel);
  var from4 = -1, to = -1, typeOver = false, added = [];
  if (this.view.editable) {
    for (var i2 = 0; i2 < mutations.length; i2++) {
      var result$1 = this.registerMutation(mutations[i2], added);
      if (result$1) {
        from4 = from4 < 0 ? result$1.from : Math.min(result$1.from, from4);
        to = to < 0 ? result$1.to : Math.max(result$1.to, to);
        if (result$1.typeOver) {
          typeOver = true;
        }
      }
    }
  }
  if (result.gecko && added.length > 1) {
    var brs = added.filter(function(n) {
      return n.nodeName == "BR";
    });
    if (brs.length == 2) {
      var a2 = brs[0];
      var b = brs[1];
      if (a2.parentNode && a2.parentNode.parentNode == b.parentNode) {
        b.remove();
      } else {
        a2.remove();
      }
    }
  }
  if (from4 > -1 || newSel) {
    if (from4 > -1) {
      this.view.docView.markDirty(from4, to);
      checkCSS(this.view);
    }
    this.handleDOMChange(from4, to, typeOver, added);
    if (this.view.docView && this.view.docView.dirty) {
      this.view.updateState(this.view.state);
    } else if (!this.currentSelection.eq(sel)) {
      selectionToDOM(this.view);
    }
    this.currentSelection.set(sel);
  }
};
DOMObserver.prototype.registerMutation = function registerMutation(mut, added) {
  if (added.indexOf(mut.target) > -1) {
    return null;
  }
  var desc = this.view.docView.nearestDesc(mut.target);
  if (mut.type == "attributes" && (desc == this.view.docView || mut.attributeName == "contenteditable" || mut.attributeName == "style" && !mut.oldValue && !mut.target.getAttribute("style"))) {
    return null;
  }
  if (!desc || desc.ignoreMutation(mut)) {
    return null;
  }
  if (mut.type == "childList") {
    for (var i2 = 0; i2 < mut.addedNodes.length; i2++) {
      added.push(mut.addedNodes[i2]);
    }
    if (desc.contentDOM && desc.contentDOM != desc.dom && !desc.contentDOM.contains(mut.target)) {
      return { from: desc.posBefore, to: desc.posAfter };
    }
    var prev = mut.previousSibling, next = mut.nextSibling;
    if (result.ie && result.ie_version <= 11 && mut.addedNodes.length) {
      for (var i$1 = 0; i$1 < mut.addedNodes.length; i$1++) {
        var ref2 = mut.addedNodes[i$1];
        var previousSibling = ref2.previousSibling;
        var nextSibling = ref2.nextSibling;
        if (!previousSibling || Array.prototype.indexOf.call(mut.addedNodes, previousSibling) < 0) {
          prev = previousSibling;
        }
        if (!nextSibling || Array.prototype.indexOf.call(mut.addedNodes, nextSibling) < 0) {
          next = nextSibling;
        }
      }
    }
    var fromOffset = prev && prev.parentNode == mut.target ? domIndex(prev) + 1 : 0;
    var from4 = desc.localPosFromDOM(mut.target, fromOffset, -1);
    var toOffset = next && next.parentNode == mut.target ? domIndex(next) : mut.target.childNodes.length;
    var to = desc.localPosFromDOM(mut.target, toOffset, 1);
    return { from: from4, to };
  } else if (mut.type == "attributes") {
    return { from: desc.posAtStart - desc.border, to: desc.posAtEnd + desc.border };
  } else {
    return {
      from: desc.posAtStart,
      to: desc.posAtEnd,
      typeOver: mut.target.nodeValue == mut.oldValue
    };
  }
};
var cssChecked = false;
function checkCSS(view) {
  if (cssChecked) {
    return;
  }
  cssChecked = true;
  if (getComputedStyle(view.dom).whiteSpace == "normal") {
    console["warn"]("ProseMirror expects the CSS white-space property to be set, preferably to 'pre-wrap'. It is recommended to load style/prosemirror.css from the prosemirror-view package.");
  }
}
var handlers = {}, editHandlers = {};
function initInput(view) {
  view.shiftKey = false;
  view.mouseDown = null;
  view.lastKeyCode = null;
  view.lastKeyCodeTime = 0;
  view.lastClick = { time: 0, x: 0, y: 0, type: "" };
  view.lastSelectionOrigin = null;
  view.lastSelectionTime = 0;
  view.lastIOSEnter = 0;
  view.lastIOSEnterFallbackTimeout = null;
  view.lastAndroidDelete = 0;
  view.composing = false;
  view.composingTimeout = null;
  view.compositionNodes = [];
  view.compositionEndedAt = -2e8;
  view.domObserver = new DOMObserver(view, function(from4, to, typeOver, added) {
    return readDOMChange(view, from4, to, typeOver, added);
  });
  view.domObserver.start();
  view.domChangeCount = 0;
  view.eventHandlers = /* @__PURE__ */ Object.create(null);
  var loop = function(event2) {
    var handler = handlers[event2];
    view.dom.addEventListener(event2, view.eventHandlers[event2] = function(event3) {
      if (eventBelongsToView(view, event3) && !runCustomHandler(view, event3) && (view.editable || !(event3.type in editHandlers))) {
        handler(view, event3);
      }
    });
  };
  for (var event in handlers)
    loop(event);
  if (result.safari) {
    view.dom.addEventListener("input", function() {
      return null;
    });
  }
  ensureListeners(view);
}
function setSelectionOrigin(view, origin) {
  view.lastSelectionOrigin = origin;
  view.lastSelectionTime = Date.now();
}
function destroyInput(view) {
  view.domObserver.stop();
  for (var type in view.eventHandlers) {
    view.dom.removeEventListener(type, view.eventHandlers[type]);
  }
  clearTimeout(view.composingTimeout);
  clearTimeout(view.lastIOSEnterFallbackTimeout);
}
function ensureListeners(view) {
  view.someProp("handleDOMEvents", function(currentHandlers) {
    for (var type in currentHandlers) {
      if (!view.eventHandlers[type]) {
        view.dom.addEventListener(type, view.eventHandlers[type] = function(event) {
          return runCustomHandler(view, event);
        });
      }
    }
  });
}
function runCustomHandler(view, event) {
  return view.someProp("handleDOMEvents", function(handlers2) {
    var handler = handlers2[event.type];
    return handler ? handler(view, event) || event.defaultPrevented : false;
  });
}
function eventBelongsToView(view, event) {
  if (!event.bubbles) {
    return true;
  }
  if (event.defaultPrevented) {
    return false;
  }
  for (var node4 = event.target; node4 != view.dom; node4 = node4.parentNode) {
    if (!node4 || node4.nodeType == 11 || node4.pmViewDesc && node4.pmViewDesc.stopEvent(event)) {
      return false;
    }
  }
  return true;
}
function dispatchEvent(view, event) {
  if (!runCustomHandler(view, event) && handlers[event.type] && (view.editable || !(event.type in editHandlers))) {
    handlers[event.type](view, event);
  }
}
editHandlers.keydown = function(view, event) {
  view.shiftKey = event.keyCode == 16 || event.shiftKey;
  if (inOrNearComposition(view, event)) {
    return;
  }
  view.lastKeyCode = event.keyCode;
  view.lastKeyCodeTime = Date.now();
  if (result.android && result.chrome && event.keyCode == 13) {
    return;
  }
  if (event.keyCode != 229) {
    view.domObserver.forceFlush();
  }
  if (result.ios && event.keyCode == 13 && !event.ctrlKey && !event.altKey && !event.metaKey) {
    var now = Date.now();
    view.lastIOSEnter = now;
    view.lastIOSEnterFallbackTimeout = setTimeout(function() {
      if (view.lastIOSEnter == now) {
        view.someProp("handleKeyDown", function(f) {
          return f(view, keyEvent(13, "Enter"));
        });
        view.lastIOSEnter = 0;
      }
    }, 200);
  } else if (view.someProp("handleKeyDown", function(f) {
    return f(view, event);
  }) || captureKeyDown(view, event)) {
    event.preventDefault();
  } else {
    setSelectionOrigin(view, "key");
  }
};
editHandlers.keyup = function(view, e) {
  if (e.keyCode == 16) {
    view.shiftKey = false;
  }
};
editHandlers.keypress = function(view, event) {
  if (inOrNearComposition(view, event) || !event.charCode || event.ctrlKey && !event.altKey || result.mac && event.metaKey) {
    return;
  }
  if (view.someProp("handleKeyPress", function(f) {
    return f(view, event);
  })) {
    event.preventDefault();
    return;
  }
  var sel = view.state.selection;
  if (!(sel instanceof TextSelection) || !sel.$from.sameParent(sel.$to)) {
    var text2 = String.fromCharCode(event.charCode);
    if (!view.someProp("handleTextInput", function(f) {
      return f(view, sel.$from.pos, sel.$to.pos, text2);
    })) {
      view.dispatch(view.state.tr.insertText(text2).scrollIntoView());
    }
    event.preventDefault();
  }
};
function eventCoords(event) {
  return { left: event.clientX, top: event.clientY };
}
function isNear(event, click) {
  var dx = click.x - event.clientX, dy = click.y - event.clientY;
  return dx * dx + dy * dy < 100;
}
function runHandlerOnContext(view, propName, pos, inside, event) {
  if (inside == -1) {
    return false;
  }
  var $pos = view.state.doc.resolve(inside);
  var loop = function(i3) {
    if (view.someProp(propName, function(f) {
      return i3 > $pos.depth ? f(view, pos, $pos.nodeAfter, $pos.before(i3), event, true) : f(view, pos, $pos.node(i3), $pos.before(i3), event, false);
    })) {
      return { v: true };
    }
  };
  for (var i2 = $pos.depth + 1; i2 > 0; i2--) {
    var returned = loop(i2);
    if (returned)
      return returned.v;
  }
  return false;
}
function updateSelection(view, selection, origin) {
  if (!view.focused) {
    view.focus();
  }
  var tr = view.state.tr.setSelection(selection);
  if (origin == "pointer") {
    tr.setMeta("pointer", true);
  }
  view.dispatch(tr);
}
function selectClickedLeaf(view, inside) {
  if (inside == -1) {
    return false;
  }
  var $pos = view.state.doc.resolve(inside), node4 = $pos.nodeAfter;
  if (node4 && node4.isAtom && NodeSelection.isSelectable(node4)) {
    updateSelection(view, new NodeSelection($pos), "pointer");
    return true;
  }
  return false;
}
function selectClickedNode(view, inside) {
  if (inside == -1) {
    return false;
  }
  var sel = view.state.selection, selectedNode, selectAt;
  if (sel instanceof NodeSelection) {
    selectedNode = sel.node;
  }
  var $pos = view.state.doc.resolve(inside);
  for (var i2 = $pos.depth + 1; i2 > 0; i2--) {
    var node4 = i2 > $pos.depth ? $pos.nodeAfter : $pos.node(i2);
    if (NodeSelection.isSelectable(node4)) {
      if (selectedNode && sel.$from.depth > 0 && i2 >= sel.$from.depth && $pos.before(sel.$from.depth + 1) == sel.$from.pos) {
        selectAt = $pos.before(sel.$from.depth);
      } else {
        selectAt = $pos.before(i2);
      }
      break;
    }
  }
  if (selectAt != null) {
    updateSelection(view, NodeSelection.create(view.state.doc, selectAt), "pointer");
    return true;
  } else {
    return false;
  }
}
function handleSingleClick(view, pos, inside, event, selectNode) {
  return runHandlerOnContext(view, "handleClickOn", pos, inside, event) || view.someProp("handleClick", function(f) {
    return f(view, pos, event);
  }) || (selectNode ? selectClickedNode(view, inside) : selectClickedLeaf(view, inside));
}
function handleDoubleClick(view, pos, inside, event) {
  return runHandlerOnContext(view, "handleDoubleClickOn", pos, inside, event) || view.someProp("handleDoubleClick", function(f) {
    return f(view, pos, event);
  });
}
function handleTripleClick(view, pos, inside, event) {
  return runHandlerOnContext(view, "handleTripleClickOn", pos, inside, event) || view.someProp("handleTripleClick", function(f) {
    return f(view, pos, event);
  }) || defaultTripleClick(view, inside, event);
}
function defaultTripleClick(view, inside, event) {
  if (event.button != 0) {
    return false;
  }
  var doc2 = view.state.doc;
  if (inside == -1) {
    if (doc2.inlineContent) {
      updateSelection(view, TextSelection.create(doc2, 0, doc2.content.size), "pointer");
      return true;
    }
    return false;
  }
  var $pos = doc2.resolve(inside);
  for (var i2 = $pos.depth + 1; i2 > 0; i2--) {
    var node4 = i2 > $pos.depth ? $pos.nodeAfter : $pos.node(i2);
    var nodePos = $pos.before(i2);
    if (node4.inlineContent) {
      updateSelection(view, TextSelection.create(doc2, nodePos + 1, nodePos + 1 + node4.content.size), "pointer");
    } else if (NodeSelection.isSelectable(node4)) {
      updateSelection(view, NodeSelection.create(doc2, nodePos), "pointer");
    } else {
      continue;
    }
    return true;
  }
}
function forceDOMFlush(view) {
  return endComposition(view);
}
var selectNodeModifier = result.mac ? "metaKey" : "ctrlKey";
handlers.mousedown = function(view, event) {
  view.shiftKey = event.shiftKey;
  var flushed = forceDOMFlush(view);
  var now = Date.now(), type = "singleClick";
  if (now - view.lastClick.time < 500 && isNear(event, view.lastClick) && !event[selectNodeModifier]) {
    if (view.lastClick.type == "singleClick") {
      type = "doubleClick";
    } else if (view.lastClick.type == "doubleClick") {
      type = "tripleClick";
    }
  }
  view.lastClick = { time: now, x: event.clientX, y: event.clientY, type };
  var pos = view.posAtCoords(eventCoords(event));
  if (!pos) {
    return;
  }
  if (type == "singleClick") {
    if (view.mouseDown) {
      view.mouseDown.done();
    }
    view.mouseDown = new MouseDown(view, pos, event, flushed);
  } else if ((type == "doubleClick" ? handleDoubleClick : handleTripleClick)(view, pos.pos, pos.inside, event)) {
    event.preventDefault();
  } else {
    setSelectionOrigin(view, "pointer");
  }
};
var MouseDown = function MouseDown2(view, pos, event, flushed) {
  var this$1$1 = this;
  this.view = view;
  this.startDoc = view.state.doc;
  this.pos = pos;
  this.event = event;
  this.flushed = flushed;
  this.selectNode = event[selectNodeModifier];
  this.allowDefault = event.shiftKey;
  this.delayedSelectionSync = false;
  var targetNode, targetPos;
  if (pos.inside > -1) {
    targetNode = view.state.doc.nodeAt(pos.inside);
    targetPos = pos.inside;
  } else {
    var $pos = view.state.doc.resolve(pos.pos);
    targetNode = $pos.parent;
    targetPos = $pos.depth ? $pos.before() : 0;
  }
  this.mightDrag = null;
  var target = flushed ? null : event.target;
  var targetDesc = target ? view.docView.nearestDesc(target, true) : null;
  this.target = targetDesc ? targetDesc.dom : null;
  var ref2 = view.state;
  var selection = ref2.selection;
  if (event.button == 0 && targetNode.type.spec.draggable && targetNode.type.spec.selectable !== false || selection instanceof NodeSelection && selection.from <= targetPos && selection.to > targetPos) {
    this.mightDrag = {
      node: targetNode,
      pos: targetPos,
      addAttr: this.target && !this.target.draggable,
      setUneditable: this.target && result.gecko && !this.target.hasAttribute("contentEditable")
    };
  }
  if (this.target && this.mightDrag && (this.mightDrag.addAttr || this.mightDrag.setUneditable)) {
    this.view.domObserver.stop();
    if (this.mightDrag.addAttr) {
      this.target.draggable = true;
    }
    if (this.mightDrag.setUneditable) {
      setTimeout(function() {
        if (this$1$1.view.mouseDown == this$1$1) {
          this$1$1.target.setAttribute("contentEditable", "false");
        }
      }, 20);
    }
    this.view.domObserver.start();
  }
  view.root.addEventListener("mouseup", this.up = this.up.bind(this));
  view.root.addEventListener("mousemove", this.move = this.move.bind(this));
  setSelectionOrigin(view, "pointer");
};
MouseDown.prototype.done = function done() {
  var this$1$1 = this;
  this.view.root.removeEventListener("mouseup", this.up);
  this.view.root.removeEventListener("mousemove", this.move);
  if (this.mightDrag && this.target) {
    this.view.domObserver.stop();
    if (this.mightDrag.addAttr) {
      this.target.removeAttribute("draggable");
    }
    if (this.mightDrag.setUneditable) {
      this.target.removeAttribute("contentEditable");
    }
    this.view.domObserver.start();
  }
  if (this.delayedSelectionSync) {
    setTimeout(function() {
      return selectionToDOM(this$1$1.view);
    });
  }
  this.view.mouseDown = null;
};
MouseDown.prototype.up = function up(event) {
  this.done();
  if (!this.view.dom.contains(event.target.nodeType == 3 ? event.target.parentNode : event.target)) {
    return;
  }
  var pos = this.pos;
  if (this.view.state.doc != this.startDoc) {
    pos = this.view.posAtCoords(eventCoords(event));
  }
  if (this.allowDefault || !pos) {
    setSelectionOrigin(this.view, "pointer");
  } else if (handleSingleClick(this.view, pos.pos, pos.inside, event, this.selectNode)) {
    event.preventDefault();
  } else if (event.button == 0 && (this.flushed || result.safari && this.mightDrag && !this.mightDrag.node.isAtom || result.chrome && !(this.view.state.selection instanceof TextSelection) && Math.min(Math.abs(pos.pos - this.view.state.selection.from), Math.abs(pos.pos - this.view.state.selection.to)) <= 2)) {
    updateSelection(this.view, Selection.near(this.view.state.doc.resolve(pos.pos)), "pointer");
    event.preventDefault();
  } else {
    setSelectionOrigin(this.view, "pointer");
  }
};
MouseDown.prototype.move = function move(event) {
  if (!this.allowDefault && (Math.abs(this.event.x - event.clientX) > 4 || Math.abs(this.event.y - event.clientY) > 4)) {
    this.allowDefault = true;
  }
  setSelectionOrigin(this.view, "pointer");
  if (event.buttons == 0) {
    this.done();
  }
};
handlers.touchdown = function(view) {
  forceDOMFlush(view);
  setSelectionOrigin(view, "pointer");
};
handlers.contextmenu = function(view) {
  return forceDOMFlush(view);
};
function inOrNearComposition(view, event) {
  if (view.composing) {
    return true;
  }
  if (result.safari && Math.abs(event.timeStamp - view.compositionEndedAt) < 500) {
    view.compositionEndedAt = -2e8;
    return true;
  }
  return false;
}
var timeoutComposition = result.android ? 5e3 : -1;
editHandlers.compositionstart = editHandlers.compositionupdate = function(view) {
  if (!view.composing) {
    view.domObserver.flush();
    var state = view.state;
    var $pos = state.selection.$from;
    if (state.selection.empty && (state.storedMarks || !$pos.textOffset && $pos.parentOffset && $pos.nodeBefore.marks.some(function(m) {
      return m.type.spec.inclusive === false;
    }))) {
      view.markCursor = view.state.storedMarks || $pos.marks();
      endComposition(view, true);
      view.markCursor = null;
    } else {
      endComposition(view);
      if (result.gecko && state.selection.empty && $pos.parentOffset && !$pos.textOffset && $pos.nodeBefore.marks.length) {
        var sel = view.root.getSelection();
        for (var node4 = sel.focusNode, offset3 = sel.focusOffset; node4 && node4.nodeType == 1 && offset3 != 0; ) {
          var before2 = offset3 < 0 ? node4.lastChild : node4.childNodes[offset3 - 1];
          if (!before2) {
            break;
          }
          if (before2.nodeType == 3) {
            sel.collapse(before2, before2.nodeValue.length);
            break;
          } else {
            node4 = before2;
            offset3 = -1;
          }
        }
      }
    }
    view.composing = true;
  }
  scheduleComposeEnd(view, timeoutComposition);
};
editHandlers.compositionend = function(view, event) {
  if (view.composing) {
    view.composing = false;
    view.compositionEndedAt = event.timeStamp;
    scheduleComposeEnd(view, 20);
  }
};
function scheduleComposeEnd(view, delay) {
  clearTimeout(view.composingTimeout);
  if (delay > -1) {
    view.composingTimeout = setTimeout(function() {
      return endComposition(view);
    }, delay);
  }
}
function clearComposition(view) {
  if (view.composing) {
    view.composing = false;
    view.compositionEndedAt = timestampFromCustomEvent();
  }
  while (view.compositionNodes.length > 0) {
    view.compositionNodes.pop().markParentsDirty();
  }
}
function timestampFromCustomEvent() {
  var event = document.createEvent("Event");
  event.initEvent("event", true, true);
  return event.timeStamp;
}
function endComposition(view, forceUpdate) {
  if (result.android && view.domObserver.flushingSoon >= 0) {
    return;
  }
  view.domObserver.forceFlush();
  clearComposition(view);
  if (forceUpdate || view.docView && view.docView.dirty) {
    var sel = selectionFromDOM(view);
    if (sel && !sel.eq(view.state.selection)) {
      view.dispatch(view.state.tr.setSelection(sel));
    } else {
      view.updateState(view.state);
    }
    return true;
  }
  return false;
}
function captureCopy(view, dom) {
  if (!view.dom.parentNode) {
    return;
  }
  var wrap = view.dom.parentNode.appendChild(document.createElement("div"));
  wrap.appendChild(dom);
  wrap.style.cssText = "position: fixed; left: -10000px; top: 10px";
  var sel = getSelection(), range = document.createRange();
  range.selectNodeContents(dom);
  view.dom.blur();
  sel.removeAllRanges();
  sel.addRange(range);
  setTimeout(function() {
    if (wrap.parentNode) {
      wrap.parentNode.removeChild(wrap);
    }
    view.focus();
  }, 50);
}
var brokenClipboardAPI = result.ie && result.ie_version < 15 || result.ios && result.webkit_version < 604;
handlers.copy = editHandlers.cut = function(view, e) {
  var sel = view.state.selection, cut3 = e.type == "cut";
  if (sel.empty) {
    return;
  }
  var data = brokenClipboardAPI ? null : e.clipboardData;
  var slice4 = sel.content();
  var ref2 = serializeForClipboard(view, slice4);
  var dom = ref2.dom;
  var text2 = ref2.text;
  if (data) {
    e.preventDefault();
    data.clearData();
    data.setData("text/html", dom.innerHTML);
    data.setData("text/plain", text2);
  } else {
    captureCopy(view, dom);
  }
  if (cut3) {
    view.dispatch(view.state.tr.deleteSelection().scrollIntoView().setMeta("uiEvent", "cut"));
  }
};
function sliceSingleNode(slice4) {
  return slice4.openStart == 0 && slice4.openEnd == 0 && slice4.content.childCount == 1 ? slice4.content.firstChild : null;
}
function capturePaste(view, e) {
  if (!view.dom.parentNode) {
    return;
  }
  var plainText = view.shiftKey || view.state.selection.$from.parent.type.spec.code;
  var target = view.dom.parentNode.appendChild(document.createElement(plainText ? "textarea" : "div"));
  if (!plainText) {
    target.contentEditable = "true";
  }
  target.style.cssText = "position: fixed; left: -10000px; top: 10px";
  target.focus();
  setTimeout(function() {
    view.focus();
    if (target.parentNode) {
      target.parentNode.removeChild(target);
    }
    if (plainText) {
      doPaste(view, target.value, null, e);
    } else {
      doPaste(view, target.textContent, target.innerHTML, e);
    }
  }, 50);
}
function doPaste(view, text2, html, e) {
  var slice4 = parseFromClipboard(view, text2, html, view.shiftKey, view.state.selection.$from);
  if (view.someProp("handlePaste", function(f) {
    return f(view, e, slice4 || Slice.empty);
  })) {
    return true;
  }
  if (!slice4) {
    return false;
  }
  var singleNode = sliceSingleNode(slice4);
  var tr = singleNode ? view.state.tr.replaceSelectionWith(singleNode, view.shiftKey) : view.state.tr.replaceSelection(slice4);
  view.dispatch(tr.scrollIntoView().setMeta("paste", true).setMeta("uiEvent", "paste"));
  return true;
}
editHandlers.paste = function(view, e) {
  if (view.composing && !result.android) {
    return;
  }
  var data = brokenClipboardAPI ? null : e.clipboardData;
  if (data && doPaste(view, data.getData("text/plain"), data.getData("text/html"), e)) {
    e.preventDefault();
  } else {
    capturePaste(view, e);
  }
};
var Dragging = function Dragging2(slice4, move2) {
  this.slice = slice4;
  this.move = move2;
};
var dragCopyModifier = result.mac ? "altKey" : "ctrlKey";
handlers.dragstart = function(view, e) {
  var mouseDown = view.mouseDown;
  if (mouseDown) {
    mouseDown.done();
  }
  if (!e.dataTransfer) {
    return;
  }
  var sel = view.state.selection;
  var pos = sel.empty ? null : view.posAtCoords(eventCoords(e));
  if (pos && pos.pos >= sel.from && pos.pos <= (sel instanceof NodeSelection ? sel.to - 1 : sel.to))
    ;
  else if (mouseDown && mouseDown.mightDrag) {
    view.dispatch(view.state.tr.setSelection(NodeSelection.create(view.state.doc, mouseDown.mightDrag.pos)));
  } else if (e.target && e.target.nodeType == 1) {
    var desc = view.docView.nearestDesc(e.target, true);
    if (desc && desc.node.type.spec.draggable && desc != view.docView) {
      view.dispatch(view.state.tr.setSelection(NodeSelection.create(view.state.doc, desc.posBefore)));
    }
  }
  var slice4 = view.state.selection.content();
  var ref2 = serializeForClipboard(view, slice4);
  var dom = ref2.dom;
  var text2 = ref2.text;
  e.dataTransfer.clearData();
  e.dataTransfer.setData(brokenClipboardAPI ? "Text" : "text/html", dom.innerHTML);
  e.dataTransfer.effectAllowed = "copyMove";
  if (!brokenClipboardAPI) {
    e.dataTransfer.setData("text/plain", text2);
  }
  view.dragging = new Dragging(slice4, !e[dragCopyModifier]);
};
handlers.dragend = function(view) {
  var dragging = view.dragging;
  window.setTimeout(function() {
    if (view.dragging == dragging) {
      view.dragging = null;
    }
  }, 50);
};
editHandlers.dragover = editHandlers.dragenter = function(_, e) {
  return e.preventDefault();
};
editHandlers.drop = function(view, e) {
  var dragging = view.dragging;
  view.dragging = null;
  if (!e.dataTransfer) {
    return;
  }
  var eventPos = view.posAtCoords(eventCoords(e));
  if (!eventPos) {
    return;
  }
  var $mouse = view.state.doc.resolve(eventPos.pos);
  if (!$mouse) {
    return;
  }
  var slice4 = dragging && dragging.slice;
  if (slice4) {
    view.someProp("transformPasted", function(f) {
      slice4 = f(slice4);
    });
  } else {
    slice4 = parseFromClipboard(view, e.dataTransfer.getData(brokenClipboardAPI ? "Text" : "text/plain"), brokenClipboardAPI ? null : e.dataTransfer.getData("text/html"), false, $mouse);
  }
  var move2 = dragging && !e[dragCopyModifier];
  if (view.someProp("handleDrop", function(f) {
    return f(view, e, slice4 || Slice.empty, move2);
  })) {
    e.preventDefault();
    return;
  }
  if (!slice4) {
    return;
  }
  e.preventDefault();
  var insertPos = slice4 ? dropPoint(view.state.doc, $mouse.pos, slice4) : $mouse.pos;
  if (insertPos == null) {
    insertPos = $mouse.pos;
  }
  var tr = view.state.tr;
  if (move2) {
    tr.deleteSelection();
  }
  var pos = tr.mapping.map(insertPos);
  var isNode = slice4.openStart == 0 && slice4.openEnd == 0 && slice4.content.childCount == 1;
  var beforeInsert = tr.doc;
  if (isNode) {
    tr.replaceRangeWith(pos, pos, slice4.content.firstChild);
  } else {
    tr.replaceRange(pos, pos, slice4);
  }
  if (tr.doc.eq(beforeInsert)) {
    return;
  }
  var $pos = tr.doc.resolve(pos);
  if (isNode && NodeSelection.isSelectable(slice4.content.firstChild) && $pos.nodeAfter && $pos.nodeAfter.sameMarkup(slice4.content.firstChild)) {
    tr.setSelection(new NodeSelection($pos));
  } else {
    var end3 = tr.mapping.map(insertPos);
    tr.mapping.maps[tr.mapping.maps.length - 1].forEach(function(_from, _to, _newFrom, newTo) {
      return end3 = newTo;
    });
    tr.setSelection(selectionBetween(view, $pos, tr.doc.resolve(end3)));
  }
  view.focus();
  view.dispatch(tr.setMeta("uiEvent", "drop"));
};
handlers.focus = function(view) {
  if (!view.focused) {
    view.domObserver.stop();
    view.dom.classList.add("ProseMirror-focused");
    view.domObserver.start();
    view.focused = true;
    setTimeout(function() {
      if (view.docView && view.hasFocus() && !view.domObserver.currentSelection.eq(view.root.getSelection())) {
        selectionToDOM(view);
      }
    }, 20);
  }
};
handlers.blur = function(view, e) {
  if (view.focused) {
    view.domObserver.stop();
    view.dom.classList.remove("ProseMirror-focused");
    view.domObserver.start();
    if (e.relatedTarget && view.dom.contains(e.relatedTarget)) {
      view.domObserver.currentSelection.set({});
    }
    view.focused = false;
  }
};
handlers.beforeinput = function(view, event) {
  if (result.chrome && result.android && event.inputType == "deleteContentBackward") {
    view.domObserver.flushSoon();
    var domChangeCount = view.domChangeCount;
    setTimeout(function() {
      if (view.domChangeCount != domChangeCount) {
        return;
      }
      view.dom.blur();
      view.focus();
      if (view.someProp("handleKeyDown", function(f) {
        return f(view, keyEvent(8, "Backspace"));
      })) {
        return;
      }
      var ref2 = view.state.selection;
      var $cursor = ref2.$cursor;
      if ($cursor && $cursor.pos > 0) {
        view.dispatch(view.state.tr.delete($cursor.pos - 1, $cursor.pos).scrollIntoView());
      }
    }, 50);
  }
};
for (var prop in editHandlers) {
  handlers[prop] = editHandlers[prop];
}
function compareObjs(a2, b) {
  if (a2 == b) {
    return true;
  }
  for (var p2 in a2) {
    if (a2[p2] !== b[p2]) {
      return false;
    }
  }
  for (var p$12 in b) {
    if (!(p$12 in a2)) {
      return false;
    }
  }
  return true;
}
var WidgetType = function WidgetType2(toDOM, spec) {
  this.spec = spec || noSpec;
  this.side = this.spec.side || 0;
  this.toDOM = toDOM;
};
WidgetType.prototype.map = function map7(mapping, span, offset3, oldOffset) {
  var ref2 = mapping.mapResult(span.from + oldOffset, this.side < 0 ? -1 : 1);
  var pos = ref2.pos;
  var deleted = ref2.deleted;
  return deleted ? null : new Decoration(pos - offset3, pos - offset3, this);
};
WidgetType.prototype.valid = function valid() {
  return true;
};
WidgetType.prototype.eq = function eq6(other) {
  return this == other || other instanceof WidgetType && (this.spec.key && this.spec.key == other.spec.key || this.toDOM == other.toDOM && compareObjs(this.spec, other.spec));
};
WidgetType.prototype.destroy = function destroy2(node4) {
  if (this.spec.destroy) {
    this.spec.destroy(node4);
  }
};
var InlineType = function InlineType2(attrs, spec) {
  this.spec = spec || noSpec;
  this.attrs = attrs;
};
InlineType.prototype.map = function map8(mapping, span, offset3, oldOffset) {
  var from4 = mapping.map(span.from + oldOffset, this.spec.inclusiveStart ? -1 : 1) - offset3;
  var to = mapping.map(span.to + oldOffset, this.spec.inclusiveEnd ? 1 : -1) - offset3;
  return from4 >= to ? null : new Decoration(from4, to, this);
};
InlineType.prototype.valid = function valid2(_, span) {
  return span.from < span.to;
};
InlineType.prototype.eq = function eq7(other) {
  return this == other || other instanceof InlineType && compareObjs(this.attrs, other.attrs) && compareObjs(this.spec, other.spec);
};
InlineType.is = function is(span) {
  return span.type instanceof InlineType;
};
var NodeType = function NodeType3(attrs, spec) {
  this.spec = spec || noSpec;
  this.attrs = attrs;
};
NodeType.prototype.map = function map9(mapping, span, offset3, oldOffset) {
  var from4 = mapping.mapResult(span.from + oldOffset, 1);
  if (from4.deleted) {
    return null;
  }
  var to = mapping.mapResult(span.to + oldOffset, -1);
  if (to.deleted || to.pos <= from4.pos) {
    return null;
  }
  return new Decoration(from4.pos - offset3, to.pos - offset3, this);
};
NodeType.prototype.valid = function valid3(node4, span) {
  var ref2 = node4.content.findIndex(span.from);
  var index2 = ref2.index;
  var offset3 = ref2.offset;
  var child3;
  return offset3 == span.from && !(child3 = node4.child(index2)).isText && offset3 + child3.nodeSize == span.to;
};
NodeType.prototype.eq = function eq8(other) {
  return this == other || other instanceof NodeType && compareObjs(this.attrs, other.attrs) && compareObjs(this.spec, other.spec);
};
var Decoration = function Decoration2(from4, to, type) {
  this.from = from4;
  this.to = to;
  this.type = type;
};
var prototypeAccessors$1 = { spec: { configurable: true }, inline: { configurable: true } };
Decoration.prototype.copy = function copy4(from4, to) {
  return new Decoration(from4, to, this.type);
};
Decoration.prototype.eq = function eq9(other, offset3) {
  if (offset3 === void 0)
    offset3 = 0;
  return this.type.eq(other.type) && this.from + offset3 == other.from && this.to + offset3 == other.to;
};
Decoration.prototype.map = function map10(mapping, offset3, oldOffset) {
  return this.type.map(mapping, this, offset3, oldOffset);
};
Decoration.widget = function widget(pos, toDOM, spec) {
  return new Decoration(pos, pos, new WidgetType(toDOM, spec));
};
Decoration.inline = function inline(from4, to, attrs, spec) {
  return new Decoration(from4, to, new InlineType(attrs, spec));
};
Decoration.node = function node3(from4, to, attrs, spec) {
  return new Decoration(from4, to, new NodeType(attrs, spec));
};
prototypeAccessors$1.spec.get = function() {
  return this.type.spec;
};
prototypeAccessors$1.inline.get = function() {
  return this.type instanceof InlineType;
};
Object.defineProperties(Decoration.prototype, prototypeAccessors$1);
var none = [], noSpec = {};
var DecorationSet = function DecorationSet2(local, children) {
  this.local = local && local.length ? local : none;
  this.children = children && children.length ? children : none;
};
DecorationSet.create = function create4(doc2, decorations) {
  return decorations.length ? buildTree(decorations, doc2, 0, noSpec) : empty;
};
DecorationSet.prototype.find = function find(start4, end3, predicate) {
  var result2 = [];
  this.findInner(start4 == null ? 0 : start4, end3 == null ? 1e9 : end3, result2, 0, predicate);
  return result2;
};
DecorationSet.prototype.findInner = function findInner(start4, end3, result2, offset3, predicate) {
  for (var i2 = 0; i2 < this.local.length; i2++) {
    var span = this.local[i2];
    if (span.from <= end3 && span.to >= start4 && (!predicate || predicate(span.spec))) {
      result2.push(span.copy(span.from + offset3, span.to + offset3));
    }
  }
  for (var i$1 = 0; i$1 < this.children.length; i$1 += 3) {
    if (this.children[i$1] < end3 && this.children[i$1 + 1] > start4) {
      var childOff = this.children[i$1] + 1;
      this.children[i$1 + 2].findInner(start4 - childOff, end3 - childOff, result2, offset3 + childOff, predicate);
    }
  }
};
DecorationSet.prototype.map = function map11(mapping, doc2, options) {
  if (this == empty || mapping.maps.length == 0) {
    return this;
  }
  return this.mapInner(mapping, doc2, 0, 0, options || noSpec);
};
DecorationSet.prototype.mapInner = function mapInner(mapping, node4, offset3, oldOffset, options) {
  var newLocal;
  for (var i2 = 0; i2 < this.local.length; i2++) {
    var mapped = this.local[i2].map(mapping, offset3, oldOffset);
    if (mapped && mapped.type.valid(node4, mapped)) {
      (newLocal || (newLocal = [])).push(mapped);
    } else if (options.onRemove) {
      options.onRemove(this.local[i2].spec);
    }
  }
  if (this.children.length) {
    return mapChildren(this.children, newLocal, mapping, node4, offset3, oldOffset, options);
  } else {
    return newLocal ? new DecorationSet(newLocal.sort(byPos)) : empty;
  }
};
DecorationSet.prototype.add = function add2(doc2, decorations) {
  if (!decorations.length) {
    return this;
  }
  if (this == empty) {
    return DecorationSet.create(doc2, decorations);
  }
  return this.addInner(doc2, decorations, 0);
};
DecorationSet.prototype.addInner = function addInner(doc2, decorations, offset3) {
  var this$1$1 = this;
  var children, childIndex = 0;
  doc2.forEach(function(childNode, childOffset) {
    var baseOffset = childOffset + offset3, found2;
    if (!(found2 = takeSpansForNode(decorations, childNode, baseOffset))) {
      return;
    }
    if (!children) {
      children = this$1$1.children.slice();
    }
    while (childIndex < children.length && children[childIndex] < childOffset) {
      childIndex += 3;
    }
    if (children[childIndex] == childOffset) {
      children[childIndex + 2] = children[childIndex + 2].addInner(childNode, found2, baseOffset + 1);
    } else {
      children.splice(childIndex, 0, childOffset, childOffset + childNode.nodeSize, buildTree(found2, childNode, baseOffset + 1, noSpec));
    }
    childIndex += 3;
  });
  var local = moveSpans(childIndex ? withoutNulls(decorations) : decorations, -offset3);
  for (var i2 = 0; i2 < local.length; i2++) {
    if (!local[i2].type.valid(doc2, local[i2])) {
      local.splice(i2--, 1);
    }
  }
  return new DecorationSet(local.length ? this.local.concat(local).sort(byPos) : this.local, children || this.children);
};
DecorationSet.prototype.remove = function remove2(decorations) {
  if (decorations.length == 0 || this == empty) {
    return this;
  }
  return this.removeInner(decorations, 0);
};
DecorationSet.prototype.removeInner = function removeInner(decorations, offset3) {
  var children = this.children, local = this.local;
  for (var i2 = 0; i2 < children.length; i2 += 3) {
    var found2 = void 0, from4 = children[i2] + offset3, to = children[i2 + 1] + offset3;
    for (var j = 0, span = void 0; j < decorations.length; j++) {
      if (span = decorations[j]) {
        if (span.from > from4 && span.to < to) {
          decorations[j] = null;
          (found2 || (found2 = [])).push(span);
        }
      }
    }
    if (!found2) {
      continue;
    }
    if (children == this.children) {
      children = this.children.slice();
    }
    var removed = children[i2 + 2].removeInner(found2, from4 + 1);
    if (removed != empty) {
      children[i2 + 2] = removed;
    } else {
      children.splice(i2, 3);
      i2 -= 3;
    }
  }
  if (local.length) {
    for (var i$1 = 0, span$1 = void 0; i$1 < decorations.length; i$1++) {
      if (span$1 = decorations[i$1]) {
        for (var j$1 = 0; j$1 < local.length; j$1++) {
          if (local[j$1].eq(span$1, offset3)) {
            if (local == this.local) {
              local = this.local.slice();
            }
            local.splice(j$1--, 1);
          }
        }
      }
    }
  }
  if (children == this.children && local == this.local) {
    return this;
  }
  return local.length || children.length ? new DecorationSet(local, children) : empty;
};
DecorationSet.prototype.forChild = function forChild(offset3, node4) {
  if (this == empty) {
    return this;
  }
  if (node4.isLeaf) {
    return DecorationSet.empty;
  }
  var child3, local;
  for (var i2 = 0; i2 < this.children.length; i2 += 3) {
    if (this.children[i2] >= offset3) {
      if (this.children[i2] == offset3) {
        child3 = this.children[i2 + 2];
      }
      break;
    }
  }
  var start4 = offset3 + 1, end3 = start4 + node4.content.size;
  for (var i$1 = 0; i$1 < this.local.length; i$1++) {
    var dec = this.local[i$1];
    if (dec.from < end3 && dec.to > start4 && dec.type instanceof InlineType) {
      var from4 = Math.max(start4, dec.from) - start4, to = Math.min(end3, dec.to) - start4;
      if (from4 < to) {
        (local || (local = [])).push(dec.copy(from4, to));
      }
    }
  }
  if (local) {
    var localSet = new DecorationSet(local.sort(byPos));
    return child3 ? new DecorationGroup([localSet, child3]) : localSet;
  }
  return child3 || empty;
};
DecorationSet.prototype.eq = function eq10(other) {
  if (this == other) {
    return true;
  }
  if (!(other instanceof DecorationSet) || this.local.length != other.local.length || this.children.length != other.children.length) {
    return false;
  }
  for (var i2 = 0; i2 < this.local.length; i2++) {
    if (!this.local[i2].eq(other.local[i2])) {
      return false;
    }
  }
  for (var i$1 = 0; i$1 < this.children.length; i$1 += 3) {
    if (this.children[i$1] != other.children[i$1] || this.children[i$1 + 1] != other.children[i$1 + 1] || !this.children[i$1 + 2].eq(other.children[i$1 + 2])) {
      return false;
    }
  }
  return true;
};
DecorationSet.prototype.locals = function locals(node4) {
  return removeOverlap(this.localsInner(node4));
};
DecorationSet.prototype.localsInner = function localsInner(node4) {
  if (this == empty) {
    return none;
  }
  if (node4.inlineContent || !this.local.some(InlineType.is)) {
    return this.local;
  }
  var result2 = [];
  for (var i2 = 0; i2 < this.local.length; i2++) {
    if (!(this.local[i2].type instanceof InlineType)) {
      result2.push(this.local[i2]);
    }
  }
  return result2;
};
var empty = new DecorationSet();
DecorationSet.empty = empty;
DecorationSet.removeOverlap = removeOverlap;
var DecorationGroup = function DecorationGroup2(members) {
  this.members = members;
};
DecorationGroup.prototype.map = function map12(mapping, doc2) {
  var mappedDecos = this.members.map(function(member) {
    return member.map(mapping, doc2, noSpec);
  });
  return DecorationGroup.from(mappedDecos);
};
DecorationGroup.prototype.forChild = function forChild2(offset3, child3) {
  if (child3.isLeaf) {
    return DecorationSet.empty;
  }
  var found2 = [];
  for (var i2 = 0; i2 < this.members.length; i2++) {
    var result2 = this.members[i2].forChild(offset3, child3);
    if (result2 == empty) {
      continue;
    }
    if (result2 instanceof DecorationGroup) {
      found2 = found2.concat(result2.members);
    } else {
      found2.push(result2);
    }
  }
  return DecorationGroup.from(found2);
};
DecorationGroup.prototype.eq = function eq11(other) {
  if (!(other instanceof DecorationGroup) || other.members.length != this.members.length) {
    return false;
  }
  for (var i2 = 0; i2 < this.members.length; i2++) {
    if (!this.members[i2].eq(other.members[i2])) {
      return false;
    }
  }
  return true;
};
DecorationGroup.prototype.locals = function locals2(node4) {
  var result2, sorted = true;
  for (var i2 = 0; i2 < this.members.length; i2++) {
    var locals3 = this.members[i2].localsInner(node4);
    if (!locals3.length) {
      continue;
    }
    if (!result2) {
      result2 = locals3;
    } else {
      if (sorted) {
        result2 = result2.slice();
        sorted = false;
      }
      for (var j = 0; j < locals3.length; j++) {
        result2.push(locals3[j]);
      }
    }
  }
  return result2 ? removeOverlap(sorted ? result2 : result2.sort(byPos)) : none;
};
DecorationGroup.from = function from2(members) {
  switch (members.length) {
    case 0:
      return empty;
    case 1:
      return members[0];
    default:
      return new DecorationGroup(members);
  }
};
function mapChildren(oldChildren, newLocal, mapping, node4, offset3, oldOffset, options) {
  var children = oldChildren.slice();
  var shift2 = function(oldStart, oldEnd, newStart, newEnd) {
    for (var i3 = 0; i3 < children.length; i3 += 3) {
      var end3 = children[i3 + 1], dSize = void 0;
      if (end3 < 0 || oldStart > end3 + oldOffset) {
        continue;
      }
      var start4 = children[i3] + oldOffset;
      if (oldEnd >= start4) {
        children[i3 + 1] = oldStart <= start4 ? -2 : -1;
      } else if (newStart >= offset3 && (dSize = newEnd - newStart - (oldEnd - oldStart))) {
        children[i3] += dSize;
        children[i3 + 1] += dSize;
      }
    }
  };
  for (var i2 = 0; i2 < mapping.maps.length; i2++) {
    mapping.maps[i2].forEach(shift2);
  }
  var mustRebuild = false;
  for (var i$1 = 0; i$1 < children.length; i$1 += 3) {
    if (children[i$1 + 1] < 0) {
      if (children[i$1 + 1] == -2) {
        mustRebuild = true;
        children[i$1 + 1] = -1;
        continue;
      }
      var from4 = mapping.map(oldChildren[i$1] + oldOffset), fromLocal = from4 - offset3;
      if (fromLocal < 0 || fromLocal >= node4.content.size) {
        mustRebuild = true;
        continue;
      }
      var to = mapping.map(oldChildren[i$1 + 1] + oldOffset, -1), toLocal = to - offset3;
      var ref2 = node4.content.findIndex(fromLocal);
      var index2 = ref2.index;
      var childOffset = ref2.offset;
      var childNode = node4.maybeChild(index2);
      if (childNode && childOffset == fromLocal && childOffset + childNode.nodeSize == toLocal) {
        var mapped = children[i$1 + 2].mapInner(mapping, childNode, from4 + 1, oldChildren[i$1] + oldOffset + 1, options);
        if (mapped != empty) {
          children[i$1] = fromLocal;
          children[i$1 + 1] = toLocal;
          children[i$1 + 2] = mapped;
        } else {
          children[i$1 + 1] = -2;
          mustRebuild = true;
        }
      } else {
        mustRebuild = true;
      }
    }
  }
  if (mustRebuild) {
    var decorations = mapAndGatherRemainingDecorations(children, oldChildren, newLocal || [], mapping, offset3, oldOffset, options);
    var built = buildTree(decorations, node4, 0, options);
    newLocal = built.local;
    for (var i$2 = 0; i$2 < children.length; i$2 += 3) {
      if (children[i$2 + 1] < 0) {
        children.splice(i$2, 3);
        i$2 -= 3;
      }
    }
    for (var i$3 = 0, j = 0; i$3 < built.children.length; i$3 += 3) {
      var from$1 = built.children[i$3];
      while (j < children.length && children[j] < from$1) {
        j += 3;
      }
      children.splice(j, 0, built.children[i$3], built.children[i$3 + 1], built.children[i$3 + 2]);
    }
  }
  return new DecorationSet(newLocal && newLocal.sort(byPos), children);
}
function moveSpans(spans, offset3) {
  if (!offset3 || !spans.length) {
    return spans;
  }
  var result2 = [];
  for (var i2 = 0; i2 < spans.length; i2++) {
    var span = spans[i2];
    result2.push(new Decoration(span.from + offset3, span.to + offset3, span.type));
  }
  return result2;
}
function mapAndGatherRemainingDecorations(children, oldChildren, decorations, mapping, offset3, oldOffset, options) {
  function gather(set3, oldOffset2) {
    for (var i3 = 0; i3 < set3.local.length; i3++) {
      var mapped = set3.local[i3].map(mapping, offset3, oldOffset2);
      if (mapped) {
        decorations.push(mapped);
      } else if (options.onRemove) {
        options.onRemove(set3.local[i3].spec);
      }
    }
    for (var i$1 = 0; i$1 < set3.children.length; i$1 += 3) {
      gather(set3.children[i$1 + 2], set3.children[i$1] + oldOffset2 + 1);
    }
  }
  for (var i2 = 0; i2 < children.length; i2 += 3) {
    if (children[i2 + 1] == -1) {
      gather(children[i2 + 2], oldChildren[i2] + oldOffset + 1);
    }
  }
  return decorations;
}
function takeSpansForNode(spans, node4, offset3) {
  if (node4.isLeaf) {
    return null;
  }
  var end3 = offset3 + node4.nodeSize, found2 = null;
  for (var i2 = 0, span = void 0; i2 < spans.length; i2++) {
    if ((span = spans[i2]) && span.from > offset3 && span.to < end3) {
      (found2 || (found2 = [])).push(span);
      spans[i2] = null;
    }
  }
  return found2;
}
function withoutNulls(array) {
  var result2 = [];
  for (var i2 = 0; i2 < array.length; i2++) {
    if (array[i2] != null) {
      result2.push(array[i2]);
    }
  }
  return result2;
}
function buildTree(spans, node4, offset3, options) {
  var children = [], hasNulls = false;
  node4.forEach(function(childNode, localStart) {
    var found2 = takeSpansForNode(spans, childNode, localStart + offset3);
    if (found2) {
      hasNulls = true;
      var subtree = buildTree(found2, childNode, offset3 + localStart + 1, options);
      if (subtree != empty) {
        children.push(localStart, localStart + childNode.nodeSize, subtree);
      }
    }
  });
  var locals3 = moveSpans(hasNulls ? withoutNulls(spans) : spans, -offset3).sort(byPos);
  for (var i2 = 0; i2 < locals3.length; i2++) {
    if (!locals3[i2].type.valid(node4, locals3[i2])) {
      if (options.onRemove) {
        options.onRemove(locals3[i2].spec);
      }
      locals3.splice(i2--, 1);
    }
  }
  return locals3.length || children.length ? new DecorationSet(locals3, children) : empty;
}
function byPos(a2, b) {
  return a2.from - b.from || a2.to - b.to;
}
function removeOverlap(spans) {
  var working = spans;
  for (var i2 = 0; i2 < working.length - 1; i2++) {
    var span = working[i2];
    if (span.from != span.to) {
      for (var j = i2 + 1; j < working.length; j++) {
        var next = working[j];
        if (next.from == span.from) {
          if (next.to != span.to) {
            if (working == spans) {
              working = spans.slice();
            }
            working[j] = next.copy(next.from, span.to);
            insertAhead(working, j + 1, next.copy(span.to, next.to));
          }
          continue;
        } else {
          if (next.from < span.to) {
            if (working == spans) {
              working = spans.slice();
            }
            working[i2] = span.copy(span.from, next.from);
            insertAhead(working, j, span.copy(next.from, span.to));
          }
          break;
        }
      }
    }
  }
  return working;
}
function insertAhead(array, i2, deco) {
  while (i2 < array.length && byPos(deco, array[i2]) > 0) {
    i2++;
  }
  array.splice(i2, 0, deco);
}
function viewDecorations(view) {
  var found2 = [];
  view.someProp("decorations", function(f) {
    var result2 = f(view.state);
    if (result2 && result2 != empty) {
      found2.push(result2);
    }
  });
  if (view.cursorWrapper) {
    found2.push(DecorationSet.create(view.state.doc, [view.cursorWrapper.deco]));
  }
  return DecorationGroup.from(found2);
}
var EditorView = function EditorView2(place, props) {
  this._props = props;
  this.state = props.state;
  this.directPlugins = props.plugins || [];
  this.directPlugins.forEach(checkStateComponent);
  this.dispatch = this.dispatch.bind(this);
  this._root = null;
  this.focused = false;
  this.trackWrites = null;
  this.dom = place && place.mount || document.createElement("div");
  if (place) {
    if (place.appendChild) {
      place.appendChild(this.dom);
    } else if (place.apply) {
      place(this.dom);
    } else if (place.mount) {
      this.mounted = true;
    }
  }
  this.editable = getEditable(this);
  this.markCursor = null;
  this.cursorWrapper = null;
  updateCursorWrapper(this);
  this.nodeViews = buildNodeViews(this);
  this.docView = docViewDesc(this.state.doc, computeDocDeco(this), viewDecorations(this), this.dom, this);
  this.lastSelectedViewDesc = null;
  this.dragging = null;
  initInput(this);
  this.prevDirectPlugins = [];
  this.pluginViews = [];
  this.updatePluginViews();
};
var prototypeAccessors$2 = { props: { configurable: true }, root: { configurable: true }, isDestroyed: { configurable: true } };
prototypeAccessors$2.props.get = function() {
  if (this._props.state != this.state) {
    var prev = this._props;
    this._props = {};
    for (var name in prev) {
      this._props[name] = prev[name];
    }
    this._props.state = this.state;
  }
  return this._props;
};
EditorView.prototype.update = function update2(props) {
  if (props.handleDOMEvents != this._props.handleDOMEvents) {
    ensureListeners(this);
  }
  this._props = props;
  if (props.plugins) {
    props.plugins.forEach(checkStateComponent);
    this.directPlugins = props.plugins;
  }
  this.updateStateInner(props.state, true);
};
EditorView.prototype.setProps = function setProps(props) {
  var updated = {};
  for (var name in this._props) {
    updated[name] = this._props[name];
  }
  updated.state = this.state;
  for (var name$1 in props) {
    updated[name$1] = props[name$1];
  }
  this.update(updated);
};
EditorView.prototype.updateState = function updateState(state) {
  this.updateStateInner(state, this.state.plugins != state.plugins);
};
EditorView.prototype.updateStateInner = function updateStateInner(state, reconfigured) {
  var this$1$1 = this;
  var prev = this.state, redraw = false, updateSel = false;
  if (state.storedMarks && this.composing) {
    clearComposition(this);
    updateSel = true;
  }
  this.state = state;
  if (reconfigured) {
    var nodeViews = buildNodeViews(this);
    if (changedNodeViews(nodeViews, this.nodeViews)) {
      this.nodeViews = nodeViews;
      redraw = true;
    }
    ensureListeners(this);
  }
  this.editable = getEditable(this);
  updateCursorWrapper(this);
  var innerDeco = viewDecorations(this), outerDeco = computeDocDeco(this);
  var scroll = reconfigured ? "reset" : state.scrollToSelection > prev.scrollToSelection ? "to selection" : "preserve";
  var updateDoc = redraw || !this.docView.matchesNode(state.doc, outerDeco, innerDeco);
  if (updateDoc || !state.selection.eq(prev.selection)) {
    updateSel = true;
  }
  var oldScrollPos = scroll == "preserve" && updateSel && this.dom.style.overflowAnchor == null && storeScrollPos(this);
  if (updateSel) {
    this.domObserver.stop();
    var forceSelUpdate = updateDoc && (result.ie || result.chrome) && !this.composing && !prev.selection.empty && !state.selection.empty && selectionContextChanged(prev.selection, state.selection);
    if (updateDoc) {
      var chromeKludge = result.chrome ? this.trackWrites = this.root.getSelection().focusNode : null;
      if (redraw || !this.docView.update(state.doc, outerDeco, innerDeco, this)) {
        this.docView.updateOuterDeco([]);
        this.docView.destroy();
        this.docView = docViewDesc(state.doc, outerDeco, innerDeco, this.dom, this);
      }
      if (chromeKludge && !this.trackWrites) {
        forceSelUpdate = true;
      }
    }
    if (forceSelUpdate || !(this.mouseDown && this.domObserver.currentSelection.eq(this.root.getSelection()) && anchorInRightPlace(this))) {
      selectionToDOM(this, forceSelUpdate);
    } else {
      syncNodeSelection(this, state.selection);
      this.domObserver.setCurSelection();
    }
    this.domObserver.start();
  }
  this.updatePluginViews(prev);
  if (scroll == "reset") {
    this.dom.scrollTop = 0;
  } else if (scroll == "to selection") {
    var startDOM = this.root.getSelection().focusNode;
    if (this.someProp("handleScrollToSelection", function(f) {
      return f(this$1$1);
    }))
      ;
    else if (state.selection instanceof NodeSelection) {
      scrollRectIntoView(this, this.docView.domAfterPos(state.selection.from).getBoundingClientRect(), startDOM);
    } else {
      scrollRectIntoView(this, this.coordsAtPos(state.selection.head, 1), startDOM);
    }
  } else if (oldScrollPos) {
    resetScrollPos(oldScrollPos);
  }
};
EditorView.prototype.destroyPluginViews = function destroyPluginViews() {
  var view;
  while (view = this.pluginViews.pop()) {
    if (view.destroy) {
      view.destroy();
    }
  }
};
EditorView.prototype.updatePluginViews = function updatePluginViews(prevState) {
  if (!prevState || prevState.plugins != this.state.plugins || this.directPlugins != this.prevDirectPlugins) {
    this.prevDirectPlugins = this.directPlugins;
    this.destroyPluginViews();
    for (var i2 = 0; i2 < this.directPlugins.length; i2++) {
      var plugin = this.directPlugins[i2];
      if (plugin.spec.view) {
        this.pluginViews.push(plugin.spec.view(this));
      }
    }
    for (var i$1 = 0; i$1 < this.state.plugins.length; i$1++) {
      var plugin$1 = this.state.plugins[i$1];
      if (plugin$1.spec.view) {
        this.pluginViews.push(plugin$1.spec.view(this));
      }
    }
  } else {
    for (var i$2 = 0; i$2 < this.pluginViews.length; i$2++) {
      var pluginView = this.pluginViews[i$2];
      if (pluginView.update) {
        pluginView.update(this, prevState);
      }
    }
  }
};
EditorView.prototype.someProp = function someProp(propName, f) {
  var prop2 = this._props && this._props[propName], value;
  if (prop2 != null && (value = f ? f(prop2) : prop2)) {
    return value;
  }
  for (var i2 = 0; i2 < this.directPlugins.length; i2++) {
    var prop$1 = this.directPlugins[i2].props[propName];
    if (prop$1 != null && (value = f ? f(prop$1) : prop$1)) {
      return value;
    }
  }
  var plugins = this.state.plugins;
  if (plugins) {
    for (var i$1 = 0; i$1 < plugins.length; i$1++) {
      var prop$2 = plugins[i$1].props[propName];
      if (prop$2 != null && (value = f ? f(prop$2) : prop$2)) {
        return value;
      }
    }
  }
};
EditorView.prototype.hasFocus = function hasFocus() {
  return this.root.activeElement == this.dom;
};
EditorView.prototype.focus = function focus2() {
  this.domObserver.stop();
  if (this.editable) {
    focusPreventScroll(this.dom);
  }
  selectionToDOM(this);
  this.domObserver.start();
};
prototypeAccessors$2.root.get = function() {
  var cached = this._root;
  if (cached == null) {
    for (var search = this.dom.parentNode; search; search = search.parentNode) {
      if (search.nodeType == 9 || search.nodeType == 11 && search.host) {
        if (!search.getSelection) {
          Object.getPrototypeOf(search).getSelection = function() {
            return document.getSelection();
          };
        }
        return this._root = search;
      }
    }
  }
  return cached || document;
};
EditorView.prototype.posAtCoords = function posAtCoords$1(coords) {
  return posAtCoords(this, coords);
};
EditorView.prototype.coordsAtPos = function coordsAtPos$1(pos, side) {
  if (side === void 0)
    side = 1;
  return coordsAtPos(this, pos, side);
};
EditorView.prototype.domAtPos = function domAtPos(pos, side) {
  if (side === void 0)
    side = 0;
  return this.docView.domFromPos(pos, side);
};
EditorView.prototype.nodeDOM = function nodeDOM(pos) {
  var desc = this.docView.descAt(pos);
  return desc ? desc.nodeDOM : null;
};
EditorView.prototype.posAtDOM = function posAtDOM(node4, offset3, bias) {
  if (bias === void 0)
    bias = -1;
  var pos = this.docView.posFromDOM(node4, offset3, bias);
  if (pos == null) {
    throw new RangeError("DOM position not inside the editor");
  }
  return pos;
};
EditorView.prototype.endOfTextblock = function endOfTextblock$1(dir, state) {
  return endOfTextblock(this, state || this.state, dir);
};
EditorView.prototype.destroy = function destroy3() {
  if (!this.docView) {
    return;
  }
  destroyInput(this);
  this.destroyPluginViews();
  if (this.mounted) {
    this.docView.update(this.state.doc, [], viewDecorations(this), this);
    this.dom.textContent = "";
  } else if (this.dom.parentNode) {
    this.dom.parentNode.removeChild(this.dom);
  }
  this.docView.destroy();
  this.docView = null;
};
prototypeAccessors$2.isDestroyed.get = function() {
  return this.docView == null;
};
EditorView.prototype.dispatchEvent = function dispatchEvent$1(event) {
  return dispatchEvent(this, event);
};
EditorView.prototype.dispatch = function dispatch(tr) {
  var dispatchTransaction = this._props.dispatchTransaction;
  if (dispatchTransaction) {
    dispatchTransaction.call(this, tr);
  } else {
    this.updateState(this.state.apply(tr));
  }
};
Object.defineProperties(EditorView.prototype, prototypeAccessors$2);
function computeDocDeco(view) {
  var attrs = /* @__PURE__ */ Object.create(null);
  attrs.class = "ProseMirror";
  attrs.contenteditable = String(view.editable);
  attrs.translate = "no";
  view.someProp("attributes", function(value) {
    if (typeof value == "function") {
      value = value(view.state);
    }
    if (value) {
      for (var attr in value) {
        if (attr == "class") {
          attrs.class += " " + value[attr];
        }
        if (attr == "style") {
          attrs.style = (attrs.style ? attrs.style + ";" : "") + value[attr];
        } else if (!attrs[attr] && attr != "contenteditable" && attr != "nodeName") {
          attrs[attr] = String(value[attr]);
        }
      }
    }
  });
  return [Decoration.node(0, view.state.doc.content.size, attrs)];
}
function updateCursorWrapper(view) {
  if (view.markCursor) {
    var dom = document.createElement("img");
    dom.className = "ProseMirror-separator";
    dom.setAttribute("mark-placeholder", "true");
    dom.setAttribute("alt", "");
    view.cursorWrapper = { dom, deco: Decoration.widget(view.state.selection.head, dom, { raw: true, marks: view.markCursor }) };
  } else {
    view.cursorWrapper = null;
  }
}
function getEditable(view) {
  return !view.someProp("editable", function(value) {
    return value(view.state) === false;
  });
}
function selectionContextChanged(sel1, sel2) {
  var depth = Math.min(sel1.$anchor.sharedDepth(sel1.head), sel2.$anchor.sharedDepth(sel2.head));
  return sel1.$anchor.start(depth) != sel2.$anchor.start(depth);
}
function buildNodeViews(view) {
  var result2 = {};
  view.someProp("nodeViews", function(obj) {
    for (var prop2 in obj) {
      if (!Object.prototype.hasOwnProperty.call(result2, prop2)) {
        result2[prop2] = obj[prop2];
      }
    }
  });
  return result2;
}
function changedNodeViews(a2, b) {
  var nA = 0, nB = 0;
  for (var prop2 in a2) {
    if (a2[prop2] != b[prop2]) {
      return true;
    }
    nA++;
  }
  for (var _ in b) {
    nB++;
  }
  return nA != nB;
}
function checkStateComponent(plugin) {
  if (plugin.spec.state || plugin.spec.filterTransaction || plugin.spec.appendTransaction) {
    throw new RangeError("Plugins passed directly to the view must not have a state component");
  }
}
var base = {
  8: "Backspace",
  9: "Tab",
  10: "Enter",
  12: "NumLock",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  44: "PrintScreen",
  45: "Insert",
  46: "Delete",
  59: ";",
  61: "=",
  91: "Meta",
  92: "Meta",
  106: "*",
  107: "+",
  108: ",",
  109: "-",
  110: ".",
  111: "/",
  144: "NumLock",
  145: "ScrollLock",
  160: "Shift",
  161: "Shift",
  162: "Control",
  163: "Control",
  164: "Alt",
  165: "Alt",
  173: "-",
  186: ";",
  187: "=",
  188: ",",
  189: "-",
  190: ".",
  191: "/",
  192: "`",
  219: "[",
  220: "\\",
  221: "]",
  222: "'",
  229: "q"
};
var shift = {
  48: ")",
  49: "!",
  50: "@",
  51: "#",
  52: "$",
  53: "%",
  54: "^",
  55: "&",
  56: "*",
  57: "(",
  59: ":",
  61: "+",
  173: "_",
  186: ":",
  187: "+",
  188: "<",
  189: "_",
  190: ">",
  191: "?",
  192: "~",
  219: "{",
  220: "|",
  221: "}",
  222: '"',
  229: "Q"
};
var chrome = typeof navigator != "undefined" && /Chrome\/(\d+)/.exec(navigator.userAgent);
var safari = typeof navigator != "undefined" && /Apple Computer/.test(navigator.vendor);
var gecko = typeof navigator != "undefined" && /Gecko\/\d+/.test(navigator.userAgent);
var mac$1 = typeof navigator != "undefined" && /Mac/.test(navigator.platform);
var ie = typeof navigator != "undefined" && /MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent);
var brokenModifierNames = chrome && (mac$1 || +chrome[1] < 57) || gecko && mac$1;
for (var i = 0; i < 10; i++)
  base[48 + i] = base[96 + i] = String(i);
for (var i = 1; i <= 24; i++)
  base[i + 111] = "F" + i;
for (var i = 65; i <= 90; i++) {
  base[i] = String.fromCharCode(i + 32);
  shift[i] = String.fromCharCode(i);
}
for (var code in base)
  if (!shift.hasOwnProperty(code))
    shift[code] = base[code];
function keyName(event) {
  var ignoreKey = brokenModifierNames && (event.ctrlKey || event.altKey || event.metaKey) || (safari || ie) && event.shiftKey && event.key && event.key.length == 1;
  var name = !ignoreKey && event.key || (event.shiftKey ? shift : base)[event.keyCode] || event.key || "Unidentified";
  if (name == "Esc")
    name = "Escape";
  if (name == "Del")
    name = "Delete";
  if (name == "Left")
    name = "ArrowLeft";
  if (name == "Up")
    name = "ArrowUp";
  if (name == "Right")
    name = "ArrowRight";
  if (name == "Down")
    name = "ArrowDown";
  return name;
}
var mac = typeof navigator != "undefined" ? /Mac|iP(hone|[oa]d)/.test(navigator.platform) : false;
function normalizeKeyName$1(name) {
  var parts = name.split(/-(?!$)/), result2 = parts[parts.length - 1];
  if (result2 == "Space") {
    result2 = " ";
  }
  var alt, ctrl, shift2, meta;
  for (var i2 = 0; i2 < parts.length - 1; i2++) {
    var mod = parts[i2];
    if (/^(cmd|meta|m)$/i.test(mod)) {
      meta = true;
    } else if (/^a(lt)?$/i.test(mod)) {
      alt = true;
    } else if (/^(c|ctrl|control)$/i.test(mod)) {
      ctrl = true;
    } else if (/^s(hift)?$/i.test(mod)) {
      shift2 = true;
    } else if (/^mod$/i.test(mod)) {
      if (mac) {
        meta = true;
      } else {
        ctrl = true;
      }
    } else {
      throw new Error("Unrecognized modifier name: " + mod);
    }
  }
  if (alt) {
    result2 = "Alt-" + result2;
  }
  if (ctrl) {
    result2 = "Ctrl-" + result2;
  }
  if (meta) {
    result2 = "Meta-" + result2;
  }
  if (shift2) {
    result2 = "Shift-" + result2;
  }
  return result2;
}
function normalize(map15) {
  var copy5 = /* @__PURE__ */ Object.create(null);
  for (var prop2 in map15) {
    copy5[normalizeKeyName$1(prop2)] = map15[prop2];
  }
  return copy5;
}
function modifiers(name, event, shift2) {
  if (event.altKey) {
    name = "Alt-" + name;
  }
  if (event.ctrlKey) {
    name = "Ctrl-" + name;
  }
  if (event.metaKey) {
    name = "Meta-" + name;
  }
  if (shift2 !== false && event.shiftKey) {
    name = "Shift-" + name;
  }
  return name;
}
function keymap(bindings) {
  return new Plugin({ props: { handleKeyDown: keydownHandler(bindings) } });
}
function keydownHandler(bindings) {
  var map15 = normalize(bindings);
  return function(view, event) {
    var name = keyName(event), isChar = name.length == 1 && name != " ", baseName;
    var direct = map15[modifiers(name, event, !isChar)];
    if (direct && direct(view.state, view.dispatch, view)) {
      return true;
    }
    if (isChar && (event.shiftKey || event.altKey || event.metaKey || name.charCodeAt(0) > 127) && (baseName = base[event.keyCode]) && baseName != name) {
      var fromCode = map15[modifiers(baseName, event, true)];
      if (fromCode && fromCode(view.state, view.dispatch, view)) {
        return true;
      }
    } else if (isChar && event.shiftKey) {
      var withShift = map15[modifiers(name, event, true)];
      if (withShift && withShift(view.state, view.dispatch, view)) {
        return true;
      }
    }
    return false;
  };
}
function getType(value) {
  return Object.prototype.toString.call(value).slice(8, -1);
}
function isPlainObject(value) {
  if (getType(value) !== "Object") {
    return false;
  }
  return value.constructor === Object && Object.getPrototypeOf(value) === Object.prototype;
}
function mergeDeep(target, source) {
  const output = __spreadValues({}, target);
  if (isPlainObject(target) && isPlainObject(source)) {
    Object.keys(source).forEach((key2) => {
      if (isPlainObject(source[key2])) {
        if (!(key2 in target)) {
          Object.assign(output, { [key2]: source[key2] });
        } else {
          output[key2] = mergeDeep(target[key2], source[key2]);
        }
      } else {
        Object.assign(output, { [key2]: source[key2] });
      }
    });
  }
  return output;
}
function isFunction(value) {
  return typeof value === "function";
}
function callOrReturn(value, context = void 0, ...props) {
  if (isFunction(value)) {
    if (context) {
      return value.bind(context)(...props);
    }
    return value(...props);
  }
  return value;
}
function getExtensionField(extension, field, context) {
  if (extension.config[field] === void 0 && extension.parent) {
    return getExtensionField(extension.parent, field, context);
  }
  if (typeof extension.config[field] === "function") {
    const value = extension.config[field].bind(__spreadProps(__spreadValues({}, context), {
      parent: extension.parent ? getExtensionField(extension.parent, field, context) : null
    }));
    return value;
  }
  return extension.config[field];
}
class Extension {
  constructor(config = {}) {
    this.type = "extension";
    this.name = "extension";
    this.parent = null;
    this.child = null;
    this.config = {
      name: this.name,
      defaultOptions: {}
    };
    this.config = __spreadValues(__spreadValues({}, this.config), config);
    this.name = this.config.name;
    if (config.defaultOptions) {
      console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${this.name}".`);
    }
    this.options = this.config.defaultOptions;
    if (this.config.addOptions) {
      this.options = callOrReturn(getExtensionField(this, "addOptions", {
        name: this.name
      }));
    }
    this.storage = callOrReturn(getExtensionField(this, "addStorage", {
      name: this.name,
      options: this.options
    })) || {};
  }
  static create(config = {}) {
    return new Extension(config);
  }
  configure(options = {}) {
    const extension = this.extend();
    extension.options = mergeDeep(this.options, options);
    extension.storage = callOrReturn(getExtensionField(extension, "addStorage", {
      name: extension.name,
      options: extension.options
    }));
    return extension;
  }
  extend(extendedConfig = {}) {
    const extension = new Extension(extendedConfig);
    extension.parent = this;
    this.child = extension;
    extension.name = extendedConfig.name ? extendedConfig.name : extension.parent.name;
    if (extendedConfig.defaultOptions) {
      console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${extension.name}".`);
    }
    extension.options = callOrReturn(getExtensionField(extension, "addOptions", {
      name: extension.name
    }));
    extension.storage = callOrReturn(getExtensionField(extension, "addStorage", {
      name: extension.name,
      options: extension.options
    }));
    return extension;
  }
}
function getTextBetween(startNode, range, options) {
  const { from: from4, to } = range;
  const { blockSeparator = "\n\n", textSerializers = {} } = options || {};
  let text2 = "";
  let separated = true;
  startNode.nodesBetween(from4, to, (node4, pos, parent, index2) => {
    var _a;
    const textSerializer = textSerializers === null || textSerializers === void 0 ? void 0 : textSerializers[node4.type.name];
    if (textSerializer) {
      if (node4.isBlock && !separated) {
        text2 += blockSeparator;
        separated = true;
      }
      text2 += textSerializer({
        node: node4,
        pos,
        parent,
        index: index2,
        range
      });
    } else if (node4.isText) {
      text2 += (_a = node4 === null || node4 === void 0 ? void 0 : node4.text) === null || _a === void 0 ? void 0 : _a.slice(Math.max(from4, pos) - pos, to - pos);
      separated = false;
    } else if (node4.isBlock && !separated) {
      text2 += blockSeparator;
      separated = true;
    }
  });
  return text2;
}
function getTextSerializersFromSchema(schema) {
  return Object.fromEntries(Object.entries(schema.nodes).filter(([, node4]) => node4.spec.toText).map(([name, node4]) => [name, node4.spec.toText]));
}
const ClipboardTextSerializer = Extension.create({
  name: "clipboardTextSerializer",
  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey("clipboardTextSerializer"),
        props: {
          clipboardTextSerializer: () => {
            const { editor } = this;
            const { state, schema } = editor;
            const { doc: doc2, selection } = state;
            const { ranges } = selection;
            const from4 = Math.min(...ranges.map((range2) => range2.$from.pos));
            const to = Math.max(...ranges.map((range2) => range2.$to.pos));
            const textSerializers = getTextSerializersFromSchema(schema);
            const range = { from: from4, to };
            return getTextBetween(doc2, range, {
              textSerializers
            });
          }
        }
      })
    ];
  }
});
const blur = () => ({ editor, view }) => {
  requestAnimationFrame(() => {
    var _a;
    if (!editor.isDestroyed) {
      view.dom.blur();
      (_a = window === null || window === void 0 ? void 0 : window.getSelection()) === null || _a === void 0 ? void 0 : _a.removeAllRanges();
    }
  });
  return true;
};
var blur$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  blur
});
const clearContent = (emitUpdate = false) => ({ commands }) => {
  return commands.setContent("", emitUpdate);
};
var clearContent$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  clearContent
});
const clearNodes = () => ({ state, tr, dispatch: dispatch2 }) => {
  const { selection } = tr;
  const { ranges } = selection;
  if (!dispatch2) {
    return true;
  }
  ranges.forEach(({ $from, $to }) => {
    state.doc.nodesBetween($from.pos, $to.pos, (node4, pos) => {
      if (node4.type.isText) {
        return;
      }
      const { doc: doc2, mapping } = tr;
      const $mappedFrom = doc2.resolve(mapping.map(pos));
      const $mappedTo = doc2.resolve(mapping.map(pos + node4.nodeSize));
      const nodeRange = $mappedFrom.blockRange($mappedTo);
      if (!nodeRange) {
        return;
      }
      const targetLiftDepth = liftTarget(nodeRange);
      if (node4.type.isTextblock) {
        const { defaultType } = $mappedFrom.parent.contentMatchAt($mappedFrom.index());
        tr.setNodeMarkup(nodeRange.start, defaultType);
      }
      if (targetLiftDepth || targetLiftDepth === 0) {
        tr.lift(nodeRange, targetLiftDepth);
      }
    });
  });
  return true;
};
var clearNodes$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  clearNodes
});
const command = (fn2) => (props) => {
  return fn2(props);
};
var command$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  command
});
const createParagraphNear = () => ({ state, dispatch: dispatch2 }) => {
  return createParagraphNear$2(state, dispatch2);
};
var createParagraphNear$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  createParagraphNear
});
function getNodeType(nameOrType, schema) {
  if (typeof nameOrType === "string") {
    if (!schema.nodes[nameOrType]) {
      throw Error(`There is no node type named '${nameOrType}'. Maybe you forgot to add the extension?`);
    }
    return schema.nodes[nameOrType];
  }
  return nameOrType;
}
const deleteNode = (typeOrName) => ({ tr, state, dispatch: dispatch2 }) => {
  const type = getNodeType(typeOrName, state.schema);
  const $pos = tr.selection.$anchor;
  for (let depth = $pos.depth; depth > 0; depth -= 1) {
    const node4 = $pos.node(depth);
    if (node4.type === type) {
      if (dispatch2) {
        const from4 = $pos.before(depth);
        const to = $pos.after(depth);
        tr.delete(from4, to).scrollIntoView();
      }
      return true;
    }
  }
  return false;
};
var deleteNode$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  deleteNode
});
const deleteRange = (range) => ({ tr, dispatch: dispatch2 }) => {
  const { from: from4, to } = range;
  if (dispatch2) {
    tr.delete(from4, to);
  }
  return true;
};
var deleteRange$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  deleteRange
});
const deleteSelection = () => ({ state, dispatch: dispatch2 }) => {
  return deleteSelection$2(state, dispatch2);
};
var deleteSelection$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  deleteSelection
});
const enter = () => ({ commands }) => {
  return commands.keyboardShortcut("Enter");
};
var enter$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  enter
});
const exitCode = () => ({ state, dispatch: dispatch2 }) => {
  return exitCode$2(state, dispatch2);
};
var exitCode$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  exitCode
});
function getMarkType(nameOrType, schema) {
  if (typeof nameOrType === "string") {
    if (!schema.marks[nameOrType]) {
      throw Error(`There is no mark type named '${nameOrType}'. Maybe you forgot to add the extension?`);
    }
    return schema.marks[nameOrType];
  }
  return nameOrType;
}
function isRegExp(value) {
  return Object.prototype.toString.call(value) === "[object RegExp]";
}
function objectIncludes(object1, object2, options = { strict: true }) {
  const keys2 = Object.keys(object2);
  if (!keys2.length) {
    return true;
  }
  return keys2.every((key2) => {
    if (options.strict) {
      return object2[key2] === object1[key2];
    }
    if (isRegExp(object2[key2])) {
      return object2[key2].test(object1[key2]);
    }
    return object2[key2] === object1[key2];
  });
}
function findMarkInSet(marks2, type, attributes = {}) {
  return marks2.find((item) => {
    return item.type === type && objectIncludes(item.attrs, attributes);
  });
}
function isMarkInSet(marks2, type, attributes = {}) {
  return !!findMarkInSet(marks2, type, attributes);
}
function getMarkRange($pos, type, attributes = {}) {
  if (!$pos || !type) {
    return;
  }
  let start4 = $pos.parent.childAfter($pos.parentOffset);
  if ($pos.parentOffset === start4.offset && start4.offset !== 0) {
    start4 = $pos.parent.childBefore($pos.parentOffset);
  }
  if (!start4.node) {
    return;
  }
  const mark3 = findMarkInSet(start4.node.marks, type, attributes);
  if (!mark3) {
    return;
  }
  let startIndex = start4.index;
  let startPos = $pos.start() + start4.offset;
  let endIndex = startIndex + 1;
  let endPos = startPos + start4.node.nodeSize;
  findMarkInSet(start4.node.marks, type, attributes);
  while (startIndex > 0 && mark3.isInSet($pos.parent.child(startIndex - 1).marks)) {
    startIndex -= 1;
    startPos -= $pos.parent.child(startIndex).nodeSize;
  }
  while (endIndex < $pos.parent.childCount && isMarkInSet($pos.parent.child(endIndex).marks, type, attributes)) {
    endPos += $pos.parent.child(endIndex).nodeSize;
    endIndex += 1;
  }
  return {
    from: startPos,
    to: endPos
  };
}
const extendMarkRange = (typeOrName, attributes = {}) => ({ tr, state, dispatch: dispatch2 }) => {
  const type = getMarkType(typeOrName, state.schema);
  const { doc: doc2, selection } = tr;
  const { $from, from: from4, to } = selection;
  if (dispatch2) {
    const range = getMarkRange($from, type, attributes);
    if (range && range.from <= from4 && range.to >= to) {
      const newSelection = TextSelection.create(doc2, range.from, range.to);
      tr.setSelection(newSelection);
    }
  }
  return true;
};
var extendMarkRange$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  extendMarkRange
});
const first = (commands) => (props) => {
  const items = typeof commands === "function" ? commands(props) : commands;
  for (let i2 = 0; i2 < items.length; i2 += 1) {
    if (items[i2](props)) {
      return true;
    }
  }
  return false;
};
var first$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  first
});
function isClass(value) {
  var _a;
  if (((_a = value.constructor) === null || _a === void 0 ? void 0 : _a.toString().substring(0, 5)) !== "class") {
    return false;
  }
  return true;
}
function isObject(value) {
  return value && typeof value === "object" && !Array.isArray(value) && !isClass(value);
}
function isTextSelection(value) {
  return isObject(value) && value instanceof TextSelection;
}
function isiOS() {
  return [
    "iPad Simulator",
    "iPhone Simulator",
    "iPod Simulator",
    "iPad",
    "iPhone",
    "iPod"
  ].includes(navigator.platform) || navigator.userAgent.includes("Mac") && "ontouchend" in document;
}
function minMax(value = 0, min3 = 0, max3 = 0) {
  return Math.min(Math.max(value, min3), max3);
}
function resolveFocusPosition(doc2, position = null) {
  if (!position) {
    return null;
  }
  const selectionAtStart = Selection.atStart(doc2);
  const selectionAtEnd = Selection.atEnd(doc2);
  if (position === "start" || position === true) {
    return selectionAtStart;
  }
  if (position === "end") {
    return selectionAtEnd;
  }
  const minPos = selectionAtStart.from;
  const maxPos = selectionAtEnd.to;
  if (position === "all") {
    return TextSelection.create(doc2, minMax(0, minPos, maxPos), minMax(doc2.content.size, minPos, maxPos));
  }
  return TextSelection.create(doc2, minMax(position, minPos, maxPos), minMax(position, minPos, maxPos));
}
const focus = (position = null, options) => ({ editor, view, tr, dispatch: dispatch2 }) => {
  options = __spreadValues({
    scrollIntoView: true
  }, options);
  const delayedFocus = () => {
    if (isiOS()) {
      view.dom.focus();
    }
    requestAnimationFrame(() => {
      if (!editor.isDestroyed) {
        view.focus();
        if (options === null || options === void 0 ? void 0 : options.scrollIntoView) {
          editor.commands.scrollIntoView();
        }
      }
    });
  };
  if (view.hasFocus() && position === null || position === false) {
    return true;
  }
  if (dispatch2 && position === null && !isTextSelection(editor.state.selection)) {
    delayedFocus();
    return true;
  }
  const selection = resolveFocusPosition(editor.state.doc, position) || editor.state.selection;
  const isSameSelection = editor.state.selection.eq(selection);
  if (dispatch2) {
    if (!isSameSelection) {
      tr.setSelection(selection);
    }
    if (isSameSelection && tr.storedMarks) {
      tr.setStoredMarks(tr.storedMarks);
    }
    delayedFocus();
  }
  return true;
};
var focus$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  focus
});
const forEach = (items, fn2) => (props) => {
  return items.every((item, index2) => fn2(item, __spreadProps(__spreadValues({}, props), { index: index2 })));
};
var forEach$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  forEach
});
const insertContent = (value, options) => ({ tr, commands }) => {
  return commands.insertContentAt({ from: tr.selection.from, to: tr.selection.to }, value, options);
};
var insertContent$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  insertContent
});
function elementFromString(value) {
  const wrappedValue = `<body>${value}</body>`;
  return new window.DOMParser().parseFromString(wrappedValue, "text/html").body;
}
function createNodeFromContent(content2, schema, options) {
  options = __spreadValues({
    slice: true,
    parseOptions: {}
  }, options);
  if (typeof content2 === "object" && content2 !== null) {
    try {
      if (Array.isArray(content2)) {
        return Fragment.fromArray(content2.map((item) => schema.nodeFromJSON(item)));
      }
      return schema.nodeFromJSON(content2);
    } catch (error) {
      console.warn("[tiptap warn]: Invalid content.", "Passed value:", content2, "Error:", error);
      return createNodeFromContent("", schema, options);
    }
  }
  if (typeof content2 === "string") {
    const parser = DOMParser.fromSchema(schema);
    return options.slice ? parser.parseSlice(elementFromString(content2), options.parseOptions).content : parser.parse(elementFromString(content2), options.parseOptions);
  }
  return createNodeFromContent("", schema, options);
}
function selectionToInsertionEnd(tr, startLen, bias) {
  const last = tr.steps.length - 1;
  if (last < startLen) {
    return;
  }
  const step2 = tr.steps[last];
  if (!(step2 instanceof ReplaceStep || step2 instanceof ReplaceAroundStep)) {
    return;
  }
  const map15 = tr.mapping.maps[last];
  let end3 = 0;
  map15.forEach((_from, _to, _newFrom, newTo) => {
    if (end3 === 0) {
      end3 = newTo;
    }
  });
  tr.setSelection(Selection.near(tr.doc.resolve(end3), bias));
}
const isFragment = (nodeOrFragment) => {
  return nodeOrFragment.toString().startsWith("<");
};
const insertContentAt = (position, value, options) => ({ tr, dispatch: dispatch2, editor }) => {
  if (dispatch2) {
    options = __spreadValues({
      parseOptions: {},
      updateSelection: true
    }, options);
    const content2 = createNodeFromContent(value, editor.schema, {
      parseOptions: __spreadValues({
        preserveWhitespace: "full"
      }, options.parseOptions)
    });
    if (content2.toString() === "<>") {
      return true;
    }
    let { from: from4, to } = typeof position === "number" ? { from: position, to: position } : position;
    let isOnlyTextContent = true;
    let isOnlyBlockContent = true;
    const nodes = isFragment(content2) ? content2 : [content2];
    nodes.forEach((node4) => {
      node4.check();
      isOnlyTextContent = isOnlyTextContent ? node4.isText && node4.marks.length === 0 : false;
      isOnlyBlockContent = isOnlyBlockContent ? node4.isBlock : false;
    });
    if (from4 === to && isOnlyBlockContent) {
      const { parent } = tr.doc.resolve(from4);
      const isEmptyTextBlock = parent.isTextblock && !parent.type.spec.code && !parent.childCount;
      if (isEmptyTextBlock) {
        from4 -= 1;
        to += 1;
      }
    }
    if (isOnlyTextContent) {
      tr.insertText(value, from4, to);
    } else {
      tr.replaceWith(from4, to, content2);
    }
    if (options.updateSelection) {
      selectionToInsertionEnd(tr, tr.steps.length - 1, -1);
    }
  }
  return true;
};
var insertContentAt$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  insertContentAt
});
const joinBackward = () => ({ state, dispatch: dispatch2 }) => {
  return joinBackward$2(state, dispatch2);
};
var joinBackward$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  joinBackward
});
const joinForward = () => ({ state, dispatch: dispatch2 }) => {
  return joinForward$2(state, dispatch2);
};
var joinForward$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  joinForward
});
function isMacOS() {
  return typeof navigator !== "undefined" ? /Mac/.test(navigator.platform) : false;
}
function normalizeKeyName(name) {
  const parts = name.split(/-(?!$)/);
  let result2 = parts[parts.length - 1];
  if (result2 === "Space") {
    result2 = " ";
  }
  let alt;
  let ctrl;
  let shift2;
  let meta;
  for (let i2 = 0; i2 < parts.length - 1; i2 += 1) {
    const mod = parts[i2];
    if (/^(cmd|meta|m)$/i.test(mod)) {
      meta = true;
    } else if (/^a(lt)?$/i.test(mod)) {
      alt = true;
    } else if (/^(c|ctrl|control)$/i.test(mod)) {
      ctrl = true;
    } else if (/^s(hift)?$/i.test(mod)) {
      shift2 = true;
    } else if (/^mod$/i.test(mod)) {
      if (isiOS() || isMacOS()) {
        meta = true;
      } else {
        ctrl = true;
      }
    } else {
      throw new Error(`Unrecognized modifier name: ${mod}`);
    }
  }
  if (alt) {
    result2 = `Alt-${result2}`;
  }
  if (ctrl) {
    result2 = `Ctrl-${result2}`;
  }
  if (meta) {
    result2 = `Meta-${result2}`;
  }
  if (shift2) {
    result2 = `Shift-${result2}`;
  }
  return result2;
}
const keyboardShortcut = (name) => ({ editor, view, tr, dispatch: dispatch2 }) => {
  const keys2 = normalizeKeyName(name).split(/-(?!$)/);
  const key2 = keys2.find((item) => !["Alt", "Ctrl", "Meta", "Shift"].includes(item));
  const event = new KeyboardEvent("keydown", {
    key: key2 === "Space" ? " " : key2,
    altKey: keys2.includes("Alt"),
    ctrlKey: keys2.includes("Ctrl"),
    metaKey: keys2.includes("Meta"),
    shiftKey: keys2.includes("Shift"),
    bubbles: true,
    cancelable: true
  });
  const capturedTransaction = editor.captureTransaction(() => {
    view.someProp("handleKeyDown", (f) => f(view, event));
  });
  capturedTransaction === null || capturedTransaction === void 0 ? void 0 : capturedTransaction.steps.forEach((step2) => {
    const newStep = step2.map(tr.mapping);
    if (newStep && dispatch2) {
      tr.maybeStep(newStep);
    }
  });
  return true;
};
var keyboardShortcut$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  keyboardShortcut
});
function isNodeActive(state, typeOrName, attributes = {}) {
  const { from: from4, to, empty: empty2 } = state.selection;
  const type = typeOrName ? getNodeType(typeOrName, state.schema) : null;
  const nodeRanges = [];
  state.doc.nodesBetween(from4, to, (node4, pos) => {
    if (node4.isText) {
      return;
    }
    const relativeFrom = Math.max(from4, pos);
    const relativeTo = Math.min(to, pos + node4.nodeSize);
    nodeRanges.push({
      node: node4,
      from: relativeFrom,
      to: relativeTo
    });
  });
  const selectionRange = to - from4;
  const matchedNodeRanges = nodeRanges.filter((nodeRange) => {
    if (!type) {
      return true;
    }
    return type.name === nodeRange.node.type.name;
  }).filter((nodeRange) => objectIncludes(nodeRange.node.attrs, attributes, { strict: false }));
  if (empty2) {
    return !!matchedNodeRanges.length;
  }
  const range = matchedNodeRanges.reduce((sum, nodeRange) => sum + nodeRange.to - nodeRange.from, 0);
  return range >= selectionRange;
}
const lift = (typeOrName, attributes = {}) => ({ state, dispatch: dispatch2 }) => {
  const type = getNodeType(typeOrName, state.schema);
  const isActive2 = isNodeActive(state, type, attributes);
  if (!isActive2) {
    return false;
  }
  return lift$2(state, dispatch2);
};
var lift$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  lift
});
const liftEmptyBlock = () => ({ state, dispatch: dispatch2 }) => {
  return liftEmptyBlock$2(state, dispatch2);
};
var liftEmptyBlock$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  liftEmptyBlock
});
const liftListItem = (typeOrName) => ({ state, dispatch: dispatch2 }) => {
  const type = getNodeType(typeOrName, state.schema);
  return liftListItem$2(type)(state, dispatch2);
};
var liftListItem$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  liftListItem
});
const newlineInCode = () => ({ state, dispatch: dispatch2 }) => {
  return newlineInCode$2(state, dispatch2);
};
var newlineInCode$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  newlineInCode
});
function getSchemaTypeNameByName(name, schema) {
  if (schema.nodes[name]) {
    return "node";
  }
  if (schema.marks[name]) {
    return "mark";
  }
  return null;
}
function deleteProps(obj, propOrProps) {
  const props = typeof propOrProps === "string" ? [propOrProps] : propOrProps;
  return Object.keys(obj).reduce((newObj, prop2) => {
    if (!props.includes(prop2)) {
      newObj[prop2] = obj[prop2];
    }
    return newObj;
  }, {});
}
const resetAttributes = (typeOrName, attributes) => ({ tr, state, dispatch: dispatch2 }) => {
  let nodeType2 = null;
  let markType = null;
  const schemaType = getSchemaTypeNameByName(typeof typeOrName === "string" ? typeOrName : typeOrName.name, state.schema);
  if (!schemaType) {
    return false;
  }
  if (schemaType === "node") {
    nodeType2 = getNodeType(typeOrName, state.schema);
  }
  if (schemaType === "mark") {
    markType = getMarkType(typeOrName, state.schema);
  }
  if (dispatch2) {
    tr.selection.ranges.forEach((range) => {
      state.doc.nodesBetween(range.$from.pos, range.$to.pos, (node4, pos) => {
        if (nodeType2 && nodeType2 === node4.type) {
          tr.setNodeMarkup(pos, void 0, deleteProps(node4.attrs, attributes));
        }
        if (markType && node4.marks.length) {
          node4.marks.forEach((mark3) => {
            if (markType === mark3.type) {
              tr.addMark(pos, pos + node4.nodeSize, markType.create(deleteProps(mark3.attrs, attributes)));
            }
          });
        }
      });
    });
  }
  return true;
};
var resetAttributes$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  resetAttributes
});
const scrollIntoView = () => ({ tr, dispatch: dispatch2 }) => {
  if (dispatch2) {
    tr.scrollIntoView();
  }
  return true;
};
var scrollIntoView$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  scrollIntoView
});
const selectAll = () => ({ tr, commands }) => {
  return commands.setTextSelection({
    from: 0,
    to: tr.doc.content.size
  });
};
var selectAll$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  selectAll
});
const selectNodeBackward = () => ({ state, dispatch: dispatch2 }) => {
  return selectNodeBackward$2(state, dispatch2);
};
var selectNodeBackward$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  selectNodeBackward
});
const selectNodeForward = () => ({ state, dispatch: dispatch2 }) => {
  return selectNodeForward$2(state, dispatch2);
};
var selectNodeForward$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  selectNodeForward
});
const selectParentNode = () => ({ state, dispatch: dispatch2 }) => {
  return selectParentNode$2(state, dispatch2);
};
var selectParentNode$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  selectParentNode
});
const selectTextblockEnd = () => ({ state, dispatch: dispatch2 }) => {
  return selectTextblockEnd$2(state, dispatch2);
};
var selectTextblockEnd$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  selectTextblockEnd
});
const selectTextblockStart = () => ({ state, dispatch: dispatch2 }) => {
  return selectTextblockStart$2(state, dispatch2);
};
var selectTextblockStart$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  selectTextblockStart
});
function createDocument(content2, schema, parseOptions = {}) {
  return createNodeFromContent(content2, schema, { slice: false, parseOptions });
}
const setContent$1 = (content2, emitUpdate = false, parseOptions = {}) => ({ tr, editor, dispatch: dispatch2 }) => {
  const { doc: doc2 } = tr;
  const document2 = createDocument(content2, editor.schema, parseOptions);
  const selection = TextSelection.create(doc2, 0, doc2.content.size);
  if (dispatch2) {
    tr.setSelection(selection).replaceSelectionWith(document2, false).setMeta("preventUpdate", !emitUpdate);
  }
  return true;
};
var setContent$1$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  setContent: setContent$1
});
function getMarkAttributes(state, typeOrName) {
  const type = getMarkType(typeOrName, state.schema);
  const { from: from4, to, empty: empty2 } = state.selection;
  const marks2 = [];
  if (empty2) {
    if (state.storedMarks) {
      marks2.push(...state.storedMarks);
    }
    marks2.push(...state.selection.$head.marks());
  } else {
    state.doc.nodesBetween(from4, to, (node4) => {
      marks2.push(...node4.marks);
    });
  }
  const mark3 = marks2.find((markItem) => markItem.type.name === type.name);
  if (!mark3) {
    return {};
  }
  return __spreadValues({}, mark3.attrs);
}
const setMark = (typeOrName, attributes = {}) => ({ tr, state, dispatch: dispatch2 }) => {
  const { selection } = tr;
  const { empty: empty2, ranges } = selection;
  const type = getMarkType(typeOrName, state.schema);
  if (dispatch2) {
    if (empty2) {
      const oldAttributes = getMarkAttributes(state, type);
      tr.addStoredMark(type.create(__spreadValues(__spreadValues({}, oldAttributes), attributes)));
    } else {
      ranges.forEach((range) => {
        const from4 = range.$from.pos;
        const to = range.$to.pos;
        state.doc.nodesBetween(from4, to, (node4, pos) => {
          const trimmedFrom = Math.max(pos, from4);
          const trimmedTo = Math.min(pos + node4.nodeSize, to);
          const someHasMark = node4.marks.find((mark3) => mark3.type === type);
          if (someHasMark) {
            node4.marks.forEach((mark3) => {
              if (type === mark3.type) {
                tr.addMark(trimmedFrom, trimmedTo, type.create(__spreadValues(__spreadValues({}, mark3.attrs), attributes)));
              }
            });
          } else {
            tr.addMark(trimmedFrom, trimmedTo, type.create(attributes));
          }
        });
      });
    }
  }
  return true;
};
var setMark$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  setMark
});
const setMeta = (key2, value) => ({ tr }) => {
  tr.setMeta(key2, value);
  return true;
};
var setMeta$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  setMeta
});
const setNode = (typeOrName, attributes = {}) => ({ state, dispatch: dispatch2, chain }) => {
  const type = getNodeType(typeOrName, state.schema);
  if (!type.isTextblock) {
    console.warn('[tiptap warn]: Currently "setNode()" only supports text block nodes.');
    return false;
  }
  return chain().command(({ commands }) => {
    const canSetBlock = setBlockType(type, attributes)(state);
    if (canSetBlock) {
      return true;
    }
    return commands.clearNodes();
  }).command(({ state: updatedState }) => {
    return setBlockType(type, attributes)(updatedState, dispatch2);
  }).run();
};
var setNode$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  setNode
});
const setNodeSelection = (position) => ({ tr, dispatch: dispatch2 }) => {
  if (dispatch2) {
    const { doc: doc2 } = tr;
    const minPos = Selection.atStart(doc2).from;
    const maxPos = Selection.atEnd(doc2).to;
    const resolvedPos = minMax(position, minPos, maxPos);
    const selection = NodeSelection.create(doc2, resolvedPos);
    tr.setSelection(selection);
  }
  return true;
};
var setNodeSelection$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  setNodeSelection
});
const setTextSelection = (position) => ({ tr, dispatch: dispatch2 }) => {
  if (dispatch2) {
    const { doc: doc2 } = tr;
    const { from: from4, to } = typeof position === "number" ? { from: position, to: position } : position;
    const minPos = TextSelection.atStart(doc2).from;
    const maxPos = TextSelection.atEnd(doc2).to;
    const resolvedFrom = minMax(from4, minPos, maxPos);
    const resolvedEnd = minMax(to, minPos, maxPos);
    const selection = TextSelection.create(doc2, resolvedFrom, resolvedEnd);
    tr.setSelection(selection);
  }
  return true;
};
var setTextSelection$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  setTextSelection
});
const sinkListItem = (typeOrName) => ({ state, dispatch: dispatch2 }) => {
  const type = getNodeType(typeOrName, state.schema);
  return sinkListItem$2(type)(state, dispatch2);
};
var sinkListItem$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  sinkListItem
});
function getSplittedAttributes(extensionAttributes, typeName, attributes) {
  return Object.fromEntries(Object.entries(attributes).filter(([name]) => {
    const extensionAttribute = extensionAttributes.find((item) => {
      return item.type === typeName && item.name === name;
    });
    if (!extensionAttribute) {
      return false;
    }
    return extensionAttribute.attribute.keepOnSplit;
  }));
}
function defaultBlockAt$1(match) {
  for (let i2 = 0; i2 < match.edgeCount; i2 += 1) {
    const { type } = match.edge(i2);
    if (type.isTextblock && !type.hasRequiredAttrs()) {
      return type;
    }
  }
  return null;
}
function ensureMarks(state, splittableMarks) {
  const marks2 = state.storedMarks || state.selection.$to.parentOffset && state.selection.$from.marks();
  if (marks2) {
    const filteredMarks = marks2.filter((mark3) => splittableMarks === null || splittableMarks === void 0 ? void 0 : splittableMarks.includes(mark3.type.name));
    state.tr.ensureMarks(filteredMarks);
  }
}
const splitBlock = ({ keepMarks = true } = {}) => ({ tr, state, dispatch: dispatch2, editor }) => {
  const { selection, doc: doc2 } = tr;
  const { $from, $to } = selection;
  const extensionAttributes = editor.extensionManager.attributes;
  const newAttributes = getSplittedAttributes(extensionAttributes, $from.node().type.name, $from.node().attrs);
  if (selection instanceof NodeSelection && selection.node.isBlock) {
    if (!$from.parentOffset || !canSplit(doc2, $from.pos)) {
      return false;
    }
    if (dispatch2) {
      if (keepMarks) {
        ensureMarks(state, editor.extensionManager.splittableMarks);
      }
      tr.split($from.pos).scrollIntoView();
    }
    return true;
  }
  if (!$from.parent.isBlock) {
    return false;
  }
  if (dispatch2) {
    const atEnd2 = $to.parentOffset === $to.parent.content.size;
    if (selection instanceof TextSelection) {
      tr.deleteSelection();
    }
    const deflt = $from.depth === 0 ? void 0 : defaultBlockAt$1($from.node(-1).contentMatchAt($from.indexAfter(-1)));
    let types = atEnd2 && deflt ? [{
      type: deflt,
      attrs: newAttributes
    }] : void 0;
    let can = canSplit(tr.doc, tr.mapping.map($from.pos), 1, types);
    if (!types && !can && canSplit(tr.doc, tr.mapping.map($from.pos), 1, deflt ? [{ type: deflt }] : void 0)) {
      can = true;
      types = deflt ? [{
        type: deflt,
        attrs: newAttributes
      }] : void 0;
    }
    if (can) {
      tr.split(tr.mapping.map($from.pos), 1, types);
      if (deflt && !atEnd2 && !$from.parentOffset && $from.parent.type !== deflt) {
        const first2 = tr.mapping.map($from.before());
        const $first = tr.doc.resolve(first2);
        if ($from.node(-1).canReplaceWith($first.index(), $first.index() + 1, deflt)) {
          tr.setNodeMarkup(tr.mapping.map($from.before()), deflt);
        }
      }
    }
    if (keepMarks) {
      ensureMarks(state, editor.extensionManager.splittableMarks);
    }
    tr.scrollIntoView();
  }
  return true;
};
var splitBlock$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  splitBlock
});
const splitListItem = (typeOrName) => ({ tr, state, dispatch: dispatch2, editor }) => {
  var _a;
  const type = getNodeType(typeOrName, state.schema);
  const { $from, $to } = state.selection;
  const node4 = state.selection.node;
  if (node4 && node4.isBlock || $from.depth < 2 || !$from.sameParent($to)) {
    return false;
  }
  const grandParent = $from.node(-1);
  if (grandParent.type !== type) {
    return false;
  }
  const extensionAttributes = editor.extensionManager.attributes;
  if ($from.parent.content.size === 0 && $from.node(-1).childCount === $from.indexAfter(-1)) {
    if ($from.depth === 2 || $from.node(-3).type !== type || $from.index(-2) !== $from.node(-2).childCount - 1) {
      return false;
    }
    if (dispatch2) {
      let wrap = Fragment.empty;
      const depthBefore = $from.index(-1) ? 1 : $from.index(-2) ? 2 : 3;
      for (let d = $from.depth - depthBefore; d >= $from.depth - 3; d -= 1) {
        wrap = Fragment.from($from.node(d).copy(wrap));
      }
      const depthAfter = $from.indexAfter(-1) < $from.node(-2).childCount ? 1 : $from.indexAfter(-2) < $from.node(-3).childCount ? 2 : 3;
      const newNextTypeAttributes2 = getSplittedAttributes(extensionAttributes, $from.node().type.name, $from.node().attrs);
      const nextType2 = ((_a = type.contentMatch.defaultType) === null || _a === void 0 ? void 0 : _a.createAndFill(newNextTypeAttributes2)) || void 0;
      wrap = wrap.append(Fragment.from(type.createAndFill(null, nextType2) || void 0));
      const start4 = $from.before($from.depth - (depthBefore - 1));
      tr.replace(start4, $from.after(-depthAfter), new Slice(wrap, 4 - depthBefore, 0));
      let sel = -1;
      tr.doc.nodesBetween(start4, tr.doc.content.size, (n, pos) => {
        if (sel > -1) {
          return false;
        }
        if (n.isTextblock && n.content.size === 0) {
          sel = pos + 1;
        }
      });
      if (sel > -1) {
        tr.setSelection(TextSelection.near(tr.doc.resolve(sel)));
      }
      tr.scrollIntoView();
    }
    return true;
  }
  const nextType = $to.pos === $from.end() ? grandParent.contentMatchAt(0).defaultType : null;
  const newTypeAttributes = getSplittedAttributes(extensionAttributes, grandParent.type.name, grandParent.attrs);
  const newNextTypeAttributes = getSplittedAttributes(extensionAttributes, $from.node().type.name, $from.node().attrs);
  tr.delete($from.pos, $to.pos);
  const types = nextType ? [{ type, attrs: newTypeAttributes }, { type: nextType, attrs: newNextTypeAttributes }] : [{ type, attrs: newTypeAttributes }];
  if (!canSplit(tr.doc, $from.pos, 2)) {
    return false;
  }
  if (dispatch2) {
    tr.split($from.pos, 2, types).scrollIntoView();
  }
  return true;
};
var splitListItem$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  splitListItem
});
function findParentNodeClosestToPos($pos, predicate) {
  for (let i2 = $pos.depth; i2 > 0; i2 -= 1) {
    const node4 = $pos.node(i2);
    if (predicate(node4)) {
      return {
        pos: i2 > 0 ? $pos.before(i2) : 0,
        start: $pos.start(i2),
        depth: i2,
        node: node4
      };
    }
  }
}
function findParentNode(predicate) {
  return (selection) => findParentNodeClosestToPos(selection.$from, predicate);
}
function splitExtensions(extensions2) {
  const baseExtensions = extensions2.filter((extension) => extension.type === "extension");
  const nodeExtensions = extensions2.filter((extension) => extension.type === "node");
  const markExtensions = extensions2.filter((extension) => extension.type === "mark");
  return {
    baseExtensions,
    nodeExtensions,
    markExtensions
  };
}
function isList(name, extensions2) {
  const { nodeExtensions } = splitExtensions(extensions2);
  const extension = nodeExtensions.find((item) => item.name === name);
  if (!extension) {
    return false;
  }
  const context = {
    name: extension.name,
    options: extension.options,
    storage: extension.storage
  };
  const group = callOrReturn(getExtensionField(extension, "group", context));
  if (typeof group !== "string") {
    return false;
  }
  return group.split(" ").includes("list");
}
const joinListBackwards = (tr, listType) => {
  const list = findParentNode((node4) => node4.type === listType)(tr.selection);
  if (!list) {
    return true;
  }
  const before2 = tr.doc.resolve(Math.max(0, list.pos - 1)).before(list.depth);
  if (before2 === void 0) {
    return true;
  }
  const nodeBefore = tr.doc.nodeAt(before2);
  const canJoinBackwards = list.node.type === (nodeBefore === null || nodeBefore === void 0 ? void 0 : nodeBefore.type) && canJoin(tr.doc, list.pos);
  if (!canJoinBackwards) {
    return true;
  }
  tr.join(list.pos);
  return true;
};
const joinListForwards = (tr, listType) => {
  const list = findParentNode((node4) => node4.type === listType)(tr.selection);
  if (!list) {
    return true;
  }
  const after2 = tr.doc.resolve(list.start).after(list.depth);
  if (after2 === void 0) {
    return true;
  }
  const nodeAfter = tr.doc.nodeAt(after2);
  const canJoinForwards = list.node.type === (nodeAfter === null || nodeAfter === void 0 ? void 0 : nodeAfter.type) && canJoin(tr.doc, after2);
  if (!canJoinForwards) {
    return true;
  }
  tr.join(after2);
  return true;
};
const toggleList = (listTypeOrName, itemTypeOrName) => ({ editor, tr, state, dispatch: dispatch2, chain, commands, can }) => {
  const { extensions: extensions2 } = editor.extensionManager;
  const listType = getNodeType(listTypeOrName, state.schema);
  const itemType = getNodeType(itemTypeOrName, state.schema);
  const { selection } = state;
  const { $from, $to } = selection;
  const range = $from.blockRange($to);
  if (!range) {
    return false;
  }
  const parentList = findParentNode((node4) => isList(node4.type.name, extensions2))(selection);
  if (range.depth >= 1 && parentList && range.depth - parentList.depth <= 1) {
    if (parentList.node.type === listType) {
      return commands.liftListItem(itemType);
    }
    if (isList(parentList.node.type.name, extensions2) && listType.validContent(parentList.node.content) && dispatch2) {
      return chain().command(() => {
        tr.setNodeMarkup(parentList.pos, listType);
        return true;
      }).command(() => joinListBackwards(tr, listType)).command(() => joinListForwards(tr, listType)).run();
    }
  }
  return chain().command(() => {
    const canWrapInList = can().wrapInList(listType);
    if (canWrapInList) {
      return true;
    }
    return commands.clearNodes();
  }).wrapInList(listType).command(() => joinListBackwards(tr, listType)).command(() => joinListForwards(tr, listType)).run();
};
var toggleList$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  toggleList
});
function isMarkActive(state, typeOrName, attributes = {}) {
  const { empty: empty2, ranges } = state.selection;
  const type = typeOrName ? getMarkType(typeOrName, state.schema) : null;
  if (empty2) {
    return !!(state.storedMarks || state.selection.$from.marks()).filter((mark3) => {
      if (!type) {
        return true;
      }
      return type.name === mark3.type.name;
    }).find((mark3) => objectIncludes(mark3.attrs, attributes, { strict: false }));
  }
  let selectionRange = 0;
  const markRanges = [];
  ranges.forEach(({ $from, $to }) => {
    const from4 = $from.pos;
    const to = $to.pos;
    state.doc.nodesBetween(from4, to, (node4, pos) => {
      if (!node4.isText && !node4.marks.length) {
        return;
      }
      const relativeFrom = Math.max(from4, pos);
      const relativeTo = Math.min(to, pos + node4.nodeSize);
      const range2 = relativeTo - relativeFrom;
      selectionRange += range2;
      markRanges.push(...node4.marks.map((mark3) => ({
        mark: mark3,
        from: relativeFrom,
        to: relativeTo
      })));
    });
  });
  if (selectionRange === 0) {
    return false;
  }
  const matchedRange = markRanges.filter((markRange) => {
    if (!type) {
      return true;
    }
    return type.name === markRange.mark.type.name;
  }).filter((markRange) => objectIncludes(markRange.mark.attrs, attributes, { strict: false })).reduce((sum, markRange) => sum + markRange.to - markRange.from, 0);
  const excludedRange = markRanges.filter((markRange) => {
    if (!type) {
      return true;
    }
    return markRange.mark.type !== type && markRange.mark.type.excludes(type);
  }).reduce((sum, markRange) => sum + markRange.to - markRange.from, 0);
  const range = matchedRange > 0 ? matchedRange + excludedRange : matchedRange;
  return range >= selectionRange;
}
const toggleMark = (typeOrName, attributes = {}, options = {}) => ({ state, commands }) => {
  const { extendEmptyMarkRange = false } = options;
  const type = getMarkType(typeOrName, state.schema);
  const isActive2 = isMarkActive(state, type, attributes);
  if (isActive2) {
    return commands.unsetMark(type, { extendEmptyMarkRange });
  }
  return commands.setMark(type, attributes);
};
var toggleMark$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  toggleMark
});
const toggleNode = (typeOrName, toggleTypeOrName, attributes = {}) => ({ state, commands }) => {
  const type = getNodeType(typeOrName, state.schema);
  const toggleType = getNodeType(toggleTypeOrName, state.schema);
  const isActive2 = isNodeActive(state, type, attributes);
  if (isActive2) {
    return commands.setNode(toggleType);
  }
  return commands.setNode(type, attributes);
};
var toggleNode$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  toggleNode
});
const toggleWrap = (typeOrName, attributes = {}) => ({ state, commands }) => {
  const type = getNodeType(typeOrName, state.schema);
  const isActive2 = isNodeActive(state, type, attributes);
  if (isActive2) {
    return commands.lift(type);
  }
  return commands.wrapIn(type, attributes);
};
var toggleWrap$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  toggleWrap
});
const undoInputRule = () => ({ state, dispatch: dispatch2 }) => {
  const plugins = state.plugins;
  for (let i2 = 0; i2 < plugins.length; i2 += 1) {
    const plugin = plugins[i2];
    let undoable;
    if (plugin.spec.isInputRules && (undoable = plugin.getState(state))) {
      if (dispatch2) {
        const tr = state.tr;
        const toUndo = undoable.transform;
        for (let j = toUndo.steps.length - 1; j >= 0; j -= 1) {
          tr.step(toUndo.steps[j].invert(toUndo.docs[j]));
        }
        if (undoable.text) {
          const marks2 = tr.doc.resolve(undoable.from).marks();
          tr.replaceWith(undoable.from, undoable.to, state.schema.text(undoable.text, marks2));
        } else {
          tr.delete(undoable.from, undoable.to);
        }
      }
      return true;
    }
  }
  return false;
};
var undoInputRule$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  undoInputRule
});
const unsetAllMarks = () => ({ tr, dispatch: dispatch2 }) => {
  const { selection } = tr;
  const { empty: empty2, ranges } = selection;
  if (empty2) {
    return true;
  }
  if (dispatch2) {
    ranges.forEach((range) => {
      tr.removeMark(range.$from.pos, range.$to.pos);
    });
  }
  return true;
};
var unsetAllMarks$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  unsetAllMarks
});
const unsetMark = (typeOrName, options = {}) => ({ tr, state, dispatch: dispatch2 }) => {
  var _a;
  const { extendEmptyMarkRange = false } = options;
  const { selection } = tr;
  const type = getMarkType(typeOrName, state.schema);
  const { $from, empty: empty2, ranges } = selection;
  if (!dispatch2) {
    return true;
  }
  if (empty2 && extendEmptyMarkRange) {
    let { from: from4, to } = selection;
    const attrs = (_a = $from.marks().find((mark3) => mark3.type === type)) === null || _a === void 0 ? void 0 : _a.attrs;
    const range = getMarkRange($from, type, attrs);
    if (range) {
      from4 = range.from;
      to = range.to;
    }
    tr.removeMark(from4, to, type);
  } else {
    ranges.forEach((range) => {
      tr.removeMark(range.$from.pos, range.$to.pos, type);
    });
  }
  tr.removeStoredMark(type);
  return true;
};
var unsetMark$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  unsetMark
});
const updateAttributes = (typeOrName, attributes = {}) => ({ tr, state, dispatch: dispatch2 }) => {
  let nodeType2 = null;
  let markType = null;
  const schemaType = getSchemaTypeNameByName(typeof typeOrName === "string" ? typeOrName : typeOrName.name, state.schema);
  if (!schemaType) {
    return false;
  }
  if (schemaType === "node") {
    nodeType2 = getNodeType(typeOrName, state.schema);
  }
  if (schemaType === "mark") {
    markType = getMarkType(typeOrName, state.schema);
  }
  if (dispatch2) {
    tr.selection.ranges.forEach((range) => {
      const from4 = range.$from.pos;
      const to = range.$to.pos;
      state.doc.nodesBetween(from4, to, (node4, pos) => {
        if (nodeType2 && nodeType2 === node4.type) {
          tr.setNodeMarkup(pos, void 0, __spreadValues(__spreadValues({}, node4.attrs), attributes));
        }
        if (markType && node4.marks.length) {
          node4.marks.forEach((mark3) => {
            if (markType === mark3.type) {
              const trimmedFrom = Math.max(pos, from4);
              const trimmedTo = Math.min(pos + node4.nodeSize, to);
              tr.addMark(trimmedFrom, trimmedTo, markType.create(__spreadValues(__spreadValues({}, mark3.attrs), attributes)));
            }
          });
        }
      });
    });
  }
  return true;
};
var updateAttributes$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  updateAttributes
});
const wrapIn = (typeOrName, attributes = {}) => ({ state, dispatch: dispatch2 }) => {
  const type = getNodeType(typeOrName, state.schema);
  return wrapIn$2(type, attributes)(state, dispatch2);
};
var wrapIn$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  wrapIn
});
const wrapInList = (typeOrName, attributes = {}) => ({ state, dispatch: dispatch2 }) => {
  const type = getNodeType(typeOrName, state.schema);
  return wrapInList$2(type, attributes)(state, dispatch2);
};
var wrapInList$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  wrapInList
});
const Commands = Extension.create({
  name: "commands",
  addCommands() {
    return __spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues({}, blur$1), clearContent$1), clearNodes$1), command$1), createParagraphNear$1), deleteNode$1), deleteRange$1), deleteSelection$1), enter$1), exitCode$1), extendMarkRange$1), first$1), focus$1), forEach$1), insertContent$1), insertContentAt$1), joinBackward$1), joinForward$1), keyboardShortcut$1), lift$1), liftEmptyBlock$1), liftListItem$1), newlineInCode$1), resetAttributes$1), scrollIntoView$1), selectAll$1), selectNodeBackward$1), selectNodeForward$1), selectParentNode$1), selectTextblockEnd$1), selectTextblockStart$1), setContent$1$1), setMark$1), setMeta$1), setNode$1), setNodeSelection$1), setTextSelection$1), sinkListItem$1), splitBlock$1), splitListItem$1), toggleList$1), toggleMark$1), toggleNode$1), toggleWrap$1), undoInputRule$1), unsetAllMarks$1), unsetMark$1), updateAttributes$1), wrapIn$1), wrapInList$1);
  }
});
const Editable = Extension.create({
  name: "editable",
  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey("editable"),
        props: {
          editable: () => this.editor.options.editable
        }
      })
    ];
  }
});
const FocusEvents = Extension.create({
  name: "focusEvents",
  addProseMirrorPlugins() {
    const { editor } = this;
    return [
      new Plugin({
        key: new PluginKey("focusEvents"),
        props: {
          handleDOMEvents: {
            focus: (view, event) => {
              editor.isFocused = true;
              const transaction = editor.state.tr.setMeta("focus", { event }).setMeta("addToHistory", false);
              view.dispatch(transaction);
              return false;
            },
            blur: (view, event) => {
              editor.isFocused = false;
              const transaction = editor.state.tr.setMeta("blur", { event }).setMeta("addToHistory", false);
              view.dispatch(transaction);
              return false;
            }
          }
        }
      })
    ];
  }
});
function createChainableState(config) {
  const { state, transaction } = config;
  let { selection } = transaction;
  let { doc: doc2 } = transaction;
  let { storedMarks } = transaction;
  return __spreadProps(__spreadValues({}, state), {
    schema: state.schema,
    plugins: state.plugins,
    apply: state.apply.bind(state),
    applyTransaction: state.applyTransaction.bind(state),
    reconfigure: state.reconfigure.bind(state),
    toJSON: state.toJSON.bind(state),
    get storedMarks() {
      return storedMarks;
    },
    get selection() {
      return selection;
    },
    get doc() {
      return doc2;
    },
    get tr() {
      selection = transaction.selection;
      doc2 = transaction.doc;
      storedMarks = transaction.storedMarks;
      return transaction;
    }
  });
}
class CommandManager {
  constructor(props) {
    this.editor = props.editor;
    this.rawCommands = this.editor.extensionManager.commands;
    this.customState = props.state;
  }
  get hasCustomState() {
    return !!this.customState;
  }
  get state() {
    return this.customState || this.editor.state;
  }
  get commands() {
    const { rawCommands, editor, state } = this;
    const { view } = editor;
    const { tr } = state;
    const props = this.buildProps(tr);
    return Object.fromEntries(Object.entries(rawCommands).map(([name, command2]) => {
      const method = (...args) => {
        const callback = command2(...args)(props);
        if (!tr.getMeta("preventDispatch") && !this.hasCustomState) {
          view.dispatch(tr);
        }
        return callback;
      };
      return [name, method];
    }));
  }
  get chain() {
    return () => this.createChain();
  }
  get can() {
    return () => this.createCan();
  }
  createChain(startTr, shouldDispatch = true) {
    const { rawCommands, editor, state } = this;
    const { view } = editor;
    const callbacks = [];
    const hasStartTransaction = !!startTr;
    const tr = startTr || state.tr;
    const run2 = () => {
      if (!hasStartTransaction && shouldDispatch && !tr.getMeta("preventDispatch") && !this.hasCustomState) {
        view.dispatch(tr);
      }
      return callbacks.every((callback) => callback === true);
    };
    const chain = __spreadProps(__spreadValues({}, Object.fromEntries(Object.entries(rawCommands).map(([name, command2]) => {
      const chainedCommand = (...args) => {
        const props = this.buildProps(tr, shouldDispatch);
        const callback = command2(...args)(props);
        callbacks.push(callback);
        return chain;
      };
      return [name, chainedCommand];
    }))), {
      run: run2
    });
    return chain;
  }
  createCan(startTr) {
    const { rawCommands, state } = this;
    const dispatch2 = void 0;
    const tr = startTr || state.tr;
    const props = this.buildProps(tr, dispatch2);
    const formattedCommands = Object.fromEntries(Object.entries(rawCommands).map(([name, command2]) => {
      return [name, (...args) => command2(...args)(__spreadProps(__spreadValues({}, props), { dispatch: dispatch2 }))];
    }));
    return __spreadProps(__spreadValues({}, formattedCommands), {
      chain: () => this.createChain(tr, dispatch2)
    });
  }
  buildProps(tr, shouldDispatch = true) {
    const { rawCommands, editor, state } = this;
    const { view } = editor;
    if (state.storedMarks) {
      tr.setStoredMarks(state.storedMarks);
    }
    const props = {
      tr,
      editor,
      view,
      state: createChainableState({
        state,
        transaction: tr
      }),
      dispatch: shouldDispatch ? () => void 0 : void 0,
      chain: () => this.createChain(tr),
      can: () => this.createCan(tr),
      get commands() {
        return Object.fromEntries(Object.entries(rawCommands).map(([name, command2]) => {
          return [name, (...args) => command2(...args)(props)];
        }));
      }
    };
    return props;
  }
}
const Keymap = Extension.create({
  name: "keymap",
  addKeyboardShortcuts() {
    const handleBackspace = () => this.editor.commands.first(({ commands }) => [
      () => commands.undoInputRule(),
      () => commands.command(({ tr }) => {
        const { selection, doc: doc2 } = tr;
        const { empty: empty2, $anchor } = selection;
        const { pos, parent } = $anchor;
        const isAtStart = Selection.atStart(doc2).from === pos;
        if (!empty2 || !isAtStart || !parent.type.isTextblock || parent.textContent.length) {
          return false;
        }
        return commands.clearNodes();
      }),
      () => commands.deleteSelection(),
      () => commands.joinBackward(),
      () => commands.selectNodeBackward()
    ]);
    const handleDelete = () => this.editor.commands.first(({ commands }) => [
      () => commands.deleteSelection(),
      () => commands.joinForward(),
      () => commands.selectNodeForward()
    ]);
    const handleEnter = () => this.editor.commands.first(({ commands }) => [
      () => commands.newlineInCode(),
      () => commands.createParagraphNear(),
      () => commands.liftEmptyBlock(),
      () => commands.splitBlock()
    ]);
    const baseKeymap = {
      Enter: handleEnter,
      "Mod-Enter": () => this.editor.commands.exitCode(),
      Backspace: handleBackspace,
      "Mod-Backspace": handleBackspace,
      "Shift-Backspace": handleBackspace,
      Delete: handleDelete,
      "Mod-Delete": handleDelete,
      "Mod-a": () => this.editor.commands.selectAll()
    };
    const pcKeymap = __spreadValues({}, baseKeymap);
    const macKeymap = __spreadProps(__spreadValues({}, baseKeymap), {
      "Ctrl-h": handleBackspace,
      "Alt-Backspace": handleBackspace,
      "Ctrl-d": handleDelete,
      "Ctrl-Alt-Backspace": handleDelete,
      "Alt-Delete": handleDelete,
      "Alt-d": handleDelete,
      "Ctrl-a": () => this.editor.commands.selectTextblockStart(),
      "Ctrl-e": () => this.editor.commands.selectTextblockEnd()
    });
    if (isiOS() || isMacOS()) {
      return macKeymap;
    }
    return pcKeymap;
  },
  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey("clearDocument"),
        appendTransaction: (transactions, oldState, newState) => {
          const docChanges = transactions.some((transaction) => transaction.docChanged) && !oldState.doc.eq(newState.doc);
          if (!docChanges) {
            return;
          }
          const { empty: empty2, from: from4, to } = oldState.selection;
          const allFrom = Selection.atStart(oldState.doc).from;
          const allEnd = Selection.atEnd(oldState.doc).to;
          const allWasSelected = from4 === allFrom && to === allEnd;
          const isEmpty = newState.doc.textBetween(0, newState.doc.content.size, " ", " ").length === 0;
          if (empty2 || !allWasSelected || !isEmpty) {
            return;
          }
          const tr = newState.tr;
          const state = createChainableState({
            state: newState,
            transaction: tr
          });
          const { commands } = new CommandManager({
            editor: this.editor,
            state
          });
          commands.clearNodes();
          if (!tr.steps.length) {
            return;
          }
          return tr;
        }
      })
    ];
  }
});
const Tabindex = Extension.create({
  name: "tabindex",
  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey("tabindex"),
        props: {
          attributes: () => {
            if (this.editor.isEditable) {
              return {
                tabindex: "0"
              };
            }
          }
        }
      })
    ];
  }
});
var extensions = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ClipboardTextSerializer,
  Commands,
  Editable,
  FocusEvents,
  Keymap,
  Tabindex
});
function getNodeAttributes(state, typeOrName) {
  const type = getNodeType(typeOrName, state.schema);
  const { from: from4, to } = state.selection;
  const nodes = [];
  state.doc.nodesBetween(from4, to, (node5) => {
    nodes.push(node5);
  });
  const node4 = nodes.reverse().find((nodeItem) => nodeItem.type.name === type.name);
  if (!node4) {
    return {};
  }
  return __spreadValues({}, node4.attrs);
}
function getAttributes(state, typeOrName) {
  const schemaType = getSchemaTypeNameByName(typeof typeOrName === "string" ? typeOrName : typeOrName.name, state.schema);
  if (schemaType === "node") {
    return getNodeAttributes(state, typeOrName);
  }
  if (schemaType === "mark") {
    return getMarkAttributes(state, typeOrName);
  }
  return {};
}
function isActive(state, name, attributes = {}) {
  if (!name) {
    return isNodeActive(state, null, attributes) || isMarkActive(state, null, attributes);
  }
  const schemaType = getSchemaTypeNameByName(name, state.schema);
  if (schemaType === "node") {
    return isNodeActive(state, name, attributes);
  }
  if (schemaType === "mark") {
    return isMarkActive(state, name, attributes);
  }
  return false;
}
function getHTMLFromFragment(fragment, schema) {
  const documentFragment = DOMSerializer.fromSchema(schema).serializeFragment(fragment);
  const temporaryDocument = document.implementation.createHTMLDocument();
  const container = temporaryDocument.createElement("div");
  container.appendChild(documentFragment);
  return container.innerHTML;
}
function getText(node4, options) {
  const range = {
    from: 0,
    to: node4.content.size
  };
  return getTextBetween(node4, range, options);
}
function isNodeEmpty(node4) {
  var _a;
  const defaultContent = (_a = node4.type.createAndFill()) === null || _a === void 0 ? void 0 : _a.toJSON();
  const content2 = node4.toJSON();
  return JSON.stringify(defaultContent) === JSON.stringify(content2);
}
function createStyleTag(style2, nonce) {
  const tipTapStyleTag = document.querySelector("style[data-tiptap-style]");
  if (tipTapStyleTag !== null) {
    return tipTapStyleTag;
  }
  const styleNode = document.createElement("style");
  if (nonce) {
    styleNode.setAttribute("nonce", nonce);
  }
  styleNode.setAttribute("data-tiptap-style", "");
  styleNode.innerHTML = style2;
  document.getElementsByTagName("head")[0].appendChild(styleNode);
  return styleNode;
}
class InputRule {
  constructor(config) {
    this.find = config.find;
    this.handler = config.handler;
  }
}
const inputRuleMatcherHandler = (text2, find2) => {
  if (isRegExp(find2)) {
    return find2.exec(text2);
  }
  const inputRuleMatch = find2(text2);
  if (!inputRuleMatch) {
    return null;
  }
  const result2 = [];
  result2.push(inputRuleMatch.text);
  result2.index = inputRuleMatch.index;
  result2.input = text2;
  result2.data = inputRuleMatch.data;
  if (inputRuleMatch.replaceWith) {
    if (!inputRuleMatch.text.includes(inputRuleMatch.replaceWith)) {
      console.warn('[tiptap warn]: "inputRuleMatch.replaceWith" must be part of "inputRuleMatch.text".');
    }
    result2.push(inputRuleMatch.replaceWith);
  }
  return result2;
};
function run$1(config) {
  var _a;
  const { editor, from: from4, to, text: text2, rules, plugin } = config;
  const { view } = editor;
  if (view.composing) {
    return false;
  }
  const $from = view.state.doc.resolve(from4);
  if ($from.parent.type.spec.code || !!((_a = $from.nodeBefore || $from.nodeAfter) === null || _a === void 0 ? void 0 : _a.marks.find((mark3) => mark3.type.spec.code))) {
    return false;
  }
  let matched = false;
  const maxMatch = 500;
  const textBefore = $from.parent.textBetween(Math.max(0, $from.parentOffset - maxMatch), $from.parentOffset, void 0, " ") + text2;
  rules.forEach((rule) => {
    if (matched) {
      return;
    }
    const match = inputRuleMatcherHandler(textBefore, rule.find);
    if (!match) {
      return;
    }
    const tr = view.state.tr;
    const state = createChainableState({
      state: view.state,
      transaction: tr
    });
    const range = {
      from: from4 - (match[0].length - text2.length),
      to
    };
    const { commands, chain, can } = new CommandManager({
      editor,
      state
    });
    const handler = rule.handler({
      state,
      range,
      match,
      commands,
      chain,
      can
    });
    if (handler === null || !tr.steps.length) {
      return;
    }
    tr.setMeta(plugin, {
      transform: tr,
      from: from4,
      to,
      text: text2
    });
    view.dispatch(tr);
    matched = true;
  });
  return matched;
}
function inputRulesPlugin(props) {
  const { editor, rules } = props;
  const plugin = new Plugin({
    state: {
      init() {
        return null;
      },
      apply(tr, prev) {
        const stored = tr.getMeta(this);
        if (stored) {
          return stored;
        }
        return tr.selectionSet || tr.docChanged ? null : prev;
      }
    },
    props: {
      handleTextInput(view, from4, to, text2) {
        return run$1({
          editor,
          from: from4,
          to,
          text: text2,
          rules,
          plugin
        });
      },
      handleDOMEvents: {
        compositionend: (view) => {
          setTimeout(() => {
            const { $cursor } = view.state.selection;
            if ($cursor) {
              run$1({
                editor,
                from: $cursor.pos,
                to: $cursor.pos,
                text: "",
                rules,
                plugin
              });
            }
          });
          return false;
        }
      },
      handleKeyDown(view, event) {
        if (event.key !== "Enter") {
          return false;
        }
        const { $cursor } = view.state.selection;
        if ($cursor) {
          return run$1({
            editor,
            from: $cursor.pos,
            to: $cursor.pos,
            text: "\n",
            rules,
            plugin
          });
        }
        return false;
      }
    },
    isInputRules: true
  });
  return plugin;
}
function isNumber(value) {
  return typeof value === "number";
}
class PasteRule {
  constructor(config) {
    this.find = config.find;
    this.handler = config.handler;
  }
}
const pasteRuleMatcherHandler = (text2, find2) => {
  if (isRegExp(find2)) {
    return [...text2.matchAll(find2)];
  }
  const matches2 = find2(text2);
  if (!matches2) {
    return [];
  }
  return matches2.map((pasteRuleMatch) => {
    const result2 = [];
    result2.push(pasteRuleMatch.text);
    result2.index = pasteRuleMatch.index;
    result2.input = text2;
    result2.data = pasteRuleMatch.data;
    if (pasteRuleMatch.replaceWith) {
      if (!pasteRuleMatch.text.includes(pasteRuleMatch.replaceWith)) {
        console.warn('[tiptap warn]: "pasteRuleMatch.replaceWith" must be part of "pasteRuleMatch.text".');
      }
      result2.push(pasteRuleMatch.replaceWith);
    }
    return result2;
  });
};
function run(config) {
  const { editor, state, from: from4, to, rule } = config;
  const { commands, chain, can } = new CommandManager({
    editor,
    state
  });
  const handlers2 = [];
  state.doc.nodesBetween(from4, to, (node4, pos) => {
    if (!node4.isTextblock || node4.type.spec.code) {
      return;
    }
    const resolvedFrom = Math.max(from4, pos);
    const resolvedTo = Math.min(to, pos + node4.content.size);
    const textToMatch = node4.textBetween(resolvedFrom - pos, resolvedTo - pos, void 0, "\uFFFC");
    const matches2 = pasteRuleMatcherHandler(textToMatch, rule.find);
    matches2.forEach((match) => {
      if (match.index === void 0) {
        return;
      }
      const start4 = resolvedFrom + match.index + 1;
      const end3 = start4 + match[0].length;
      const range = {
        from: state.tr.mapping.map(start4),
        to: state.tr.mapping.map(end3)
      };
      const handler = rule.handler({
        state,
        range,
        match,
        commands,
        chain,
        can
      });
      handlers2.push(handler);
    });
  });
  const success = handlers2.every((handler) => handler !== null);
  return success;
}
function pasteRulesPlugin(props) {
  const { editor, rules } = props;
  let dragSourceElement = null;
  let isPastedFromProseMirror = false;
  let isDroppedFromProseMirror = false;
  const plugins = rules.map((rule) => {
    return new Plugin({
      view(view) {
        const handleDragstart = (event) => {
          var _a;
          dragSourceElement = ((_a = view.dom.parentElement) === null || _a === void 0 ? void 0 : _a.contains(event.target)) ? view.dom.parentElement : null;
        };
        window.addEventListener("dragstart", handleDragstart);
        return {
          destroy() {
            window.removeEventListener("dragstart", handleDragstart);
          }
        };
      },
      props: {
        handleDOMEvents: {
          drop: (view) => {
            isDroppedFromProseMirror = dragSourceElement === view.dom.parentElement;
            return false;
          },
          paste: (view, event) => {
            var _a;
            const html = (_a = event.clipboardData) === null || _a === void 0 ? void 0 : _a.getData("text/html");
            isPastedFromProseMirror = !!(html === null || html === void 0 ? void 0 : html.includes("data-pm-slice"));
            return false;
          }
        }
      },
      appendTransaction: (transactions, oldState, state) => {
        const transaction = transactions[0];
        const isPaste = transaction.getMeta("uiEvent") === "paste" && !isPastedFromProseMirror;
        const isDrop = transaction.getMeta("uiEvent") === "drop" && !isDroppedFromProseMirror;
        if (!isPaste && !isDrop) {
          return;
        }
        const from4 = oldState.doc.content.findDiffStart(state.doc.content);
        const to = oldState.doc.content.findDiffEnd(state.doc.content);
        if (!isNumber(from4) || !to || from4 === to.b) {
          return;
        }
        const tr = state.tr;
        const chainableState = createChainableState({
          state,
          transaction: tr
        });
        const handler = run({
          editor,
          state: chainableState,
          from: Math.max(from4 - 1, 0),
          to: to.b,
          rule
        });
        if (!handler || !tr.steps.length) {
          return;
        }
        return tr;
      }
    });
  });
  return plugins;
}
function getAttributesFromExtensions(extensions2) {
  const extensionAttributes = [];
  const { nodeExtensions, markExtensions } = splitExtensions(extensions2);
  const nodeAndMarkExtensions = [...nodeExtensions, ...markExtensions];
  const defaultAttribute = {
    default: null,
    rendered: true,
    renderHTML: null,
    parseHTML: null,
    keepOnSplit: true
  };
  extensions2.forEach((extension) => {
    const context = {
      name: extension.name,
      options: extension.options,
      storage: extension.storage
    };
    const addGlobalAttributes = getExtensionField(extension, "addGlobalAttributes", context);
    if (!addGlobalAttributes) {
      return;
    }
    const globalAttributes = addGlobalAttributes();
    globalAttributes.forEach((globalAttribute) => {
      globalAttribute.types.forEach((type) => {
        Object.entries(globalAttribute.attributes).forEach(([name, attribute]) => {
          extensionAttributes.push({
            type,
            name,
            attribute: __spreadValues(__spreadValues({}, defaultAttribute), attribute)
          });
        });
      });
    });
  });
  nodeAndMarkExtensions.forEach((extension) => {
    const context = {
      name: extension.name,
      options: extension.options,
      storage: extension.storage
    };
    const addAttributes = getExtensionField(extension, "addAttributes", context);
    if (!addAttributes) {
      return;
    }
    const attributes = addAttributes();
    Object.entries(attributes).forEach(([name, attribute]) => {
      extensionAttributes.push({
        type: extension.name,
        name,
        attribute: __spreadValues(__spreadValues({}, defaultAttribute), attribute)
      });
    });
  });
  return extensionAttributes;
}
function mergeAttributes(...objects) {
  return objects.filter((item) => !!item).reduce((items, item) => {
    const mergedAttributes = __spreadValues({}, items);
    Object.entries(item).forEach(([key2, value]) => {
      const exists = mergedAttributes[key2];
      if (!exists) {
        mergedAttributes[key2] = value;
        return;
      }
      if (key2 === "class") {
        mergedAttributes[key2] = [mergedAttributes[key2], value].join(" ");
      } else if (key2 === "style") {
        mergedAttributes[key2] = [mergedAttributes[key2], value].join("; ");
      } else {
        mergedAttributes[key2] = value;
      }
    });
    return mergedAttributes;
  }, {});
}
function getRenderedAttributes(nodeOrMark, extensionAttributes) {
  return extensionAttributes.filter((item) => item.attribute.rendered).map((item) => {
    if (!item.attribute.renderHTML) {
      return {
        [item.name]: nodeOrMark.attrs[item.name]
      };
    }
    return item.attribute.renderHTML(nodeOrMark.attrs) || {};
  }).reduce((attributes, attribute) => mergeAttributes(attributes, attribute), {});
}
function isEmptyObject(value = {}) {
  return Object.keys(value).length === 0 && value.constructor === Object;
}
function fromString(value) {
  if (typeof value !== "string") {
    return value;
  }
  if (value.match(/^[+-]?(?:\d*\.)?\d+$/)) {
    return Number(value);
  }
  if (value === "true") {
    return true;
  }
  if (value === "false") {
    return false;
  }
  return value;
}
function injectExtensionAttributesToParseRule(parseRule2, extensionAttributes) {
  if (parseRule2.style) {
    return parseRule2;
  }
  return __spreadProps(__spreadValues({}, parseRule2), {
    getAttrs: (node4) => {
      const oldAttributes = parseRule2.getAttrs ? parseRule2.getAttrs(node4) : parseRule2.attrs;
      if (oldAttributes === false) {
        return false;
      }
      const newAttributes = extensionAttributes.reduce((items, item) => {
        const value = item.attribute.parseHTML ? item.attribute.parseHTML(node4) : fromString(node4.getAttribute(item.name));
        if (value === null || value === void 0) {
          return items;
        }
        return __spreadProps(__spreadValues({}, items), {
          [item.name]: value
        });
      }, {});
      return __spreadValues(__spreadValues({}, oldAttributes), newAttributes);
    }
  });
}
function cleanUpSchemaItem(data) {
  return Object.fromEntries(Object.entries(data).filter(([key2, value]) => {
    if (key2 === "attrs" && isEmptyObject(value)) {
      return false;
    }
    return value !== null && value !== void 0;
  }));
}
function getSchemaByResolvedExtensions(extensions2) {
  var _a;
  const allAttributes = getAttributesFromExtensions(extensions2);
  const { nodeExtensions, markExtensions } = splitExtensions(extensions2);
  const topNode = (_a = nodeExtensions.find((extension) => getExtensionField(extension, "topNode"))) === null || _a === void 0 ? void 0 : _a.name;
  const nodes = Object.fromEntries(nodeExtensions.map((extension) => {
    const extensionAttributes = allAttributes.filter((attribute) => attribute.type === extension.name);
    const context = {
      name: extension.name,
      options: extension.options,
      storage: extension.storage
    };
    const extraNodeFields = extensions2.reduce((fields, e) => {
      const extendNodeSchema = getExtensionField(e, "extendNodeSchema", context);
      return __spreadValues(__spreadValues({}, fields), extendNodeSchema ? extendNodeSchema(extension) : {});
    }, {});
    const schema = cleanUpSchemaItem(__spreadProps(__spreadValues({}, extraNodeFields), {
      content: callOrReturn(getExtensionField(extension, "content", context)),
      marks: callOrReturn(getExtensionField(extension, "marks", context)),
      group: callOrReturn(getExtensionField(extension, "group", context)),
      inline: callOrReturn(getExtensionField(extension, "inline", context)),
      atom: callOrReturn(getExtensionField(extension, "atom", context)),
      selectable: callOrReturn(getExtensionField(extension, "selectable", context)),
      draggable: callOrReturn(getExtensionField(extension, "draggable", context)),
      code: callOrReturn(getExtensionField(extension, "code", context)),
      defining: callOrReturn(getExtensionField(extension, "defining", context)),
      isolating: callOrReturn(getExtensionField(extension, "isolating", context)),
      attrs: Object.fromEntries(extensionAttributes.map((extensionAttribute) => {
        var _a2;
        return [extensionAttribute.name, { default: (_a2 = extensionAttribute === null || extensionAttribute === void 0 ? void 0 : extensionAttribute.attribute) === null || _a2 === void 0 ? void 0 : _a2.default }];
      }))
    }));
    const parseHTML = callOrReturn(getExtensionField(extension, "parseHTML", context));
    if (parseHTML) {
      schema.parseDOM = parseHTML.map((parseRule2) => injectExtensionAttributesToParseRule(parseRule2, extensionAttributes));
    }
    const renderHTML = getExtensionField(extension, "renderHTML", context);
    if (renderHTML) {
      schema.toDOM = (node4) => renderHTML({
        node: node4,
        HTMLAttributes: getRenderedAttributes(node4, extensionAttributes)
      });
    }
    const renderText = getExtensionField(extension, "renderText", context);
    if (renderText) {
      schema.toText = renderText;
    }
    return [extension.name, schema];
  }));
  const marks2 = Object.fromEntries(markExtensions.map((extension) => {
    const extensionAttributes = allAttributes.filter((attribute) => attribute.type === extension.name);
    const context = {
      name: extension.name,
      options: extension.options,
      storage: extension.storage
    };
    const extraMarkFields = extensions2.reduce((fields, e) => {
      const extendMarkSchema = getExtensionField(e, "extendMarkSchema", context);
      return __spreadValues(__spreadValues({}, fields), extendMarkSchema ? extendMarkSchema(extension) : {});
    }, {});
    const schema = cleanUpSchemaItem(__spreadProps(__spreadValues({}, extraMarkFields), {
      inclusive: callOrReturn(getExtensionField(extension, "inclusive", context)),
      excludes: callOrReturn(getExtensionField(extension, "excludes", context)),
      group: callOrReturn(getExtensionField(extension, "group", context)),
      spanning: callOrReturn(getExtensionField(extension, "spanning", context)),
      code: callOrReturn(getExtensionField(extension, "code", context)),
      attrs: Object.fromEntries(extensionAttributes.map((extensionAttribute) => {
        var _a2;
        return [extensionAttribute.name, { default: (_a2 = extensionAttribute === null || extensionAttribute === void 0 ? void 0 : extensionAttribute.attribute) === null || _a2 === void 0 ? void 0 : _a2.default }];
      }))
    }));
    const parseHTML = callOrReturn(getExtensionField(extension, "parseHTML", context));
    if (parseHTML) {
      schema.parseDOM = parseHTML.map((parseRule2) => injectExtensionAttributesToParseRule(parseRule2, extensionAttributes));
    }
    const renderHTML = getExtensionField(extension, "renderHTML", context);
    if (renderHTML) {
      schema.toDOM = (mark3) => renderHTML({
        mark: mark3,
        HTMLAttributes: getRenderedAttributes(mark3, extensionAttributes)
      });
    }
    return [extension.name, schema];
  }));
  return new Schema({
    topNode,
    nodes,
    marks: marks2
  });
}
function getSchemaTypeByName(name, schema) {
  return schema.nodes[name] || schema.marks[name] || null;
}
function isExtensionRulesEnabled(extension, enabled) {
  if (Array.isArray(enabled)) {
    return enabled.some((enabledExtension) => {
      const name = typeof enabledExtension === "string" ? enabledExtension : enabledExtension.name;
      return name === extension.name;
    });
  }
  return enabled;
}
function findDuplicates(items) {
  const filtered = items.filter((el, index2) => items.indexOf(el) !== index2);
  return [...new Set(filtered)];
}
class ExtensionManager {
  constructor(extensions2, editor) {
    this.splittableMarks = [];
    this.editor = editor;
    this.extensions = ExtensionManager.resolve(extensions2);
    this.schema = getSchemaByResolvedExtensions(this.extensions);
    this.extensions.forEach((extension) => {
      var _a;
      this.editor.extensionStorage[extension.name] = extension.storage;
      const context = {
        name: extension.name,
        options: extension.options,
        storage: extension.storage,
        editor: this.editor,
        type: getSchemaTypeByName(extension.name, this.schema)
      };
      if (extension.type === "mark") {
        const keepOnSplit = (_a = callOrReturn(getExtensionField(extension, "keepOnSplit", context))) !== null && _a !== void 0 ? _a : true;
        if (keepOnSplit) {
          this.splittableMarks.push(extension.name);
        }
      }
      const onBeforeCreate = getExtensionField(extension, "onBeforeCreate", context);
      if (onBeforeCreate) {
        this.editor.on("beforeCreate", onBeforeCreate);
      }
      const onCreate2 = getExtensionField(extension, "onCreate", context);
      if (onCreate2) {
        this.editor.on("create", onCreate2);
      }
      const onUpdate = getExtensionField(extension, "onUpdate", context);
      if (onUpdate) {
        this.editor.on("update", onUpdate);
      }
      const onSelectionUpdate = getExtensionField(extension, "onSelectionUpdate", context);
      if (onSelectionUpdate) {
        this.editor.on("selectionUpdate", onSelectionUpdate);
      }
      const onTransaction = getExtensionField(extension, "onTransaction", context);
      if (onTransaction) {
        this.editor.on("transaction", onTransaction);
      }
      const onFocus = getExtensionField(extension, "onFocus", context);
      if (onFocus) {
        this.editor.on("focus", onFocus);
      }
      const onBlur = getExtensionField(extension, "onBlur", context);
      if (onBlur) {
        this.editor.on("blur", onBlur);
      }
      const onDestroy2 = getExtensionField(extension, "onDestroy", context);
      if (onDestroy2) {
        this.editor.on("destroy", onDestroy2);
      }
    });
  }
  static resolve(extensions2) {
    const resolvedExtensions = ExtensionManager.sort(ExtensionManager.flatten(extensions2));
    const duplicatedNames = findDuplicates(resolvedExtensions.map((extension) => extension.name));
    if (duplicatedNames.length) {
      console.warn(`[tiptap warn]: Duplicate extension names found: [${duplicatedNames.map((item) => `'${item}'`).join(", ")}]. This can lead to issues.`);
    }
    return resolvedExtensions;
  }
  static flatten(extensions2) {
    return extensions2.map((extension) => {
      const context = {
        name: extension.name,
        options: extension.options,
        storage: extension.storage
      };
      const addExtensions = getExtensionField(extension, "addExtensions", context);
      if (addExtensions) {
        return [
          extension,
          ...this.flatten(addExtensions())
        ];
      }
      return extension;
    }).flat(10);
  }
  static sort(extensions2) {
    const defaultPriority = 100;
    return extensions2.sort((a2, b) => {
      const priorityA = getExtensionField(a2, "priority") || defaultPriority;
      const priorityB = getExtensionField(b, "priority") || defaultPriority;
      if (priorityA > priorityB) {
        return -1;
      }
      if (priorityA < priorityB) {
        return 1;
      }
      return 0;
    });
  }
  get commands() {
    return this.extensions.reduce((commands, extension) => {
      const context = {
        name: extension.name,
        options: extension.options,
        storage: extension.storage,
        editor: this.editor,
        type: getSchemaTypeByName(extension.name, this.schema)
      };
      const addCommands = getExtensionField(extension, "addCommands", context);
      if (!addCommands) {
        return commands;
      }
      return __spreadValues(__spreadValues({}, commands), addCommands());
    }, {});
  }
  get plugins() {
    const { editor } = this;
    const extensions2 = ExtensionManager.sort([...this.extensions].reverse());
    const inputRules = [];
    const pasteRules = [];
    const allPlugins = extensions2.map((extension) => {
      const context = {
        name: extension.name,
        options: extension.options,
        storage: extension.storage,
        editor,
        type: getSchemaTypeByName(extension.name, this.schema)
      };
      const plugins = [];
      const addKeyboardShortcuts = getExtensionField(extension, "addKeyboardShortcuts", context);
      if (addKeyboardShortcuts) {
        const bindings = Object.fromEntries(Object.entries(addKeyboardShortcuts()).map(([shortcut, method]) => {
          return [shortcut, () => method({ editor })];
        }));
        const keyMapPlugin = keymap(bindings);
        plugins.push(keyMapPlugin);
      }
      const addInputRules = getExtensionField(extension, "addInputRules", context);
      if (isExtensionRulesEnabled(extension, editor.options.enableInputRules) && addInputRules) {
        inputRules.push(...addInputRules());
      }
      const addPasteRules = getExtensionField(extension, "addPasteRules", context);
      if (isExtensionRulesEnabled(extension, editor.options.enablePasteRules) && addPasteRules) {
        pasteRules.push(...addPasteRules());
      }
      const addProseMirrorPlugins = getExtensionField(extension, "addProseMirrorPlugins", context);
      if (addProseMirrorPlugins) {
        const proseMirrorPlugins = addProseMirrorPlugins();
        plugins.push(...proseMirrorPlugins);
      }
      return plugins;
    }).flat();
    return [
      inputRulesPlugin({
        editor,
        rules: inputRules
      }),
      ...pasteRulesPlugin({
        editor,
        rules: pasteRules
      }),
      ...allPlugins
    ];
  }
  get attributes() {
    return getAttributesFromExtensions(this.extensions);
  }
  get nodeViews() {
    const { editor } = this;
    const { nodeExtensions } = splitExtensions(this.extensions);
    return Object.fromEntries(nodeExtensions.filter((extension) => !!getExtensionField(extension, "addNodeView")).map((extension) => {
      const extensionAttributes = this.attributes.filter((attribute) => attribute.type === extension.name);
      const context = {
        name: extension.name,
        options: extension.options,
        storage: extension.storage,
        editor,
        type: getNodeType(extension.name, this.schema)
      };
      const addNodeView = getExtensionField(extension, "addNodeView", context);
      if (!addNodeView) {
        return [];
      }
      const nodeview = (node4, view, getPos, decorations) => {
        const HTMLAttributes = getRenderedAttributes(node4, extensionAttributes);
        return addNodeView()({
          editor,
          node: node4,
          getPos,
          decorations,
          HTMLAttributes,
          extension
        });
      };
      return [extension.name, nodeview];
    }));
  }
}
class EventEmitter {
  constructor() {
    this.callbacks = {};
  }
  on(event, fn2) {
    if (!this.callbacks[event]) {
      this.callbacks[event] = [];
    }
    this.callbacks[event].push(fn2);
    return this;
  }
  emit(event, ...args) {
    const callbacks = this.callbacks[event];
    if (callbacks) {
      callbacks.forEach((callback) => callback.apply(this, args));
    }
    return this;
  }
  off(event, fn2) {
    const callbacks = this.callbacks[event];
    if (callbacks) {
      if (fn2) {
        this.callbacks[event] = callbacks.filter((callback) => callback !== fn2);
      } else {
        delete this.callbacks[event];
      }
    }
    return this;
  }
  removeAllListeners() {
    this.callbacks = {};
  }
}
const style = `.ProseMirror {
  position: relative;
}

.ProseMirror {
  word-wrap: break-word;
  white-space: pre-wrap;
  white-space: break-spaces;
  -webkit-font-variant-ligatures: none;
  font-variant-ligatures: none;
  font-feature-settings: "liga" 0; /* the above doesn't seem to work in Edge */
}

.ProseMirror [contenteditable="false"] {
  white-space: normal;
}

.ProseMirror [contenteditable="false"] [contenteditable="true"] {
  white-space: pre-wrap;
}

.ProseMirror pre {
  white-space: pre-wrap;
}

img.ProseMirror-separator {
  display: inline !important;
  border: none !important;
  margin: 0 !important;
  width: 1px !important;
  height: 1px !important;
}

.ProseMirror-gapcursor {
  display: none;
  pointer-events: none;
  position: absolute;
  margin: 0;
}

.ProseMirror-gapcursor:after {
  content: "";
  display: block;
  position: absolute;
  top: -2px;
  width: 20px;
  border-top: 1px solid black;
  animation: ProseMirror-cursor-blink 1.1s steps(2, start) infinite;
}

@keyframes ProseMirror-cursor-blink {
  to {
    visibility: hidden;
  }
}

.ProseMirror-hideselection *::selection {
  background: transparent;
}

.ProseMirror-hideselection *::-moz-selection {
  background: transparent;
}

.ProseMirror-hideselection * {
  caret-color: transparent;
}

.ProseMirror-focused .ProseMirror-gapcursor {
  display: block;
}

.tippy-box[data-animation=fade][data-state=hidden] {
  opacity: 0
}`;
class Editor$1 extends EventEmitter {
  constructor(options = {}) {
    super();
    this.isFocused = false;
    this.extensionStorage = {};
    this.options = {
      element: document.createElement("div"),
      content: "",
      injectCSS: true,
      injectNonce: void 0,
      extensions: [],
      autofocus: false,
      editable: true,
      editorProps: {},
      parseOptions: {},
      enableInputRules: true,
      enablePasteRules: true,
      enableCoreExtensions: true,
      onBeforeCreate: () => null,
      onCreate: () => null,
      onUpdate: () => null,
      onSelectionUpdate: () => null,
      onTransaction: () => null,
      onFocus: () => null,
      onBlur: () => null,
      onDestroy: () => null
    };
    this.isCapturingTransaction = false;
    this.capturedTransaction = null;
    this.setOptions(options);
    this.createExtensionManager();
    this.createCommandManager();
    this.createSchema();
    this.on("beforeCreate", this.options.onBeforeCreate);
    this.emit("beforeCreate", { editor: this });
    this.createView();
    this.injectCSS();
    this.on("create", this.options.onCreate);
    this.on("update", this.options.onUpdate);
    this.on("selectionUpdate", this.options.onSelectionUpdate);
    this.on("transaction", this.options.onTransaction);
    this.on("focus", this.options.onFocus);
    this.on("blur", this.options.onBlur);
    this.on("destroy", this.options.onDestroy);
    window.setTimeout(() => {
      if (this.isDestroyed) {
        return;
      }
      this.commands.focus(this.options.autofocus);
      this.emit("create", { editor: this });
    }, 0);
  }
  get storage() {
    return this.extensionStorage;
  }
  get commands() {
    return this.commandManager.commands;
  }
  chain() {
    return this.commandManager.chain();
  }
  can() {
    return this.commandManager.can();
  }
  injectCSS() {
    if (this.options.injectCSS && document) {
      this.css = createStyleTag(style, this.options.injectNonce);
    }
  }
  setOptions(options = {}) {
    this.options = __spreadValues(__spreadValues({}, this.options), options);
    if (!this.view || !this.state || this.isDestroyed) {
      return;
    }
    if (this.options.editorProps) {
      this.view.setProps(this.options.editorProps);
    }
    this.view.updateState(this.state);
  }
  setEditable(editable) {
    this.setOptions({ editable });
  }
  get isEditable() {
    return this.options.editable && this.view && this.view.editable;
  }
  get state() {
    return this.view.state;
  }
  registerPlugin(plugin, handlePlugins) {
    const plugins = isFunction(handlePlugins) ? handlePlugins(plugin, this.state.plugins) : [...this.state.plugins, plugin];
    const state = this.state.reconfigure({ plugins });
    this.view.updateState(state);
  }
  unregisterPlugin(nameOrPluginKey) {
    if (this.isDestroyed) {
      return;
    }
    const name = typeof nameOrPluginKey === "string" ? `${nameOrPluginKey}$` : nameOrPluginKey.key;
    const state = this.state.reconfigure({
      plugins: this.state.plugins.filter((plugin) => !plugin.key.startsWith(name))
    });
    this.view.updateState(state);
  }
  createExtensionManager() {
    const coreExtensions = this.options.enableCoreExtensions ? Object.values(extensions) : [];
    const allExtensions = [...coreExtensions, ...this.options.extensions].filter((extension) => {
      return ["extension", "node", "mark"].includes(extension === null || extension === void 0 ? void 0 : extension.type);
    });
    this.extensionManager = new ExtensionManager(allExtensions, this);
  }
  createCommandManager() {
    this.commandManager = new CommandManager({
      editor: this
    });
  }
  createSchema() {
    this.schema = this.extensionManager.schema;
  }
  createView() {
    const doc2 = createDocument(this.options.content, this.schema, this.options.parseOptions);
    const selection = resolveFocusPosition(doc2, this.options.autofocus);
    this.view = new EditorView(this.options.element, __spreadProps(__spreadValues({}, this.options.editorProps), {
      dispatchTransaction: this.dispatchTransaction.bind(this),
      state: EditorState.create({
        doc: doc2,
        selection
      })
    }));
    const newState = this.state.reconfigure({
      plugins: this.extensionManager.plugins
    });
    this.view.updateState(newState);
    this.createNodeViews();
    const dom = this.view.dom;
    dom.editor = this;
  }
  createNodeViews() {
    this.view.setProps({
      nodeViews: this.extensionManager.nodeViews
    });
  }
  captureTransaction(fn2) {
    this.isCapturingTransaction = true;
    fn2();
    this.isCapturingTransaction = false;
    const tr = this.capturedTransaction;
    this.capturedTransaction = null;
    return tr;
  }
  dispatchTransaction(transaction) {
    if (this.isCapturingTransaction) {
      if (!this.capturedTransaction) {
        this.capturedTransaction = transaction;
        return;
      }
      transaction.steps.forEach((step2) => {
        var _a;
        return (_a = this.capturedTransaction) === null || _a === void 0 ? void 0 : _a.step(step2);
      });
      return;
    }
    const state = this.state.apply(transaction);
    const selectionHasChanged = !this.state.selection.eq(state.selection);
    this.view.updateState(state);
    this.emit("transaction", {
      editor: this,
      transaction
    });
    if (selectionHasChanged) {
      this.emit("selectionUpdate", {
        editor: this,
        transaction
      });
    }
    const focus3 = transaction.getMeta("focus");
    const blur2 = transaction.getMeta("blur");
    if (focus3) {
      this.emit("focus", {
        editor: this,
        event: focus3.event,
        transaction
      });
    }
    if (blur2) {
      this.emit("blur", {
        editor: this,
        event: blur2.event,
        transaction
      });
    }
    if (!transaction.docChanged || transaction.getMeta("preventUpdate")) {
      return;
    }
    this.emit("update", {
      editor: this,
      transaction
    });
  }
  getAttributes(nameOrType) {
    return getAttributes(this.state, nameOrType);
  }
  isActive(nameOrAttributes, attributesOrUndefined) {
    const name = typeof nameOrAttributes === "string" ? nameOrAttributes : null;
    const attributes = typeof nameOrAttributes === "string" ? attributesOrUndefined : nameOrAttributes;
    return isActive(this.state, name, attributes);
  }
  getJSON() {
    return this.state.doc.toJSON();
  }
  getHTML() {
    return getHTMLFromFragment(this.state.doc.content, this.schema);
  }
  getText(options) {
    const { blockSeparator = "\n\n", textSerializers = {} } = options || {};
    return getText(this.state.doc, {
      blockSeparator,
      textSerializers: __spreadValues(__spreadValues({}, textSerializers), getTextSerializersFromSchema(this.schema))
    });
  }
  get isEmpty() {
    return isNodeEmpty(this.state.doc);
  }
  getCharacterCount() {
    console.warn('[tiptap warn]: "editor.getCharacterCount()" is deprecated. Please use "editor.storage.characterCount.characters()" instead.');
    return this.state.doc.content.size - 2;
  }
  destroy() {
    this.emit("destroy");
    if (this.view) {
      this.view.destroy();
    }
    this.removeAllListeners();
  }
  get isDestroyed() {
    var _a;
    return !((_a = this.view) === null || _a === void 0 ? void 0 : _a.docView);
  }
}
class Node {
  constructor(config = {}) {
    this.type = "node";
    this.name = "node";
    this.parent = null;
    this.child = null;
    this.config = {
      name: this.name,
      defaultOptions: {}
    };
    this.config = __spreadValues(__spreadValues({}, this.config), config);
    this.name = this.config.name;
    if (config.defaultOptions) {
      console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${this.name}".`);
    }
    this.options = this.config.defaultOptions;
    if (this.config.addOptions) {
      this.options = callOrReturn(getExtensionField(this, "addOptions", {
        name: this.name
      }));
    }
    this.storage = callOrReturn(getExtensionField(this, "addStorage", {
      name: this.name,
      options: this.options
    })) || {};
  }
  static create(config = {}) {
    return new Node(config);
  }
  configure(options = {}) {
    const extension = this.extend();
    extension.options = mergeDeep(this.options, options);
    extension.storage = callOrReturn(getExtensionField(extension, "addStorage", {
      name: extension.name,
      options: extension.options
    }));
    return extension;
  }
  extend(extendedConfig = {}) {
    const extension = new Node(extendedConfig);
    extension.parent = this;
    this.child = extension;
    extension.name = extendedConfig.name ? extendedConfig.name : extension.parent.name;
    if (extendedConfig.defaultOptions) {
      console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${extension.name}".`);
    }
    extension.options = callOrReturn(getExtensionField(extension, "addOptions", {
      name: extension.name
    }));
    extension.storage = callOrReturn(getExtensionField(extension, "addStorage", {
      name: extension.name,
      options: extension.options
    }));
    return extension;
  }
}
class Mark {
  constructor(config = {}) {
    this.type = "mark";
    this.name = "mark";
    this.parent = null;
    this.child = null;
    this.config = {
      name: this.name,
      defaultOptions: {}
    };
    this.config = __spreadValues(__spreadValues({}, this.config), config);
    this.name = this.config.name;
    if (config.defaultOptions) {
      console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${this.name}".`);
    }
    this.options = this.config.defaultOptions;
    if (this.config.addOptions) {
      this.options = callOrReturn(getExtensionField(this, "addOptions", {
        name: this.name
      }));
    }
    this.storage = callOrReturn(getExtensionField(this, "addStorage", {
      name: this.name,
      options: this.options
    })) || {};
  }
  static create(config = {}) {
    return new Mark(config);
  }
  configure(options = {}) {
    const extension = this.extend();
    extension.options = mergeDeep(this.options, options);
    extension.storage = callOrReturn(getExtensionField(extension, "addStorage", {
      name: extension.name,
      options: extension.options
    }));
    return extension;
  }
  extend(extendedConfig = {}) {
    const extension = new Mark(extendedConfig);
    extension.parent = this;
    this.child = extension;
    extension.name = extendedConfig.name ? extendedConfig.name : extension.parent.name;
    if (extendedConfig.defaultOptions) {
      console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${extension.name}".`);
    }
    extension.options = callOrReturn(getExtensionField(extension, "addOptions", {
      name: extension.name
    }));
    extension.storage = callOrReturn(getExtensionField(extension, "addStorage", {
      name: extension.name,
      options: extension.options
    }));
    return extension;
  }
}
function nodeInputRule(config) {
  return new InputRule({
    find: config.find,
    handler: ({ state, range, match }) => {
      const attributes = callOrReturn(config.getAttributes, void 0, match) || {};
      const { tr } = state;
      const start4 = range.from;
      let end3 = range.to;
      if (match[1]) {
        const offset3 = match[0].lastIndexOf(match[1]);
        let matchStart = start4 + offset3;
        if (matchStart > end3) {
          matchStart = end3;
        } else {
          end3 = matchStart + match[1].length;
        }
        const lastChar = match[0][match[0].length - 1];
        tr.insertText(lastChar, start4 + match[0].length - 1);
        tr.replaceWith(matchStart, end3, config.type.create(attributes));
      } else if (match[0]) {
        tr.replaceWith(start4, end3, config.type.create(attributes));
      }
    }
  });
}
function getMarksBetween(from4, to, doc2) {
  const marks2 = [];
  if (from4 === to) {
    doc2.resolve(from4).marks().forEach((mark3) => {
      const $pos = doc2.resolve(from4 - 1);
      const range = getMarkRange($pos, mark3.type);
      if (!range) {
        return;
      }
      marks2.push(__spreadValues({
        mark: mark3
      }, range));
    });
  } else {
    doc2.nodesBetween(from4, to, (node4, pos) => {
      marks2.push(...node4.marks.map((mark3) => ({
        from: pos,
        to: pos + node4.nodeSize,
        mark: mark3
      })));
    });
  }
  return marks2;
}
function markInputRule(config) {
  return new InputRule({
    find: config.find,
    handler: ({ state, range, match }) => {
      const attributes = callOrReturn(config.getAttributes, void 0, match);
      if (attributes === false || attributes === null) {
        return null;
      }
      const { tr } = state;
      const captureGroup = match[match.length - 1];
      const fullMatch = match[0];
      let markEnd = range.to;
      if (captureGroup) {
        const startSpaces = fullMatch.search(/\S/);
        const textStart = range.from + fullMatch.indexOf(captureGroup);
        const textEnd = textStart + captureGroup.length;
        const excludedMarks = getMarksBetween(range.from, range.to, state.doc).filter((item) => {
          const excluded = item.mark.type.excluded;
          return excluded.find((type) => type === config.type && type !== item.mark.type);
        }).filter((item) => item.to > textStart);
        if (excludedMarks.length) {
          return null;
        }
        if (textEnd < range.to) {
          tr.delete(textEnd, range.to);
        }
        if (textStart > range.from) {
          tr.delete(range.from + startSpaces, textStart);
        }
        markEnd = range.from + startSpaces + captureGroup.length;
        tr.addMark(range.from + startSpaces, markEnd, config.type.create(attributes || {}));
        tr.removeStoredMark(config.type);
      }
    }
  });
}
function textblockTypeInputRule(config) {
  return new InputRule({
    find: config.find,
    handler: ({ state, range, match }) => {
      const $start = state.doc.resolve(range.from);
      const attributes = callOrReturn(config.getAttributes, void 0, match) || {};
      if (!$start.node(-1).canReplaceWith($start.index(-1), $start.indexAfter(-1), config.type)) {
        return null;
      }
      state.tr.delete(range.from, range.to).setBlockType(range.from, range.from, config.type, attributes);
    }
  });
}
function wrappingInputRule(config) {
  return new InputRule({
    find: config.find,
    handler: ({ state, range, match }) => {
      const attributes = callOrReturn(config.getAttributes, void 0, match) || {};
      const tr = state.tr.delete(range.from, range.to);
      const $start = tr.doc.resolve(range.from);
      const blockRange2 = $start.blockRange();
      const wrapping = blockRange2 && findWrapping(blockRange2, config.type, attributes);
      if (!wrapping) {
        return null;
      }
      tr.wrap(blockRange2, wrapping);
      const before2 = tr.doc.resolve(range.from - 1).nodeBefore;
      if (before2 && before2.type === config.type && canJoin(tr.doc, range.from - 1) && (!config.joinPredicate || config.joinPredicate(match, before2))) {
        tr.join(range.from - 1);
      }
    }
  });
}
function markPasteRule(config) {
  return new PasteRule({
    find: config.find,
    handler: ({ state, range, match }) => {
      const attributes = callOrReturn(config.getAttributes, void 0, match);
      if (attributes === false || attributes === null) {
        return null;
      }
      const { tr } = state;
      const captureGroup = match[match.length - 1];
      const fullMatch = match[0];
      let markEnd = range.to;
      if (captureGroup) {
        const startSpaces = fullMatch.search(/\S/);
        const textStart = range.from + fullMatch.indexOf(captureGroup);
        const textEnd = textStart + captureGroup.length;
        const excludedMarks = getMarksBetween(range.from, range.to, state.doc).filter((item) => {
          const excluded = item.mark.type.excluded;
          return excluded.find((type) => type === config.type && type !== item.mark.type);
        }).filter((item) => item.to > textStart);
        if (excludedMarks.length) {
          return null;
        }
        if (textEnd < range.to) {
          tr.delete(textEnd, range.to);
        }
        if (textStart > range.from) {
          tr.delete(range.from + startSpaces, textStart);
        }
        markEnd = range.from + startSpaces + captureGroup.length;
        tr.addMark(range.from + startSpaces, markEnd, config.type.create(attributes || {}));
        tr.removeStoredMark(config.type);
      }
    }
  });
}
function isNodeSelection(value) {
  return isObject(value) && value instanceof NodeSelection;
}
function posToDOMRect(view, from4, to) {
  const minPos = 0;
  const maxPos = view.state.doc.content.size;
  const resolvedFrom = minMax(from4, minPos, maxPos);
  const resolvedEnd = minMax(to, minPos, maxPos);
  const start4 = view.coordsAtPos(resolvedFrom);
  const end3 = view.coordsAtPos(resolvedEnd, -1);
  const top2 = Math.min(start4.top, end3.top);
  const bottom2 = Math.max(start4.bottom, end3.bottom);
  const left2 = Math.min(start4.left, end3.left);
  const right2 = Math.max(start4.right, end3.right);
  const width = right2 - left2;
  const height = bottom2 - top2;
  const x = left2;
  const y = top2;
  const data = {
    top: top2,
    bottom: bottom2,
    left: left2,
    right: right2,
    width,
    height,
    x,
    y
  };
  return __spreadProps(__spreadValues({}, data), {
    toJSON: () => data
  });
}
var top = "top";
var bottom = "bottom";
var right = "right";
var left = "left";
var auto = "auto";
var basePlacements = [top, bottom, right, left];
var start = "start";
var end = "end";
var clippingParents = "clippingParents";
var viewport = "viewport";
var popper = "popper";
var reference = "reference";
var variationPlacements = /* @__PURE__ */ basePlacements.reduce(function(acc, placement) {
  return acc.concat([placement + "-" + start, placement + "-" + end]);
}, []);
var placements = /* @__PURE__ */ [].concat(basePlacements, [auto]).reduce(function(acc, placement) {
  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
}, []);
var beforeRead = "beforeRead";
var read = "read";
var afterRead = "afterRead";
var beforeMain = "beforeMain";
var main = "main";
var afterMain = "afterMain";
var beforeWrite = "beforeWrite";
var write = "write";
var afterWrite = "afterWrite";
var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];
function getNodeName(element) {
  return element ? (element.nodeName || "").toLowerCase() : null;
}
function getWindow(node4) {
  if (node4 == null) {
    return window;
  }
  if (node4.toString() !== "[object Window]") {
    var ownerDocument = node4.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }
  return node4;
}
function isElement$1(node4) {
  var OwnElement = getWindow(node4).Element;
  return node4 instanceof OwnElement || node4 instanceof Element;
}
function isHTMLElement(node4) {
  var OwnElement = getWindow(node4).HTMLElement;
  return node4 instanceof OwnElement || node4 instanceof HTMLElement;
}
function isShadowRoot(node4) {
  if (typeof ShadowRoot === "undefined") {
    return false;
  }
  var OwnElement = getWindow(node4).ShadowRoot;
  return node4 instanceof OwnElement || node4 instanceof ShadowRoot;
}
function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function(name) {
    var style2 = state.styles[name] || {};
    var attributes = state.attributes[name] || {};
    var element = state.elements[name];
    if (!isHTMLElement(element) || !getNodeName(element)) {
      return;
    }
    Object.assign(element.style, style2);
    Object.keys(attributes).forEach(function(name2) {
      var value = attributes[name2];
      if (value === false) {
        element.removeAttribute(name2);
      } else {
        element.setAttribute(name2, value === true ? "" : value);
      }
    });
  });
}
function effect$2(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);
  state.styles = initialStyles;
  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }
  return function() {
    Object.keys(state.elements).forEach(function(name) {
      var element = state.elements[name];
      var attributes = state.attributes[name] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]);
      var style2 = styleProperties.reduce(function(style3, property) {
        style3[property] = "";
        return style3;
      }, {});
      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      }
      Object.assign(element.style, style2);
      Object.keys(attributes).forEach(function(attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
}
var applyStyles$1 = {
  name: "applyStyles",
  enabled: true,
  phase: "write",
  fn: applyStyles,
  effect: effect$2,
  requires: ["computeStyles"]
};
function getBasePlacement$1(placement) {
  return placement.split("-")[0];
}
var max = Math.max;
var min = Math.min;
var round = Math.round;
function getBoundingClientRect(element, includeScale) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  var rect = element.getBoundingClientRect();
  var scaleX = 1;
  var scaleY = 1;
  if (isHTMLElement(element) && includeScale) {
    var offsetHeight = element.offsetHeight;
    var offsetWidth = element.offsetWidth;
    if (offsetWidth > 0) {
      scaleX = round(rect.width) / offsetWidth || 1;
    }
    if (offsetHeight > 0) {
      scaleY = round(rect.height) / offsetHeight || 1;
    }
  }
  return {
    width: rect.width / scaleX,
    height: rect.height / scaleY,
    top: rect.top / scaleY,
    right: rect.right / scaleX,
    bottom: rect.bottom / scaleY,
    left: rect.left / scaleX,
    x: rect.left / scaleX,
    y: rect.top / scaleY
  };
}
function getLayoutRect(element) {
  var clientRect2 = getBoundingClientRect(element);
  var width = element.offsetWidth;
  var height = element.offsetHeight;
  if (Math.abs(clientRect2.width - width) <= 1) {
    width = clientRect2.width;
  }
  if (Math.abs(clientRect2.height - height) <= 1) {
    height = clientRect2.height;
  }
  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width,
    height
  };
}
function contains(parent, child3) {
  var rootNode = child3.getRootNode && child3.getRootNode();
  if (parent.contains(child3)) {
    return true;
  } else if (rootNode && isShadowRoot(rootNode)) {
    var next = child3;
    do {
      if (next && parent.isSameNode(next)) {
        return true;
      }
      next = next.parentNode || next.host;
    } while (next);
  }
  return false;
}
function getComputedStyle$1(element) {
  return getWindow(element).getComputedStyle(element);
}
function isTableElement(element) {
  return ["table", "td", "th"].indexOf(getNodeName(element)) >= 0;
}
function getDocumentElement(element) {
  return ((isElement$1(element) ? element.ownerDocument : element.document) || window.document).documentElement;
}
function getParentNode(element) {
  if (getNodeName(element) === "html") {
    return element;
  }
  return element.assignedSlot || element.parentNode || (isShadowRoot(element) ? element.host : null) || getDocumentElement(element);
}
function getTrueOffsetParent(element) {
  if (!isHTMLElement(element) || getComputedStyle$1(element).position === "fixed") {
    return null;
  }
  return element.offsetParent;
}
function getContainingBlock(element) {
  var isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") !== -1;
  var isIE = navigator.userAgent.indexOf("Trident") !== -1;
  if (isIE && isHTMLElement(element)) {
    var elementCss = getComputedStyle$1(element);
    if (elementCss.position === "fixed") {
      return null;
    }
  }
  var currentNode = getParentNode(element);
  if (isShadowRoot(currentNode)) {
    currentNode = currentNode.host;
  }
  while (isHTMLElement(currentNode) && ["html", "body"].indexOf(getNodeName(currentNode)) < 0) {
    var css = getComputedStyle$1(currentNode);
    if (css.transform !== "none" || css.perspective !== "none" || css.contain === "paint" || ["transform", "perspective"].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === "filter" || isFirefox && css.filter && css.filter !== "none") {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }
  return null;
}
function getOffsetParent(element) {
  var window2 = getWindow(element);
  var offsetParent = getTrueOffsetParent(element);
  while (offsetParent && isTableElement(offsetParent) && getComputedStyle$1(offsetParent).position === "static") {
    offsetParent = getTrueOffsetParent(offsetParent);
  }
  if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle$1(offsetParent).position === "static")) {
    return window2;
  }
  return offsetParent || getContainingBlock(element) || window2;
}
function getMainAxisFromPlacement(placement) {
  return ["top", "bottom"].indexOf(placement) >= 0 ? "x" : "y";
}
function within(min$1, value, max$1) {
  return max(min$1, min(value, max$1));
}
function withinMaxClamp(min3, value, max3) {
  var v = within(min3, value, max3);
  return v > max3 ? max3 : v;
}
function getFreshSideObject() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function mergePaddingObject(paddingObject) {
  return Object.assign({}, getFreshSideObject(), paddingObject);
}
function expandToHashMap(value, keys2) {
  return keys2.reduce(function(hashMap, key2) {
    hashMap[key2] = value;
    return hashMap;
  }, {});
}
var toPaddingObject = function toPaddingObject2(padding, state) {
  padding = typeof padding === "function" ? padding(Object.assign({}, state.rects, {
    placement: state.placement
  })) : padding;
  return mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
};
function arrow$1(_ref) {
  var _state$modifiersData$;
  var state = _ref.state, name = _ref.name, options = _ref.options;
  var arrowElement = state.elements.arrow;
  var popperOffsets2 = state.modifiersData.popperOffsets;
  var basePlacement = getBasePlacement$1(state.placement);
  var axis = getMainAxisFromPlacement(basePlacement);
  var isVertical = [left, right].indexOf(basePlacement) >= 0;
  var len = isVertical ? "height" : "width";
  if (!arrowElement || !popperOffsets2) {
    return;
  }
  var paddingObject = toPaddingObject(options.padding, state);
  var arrowRect = getLayoutRect(arrowElement);
  var minProp = axis === "y" ? top : left;
  var maxProp = axis === "y" ? bottom : right;
  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets2[axis] - state.rects.popper[len];
  var startDiff = popperOffsets2[axis] - state.rects.reference[axis];
  var arrowOffsetParent = getOffsetParent(arrowElement);
  var clientSize = arrowOffsetParent ? axis === "y" ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
  var centerToReference = endDiff / 2 - startDiff / 2;
  var min3 = paddingObject[minProp];
  var max3 = clientSize - arrowRect[len] - paddingObject[maxProp];
  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
  var offset3 = within(min3, center, max3);
  var axisProp = axis;
  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset3, _state$modifiersData$.centerOffset = offset3 - center, _state$modifiersData$);
}
function effect$1(_ref2) {
  var state = _ref2.state, options = _ref2.options;
  var _options$element = options.element, arrowElement = _options$element === void 0 ? "[data-popper-arrow]" : _options$element;
  if (arrowElement == null) {
    return;
  }
  if (typeof arrowElement === "string") {
    arrowElement = state.elements.popper.querySelector(arrowElement);
    if (!arrowElement) {
      return;
    }
  }
  if (!contains(state.elements.popper, arrowElement)) {
    return;
  }
  state.elements.arrow = arrowElement;
}
var arrow$2 = {
  name: "arrow",
  enabled: true,
  phase: "main",
  fn: arrow$1,
  effect: effect$1,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function getVariation(placement) {
  return placement.split("-")[1];
}
var unsetSides = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function roundOffsetsByDPR(_ref) {
  var x = _ref.x, y = _ref.y;
  var win = window;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: round(x * dpr) / dpr || 0,
    y: round(y * dpr) / dpr || 0
  };
}
function mapToStyles(_ref2) {
  var _Object$assign2;
  var popper2 = _ref2.popper, popperRect = _ref2.popperRect, placement = _ref2.placement, variation = _ref2.variation, offsets = _ref2.offsets, position = _ref2.position, gpuAcceleration = _ref2.gpuAcceleration, adaptive = _ref2.adaptive, roundOffsets = _ref2.roundOffsets, isFixed = _ref2.isFixed;
  var _offsets$x = offsets.x, x = _offsets$x === void 0 ? 0 : _offsets$x, _offsets$y = offsets.y, y = _offsets$y === void 0 ? 0 : _offsets$y;
  var _ref3 = typeof roundOffsets === "function" ? roundOffsets({
    x,
    y
  }) : {
    x,
    y
  };
  x = _ref3.x;
  y = _ref3.y;
  var hasX = offsets.hasOwnProperty("x");
  var hasY = offsets.hasOwnProperty("y");
  var sideX = left;
  var sideY = top;
  var win = window;
  if (adaptive) {
    var offsetParent = getOffsetParent(popper2);
    var heightProp = "clientHeight";
    var widthProp = "clientWidth";
    if (offsetParent === getWindow(popper2)) {
      offsetParent = getDocumentElement(popper2);
      if (getComputedStyle$1(offsetParent).position !== "static" && position === "absolute") {
        heightProp = "scrollHeight";
        widthProp = "scrollWidth";
      }
    }
    offsetParent = offsetParent;
    if (placement === top || (placement === left || placement === right) && variation === end) {
      sideY = bottom;
      var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : offsetParent[heightProp];
      y -= offsetY - popperRect.height;
      y *= gpuAcceleration ? 1 : -1;
    }
    if (placement === left || (placement === top || placement === bottom) && variation === end) {
      sideX = right;
      var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : offsetParent[widthProp];
      x -= offsetX - popperRect.width;
      x *= gpuAcceleration ? 1 : -1;
    }
  }
  var commonStyles = Object.assign({
    position
  }, adaptive && unsetSides);
  var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
    x,
    y
  }) : {
    x,
    y
  };
  x = _ref4.x;
  y = _ref4.y;
  if (gpuAcceleration) {
    var _Object$assign;
    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? "0" : "", _Object$assign[sideX] = hasX ? "0" : "", _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
  }
  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : "", _Object$assign2[sideX] = hasX ? x + "px" : "", _Object$assign2.transform = "", _Object$assign2));
}
function computeStyles(_ref5) {
  var state = _ref5.state, options = _ref5.options;
  var _options$gpuAccelerat = options.gpuAcceleration, gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat, _options$adaptive = options.adaptive, adaptive = _options$adaptive === void 0 ? true : _options$adaptive, _options$roundOffsets = options.roundOffsets, roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
  var commonStyles = {
    placement: getBasePlacement$1(state.placement),
    variation: getVariation(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration,
    isFixed: state.options.strategy === "fixed"
  };
  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive,
      roundOffsets
    })));
  }
  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.arrow,
      position: "absolute",
      adaptive: false,
      roundOffsets
    })));
  }
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    "data-popper-placement": state.placement
  });
}
var computeStyles$1 = {
  name: "computeStyles",
  enabled: true,
  phase: "beforeWrite",
  fn: computeStyles,
  data: {}
};
var passive = {
  passive: true
};
function effect(_ref) {
  var state = _ref.state, instance = _ref.instance, options = _ref.options;
  var _options$scroll = options.scroll, scroll = _options$scroll === void 0 ? true : _options$scroll, _options$resize = options.resize, resize = _options$resize === void 0 ? true : _options$resize;
  var window2 = getWindow(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);
  if (scroll) {
    scrollParents.forEach(function(scrollParent) {
      scrollParent.addEventListener("scroll", instance.update, passive);
    });
  }
  if (resize) {
    window2.addEventListener("resize", instance.update, passive);
  }
  return function() {
    if (scroll) {
      scrollParents.forEach(function(scrollParent) {
        scrollParent.removeEventListener("scroll", instance.update, passive);
      });
    }
    if (resize) {
      window2.removeEventListener("resize", instance.update, passive);
    }
  };
}
var eventListeners = {
  name: "eventListeners",
  enabled: true,
  phase: "write",
  fn: function fn() {
  },
  effect,
  data: {}
};
var hash$1 = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, function(matched) {
    return hash$1[matched];
  });
}
var hash = {
  start: "end",
  end: "start"
};
function getOppositeVariationPlacement(placement) {
  return placement.replace(/start|end/g, function(matched) {
    return hash[matched];
  });
}
function getWindowScroll(node4) {
  var win = getWindow(node4);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft,
    scrollTop
  };
}
function getWindowScrollBarX(element) {
  return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
}
function getViewportRect(element) {
  var win = getWindow(element);
  var html = getDocumentElement(element);
  var visualViewport = win.visualViewport;
  var width = html.clientWidth;
  var height = html.clientHeight;
  var x = 0;
  var y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    if (!/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x: x + getWindowScrollBarX(element),
    y
  };
}
function getDocumentRect(element) {
  var _element$ownerDocumen;
  var html = getDocumentElement(element);
  var winScroll = getWindowScroll(element);
  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
  var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
  var y = -winScroll.scrollTop;
  if (getComputedStyle$1(body || html).direction === "rtl") {
    x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}
function isScrollParent(element) {
  var _getComputedStyle = getComputedStyle$1(element), overflow = _getComputedStyle.overflow, overflowX = _getComputedStyle.overflowX, overflowY = _getComputedStyle.overflowY;
  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}
function getScrollParent(node4) {
  if (["html", "body", "#document"].indexOf(getNodeName(node4)) >= 0) {
    return node4.ownerDocument.body;
  }
  if (isHTMLElement(node4) && isScrollParent(node4)) {
    return node4;
  }
  return getScrollParent(getParentNode(node4));
}
function listScrollParents(element, list) {
  var _element$ownerDocumen;
  if (list === void 0) {
    list = [];
  }
  var scrollParent = getScrollParent(element);
  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
  var win = getWindow(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list.concat(target);
  return isBody ? updatedList : updatedList.concat(listScrollParents(getParentNode(target)));
}
function rectToClientRect(rect) {
  return Object.assign({}, rect, {
    left: rect.x,
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}
function getInnerBoundingClientRect(element) {
  var rect = getBoundingClientRect(element);
  rect.top = rect.top + element.clientTop;
  rect.left = rect.left + element.clientLeft;
  rect.bottom = rect.top + element.clientHeight;
  rect.right = rect.left + element.clientWidth;
  rect.width = element.clientWidth;
  rect.height = element.clientHeight;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}
function getClientRectFromMixedType(element, clippingParent) {
  return clippingParent === viewport ? rectToClientRect(getViewportRect(element)) : isElement$1(clippingParent) ? getInnerBoundingClientRect(clippingParent) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
}
function getClippingParents(element) {
  var clippingParents2 = listScrollParents(getParentNode(element));
  var canEscapeClipping = ["absolute", "fixed"].indexOf(getComputedStyle$1(element).position) >= 0;
  var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;
  if (!isElement$1(clipperElement)) {
    return [];
  }
  return clippingParents2.filter(function(clippingParent) {
    return isElement$1(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== "body";
  });
}
function getClippingRect(element, boundary, rootBoundary) {
  var mainClippingParents = boundary === "clippingParents" ? getClippingParents(element) : [].concat(boundary);
  var clippingParents2 = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents2[0];
  var clippingRect = clippingParents2.reduce(function(accRect, clippingParent) {
    var rect = getClientRectFromMixedType(element, clippingParent);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromMixedType(element, firstClippingParent));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}
function computeOffsets(_ref) {
  var reference2 = _ref.reference, element = _ref.element, placement = _ref.placement;
  var basePlacement = placement ? getBasePlacement$1(placement) : null;
  var variation = placement ? getVariation(placement) : null;
  var commonX = reference2.x + reference2.width / 2 - element.width / 2;
  var commonY = reference2.y + reference2.height / 2 - element.height / 2;
  var offsets;
  switch (basePlacement) {
    case top:
      offsets = {
        x: commonX,
        y: reference2.y - element.height
      };
      break;
    case bottom:
      offsets = {
        x: commonX,
        y: reference2.y + reference2.height
      };
      break;
    case right:
      offsets = {
        x: reference2.x + reference2.width,
        y: commonY
      };
      break;
    case left:
      offsets = {
        x: reference2.x - element.width,
        y: commonY
      };
      break;
    default:
      offsets = {
        x: reference2.x,
        y: reference2.y
      };
  }
  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;
  if (mainAxis != null) {
    var len = mainAxis === "y" ? "height" : "width";
    switch (variation) {
      case start:
        offsets[mainAxis] = offsets[mainAxis] - (reference2[len] / 2 - element[len] / 2);
        break;
      case end:
        offsets[mainAxis] = offsets[mainAxis] + (reference2[len] / 2 - element[len] / 2);
        break;
    }
  }
  return offsets;
}
function detectOverflow(state, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options, _options$placement = _options.placement, placement = _options$placement === void 0 ? state.placement : _options$placement, _options$boundary = _options.boundary, boundary = _options$boundary === void 0 ? clippingParents : _options$boundary, _options$rootBoundary = _options.rootBoundary, rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary, _options$elementConte = _options.elementContext, elementContext = _options$elementConte === void 0 ? popper : _options$elementConte, _options$altBoundary = _options.altBoundary, altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary, _options$padding = _options.padding, padding = _options$padding === void 0 ? 0 : _options$padding;
  var paddingObject = mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
  var altContext = elementContext === popper ? reference : popper;
  var popperRect = state.rects.popper;
  var element = state.elements[altBoundary ? altContext : elementContext];
  var clippingClientRect = getClippingRect(isElement$1(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary);
  var referenceClientRect = getBoundingClientRect(state.elements.reference);
  var popperOffsets2 = computeOffsets({
    reference: referenceClientRect,
    element: popperRect,
    strategy: "absolute",
    placement
  });
  var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets2));
  var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect;
  var overflowOffsets = {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
  var offsetData = state.modifiersData.offset;
  if (elementContext === popper && offsetData) {
    var offset3 = offsetData[placement];
    Object.keys(overflowOffsets).forEach(function(key2) {
      var multiply = [right, bottom].indexOf(key2) >= 0 ? 1 : -1;
      var axis = [top, bottom].indexOf(key2) >= 0 ? "y" : "x";
      overflowOffsets[key2] += offset3[axis] * multiply;
    });
  }
  return overflowOffsets;
}
function computeAutoPlacement(state, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options, placement = _options.placement, boundary = _options.boundary, rootBoundary = _options.rootBoundary, padding = _options.padding, flipVariations = _options.flipVariations, _options$allowedAutoP = _options.allowedAutoPlacements, allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
  var variation = getVariation(placement);
  var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function(placement2) {
    return getVariation(placement2) === variation;
  }) : basePlacements;
  var allowedPlacements = placements$1.filter(function(placement2) {
    return allowedAutoPlacements.indexOf(placement2) >= 0;
  });
  if (allowedPlacements.length === 0) {
    allowedPlacements = placements$1;
  }
  var overflows = allowedPlacements.reduce(function(acc, placement2) {
    acc[placement2] = detectOverflow(state, {
      placement: placement2,
      boundary,
      rootBoundary,
      padding
    })[getBasePlacement$1(placement2)];
    return acc;
  }, {});
  return Object.keys(overflows).sort(function(a2, b) {
    return overflows[a2] - overflows[b];
  });
}
function getExpandedFallbackPlacements(placement) {
  if (getBasePlacement$1(placement) === auto) {
    return [];
  }
  var oppositePlacement = getOppositePlacement(placement);
  return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
}
function flip(_ref) {
  var state = _ref.state, options = _ref.options, name = _ref.name;
  if (state.modifiersData[name]._skip) {
    return;
  }
  var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis, specifiedFallbackPlacements = options.fallbackPlacements, padding = options.padding, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, _options$flipVariatio = options.flipVariations, flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio, allowedAutoPlacements = options.allowedAutoPlacements;
  var preferredPlacement = state.options.placement;
  var basePlacement = getBasePlacement$1(preferredPlacement);
  var isBasePlacement = basePlacement === preferredPlacement;
  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
  var placements2 = [preferredPlacement].concat(fallbackPlacements).reduce(function(acc, placement2) {
    return acc.concat(getBasePlacement$1(placement2) === auto ? computeAutoPlacement(state, {
      placement: placement2,
      boundary,
      rootBoundary,
      padding,
      flipVariations,
      allowedAutoPlacements
    }) : placement2);
  }, []);
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var checksMap = /* @__PURE__ */ new Map();
  var makeFallbackChecks = true;
  var firstFittingPlacement = placements2[0];
  for (var i2 = 0; i2 < placements2.length; i2++) {
    var placement = placements2[i2];
    var _basePlacement = getBasePlacement$1(placement);
    var isStartVariation = getVariation(placement) === start;
    var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
    var len = isVertical ? "width" : "height";
    var overflow = detectOverflow(state, {
      placement,
      boundary,
      rootBoundary,
      altBoundary,
      padding
    });
    var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;
    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = getOppositePlacement(mainVariationSide);
    }
    var altVariationSide = getOppositePlacement(mainVariationSide);
    var checks = [];
    if (checkMainAxis) {
      checks.push(overflow[_basePlacement] <= 0);
    }
    if (checkAltAxis) {
      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
    }
    if (checks.every(function(check2) {
      return check2;
    })) {
      firstFittingPlacement = placement;
      makeFallbackChecks = false;
      break;
    }
    checksMap.set(placement, checks);
  }
  if (makeFallbackChecks) {
    var numberOfChecks = flipVariations ? 3 : 1;
    var _loop = function _loop2(_i2) {
      var fittingPlacement = placements2.find(function(placement2) {
        var checks2 = checksMap.get(placement2);
        if (checks2) {
          return checks2.slice(0, _i2).every(function(check2) {
            return check2;
          });
        }
      });
      if (fittingPlacement) {
        firstFittingPlacement = fittingPlacement;
        return "break";
      }
    };
    for (var _i = numberOfChecks; _i > 0; _i--) {
      var _ret = _loop(_i);
      if (_ret === "break")
        break;
    }
  }
  if (state.placement !== firstFittingPlacement) {
    state.modifiersData[name]._skip = true;
    state.placement = firstFittingPlacement;
    state.reset = true;
  }
}
var flip$1 = {
  name: "flip",
  enabled: true,
  phase: "main",
  fn: flip,
  requiresIfExists: ["offset"],
  data: {
    _skip: false
  }
};
function getSideOffsets(overflow, rect, preventedOffsets) {
  if (preventedOffsets === void 0) {
    preventedOffsets = {
      x: 0,
      y: 0
    };
  }
  return {
    top: overflow.top - rect.height - preventedOffsets.y,
    right: overflow.right - rect.width + preventedOffsets.x,
    bottom: overflow.bottom - rect.height + preventedOffsets.y,
    left: overflow.left - rect.width - preventedOffsets.x
  };
}
function isAnySideFullyClipped(overflow) {
  return [top, right, bottom, left].some(function(side) {
    return overflow[side] >= 0;
  });
}
function hide(_ref) {
  var state = _ref.state, name = _ref.name;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var preventedOffsets = state.modifiersData.preventOverflow;
  var referenceOverflow = detectOverflow(state, {
    elementContext: "reference"
  });
  var popperAltOverflow = detectOverflow(state, {
    altBoundary: true
  });
  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
  state.modifiersData[name] = {
    referenceClippingOffsets,
    popperEscapeOffsets,
    isReferenceHidden,
    hasPopperEscaped
  };
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    "data-popper-reference-hidden": isReferenceHidden,
    "data-popper-escaped": hasPopperEscaped
  });
}
var hide$1 = {
  name: "hide",
  enabled: true,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: hide
};
function distanceAndSkiddingToXY(placement, rects, offset3) {
  var basePlacement = getBasePlacement$1(placement);
  var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;
  var _ref = typeof offset3 === "function" ? offset3(Object.assign({}, rects, {
    placement
  })) : offset3, skidding = _ref[0], distance2 = _ref[1];
  skidding = skidding || 0;
  distance2 = (distance2 || 0) * invertDistance;
  return [left, right].indexOf(basePlacement) >= 0 ? {
    x: distance2,
    y: skidding
  } : {
    x: skidding,
    y: distance2
  };
}
function offset(_ref2) {
  var state = _ref2.state, options = _ref2.options, name = _ref2.name;
  var _options$offset = options.offset, offset3 = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = placements.reduce(function(acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset3);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement], x = _data$state$placement.x, y = _data$state$placement.y;
  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x;
    state.modifiersData.popperOffsets.y += y;
  }
  state.modifiersData[name] = data;
}
var offset$1 = {
  name: "offset",
  enabled: true,
  phase: "main",
  requires: ["popperOffsets"],
  fn: offset
};
function popperOffsets(_ref) {
  var state = _ref.state, name = _ref.name;
  state.modifiersData[name] = computeOffsets({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: "absolute",
    placement: state.placement
  });
}
var popperOffsets$1 = {
  name: "popperOffsets",
  enabled: true,
  phase: "read",
  fn: popperOffsets,
  data: {}
};
function getAltAxis(axis) {
  return axis === "x" ? "y" : "x";
}
function preventOverflow(_ref) {
  var state = _ref.state, options = _ref.options, name = _ref.name;
  var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, padding = options.padding, _options$tether = options.tether, tether = _options$tether === void 0 ? true : _options$tether, _options$tetherOffset = options.tetherOffset, tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
  var overflow = detectOverflow(state, {
    boundary,
    rootBoundary,
    padding,
    altBoundary
  });
  var basePlacement = getBasePlacement$1(state.placement);
  var variation = getVariation(state.placement);
  var isBasePlacement = !variation;
  var mainAxis = getMainAxisFromPlacement(basePlacement);
  var altAxis = getAltAxis(mainAxis);
  var popperOffsets2 = state.modifiersData.popperOffsets;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var tetherOffsetValue = typeof tetherOffset === "function" ? tetherOffset(Object.assign({}, state.rects, {
    placement: state.placement
  })) : tetherOffset;
  var normalizedTetherOffsetValue = typeof tetherOffsetValue === "number" ? {
    mainAxis: tetherOffsetValue,
    altAxis: tetherOffsetValue
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, tetherOffsetValue);
  var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
  var data = {
    x: 0,
    y: 0
  };
  if (!popperOffsets2) {
    return;
  }
  if (checkMainAxis) {
    var _offsetModifierState$;
    var mainSide = mainAxis === "y" ? top : left;
    var altSide = mainAxis === "y" ? bottom : right;
    var len = mainAxis === "y" ? "height" : "width";
    var offset3 = popperOffsets2[mainAxis];
    var min$1 = offset3 + overflow[mainSide];
    var max$1 = offset3 - overflow[altSide];
    var additive = tether ? -popperRect[len] / 2 : 0;
    var minLen = variation === start ? referenceRect[len] : popperRect[len];
    var maxLen = variation === start ? -popperRect[len] : -referenceRect[len];
    var arrowElement = state.elements.arrow;
    var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
      width: 0,
      height: 0
    };
    var arrowPaddingObject = state.modifiersData["arrow#persistent"] ? state.modifiersData["arrow#persistent"].padding : getFreshSideObject();
    var arrowPaddingMin = arrowPaddingObject[mainSide];
    var arrowPaddingMax = arrowPaddingObject[altSide];
    var arrowLen = within(0, referenceRect[len], arrowRect[len]);
    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
    var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
    var clientOffset = arrowOffsetParent ? mainAxis === "y" ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
    var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
    var tetherMin = offset3 + minOffset - offsetModifierValue - clientOffset;
    var tetherMax = offset3 + maxOffset - offsetModifierValue;
    var preventedOffset = within(tether ? min(min$1, tetherMin) : min$1, offset3, tether ? max(max$1, tetherMax) : max$1);
    popperOffsets2[mainAxis] = preventedOffset;
    data[mainAxis] = preventedOffset - offset3;
  }
  if (checkAltAxis) {
    var _offsetModifierState$2;
    var _mainSide = mainAxis === "x" ? top : left;
    var _altSide = mainAxis === "x" ? bottom : right;
    var _offset = popperOffsets2[altAxis];
    var _len = altAxis === "y" ? "height" : "width";
    var _min = _offset + overflow[_mainSide];
    var _max = _offset - overflow[_altSide];
    var isOriginSide = [top, left].indexOf(basePlacement) !== -1;
    var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;
    var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;
    var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;
    var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);
    popperOffsets2[altAxis] = _preventedOffset;
    data[altAxis] = _preventedOffset - _offset;
  }
  state.modifiersData[name] = data;
}
var preventOverflow$1 = {
  name: "preventOverflow",
  enabled: true,
  phase: "main",
  fn: preventOverflow,
  requiresIfExists: ["offset"]
};
function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}
function getNodeScroll(node4) {
  if (node4 === getWindow(node4) || !isHTMLElement(node4)) {
    return getWindowScroll(node4);
  } else {
    return getHTMLElementScroll(node4);
  }
}
function isElementScaled(element) {
  var rect = element.getBoundingClientRect();
  var scaleX = round(rect.width) / element.offsetWidth || 1;
  var scaleY = round(rect.height) / element.offsetHeight || 1;
  return scaleX !== 1 || scaleY !== 1;
}
function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  var isOffsetParentAnElement = isHTMLElement(offsetParent);
  var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
  var documentElement = getDocumentElement(offsetParent);
  var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isScrollParent(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      offsets = getBoundingClientRect(offsetParent, true);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}
function order(modifiers2) {
  var map15 = /* @__PURE__ */ new Map();
  var visited = /* @__PURE__ */ new Set();
  var result2 = [];
  modifiers2.forEach(function(modifier) {
    map15.set(modifier.name, modifier);
  });
  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function(dep) {
      if (!visited.has(dep)) {
        var depModifier = map15.get(dep);
        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result2.push(modifier);
  }
  modifiers2.forEach(function(modifier) {
    if (!visited.has(modifier.name)) {
      sort(modifier);
    }
  });
  return result2;
}
function orderModifiers(modifiers2) {
  var orderedModifiers = order(modifiers2);
  return modifierPhases.reduce(function(acc, phase) {
    return acc.concat(orderedModifiers.filter(function(modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}
function debounce$1(fn2) {
  var pending;
  return function() {
    if (!pending) {
      pending = new Promise(function(resolve8) {
        Promise.resolve().then(function() {
          pending = void 0;
          resolve8(fn2());
        });
      });
    }
    return pending;
  };
}
function mergeByName(modifiers2) {
  var merged = modifiers2.reduce(function(merged2, current) {
    var existing = merged2[current.name];
    merged2[current.name] = existing ? Object.assign({}, existing, current, {
      options: Object.assign({}, existing.options, current.options),
      data: Object.assign({}, existing.data, current.data)
    }) : current;
    return merged2;
  }, {});
  return Object.keys(merged).map(function(key2) {
    return merged[key2];
  });
}
var DEFAULT_OPTIONS = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return !args.some(function(element) {
    return !(element && typeof element.getBoundingClientRect === "function");
  });
}
function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }
  var _generatorOptions = generatorOptions, _generatorOptions$def = _generatorOptions.defaultModifiers, defaultModifiers2 = _generatorOptions$def === void 0 ? [] : _generatorOptions$def, _generatorOptions$def2 = _generatorOptions.defaultOptions, defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper2(reference2, popper2, options) {
    if (options === void 0) {
      options = defaultOptions;
    }
    var state = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
      modifiersData: {},
      elements: {
        reference: reference2,
        popper: popper2
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state,
      setOptions: function setOptions(setOptionsAction) {
        var options2 = typeof setOptionsAction === "function" ? setOptionsAction(state.options) : setOptionsAction;
        cleanupModifierEffects();
        state.options = Object.assign({}, defaultOptions, state.options, options2);
        state.scrollParents = {
          reference: isElement$1(reference2) ? listScrollParents(reference2) : reference2.contextElement ? listScrollParents(reference2.contextElement) : [],
          popper: listScrollParents(popper2)
        };
        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers2, state.options.modifiers)));
        state.orderedModifiers = orderedModifiers.filter(function(m) {
          return m.enabled;
        });
        runModifierEffects();
        return instance.update();
      },
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }
        var _state$elements = state.elements, reference3 = _state$elements.reference, popper3 = _state$elements.popper;
        if (!areValidElements(reference3, popper3)) {
          return;
        }
        state.rects = {
          reference: getCompositeRect(reference3, getOffsetParent(popper3), state.options.strategy === "fixed"),
          popper: getLayoutRect(popper3)
        };
        state.reset = false;
        state.placement = state.options.placement;
        state.orderedModifiers.forEach(function(modifier) {
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });
        for (var index2 = 0; index2 < state.orderedModifiers.length; index2++) {
          if (state.reset === true) {
            state.reset = false;
            index2 = -1;
            continue;
          }
          var _state$orderedModifie = state.orderedModifiers[index2], fn2 = _state$orderedModifie.fn, _state$orderedModifie2 = _state$orderedModifie.options, _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2, name = _state$orderedModifie.name;
          if (typeof fn2 === "function") {
            state = fn2({
              state,
              options: _options,
              name,
              instance
            }) || state;
          }
        }
      },
      update: debounce$1(function() {
        return new Promise(function(resolve8) {
          instance.forceUpdate();
          resolve8(state);
        });
      }),
      destroy: function destroy5() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };
    if (!areValidElements(reference2, popper2)) {
      return instance;
    }
    instance.setOptions(options).then(function(state2) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state2);
      }
    });
    function runModifierEffects() {
      state.orderedModifiers.forEach(function(_ref3) {
        var name = _ref3.name, _ref3$options = _ref3.options, options2 = _ref3$options === void 0 ? {} : _ref3$options, effect3 = _ref3.effect;
        if (typeof effect3 === "function") {
          var cleanupFn = effect3({
            state,
            name,
            instance,
            options: options2
          });
          var noopFn = function noopFn2() {
          };
          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }
    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function(fn2) {
        return fn2();
      });
      effectCleanupFns = [];
    }
    return instance;
  };
}
var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$2, hide$1];
var createPopper = /* @__PURE__ */ popperGenerator({
  defaultModifiers
});
var BOX_CLASS = "tippy-box";
var CONTENT_CLASS = "tippy-content";
var BACKDROP_CLASS = "tippy-backdrop";
var ARROW_CLASS = "tippy-arrow";
var SVG_ARROW_CLASS = "tippy-svg-arrow";
var TOUCH_OPTIONS = {
  passive: true,
  capture: true
};
var TIPPY_DEFAULT_APPEND_TO = function TIPPY_DEFAULT_APPEND_TO2() {
  return document.body;
};
function getValueAtIndexOrReturn(value, index2, defaultValue) {
  if (Array.isArray(value)) {
    var v = value[index2];
    return v == null ? Array.isArray(defaultValue) ? defaultValue[index2] : defaultValue : v;
  }
  return value;
}
function isType(value, type) {
  var str = {}.toString.call(value);
  return str.indexOf("[object") === 0 && str.indexOf(type + "]") > -1;
}
function invokeWithArgsOrReturn(value, args) {
  return typeof value === "function" ? value.apply(void 0, args) : value;
}
function debounce(fn2, ms) {
  if (ms === 0) {
    return fn2;
  }
  var timeout;
  return function(arg) {
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      fn2(arg);
    }, ms);
  };
}
function splitBySpaces(value) {
  return value.split(/\s+/).filter(Boolean);
}
function normalizeToArray(value) {
  return [].concat(value);
}
function pushIfUnique(arr, value) {
  if (arr.indexOf(value) === -1) {
    arr.push(value);
  }
}
function unique(arr) {
  return arr.filter(function(item, index2) {
    return arr.indexOf(item) === index2;
  });
}
function getBasePlacement(placement) {
  return placement.split("-")[0];
}
function arrayFrom(value) {
  return [].slice.call(value);
}
function removeUndefinedProps(obj) {
  return Object.keys(obj).reduce(function(acc, key2) {
    if (obj[key2] !== void 0) {
      acc[key2] = obj[key2];
    }
    return acc;
  }, {});
}
function div() {
  return document.createElement("div");
}
function isElement(value) {
  return ["Element", "Fragment"].some(function(type) {
    return isType(value, type);
  });
}
function isNodeList(value) {
  return isType(value, "NodeList");
}
function isMouseEvent(value) {
  return isType(value, "MouseEvent");
}
function isReferenceElement(value) {
  return !!(value && value._tippy && value._tippy.reference === value);
}
function getArrayOfElements(value) {
  if (isElement(value)) {
    return [value];
  }
  if (isNodeList(value)) {
    return arrayFrom(value);
  }
  if (Array.isArray(value)) {
    return value;
  }
  return arrayFrom(document.querySelectorAll(value));
}
function setTransitionDuration(els, value) {
  els.forEach(function(el) {
    if (el) {
      el.style.transitionDuration = value + "ms";
    }
  });
}
function setVisibilityState(els, state) {
  els.forEach(function(el) {
    if (el) {
      el.setAttribute("data-state", state);
    }
  });
}
function getOwnerDocument(elementOrElements) {
  var _element$ownerDocumen;
  var _normalizeToArray = normalizeToArray(elementOrElements), element = _normalizeToArray[0];
  return element != null && (_element$ownerDocumen = element.ownerDocument) != null && _element$ownerDocumen.body ? element.ownerDocument : document;
}
function isCursorOutsideInteractiveBorder(popperTreeData, event) {
  var clientX = event.clientX, clientY = event.clientY;
  return popperTreeData.every(function(_ref) {
    var popperRect = _ref.popperRect, popperState = _ref.popperState, props = _ref.props;
    var interactiveBorder = props.interactiveBorder;
    var basePlacement = getBasePlacement(popperState.placement);
    var offsetData = popperState.modifiersData.offset;
    if (!offsetData) {
      return true;
    }
    var topDistance = basePlacement === "bottom" ? offsetData.top.y : 0;
    var bottomDistance = basePlacement === "top" ? offsetData.bottom.y : 0;
    var leftDistance = basePlacement === "right" ? offsetData.left.x : 0;
    var rightDistance = basePlacement === "left" ? offsetData.right.x : 0;
    var exceedsTop = popperRect.top - clientY + topDistance > interactiveBorder;
    var exceedsBottom = clientY - popperRect.bottom - bottomDistance > interactiveBorder;
    var exceedsLeft = popperRect.left - clientX + leftDistance > interactiveBorder;
    var exceedsRight = clientX - popperRect.right - rightDistance > interactiveBorder;
    return exceedsTop || exceedsBottom || exceedsLeft || exceedsRight;
  });
}
function updateTransitionEndListener(box, action, listener) {
  var method = action + "EventListener";
  ["transitionend", "webkitTransitionEnd"].forEach(function(event) {
    box[method](event, listener);
  });
}
function actualContains(parent, child3) {
  var target = child3;
  while (target) {
    var _target$getRootNode;
    if (parent.contains(target)) {
      return true;
    }
    target = target.getRootNode == null ? void 0 : (_target$getRootNode = target.getRootNode()) == null ? void 0 : _target$getRootNode.host;
  }
  return false;
}
var currentInput = {
  isTouch: false
};
var lastMouseMoveTime = 0;
function onDocumentTouchStart() {
  if (currentInput.isTouch) {
    return;
  }
  currentInput.isTouch = true;
  if (window.performance) {
    document.addEventListener("mousemove", onDocumentMouseMove);
  }
}
function onDocumentMouseMove() {
  var now = performance.now();
  if (now - lastMouseMoveTime < 20) {
    currentInput.isTouch = false;
    document.removeEventListener("mousemove", onDocumentMouseMove);
  }
  lastMouseMoveTime = now;
}
function onWindowBlur() {
  var activeElement = document.activeElement;
  if (isReferenceElement(activeElement)) {
    var instance = activeElement._tippy;
    if (activeElement.blur && !instance.state.isVisible) {
      activeElement.blur();
    }
  }
}
function bindGlobalEventListeners() {
  document.addEventListener("touchstart", onDocumentTouchStart, TOUCH_OPTIONS);
  window.addEventListener("blur", onWindowBlur);
}
var isBrowser = typeof window !== "undefined" && typeof document !== "undefined";
var isIE11 = isBrowser ? !!window.msCrypto : false;
var pluginProps = {
  animateFill: false,
  followCursor: false,
  inlinePositioning: false,
  sticky: false
};
var renderProps = {
  allowHTML: false,
  animation: "fade",
  arrow: true,
  content: "",
  inertia: false,
  maxWidth: 350,
  role: "tooltip",
  theme: "",
  zIndex: 9999
};
var defaultProps = Object.assign({
  appendTo: TIPPY_DEFAULT_APPEND_TO,
  aria: {
    content: "auto",
    expanded: "auto"
  },
  delay: 0,
  duration: [300, 250],
  getReferenceClientRect: null,
  hideOnClick: true,
  ignoreAttributes: false,
  interactive: false,
  interactiveBorder: 2,
  interactiveDebounce: 0,
  moveTransition: "",
  offset: [0, 10],
  onAfterUpdate: function onAfterUpdate() {
  },
  onBeforeUpdate: function onBeforeUpdate2() {
  },
  onCreate: function onCreate() {
  },
  onDestroy: function onDestroy() {
  },
  onHidden: function onHidden() {
  },
  onHide: function onHide() {
  },
  onMount: function onMount() {
  },
  onShow: function onShow() {
  },
  onShown: function onShown() {
  },
  onTrigger: function onTrigger() {
  },
  onUntrigger: function onUntrigger() {
  },
  onClickOutside: function onClickOutside() {
  },
  placement: "top",
  plugins: [],
  popperOptions: {},
  render: null,
  showOnCreate: false,
  touch: true,
  trigger: "mouseenter focus",
  triggerTarget: null
}, pluginProps, renderProps);
var defaultKeys = Object.keys(defaultProps);
var setDefaultProps = function setDefaultProps2(partialProps) {
  var keys2 = Object.keys(partialProps);
  keys2.forEach(function(key2) {
    defaultProps[key2] = partialProps[key2];
  });
};
function getExtendedPassedProps(passedProps) {
  var plugins = passedProps.plugins || [];
  var pluginProps2 = plugins.reduce(function(acc, plugin) {
    var name = plugin.name, defaultValue = plugin.defaultValue;
    if (name) {
      var _name;
      acc[name] = passedProps[name] !== void 0 ? passedProps[name] : (_name = defaultProps[name]) != null ? _name : defaultValue;
    }
    return acc;
  }, {});
  return Object.assign({}, passedProps, pluginProps2);
}
function getDataAttributeProps(reference2, plugins) {
  var propKeys = plugins ? Object.keys(getExtendedPassedProps(Object.assign({}, defaultProps, {
    plugins
  }))) : defaultKeys;
  var props = propKeys.reduce(function(acc, key2) {
    var valueAsString = (reference2.getAttribute("data-tippy-" + key2) || "").trim();
    if (!valueAsString) {
      return acc;
    }
    if (key2 === "content") {
      acc[key2] = valueAsString;
    } else {
      try {
        acc[key2] = JSON.parse(valueAsString);
      } catch (e) {
        acc[key2] = valueAsString;
      }
    }
    return acc;
  }, {});
  return props;
}
function evaluateProps(reference2, props) {
  var out = Object.assign({}, props, {
    content: invokeWithArgsOrReturn(props.content, [reference2])
  }, props.ignoreAttributes ? {} : getDataAttributeProps(reference2, props.plugins));
  out.aria = Object.assign({}, defaultProps.aria, out.aria);
  out.aria = {
    expanded: out.aria.expanded === "auto" ? props.interactive : out.aria.expanded,
    content: out.aria.content === "auto" ? props.interactive ? null : "describedby" : out.aria.content
  };
  return out;
}
var innerHTML = function innerHTML2() {
  return "innerHTML";
};
function dangerouslySetInnerHTML(element, html) {
  element[innerHTML()] = html;
}
function createArrowElement(value) {
  var arrow2 = div();
  if (value === true) {
    arrow2.className = ARROW_CLASS;
  } else {
    arrow2.className = SVG_ARROW_CLASS;
    if (isElement(value)) {
      arrow2.appendChild(value);
    } else {
      dangerouslySetInnerHTML(arrow2, value);
    }
  }
  return arrow2;
}
function setContent(content2, props) {
  if (isElement(props.content)) {
    dangerouslySetInnerHTML(content2, "");
    content2.appendChild(props.content);
  } else if (typeof props.content !== "function") {
    if (props.allowHTML) {
      dangerouslySetInnerHTML(content2, props.content);
    } else {
      content2.textContent = props.content;
    }
  }
}
function getChildren(popper2) {
  var box = popper2.firstElementChild;
  var boxChildren = arrayFrom(box.children);
  return {
    box,
    content: boxChildren.find(function(node4) {
      return node4.classList.contains(CONTENT_CLASS);
    }),
    arrow: boxChildren.find(function(node4) {
      return node4.classList.contains(ARROW_CLASS) || node4.classList.contains(SVG_ARROW_CLASS);
    }),
    backdrop: boxChildren.find(function(node4) {
      return node4.classList.contains(BACKDROP_CLASS);
    })
  };
}
function render(instance) {
  var popper2 = div();
  var box = div();
  box.className = BOX_CLASS;
  box.setAttribute("data-state", "hidden");
  box.setAttribute("tabindex", "-1");
  var content2 = div();
  content2.className = CONTENT_CLASS;
  content2.setAttribute("data-state", "hidden");
  setContent(content2, instance.props);
  popper2.appendChild(box);
  box.appendChild(content2);
  onUpdate(instance.props, instance.props);
  function onUpdate(prevProps, nextProps) {
    var _getChildren = getChildren(popper2), box2 = _getChildren.box, content3 = _getChildren.content, arrow2 = _getChildren.arrow;
    if (nextProps.theme) {
      box2.setAttribute("data-theme", nextProps.theme);
    } else {
      box2.removeAttribute("data-theme");
    }
    if (typeof nextProps.animation === "string") {
      box2.setAttribute("data-animation", nextProps.animation);
    } else {
      box2.removeAttribute("data-animation");
    }
    if (nextProps.inertia) {
      box2.setAttribute("data-inertia", "");
    } else {
      box2.removeAttribute("data-inertia");
    }
    box2.style.maxWidth = typeof nextProps.maxWidth === "number" ? nextProps.maxWidth + "px" : nextProps.maxWidth;
    if (nextProps.role) {
      box2.setAttribute("role", nextProps.role);
    } else {
      box2.removeAttribute("role");
    }
    if (prevProps.content !== nextProps.content || prevProps.allowHTML !== nextProps.allowHTML) {
      setContent(content3, instance.props);
    }
    if (nextProps.arrow) {
      if (!arrow2) {
        box2.appendChild(createArrowElement(nextProps.arrow));
      } else if (prevProps.arrow !== nextProps.arrow) {
        box2.removeChild(arrow2);
        box2.appendChild(createArrowElement(nextProps.arrow));
      }
    } else if (arrow2) {
      box2.removeChild(arrow2);
    }
  }
  return {
    popper: popper2,
    onUpdate
  };
}
render.$$tippy = true;
var idCounter = 1;
var mouseMoveListeners = [];
var mountedInstances = [];
function createTippy(reference2, passedProps) {
  var props = evaluateProps(reference2, Object.assign({}, defaultProps, getExtendedPassedProps(removeUndefinedProps(passedProps))));
  var showTimeout;
  var hideTimeout;
  var scheduleHideAnimationFrame;
  var isVisibleFromClick = false;
  var didHideDueToDocumentMouseDown = false;
  var didTouchMove = false;
  var ignoreOnFirstUpdate = false;
  var lastTriggerEvent;
  var currentTransitionEndListener;
  var onFirstUpdate;
  var listeners = [];
  var debouncedOnMouseMove = debounce(onMouseMove, props.interactiveDebounce);
  var currentTarget;
  var id = idCounter++;
  var popperInstance = null;
  var plugins = unique(props.plugins);
  var state = {
    isEnabled: true,
    isVisible: false,
    isDestroyed: false,
    isMounted: false,
    isShown: false
  };
  var instance = {
    id,
    reference: reference2,
    popper: div(),
    popperInstance,
    props,
    state,
    plugins,
    clearDelayTimeouts,
    setProps: setProps2,
    setContent: setContent2,
    show,
    hide: hide2,
    hideWithInteractivity,
    enable,
    disable,
    unmount,
    destroy: destroy5
  };
  if (!props.render) {
    return instance;
  }
  var _props$render = props.render(instance), popper2 = _props$render.popper, onUpdate = _props$render.onUpdate;
  popper2.setAttribute("data-tippy-root", "");
  popper2.id = "tippy-" + instance.id;
  instance.popper = popper2;
  reference2._tippy = instance;
  popper2._tippy = instance;
  var pluginsHooks = plugins.map(function(plugin) {
    return plugin.fn(instance);
  });
  var hasAriaExpanded = reference2.hasAttribute("aria-expanded");
  addListeners();
  handleAriaExpandedAttribute();
  handleStyles();
  invokeHook("onCreate", [instance]);
  if (props.showOnCreate) {
    scheduleShow();
  }
  popper2.addEventListener("mouseenter", function() {
    if (instance.props.interactive && instance.state.isVisible) {
      instance.clearDelayTimeouts();
    }
  });
  popper2.addEventListener("mouseleave", function() {
    if (instance.props.interactive && instance.props.trigger.indexOf("mouseenter") >= 0) {
      getDocument().addEventListener("mousemove", debouncedOnMouseMove);
    }
  });
  return instance;
  function getNormalizedTouchSettings() {
    var touch = instance.props.touch;
    return Array.isArray(touch) ? touch : [touch, 0];
  }
  function getIsCustomTouchBehavior() {
    return getNormalizedTouchSettings()[0] === "hold";
  }
  function getIsDefaultRenderFn() {
    var _instance$props$rende;
    return !!((_instance$props$rende = instance.props.render) != null && _instance$props$rende.$$tippy);
  }
  function getCurrentTarget() {
    return currentTarget || reference2;
  }
  function getDocument() {
    var parent = getCurrentTarget().parentNode;
    return parent ? getOwnerDocument(parent) : document;
  }
  function getDefaultTemplateChildren() {
    return getChildren(popper2);
  }
  function getDelay(isShow) {
    if (instance.state.isMounted && !instance.state.isVisible || currentInput.isTouch || lastTriggerEvent && lastTriggerEvent.type === "focus") {
      return 0;
    }
    return getValueAtIndexOrReturn(instance.props.delay, isShow ? 0 : 1, defaultProps.delay);
  }
  function handleStyles(fromHide) {
    if (fromHide === void 0) {
      fromHide = false;
    }
    popper2.style.pointerEvents = instance.props.interactive && !fromHide ? "" : "none";
    popper2.style.zIndex = "" + instance.props.zIndex;
  }
  function invokeHook(hook, args, shouldInvokePropsHook) {
    if (shouldInvokePropsHook === void 0) {
      shouldInvokePropsHook = true;
    }
    pluginsHooks.forEach(function(pluginHooks) {
      if (pluginHooks[hook]) {
        pluginHooks[hook].apply(pluginHooks, args);
      }
    });
    if (shouldInvokePropsHook) {
      var _instance$props;
      (_instance$props = instance.props)[hook].apply(_instance$props, args);
    }
  }
  function handleAriaContentAttribute() {
    var aria = instance.props.aria;
    if (!aria.content) {
      return;
    }
    var attr = "aria-" + aria.content;
    var id2 = popper2.id;
    var nodes = normalizeToArray(instance.props.triggerTarget || reference2);
    nodes.forEach(function(node4) {
      var currentValue = node4.getAttribute(attr);
      if (instance.state.isVisible) {
        node4.setAttribute(attr, currentValue ? currentValue + " " + id2 : id2);
      } else {
        var nextValue = currentValue && currentValue.replace(id2, "").trim();
        if (nextValue) {
          node4.setAttribute(attr, nextValue);
        } else {
          node4.removeAttribute(attr);
        }
      }
    });
  }
  function handleAriaExpandedAttribute() {
    if (hasAriaExpanded || !instance.props.aria.expanded) {
      return;
    }
    var nodes = normalizeToArray(instance.props.triggerTarget || reference2);
    nodes.forEach(function(node4) {
      if (instance.props.interactive) {
        node4.setAttribute("aria-expanded", instance.state.isVisible && node4 === getCurrentTarget() ? "true" : "false");
      } else {
        node4.removeAttribute("aria-expanded");
      }
    });
  }
  function cleanupInteractiveMouseListeners() {
    getDocument().removeEventListener("mousemove", debouncedOnMouseMove);
    mouseMoveListeners = mouseMoveListeners.filter(function(listener) {
      return listener !== debouncedOnMouseMove;
    });
  }
  function onDocumentPress(event) {
    if (currentInput.isTouch) {
      if (didTouchMove || event.type === "mousedown") {
        return;
      }
    }
    var actualTarget = event.composedPath && event.composedPath()[0] || event.target;
    if (instance.props.interactive && actualContains(popper2, actualTarget)) {
      return;
    }
    if (normalizeToArray(instance.props.triggerTarget || reference2).some(function(el) {
      return actualContains(el, actualTarget);
    })) {
      if (currentInput.isTouch) {
        return;
      }
      if (instance.state.isVisible && instance.props.trigger.indexOf("click") >= 0) {
        return;
      }
    } else {
      invokeHook("onClickOutside", [instance, event]);
    }
    if (instance.props.hideOnClick === true) {
      instance.clearDelayTimeouts();
      instance.hide();
      didHideDueToDocumentMouseDown = true;
      setTimeout(function() {
        didHideDueToDocumentMouseDown = false;
      });
      if (!instance.state.isMounted) {
        removeDocumentPress();
      }
    }
  }
  function onTouchMove() {
    didTouchMove = true;
  }
  function onTouchStart() {
    didTouchMove = false;
  }
  function addDocumentPress() {
    var doc2 = getDocument();
    doc2.addEventListener("mousedown", onDocumentPress, true);
    doc2.addEventListener("touchend", onDocumentPress, TOUCH_OPTIONS);
    doc2.addEventListener("touchstart", onTouchStart, TOUCH_OPTIONS);
    doc2.addEventListener("touchmove", onTouchMove, TOUCH_OPTIONS);
  }
  function removeDocumentPress() {
    var doc2 = getDocument();
    doc2.removeEventListener("mousedown", onDocumentPress, true);
    doc2.removeEventListener("touchend", onDocumentPress, TOUCH_OPTIONS);
    doc2.removeEventListener("touchstart", onTouchStart, TOUCH_OPTIONS);
    doc2.removeEventListener("touchmove", onTouchMove, TOUCH_OPTIONS);
  }
  function onTransitionedOut(duration, callback) {
    onTransitionEnd(duration, function() {
      if (!instance.state.isVisible && popper2.parentNode && popper2.parentNode.contains(popper2)) {
        callback();
      }
    });
  }
  function onTransitionedIn(duration, callback) {
    onTransitionEnd(duration, callback);
  }
  function onTransitionEnd(duration, callback) {
    var box = getDefaultTemplateChildren().box;
    function listener(event) {
      if (event.target === box) {
        updateTransitionEndListener(box, "remove", listener);
        callback();
      }
    }
    if (duration === 0) {
      return callback();
    }
    updateTransitionEndListener(box, "remove", currentTransitionEndListener);
    updateTransitionEndListener(box, "add", listener);
    currentTransitionEndListener = listener;
  }
  function on(eventType, handler, options) {
    if (options === void 0) {
      options = false;
    }
    var nodes = normalizeToArray(instance.props.triggerTarget || reference2);
    nodes.forEach(function(node4) {
      node4.addEventListener(eventType, handler, options);
      listeners.push({
        node: node4,
        eventType,
        handler,
        options
      });
    });
  }
  function addListeners() {
    if (getIsCustomTouchBehavior()) {
      on("touchstart", onTrigger2, {
        passive: true
      });
      on("touchend", onMouseLeave, {
        passive: true
      });
    }
    splitBySpaces(instance.props.trigger).forEach(function(eventType) {
      if (eventType === "manual") {
        return;
      }
      on(eventType, onTrigger2);
      switch (eventType) {
        case "mouseenter":
          on("mouseleave", onMouseLeave);
          break;
        case "focus":
          on(isIE11 ? "focusout" : "blur", onBlurOrFocusOut);
          break;
        case "focusin":
          on("focusout", onBlurOrFocusOut);
          break;
      }
    });
  }
  function removeListeners() {
    listeners.forEach(function(_ref) {
      var node4 = _ref.node, eventType = _ref.eventType, handler = _ref.handler, options = _ref.options;
      node4.removeEventListener(eventType, handler, options);
    });
    listeners = [];
  }
  function onTrigger2(event) {
    var _lastTriggerEvent;
    var shouldScheduleClickHide = false;
    if (!instance.state.isEnabled || isEventListenerStopped(event) || didHideDueToDocumentMouseDown) {
      return;
    }
    var wasFocused = ((_lastTriggerEvent = lastTriggerEvent) == null ? void 0 : _lastTriggerEvent.type) === "focus";
    lastTriggerEvent = event;
    currentTarget = event.currentTarget;
    handleAriaExpandedAttribute();
    if (!instance.state.isVisible && isMouseEvent(event)) {
      mouseMoveListeners.forEach(function(listener) {
        return listener(event);
      });
    }
    if (event.type === "click" && (instance.props.trigger.indexOf("mouseenter") < 0 || isVisibleFromClick) && instance.props.hideOnClick !== false && instance.state.isVisible) {
      shouldScheduleClickHide = true;
    } else {
      scheduleShow(event);
    }
    if (event.type === "click") {
      isVisibleFromClick = !shouldScheduleClickHide;
    }
    if (shouldScheduleClickHide && !wasFocused) {
      scheduleHide(event);
    }
  }
  function onMouseMove(event) {
    var target = event.target;
    var isCursorOverReferenceOrPopper = getCurrentTarget().contains(target) || popper2.contains(target);
    if (event.type === "mousemove" && isCursorOverReferenceOrPopper) {
      return;
    }
    var popperTreeData = getNestedPopperTree().concat(popper2).map(function(popper3) {
      var _instance$popperInsta;
      var instance2 = popper3._tippy;
      var state2 = (_instance$popperInsta = instance2.popperInstance) == null ? void 0 : _instance$popperInsta.state;
      if (state2) {
        return {
          popperRect: popper3.getBoundingClientRect(),
          popperState: state2,
          props
        };
      }
      return null;
    }).filter(Boolean);
    if (isCursorOutsideInteractiveBorder(popperTreeData, event)) {
      cleanupInteractiveMouseListeners();
      scheduleHide(event);
    }
  }
  function onMouseLeave(event) {
    var shouldBail = isEventListenerStopped(event) || instance.props.trigger.indexOf("click") >= 0 && isVisibleFromClick;
    if (shouldBail) {
      return;
    }
    if (instance.props.interactive) {
      instance.hideWithInteractivity(event);
      return;
    }
    scheduleHide(event);
  }
  function onBlurOrFocusOut(event) {
    if (instance.props.trigger.indexOf("focusin") < 0 && event.target !== getCurrentTarget()) {
      return;
    }
    if (instance.props.interactive && event.relatedTarget && popper2.contains(event.relatedTarget)) {
      return;
    }
    scheduleHide(event);
  }
  function isEventListenerStopped(event) {
    return currentInput.isTouch ? getIsCustomTouchBehavior() !== event.type.indexOf("touch") >= 0 : false;
  }
  function createPopperInstance() {
    destroyPopperInstance();
    var _instance$props2 = instance.props, popperOptions = _instance$props2.popperOptions, placement = _instance$props2.placement, offset3 = _instance$props2.offset, getReferenceClientRect = _instance$props2.getReferenceClientRect, moveTransition = _instance$props2.moveTransition;
    var arrow2 = getIsDefaultRenderFn() ? getChildren(popper2).arrow : null;
    var computedReference = getReferenceClientRect ? {
      getBoundingClientRect: getReferenceClientRect,
      contextElement: getReferenceClientRect.contextElement || getCurrentTarget()
    } : reference2;
    var tippyModifier = {
      name: "$$tippy",
      enabled: true,
      phase: "beforeWrite",
      requires: ["computeStyles"],
      fn: function fn2(_ref2) {
        var state2 = _ref2.state;
        if (getIsDefaultRenderFn()) {
          var _getDefaultTemplateCh = getDefaultTemplateChildren(), box = _getDefaultTemplateCh.box;
          ["placement", "reference-hidden", "escaped"].forEach(function(attr) {
            if (attr === "placement") {
              box.setAttribute("data-placement", state2.placement);
            } else {
              if (state2.attributes.popper["data-popper-" + attr]) {
                box.setAttribute("data-" + attr, "");
              } else {
                box.removeAttribute("data-" + attr);
              }
            }
          });
          state2.attributes.popper = {};
        }
      }
    };
    var modifiers2 = [{
      name: "offset",
      options: {
        offset: offset3
      }
    }, {
      name: "preventOverflow",
      options: {
        padding: {
          top: 2,
          bottom: 2,
          left: 5,
          right: 5
        }
      }
    }, {
      name: "flip",
      options: {
        padding: 5
      }
    }, {
      name: "computeStyles",
      options: {
        adaptive: !moveTransition
      }
    }, tippyModifier];
    if (getIsDefaultRenderFn() && arrow2) {
      modifiers2.push({
        name: "arrow",
        options: {
          element: arrow2,
          padding: 3
        }
      });
    }
    modifiers2.push.apply(modifiers2, (popperOptions == null ? void 0 : popperOptions.modifiers) || []);
    instance.popperInstance = createPopper(computedReference, popper2, Object.assign({}, popperOptions, {
      placement,
      onFirstUpdate,
      modifiers: modifiers2
    }));
  }
  function destroyPopperInstance() {
    if (instance.popperInstance) {
      instance.popperInstance.destroy();
      instance.popperInstance = null;
    }
  }
  function mount() {
    var appendTo = instance.props.appendTo;
    var parentNode2;
    var node4 = getCurrentTarget();
    if (instance.props.interactive && appendTo === TIPPY_DEFAULT_APPEND_TO || appendTo === "parent") {
      parentNode2 = node4.parentNode;
    } else {
      parentNode2 = invokeWithArgsOrReturn(appendTo, [node4]);
    }
    if (!parentNode2.contains(popper2)) {
      parentNode2.appendChild(popper2);
    }
    instance.state.isMounted = true;
    createPopperInstance();
  }
  function getNestedPopperTree() {
    return arrayFrom(popper2.querySelectorAll("[data-tippy-root]"));
  }
  function scheduleShow(event) {
    instance.clearDelayTimeouts();
    if (event) {
      invokeHook("onTrigger", [instance, event]);
    }
    addDocumentPress();
    var delay = getDelay(true);
    var _getNormalizedTouchSe = getNormalizedTouchSettings(), touchValue = _getNormalizedTouchSe[0], touchDelay = _getNormalizedTouchSe[1];
    if (currentInput.isTouch && touchValue === "hold" && touchDelay) {
      delay = touchDelay;
    }
    if (delay) {
      showTimeout = setTimeout(function() {
        instance.show();
      }, delay);
    } else {
      instance.show();
    }
  }
  function scheduleHide(event) {
    instance.clearDelayTimeouts();
    invokeHook("onUntrigger", [instance, event]);
    if (!instance.state.isVisible) {
      removeDocumentPress();
      return;
    }
    if (instance.props.trigger.indexOf("mouseenter") >= 0 && instance.props.trigger.indexOf("click") >= 0 && ["mouseleave", "mousemove"].indexOf(event.type) >= 0 && isVisibleFromClick) {
      return;
    }
    var delay = getDelay(false);
    if (delay) {
      hideTimeout = setTimeout(function() {
        if (instance.state.isVisible) {
          instance.hide();
        }
      }, delay);
    } else {
      scheduleHideAnimationFrame = requestAnimationFrame(function() {
        instance.hide();
      });
    }
  }
  function enable() {
    instance.state.isEnabled = true;
  }
  function disable() {
    instance.hide();
    instance.state.isEnabled = false;
  }
  function clearDelayTimeouts() {
    clearTimeout(showTimeout);
    clearTimeout(hideTimeout);
    cancelAnimationFrame(scheduleHideAnimationFrame);
  }
  function setProps2(partialProps) {
    if (instance.state.isDestroyed) {
      return;
    }
    invokeHook("onBeforeUpdate", [instance, partialProps]);
    removeListeners();
    var prevProps = instance.props;
    var nextProps = evaluateProps(reference2, Object.assign({}, prevProps, removeUndefinedProps(partialProps), {
      ignoreAttributes: true
    }));
    instance.props = nextProps;
    addListeners();
    if (prevProps.interactiveDebounce !== nextProps.interactiveDebounce) {
      cleanupInteractiveMouseListeners();
      debouncedOnMouseMove = debounce(onMouseMove, nextProps.interactiveDebounce);
    }
    if (prevProps.triggerTarget && !nextProps.triggerTarget) {
      normalizeToArray(prevProps.triggerTarget).forEach(function(node4) {
        node4.removeAttribute("aria-expanded");
      });
    } else if (nextProps.triggerTarget) {
      reference2.removeAttribute("aria-expanded");
    }
    handleAriaExpandedAttribute();
    handleStyles();
    if (onUpdate) {
      onUpdate(prevProps, nextProps);
    }
    if (instance.popperInstance) {
      createPopperInstance();
      getNestedPopperTree().forEach(function(nestedPopper) {
        requestAnimationFrame(nestedPopper._tippy.popperInstance.forceUpdate);
      });
    }
    invokeHook("onAfterUpdate", [instance, partialProps]);
  }
  function setContent2(content2) {
    instance.setProps({
      content: content2
    });
  }
  function show() {
    var isAlreadyVisible = instance.state.isVisible;
    var isDestroyed = instance.state.isDestroyed;
    var isDisabled = !instance.state.isEnabled;
    var isTouchAndTouchDisabled = currentInput.isTouch && !instance.props.touch;
    var duration = getValueAtIndexOrReturn(instance.props.duration, 0, defaultProps.duration);
    if (isAlreadyVisible || isDestroyed || isDisabled || isTouchAndTouchDisabled) {
      return;
    }
    if (getCurrentTarget().hasAttribute("disabled")) {
      return;
    }
    invokeHook("onShow", [instance], false);
    if (instance.props.onShow(instance) === false) {
      return;
    }
    instance.state.isVisible = true;
    if (getIsDefaultRenderFn()) {
      popper2.style.visibility = "visible";
    }
    handleStyles();
    addDocumentPress();
    if (!instance.state.isMounted) {
      popper2.style.transition = "none";
    }
    if (getIsDefaultRenderFn()) {
      var _getDefaultTemplateCh2 = getDefaultTemplateChildren(), box = _getDefaultTemplateCh2.box, content2 = _getDefaultTemplateCh2.content;
      setTransitionDuration([box, content2], 0);
    }
    onFirstUpdate = function onFirstUpdate2() {
      var _instance$popperInsta2;
      if (!instance.state.isVisible || ignoreOnFirstUpdate) {
        return;
      }
      ignoreOnFirstUpdate = true;
      void popper2.offsetHeight;
      popper2.style.transition = instance.props.moveTransition;
      if (getIsDefaultRenderFn() && instance.props.animation) {
        var _getDefaultTemplateCh3 = getDefaultTemplateChildren(), _box = _getDefaultTemplateCh3.box, _content = _getDefaultTemplateCh3.content;
        setTransitionDuration([_box, _content], duration);
        setVisibilityState([_box, _content], "visible");
      }
      handleAriaContentAttribute();
      handleAriaExpandedAttribute();
      pushIfUnique(mountedInstances, instance);
      (_instance$popperInsta2 = instance.popperInstance) == null ? void 0 : _instance$popperInsta2.forceUpdate();
      invokeHook("onMount", [instance]);
      if (instance.props.animation && getIsDefaultRenderFn()) {
        onTransitionedIn(duration, function() {
          instance.state.isShown = true;
          invokeHook("onShown", [instance]);
        });
      }
    };
    mount();
  }
  function hide2() {
    var isAlreadyHidden = !instance.state.isVisible;
    var isDestroyed = instance.state.isDestroyed;
    var isDisabled = !instance.state.isEnabled;
    var duration = getValueAtIndexOrReturn(instance.props.duration, 1, defaultProps.duration);
    if (isAlreadyHidden || isDestroyed || isDisabled) {
      return;
    }
    invokeHook("onHide", [instance], false);
    if (instance.props.onHide(instance) === false) {
      return;
    }
    instance.state.isVisible = false;
    instance.state.isShown = false;
    ignoreOnFirstUpdate = false;
    isVisibleFromClick = false;
    if (getIsDefaultRenderFn()) {
      popper2.style.visibility = "hidden";
    }
    cleanupInteractiveMouseListeners();
    removeDocumentPress();
    handleStyles(true);
    if (getIsDefaultRenderFn()) {
      var _getDefaultTemplateCh4 = getDefaultTemplateChildren(), box = _getDefaultTemplateCh4.box, content2 = _getDefaultTemplateCh4.content;
      if (instance.props.animation) {
        setTransitionDuration([box, content2], duration);
        setVisibilityState([box, content2], "hidden");
      }
    }
    handleAriaContentAttribute();
    handleAriaExpandedAttribute();
    if (instance.props.animation) {
      if (getIsDefaultRenderFn()) {
        onTransitionedOut(duration, instance.unmount);
      }
    } else {
      instance.unmount();
    }
  }
  function hideWithInteractivity(event) {
    getDocument().addEventListener("mousemove", debouncedOnMouseMove);
    pushIfUnique(mouseMoveListeners, debouncedOnMouseMove);
    debouncedOnMouseMove(event);
  }
  function unmount() {
    if (instance.state.isVisible) {
      instance.hide();
    }
    if (!instance.state.isMounted) {
      return;
    }
    destroyPopperInstance();
    getNestedPopperTree().forEach(function(nestedPopper) {
      nestedPopper._tippy.unmount();
    });
    if (popper2.parentNode) {
      popper2.parentNode.removeChild(popper2);
    }
    mountedInstances = mountedInstances.filter(function(i2) {
      return i2 !== instance;
    });
    instance.state.isMounted = false;
    invokeHook("onHidden", [instance]);
  }
  function destroy5() {
    if (instance.state.isDestroyed) {
      return;
    }
    instance.clearDelayTimeouts();
    instance.unmount();
    removeListeners();
    delete reference2._tippy;
    instance.state.isDestroyed = true;
    invokeHook("onDestroy", [instance]);
  }
}
function tippy(targets, optionalProps) {
  if (optionalProps === void 0) {
    optionalProps = {};
  }
  var plugins = defaultProps.plugins.concat(optionalProps.plugins || []);
  bindGlobalEventListeners();
  var passedProps = Object.assign({}, optionalProps, {
    plugins
  });
  var elements = getArrayOfElements(targets);
  var instances = elements.reduce(function(acc, reference2) {
    var instance = reference2 && createTippy(reference2, passedProps);
    if (instance) {
      acc.push(instance);
    }
    return acc;
  }, []);
  return isElement(targets) ? instances[0] : instances;
}
tippy.defaultProps = defaultProps;
tippy.setDefaultProps = setDefaultProps;
tippy.currentInput = currentInput;
Object.assign({}, applyStyles$1, {
  effect: function effect2(_ref) {
    var state = _ref.state;
    var initialStyles = {
      popper: {
        position: state.options.strategy,
        left: "0",
        top: "0",
        margin: "0"
      },
      arrow: {
        position: "absolute"
      },
      reference: {}
    };
    Object.assign(state.elements.popper.style, initialStyles.popper);
    state.styles = initialStyles;
    if (state.elements.arrow) {
      Object.assign(state.elements.arrow.style, initialStyles.arrow);
    }
  }
});
tippy.setDefaultProps({
  render
});
class BubbleMenuView {
  constructor({ editor, element, view, tippyOptions = {}, shouldShow }) {
    this.preventHide = false;
    this.shouldShow = ({ view: view2, state, from: from4, to }) => {
      const { doc: doc2, selection } = state;
      const { empty: empty2 } = selection;
      const isEmptyTextBlock = !doc2.textBetween(from4, to).length && isTextSelection(state.selection);
      if (!view2.hasFocus() || empty2 || isEmptyTextBlock) {
        return false;
      }
      return true;
    };
    this.mousedownHandler = () => {
      this.preventHide = true;
    };
    this.dragstartHandler = () => {
      this.hide();
    };
    this.focusHandler = () => {
      setTimeout(() => this.update(this.editor.view));
    };
    this.blurHandler = ({ event }) => {
      var _a;
      if (this.preventHide) {
        this.preventHide = false;
        return;
      }
      if ((event === null || event === void 0 ? void 0 : event.relatedTarget) && ((_a = this.element.parentNode) === null || _a === void 0 ? void 0 : _a.contains(event.relatedTarget))) {
        return;
      }
      this.hide();
    };
    this.editor = editor;
    this.element = element;
    this.view = view;
    if (shouldShow) {
      this.shouldShow = shouldShow;
    }
    this.element.addEventListener("mousedown", this.mousedownHandler, { capture: true });
    this.view.dom.addEventListener("dragstart", this.dragstartHandler);
    this.editor.on("focus", this.focusHandler);
    this.editor.on("blur", this.blurHandler);
    this.tippyOptions = tippyOptions;
    this.element.remove();
    this.element.style.visibility = "visible";
  }
  createTooltip() {
    const { element: editorElement } = this.editor.options;
    const editorIsAttached = !!editorElement.parentElement;
    if (this.tippy || !editorIsAttached) {
      return;
    }
    this.tippy = tippy(editorElement, __spreadValues({
      duration: 0,
      getReferenceClientRect: null,
      content: this.element,
      interactive: true,
      trigger: "manual",
      placement: "top",
      hideOnClick: "toggle"
    }, this.tippyOptions));
    if (this.tippy.popper.firstChild) {
      this.tippy.popper.firstChild.addEventListener("blur", (event) => {
        this.blurHandler({ event });
      });
    }
  }
  update(view, oldState) {
    var _a, _b, _c;
    const { state, composing } = view;
    const { doc: doc2, selection } = state;
    const isSame = oldState && oldState.doc.eq(doc2) && oldState.selection.eq(selection);
    if (composing || isSame) {
      return;
    }
    this.createTooltip();
    const { ranges } = selection;
    const from4 = Math.min(...ranges.map((range) => range.$from.pos));
    const to = Math.max(...ranges.map((range) => range.$to.pos));
    const shouldShow = (_a = this.shouldShow) === null || _a === void 0 ? void 0 : _a.call(this, {
      editor: this.editor,
      view,
      state,
      oldState,
      from: from4,
      to
    });
    if (!shouldShow) {
      this.hide();
      return;
    }
    (_b = this.tippy) === null || _b === void 0 ? void 0 : _b.setProps({
      getReferenceClientRect: ((_c = this.tippyOptions) === null || _c === void 0 ? void 0 : _c.getReferenceClientRect) || (() => {
        if (isNodeSelection(state.selection)) {
          const node4 = view.nodeDOM(from4);
          if (node4) {
            return node4.getBoundingClientRect();
          }
        }
        return posToDOMRect(view, from4, to);
      })
    });
    this.show();
  }
  show() {
    var _a;
    (_a = this.tippy) === null || _a === void 0 ? void 0 : _a.show();
  }
  hide() {
    var _a;
    (_a = this.tippy) === null || _a === void 0 ? void 0 : _a.hide();
  }
  destroy() {
    var _a;
    (_a = this.tippy) === null || _a === void 0 ? void 0 : _a.destroy();
    this.element.removeEventListener("mousedown", this.mousedownHandler, { capture: true });
    this.view.dom.removeEventListener("dragstart", this.dragstartHandler);
    this.editor.off("focus", this.focusHandler);
    this.editor.off("blur", this.blurHandler);
  }
}
const BubbleMenuPlugin = (options) => {
  return new Plugin({
    key: typeof options.pluginKey === "string" ? new PluginKey(options.pluginKey) : options.pluginKey,
    view: (view) => new BubbleMenuView(__spreadValues({ view }, options))
  });
};
Extension.create({
  name: "bubbleMenu",
  addOptions() {
    return {
      element: null,
      tippyOptions: {},
      pluginKey: "bubbleMenu",
      shouldShow: null
    };
  },
  addProseMirrorPlugins() {
    if (!this.options.element) {
      return [];
    }
    return [
      BubbleMenuPlugin({
        pluginKey: this.options.pluginKey,
        editor: this.editor,
        element: this.options.element,
        tippyOptions: this.options.tippyOptions,
        shouldShow: this.options.shouldShow
      })
    ];
  }
});
class FloatingMenuView {
  constructor({ editor, element, view, tippyOptions = {}, shouldShow }) {
    this.preventHide = false;
    this.shouldShow = ({ view: view2, state }) => {
      const { selection } = state;
      const { $anchor, empty: empty2 } = selection;
      const isRootDepth = $anchor.depth === 1;
      const isEmptyTextBlock = $anchor.parent.isTextblock && !$anchor.parent.type.spec.code && !$anchor.parent.textContent;
      if (!view2.hasFocus() || !empty2 || !isRootDepth || !isEmptyTextBlock) {
        return false;
      }
      return true;
    };
    this.mousedownHandler = () => {
      this.preventHide = true;
    };
    this.focusHandler = () => {
      setTimeout(() => this.update(this.editor.view));
    };
    this.blurHandler = ({ event }) => {
      var _a;
      if (this.preventHide) {
        this.preventHide = false;
        return;
      }
      if ((event === null || event === void 0 ? void 0 : event.relatedTarget) && ((_a = this.element.parentNode) === null || _a === void 0 ? void 0 : _a.contains(event.relatedTarget))) {
        return;
      }
      this.hide();
    };
    this.editor = editor;
    this.element = element;
    this.view = view;
    if (shouldShow) {
      this.shouldShow = shouldShow;
    }
    this.element.addEventListener("mousedown", this.mousedownHandler, { capture: true });
    this.editor.on("focus", this.focusHandler);
    this.editor.on("blur", this.blurHandler);
    this.tippyOptions = tippyOptions;
    this.element.remove();
    this.element.style.visibility = "visible";
  }
  createTooltip() {
    const { element: editorElement } = this.editor.options;
    const editorIsAttached = !!editorElement.parentElement;
    if (this.tippy || !editorIsAttached) {
      return;
    }
    this.tippy = tippy(editorElement, __spreadValues({
      duration: 0,
      getReferenceClientRect: null,
      content: this.element,
      interactive: true,
      trigger: "manual",
      placement: "right",
      hideOnClick: "toggle"
    }, this.tippyOptions));
    if (this.tippy.popper.firstChild) {
      this.tippy.popper.firstChild.addEventListener("blur", (event) => {
        this.blurHandler({ event });
      });
    }
  }
  update(view, oldState) {
    var _a, _b, _c;
    const { state } = view;
    const { doc: doc2, selection } = state;
    const { from: from4, to } = selection;
    const isSame = oldState && oldState.doc.eq(doc2) && oldState.selection.eq(selection);
    if (isSame) {
      return;
    }
    this.createTooltip();
    const shouldShow = (_a = this.shouldShow) === null || _a === void 0 ? void 0 : _a.call(this, {
      editor: this.editor,
      view,
      state,
      oldState
    });
    if (!shouldShow) {
      this.hide();
      return;
    }
    (_b = this.tippy) === null || _b === void 0 ? void 0 : _b.setProps({
      getReferenceClientRect: ((_c = this.tippyOptions) === null || _c === void 0 ? void 0 : _c.getReferenceClientRect) || (() => posToDOMRect(view, from4, to))
    });
    this.show();
  }
  show() {
    var _a;
    (_a = this.tippy) === null || _a === void 0 ? void 0 : _a.show();
  }
  hide() {
    var _a;
    (_a = this.tippy) === null || _a === void 0 ? void 0 : _a.hide();
  }
  destroy() {
    var _a;
    (_a = this.tippy) === null || _a === void 0 ? void 0 : _a.destroy();
    this.element.removeEventListener("mousedown", this.mousedownHandler, { capture: true });
    this.editor.off("focus", this.focusHandler);
    this.editor.off("blur", this.blurHandler);
  }
}
const FloatingMenuPlugin = (options) => {
  return new Plugin({
    key: typeof options.pluginKey === "string" ? new PluginKey(options.pluginKey) : options.pluginKey,
    view: (view) => new FloatingMenuView(__spreadValues({ view }, options))
  });
};
Extension.create({
  name: "floatingMenu",
  addOptions() {
    return {
      element: null,
      tippyOptions: {},
      pluginKey: "floatingMenu",
      shouldShow: null
    };
  },
  addProseMirrorPlugins() {
    if (!this.options.element) {
      return [];
    }
    return [
      FloatingMenuPlugin({
        pluginKey: this.options.pluginKey,
        editor: this.editor,
        element: this.options.element,
        tippyOptions: this.options.tippyOptions,
        shouldShow: this.options.shouldShow
      })
    ];
  }
});
defineComponent({
  name: "BubbleMenu",
  props: {
    pluginKey: {
      type: null,
      default: "bubbleMenu"
    },
    editor: {
      type: Object,
      required: true
    },
    tippyOptions: {
      type: Object,
      default: () => ({})
    },
    shouldShow: {
      type: Function,
      default: null
    }
  },
  setup(props, { slots }) {
    const root = ref(null);
    onMounted(() => {
      const { pluginKey, editor, tippyOptions, shouldShow } = props;
      editor.registerPlugin(BubbleMenuPlugin({
        pluginKey,
        editor,
        element: root.value,
        tippyOptions,
        shouldShow
      }));
    });
    onBeforeUnmount(() => {
      const { pluginKey, editor } = props;
      editor.unregisterPlugin(pluginKey);
    });
    return () => {
      var _a;
      return h("div", { ref: root }, (_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots));
    };
  }
});
function useDebouncedRef(value) {
  return customRef((track2, trigger2) => {
    return {
      get() {
        track2();
        return value;
      },
      set(newValue) {
        value = newValue;
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            trigger2();
          });
        });
      }
    };
  });
}
class Editor extends Editor$1 {
  constructor(options = {}) {
    super(options);
    this.vueRenderers = reactive(/* @__PURE__ */ new Map());
    this.contentComponent = null;
    this.reactiveState = useDebouncedRef(this.view.state);
    this.reactiveExtensionStorage = useDebouncedRef(this.extensionStorage);
    this.on("transaction", () => {
      this.reactiveState.value = this.view.state;
      this.reactiveExtensionStorage.value = this.extensionStorage;
    });
    return markRaw(this);
  }
  get state() {
    return this.reactiveState ? this.reactiveState.value : this.view.state;
  }
  get storage() {
    return this.reactiveExtensionStorage ? this.reactiveExtensionStorage.value : super.storage;
  }
  registerPlugin(plugin, handlePlugins) {
    super.registerPlugin(plugin, handlePlugins);
    this.reactiveState.value = this.view.state;
  }
  unregisterPlugin(nameOrPluginKey) {
    super.unregisterPlugin(nameOrPluginKey);
    this.reactiveState.value = this.view.state;
  }
}
const EditorContent = defineComponent({
  name: "EditorContent",
  props: {
    editor: {
      default: null,
      type: Object
    }
  },
  setup(props) {
    const rootEl = ref();
    const instance = getCurrentInstance();
    watchEffect(() => {
      const editor = props.editor;
      if (editor && editor.options.element && rootEl.value) {
        nextTick(() => {
          if (!rootEl.value || !editor.options.element.firstChild) {
            return;
          }
          const element = unref(rootEl.value);
          rootEl.value.append(...editor.options.element.childNodes);
          editor.contentComponent = instance.ctx._;
          editor.setOptions({
            element
          });
          editor.createNodeViews();
        });
      }
    });
    onBeforeUnmount(() => {
      const editor = props.editor;
      if (!editor) {
        return;
      }
      if (!editor.isDestroyed) {
        editor.view.setProps({
          nodeViews: {}
        });
      }
      editor.contentComponent = null;
      if (!editor.options.element.firstChild) {
        return;
      }
      const newElement = document.createElement("div");
      newElement.append(...editor.options.element.childNodes);
      editor.setOptions({
        element: newElement
      });
    });
    return { rootEl };
  },
  render() {
    const vueRenderers = [];
    if (this.editor) {
      this.editor.vueRenderers.forEach((vueRenderer) => {
        const node4 = h(Teleport, {
          to: vueRenderer.teleportElement,
          key: vueRenderer.id
        }, h(vueRenderer.component, __spreadValues({
          ref: vueRenderer.id
        }, vueRenderer.props)));
        vueRenderers.push(node4);
      });
    }
    return h("div", {
      ref: (el) => {
        this.rootEl = el;
      }
    }, ...vueRenderers);
  }
});
defineComponent({
  name: "FloatingMenu",
  props: {
    pluginKey: {
      type: null,
      default: "floatingMenu"
    },
    editor: {
      type: Object,
      required: true
    },
    tippyOptions: {
      type: Object,
      default: () => ({})
    },
    shouldShow: {
      type: Function,
      default: null
    }
  },
  setup(props, { slots }) {
    const root = ref(null);
    onMounted(() => {
      const { pluginKey, editor, tippyOptions, shouldShow } = props;
      editor.registerPlugin(FloatingMenuPlugin({
        pluginKey,
        editor,
        element: root.value,
        tippyOptions,
        shouldShow
      }));
    });
    onBeforeUnmount(() => {
      const { pluginKey, editor } = props;
      editor.unregisterPlugin(pluginKey);
    });
    return () => {
      var _a;
      return h("div", { ref: root }, (_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots));
    };
  }
});
const useEditor = (options = {}) => {
  const editor = shallowRef();
  onMounted(() => {
    editor.value = new Editor(options);
  });
  onBeforeUnmount(() => {
    var _a;
    (_a = editor.value) === null || _a === void 0 ? void 0 : _a.destroy();
  });
  return editor;
};
defineComponent({
  props: {
    as: {
      type: String,
      default: "div"
    }
  },
  inject: ["onDragStart", "decorationClasses"],
  render() {
    var _a, _b;
    return h(this.as, {
      class: this.decorationClasses.value,
      style: {
        whiteSpace: "normal"
      },
      "data-node-view-wrapper": "",
      onDragstart: this.onDragStart
    }, (_b = (_a = this.$slots).default) === null || _b === void 0 ? void 0 : _b.call(_a));
  }
});
defineComponent({
  props: {
    as: {
      type: String,
      default: "div"
    }
  },
  render() {
    return h(this.as, {
      style: {
        whiteSpace: "pre-wrap"
      },
      "data-node-view-content": ""
    });
  }
});
const inputRegex$5 = /^\s*([-+*])\s$/;
Node.create({
  name: "bulletList",
  addOptions() {
    return {
      itemTypeName: "listItem",
      HTMLAttributes: {}
    };
  },
  group: "block list",
  content() {
    return `${this.options.itemTypeName}+`;
  },
  parseHTML() {
    return [
      { tag: "ul" }
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ["ul", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },
  addCommands() {
    return {
      toggleBulletList: () => ({ commands }) => {
        return commands.toggleList(this.name, this.options.itemTypeName);
      }
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-8": () => this.editor.commands.toggleBulletList()
    };
  },
  addInputRules() {
    return [
      wrappingInputRule({
        find: inputRegex$5,
        type: this.type
      })
    ];
  }
});
const inputRegex$4 = /^\s*>\s$/;
Node.create({
  name: "blockquote",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  content: "block+",
  group: "block",
  defining: true,
  parseHTML() {
    return [
      { tag: "blockquote" }
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ["blockquote", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },
  addCommands() {
    return {
      setBlockquote: () => ({ commands }) => {
        return commands.wrapIn(this.name);
      },
      toggleBlockquote: () => ({ commands }) => {
        return commands.toggleWrap(this.name);
      },
      unsetBlockquote: () => ({ commands }) => {
        return commands.lift(this.name);
      }
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-b": () => this.editor.commands.toggleBlockquote()
    };
  },
  addInputRules() {
    return [
      wrappingInputRule({
        find: inputRegex$4,
        type: this.type
      })
    ];
  }
});
const inputRegex$3 = /(?:^|\s)((?:`)((?:[^`]+))(?:`))$/;
const pasteRegex$1 = /(?:^|\s)((?:`)((?:[^`]+))(?:`))/g;
Mark.create({
  name: "code",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  excludes: "_",
  code: true,
  parseHTML() {
    return [
      { tag: "code" }
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ["code", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },
  addCommands() {
    return {
      setCode: () => ({ commands }) => {
        return commands.setMark(this.name);
      },
      toggleCode: () => ({ commands }) => {
        return commands.toggleMark(this.name);
      },
      unsetCode: () => ({ commands }) => {
        return commands.unsetMark(this.name);
      }
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-e": () => this.editor.commands.toggleCode()
    };
  },
  addInputRules() {
    return [
      markInputRule({
        find: inputRegex$3,
        type: this.type
      })
    ];
  },
  addPasteRules() {
    return [
      markPasteRule({
        find: pasteRegex$1,
        type: this.type
      })
    ];
  }
});
const backtickInputRegex = /^```([a-z]+)?[\s\n]$/;
const tildeInputRegex = /^~~~([a-z]+)?[\s\n]$/;
Node.create({
  name: "codeBlock",
  addOptions() {
    return {
      languageClassPrefix: "language-",
      exitOnTripleEnter: true,
      exitOnArrowDown: true,
      HTMLAttributes: {}
    };
  },
  content: "text*",
  marks: "",
  group: "block",
  code: true,
  defining: true,
  addAttributes() {
    return {
      language: {
        default: null,
        parseHTML: (element) => {
          var _a;
          const { languageClassPrefix } = this.options;
          const classNames = [...((_a = element.firstElementChild) === null || _a === void 0 ? void 0 : _a.classList) || []];
          const languages = classNames.filter((className) => className.startsWith(languageClassPrefix)).map((className) => className.replace(languageClassPrefix, ""));
          const language = languages[0];
          if (!language) {
            return null;
          }
          return language;
        },
        rendered: false
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: "pre",
        preserveWhitespace: "full"
      }
    ];
  },
  renderHTML({ node: node4, HTMLAttributes }) {
    return [
      "pre",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      [
        "code",
        {
          class: node4.attrs.language ? this.options.languageClassPrefix + node4.attrs.language : null
        },
        0
      ]
    ];
  },
  addCommands() {
    return {
      setCodeBlock: (attributes) => ({ commands }) => {
        return commands.setNode(this.name, attributes);
      },
      toggleCodeBlock: (attributes) => ({ commands }) => {
        return commands.toggleNode(this.name, "paragraph", attributes);
      }
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Alt-c": () => this.editor.commands.toggleCodeBlock(),
      Backspace: () => {
        const { empty: empty2, $anchor } = this.editor.state.selection;
        const isAtStart = $anchor.pos === 1;
        if (!empty2 || $anchor.parent.type.name !== this.name) {
          return false;
        }
        if (isAtStart || !$anchor.parent.textContent.length) {
          return this.editor.commands.clearNodes();
        }
        return false;
      },
      Enter: ({ editor }) => {
        if (!this.options.exitOnTripleEnter) {
          return false;
        }
        const { state } = editor;
        const { selection } = state;
        const { $from, empty: empty2 } = selection;
        if (!empty2 || $from.parent.type !== this.type) {
          return false;
        }
        const isAtEnd = $from.parentOffset === $from.parent.nodeSize - 2;
        const endsWithDoubleNewline = $from.parent.textContent.endsWith("\n\n");
        if (!isAtEnd || !endsWithDoubleNewline) {
          return false;
        }
        return editor.chain().command(({ tr }) => {
          tr.delete($from.pos - 2, $from.pos);
          return true;
        }).exitCode().run();
      },
      ArrowDown: ({ editor }) => {
        if (!this.options.exitOnArrowDown) {
          return false;
        }
        const { state } = editor;
        const { selection, doc: doc2 } = state;
        const { $from, empty: empty2 } = selection;
        if (!empty2 || $from.parent.type !== this.type) {
          return false;
        }
        const isAtEnd = $from.parentOffset === $from.parent.nodeSize - 2;
        if (!isAtEnd) {
          return false;
        }
        const after2 = $from.after();
        if (after2 === void 0) {
          return false;
        }
        const nodeAfter = doc2.nodeAt(after2);
        if (nodeAfter) {
          return false;
        }
        return editor.commands.exitCode();
      }
    };
  },
  addInputRules() {
    return [
      textblockTypeInputRule({
        find: backtickInputRegex,
        type: this.type,
        getAttributes: (match) => ({
          language: match[1]
        })
      }),
      textblockTypeInputRule({
        find: tildeInputRegex,
        type: this.type,
        getAttributes: (match) => ({
          language: match[1]
        })
      })
    ];
  },
  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey("codeBlockVSCodeHandler"),
        props: {
          handlePaste: (view, event) => {
            if (!event.clipboardData) {
              return false;
            }
            if (this.editor.isActive(this.type.name)) {
              return false;
            }
            const text2 = event.clipboardData.getData("text/plain");
            const vscode = event.clipboardData.getData("vscode-editor-data");
            const vscodeData = vscode ? JSON.parse(vscode) : void 0;
            const language = vscodeData === null || vscodeData === void 0 ? void 0 : vscodeData.mode;
            if (!text2 || !language) {
              return false;
            }
            const { tr } = view.state;
            tr.replaceSelectionWith(this.type.create({ language }));
            tr.setSelection(TextSelection.near(tr.doc.resolve(Math.max(0, tr.selection.from - 2))));
            tr.insertText(text2.replace(/\r\n?/g, "\n"));
            tr.setMeta("paste", true);
            view.dispatch(tr);
            return true;
          }
        }
      })
    ];
  }
});
function dropCursor(options) {
  if (options === void 0)
    options = {};
  return new Plugin({
    view: function view(editorView) {
      return new DropCursorView(editorView, options);
    }
  });
}
var DropCursorView = function DropCursorView2(editorView, options) {
  var this$1$1 = this;
  this.editorView = editorView;
  this.width = options.width || 1;
  this.color = options.color || "black";
  this.class = options.class;
  this.cursorPos = null;
  this.element = null;
  this.timeout = null;
  this.handlers = ["dragover", "dragend", "drop", "dragleave"].map(function(name) {
    var handler = function(e) {
      return this$1$1[name](e);
    };
    editorView.dom.addEventListener(name, handler);
    return { name, handler };
  });
};
DropCursorView.prototype.destroy = function destroy4() {
  var this$1$1 = this;
  this.handlers.forEach(function(ref2) {
    var name = ref2.name;
    var handler = ref2.handler;
    return this$1$1.editorView.dom.removeEventListener(name, handler);
  });
};
DropCursorView.prototype.update = function update3(editorView, prevState) {
  if (this.cursorPos != null && prevState.doc != editorView.state.doc) {
    if (this.cursorPos > editorView.state.doc.content.size) {
      this.setCursor(null);
    } else {
      this.updateOverlay();
    }
  }
};
DropCursorView.prototype.setCursor = function setCursor(pos) {
  if (pos == this.cursorPos) {
    return;
  }
  this.cursorPos = pos;
  if (pos == null) {
    this.element.parentNode.removeChild(this.element);
    this.element = null;
  } else {
    this.updateOverlay();
  }
};
DropCursorView.prototype.updateOverlay = function updateOverlay() {
  var $pos = this.editorView.state.doc.resolve(this.cursorPos), rect;
  if (!$pos.parent.inlineContent) {
    var before2 = $pos.nodeBefore, after2 = $pos.nodeAfter;
    if (before2 || after2) {
      var nodeRect = this.editorView.nodeDOM(this.cursorPos - (before2 ? before2.nodeSize : 0)).getBoundingClientRect();
      var top2 = before2 ? nodeRect.bottom : nodeRect.top;
      if (before2 && after2) {
        top2 = (top2 + this.editorView.nodeDOM(this.cursorPos).getBoundingClientRect().top) / 2;
      }
      rect = { left: nodeRect.left, right: nodeRect.right, top: top2 - this.width / 2, bottom: top2 + this.width / 2 };
    }
  }
  if (!rect) {
    var coords = this.editorView.coordsAtPos(this.cursorPos);
    rect = { left: coords.left - this.width / 2, right: coords.left + this.width / 2, top: coords.top, bottom: coords.bottom };
  }
  var parent = this.editorView.dom.offsetParent;
  if (!this.element) {
    this.element = parent.appendChild(document.createElement("div"));
    if (this.class) {
      this.element.className = this.class;
    }
    this.element.style.cssText = "position: absolute; z-index: 50; pointer-events: none; background-color: " + this.color;
  }
  var parentLeft, parentTop;
  if (!parent || parent == document.body && getComputedStyle(parent).position == "static") {
    parentLeft = -pageXOffset;
    parentTop = -pageYOffset;
  } else {
    var rect$1 = parent.getBoundingClientRect();
    parentLeft = rect$1.left - parent.scrollLeft;
    parentTop = rect$1.top - parent.scrollTop;
  }
  this.element.style.left = rect.left - parentLeft + "px";
  this.element.style.top = rect.top - parentTop + "px";
  this.element.style.width = rect.right - rect.left + "px";
  this.element.style.height = rect.bottom - rect.top + "px";
};
DropCursorView.prototype.scheduleRemoval = function scheduleRemoval(timeout) {
  var this$1$1 = this;
  clearTimeout(this.timeout);
  this.timeout = setTimeout(function() {
    return this$1$1.setCursor(null);
  }, timeout);
};
DropCursorView.prototype.dragover = function dragover(event) {
  if (!this.editorView.editable) {
    return;
  }
  var pos = this.editorView.posAtCoords({ left: event.clientX, top: event.clientY });
  var node4 = pos && pos.inside >= 0 && this.editorView.state.doc.nodeAt(pos.inside);
  var disableDropCursor = node4 && node4.type.spec.disableDropCursor;
  var disabled = typeof disableDropCursor == "function" ? disableDropCursor(this.editorView, pos) : disableDropCursor;
  if (pos && !disabled) {
    var target = pos.pos;
    if (this.editorView.dragging && this.editorView.dragging.slice) {
      target = dropPoint(this.editorView.state.doc, target, this.editorView.dragging.slice);
      if (target == null) {
        return this.setCursor(null);
      }
    }
    this.setCursor(target);
    this.scheduleRemoval(5e3);
  }
};
DropCursorView.prototype.dragend = function dragend() {
  this.scheduleRemoval(20);
};
DropCursorView.prototype.drop = function drop() {
  this.scheduleRemoval(20);
};
DropCursorView.prototype.dragleave = function dragleave(event) {
  if (event.target == this.editorView.dom || !this.editorView.dom.contains(event.relatedTarget)) {
    this.setCursor(null);
  }
};
const Dropcursor = Extension.create({
  name: "dropCursor",
  addOptions() {
    return {
      color: "currentColor",
      width: 1,
      class: null
    };
  },
  addProseMirrorPlugins() {
    return [
      dropCursor(this.options)
    ];
  }
});
var GapCursor = /* @__PURE__ */ function(Selection3) {
  function GapCursor2($pos) {
    Selection3.call(this, $pos, $pos);
  }
  if (Selection3)
    GapCursor2.__proto__ = Selection3;
  GapCursor2.prototype = Object.create(Selection3 && Selection3.prototype);
  GapCursor2.prototype.constructor = GapCursor2;
  GapCursor2.prototype.map = function map15(doc2, mapping) {
    var $pos = doc2.resolve(mapping.map(this.head));
    return GapCursor2.valid($pos) ? new GapCursor2($pos) : Selection3.near($pos);
  };
  GapCursor2.prototype.content = function content2() {
    return Slice.empty;
  };
  GapCursor2.prototype.eq = function eq12(other) {
    return other instanceof GapCursor2 && other.head == this.head;
  };
  GapCursor2.prototype.toJSON = function toJSON7() {
    return { type: "gapcursor", pos: this.head };
  };
  GapCursor2.fromJSON = function fromJSON8(doc2, json) {
    if (typeof json.pos != "number") {
      throw new RangeError("Invalid input for GapCursor.fromJSON");
    }
    return new GapCursor2(doc2.resolve(json.pos));
  };
  GapCursor2.prototype.getBookmark = function getBookmark2() {
    return new GapBookmark(this.anchor);
  };
  GapCursor2.valid = function valid4($pos) {
    var parent = $pos.parent;
    if (parent.isTextblock || !closedBefore($pos) || !closedAfter($pos)) {
      return false;
    }
    var override = parent.type.spec.allowGapCursor;
    if (override != null) {
      return override;
    }
    var deflt = parent.contentMatchAt($pos.index()).defaultType;
    return deflt && deflt.isTextblock;
  };
  GapCursor2.findFrom = function findFrom2($pos, dir, mustMove) {
    search:
      for (; ; ) {
        if (!mustMove && GapCursor2.valid($pos)) {
          return $pos;
        }
        var pos = $pos.pos, next = null;
        for (var d = $pos.depth; ; d--) {
          var parent = $pos.node(d);
          if (dir > 0 ? $pos.indexAfter(d) < parent.childCount : $pos.index(d) > 0) {
            next = parent.child(dir > 0 ? $pos.indexAfter(d) : $pos.index(d) - 1);
            break;
          } else if (d == 0) {
            return null;
          }
          pos += dir;
          var $cur = $pos.doc.resolve(pos);
          if (GapCursor2.valid($cur)) {
            return $cur;
          }
        }
        for (; ; ) {
          var inside = dir > 0 ? next.firstChild : next.lastChild;
          if (!inside) {
            if (next.isAtom && !next.isText && !NodeSelection.isSelectable(next)) {
              $pos = $pos.doc.resolve(pos + next.nodeSize * dir);
              mustMove = false;
              continue search;
            }
            break;
          }
          next = inside;
          pos += dir;
          var $cur$1 = $pos.doc.resolve(pos);
          if (GapCursor2.valid($cur$1)) {
            return $cur$1;
          }
        }
        return null;
      }
  };
  return GapCursor2;
}(Selection);
GapCursor.prototype.visible = false;
Selection.jsonID("gapcursor", GapCursor);
var GapBookmark = function GapBookmark2(pos) {
  this.pos = pos;
};
GapBookmark.prototype.map = function map13(mapping) {
  return new GapBookmark(mapping.map(this.pos));
};
GapBookmark.prototype.resolve = function resolve7(doc2) {
  var $pos = doc2.resolve(this.pos);
  return GapCursor.valid($pos) ? new GapCursor($pos) : Selection.near($pos);
};
function closedBefore($pos) {
  for (var d = $pos.depth; d >= 0; d--) {
    var index2 = $pos.index(d), parent = $pos.node(d);
    if (index2 == 0) {
      if (parent.type.spec.isolating) {
        return true;
      }
      continue;
    }
    for (var before2 = parent.child(index2 - 1); ; before2 = before2.lastChild) {
      if (before2.childCount == 0 && !before2.inlineContent || before2.isAtom || before2.type.spec.isolating) {
        return true;
      }
      if (before2.inlineContent) {
        return false;
      }
    }
  }
  return true;
}
function closedAfter($pos) {
  for (var d = $pos.depth; d >= 0; d--) {
    var index2 = $pos.indexAfter(d), parent = $pos.node(d);
    if (index2 == parent.childCount) {
      if (parent.type.spec.isolating) {
        return true;
      }
      continue;
    }
    for (var after2 = parent.child(index2); ; after2 = after2.firstChild) {
      if (after2.childCount == 0 && !after2.inlineContent || after2.isAtom || after2.type.spec.isolating) {
        return true;
      }
      if (after2.inlineContent) {
        return false;
      }
    }
  }
  return true;
}
var gapCursor = function() {
  return new Plugin({
    props: {
      decorations: drawGapCursor,
      createSelectionBetween: function createSelectionBetween(_view, $anchor, $head) {
        if ($anchor.pos == $head.pos && GapCursor.valid($head)) {
          return new GapCursor($head);
        }
      },
      handleClick,
      handleKeyDown,
      handleDOMEvents: { beforeinput }
    }
  });
};
var handleKeyDown = keydownHandler({
  "ArrowLeft": arrow("horiz", -1),
  "ArrowRight": arrow("horiz", 1),
  "ArrowUp": arrow("vert", -1),
  "ArrowDown": arrow("vert", 1)
});
function arrow(axis, dir) {
  var dirStr = axis == "vert" ? dir > 0 ? "down" : "up" : dir > 0 ? "right" : "left";
  return function(state, dispatch2, view) {
    var sel = state.selection;
    var $start = dir > 0 ? sel.$to : sel.$from, mustMove = sel.empty;
    if (sel instanceof TextSelection) {
      if (!view.endOfTextblock(dirStr) || $start.depth == 0) {
        return false;
      }
      mustMove = false;
      $start = state.doc.resolve(dir > 0 ? $start.after() : $start.before());
    }
    var $found = GapCursor.findFrom($start, dir, mustMove);
    if (!$found) {
      return false;
    }
    if (dispatch2) {
      dispatch2(state.tr.setSelection(new GapCursor($found)));
    }
    return true;
  };
}
function handleClick(view, pos, event) {
  if (!view.editable) {
    return false;
  }
  var $pos = view.state.doc.resolve(pos);
  if (!GapCursor.valid($pos)) {
    return false;
  }
  var ref2 = view.posAtCoords({ left: event.clientX, top: event.clientY });
  var inside = ref2.inside;
  if (inside > -1 && NodeSelection.isSelectable(view.state.doc.nodeAt(inside))) {
    return false;
  }
  view.dispatch(view.state.tr.setSelection(new GapCursor($pos)));
  return true;
}
function beforeinput(view, event) {
  if (event.inputType != "insertCompositionText" || !(view.state.selection instanceof GapCursor)) {
    return false;
  }
  var ref2 = view.state.selection;
  var $from = ref2.$from;
  var insert = $from.parent.contentMatchAt($from.index()).findWrapping(view.state.schema.nodes.text);
  if (!insert) {
    return false;
  }
  var frag = Fragment.empty;
  for (var i2 = insert.length - 1; i2 >= 0; i2--) {
    frag = Fragment.from(insert[i2].createAndFill(null, frag));
  }
  var tr = view.state.tr.replace($from.pos, $from.pos, new Slice(frag, 0, 0));
  tr.setSelection(TextSelection.near(tr.doc.resolve($from.pos + 1)));
  view.dispatch(tr);
  return false;
}
function drawGapCursor(state) {
  if (!(state.selection instanceof GapCursor)) {
    return null;
  }
  var node4 = document.createElement("div");
  node4.className = "ProseMirror-gapcursor";
  return DecorationSet.create(state.doc, [Decoration.widget(state.selection.head, node4, { key: "gapcursor" })]);
}
const Gapcursor = Extension.create({
  name: "gapCursor",
  addProseMirrorPlugins() {
    return [
      gapCursor()
    ];
  },
  extendNodeSchema(extension) {
    var _a;
    const context = {
      name: extension.name,
      options: extension.options,
      storage: extension.storage
    };
    return {
      allowGapCursor: (_a = callOrReturn(getExtensionField(extension, "allowGapCursor", context))) !== null && _a !== void 0 ? _a : null
    };
  }
});
Node.create({
  name: "hardBreak",
  addOptions() {
    return {
      keepMarks: true,
      HTMLAttributes: {}
    };
  },
  inline: true,
  group: "inline",
  selectable: false,
  parseHTML() {
    return [
      { tag: "br" }
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ["br", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)];
  },
  renderText() {
    return "\n";
  },
  addCommands() {
    return {
      setHardBreak: () => ({ commands, chain, state, editor }) => {
        return commands.first([
          () => commands.exitCode(),
          () => commands.command(() => {
            const { selection, storedMarks } = state;
            if (selection.$from.parent.type.spec.isolating) {
              return false;
            }
            const { keepMarks } = this.options;
            const { splittableMarks } = editor.extensionManager;
            const marks2 = storedMarks || selection.$to.parentOffset && selection.$from.marks();
            return chain().insertContent({ type: this.name }).command(({ tr, dispatch: dispatch2 }) => {
              if (dispatch2 && marks2 && keepMarks) {
                const filteredMarks = marks2.filter((mark3) => splittableMarks.includes(mark3.type.name));
                tr.ensureMarks(filteredMarks);
              }
              return true;
            }).run();
          })
        ]);
      }
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Enter": () => this.editor.commands.setHardBreak(),
      "Shift-Enter": () => this.editor.commands.setHardBreak()
    };
  }
});
Node.create({
  name: "heading",
  addOptions() {
    return {
      levels: [1, 2, 3, 4, 5, 6],
      HTMLAttributes: {}
    };
  },
  content: "inline*",
  group: "block",
  defining: true,
  addAttributes() {
    return {
      level: {
        default: 1,
        rendered: false
      }
    };
  },
  parseHTML() {
    return this.options.levels.map((level) => ({
      tag: `h${level}`,
      attrs: { level }
    }));
  },
  renderHTML({ node: node4, HTMLAttributes }) {
    const hasLevel = this.options.levels.includes(node4.attrs.level);
    const level = hasLevel ? node4.attrs.level : this.options.levels[0];
    return [`h${level}`, mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },
  addCommands() {
    return {
      setHeading: (attributes) => ({ commands }) => {
        if (!this.options.levels.includes(attributes.level)) {
          return false;
        }
        return commands.setNode(this.name, attributes);
      },
      toggleHeading: (attributes) => ({ commands }) => {
        if (!this.options.levels.includes(attributes.level)) {
          return false;
        }
        return commands.toggleNode(this.name, "paragraph", attributes);
      }
    };
  },
  addKeyboardShortcuts() {
    return this.options.levels.reduce((items, level) => __spreadValues(__spreadValues({}, items), {
      [`Mod-Alt-${level}`]: () => this.editor.commands.toggleHeading({ level })
    }), {});
  },
  addInputRules() {
    return this.options.levels.map((level) => {
      return textblockTypeInputRule({
        find: new RegExp(`^(#{1,${level}})\\s$`),
        type: this.type,
        getAttributes: {
          level
        }
      });
    });
  }
});
var GOOD_LEAF_SIZE = 200;
var RopeSequence = function RopeSequence2() {
};
RopeSequence.prototype.append = function append2(other) {
  if (!other.length) {
    return this;
  }
  other = RopeSequence.from(other);
  return !this.length && other || other.length < GOOD_LEAF_SIZE && this.leafAppend(other) || this.length < GOOD_LEAF_SIZE && other.leafPrepend(this) || this.appendInner(other);
};
RopeSequence.prototype.prepend = function prepend(other) {
  if (!other.length) {
    return this;
  }
  return RopeSequence.from(other).append(this);
};
RopeSequence.prototype.appendInner = function appendInner(other) {
  return new Append(this, other);
};
RopeSequence.prototype.slice = function slice3(from4, to) {
  if (from4 === void 0)
    from4 = 0;
  if (to === void 0)
    to = this.length;
  if (from4 >= to) {
    return RopeSequence.empty;
  }
  return this.sliceInner(Math.max(0, from4), Math.min(this.length, to));
};
RopeSequence.prototype.get = function get3(i2) {
  if (i2 < 0 || i2 >= this.length) {
    return void 0;
  }
  return this.getInner(i2);
};
RopeSequence.prototype.forEach = function forEach5(f, from4, to) {
  if (from4 === void 0)
    from4 = 0;
  if (to === void 0)
    to = this.length;
  if (from4 <= to) {
    this.forEachInner(f, from4, to, 0);
  } else {
    this.forEachInvertedInner(f, from4, to, 0);
  }
};
RopeSequence.prototype.map = function map14(f, from4, to) {
  if (from4 === void 0)
    from4 = 0;
  if (to === void 0)
    to = this.length;
  var result2 = [];
  this.forEach(function(elt, i2) {
    return result2.push(f(elt, i2));
  }, from4, to);
  return result2;
};
RopeSequence.from = function from3(values) {
  if (values instanceof RopeSequence) {
    return values;
  }
  return values && values.length ? new Leaf(values) : RopeSequence.empty;
};
var Leaf = /* @__PURE__ */ function(RopeSequence3) {
  function Leaf2(values) {
    RopeSequence3.call(this);
    this.values = values;
  }
  if (RopeSequence3)
    Leaf2.__proto__ = RopeSequence3;
  Leaf2.prototype = Object.create(RopeSequence3 && RopeSequence3.prototype);
  Leaf2.prototype.constructor = Leaf2;
  var prototypeAccessors2 = { length: { configurable: true }, depth: { configurable: true } };
  Leaf2.prototype.flatten = function flatten() {
    return this.values;
  };
  Leaf2.prototype.sliceInner = function sliceInner(from4, to) {
    if (from4 == 0 && to == this.length) {
      return this;
    }
    return new Leaf2(this.values.slice(from4, to));
  };
  Leaf2.prototype.getInner = function getInner(i2) {
    return this.values[i2];
  };
  Leaf2.prototype.forEachInner = function forEachInner(f, from4, to, start4) {
    for (var i2 = from4; i2 < to; i2++) {
      if (f(this.values[i2], start4 + i2) === false) {
        return false;
      }
    }
  };
  Leaf2.prototype.forEachInvertedInner = function forEachInvertedInner(f, from4, to, start4) {
    for (var i2 = from4 - 1; i2 >= to; i2--) {
      if (f(this.values[i2], start4 + i2) === false) {
        return false;
      }
    }
  };
  Leaf2.prototype.leafAppend = function leafAppend(other) {
    if (this.length + other.length <= GOOD_LEAF_SIZE) {
      return new Leaf2(this.values.concat(other.flatten()));
    }
  };
  Leaf2.prototype.leafPrepend = function leafPrepend(other) {
    if (this.length + other.length <= GOOD_LEAF_SIZE) {
      return new Leaf2(other.flatten().concat(this.values));
    }
  };
  prototypeAccessors2.length.get = function() {
    return this.values.length;
  };
  prototypeAccessors2.depth.get = function() {
    return 0;
  };
  Object.defineProperties(Leaf2.prototype, prototypeAccessors2);
  return Leaf2;
}(RopeSequence);
RopeSequence.empty = new Leaf([]);
var Append = /* @__PURE__ */ function(RopeSequence3) {
  function Append2(left2, right2) {
    RopeSequence3.call(this);
    this.left = left2;
    this.right = right2;
    this.length = left2.length + right2.length;
    this.depth = Math.max(left2.depth, right2.depth) + 1;
  }
  if (RopeSequence3)
    Append2.__proto__ = RopeSequence3;
  Append2.prototype = Object.create(RopeSequence3 && RopeSequence3.prototype);
  Append2.prototype.constructor = Append2;
  Append2.prototype.flatten = function flatten() {
    return this.left.flatten().concat(this.right.flatten());
  };
  Append2.prototype.getInner = function getInner(i2) {
    return i2 < this.left.length ? this.left.get(i2) : this.right.get(i2 - this.left.length);
  };
  Append2.prototype.forEachInner = function forEachInner(f, from4, to, start4) {
    var leftLen = this.left.length;
    if (from4 < leftLen && this.left.forEachInner(f, from4, Math.min(to, leftLen), start4) === false) {
      return false;
    }
    if (to > leftLen && this.right.forEachInner(f, Math.max(from4 - leftLen, 0), Math.min(this.length, to) - leftLen, start4 + leftLen) === false) {
      return false;
    }
  };
  Append2.prototype.forEachInvertedInner = function forEachInvertedInner(f, from4, to, start4) {
    var leftLen = this.left.length;
    if (from4 > leftLen && this.right.forEachInvertedInner(f, from4 - leftLen, Math.max(to, leftLen) - leftLen, start4 + leftLen) === false) {
      return false;
    }
    if (to < leftLen && this.left.forEachInvertedInner(f, Math.min(from4, leftLen), to, start4) === false) {
      return false;
    }
  };
  Append2.prototype.sliceInner = function sliceInner(from4, to) {
    if (from4 == 0 && to == this.length) {
      return this;
    }
    var leftLen = this.left.length;
    if (to <= leftLen) {
      return this.left.slice(from4, to);
    }
    if (from4 >= leftLen) {
      return this.right.slice(from4 - leftLen, to - leftLen);
    }
    return this.left.slice(from4, leftLen).append(this.right.slice(0, to - leftLen));
  };
  Append2.prototype.leafAppend = function leafAppend(other) {
    var inner = this.right.leafAppend(other);
    if (inner) {
      return new Append2(this.left, inner);
    }
  };
  Append2.prototype.leafPrepend = function leafPrepend(other) {
    var inner = this.left.leafPrepend(other);
    if (inner) {
      return new Append2(inner, this.right);
    }
  };
  Append2.prototype.appendInner = function appendInner2(other) {
    if (this.left.depth >= Math.max(this.right.depth, other.depth) + 1) {
      return new Append2(this.left, new Append2(this.right, other));
    }
    return new Append2(this, other);
  };
  return Append2;
}(RopeSequence);
var ropeSequence = RopeSequence;
var max_empty_items = 500;
var Branch = function Branch2(items, eventCount) {
  this.items = items;
  this.eventCount = eventCount;
};
Branch.prototype.popEvent = function popEvent(state, preserveItems) {
  var this$1$1 = this;
  if (this.eventCount == 0) {
    return null;
  }
  var end3 = this.items.length;
  for (; ; end3--) {
    var next = this.items.get(end3 - 1);
    if (next.selection) {
      --end3;
      break;
    }
  }
  var remap, mapFrom;
  if (preserveItems) {
    remap = this.remapping(end3, this.items.length);
    mapFrom = remap.maps.length;
  }
  var transform = state.tr;
  var selection, remaining;
  var addAfter = [], addBefore = [];
  this.items.forEach(function(item, i2) {
    if (!item.step) {
      if (!remap) {
        remap = this$1$1.remapping(end3, i2 + 1);
        mapFrom = remap.maps.length;
      }
      mapFrom--;
      addBefore.push(item);
      return;
    }
    if (remap) {
      addBefore.push(new Item(item.map));
      var step2 = item.step.map(remap.slice(mapFrom)), map15;
      if (step2 && transform.maybeStep(step2).doc) {
        map15 = transform.mapping.maps[transform.mapping.maps.length - 1];
        addAfter.push(new Item(map15, null, null, addAfter.length + addBefore.length));
      }
      mapFrom--;
      if (map15) {
        remap.appendMap(map15, mapFrom);
      }
    } else {
      transform.maybeStep(item.step);
    }
    if (item.selection) {
      selection = remap ? item.selection.map(remap.slice(mapFrom)) : item.selection;
      remaining = new Branch(this$1$1.items.slice(0, end3).append(addBefore.reverse().concat(addAfter)), this$1$1.eventCount - 1);
      return false;
    }
  }, this.items.length, 0);
  return { remaining, transform, selection };
};
Branch.prototype.addTransform = function addTransform(transform, selection, histOptions, preserveItems) {
  var newItems = [], eventCount = this.eventCount;
  var oldItems = this.items, lastItem = !preserveItems && oldItems.length ? oldItems.get(oldItems.length - 1) : null;
  for (var i2 = 0; i2 < transform.steps.length; i2++) {
    var step2 = transform.steps[i2].invert(transform.docs[i2]);
    var item = new Item(transform.mapping.maps[i2], step2, selection), merged = void 0;
    if (merged = lastItem && lastItem.merge(item)) {
      item = merged;
      if (i2) {
        newItems.pop();
      } else {
        oldItems = oldItems.slice(0, oldItems.length - 1);
      }
    }
    newItems.push(item);
    if (selection) {
      eventCount++;
      selection = null;
    }
    if (!preserveItems) {
      lastItem = item;
    }
  }
  var overflow = eventCount - histOptions.depth;
  if (overflow > DEPTH_OVERFLOW) {
    oldItems = cutOffEvents(oldItems, overflow);
    eventCount -= overflow;
  }
  return new Branch(oldItems.append(newItems), eventCount);
};
Branch.prototype.remapping = function remapping(from4, to) {
  var maps = new Mapping();
  this.items.forEach(function(item, i2) {
    var mirrorPos = item.mirrorOffset != null && i2 - item.mirrorOffset >= from4 ? maps.maps.length - item.mirrorOffset : null;
    maps.appendMap(item.map, mirrorPos);
  }, from4, to);
  return maps;
};
Branch.prototype.addMaps = function addMaps(array) {
  if (this.eventCount == 0) {
    return this;
  }
  return new Branch(this.items.append(array.map(function(map15) {
    return new Item(map15);
  })), this.eventCount);
};
Branch.prototype.rebased = function rebased(rebasedTransform, rebasedCount) {
  if (!this.eventCount) {
    return this;
  }
  var rebasedItems = [], start4 = Math.max(0, this.items.length - rebasedCount);
  var mapping = rebasedTransform.mapping;
  var newUntil = rebasedTransform.steps.length;
  var eventCount = this.eventCount;
  this.items.forEach(function(item) {
    if (item.selection) {
      eventCount--;
    }
  }, start4);
  var iRebased = rebasedCount;
  this.items.forEach(function(item) {
    var pos = mapping.getMirror(--iRebased);
    if (pos == null) {
      return;
    }
    newUntil = Math.min(newUntil, pos);
    var map15 = mapping.maps[pos];
    if (item.step) {
      var step2 = rebasedTransform.steps[pos].invert(rebasedTransform.docs[pos]);
      var selection = item.selection && item.selection.map(mapping.slice(iRebased + 1, pos));
      if (selection) {
        eventCount++;
      }
      rebasedItems.push(new Item(map15, step2, selection));
    } else {
      rebasedItems.push(new Item(map15));
    }
  }, start4);
  var newMaps = [];
  for (var i2 = rebasedCount; i2 < newUntil; i2++) {
    newMaps.push(new Item(mapping.maps[i2]));
  }
  var items = this.items.slice(0, start4).append(newMaps).append(rebasedItems);
  var branch = new Branch(items, eventCount);
  if (branch.emptyItemCount() > max_empty_items) {
    branch = branch.compress(this.items.length - rebasedItems.length);
  }
  return branch;
};
Branch.prototype.emptyItemCount = function emptyItemCount() {
  var count = 0;
  this.items.forEach(function(item) {
    if (!item.step) {
      count++;
    }
  });
  return count;
};
Branch.prototype.compress = function compress(upto) {
  if (upto === void 0)
    upto = this.items.length;
  var remap = this.remapping(0, upto), mapFrom = remap.maps.length;
  var items = [], events = 0;
  this.items.forEach(function(item, i2) {
    if (i2 >= upto) {
      items.push(item);
      if (item.selection) {
        events++;
      }
    } else if (item.step) {
      var step2 = item.step.map(remap.slice(mapFrom)), map15 = step2 && step2.getMap();
      mapFrom--;
      if (map15) {
        remap.appendMap(map15, mapFrom);
      }
      if (step2) {
        var selection = item.selection && item.selection.map(remap.slice(mapFrom));
        if (selection) {
          events++;
        }
        var newItem = new Item(map15.invert(), step2, selection), merged, last = items.length - 1;
        if (merged = items.length && items[last].merge(newItem)) {
          items[last] = merged;
        } else {
          items.push(newItem);
        }
      }
    } else if (item.map) {
      mapFrom--;
    }
  }, this.items.length, 0);
  return new Branch(ropeSequence.from(items.reverse()), events);
};
Branch.empty = new Branch(ropeSequence.empty, 0);
function cutOffEvents(items, n) {
  var cutPoint;
  items.forEach(function(item, i2) {
    if (item.selection && n-- == 0) {
      cutPoint = i2;
      return false;
    }
  });
  return items.slice(cutPoint);
}
var Item = function Item2(map15, step2, selection, mirrorOffset) {
  this.map = map15;
  this.step = step2;
  this.selection = selection;
  this.mirrorOffset = mirrorOffset;
};
Item.prototype.merge = function merge2(other) {
  if (this.step && other.step && !other.selection) {
    var step2 = other.step.merge(this.step);
    if (step2) {
      return new Item(step2.getMap().invert(), step2, this.selection);
    }
  }
};
var HistoryState = function HistoryState2(done2, undone, prevRanges, prevTime) {
  this.done = done2;
  this.undone = undone;
  this.prevRanges = prevRanges;
  this.prevTime = prevTime;
};
var DEPTH_OVERFLOW = 20;
function applyTransaction(history2, state, tr, options) {
  var historyTr = tr.getMeta(historyKey), rebased2;
  if (historyTr) {
    return historyTr.historyState;
  }
  if (tr.getMeta(closeHistoryKey)) {
    history2 = new HistoryState(history2.done, history2.undone, null, 0);
  }
  var appended = tr.getMeta("appendedTransaction");
  if (tr.steps.length == 0) {
    return history2;
  } else if (appended && appended.getMeta(historyKey)) {
    if (appended.getMeta(historyKey).redo) {
      return new HistoryState(history2.done.addTransform(tr, null, options, mustPreserveItems(state)), history2.undone, rangesFor(tr.mapping.maps[tr.steps.length - 1]), history2.prevTime);
    } else {
      return new HistoryState(history2.done, history2.undone.addTransform(tr, null, options, mustPreserveItems(state)), null, history2.prevTime);
    }
  } else if (tr.getMeta("addToHistory") !== false && !(appended && appended.getMeta("addToHistory") === false)) {
    var newGroup = history2.prevTime == 0 || !appended && (history2.prevTime < (tr.time || 0) - options.newGroupDelay || !isAdjacentTo(tr, history2.prevRanges));
    var prevRanges = appended ? mapRanges(history2.prevRanges, tr.mapping) : rangesFor(tr.mapping.maps[tr.steps.length - 1]);
    return new HistoryState(history2.done.addTransform(tr, newGroup ? state.selection.getBookmark() : null, options, mustPreserveItems(state)), Branch.empty, prevRanges, tr.time);
  } else if (rebased2 = tr.getMeta("rebased")) {
    return new HistoryState(history2.done.rebased(tr, rebased2), history2.undone.rebased(tr, rebased2), mapRanges(history2.prevRanges, tr.mapping), history2.prevTime);
  } else {
    return new HistoryState(history2.done.addMaps(tr.mapping.maps), history2.undone.addMaps(tr.mapping.maps), mapRanges(history2.prevRanges, tr.mapping), history2.prevTime);
  }
}
function isAdjacentTo(transform, prevRanges) {
  if (!prevRanges) {
    return false;
  }
  if (!transform.docChanged) {
    return true;
  }
  var adjacent = false;
  transform.mapping.maps[0].forEach(function(start4, end3) {
    for (var i2 = 0; i2 < prevRanges.length; i2 += 2) {
      if (start4 <= prevRanges[i2 + 1] && end3 >= prevRanges[i2]) {
        adjacent = true;
      }
    }
  });
  return adjacent;
}
function rangesFor(map15) {
  var result2 = [];
  map15.forEach(function(_from, _to, from4, to) {
    return result2.push(from4, to);
  });
  return result2;
}
function mapRanges(ranges, mapping) {
  if (!ranges) {
    return null;
  }
  var result2 = [];
  for (var i2 = 0; i2 < ranges.length; i2 += 2) {
    var from4 = mapping.map(ranges[i2], 1), to = mapping.map(ranges[i2 + 1], -1);
    if (from4 <= to) {
      result2.push(from4, to);
    }
  }
  return result2;
}
function histTransaction(history2, state, dispatch2, redo2) {
  var preserveItems = mustPreserveItems(state), histOptions = historyKey.get(state).spec.config;
  var pop = (redo2 ? history2.undone : history2.done).popEvent(state, preserveItems);
  if (!pop) {
    return;
  }
  var selection = pop.selection.resolve(pop.transform.doc);
  var added = (redo2 ? history2.done : history2.undone).addTransform(pop.transform, state.selection.getBookmark(), histOptions, preserveItems);
  var newHist = new HistoryState(redo2 ? added : pop.remaining, redo2 ? pop.remaining : added, null, 0);
  dispatch2(pop.transform.setSelection(selection).setMeta(historyKey, { redo: redo2, historyState: newHist }).scrollIntoView());
}
var cachedPreserveItems = false, cachedPreserveItemsPlugins = null;
function mustPreserveItems(state) {
  var plugins = state.plugins;
  if (cachedPreserveItemsPlugins != plugins) {
    cachedPreserveItems = false;
    cachedPreserveItemsPlugins = plugins;
    for (var i2 = 0; i2 < plugins.length; i2++) {
      if (plugins[i2].spec.historyPreserveItems) {
        cachedPreserveItems = true;
        break;
      }
    }
  }
  return cachedPreserveItems;
}
var historyKey = new PluginKey("history");
var closeHistoryKey = new PluginKey("closeHistory");
function history(config) {
  config = {
    depth: config && config.depth || 100,
    newGroupDelay: config && config.newGroupDelay || 500
  };
  return new Plugin({
    key: historyKey,
    state: {
      init: function init5() {
        return new HistoryState(Branch.empty, Branch.empty, null, 0);
      },
      apply: function apply8(tr, hist, state) {
        return applyTransaction(hist, state, tr, config);
      }
    },
    config,
    props: {
      handleDOMEvents: {
        beforeinput: function beforeinput2(view, e) {
          var handled = e.inputType == "historyUndo" ? undo(view.state, view.dispatch) : e.inputType == "historyRedo" ? redo(view.state, view.dispatch) : false;
          if (handled) {
            e.preventDefault();
          }
          return handled;
        }
      }
    }
  });
}
function undo(state, dispatch2) {
  var hist = historyKey.getState(state);
  if (!hist || hist.done.eventCount == 0) {
    return false;
  }
  if (dispatch2) {
    histTransaction(hist, state, dispatch2, false);
  }
  return true;
}
function redo(state, dispatch2) {
  var hist = historyKey.getState(state);
  if (!hist || hist.undone.eventCount == 0) {
    return false;
  }
  if (dispatch2) {
    histTransaction(hist, state, dispatch2, true);
  }
  return true;
}
const History = Extension.create({
  name: "history",
  addOptions() {
    return {
      depth: 100,
      newGroupDelay: 500
    };
  },
  addCommands() {
    return {
      undo: () => ({ state, dispatch: dispatch2 }) => {
        return undo(state, dispatch2);
      },
      redo: () => ({ state, dispatch: dispatch2 }) => {
        return redo(state, dispatch2);
      }
    };
  },
  addProseMirrorPlugins() {
    return [
      history(this.options)
    ];
  },
  addKeyboardShortcuts() {
    return {
      "Mod-z": () => this.editor.commands.undo(),
      "Mod-y": () => this.editor.commands.redo(),
      "Shift-Mod-z": () => this.editor.commands.redo(),
      "Mod-\u044F": () => this.editor.commands.undo(),
      "Shift-Mod-\u044F": () => this.editor.commands.redo()
    };
  }
});
Node.create({
  name: "horizontalRule",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  group: "block",
  parseHTML() {
    return [
      { tag: "hr" }
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ["hr", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)];
  },
  addCommands() {
    return {
      setHorizontalRule: () => ({ chain }) => {
        return chain().insertContent({ type: this.name }).command(({ tr, dispatch: dispatch2 }) => {
          var _a;
          if (dispatch2) {
            const { $to } = tr.selection;
            const posAfter = $to.end();
            if ($to.nodeAfter) {
              tr.setSelection(TextSelection.create(tr.doc, $to.pos));
            } else {
              const node4 = (_a = $to.parent.type.contentMatch.defaultType) === null || _a === void 0 ? void 0 : _a.create();
              if (node4) {
                tr.insert(posAfter, node4);
                tr.setSelection(TextSelection.create(tr.doc, posAfter));
              }
            }
            tr.scrollIntoView();
          }
          return true;
        }).run();
      }
    };
  },
  addInputRules() {
    return [
      nodeInputRule({
        find: /^(?:---|—-|___\s|\*\*\*\s)$/,
        type: this.type
      })
    ];
  }
});
const starInputRegex$1 = /(?:^|\s)((?:\*)((?:[^*]+))(?:\*))$/;
const starPasteRegex$1 = /(?:^|\s)((?:\*)((?:[^*]+))(?:\*))/g;
const underscoreInputRegex$1 = /(?:^|\s)((?:_)((?:[^_]+))(?:_))$/;
const underscorePasteRegex$1 = /(?:^|\s)((?:_)((?:[^_]+))(?:_))/g;
Mark.create({
  name: "italic",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: "em"
      },
      {
        tag: "i",
        getAttrs: (node4) => node4.style.fontStyle !== "normal" && null
      },
      {
        style: "font-style=italic"
      }
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ["em", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },
  addCommands() {
    return {
      setItalic: () => ({ commands }) => {
        return commands.setMark(this.name);
      },
      toggleItalic: () => ({ commands }) => {
        return commands.toggleMark(this.name);
      },
      unsetItalic: () => ({ commands }) => {
        return commands.unsetMark(this.name);
      }
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-i": () => this.editor.commands.toggleItalic(),
      "Mod-I": () => this.editor.commands.toggleItalic()
    };
  },
  addInputRules() {
    return [
      markInputRule({
        find: starInputRegex$1,
        type: this.type
      }),
      markInputRule({
        find: underscoreInputRegex$1,
        type: this.type
      })
    ];
  },
  addPasteRules() {
    return [
      markPasteRule({
        find: starPasteRegex$1,
        type: this.type
      }),
      markPasteRule({
        find: underscorePasteRegex$1,
        type: this.type
      })
    ];
  }
});
Node.create({
  name: "listItem",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  content: "paragraph block*",
  defining: true,
  parseHTML() {
    return [
      {
        tag: "li"
      }
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ["li", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },
  addKeyboardShortcuts() {
    return {
      Enter: () => this.editor.commands.splitListItem(this.name),
      Tab: () => this.editor.commands.sinkListItem(this.name),
      "Shift-Tab": () => this.editor.commands.liftListItem(this.name)
    };
  }
});
const inputRegex$2 = /^(\d+)\.\s$/;
Node.create({
  name: "orderedList",
  addOptions() {
    return {
      itemTypeName: "listItem",
      HTMLAttributes: {}
    };
  },
  group: "block list",
  content() {
    return `${this.options.itemTypeName}+`;
  },
  addAttributes() {
    return {
      start: {
        default: 1,
        parseHTML: (element) => {
          return element.hasAttribute("start") ? parseInt(element.getAttribute("start") || "", 10) : 1;
        }
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: "ol"
      }
    ];
  },
  renderHTML({ HTMLAttributes }) {
    const _a = HTMLAttributes, { start: start4 } = _a, attributesWithoutStart = __objRest(_a, ["start"]);
    return start4 === 1 ? ["ol", mergeAttributes(this.options.HTMLAttributes, attributesWithoutStart), 0] : ["ol", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },
  addCommands() {
    return {
      toggleOrderedList: () => ({ commands }) => {
        return commands.toggleList(this.name, this.options.itemTypeName);
      }
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-7": () => this.editor.commands.toggleOrderedList()
    };
  },
  addInputRules() {
    return [
      wrappingInputRule({
        find: inputRegex$2,
        type: this.type,
        getAttributes: (match) => ({ start: +match[1] }),
        joinPredicate: (match, node4) => node4.childCount + node4.attrs.start === +match[1]
      })
    ];
  }
});
const inputRegex$1 = /(?:^|\s)((?:~~)((?:[^~]+))(?:~~))$/;
const pasteRegex = /(?:^|\s)((?:~~)((?:[^~]+))(?:~~))/g;
Mark.create({
  name: "strike",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: "s"
      },
      {
        tag: "del"
      },
      {
        tag: "strike"
      },
      {
        style: "text-decoration",
        consuming: false,
        getAttrs: (style2) => style2.includes("line-through") ? {} : false
      }
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ["s", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },
  addCommands() {
    return {
      setStrike: () => ({ commands }) => {
        return commands.setMark(this.name);
      },
      toggleStrike: () => ({ commands }) => {
        return commands.toggleMark(this.name);
      },
      unsetStrike: () => ({ commands }) => {
        return commands.unsetMark(this.name);
      }
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-x": () => this.editor.commands.toggleStrike()
    };
  },
  addInputRules() {
    return [
      markInputRule({
        find: inputRegex$1,
        type: this.type
      })
    ];
  },
  addPasteRules() {
    return [
      markPasteRule({
        find: pasteRegex,
        type: this.type
      })
    ];
  }
});
const Text = Node.create({
  name: "text",
  group: "inline"
});
const Document = Node.create({
  name: "doc",
  topNode: true,
  content: "block+"
});
const Paragraph = Node.create({
  name: "paragraph",
  priority: 1e3,
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  group: "block",
  content: "inline*",
  parseHTML() {
    return [
      { tag: "p" }
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ["p", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },
  addCommands() {
    return {
      setParagraph: () => ({ commands }) => {
        return commands.setNode(this.name);
      }
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Alt-0": () => this.editor.commands.setParagraph()
    };
  }
});
const starInputRegex = /(?:^|\s)((?:\*\*)((?:[^*]+))(?:\*\*))$/;
const starPasteRegex = /(?:^|\s)((?:\*\*)((?:[^*]+))(?:\*\*))/g;
const underscoreInputRegex = /(?:^|\s)((?:__)((?:[^__]+))(?:__))$/;
const underscorePasteRegex = /(?:^|\s)((?:__)((?:[^__]+))(?:__))/g;
Mark.create({
  name: "bold",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: "strong"
      },
      {
        tag: "b",
        getAttrs: (node4) => node4.style.fontWeight !== "normal" && null
      },
      {
        style: "font-weight",
        getAttrs: (value) => /^(bold(er)?|[5-9]\d{2,})$/.test(value) && null
      }
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ["strong", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },
  addCommands() {
    return {
      setBold: () => ({ commands }) => {
        return commands.setMark(this.name);
      },
      toggleBold: () => ({ commands }) => {
        return commands.toggleMark(this.name);
      },
      unsetBold: () => ({ commands }) => {
        return commands.unsetMark(this.name);
      }
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-b": () => this.editor.commands.toggleBold(),
      "Mod-B": () => this.editor.commands.toggleBold()
    };
  },
  addInputRules() {
    return [
      markInputRule({
        find: starInputRegex,
        type: this.type
      }),
      markInputRule({
        find: underscoreInputRegex,
        type: this.type
      })
    ];
  },
  addPasteRules() {
    return [
      markPasteRule({
        find: starPasteRegex,
        type: this.type
      }),
      markPasteRule({
        find: underscorePasteRegex,
        type: this.type
      })
    ];
  }
});
Node.create({
  name: "taskList",
  addOptions() {
    return {
      itemTypeName: "taskItem",
      HTMLAttributes: {}
    };
  },
  group: "block list",
  content() {
    return `${this.options.itemTypeName}+`;
  },
  parseHTML() {
    return [
      {
        tag: `ul[data-type="${this.name}"]`,
        priority: 51
      }
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ["ul", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, { "data-type": this.name }), 0];
  },
  addCommands() {
    return {
      toggleTaskList: () => ({ commands }) => {
        return commands.toggleList(this.name, this.options.itemTypeName);
      }
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-9": () => this.editor.commands.toggleTaskList()
    };
  }
});
const Placeholder = Extension.create({
  name: "placeholder",
  addOptions() {
    return {
      emptyEditorClass: "is-editor-empty",
      emptyNodeClass: "is-empty",
      placeholder: "Write something \u2026",
      showOnlyWhenEditable: true,
      showOnlyCurrent: true,
      includeChildren: false
    };
  },
  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          decorations: ({ doc: doc2, selection }) => {
            const active = this.editor.isEditable || !this.options.showOnlyWhenEditable;
            const { anchor } = selection;
            const decorations = [];
            if (!active) {
              return;
            }
            doc2.descendants((node4, pos) => {
              const hasAnchor = anchor >= pos && anchor <= pos + node4.nodeSize;
              const isEmpty = !node4.isLeaf && !node4.childCount;
              if ((hasAnchor || !this.options.showOnlyCurrent) && isEmpty) {
                const classes = [this.options.emptyNodeClass];
                if (this.editor.isEmpty) {
                  classes.push(this.options.emptyEditorClass);
                }
                const decoration = Decoration.node(pos, pos + node4.nodeSize, {
                  class: classes.join(" "),
                  "data-placeholder": typeof this.options.placeholder === "function" ? this.options.placeholder({
                    editor: this.editor,
                    node: node4,
                    pos,
                    hasAnchor
                  }) : this.options.placeholder
                });
                decorations.push(decoration);
              }
              return this.options.includeChildren;
            });
            return DecorationSet.create(doc2, decorations);
          }
        }
      })
    ];
  }
});
const inputRegex = /^\s*(\[([( |x])?\])\s$/;
Node.create({
  name: "taskItem",
  addOptions() {
    return {
      nested: false,
      HTMLAttributes: {}
    };
  },
  content() {
    return this.options.nested ? "paragraph block*" : "paragraph+";
  },
  defining: true,
  addAttributes() {
    return {
      checked: {
        default: false,
        keepOnSplit: false,
        parseHTML: (element) => element.getAttribute("data-checked") === "true",
        renderHTML: (attributes) => ({
          "data-checked": attributes.checked
        })
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: `li[data-type="${this.name}"]`,
        priority: 51
      }
    ];
  },
  renderHTML({ node: node4, HTMLAttributes }) {
    return [
      "li",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, { "data-type": this.name }),
      [
        "label",
        [
          "input",
          {
            type: "checkbox",
            checked: node4.attrs.checked ? "checked" : null
          }
        ],
        ["span"]
      ],
      [
        "div",
        0
      ]
    ];
  },
  addKeyboardShortcuts() {
    const shortcuts = {
      Enter: () => this.editor.commands.splitListItem(this.name),
      "Shift-Tab": () => this.editor.commands.liftListItem(this.name)
    };
    if (!this.options.nested) {
      return shortcuts;
    }
    return __spreadProps(__spreadValues({}, shortcuts), {
      Tab: () => this.editor.commands.sinkListItem(this.name)
    });
  },
  addNodeView() {
    return ({ node: node4, HTMLAttributes, getPos, editor }) => {
      const listItem = document.createElement("li");
      const checkboxWrapper = document.createElement("label");
      const checkboxStyler = document.createElement("span");
      const checkbox = document.createElement("input");
      const content2 = document.createElement("div");
      checkboxWrapper.contentEditable = "false";
      checkbox.type = "checkbox";
      checkbox.addEventListener("change", (event) => {
        if (!editor.isEditable) {
          checkbox.checked = !checkbox.checked;
          return;
        }
        const { checked } = event.target;
        if (editor.isEditable && typeof getPos === "function") {
          editor.chain().focus(void 0, { scrollIntoView: false }).command(({ tr }) => {
            const position = getPos();
            const currentNode = tr.doc.nodeAt(position);
            tr.setNodeMarkup(position, void 0, __spreadProps(__spreadValues({}, currentNode === null || currentNode === void 0 ? void 0 : currentNode.attrs), {
              checked
            }));
            return true;
          }).run();
        }
      });
      Object.entries(this.options.HTMLAttributes).forEach(([key2, value]) => {
        listItem.setAttribute(key2, value);
      });
      listItem.dataset.checked = node4.attrs.checked;
      if (node4.attrs.checked) {
        checkbox.setAttribute("checked", "checked");
      }
      checkboxWrapper.append(checkbox, checkboxStyler);
      listItem.append(checkboxWrapper, content2);
      Object.entries(HTMLAttributes).forEach(([key2, value]) => {
        listItem.setAttribute(key2, value);
      });
      return {
        dom: listItem,
        contentDOM: content2,
        update: (updatedNode) => {
          if (updatedNode.type !== this.type) {
            return false;
          }
          listItem.dataset.checked = updatedNode.attrs.checked;
          if (updatedNode.attrs.checked) {
            checkbox.setAttribute("checked", "checked");
          } else {
            checkbox.removeAttribute("checked");
          }
          return true;
        }
      };
    };
  },
  addInputRules() {
    return [
      wrappingInputRule({
        find: inputRegex,
        type: this.type,
        getAttributes: (match) => ({
          checked: match[match.length - 1] === "x"
        })
      })
    ];
  }
});
Extension.create({
  name: "characterCount",
  addOptions() {
    return {
      limit: null,
      mode: "textSize"
    };
  },
  addStorage() {
    return {
      characters: () => 0,
      words: () => 0
    };
  },
  onBeforeCreate() {
    this.storage.characters = (options) => {
      const node4 = (options === null || options === void 0 ? void 0 : options.node) || this.editor.state.doc;
      const mode = (options === null || options === void 0 ? void 0 : options.mode) || this.options.mode;
      if (mode === "textSize") {
        const text2 = node4.textBetween(0, node4.content.size, void 0, " ");
        return text2.length;
      }
      return node4.nodeSize;
    };
    this.storage.words = (options) => {
      const node4 = (options === null || options === void 0 ? void 0 : options.node) || this.editor.state.doc;
      const text2 = node4.textBetween(0, node4.content.size, " ", " ");
      const words = text2.split(" ").filter((word) => word !== "");
      return words.length;
    };
  },
  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey("characterCount"),
        filterTransaction: (transaction, state) => {
          const limit = this.options.limit;
          if (!transaction.docChanged || limit === 0 || limit === null || limit === void 0) {
            return true;
          }
          const oldSize = this.storage.characters({ node: state.doc });
          const newSize = this.storage.characters({ node: transaction.doc });
          if (newSize <= limit) {
            return true;
          }
          if (oldSize > limit && newSize > limit && newSize <= oldSize) {
            return true;
          }
          if (oldSize > limit && newSize > limit && newSize > oldSize) {
            return false;
          }
          const isPaste = transaction.getMeta("paste");
          if (!isPaste) {
            return false;
          }
          const pos = transaction.selection.$head.pos;
          const over = newSize - limit;
          const from4 = pos - over;
          const to = pos;
          transaction.deleteRange(from4, to);
          const updatedSize = this.storage.characters({ node: transaction.doc });
          if (updatedSize > limit) {
            return false;
          }
          return true;
        }
      })
    ];
  }
});
var interactive_vue_vue_type_style_index_0_lang = "";
const _sfc_main$1 = {
  components: {
    EditorContent
  },
  setup() {
    let t = reactive({
      loading_tips: ""
    });
    return __spreadValues({
      input: useEditor({
        content: "",
        extensions: [
          Text,
          Document,
          Paragraph,
          Placeholder,
          Gapcursor,
          Dropcursor,
          History
        ]
      }),
      output: useEditor({
        content: "",
        extensions: [
          Text,
          Document,
          Paragraph,
          Placeholder,
          Gapcursor,
          Dropcursor,
          History
        ]
      }),
      tips: [
        "\u6B63\u5728\u70BC\u5B57",
        "\u6B63\u5728\u8054\u7CFB\u8BC4\u8BBA\u5BB6",
        "\u6B63\u5728\u63A8\u6572",
        "\u6B63\u5728\u7422\u78E8",
        "\u6B63\u5728\u641C\u7D22\u67AF\u80A0",
        "\u6B63\u5728\u7EDE\u5C3D\u8111\u6C41",
        "\u6B63\u5728\u7B14\u8015\u4E0D\u8F8D",
        "\u6B63\u5728\u5206\u6790\u6807\u9898"
      ]
    }, toRefs(t));
  },
  methods: {
    focus: function(el) {
      console.log(arguments);
      el.chain().focus().run();
    },
    startloading: function() {
      this.loading = true;
      this.loading_mask = document.getElementById("loading_mask");
      this.loading_mask.classList.add("is_loading");
      this.runupdatetask();
      this.connectserver();
    },
    connectserver: function() {
      setTimeout(() => {
        this.fetchdata();
      }, 1e3 * 5);
    },
    fetchdata: function() {
      console.log("data");
      this.stoploading();
    },
    stoploading: function() {
      this.loading = false;
      this.loading_mask.classList.remove("is_loading");
      if (this.updatetask) {
        clearInterval(this.updatetask);
        this.updatetask = null;
      }
    },
    updateloadingtips: function(that, tips) {
      console.log(that, this);
      that.loading_tips = tips;
      this.loading_tips = tips;
    },
    getloadingtips: function() {
      let t = this.tips[Math.floor(Math.random() * this.tips.length)];
      return t;
    },
    runupdatetask: function() {
      let that = this;
      this.updatetask = setInterval(function() {
        that.updateloadingtips(that, that.getloadingtips());
      }, 1e3 * 1);
    }
  }
};
const _hoisted_1$1 = {
  id: "interactive",
  class: "interactive center flexv"
};
const _hoisted_2$1 = {
  id: "input_area",
  class: "area fasttrans"
};
const _hoisted_3$1 = { class: "area_title font-title flex" };
const _hoisted_4 = /* @__PURE__ */ createBaseVNode("span", null, "\u8BD7", -1);
const _hoisted_5 = { class: "tools font-normal" };
const _hoisted_6 = /* @__PURE__ */ createBaseVNode("span", null, "\u8D4F\u6790", -1);
const _hoisted_7 = /* @__PURE__ */ createBaseVNode("svg", {
  class: "icon",
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "p-id": "3783"
}, [
  /* @__PURE__ */ createBaseVNode("path", {
    d: "M268.196571 383.597714c0 8.411429 6.089143 14.409143 14.628572 14.409143 3.657143 0 7.314286-1.206857 9.746286-3.602286l53.632-48a30.025143 30.025143 0 0 1 39.021714 0L438.857143 394.404571c6.089143 4.790857 15.853714 4.790857 20.717714-1.206857a13.513143 13.513143 0 0 0 3.657143-9.6V128h327.936c34.121143 0 62.171429 24.009143 62.171429 55.204571v508.8c0 32.402286-25.6 57.6-58.514286 57.6H285.257143c-14.628571 0-25.6 10.788571-25.6 25.197715 0 14.390857 10.971429 25.197714 25.6 25.197714H804.571429c26.825143 0 48.768 21.595429 48.768 48S831.396571 896 804.571429 896H232.832c-34.121143 0-62.171429-24.009143-62.171429-55.204571V183.222857c0-31.213714 28.050286-55.204571 62.171429-55.204571h35.364571v255.597714z",
    "p-id": "3784"
  })
], -1);
const _hoisted_8 = [
  _hoisted_6,
  _hoisted_7
];
const _hoisted_9 = /* @__PURE__ */ createBaseVNode("div", { id: "clear" }, [
  /* @__PURE__ */ createBaseVNode("span", null, "\u6E05\u7A7A"),
  /* @__PURE__ */ createBaseVNode("svg", {
    class: "icon",
    viewBox: "0 0 1024 1024",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    "p-id": "4580"
  }, [
    /* @__PURE__ */ createBaseVNode("path", {
      d: "M0 0h1024v1024H0z",
      fill: "currentColor",
      "fill-opacity": ".01",
      "p-id": "4581"
    }),
    /* @__PURE__ */ createBaseVNode("path", {
      d: "M860.525714 622.884571l-188.708571 326.729143a34.304 34.304 0 0 1-46.811429 12.580572l-89.161143-51.492572 120.100572-207.945143a34.377143 34.377143 0 0 0-7.533714-43.300571l-5.046858-3.510857a34.377143 34.377143 0 0 0-43.300571 7.460571l-3.510857 5.12-120.100572 207.872-118.784-68.608L477.622857 599.917714a34.377143 34.377143 0 0 0-7.460571-43.300571l-5.12-3.657143a34.377143 34.377143 0 0 0-43.300572 7.533714l-3.510857 5.12-120.100571 207.872-207.872-119.954285a34.304 34.304 0 0 1-12.580572-46.884572l188.708572-326.802286 594.066285 343.04z m-61.586285-510.829714c16.457143 9.508571 22.016 30.427429 12.580571 46.811429L725.796571 307.419429l207.872 120.027428c16.457143 9.508571 22.089143 30.500571 12.580572 46.884572l-34.304 59.392a34.304 34.304 0 0 1-46.811429 12.580571l-534.674285-308.662857a34.304 34.304 0 0 1-12.580572-46.884572l34.304-59.465142a34.304 34.304 0 0 1 46.811429-12.507429l207.945143 120.027429 85.723428-148.48a34.304 34.304 0 0 1 46.884572-12.580572l59.392 34.304z",
      fill: "currentColor",
      "p-id": "4582"
    })
  ])
], -1);
const _hoisted_10 = /* @__PURE__ */ createBaseVNode("div", { id: "centralize" }, [
  /* @__PURE__ */ createBaseVNode("span", null, "\u5C45\u4E2D"),
  /* @__PURE__ */ createBaseVNode("svg", {
    s: "",
    class: "icon",
    viewBox: "0 0 1024 1024",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    "p-id": "4801"
  }, [
    /* @__PURE__ */ createBaseVNode("path", {
      d: "M843.989333 85.333333C896.298667 85.333333 938.666667 127.701333 938.666667 180.010667V843.946667A94.677333 94.677333 0 0 1 843.989333 938.666667H180.053333A94.677333 94.677333 0 0 1 85.333333 843.989333V180.053333C85.333333 127.701333 127.701333 85.333333 180.010667 85.333333z m0 85.333334H180.053333A9.344 9.344 0 0 0 170.666667 180.010667V843.946667c0 5.162667 4.181333 9.344 9.344 9.344H843.946667c5.162667 0 9.344-4.181333 9.344-9.344V180.053333A9.344 9.344 0 0 0 843.989333 170.666667zM608 618.666667a42.666667 42.666667 0 0 1 0 85.333333h-192a42.666667 42.666667 0 0 1 0-85.333333h192z m120.96-149.333334c21.589333 0 39.04 17.493333 39.04 39.04v7.253334c0 21.589333-17.493333 39.04-39.04 39.04H295.04A39.04 39.04 0 0 1 256 515.626667v-7.253334c0-21.589333 17.493333-39.04 39.04-39.04h433.92z m-117.333333-149.333333c21.589333 0 39.04 17.493333 39.04 39.04v7.253333c0 21.589333-17.493333 39.04-39.04 39.04h-199.253334a39.04 39.04 0 0 1-39.04-39.04v-7.253333c0-21.589333 17.493333-39.04 39.04-39.04h199.253334z",
      "p-id": "4802"
    })
  ])
], -1);
const _hoisted_11 = {
  id: "output_area",
  class: "area fasttrans"
};
const _hoisted_12 = /* @__PURE__ */ createBaseVNode("div", { class: "area_title font-title" }, "\u9274\u8D4F", -1);
const _hoisted_13 = {
  id: "loading_mask",
  class: "loading_area fasttrans flex center"
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_editor_content = resolveComponent("editor-content");
  return openBlock(), createElementBlock("div", _hoisted_1$1, [
    createBaseVNode("div", _hoisted_2$1, [
      createBaseVNode("div", _hoisted_3$1, [
        _hoisted_4,
        createBaseVNode("div", _hoisted_5, [
          createBaseVNode("div", {
            id: "run",
            onClick: _cache[0] || (_cache[0] = (...args) => $options.startloading && $options.startloading(...args))
          }, _hoisted_8),
          _hoisted_9,
          _hoisted_10
        ])
      ]),
      createBaseVNode("div", {
        id: "input_area_input",
        class: "area_text fasttrans",
        onClick: _cache[1] || (_cache[1] = ($event) => $options.focus(this.input))
      }, [
        createVNode(_component_editor_content, { editor: $setup.input }, null, 8, ["editor"])
      ])
    ]),
    createBaseVNode("div", _hoisted_11, [
      _hoisted_12,
      createBaseVNode("div", {
        id: "output_area_output",
        class: "area_text fasttrans",
        onClick: _cache[2] || (_cache[2] = ($event) => $options.focus(this.output))
      }, [
        createVNode(_component_editor_content, {
          editor: $setup.output,
          class: ""
        }, null, 8, ["editor"]),
        createBaseVNode("div", _hoisted_13, toDisplayString(_ctx.loading_tips), 1)
      ])
    ])
  ]);
}
var interactive = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render]]);
var global$1 = "";
var App_vue_vue_type_style_index_0_lang = "";
const _hoisted_1 = {
  id: "page",
  class: "flexv center trans"
};
const _hoisted_2 = { class: "fullpage center flexv trans" };
const _hoisted_3 = /* @__PURE__ */ createBaseVNode("img", {
  id: "logo",
  alt: "logo",
  src: _imports_0
}, null, -1);
const _sfc_main = {
  setup(__props) {
    window.OnFinishLoading = () => {
      console.log("Finished loading");
      document.getElementById("page").style.opacity = 1;
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createVNode(shanshui),
        createBaseVNode("div", _hoisted_2, [
          _hoisted_3,
          createVNode(_sfc_main$3, { msg: "\u9A6C\u5B50\u8C6A \u9F9A\u5CFB\u6DB5 \u6731\u6B63\u5347" })
        ]),
        createVNode(interactive),
        createVNode(_sfc_main$3, {
          msg: "",
          sticky: true
        })
      ]);
    };
  }
};
let a = createApp(_sfc_main);
a.mount("#main");
