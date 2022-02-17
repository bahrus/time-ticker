import { XE } from 'xtal-element/src/XE.js';
export class TimeTicker extends HTMLElement {
    async start({ duration, ticks, wait }) {
        const controller = new AbortController();
        const { animationInterval } = await import('./animationInterval.js');
        animationInterval(duration, controller.signal, time => {
            this.ticks++;
            this.wait;
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
    rotateItems({ items }) {
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
    config: () => import('./tt-config.json', { assert: { type: 'json' } }),
    superclass: TimeTicker,
});
