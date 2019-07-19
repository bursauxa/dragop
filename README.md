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

[Full example using HTML elements](https://jsfiddle.net/bursauxa/24k98rcx/)

[Full example using SVG elements]
