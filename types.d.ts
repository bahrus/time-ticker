export interface IValue{
    idx: number,
    item: any,
    time: Date
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
    wait: boolean,
    ticks: 0,
    controller: AbortController,
}

export interface TimeTickerActions {
    start(self: this): {
        controller: AbortController | undefined,
    },
    onItems(self: this): void,
}