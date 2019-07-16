import draggable from './directives/draggable';
import onDrop from './directives/on-drop';
import onDrag from './directives/on-drag';
import onDragAborted from './directives/on-drag-aborted';
import Vue from 'vue';

function AddDragop() {
    Vue.directive('draggable', draggable);
    Vue.directive('on-drop', onDrop);
    Vue.directive('on-drag', onDrag);
    Vue.directive('on-drag-aborted', onDragAborted);
}

export default AddDragop;
