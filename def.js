import { TimeTickerElement } from './time-ticker-element.js';
import { TimeTicker } from './TimeTicker.js';
import { RoundaboutFeature } from 'roundabout-lib/RoundaboutFeature.js';

customElements.assignFeatures(TimeTickerElement, {
    roundabout: {
        spawn: RoundaboutFeature,
        customData: {
            raConfig: {
                compacts: {
                    on_tick_of_timeTicker_inc_ticks_by: 1,
                    when_idx_changes_dispatch: 'value-changed',
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
                    },
                    
                ],
                yields: {
                    item: {
                        from: 'items',
                        atIndex: 'idx'
                    }
                }
            }
        },
        withAttrs: {
            items: 'items',
            _items: {
                instancweOf: 'Array'
            }
        }
    },
    timeTicker: {
        spawn: TimeTicker
    }
});

customElements.define('time-ticker', TimeTickerElement);