import { XE } from 'xtal-element/src/XE.js';
export class TimeTicker extends HTMLElement {
    async start({ duration, ticks, wait }) {
        const controller = new AbortController();
        const { animationInterval } = await import('./animationInterval.js');
        animationInterval(duration, controller.signal, time => {
            this.ticks++;
        });
        return {
            controller,
            ticks: wait ? ticks : ticks + 1,
        };
    }
    stop({ controller }) {
        controller.abort();
        return {
            controller: undefined,
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
            repeat: {
                dry: false,
            },
            value: {
                notify: {
                    dispatch: true,
                },
                parse: false,
            },
            items: {
                notify: {
                    lengthTo: 'repeat'
                }
            }
        },
        style: {
            display: 'none',
        },
        actions: {
            stop: {
                ifAllOf: ['disabled', 'controller']
            },
            start: {
                ifAllOf: ['duration'],
                ifNoneOf: ['disabled'],
            },
            onTicks: {
                ifAllOf: ['ticks'],
                ifKeyIn: ['repeat', 'loop'],
                ifNoneOf: ['disabled'],
            }
        }
    },
    superclass: TimeTicker,
});
