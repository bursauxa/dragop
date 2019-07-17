import { draggable } from '../directives/draggable';
import { onDrop } from '../directives/on-drop';
import { onDrag } from '../directives/on-drag';
import { onDragAborted } from '../directives/on-drag-aborted';
import Vue from 'vue';
import { VNode } from 'vue';

export class VueHelper {
    public static findClosestMountedComponent(node: VNode): Vue | null {
        let current: VNode | undefined = node;
        while (current) {
            if (current.componentInstance) {
                return current.componentInstance;
            } else {
                current = node.parent;
            }
        }
        return null;
    }

    public static addDirectives(): void {
        Vue.directive('draggable', draggable);
        Vue.directive('on-drop', onDrop);
        Vue.directive('on-drag', onDrag);
        Vue.directive('on-drag-aborted', onDragAborted);
    }
}
