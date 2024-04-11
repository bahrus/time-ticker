export interface IValue{
    idx: number,
    item: any,
}

/**
 * time-ticker props
 * 
 */
export interface EndUserProps<TItem = any> {
    /**
     * Items to rotate through and broadcast
     */
    items?: TItem[],
    /**
     * Currently selected item
     */
    item?: TItem,
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
    repeat?: number,
    /**
     * Start the time ticker.  Toggles disabled state
     */
    enabled?: boolean,
    /**
     * Stop the time ticker. 
     */
    disabled?: boolean,
    /**
     * Loop the time ticker.
     */
    loop?: boolean,

    /**
     * Wait for the duration before firing the first tick.
     */
    wait: boolean,

}

export interface EventTargetProps {
    timeEmitter: ITimeEmitter,
}

export interface AllProps extends EndUserProps, EventTargetProps{
    /**
     * Abort controller for the time ticker
     */
    timeEmitterAC?: AbortController,
    /**
     * Number of ticks encountered regardless of any looping / repeating.
     */
    ticks: number,



}


export type PAP = Partial<AllProps>;

export type ProPAP = Promise<PAP>;

/**
 * time-ticker actions
 */
export interface Actions {
    /**
     * 
     * Starts the timer
     */
    start(self: this): ProPAP,
    /**
     * Stop the timer
     */
    stop(self: this): PAP,
    /**
     * React to an uptick.
     */
    rotateItem(self: this) : PAP
    /**
     * Increment the tick count by 1
     * @param self 
     */
    incTicks(self: this): PAP
}

export interface ITimeEmitter extends EventTarget{

}