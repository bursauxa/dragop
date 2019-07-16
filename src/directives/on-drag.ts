import { DirectiveOptions, VNode, VNodeDirective } from 'vue';
import GlobalDragState from '../models/DragState';
import VueHelper from '../vue/VueHelper';
import { setMetadata, getMetadata } from '../models/DragDropMetadata';

function createMousemoveHandler(element: HTMLElement, binding: VNodeDirective, node: VNode) {
    return (event: MouseEvent) => {
        const vue = VueHelper.findClosestMountedComponent(node);
        if (typeof binding.value !== 'function') {
            throw new Error('v-on-drag handler is not a function');
        }
        const bounds = element.getBoundingClientRect();
        if (GlobalDragState.progress(event.target!, element, vue, event.x - bounds.left, event.y - bounds.top)) {
            const dragDropEventData = GlobalDragState.buildEventData(getMetadata(event));
            binding.value.apply(null, [dragDropEventData]);
            setMetadata(event, dragDropEventData);
        }
    };
}

const onDrag: DirectiveOptions = {
    bind(el: HTMLElement, binding: VNodeDirective, node: VNode) {
        el.addEventListener('mousemove', createMousemoveHandler(el, binding, node), false);
    },
    unbind(el: HTMLElement) {
        el.removeEventListener('mousemove', (evt: MouseEvent) => { }, false);
    }
};

export default onDrag;
