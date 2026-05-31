import { TimeTicker } from './TimeTicker.js';
import { resolveAndAssignFeatures } from 'assign-gingerly/resolveAndAssignFeatures.js';

export async function wireFeatures(ElementClass, cfg) {
    const { roundabout } = cfg.features;
    const { customData, withAttrs } = roundabout;

    await resolveAndAssignFeatures(ElementClass, {
        timeTicker: { spawn: TimeTicker },
        truthSourcer: {
            callbackForwarding: ['connectedCallback', 'attributeChangedCallback'],
        },
        faceUp: {
            customData: { integrateWithRoundabout: true },
            callbackForwarding: [
                'connectedCallback', 'disconnectedCallback',
                'formDisabledCallback', 'formResetCallback', 'formStateRestoreCallback',
            ],
        },
        roundabout: {
            customData,
            withAttrs,
            callbackForwarding: ['connectedCallback'],
        },
    });
}
