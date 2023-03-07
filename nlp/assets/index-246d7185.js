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
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
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
  const map = /* @__PURE__ */ Object.create(null);
  const list = str.split(",");
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase ? (val) => !!map[val.toLowerCase()] : (val) => !!map[val];
}
const specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
const isSpecialBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs);
function includeBooleanAttr(value) {
  return !!value || value === "";
}
function normalizeStyle(value) {
  if (isArray(value)) {
    const res = {};
    for (let i = 0; i < value.length; i++) {
      const item = value[i];
      const normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item);
      if (normalized) {
        for (const key in normalized) {
          res[key] = normalized[key];
        }
      }
    }
    return res;
  } else if (isString(value)) {
    return value;
  } else if (isObject(value)) {
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
    for (let i = 0; i < value.length; i++) {
      const normalized = normalizeClass(value[i]);
      if (normalized) {
        res += normalized + " ";
      }
    }
  } else if (isObject(value)) {
    for (const name in value) {
      if (value[name]) {
        res += name + " ";
      }
    }
  }
  return res.trim();
}
const EMPTY_OBJ = {};
const EMPTY_ARR = [];
const NOOP = () => {
};
const NO = () => false;
const onRE = /^on[^a-z]/;
const isOn = (key) => onRE.test(key);
const isModelListener = (key) => key.startsWith("onUpdate:");
const extend = Object.assign;
const remove = (arr, el) => {
  const i = arr.indexOf(el);
  if (i > -1) {
    arr.splice(i, 1);
  }
};
const hasOwnProperty = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty.call(val, key);
const isArray = Array.isArray;
const isMap = (val) => toTypeString(val) === "[object Map]";
const isSet = (val) => toTypeString(val) === "[object Set]";
const isFunction = (val) => typeof val === "function";
const isString = (val) => typeof val === "string";
const isSymbol = (val) => typeof val === "symbol";
const isObject = (val) => val !== null && typeof val === "object";
const isPromise = (val) => {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch);
};
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const toRawType = (value) => {
  return toTypeString(value).slice(8, -1);
};
const isPlainObject = (val) => toTypeString(val) === "[object Object]";
const isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
const isReservedProp = /* @__PURE__ */ makeMap(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted");
const cacheStringFunction = (fn) => {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
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
  for (let i = 0; i < fns.length; i++) {
    fns[i](arg);
  }
};
const def = (obj, key, value) => {
  Object.defineProperty(obj, key, {
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
  run(fn) {
    if (this.active) {
      const currentEffectScope = activeEffectScope;
      try {
        activeEffectScope = this;
        return fn();
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
      let i, l;
      for (i = 0, l = this.effects.length; i < l; i++) {
        this.effects[i].stop();
      }
      for (i = 0, l = this.cleanups.length; i < l; i++) {
        this.cleanups[i]();
      }
      if (this.scopes) {
        for (i = 0, l = this.scopes.length; i < l; i++) {
          this.scopes[i].stop(true);
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
function recordEffectScope(effect, scope = activeEffectScope) {
  if (scope && scope.active) {
    scope.effects.push(effect);
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
    for (let i = 0; i < deps.length; i++) {
      deps[i].w |= trackOpBit;
    }
  }
};
const finalizeDepMarkers = (effect) => {
  const { deps } = effect;
  if (deps.length) {
    let ptr = 0;
    for (let i = 0; i < deps.length; i++) {
      const dep = deps[i];
      if (wasTracked(dep) && !newTracked(dep)) {
        dep.delete(effect);
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
  constructor(fn, scheduler = null, scope) {
    this.fn = fn;
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
function cleanupEffect(effect) {
  const { deps } = effect;
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].delete(effect);
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
function track(target, type, key) {
  if (shouldTrack && activeEffect) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, dep = createDep());
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
function trigger(target, type, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  let deps = [];
  if (type === "clear") {
    deps = [...depsMap.values()];
  } else if (key === "length" && isArray(target)) {
    depsMap.forEach((dep, key2) => {
      if (key2 === "length" || key2 >= newValue) {
        deps.push(dep);
      }
    });
  } else {
    if (key !== void 0) {
      deps.push(depsMap.get(key));
    }
    switch (type) {
      case "add":
        if (!isArray(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        } else if (isIntegerKey(key)) {
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
  for (const effect of isArray(dep) ? dep : [...dep]) {
    if (effect !== activeEffect || effect.allowRecurse) {
      if (effect.scheduler) {
        effect.scheduler();
      } else {
        effect.run();
      }
    }
  }
}
const isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
const builtInSymbols = new Set(/* @__PURE__ */ Object.getOwnPropertyNames(Symbol).map((key) => Symbol[key]).filter(isSymbol));
const get = /* @__PURE__ */ createGetter();
const shallowGet = /* @__PURE__ */ createGetter(false, true);
const readonlyGet = /* @__PURE__ */ createGetter(true);
const arrayInstrumentations = /* @__PURE__ */ createArrayInstrumentations();
function createArrayInstrumentations() {
  const instrumentations = {};
  ["includes", "indexOf", "lastIndexOf"].forEach((key) => {
    instrumentations[key] = function(...args) {
      const arr = toRaw(this);
      for (let i = 0, l = this.length; i < l; i++) {
        track(arr, "get", i + "");
      }
      const res = arr[key](...args);
      if (res === -1 || res === false) {
        return arr[key](...args.map(toRaw));
      } else {
        return res;
      }
    };
  });
  ["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
    instrumentations[key] = function(...args) {
      pauseTracking();
      const res = toRaw(this)[key].apply(this, args);
      resetTracking();
      return res;
    };
  });
  return instrumentations;
}
function createGetter(isReadonly2 = false, shallow = false) {
  return function get2(target, key, receiver) {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_isShallow") {
      return shallow;
    } else if (key === "__v_raw" && receiver === (isReadonly2 ? shallow ? shallowReadonlyMap : readonlyMap : shallow ? shallowReactiveMap : reactiveMap).get(target)) {
      return target;
    }
    const targetIsArray = isArray(target);
    if (!isReadonly2 && targetIsArray && hasOwn(arrayInstrumentations, key)) {
      return Reflect.get(arrayInstrumentations, key, receiver);
    }
    const res = Reflect.get(target, key, receiver);
    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res;
    }
    if (!isReadonly2) {
      track(target, "get", key);
    }
    if (shallow) {
      return res;
    }
    if (isRef(res)) {
      const shouldUnwrap = !targetIsArray || !isIntegerKey(key);
      return shouldUnwrap ? res.value : res;
    }
    if (isObject(res)) {
      return isReadonly2 ? readonly(res) : reactive(res);
    }
    return res;
  };
}
const set = /* @__PURE__ */ createSetter();
const shallowSet = /* @__PURE__ */ createSetter(true);
function createSetter(shallow = false) {
  return function set2(target, key, value, receiver) {
    let oldValue = target[key];
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
    const hadKey = isArray(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
    const result = Reflect.set(target, key, value, receiver);
    if (target === toRaw(receiver)) {
      if (!hadKey) {
        trigger(target, "add", key, value);
      } else if (hasChanged(value, oldValue)) {
        trigger(target, "set", key, value);
      }
    }
    return result;
  };
}
function deleteProperty(target, key) {
  const hadKey = hasOwn(target, key);
  target[key];
  const result = Reflect.deleteProperty(target, key);
  if (result && hadKey) {
    trigger(target, "delete", key, void 0);
  }
  return result;
}
function has(target, key) {
  const result = Reflect.has(target, key);
  if (!isSymbol(key) || !builtInSymbols.has(key)) {
    track(target, "has", key);
  }
  return result;
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
  set(target, key) {
    return true;
  },
  deleteProperty(target, key) {
    return true;
  }
};
const shallowReactiveHandlers = /* @__PURE__ */ extend({}, mutableHandlers, {
  get: shallowGet,
  set: shallowSet
});
const toShallow = (value) => value;
const getProto = (v) => Reflect.getPrototypeOf(v);
function get$1(target, key, isReadonly2 = false, isShallow2 = false) {
  target = target["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (key !== rawKey) {
    !isReadonly2 && track(rawTarget, "get", key);
  }
  !isReadonly2 && track(rawTarget, "get", rawKey);
  const { has: has2 } = getProto(rawTarget);
  const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
  if (has2.call(rawTarget, key)) {
    return wrap(target.get(key));
  } else if (has2.call(rawTarget, rawKey)) {
    return wrap(target.get(rawKey));
  } else if (target !== rawTarget) {
    target.get(key);
  }
}
function has$1(key, isReadonly2 = false) {
  const target = this["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (key !== rawKey) {
    !isReadonly2 && track(rawTarget, "has", key);
  }
  !isReadonly2 && track(rawTarget, "has", rawKey);
  return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
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
function set$1(key, value) {
  value = toRaw(value);
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  }
  const oldValue = get2.call(target, key);
  target.set(key, value);
  if (!hadKey) {
    trigger(target, "add", key, value);
  } else if (hasChanged(value, oldValue)) {
    trigger(target, "set", key, value);
  }
  return this;
}
function deleteEntry(key) {
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  }
  get2 ? get2.call(target, key) : void 0;
  const result = target.delete(key);
  if (hadKey) {
    trigger(target, "delete", key, void 0);
  }
  return result;
}
function clear() {
  const target = toRaw(this);
  const hadItems = target.size !== 0;
  const result = target.clear();
  if (hadItems) {
    trigger(target, "clear", void 0, void 0);
  }
  return result;
}
function createForEach(isReadonly2, isShallow2) {
  return function forEach(callback, thisArg) {
    const observed = this;
    const target = observed["__v_raw"];
    const rawTarget = toRaw(target);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", ITERATE_KEY);
    return target.forEach((value, key) => {
      return callback.call(thisArg, wrap(value), wrap(key), observed);
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
        const { value, done } = innerIterator.next();
        return done ? { value, done } : {
          value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
          done
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
    get(key) {
      return get$1(this, key);
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
    get(key) {
      return get$1(this, key, false, true);
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
    get(key) {
      return get$1(this, key, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has$1.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, false)
  };
  const shallowReadonlyInstrumentations2 = {
    get(key) {
      return get$1(this, key, true, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has$1.call(this, key, true);
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
  return (target, key, receiver) => {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_raw") {
      return target;
    }
    return Reflect.get(hasOwn(instrumentations, key) && key in target ? instrumentations : target, key, receiver);
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
  if (!isObject(target)) {
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
const toReactive = (value) => isObject(value) ? reactive(value) : value;
const toReadonly = (value) => isObject(value) ? readonly(value) : value;
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
  get: (target, key, receiver) => unref(Reflect.get(target, key, receiver)),
  set: (target, key, value, receiver) => {
    const oldValue = target[key];
    if (isRef(oldValue) && !isRef(value)) {
      oldValue.value = value;
      return true;
    } else {
      return Reflect.set(target, key, value, receiver);
    }
  }
};
function proxyRefs(objectWithRefs) {
  return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
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
  const onlyGetter = isFunction(getterOrOptions);
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
function callWithErrorHandling(fn, instance, type, args) {
  let res;
  try {
    res = args ? fn(...args) : fn();
  } catch (err) {
    handleError(err, instance, type);
  }
  return res;
}
function callWithAsyncErrorHandling(fn, instance, type, args) {
  if (isFunction(fn)) {
    const res = callWithErrorHandling(fn, instance, type, args);
    if (res && isPromise(res)) {
      res.catch((err) => {
        handleError(err, instance, type);
      });
    }
    return res;
  }
  const values = [];
  for (let i = 0; i < fn.length; i++) {
    values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
  }
  return values;
}
function handleError(err, instance, type, throwInDev = true) {
  const contextVNode = instance ? instance.vnode : null;
  if (instance) {
    let cur = instance.parent;
    const exposedInstance = instance.proxy;
    const errorInfo = type;
    while (cur) {
      const errorCapturedHooks = cur.ec;
      if (errorCapturedHooks) {
        for (let i = 0; i < errorCapturedHooks.length; i++) {
          if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
            return;
          }
        }
      }
      cur = cur.parent;
    }
    const appErrorHandler = instance.appContext.config.errorHandler;
    if (appErrorHandler) {
      callWithErrorHandling(appErrorHandler, null, 10, [err, exposedInstance, errorInfo]);
      return;
    }
  }
  logError(err, type, contextVNode, throwInDev);
}
function logError(err, type, contextVNode, throwInDev = true) {
  {
    console.error(err);
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
function nextTick(fn) {
  const p2 = currentFlushPromise || resolvedPromise;
  return fn ? p2.then(this ? fn.bind(this) : fn) : p2;
}
function findInsertionIndex(id) {
  let start = flushIndex + 1;
  let end = queue.length;
  while (start < end) {
    const middle = start + end >>> 1;
    const middleJobId = getId(queue[middle]);
    middleJobId < id ? start = middle + 1 : end = middle;
  }
  return start;
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
  const i = queue.indexOf(job);
  if (i > flushIndex) {
    queue.splice(i, 1);
  }
}
function queueCb(cb, activeQueue, pendingQueue, index) {
  if (!isArray(cb)) {
    if (!activeQueue || !activeQueue.includes(cb, cb.allowRecurse ? index + 1 : index)) {
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
  const check = NOOP;
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
  if (!isFunction(comp)) {
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
    raw.forEach((key) => normalized[key] = null);
  } else {
    extend(normalized, raw);
  }
  cache.set(comp, normalized);
  return normalized;
}
function isEmitListener(options, key) {
  if (!options || !isOn(key)) {
    return false;
  }
  key = key.slice(2).replace(/Once$/, "");
  return hasOwn(options, key[0].toLowerCase() + key.slice(1)) || hasOwn(options, hyphenate(key)) || hasOwn(options, key);
}
let currentRenderingInstance = null;
let currentScopeId = null;
function setCurrentRenderingInstance(instance) {
  const prev = currentRenderingInstance;
  currentRenderingInstance = instance;
  currentScopeId = instance && instance.type.__scopeId || null;
  return prev;
}
function withCtx(fn, ctx = currentRenderingInstance, isNonScopedSlot) {
  if (!ctx)
    return fn;
  if (fn._n) {
    return fn;
  }
  const renderFnWithContext = (...args) => {
    if (renderFnWithContext._d) {
      setBlockTracking(-1);
    }
    const prevInstance = setCurrentRenderingInstance(ctx);
    const res = fn(...args);
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
  const { type: Component, vnode, proxy, withProxy, props, propsOptions: [propsOptions], slots, attrs, emit, render, renderCache, data, setupState, ctx, inheritAttrs } = instance;
  let result;
  let fallthroughAttrs;
  const prev = setCurrentRenderingInstance(instance);
  try {
    if (vnode.shapeFlag & 4) {
      const proxyToUse = withProxy || proxy;
      result = normalizeVNode(render.call(proxyToUse, proxyToUse, renderCache, props, setupState, data, ctx));
      fallthroughAttrs = attrs;
    } else {
      const render2 = Component;
      if (false)
        ;
      result = normalizeVNode(render2.length > 1 ? render2(props, false ? {
        get attrs() {
          markAttrsAccessed();
          return attrs;
        },
        slots,
        emit
      } : { attrs, slots, emit }) : render2(props, null));
      fallthroughAttrs = Component.props ? attrs : getFunctionalFallthrough(attrs);
    }
  } catch (err) {
    blockStack.length = 0;
    handleError(err, instance, 1);
    result = createVNode(Comment);
  }
  let root = result;
  if (fallthroughAttrs && inheritAttrs !== false) {
    const keys = Object.keys(fallthroughAttrs);
    const { shapeFlag } = root;
    if (keys.length) {
      if (shapeFlag & (1 | 6)) {
        if (propsOptions && keys.some(isModelListener)) {
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
    result = root;
  }
  setCurrentRenderingInstance(prev);
  return result;
}
const getFunctionalFallthrough = (attrs) => {
  let res;
  for (const key in attrs) {
    if (key === "class" || key === "style" || isOn(key)) {
      (res || (res = {}))[key] = attrs[key];
    }
  }
  return res;
};
const filterModelListeners = (attrs, props) => {
  const res = {};
  for (const key in attrs) {
    if (!isModelListener(key) || !(key.slice(9) in props)) {
      res[key] = attrs[key];
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
      for (let i = 0; i < dynamicProps.length; i++) {
        const key = dynamicProps[i];
        if (nextProps[key] !== prevProps[key] && !isEmitListener(emits, key)) {
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
  for (let i = 0; i < nextKeys.length; i++) {
    const key = nextKeys[i];
    if (nextProps[key] !== prevProps[key] && !isEmitListener(emitsOptions, key)) {
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
function queueEffectWithSuspense(fn, suspense) {
  if (suspense && suspense.pendingBranch) {
    if (isArray(fn)) {
      suspense.effects.push(...fn);
    } else {
      suspense.effects.push(fn);
    }
  } else {
    queuePostFlushCb(fn);
  }
}
function provide(key, value) {
  if (!currentInstance)
    ;
  else {
    let provides = currentInstance.provides;
    const parentProvides = currentInstance.parent && currentInstance.parent.provides;
    if (parentProvides === provides) {
      provides = currentInstance.provides = Object.create(parentProvides);
    }
    provides[key] = value;
  }
}
function inject(key, defaultValue, treatDefaultAsFactory = false) {
  const instance = currentInstance || currentRenderingInstance;
  if (instance) {
    const provides = instance.parent == null ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides;
    if (provides && key in provides) {
      return provides[key];
    } else if (arguments.length > 1) {
      return treatDefaultAsFactory && isFunction(defaultValue) ? defaultValue.call(instance.proxy) : defaultValue;
    } else
      ;
  }
}
const INITIAL_WATCHER_VALUE = {};
function watch(source, cb, options) {
  return doWatch(source, cb, options);
}
function doWatch(source, cb, { immediate, deep, flush, onTrack, onTrigger } = EMPTY_OBJ) {
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
      } else if (isFunction(s)) {
        return callWithErrorHandling(s, instance, 2);
      } else
        ;
    });
  } else if (isFunction(source)) {
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
  let onCleanup = (fn) => {
    cleanup = effect.onStop = () => {
      callWithErrorHandling(fn, instance, 4);
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
    if (!effect.active) {
      return;
    }
    if (cb) {
      const newValue = effect.run();
      if (deep || forceTrigger || (isMultiSource ? newValue.some((v, i) => hasChanged(v, oldValue[i])) : hasChanged(newValue, oldValue)) || false) {
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
      effect.run();
    }
  };
  job.allowRecurse = !!cb;
  let scheduler;
  if (flush === "sync") {
    scheduler = job;
  } else if (flush === "post") {
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
  const effect = new ReactiveEffect(getter, scheduler);
  if (cb) {
    if (immediate) {
      job();
    } else {
      oldValue = effect.run();
    }
  } else if (flush === "post") {
    queuePostRenderEffect(effect.run.bind(effect), instance && instance.suspense);
  } else {
    effect.run();
  }
  return () => {
    effect.stop();
    if (instance && instance.scope) {
      remove(instance.scope.effects, effect);
    }
  };
}
function instanceWatch(source, value, options) {
  const publicThis = this.proxy;
  const getter = isString(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
  let cb;
  if (isFunction(value)) {
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
    for (let i = 0; i < segments.length && cur; i++) {
      cur = cur[segments[i]];
    }
    return cur;
  };
}
function traverse(value, seen) {
  if (!isObject(value) || value["__v_skip"]) {
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
    for (let i = 0; i < value.length; i++) {
      traverse(value[i], seen);
    }
  } else if (isSet(value) || isMap(value)) {
    value.forEach((v) => {
      traverse(v, seen);
    });
  } else if (isPlainObject(value)) {
    for (const key in value) {
      traverse(value[key], seen);
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
      let child = children[0];
      if (children.length > 1) {
        for (const c of children) {
          if (c.type !== Comment) {
            child = c;
            break;
          }
        }
      }
      const rawProps = toRaw(props);
      const { mode } = rawProps;
      if (state.isLeaving) {
        return emptyPlaceholder(child);
      }
      const innerChild = getKeepAliveChild(child);
      if (!innerChild) {
        return emptyPlaceholder(child);
      }
      const enterHooks = resolveTransitionHooks(innerChild, rawProps, state, instance);
      setTransitionHooks(innerChild, enterHooks);
      const oldChild = instance.subTree;
      const oldInnerChild = oldChild && getKeepAliveChild(oldChild);
      let transitionKeyChanged = false;
      const { getTransitionKey } = innerChild.type;
      if (getTransitionKey) {
        const key = getTransitionKey();
        if (prevTransitionKey === void 0) {
          prevTransitionKey = key;
        } else if (key !== prevTransitionKey) {
          prevTransitionKey = key;
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
          return emptyPlaceholder(child);
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
      return child;
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
  const key = String(vnode.key);
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
      const leavingVNode = leavingVNodesCache[key];
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
      const done = el._enterCb = (cancelled) => {
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
        hook(el, done);
        if (hook.length <= 1) {
          done();
        }
      } else {
        done();
      }
    },
    leave(el, remove2) {
      const key2 = String(vnode.key);
      if (el._enterCb) {
        el._enterCb(true);
      }
      if (state.isUnmounting) {
        return remove2();
      }
      callHook2(onBeforeLeave, [el]);
      let called = false;
      const done = el._leaveCb = (cancelled) => {
        if (called)
          return;
        called = true;
        remove2();
        if (cancelled) {
          callHook2(onLeaveCancelled, [el]);
        } else {
          callHook2(onAfterLeave, [el]);
        }
        el._leaveCb = void 0;
        if (leavingVNodesCache[key2] === vnode) {
          delete leavingVNodesCache[key2];
        }
      };
      leavingVNodesCache[key2] = vnode;
      if (onLeave) {
        onLeave(el, done);
        if (onLeave.length <= 1) {
          done();
        }
      } else {
        done();
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
  for (let i = 0; i < children.length; i++) {
    let child = children[i];
    const key = parentKey == null ? child.key : String(parentKey) + String(child.key != null ? child.key : i);
    if (child.type === Fragment) {
      if (child.patchFlag & 128)
        keyedFragmentCount++;
      ret = ret.concat(getTransitionRawChildren(child.children, keepComment, key));
    } else if (keepComment || child.type !== Comment) {
      ret.push(key != null ? cloneVNode(child, { key }) : child);
    }
  }
  if (keyedFragmentCount > 1) {
    for (let i = 0; i < ret.length; i++) {
      ret[i].patchFlag = -2;
    }
  }
  return ret;
}
const isAsyncWrapper = (i) => !!i.type.__asyncLoader;
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
function injectHook(type, hook, target = currentInstance, prepend = false) {
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
    if (prepend) {
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
    render,
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
    for (const key in methods) {
      const methodHandler = methods[key];
      if (isFunction(methodHandler)) {
        {
          ctx[key] = methodHandler.bind(publicThis);
        }
      }
    }
  }
  if (dataOptions) {
    const data = dataOptions.call(publicThis, publicThis);
    if (!isObject(data))
      ;
    else {
      instance.data = reactive(data);
    }
  }
  shouldCacheAccess = true;
  if (computedOptions) {
    for (const key in computedOptions) {
      const opt = computedOptions[key];
      const get2 = isFunction(opt) ? opt.bind(publicThis, publicThis) : isFunction(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
      const set2 = !isFunction(opt) && isFunction(opt.set) ? opt.set.bind(publicThis) : NOOP;
      const c = computed({
        get: get2,
        set: set2
      });
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => c.value,
        set: (v) => c.value = v
      });
    }
  }
  if (watchOptions) {
    for (const key in watchOptions) {
      createWatcher(watchOptions[key], ctx, publicThis, key);
    }
  }
  if (provideOptions) {
    const provides = isFunction(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
    Reflect.ownKeys(provides).forEach((key) => {
      provide(key, provides[key]);
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
      expose.forEach((key) => {
        Object.defineProperty(exposed, key, {
          get: () => publicThis[key],
          set: (val) => publicThis[key] = val
        });
      });
    } else if (!instance.exposed) {
      instance.exposed = {};
    }
  }
  if (render && instance.render === NOOP) {
    instance.render = render;
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
  for (const key in injectOptions) {
    const opt = injectOptions[key];
    let injected;
    if (isObject(opt)) {
      if ("default" in opt) {
        injected = inject(opt.from || key, opt.default, true);
      } else {
        injected = inject(opt.from || key);
      }
    } else {
      injected = inject(opt);
    }
    if (isRef(injected)) {
      if (unwrapRef) {
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          get: () => injected.value,
          set: (v) => injected.value = v
        });
      } else {
        ctx[key] = injected;
      }
    } else {
      ctx[key] = injected;
    }
  }
}
function callHook(hook, instance, type) {
  callWithAsyncErrorHandling(isArray(hook) ? hook.map((h) => h.bind(instance.proxy)) : hook.bind(instance.proxy), instance, type);
}
function createWatcher(raw, ctx, publicThis, key) {
  const getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
  if (isString(raw)) {
    const handler = ctx[raw];
    if (isFunction(handler)) {
      watch(getter, handler);
    }
  } else if (isFunction(raw)) {
    watch(getter, raw.bind(publicThis));
  } else if (isObject(raw)) {
    if (isArray(raw)) {
      raw.forEach((r) => createWatcher(r, ctx, publicThis, key));
    } else {
      const handler = isFunction(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
      if (isFunction(handler)) {
        watch(getter, handler, raw);
      }
    }
  } else
    ;
}
function resolveMergedOptions(instance) {
  const base = instance.type;
  const { mixins, extends: extendsOptions } = base;
  const { mixins: globalMixins, optionsCache: cache, config: { optionMergeStrategies } } = instance.appContext;
  const cached = cache.get(base);
  let resolved;
  if (cached) {
    resolved = cached;
  } else if (!globalMixins.length && !mixins && !extendsOptions) {
    {
      resolved = base;
    }
  } else {
    resolved = {};
    if (globalMixins.length) {
      globalMixins.forEach((m) => mergeOptions(resolved, m, optionMergeStrategies, true));
    }
    mergeOptions(resolved, base, optionMergeStrategies);
  }
  cache.set(base, resolved);
  return resolved;
}
function mergeOptions(to, from, strats, asMixin = false) {
  const { mixins, extends: extendsOptions } = from;
  if (extendsOptions) {
    mergeOptions(to, extendsOptions, strats, true);
  }
  if (mixins) {
    mixins.forEach((m) => mergeOptions(to, m, strats, true));
  }
  for (const key in from) {
    if (asMixin && key === "expose")
      ;
    else {
      const strat = internalOptionMergeStrats[key] || strats && strats[key];
      to[key] = strat ? strat(to[key], from[key]) : from[key];
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
function mergeDataFn(to, from) {
  if (!from) {
    return to;
  }
  if (!to) {
    return from;
  }
  return function mergedDataFn() {
    return extend(isFunction(to) ? to.call(this, this) : to, isFunction(from) ? from.call(this, this) : from);
  };
}
function mergeInject(to, from) {
  return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
}
function normalizeInject(raw) {
  if (isArray(raw)) {
    const res = {};
    for (let i = 0; i < raw.length; i++) {
      res[raw[i]] = raw[i];
    }
    return res;
  }
  return raw;
}
function mergeAsArray(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function mergeObjectOptions(to, from) {
  return to ? extend(extend(/* @__PURE__ */ Object.create(null), to), from) : from;
}
function mergeWatchOptions(to, from) {
  if (!to)
    return from;
  if (!from)
    return to;
  const merged = extend(/* @__PURE__ */ Object.create(null), to);
  for (const key in from) {
    merged[key] = mergeAsArray(to[key], from[key]);
  }
  return merged;
}
function initProps(instance, rawProps, isStateful, isSSR = false) {
  const props = {};
  const attrs = {};
  def(attrs, InternalObjectKey, 1);
  instance.propsDefaults = /* @__PURE__ */ Object.create(null);
  setFullProps(instance, rawProps, props, attrs);
  for (const key in instance.propsOptions[0]) {
    if (!(key in props)) {
      props[key] = void 0;
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
      for (let i = 0; i < propsToUpdate.length; i++) {
        let key = propsToUpdate[i];
        if (isEmitListener(instance.emitsOptions, key)) {
          continue;
        }
        const value = rawProps[key];
        if (options) {
          if (hasOwn(attrs, key)) {
            if (value !== attrs[key]) {
              attrs[key] = value;
              hasAttrsChanged = true;
            }
          } else {
            const camelizedKey = camelize(key);
            props[camelizedKey] = resolvePropValue(options, rawCurrentProps, camelizedKey, value, instance, false);
          }
        } else {
          if (value !== attrs[key]) {
            attrs[key] = value;
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
    for (const key in rawCurrentProps) {
      if (!rawProps || !hasOwn(rawProps, key) && ((kebabKey = hyphenate(key)) === key || !hasOwn(rawProps, kebabKey))) {
        if (options) {
          if (rawPrevProps && (rawPrevProps[key] !== void 0 || rawPrevProps[kebabKey] !== void 0)) {
            props[key] = resolvePropValue(options, rawCurrentProps, key, void 0, instance, true);
          }
        } else {
          delete props[key];
        }
      }
    }
    if (attrs !== rawCurrentProps) {
      for (const key in attrs) {
        if (!rawProps || !hasOwn(rawProps, key) && true) {
          delete attrs[key];
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
    for (let key in rawProps) {
      if (isReservedProp(key)) {
        continue;
      }
      const value = rawProps[key];
      let camelKey;
      if (options && hasOwn(options, camelKey = camelize(key))) {
        if (!needCastKeys || !needCastKeys.includes(camelKey)) {
          props[camelKey] = value;
        } else {
          (rawCastValues || (rawCastValues = {}))[camelKey] = value;
        }
      } else if (!isEmitListener(instance.emitsOptions, key)) {
        if (!(key in attrs) || value !== attrs[key]) {
          attrs[key] = value;
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (needCastKeys) {
    const rawCurrentProps = toRaw(props);
    const castValues = rawCastValues || EMPTY_OBJ;
    for (let i = 0; i < needCastKeys.length; i++) {
      const key = needCastKeys[i];
      props[key] = resolvePropValue(options, rawCurrentProps, key, castValues[key], instance, !hasOwn(castValues, key));
    }
  }
  return hasAttrsChanged;
}
function resolvePropValue(options, props, key, value, instance, isAbsent) {
  const opt = options[key];
  if (opt != null) {
    const hasDefault = hasOwn(opt, "default");
    if (hasDefault && value === void 0) {
      const defaultValue = opt.default;
      if (opt.type !== Function && isFunction(defaultValue)) {
        const { propsDefaults } = instance;
        if (key in propsDefaults) {
          value = propsDefaults[key];
        } else {
          setCurrentInstance(instance);
          value = propsDefaults[key] = defaultValue.call(null, props);
          unsetCurrentInstance();
        }
      } else {
        value = defaultValue;
      }
    }
    if (opt[0]) {
      if (isAbsent && !hasDefault) {
        value = false;
      } else if (opt[1] && (value === "" || value === hyphenate(key))) {
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
  if (!isFunction(comp)) {
    const extendProps = (raw2) => {
      hasExtends = true;
      const [props, keys] = normalizePropsOptions(raw2, appContext, true);
      extend(normalized, props);
      if (keys)
        needCastKeys.push(...keys);
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
    for (let i = 0; i < raw.length; i++) {
      const normalizedKey = camelize(raw[i]);
      if (validatePropName(normalizedKey)) {
        normalized[normalizedKey] = EMPTY_OBJ;
      }
    }
  } else if (raw) {
    for (const key in raw) {
      const normalizedKey = camelize(key);
      if (validatePropName(normalizedKey)) {
        const opt = raw[key];
        const prop = normalized[normalizedKey] = isArray(opt) || isFunction(opt) ? { type: opt } : opt;
        if (prop) {
          const booleanIndex = getTypeIndex(Boolean, prop.type);
          const stringIndex = getTypeIndex(String, prop.type);
          prop[0] = booleanIndex > -1;
          prop[1] = stringIndex < 0 || booleanIndex < stringIndex;
          if (booleanIndex > -1 || hasOwn(prop, "default")) {
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
function validatePropName(key) {
  if (key[0] !== "$") {
    return true;
  }
  return false;
}
function getType(ctor) {
  const match = ctor && ctor.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ctor === null ? "null" : "";
}
function isSameType(a2, b) {
  return getType(a2) === getType(b);
}
function getTypeIndex(type, expectedTypes) {
  if (isArray(expectedTypes)) {
    return expectedTypes.findIndex((t) => isSameType(t, type));
  } else if (isFunction(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1;
  }
  return -1;
}
const isInternalKey = (key) => key[0] === "_" || key === "$stable";
const normalizeSlotValue = (value) => isArray(value) ? value.map(normalizeVNode) : [normalizeVNode(value)];
const normalizeSlot = (key, rawSlot, ctx) => {
  const normalized = withCtx((...args) => {
    return normalizeSlotValue(rawSlot(...args));
  }, ctx);
  normalized._c = false;
  return normalized;
};
const normalizeObjectSlots = (rawSlots, slots, instance) => {
  const ctx = rawSlots._ctx;
  for (const key in rawSlots) {
    if (isInternalKey(key))
      continue;
    const value = rawSlots[key];
    if (isFunction(value)) {
      slots[key] = normalizeSlot(key, value, ctx);
    } else if (value != null) {
      const normalized = normalizeSlotValue(value);
      slots[key] = () => normalized;
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
    for (const key in slots) {
      if (!isInternalKey(key) && !(key in deletionComparisonTarget)) {
        delete slots[key];
      }
    }
  }
};
function invokeDirectiveHook(vnode, prevVNode, instance, name) {
  const bindings = vnode.dirs;
  const oldBindings = prevVNode && prevVNode.dirs;
  for (let i = 0; i < bindings.length; i++) {
    const binding = bindings[i];
    if (oldBindings) {
      binding.oldValue = oldBindings[i].value;
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
function createAppAPI(render, hydrate) {
  return function createApp2(rootComponent, rootProps = null) {
    if (!isFunction(rootComponent)) {
      rootComponent = Object.assign({}, rootComponent);
    }
    if (rootProps != null && !isObject(rootProps)) {
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
        else if (plugin && isFunction(plugin.install)) {
          installedPlugins.add(plugin);
          plugin.install(app, ...options);
        } else if (isFunction(plugin)) {
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
            render(vnode, rootContainer, isSVG);
          }
          isMounted = true;
          app._container = rootContainer;
          rootContainer.__vue_app__ = app;
          return getExposeProxy(vnode.component) || vnode.component.proxy;
        }
      },
      unmount() {
        if (isMounted) {
          render(null, app._container);
          delete app._container.__vue_app__;
        }
      },
      provide(key, value) {
        context.provides[key] = value;
        return app;
      }
    };
    return app;
  };
}
function setRef(rawRef, oldRawRef, parentSuspense, vnode, isUnmount = false) {
  if (isArray(rawRef)) {
    rawRef.forEach((r, i) => setRef(r, oldRawRef && (isArray(oldRawRef) ? oldRawRef[i] : oldRawRef), parentSuspense, vnode, isUnmount));
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
  if (isFunction(ref2)) {
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
      case Text:
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
      case Fragment:
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
        for (const key in props) {
          if (key !== "value" && !isReservedProp(key)) {
            hostPatchProp(el, key, null, props[key], isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
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
      for (let i = 0; i < slotScopeIds.length; i++) {
        hostSetScopeId(el, slotScopeIds[i]);
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
  const mountChildren = (children, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, start = 0) => {
    for (let i = start; i < children.length; i++) {
      const child = children[i] = optimized ? cloneIfMounted(children[i]) : normalizeVNode(children[i]);
      patch(null, child, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
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
          for (let i = 0; i < propsToUpdate.length; i++) {
            const key = propsToUpdate[i];
            const prev = oldProps[key];
            const next = newProps[key];
            if (next !== prev || key === "value") {
              hostPatchProp(el, key, prev, next, isSVG, n1.children, parentComponent, parentSuspense, unmountChildren);
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
    for (let i = 0; i < newChildren.length; i++) {
      const oldVNode = oldChildren[i];
      const newVNode = newChildren[i];
      const container = oldVNode.el && (oldVNode.type === Fragment || !isSameVNodeType(oldVNode, newVNode) || oldVNode.shapeFlag & (6 | 64)) ? hostParentNode(oldVNode.el) : fallbackContainer;
      patch(oldVNode, newVNode, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, true);
    }
  };
  const patchProps = (el, vnode, oldProps, newProps, parentComponent, parentSuspense, isSVG) => {
    if (oldProps !== newProps) {
      for (const key in newProps) {
        if (isReservedProp(key))
          continue;
        const next = newProps[key];
        const prev = oldProps[key];
        if (next !== prev && key !== "value") {
          hostPatchProp(el, key, prev, next, isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
        }
      }
      if (oldProps !== EMPTY_OBJ) {
        for (const key in oldProps) {
          if (!isReservedProp(key) && !(key in newProps)) {
            hostPatchProp(el, key, oldProps[key], null, isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
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
    const effect = instance.effect = new ReactiveEffect(componentUpdateFn, () => queueJob(instance.update), instance.scope);
    const update2 = instance.update = effect.run.bind(effect);
    update2.id = instance.uid;
    toggleRecurse(instance, true);
    update2();
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
    let i;
    for (i = 0; i < commonLength; i++) {
      const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
      patch(c1[i], nextChild, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    }
    if (oldLength > newLength) {
      unmountChildren(c1, parentComponent, parentSuspense, true, false, commonLength);
    } else {
      mountChildren(c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, commonLength);
    }
  };
  const patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    let i = 0;
    const l2 = c2.length;
    let e1 = c1.length - 1;
    let e2 = l2 - 1;
    while (i <= e1 && i <= e2) {
      const n1 = c1[i];
      const n2 = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
      if (isSameVNodeType(n1, n2)) {
        patch(n1, n2, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      } else {
        break;
      }
      i++;
    }
    while (i <= e1 && i <= e2) {
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
    if (i > e1) {
      if (i <= e2) {
        const nextPos = e2 + 1;
        const anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;
        while (i <= e2) {
          patch(null, c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]), container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          i++;
        }
      }
    } else if (i > e2) {
      while (i <= e1) {
        unmount(c1[i], parentComponent, parentSuspense, true);
        i++;
      }
    } else {
      const s1 = i;
      const s2 = i;
      const keyToNewIndexMap = /* @__PURE__ */ new Map();
      for (i = s2; i <= e2; i++) {
        const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
        if (nextChild.key != null) {
          keyToNewIndexMap.set(nextChild.key, i);
        }
      }
      let j;
      let patched = 0;
      const toBePatched = e2 - s2 + 1;
      let moved = false;
      let maxNewIndexSoFar = 0;
      const newIndexToOldIndexMap = new Array(toBePatched);
      for (i = 0; i < toBePatched; i++)
        newIndexToOldIndexMap[i] = 0;
      for (i = s1; i <= e1; i++) {
        const prevChild = c1[i];
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
          newIndexToOldIndexMap[newIndex - s2] = i + 1;
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
      for (i = toBePatched - 1; i >= 0; i--) {
        const nextIndex = s2 + i;
        const nextChild = c2[nextIndex];
        const anchor = nextIndex + 1 < l2 ? c2[nextIndex + 1].el : parentAnchor;
        if (newIndexToOldIndexMap[i] === 0) {
          patch(null, nextChild, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else if (moved) {
          if (j < 0 || i !== increasingNewIndexSequence[j]) {
            move(nextChild, container, anchor, 2);
          } else {
            j--;
          }
        }
      }
    }
  };
  const move = (vnode, container, anchor, moveType, parentSuspense = null) => {
    const { el, type, transition, children, shapeFlag } = vnode;
    if (shapeFlag & 6) {
      move(vnode.component.subTree, container, anchor, moveType);
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
    if (type === Fragment) {
      hostInsert(el, container, anchor);
      for (let i = 0; i < children.length; i++) {
        move(children[i], container, anchor, moveType);
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
        const remove3 = () => hostInsert(el, container, anchor);
        const performLeave = () => {
          leave(el, () => {
            remove3();
            afterLeave && afterLeave();
          });
        };
        if (delayLeave) {
          delayLeave(el, remove3, performLeave);
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
      } else if (dynamicChildren && (type !== Fragment || patchFlag > 0 && patchFlag & 64)) {
        unmountChildren(dynamicChildren, parentComponent, parentSuspense, false, true);
      } else if (type === Fragment && patchFlag & (128 | 256) || !optimized && shapeFlag & 16) {
        unmountChildren(children, parentComponent, parentSuspense);
      }
      if (doRemove) {
        remove2(vnode);
      }
    }
    if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeUnmounted) || shouldInvokeDirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        shouldInvokeDirs && invokeDirectiveHook(vnode, null, parentComponent, "unmounted");
      }, parentSuspense);
    }
  };
  const remove2 = (vnode) => {
    const { type, el, anchor, transition } = vnode;
    if (type === Fragment) {
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
  const removeFragment = (cur, end) => {
    let next;
    while (cur !== end) {
      next = hostNextSibling(cur);
      hostRemove(cur);
      cur = next;
    }
    hostRemove(end);
  };
  const unmountComponent = (instance, parentSuspense, doRemove) => {
    const { bum, scope, update: update2, subTree, um } = instance;
    if (bum) {
      invokeArrayFns(bum);
    }
    scope.stop();
    if (update2) {
      update2.active = false;
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
  const unmountChildren = (children, parentComponent, parentSuspense, doRemove = false, optimized = false, start = 0) => {
    for (let i = start; i < children.length; i++) {
      unmount(children[i], parentComponent, parentSuspense, doRemove, optimized);
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
  const render = (vnode, container, isSVG) => {
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
    m: move,
    r: remove2,
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
    render,
    hydrate,
    createApp: createAppAPI(render, hydrate)
  };
}
function toggleRecurse({ effect, update: update2 }, allowed) {
  effect.allowRecurse = update2.allowRecurse = allowed;
}
function traverseStaticChildren(n1, n2, shallow = false) {
  const ch1 = n1.children;
  const ch2 = n2.children;
  if (isArray(ch1) && isArray(ch2)) {
    for (let i = 0; i < ch1.length; i++) {
      const c1 = ch1[i];
      let c2 = ch2[i];
      if (c2.shapeFlag & 1 && !c2.dynamicChildren) {
        if (c2.patchFlag <= 0 || c2.patchFlag === 32) {
          c2 = ch2[i] = cloneIfMounted(ch2[i]);
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
  const result = [0];
  let i, j, u, v, c;
  const len = arr.length;
  for (i = 0; i < len; i++) {
    const arrI = arr[i];
    if (arrI !== 0) {
      j = result[result.length - 1];
      if (arr[j] < arrI) {
        p2[i] = j;
        result.push(i);
        continue;
      }
      u = 0;
      v = result.length - 1;
      while (u < v) {
        c = u + v >> 1;
        if (arr[result[c]] < arrI) {
          u = c + 1;
        } else {
          v = c;
        }
      }
      if (arrI < arr[result[u]]) {
        if (u > 0) {
          p2[i] = result[u - 1];
        }
        result[u] = i;
      }
    }
  }
  u = result.length;
  v = result[u - 1];
  while (u-- > 0) {
    result[u] = v;
    v = p2[v];
  }
  return result;
}
const isTeleport = (type) => type.__isTeleport;
const NULL_DYNAMIC_COMPONENT = Symbol();
const Fragment = Symbol(void 0);
const Text = Symbol(void 0);
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
function isVNode(value) {
  return value ? value.__v_isVNode === true : false;
}
function isSameVNodeType(n1, n2) {
  return n1.type === n2.type && n1.key === n2.key;
}
const InternalObjectKey = `__vInternal`;
const normalizeKey = ({ key }) => key != null ? key : null;
const normalizeRef = ({ ref: ref2, ref_key, ref_for }) => {
  return ref2 != null ? isString(ref2) || isRef(ref2) || isFunction(ref2) ? { i: currentRenderingInstance, r: ref2, k: ref_key, f: !!ref_for } : ref2 : null;
};
function createBaseVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, shapeFlag = type === Fragment ? 0 : 1, isBlockNode = false, needFullChildrenNormalization = false) {
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
  if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock && (vnode.patchFlag > 0 || shapeFlag & 6) && vnode.patchFlag !== 32) {
    currentBlock.push(vnode);
  }
  return vnode;
}
const createVNode = _createVNode;
function _createVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
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
    let { class: klass, style } = props;
    if (klass && !isString(klass)) {
      props.class = normalizeClass(klass);
    }
    if (isObject(style)) {
      if (isProxy(style) && !isArray(style)) {
        style = extend({}, style);
      }
      props.style = normalizeStyle(style);
    }
  }
  const shapeFlag = isString(type) ? 1 : isSuspense(type) ? 128 : isTeleport(type) ? 64 : isObject(type) ? 4 : isFunction(type) ? 2 : 0;
  return createBaseVNode(type, props, children, patchFlag, dynamicProps, shapeFlag, isBlockNode, true);
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
    patchFlag: extraProps && vnode.type !== Fragment ? patchFlag === -1 ? 16 : patchFlag | 16 : patchFlag,
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
function createTextVNode(text = " ", flag = 0) {
  return createVNode(Text, null, text, flag);
}
function normalizeVNode(child) {
  if (child == null || typeof child === "boolean") {
    return createVNode(Comment);
  } else if (isArray(child)) {
    return createVNode(Fragment, null, child.slice());
  } else if (typeof child === "object") {
    return cloneIfMounted(child);
  } else {
    return createVNode(Text, null, String(child));
  }
}
function cloneIfMounted(child) {
  return child.el === null || child.memo ? child : cloneVNode(child);
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
  } else if (isFunction(children)) {
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
  for (let i = 0; i < args.length; i++) {
    const toMerge = args[i];
    for (const key in toMerge) {
      if (key === "class") {
        if (ret.class !== toMerge.class) {
          ret.class = normalizeClass([ret.class, toMerge.class]);
        }
      } else if (key === "style") {
        ret.style = normalizeStyle([ret.style, toMerge.style]);
      } else if (isOn(key)) {
        const existing = ret[key];
        const incoming = toMerge[key];
        if (incoming && existing !== incoming && !(isArray(existing) && existing.includes(incoming))) {
          ret[key] = existing ? [].concat(existing, incoming) : incoming;
        }
      } else if (key !== "") {
        ret[key] = toMerge[key];
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
const getPublicInstance = (i) => {
  if (!i)
    return null;
  if (isStatefulComponent(i))
    return getExposeProxy(i) || i.proxy;
  return getPublicInstance(i.parent);
};
const publicPropertiesMap = /* @__PURE__ */ extend(/* @__PURE__ */ Object.create(null), {
  $: (i) => i,
  $el: (i) => i.vnode.el,
  $data: (i) => i.data,
  $props: (i) => i.props,
  $attrs: (i) => i.attrs,
  $slots: (i) => i.slots,
  $refs: (i) => i.refs,
  $parent: (i) => getPublicInstance(i.parent),
  $root: (i) => getPublicInstance(i.root),
  $emit: (i) => i.emit,
  $options: (i) => resolveMergedOptions(i),
  $forceUpdate: (i) => () => queueJob(i.update),
  $nextTick: (i) => nextTick.bind(i.proxy),
  $watch: (i) => instanceWatch.bind(i)
});
const PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
    let normalizedProps;
    if (key[0] !== "$") {
      const n = accessCache[key];
      if (n !== void 0) {
        switch (n) {
          case 1:
            return setupState[key];
          case 2:
            return data[key];
          case 4:
            return ctx[key];
          case 3:
            return props[key];
        }
      } else if (setupState !== EMPTY_OBJ && hasOwn(setupState, key)) {
        accessCache[key] = 1;
        return setupState[key];
      } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
        accessCache[key] = 2;
        return data[key];
      } else if ((normalizedProps = instance.propsOptions[0]) && hasOwn(normalizedProps, key)) {
        accessCache[key] = 3;
        return props[key];
      } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
        accessCache[key] = 4;
        return ctx[key];
      } else if (shouldCacheAccess) {
        accessCache[key] = 0;
      }
    }
    const publicGetter = publicPropertiesMap[key];
    let cssModule, globalProperties;
    if (publicGetter) {
      if (key === "$attrs") {
        track(instance, "get", key);
      }
      return publicGetter(instance);
    } else if ((cssModule = type.__cssModules) && (cssModule = cssModule[key])) {
      return cssModule;
    } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
      accessCache[key] = 4;
      return ctx[key];
    } else if (globalProperties = appContext.config.globalProperties, hasOwn(globalProperties, key)) {
      {
        return globalProperties[key];
      }
    } else
      ;
  },
  set({ _: instance }, key, value) {
    const { data, setupState, ctx } = instance;
    if (setupState !== EMPTY_OBJ && hasOwn(setupState, key)) {
      setupState[key] = value;
      return true;
    } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
      data[key] = value;
      return true;
    } else if (hasOwn(instance.props, key)) {
      return false;
    }
    if (key[0] === "$" && key.slice(1) in instance) {
      return false;
    } else {
      {
        ctx[key] = value;
      }
    }
    return true;
  },
  has({ _: { data, setupState, accessCache, ctx, appContext, propsOptions } }, key) {
    let normalizedProps;
    return !!accessCache[key] || data !== EMPTY_OBJ && hasOwn(data, key) || setupState !== EMPTY_OBJ && hasOwn(setupState, key) || (normalizedProps = propsOptions[0]) && hasOwn(normalizedProps, key) || hasOwn(ctx, key) || hasOwn(publicPropertiesMap, key) || hasOwn(appContext.config.globalProperties, key);
  },
  defineProperty(target, key, descriptor) {
    if (descriptor.get != null) {
      target._.accessCache[key] = 0;
    } else if (hasOwn(descriptor, "value")) {
      this.set(target, key, descriptor.value, null);
    }
    return Reflect.defineProperty(target, key, descriptor);
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
  if (isFunction(setupResult)) {
    if (instance.type.__ssrInlineRender) {
      instance.ssrRender = setupResult;
    } else {
      instance.render = setupResult;
    }
  } else if (isObject(setupResult)) {
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
    get(target, key) {
      track(instance, "get", "$attrs");
      return target[key];
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
      get(target, key) {
        if (key in target) {
          return target[key];
        } else if (key in publicPropertiesMap) {
          return publicPropertiesMap[key](instance);
        }
      }
    }));
  }
}
function isClassComponent(value) {
  return isFunction(value) && "__vccOpts" in value;
}
const computed = (getterOrOptions, debugOptions) => {
  return computed$1(getterOrOptions, debugOptions, isInSSRComponentSetup);
};
const version = "3.2.33";
const svgNS = "http://www.w3.org/2000/svg";
const doc = typeof document !== "undefined" ? document : null;
const templateContainer = doc && /* @__PURE__ */ doc.createElement("template");
const nodeOps = {
  insert: (child, parent, anchor) => {
    parent.insertBefore(child, anchor || null);
  },
  remove: (child) => {
    const parent = child.parentNode;
    if (parent) {
      parent.removeChild(child);
    }
  },
  createElement: (tag, isSVG, is, props) => {
    const el = isSVG ? doc.createElementNS(svgNS, tag) : doc.createElement(tag, is ? { is } : void 0);
    if (tag === "select" && props && props.multiple != null) {
      el.setAttribute("multiple", props.multiple);
    }
    return el;
  },
  createText: (text) => doc.createTextNode(text),
  createComment: (text) => doc.createComment(text),
  setText: (node, text) => {
    node.nodeValue = text;
  },
  setElementText: (el, text) => {
    el.textContent = text;
  },
  parentNode: (node) => node.parentNode,
  nextSibling: (node) => node.nextSibling,
  querySelector: (selector) => doc.querySelector(selector),
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
  insertStaticContent(content, parent, anchor, isSVG, start, end) {
    const before = anchor ? anchor.previousSibling : parent.lastChild;
    if (start && (start === end || start.nextSibling)) {
      while (true) {
        parent.insertBefore(start.cloneNode(true), anchor);
        if (start === end || !(start = start.nextSibling))
          break;
      }
    } else {
      templateContainer.innerHTML = isSVG ? `<svg>${content}</svg>` : content;
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
      before ? before.nextSibling : parent.firstChild,
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
  const style = el.style;
  const isCssString = isString(next);
  if (next && !isCssString) {
    for (const key in next) {
      setStyle(style, key, next[key]);
    }
    if (prev && !isString(prev)) {
      for (const key in prev) {
        if (next[key] == null) {
          setStyle(style, key, "");
        }
      }
    }
  } else {
    const currentDisplay = style.display;
    if (isCssString) {
      if (prev !== next) {
        style.cssText = next;
      }
    } else if (prev) {
      el.removeAttribute("style");
    }
    if ("_vod" in el) {
      style.display = currentDisplay;
    }
  }
}
const importantRE = /\s*!important$/;
function setStyle(style, name, val) {
  if (isArray(val)) {
    val.forEach((v) => setStyle(style, name, v));
  } else {
    if (val == null)
      val = "";
    if (name.startsWith("--")) {
      style.setProperty(name, val);
    } else {
      const prefixed = autoPrefix(style, name);
      if (importantRE.test(val)) {
        style.setProperty(hyphenate(prefixed), val.replace(importantRE, ""), "important");
      } else {
        style[prefixed] = val;
      }
    }
  }
}
const prefixes = ["Webkit", "Moz", "ms"];
const prefixCache = {};
function autoPrefix(style, rawName) {
  const cached = prefixCache[rawName];
  if (cached) {
    return cached;
  }
  let name = camelize(rawName);
  if (name !== "filter" && name in style) {
    return prefixCache[rawName] = name;
  }
  name = capitalize(name);
  for (let i = 0; i < prefixes.length; i++) {
    const prefixed = prefixes[i] + name;
    if (prefixed in style) {
      return prefixCache[rawName] = prefixed;
    }
  }
  return rawName;
}
const xlinkNS = "http://www.w3.org/1999/xlink";
function patchAttr(el, key, value, isSVG, instance) {
  if (isSVG && key.startsWith("xlink:")) {
    if (value == null) {
      el.removeAttributeNS(xlinkNS, key.slice(6, key.length));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    const isBoolean = isSpecialBooleanAttr(key);
    if (value == null || isBoolean && !includeBooleanAttr(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, isBoolean ? "" : value);
    }
  }
}
function patchDOMProp(el, key, value, prevChildren, parentComponent, parentSuspense, unmountChildren) {
  if (key === "innerHTML" || key === "textContent") {
    if (prevChildren) {
      unmountChildren(prevChildren, parentComponent, parentSuspense);
    }
    el[key] = value == null ? "" : value;
    return;
  }
  if (key === "value" && el.tagName !== "PROGRESS" && !el.tagName.includes("-")) {
    el._value = value;
    const newValue = value == null ? "" : value;
    if (el.value !== newValue || el.tagName === "OPTION") {
      el.value = newValue;
    }
    if (value == null) {
      el.removeAttribute(key);
    }
    return;
  }
  let needRemove = false;
  if (value === "" || value == null) {
    const type = typeof el[key];
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
    el[key] = value;
  } catch (e) {
  }
  needRemove && el.removeAttribute(key);
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
    return value.map((fn) => (e2) => !e2._stopped && fn && fn(e2));
  } else {
    return value;
  }
}
const nativeOnRE = /^on[a-z]/;
const patchProp = (el, key, prevValue, nextValue, isSVG = false, prevChildren, parentComponent, parentSuspense, unmountChildren) => {
  if (key === "class") {
    patchClass(el, nextValue, isSVG);
  } else if (key === "style") {
    patchStyle(el, prevValue, nextValue);
  } else if (isOn(key)) {
    if (!isModelListener(key)) {
      patchEvent(el, key, prevValue, nextValue, parentComponent);
    }
  } else if (key[0] === "." ? (key = key.slice(1), true) : key[0] === "^" ? (key = key.slice(1), false) : shouldSetAsProp(el, key, nextValue, isSVG)) {
    patchDOMProp(el, key, nextValue, prevChildren, parentComponent, parentSuspense, unmountChildren);
  } else {
    if (key === "true-value") {
      el._trueValue = nextValue;
    } else if (key === "false-value") {
      el._falseValue = nextValue;
    }
    patchAttr(el, key, nextValue, isSVG);
  }
};
function shouldSetAsProp(el, key, value, isSVG) {
  if (isSVG) {
    if (key === "innerHTML" || key === "textContent") {
      return true;
    }
    if (key in el && nativeOnRE.test(key) && isFunction(value)) {
      return true;
    }
    return false;
  }
  if (key === "spellcheck" || key === "draggable" || key === "translate") {
    return false;
  }
  if (key === "form") {
    return false;
  }
  if (key === "list" && el.tagName === "INPUT") {
    return false;
  }
  if (key === "type" && el.tagName === "TEXTAREA") {
    return false;
  }
  if (nativeOnRE.test(key) && isString(value)) {
    return false;
  }
  return key in el;
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
    if (!isFunction(component) && !component.render && !component.template) {
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
const _hoisted_1$3 = /* @__PURE__ */ createBaseVNode("h1", null, "\u53E4\u8BD7\u9274\u8D4F\u751F\u6210\u5668", -1);
const _hoisted_2$3 = /* @__PURE__ */ createBaseVNode("h3", null, "nlp-chinese-poetry-appreciation", -1);
const _sfc_main$3 = {
  props: {
    msg: String
  },
  setup(__props) {
    ref(0);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        _hoisted_1$3,
        _hoisted_2$3
      ], 64);
    };
  }
};
var shanshui_vue_vue_type_style_index_0_lang = "";
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
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
    for (var i = 0; i < y.length; i++) {
      z += y.charCodeAt(i) * Math.pow(128, i);
    }
    return z;
  };
  this.seed = function(x) {
    if (x == void 0) {
      x = new Date().getTime();
    }
    var y = 0;
    var z = 0;
    function redo() {
      y = (Prng.hash(x) + z) % Prng.m;
      z += 1;
    }
    while (y % Prng.p == 0 || y % Prng.q == 0 || y == 0 || y == 1) {
      redo();
    }
    Prng.s = y;
    console.log(["int seed", Prng.s]);
    for (var i = 0; i < 10; i++) {
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
    for (var i = 0; i < 1e7; i++) {
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
  for (var i = 0; i < par.length; i++) {
    var e = par[i].split("=");
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
  var scaled_cosine = function(i) {
    return 0.5 * (1 - Math.cos(i * Math.PI));
  };
  var perlin;
  this.noise = function(x, y, z) {
    y = y || 0;
    z = z || 0;
    if (perlin == null) {
      perlin = new Array(PERLIN_SIZE + 1);
      for (var i = 0; i < PERLIN_SIZE + 1; i++) {
        perlin[i] = Math.random();
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
    for (var i = 0; i < PERLIN_SIZE + 1; i++) {
      perlin[i] = lcg.rand();
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
      for (var i = 0; i < plist2.length; i++) {
        var np = plist2[i != plist2.length - 1 ? i + 1 : 0];
        var sect = intersect([plist2[i], np], [pt, [pt[0] + 999, pt[1] + 999]]);
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
      for (var i = 0; i < plist2.length; i++) {
        var pt = plist2[i];
        var np = plist2[i != plist2.length - 1 ? i + 1 : 0];
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
      for (var i = 0; i < plist2.length; i++) {
        var pt = plist2[i];
        var np = plist2[i != plist2.length - 1 ? i + 1 : 0];
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
      for (var i = 0; i < plist2.length; i++) {
        var pt = plist2[i];
        var lp = plist2[i != 0 ? i - 1 : plist2.length - 1];
        var np = plist2[i != plist2.length - 1 ? i + 1 : 0];
        var qlist = plist2.slice();
        qlist.splice(i, 1);
        if (convex || lnInPoly([lp, np], plist2)) {
          var c = [[lp, pt, np], qlist];
          if (!optimize)
            return c;
          cuts.push(c);
        }
      }
      var best = [plist2, []];
      var bestRatio = 0;
      for (var i = 0; i < cuts.length; i++) {
        var r = sliverRatio(cuts[i][0]);
        if (r >= bestRatio) {
          best = cuts[i];
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
        var ind = slist.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);
        var nind = (ind + 1) % plist2.length;
        var lind = (ind + 2) % plist2.length;
        try {
          var mid = PolyTools.midPt([plist2[ind], plist2[nind]]);
        } catch (err) {
          console.log(plist2);
          console.log(err);
          return [];
        }
        return shatter([plist2[ind], mid, plist2[lind]], a2).concat(shatter([plist2[lind], plist2[nind], mid], a2));
      }
    }
    if (plist.length <= 3) {
      return shatter(plist, area);
    } else {
      var cut = bestEar(plist);
      return shatter(cut[0], area).concat(PolyTools.triangulate(cut[1], args));
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
  for (var i = 0; i < nslist.length; i++) {
    nslist[i] += dif * (nslist.length - 1 - i) / (nslist.length - 1);
    if (nslist[i] < bds[0])
      bds[0] = nslist[i];
    if (nslist[i] > bds[1])
      bds[1] = nslist[i];
  }
  for (var i = 0; i < nslist.length; i++) {
    nslist[i] = mapval(nslist[i], bds[0], bds[1], 0, 1);
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
    for (var i = 0; i < pl + (j == P.length - 3); i += 1) {
      var t = i / pl;
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
  for (var i = 0; i < plist.length; i++) {
    canv += " " + (plist[i][0] + xof).toFixed(1) + "," + (plist[i][1] + yof).toFixed(1);
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
  for (var i = 1; i < ptlist.length - 1; i++) {
    var w = wid * fun(i / ptlist.length);
    w = w * (1 - noi) + w * noi * Noise.noise(i * 0.5, n0);
    var a1 = Math.atan2(ptlist[i][1] - ptlist[i - 1][1], ptlist[i][0] - ptlist[i - 1][0]);
    var a2 = Math.atan2(ptlist[i][1] - ptlist[i + 1][1], ptlist[i][0] - ptlist[i + 1][0]);
    var a3 = (a1 + a2) / 2;
    if (a3 < a2) {
      a3 += Math.PI;
    }
    vtxlist0.push([ptlist[i][0] + w * Math.cos(a3), ptlist[i][1] + w * Math.sin(a3)]);
    vtxlist1.push([ptlist[i][0] - w * Math.cos(a3), ptlist[i][1] - w * Math.sin(a3)]);
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
  for (var i = 0; i < reso + 1; i++) {
    var p2 = i / reso * 2;
    var xo = len / 2 - Math.abs(p2 - 1) * len;
    var yo = fun(p2) * wid / 2;
    var a2 = Math.atan2(yo, xo);
    var l = Math.sqrt(xo * xo + yo * yo);
    lalist.push([l, a2]);
  }
  var nslist = [];
  var n0 = Math.random() * 10;
  for (var i = 0; i < reso + 1; i++) {
    nslist.push(Noise.noise(i * 0.05, n0));
  }
  loopNoise(nslist);
  var plist = [];
  for (var i = 0; i < lalist.length; i++) {
    var ns = nslist[i] * noi + (1 - noi);
    var nx = x + Math.cos(lalist[i][1] + ang) * lalist[i][0] * ns;
    var ny = y + Math.sin(lalist[i][1] + ang) * lalist[i][0] * ns;
    plist.push([nx, ny]);
  }
  if (ret == 0) {
    return poly(plist, { fil: col, str: col, wid: 0 });
  } else {
    return plist;
  }
}
function div(plist, reso) {
  var tl = (plist.length - 1) * reso;
  var rlist = [];
  for (var i = 0; i < tl; i += 1) {
    var lastp = plist[Math.floor(i / reso)];
    var nextp = plist[Math.ceil(i / reso)];
    var p2 = i % reso / reso;
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
  for (var i = 0; i < tex; i++) {
    var mid = dis() * reso[1] | 0;
    var hlen = Math.floor(Math.random() * (reso[1] * len));
    var start = mid - hlen;
    var end = mid + hlen;
    start = Math.min(Math.max(start, 0), reso[1]);
    end = Math.min(Math.max(end, 0), reso[1]);
    var layer = i / tex * (reso[0] - 1);
    texlist.push([]);
    for (var j = start; j < end; j++) {
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
    for (var i = 0; i < reso; i++) {
      nslist.push([Noise.noise(i * 0.5), Noise.noise(i * 0.5, 0.5)]);
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
    for (var i = 0; i < reso; i++) {
      var nx = x;
      var ny = y - i * hei / reso;
      if (i >= reso / 4) {
        for (var j = 0; j < (reso - i) / 5; j++) {
          canv += blob(nx + (Math.random() - 0.5) * wid * 1.2 * (reso - i), ny + (Math.random() - 0.5) * wid, {
            len: Math.random() * 20 * (reso - i) * 0.2 + 10,
            wid: Math.random() * 6 + 3,
            ang: (Math.random() - 0.5) * Math.PI / 6,
            col: "rgba(" + leafcol[0] + "," + leafcol[1] + "," + leafcol[2] + "," + (Math.random() * 0.2 + parseFloat(leafcol[3])).toFixed(1) + ")"
          });
        }
      }
      line1.push([nx + (nslist[i][0] - 0.5) * wid - wid / 2, ny]);
      line2.push([nx + (nslist[i][1] - 0.5) * wid + wid / 2, ny]);
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
    for (var i = 0; i < clu; i++) {
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
    for (var i = 0; i < reso; i++) {
      nslist.push([Noise.noise(i * 0.5), Noise.noise(i * 0.5, 0.5)]);
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
    for (var i = 0; i < reso; i++) {
      var nx = x + ben(i / reso) * 100;
      var ny = y - i * hei / reso;
      if (i >= reso / 5) {
        for (var j = 0; j < (reso - i) * 2; j++) {
          var shape = function(x2) {
            return Math.log(50 * x2 + 1) / 3.95;
          };
          var ox = Math.random() * wid * 2 * shape((reso - i) / reso);
          blobs += blob(nx + ox * randChoice([-1, 1]), ny + (Math.random() - 0.5) * wid * 2, {
            len: ox * 2,
            wid: Math.random() * 6 + 3,
            ang: (Math.random() - 0.5) * Math.PI / 6,
            col: "rgba(" + leafcol[0] + "," + leafcol[1] + "," + leafcol[2] + "," + (Math.random() * 0.2 + parseFloat(leafcol[3])).toFixed(3) + ")"
          });
        }
      }
      line1.push([nx + ((nslist[i][0] - 0.5) * wid - wid / 2) * (reso - i) / reso, ny]);
      line2.push([nx + ((nslist[i][1] - 0.5) * wid + wid / 2) * (reso - i) / reso, ny]);
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
    for (var i = 0; i < g; i++) {
      a0 += (ben / 2 + Math.random() * ben / 2) * randChoice([-1, 1]);
      nx += Math.cos(a0) * hei / g;
      ny -= Math.sin(a0) * hei / g;
      tlist.push([nx, ny]);
    }
    var ta = Math.atan2(tlist[tlist.length - 1][1], tlist[tlist.length - 1][0]);
    for (var i = 0; i < tlist.length; i++) {
      var a2 = Math.atan2(tlist[i][1], tlist[i][0]);
      var d = Math.sqrt(tlist[i][0] * tlist[i][0] + tlist[i][1] * tlist[i][1]);
      tlist[i][0] = d * Math.cos(a2 - ta + ang);
      tlist[i][1] = d * Math.sin(a2 - ta + ang);
    }
    var trlist1 = [];
    var trlist2 = [];
    var span = det;
    var tl = (tlist.length - 1) * span;
    var lx = 0;
    var ly = 0;
    for (var i = 0; i < tl; i += 1) {
      var lastp = tlist[Math.floor(i / span)];
      var nextp = tlist[Math.ceil(i / span)];
      var p2 = i % span / span;
      var nx = lastp[0] * (1 - p2) + nextp[0] * p2;
      var ny = lastp[1] * (1 - p2) + nextp[1] * p2;
      var ang = Math.atan2(ny - ly, nx - lx);
      var woff = (Noise.noise(i * 0.3) - 0.5) * wid * hei / 80;
      var b = 0;
      if (p2 == 0) {
        b = Math.random() * wid;
      }
      var nw = wid * ((tl - i) / tl * 0.5 + 0.5);
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
      return -1 / Math.pow(i / tl + 1, 5) + 1;
    };
    var tfun = randChoice([fun2]);
    var a0 = Math.random() * Math.PI / 6 * dir + ang;
    for (var i = 0; i < tl; i++) {
      var mx = dir * tfun(i / tl) * 50 * sca * hs;
      var my = -i * 5 * sca;
      var a2 = Math.atan2(my, mx);
      var d = Math.pow(mx * mx + my * my, 0.5);
      var nx = Math.cos(a2 + a0) * d;
      var ny = Math.sin(a2 + a0) * d;
      twlist.push([nx + tx, ny + ty]);
      if ((i == (tl / 3 | 0) || i == (tl * 2 / 3 | 0)) && dep > 0) {
        canv += twig(nx + tx, ny + ty, dep - 1, {
          ang,
          sca: sca * 0.8,
          wid,
          dir: dir * randChoice([-1, 1]),
          lea
        });
      }
      if (i == tl - 1 && lea[0] == true) {
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
      for (var i2 = 0; i2 < reso + 1; i2++) {
        var p3 = i2 / reso * 2;
        var xo = len / 2 - Math.abs(p3 - 1) * len;
        var yo = fun(p3) * wid / 2;
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
      var brklist = [];
      for (var i2 = 0; i2 < lalist.length; i2++) {
        var ns = nslist[i2] * noi + (1 - noi);
        var nx2 = x2 + Math.cos(lalist[i2][1] + ang) * lalist[i2][0] * ns;
        var ny2 = y2 + Math.sin(lalist[i2][1] + ang) * lalist[i2][0] * ns;
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
    for (var i = 2; i < trlist[0].length - 1; i++) {
      var a0 = Math.atan2(trlist[0][i][1] - trlist[0][i - 1][1], trlist[0][i][0] - trlist[0][i - 1][0]);
      var a1 = Math.atan2(trlist[1][i][1] - trlist[1][i - 1][1], trlist[1][i][0] - trlist[1][i - 1][0]);
      var p2 = Math.random();
      var nx = trlist[0][i][0] * (1 - p2) + trlist[1][i][0] * p2;
      var ny = trlist[0][i][1] * (1 - p2) + trlist[1][i][1] * p2;
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
          [trlist[0][i][0], trlist[0][i][1], a0],
          [trlist[1][i][0], trlist[1][i][1], a1]
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
    for (var i = 0; i < trflist.length; i++) {
      if (Math.random() < 0.5) {
        rglist.push([]);
      } else {
        rglist[rglist.length - 1].push(trflist[i]);
      }
    }
    for (var i = 0; i < rglist.length; i++) {
      rglist[i] = div(rglist[i], 4);
      for (var j = 0; j < rglist[i].length; j++) {
        rglist[i][j][0] += (Noise.noise(i, j * 0.1, 1) - 0.5) * (15 + 5 * randGaussian());
        rglist[i][j][1] += (Noise.noise(i, j * 0.1, 2) - 0.5) * (15 + 5 * randGaussian());
      }
      canv += stroke(rglist[i].map(function(v) {
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
    for (var i = 0; i < trlist.length; i++) {
      if (i >= trlist.length * 0.3 && i <= trlist.length * 0.7 && Math.random() < 0.1 || i == trlist.length / 2 - 1) {
        var ba = Math.PI * 0.2 - Math.PI * 1.4 * (i > trlist.length / 2);
        var brlist = branch({
          hei: hei * (Math.random() + 1) * 0.3,
          wid: wid * 0.5,
          ang: ba
        });
        brlist[0].splice(0, 1);
        brlist[1].splice(0, 1);
        var foff = function(v) {
          return [v[0] + trlist[i][0], v[1] + trlist[i][1]];
        };
        txcanv += barkify(x, y, [brlist[0].map(foff), brlist[1].map(foff)]);
        for (var j = 0; j < brlist[0].length; j++) {
          if (Math.random() < 0.2 || j == brlist[0].length - 1) {
            twcanv += twig(brlist[0][j][0] + trlist[i][0] + x, brlist[0][j][1] + trlist[i][1] + y, 1, {
              wid: hei / 300,
              ang: ba > -Math.PI / 2 ? ba : ba + Math.PI,
              sca: 0.5 * hei / 300,
              dir: ba > -Math.PI / 2 ? 1 : -1
            });
          }
        }
        brlist = brlist[0].concat(brlist[1].reverse());
        trmlist = trmlist.concat(brlist.map(function(v) {
          return [v[0] + trlist[i][0], v[1] + trlist[i][1]];
        }));
      } else {
        trmlist.push(trlist[i]);
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
    for (var i = 0; i < trlist.length; i++) {
      var p2 = Math.abs(i - trlist.length * 0.5) / (trlist.length * 0.5);
      if (i >= trlist.length * 0.2 && i <= trlist.length * 0.8 && i % 3 == 0 && Math.random() > p2 || i == trlist.length / 2 - 1) {
        var bar = Math.random() * 0.2;
        var ba = -bar * Math.PI - (1 - bar * 2) * Math.PI * (i > trlist.length / 2);
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
            twcanv += twig(brlist[0][j][0] + trlist[i][0] + x, brlist[0][j][1] + trlist[i][1] + y, 0, {
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
          return [v[0] + trlist[i][0], v[1] + trlist[i][1]];
        }));
      } else {
        trmlist.push(trlist[i]);
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
      for (var i = 0; i < trlist.length; i++) {
        Math.abs(i - trlist.length * 0.5) / (trlist.length * 0.5);
        if ((Math.random() < 0.025 && i >= trlist.length * 0.2 && i <= trlist.length * 0.8 || i == (trlist.length / 2 | 0) - 1 || i == (trlist.length / 2 | 0) + 1) && dep > 0) {
          var bar = 0.02 + Math.random() * 0.08;
          var ba = bar * Math.PI - bar * 2 * Math.PI * (i > trlist.length / 2);
          var brlist = fracTree(trlist[i][0] + xoff, trlist[i][1] + yoff, dep - 1, {
            hei: hei2 * (0.7 + Math.random() * 0.2),
            wid: wid2 * 0.6,
            ang: ang + ba,
            ben: 0.55
          });
          for (var j = 0; j < brlist.length; j++) {
            if (Math.random() < 0.03) {
              twcanv += twig(brlist[j][0] + trlist[i][0] + xoff, brlist[j][1] + trlist[i][1] + yoff, 2, {
                ang: ba * (Math.random() * 0.5 + 0.75),
                sca: 0.3,
                dir: ba > 0 ? 1 : -1,
                lea: [false, 0]
              });
            }
          }
          trmlist2 = trmlist2.concat(brlist.map(function(v) {
            return [v[0] + trlist[i][0], v[1] + trlist[i][1]];
          }));
        } else {
          trmlist2.push(trlist[i]);
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
    for (var i = 0; i < reso; i++) {
      nslist.push([Noise.noise(i * 0.5), Noise.noise(i * 0.5, 0.5)]);
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
    for (var i = 0; i < reso; i++) {
      var nx = x + ben(i / reso) * 100;
      var ny = y - i * hei / reso;
      if (i >= reso / 4) {
        for (var j = 0; j < 1; j++) {
          var bpl = blob(nx + (Math.random() - 0.5) * wid * 1.2 * (reso - i) * 0.5, ny + (Math.random() - 0.5) * wid * 0.5, {
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
      line1.push([nx + (nslist[i][0] - 0.5) * wid - wid / 2, ny]);
      line2.push([nx + (nslist[i][1] - 0.5) * wid + wid / 2, ny]);
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
      trmlist = div(trmlist, 10);
      for (var i2 = 0; i2 < trmlist.length; i2++) {
        trmlist[i2][1] += bfun(i2 / trmlist.length) * 2;
      }
      for (var i2 = 0; i2 < trmlist.length; i2++) {
        var d = distance(trmlist[i2], spt);
        var a2 = Math.atan2(trmlist[i2][1] - spt[1], trmlist[i2][0] - spt[0]);
        trmlist[i2][0] = spt[0] + d * Math.cos(a2 + ang2);
        trmlist[i2][1] = spt[1] + d * Math.sin(a2 + ang2);
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
    for (var i = 0; i < trlist.length; i++) {
      if (Math.random() < 0.2) {
        twcanv += fracTree(x + trlist[i][0], y + trlist[i][1], Math.floor(4 * Math.random()), { hei: 20, ang: -Math.PI / 2 - ang * Math.random() });
      } else if (i == Math.floor(trlist.length / 2)) {
        twcanv += fracTree(x + trlist[i][0], y + trlist[i][1], 3, {
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
    for (var i = 0; i < ptlist.length - 2; i += 1) {
      if (i == ni) {
        ni = Math.min(ni + randChoice([1, 2]), ptlist.length - 1);
        ftlist.push([]);
        ftlist.push([]);
        for (var j = 0; j < Math.min(ptlist[i].length / 8, 10); j++) {
          ftlist[ftlist.length - 2].push([
            ptlist[i][j][0] + Noise.noise(j * 0.1, i) * 10,
            ptlist[i][j][1]
          ]);
          ftlist[ftlist.length - 1].push([
            ptlist[i][ptlist[i].length - 1 - j][0] - Noise.noise(j * 0.1, i) * 10,
            ptlist[i][ptlist[i].length - 1 - j][1]
          ]);
        }
        ftlist[ftlist.length - 2] = ftlist[ftlist.length - 2].reverse();
        ftlist[ftlist.length - 1] = ftlist[ftlist.length - 1].reverse();
        for (var j = 0; j < span; j++) {
          var p2 = j / span;
          var x1 = ptlist[i][0][0] * (1 - p2) + ptlist[ni][0][0] * p2;
          var y1 = ptlist[i][0][1] * (1 - p2) + ptlist[ni][0][1] * p2;
          var x2 = ptlist[i][ptlist[i].length - 1][0] * (1 - p2) + ptlist[ni][ptlist[i].length - 1][0] * p2;
          var y2 = ptlist[i][ptlist[i].length - 1][1] * (1 - p2) + ptlist[ni][ptlist[i].length - 1][1] * p2;
          var vib = -1.7 * (p2 - 1) * Math.pow(p2, 1 / 5);
          y1 += vib * 5 + Noise.noise(xof * 0.05, i) * 5;
          y2 += vib * 5 + Noise.noise(xof * 0.05, i) * 5;
          ftlist[ftlist.length - 2].push([x1, y1]);
          ftlist[ftlist.length - 1].push([x2, y2]);
        }
      }
    }
    var canv = "";
    for (var i = 0; i < ftlist.length; i++) {
      canv += poly(ftlist[i], {
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
    var h = hei;
    var w = wid;
    var reso = [10, 50];
    var hoff = 0;
    for (var j = 0; j < reso[0]; j++) {
      hoff += Math.random() * yoff / 100;
      ptlist.push([]);
      for (var i = 0; i < reso[1]; i++) {
        var x = (i / reso[1] - 0.5) * Math.PI;
        var y = Math.cos(x);
        y *= Noise.noise(x + 10, j * 0.15, seed);
        var p2 = 1 - j / reso[0];
        ptlist[ptlist.length - 1].push([x / Math.PI * w * p2, -y * h * p2 + hoff]);
      }
    }
    function vegetate(treeFunc, growthRule, proofRule) {
      var veglist = [];
      for (var i2 = 0; i2 < ptlist.length; i2 += 1) {
        for (var j2 = 0; j2 < ptlist[i2].length; j2 += 1) {
          if (growthRule(i2, j2)) {
            veglist.push([ptlist[i2][j2][0], ptlist[i2][j2][1]]);
          }
        }
      }
      for (var i2 = 0; i2 < veglist.length; i2++) {
        if (proofRule(veglist, i2)) {
          canv += treeFunc(veglist[i2][0], veglist[i2][1]);
        }
      }
    }
    vegetate(function(x2, y2) {
      return Tree.tree02(x2 + xoff, y2 + yoff - 5, {
        col: "rgba(100,100,100," + (Noise.noise(0.01 * x2, 0.01 * y2) * 0.5 * 0.3 + 0.5).toFixed(3) + ")",
        clu: 2
      });
    }, function(i2, j2) {
      var ns = Noise.noise(j2 * 0.1, seed);
      return i2 == 0 && ns * ns * ns < 0.1 && Math.abs(ptlist[i2][j2][1]) / h > 0.2;
    }, function(veglist, i2) {
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
    }, function(i2, j2) {
      var ns = Noise.noise(i2 * 0.1, j2 * 0.1, seed + 2);
      return ns * ns * ns < 0.1 && Math.abs(ptlist[i2][j2][1]) / h > 0.5;
    }, function(veglist, i2) {
      return true;
    });
    if (veg) {
      vegetate(function(x2, y2) {
        var ht = (h + y2) / h * 70;
        ht = ht * 0.3 + Math.random() * ht * 0.7;
        return Tree.tree01(x2 + xoff, y2 + yoff, {
          hei: ht,
          wid: Math.random() * 3 + 1,
          col: "rgba(100,100,100," + (Noise.noise(0.01 * x2, 0.01 * y2) * 0.5 * 0.3 + 0.3).toFixed(3) + ")"
        });
      }, function(i2, j2) {
        var ns = Noise.noise(i2 * 0.2, j2 * 0.05, seed);
        return j2 % 2 && ns * ns * ns * ns < 0.012 && Math.abs(ptlist[i2][j2][1]) / h < 0.3;
      }, function(veglist, i2) {
        var counter = 0;
        for (var j2 = 0; j2 < veglist.length; j2++) {
          if (i2 != j2 && Math.pow(veglist[i2][0] - veglist[j2][0], 2) + Math.pow(veglist[i2][1] - veglist[j2][1], 2) < 30 * 30) {
            counter++;
          }
          if (counter > 2) {
            return true;
          }
        }
        return false;
      });
      vegetate(function(x2, y2) {
        var ht = (h + y2) / h * 120;
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
      }, function(i2, j2) {
        var ns = Noise.noise(i2 * 0.2, j2 * 0.05, seed);
        return (j2 == 0 || j2 == ptlist[i2].length - 1) && ns * ns * ns * ns < 0.012;
      }, function(veglist, i2) {
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
    }, function(i2, j2) {
      var ns = Noise.noise(i2 * 0.2, j2 * 0.05, seed + 10);
      return i2 != 0 && (j2 == 1 || j2 == ptlist[i2].length - 2) && ns * ns * ns * ns < 8e-3;
    }, function(veglist, i2) {
      return true;
    });
    vegetate(function(x2, y2) {
      return Arch.arch03(x2 + xoff, y2 + yoff, seed, {
        sto: randChoice([5, 7]),
        wid: 40 + Math.random() * 20
      });
    }, function(i2, j2) {
      return i2 == 1 && Math.abs(j2 - ptlist[i2].length / 2) < 1 && Math.random() < 0.02;
    }, function(veglist, i2) {
      return true;
    });
    vegetate(function(x2, y2) {
      return Arch.transmissionTower01(x2 + xoff, y2 + yoff, seed);
    }, function(i2, j2) {
      var ns = Noise.noise(i2 * 0.2, j2 * 0.05, seed + 20 * Math.PI);
      return i2 % 2 == 0 && (j2 == 1 || j2 == ptlist[i2].length - 2) && ns * ns * ns * ns < 2e-3;
    }, function(veglist, i2) {
      return true;
    });
    vegetate(function(x2, y2) {
      return Mount.rock(x2 + xoff, y2 + yoff, seed, {
        wid: 20 + Math.random() * 20,
        hei: 20 + Math.random() * 20,
        sha: 2
      });
    }, function(i2, j2) {
      return (j2 == 0 || j2 == ptlist[i2].length - 1) && Math.random() < 0.1;
    }, function(veglist, i2) {
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
      for (var i = 0; i < reso[1]; i++) {
        var x = (i / reso[1] - 0.5) * Math.PI;
        var y = Math.cos(x * 2) + 1;
        y *= Noise.noise(x + 10, j * 0.1, seed);
        var p2 = 1 - j / reso[0] * 0.6;
        var nx = x / Math.PI * wid * p2;
        var ny = -y * hei * p2 + hoff;
        var h = 100;
        if (ny < -h * cho + hoff) {
          ny = -h * cho + hoff;
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
    for (var i = 0; i < flat.length; i += 2) {
      if (flat[i].length >= 2) {
        grlist1.push(flat[i][0]);
        grlist2.push(flat[i][flat[i].length - 1]);
      }
    }
    if (grlist1.length == 0) {
      return canv;
    }
    var wb = [grlist1[0][0], grlist2[0][0]];
    for (var i = 0; i < 3; i++) {
      var p2 = 0.8 - i * 0.2;
      grlist1.unshift([wb[0] * p2, grlist1[0][1] - 5]);
      grlist2.unshift([wb[1] * p2, grlist2[0][1] - 5]);
    }
    wb = [grlist1[grlist1.length - 1][0], grlist2[grlist2.length - 1][0]];
    for (var i = 0; i < 3; i++) {
      var p2 = 0.6 - i * i * 0.1;
      grlist1.push([wb[0] * p2, grlist1[grlist1.length - 1][1] + 1]);
      grlist2.push([wb[1] * p2, grlist2[grlist2.length - 1][1] + 1]);
    }
    var d = 5;
    grlist1 = div(grlist1, d);
    grlist2 = div(grlist2, d);
    var grlist = grlist1.reverse().concat(grlist2.concat([grlist1[0]]));
    for (var i = 0; i < grlist.length; i++) {
      var v = (1 - Math.abs(i % d - d / 2) / (d / 2)) * 0.12;
      grlist[i][0] *= 1 - v + Noise.noise(grlist[i][1] * 0.5) * v;
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
      for (var i2 = 0; i2 < plist.length; i2++) {
        if (xmin == void 0 || plist[i2][0] < xmin) {
          xmin = plist[i2][0];
        }
        if (xmax == void 0 || plist[i2][0] > xmax) {
          xmax = plist[i2][0];
        }
        if (ymin == void 0 || plist[i2][1] < ymin) {
          ymin = plist[i2][1];
        }
        if (ymax == void 0 || plist[i2][1] > ymax) {
          ymax = plist[i2][1];
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
      for (var i = xmin; i < xmax; i += 30) {
        canv += Tree.tree05(xoff + i + 20 * normRand(-1, 1), yoff + (grbd.ymin + grbd.ymax) / 2 + 20, { hei: 100 + Math.random() * 200 });
      }
      for (var j = 0; j < Math.random() * 4; j++) {
        canv += Mount.rock(xoff + normRand(grbd.xmin, grbd.xmax), yoff + (grbd.ymin + grbd.ymax) / 2 + normRand(-5, 5) + 20, Math.random() * 100, {
          wid: 50 + Math.random() * 20,
          hei: 40 + Math.random() * 20,
          sha: 5
        });
      }
    } else if (tt == 2) {
      for (var i = 0; i < randChoice([1, 1, 1, 1, 2, 2, 3]); i++) {
        var xr = normRand(grbd.xmin, grbd.xmax);
        var yr = (grbd.ymin + grbd.ymax) / 2;
        canv += Tree.tree04(xoff + xr, yoff + yr + 20, {});
        for (var j = 0; j < Math.random() * 2; j++) {
          canv += Mount.rock(xoff + Math.max(grbd.xmin, Math.min(grbd.xmax, xr + normRand(-50, 50))), yoff + yr + normRand(-5, 5) + 20, j * i * Math.random() * 100, {
            wid: 50 + Math.random() * 20,
            hei: 40 + Math.random() * 20,
            sha: 5
          });
        }
      }
    } else if (tt == 3) {
      for (var i = 0; i < randChoice([1, 1, 1, 1, 2, 2, 3]); i++) {
        canv += Tree.tree06(xoff + normRand(grbd.xmin, grbd.xmax), yoff + (grbd.ymin + grbd.ymax) / 2, { hei: 60 + Math.random() * 60 });
      }
    } else if (tt == 4) {
      var pmin = Math.random() * 0.5;
      var pmax = Math.random() * 0.5 + 0.5;
      var xmin = grbd.xmin * (1 - pmin) + grbd.xmax * pmin;
      var xmax = grbd.xmin * (1 - pmax) + grbd.xmax * pmax;
      for (var i = xmin; i < xmax; i += 20) {
        canv += Tree.tree07(xoff + i + 20 * normRand(-1, 1), yoff + (grbd.ymin + grbd.ymax) / 2 + normRand(-1, 1) + 0, { hei: normRand(40, 80) });
      }
    }
    for (var i = 0; i < 50 * Math.random(); i++) {
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
    for (var i = 0; i < len / span / seg; i++) {
      ptlist.push([]);
      for (var j = 0; j < seg + 1; j++) {
        var tran = function(k2) {
          return [
            xoff + k2 * span,
            yoff - hei * Noise.noise(k2 * 0.05, seed) * Math.pow(Math.sin(Math.PI * k2 / (len / span)), 0.5)
          ];
        };
        ptlist[ptlist.length - 1].push(tran(i * seg + j));
      }
      for (var j = 0; j < seg / 2 + 1; j++) {
        var tran = function(k2) {
          return [
            xoff + k2 * span,
            yoff + 24 * Noise.noise(k2 * 0.05, 2, seed) * Math.pow(Math.sin(Math.PI * k2 / (len / span)), 1)
          ];
        };
        ptlist[ptlist.length - 1].unshift(tran(i * seg + j * 2));
      }
    }
    for (var i = 0; i < ptlist.length; i++) {
      var getCol = function(x, y) {
        var c = Noise.noise(x * 0.02, y * 0.02, yoff) * 55 + 200 | 0;
        return "rgb(" + c + "," + c + "," + c + ")";
      };
      canv += poly(ptlist[i], {
        fil: getCol(...ptlist[i][ptlist[i].length - 1]),
        str: "none",
        wid: 1
      });
      var T = PolyTools.triangulate(ptlist[i], {
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
    for (var i = 0; i < reso[0]; i++) {
      ptlist.push([]);
      var nslist = [];
      for (var j = 0; j < reso[1]; j++) {
        nslist.push(Noise.noise(i, j * 0.2, seed));
      }
      loopNoise(nslist);
      for (var j = 0; j < reso[1]; j++) {
        var a2 = j / reso[1] * Math.PI * 2 - Math.PI / 2;
        var l = wid * hei / Math.sqrt(Math.pow(hei * Math.cos(a2), 2) + Math.pow(wid * Math.sin(a2), 2));
        l *= 0.7 + 0.3 * nslist[j];
        var p2 = 1 - i / reso[0];
        var nx = Math.cos(a2) * l * p2;
        var ny = -Math.sin(a2) * l * p2;
        if (Math.PI < a2 || a2 < 0) {
          ny *= 0.2;
        }
        ny += hei * (i / reso[0]) * 0.2;
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
    for (var i = 0; i < reso[0]; i++) {
    }
    return canv;
  };
}();
var Arch = new function() {
  var flip = function(ptlist, axis) {
    axis = axis == void 0 ? 0 : axis;
    for (var i = 0; i < ptlist.length; i++) {
      if (ptlist[i].length > 0) {
        if (typeof ptlist[i][0] == "object") {
          for (var j = 0; j < ptlist[i].length; j++) {
            ptlist[i][j][0] = axis - (ptlist[i][j][0] - axis);
          }
        } else {
          ptlist[i][0] = axis - (ptlist[i][0] - axis);
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
    for (var i = 0; i < reso[0]; i++) {
      ptlist.push([]);
      var heir = hei + hei * 0.2 * Math.random();
      for (var j = 0; j < reso[1]; j++) {
        var nx = wid * (i / (reso[0] - 1) - 0.5) * Math.pow(j / (reso[1] - 1), 0.7);
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
    for (var i = 0; i < reso[0]; i++) {
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
    ptlist.push(div([
      [-wid * 0.5, -hei],
      [-wid * 0.5, 0]
    ], 5));
    ptlist.push(div([
      [wid * 0.5, -hei],
      [wid * 0.5, 0]
    ], 5));
    if (bot) {
      ptlist.push(div([
        [-wid * 0.5, 0],
        [mid, per]
      ], 5));
      ptlist.push(div([
        [wid * 0.5, 0],
        [mid, per]
      ], 5));
    }
    ptlist.push(div([
      [mid, -hei],
      [mid, per]
    ], 5));
    if (tra) {
      if (bot) {
        ptlist.push(div([
          [-wid * 0.5, 0],
          [bmid, -per]
        ], 5));
        ptlist.push(div([
          [wid * 0.5, 0],
          [bmid, -per]
        ], 5));
      }
      ptlist.push(div([
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
    for (var i = 0; i < ptlist.length; i++) {
      canv += stroke(ptlist[i].map(function(x) {
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
  var deco = function(style, args) {
    var args = args != void 0 ? args : {};
    var pul = args.pul != void 0 ? args.pul : [0, 0];
    var pur = args.pur != void 0 ? args.pur : [0, 100];
    var pdl = args.pdl != void 0 ? args.pdl : [100, 0];
    var pdr = args.pdr != void 0 ? args.pdr : [100, 100];
    var hsp = args.hsp != void 0 ? args.hsp : [1, 3];
    var vsp = args.vsp != void 0 ? args.vsp : [1, 2];
    var plist = [];
    var dl = div([pul, pdl], vsp[1]);
    var dr = div([pur, pdr], vsp[1]);
    var du = div([pul, pur], hsp[1]);
    var dd = div([pdl, pdr], hsp[1]);
    if (style == 1) {
      var mlu = du[hsp[0]];
      var mru = du[du.length - 1 - hsp[0]];
      var mld = dd[hsp[0]];
      var mrd = dd[du.length - 1 - hsp[0]];
      for (var i = vsp[0]; i < dl.length - vsp[0]; i += vsp[0]) {
        var mml = div([mlu, mld], vsp[1])[i];
        var mmr = div([mru, mrd], vsp[1])[i];
        var ml = dl[i];
        var mr = dr[i];
        plist.push(div([mml, ml], 5));
        plist.push(div([mmr, mr], 5));
      }
      plist.push(div([mlu, mld], 5));
      plist.push(div([mru, mrd], 5));
    } else if (style == 2) {
      for (var i = hsp[0]; i < du.length - hsp[0]; i += hsp[0]) {
        var mu = du[i];
        var md = dd[i];
        plist.push(div([mu, md], 5));
      }
    } else if (style == 3) {
      var mlu = du[hsp[0]];
      var mru = du[du.length - 1 - hsp[0]];
      var mld = dd[hsp[0]];
      var mrd = dd[du.length - 1 - hsp[0]];
      for (var i = vsp[0]; i < dl.length - vsp[0]; i += vsp[0]) {
        var mml = div([mlu, mld], vsp[1])[i];
        var mmr = div([mru, mrd], vsp[1])[i];
        var mmu = div([mlu, mru], vsp[1])[i];
        var mmd = div([mld, mrd], vsp[1])[i];
        var ml = dl[i];
        var mr = dr[i];
        plist.push(div([mml, mmr], 5));
        plist.push(div([mmu, mmd], 5));
      }
      plist.push(div([mlu, mld], 5));
      plist.push(div([mru, mrd], 5));
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
      ptlist.push(div([
        [-wid * 0.5, 0],
        [mid, per]
      ], seg));
      ptlist.push(div([
        [mid, per],
        [wid * 0.5, 0]
      ], seg));
    }
    if (tra) {
      ptlist.push(div([
        [-wid * 0.5, 0],
        [bmid, -per]
      ], seg));
      ptlist.push(div([
        [bmid, -per],
        [wid * 0.5, 0]
      ], seg));
    }
    if (fro) {
      ptlist.push(div([
        [-wid * 0.5, -hei],
        [mid, -hei + per]
      ], seg));
      ptlist.push(div([
        [mid, -hei + per],
        [wid * 0.5, -hei]
      ], seg));
    }
    if (tra) {
      ptlist.push(div([
        [-wid * 0.5, -hei],
        [bmid, -hei - per]
      ], seg));
      ptlist.push(div([
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
    for (var i = 0; i < ptlist.length / 2; i++) {
      for (var j = 0; j < ptlist[i].length; j++) {
        ptlist[i][j][1] += (Noise.noise(i, j * 0.5, seed) - 0.5) * hei;
        ptlist[(ptlist.length / 2 + i) % ptlist.length][j % ptlist[(ptlist.length / 2 + i) % ptlist.length].length][1] += (Noise.noise(i + 0.5, j * 0.5, seed) - 0.5) * hei;
        var ln = div([
          ptlist[i][j],
          ptlist[(ptlist.length / 2 + i) % ptlist.length][j % ptlist[(ptlist.length / 2 + i) % ptlist.length].length]
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
    for (var i = 0; i < ptlist.length; i++) {
      canv += stroke(ptlist[i].map(function(x) {
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
        return flip(ptlist2);
      } else {
        return ptlist2;
      }
    };
    var rrot = rot < 0.5 ? 1 - rot : rot;
    var mid = -wid * 0.5 + wid * rrot;
    var quat = (mid + wid * 0.5) * 0.5 - mid;
    var ptlist = [];
    ptlist.push(div(opf([
      [-wid * 0.5 + quat, -hei - per / 2],
      [-wid * 0.5 + quat * 0.5, -hei / 2 - per / 4],
      [-wid * 0.5 - cor, 0]
    ]), 5));
    ptlist.push(div(opf([
      [mid + quat, -hei],
      [(mid + quat + wid * 0.5) / 2, -hei / 2],
      [wid * 0.5 + cor, 0]
    ]), 5));
    ptlist.push(div(opf([
      [mid + quat, -hei],
      [mid + quat / 2, -hei / 2 + per / 2],
      [mid + cor, per]
    ]), 5));
    ptlist.push(div(opf([
      [-wid * 0.5 - cor, 0],
      [mid + cor, per]
    ]), 5));
    ptlist.push(div(opf([
      [wid * 0.5 + cor, 0],
      [mid + cor, per]
    ]), 5));
    ptlist.push(div(opf([
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
    for (var i = 0; i < ptlist.length; i++) {
      canv += stroke(ptlist[i].map(function(x) {
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
    for (var i = 0; i < sid; i++) {
      var fx = wid * (i * 1 / (sid - 1) - 0.5);
      var fy = per * (1 - Math.abs(i * 1 / (sid - 1) - 0.5) * 2);
      var fxx = (wid + cor) * (i * 1 / (sid - 1) - 0.5);
      if (i > 0) {
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
    for (var i = 0; i < ptlist.length; i++) {
      canv += stroke(div(ptlist[i], 5).map(function(x) {
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
    for (var i = 0; i < sto; i++) {
      canv += box(xoff, yoff - hoff, {
        tra: false,
        hei,
        wid: wid * Math.pow(0.85, i),
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
      canv += rai ? rail(xoff, yoff - hoff, i * 0.2, {
        wid: wid * Math.pow(0.85, i) * 1.1,
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
        wid: wid * Math.pow(0.9, i),
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
    for (var i = 0; i < sto; i++) {
      canv += box(xoff, yoff - hoff, {
        tra: false,
        hei,
        wid: wid * Math.pow(0.85, i),
        rot,
        wei: 1.5,
        per: per / 2,
        dec: function(a2) {
          return deco(1, Object.assign({}, a2, { hsp: [1, 4], vsp: [1, 2] }));
        }
      });
      canv += rail(xoff, yoff - hoff, i * 0.2, {
        seg: 5,
        wid: wid * Math.pow(0.85, i) * 1.1,
        hei: hei / 2,
        per: per / 2,
        rot,
        wei: 0.5,
        tra: false
      });
      canv += pagroof(xoff, yoff - hoff - hei, {
        hei: hei * 1.5,
        wid: wid * Math.pow(0.9, i),
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
    for (var i = 0; i < sto; i++) {
      canv += box(xoff, yoff - hoff, {
        tra: true,
        hei,
        wid: wid * Math.pow(0.85, i),
        rot,
        wei: 1.5,
        per: per / 2,
        dec: function(a2) {
          return [];
        }
      });
      canv += rail(xoff, yoff - hoff, i * 0.2, {
        seg: 3,
        wid: wid * Math.pow(0.85, i) * 1.2,
        hei: hei / 3,
        per: per / 2,
        rot,
        wei: 0.5,
        tra: true
      });
      canv += pagroof(xoff, yoff - hoff - hei, {
        hei: hei * 1,
        wid: wid * Math.pow(0.9, i),
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
    for (var i = 0; i < len * sca; i += 5 * sca) {
      plist1.push([i * dir, fun1(i / len)]);
      plist2.push([i * dir, fun2(i / len)]);
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
      return stroke(div(pl, 5).map(toGlobal), {
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
    for (var i = 0; i < bch.length; i++) {
      canv += quickstroke([
        [-bch[i][0] * wid, bch[i][1] * hei],
        [bch[i][0] * wid, bch[i][1] * hei]
      ]);
      canv += quickstroke([
        [-bch[i][0] * wid, bch[i][1] * hei],
        [0, (bch[i][1] - 0.05) * hei]
      ]);
      canv += quickstroke([
        [bch[i][0] * wid, bch[i][1] * hei],
        [0, (bch[i][1] - 0.05) * hei]
      ]);
      canv += quickstroke([
        [-bch[i][0] * wid, bch[i][1] * hei],
        [-bch[i][0] * wid, (bch[i][1] + 0.1) * hei]
      ]);
      canv += quickstroke([
        [bch[i][0] * wid, bch[i][1] * hei],
        [bch[i][0] * wid, (bch[i][1] + 0.1) * hei]
      ]);
    }
    var l10 = div([p00, p10, p20, p30], 5);
    var l11 = div([p01, p11, p21, p31], 5);
    for (var i = 0; i < l10.length - 1; i++) {
      canv += quickstroke([l10[i], l11[i + 1]]);
      canv += quickstroke([l11[i], l10[i + 1]]);
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
    for (var i = 1; i < ptlist.length - 1; i++) {
      var w = wfun(i / ptlist.length);
      var a1 = Math.atan2(ptlist[i][1] - ptlist[i - 1][1], ptlist[i][0] - ptlist[i - 1][0]);
      var a2 = Math.atan2(ptlist[i][1] - ptlist[i + 1][1], ptlist[i][0] - ptlist[i + 1][0]);
      var a3 = (a1 + a2) / 2;
      if (a3 < a2) {
        a3 += Math.PI;
      }
      vtxlist0.push([ptlist[i][0] + w * Math.cos(a3), ptlist[i][1] + w * Math.sin(a3)]);
      vtxlist1.push([ptlist[i][0] - w * Math.cos(a3), ptlist[i][1] - w * Math.sin(a3)]);
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
    for (var i = 0; i < 10; i++) {
      qlist1.push([-0.3 - Noise.noise(i * 0.2, seed) * i * 0.1, 0.5 - i * 0.3]);
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
    for (var i = 0; i < l; i++) {
      qlist1.push([
        -Noise.noise(i * 0.1, seed) * 0.1 * Math.sin(i / l * Math.PI) * 5,
        0 + i * 0.3
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
      var keys = Object.keys(sct2);
      for (var i2 = 0; i2 < keys.length; i2++) {
        if (keys[i2] == ind) {
          return [ind];
        } else {
          var r = gpar(sct2[keys[i2]], ind);
          if (r != false) {
            return [parseFloat(keys[i2])].concat(r);
          }
        }
      }
      return false;
    }
    function grot(sct2, ind) {
      var par2 = gpar(sct2, ind);
      var rot = 0;
      for (var i2 = 0; i2 < par2.length; i2++) {
        rot += ang[par2[i2]];
      }
      return rot;
    }
    function gpos(sct2, ind) {
      var par2 = gpar(sct2, ind);
      var pos = [0, 0];
      for (var i2 = 0; i2 < par2.length; i2++) {
        var a2 = grot(sct2, par2[i2]);
        pos[0] += len[par2[i2]] * Math.cos(a2);
        pos[1] += len[par2[i2]] * Math.sin(a2);
      }
      return pos;
    }
    var pts = [];
    for (var i = 0; i < ang.length; i++) {
      pts.push(gpos(sct, i));
    }
    yoff -= pts[4][1];
    for (var i = 1; i < pts.length; i++) {
      var par = gpar(sct, i);
      var p0 = gpos(sct, par[par.length - 2]);
      div([p0, pts[i]], 10);
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
  for (var i = 0; i < clu; i++) {
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
    for (var i2 = x - r2; i2 < x + r2; i2++) {
      for (var j2 = y - r2; j2 < y + r2; j2++) {
        if (f(i2, j2) > z0) {
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
  for (var i = xmin; i < xmax; i += xstep) {
    var i1 = Math.floor(i / xstep);
    MEM.planmtx[i1] = MEM.planmtx[i1] || 0;
  }
  for (var i = xmin; i < xmax; i += xstep) {
    for (var j = 0; j < yr(i) * 480; j += 30) {
      if (locmax(i, j, ns, 2)) {
        var xof = i + 2 * (Math.random() - 0.5) * 500;
        var yof = j + 300;
        var r = { tag: "mount", x: xof, y: yof, h: ns(i) };
        var res = chadd(r);
        if (res) {
          for (var k = Math.floor((xof - mwid) / xstep); k < (xof + mwid) / xstep; k++) {
            MEM.planmtx[k] += 1;
          }
        }
      }
    }
    if (Math.abs(i) % 1e3 < Math.max(1, xstep - 1)) {
      var r = {
        tag: "distmount",
        x: i,
        y: 280 - Math.random() * 50,
        h: ns(i)
      };
      chadd(r);
    }
  }
  console.log([xmin, xmax]);
  for (var i = xmin; i < xmax; i += xstep) {
    if (MEM.planmtx[Math.floor(i / xstep)] == 0) {
      if (Math.random() < 0.01) {
        for (var j = 0; j < 4 * Math.random(); j++) {
          var r = {
            tag: "flatmount",
            x: i + 2 * (Math.random() - 0.5) * 700,
            y: 700 - j * 50,
            h: ns(i)
          };
          chadd(r);
        }
      }
    }
  }
  for (var i = xmin; i < xmax; i += xstep) {
    if (Math.random() < 0.2) {
      var r = { tag: "boat", x: i, y: 300 + Math.random() * 390 };
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
  var add2 = function(nch) {
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
    for (var i = 0; i < plan.length; i++) {
      if (plan[i].tag == "mount") {
        add2({
          tag: plan[i].tag,
          x: plan[i].x,
          y: plan[i].y,
          canv: Mount.mountain(plan[i].x, plan[i].y, i * 2 * Math.random())
        });
        add2({
          tag: plan[i].tag,
          x: plan[i].x,
          y: plan[i].y - 1e4,
          canv: water(plan[i].x, plan[i].y)
        });
      } else if (plan[i].tag == "flatmount") {
        add2({
          tag: plan[i].tag,
          x: plan[i].x,
          y: plan[i].y,
          canv: Mount.flatMount(plan[i].x, plan[i].y, 2 * Math.random() * Math.PI, {
            wid: 600 + Math.random() * 400,
            hei: 100,
            cho: 0.5 + Math.random() * 0.2
          })
        });
      } else if (plan[i].tag == "distmount") {
        add2({
          tag: plan[i].tag,
          x: plan[i].x,
          y: plan[i].y,
          canv: Mount.distMount(plan[i].x, plan[i].y, Math.random() * 100, {
            hei: 150,
            len: randChoice([500, 1e3, 1500])
          })
        });
      } else if (plan[i].tag == "boat") {
        add2({
          tag: plan[i].tag,
          x: plan[i].x,
          y: plan[i].y,
          canv: Arch.boat01(plan[i].x, plan[i].y, Math.random(), {
            sca: plan[i].y / 800,
            fli: randChoice([true, false])
          })
        });
      } else if (plan[i].tag == "redcirc") {
        add2({
          tag: plan[i].tag,
          x: plan[i].x,
          y: plan[i].y,
          canv: "<circle cx='" + plan[i].x + "' cy='" + plan[i].y + "' r='20' stroke='black' fill='red' />"
        });
      } else if (plan[i].tag == "greencirc") {
        add2({
          tag: plan[i].tag,
          x: plan[i].x,
          y: plan[i].y,
          canv: "<circle cx='" + plan[i].x + "' cy='" + plan[i].y + "' r='20' stroke='black' fill='green' />"
        });
      }
    }
  }
}
function chunkrender(xmin, xmax) {
  MEM.canv = "";
  for (var i = 0; i < MEM.chunks.length; i++) {
    if (xmin - MEM.cwid < MEM.chunks[i].x && MEM.chunks[i].x < xmax + MEM.cwid) {
      MEM.canv += MEM.chunks[i].canv;
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
  var step = 1;
  document.body.scrollTo(Math.max(0, pFrame - 10), window.scrollY);
  pFrame += step;
  if (pFrame < 20 || Math.abs(lastScrollX - currScrollX) < step * 2) {
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
  for (var i = 0; i < reso / 2 + 1; i++) {
    for (var j = 0; j < reso / 2 + 1; j++) {
      var c = 245 + Noise.noise(i * 0.1, j * 0.1) * 10;
      c -= Math.random() * 20;
      var r = c.toFixed(0);
      var g = (c * 0.95).toFixed(0);
      var b = (c * 0.85).toFixed(0);
      ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
      ctx.fillRect(i, j, 1, 1);
      ctx.fillRect(reso - i, j, 1, 1);
      ctx.fillRect(i, reso - j, 1, 1);
      ctx.fillRect(reso - i, reso - j, 1, 1);
    }
  }
  var img = canvas.toDataURL("image/png");
  document.getElementById("BG").style.backgroundImage = "url(" + img + ")";
  document.getElementsByTagName("body")[0].style.backgroundImage = "url(" + img + ")";
}, 1);
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
  return openBlock(), createElementBlock(Fragment, null, [
    _hoisted_1$2,
    _hoisted_2$2
  ], 64);
}
var shanshui = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1]]);
const _sfc_main$1 = {
  data() {
    return {};
  }
};
const _hoisted_1$1 = /* @__PURE__ */ createBaseVNode("div", { id: "input_area" }, [
  /* @__PURE__ */ createBaseVNode("div", null, "Title"),
  /* @__PURE__ */ createBaseVNode("div", { id: "milkdown_area_input" })
], -1);
const _hoisted_2$1 = /* @__PURE__ */ createBaseVNode("div", { id: "output_area" }, [
  /* @__PURE__ */ createBaseVNode("div", null, "Title"),
  /* @__PURE__ */ createBaseVNode("div", { id: "milkdown_area_output" })
], -1);
const _hoisted_3$1 = [
  _hoisted_1$1,
  _hoisted_2$1
];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", null, _hoisted_3$1);
}
var interactive = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render]]);
var global$1 = "";
var App_vue_vue_type_style_index_0_lang = "";
const _hoisted_1 = {
  id: "page",
  class: "flexv center fadein"
};
const _hoisted_2 = { class: "fullpage center flexv" };
const _hoisted_3 = /* @__PURE__ */ createBaseVNode("img", {
  id: "logo",
  alt: "logo",
  src: _imports_0
}, null, -1);
const _sfc_main = {
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createVNode(shanshui),
        createBaseVNode("div", _hoisted_2, [
          _hoisted_3,
          createVNode(_sfc_main$3, { msg: "" })
        ]),
        createVNode(interactive)
      ]);
    };
  }
};
let a = createApp(_sfc_main);
a.mount("#main");
