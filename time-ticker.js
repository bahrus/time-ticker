import { XE } from 'xtal-element/src/XE.js';
import { animationInterval } from './animationInterval.js';
export class TimeTicker extends HTMLElement {
    start({ duration, ticks, wait, controller }) {
        if (controller !== undefined) {
            ticks = 0;
            controller.abort();
        }
        const newController = new AbortController();
        animationInterval(duration, newController.signal, time => {
            this.ticks++;
        });
        return {
            controller: newController,
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
        return {
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
            wait: true,
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
            },
            ticks: {
                notify: {
                    incTo: {
                        key: 'idx',
                        lt: 'repeat',
                        loop: 'loop',
                        notifyWhenMax: {
                            setTo: {
                                key: 'disabled',
                                val: true,
                            },
                        }
                    }
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
                ifKeyIn: ['repeat', 'loop', 'idx'],
                ifNoneOf: ['disabled'],
            }
        }
    },
    superclass: TimeTicker,
});
