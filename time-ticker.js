import { xc } from 'xtal-element/lib/XtalCore.js';
import { animationInterval } from './animationInterval.js';
const onIdxChange = ({ idx, items, self }) => {
    if (idx === undefined)
        return;
    self.value = {
        idx: idx,
        item: (items && items.length > idx) ? items[idx] : null,
        time: new Date(),
    };
    self.dispatchEvent(new CustomEvent('tick', {
        detail: self.value
    }));
    if (self.wait) {
        self.disabled = true;
    }
};
const onEnabled = ({ enabled, self }) => {
    self.disabled = !enabled;
};
const onItems = ({ items, self }) => {
    if (items === undefined)
        return;
    self.repeat = items.length;
};
const onDuration = ({ duration, disabled, self }) => {
    if (duration === undefined)
        return;
    if (disabled) {
        if (self.controller !== undefined) {
            self.controller.abort();
            delete self.controller;
            return;
        }
    }
    if (self.controller)
        return;
    // https://youtu.be/MCi6AZMkxcU?t=719 nope
    // https://youtu.be/MCi6AZMkxcU?t=918 nope
    // https://youtu.be/MCi6AZMkxcU?t=1152 nope
    // https://youtu.be/MCi6AZMkxcU?t=1169 nope
    // https://youtu.be/MCi6AZMkxcU?t=1189 nope
    // https://gist.github.com/jakearchibald/cb03f15670817001b1157e62a076fe95
    self.controller = new AbortController();
    // Create an animation callback every second:
    animationInterval(duration, self.controller.signal, time => {
        console.log('tick!', time);
        let newIdx = self.idx;
        if (newIdx >= self.repeat - 1) {
            if (self.loop) {
                newIdx = -1;
            }
            else {
                self.disabled = true;
                return;
            }
        }
        self.idx = newIdx + 1;
    });
};
const propActions = [onIdxChange, onEnabled, onItems, onDuration];
const obj = {
    type: Object,
    async: true
};
const bool = {
    type: Boolean,
    async: false,
    reflect: true,
};
const num = {
    type: Number,
    async: true,
    reflect: true,
};
const propDefMap = {
    items: obj, value: obj,
    idx: num, duration: num, repeat: num,
    enabled: bool, disabled: bool, loop: bool, wait: bool,
};
/**
 * @element time-ticker
 * @event tick - Dispatched every time timer goes off
 */
export class TimeTicker extends HTMLElement {
    constructor() {
        super(...arguments);
        this.self = this;
        this.propActions = propActions;
        this.reactor = new xc.Rx(this);
        /**
         * Number of times to repeat before setting counter back to 0
         * Setting Items will set this automatically
         */
        this.repeat = Infinity;
    }
    attributeChangedCallback(n, ov, nv) {
        this.disabled = nv !== null;
    }
    connectedCallback() {
        this.style.display = 'none';
        xc.hydrate(this, slicedPropDefs, {
            idx: -1,
            duration: 1000,
            repeat: Infinity,
            enabled: true,
        });
    }
    onPropChange(name, propDef, newVal) {
        this.reactor.addToQueue(propDef, newVal);
    }
}
TimeTicker.is = 'time-ticker';
TimeTicker.observedAttributes = ['disabled'];
const slicedPropDefs = xc.getSlicedPropDefs(propDefMap);
xc.letThereBeProps(TimeTicker, slicedPropDefs.propDefs, 'onPropChange');
xc.define(TimeTicker);
