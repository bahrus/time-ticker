import {TimeTickerProps, TimeTickerActions} from './types';
import {XE} from 'xtal-element/src/XE.js';
import {animationInterval} from './animationInterval.js';

export class TimeTicker extends HTMLElement implements TimeTickerActions{


    start({duration}: this) {
        const controller = new AbortController();
        animationInterval(duration, controller.signal, time => {
            this.ticks++;
        });
        return {
            controller,
            ticks: this.ticks++,
        }
    }

    onDisabled({}: this) {
        return {
            controller: undefined,
        }
    }

    onItems({items}: this){
        return {
            repeat: items.length,
        }
    }

    onTicks({idx, repeat, loop, wait}: this){
        let newIdx = idx;
        if(newIdx >= repeat - 1){
            if(loop){
                newIdx = -1;
            }else{
                return {
                    disabled: true,
                }
            }
        }
        return {
            idx: newIdx + 1,
            disabled: wait,
        }
    }
}

export interface TimeTicker extends TimeTickerProps{}

const xe = new XE<TimeTickerProps, TimeTickerActions>({
    config:{
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

