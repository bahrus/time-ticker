import {O, OConfig} from 'trans-render/froop/O.js';
import {Actions, AllProps, EventTargetProps, PAP} from './types';
import {getNextValOfLoop} from 'trans-render/positractions/getNextValOfLoop.js';
import {dispatchEvent} from 'trans-render/positractions/dispatchEvent.js';

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
            item:{
                type: 'Object',
                ro: true,
            },
            items: {
                type: 'Object',
                parse: true,
                attrName: 'items'
            },
            loop:{
                type: 'Boolean',
                parse: true,
                attrName: 'loop'
            },
            repeat:{
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
            timeEmitter:  {
                ro: true,
            }
        },
        actions:{
            start:{
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
        
    }

    getNextValOfLoop = getNextValOfLoop;

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
        ''console.log({oldTicks});
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
        console.log({idx, items});
        return {
            item: (items && items.length > idx && idx > -1) ? items[idx] : undefined,
        }
    }

}

export interface TimeTicker extends AllProps{}