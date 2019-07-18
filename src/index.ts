import { draggable } from './directives/draggable';
import { onDrag } from './directives/on-drag';
import { onDrop } from './directives/on-drop';
import { onDragAborted } from './directives/on-drag-aborted';
import { VueConstructor } from 'vue';

export function AddDragopDirectives(vue: VueConstructor) {
    vue.directive('draggable', draggable);
    vue.directive('onDrag', onDrag);
    vue.directive('onDrop', onDrop);
    vue.directive('onDragAborted', onDragAborted);
}

export const DragopDirectives = { draggable, onDrag, onDrop, onDragAborted };
