//@ts-check

import { roundabout } from 'roundabout-lib';
import { faceUpMerges } from 'face-up/RAConfig.mjs';



/** @import {RAConfig} from './types/roundabout/types' */
/** @import {T} from './types/time-ticker/types' */
/** @import {AttrPatterns} from './types/assign-gingerly/types' */

/**
 * @type {{ [K in keyof T]: K }}
 */
const props = {
    items: 'items',
    disabled: 'disabled',
    duration: 'duration',
    idx: 'idx',
    item: 'item',
    timeTicker: 'timeTicker',
    name: 'name',
    value: 'value',
    required: 'required',
    state: 'state',
    validationMessage: 'validationMessage'
};


/**
 * @type {RAConfig<T,T,T,unknown,'tick'>}
 */
export const raConfig  = {
    propagate: /** @type {Array<keyof T>} */ (Object.keys(props)),
    compacts: {
        [`on_tick_of_${props.timeTicker}_inc_${props.idx}_by`]: 1,
        [`when_${props.item}_changes_dispatch`]: 'value-changed',
    },
    merges: [
        ...faceUpMerges,
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
    },
    [props.name]: props.name,
    [`_${props.name}`]: {
        sourceOfTruth: true,
        valIfNull: ''
    },
    [props.disabled]: props.disabled,
    [`_${props.disabled}`]: {
        sourceOfTruth: true,
        instanceOf: Boolean,
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