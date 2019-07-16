import Vue from 'vue';
import { DragDropEventData, DragStatus, DragDropData } from './DragDropEventData';

class DragState {
    private sourceData: DragDropData | null = null;
    private targetData: DragDropData | null = null;
    private status?: DragStatus;
    private rootHandlerAlreadyAdded = false;

    private addRootHandlerIfNeeded(): void {
        if (!this.rootHandlerAlreadyAdded) {
            this.rootHandlerAlreadyAdded = true;
            document.addEventListener('mouseup', () => this.handleRootMouseUp());
        }
    }

    private handleRootMouseUp(): void {
        if (this.abort()) {
            document.dispatchEvent(new CustomEvent('drag-aborted', { detail: this.buildEventData() }));
        }
    }

    public start(
        eventTarget: EventTarget,
        directiveHolder: HTMLElement,
        associatedVueComponent: Vue | null,
        x: number,
        y: number,
        data?: any): boolean {
        this.addRootHandlerIfNeeded();

        if (this.status === undefined || this.status === DragStatus.Completed || this.status === DragStatus.Aborted) {
            this.sourceData = new DragDropData(eventTarget, directiveHolder, associatedVueComponent, x, y, data);
            this.targetData = null;
            this.status = DragStatus.Started;
            return true;
        } else {
            return false;
        }
    }

    public progress(
        eventTarget: EventTarget,
        directiveHolder: HTMLElement,
        associatedVueComponent: Vue | null,
        x: number,
        y: number): boolean {
        if (this.status === DragStatus.Started || this.status === DragStatus.InProgress) {
            this.targetData = new DragDropData(eventTarget, directiveHolder, associatedVueComponent, x, y);
            this.status = DragStatus.InProgress;
            return true;
        } else {
            return false;
        }
    }

    public complete(
        eventTarget: EventTarget,
        directiveHolder: HTMLElement,
        associatedVueComponent: Vue | null,
        x: number,
        y: number): boolean {
        if (this.status === DragStatus.Started || this.status === DragStatus.InProgress) {
            this.targetData = new DragDropData(eventTarget, directiveHolder, associatedVueComponent, x, y);
            this.status = DragStatus.Completed;
            return true;
        } else {
            return false;
        }
    }

    public abort(): boolean {
        if (this.status === DragStatus.Started || this.status === DragStatus.InProgress) {
            this.targetData = null;
            this.status = DragStatus.Aborted;
            return true;
        } else {
            return false;
        }
    }

    public buildEventData(metadata?: any): DragDropEventData {
        switch (this.status) {
            case undefined:
                throw new Error('Can not build event data when the state is not initialized.');
            case DragStatus.Started:
                return {
                    type: DragStatus.Started,
                    source: this.sourceData!
                };
            case DragStatus.InProgress:
                return {
                    type: DragStatus.InProgress,
                    source: this.sourceData!,
                    target: this.targetData!,
                    metadata
                };
            case DragStatus.Completed:
                return {
                    type: DragStatus.Completed,
                    source: this.sourceData!,
                    target: this.targetData!,
                    metadata
                };
            case DragStatus.Aborted:
                return {
                    type: DragStatus.Aborted,
                    source: this.sourceData!
                };
        }
    }
}

const GlobalDragState = new DragState();

export default GlobalDragState;
