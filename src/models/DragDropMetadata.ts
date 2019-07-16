import { DragDropEventData } from './DragDropEventData';

export function getMetadata(event: Event): any {
    return (event as any).__dragDropMetadata__;
}

export function setMetadata(event: Event, data: DragDropEventData): void {
    (event as any).__dragDropMetadata__ = (data as any).metadata;
}
