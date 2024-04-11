import {O, OConfig} from 'trans-render/froop/O.js';
import {Actions, AllProps, EventTargetProps, PAP} from './types';

export class TimeTicker extends O implements Actions{
    static override config: OConfig<AllProps, Actions, EventTargetProps> = {
        name: 'time-ticker',
        propDefaults:{
            ticks: 0,
            idx: -1,
            duration: 1_000,
            enabled: true,
            loop: false,
            wait: true,
        },
        propInfo:{
            enabled:{
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
        }
        
    }

    async start(self: this){
        const {timeEmitterAC: oldController, ticks: oldTicks, duration} = self;
        let ticks = oldTicks;
        if(oldController !== undefined){
            ticks = 0;
            oldController.abort();
        }
        const timeEmitterAC = new AbortController();
        const {TimeEmitter} = await import('./TimeEmitter.js');
        const timeEmitter = new TimeEmitter(duration, timeEmitterAC.signal);
        return {
            timeEmitterAC,
            ticks,
            timeEmitter
        } as PAP;
    }

    incTicks(self: this){
        const {ticks: oldTicks} = self
        return {
            ticks: oldTicks + 1
        } as PAP;
    }

    stop(self: this){
        const {timeEmitterAC: oldController} = self;
        oldController!.abort();
        return {
            timeEmitterAC: undefined
        } as PAP;
    }

    rotateItem(self: this){
        const {idx, items} = self;
        return {
            item: (items && items.length > idx && idx > -1) ? items[idx] : undefined,
        }
    }

}

export interface TimeTicker extends AllProps{}