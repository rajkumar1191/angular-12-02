export interface CounterState {
    count: number;
    loading: boolean;
    error: string | null;
}

export const initialCounterState: CounterState = {
    count: 0,
    loading: false,
    error: null
};
