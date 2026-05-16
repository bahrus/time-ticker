import { TimeTickerElement } from './time-ticker-element.js';
import { TimeTicker } from './TimeTicker.js';
import { RoundaboutFeature } from 'roundabout-lib/RoundaboutFeature.js';
import 'assign-gingerly/assignFeatures.js';

customElements.assignFeatures(TimeTickerElement, {
    timeTicker: {
        spawn: TimeTicker
    },
    roundabout: {
        spawn: RoundaboutFeature,
        customData: {
            raConfig: {
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
                    },
                    
                ],
                yields: {
                    item: {
                        from: 'items',
                        atIndex: 'idx',
                        outOfBounds: 'clamp'
                    }
                }
            }
        },
        withAttrs: {
            items: 'items',
            _items: {
                instanceOf: 'Array'
            },
            duration: 'duration',
            _duration:  {
                instanceOf: 'Number'
            }
        }
    },

});

customElements.define('time-ticker', TimeTickerElement);