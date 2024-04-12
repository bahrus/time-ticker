import { O } from 'trans-render/froop/O.js';
import { getNextValOfLoop } from 'trans-render/positractions/getNextValOfLoop.js';
export class TimeTicker extends O {
    static config = {
        name: 'time-ticker',
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
            enabled_to_disabled: 'negate'
        },
        handlers: {
            timeEmitter_to_incTicks_on: 'value-changed'
        },
        positractions: [
            {
                do: 'getNextValOfLoop',
                on: ['ticks'],
                pass: ['idx', 0, 'repeat', 1, true],
                assignTo: ['idx']
            },
            // {
            //     do: dispatchEvent,
            //     on: ['idx'],
            //     pass: ['$0', '`value-changed`']
            // }
        ]
    };
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
        '';
        console.log({ oldTicks });
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
        console.log({ idx, items });
        return {
            item: (items && items.length > idx && idx > -1) ? items[idx] : undefined,
        };
    }
}
