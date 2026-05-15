import { O } from 'trans-render/froop/O.js';
import { getNextValOfLoop } from 'trans-render/positractions/getNextValOfLoop.js';
import { dispatchEvent } from 'trans-render/positractions/dispatchEvent.js';
export class TimeTicker extends O {
    static config = {
        propDefaults: {
            ticks: 0,
            idx: -1,
            duration: 1_000,
            enabled: true,
            loop: false,
            wait: true,
        },
        propInfo: {
            enabled: {
                dry: false,
                parse: true,
                type: 'Boolean',
            },
            disabled: {
                type: 'Boolean',
            },
            item: {
                type: 'Object',
                ro: true,
            },
            items: {
                type: 'Object',
                parse: true,
                attrName: 'items'
            },
            loop: {
                type: 'Boolean',
                parse: true,
                attrName: 'loop'
            },
            repeat: {
                type: 'Number',
                parse: true,
                attrName: 'repeat',
            },
            ticks: {
                ro: true,
            },
            timeEmitterAC: {
                ro: true,
            },
            timeEmitter: {
                ro: true,
            },
            wait: {
                type: 'Boolean',
                parse: true,
                attrName: 'wait'
            }
        },
        actions: {
            start: {
                ifAllOf: ['duration'],
                ifNoneOf: ['disabled']
            },
            rotateItem: {
                ifKeyIn: ['repeat', 'loop', 'idx'],
                ifAllOf: ['items'],
                ifNoneOf: ['disabled']
            },
            stop: {
                ifAllOf: ['disabled', 'timeEmitterAC']
            }
        },
        compacts: {
            negate_enabled_to_disabled: 0,
            pass_length_of_items_to_repeat: 999_999_999
            //enabled_to_disabled: 'negate'
            //when_disabled_changes_inc_disabled_by: 10
        },
        handlers: {
            timeEmitter_to_incTicks_on: 'value-changed'
        },
        positractions: [
            {
                do: 'getNextValOfLoop',
                ifAllOf: ['ticks'],
                pass: ['idx', 0, 'repeat', 1, true],
                assignTo: ['idx'],
            },
            {
                do: 'de',
                ifKeyIn: ['idx'],
                pass: ['$0', '`value-changed`']
            }
        ]
    };
    de = dispatchEvent;
    getNextValOfLoop = getNextValOfLoop;
    async start(self) {
        const { timeEmitterAC: oldController, ticks: oldTicks, duration } = self;
        let ticks = oldTicks;
        if (oldController !== undefined) {
            ticks = 0;
            oldController.abort();
        }
        const timeEmitterAC = new AbortController();
        const { TimeEmitter } = await import('./TimeEmitter.js');
        const timeEmitter = new TimeEmitter(duration, timeEmitterAC.signal);
        return {
            timeEmitterAC,
            ticks,
            timeEmitter
        };
    }
    incTicks(self) {
        const { ticks: oldTicks } = self;
        return {
            ticks: oldTicks + 1
        };
    }
    stop(self) {
        const { timeEmitterAC: oldController } = self;
        oldController.abort();
        return {
            timeEmitterAC: undefined
        };
    }
    rotateItem(self) {
        const { idx, items } = self;
        return {
            item: (items && items.length > idx && idx > -1) ? items[idx] : undefined,
        };
    }
}
