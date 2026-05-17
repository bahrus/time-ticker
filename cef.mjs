//@ts-check

import { roundabout } from 'roundabout-lib';



/** @import {RAConfig} from './types/roundabout/types.d.ts' */
/** @import {T} from './types/time-ticker/types' */
/** @import {AttrPatterns} from './types/assign-gingerly/types.d.ts' */

/**
 * @type {{ [K in keyof T]: K }}
 */
const props = {
    items: 'items',
    disabled: 'disabled',
    duration: 'duration',
    idx: 'idx',
    item: 'item',
    timeTicker: 'timeTicker'
};


/**
 * @type {RAConfig<T,T,T,unknown,'tick'>}
 */
export const raConfig  = {
    compacts: {
        [`on_tick_of_timeTicker_inc_${props.idx}_by`]: 1,
        [`when_${props.item}_changes_dispatch`]: 'value-changed',
    },
    merges: [
        {
            ifKeyIn: [props.duration],
            assign: {
                '?.timeTicker?.duration': '?.duration'
            }
        },
        {
            ifKeyIn: [props.disabled],
            assign: {
                '?.timeTicker?.disabled': '?.disabled'
            }
        }
    ],
    yields: {
        [props.item]: {
            from: props.items,
            atIndex: props.idx,
            outOfBounds: 'clamp',
        }
    }
}

/**
 * @type {AttrPatterns<T>}
 */
const withAttrs = {
    [props.items]: props.items,
    [`_${props.items}`]: {
        instanceOf: 'Array'
    },
    [props.duration]: props.duration,
    [`_${props.duration}`]: {
        instanceOf: 'Number'
    }
};

export const cef = {
    features: {
        roundabout: {
            customData:  {
                raConfig
            },
            withAttrs
        }
    }
}

export function render(){
    return JSON.stringify(cef, null, 4);
}

console.log(render());