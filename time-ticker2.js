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
    onTicks({ idx, repeat, loop, wait }) {
        let newIdx = idx;
        if (newIdx >= repeat - 1) {
            if (loop) {
                newIdx = -1;
            }
            else {
                return {
                    disabled: true,
                };
            }
        }
        return {
            idx: newIdx + 1,
            disabled: wait,
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
        }
    }
});
