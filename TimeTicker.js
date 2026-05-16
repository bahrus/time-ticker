// @ts-check
/** @import {FeatureProps, FeatureSpawnContext} from './types/time-ticker/types' */

/**
 * A custom element feature that provides precise, drift-correcting ticking.
 * Based on Jake Archibald's gist: https://gist.github.com/jakearchibald/cb03f15670817001b1157e62a076fe95
 * 
 * Emits a "tick" event at each duration.
 * 
 * @implements {FeatureProps}
 */
class TimeTicker extends EventTarget {
    /** @type {WeakRef<Element> | undefined} */
    #host;

    /** @type {AbortController | undefined} */
    #controller;

    /** @type {number} */
    #duration = 1000;

    /** @type {boolean} */
    #disabled = false;

    /**
     * @param {Element} hostElement
     * @param {FeatureSpawnContext} ctx
     * @param {Partial<FeatureProps>} [initVals]
     */
    constructor(hostElement, ctx, initVals) {
        super();
        this.#host = new WeakRef(hostElement);
        if (initVals) {
            if (initVals.duration !== undefined) this.#duration = initVals.duration;
            if (initVals.disabled !== undefined) this.#disabled = initVals.disabled;
        }
        if (!this.#disabled) {
            this.#start();
        }
    }

    get duration() {
        return this.#duration;
    }

    set duration(val) {
        this.#duration = val;
        // Restart with new duration if currently running
        if (!this.#disabled) {
            this.#stop();
            this.#start();
        }
    }

    get disabled() {
        return this.#disabled;
    }

    set disabled(val) {
        const wasDisabled = this.#disabled;
        this.#disabled = val;
        if (val && !wasDisabled) {
            this.#stop();
        } else if (!val && wasDisabled) {
            this.#start();
        }
    }

    #start() {
        this.#controller = new AbortController();
        const signal = this.#controller.signal;
        const ms = this.#duration;
        const start = document.timeline
            ? /** @type {number} */ (document.timeline.currentTime)
            : performance.now();

        const frame = (/** @type {number} */ time) => {
            if (signal.aborted) return;
            this.dispatchEvent(new Event('tick'));
            scheduleFrame(time);
        };

        const scheduleFrame = (/** @type {number} */ time) => {
            const elapsed = time - start;
            const roundedElapsed = Math.round(elapsed / ms) * ms;
            const targetNext = start + roundedElapsed + ms;
            const delay = targetNext - performance.now();
            setTimeout(() => requestAnimationFrame(frame), delay);
        };

        scheduleFrame(start);
    }

    #stop() {
        if (this.#controller) {
            this.#controller.abort();
            this.#controller = undefined;
        }
    }

    /**
     * Clean up resources when the feature is disposed.
     */
    dispose() {
        this.#stop();
        this.#host = undefined;
    }
}

export { TimeTicker };
