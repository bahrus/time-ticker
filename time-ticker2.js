import { XE } from 'xtal-element/src/XE.js';
import { animationInterval } from './animationInterval.js';
export class TimeTicker extends HTMLElement {
    start({ duration }) {
        const controller = new AbortController();
        animationInterval(duration, controller.signal, time => {
            this.ticks++;
        });
        return {
            controller,
            ticks: this.ticks++,
        };
    }
    onDisabled({}) {
        return {
            controller: undefined,
        };
    }
    onItems({ items }) {
        return {
            repeat: items.length,
        };
    }
    onTicks({ idx, repeat, loop, wait, items }) {
        if (idx >= repeat - 1) {
            if (loop) {
                idx = -1;
            }
            else {
                return {
                    disabled: true,
                };
            }
        }
        idx++;
        return {
            idx,
            disabled: wait,
            value: {
                idx,
                item: (items && items.length > idx) ? items[idx] : undefined,
            }
        };
    }
}
const xe = new XE({
    config: {
        tagName: 'time-ticker',
        propDefaults: {
            wait: false,
            ticks: 0,
            idx: -1,
            duration: 1_000,
            repeat: Infinity,
            enabled: true,
            disabled: false,
            loop: false,
        },
        propInfo: {
            enabled: {
                dry: false,
                notify: {
                    toggleTo: 'disabled',
                }
            },
            value: {
                notify: {
                    dispatch: true,
                },
                parse: false,
            },
        },
        style: {
            display: 'none',
        },
        actions: {
            onDisabled: 'disabled',
            onItems: {
                ifAllOf: ['items']
            },
            start: {
                ifAllOf: ['duration'],
                ifNoneOf: ['disabled'],
            },
            onTicks: {
                ifAllOf: ['ticks'],
                ifKeyIn: ['repeat', 'loop', 'items'],
                ifNoneOf: ['disabled'],
            }
        }
    },
    superclass: TimeTicker,
});
