import { VNode } from 'vue';

export default class VueHelper {
    public static findClosestMountedComponent(node: VNode) {
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
}
