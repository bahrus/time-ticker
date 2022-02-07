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

    onDisabled({controller}: this) {
        controller.abort();
        return {
            controller: undefined,
        }
    }

    onItems({items}: this){
        return {
            repeat: items.length,
        }
    }

    onTicks({idx, repeat, loop, items}: this){
        if(idx >= repeat - 1){
            if(loop){
                idx = -1;
            }else{
                return {
                    disabled: true,
                }
            }
        }
        idx++;
        return {
            idx,
            value: {
                idx,
                item: (items && items.length > idx) ? items[idx] : undefined,
            }
        }
    }
}

export interface TimeTicker extends TimeTickerProps{}

const xe = new XE<TimeTickerProps, TimeTickerActions>({
    config:{
        tagName: 'time-ticker',
        propDefaults: {
            ticks: 0,
            idx: -1,
            duration: 1_000,
            repeat: Infinity,
            enabled: true,
            disabled: false,
            loop: false,
        },
        propInfo:{
            enabled:{
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
            onDisabled:{
                ifAllOf: ['disabled', 'controller']
            },
            onItems:'items',
            start:{
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

