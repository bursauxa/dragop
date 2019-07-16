import Vue from 'vue';

// For the source:
// - `x` and `y` represent the offset from the v-draggable element
// - `data` represents the data bound to the v-draggable, if any
// For the target:
// - `x` and `y` represent the offset from the v-on-drag or v-on-drop element
// - `data` is undefined
export class DragDropData {
    constructor(
        public eventTarget: EventTarget,
        public directiveHolder: HTMLElement,
        public associatedVueComponent: Vue | null,
        public x: number,
        public y: number,
        public data?: any) {}
}

export enum DragStatus {
    Started = 'Started',
    InProgress = 'InProgress',
    Completed = 'Completed',
    Aborted = 'Aborted'
}

export interface DragStartedEventData {
    type: DragStatus.Started;
    source: DragDropData;
}

export interface DragInProgressEventData {
    type: DragStatus.InProgress;
    source: DragDropData;
    target: DragDropData;
    metadata: any;
}

export interface DragCompletedEventData {
    type: DragStatus.Completed;
    source: DragDropData;
    target: DragDropData;
    metadata: any;
}

export interface DragAbortedEventData {
    type: DragStatus.Aborted;
    source: DragDropData;
}

export type DragDropEventData =
    DragStartedEventData | DragInProgressEventData | DragCompletedEventData | DragAbortedEventData;
