import { XtallatX, disabled } from 'xtal-latx/xtal-latx.js';
import { define } from 'xtal-latx/define.js';
const items = 'items';
const duration = 'duration';
const repeat = 'repeat';
const loop = 'loop';
const wait = 'wait';
//const loop = 'loop';
export class TimeTicker extends XtallatX(HTMLElement) {
    constructor() {
        super(...arguments);
        this._idx = -1;
        this._duration = 1000;
        this._repeat = Infinity;
        this._t = [];
    }
    /**
     * Current pointer
     */
    get idx() {
        return this._idx;
    }
    set idx(nv) {
        this._idx = nv;
        this.attr('tick', nv.toString());
        this.value = {
            idx: nv,
            item: (this._items && this._items.length > nv) ? this._items[nv] : null,
            time: new Date(),
        };
        this.de('tick', this.value, true);
        if (this._wait) {
            this.disabled = true;
        }
        this.onPropsChange();
    }
    /**
     * Remove disabled
     */
    set enabled(nv) {
        if (nv)
            this.disabled = false;
    }
    static get properties() {
        return [disabled, items, duration, repeat, loop, wait];
    }
    static get is() { return 'time-ticker'; }
    connectedCallback() {
        this.style.display = 'none';
        super._upgradeProperties(TimeTicker.properties);
        this._conn = true;
        this.onPropsChange();
    }
    static get observedAttributes() {
        return TimeTicker.properties;
    }
    /**
     * Items to rotate through.
     * Sets repeat to length
     */
    get items() {
        return this._items;
    }
    set items(v) {
        this._items = v;
        if (v)
            this.repeat = v.length;
    }
    /**
     * Number of millisecods to wait
     */
    get duration() {
        return this._duration;
    }
    set duration(nv) {
        this.attr(duration, nv.toString());
    }
    /**
     * Number of times to repeat before setting counter back to 0
     * Setting Items will set this automatically
     */
    get repeat() {
        return this._repeat;
    }
    set repeat(nv) {
        this.attr(repeat, nv.toString());
    }
    /**
     * Indicates whether should cycle or stop
     */
    get loop() {
        return this._loop;
    }
    set loop(nv) {
        this.attr(loop, nv, '');
    }
    /**
     * Disable after every tick
     */
    get wait() {
        return this._wait;
    }
    set wait(nv) {
        this.attr(wait, nv, '');
    }
    attributeChangedCallback(n, ov, nv) {
        switch (n) {
            case disabled:
                this._disabled = nv !== null;
                break;
            case items:
                this._items = JSON.parse(nv);
                break;
            case duration:
                this._duration = parseInt(nv);
                break;
            case repeat:
                this._repeat = parseInt(nv);
                break;
            case loop:
            case wait:
                this['_' + n] = nv !== null;
                break;
        }
        this.onPropsChange();
    }
    onPropsChange() {
        if (this._disabled || !this._conn)
            return;
        if (this._idx === -1) {
            this.idx++;
            return;
        }
        if (this._idx >= this._repeat - 1) {
            if (this.loop) {
                this._idx = -1;
            }
            else {
                this.disabled = true;
                return;
            }
        }
        while (this._t.length > 0) {
            const t = this._t.pop();
            clearTimeout(t);
        }
        this._t.push(setTimeout(() => {
            this.idx++;
        }, this._duration));
    }
}
define(TimeTicker);
//# sourceMappingURL=time-ticker.js.map