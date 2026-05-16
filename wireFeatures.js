import { TimeTicker } from './TimeTicker.js';
import { RoundaboutFeature } from 'roundabout-lib/RoundaboutFeature.js';
import 'assign-gingerly/assignFeatures.js';
import cef from './cef.json' with { type: 'json' };

export async function wireFeatures(ElementClass, overrides = {}) {
    const { roundabout } = cef.features;
    const { customData, withAttrs } = roundabout;
    
    await customElements.assignFeatures(ElementClass, {
        timeTicker: { spawn: overrides.timeTicker?.spawn || TimeTicker },
        roundabout: {
            spawn: overrides.roundabout?.spawn || RoundaboutFeature,
            customData: overrides.roundabout?.customData || customData,
            withAttrs: overrides.roundabout?.withAttrs || withAttrs,
            callbackForwarding: ['connectedCallback'],
        },
    });
}