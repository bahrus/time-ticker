import { TimeTickerElement } from './time-ticker-element.js';
import { TimeTicker } from './TimeTicker.js';
import { RoundaboutFeature } from 'roundabout-lib/RoundaboutFeature.js';
import 'assign-gingerly/assignFeatures.js';
import cef from './cef.json' with { type: 'json' };

const { roundabout } = cef.features;

customElements.assignFeatures(TimeTickerElement, {
    timeTicker: {
        spawn: TimeTicker
    },
    roundabout: {
        spawn: RoundaboutFeature,
        customData: roundabout.customData,
        withAttrs: roundabout.withAttrs,
    },

});

customElements.define('time-ticker', TimeTickerElement);