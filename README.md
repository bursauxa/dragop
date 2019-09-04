# dragop

This library provides a set of VueJS directives that can be attached to DOM elements to suport drag-and-drop features. The callbacks provide physical information (e.g. coordinates, elements), but also binding-defined logical information. You may chose to use any of the two, or both, to suit your needs.

The library is written in TypeScript and provides complete type definitions for all directive callbacks.

## Why dragop

If you are looking for a simple component to use for a list of items that could be reordered by dragging, you may want to look into [Vue.Draggable](https://github.com/SortableJS/Vue.Draggable).

If you are looking for more flexibility and want to use the browser drag-and-drop API, but do not want to deal with its more nonsensical parts, you may want to look into [vue-drag-drop](https://github.com/cameronhimself/vue-drag-drop).

Unfortunately, the browser drag-and-drop API is only implemented on HTML elements - in particular, it is not available on SVG elements. This is the reason why dragop was born: to offer a set of high-level Vue directives that work on any kind of HTML element.

## Examples

### Basic use

The most basic usage is to apply `v-draggable` to an element that can be dragged, and `v-on-drop` to an element that is an acceptable target.

`v-draggable` takes an argument that is the data you want to pass around. This can be anything from your model, or a constant.

`v-on-drop` takes an argument that is the callback to execute when a drag-and-drop operation is completed on the target element. This callback will be called with one argument, of type `DragCompletedEventData`. This notably includes the data provided in the initial `v-draggable`.

```html
<ul>
    <li v-for="paint in paints" :key="paint" :class="paint" v-draggable="paint">
        {{ paint }}
    </li>
</ul>
<span :class="currentPaint" v-on-drop="onDropped">
    drop a color here
</span>
```

```js
data: {
    paints: ["red", "green", "blue"],
    currentPaint: undefined
},
methods: {
    onDropped: function(evt) {
        this.currentPaint = evt.source.data;
    }
}
```

[Running example on Fiddle, using HTML elements](https://jsfiddle.net/bursauxa/24k98rcx/)

[Running example on Fiddle, using SVG elements](https://jsfiddle.net/bursauxa/tk86omL2/)

### Feedback based on physical coordinates

To provide visual feedback during a drag-and-drop operation, the first thing to do is applying the `v-on-drag` directive on an element that is capable of providing the feedback (something we could call the "canvas", although not in the HTML sense).

`v-on-drag` takes an argument that is the callback that will be regularly called when a drag operation is in progress. This callback will be called with one argument, of type `DragInProgressEventData`.

`DragInProgressEventData` notably includes coordinates representative of the current drag operation. In the `target` property, `x` and `y` represent the offset from the `v-on-drag` element.

```html
<div class="box" v-draggable v-on-drag="onDrag">
    {{ x ? x + ' :: ' + y : 'Drag me over myself!' }}
</div>
```

```js
data: {
    x: null,
    y: null
},
methods: {
    onDrag: function(evt) {
        this.x = evt.target.x;
        this.y = evt.target.y;
    }
}
```

`DragInProgressEventData` also contains information about the elements subject of the operation. This can be useful if there are several elements that each define their own callback.

```js
onDrag: function(evt) {
    dragOverSelf = evt.source.directiveHolder === evt.target.directiveHolder;
}
```

To stop providing feedback when the drag operation is complete, you can handle things in the relevant `v-on-drop` callbacks. In addition, you may want to have a handler with a wider scope for cases where the drag operation is aborted (it ends without landing on an element with `v-on-drop`). The `v-on-drag-aborted` directive is provided for this purpose.

`v-on-drag-aborted` takes an argument that is the callback to execute when a drag operation is aborted. This callback will be called with one argument, of type `DragAbortedEventData`. There is no restriction on where this directive can be applied, but for semantic purposes, we recommend applying it on the common ancestor of all the `v-draggable` items.

[Running example on Fiddle](https://jsfiddle.net/bursauxa/35frmva9/)

### Moving rectangles in a SVG

In the `source` property of `DragInProgressEventData`, `x` and `y` represent the offset from the `v-draggable` element. This is typically useful for the scenario where you want to move items in a SVG canvas.
