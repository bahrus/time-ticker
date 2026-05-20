import { TimeTicker } from './TimeTicker.js';
import { RoundaboutFeature } from 'roundabout-lib/roundaboutFeature.js';
import { TruthSourcer } from 'truth-sourcer/TruthSourcer.js';
import { FaceUp } from 'face-up/FaceUp.js';
import 'assign-gingerly/assignFeatures.js';

export async function wireFeatures(ElementClass, cfg) {
    const { roundabout } = cfg.features;
    const { customData, withAttrs } = roundabout;
    
    await customElements.assignFeatures(ElementClass, {
        timeTicker: { spawn: TimeTicker },
        truthSourcer: { spawn: TruthSourcer },
        faceUp: { 
            spawn: FaceUp,
            customData: {
                integrateWithRoundabout: true
            }
         },
        roundabout: {
            spawn: RoundaboutFeature,
            customData,
            withAttrs,
            callbackForwarding: ['connectedCallback'],
        },
    });
}