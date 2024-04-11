import {SimpleWCInfo} from 'may-it-be/SimpleWCInfo';
import {ActionOnEventConfigs} from 'trans-render/froop/types';

export interface IValue{
    idx: number,
    item: any,
}

/**
 * time-ticker props
 * 
 */
export interface EndUserProps {
    /**
     * Items to rotate through and broadcast
     */
    items: any[],
    /**
     * Currently selected idx value and selected item
     */
    value: IValue,
    /**
     * Current index of items (if applicable)
     */
    idx: number,
    /**
     * Milliseconds to wait between ticks
     */
    duration: number,
    /**
     * Upper bound for idx before being reset to 0
     */
    repeat: number,
    /**
     * Start the time ticker.  Toggles disabled state
     */
    enabled: boolean,
    /**
     * Stop the time ticker. 
     */
    disabled: boolean,
    /**
     * Loop the time ticker.
     */
    loop: boolean,
    /**
     * Number of ticks encountered regardless of any looping / repeating.
     */
    ticks: number,
    /**
     * Wait for the duration before firing the first tick.
     */
    wait: boolean,

}

export interface AllProps extends EndUserProps{
    /**
     * Abort controller for the time ticker
     */
     controller: AbortController,

     isAttrParsed: boolean,
}

export type PP = Partial<AllProps>;

export type PPE = [PP, ActionOnEventConfigs<AllProps, Actions>];

/**
 * time-ticker actions
 */
export interface Actions {
    /**
     * 
     * Starts the timer
     */
    start(self: this): Promise<PPE>,
    /**
     * Stop the timer
     */
    stop: (self: this) => {
        controller: AbortController | undefined,
    },
    /**
     * React to an uptick.
     */
    rotateItem: (self: this) => {
        value?: IValue,
    },

    incTicks: (self: this) => {
        ticks: number,
    }
}

export abstract class TimeTickerInfo implements SimpleWCInfo<AllProps>{
    src: './time-ticker.js';
    tagName: 'time-ticker';
    props: EndUserProps;
    methods: Actions;
    nonAttribProps: ['value', 'controller'];
    
}

export type Package = [TimeTickerInfo];