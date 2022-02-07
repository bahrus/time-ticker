import { XE } from 'xtal-element/src/XE.js';
import { animationInterval } from './animationInterval.js';
export class TimeTicker extends HTMLElement {
    start({ duration, ticks, wait }) {
        const controller = new AbortController();
        animationInterval(duration, controller.signal, time => {
            this.ticks++;
        });
        return {
            controller,
            ticks: wait ? ticks : ticks + 1,
        };
    }
    onDisabled({ controller }) {
        controller.abort();
        return {
            controller: undefined,
        };
    }
    onItems({ items }) {
        return {
            repeat: items.length,
        };
    }
    onTicks({ idx, repeat, loop, items }) {
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
            ticks: 0,
            idx: -1,
            duration: 1_000,
            repeat: Infinity,
            enabled: true,
            disabled: false,
            loop: false,
            wait: false,
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
            onDisabled: {
                ifAllOf: ['disabled', 'controller']
            },
            onItems: 'items',
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
