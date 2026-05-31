# time-ticker

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/time-ticker)

<a href="https://nodei.co/npm/time-ticker/"><img src="https://nodei.co/npm/time-ticker.png"></a>

![](https://media.giphy.com/media/Hlb53yZwhKobm/giphy.gif)

This package contains two exported modules:

1.  A light-weight, reusable, TimeTicker [custom element feature](https://github.com/bahrus/assign-gingerly#custom-element-features).  It provides a precise atomic clock-like class that emits events on each tick. The logic for implementing the precise ticking is based on this [gist](https://gist.github.com/jakearchibald/cb03f15670817001b1157e62a076fe95) explained [here](https://youtu.be/MCi6AZMkxcU).  It's been a while, and maybe the platform provides more official support for implementing precise tickers, but for now we assume not.  

<details>
    <summary>AI weighs in</summary>

Good question. The project references Jake Archibald's gist/video about precise timing. Let me look into what the web platform offers now.

Based on my research, here's the short answer: **No, the web platform still does not provide a built-in precise repeating timer API.** Your assumption in the README remains correct.

Here's what exists and why none of them solve the problem:

1. **`setInterval`** — Still drifts. The [WHATWG issue #3151](https://github.com/whatwg/html/issues/3151) asking whether `setInterval` should account for execution delays to prevent drift is still open and unresolved.

2. **`requestAnimationFrame`** — Synced to display refresh rate (~16ms), pauses when the tab is backgrounded, and isn't designed for arbitrary-interval ticking.

3. **`Scheduler.postTask()`** — The newer [Prioritized Task Scheduling API](https://wicg.github.io/scheduling-apis/) lets you set a priority and a one-shot delay, but it's not a repeating timer. It's about task prioritization, not precise periodic execution.

4. **`scheduler.yield()`** — Yields to the main thread for responsiveness; not a timing mechanism at all.

5. **Web Workers + `setInterval`** — Avoids throttling in background tabs but doesn't fix the fundamental drift issue.

The self-correcting `setTimeout` pattern (what Jake Archibald's gist demonstrates — measuring elapsed time via `performance.now()` and adjusting the next timeout to compensate for drift) is still the accepted best practice for precise ticking in browsers. No native API has replaced it.

So your statement is still accurate. If you wanted to soften it slightly, you could say something like: "As of 2026, the platform still provides no built-in drift-correcting repeating timer."

</details>

2.  A feature rich non visual custom element time-ticker custom element (time-ticker is the canonical name), that supports rotating through items of a list.

time-ticker uses JSON modules, which is now considered baseline in all the major browsers.

## The TimeTicker Custom Element Feature

The TimeTicker custom element feature supports two properties:

1.  duration (in milliseconds)
2.  disabled (boolean)

It emits an event with name "tick".

## The time-ticker custom element

The custom element adds an additional property:

3.  "Items" that need rotating.

To use, import time-ticker/def.js.

**For a different tag name:**
```javascript
// my-ticker-def.js
import { TimeTickerElement } from 'time-ticker/time-ticker-element.js';
import { wireFeatures } from 'time-ticker/wireFeatures.js';
import defRef from 'time-ticker/defRef.json' with { type: 'json' };

await wireFeatures(TimeTickerElement, defRef);
customElements.define('my-ticker', TimeTickerElement);
```

**For a scoped registry:**
```javascript
import { TimeTickerElement } from 'time-ticker/time-ticker-element.js';
import { wireFeatures } from 'time-ticker/wireFeatures.js';
import defRef from 'time-ticker/defRef.json' with { type: 'json' };

await wireFeatures(TimeTickerElement, defRef);
scopedRegistry.define('time-ticker', TimeTickerElement);
```

**For DI / testing:**
```javascript
import { TimeTickerElement } from 'time-ticker/time-ticker-element.js';
import { resolveAndAssignFeatures } from 'assign-gingerly/resolveAndAssignFeatures.js';
import { MockTimeTicker } from './mocks.js';
import defRef from 'time-ticker/defRef.json' with { type: 'json' };

const { roundabout } = defRef.features;

await resolveAndAssignFeatures(TimeTickerElement, {
    timeTicker: { spawn: MockTimeTicker },
    truthSourcer: {
        callbackForwarding: ['connectedCallback', 'attributeChangedCallback'],
    },
    faceUp: {
        customData: { integrateWithRoundabout: true },
        callbackForwarding: [
            'connectedCallback', 'disconnectedCallback',
            'formDisabledCallback', 'formResetCallback', 'formStateRestoreCallback',
        ],
    },
    roundabout: {
        customData: roundabout.customData,
        withAttrs: roundabout.withAttrs,
        callbackForwarding: ['connectedCallback'],
    },
});
customElements.define('time-ticker', TimeTickerElement);
```

## Viewing Demos Locally

1. Install git
2. Fork/clone this repo
3. Install node.js
4. Open command window to folder where you cloned this repo
5. > git submodule add https://github.com/bahrus/types.git types
6. > git submodule update --init --recursive
7. > npm install
8. > npm run serve
9. Open http://localhost:8000/ in a modern browser

## Running Tests

```
> npm run test
```

## Using from ESM Module:

```JavaScript
import 'time-ticker/def.js';
```

## Using from CDN:

```html
<script type=module crossorigin=anonymous>
    import 'https://esm.sh/time-ticker/def.js';
</script>
```

