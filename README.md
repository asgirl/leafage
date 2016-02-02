Leafage
=======

Leafage is a JavaScript plugin for overlay a contents on the current page.


Usage
-----

```html
<a href="image.jpg" data-leafage-title="Title for image">Show image</a>

<script>
var nodes = document.getElementsByTagName('a'),
    data = [{
        'url' : 'image.jpg',
        'title' : 'Title for image',
        'type' : 'image'
    }, {
        'title' : 'Title for html',
        'content' : 'Some text',
        'type' : 'html'
    }],
    options = {
        'makeLoop' : true,
        'urlAttr' : 'href'
    };

// supported arguments in any order
// (nodes[, options]),
// (data[, options]),
// (nodes, data[, options])
// (data, nodes[, options])
Leafage(nodes, data, options);
</script>
```

Options
-------

Option | Default | Description
------ | ------- | -----------
mod | `'general'` | Mod name
lang | `'general'` | Text lang
bindto | `'body'` | Selector or Node for place a window
makeMultiUrl | `true` | May contain several urls in one string
makeTypeDetect | `true` | Auto detect load type
makeGrouping | `true` | Group elements by attribute
makeCombine | `true` | Combine elements for navigation
makeBlockPage | `true` | Add Block class for body when window open
makeTail | `true` | Add Block class for body when window open
makeLoop | `false` | Loop navigation
makeCasheReset | `false` | Reset request cashe
makeEventBind | `true` | Bind events
makePrevent | `true` | Prevent default event
classBody | empty | Additional class for body
classWindow | empty | Additional class for window
urlAttr | `'data-leafage-url'` | Attribute for url
titleAttr | `'data-leafage-title'` | Attribute for title
contentAttr | `'data-leafage-content'` | Attribute for content
type | `'ajax'` | Default load type `'ajax'`, `'find'`, `'iframe'`, `'image'`, `'html'`
typeAttr | `'data-leafage-type'` | Attribute for type
group | `'g'` | Default group name
groupAttr | `'data-leafage-group'` | Attribute for group
ajaxProperty | empty | Options for ajax request
timeSave | `60000` | Keep result
template | big string | Window template
onInit | empty | Function is called after window init (leafage_object)
onOpen | empty | Function is called after window opening (leafage_object)
onClose | empty | Function is called before window closing (leafage_object)
onSet | empty | Function is called after element seting to window (leafage_object)
onUnset | empty | Function is called before element unseting from window (leafage_object)
onAccept | empty | Function is called on an accept button click (leafage_object)
onCancel | empty | Function is called on a cancel button click (leafage_object)


Object (`new Leafage()`)
----------------------

//TODO: about, arguments, return


Methods of object (`new Leafage()`)
-----------------------------------

### `.get(marker)`

All object's methods apply for each window in stack, you may to want do any method for only one of them. With this method you can select needed window.

Argument | Description
-------- | -----------
**marker** | Indicates a necessary window. Can use index in array, `'first'` or `'last'`, window id.

*Returns* new object with selected window in stack. If marker is wrong, returns new object with empty stack.


### `.each(func[, arg])`

Apply function for each window in stack, with setting current object of cycle as *this* and *arg* as arguments.

Argument | Description
-------- | -----------
**func** | Function.
**arg** | Arguments for each function.

*Returns* current object.


### `.info()`

You can get hidden information about window priperties. This method is apply if stack have only one window.

*Returns* information about window priperties.


### `.init()`

*Returns* current object.


### `.bind()`

Sets event listeners for element nodes and window nodes.

*Returns* current object.


### `.unbind()`

Unsets event listeners for element nodes and window nodes.

*Returns* current object.


### `.open()`

Opens window.

*Returns* current object.


### `.close()`

Closes window.

*Returns* current object.


### `.show()`

Sets current window as active. This method is apply if window already opened.

*Returns* current object.


### `.hide()`

Sets current window as inactive. This method is apply if window already opened.

*Returns* current object.


### `.load(marker)`

Loads selected element.

Argument | Description
-------- | -----------
**marker** | Indicates a necessary element. Can use index in array, `'first'` or `'last'`, element id.

*Returns* current object.


### `.abort()`

*Returns* current object.


### `.prev()`

*Returns* current object.


### `.next()`

*Returns* current object.


### `.set()`

*Returns* current object.


### `.unset()`

*Returns* current object.


### `.enabled()`

*Returns* current object.


### `.disabled()`

*Returns* current object.


### `.update()`

*Returns* current object.


### `.destory()`

*Returns* current object.


Methods of plugin (`Leafage`)
-----------------------------

### `.info()`

*Returns* info about plugin.


### `.create(stack)`

You may to want combine some windows in one stack. With this method you can do it.

Argument | Description
-------- | -----------
**stack** | One window id or array of them.

*Returns* new object with stack from argument.


### `.addMod()`

*Returns* added mod.


### `.getMod()`

*Returns* selected mod.


### `.getModList()`

*Returns* the list of existing mods.


### `.addText()`

*Returns* the added languages.


### `.getText()`

*Returns* selected languages.


### `.getTextList()`

*Returns* the list of existing languages.


### `.getTail()`

*Returns* new object with list of opened windows in stack.
