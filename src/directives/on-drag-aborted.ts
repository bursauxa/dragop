import { DirectiveOptions, VNodeDirective } from 'vue';
import { DragAbortedEventData } from '../models/DragDropEventData';

function createMousemoveHandler(binding: VNodeDirective) {
    return (event: Event) => {
        if (typeof binding.value !== 'function') {
            throw new Error('v-on-drag-aborted handler is not a function');
        }
        const customEvent = event as CustomEvent;
        if (customEvent) {
            const data = customEvent.detail as DragAbortedEventData;
            if (data) {
                binding.value.apply(null, [data]);
            }
        }
    };
}

export const onDragAborted: DirectiveOptions = {
    bind(el: HTMLElement, binding: VNodeDirective) {
        document.addEventListener('drag-aborted', createMousemoveHandler(binding), false);
    },
    unbind() {
        document.removeEventListener('drag-aborted', (evt: Event) => { }, false);
    }
};
