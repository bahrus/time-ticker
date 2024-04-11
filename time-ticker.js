import { O } from 'trans-render/froop/O.js';
import { getNextValOfLoop } from 'trans-render/positractions/getNextValOfLoop.js';
import { dispatchEvent } from 'trans-render/positractions/dispatchEvent.js';
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
            items: {
                type: 'Object'
            },
            ticks: {
                ro: true,
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
                do: getNextValOfLoop,
                on: ['ticks'],
                pass: ['idx', 0, 'repeat', 1, true],
                assignTo: ['idx']
            },
            {
                do: dispatchEvent,
                on: ['idx'],
                pass: ['$0', '`value-changed`']
            }
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
