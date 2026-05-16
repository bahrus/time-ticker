export class TimeTickerElement extends HTMLElement {
    static supportedFeatures = {
        roundabout: {
            fallbackSpawn: async () => (await import('roundabout-lib/RoundaboutFeature.js')).RoundaboutFeature,
            callbackForwarding: ['connectedCallback'],
        },
        timeTicker:  {
            fallbackSpawn: async () => (await import('./TimeTicker.js')).timeTicker,
        }
    }
}

