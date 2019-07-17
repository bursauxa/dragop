import { DirectiveOptions, VNode, VNodeDirective } from 'vue';
import { GlobalDragState } from '../models/DragState';
import { VueHelper } from '../vue/VueHelper';
import { getMetadata, setMetadata } from '../models/DragDropMetadata';

function createMouseupHandler(element: HTMLElement, binding: VNodeDirective, node: VNode) {
    return (event: MouseEvent) => {
        const vue = VueHelper.findClosestMountedComponent(node);
        if (typeof binding.value !== 'function') {
            throw new Error('v-on-drop handler is not a function');
        }
        const bounds = element.getBoundingClientRect();
        if (GlobalDragState.complete(event.target!, element, vue, event.x - bounds.left, event.y - bounds.top)) {
            const dragDropEventData = GlobalDragState.buildEventData(getMetadata(event));
            binding.value.apply(null, [dragDropEventData]);
            setMetadata(event, dragDropEventData);
        }
    };
}

export const onDrop: DirectiveOptions = {
    bind(el: HTMLElement, binding: VNodeDirective, node: VNode) {
        el.addEventListener('mouseup', createMouseupHandler(el, binding, node), false);
    },
    unbind(el: HTMLElement) {
        el.removeEventListener('mouseup', (evt: MouseEvent) => { }, false);
    }
};
