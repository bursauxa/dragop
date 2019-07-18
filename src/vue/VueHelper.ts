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
}
