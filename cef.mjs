//@ts-check

import { roundabout } from 'roundabout-lib';

/** @import {RAConfig} from './types/roundabout/types.d.ts' */
/** @import {TimeTickerElementAllProps, Actions} from './types/time-ticker/types' */
/** @import {AttrPatterns} from './types/assign-gingerly/types.d.ts' */
/**
 * @type {RAConfig<TimeTickerElementAllProps>}
 */
export const raConfig  = {
    compacts: {
        on_tick_of_timeTicker_inc_idx_by: 1,
        when_item_changes_dispatch: 'value-changed',
    },
    merges: [
        {
            ifKeyIn: ['duration'],
            assign: {
                '?.timeTicker?.duration': '?.duration'
            }
        },
        {
            ifKeyIn: ['disabled'],
            assign: {
                '?.timeTicker?.disabled': '?.disabled'
            }
        }
    ],
    yields: {
        item: {
            from: 'items',
            atIndex: 'idx',
            outOfBounds: 'clamp',
        }
    }
}

/**
 * @type {AttrPatterns<TimeTickerElementAllProps>}
 */
const withAttrs = {
    items: 'items',
    _items: {
        instanceOf: 'Array'
    },
    duration: 'duration',
    _duration: {
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