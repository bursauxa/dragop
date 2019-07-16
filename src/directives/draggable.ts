import { DirectiveOptions, VNode, VNodeDirective } from 'vue';
import GlobalDragState from '../models/DragState';
import VueHelper from '../vue/VueHelper';

function createMousedownHandler(element: HTMLElement, binding: VNodeDirective, node: VNode) {
    return (event: MouseEvent) => {
        const vue = VueHelper.findClosestMountedComponent(node);
        const data = binding.value;
        const bounds = element.getBoundingClientRect();
        GlobalDragState.start(event.target!, element, vue, event.x - bounds.left, event.y - bounds.top, data);
        event.stopPropagation();
    };
}

const draggable: DirectiveOptions = {
    bind(el: HTMLElement, binding: VNodeDirective, node: VNode) {
        el.addEventListener('mousedown', createMousedownHandler(el, binding, node), false);
    },
    unbind(el: HTMLElement) {
        el.removeEventListener('mousedown', (evt: MouseEvent) => { }, false);
    }
};

export default draggable;
