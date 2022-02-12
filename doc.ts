import {SimpleCustomElementDef} from 'may-it-be/types';
import {} from './types';

export class Doc implements SimpleCustomElementDef{
    tagName = 'time-ticker';
    events = [
        {
            name: 'value-changed',
            type: {
                text: 'Fired every time the timer ticks',
            }
        }
    ];
    props = [
        {
            name: 
        }
    ]
}