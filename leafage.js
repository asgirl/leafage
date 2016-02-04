/*\
 *  Leafage
 *  @version 0.0.3
 *  @license MIT
\*/
;(function () {

    'use strict';


    var v_info = {
        'author' : 'A.S.',
        'name' : 'Leafage',
        'version' : '0.0.3',
        'license' : 'MIT',
        'repository' : 'https://github.com/asgirl/leafage'
    };


    var v_window = window,
        v_document = document,
        v_html = document.documentElement,
        v_body = document.body;


    /*\
     *  @param {*} data
     *  @returns {Boolean} returns true if data is a object else return false
    \*/
    function f_isobject (data) {
        return (data && (Object.prototype.toString.call(data) === Object.prototype.toString.call({})));
    };

    /*\
     *  @param {*} data
     *  @returns {Boolean} returns true if data is a array else return false
    \*/
    function f_isarray (data) {
        return (data && (Object.prototype.toString.call(data) === Object.prototype.toString.call([])));
    };

    /*\
     *  @param {*} data
     *  @returns {Boolean} returns true if data is a function else return false
    \*/
    function f_isfunction (data) {
        return (data && (Object.prototype.toString.call(data) === Object.prototype.toString.call(function () {})));
    };

    /*\
     *  @param {Object}
     *  @returns {Object} returns new object, if no arguments return empty object
    \*/
    function f_extend () {
        var arg = arguments,
            result = {};

        if (!arg.length) {
            return result;
        };

        for (var i = 0; i < arg.length; i++) {
            if (!f_isobject(arg[i])) {
                continue;
            };

            for (var key in arg[i]) {
                if (!arg[i].hasOwnProperty(key)) {
                    continue;
                } else if (f_isobject(arg[i][key])) {
                    result[key] = f_extend(result[key] || {}, arg[i][key]);
                } else {
                    result[key] = arg[i][key];
                };
            };
        };

        return result;
    };

    /*\
     *  @param {*} data
     *  @returns {Array} returns new array
    \*/
    function f_toarray (data) {
        var is_empty = (!data || (data.length === 0)),
            is_one = (!is_empty && !data.length),
            result = [];

        if (is_empty) {
            return [];
        } else if (is_one) {
            return [data];
        };

        for (var i = 0, l = data.length; i < l; i++) {
            result.push(data[i]);
        };

        return result;
    };

    /*\
     *  @param {Node|Array} node
     *  @param {String|Array} add
    \*/
    function f_addclass (node, add) {
        if (!node || (node.length === 0) || !add || (add.length === 0)) {
            return;
        };

        if (!f_isarray(node)) {
            node = [node];
        };

        if (!f_isarray(add)) {
            add = add.split(' ');
        };

        var list = '';

        for (var i = 0, l = node.length; i < l; i++) {
            list = node[i].className.split(' ') || [];

            for (var j = 0, k = add.length; j < k; j++) {
                if (list.indexOf(add[j]) === -1) {
                    list.push(add[j]);
                };
            };

            node[i].className = list.join(' ');
        };
    };

    /*\
     *  @param {Node|Array} node
     *  @param {String|Array} remove
    \*/
    function f_removeclass (node, remove) {
        if (!node || (node.length === 0) || !remove || (remove.length === 0)) {
            return;
        };

        if (!f_isarray(node)) {
            node = [node];
        };

        if (!f_isarray(remove)) {
            remove = remove.split(' ');
        };

        var list = '',
            new_list = [];

        for (var i = 0, l = node.length; i < l; i++) {
            list = node[i].className.split(' ') || [];

            for (var j = 0, k = list.length; j < k; j++) {
                if (remove.indexOf(list[j]) === -1) {
                    new_list.push(list[j]);
                };
            };

            node[i].className = new_list.join(' ');
        };
    };

    /*\
     *  @param {Node} node
     *  @param {String|Array} find
     *  @returns {Boolean} returns true if node has class and false if has not
    \*/
    function f_hasclass (node, find) {
        if (!node || node.length || !find || (find.length === 0)) {
            return false;
        };

        if (!f_isarray(find)) {
            find = find.split(' ');
        };

        var list = node.className.split(' ') || [];

        for (var i = 0, l = find.length; i < l; i++) {
            if (list.indexOf(find[i]) === -1) {
                return false;
            };
        };

        return !!find.length;
    };

    /*\
     *  @param {Node|Array} node
     *  @param {String|Array} type
     *  @param {Function} handler
    \*/
    function f_addevent (node, type, handler) {
        if (!node || (node.length === 0) || !type || (type.length === 0) || !handler) {
            return;
        };

        if (!f_isarray(node)) {
            node = [node];
        };

        if (!f_isarray(type)) {
            type = type.split(' ');
        };

        var method = (window.addEventListener) ? 1 : 2;

        for (var i = 0, l = node.length; i < l; i++) {
            for (var j = 0, k = type.length; j < k; j++) {
                if (method === 1) {
                    node[i].addEventListener(type[j], handler, false);
                } else {
                    node[i].attachEvent('on'+ type[j], handler);
                };
            };
        };
    };

    /*\
     *  @param {Node|Array} node
     *  @param {String|Array} type
     *  @param {Function} handler
    \*/
    function f_removeevent (node, type, handler) {
        if (!node || (node.length === 0) || !type || (type.length === 0) || !handler) {
            return;
        };

        if (!f_isarray(node)) {
            node = [node];
        };

        if (!f_isarray(type)) {
            type = type.split(' ');
        };

        var method = (window.addEventListener) ? 1 : 2;

        for (var i = 0, l = node.length; i < l; i++) {
            for (var j = 0, k = type.length; j < k; j++) {
                if (method === 1) {
                    node[i].removeEventListener(type[j], handler);
                } else { 
                    node[i].detachEvent('on'+ type[j], handler);
                };
            };
        };
    };

    /*\
     *  @param {Object} request
     *  @returns {XMLHttpRequest} returns XMLHttpRequest
    \*/
    function f_ajax (request) {
        request = request || {};

        var result = new XMLHttpRequest();

        result.open(request.method || 'get', request.url, request.async || true, request.username, request.userpass);

        return result;
    };

    /*\
     *  @param {Node|Array} node
     *  @param {Node|Array|String} add
    \*/
    function f_addnode (node, add) {
        if (!node || (node.length === 0) || !add || (add.length === 0)) {
            return;
        };

        if (!f_isarray(node)) {
            node = [node];
        };

        if (add instanceof Node) {
            add = [add];
        };

        for (var i = 0, l = node.length; i < l; i++) {
            if (f_isarray(add)) {
                for (var j = 0, k = add.length; j < k; j++) {
                    node[i].appendChild(add[j]);
                };
            } else {
                node[i].insertAdjacentHTML('beforeend', add);
            };
        };
    };

    /*\
     *  @param {Node|Array} node
    \*/
    function f_removenode (node) {
        if (!node || (node.length === 0)) {
            return;
        };

        if (!f_isarray(node)) {
            node = [node];
        };

        for (var i = 0, l = node.length; i < l; i++) {
            node[i].parentNode.removeChild(node[i]);
        };
    };

    /*\
     *  @param {Node|Array} node
     *  @param {Node|Array|String} add
    \*/
    function f_beforenode (node, add) {
        if (!node || (node.length === 0) || !add || (add.length === 0)) {
            return;
        };

        if (!f_isarray(node)) {
            node = [node];
        };

        if (add instanceof Node) {
            add = [add];
        };

        for (var i = 0, l = node.length; i < l; i++) {
            if (f_isarray(add)) {
                for (var j = 0, k = add.length; j < k; j++) {
                    node[i].parentNode.insertBefore(add[j], node[i]);
                };
            } else {
                node[i].insertAdjacentHTML('beforebegin', add);
            };
        };
    };

    /*\
     *  @param {Node|Array} node
    \*/
    function f_empty (node) {
        if (!node || (node.length === 0)) {
            return;
        };

        if (!f_isarray(node)) {
            node = [node];
        };

        var children = [];

        for (var i = 0, l = node.length; i < l; i++) {
            children = node[i].childNodes;

            for (var j = 0, k = children.length; j < k; j++) {
                if (children[j]) {
                    node[i].removeChild(children[j]);
                };
            };
        };
    };

    /*\
     *  @param {String} selector
     *  @returns {Node} returns fined node
    \*/
    function f_getnode (selector) {
        if (!selector) {
            return null;
        };

        return v_document.querySelector(selector);
    };

    /*\
     *  @param {String} selector
     *  @returns {Array} returns all fined nodes
    \*/
    function f_getnodes (selector) {
        if (!selector) {
            return null;
        };

        return f_toarray(v_document.querySelectorAll(selector));
    };

    /*\
     *  @param {Node} node
     *  @param {String} selector
     *  @returns {Node} returns fined node
    \*/
    function f_findnode (node, selector) {
        if (!node || (node.length === 0) || !selector) {
            return null;
        };

        return node.querySelector(selector);
    };

    /*\
     *  @param {Node} node
     *  @param {String} selector
     *  @returns {Array} returns fined nodes
    \*/
    function f_findnodes (node, selector) {
        if (!node || (node.length === 0) || !selector) {
            return null;
        };

        return f_toarray(node.querySelectorAll(selector));
    };

    /*\
     *  @param {Function} func
     *  @param {Number} delay
     *  @returns {Number} returns timeout number
    \*/
    function f_delay (func, delay) {
        if (!func) {
            return;
        };

        var arg = arguments;

        return setTimeout(function () {
            func.apply(null, Array.prototype.slice.call(arg, 2));
        }, delay);
    };


    /*\
     *  @param {String} string
     *  @returns {String} returns clear string
    \*/
    function f_string_clear (string) {
        return string.replace(/[^a-z0-9_\-\.]+/ig, '').replace(/[\-\.]/g, '_');
    };

    /*\
     *  @param {Number} n
     *  @returns {String} returns new genereted string with length n
    \*/
    var v_gstring_stack = [];
    function v_gstring_create (n) {
        var chars = 'abcdefghijklmnopqrstuvwxyz',
            l = chars.length - 1,
            result = '';

        if (!n) {
            return result;
        };

        for (var i = 0; i < n; i++) {
            result += chars[Math.round(Math.random() * l)];
        };

        if (v_gstring_stack.indexOf(result) !== -1) {
            return v_gstring_create(n);
        } else {
            v_gstring_stack.push(result);

            return result;
        };
    };

    /*\
     *  @param {String} string
     *  @returns {DocumentFragment} returns document fragment with nodes
    \*/
    function f_string_to_fragment (string) {
        var fragment = v_document.createDocumentFragment(),
            node = v_document.createElement('div');

        node.innerHTML = string;

        var scripts = f_findnodes(node, 'script');

        for (var i = 0, l = scripts.length; i < l; i++) {
            f_beforenode(scripts[i], f_script_node_convert(scripts[i]));
        };

        var children = node.childNodes;

        for (var j = 0, k = children.length; j < k; j++) {
            fragment.appendChild(children[j]);
        };

        return fragment;
    };

    /*\
     *  @param {String} string
     *  @returns {Array} returns array with nodes
    \*/
    function f_string_to_node (string) {
        var node = v_document.createElement('div');

        node.innerHTML = string;

        var scripts = f_findnodes(node, 'script');
        
        for (var i = 0, l = scripts.length; i < l; i++) {
            f_beforenode(scripts[i], f_script_node_convert(scripts[i]));
        };

        return f_toarray(node.childNodes);
    };

    /*\
     *  @param {Node} node
     *  @returns {Node} returns new script node
    \*/
    function f_script_node_convert (node) {
        if (node.nodeName.toLowerCase() !== 'script') {
            return node;
        };

        var script,
            script_attr;

        script = document.createElement('script');
        script.innerHTML = node.innerHTML;
        script_attr = node.attributes;

        for (var i = 0, l = script_attr.length; i < l; i++) {
            script.setAttribute(script_attr[i].nodeName, script_attr[i].nodeValue);
        };

        return script;
    };

    /*\
     *  @param {Array} data
     *  @param {String|Number} marker
     *  @returns {String} returns value from data by marker
    \*/
    function f_array_get_item (data, marker) {
        if (!data.length) {
            return;
        };

        if (data.indexOf(marker) !== -1) {
            return marker;
        };

        if (marker === 'first') {
            marker = data[0];
        } else if (marker === 'last') {
            marker = data[data.length - 1];
        } else if ((typeof marker === 'number') && (marker >= 0) && (marker < data.length)) {
            marker = data[marker];
        } else {
            marker = undefined;
        };

        return marker;
    };

    /*\
     *  @param {Node|Array} node
     *  @param {String|Array} add_before
     *  @param {String|Array} remove_before
     *  @param {String|Array} add_after
     *  @param {String|Array} remove_after
     *  @param {Number} delay
     *  @param {Function} callback
    \*/
    function f_animation_set (node, add_before, remove_before, add_after, remove_after, delay, callback) {
        var current = node.className,
            after = function () {
                f_addclass(node, add_after);
                f_removeclass(node, remove_after);

                if (callback) {
                    callback();
                };
            };

        f_addclass(node, add_before);
        f_removeclass(node, remove_before);

        if (delay > 0) {
            f_delay(after, delay);
        } else {
            after();
        };
    };

    /*\
     *  @param {String} url
     *  @param {String} type
     *  @param {Object} property
     *  @param {Fuction} callback
     *  @returns {Image|XMLHttpRequest} returns Image if type is 'image' and XMLHttpRequest if type is 'ajax'
    \*/
    function f_content_load (url, type, property, callback) {
        var request,
            unbind = function () {
                f_removeevent(request, 'load', success);
                f_removeevent(request, 'error', error);
            },
            success = function (event) {
                if (request.status && request.status !== 200) {
                    return error();
                };

                unbind();

                if (callback) {
                    callback('success', request, Date.now());
                };
            },
            error = function (event) {

                unbind();

                if (callback) {
                    callback('error', event);
                };
            },
            cancel = function () {};

        switch (type) {
            case 'ajax' :
                cancel = function (event) {
                    unbind();

                    request.abort();
                    request = null;

                    if (callback) {
                        callback('abort');
                    };
                };

                property.url = url;

                request = f_ajax(property);

                f_addevent(request, 'load', success);
                f_addevent(request, 'error', error);

                request.send();

                break;

            case 'image' :
                cancel = function (event) {
                    unbind();

                    request.src = '';
                    request = null;

                    if (callback) {
                        callback('abort');
                    };
                };

                request = document.createElement('img');

                f_addevent(request, 'load', success);
                f_addevent(request, 'error', error);

                request.src = url;

                break;

            default :
                if (callback) {
                    callback('success', null, Date.now());
                };

                return null;

                break;
        };

        request.cancel = cancel;

        return request;
    };

    /*\
     *  @param {Node|Array} node
     *  @param {String|Array} find
     *  @param {String|Array} stop
     *  @param {Function} callback
    \*/
    function f_find_in_parents (node, find, stop, callback) {
        if (!node || !find || (find.length === 0)) {
            return;
        };

        if (!f_isarray(find)) {
            find = [find];
        };

        for (var i = 0; i < 1; i++) {
            for (var j = 0, k = find.length; j < k; j++) {
                if (f_hasclass(node, find[j])) {
                    return callback(true, node, find[j]);
                };
            };
            if (f_hasclass(node, stop)) {
                return callback(false, node, stop);
            } else if (node.parentNode) {
                node = node.parentNode;

                i--;
            } else {
                return callback(false, node);
            };
        };
    };

    /*\
     *  Create style classes
    \*/
    var v_classes_done = false;
    function f_classes_create () {
        v_body = v_document.body;
        v_classes_done = true;

        var temp_node = document.createElement('div');

        temp_node.style.position = 'absolute';
        temp_node.style.width = '50px';
        temp_node.style.height = '50px';
        temp_node.style.overflow = 'scroll';

        f_addnode(v_body, temp_node);

        var scrollbar = parseInt(temp_node.offsetWidth) - parseInt(temp_node.clientWidth);

        f_removenode(temp_node);

        var temp_style = document.createElement('style');

        temp_style.type = 'text/css';
        temp_style.rel = 'stylesheet';
        temp_style.innerHTML = '.h-scroll-top{margin-top:'+ scrollbar +'px;}.h-scroll-left{margin-left:'+ scrollbar +'px;}.h-scroll-right{margin-right:'+ scrollbar +'px;}.h-scroll-bottom{margin-bottom:'+ scrollbar +'px;}';
 
        f_addnode(document.getElementsByTagName('head')[0], temp_style);
    };


    var v_name = {
        'prefix' : 'leafage',
        'attr_window' : 'data-leafage-window', // attribute contain window id
        'attr_id' : 'data-leafage-id', // attribute contain element id
        'attr_url' : 'data-leafage-url', // attribute contain element url
        'attr_title' : 'data-leafage-title', // attribute contain element title
        'attr_content' : 'data-leafage-content', // attribute contain element content
        'attr_type' : 'data-leafage-type', // attribute contain element type
        'attr_group' : 'data-leafage-group', // attribute contain element group
        'sel_window' : 'e-window', // selector for main node, contain all nodes
        'sel_wrapper' : 'e-wrapper', // selector for wrapper node
        'sel_title' : 'e-title', // selector for node where place a title
        'sel_content' : 'e-content', // selector for node where place a content
        'sel_shut' : 'e-shut', // selector for close layer
        'sel_close' : 'e-close', // selector for close buttons
        'sel_prev' : 'e-prev', // selector for prev buttons
        'sel_next' : 'e-next', // selector for next buttons
        'sel_touch' : 'e-touch', // selector for touch layer
        'sel_accept' : 'e-accept', // selector for accept buttons
        'sel_cancel' : 'e-cancel', // selector for cancel buttons
        'sel_current' : 'e-current', // selector for current element number
        'sel_total' : 'e-total', // selector for total count of elements
        'class_block' : 'f-pageblock', // set when need to block body
        'class_alone' : 'f-alone', // set if window have one element
        'class_enabled' : 'f-enabled', // set enabled state
        'class_disabled' : 'f-disabled', // set disabled state
        'class_active' : 'f-active', // set when window not hide
        'class_inactive' : 'f-inactive', // set when window hide
        'class_open' : 'f-open', // set when start open window
        'class_close' : 'f-close', // set when start close window
        'class_show' : 'f-show', // set when start show window
        'class_hide' : 'f-hide', // set when start hide window
        'class_prev' : 'f-prev', // set when start set prev element
        'class_next' : 'f-next', // set when start set next element
        'class_ready' : 'f-ready', // set when start set element in first time
        'class_load' : 'f-loading', // set when start loading
        'class_error' : 'f-error', // set when loading error
        'class_type' : 'f-type', // set load type
        'event_click' : 'click' // click event
    };


    var v_text = {
        'general' : {
            'success' : 'Everything okay',
            'error' : 'Something wrong',
            'txt_prev' : 'Prev',
            'txt_next' : 'Next',
            'txt_close' : 'Close'
        }
    };

    function f_text_add (name, data) {
        if (!name || (name === 'general')) {
            return null;
        };

        name = 'c_'+ f_string_clear(name);

        v_text[name] = f_extend(v_text.general, data);

        return v_text[name];
    };

    function f_text_get (name) {
        if (name && (name !== 'general')) {
            name = 'c_'+ f_string_clear(name);
        };

        if (!v_text[name]) {
            return null;
        } else {
            return v_text[name];
        };
    };

    function f_text_get_value (name, prop) {
        if (name !== 'general') {
            name = 'c_'+ f_string_clear(name);
        };

        if (!v_text[name]) {
            name = 'general';
        };

        return v_text[name][prop];
    };

    function f_text_get_list () {
        var list = [];

        for (var key in v_text) {
            list.push((key !== 'general') ? key.slice(2) : key);
        };

        return list;
    };


    var v_mod = {
        'general' : {
            'mod' : 'general', // {String} mod name
            'lang' : 'general', // {String} text lang
            'bindto' : 'body', // {String|Node} selector or node for place a window
            'makeMultiUrl' : true, // {Boolean} may contain several urls in one string
            'makeTypeDetect' : true, // {Boolean} auto detect load type
            'makeGrouping' : true, // {Boolean} group elements by attribute
            'makeCombine' : true, // {Boolean} combine elements for navigation
            'makeBlockPage' : true, // {Boolean} add Block class for body when window open
            'makeTail' : true, // {Boolean} add open window to tail
            'makeLoop' : false, // {Boolean} loop navigation
            'makeCasheReset' : false, // {Boolean} reset request cashe
            'makeEventBind' : true, // {Boolean} bind events
            'makePrevent' : true, // {Boolean} prevent default event
            'classBody' : '', // {String} additional class for body
            'classWindow' : '', // {String} additional class for window
            'urlAttr' : v_name.attr_url, // {String} attribute for url
            'titleAttr' : v_name.attr_title, // {String} attribute for title
            'contentAttr' : v_name.attr_content, // {String} attribute for content
            'type' : 'ajax', // {String} default load type 'ajax|find|iframe|image|html'
            'typeAttr' : v_name.attr_type, // {String} attribute for load type
            'group' : 'g', // {String} default group name
            'groupAttr' : v_name.attr_group, // {String} attribute for group name
            'ajaxProperty' : {}, // {Object} options for ajax request
            'timeSave' : 60000, // {Number} keep result
            'template' : '<div class="leafage e-window e-shut"><button class="leafage-prev e-prev" title="{{txt_prev}}"></button><button class="leafage-next e-next h-scroll-right" title="{{txt_next}}"></button><div class="leafage-wrapper e-wrapper"><div class="leafage-content e-content"></div></div><div class="leafage-info"><button class="leafage-close e-close" title="{{txt_close}}"></button><div class="leafage-count"><span class="e-current"></span> / <span class="e-total"></span></div><div class="leafage-title e-title"></div></div><div class="leafage-preloader"></div></div>', // {string} template
            'onInit' : null, // {Function} called after window init (leafage_object)
            'onOpen' : null, // {Function} called after window opening (leafage_object)
            'onClose' : null, // {Function} called before window closing (leafage_object)
            'onSet' : null, // {Function} called after element seting to window (leafage_object)
            'onUnset' : null, // {Function} called before element unseting from window (leafage_object)
            'onAccept' : null, // {Function} called on an accept button click (leafage_object)
            'onCancel' : null // {Function} called on a cancel button click (leafage_object)
        }
    };

    function f_mod_add (name, data) {
        if (name === 'general') {
            return false;
        };

        name = 'c_'+ f_string_clear(name);

        v_mod[name] = f_extend({}, data);

        return v_mod[name];
    };

    function f_mod_get (name, data) {
        data = data || {};

        if (name && (name !== 'general')) {
            name = 'c_'+ f_string_clear(name);
        };

        if (!name || (name === 'general')) {
            return f_extend(v_mod.general, data);
        } else {
            return f_extend(v_mod.general, v_mod[name], data);
        };
    };

    function f_mod_get_list () {
        var list = [];

        for (var key in v_mod) {
            list.push((key !== 'general') ? key.slice(2) : key);
        };

        return list;
    };


    var v_tail = [];

    var v_tail_current = '';

    function f_tail_add (id) {
        v_tail_current = id;
        
        v_tail.push(id);

        return true;
    };

    function f_tail_remove (id) {
        var new_tail = [];

        for (var i = 0, l = v_tail.length; i < l; i++) {
            if (id !== v_tail[i]) {
                new_tail.push(v_tail[i]);
            };
        };

        v_tail = new_tail;
        v_tail_current = (v_tail.length) ? v_tail[v_tail.length - 1] : '';

        return true;
    };

    function f_tail_get_list () {
        return v_tail;
    };


    var v_blockpage = 0;


    var v_element = {
        'id' : '',
        'is_get' : false,
        'is_error' : false,
        'is_set' : false,
        'is_active' : false,
        'is_loading' : false,
        'is_bind' : false,
        'timestamp' : 0,
        'url' : '',
        'title' : '',
        'content' : '',
        'type' : '',
        'group' : '',
        'node' : null,
        'source' : null
    };

    var v_element_stack = {};

    function f_element_create (data) {
        data.id = v_gstring_create(16);

        v_element_stack[data.id] = f_extend(v_element, data);

        return v_element_stack[data.id];
    };

    function f_element_remove (id) {
        var result = [];

        if (f_isarray(id)) {
            for (var i = 0, l = id.length; i < l; i++) {
                v_element_stack[id[i]] = null;
            };
        } else {
            v_element_stack[id] = null;
        };
    };

    function f_element_get (id) {
        var result = [];

        if (f_isarray(id)) {
            for (var i = 0, l = id.length; i < l; i++) {
                result.push(v_element_stack[id[i]]);
            };

            return result;
        } else {
            return v_element_stack[id];
        };
    };

    function f_element_type_detect (l_element, type) {
        if (!l_element.url) {
            return;
        } else if (/^(http(s)?\:)?\/\/(www\.)?(youtu\.be)/i.test(l_element.url)) {
            l_element.url = '//www.youtube.com/embed/'+ l_element.url.match(/([^\/]*)$/)[0];

            if (type !== 'iframe') {
                l_element.type = 'iframe';
            };
        } else if (/^(http(s)?\:)?\/\/(www\.)?(vimeo\.com)/i.test(l_element.url)) {
            l_element.url = '//player.vimeo.com/video/'+ l_element.url.match(/([^\/]*)$/)[0];

            if (type !== 'iframe') {
                l_element.type = 'iframe';
            };
        } else if (l_element.type) {
            return;
        } else if (l_element.content) {
            if (type !== 'html') {
                l_element.type = 'html';
            };
        } else if (/^\w*\#/.test(l_element.url)) {
            if (type !== 'find') {
                l_element.type = 'find';
            };
        } else if (/\.(bmp|gif|jp(e)?g|png|svg|tif(f)?|webp)(?:\?.*)?$/i.test(l_element.url)) {
            if (type !== 'image') {
                l_element.type = 'image';
            };
        } else if (/\.(3gp|mp3|mp4|og(g|v)|pdf|wav|webm|wmv)(?:\?.*)?$/i.test(l_element.url)) {
            if (type !== 'iframe') {
                l_element.type = 'iframe';
            };
        } else {
            if ((type === 'find') || (type === 'html')) {
                l_element.type = 'ajax';
            };
        };
    };

    function f_element_load (l_element, l_options, callback) {
        var type = l_element.type || l_options.type;

        //get content if need
        if (!l_element.is_get || (l_element.timestamp && (Date.now() - l_element.timestamp > l_options.timeSave))) {
            l_element.is_get = false;
            l_element.is_error = false;

            switch (type) {
                case 'ajax' :
                case 'image' :
                    l_element.is_loading = true;

                    l_element.source = f_content_load(
                        l_element.url + (l_options.makeCasheReset ? (/(\?.*)$/.test(l_element.url) ? '&' : '?') + Date.now() : ''), type, l_options.ajaxProperty,
                        function (result, data, timestamp) {
                            if (result === 'success') {
                                // save content
                                if (type === 'ajax') {
                                    l_element.content = f_string_to_node(data.responseText);
                                } else {
                                    l_element.content = l_element.source;
                                };

                                l_element.timestamp = timestamp;

                                l_element.is_get = true;
                            } else if (result === 'error') {
                                l_element.content = f_text_get_value(l_options.lang, 'error');

                                l_element.is_error = true;
                            };

                            l_element.is_loading = false;

                            if (callback) {
                                callback(result);
                            };
                        }
                    );

                    return;

                case 'find' :
                    // save content
                    l_element.content = document.getElementById(l_element.url.slice(1));
                    l_element.source = document.createElement('div');

                    if (l_element.content) {
                        l_element.is_get = true;
                    } else {
                        l_element.content = f_text_get_value(l_options.lang, 'error');

                        l_element.is_error = true;
                    };

                    break;

                case 'iframe' :
                    // save content
                    l_element.content = document.createElement('iframe');
                    l_element.content.src = l_element.url;

                    l_element.content.setAttribute('allowfullscreen', true);

                    l_element.is_get = true;

                    break;

                case 'html' :
                    // save content
                    if (typeof l_element.content === 'string') {
                        l_element.content = f_string_to_node(l_element.content);
                    } else {
                        l_element.content = f_toarray(l_element.content);
                    };

                    l_element.is_get = true;

                    break;
            };
        };

        if (callback) {
            callback((l_element.is_error) ? 'error' : 'success');
        };
    };

    function f_elements_create (data, nodes, options) {
        var prop = {},
            url_list,
            result = [];

        for (var i = 0, l = Math.max(data.length, nodes.length); i < l; i++) {
            if (nodes[i]) {
                if (nodes[i].hasAttribute(options.urlAttr)) {
                    prop.url = nodes[i].getAttribute(options.urlAttr);
                };
                if (nodes[i].hasAttribute(options.titleAttr)) {
                    prop.title = nodes[i].getAttribute(options.titleAttr);
                };
                if (nodes[i].hasAttribute(options.typeAttr)) {
                    prop.type = nodes[i].getAttribute(options.typeAttr);
                };
                if (nodes[i].hasAttribute(options.groupAttr)) {
                    prop.group = nodes[i].getAttribute(options.groupAttr);
                };

                prop.node = nodes[i];
            };

            if (data[i]) {
                if (data[i].url) {
                    prop.url = data[i].url;
                };
                if (data[i].title) {
                    prop.title = data[i].title;
                };
                if (data[i].content) {
                    prop.content = data[i].content;
                };
                if (data[i].type) {
                    prop.type = data[i].type;
                };
                if (data[i].group) {
                    prop.group = data[i].group;
                };
            };

            if (prop.url) {
                prop.url = prop.url.replace(/(^\s+)|(\s+$)/g, '');
            };
            if (prop.group) {
                prop.group = 'c_'+ f_string_clear(prop.group);
            };

            if (options.makeMultiUrl && prop.url) {
                url_list = prop.url.split(',');

                delete prop.content;

                for (var j = 0, k = url_list.length; j < k; j++) {
                    prop.url = url_list[j].replace(/(^\s+)|(\s+$)/g, '');

                    result.push(f_element_create(prop));

                    if (!j) {
                        delete prop.node;
                    };
                };
            } else {
                result.push(f_element_create(prop));
            };

            prop = {};
        };

        return result;
    };


    var v_window = {
        'id' : '',
        'is_enabled' : true,
        'is_init' : false,
        'is_bind' : false,
        'is_open' : false,
        'is_ready' : false,
        'is_active' : false,
        'is_loading' : false,
        'is_set' : false,
        'is_first' : false,
        'is_last' : false,
        'is_bind' : false,
        'group' : '',
        'elements' : [],
        'elements_total' : 0,
        'element_current' : '',
        'element_current_index' : 0,
        'element_pre' : '',
        'element_pre_index' : 0,
        'options' : {}
    };

    var v_window_stack = {};

    function f_window_create (data) {
        data = data || {};

        data.id = v_gstring_create(8);

        v_window_stack[data.id] = f_extend(v_window, data);

        return v_window_stack[data.id];
    };

    function f_window_remove (id) {
        v_window_stack[id] = null;
    };

    function f_window_get (id) {
        return v_window_stack[id];
    };

    function f_window_template_create (l_window, l_options) {
        // localize template
        var template_source = l_options.template.replace(
            /\{\{\s?(\w+)\s?\}\}/g,
            function (s, a) {
                var value = f_text_get_value(l_options.lang, a);
                return (value) ? value : '';
            }
        );

        // create node structure
        var template = f_string_to_fragment(template_source);

        l_window.node_window = f_findnode(template, '.'+ v_name.sel_window);
        l_window.node_wrapper = f_findnode(template, '.'+ v_name.sel_wrapper);
        l_window.node_title = f_findnode(template, '.'+ v_name.sel_title);
        l_window.node_content = f_findnode(template, '.'+ v_name.sel_content);
        l_window.node_prev = f_findnodes(template, '.'+ v_name.sel_prev);
        l_window.node_next = f_findnodes(template, '.'+ v_name.sel_next);
        l_window.node_current = f_findnodes(template, '.'+ v_name.sel_current);
        l_window.node_total = f_findnodes(template, '.'+ v_name.sel_total);

        if (l_options.bindto instanceof Node) {
            l_window.node_place = l_options.bindto;
        } else {
            l_window.node_place = f_getnode(l_options.bindto);
        };

        // delete nav buttons if navigation not need
        if (!l_options.makeCombine) {
            if (l_window.node_prev) {
                f_removenode(l_window.node_prev);
            };
            if (l_window.node_next) {
                f_removenode(l_window.node_next);
            };
        };

        // set class
        f_addclass(l_window.node_window, l_options.classWindow);
    };

    function f_window_navigation_update (l_window, l_options) {
        // set classes for navigation
        if (!l_options.makeLoop) {
            if (l_window.is_first) {
                f_addclass(l_window.node_prev, v_name.class_disabled);
            } else {
                f_removeclass(l_window.node_prev, v_name.class_disabled);
            };
            if (l_window.is_last) {
                f_addclass(l_window.node_next, v_name.class_disabled);
            } else {
                f_removeclass(l_window.node_next, v_name.class_disabled);
            };
        };
    };

    function f_window_open (l_window, l_options) {
        if (l_window.is_open) {
            return;
        };

        // change tail if need
        if (l_options.makeTail) {
            f_tail_add(l_window.id);
        };

        // block body if need
        if (l_options.makeBlockPage) {
            if (!v_blockpage) {
                f_addclass(v_html, v_name.class_block);
            };
            
            v_blockpage++;
        };

        // add node to page
        f_addnode(l_window.node_place, l_window.node_window);

        // set active class
        f_addclass(l_window.node_window, v_name.class_active);

        // set class
        f_addclass(v_html, l_options.classBody);

        if (l_options.onOpen) {
            l_options.onOpen(that);
        };

        l_window.is_active = true;
        l_window.is_open = true;
    };

    function f_window_close (l_window, l_options) {
        if (!l_window.is_open) {
            return;
        };

        if (l_options.onClose) {
            l_options.onClose(that);
        };

        // change tail if need
        if (l_options.makeTail) {
            f_tail_remove(l_window.id);
        };

        // unblock body if need
        if (l_options.makeBlockPage && l_window.is_active) {
            v_blockpage--;

            if (!v_blockpage) {
                f_removeclass(v_html, v_name.class_block);
            };
        };

        // remove node from page
        f_removenode(l_window.node_window);

        // unset active class
        f_removeclass(l_window.node_window, v_name.class_active);

        // unset class
        f_removeclass(v_html, l_options.classBody);

        l_window.is_active = false;
        l_window.is_open = false;
    };

    function f_window_show (l_window, l_options) {
        if (l_window.is_active) {
            return;
        };

        // change tail if need
        if (l_options.makeTail) {
            // hide prev window
            if (v_tail_current && (v_tail_current !== l_window.id)) {
                leafage_object.create(v_tail_current).hide();
            };

            // set current
            v_tail_current = l_window.id;
        };

        // block body if need
        if (l_options.makeBlockPage) {
            if (!v_blockpage) {
                f_addclass(v_html, v_name.class_block);
            };

            v_blockpage++;
        };

        // unset inactive class
        f_removeclass(l_window.node_window, v_name.class_inactive);

        // unset active class
        f_addclass(l_window.node_window, v_name.class_active);

        l_window.is_active = true;
    };

    function f_window_hide (l_window, l_options) {
        if (!l_window.is_active) {
            return;
        };

        // change tail if need
        if (l_options.makeTail) {
            // set current
            v_tail_current = '';
        };

        // unblock body if need
        if (l_options.makeBlockPage) {
            v_blockpage--;

            if (!v_blockpage) {
                f_removeclass(v_html, v_name.class_block);
            };
        };

        // unset active class
        f_removeclass(l_window.node_window, v_name.class_active);

        // unset inactive class
        f_addclass(l_window.node_window, v_name.class_inactive);

        l_window.is_active = false;
    };

    function f_window_set (l_window, l_element, l_options) {
        if (l_element.is_active) {
            return;
        };

        if (l_element.title) {
            // add title to window
            f_addnode(l_window.node_title, l_element.title);
        } else {
            // set disabled class
            f_addclass(l_window.node_title, v_name.class_disabled);
        };

        // add count to window
        f_addnode(l_window.node_current, (l_window.element_current_index + 1).toString());
        f_addnode(l_window.node_total, l_window.elements_total.toString());

        if (l_window.elements_total === 1) {
            // set alone class
            f_addclass(l_window.node_window, v_name.class_alone);
        };

        if (l_options.onSet) {
            l_options.onSet(that);
        };

        l_element.is_active = true;
        l_window.is_set = true;
    };

    function f_window_unset (l_window, l_element, l_options) {
        if (!l_element.is_active) {
            return;
        };

        if (l_options.onUnset) {
            l_options.onUnset(that);
        };

        var type = l_element.type || l_options.type;

        if (l_element.is_set) {
            // check error status
            if (l_element.is_error) {
                // unset error class
                f_removeclass(l_window.node_window, v_name.class_error);
            } else {
                // unset type class
                f_removeclass(l_window.node_window, v_name.class_type +'_'+ type);

                // remove helper node
                if (type === 'find') {
                    f_beforenode(l_element.source, l_element.content);
                    f_removenode(l_element.source);
                } else if (type === 'image') {
                    if (l_window.node_wrapper) {
                        l_window.node_wrapper.style.maxWidth = '';
                        l_window.node_wrapper.style.maxHeight = '';
                    };
                };
            };
        };

        if (l_element.title) {
            // clear title node
            f_empty(l_window.node_title);
        } else {
            // unset disabled class
            f_removeclass(l_window.node_title, v_name.class_disabled);
        };

        // clear content nodes
        f_empty(l_window.node_content);

        // remove count to window
        f_empty(l_window.node_current);
        f_empty(l_window.node_total);

        if (l_window.elements_total === 1) {
            // unset alone class
            f_removeclass(l_window.node_window, v_name.class_alone);
        };

        l_element.is_set = false;
        l_element.is_active = false;
        l_window.is_set = false;
    };

    function f_window_content_set (l_window, l_element, l_options) {
        if (l_element.is_set) {
            return;
        };

        var type = l_element.type || l_options.type;

        if (l_element.is_error) {
            // set error classs
            f_addclass(l_window.node_window, v_name.class_error);
        } else {
            // set type class
            f_addclass(l_window.node_window, v_name.class_type +'_'+ type);

            // add helper node
            if (type === 'find') {
                f_beforenode(l_element.content, l_element.source);
            } else if (type === 'image') {
                if (l_window.node_wrapper) {
                    l_window.node_wrapper.style.maxWidth = l_element.content.naturalWidth +'px';
                    /*l_window.node_wrapper.style.maxHeight = l_element.content.naturalHeight +'px';*/
                };
            };
        };

        // add content to window
        f_addnode(l_window.node_content, l_element.content);

        l_element.is_set = true;
    };


    function leafage_object () {
        var that = this,
            arg = arguments;

        // recreate if leafage_object was init without new
        if (!(that instanceof leafage_object)) {
            return new leafage_object('FLAG_RECREATE', arg);
        } else if (arg[0] && (arg[0] === 'FLAG_RECREATE')) {
            arg = arg[1];
        };

        that.stack = [];

        // return empty leafage_object if no arguments
        if (!arg.length) {
            return that;
        };

        // find arguments
        var data = [],
            prop = {},
            nodes = [];

        for (var i = 0, l = Math.min(4, arg.length); i < l; i++) {
            if (!arg[i]) {
                continue;
            } else if (f_isarray(arg[i])) {
                data = arg[i];
            } else if ((arg[i] instanceof Node) || (arg[i][0] instanceof Node)) {
                nodes = f_toarray(arg[i]);
            } else if (f_isobject(arg[i])) {
                prop = arg[i];
            };
        };

        // create options
        var l_options = f_mod_get(prop.mod, prop);

        l_options.group = 'c_'+ f_string_clear(l_options.group);
        l_options.makeLocalWait = (l_options.makeTail) ? false : l_options.makeLocalWait;

        // create elements
        var l_elements = f_elements_create(data, nodes, l_options);

        // separation of the elements
        var groups = {},
            group = '';

        if (l_options.makeGrouping) {
            for (var j = 0, k = l_elements.length; j < k; j++) {
                group = l_elements[j].group || l_options.group;

                if (!groups[group]) {
                    groups[group] = [];
                };

                groups[group].push(l_elements[j].id);
            };
        } else {
            groups[l_options.group] = [];

            for (var j = 0, k = l_elements.length; j < k; j++) {
                groups[l_options.group].push(l_elements[j].id);
            };
        };

        // create window for each group
        var l_window;

        for (group in groups) {
            if (!groups.hasOwnProperty(group)) {
                continue;
            };
            
            l_window = f_window_create({
                'group' : group,
                'elements' : groups[group],
                'elements_total' : groups[group].length,
                'options' : l_options
            });

            that.stack.push(l_window.id);
        };

        that.init();

        if (l_options.makeEventBind) {
            that.bind();
        };

        // create classes once
        if (!v_classes_done) {
            f_classes_create();
        };

        return that;
    };

    leafage_object.prototype.get = function (marker) {
        var that = this;

        if (that.stack.length < 2) {
            return that;
        } else {
            marker = f_array_get_item(that.stack, marker);

            return leafage_object.create(marker);
        };
    };

    leafage_object.prototype.each = function (func, arg) {
        var that = this;

        if (f_isfunction(func)) {
            for (var i = 0, l = that.stack.length; i < l; i++) {
                func.apply(that.get(i), arg);
            };
        };

        return that;
    };

    leafage_object.prototype.info = function () {
        var that = this;

        if (that.stack.length !== 1) {
            return that.each(that.info, arguments);
        };

        return f_window_get(that.stack[0]);
    };

    leafage_object.prototype.init = function () {
        var that = this;

        if (that.stack.length !== 1) {
            return that.each(that.init, arguments);
        };

        var l_window = f_window_get(that.stack[0]),
            l_options = l_window.options,
            l_elements = f_element_get(l_window.elements);

        f_window_template_create(l_window, l_options);

        for (var j = 0, k = l_window.elements_total; j < k; j++) {
            if (l_elements[j].node) {
                l_elements[j].node.setAttribute(v_name.attr_id, l_elements[j].id);
                l_elements[j].node.setAttribute(v_name.attr_window, l_window.id);
            };

            if (l_options.makeTypeDetect) {
                f_element_type_detect(l_elements[j], l_options.type);
            };
        };

        l_window.element_current = l_window.elements[l_window.element_current_index];
        l_window.element_pre = l_window.elements[l_window.element_pre_index];

        l_window.is_init = true;

        if (l_options.onInit) {
            l_options.onInit(that);
        };

        return that;
    };

    leafage_object.prototype.bind = function () {
        var that = this;

        if (that.stack.length !== 1) {
            return that.each(that.bind, arguments);
        };

        var l_window = f_window_get(that.stack[0]),
            l_options = l_window.options,
            l_elements = f_element_get(l_window.elements);

        if (!l_window.is_bind) {
            l_window.bind_click = function (event) {
                if (l_options.makePrevent) {
                    event.preventDefault();
                };

                var node = event.target;

                if (f_hasclass(node, v_name.sel_shut)) {
                    that.close();

                    return;
                };

                f_find_in_parents(
                    node,
                    [v_name.sel_close, v_name.sel_prev, v_name.sel_next, v_name.sel_accept, v_name.sel_cancel],
                    v_name.sel_window,
                    function (result, target, selector) {
                        if (!result) {
                            return;
                        };

                        switch (selector) {
                            case v_name.sel_close :
                                that.close();

                                break;
                            case v_name.sel_prev :
                                that.prev();

                                break;
                            case v_name.sel_next :
                                that.next();

                                break;
                            case v_name.sel_accept :
                                if (l_options.onAccept) {
                                    l_options.onAccept();
                                };

                                break;
                            case v_name.sel_cancel :
                                if (l_options.onCancel) {
                                    l_options.onCancel();
                                };

                                break;
                        };
                    }
                );
            };

            l_window.bind_open = function (event) {
                if (l_options.makePrevent) {
                    event.preventDefault();
                };

                var marker = this.getAttribute(v_name.attr_id);

                that.open(marker);
            };

            f_addevent(l_window.node_window, v_name.event_click, l_window.bind_click);
        };

        for (var j = 0, k = l_window.elements_total; j < k; j++) {
            if (!l_elements[j].is_bind && l_elements[j].node) {
                f_addevent(l_elements[j].node, v_name.event_click, l_window.bind_open);

                l_elements[j].is_bind = true;
            };
        };

        l_window.is_bind = true;

        return that;
    };

    leafage_object.prototype.unbind = function () {
        var that = this;

        if (that.stack.length !== 1) {
            return that.each(that.unbind, arguments);
        };

        var l_window = f_window_get(that.stack[0]),
            l_options = l_window.options,
            l_elements = f_element_get(l_window.elements);

        if (l_window.is_bind) {
            f_removeevent(l_window.node_window, v_name.event_click, l_window.bind_click);

            for (var j = 0, k = l_window.elements_total; j < k; j++) {
                if (l_elements[j].is_bind && l_elements[j].node) {
                    f_removeevent(l_elements[j].node, v_name.event_click, l_window.bind_open);

                    l_elements[j].is_bind = false;
                };
            };

            l_window.is_bind = false;
        };

        return that;
    };

    leafage_object.prototype.open = function (marker) {
        var that = this;

        if (that.stack.length !== 1) {
            return that.each(that.open, arguments);
        };

        var l_window = f_window_get(that.stack[0]),
            l_options = l_window.options;

        if (l_window.is_open) {
            return that.show();
        };

        if (l_window.is_enabled) {
            if (!l_window.is_init) {
                that.init();
            };

            if (l_options.makeTail && v_tail_current && (v_tail_current !== l_window.id)) {
                leafage_object.create(v_tail_current).hide();
            };

            f_window_open(l_window, l_options);

            that.load(marker);
        };

        return that;
    };

    leafage_object.prototype.close = function () {
        var that = this;

        if (that.stack.length !== 1) {
            return that.each(that.close, arguments);
        };

        var l_window = f_window_get(that.stack[0]),
            l_options = l_window.options;

        if (l_window.is_enabled) {
            f_window_close(l_window, l_options);

            if (l_options.makeTail && v_tail_current && (v_tail_current !== l_window.id)) {
                leafage_object.create(v_tail_current).show();
            };

            that.unset();
        };

        return that;
    };

    leafage_object.prototype.show = function () {
        var that = this;

        if (that.stack.length !== 1) {
            return that.each(that.show, arguments);
        };

        var l_window = f_window_get(that.stack[0]),
            l_options = l_window.options;

        if (l_window.is_enabled) {
            if (l_options.makeTail && v_tail_current && (v_tail_current !== l_window.id)) {
                leafage_object.create(v_tail_current).hide();
            };

            f_window_show(l_window, l_options);
        };

        return that;
    };

    leafage_object.prototype.hide = function () {
        var that = this;

        if (that.stack.length !== 1) {
            return that.each(that.hide, arguments);
        };

        var l_window = f_window_get(that.stack[0]),
            l_options = l_window.options;

        if (l_window.is_enabled) {
            f_window_hide(l_window, l_options);
        };

        return that;
    };

    leafage_object.prototype.load = function (marker) {
        var that = this;

        if (that.stack.length !== 1) {
            return that.each(that.load, arguments);
        };

        var l_window = f_window_get(that.stack[0]),
            l_options = l_window.options;

        marker = f_array_get_item(l_window.elements, marker) || l_window.elements[0];

        var l_element = f_element_get(marker);

        if (l_window.is_enabled && !l_element.is_loading && !l_element.is_active && marker) {
            if (l_window.is_loading) {
                f_element_get(l_window.element_pre).source.cancel();
            };

            l_window.element_pre = marker;
            l_window.element_pre_index = l_window.elements.indexOf(marker);

            that.set();

            f_addclass(l_window.node_window, v_name.class_load);

            l_window.is_loading = true;

            f_element_load(
                l_element,
                l_options,
                function (result) {
                    f_removeclass(l_window.node_window, v_name.class_load);

                    l_window.is_loading = false;

                    if (result !== 'abort') {
                        f_window_content_set(l_window, l_element, l_options);
                    };
                }
            );
        };

        return that;
    };

    leafage_object.prototype.abort = function () {
        var that = this;

        if (that.stack.length !== 1) {
            return that.each(that.abort, arguments);
        };

        var l_window = f_window_get(that.stack[0]),
            l_options = l_window.options;

        var l_element = f_element_get(l_window.element_pre);

        if (l_element.is_loading) {
            l_element.source.cancel();
        };

        return that;
    };

    leafage_object.prototype.prev = function () {
        var that = this;

        if (that.stack.length !== 1) {
            return that.each(that.prev, arguments);
        };

        var l_window = f_window_get(that.stack[0]),
            l_options = l_window.options;

        var marker = l_window.element_pre_index - 1;

        if (l_window.is_enabled) {
            if (marker < 0) {
                if (l_options.makeLoop) {
                    marker = l_window.elements_total - 1;
                } else {
                    marker = 0;
                };
            };

            that.load(marker);
        };

        return that;
    };

    leafage_object.prototype.next = function () {
        var that = this;

        if (that.stack.length !== 1) {
            return that.each(that.next, arguments);
        };

        var l_window = f_window_get(that.stack[0]),
            l_options = l_window.options;

        var marker = l_window.element_pre_index + 1;

        if (l_window.is_enabled) {
            if (marker >= l_window.elements_total) {
                if (l_options.makeLoop) {
                    marker = 0;
                } else {
                    marker = l_window.elements_total - 1;
                };
            };

            that.load(marker);
        };

        return that;
    };

    leafage_object.prototype.set = function (marker) {
        var that = this;

        if (that.stack.length !== 1) {
            return that.each(that.set, arguments);
        };

        var l_window = f_window_get(that.stack[0]),
            l_options = l_window.options;

        marker = f_array_get_item(l_window.elements, marker) || l_window.element_pre;

        var l_element = f_element_get(marker);

        if (l_window.is_enabled && !l_element.is_active && marker) {
            if (l_window.is_set) {
                that.unset();
            };

            l_window.element_current = marker;
            l_window.element_current_index = l_window.elements.indexOf(marker);
            l_window.is_first = (l_window.element_current_index === 0);
            l_window.is_last = (l_window.element_current_index === l_window.elements_total - 1);

            f_window_set(l_window, l_element, l_options);

            f_window_navigation_update(l_window, l_options);
        };

        return that;
    };

    leafage_object.prototype.unset = function (marker) {
        var that = this;

        if (that.stack.length !== 1) {
            return that.each(that.unset, arguments);
        };

        var l_window = f_window_get(that.stack[0]),
            l_options = l_window.options;

        marker = f_array_get_item(l_window.elements, marker) || l_window.element_current;

        var l_element = f_element_get(marker);

        if (l_window.is_enabled && l_element.is_active) {
            f_window_unset(l_window, l_element, l_options);
        };

        return that;
    };

    leafage_object.prototype.enabled = function () {
        var that = this;

        if (that.stack.length !== 1) {
            return that.each(that.enabled, arguments);
        };

        var l_window = f_window_get(that.stack[0]);

        l_window.is_enabled = true;

        return that;
    };

    leafage_object.prototype.disabled = function () {
        var that = this;

        if (that.stack.length !== 1) {
            return that.each(that.disabled, arguments);
        };

        var l_window = f_window_get(that.stack[0]);

        l_window.is_enabled = false;

        return that;
    };

    leafage_object.prototype.update = function () {
        var that = this;

        if (that.stack.length !== 1) {
            return that.each(that.update, arguments);
        };

        var l_window = f_window_get(that.stack[0]),
            l_options = l_window.options;

        l_window.elements_total = l_window.elements.length;
        l_window.element_current_index = l_window.elements.indexOf(l_window.element_current);
        l_window.element_pre_index = l_window.elements.indexOf(l_window.element_pre);

        if (l_window.element_current_index === -1) {
            l_window.element_current =  '';
            l_window.element_current_index =  0;
        };
        if (l_window.element_pre_index === -1) {
            l_window.element_pre =  '';
            l_window.element_pre_index =  0;
        };

        l_window.is_first = (l_window.element_current_index === 0);
        l_window.is_last = (l_window.element_current_index === l_window.elements_total - 1);

        if (l_window.is_active) {
            that.load();
        };

        return that;
    };

    leafage_object.prototype.destory = function () {
        var that = this;

        if (that.stack.length !== 1) {
            return that.each(that.destory, arguments);
        };

        var l_window = f_window_get(that.stack[0]),
            l_options = l_window.options,
            l_elements = f_element_get(l_window.elements);

        for (var j = 0, k = l_window.elements_total; j < k; j++) {
            if (l_elements[j].node) {
                l_elements[j].node.removeAttribute(v_name.attr_id);
                l_elements[j].node.removeAttribute(v_name.attr_window);
            };
        };

        if (l_options.makeEventBind) {
            that.unbind();
        };

        f_element_remove(l_window.elements);

        l_window.elements = [];
        
        that.update();

        return that;
    };

    leafage_object.prototype.addElements = function (node, data, place) {
        var that = this;

        if (that.stack.length !== 1) {
            return that.each(that.addElement, arguments);
        };

        var l_window = f_window_get(that.stack[0]),
            l_options = l_window.options;

        var l_elements = f_elements_create(f_toarray(data), f_toarray(node), l_options);

        for (var i = 0, l = l_elements.length; i < l; i++) {
            if (l_elements[i].node) {
                l_elements[i].node.setAttribute(v_name.attr_id, l_elements[i].id);
                l_elements[i].node.setAttribute(v_name.attr_window, l_window.id);
            };

            if (l_options.makeTypeDetect) {
                f_element_type_detect(l_elements[i], l_options.type);
            };
        };

        var group = '';

        switch (place) {
            case 'before' :
                for (var j = l_elements.length - 1, k = 0; j >= k; j--) {
                    group = l_elements[j].group || l_window.group;

                    if (!l_options.makeGrouping || (l_options.makeGrouping && (group === l_window.group))) {
                        l_window.elements.unshift(l_elements[j].id);
                    };
                };

                break;

            case 'after' :
            default :
                for (var j = 0, k = l_elements.length; j < k; j++) {
                    group = l_elements[j].group || l_window.group;

                    if (!l_options.makeGrouping || (l_options.makeGrouping && (group === l_window.group))) {
                        l_window.elements.push(l_elements[j].id);
                    };
                };

                break;
        };

        that.update();

        if (l_options.makeEventBind) {
            that.bind();
        };

        return that;
    };

    /*\
     *  @return {String} returns info about plugin
    \*/
    leafage_object.info = function () {
        return v_info.name +' v'+ v_info.version +' by '+ v_info.author;
    };

    /*\
     *  @param {String|Array} stack
     *  @return {leafage_object} returns created leafage_object with set stack
    \*/
    leafage_object.create = function (stack) {
        var result = new leafage_object();

        if (f_isarray(stack) && stack.length) {
            result.stack = stack;
        } else if ((typeof stack === 'string') && v_window_stack[stack]) {
            result.stack = [stack];
        };

        return result;
    };

    /*\
     *  @param {String} name
     *  @param {Object} data
     *  @return {Object} returns added mod
    \*/
    leafage_object.addMod = function (name, data) {
        return f_mod_add(name, data);
    };

    /*\
     *  @param {String} name
     *  @return {Object} returns selected mod
    \*/
    leafage_object.getMod = function (name) {
        return f_mod_get(name);
    };

    /*\
     *  @return {Array} returns the list of existing mods
    \*/
    leafage_object.getModList = function () {
        return f_mod_get_list();
    };

    /*\
     *  @param {String} name
     *  @param {Object} data
     *  @return {Object} returns added languages
    \*/
    leafage_object.addText = function (name, data) {
        return f_text_add(name, data);
    };

    /*\
     *  @param {String} name
     *  @return {Object} returns selected languages
    \*/
    leafage_object.getText = function (name) {
        return f_text_get(name);
    };

    /*\
     *  @return {Array} returns the list of existing languages
    \*/
    leafage_object.getTextList = function () {
        return f_text_get_list();
    };

    /*\
     *  @return {Array} returns new object with list of opened windows in stack
    \*/
    leafage_object.getTail = function () {
        return leafage_object.create(f_tail_get_list());
    };


    window.Leafage = leafage_object;

})();
