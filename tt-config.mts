import {DefineArgs} from 'xtal-element/src/types';
import {TimeTickerProps, TimeTickerActions} from './types';

const da: DefineArgs<TimeTickerProps, TimeTickerActions> = {
    config:{
        tagName: 'time-ticker',
        propDefaults: {
            ticks: 0,
            idx: -1,
            duration: 1_000,
            repeat: Infinity,
            enabled: true,
            disabled: false,
            loop: false,
            wait: false,
        },
        propInfo:{
            enabled:{
                dry: false,
                notify: {
                    toggleTo: 'disabled',
                }
            },
            repeat: {
                dry: false,
            },
            value: {
                notify: {
                    dispatch: true,
                },
                parse: false,
            },
        },
        style: {
            display: 'none',
        },
        actions: {
            stop:{
                ifAllOf: ['disabled', 'controller']
            },
            rotateItems:'items',
            start:{
                ifAllOf: ['duration'],
                ifNoneOf: ['disabled'],
            },
            onTicks: {
                ifAllOf: ['ticks'],
                ifKeyIn: ['repeat', 'loop'],
                ifNoneOf: ['disabled'],
            }
        }
    },
};

console.log(JSON.stringify(da.config));