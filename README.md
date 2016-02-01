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
        'makeLoop' : 'true',
        'urlAttr' : 'href'
    };

// only nodes
Leafage(nodes, options);
// only data
Leafage(data, options);
// all
Leafage(nodes, data, options);
</script>
```


Options
-------

Option | Default | Description
------ | ------- | -----------
mod | 'general' | Mod name
lang | 'general' | Text lang
bindto | 'body' | Node for place a window
makeMultiUrl | true | May contain several urls in one string
makeTypeDetect | true | Auto detect load type
makeGrouping | true | Group elements by attribute
makeCombine | true | Combine elements for navigation
makeBlockPage | true | Add Block class for body when window open
makeTail | true | Add Block class for body when window open
makeLoop | false | Loop navigation
makeCasheReset | false | Reset request cashe
makeEventBind | true | Bind events
makePrevent | true | Prevent default event
classBody | empty | Additional class for body
classWindow | empty | Additional class for window
urlAttr | 'data-leafage-url' | Attribute for url
titleAttr | 'data-leafage-title' | Attribute for title
contentAttr | 'data-leafage-content' | Attribute for content
type | 'ajax' | Default load type 'ajax|find|iframe|image|html'
typeAttr | 'data-leafage-type' | Attribute for type
group | 'g' | Default group name
groupAttr | 'data-leafage-group' | Attribute for group
ajaxProperty | empty | Options for ajax request
timeSave | 60000 | Keep result
template | big string | Window template
onInit | empty | Function is called after window init (leafage_object)
onOpen | empty | Function is called after window opening (leafage_object)
onClose | empty | Function is called before window closing (leafage_object)
onSet | empty | Function is called after element seting to window (leafage_object)
onUnset | empty | Function is called before element unseting from window (leafage_object)
onAccept | empty | Function is called on an accept button click (leafage_object)
onCancel | empty | Function is called on a cancel button click (leafage_object)
