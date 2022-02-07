export interface IValue{
    idx: number,
    item: any,
}

export interface TimeTickerProps {
    items: any[],
    value: any,
    idx: number,
    duration: number,
    repeat: number,
    enabled: boolean,
    disabled: boolean,
    loop: boolean,
    ticks: number,
    /**
     * Wait for the duration before firing the first tick.
     * ```JSON
     * {
     *   "props": {
     *   }
     * }
     * ```
     * 
     */
    wait: boolean,
    controller: AbortController,
}

export interface TimeTickerActions {
    start(self: this): {
        controller: AbortController | undefined,
    },
    onDisabled(self: this): {
        controller: AbortController | undefined,
    }
    onItems(self: this): {
        repeat: number,
    }
    onTicks(self: this): {
        idx?: number | undefined,
        disabled?: boolean,
        value?: IValue,
    }
}

export interface TimeTickerInfo {
    tagName: 'time-ticker',
    props: TimeTickerProps,
    methods: TimeTickerActions,
    cssProps: {
        '--duration': 'test',
    }
}