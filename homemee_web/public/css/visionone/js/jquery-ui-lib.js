! function(t, e) {
    function i(e, i) {
        var n,
            a,
            o,
            r = e.nodeName.toLowerCase();
        return 'area' === r ? (n = e.parentNode, a = n.name, e.href && a && 'map' === n.nodeName.toLowerCase() ? (o = t('img[usemap=#' + a + ']')[0], !!o && s(o)) : !1) : (/input|select|textarea|button|object/.test(r) ? !e.disabled : 'a' === r ? e.href || i : i) && s(e)
    }

    function s(e) {
        return t.expr.filters.visible(e) && !t(e).parents().addBack().filter(function() {
            return 'hidden' === t.css(this, 'visibility')
        }).length
    }
    var n = 0,
        a = /^ui-id-\d+$/;
    t.ui = t.ui || {},
        t.extend(t.ui, {
            version: '1.10.3',
            keyCode: {
                BACKSPACE: 8,
                COMMA: 188,
                DELETE: 46,
                DOWN: 40,
                END: 35,
                ENTER: 13,
                ESCAPE: 27,
                HOME: 36,
                LEFT: 37,
                NUMPAD_ADD: 107,
                NUMPAD_DECIMAL: 110,
                NUMPAD_DIVIDE: 111,
                NUMPAD_ENTER: 108,
                NUMPAD_MULTIPLY: 106,
                NUMPAD_SUBTRACT: 109,
                PAGE_DOWN: 34,
                PAGE_UP: 33,
                PERIOD: 190,
                RIGHT: 39,
                SPACE: 32,
                TAB: 9,
                UP: 38
            }
        }),
        t.fn.extend({
            focus: function(e) {
                return function(i, s) {
                    return 'number' == typeof i ? this.each(function() {
                        var e = this;
                        setTimeout(function() {
                            t(e).focus(),
                            s && s.call(e)
                        }, i)
                    }) : e.apply(this, arguments)
                }
            }(t.fn.focus),
            scrollParent: function() {
                var e;
                return e = t.ui.ie && /(static|relative)/.test(this.css('position')) || /absolute/.test(this.css('position')) ? this.parents().filter(function() {
                    return /(relative|absolute|fixed)/.test(t.css(this, 'position')) && /(auto|scroll)/.test(t.css(this, 'overflow') + t.css(this, 'overflow-y') + t.css(this, 'overflow-x'))
                }).eq(0) : this.parents().filter(function() {
                    return /(auto|scroll)/.test(t.css(this, 'overflow') + t.css(this, 'overflow-y') + t.css(this, 'overflow-x'))
                }).eq(0),
                    /fixed/.test(this.css('position')) || !e.length ? t(document) : e
            },
            zIndex: function(i) {
                if (i !== e) return this.css('zIndex', i);
                if (this.length)
                    for (var s, n, a = t(this[0]); a.length && a[0] !== document;) {
                        if (s = a.css('position'), ('absolute' === s || 'relative' === s || 'fixed' === s) && (n = parseInt(a.css('zIndex'), 10), !isNaN(n) && 0 !== n)) return n;
                        a = a.parent()
                    }
                return 0
            },
            uniqueId: function() {
                return this.each(function() {
                    this.id || (this.id = 'ui-id-' + ++n)
                })
            },
            removeUniqueId: function() {
                return this.each(function() {
                    a.test(this.id) && t(this).removeAttr('id')
                })
            }
        }),
        t.extend(t.expr[':'], {
            data: t.expr.createPseudo ? t.expr.createPseudo(function(e) {
                return function(i) {
                    return !!t.data(i, e)
                }
            }) : function(e, i, s) {
                return !!t.data(e, s[3])
            },
            focusable: function(e) {
                return i(e, !isNaN(t.attr(e, 'tabindex')))
            },
            tabbable: function(e) {
                var s = t.attr(e, 'tabindex'),
                    n = isNaN(s);
                return (n || s >= 0) && i(e, !n)
            }
        }),
    t('<a>').outerWidth(1).jquery || t.each(['Width',
        'Height'
    ], function(i, s) {
        function n(e, i, s, n) {
            return t.each(a, function() {
                i -= parseFloat(t.css(e, 'padding' + this)) || 0,
                s && (i -= parseFloat(t.css(e, 'border' + this + 'Width')) || 0),
                n && (i -= parseFloat(t.css(e, 'margin' + this)) || 0)
            }),
                i
        }
        var a = 'Width' === s ? [
                'Left',
                'Right'
            ] : [
                'Top',
                'Bottom'
            ],
            o = s.toLowerCase(),
            r = {
                innerWidth: t.fn.innerWidth,
                innerHeight: t.fn.innerHeight,
                outerWidth: t.fn.outerWidth,
                outerHeight: t.fn.outerHeight
            };
        t.fn['inner' + s] = function(i) {
            return i === e ? r['inner' + s].call(this) : this.each(function() {
                t(this).css(o, n(this, i) + 'px')
            })
        },
            t.fn['outer' + s] = function(e, i) {
                return 'number' != typeof e ? r['outer' + s].call(this, e) : this.each(function() {
                    t(this).css(o, n(this, e, !0, i) + 'px')
                })
            }
    }),
    t.fn.addBack || (t.fn.addBack = function(t) {
        return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
    }),
    t('<a>').data('a-b', 'a').removeData('a-b').data('a-b') && (t.fn.removeData = function(e) {
        return function(i) {
            return arguments.length ? e.call(this, t.camelCase(i)) : e.call(this)
        }
    }(t.fn.removeData)),
        t.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()),
        t.support.selectstart = 'onselectstart' in document.createElement('div'),
        t.fn.extend({
            disableSelection: function() {
                return this.bind((t.support.selectstart ? 'selectstart' : 'mousedown') + '.ui-disableSelection', function(t) {
                    t.preventDefault()
                })
            },
            enableSelection: function() {
                return this.unbind('.ui-disableSelection')
            }
        }),
        t.extend(t.ui, {
            plugin: {
                add: function(e, i, s) {
                    var n,
                        a = t.ui[e].prototype;
                    for (n in s) a.plugins[n] = a.plugins[n] || [],
                        a.plugins[n].push([i,
                            s[n]
                        ])
                },
                call: function(t, e, i) {
                    var s,
                        n = t.plugins[e];
                    if (n && t.element[0].parentNode && 11 !== t.element[0].parentNode.nodeType)
                        for (s = 0; s < n.length; s++) t.options[n[s][0]] && n[s][1].apply(t.element, i)
                }
            },
            hasScroll: function(e, i) {
                if ('hidden' === t(e).css('overflow')) return !1;
                var s = i && 'left' === i ? 'scrollLeft' : 'scrollTop',
                    n = !1;
                return e[s] > 0 ? !0 : (e[s] = 1, n = e[s] > 0, e[s] = 0, n)
            }
        })
}(jQuery),
    function(t, e) {
        var i = 0,
            s = Array.prototype.slice,
            n = t.cleanData;
        t.cleanData = function(e) {
            for (var i, s = 0; null != (i = e[s]); s++) try {
                t(i).triggerHandler('remove')
            } catch (a) {}
            n(e)
        },
            t.widget = function(e, i, s) {
                var n,
                    a,
                    o,
                    r,
                    h = {},
                    l = e.split('.')[0];
                e = e.split('.')[1],
                    n = l + '-' + e,
                s || (s = i, i = t.Widget),
                    t.expr[':'][n.toLowerCase()] = function(e) {
                        return !!t.data(e, n)
                    },
                    t[l] = t[l] || {},
                    a = t[l][e],
                    o = t[l][e] = function(t, e) {
                        return this._createWidget ? void(arguments.length && this._createWidget(t, e)) : new o(t, e)
                    },
                    t.extend(o, a, {
                        version: s.version,
                        _proto: t.extend({}, s),
                        _childConstructors: []
                    }),
                    r = new i,
                    r.options = t.widget.extend({}, r.options),
                    t.each(s, function(e, s) {
                        return t.isFunction(s) ? void(h[e] = function() {
                            var t = function() {
                                    return i.prototype[e].apply(this, arguments)
                                },
                                n = function(t) {
                                    return i.prototype[e].apply(this, t)
                                };
                            return function() {
                                var e,
                                    i = this._super,
                                    a = this._superApply;
                                return this._super = t,
                                    this._superApply = n,
                                    e = s.apply(this, arguments),
                                    this._super = i,
                                    this._superApply = a,
                                    e
                            }
                        }()) : void(h[e] = s)
                    }),
                    o.prototype = t.widget.extend(r, {
                        widgetEventPrefix: a ? r.widgetEventPrefix : e
                    }, h, {
                        constructor: o,
                        namespace: l,
                        widgetName: e,
                        widgetFullName: n
                    }),
                    a ? (t.each(a._childConstructors, function(e, i) {
                        var s = i.prototype;
                        t.widget(s.namespace + '.' + s.widgetName, o, i._proto)
                    }), delete a._childConstructors) : i._childConstructors.push(o),
                    t.widget.bridge(e, o)
            },
            t.widget.extend = function(i) {
                for (var n, a, o = s.call(arguments, 1), r = 0, h = o.length; h > r; r++)
                    for (n in o[r]) a = o[r][n],
                    o[r].hasOwnProperty(n) && a !== e && (i[n] = t.isPlainObject(a) ? t.isPlainObject(i[n]) ? t.widget.extend({}, i[n], a) : t.widget.extend({}, a) : a);
                return i
            },
            t.widget.bridge = function(i, n) {
                var a = n.prototype.widgetFullName || i;
                t.fn[i] = function(o) {
                    var r = 'string' == typeof o,
                        h = s.call(arguments, 1),
                        l = this;
                    return o = !r && h.length ? t.widget.extend.apply(null, [
                        o
                    ].concat(h)) : o,
                        this.each(r ? function() {
                            var s,
                                n = t.data(this, a);
                            return n ? t.isFunction(n[o]) && '_' !== o.charAt(0) ? (s = n[o].apply(n, h), s !== n && s !== e ? (l = s && s.jquery ? l.pushStack(s.get()) : s, !1) : void 0) : t.error('no such method \'' + o + '\' for ' + i + ' widget instance') : t.error('cannot call methods on ' + i + ' prior to initialization; attempted to call method \'' + o + '\'')
                        } : function() {
                            var e = t.data(this, a);
                            e ? e.option(o || {})._init() : t.data(this, a, new n(o, this))
                        }),
                        l
                }
            },
            t.Widget = function() {},
            t.Widget._childConstructors = [],
            t.Widget.prototype = {
                widgetName: 'widget',
                widgetEventPrefix: '',
                defaultElement: '<div>',
                options: {
                    disabled: !1,
                    create: null
                },
                _createWidget: function(e, s) {
                    s = t(s || this.defaultElement || this)[0],
                        this.element = t(s),
                        this.uuid = i++,
                        this.eventNamespace = '.' + this.widgetName + this.uuid,
                        this.options = t.widget.extend({}, this.options, this._getCreateOptions(), e),
                        this.bindings = t(),
                        this.hoverable = t(),
                        this.focusable = t(),
                    s !== this && (t.data(s, this.widgetFullName, this), this._on(!0, this.element, {
                        remove: function(t) {
                            t.target === s && this.destroy()
                        }
                    }), this.document = t(s.style ? s.ownerDocument : s.document || s), this.window = t(this.document[0].defaultView || this.document[0].parentWindow)),
                        this._create(),
                        this._trigger('create', null, this._getCreateEventData()),
                        this._init()
                },
                _getCreateOptions: t.noop,
                _getCreateEventData: t.noop,
                _create: t.noop,
                _init: t.noop,
                destroy: function() {
                    this._destroy(),
                        this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(t.camelCase(this.widgetFullName)),
                        this.widget().unbind(this.eventNamespace).removeAttr('aria-disabled').removeClass(this.widgetFullName + '-disabled ui-state-disabled'),
                        this.bindings.unbind(this.eventNamespace),
                        this.hoverable.removeClass('ui-state-hover'),
                        this.focusable.removeClass('ui-state-focus')
                },
                _destroy: t.noop,
                widget: function() {
                    return this.element
                },
                option: function(i, s) {
                    var n,
                        a,
                        o,
                        r = i;
                    if (0 === arguments.length) return t.widget.extend({}, this.options);
                    if ('string' == typeof i)
                        if (r = {}, n = i.split('.'), i = n.shift(), n.length) {
                            for (a = r[i] = t.widget.extend({}, this.options[i]), o = 0; o < n.length - 1; o++) a[n[o]] = a[n[o]] || {},
                                a = a[n[o]];
                            if (i = n.pop(), s === e) return a[i] === e ? null : a[i];
                            a[i] = s
                        } else {
                            if (s === e) return this.options[i] === e ? null : this.options[i];
                            r[i] = s
                        }
                    return this._setOptions(r),
                        this
                },
                _setOptions: function(t) {
                    var e;
                    for (e in t) this._setOption(e, t[e]);
                    return this
                },
                _setOption: function(t, e) {
                    return this.options[t] = e,
                    'disabled' === t && (this.widget().toggleClass(this.widgetFullName + '-disabled ui-state-disabled', !!e).attr('aria-disabled', e), this.hoverable.removeClass('ui-state-hover'), this.focusable.removeClass('ui-state-focus')),
                        this
                },
                enable: function() {
                    return this._setOption('disabled', !1)
                },
                disable: function() {
                    return this._setOption('disabled', !0)
                },
                _on: function(e, i, s) {
                    var n,
                        a = this;
                    'boolean' != typeof e && (s = i, i = e, e = !1),
                        s ? (i = n = t(i), this.bindings = this.bindings.add(i)) : (s = i, i = this.element, n = this.widget()),
                        t.each(s, function(s, o) {
                            function r() {
                                return e || a.options.disabled !== !0 && !t(this).hasClass('ui-state-disabled') ? ('string' == typeof o ? a[o] : o).apply(a, arguments) : void 0
                            }
                            'string' != typeof o && (r.guid = o.guid = o.guid || r.guid || t.guid++);
                            var h = s.match(/^(\w+)\s*(.*)$/),
                                l = h[1] + a.eventNamespace,
                                c = h[2];
                            c ? n.delegate(c, l, r) : i.bind(l, r)
                        })
                },
                _off: function(t, e) {
                    e = (e || '').split(' ').join(this.eventNamespace + ' ') + this.eventNamespace,
                        t.unbind(e).undelegate(e)
                },
                _delay: function(t, e) {
                    function i() {
                        return ('string' == typeof t ? s[t] : t).apply(s, arguments)
                    }
                    var s = this;
                    return setTimeout(i, e || 0)
                },
                _hoverable: function(e) {
                    this.hoverable = this.hoverable.add(e),
                        this._on(e, {
                            mouseenter: function(e) {
                                t(e.currentTarget).addClass('ui-state-hover')
                            },
                            mouseleave: function(e) {
                                t(e.currentTarget).removeClass('ui-state-hover')
                            }
                        })
                },
                _focusable: function(e) {
                    this.focusable = this.focusable.add(e),
                        this._on(e, {
                            focusin: function(e) {
                                t(e.currentTarget).addClass('ui-state-focus')
                            },
                            focusout: function(e) {
                                t(e.currentTarget).removeClass('ui-state-focus')
                            }
                        })
                },
                _trigger: function(e, i, s) {
                    var n,
                        a,
                        o = this.options[e];
                    if (s = s || {}, i = t.Event(i), i.type = (e === this.widgetEventPrefix ? e : this.widgetEventPrefix + e).toLowerCase(), i.target = this.element[0], a = i.originalEvent)
                        for (n in a) n in i || (i[n] = a[n]);
                    return this.element.trigger(i, s), !(t.isFunction(o) && o.apply(this.element[0], [
                        i
                    ].concat(s)) === !1 || i.isDefaultPrevented())
                }
            },
            t.each({
                show: 'fadeIn',
                hide: 'fadeOut'
            }, function(e, i) {
                t.Widget.prototype['_' + e] = function(s, n, a) {
                    'string' == typeof n && (n = {
                        effect: n
                    });
                    var o,
                        r = n ? n === !0 || 'number' == typeof n ? i : n.effect || i : e;
                    n = n || {},
                    'number' == typeof n && (n = {
                        duration: n
                    }),
                        o = !t.isEmptyObject(n),
                        n.complete = a,
                    n.delay && s.delay(n.delay),
                        o && t.effects && t.effects.effect[r] ? s[e](n) : r !== e && s[r] ? s[r](n.duration, n.easing, a) : s.queue(function(i) {
                            t(this)[e](),
                            a && a.call(s[0]),
                                i()
                        })
                }
            })
    }(jQuery),
    function(t) {
        var e = !1;
        t(document).mouseup(function() {
            e = !1
        }),
            t.widget('ui.mouse', {
                version: '1.10.3',
                options: {
                    cancel: 'input,textarea,button,select,option',
                    distance: 1,
                    delay: 0
                },
                _mouseInit: function() {
                    var e = this;
                    this.element.bind('mousedown.' + this.widgetName, function(t) {
                        return e._mouseDown(t)
                    }).bind('click.' + this.widgetName, function(i) {
                        return !0 === t.data(i.target, e.widgetName + '.preventClickEvent') ? (t.removeData(i.target, e.widgetName + '.preventClickEvent'), i.stopImmediatePropagation(), !1) : void 0
                    }),
                        this.started = !1
                },
                _mouseDestroy: function() {
                    this.element.unbind('.' + this.widgetName),
                    this._mouseMoveDelegate && t(document).unbind('mousemove.' + this.widgetName, this._mouseMoveDelegate).unbind('mouseup.' + this.widgetName, this._mouseUpDelegate)
                },
                _mouseDown: function(i) {
                    if (!e) {
                        this._mouseStarted && this._mouseUp(i),
                            this._mouseDownEvent = i;
                        var s = this,
                            n = 1 === i.which,
                            a = 'string' == typeof this.options.cancel && i.target.nodeName ? t(i.target).closest(this.options.cancel).length : !1;
                        return n && !a && this._mouseCapture(i) ? (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
                            s.mouseDelayMet = !0
                        }, this.options.delay)), this._mouseDistanceMet(i) && this._mouseDelayMet(i) && (this._mouseStarted = this._mouseStart(i) !== !1, !this._mouseStarted) ? (i.preventDefault(), !0) : (!0 === t.data(i.target, this.widgetName + '.preventClickEvent') && t.removeData(i.target, this.widgetName + '.preventClickEvent'), this._mouseMoveDelegate = function(t) {
                            return s._mouseMove(t)
                        }, this._mouseUpDelegate = function(t) {
                            return s._mouseUp(t)
                        }, t(document).bind('mousemove.' + this.widgetName, this._mouseMoveDelegate).bind('mouseup.' + this.widgetName, this._mouseUpDelegate), i.preventDefault(), e = !0, !0)) : !0
                    }
                },
                _mouseMove: function(e) {
                    return t.ui.ie && (!document.documentMode || document.documentMode < 9) && !e.button ? this._mouseUp(e) : this._mouseStarted ? (this._mouseDrag(e), e.preventDefault()) : (this._mouseDistanceMet(e) && this._mouseDelayMet(e) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, e) !== !1, this._mouseStarted ? this._mouseDrag(e) : this._mouseUp(e)), !this._mouseStarted)
                },
                _mouseUp: function(e) {
                    return t(document).unbind('mousemove.' + this.widgetName, this._mouseMoveDelegate).unbind('mouseup.' + this.widgetName, this._mouseUpDelegate),
                    this._mouseStarted && (this._mouseStarted = !1, e.target === this._mouseDownEvent.target && t.data(e.target, this.widgetName + '.preventClickEvent', !0), this._mouseStop(e)), !1
                },
                _mouseDistanceMet: function(t) {
                    return Math.max(Math.abs(this._mouseDownEvent.pageX - t.pageX), Math.abs(this._mouseDownEvent.pageY - t.pageY)) >= this.options.distance
                },
                _mouseDelayMet: function() {
                    return this.mouseDelayMet
                },
                _mouseStart: function() {},
                _mouseDrag: function() {},
                _mouseStop: function() {},
                _mouseCapture: function() {
                    return !0
                }
            })
    }(jQuery),
    function(t, e) {
        function i(t, e, i) {
            return [parseFloat(t[0]) * (p.test(t[0]) ? e / 100 : 1),
                parseFloat(t[1]) * (p.test(t[1]) ? i / 100 : 1)
            ]
        }

        function s(e, i) {
            return parseInt(t.css(e, i), 10) || 0
        }

        function n(e) {
            var i = e[0];
            return 9 === i.nodeType ? {
                width: e.width(),
                height: e.height(),
                offset: {
                    top: 0,
                    left: 0
                }
            } : t.isWindow(i) ? {
                width: e.width(),
                height: e.height(),
                offset: {
                    top: e.scrollTop(),
                    left: e.scrollLeft()
                }
            } : i.preventDefault ? {
                width: 0,
                height: 0,
                offset: {
                    top: i.pageY,
                    left: i.pageX
                }
            } : {
                width: e.outerWidth(),
                height: e.outerHeight(),
                offset: e.offset()
            }
        }
        t.ui = t.ui || {};
        var a,
            o = Math.max,
            r = Math.abs,
            h = Math.round,
            l = /left|center|right/,
            c = /top|center|bottom/,
            u = /[\+\-]\d+(\.[\d]+)?%?/,
            d = /^\w+/,
            p = /%$/,
            f = t.fn.position;
        t.position = {
            scrollbarWidth: function() {
                if (a !== e) return a;
                var i,
                    s,
                    n = t('<div style=\'display:block;width:50px;height:50px;overflow:hidden;\'><div style=\'height:100px;width:auto;\'></div></div>'),
                    o = n.children()[0];
                return t('body').append(n),
                    i = o.offsetWidth,
                    n.css('overflow', 'scroll'),
                    s = o.offsetWidth,
                i === s && (s = n[0].clientWidth),
                    n.remove(),
                    a = i - s
            },
            getScrollInfo: function(e) {
                var i = e.isWindow ? '' : e.element.css('overflow-x'),
                    s = e.isWindow ? '' : e.element.css('overflow-y'),
                    n = 'scroll' === i || 'auto' === i && e.width < e.element[0].scrollWidth,
                    a = 'scroll' === s || 'auto' === s && e.height < e.element[0].scrollHeight;
                return {
                    width: a ? t.position.scrollbarWidth() : 0,
                    height: n ? t.position.scrollbarWidth() : 0
                }
            },
            getWithinInfo: function(e) {
                var i = t(e || window),
                    s = t.isWindow(i[0]);
                return {
                    element: i,
                    isWindow: s,
                    offset: i.offset() || {
                        left: 0,
                        top: 0
                    },
                    scrollLeft: i.scrollLeft(),
                    scrollTop: i.scrollTop(),
                    width: s ? i.width() : i.outerWidth(),
                    height: s ? i.height() : i.outerHeight()
                }
            }
        },
            t.fn.position = function(e) {
                if (!e || !e.of) return f.apply(this, arguments);
                e = t.extend({}, e);
                var a,
                    p,
                    g,
                    m,
                    _,
                    v,
                    b = t(e.of),
                    y = t.position.getWithinInfo(e.within),
                    w = t.position.getScrollInfo(y),
                    k = (e.collision || 'flip').split(' '),
                    D = {};
                return v = n(b),
                b[0].preventDefault && (e.at = 'left top'),
                    p = v.width,
                    g = v.height,
                    m = v.offset,
                    _ = t.extend({}, m),
                    t.each(['my',
                        'at'
                    ], function() {
                        var t,
                            i,
                            s = (e[this] || '').split(' ');
                        1 === s.length && (s = l.test(s[0]) ? s.concat(['center']) : c.test(s[0]) ? [
                            'center'
                        ].concat(s) : [
                            'center',
                            'center'
                        ]),
                            s[0] = l.test(s[0]) ? s[0] : 'center',
                            s[1] = c.test(s[1]) ? s[1] : 'center',
                            t = u.exec(s[0]),
                            i = u.exec(s[1]),
                            D[this] = [
                                t ? t[0] : 0,
                                i ? i[0] : 0
                            ],
                            e[this] = [
                                d.exec(s[0])[0],
                                d.exec(s[1])[0]
                            ]
                    }),
                1 === k.length && (k[1] = k[0]),
                    'right' === e.at[0] ? _.left += p : 'center' === e.at[0] && (_.left += p / 2),
                    'bottom' === e.at[1] ? _.top += g : 'center' === e.at[1] && (_.top += g / 2),
                    a = i(D.at, p, g),
                    _.left += a[0],
                    _.top += a[1],
                    this.each(function() {
                        var n,
                            l,
                            c = t(this),
                            u = c.outerWidth(),
                            d = c.outerHeight(),
                            f = s(this, 'marginLeft'),
                            v = s(this, 'marginTop'),
                            x = u + f + s(this, 'marginRight') + w.width,
                            C = d + v + s(this, 'marginBottom') + w.height,
                            I = t.extend({}, _),
                            P = i(D.my, c.outerWidth(), c.outerHeight());
                        'right' === e.my[0] ? I.left -= u : 'center' === e.my[0] && (I.left -= u / 2),
                            'bottom' === e.my[1] ? I.top -= d : 'center' === e.my[1] && (I.top -= d / 2),
                            I.left += P[0],
                            I.top += P[1],
                        t.support.offsetFractions || (I.left = h(I.left), I.top = h(I.top)),
                            n = {
                                marginLeft: f,
                                marginTop: v
                            },
                            t.each(['left',
                                'top'
                            ], function(i, s) {
                                t.ui.position[k[i]] && t.ui.position[k[i]][s](I, {
                                    targetWidth: p,
                                    targetHeight: g,
                                    elemWidth: u,
                                    elemHeight: d,
                                    collisionPosition: n,
                                    collisionWidth: x,
                                    collisionHeight: C,
                                    offset: [
                                        a[0] + P[0],
                                        a[1] + P[1]
                                    ],
                                    my: e.my,
                                    at: e.at,
                                    within: y,
                                    elem: c
                                })
                            }),
                        e.using && (l = function(t) {
                            var i = m.left - I.left,
                                s = i + p - u,
                                n = m.top - I.top,
                                a = n + g - d,
                                h = {
                                    target: {
                                        element: b,
                                        left: m.left,
                                        top: m.top,
                                        width: p,
                                        height: g
                                    },
                                    element: {
                                        element: c,
                                        left: I.left,
                                        top: I.top,
                                        width: u,
                                        height: d
                                    },
                                    horizontal: 0 > s ? 'left' : i > 0 ? 'right' : 'center',
                                    vertical: 0 > a ? 'top' : n > 0 ? 'bottom' : 'middle'
                                };
                            u > p && r(i + s) < p && (h.horizontal = 'center'),
                            d > g && r(n + a) < g && (h.vertical = 'middle'),
                                h.important = o(r(i), r(s)) > o(r(n), r(a)) ? 'horizontal' : 'vertical',
                                e.using.call(this, t, h)
                        }),
                            c.offset(t.extend(I, {
                                using: l
                            }))
                    })
            },
            t.ui.position = {
                fit: {
                    left: function(t, e) {
                        var i,
                            s = e.within,
                            n = s.isWindow ? s.scrollLeft : s.offset.left,
                            a = s.width,
                            r = t.left - e.collisionPosition.marginLeft,
                            h = n - r,
                            l = r + e.collisionWidth - a - n;
                        e.collisionWidth > a ? h > 0 && 0 >= l ? (i = t.left + h + e.collisionWidth - a - n, t.left += h - i) : t.left = l > 0 && 0 >= h ? n : h > l ? n + a - e.collisionWidth : n : h > 0 ? t.left += h : l > 0 ? t.left -= l : t.left = o(t.left - r, t.left)
                    },
                    top: function(t, e) {
                        var i,
                            s = e.within,
                            n = s.isWindow ? s.scrollTop : s.offset.top,
                            a = e.within.height,
                            r = t.top - e.collisionPosition.marginTop,
                            h = n - r,
                            l = r + e.collisionHeight - a - n;
                        e.collisionHeight > a ? h > 0 && 0 >= l ? (i = t.top + h + e.collisionHeight - a - n, t.top += h - i) : t.top = l > 0 && 0 >= h ? n : h > l ? n + a - e.collisionHeight : n : h > 0 ? t.top += h : l > 0 ? t.top -= l : t.top = o(t.top - r, t.top)
                    }
                },
                flip: {
                    left: function(t, e) {
                        var i,
                            s,
                            n = e.within,
                            a = n.offset.left + n.scrollLeft,
                            o = n.width,
                            h = n.isWindow ? n.scrollLeft : n.offset.left,
                            l = t.left - e.collisionPosition.marginLeft,
                            c = l - h,
                            u = l + e.collisionWidth - o - h,
                            d = 'left' === e.my[0] ? -e.elemWidth : 'right' === e.my[0] ? e.elemWidth : 0,
                            p = 'left' === e.at[0] ? e.targetWidth : 'right' === e.at[0] ? -e.targetWidth : 0,
                            f = -2 * e.offset[0];
                        0 > c ? (i = t.left + d + p + f + e.collisionWidth - o - a, (0 > i || i < r(c)) && (t.left += d + p + f)) : u > 0 && (s = t.left - e.collisionPosition.marginLeft + d + p + f - h, (s > 0 || r(s) < u) && (t.left += d + p + f))
                    },
                    top: function(t, e) {
                        var i,
                            s,
                            n = e.within,
                            a = n.offset.top + n.scrollTop,
                            o = n.height,
                            h = n.isWindow ? n.scrollTop : n.offset.top,
                            l = t.top - e.collisionPosition.marginTop,
                            c = l - h,
                            u = l + e.collisionHeight - o - h,
                            d = 'top' === e.my[1],
                            p = d ? -e.elemHeight : 'bottom' === e.my[1] ? e.elemHeight : 0,
                            f = 'top' === e.at[1] ? e.targetHeight : 'bottom' === e.at[1] ? -e.targetHeight : 0,
                            g = -2 * e.offset[1];
                        0 > c ? (s = t.top + p + f + g + e.collisionHeight - o - a, t.top + p + f + g > c && (0 > s || s < r(c)) && (t.top += p + f + g)) : u > 0 && (i = t.top - e.collisionPosition.marginTop + p + f + g - h, t.top + p + f + g > u && (i > 0 || r(i) < u) && (t.top += p + f + g))
                    }
                },
                flipfit: {
                    left: function() {
                        t.ui.position.flip.left.apply(this, arguments),
                            t.ui.position.fit.left.apply(this, arguments)
                    },
                    top: function() {
                        t.ui.position.flip.top.apply(this, arguments),
                            t.ui.position.fit.top.apply(this, arguments)
                    }
                }
            },
            function() {
                var e,
                    i,
                    s,
                    n,
                    a,
                    o = document.getElementsByTagName('body')[0],
                    r = document.createElement('div');
                e = document.createElement(o ? 'div' : 'body'),
                    s = {
                        visibility: 'hidden',
                        width: 0,
                        height: 0,
                        border: 0,
                        margin: 0,
                        background: 'none'
                    },
                o && t.extend(s, {
                    position: 'absolute',
                    left: '-1000px',
                    top: '-1000px'
                });
                for (a in s) e.style[a] = s[a];
                e.appendChild(r),
                    i = o || document.documentElement,
                    i.insertBefore(e, i.firstChild),
                    r.style.cssText = 'position: absolute; left: 10.7432222px;',
                    n = t(r).offset().left,
                    t.support.offsetFractions = n > 10 && 11 > n,
                    e.innerHTML = '',
                    i.removeChild(e)
            }()
    }(jQuery),
    function(t) {
        t.widget('ui.draggable', t.ui.mouse, {
            version: '1.10.3',
            widgetEventPrefix: 'drag',
            options: {
                addClasses: !0,
                appendTo: 'parent',
                axis: !1,
                connectToSortable: !1,
                containment: !1,
                cursor: 'auto',
                cursorAt: !1,
                grid: !1,
                handle: !1,
                helper: 'original',
                iframeFix: !1,
                opacity: !1,
                refreshPositions: !1,
                revert: !1,
                revertDuration: 500,
                scope: 'default',
                scroll: !0,
                scrollSensitivity: 20,
                scrollSpeed: 20,
                snap: !1,
                snapMode: 'both',
                snapTolerance: 20,
                stack: !1,
                zIndex: !1,
                drag: null,
                start: null,
                stop: null
            },
            _create: function() {
                'original' !== this.options.helper || /^(?:r|a|f)/.test(this.element.css('position')) || (this.element[0].style.position = 'relative'),
                this.options.addClasses && this.element.addClass('ui-draggable'),
                this.options.disabled && this.element.addClass('ui-draggable-disabled'),
                    this._mouseInit()
            },
            _destroy: function() {
                this.element.removeClass('ui-draggable ui-draggable-dragging ui-draggable-disabled'),
                    this._mouseDestroy()
            },
            _mouseCapture: function(e) {
                var i = this.options;
                return this.helper || i.disabled || t(e.target).closest('.ui-resizable-handle').length > 0 ? !1 : (this.handle = this._getHandle(e), this.handle ? (t(i.iframeFix === !0 ? 'iframe' : i.iframeFix).each(function() {
                    t('<div class=\'ui-draggable-iframeFix\' style=\'background: #fff;\'></div>').css({
                        width: this.offsetWidth + 'px',
                        height: this.offsetHeight + 'px',
                        position: 'absolute',
                        opacity: '0.001',
                        zIndex: 1000
                    }).css(t(this).offset()).appendTo('body')
                }), !0) : !1)
            },
            _mouseStart: function(e) {
                var i = this.options;
                return this.helper = this._createHelper(e),
                    this.helper.addClass('ui-draggable-dragging'),
                    this._cacheHelperProportions(),
                t.ui.ddmanager && (t.ui.ddmanager.current = this),
                    this._cacheMargins(),
                    this.cssPosition = this.helper.css('position'),
                    this.scrollParent = this.helper.scrollParent(),
                    this.offsetParent = this.helper.offsetParent(),
                    this.offsetParentCssPosition = this.offsetParent.css('position'),
                    this.offset = this.positionAbs = this.element.offset(),
                    this.offset = {
                        top: this.offset.top - this.margins.top,
                        left: this.offset.left - this.margins.left
                    },
                    this.offset.scroll = !1,
                    t.extend(this.offset, {
                        click: {
                            left: e.pageX - this.offset.left,
                            top: e.pageY - this.offset.top
                        },
                        parent: this._getParentOffset(),
                        relative: this._getRelativeOffset()
                    }),
                    this.originalPosition = this.position = this._generatePosition(e),
                    this.originalPageX = e.pageX,
                    this.originalPageY = e.pageY,
                i.cursorAt && this._adjustOffsetFromHelper(i.cursorAt),
                    this._setContainment(),
                    this._trigger('start', e) === !1 ? (this._clear(), !1) : (this._cacheHelperProportions(), t.ui.ddmanager && !i.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e), this._mouseDrag(e, !0), t.ui.ddmanager && t.ui.ddmanager.dragStart(this, e), !0)
            },
            _mouseDrag: function(e, i) {
                if ('fixed' === this.offsetParentCssPosition && (this.offset.parent = this._getParentOffset()), this.position = this._generatePosition(e), this.positionAbs = this._convertPositionTo('absolute'), !i) {
                    var s = this._uiHash();
                    if (this._trigger('drag', e, s) === !1) return this._mouseUp({}), !1;
                    this.position = s.position
                }
                return this.options.axis && 'y' === this.options.axis || (this.helper[0].style.left = this.position.left + 'px'),
                this.options.axis && 'x' === this.options.axis || (this.helper[0].style.top = this.position.top + 'px'),
                t.ui.ddmanager && t.ui.ddmanager.drag(this, e), !1
            },
            _mouseStop: function(e) {
                var i = this,
                    s = !1;
                return t.ui.ddmanager && !this.options.dropBehaviour && (s = t.ui.ddmanager.drop(this, e)),
                this.dropped && (s = this.dropped, this.dropped = !1),
                    'original' !== this.options.helper || t.contains(this.element[0].ownerDocument, this.element[0]) ? ('invalid' === this.options.revert && !s || 'valid' === this.options.revert && s || this.options.revert === !0 || t.isFunction(this.options.revert) && this.options.revert.call(this.element, s) ? t(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
                        i._trigger('stop', e) !== !1 && i._clear()
                    }) : this._trigger('stop', e) !== !1 && this._clear(), !1) : !1
            },
            _mouseUp: function(e) {
                return t('div.ui-draggable-iframeFix').each(function() {
                    this.parentNode.removeChild(this)
                }),
                t.ui.ddmanager && t.ui.ddmanager.dragStop(this, e),
                    t.ui.mouse.prototype._mouseUp.call(this, e)
            },
            cancel: function() {
                return this.helper.is('.ui-draggable-dragging') ? this._mouseUp({}) : this._clear(),
                    this
            },
            _getHandle: function(e) {
                return this.options.handle ? !!t(e.target).closest(this.element.find(this.options.handle)).length : !0
            },
            _createHelper: function(e) {
                var i = this.options,
                    s = t.isFunction(i.helper) ? t(i.helper.apply(this.element[0], [
                        e
                    ])) : 'clone' === i.helper ? this.element.clone().removeAttr('id') : this.element;
                return s.parents('body').length || s.appendTo('parent' === i.appendTo ? this.element[0].parentNode : i.appendTo),
                s[0] === this.element[0] || /(fixed|absolute)/.test(s.css('position')) || s.css('position', 'absolute'),
                    s
            },
            _adjustOffsetFromHelper: function(e) {
                'string' == typeof e && (e = e.split(' ')),
                t.isArray(e) && (e = {
                    left: +e[0],
                    top: +e[1] || 0
                }),
                'left' in e && (this.offset.click.left = e.left + this.margins.left),
                'right' in e && (this.offset.click.left = this.helperProportions.width - e.right + this.margins.left),
                'top' in e && (this.offset.click.top = e.top + this.margins.top),
                'bottom' in e && (this.offset.click.top = this.helperProportions.height - e.bottom + this.margins.top)
            },
            _getParentOffset: function() {
                var e = this.offsetParent.offset();
                return 'absolute' === this.cssPosition && this.scrollParent[0] !== document && t.contains(this.scrollParent[0], this.offsetParent[0]) && (e.left += this.scrollParent.scrollLeft(), e.top += this.scrollParent.scrollTop()), (this.offsetParent[0] === document.body || this.offsetParent[0].tagName && 'html' === this.offsetParent[0].tagName.toLowerCase() && t.ui.ie) && (e = {
                    top: 0,
                    left: 0
                }), {
                    top: e.top + (parseInt(this.offsetParent.css('borderTopWidth'), 10) || 0),
                    left: e.left + (parseInt(this.offsetParent.css('borderLeftWidth'), 10) || 0)
                }
            },
            _getRelativeOffset: function() {
                if ('relative' === this.cssPosition) {
                    var t = this.element.position();
                    return {
                        top: t.top - (parseInt(this.helper.css('top'), 10) || 0) + this.scrollParent.scrollTop(),
                        left: t.left - (parseInt(this.helper.css('left'), 10) || 0) + this.scrollParent.scrollLeft()
                    }
                }
                return {
                    top: 0,
                    left: 0
                }
            },
            _cacheMargins: function() {
                this.margins = {
                    left: parseInt(this.element.css('marginLeft'), 10) || 0,
                    top: parseInt(this.element.css('marginTop'), 10) || 0,
                    right: parseInt(this.element.css('marginRight'), 10) || 0,
                    bottom: parseInt(this.element.css('marginBottom'), 10) || 0
                }
            },
            _cacheHelperProportions: function() {
                this.helperProportions = {
                    width: this.helper.outerWidth(),
                    height: this.helper.outerHeight()
                }
            },
            _setContainment: function() {
                var e,
                    i,
                    s,
                    n = this.options;
                return n.containment ? 'window' === n.containment ? void(this.containment = [
                    t(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left,
                    t(window).scrollTop() - this.offset.relative.top - this.offset.parent.top,
                    t(window).scrollLeft() + t(window).width() - this.helperProportions.width - this.margins.left,
                    t(window).scrollTop() + (t(window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top
                ]) : 'document' === n.containment ? void(this.containment = [
                    0,
                    0,
                    t(document).width() - this.helperProportions.width - this.margins.left, (t(document).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top
                ]) : n.containment.constructor === Array ? void(this.containment = n.containment) : ('parent' === n.containment && (n.containment = this.helper[0].parentNode), i = t(n.containment), s = i[0], void(s && (e = 'hidden' !== i.css('overflow'), this.containment = [
                    (parseInt(i.css('borderLeftWidth'), 10) || 0) + (parseInt(i.css('paddingLeft'), 10) || 0), (parseInt(i.css('borderTopWidth'), 10) || 0) + (parseInt(i.css('paddingTop'), 10) || 0), (e ? Math.max(s.scrollWidth, s.offsetWidth) : s.offsetWidth) - (parseInt(i.css('borderRightWidth'), 10) || 0) - (parseInt(i.css('paddingRight'), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (e ? Math.max(s.scrollHeight, s.offsetHeight) : s.offsetHeight) - (parseInt(i.css('borderBottomWidth'), 10) || 0) - (parseInt(i.css('paddingBottom'), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom
                ], this.relative_container = i))) : void(this.containment = null)
            },
            _convertPositionTo: function(e, i) {
                i || (i = this.position);
                var s = 'absolute' === e ? 1 : -1,
                    n = 'absolute' !== this.cssPosition || this.scrollParent[0] !== document && t.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent;
                return this.offset.scroll || (this.offset.scroll = {
                    top: n.scrollTop(),
                    left: n.scrollLeft()
                }), {
                    top: i.top + this.offset.relative.top * s + this.offset.parent.top * s - ('fixed' === this.cssPosition ? -this.scrollParent.scrollTop() : this.offset.scroll.top) * s,
                    left: i.left + this.offset.relative.left * s + this.offset.parent.left * s - ('fixed' === this.cssPosition ? -this.scrollParent.scrollLeft() : this.offset.scroll.left) * s
                }
            },
            _generatePosition: function(e) {
                var i,
                    s,
                    n,
                    a,
                    o = this.options,
                    r = 'absolute' !== this.cssPosition || this.scrollParent[0] !== document && t.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
                    h = e.pageX,
                    l = e.pageY;
                return this.offset.scroll || (this.offset.scroll = {
                    top: r.scrollTop(),
                    left: r.scrollLeft()
                }),
                this.originalPosition && (this.containment && (this.relative_container ? (s = this.relative_container.offset(), i = [
                    this.containment[0] + s.left,
                    this.containment[1] + s.top,
                    this.containment[2] + s.left,
                    this.containment[3] + s.top
                ]) : i = this.containment, e.pageX - this.offset.click.left < i[0] && (h = i[0] + this.offset.click.left), e.pageY - this.offset.click.top < i[1] && (l = i[1] + this.offset.click.top), e.pageX - this.offset.click.left > i[2] && (h = i[2] + this.offset.click.left), e.pageY - this.offset.click.top > i[3] && (l = i[3] + this.offset.click.top)), o.grid && (n = o.grid[1] ? this.originalPageY + Math.round((l - this.originalPageY) / o.grid[1]) * o.grid[1] : this.originalPageY, l = i ? n - this.offset.click.top >= i[1] || n - this.offset.click.top > i[3] ? n : n - this.offset.click.top >= i[1] ? n - o.grid[1] : n + o.grid[1] : n, a = o.grid[0] ? this.originalPageX + Math.round((h - this.originalPageX) / o.grid[0]) * o.grid[0] : this.originalPageX, h = i ? a - this.offset.click.left >= i[0] || a - this.offset.click.left > i[2] ? a : a - this.offset.click.left >= i[0] ? a - o.grid[0] : a + o.grid[0] : a)), {
                    top: l - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ('fixed' === this.cssPosition ? -this.scrollParent.scrollTop() : this.offset.scroll.top),
                    left: h - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ('fixed' === this.cssPosition ? -this.scrollParent.scrollLeft() : this.offset.scroll.left)
                }
            },
            _clear: function() {
                this.helper.removeClass('ui-draggable-dragging'),
                this.helper[0] === this.element[0] || this.cancelHelperRemoval || this.helper.remove(),
                    this.helper = null,
                    this.cancelHelperRemoval = !1
            },
            _trigger: function(e, i, s) {
                return s = s || this._uiHash(),
                    t.ui.plugin.call(this, e, [
                        i,
                        s
                    ]),
                'drag' === e && (this.positionAbs = this._convertPositionTo('absolute')),
                    t.Widget.prototype._trigger.call(this, e, i, s)
            },
            plugins: {},
            _uiHash: function() {
                return {
                    helper: this.helper,
                    position: this.position,
                    originalPosition: this.originalPosition,
                    offset: this.positionAbs
                }
            }
        }),
            t.ui.plugin.add('draggable', 'connectToSortable', {
                start: function(e, i) {
                    var s = t(this).data('ui-draggable'),
                        n = s.options,
                        a = t.extend({}, i, {
                            item: s.element
                        });
                    s.sortables = [],
                        t(n.connectToSortable).each(function() {
                            var i = t.data(this, 'ui-sortable');
                            i && !i.options.disabled && (s.sortables.push({
                                instance: i,
                                shouldRevert: i.options.revert
                            }), i.refreshPositions(), i._trigger('activate', e, a))
                        })
                },
                stop: function(e, i) {
                    var s = t(this).data('ui-draggable'),
                        n = t.extend({}, i, {
                            item: s.element
                        });
                    t.each(s.sortables, function() {
                        this.instance.isOver ? (this.instance.isOver = 0, s.cancelHelperRemoval = !0, this.instance.cancelHelperRemoval = !1, this.shouldRevert && (this.instance.options.revert = this.shouldRevert), this.instance._mouseStop(e), this.instance.options.helper = this.instance.options._helper, 'original' === s.options.helper && this.instance.currentItem.css({
                            top: 'auto',
                            left: 'auto'
                        })) : (this.instance.cancelHelperRemoval = !1, this.instance._trigger('deactivate', e, n))
                    })
                },
                drag: function(e, i) {
                    var s = t(this).data('ui-draggable'),
                        n = this;
                    t.each(s.sortables, function() {
                        var a = !1,
                            o = this;
                        this.instance.positionAbs = s.positionAbs,
                            this.instance.helperProportions = s.helperProportions,
                            this.instance.offset.click = s.offset.click,
                        this.instance._intersectsWith(this.instance.containerCache) && (a = !0, t.each(s.sortables, function() {
                            return this.instance.positionAbs = s.positionAbs,
                                this.instance.helperProportions = s.helperProportions,
                                this.instance.offset.click = s.offset.click,
                            this !== o && this.instance._intersectsWith(this.instance.containerCache) && t.contains(o.instance.element[0], this.instance.element[0]) && (a = !1),
                                a
                        })),
                            a ? (this.instance.isOver || (this.instance.isOver = 1, this.instance.currentItem = t(n).clone().removeAttr('id').appendTo(this.instance.element).data('ui-sortable-item', !0), this.instance.options._helper = this.instance.options.helper, this.instance.options.helper = function() {
                                return i.helper[0]
                            }, e.target = this.instance.currentItem[0], this.instance._mouseCapture(e, !0), this.instance._mouseStart(e, !0, !0), this.instance.offset.click.top = s.offset.click.top, this.instance.offset.click.left = s.offset.click.left, this.instance.offset.parent.left -= s.offset.parent.left - this.instance.offset.parent.left, this.instance.offset.parent.top -= s.offset.parent.top - this.instance.offset.parent.top, s._trigger('toSortable', e), s.dropped = this.instance.element, s.currentItem = s.element, this.instance.fromOutside = s), this.instance.currentItem && this.instance._mouseDrag(e)) : this.instance.isOver && (this.instance.isOver = 0, this.instance.cancelHelperRemoval = !0, this.instance.options.revert = !1, this.instance._trigger('out', e, this.instance._uiHash(this.instance)), this.instance._mouseStop(e, !0), this.instance.options.helper = this.instance.options._helper, this.instance.currentItem.remove(), this.instance.placeholder && this.instance.placeholder.remove(), s._trigger('fromSortable', e), s.dropped = !1)
                    })
                }
            }),
            t.ui.plugin.add('draggable', 'cursor', {
                start: function() {
                    var e = t('body'),
                        i = t(this).data('ui-draggable').options;
                    e.css('cursor') && (i._cursor = e.css('cursor')),
                        e.css('cursor', i.cursor)
                },
                stop: function() {
                    var e = t(this).data('ui-draggable').options;
                    e._cursor && t('body').css('cursor', e._cursor)
                }
            }),
            t.ui.plugin.add('draggable', 'opacity', {
                start: function(e, i) {
                    var s = t(i.helper),
                        n = t(this).data('ui-draggable').options;
                    s.css('opacity') && (n._opacity = s.css('opacity')),
                        s.css('opacity', n.opacity)
                },
                stop: function(e, i) {
                    var s = t(this).data('ui-draggable').options;
                    s._opacity && t(i.helper).css('opacity', s._opacity)
                }
            }),
            t.ui.plugin.add('draggable', 'scroll', {
                start: function() {
                    var e = t(this).data('ui-draggable');
                    e.scrollParent[0] !== document && 'HTML' !== e.scrollParent[0].tagName && (e.overflowOffset = e.scrollParent.offset())
                },
                drag: function(e) {
                    var i = t(this).data('ui-draggable'),
                        s = i.options,
                        n = !1;
                    i.scrollParent[0] !== document && 'HTML' !== i.scrollParent[0].tagName ? (s.axis && 'x' === s.axis || (i.overflowOffset.top + i.scrollParent[0].offsetHeight - e.pageY < s.scrollSensitivity ? i.scrollParent[0].scrollTop = n = i.scrollParent[0].scrollTop + s.scrollSpeed : e.pageY - i.overflowOffset.top < s.scrollSensitivity && (i.scrollParent[0].scrollTop = n = i.scrollParent[0].scrollTop - s.scrollSpeed)), s.axis && 'y' === s.axis || (i.overflowOffset.left + i.scrollParent[0].offsetWidth - e.pageX < s.scrollSensitivity ? i.scrollParent[0].scrollLeft = n = i.scrollParent[0].scrollLeft + s.scrollSpeed : e.pageX - i.overflowOffset.left < s.scrollSensitivity && (i.scrollParent[0].scrollLeft = n = i.scrollParent[0].scrollLeft - s.scrollSpeed))) : (s.axis && 'x' === s.axis || (e.pageY - t(document).scrollTop() < s.scrollSensitivity ? n = t(document).scrollTop(t(document).scrollTop() - s.scrollSpeed) : t(window).height() - (e.pageY - t(document).scrollTop()) < s.scrollSensitivity && (n = t(document).scrollTop(t(document).scrollTop() + s.scrollSpeed))), s.axis && 'y' === s.axis || (e.pageX - t(document).scrollLeft() < s.scrollSensitivity ? n = t(document).scrollLeft(t(document).scrollLeft() - s.scrollSpeed) : t(window).width() - (e.pageX - t(document).scrollLeft()) < s.scrollSensitivity && (n = t(document).scrollLeft(t(document).scrollLeft() + s.scrollSpeed)))),
                    n !== !1 && t.ui.ddmanager && !s.dropBehaviour && t.ui.ddmanager.prepareOffsets(i, e)
                }
            }),
            t.ui.plugin.add('draggable', 'snap', {
                start: function() {
                    var e = t(this).data('ui-draggable'),
                        i = e.options;
                    e.snapElements = [],
                        t(i.snap.constructor !== String ? i.snap.items || ':data(ui-draggable)' : i.snap).each(function() {
                            var i = t(this),
                                s = i.offset();
                            this !== e.element[0] && e.snapElements.push({
                                item: this,
                                width: i.outerWidth(),
                                height: i.outerHeight(),
                                top: s.top,
                                left: s.left
                            })
                        })
                },
                drag: function(e, i) {
                    var s,
                        n,
                        a,
                        o,
                        r,
                        h,
                        l,
                        c,
                        u,
                        d,
                        p = t(this).data('ui-draggable'),
                        f = p.options,
                        g = f.snapTolerance,
                        m = i.offset.left,
                        _ = m + p.helperProportions.width,
                        v = i.offset.top,
                        b = v + p.helperProportions.height;
                    for (u = p.snapElements.length - 1; u >= 0; u--) r = p.snapElements[u].left,
                        h = r + p.snapElements[u].width,
                        l = p.snapElements[u].top,
                        c = l + p.snapElements[u].height,
                        r - g > _ || m > h + g || l - g > b || v > c + g || !t.contains(p.snapElements[u].item.ownerDocument, p.snapElements[u].item) ? (p.snapElements[u].snapping && p.options.snap.release && p.options.snap.release.call(p.element, e, t.extend(p._uiHash(), {
                            snapItem: p.snapElements[u].item
                        })), p.snapElements[u].snapping = !1) : ('inner' !== f.snapMode && (s = Math.abs(l - b) <= g, n = Math.abs(c - v) <= g, a = Math.abs(r - _) <= g, o = Math.abs(h - m) <= g, s && (i.position.top = p._convertPositionTo('relative', {
                            top: l - p.helperProportions.height,
                            left: 0
                        }).top - p.margins.top), n && (i.position.top = p._convertPositionTo('relative', {
                            top: c,
                            left: 0
                        }).top - p.margins.top), a && (i.position.left = p._convertPositionTo('relative', {
                            top: 0,
                            left: r - p.helperProportions.width
                        }).left - p.margins.left), o && (i.position.left = p._convertPositionTo('relative', {
                            top: 0,
                            left: h
                        }).left - p.margins.left)), d = s || n || a || o, 'outer' !== f.snapMode && (s = Math.abs(l - v) <= g, n = Math.abs(c - b) <= g, a = Math.abs(r - m) <= g, o = Math.abs(h - _) <= g, s && (i.position.top = p._convertPositionTo('relative', {
                            top: l,
                            left: 0
                        }).top - p.margins.top), n && (i.position.top = p._convertPositionTo('relative', {
                            top: c - p.helperProportions.height,
                            left: 0
                        }).top - p.margins.top), a && (i.position.left = p._convertPositionTo('relative', {
                            top: 0,
                            left: r
                        }).left - p.margins.left), o && (i.position.left = p._convertPositionTo('relative', {
                            top: 0,
                            left: h - p.helperProportions.width
                        }).left - p.margins.left)), !p.snapElements[u].snapping && (s || n || a || o || d) && p.options.snap.snap && p.options.snap.snap.call(p.element, e, t.extend(p._uiHash(), {
                            snapItem: p.snapElements[u].item
                        })), p.snapElements[u].snapping = s || n || a || o || d)
                }
            }),
            t.ui.plugin.add('draggable', 'stack', {
                start: function() {
                    var e,
                        i = this.data('ui-draggable').options,
                        s = t.makeArray(t(i.stack)).sort(function(e, i) {
                            return (parseInt(t(e).css('zIndex'), 10) || 0) - (parseInt(t(i).css('zIndex'), 10) || 0)
                        });
                    s.length && (e = parseInt(t(s[0]).css('zIndex'), 10) || 0, t(s).each(function(i) {
                        t(this).css('zIndex', e + i)
                    }), this.css('zIndex', e + s.length))
                }
            }),
            t.ui.plugin.add('draggable', 'zIndex', {
                start: function(e, i) {
                    var s = t(i.helper),
                        n = t(this).data('ui-draggable').options;
                    s.css('zIndex') && (n._zIndex = s.css('zIndex')),
                        s.css('zIndex', n.zIndex)
                },
                stop: function(e, i) {
                    var s = t(this).data('ui-draggable').options;
                    s._zIndex && t(i.helper).css('zIndex', s._zIndex)
                }
            })
    }(jQuery),
    function(t) {
        function e(t, e, i) {
            return t > e && e + i > t
        }
        t.widget('ui.droppable', {
            version: '1.10.3',
            widgetEventPrefix: 'drop',
            options: {
                accept: '*',
                activeClass: !1,
                addClasses: !0,
                greedy: !1,
                hoverClass: !1,
                scope: 'default',
                tolerance: 'intersect',
                activate: null,
                deactivate: null,
                drop: null,
                out: null,
                over: null
            },
            _create: function() {
                var e = this.options,
                    i = e.accept;
                this.isover = !1,
                    this.isout = !0,
                    this.accept = t.isFunction(i) ? i : function(t) {
                        return t.is(i)
                    },
                    this.proportions = {
                        width: this.element[0].offsetWidth,
                        height: this.element[0].offsetHeight
                    },
                    t.ui.ddmanager.droppables[e.scope] = t.ui.ddmanager.droppables[e.scope] || [],
                    t.ui.ddmanager.droppables[e.scope].push(this),
                e.addClasses && this.element.addClass('ui-droppable')
            },
            _destroy: function() {
                for (var e = 0, i = t.ui.ddmanager.droppables[this.options.scope]; e < i.length; e++) i[e] === this && i.splice(e, 1);
                this.element.removeClass('ui-droppable ui-droppable-disabled')
            },
            _setOption: function(e, i) {
                'accept' === e && (this.accept = t.isFunction(i) ? i : function(t) {
                    return t.is(i)
                }),
                    t.Widget.prototype._setOption.apply(this, arguments)
            },
            _activate: function(e) {
                var i = t.ui.ddmanager.current;
                this.options.activeClass && this.element.addClass(this.options.activeClass),
                i && this._trigger('activate', e, this.ui(i))
            },
            _deactivate: function(e) {
                var i = t.ui.ddmanager.current;
                this.options.activeClass && this.element.removeClass(this.options.activeClass),
                i && this._trigger('deactivate', e, this.ui(i))
            },
            _over: function(e) {
                var i = t.ui.ddmanager.current;
                i && (i.currentItem || i.element)[0] !== this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this.options.hoverClass && this.element.addClass(this.options.hoverClass), this._trigger('over', e, this.ui(i)))
            },
            _out: function(e) {
                var i = t.ui.ddmanager.current;
                i && (i.currentItem || i.element)[0] !== this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger('out', e, this.ui(i)))
            },
            _drop: function(e, i) {
                var s = i || t.ui.ddmanager.current,
                    n = !1;
                return s && (s.currentItem || s.element)[0] !== this.element[0] ? (this.element.find(':data(ui-droppable)').not('.ui-draggable-dragging').each(function() {
                    var e = t.data(this, 'ui-droppable');
                    return e.options.greedy && !e.options.disabled && e.options.scope === s.options.scope && e.accept.call(e.element[0], s.currentItem || s.element) && t.ui.intersect(s, t.extend(e, {
                        offset: e.element.offset()
                    }), e.options.tolerance) ? (n = !0, !1) : void 0
                }), n ? !1 : this.accept.call(this.element[0], s.currentItem || s.element) ? (this.options.activeClass && this.element.removeClass(this.options.activeClass), this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger('drop', e, this.ui(s)), this.element) : !1) : !1
            },
            ui: function(t) {
                return {
                    draggable: t.currentItem || t.element,
                    helper: t.helper,
                    position: t.position,
                    offset: t.positionAbs
                }
            }
        }),
            t.ui.intersect = function(t, i, s) {
                if (!i.offset) return !1;
                var n,
                    a,
                    o = (t.positionAbs || t.position.absolute).left,
                    r = o + t.helperProportions.width,
                    h = (t.positionAbs || t.position.absolute).top,
                    l = h + t.helperProportions.height,
                    c = i.offset.left,
                    u = c + i.proportions.width,
                    d = i.offset.top,
                    p = d + i.proportions.height;
                switch (s) {
                    case 'fit':
                        return o >= c && u >= r && h >= d && p >= l;
                    case 'intersect':
                        return c < o + t.helperProportions.width / 2 && r - t.helperProportions.width / 2 < u && d < h + t.helperProportions.height / 2 && l - t.helperProportions.height / 2 < p;
                    case 'pointer':
                        return n = (t.positionAbs || t.position.absolute).left + (t.clickOffset || t.offset.click).left,
                            a = (t.positionAbs || t.position.absolute).top + (t.clickOffset || t.offset.click).top,
                        e(a, d, i.proportions.height) && e(n, c, i.proportions.width);
                    case 'touch':
                        return (h >= d && p >= h || l >= d && p >= l || d > h && l > p) && (o >= c && u >= o || r >= c && u >= r || c > o && r > u);
                    default:
                        return !1
                }
            },
            t.ui.ddmanager = {
                current: null,
                droppables: {
                    'default': []
                },
                prepareOffsets: function(e, i) {
                    var s,
                        n,
                        a = t.ui.ddmanager.droppables[e.options.scope] || [],
                        o = i ? i.type : null,
                        r = (e.currentItem || e.element).find(':data(ui-droppable)').addBack();
                    t: for (s = 0; s < a.length; s++)
                        if (!(a[s].options.disabled || e && !a[s].accept.call(a[s].element[0], e.currentItem || e.element))) {
                            for (n = 0; n < r.length; n++)
                                if (r[n] === a[s].element[0]) {
                                    a[s].proportions.height = 0;
                                    continue t
                                }
                            a[s].visible = 'none' !== a[s].element.css('display'),
                            a[s].visible && ('mousedown' === o && a[s]._activate.call(a[s], i), a[s].offset = a[s].element.offset(), a[s].proportions = {
                                width: a[s].element[0].offsetWidth,
                                height: a[s].element[0].offsetHeight
                            })
                        }
                },
                drop: function(e, i) {
                    var s = !1;
                    return t.each((t.ui.ddmanager.droppables[e.options.scope] || []).slice(), function() {
                        this.options && (!this.options.disabled && this.visible && t.ui.intersect(e, this, this.options.tolerance) && (s = this._drop.call(this, i) || s), !this.options.disabled && this.visible && this.accept.call(this.element[0], e.currentItem || e.element) && (this.isout = !0, this.isover = !1, this._deactivate.call(this, i)))
                    }),
                        s
                },
                dragStart: function(e, i) {
                    e.element.parentsUntil('body').bind('scroll.droppable', function() {
                        e.options.refreshPositions || t.ui.ddmanager.prepareOffsets(e, i)
                    })
                },
                drag: function(e, i) {
                    e.options.refreshPositions && t.ui.ddmanager.prepareOffsets(e, i),
                        t.each(t.ui.ddmanager.droppables[e.options.scope] || [], function() {
                            if (!this.options.disabled && !this.greedyChild && this.visible) {
                                var s,
                                    n,
                                    a,
                                    o = t.ui.intersect(e, this, this.options.tolerance),
                                    r = !o && this.isover ? 'isout' : o && !this.isover ? 'isover' : null;
                                r && (this.options.greedy && (n = this.options.scope, a = this.element.parents(':data(ui-droppable)').filter(function() {
                                    return t.data(this, 'ui-droppable').options.scope === n
                                }), a.length && (s = t.data(a[0], 'ui-droppable'), s.greedyChild = 'isover' === r)), s && 'isover' === r && (s.isover = !1, s.isout = !0, s._out.call(s, i)), this[r] = !0, this['isout' === r ? 'isover' : 'isout'] = !1, this['isover' === r ? '_over' : '_out'].call(this, i), s && 'isout' === r && (s.isout = !1, s.isover = !0, s._over.call(s, i)))
                            }
                        })
                },
                dragStop: function(e, i) {
                    e.element.parentsUntil('body').unbind('scroll.droppable'),
                    e.options.refreshPositions || t.ui.ddmanager.prepareOffsets(e, i)
                }
            }
    }(jQuery),
    function(t) {
        function e(t) {
            return parseInt(t, 10) || 0
        }

        function i(t) {
            return !isNaN(parseInt(t, 10))
        }
        t.widget('ui.resizable', t.ui.mouse, {
            version: '1.10.3',
            widgetEventPrefix: 'resize',
            options: {
                alsoResize: !1,
                animate: !1,
                animateDuration: 'slow',
                animateEasing: 'swing',
                aspectRatio: !1,
                autoHide: !1,
                containment: !1,
                ghost: !1,
                grid: !1,
                handles: 'e,s,se',
                helper: !1,
                maxHeight: null,
                maxWidth: null,
                minHeight: 10,
                minWidth: 10,
                zIndex: 90,
                resize: null,
                start: null,
                stop: null
            },
            _create: function() {
                var e,
                    i,
                    s,
                    n,
                    a,
                    o = this,
                    r = this.options;
                if (this.element.addClass('ui-resizable'), t.extend(this, {
                        _aspectRatio: !!r.aspectRatio,
                        aspectRatio: r.aspectRatio,
                        originalElement: this.element,
                        _proportionallyResizeElements: [],
                        _helper: r.helper || r.ghost || r.animate ? r.helper || 'ui-resizable-helper' : null
                    }), this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i) && (this.element.wrap(t('<div class=\'ui-wrapper\' style=\'overflow: hidden;\'></div>').css({
                        position: this.element.css('position'),
                        width: this.element.outerWidth(),
                        height: this.element.outerHeight(),
                        top: this.element.css('top'),
                        left: this.element.css('left')
                    })), this.element = this.element.parent().data('ui-resizable', this.element.data('ui-resizable')), this.elementIsWrapper = !0, this.element.css({
                        marginLeft: this.originalElement.css('marginLeft'),
                        marginTop: this.originalElement.css('marginTop'),
                        marginRight: this.originalElement.css('marginRight'),
                        marginBottom: this.originalElement.css('marginBottom')
                    }), this.originalElement.css({
                        marginLeft: 0,
                        marginTop: 0,
                        marginRight: 0,
                        marginBottom: 0
                    }), this.originalResizeStyle = this.originalElement.css('resize'), this.originalElement.css('resize', 'none'), this._proportionallyResizeElements.push(this.originalElement.css({
                        position: 'static',
                        zoom: 1,
                        display: 'block'
                    })), this.originalElement.css({
                        margin: this.originalElement.css('margin')
                    }), this._proportionallyResize()), this.handles = r.handles || (t('.ui-resizable-handle', this.element).length ? {
                        n: '.ui-resizable-n',
                        e: '.ui-resizable-e',
                        s: '.ui-resizable-s',
                        w: '.ui-resizable-w',
                        se: '.ui-resizable-se',
                        sw: '.ui-resizable-sw',
                        ne: '.ui-resizable-ne',
                        nw: '.ui-resizable-nw'
                    } : 'e,s,se'), this.handles.constructor === String)
                    for ('all' === this.handles && (this.handles = 'n,e,s,w,se,sw,ne,nw'), e = this.handles.split(','), this.handles = {}, i = 0; i < e.length; i++) s = t.trim(e[i]),
                        a = 'ui-resizable-' + s,
                        n = t('<div class=\'ui-resizable-handle ' + a + '\'></div>'),
                        n.css({
                            zIndex: r.zIndex
                        }),
                    'se' === s && n.addClass('ui-icon ui-icon-gripsmall-diagonal-se'),
                        this.handles[s] = '.ui-resizable-' + s,
                        this.element.append(n);
                this._renderAxis = function(e) {
                    var i,
                        s,
                        n,
                        a;
                    e = e || this.element;
                    for (i in this.handles) this.handles[i].constructor === String && (this.handles[i] = t(this.handles[i], this.element).show()),
                    this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i) && (s = t(this.handles[i], this.element), a = /sw|ne|nw|se|n|s/.test(i) ? s.outerHeight() : s.outerWidth(), n = [
                        'padding',
                        /ne|nw|n/.test(i) ? 'Top' : /se|sw|s/.test(i) ? 'Bottom' : /^e$/.test(i) ? 'Right' : 'Left'
                    ].join(''), e.css(n, a), this._proportionallyResize()),
                        t(this.handles[i]).length
                },
                    this._renderAxis(this.element),
                    this._handles = t('.ui-resizable-handle', this.element).disableSelection(),
                    this._handles.mouseover(function() {
                        o.resizing || (this.className && (n = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)), o.axis = n && n[1] ? n[1] : 'se')
                    }),
                r.autoHide && (this._handles.hide(), t(this.element).addClass('ui-resizable-autohide').mouseenter(function() {
                    r.disabled || (t(this).removeClass('ui-resizable-autohide'), o._handles.show())
                }).mouseleave(function() {
                    r.disabled || o.resizing || (t(this).addClass('ui-resizable-autohide'), o._handles.hide())
                })),
                    this._mouseInit()
            },
            _destroy: function() {
                this._mouseDestroy();
                var e,
                    i = function(e) {
                        t(e).removeClass('ui-resizable ui-resizable-disabled ui-resizable-resizing').removeData('resizable').removeData('ui-resizable').unbind('.resizable').find('.ui-resizable-handle').remove()
                    };
                return this.elementIsWrapper && (i(this.element), e = this.element, this.originalElement.css({
                    position: e.css('position'),
                    width: e.outerWidth(),
                    height: e.outerHeight(),
                    top: e.css('top'),
                    left: e.css('left')
                }).insertAfter(e), e.remove()),
                    this.originalElement.css('resize', this.originalResizeStyle),
                    i(this.originalElement),
                    this
            },
            _mouseCapture: function(e) {
                var i,
                    s,
                    n = !1;
                for (i in this.handles) s = t(this.handles[i])[0], (s === e.target || t.contains(s, e.target)) && (n = !0);
                return !this.options.disabled && n
            },
            _mouseStart: function(i) {
                var s,
                    n,
                    a,
                    o = this.options,
                    r = this.element.position(),
                    h = this.element;
                return this.resizing = !0,
                    /absolute/.test(h.css('position')) ? h.css({
                        position: 'absolute',
                        top: h.css('top'),
                        left: h.css('left')
                    }) : h.is('.ui-draggable') && h.css({
                        position: 'absolute',
                        top: r.top,
                        left: r.left
                    }),
                    this._renderProxy(),
                    s = e(this.helper.css('left')),
                    n = e(this.helper.css('top')),
                o.containment && (s += t(o.containment).scrollLeft() || 0, n += t(o.containment).scrollTop() || 0),
                    this.offset = this.helper.offset(),
                    this.position = {
                        left: s,
                        top: n
                    },
                    this.size = this._helper ? {
                        width: h.outerWidth(),
                        height: h.outerHeight()
                    } : {
                        width: h.width(),
                        height: h.height()
                    },
                    this.originalSize = this._helper ? {
                        width: h.outerWidth(),
                        height: h.outerHeight()
                    } : {
                        width: h.width(),
                        height: h.height()
                    },
                    this.originalPosition = {
                        left: s,
                        top: n
                    },
                    this.sizeDiff = {
                        width: h.outerWidth() - h.width(),
                        height: h.outerHeight() - h.height()
                    },
                    this.originalMousePosition = {
                        left: i.pageX,
                        top: i.pageY
                    },
                    this.aspectRatio = 'number' == typeof o.aspectRatio ? o.aspectRatio : this.originalSize.width / this.originalSize.height || 1,
                    a = t('.ui-resizable-' + this.axis).css('cursor'),
                    t('body').css('cursor', 'auto' === a ? this.axis + '-resize' : a),
                    h.addClass('ui-resizable-resizing'),
                    this._propagate('start', i), !0
            },
            _mouseDrag: function(e) {
                var i,
                    s = this.helper,
                    n = {},
                    a = this.originalMousePosition,
                    o = this.axis,
                    r = this.position.top,
                    h = this.position.left,
                    l = this.size.width,
                    c = this.size.height,
                    u = e.pageX - a.left || 0,
                    d = e.pageY - a.top || 0,
                    p = this._change[o];
                return p ? (i = p.apply(this, [
                    e,
                    u,
                    d
                ]), this._updateVirtualBoundaries(e.shiftKey), (this._aspectRatio || e.shiftKey) && (i = this._updateRatio(i, e)), i = this._respectSize(i, e), this._updateCache(i), this._propagate('resize', e), this.position.top !== r && (n.top = this.position.top + 'px'), this.position.left !== h && (n.left = this.position.left + 'px'), this.size.width !== l && (n.width = this.size.width + 'px'), this.size.height !== c && (n.height = this.size.height + 'px'), s.css(n), !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(), t.isEmptyObject(n) || this._trigger('resize', e, this.ui()), !1) : !1
            },
            _mouseStop: function(e) {
                this.resizing = !1;
                var i,
                    s,
                    n,
                    a,
                    o,
                    r,
                    h,
                    l = this.options,
                    c = this;
                return this._helper && (i = this._proportionallyResizeElements, s = i.length && /textarea/i.test(i[0].nodeName), n = s && t.ui.hasScroll(i[0], 'left') ? 0 : c.sizeDiff.height, a = s ? 0 : c.sizeDiff.width, o = {
                    width: c.helper.width() - a,
                    height: c.helper.height() - n
                }, r = parseInt(c.element.css('left'), 10) + (c.position.left - c.originalPosition.left) || null, h = parseInt(c.element.css('top'), 10) + (c.position.top - c.originalPosition.top) || null, l.animate || this.element.css(t.extend(o, {
                    top: h,
                    left: r
                })), c.helper.height(c.size.height), c.helper.width(c.size.width), this._helper && !l.animate && this._proportionallyResize()),
                    t('body').css('cursor', 'auto'),
                    this.element.removeClass('ui-resizable-resizing'),
                    this._propagate('stop', e),
                this._helper && this.helper.remove(), !1
            },
            _updateVirtualBoundaries: function(t) {
                var e,
                    s,
                    n,
                    a,
                    o,
                    r = this.options;
                o = {
                    minWidth: i(r.minWidth) ? r.minWidth : 0,
                    maxWidth: i(r.maxWidth) ? r.maxWidth : 1 / 0,
                    minHeight: i(r.minHeight) ? r.minHeight : 0,
                    maxHeight: i(r.maxHeight) ? r.maxHeight : 1 / 0
                }, (this._aspectRatio || t) && (e = o.minHeight * this.aspectRatio, n = o.minWidth / this.aspectRatio, s = o.maxHeight * this.aspectRatio, a = o.maxWidth / this.aspectRatio, e > o.minWidth && (o.minWidth = e), n > o.minHeight && (o.minHeight = n), s < o.maxWidth && (o.maxWidth = s), a < o.maxHeight && (o.maxHeight = a)),
                    this._vBoundaries = o
            },
            _updateCache: function(t) {
                this.offset = this.helper.offset(),
                i(t.left) && (this.position.left = t.left),
                i(t.top) && (this.position.top = t.top),
                i(t.height) && (this.size.height = t.height),
                i(t.width) && (this.size.width = t.width)
            },
            _updateRatio: function(t) {
                var e = this.position,
                    s = this.size,
                    n = this.axis;
                return i(t.height) ? t.width = t.height * this.aspectRatio : i(t.width) && (t.height = t.width / this.aspectRatio),
                'sw' === n && (t.left = e.left + (s.width - t.width), t.top = null),
                'nw' === n && (t.top = e.top + (s.height - t.height), t.left = e.left + (s.width - t.width)),
                    t
            },
            _respectSize: function(t) {
                var e = this._vBoundaries,
                    s = this.axis,
                    n = i(t.width) && e.maxWidth && e.maxWidth < t.width,
                    a = i(t.height) && e.maxHeight && e.maxHeight < t.height,
                    o = i(t.width) && e.minWidth && e.minWidth > t.width,
                    r = i(t.height) && e.minHeight && e.minHeight > t.height,
                    h = this.originalPosition.left + this.originalSize.width,
                    l = this.position.top + this.size.height,
                    c = /sw|nw|w/.test(s),
                    u = /nw|ne|n/.test(s);
                return o && (t.width = e.minWidth),
                r && (t.height = e.minHeight),
                n && (t.width = e.maxWidth),
                a && (t.height = e.maxHeight),
                o && c && (t.left = h - e.minWidth),
                n && c && (t.left = h - e.maxWidth),
                r && u && (t.top = l - e.minHeight),
                a && u && (t.top = l - e.maxHeight),
                    t.width || t.height || t.left || !t.top ? t.width || t.height || t.top || !t.left || (t.left = null) : t.top = null,
                    t
            },
            _proportionallyResize: function() {
                if (this._proportionallyResizeElements.length) {
                    var t,
                        e,
                        i,
                        s,
                        n,
                        a = this.helper || this.element;
                    for (t = 0; t < this._proportionallyResizeElements.length; t++) {
                        if (n = this._proportionallyResizeElements[t], !this.borderDif)
                            for (this.borderDif = [], i = [
                                n.css('borderTopWidth'),
                                n.css('borderRightWidth'),
                                n.css('borderBottomWidth'),
                                n.css('borderLeftWidth')
                            ], s = [
                                n.css('paddingTop'),
                                n.css('paddingRight'),
                                n.css('paddingBottom'),
                                n.css('paddingLeft')
                            ], e = 0; e < i.length; e++) this.borderDif[e] = (parseInt(i[e], 10) || 0) + (parseInt(s[e], 10) || 0);
                        n.css({
                            height: a.height() - this.borderDif[0] - this.borderDif[2] || 0,
                            width: a.width() - this.borderDif[1] - this.borderDif[3] || 0
                        })
                    }
                }
            },
            _renderProxy: function() {
                var e = this.element,
                    i = this.options;
                this.elementOffset = e.offset(),
                    this._helper ? (this.helper = this.helper || t('<div style=\'overflow:hidden;\'></div>'), this.helper.addClass(this._helper).css({
                        width: this.element.outerWidth() - 1,
                        height: this.element.outerHeight() - 1,
                        position: 'absolute',
                        left: this.elementOffset.left + 'px',
                        top: this.elementOffset.top + 'px',
                        zIndex: ++i.zIndex
                    }), this.helper.appendTo('body').disableSelection()) : this.helper = this.element
            },
            _change: {
                e: function(t, e) {
                    return {
                        width: this.originalSize.width + e
                    }
                },
                w: function(t, e) {
                    var i = this.originalSize,
                        s = this.originalPosition;
                    return {
                        left: s.left + e,
                        width: i.width - e
                    }
                },
                n: function(t, e, i) {
                    var s = this.originalSize,
                        n = this.originalPosition;
                    return {
                        top: n.top + i,
                        height: s.height - i
                    }
                },
                s: function(t, e, i) {
                    return {
                        height: this.originalSize.height + i
                    }
                },
                se: function(e, i, s) {
                    return t.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [
                        e,
                        i,
                        s
                    ]))
                },
                sw: function(e, i, s) {
                    return t.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [
                        e,
                        i,
                        s
                    ]))
                },
                ne: function(e, i, s) {
                    return t.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [
                        e,
                        i,
                        s
                    ]))
                },
                nw: function(e, i, s) {
                    return t.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [
                        e,
                        i,
                        s
                    ]))
                }
            },
            _propagate: function(e, i) {
                t.ui.plugin.call(this, e, [
                    i,
                    this.ui()
                ]),
                'resize' !== e && this._trigger(e, i, this.ui())
            },
            plugins: {},
            ui: function() {
                return {
                    originalElement: this.originalElement,
                    element: this.element,
                    helper: this.helper,
                    position: this.position,
                    size: this.size,
                    originalSize: this.originalSize,
                    originalPosition: this.originalPosition
                }
            }
        }),
            t.ui.plugin.add('resizable', 'animate', {
                stop: function(e) {
                    var i = t(this).data('ui-resizable'),
                        s = i.options,
                        n = i._proportionallyResizeElements,
                        a = n.length && /textarea/i.test(n[0].nodeName),
                        o = a && t.ui.hasScroll(n[0], 'left') ? 0 : i.sizeDiff.height,
                        r = a ? 0 : i.sizeDiff.width,
                        h = {
                            width: i.size.width - r,
                            height: i.size.height - o
                        },
                        l = parseInt(i.element.css('left'), 10) + (i.position.left - i.originalPosition.left) || null,
                        c = parseInt(i.element.css('top'), 10) + (i.position.top - i.originalPosition.top) || null;
                    i.element.animate(t.extend(h, c && l ? {
                        top: c,
                        left: l
                    } : {}), {
                        duration: s.animateDuration,
                        easing: s.animateEasing,
                        step: function() {
                            var s = {
                                width: parseInt(i.element.css('width'), 10),
                                height: parseInt(i.element.css('height'), 10),
                                top: parseInt(i.element.css('top'), 10),
                                left: parseInt(i.element.css('left'), 10)
                            };
                            n && n.length && t(n[0]).css({
                                width: s.width,
                                height: s.height
                            }),
                                i._updateCache(s),
                                i._propagate('resize', e)
                        }
                    })
                }
            }),
            t.ui.plugin.add('resizable', 'containment', {
                start: function() {
                    var i,
                        s,
                        n,
                        a,
                        o,
                        r,
                        h,
                        l = t(this).data('ui-resizable'),
                        c = l.options,
                        u = l.element,
                        d = c.containment,
                        p = d instanceof t ? d.get(0) : /parent/.test(d) ? u.parent().get(0) : d;
                    p && (l.containerElement = t(p), /document/.test(d) || d === document ? (l.containerOffset = {
                        left: 0,
                        top: 0
                    }, l.containerPosition = {
                        left: 0,
                        top: 0
                    }, l.parentData = {
                        element: t(document),
                        left: 0,
                        top: 0,
                        width: t(document).width(),
                        height: t(document).height() || document.body.parentNode.scrollHeight
                    }) : (i = t(p), s = [], t(['Top',
                        'Right',
                        'Left',
                        'Bottom'
                    ]).each(function(t, n) {
                        s[t] = e(i.css('padding' + n))
                    }), l.containerOffset = i.offset(), l.containerPosition = i.position(), l.containerSize = {
                        height: i.innerHeight() - s[3],
                        width: i.innerWidth() - s[1]
                    }, n = l.containerOffset, a = l.containerSize.height, o = l.containerSize.width, r = t.ui.hasScroll(p, 'left') ? p.scrollWidth : o, h = t.ui.hasScroll(p) ? p.scrollHeight : a, l.parentData = {
                        element: p,
                        left: n.left,
                        top: n.top,
                        width: r,
                        height: h
                    }))
                },
                resize: function(e) {
                    var i,
                        s,
                        n,
                        a,
                        o = t(this).data('ui-resizable'),
                        r = o.options,
                        h = o.containerOffset,
                        l = o.position,
                        c = o._aspectRatio || e.shiftKey,
                        u = {
                            top: 0,
                            left: 0
                        },
                        d = o.containerElement;
                    d[0] !== document && /static/.test(d.css('position')) && (u = h),
                    l.left < (o._helper ? h.left : 0) && (o.size.width = o.size.width + (o._helper ? o.position.left - h.left : o.position.left - u.left), c && (o.size.height = o.size.width / o.aspectRatio), o.position.left = r.helper ? h.left : 0),
                    l.top < (o._helper ? h.top : 0) && (o.size.height = o.size.height + (o._helper ? o.position.top - h.top : o.position.top), c && (o.size.width = o.size.height * o.aspectRatio), o.position.top = o._helper ? h.top : 0),
                        o.offset.left = o.parentData.left + o.position.left,
                        o.offset.top = o.parentData.top + o.position.top,
                        i = Math.abs((o._helper ? o.offset.left - u.left : o.offset.left - u.left) + o.sizeDiff.width),
                        s = Math.abs((o._helper ? o.offset.top - u.top : o.offset.top - h.top) + o.sizeDiff.height),
                        n = o.containerElement.get(0) === o.element.parent().get(0),
                        a = /relative|absolute/.test(o.containerElement.css('position')),
                    n && a && (i -= o.parentData.left),
                    i + o.size.width >= o.parentData.width && (o.size.width = o.parentData.width - i, c && (o.size.height = o.size.width / o.aspectRatio)),
                    s + o.size.height >= o.parentData.height && (o.size.height = o.parentData.height - s, c && (o.size.width = o.size.height * o.aspectRatio))
                },
                stop: function() {
                    var e = t(this).data('ui-resizable'),
                        i = e.options,
                        s = e.containerOffset,
                        n = e.containerPosition,
                        a = e.containerElement,
                        o = t(e.helper),
                        r = o.offset(),
                        h = o.outerWidth() - e.sizeDiff.width,
                        l = o.outerHeight() - e.sizeDiff.height;
                    e._helper && !i.animate && /relative/.test(a.css('position')) && t(this).css({
                        left: r.left - n.left - s.left,
                        width: h,
                        height: l
                    }),
                    e._helper && !i.animate && /static/.test(a.css('position')) && t(this).css({
                        left: r.left - n.left - s.left,
                        width: h,
                        height: l
                    })
                }
            }),
            t.ui.plugin.add('resizable', 'alsoResize', {
                start: function() {
                    var e = t(this).data('ui-resizable'),
                        i = e.options,
                        s = function(e) {
                            t(e).each(function() {
                                var e = t(this);
                                e.data('ui-resizable-alsoresize', {
                                    width: parseInt(e.width(), 10),
                                    height: parseInt(e.height(), 10),
                                    left: parseInt(e.css('left'), 10),
                                    top: parseInt(e.css('top'), 10)
                                })
                            })
                        };
                    'object' != typeof i.alsoResize || i.alsoResize.parentNode ? s(i.alsoResize) : i.alsoResize.length ? (i.alsoResize = i.alsoResize[0], s(i.alsoResize)) : t.each(i.alsoResize, function(t) {
                        s(t)
                    })
                },
                resize: function(e, i) {
                    var s = t(this).data('ui-resizable'),
                        n = s.options,
                        a = s.originalSize,
                        o = s.originalPosition,
                        r = {
                            height: s.size.height - a.height || 0,
                            width: s.size.width - a.width || 0,
                            top: s.position.top - o.top || 0,
                            left: s.position.left - o.left || 0
                        },
                        h = function(e, s) {
                            t(e).each(function() {
                                var e = t(this),
                                    n = t(this).data('ui-resizable-alsoresize'),
                                    a = {},
                                    o = s && s.length ? s : e.parents(i.originalElement[0]).length ? [
                                        'width',
                                        'height'
                                    ] : [
                                        'width',
                                        'height',
                                        'top',
                                        'left'
                                    ];
                                t.each(o, function(t, e) {
                                    var i = (n[e] || 0) + (r[e] || 0);
                                    i && i >= 0 && (a[e] = i || null)
                                }),
                                    e.css(a)
                            })
                        };
                    'object' != typeof n.alsoResize || n.alsoResize.nodeType ? h(n.alsoResize) : t.each(n.alsoResize, function(t, e) {
                        h(t, e)
                    })
                },
                stop: function() {
                    t(this).removeData('resizable-alsoresize')
                }
            }),
            t.ui.plugin.add('resizable', 'ghost', {
                start: function() {
                    var e = t(this).data('ui-resizable'),
                        i = e.options,
                        s = e.size;
                    e.ghost = e.originalElement.clone(),
                        e.ghost.css({
                            opacity: 0.25,
                            display: 'block',
                            position: 'relative',
                            height: s.height,
                            width: s.width,
                            margin: 0,
                            left: 0,
                            top: 0
                        }).addClass('ui-resizable-ghost').addClass('string' == typeof i.ghost ? i.ghost : ''),
                        e.ghost.appendTo(e.helper)
                },
                resize: function() {
                    var e = t(this).data('ui-resizable');
                    e.ghost && e.ghost.css({
                        position: 'relative',
                        height: e.size.height,
                        width: e.size.width
                    })
                },
                stop: function() {
                    var e = t(this).data('ui-resizable');
                    e.ghost && e.helper && e.helper.get(0).removeChild(e.ghost.get(0))
                }
            }),
            t.ui.plugin.add('resizable', 'grid', {
                resize: function() {
                    var e = t(this).data('ui-resizable'),
                        i = e.options,
                        s = e.size,
                        n = e.originalSize,
                        a = e.originalPosition,
                        o = e.axis,
                        r = 'number' == typeof i.grid ? [
                            i.grid,
                            i.grid
                        ] : i.grid,
                        h = r[0] || 1,
                        l = r[1] || 1,
                        c = Math.round((s.width - n.width) / h) * h,
                        u = Math.round((s.height - n.height) / l) * l,
                        d = n.width + c,
                        p = n.height + u,
                        f = i.maxWidth && i.maxWidth < d,
                        g = i.maxHeight && i.maxHeight < p,
                        m = i.minWidth && i.minWidth > d,
                        _ = i.minHeight && i.minHeight > p;
                    i.grid = r,
                    m && (d += h),
                    _ && (p += l),
                    f && (d -= h),
                    g && (p -= l),
                        /^(se|s|e)$/.test(o) ? (e.size.width = d, e.size.height = p) : /^(ne)$/.test(o) ? (e.size.width = d, e.size.height = p, e.position.top = a.top - u) : /^(sw)$/.test(o) ? (e.size.width = d, e.size.height = p, e.position.left = a.left - c) : (e.size.width = d, e.size.height = p, e.position.top = a.top - u, e.position.left = a.left - c)
                }
            })
    }(jQuery),
    function(t) {
        t.widget('ui.selectable', t.ui.mouse, {
            version: '1.10.3',
            options: {
                appendTo: 'body',
                autoRefresh: !0,
                distance: 0,
                filter: '*',
                tolerance: 'touch',
                selected: null,
                selecting: null,
                start: null,
                stop: null,
                unselected: null,
                unselecting: null
            },
            _create: function() {
                var e,
                    i = this;
                this.element.addClass('ui-selectable'),
                    this.dragged = !1,
                    this.refresh = function() {
                        e = t(i.options.filter, i.element[0]),
                            e.addClass('ui-selectee'),
                            e.each(function() {
                                var e = t(this),
                                    i = e.offset();
                                t.data(this, 'selectable-item', {
                                    element: this,
                                    $element: e,
                                    left: i.left,
                                    top: i.top,
                                    right: i.left + e.outerWidth(),
                                    bottom: i.top + e.outerHeight(),
                                    startselected: !1,
                                    selected: e.hasClass('ui-selected'),
                                    selecting: e.hasClass('ui-selecting'),
                                    unselecting: e.hasClass('ui-unselecting')
                                })
                            })
                    },
                    this.refresh(),
                    this.selectees = e.addClass('ui-selectee'),
                    this._mouseInit(),
                    this.helper = t('<div class=\'ui-selectable-helper\'></div>')
            },
            _destroy: function() {
                this.selectees.removeClass('ui-selectee').removeData('selectable-item'),
                    this.element.removeClass('ui-selectable ui-selectable-disabled'),
                    this._mouseDestroy()
            },
            _mouseStart: function(e) {
                var i = this,
                    s = this.options;
                this.opos = [
                    e.pageX,
                    e.pageY
                ],
                this.options.disabled || (this.selectees = t(s.filter, this.element[0]), this._trigger('start', e), t(s.appendTo).append(this.helper), this.helper.css({
                    left: e.pageX,
                    top: e.pageY,
                    width: 0,
                    height: 0
                }), s.autoRefresh && this.refresh(), this.selectees.filter('.ui-selected').each(function() {
                    var s = t.data(this, 'selectable-item');
                    s.startselected = !0,
                    e.metaKey || e.ctrlKey || (s.$element.removeClass('ui-selected'), s.selected = !1, s.$element.addClass('ui-unselecting'), s.unselecting = !0, i._trigger('unselecting', e, {
                        unselecting: s.element
                    }))
                }), t(e.target).parents().addBack().each(function() {
                    var s,
                        n = t.data(this, 'selectable-item');
                    return n ? (s = !e.metaKey && !e.ctrlKey || !n.$element.hasClass('ui-selected'), n.$element.removeClass(s ? 'ui-unselecting' : 'ui-selected').addClass(s ? 'ui-selecting' : 'ui-unselecting'), n.unselecting = !s, n.selecting = s, n.selected = s, s ? i._trigger('selecting', e, {
                        selecting: n.element
                    }) : i._trigger('unselecting', e, {
                        unselecting: n.element
                    }), !1) : void 0
                }))
            },
            _mouseDrag: function(e) {
                if (this.dragged = !0, !this.options.disabled) {
                    var i,
                        s = this,
                        n = this.options,
                        a = this.opos[0],
                        o = this.opos[1],
                        r = e.pageX,
                        h = e.pageY;
                    return a > r && (i = r, r = a, a = i),
                    o > h && (i = h, h = o, o = i),
                        this.helper.css({
                            left: a,
                            top: o,
                            width: r - a,
                            height: h - o
                        }),
                        this.selectees.each(function() {
                            var i = t.data(this, 'selectable-item'),
                                l = !1;
                            i && i.element !== s.element[0] && ('touch' === n.tolerance ? l = !(i.left > r || i.right < a || i.top > h || i.bottom < o) : 'fit' === n.tolerance && (l = i.left > a && i.right < r && i.top > o && i.bottom < h), l ? (i.selected && (i.$element.removeClass('ui-selected'), i.selected = !1), i.unselecting && (i.$element.removeClass('ui-unselecting'), i.unselecting = !1), i.selecting || (i.$element.addClass('ui-selecting'), i.selecting = !0, s._trigger('selecting', e, {
                                selecting: i.element
                            }))) : (i.selecting && ((e.metaKey || e.ctrlKey) && i.startselected ? (i.$element.removeClass('ui-selecting'), i.selecting = !1, i.$element.addClass('ui-selected'), i.selected = !0) : (i.$element.removeClass('ui-selecting'), i.selecting = !1, i.startselected && (i.$element.addClass('ui-unselecting'), i.unselecting = !0), s._trigger('unselecting', e, {
                                unselecting: i.element
                            }))), i.selected && (e.metaKey || e.ctrlKey || i.startselected || (i.$element.removeClass('ui-selected'), i.selected = !1, i.$element.addClass('ui-unselecting'), i.unselecting = !0, s._trigger('unselecting', e, {
                                unselecting: i.element
                            })))))
                        }), !1
                }
            },
            _mouseStop: function(e) {
                var i = this;
                return this.dragged = !1,
                    t('.ui-unselecting', this.element[0]).each(function() {
                        var s = t.data(this, 'selectable-item');
                        s.$element.removeClass('ui-unselecting'),
                            s.unselecting = !1,
                            s.startselected = !1,
                            i._trigger('unselected', e, {
                                unselected: s.element
                            })
                    }),
                    t('.ui-selecting', this.element[0]).each(function() {
                        var s = t.data(this, 'selectable-item');
                        s.$element.removeClass('ui-selecting').addClass('ui-selected'),
                            s.selecting = !1,
                            s.selected = !0,
                            s.startselected = !0,
                            i._trigger('selected', e, {
                                selected: s.element
                            })
                    }),
                    this._trigger('stop', e),
                    this.helper.remove(), !1
            }
        })
    }(jQuery),
    function(t) {
        function e(t, e, i) {
            return t > e && e + i > t
        }

        function i(t) {
            return /left|right/.test(t.css('float')) || /inline|table-cell/.test(t.css('display'))
        }
        t.widget('ui.sortable', t.ui.mouse, {
            version: '1.10.3',
            widgetEventPrefix: 'sort',
            ready: !1,
            options: {
                appendTo: 'parent',
                axis: !1,
                connectWith: !1,
                containment: !1,
                cursor: 'auto',
                cursorAt: !1,
                dropOnEmpty: !0,
                forcePlaceholderSize: !1,
                forceHelperSize: !1,
                grid: !1,
                handle: !1,
                helper: 'original',
                items: '> *',
                opacity: !1,
                placeholder: !1,
                revert: !1,
                scroll: !0,
                scrollSensitivity: 20,
                scrollSpeed: 20,
                scope: 'default',
                tolerance: 'intersect',
                zIndex: 1000,
                activate: null,
                beforeStop: null,
                change: null,
                deactivate: null,
                out: null,
                over: null,
                receive: null,
                remove: null,
                sort: null,
                start: null,
                stop: null,
                update: null
            },
            _create: function() {
                var t = this.options;
                this.containerCache = {},
                    this.element.addClass('ui-sortable'),
                    this.refresh(),
                    this.floating = this.items.length ? 'x' === t.axis || i(this.items[0].item) : !1,
                    this.offset = this.element.offset(),
                    this._mouseInit(),
                    this.ready = !0
            },
            _destroy: function() {
                this.element.removeClass('ui-sortable ui-sortable-disabled'),
                    this._mouseDestroy();
                for (var t = this.items.length - 1; t >= 0; t--) this.items[t].item.removeData(this.widgetName + '-item');
                return this
            },
            _setOption: function(e, i) {
                'disabled' === e ? (this.options[e] = i, this.widget().toggleClass('ui-sortable-disabled', !!i)) : t.Widget.prototype._setOption.apply(this, arguments)
            },
            _mouseCapture: function(e, i) {
                var s = null,
                    n = !1,
                    a = this;
                return this.reverting ? !1 : this.options.disabled || 'static' === this.options.type ? !1 : (this._refreshItems(e), t(e.target).parents().each(function() {
                    return t.data(this, a.widgetName + '-item') === a ? (s = t(this), !1) : void 0
                }), t.data(e.target, a.widgetName + '-item') === a && (s = t(e.target)), s && (!this.options.handle || i || (t(this.options.handle, s).find('*').addBack().each(function() {
                    this === e.target && (n = !0)
                }), n)) ? (this.currentItem = s, this._removeCurrentsFromItems(), !0) : !1)
            },
            _mouseStart: function(e, i, s) {
                var n,
                    a,
                    o = this.options;
                if (this.currentContainer = this, this.refreshPositions(), this.helper = this._createHelper(e), this._cacheHelperProportions(), this._cacheMargins(), this.scrollParent = this.helper.scrollParent(), this.offset = this.currentItem.offset(), this.offset = {
                        top: this.offset.top - this.margins.top,
                        left: this.offset.left - this.margins.left
                    }, t.extend(this.offset, {
                        click: {
                            left: e.pageX - this.offset.left,
                            top: e.pageY - this.offset.top
                        },
                        parent: this._getParentOffset(),
                        relative: this._getRelativeOffset()
                    }), this.helper.css('position', 'absolute'), this.cssPosition = this.helper.css('position'), this.originalPosition = this._generatePosition(e), this.originalPageX = e.pageX, this.originalPageY = e.pageY, o.cursorAt && this._adjustOffsetFromHelper(o.cursorAt), this.domPosition = {
                        prev: this.currentItem.prev()[0],
                        parent: this.currentItem.parent()[0]
                    }, this.helper[0] !== this.currentItem[0] && this.currentItem.hide(), this._createPlaceholder(), o.containment && this._setContainment(), o.cursor && 'auto' !== o.cursor && (a = this.document.find('body'), this.storedCursor = a.css('cursor'), a.css('cursor', o.cursor), this.storedStylesheet = t('<style>*{ cursor: ' + o.cursor + ' !important; }</style>').appendTo(a)), o.opacity && (this.helper.css('opacity') && (this._storedOpacity = this.helper.css('opacity')), this.helper.css('opacity', o.opacity)), o.zIndex && (this.helper.css('zIndex') && (this._storedZIndex = this.helper.css('zIndex')), this.helper.css('zIndex', o.zIndex)), this.scrollParent[0] !== document && 'HTML' !== this.scrollParent[0].tagName && (this.overflowOffset = this.scrollParent.offset()), this._trigger('start', e, this._uiHash()), this._preserveHelperProportions || this._cacheHelperProportions(), !s)
                    for (n = this.containers.length - 1; n >= 0; n--) this.containers[n]._trigger('activate', e, this._uiHash(this));
                return t.ui.ddmanager && (t.ui.ddmanager.current = this),
                t.ui.ddmanager && !o.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e),
                    this.dragging = !0,
                    this.helper.addClass('ui-sortable-helper'),
                    this._mouseDrag(e), !0
            },
            _mouseDrag: function(e) {
                var i,
                    s,
                    n,
                    a,
                    o = this.options,
                    r = !1;
                for (this.position = this._generatePosition(e), this.positionAbs = this._convertPositionTo('absolute'), this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs), this.options.scroll && (this.scrollParent[0] !== document && 'HTML' !== this.scrollParent[0].tagName ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - e.pageY < o.scrollSensitivity ? this.scrollParent[0].scrollTop = r = this.scrollParent[0].scrollTop + o.scrollSpeed : e.pageY - this.overflowOffset.top < o.scrollSensitivity && (this.scrollParent[0].scrollTop = r = this.scrollParent[0].scrollTop - o.scrollSpeed), this.overflowOffset.left + this.scrollParent[0].offsetWidth - e.pageX < o.scrollSensitivity ? this.scrollParent[0].scrollLeft = r = this.scrollParent[0].scrollLeft + o.scrollSpeed : e.pageX - this.overflowOffset.left < o.scrollSensitivity && (this.scrollParent[0].scrollLeft = r = this.scrollParent[0].scrollLeft - o.scrollSpeed)) : (e.pageY - t(document).scrollTop() < o.scrollSensitivity ? r = t(document).scrollTop(t(document).scrollTop() - o.scrollSpeed) : t(window).height() - (e.pageY - t(document).scrollTop()) < o.scrollSensitivity && (r = t(document).scrollTop(t(document).scrollTop() + o.scrollSpeed)), e.pageX - t(document).scrollLeft() < o.scrollSensitivity ? r = t(document).scrollLeft(t(document).scrollLeft() - o.scrollSpeed) : t(window).width() - (e.pageX - t(document).scrollLeft()) < o.scrollSensitivity && (r = t(document).scrollLeft(t(document).scrollLeft() + o.scrollSpeed))), r !== !1 && t.ui.ddmanager && !o.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e)), this.positionAbs = this._convertPositionTo('absolute'), this.options.axis && 'y' === this.options.axis || (this.helper[0].style.left = this.position.left + 'px'), this.options.axis && 'x' === this.options.axis || (this.helper[0].style.top = this.position.top + 'px'), i = this.items.length - 1; i >= 0; i--)
                    if (s = this.items[i], n = s.item[0], a = this._intersectsWithPointer(s), a && s.instance === this.currentContainer && n !== this.currentItem[0] && this.placeholder[1 === a ? 'next' : 'prev']()[0] !== n && !t.contains(this.placeholder[0], n) && ('semi-dynamic' === this.options.type ? !t.contains(this.element[0], n) : !0)) {
                        if (this.direction = 1 === a ? 'down' : 'up', 'pointer' !== this.options.tolerance && !this._intersectsWithSides(s)) break;
                        this._rearrange(e, s),
                            this._trigger('change', e, this._uiHash());
                        break
                    }
                return this._contactContainers(e),
                t.ui.ddmanager && t.ui.ddmanager.drag(this, e),
                    this._trigger('sort', e, this._uiHash()),
                    this.lastPositionAbs = this.positionAbs, !1
            },
            _mouseStop: function(e, i) {
                if (e) {
                    if (t.ui.ddmanager && !this.options.dropBehaviour && t.ui.ddmanager.drop(this, e), this.options.revert) {
                        var s = this,
                            n = this.placeholder.offset(),
                            a = this.options.axis,
                            o = {};
                        a && 'x' !== a || (o.left = n.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollLeft)),
                        a && 'y' !== a || (o.top = n.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollTop)),
                            this.reverting = !0,
                            t(this.helper).animate(o, parseInt(this.options.revert, 10) || 500, function() {
                                s._clear(e)
                            })
                    } else this._clear(e, i);
                    return !1
                }
            },
            cancel: function() {
                if (this.dragging) {
                    this._mouseUp({
                        target: null
                    }),
                        'original' === this.options.helper ? this.currentItem.css(this._storedCSS).removeClass('ui-sortable-helper') : this.currentItem.show();
                    for (var e = this.containers.length - 1; e >= 0; e--) this.containers[e]._trigger('deactivate', null, this._uiHash(this)),
                    this.containers[e].containerCache.over && (this.containers[e]._trigger('out', null, this._uiHash(this)), this.containers[e].containerCache.over = 0)
                }
                return this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]), 'original' !== this.options.helper && this.helper && this.helper[0].parentNode && this.helper.remove(), t.extend(this, {
                    helper: null,
                    dragging: !1,
                    reverting: !1,
                    _noFinalSort: null
                }), this.domPosition.prev ? t(this.domPosition.prev).after(this.currentItem) : t(this.domPosition.parent).prepend(this.currentItem)),
                    this
            },
            serialize: function(e) {
                var i = this._getItemsAsjQuery(e && e.connected),
                    s = [];
                return e = e || {},
                    t(i).each(function() {
                        var i = (t(e.item || this).attr(e.attribute || 'id') || '').match(e.expression || /(.+)[\-=_](.+)/);
                        i && s.push((e.key || i[1] + '[]') + '=' + (e.key && e.expression ? i[1] : i[2]))
                    }), !s.length && e.key && s.push(e.key + '='),
                    s.join('&')
            },
            toArray: function(e) {
                var i = this._getItemsAsjQuery(e && e.connected),
                    s = [];
                return e = e || {},
                    i.each(function() {
                        s.push(t(e.item || this).attr(e.attribute || 'id') || '')
                    }),
                    s
            },
            _intersectsWith: function(t) {
                var e = this.positionAbs.left,
                    i = e + this.helperProportions.width,
                    s = this.positionAbs.top,
                    n = s + this.helperProportions.height,
                    a = t.left,
                    o = a + t.width,
                    r = t.top,
                    h = r + t.height,
                    l = this.offset.click.top,
                    c = this.offset.click.left,
                    u = 'x' === this.options.axis || s + l > r && h > s + l,
                    d = 'y' === this.options.axis || e + c > a && o > e + c,
                    p = u && d;
                return 'pointer' === this.options.tolerance || this.options.forcePointerForContainers || 'pointer' !== this.options.tolerance && this.helperProportions[this.floating ? 'width' : 'height'] > t[this.floating ? 'width' : 'height'] ? p : a < e + this.helperProportions.width / 2 && i - this.helperProportions.width / 2 < o && r < s + this.helperProportions.height / 2 && n - this.helperProportions.height / 2 < h
            },
            _intersectsWithPointer: function(t) {
                var i = 'x' === this.options.axis || e(this.positionAbs.top + this.offset.click.top, t.top, t.height),
                    s = 'y' === this.options.axis || e(this.positionAbs.left + this.offset.click.left, t.left, t.width),
                    n = i && s,
                    a = this._getDragVerticalDirection(),
                    o = this._getDragHorizontalDirection();
                return n ? this.floating ? o && 'right' === o || 'down' === a ? 2 : 1 : a && ('down' === a ? 2 : 1) : !1
            },
            _intersectsWithSides: function(t) {
                var i = e(this.positionAbs.top + this.offset.click.top, t.top + t.height / 2, t.height),
                    s = e(this.positionAbs.left + this.offset.click.left, t.left + t.width / 2, t.width),
                    n = this._getDragVerticalDirection(),
                    a = this._getDragHorizontalDirection();
                return this.floating && a ? 'right' === a && s || 'left' === a && !s : n && ('down' === n && i || 'up' === n && !i)
            },
            _getDragVerticalDirection: function() {
                var t = this.positionAbs.top - this.lastPositionAbs.top;
                return 0 !== t && (t > 0 ? 'down' : 'up')
            },
            _getDragHorizontalDirection: function() {
                var t = this.positionAbs.left - this.lastPositionAbs.left;
                return 0 !== t && (t > 0 ? 'right' : 'left')
            },
            refresh: function(t) {
                return this._refreshItems(t),
                    this.refreshPositions(),
                    this
            },
            _connectWith: function() {
                var t = this.options;
                return t.connectWith.constructor === String ? [
                    t.connectWith
                ] : t.connectWith
            },
            _getItemsAsjQuery: function(e) {
                var i,
                    s,
                    n,
                    a,
                    o = [],
                    r = [],
                    h = this._connectWith();
                if (h && e)
                    for (i = h.length - 1; i >= 0; i--)
                        for (n = t(h[i]), s = n.length - 1; s >= 0; s--) a = t.data(n[s], this.widgetFullName),
                        a && a !== this && !a.options.disabled && r.push([t.isFunction(a.options.items) ? a.options.items.call(a.element) : t(a.options.items, a.element).not('.ui-sortable-helper').not('.ui-sortable-placeholder'),
                            a
                        ]);
                for (r.push([t.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
                    options: this.options,
                    item: this.currentItem
                }) : t(this.options.items, this.element).not('.ui-sortable-helper').not('.ui-sortable-placeholder'),
                    this
                ]), i = r.length - 1; i >= 0; i--) r[i][0].each(function() {
                    o.push(this)
                });
                return t(o)
            },
            _removeCurrentsFromItems: function() {
                var e = this.currentItem.find(':data(' + this.widgetName + '-item)');
                this.items = t.grep(this.items, function(t) {
                    for (var i = 0; i < e.length; i++)
                        if (e[i] === t.item[0]) return !1;
                    return !0
                })
            },
            _refreshItems: function(e) {
                this.items = [],
                    this.containers = [
                        this
                    ];
                var i,
                    s,
                    n,
                    a,
                    o,
                    r,
                    h,
                    l,
                    c = this.items,
                    u = [
                        [t.isFunction(this.options.items) ? this.options.items.call(this.element[0], e, {
                            item: this.currentItem
                        }) : t(this.options.items, this.element),
                            this
                        ]
                    ],
                    d = this._connectWith();
                if (d && this.ready)
                    for (i = d.length - 1; i >= 0; i--)
                        for (n = t(d[i]), s = n.length - 1; s >= 0; s--) a = t.data(n[s], this.widgetFullName),
                        a && a !== this && !a.options.disabled && (u.push([t.isFunction(a.options.items) ? a.options.items.call(a.element[0], e, {
                            item: this.currentItem
                        }) : t(a.options.items, a.element),
                            a
                        ]), this.containers.push(a));
                for (i = u.length - 1; i >= 0; i--)
                    for (o = u[i][1], r = u[i][0], s = 0, l = r.length; l > s; s++) h = t(r[s]),
                        h.data(this.widgetName + '-item', o),
                        c.push({
                            item: h,
                            instance: o,
                            width: 0,
                            height: 0,
                            left: 0,
                            top: 0
                        })
            },
            refreshPositions: function(e) {
                this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset());
                var i,
                    s,
                    n,
                    a;
                for (i = this.items.length - 1; i >= 0; i--) s = this.items[i],
                s.instance !== this.currentContainer && this.currentContainer && s.item[0] !== this.currentItem[0] || (n = this.options.toleranceElement ? t(this.options.toleranceElement, s.item) : s.item, e || (s.width = n.outerWidth(), s.height = n.outerHeight()), a = n.offset(), s.left = a.left, s.top = a.top);
                if (this.options.custom && this.options.custom.refreshContainers) this.options.custom.refreshContainers.call(this);
                else
                    for (i = this.containers.length - 1; i >= 0; i--) a = this.containers[i].element.offset(),
                        this.containers[i].containerCache.left = a.left,
                        this.containers[i].containerCache.top = a.top,
                        this.containers[i].containerCache.width = this.containers[i].element.outerWidth(),
                        this.containers[i].containerCache.height = this.containers[i].element.outerHeight();
                return this
            },
            _createPlaceholder: function(e) {
                e = e || this;
                var i,
                    s = e.options;
                s.placeholder && s.placeholder.constructor !== String || (i = s.placeholder, s.placeholder = {
                    element: function() {
                        var s = e.currentItem[0].nodeName.toLowerCase(),
                            n = t('<' + s + '>', e.document[0]).addClass(i || e.currentItem[0].className + ' ui-sortable-placeholder').removeClass('ui-sortable-helper');
                        return 'tr' === s ? e.currentItem.children().each(function() {
                            t('<td>&#160;</td>', e.document[0]).attr('colspan', t(this).attr('colspan') || 1).appendTo(n)
                        }) : 'img' === s && n.attr('src', e.currentItem.attr('src')),
                        i || n.css('visibility', 'hidden'),
                            n
                    },
                    update: function(t, n) {
                        (!i || s.forcePlaceholderSize) && (n.height() || n.height(e.currentItem.innerHeight() - parseInt(e.currentItem.css('paddingTop') || 0, 10) - parseInt(e.currentItem.css('paddingBottom') || 0, 10)), n.width() || n.width(e.currentItem.innerWidth() - parseInt(e.currentItem.css('paddingLeft') || 0, 10) - parseInt(e.currentItem.css('paddingRight') || 0, 10)))
                    }
                }),
                    e.placeholder = t(s.placeholder.element.call(e.element, e.currentItem)),
                    e.currentItem.after(e.placeholder),
                    s.placeholder.update(e, e.placeholder)
            },
            _contactContainers: function(s) {
                var n,
                    a,
                    o,
                    r,
                    h,
                    l,
                    c,
                    u,
                    d,
                    p,
                    f = null,
                    g = null;
                for (n = this.containers.length - 1; n >= 0; n--)
                    if (!t.contains(this.currentItem[0], this.containers[n].element[0]))
                        if (this._intersectsWith(this.containers[n].containerCache)) {
                            if (f && t.contains(this.containers[n].element[0], f.element[0])) continue;
                            f = this.containers[n],
                                g = n
                        } else this.containers[n].containerCache.over && (this.containers[n]._trigger('out', s, this._uiHash(this)), this.containers[n].containerCache.over = 0);
                if (f)
                    if (1 === this.containers.length) this.containers[g].containerCache.over || (this.containers[g]._trigger('over', s, this._uiHash(this)), this.containers[g].containerCache.over = 1);
                    else {
                        for (o = 10000, r = null, p = f.floating || i(this.currentItem), h = p ? 'left' : 'top', l = p ? 'width' : 'height', c = this.positionAbs[h] + this.offset.click[h], a = this.items.length - 1; a >= 0; a--) t.contains(this.containers[g].element[0], this.items[a].item[0]) && this.items[a].item[0] !== this.currentItem[0] && (!p || e(this.positionAbs.top + this.offset.click.top, this.items[a].top, this.items[a].height)) && (u = this.items[a].item.offset()[h], d = !1, Math.abs(u - c) > Math.abs(u + this.items[a][l] - c) && (d = !0, u += this.items[a][l]), Math.abs(u - c) < o && (o = Math.abs(u - c), r = this.items[a], this.direction = d ? 'up' : 'down'));
                        if (!r && !this.options.dropOnEmpty) return;
                        if (this.currentContainer === this.containers[g]) return;
                        r ? this._rearrange(s, r, null, !0) : this._rearrange(s, null, this.containers[g].element, !0),
                            this._trigger('change', s, this._uiHash()),
                            this.containers[g]._trigger('change', s, this._uiHash(this)),
                            this.currentContainer = this.containers[g],
                            this.options.placeholder.update(this.currentContainer, this.placeholder),
                            this.containers[g]._trigger('over', s, this._uiHash(this)),
                            this.containers[g].containerCache.over = 1
                    }
            },
            _createHelper: function(e) {
                var i = this.options,
                    s = t.isFunction(i.helper) ? t(i.helper.apply(this.element[0], [
                        e,
                        this.currentItem
                    ])) : 'clone' === i.helper ? this.currentItem.clone() : this.currentItem;
                return s.parents('body').length || t('parent' !== i.appendTo ? i.appendTo : this.currentItem[0].parentNode)[0].appendChild(s[0]),
                s[0] === this.currentItem[0] && (this._storedCSS = {
                    width: this.currentItem[0].style.width,
                    height: this.currentItem[0].style.height,
                    position: this.currentItem.css('position'),
                    top: this.currentItem.css('top'),
                    left: this.currentItem.css('left')
                }),
                i.ignoreHelperSize || ((!s[0].style.width || i.forceHelperSize) && s.width(this.currentItem.width()), (!s[0].style.height || i.forceHelperSize) && s.height(this.currentItem.height())),
                    s
            },
            _adjustOffsetFromHelper: function(e) {
                'string' == typeof e && (e = e.split(' ')),
                t.isArray(e) && (e = {
                    left: +e[0],
                    top: +e[1] || 0
                }),
                'left' in e && (this.offset.click.left = e.left + this.margins.left),
                'right' in e && (this.offset.click.left = this.helperProportions.width - e.right + this.margins.left),
                'top' in e && (this.offset.click.top = e.top + this.margins.top),
                'bottom' in e && (this.offset.click.top = this.helperProportions.height - e.bottom + this.margins.top)
            },
            _getParentOffset: function() {
                this.offsetParent = this.helper.offsetParent();
                var e = this.offsetParent.offset();
                return 'absolute' === this.cssPosition && this.scrollParent[0] !== document && t.contains(this.scrollParent[0], this.offsetParent[0]) && (e.left += this.scrollParent.scrollLeft(), e.top += this.scrollParent.scrollTop()), (this.offsetParent[0] === document.body || this.offsetParent[0].tagName && 'html' === this.offsetParent[0].tagName.toLowerCase() && t.ui.ie) && (e = {
                    top: 0,
                    left: 0
                }), {
                    top: e.top + (parseInt(this.offsetParent.css('borderTopWidth'), 10) || 0),
                    left: e.left + (parseInt(this.offsetParent.css('borderLeftWidth'), 10) || 0)
                }
            },
            _getRelativeOffset: function() {
                if ('relative' === this.cssPosition) {
                    var t = this.currentItem.position();
                    return {
                        top: t.top - (parseInt(this.helper.css('top'), 10) || 0) + this.scrollParent.scrollTop(),
                        left: t.left - (parseInt(this.helper.css('left'), 10) || 0) + this.scrollParent.scrollLeft()
                    }
                }
                return {
                    top: 0,
                    left: 0
                }
            },
            _cacheMargins: function() {
                this.margins = {
                    left: parseInt(this.currentItem.css('marginLeft'), 10) || 0,
                    top: parseInt(this.currentItem.css('marginTop'), 10) || 0
                }
            },
            _cacheHelperProportions: function() {
                this.helperProportions = {
                    width: this.helper.outerWidth(),
                    height: this.helper.outerHeight()
                }
            },
            _setContainment: function() {
                var e,
                    i,
                    s,
                    n = this.options;
                'parent' === n.containment && (n.containment = this.helper[0].parentNode), ('document' === n.containment || 'window' === n.containment) && (this.containment = [
                    0 - this.offset.relative.left - this.offset.parent.left,
                    0 - this.offset.relative.top - this.offset.parent.top,
                    t('document' === n.containment ? document : window).width() - this.helperProportions.width - this.margins.left, (t('document' === n.containment ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top
                ]),
                /^(document|window|parent)$/.test(n.containment) || (e = t(n.containment)[0], i = t(n.containment).offset(), s = 'hidden' !== t(e).css('overflow'), this.containment = [
                    i.left + (parseInt(t(e).css('borderLeftWidth'), 10) || 0) + (parseInt(t(e).css('paddingLeft'), 10) || 0) - this.margins.left,
                    i.top + (parseInt(t(e).css('borderTopWidth'), 10) || 0) + (parseInt(t(e).css('paddingTop'), 10) || 0) - this.margins.top,
                    i.left + (s ? Math.max(e.scrollWidth, e.offsetWidth) : e.offsetWidth) - (parseInt(t(e).css('borderLeftWidth'), 10) || 0) - (parseInt(t(e).css('paddingRight'), 10) || 0) - this.helperProportions.width - this.margins.left,
                    i.top + (s ? Math.max(e.scrollHeight, e.offsetHeight) : e.offsetHeight) - (parseInt(t(e).css('borderTopWidth'), 10) || 0) - (parseInt(t(e).css('paddingBottom'), 10) || 0) - this.helperProportions.height - this.margins.top
                ])
            },
            _convertPositionTo: function(e, i) {
                i || (i = this.position);
                var s = 'absolute' === e ? 1 : -1,
                    n = 'absolute' !== this.cssPosition || this.scrollParent[0] !== document && t.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
                    a = /(html|body)/i.test(n[0].tagName);
                return {
                    top: i.top + this.offset.relative.top * s + this.offset.parent.top * s - ('fixed' === this.cssPosition ? -this.scrollParent.scrollTop() : a ? 0 : n.scrollTop()) * s,
                    left: i.left + this.offset.relative.left * s + this.offset.parent.left * s - ('fixed' === this.cssPosition ? -this.scrollParent.scrollLeft() : a ? 0 : n.scrollLeft()) * s
                }
            },
            _generatePosition: function(e) {
                var i,
                    s,
                    n = this.options,
                    a = e.pageX,
                    o = e.pageY,
                    r = 'absolute' !== this.cssPosition || this.scrollParent[0] !== document && t.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
                    h = /(html|body)/i.test(r[0].tagName);
                return 'relative' !== this.cssPosition || this.scrollParent[0] !== document && this.scrollParent[0] !== this.offsetParent[0] || (this.offset.relative = this._getRelativeOffset()),
                this.originalPosition && (this.containment && (e.pageX - this.offset.click.left < this.containment[0] && (a = this.containment[0] + this.offset.click.left), e.pageY - this.offset.click.top < this.containment[1] && (o = this.containment[1] + this.offset.click.top), e.pageX - this.offset.click.left > this.containment[2] && (a = this.containment[2] + this.offset.click.left), e.pageY - this.offset.click.top > this.containment[3] && (o = this.containment[3] + this.offset.click.top)), n.grid && (i = this.originalPageY + Math.round((o - this.originalPageY) / n.grid[1]) * n.grid[1], o = this.containment ? i - this.offset.click.top >= this.containment[1] && i - this.offset.click.top <= this.containment[3] ? i : i - this.offset.click.top >= this.containment[1] ? i - n.grid[1] : i + n.grid[1] : i, s = this.originalPageX + Math.round((a - this.originalPageX) / n.grid[0]) * n.grid[0], a = this.containment ? s - this.offset.click.left >= this.containment[0] && s - this.offset.click.left <= this.containment[2] ? s : s - this.offset.click.left >= this.containment[0] ? s - n.grid[0] : s + n.grid[0] : s)), {
                    top: o - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ('fixed' === this.cssPosition ? -this.scrollParent.scrollTop() : h ? 0 : r.scrollTop()),
                    left: a - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ('fixed' === this.cssPosition ? -this.scrollParent.scrollLeft() : h ? 0 : r.scrollLeft())
                }
            },
            _rearrange: function(t, e, i, s) {
                i ? i[0].appendChild(this.placeholder[0]) : e.item[0].parentNode.insertBefore(this.placeholder[0], 'down' === this.direction ? e.item[0] : e.item[0].nextSibling),
                    this.counter = this.counter ? ++this.counter : 1;
                var n = this.counter;
                this._delay(function() {
                    n === this.counter && this.refreshPositions(!s)
                })
            },
            _clear: function(t, e) {
                this.reverting = !1;
                var i,
                    s = [];
                if (!this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem), this._noFinalSort = null, this.helper[0] === this.currentItem[0]) {
                    for (i in this._storedCSS)('auto' === this._storedCSS[i] || 'static' === this._storedCSS[i]) && (this._storedCSS[i] = '');
                    this.currentItem.css(this._storedCSS).removeClass('ui-sortable-helper')
                } else this.currentItem.css('display', 'block');
                for (this.fromOutside && !e && s.push(function(t) {
                    this._trigger('receive', t, this._uiHash(this.fromOutside))
                }), !this.fromOutside && this.domPosition.prev === this.currentItem.prev().not('.ui-sortable-helper')[0] && this.domPosition.parent === this.currentItem.parent()[0] || e || s.push(function(t) {
                    this._trigger('update', t, this._uiHash())
                }), this !== this.currentContainer && (e || (s.push(function(t) {
                    this._trigger('remove', t, this._uiHash())
                }), s.push(function(t) {
                    return function(e) {
                        t._trigger('receive', e, this._uiHash(this))
                    }
                }.call(this, this.currentContainer)), s.push(function(t) {
                    return function(e) {
                        t._trigger('update', e, this._uiHash(this))
                    }
                }.call(this, this.currentContainer)))), i = this.containers.length - 1; i >= 0; i--) e || s.push(function(t) {
                    return function(e) {
                        t._trigger('deactivate', e, this._uiHash(this))
                    }
                }.call(this, this.containers[i])),
                this.containers[i].containerCache.over && (s.push(function(t) {
                    return function(e) {
                        t._trigger('out', e, this._uiHash(this))
                    }
                }.call(this, this.containers[i])), this.containers[i].containerCache.over = 0);
                if (this.storedCursor && (this.document.find('body').css('cursor', this.storedCursor), this.storedStylesheet.remove()), this._storedOpacity && this.helper.css('opacity', this._storedOpacity), this._storedZIndex && this.helper.css('zIndex', 'auto' === this._storedZIndex ? '' : this._storedZIndex), this.dragging = !1, this.cancelHelperRemoval) {
                    if (!e) {
                        for (this._trigger('beforeStop', t, this._uiHash()), i = 0; i < s.length; i++) s[i].call(this, t);
                        this._trigger('stop', t, this._uiHash())
                    }
                    return this.fromOutside = !1, !1
                }
                if (e || this._trigger('beforeStop', t, this._uiHash()), this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.helper[0] !== this.currentItem[0] && this.helper.remove(), this.helper = null, !e) {
                    for (i = 0; i < s.length; i++) s[i].call(this, t);
                    this._trigger('stop', t, this._uiHash())
                }
                return this.fromOutside = !1, !0
            },
            _trigger: function() {
                t.Widget.prototype._trigger.apply(this, arguments) === !1 && this.cancel()
            },
            _uiHash: function(e) {
                var i = e || this;
                return {
                    helper: i.helper,
                    placeholder: i.placeholder || t([]),
                    position: i.position,
                    originalPosition: i.originalPosition,
                    offset: i.positionAbs,
                    item: i.currentItem,
                    sender: e ? e.element : null
                }
            }
        })
    }(jQuery),
    function(t, e) {
        function i() {
            this._curInst = null,
                this._keyEvent = !1,
                this._disabledInputs = [],
                this._datepickerShowing = !1,
                this._inDialog = !1,
                this._mainDivId = 'ui-datepicker-div',
                this._inlineClass = 'ui-datepicker-inline',
                this._appendClass = 'ui-datepicker-append',
                this._triggerClass = 'ui-datepicker-trigger',
                this._dialogClass = 'ui-datepicker-dialog',
                this._disableClass = 'ui-datepicker-disabled',
                this._unselectableClass = 'ui-datepicker-unselectable',
                this._currentClass = 'ui-datepicker-current-day',
                this._dayOverClass = 'ui-datepicker-days-cell-over',
                this.regional = [],
                this.regional[''] = {
                    closeText: 'Done',
                    prevText: 'Prev',
                    nextText: 'Next',
                    currentText: 'Today',
                    monthNames: [
                        'January',
                        'February',
                        'March',
                        'April',
                        'May',
                        'June',
                        'July',
                        'August',
                        'September',
                        'October',
                        'November',
                        'December'
                    ],
                    monthNamesShort: [
                        'Jan',
                        'Feb',
                        'Mar',
                        'Apr',
                        'May',
                        'Jun',
                        'Jul',
                        'Aug',
                        'Sep',
                        'Oct',
                        'Nov',
                        'Dec'
                    ],
                    dayNames: [
                        'Sunday',
                        'Monday',
                        'Tuesday',
                        'Wednesday',
                        'Thursday',
                        'Friday',
                        'Saturday'
                    ],
                    dayNamesShort: [
                        'Sun',
                        'Mon',
                        'Tue',
                        'Wed',
                        'Thu',
                        'Fri',
                        'Sat'
                    ],
                    dayNamesMin: [
                        'Su',
                        'Mo',
                        'Tu',
                        'We',
                        'Th',
                        'Fr',
                        'Sa'
                    ],
                    weekHeader: 'Wk',
                    dateFormat: 'mm/dd/yy',
                    firstDay: 0,
                    isRTL: !1,
                    showMonthAfterYear: !1,
                    yearSuffix: ''
                },
                this._defaults = {
                    showOn: 'focus',
                    showAnim: 'fadeIn',
                    showOptions: {},
                    defaultDate: null,
                    appendText: '',
                    buttonText: '...',
                    buttonImage: '',
                    buttonImageOnly: !1,
                    hideIfNoPrevNext: !1,
                    navigationAsDateFormat: !1,
                    gotoCurrent: !1,
                    changeMonth: !1,
                    changeYear: !1,
                    yearRange: 'c-10:c+10',
                    showOtherMonths: !1,
                    selectOtherMonths: !1,
                    showWeek: !1,
                    calculateWeek: this.iso8601Week,
                    shortYearCutoff: '+10',
                    minDate: null,
                    maxDate: null,
                    duration: 'fast',
                    beforeShowDay: null,
                    beforeShow: null,
                    onSelect: null,
                    onChangeMonthYear: null,
                    onClose: null,
                    numberOfMonths: 1,
                    showCurrentAtPos: 0,
                    stepMonths: 1,
                    stepBigMonths: 12,
                    altField: '',
                    altFormat: '',
                    constrainInput: !0,
                    showButtonPanel: !1,
                    autoSize: !1,
                    disabled: !1
                },
                t.extend(this._defaults, this.regional['']),
                this.dpDiv = s(t('<div id=\'' + this._mainDivId + '\' class=\'ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all\'></div>'))
        }

        function s(e) {
            var i = 'button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a';
            return e.delegate(i, 'mouseout', function() {
                t(this).removeClass('ui-state-hover'), -1 !== this.className.indexOf('ui-datepicker-prev') && t(this).removeClass('ui-datepicker-prev-hover'), -1 !== this.className.indexOf('ui-datepicker-next') && t(this).removeClass('ui-datepicker-next-hover')
            }).delegate(i, 'mouseover', function() {
                t.datepicker._isDisabledDatepicker(a.inline ? e.parent()[0] : a.input[0]) || (t(this).parents('.ui-datepicker-calendar').find('a').removeClass('ui-state-hover'), t(this).addClass('ui-state-hover'), -1 !== this.className.indexOf('ui-datepicker-prev') && t(this).addClass('ui-datepicker-prev-hover'), -1 !== this.className.indexOf('ui-datepicker-next') && t(this).addClass('ui-datepicker-next-hover'))
            })
        }

        function n(e, i) {
            t.extend(e, i);
            for (var s in i) null == i[s] && (e[s] = i[s]);
            return e
        }
        t.extend(t.ui, {
            datepicker: {
                version: '1.10.3'
            }
        });
        var a,
            o = 'datepicker';
        t.extend(i.prototype, {
            markerClassName: 'hasDatepicker',
            maxRows: 4,
            _widgetDatepicker: function() {
                return this.dpDiv
            },
            setDefaults: function(t) {
                return n(this._defaults, t || {}),
                    this
            },
            _attachDatepicker: function(e, i) {
                var s,
                    n,
                    a;
                s = e.nodeName.toLowerCase(),
                    n = 'div' === s || 'span' === s,
                e.id || (this.uuid += 1, e.id = 'dp' + this.uuid),
                    a = this._newInst(t(e), n),
                    a.settings = t.extend({}, i || {}),
                    'input' === s ? this._connectDatepicker(e, a) : n && this._inlineDatepicker(e, a)
            },
            _newInst: function(e, i) {
                var n = e[0].id.replace(/([^A-Za-z0-9_\-])/g, '\\\\$1');
                return {
                    id: n,
                    input: e,
                    selectedDay: 0,
                    selectedMonth: 0,
                    selectedYear: 0,
                    drawMonth: 0,
                    drawYear: 0,
                    inline: i,
                    dpDiv: i ? s(t('<div class=\'' + this._inlineClass + ' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all\'></div>')) : this.dpDiv
                }
            },
            _connectDatepicker: function(e, i) {
                var s = t(e);
                i.append = t([]),
                    i.trigger = t([]),
                s.hasClass(this.markerClassName) || (this._attachments(s, i), s.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp), this._autoSize(i), t.data(e, o, i), i.settings.disabled && this._disableDatepicker(e))
            },
            _attachments: function(e, i) {
                var s,
                    n,
                    a,
                    o = this._get(i, 'appendText'),
                    r = this._get(i, 'isRTL');
                i.append && i.append.remove(),
                o && (i.append = t('<span class=\'' + this._appendClass + '\'>' + o + '</span>'), e[r ? 'before' : 'after'](i.append)),
                    e.unbind('focus', this._showDatepicker),
                i.trigger && i.trigger.remove(),
                    s = this._get(i, 'showOn'), ('focus' === s || 'both' === s) && e.focus(this._showDatepicker), ('button' === s || 'both' === s) && (n = this._get(i, 'buttonText'), a = this._get(i, 'buttonImage'), i.trigger = t(this._get(i, 'buttonImageOnly') ? t('<img/>').addClass(this._triggerClass).attr({
                    src: a,
                    alt: n,
                    title: n
                }) : t('<button type=\'button\'></button>').addClass(this._triggerClass).html(a ? t('<img/>').attr({
                    src: a,
                    alt: n,
                    title: n
                }) : n)), e[r ? 'before' : 'after'](i.trigger), i.trigger.click(function() {
                    return t.datepicker._datepickerShowing && t.datepicker._lastInput === e[0] ? t.datepicker._hideDatepicker() : t.datepicker._datepickerShowing && t.datepicker._lastInput !== e[0] ? (t.datepicker._hideDatepicker(), t.datepicker._showDatepicker(e[0])) : t.datepicker._showDatepicker(e[0]), !1
                }))
            },
            _autoSize: function(t) {
                if (this._get(t, 'autoSize') && !t.inline) {
                    var e,
                        i,
                        s,
                        n,
                        a = new Date(2009, 11, 20),
                        o = this._get(t, 'dateFormat');
                    o.match(/[DM]/) && (e = function(t) {
                        for (i = 0, s = 0, n = 0; n < t.length; n++) t[n].length > i && (i = t[n].length, s = n);
                        return s
                    }, a.setMonth(e(this._get(t, o.match(/MM/) ? 'monthNames' : 'monthNamesShort'))), a.setDate(e(this._get(t, o.match(/DD/) ? 'dayNames' : 'dayNamesShort')) + 20 - a.getDay())),
                        t.input.attr('size', this._formatDate(t, a).length)
                }
            },
            _inlineDatepicker: function(e, i) {
                var s = t(e);
                s.hasClass(this.markerClassName) || (s.addClass(this.markerClassName).append(i.dpDiv), t.data(e, o, i), this._setDate(i, this._getDefaultDate(i), !0), this._updateDatepicker(i), this._updateAlternate(i), i.settings.disabled && this._disableDatepicker(e), i.dpDiv.css('display', 'block'))
            },
            _dialogDatepicker: function(e, i, s, a, r) {
                var h,
                    l,
                    c,
                    u,
                    d,
                    p = this._dialogInst;
                return p || (this.uuid += 1, h = 'dp' + this.uuid, this._dialogInput = t('<input type=\'text\' id=\'' + h + '\' style=\'position: absolute; top: -100px; width: 0px;\'/>'), this._dialogInput.keydown(this._doKeyDown), t('body').append(this._dialogInput), p = this._dialogInst = this._newInst(this._dialogInput, !1), p.settings = {}, t.data(this._dialogInput[0], o, p)),
                    n(p.settings, a || {}),
                    i = i && i.constructor === Date ? this._formatDate(p, i) : i,
                    this._dialogInput.val(i),
                    this._pos = r ? r.length ? r : [
                        r.pageX,
                        r.pageY
                    ] : null,
                this._pos || (l = document.documentElement.clientWidth, c = document.documentElement.clientHeight, u = document.documentElement.scrollLeft || document.body.scrollLeft, d = document.documentElement.scrollTop || document.body.scrollTop, this._pos = [
                    l / 2 - 100 + u,
                    c / 2 - 150 + d
                ]),
                    this._dialogInput.css('left', this._pos[0] + 20 + 'px').css('top', this._pos[1] + 'px'),
                    p.settings.onSelect = s,
                    this._inDialog = !0,
                    this.dpDiv.addClass(this._dialogClass),
                    this._showDatepicker(this._dialogInput[0]),
                t.blockUI && t.blockUI(this.dpDiv),
                    t.data(this._dialogInput[0], o, p),
                    this
            },
            _destroyDatepicker: function(e) {
                var i,
                    s = t(e),
                    n = t.data(e, o);
                s.hasClass(this.markerClassName) && (i = e.nodeName.toLowerCase(), t.removeData(e, o), 'input' === i ? (n.append.remove(), n.trigger.remove(), s.removeClass(this.markerClassName).unbind('focus', this._showDatepicker).unbind('keydown', this._doKeyDown).unbind('keypress', this._doKeyPress).unbind('keyup', this._doKeyUp)) : ('div' === i || 'span' === i) && s.removeClass(this.markerClassName).empty())
            },
            _enableDatepicker: function(e) {
                var i,
                    s,
                    n = t(e),
                    a = t.data(e, o);
                n.hasClass(this.markerClassName) && (i = e.nodeName.toLowerCase(), 'input' === i ? (e.disabled = !1, a.trigger.filter('button').each(function() {
                    this.disabled = !1
                }).end().filter('img').css({
                    opacity: '1.0',
                    cursor: ''
                })) : ('div' === i || 'span' === i) && (s = n.children('.' + this._inlineClass), s.children().removeClass('ui-state-disabled'), s.find('select.ui-datepicker-month, select.ui-datepicker-year').prop('disabled', !1)), this._disabledInputs = t.map(this._disabledInputs, function(t) {
                    return t === e ? null : t
                }))
            },
            _disableDatepicker: function(e) {
                var i,
                    s,
                    n = t(e),
                    a = t.data(e, o);
                n.hasClass(this.markerClassName) && (i = e.nodeName.toLowerCase(), 'input' === i ? (e.disabled = !0, a.trigger.filter('button').each(function() {
                    this.disabled = !0
                }).end().filter('img').css({
                    opacity: '0.5',
                    cursor: 'default'
                })) : ('div' === i || 'span' === i) && (s = n.children('.' + this._inlineClass), s.children().addClass('ui-state-disabled'), s.find('select.ui-datepicker-month, select.ui-datepicker-year').prop('disabled', !0)), this._disabledInputs = t.map(this._disabledInputs, function(t) {
                    return t === e ? null : t
                }), this._disabledInputs[this._disabledInputs.length] = e)
            },
            _isDisabledDatepicker: function(t) {
                if (!t) return !1;
                for (var e = 0; e < this._disabledInputs.length; e++)
                    if (this._disabledInputs[e] === t) return !0;
                return !1
            },
            _getInst: function(e) {
                try {
                    return t.data(e, o)
                } catch (i) {
                    throw 'Missing instance data for this datepicker'
                }
            },
            _optionDatepicker: function(i, s, a) {
                var o,
                    r,
                    h,
                    l,
                    c = this._getInst(i);
                return 2 === arguments.length && 'string' == typeof s ? 'defaults' === s ? t.extend({}, t.datepicker._defaults) : c ? 'all' === s ? t.extend({}, c.settings) : this._get(c, s) : null : (o = s || {}, 'string' == typeof s && (o = {}, o[s] = a), void(c && (this._curInst === c && this._hideDatepicker(), r = this._getDateDatepicker(i, !0), h = this._getMinMaxDate(c, 'min'), l = this._getMinMaxDate(c, 'max'), n(c.settings, o), null !== h && o.dateFormat !== e && o.minDate === e && (c.settings.minDate = this._formatDate(c, h)), null !== l && o.dateFormat !== e && o.maxDate === e && (c.settings.maxDate = this._formatDate(c, l)), 'disabled' in o && (o.disabled ? this._disableDatepicker(i) : this._enableDatepicker(i)), this._attachments(t(i), c), this._autoSize(c), this._setDate(c, r), this._updateAlternate(c), this._updateDatepicker(c))))
            },
            _changeDatepicker: function(t, e, i) {
                this._optionDatepicker(t, e, i)
            },
            _refreshDatepicker: function(t) {
                var e = this._getInst(t);
                e && this._updateDatepicker(e)
            },
            _setDateDatepicker: function(t, e) {
                var i = this._getInst(t);
                i && (this._setDate(i, e), this._updateDatepicker(i), this._updateAlternate(i))
            },
            _getDateDatepicker: function(t, e) {
                var i = this._getInst(t);
                return i && !i.inline && this._setDateFromField(i, e),
                    i ? this._getDate(i) : null
            },
            _doKeyDown: function(e) {
                var i,
                    s,
                    n,
                    a = t.datepicker._getInst(e.target),
                    o = !0,
                    r = a.dpDiv.is('.ui-datepicker-rtl');
                if (a._keyEvent = !0, t.datepicker._datepickerShowing) switch (e.keyCode) {
                    case 9:
                        t.datepicker._hideDatepicker(),
                            o = !1;
                        break;
                    case 13:
                        return n = t('td.' + t.datepicker._dayOverClass + ':not(.' + t.datepicker._currentClass + ')', a.dpDiv),
                        n[0] && t.datepicker._selectDay(e.target, a.selectedMonth, a.selectedYear, n[0]),
                            i = t.datepicker._get(a, 'onSelect'),
                            i ? (s = t.datepicker._formatDate(a), i.apply(a.input ? a.input[0] : null, [
                                s,
                                a
                            ])) : t.datepicker._hideDatepicker(), !1;
                    case 27:
                        t.datepicker._hideDatepicker();
                        break;
                    case 33:
                        t.datepicker._adjustDate(e.target, e.ctrlKey ? -t.datepicker._get(a, 'stepBigMonths') : -t.datepicker._get(a, 'stepMonths'), 'M');
                        break;
                    case 34:
                        t.datepicker._adjustDate(e.target, e.ctrlKey ? +t.datepicker._get(a, 'stepBigMonths') : +t.datepicker._get(a, 'stepMonths'), 'M');
                        break;
                    case 35:
                        (e.ctrlKey || e.metaKey) && t.datepicker._clearDate(e.target),
                            o = e.ctrlKey || e.metaKey;
                        break;
                    case 36:
                        (e.ctrlKey || e.metaKey) && t.datepicker._gotoToday(e.target),
                            o = e.ctrlKey || e.metaKey;
                        break;
                    case 37:
                        (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, r ? 1 : -1, 'D'),
                            o = e.ctrlKey || e.metaKey,
                        e.originalEvent.altKey && t.datepicker._adjustDate(e.target, e.ctrlKey ? -t.datepicker._get(a, 'stepBigMonths') : -t.datepicker._get(a, 'stepMonths'), 'M');
                        break;
                    case 38:
                        (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, -7, 'D'),
                            o = e.ctrlKey || e.metaKey;
                        break;
                    case 39:
                        (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, r ? -1 : 1, 'D'),
                            o = e.ctrlKey || e.metaKey,
                        e.originalEvent.altKey && t.datepicker._adjustDate(e.target, e.ctrlKey ? +t.datepicker._get(a, 'stepBigMonths') : +t.datepicker._get(a, 'stepMonths'), 'M');
                        break;
                    case 40:
                        (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, 7, 'D'),
                            o = e.ctrlKey || e.metaKey;
                        break;
                    default:
                        o = !1
                } else 36 === e.keyCode && e.ctrlKey ? t.datepicker._showDatepicker(this) : o = !1;
                o && (e.preventDefault(), e.stopPropagation())
            },
            _doKeyPress: function(e) {
                var i,
                    s,
                    n = t.datepicker._getInst(e.target);
                return t.datepicker._get(n, 'constrainInput') ? (i = t.datepicker._possibleChars(t.datepicker._get(n, 'dateFormat')), s = String.fromCharCode(null == e.charCode ? e.keyCode : e.charCode), e.ctrlKey || e.metaKey || ' ' > s || !i || i.indexOf(s) > -1) : void 0
            },
            _doKeyUp: function(e) {
                var i,
                    s = t.datepicker._getInst(e.target);
                if (s.input.val() !== s.lastVal) try {
                    i = t.datepicker.parseDate(t.datepicker._get(s, 'dateFormat'), s.input ? s.input.val() : null, t.datepicker._getFormatConfig(s)),
                    i && (t.datepicker._setDateFromField(s), t.datepicker._updateAlternate(s), t.datepicker._updateDatepicker(s))
                } catch (n) {}
                return !0
            },
            _showDatepicker: function(e) {
                if (e = e.target || e, 'input' !== e.nodeName.toLowerCase() && (e = t('input', e.parentNode)[0]), !t.datepicker._isDisabledDatepicker(e) && t.datepicker._lastInput !== e) {
                    var i,
                        s,
                        a,
                        o,
                        r,
                        h,
                        l;
                    i = t.datepicker._getInst(e),
                    t.datepicker._curInst && t.datepicker._curInst !== i && (t.datepicker._curInst.dpDiv.stop(!0, !0), i && t.datepicker._datepickerShowing && t.datepicker._hideDatepicker(t.datepicker._curInst.input[0])),
                        s = t.datepicker._get(i, 'beforeShow'),
                        a = s ? s.apply(e, [
                            e,
                            i
                        ]) : {},
                    a !== !1 && (n(i.settings, a), i.lastVal = null, t.datepicker._lastInput = e, t.datepicker._setDateFromField(i), t.datepicker._inDialog && (e.value = ''), t.datepicker._pos || (t.datepicker._pos = t.datepicker._findPos(e), t.datepicker._pos[1] += e.offsetHeight), o = !1, t(e).parents().each(function() {
                        return o |= 'fixed' === t(this).css('position'), !o
                    }), r = {
                        left: t.datepicker._pos[0],
                        top: t.datepicker._pos[1]
                    }, t.datepicker._pos = null, i.dpDiv.empty(), i.dpDiv.css({
                        position: 'absolute',
                        display: 'block',
                        top: '-1000px'
                    }), t.datepicker._updateDatepicker(i), r = t.datepicker._checkOffset(i, r, o), i.dpDiv.css({
                        position: t.datepicker._inDialog && t.blockUI ? 'static' : o ? 'fixed' : 'absolute',
                        display: 'none',
                        left: r.left + 'px',
                        top: r.top + 'px'
                    }), i.inline || (h = t.datepicker._get(i, 'showAnim'), l = t.datepicker._get(i, 'duration'), i.dpDiv.zIndex(t(e).zIndex() + 1), t.datepicker._datepickerShowing = !0, t.effects && t.effects.effect[h] ? i.dpDiv.show(h, t.datepicker._get(i, 'showOptions'), l) : i.dpDiv[h || 'show'](h ? l : null), t.datepicker._shouldFocusInput(i) && i.input.focus(), t.datepicker._curInst = i))
                }
            },
            _updateDatepicker: function(e) {
                this.maxRows = 4,
                    a = e,
                    e.dpDiv.empty().append(this._generateHTML(e)),
                    this._attachHandlers(e),
                    e.dpDiv.find('.' + this._dayOverClass + ' a').mouseover();
                var i,
                    s = this._getNumberOfMonths(e),
                    n = s[1],
                    o = 17;
                e.dpDiv.removeClass('ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4').width(''),
                n > 1 && e.dpDiv.addClass('ui-datepicker-multi-' + n).css('width', o * n + 'em'),
                    e.dpDiv[(1 !== s[0] || 1 !== s[1] ? 'add' : 'remove') + 'Class']('ui-datepicker-multi'),
                    e.dpDiv[(this._get(e, 'isRTL') ? 'add' : 'remove') + 'Class']('ui-datepicker-rtl'),
                e === t.datepicker._curInst && t.datepicker._datepickerShowing && t.datepicker._shouldFocusInput(e) && e.input.focus(),
                e.yearshtml && (i = e.yearshtml, setTimeout(function() {
                    i === e.yearshtml && e.yearshtml && e.dpDiv.find('select.ui-datepicker-year:first').replaceWith(e.yearshtml),
                        i = e.yearshtml = null
                }, 0))
            },
            _shouldFocusInput: function(t) {
                return t.input && t.input.is(':visible') && !t.input.is(':disabled') && !t.input.is(':focus')
            },
            _checkOffset: function(e, i, s) {
                var n = e.dpDiv.outerWidth(),
                    a = e.dpDiv.outerHeight(),
                    o = e.input ? e.input.outerWidth() : 0,
                    r = e.input ? e.input.outerHeight() : 0,
                    h = document.documentElement.clientWidth + (s ? 0 : t(document).scrollLeft()),
                    l = document.documentElement.clientHeight + (s ? 0 : t(document).scrollTop());
                return i.left -= this._get(e, 'isRTL') ? n - o : 0,
                    i.left -= s && i.left === e.input.offset().left ? t(document).scrollLeft() : 0,
                    i.top -= s && i.top === e.input.offset().top + r ? t(document).scrollTop() : 0,
                    i.left -= Math.min(i.left, i.left + n > h && h > n ? Math.abs(i.left + n - h) : 0),
                    i.top -= Math.min(i.top, i.top + a > l && l > a ? Math.abs(a + r) : 0),
                    i
            },
            _findPos: function(e) {
                for (var i, s = this._getInst(e), n = this._get(s, 'isRTL'); e && ('hidden' === e.type || 1 !== e.nodeType || t.expr.filters.hidden(e));) e = e[n ? 'previousSibling' : 'nextSibling'];
                return i = t(e).offset(), [
                    i.left,
                    i.top
                ]
            },
            _hideDatepicker: function(e) {
                var i,
                    s,
                    n,
                    a,
                    r = this._curInst;
                !r || e && r !== t.data(e, o) || this._datepickerShowing && (i = this._get(r, 'showAnim'), s = this._get(r, 'duration'), n = function() {
                    t.datepicker._tidyDialog(r)
                }, t.effects && (t.effects.effect[i] || t.effects[i]) ? r.dpDiv.hide(i, t.datepicker._get(r, 'showOptions'), s, n) : r.dpDiv['slideDown' === i ? 'slideUp' : 'fadeIn' === i ? 'fadeOut' : 'hide'](i ? s : null, n), i || n(), this._datepickerShowing = !1, a = this._get(r, 'onClose'), a && a.apply(r.input ? r.input[0] : null, [
                    r.input ? r.input.val() : '',
                    r
                ]), this._lastInput = null, this._inDialog && (this._dialogInput.css({
                    position: 'absolute',
                    left: '0',
                    top: '-100px'
                }), t.blockUI && (t.unblockUI(), t('body').append(this.dpDiv))), this._inDialog = !1)
            },
            _tidyDialog: function(t) {
                t.dpDiv.removeClass(this._dialogClass).unbind('.ui-datepicker-calendar')
            },
            _checkExternalClick: function(e) {
                if (t.datepicker._curInst) {
                    var i = t(e.target),
                        s = t.datepicker._getInst(i[0]);
                    (i[0].id !== t.datepicker._mainDivId && 0 === i.parents('#' + t.datepicker._mainDivId).length && !i.hasClass(t.datepicker.markerClassName) && !i.closest('.' + t.datepicker._triggerClass).length && t.datepicker._datepickerShowing && (!t.datepicker._inDialog || !t.blockUI) || i.hasClass(t.datepicker.markerClassName) && t.datepicker._curInst !== s) && t.datepicker._hideDatepicker()
                }
            },
            _adjustDate: function(e, i, s) {
                var n = t(e),
                    a = this._getInst(n[0]);
                this._isDisabledDatepicker(n[0]) || (this._adjustInstDate(a, i + ('M' === s ? this._get(a, 'showCurrentAtPos') : 0), s), this._updateDatepicker(a))
            },
            _gotoToday: function(e) {
                var i,
                    s = t(e),
                    n = this._getInst(s[0]);
                this._get(n, 'gotoCurrent') && n.currentDay ? (n.selectedDay = n.currentDay, n.drawMonth = n.selectedMonth = n.currentMonth, n.drawYear = n.selectedYear = n.currentYear) : (i = new Date, n.selectedDay = i.getDate(), n.drawMonth = n.selectedMonth = i.getMonth(), n.drawYear = n.selectedYear = i.getFullYear()),
                    this._notifyChange(n),
                    this._adjustDate(s)
            },
            _selectMonthYear: function(e, i, s) {
                var n = t(e),
                    a = this._getInst(n[0]);
                a['selected' + ('M' === s ? 'Month' : 'Year')] = a['draw' + ('M' === s ? 'Month' : 'Year')] = parseInt(i.options[i.selectedIndex].value, 10),
                    this._notifyChange(a),
                    this._adjustDate(n)
            },
            _selectDay: function(e, i, s, n) {
                var a,
                    o = t(e);
                t(n).hasClass(this._unselectableClass) || this._isDisabledDatepicker(o[0]) || (a = this._getInst(o[0]), a.selectedDay = a.currentDay = t('a', n).html(), a.selectedMonth = a.currentMonth = i, a.selectedYear = a.currentYear = s, this._selectDate(e, this._formatDate(a, a.currentDay, a.currentMonth, a.currentYear)))
            },
            _clearDate: function(e) {
                var i = t(e);
                this._selectDate(i, '')
            },
            _selectDate: function(e, i) {
                var s,
                    n = t(e),
                    a = this._getInst(n[0]);
                i = null != i ? i : this._formatDate(a),
                a.input && a.input.val(i),
                    this._updateAlternate(a),
                    s = this._get(a, 'onSelect'),
                    s ? s.apply(a.input ? a.input[0] : null, [
                        i,
                        a
                    ]) : a.input && a.input.trigger('change'),
                    a.inline ? this._updateDatepicker(a) : (this._hideDatepicker(), this._lastInput = a.input[0], 'object' != typeof a.input[0] && a.input.focus(), this._lastInput = null)
            },
            _updateAlternate: function(e) {
                var i,
                    s,
                    n,
                    a = this._get(e, 'altField');
                a && (i = this._get(e, 'altFormat') || this._get(e, 'dateFormat'), s = this._getDate(e), n = this.formatDate(i, s, this._getFormatConfig(e)), t(a).each(function() {
                    t(this).val(n)
                }))
            },
            noWeekends: function(t) {
                var e = t.getDay();
                return [e > 0 && 6 > e,
                    ''
                ]
            },
            iso8601Week: function(t) {
                var e,
                    i = new Date(t.getTime());
                return i.setDate(i.getDate() + 4 - (i.getDay() || 7)),
                    e = i.getTime(),
                    i.setMonth(0),
                    i.setDate(1),
                Math.floor(Math.round((e - i) / 86400000) / 7) + 1
            },
            parseDate: function(e, i, s) {
                if (null == e || null == i) throw 'Invalid arguments';
                if (i = 'object' == typeof i ? i.toString() : i + '', '' === i) return null;
                var n,
                    a,
                    o,
                    r,
                    h = 0,
                    l = (s ? s.shortYearCutoff : null) || this._defaults.shortYearCutoff,
                    c = 'string' != typeof l ? l : (new Date).getFullYear() % 100 + parseInt(l, 10),
                    u = (s ? s.dayNamesShort : null) || this._defaults.dayNamesShort,
                    d = (s ? s.dayNames : null) || this._defaults.dayNames,
                    p = (s ? s.monthNamesShort : null) || this._defaults.monthNamesShort,
                    f = (s ? s.monthNames : null) || this._defaults.monthNames,
                    g = -1,
                    m = -1,
                    _ = -1,
                    v = -1,
                    b = !1,
                    y = function(t) {
                        var i = n + 1 < e.length && e.charAt(n + 1) === t;
                        return i && n++,
                            i
                    },
                    w = function(t) {
                        var e = y(t),
                            s = '@' === t ? 14 : '!' === t ? 20 : 'y' === t && e ? 4 : 'o' === t ? 3 : 2,
                            n = new RegExp('^\\d{1,' + s + '}'),
                            a = i.substring(h).match(n);
                        if (!a) throw 'Missing number at position ' + h;
                        return h += a[0].length,
                            parseInt(a[0], 10)
                    },
                    k = function(e, s, n) {
                        var a = -1,
                            o = t.map(y(e) ? n : s, function(t, e) {
                                return [
                                    [e,
                                        t
                                    ]
                                ]
                            }).sort(function(t, e) {
                                return -(t[1].length - e[1].length)
                            });
                        if (t.each(o, function(t, e) {
                                var s = e[1];
                                return i.substr(h, s.length).toLowerCase() === s.toLowerCase() ? (a = e[0], h += s.length, !1) : void 0
                            }), -1 !== a) return a + 1;
                        throw 'Unknown name at position ' + h
                    },
                    D = function() {
                        if (i.charAt(h) !== e.charAt(n)) throw 'Unexpected literal at position ' + h;
                        h++
                    };
                for (n = 0; n < e.length; n++)
                    if (b) '\'' !== e.charAt(n) || y('\'') ? D() : b = !1;
                    else switch (e.charAt(n)) {
                        case 'd':
                            _ = w('d');
                            break;
                        case 'D':
                            k('D', u, d);
                            break;
                        case 'o':
                            v = w('o');
                            break;
                        case 'm':
                            m = w('m');
                            break;
                        case 'M':
                            m = k('M', p, f);
                            break;
                        case 'y':
                            g = w('y');
                            break;
                        case '@':
                            r = new Date(w('@')),
                                g = r.getFullYear(),
                                m = r.getMonth() + 1,
                                _ = r.getDate();
                            break;
                        case '!':
                            r = new Date((w('!') - this._ticksTo1970) / 10000),
                                g = r.getFullYear(),
                                m = r.getMonth() + 1,
                                _ = r.getDate();
                            break;
                        case '\'':
                            y('\'') ? D() : b = !0;
                            break;
                        default:
                            D()
                    }
                if (h < i.length && (o = i.substr(h), !/^\s+/.test(o))) throw 'Extra/unparsed characters found in date: ' + o;
                if (-1 === g ? g = (new Date).getFullYear() : 100 > g && (g += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (c >= g ? 0 : -100)), v > -1)
                    for (m = 1, _ = v;;) {
                        if (a = this._getDaysInMonth(g, m - 1), a >= _) break;
                        m++,
                            _ -= a
                    }
                if (r = this._daylightSavingAdjust(new Date(g, m - 1, _)), r.getFullYear() !== g || r.getMonth() + 1 !== m || r.getDate() !== _) throw 'Invalid date';
                return r
            },
            ATOM: 'yy-mm-dd',
            COOKIE: 'D, dd M yy',
            ISO_8601: 'yy-mm-dd',
            RFC_822: 'D, d M y',
            RFC_850: 'DD, dd-M-y',
            RFC_1036: 'D, d M y',
            RFC_1123: 'D, d M yy',
            RFC_2822: 'D, d M yy',
            RSS: 'D, d M y',
            TICKS: '!',
            TIMESTAMP: '@',
            W3C: 'yy-mm-dd',
            _ticksTo1970: 24 * (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)) * 60 * 60 * 10000000,
            formatDate: function(t, e, i) {
                if (!e) return '';
                var s,
                    n = (i ? i.dayNamesShort : null) || this._defaults.dayNamesShort,
                    a = (i ? i.dayNames : null) || this._defaults.dayNames,
                    o = (i ? i.monthNamesShort : null) || this._defaults.monthNamesShort,
                    r = (i ? i.monthNames : null) || this._defaults.monthNames,
                    h = function(e) {
                        var i = s + 1 < t.length && t.charAt(s + 1) === e;
                        return i && s++,
                            i
                    },
                    l = function(t, e, i) {
                        var s = '' + e;
                        if (h(t))
                            for (; s.length < i;) s = '0' + s;
                        return s
                    },
                    c = function(t, e, i, s) {
                        return h(t) ? s[e] : i[e]
                    },
                    u = '',
                    d = !1;
                if (e)
                    for (s = 0; s < t.length; s++)
                        if (d) '\'' !== t.charAt(s) || h('\'') ? u += t.charAt(s) : d = !1;
                        else switch (t.charAt(s)) {
                            case 'd':
                                u += l('d', e.getDate(), 2);
                                break;
                            case 'D':
                                u += c('D', e.getDay(), n, a);
                                break;
                            case 'o':
                                u += l('o', Math.round((new Date(e.getFullYear(), e.getMonth(), e.getDate()).getTime() - new Date(e.getFullYear(), 0, 0).getTime()) / 86400000), 3);
                                break;
                            case 'm':
                                u += l('m', e.getMonth() + 1, 2);
                                break;
                            case 'M':
                                u += c('M', e.getMonth(), o, r);
                                break;
                            case 'y':
                                u += h('y') ? e.getFullYear() : (e.getYear() % 100 < 10 ? '0' : '') + e.getYear() % 100;
                                break;
                            case '@':
                                u += e.getTime();
                                break;
                            case '!':
                                u += 10000 * e.getTime() + this._ticksTo1970;
                                break;
                            case '\'':
                                h('\'') ? u += '\'' : d = !0;
                                break;
                            default:
                                u += t.charAt(s)
                        }
                return u
            },
            _possibleChars: function(t) {
                var e,
                    i = '',
                    s = !1,
                    n = function(i) {
                        var s = e + 1 < t.length && t.charAt(e + 1) === i;
                        return s && e++,
                            s
                    };
                for (e = 0; e < t.length; e++)
                    if (s) '\'' !== t.charAt(e) || n('\'') ? i += t.charAt(e) : s = !1;
                    else switch (t.charAt(e)) {
                        case 'd':
                        case 'm':
                        case 'y':
                        case '@':
                            i += '0123456789';
                            break;
                        case 'D':
                        case 'M':
                            return null;
                        case '\'':
                            n('\'') ? i += '\'' : s = !0;
                            break;
                        default:
                            i += t.charAt(e)
                    }
                return i
            },
            _get: function(t, i) {
                return t.settings[i] !== e ? t.settings[i] : this._defaults[i]
            },
            _setDateFromField: function(t, e) {
                if (t.input.val() !== t.lastVal) {
                    var i = this._get(t, 'dateFormat'),
                        s = t.lastVal = t.input ? t.input.val() : null,
                        n = this._getDefaultDate(t),
                        a = n,
                        o = this._getFormatConfig(t);
                    try {
                        a = this.parseDate(i, s, o) || n
                    } catch (r) {
                        s = e ? '' : s
                    }
                    t.selectedDay = a.getDate(),
                        t.drawMonth = t.selectedMonth = a.getMonth(),
                        t.drawYear = t.selectedYear = a.getFullYear(),
                        t.currentDay = s ? a.getDate() : 0,
                        t.currentMonth = s ? a.getMonth() : 0,
                        t.currentYear = s ? a.getFullYear() : 0,
                        this._adjustInstDate(t)
                }
            },
            _getDefaultDate: function(t) {
                return this._restrictMinMax(t, this._determineDate(t, this._get(t, 'defaultDate'), new Date))
            },
            _determineDate: function(e, i, s) {
                var n = function(t) {
                        var e = new Date;
                        return e.setDate(e.getDate() + t),
                            e
                    },
                    a = function(i) {
                        try {
                            return t.datepicker.parseDate(t.datepicker._get(e, 'dateFormat'), i, t.datepicker._getFormatConfig(e))
                        } catch (s) {}
                        for (var n = (i.toLowerCase().match(/^c/) ? t.datepicker._getDate(e) : null) || new Date, a = n.getFullYear(), o = n.getMonth(), r = n.getDate(), h = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, l = h.exec(i); l;) {
                            switch (l[2] || 'd') {
                                case 'd':
                                case 'D':
                                    r += parseInt(l[1], 10);
                                    break;
                                case 'w':
                                case 'W':
                                    r += 7 * parseInt(l[1], 10);
                                    break;
                                case 'm':
                                case 'M':
                                    o += parseInt(l[1], 10),
                                        r = Math.min(r, t.datepicker._getDaysInMonth(a, o));
                                    break;
                                case 'y':
                                case 'Y':
                                    a += parseInt(l[1], 10),
                                        r = Math.min(r, t.datepicker._getDaysInMonth(a, o))
                            }
                            l = h.exec(i)
                        }
                        return new Date(a, o, r)
                    },
                    o = null == i || '' === i ? s : 'string' == typeof i ? a(i) : 'number' == typeof i ? isNaN(i) ? s : n(i) : new Date(i.getTime());
                return o = o && 'Invalid Date' === o.toString() ? s : o,
                o && (o.setHours(0), o.setMinutes(0), o.setSeconds(0), o.setMilliseconds(0)),
                    this._daylightSavingAdjust(o)
            },
            _daylightSavingAdjust: function(t) {
                return t ? (t.setHours(t.getHours() > 12 ? t.getHours() + 2 : 0), t) : null
            },
            _setDate: function(t, e, i) {
                var s = !e,
                    n = t.selectedMonth,
                    a = t.selectedYear,
                    o = this._restrictMinMax(t, this._determineDate(t, e, new Date));
                t.selectedDay = t.currentDay = o.getDate(),
                    t.drawMonth = t.selectedMonth = t.currentMonth = o.getMonth(),
                    t.drawYear = t.selectedYear = t.currentYear = o.getFullYear(),
                n === t.selectedMonth && a === t.selectedYear || i || this._notifyChange(t),
                    this._adjustInstDate(t),
                t.input && t.input.val(s ? '' : this._formatDate(t))
            },
            _getDate: function(t) {
                var e = !t.currentYear || t.input && '' === t.input.val() ? null : this._daylightSavingAdjust(new Date(t.currentYear, t.currentMonth, t.currentDay));
                return e
            },
            _attachHandlers: function(e) {
                var i = this._get(e, 'stepMonths'),
                    s = '#' + e.id.replace(/\\\\/g, '\\');
                e.dpDiv.find('[data-handler]').map(function() {
                    var e = {
                        prev: function() {
                            t.datepicker._adjustDate(s, -i, 'M')
                        },
                        next: function() {
                            t.datepicker._adjustDate(s, +i, 'M')
                        },
                        hide: function() {
                            t.datepicker._hideDatepicker()
                        },
                        today: function() {
                            t.datepicker._gotoToday(s)
                        },
                        selectDay: function() {
                            return t.datepicker._selectDay(s, +this.getAttribute('data-month'), +this.getAttribute('data-year'), this), !1
                        },
                        selectMonth: function() {
                            return t.datepicker._selectMonthYear(s, this, 'M'), !1
                        },
                        selectYear: function() {
                            return t.datepicker._selectMonthYear(s, this, 'Y'), !1
                        }
                    };
                    t(this).bind(this.getAttribute('data-event'), e[this.getAttribute('data-handler')])
                })
            },
            _generateHTML: function(t) {
                var e,
                    i,
                    s,
                    n,
                    a,
                    o,
                    r,
                    h,
                    l,
                    c,
                    u,
                    d,
                    p,
                    f,
                    g,
                    m,
                    _,
                    v,
                    b,
                    y,
                    w,
                    k,
                    D,
                    x,
                    C,
                    I,
                    P,
                    M,
                    z,
                    S,
                    T,
                    N,
                    H,
                    W,
                    A,
                    O,
                    E,
                    F,
                    Y,
                    R = new Date,
                    L = this._daylightSavingAdjust(new Date(R.getFullYear(), R.getMonth(), R.getDate())),
                    j = this._get(t, 'isRTL'),
                    K = this._get(t, 'showButtonPanel'),
                    V = this._get(t, 'hideIfNoPrevNext'),
                    B = this._get(t, 'navigationAsDateFormat'),
                    U = this._getNumberOfMonths(t),
                    X = this._get(t, 'showCurrentAtPos'),
                    $ = this._get(t, 'stepMonths'),
                    Q = 1 !== U[0] || 1 !== U[1],
                    q = this._daylightSavingAdjust(t.currentDay ? new Date(t.currentYear, t.currentMonth, t.currentDay) : new Date(9999, 9, 9)),
                    G = this._getMinMaxDate(t, 'min'),
                    J = this._getMinMaxDate(t, 'max'),
                    Z = t.drawMonth - X,
                    te = t.drawYear;
                if (0 > Z && (Z += 12, te--), J)
                    for (e = this._daylightSavingAdjust(new Date(J.getFullYear(), J.getMonth() - U[0] * U[1] + 1, J.getDate())), e = G && G > e ? G : e; this._daylightSavingAdjust(new Date(te, Z, 1)) > e;) Z--,
                    0 > Z && (Z = 11, te--);
                for (t.drawMonth = Z, t.drawYear = te, i = this._get(t, 'prevText'), i = B ? this.formatDate(i, this._daylightSavingAdjust(new Date(te, Z - $, 1)), this._getFormatConfig(t)) : i, s = this._canAdjustMonth(t, -1, te, Z) ? '<a class=\'ui-datepicker-prev ui-corner-all\' data-handler=\'prev\' data-event=\'click\' title=\'' + i + '\'><span class=\'ui-icon ui-icon-circle-triangle-' + (j ? 'e' : 'w') + '\'>' + i + '</span></a>' : V ? '' : '<a class=\'ui-datepicker-prev ui-corner-all ui-state-disabled\' title=\'' + i + '\'><span class=\'ui-icon ui-icon-circle-triangle-' + (j ? 'e' : 'w') + '\'>' + i + '</span></a>', n = this._get(t, 'nextText'), n = B ? this.formatDate(n, this._daylightSavingAdjust(new Date(te, Z + $, 1)), this._getFormatConfig(t)) : n, a = this._canAdjustMonth(t, 1, te, Z) ? '<a class=\'ui-datepicker-next ui-corner-all\' data-handler=\'next\' data-event=\'click\' title=\'' + n + '\'><span class=\'ui-icon ui-icon-circle-triangle-' + (j ? 'w' : 'e') + '\'>' + n + '</span></a>' : V ? '' : '<a class=\'ui-datepicker-next ui-corner-all ui-state-disabled\' title=\'' + n + '\'><span class=\'ui-icon ui-icon-circle-triangle-' + (j ? 'w' : 'e') + '\'>' + n + '</span></a>', o = this._get(t, 'currentText'), r = this._get(t, 'gotoCurrent') && t.currentDay ? q : L, o = B ? this.formatDate(o, r, this._getFormatConfig(t)) : o, h = t.inline ? '' : '<button type=\'button\' class=\'ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all\' data-handler=\'hide\' data-event=\'click\'>' + this._get(t, 'closeText') + '</button>', l = K ? '<div class=\'ui-datepicker-buttonpane ui-widget-content\'>' + (j ? h : '') + (this._isInRange(t, r) ? '<button type=\'button\' class=\'ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all\' data-handler=\'today\' data-event=\'click\'>' + o + '</button>' : '') + (j ? '' : h) + '</div>' : '', c = parseInt(this._get(t, 'firstDay'), 10), c = isNaN(c) ? 0 : c, u = this._get(t, 'showWeek'), d = this._get(t, 'dayNames'), p = this._get(t, 'dayNamesMin'), f = this._get(t, 'monthNames'), g = this._get(t, 'monthNamesShort'), m = this._get(t, 'beforeShowDay'), _ = this._get(t, 'showOtherMonths'), v = this._get(t, 'selectOtherMonths'), b = this._getDefaultDate(t), y = '', k = 0; k < U[0]; k++) {
                    for (D = '', this.maxRows = 4, x = 0; x < U[1]; x++) {
                        if (C = this._daylightSavingAdjust(new Date(te, Z, t.selectedDay)), I = ' ui-corner-all', P = '', Q) {
                            if (P += '<div class=\'ui-datepicker-group', U[1] > 1) switch (x) {
                                case 0:
                                    P += ' ui-datepicker-group-first',
                                        I = ' ui-corner-' + (j ? 'right' : 'left');
                                    break;
                                case U[1] - 1:
                                    P += ' ui-datepicker-group-last',
                                        I = ' ui-corner-' + (j ? 'left' : 'right');
                                    break;
                                default:
                                    P += ' ui-datepicker-group-middle',
                                        I = ''
                            }
                            P += '\'>'
                        }
                        for (P += '<div class=\'ui-datepicker-header ui-widget-header ui-helper-clearfix' + I + '\'>' + (/all|left/.test(I) && 0 === k ? j ? a : s : '') + (/all|right/.test(I) && 0 === k ? j ? s : a : '') + this._generateMonthYearHeader(t, Z, te, G, J, k > 0 || x > 0, f, g) + '</div><table class=\'ui-datepicker-calendar\'><thead><tr>', M = u ? '<th class=\'ui-datepicker-week-col\'>' + this._get(t, 'weekHeader') + '</th>' : '', w = 0; 7 > w; w++) z = (w + c) % 7,
                            M += '<th' + ((w + c + 6) % 7 >= 5 ? ' class=\'ui-datepicker-week-end\'' : '') + '><span title=\'' + d[z] + '\'>' + p[z] + '</span></th>';
                        for (P += M + '</tr></thead><tbody>', S = this._getDaysInMonth(te, Z), te === t.selectedYear && Z === t.selectedMonth && (t.selectedDay = Math.min(t.selectedDay, S)), T = (this._getFirstDayOfMonth(te, Z) - c + 7) % 7, N = Math.ceil((T + S) / 7), H = Q && this.maxRows > N ? this.maxRows : N, this.maxRows = H, W = this._daylightSavingAdjust(new Date(te, Z, 1 - T)), A = 0; H > A; A++) {
                            for (P += '<tr>', O = u ? '<td class=\'ui-datepicker-week-col\'>' + this._get(t, 'calculateWeek')(W) + '</td>' : '', w = 0; 7 > w; w++) E = m ? m.apply(t.input ? t.input[0] : null, [
                                W
                            ]) : [!0,
                                ''
                            ],
                                F = W.getMonth() !== Z,
                                Y = F && !v || !E[0] || G && G > W || J && W > J,
                                O += '<td class=\'' + ((w + c + 6) % 7 >= 5 ? ' ui-datepicker-week-end' : '') + (F ? ' ui-datepicker-other-month' : '') + (W.getTime() === C.getTime() && Z === t.selectedMonth && t._keyEvent || b.getTime() === W.getTime() && b.getTime() === C.getTime() ? ' ' + this._dayOverClass : '') + (Y ? ' ' + this._unselectableClass + ' ui-state-disabled' : '') + (F && !_ ? '' : ' ' + E[1] + (W.getTime() === q.getTime() ? ' ' + this._currentClass : '') + (W.getTime() === L.getTime() ? ' ui-datepicker-today' : '')) + '\'' + (F && !_ || !E[2] ? '' : ' title=\'' + E[2].replace(/'/g, '&#39;') + '\'') + (Y ? '' : ' data-handler=\'selectDay\' data-event=\'click\' data-month=\'' + W.getMonth() + '\' data-year=\'' + W.getFullYear() + '\'') + '>' + (F && !_ ? '&#xa0;' : Y ? '<span class=\'ui-state-default\'>' + W.getDate() + '</span>' : '<a class=\'ui-state-default' + (W.getTime() === L.getTime() ? ' ui-state-highlight' : '') + (W.getTime() === q.getTime() ? ' ui-state-active' : '') + (F ? ' ui-priority-secondary' : '') + '\' href=\'#\'>' + W.getDate() + '</a>') + '</td>',
                                W.setDate(W.getDate() + 1),
                                W = this._daylightSavingAdjust(W);
                            P += O + '</tr>'
                        }
                        Z++,
                        Z > 11 && (Z = 0, te++),
                            P += '</tbody></table>' + (Q ? '</div>' + (U[0] > 0 && x === U[1] - 1 ? '<div class=\'ui-datepicker-row-break\'></div>' : '') : ''),
                            D += P
                    }
                    y += D
                }
                return y += l,
                    t._keyEvent = !1,
                    y
            },
            _generateMonthYearHeader: function(t, e, i, s, n, a, o, r) {
                var h,
                    l,
                    c,
                    u,
                    d,
                    p,
                    f,
                    g,
                    m = this._get(t, 'changeMonth'),
                    _ = this._get(t, 'changeYear'),
                    v = this._get(t, 'showMonthAfterYear'),
                    b = '<div class=\'ui-datepicker-title\'>',
                    y = '';
                if (a || !m) y += '<span class=\'ui-datepicker-month\'>' + o[e] + '</span>';
                else {
                    for (h = s && s.getFullYear() === i, l = n && n.getFullYear() === i, y += '<select class=\'ui-datepicker-month\' data-handler=\'selectMonth\' data-event=\'change\'>', c = 0; 12 > c; c++)(!h || c >= s.getMonth()) && (!l || c <= n.getMonth()) && (y += '<option value=\'' + c + '\'' + (c === e ? ' selected=\'selected\'' : '') + '>' + r[c] + '</option>');
                    y += '</select>'
                }
                if (v || (b += y + (!a && m && _ ? '' : '&#xa0;')), !t.yearshtml)
                    if (t.yearshtml = '', a || !_) b += '<span class=\'ui-datepicker-year\'>' + i + '</span>';
                    else {
                        for (u = this._get(t, 'yearRange').split(':'), d = (new Date).getFullYear(), p = function(t) {
                            var e = t.match(/c[+\-].*/) ? i + parseInt(t.substring(1), 10) : t.match(/[+\-].*/) ? d + parseInt(t, 10) : parseInt(t, 10);
                            return isNaN(e) ? d : e
                        }, f = p(u[0]), g = Math.max(f, p(u[1] || '')), f = s ? Math.max(f, s.getFullYear()) : f, g = n ? Math.min(g, n.getFullYear()) : g, t.yearshtml += '<select class=\'ui-datepicker-year\' data-handler=\'selectYear\' data-event=\'change\'>'; g >= f; f++) t.yearshtml += '<option value=\'' + f + '\'' + (f === i ? ' selected=\'selected\'' : '') + '>' + f + '</option>';
                        t.yearshtml += '</select>',
                            b += t.yearshtml,
                            t.yearshtml = null
                    }
                return b += this._get(t, 'yearSuffix'),
                v && (b += (!a && m && _ ? '' : '&#xa0;') + y),
                    b += '</div>'
            },
            _adjustInstDate: function(t, e, i) {
                var s = t.drawYear + ('Y' === i ? e : 0),
                    n = t.drawMonth + ('M' === i ? e : 0),
                    a = Math.min(t.selectedDay, this._getDaysInMonth(s, n)) + ('D' === i ? e : 0),
                    o = this._restrictMinMax(t, this._daylightSavingAdjust(new Date(s, n, a)));
                t.selectedDay = o.getDate(),
                    t.drawMonth = t.selectedMonth = o.getMonth(),
                    t.drawYear = t.selectedYear = o.getFullYear(), ('M' === i || 'Y' === i) && this._notifyChange(t)
            },
            _restrictMinMax: function(t, e) {
                var i = this._getMinMaxDate(t, 'min'),
                    s = this._getMinMaxDate(t, 'max'),
                    n = i && i > e ? i : e;
                return s && n > s ? s : n
            },
            _notifyChange: function(t) {
                var e = this._get(t, 'onChangeMonthYear');
                e && e.apply(t.input ? t.input[0] : null, [
                    t.selectedYear,
                    t.selectedMonth + 1,
                    t
                ])
            },
            _getNumberOfMonths: function(t) {
                var e = this._get(t, 'numberOfMonths');
                return null == e ? [
                    1,
                    1
                ] : 'number' == typeof e ? [
                    1,
                    e
                ] : e
            },
            _getMinMaxDate: function(t, e) {
                return this._determineDate(t, this._get(t, e + 'Date'), null)
            },
            _getDaysInMonth: function(t, e) {
                return 32 - this._daylightSavingAdjust(new Date(t, e, 32)).getDate()
            },
            _getFirstDayOfMonth: function(t, e) {
                return new Date(t, e, 1).getDay()
            },
            _canAdjustMonth: function(t, e, i, s) {
                var n = this._getNumberOfMonths(t),
                    a = this._daylightSavingAdjust(new Date(i, s + (0 > e ? e : n[0] * n[1]), 1));
                return 0 > e && a.setDate(this._getDaysInMonth(a.getFullYear(), a.getMonth())),
                    this._isInRange(t, a)
            },
            _isInRange: function(t, e) {
                var i,
                    s,
                    n = this._getMinMaxDate(t, 'min'),
                    a = this._getMinMaxDate(t, 'max'),
                    o = null,
                    r = null,
                    h = this._get(t, 'yearRange');
                return h && (i = h.split(':'), s = (new Date).getFullYear(), o = parseInt(i[0], 10), r = parseInt(i[1], 10), i[0].match(/[+\-].*/) && (o += s), i[1].match(/[+\-].*/) && (r += s)), (!n || e.getTime() >= n.getTime()) && (!a || e.getTime() <= a.getTime()) && (!o || e.getFullYear() >= o) && (!r || e.getFullYear() <= r)
            },
            _getFormatConfig: function(t) {
                var e = this._get(t, 'shortYearCutoff');
                return e = 'string' != typeof e ? e : (new Date).getFullYear() % 100 + parseInt(e, 10), {
                    shortYearCutoff: e,
                    dayNamesShort: this._get(t, 'dayNamesShort'),
                    dayNames: this._get(t, 'dayNames'),
                    monthNamesShort: this._get(t, 'monthNamesShort'),
                    monthNames: this._get(t, 'monthNames')
                }
            },
            _formatDate: function(t, e, i, s) {
                e || (t.currentDay = t.selectedDay, t.currentMonth = t.selectedMonth, t.currentYear = t.selectedYear);
                var n = e ? 'object' == typeof e ? e : this._daylightSavingAdjust(new Date(s, i, e)) : this._daylightSavingAdjust(new Date(t.currentYear, t.currentMonth, t.currentDay));
                return this.formatDate(this._get(t, 'dateFormat'), n, this._getFormatConfig(t))
            }
        }),
            t.fn.datepicker = function(e) {
                if (!this.length) return this;
                t.datepicker.initialized || (t(document).mousedown(t.datepicker._checkExternalClick), t.datepicker.initialized = !0),
                0 === t('#' + t.datepicker._mainDivId).length && t('body').append(t.datepicker.dpDiv);
                var i = Array.prototype.slice.call(arguments, 1);
                return 'string' != typeof e || 'isDisabled' !== e && 'getDate' !== e && 'widget' !== e ? 'option' === e && 2 === arguments.length && 'string' == typeof arguments[1] ? t.datepicker['_' + e + 'Datepicker'].apply(t.datepicker, [
                    this[0]
                ].concat(i)) : this.each(function() {
                    'string' == typeof e ? t.datepicker['_' + e + 'Datepicker'].apply(t.datepicker, [
                        this
                    ].concat(i)) : t.datepicker._attachDatepicker(this, e)
                }) : t.datepicker['_' + e + 'Datepicker'].apply(t.datepicker, [
                    this[0]
                ].concat(i))
            },
            t.datepicker = new i,
            t.datepicker.initialized = !1,
            t.datepicker.uuid = (new Date).getTime(),
            t.datepicker.version = '1.10.3'
    }(jQuery),
    function(t, e) {
        t.widget('ui.progressbar', {
            version: '1.10.3',
            options: {
                max: 100,
                value: 0,
                change: null,
                complete: null
            },
            min: 0,
            _create: function() {
                this.oldValue = this.options.value = this._constrainedValue(),
                    this.element.addClass('ui-progressbar ui-widget ui-widget-content ui-corner-all').attr({
                        role: 'progressbar',
                        'aria-valuemin': this.min
                    }),
                    this.valueDiv = t('<div class=\'ui-progressbar-value ui-widget-header ui-corner-left\'></div>').appendTo(this.element),
                    this._refreshValue()
            },
            _destroy: function() {
                this.element.removeClass('ui-progressbar ui-widget ui-widget-content ui-corner-all').removeAttr('role').removeAttr('aria-valuemin').removeAttr('aria-valuemax').removeAttr('aria-valuenow'),
                    this.valueDiv.remove()
            },
            value: function(t) {
                return t === e ? this.options.value : (this.options.value = this._constrainedValue(t), void this._refreshValue())
            },
            _constrainedValue: function(t) {
                return t === e && (t = this.options.value),
                    this.indeterminate = t === !1,
                'number' != typeof t && (t = 0),
                    this.indeterminate ? !1 : Math.min(this.options.max, Math.max(this.min, t))
            },
            _setOptions: function(t) {
                var e = t.value;
                delete t.value,
                    this._super(t),
                    this.options.value = this._constrainedValue(e),
                    this._refreshValue()
            },
            _setOption: function(t, e) {
                'max' === t && (e = Math.max(this.min, e)),
                    this._super(t, e)
            },
            _percentage: function() {
                return this.indeterminate ? 100 : 100 * (this.options.value - this.min) / (this.options.max - this.min)
            },
            _refreshValue: function() {
                var e = this.options.value,
                    i = this._percentage();
                this.valueDiv.toggle(this.indeterminate || e > this.min).toggleClass('ui-corner-right', e === this.options.max).width(i.toFixed(0) + '%'),
                    this.element.toggleClass('ui-progressbar-indeterminate', this.indeterminate),
                    this.indeterminate ? (this.element.removeAttr('aria-valuenow'), this.overlayDiv || (this.overlayDiv = t('<div class=\'ui-progressbar-overlay\'></div>').appendTo(this.valueDiv))) : (this.element.attr({
                        'aria-valuemax': this.options.max,
                        'aria-valuenow': e
                    }), this.overlayDiv && (this.overlayDiv.remove(), this.overlayDiv = null)),
                this.oldValue !== e && (this.oldValue = e, this._trigger('change')),
                e === this.options.max && this._trigger('complete')
            }
        })
    }(jQuery),
    function(t) {
        var e = 5;
        t.widget('ui.slider', t.ui.mouse, {
            version: '1.10.3',
            widgetEventPrefix: 'slide',
            options: {
                animate: !1,
                distance: 0,
                max: 100,
                min: 0,
                orientation: 'horizontal',
                range: !1,
                step: 1,
                value: 0,
                values: null,
                change: null,
                slide: null,
                start: null,
                stop: null
            },
            _create: function() {
                this._keySliding = !1,
                    this._mouseSliding = !1,
                    this._animateOff = !0,
                    this._handleIndex = null,
                    this._detectOrientation(),
                    this._mouseInit(),
                    this.element.addClass('ui-slider ui-slider-' + this.orientation + ' ui-widget ui-widget-content ui-corner-all'),
                    this._refresh(),
                    this._setOption('disabled', this.options.disabled),
                    this._animateOff = !1
            },
            _refresh: function() {
                this._createRange(),
                    this._createHandles(),
                    this._setupEvents(),
                    this._refreshValue()
            },
            _createHandles: function() {
                var e,
                    i,
                    s = this.options,
                    n = this.element.find('.ui-slider-handle').addClass('ui-state-default ui-corner-all'),
                    a = '<a class=\'ui-slider-handle ui-state-default ui-corner-all\' href=\'#\'></a>',
                    o = [];
                for (i = s.values && s.values.length || 1, n.length > i && (n.slice(i).remove(), n = n.slice(0, i)), e = n.length; i > e; e++) o.push(a);
                this.handles = n.add(t(o.join('')).appendTo(this.element)),
                    this.handle = this.handles.eq(0),
                    this.handles.each(function(e) {
                        t(this).data('ui-slider-handle-index', e)
                    })
            },
            _createRange: function() {
                var e = this.options,
                    i = '';
                e.range ? (e.range === !0 && (e.values ? e.values.length && 2 !== e.values.length ? e.values = [
                    e.values[0],
                    e.values[0]
                ] : t.isArray(e.values) && (e.values = e.values.slice(0)) : e.values = [
                    this._valueMin(),
                    this._valueMin()
                ]), this.range && this.range.length ? this.range.removeClass('ui-slider-range-min ui-slider-range-max').css({
                    left: '',
                    bottom: ''
                }) : (this.range = t('<div></div>').appendTo(this.element), i = 'ui-slider-range ui-widget-header ui-corner-all'), this.range.addClass(i + ('min' === e.range || 'max' === e.range ? ' ui-slider-range-' + e.range : ''))) : this.range = t([])
            },
            _setupEvents: function() {
                var t = this.handles.add(this.range).filter('a');
                this._off(t),
                    this._on(t, this._handleEvents),
                    this._hoverable(t),
                    this._focusable(t)
            },
            _destroy: function() {
                this.handles.remove(),
                    this.range.remove(),
                    this.element.removeClass('ui-slider ui-slider-horizontal ui-slider-vertical ui-widget ui-widget-content ui-corner-all'),
                    this._mouseDestroy()
            },
            _mouseCapture: function(e) {
                var i,
                    s,
                    n,
                    a,
                    o,
                    r,
                    h,
                    l,
                    c = this,
                    u = this.options;
                return u.disabled ? !1 : (this.elementSize = {
                    width: this.element.outerWidth(),
                    height: this.element.outerHeight()
                }, this.elementOffset = this.element.offset(), i = {
                    x: e.pageX,
                    y: e.pageY
                }, s = this._normValueFromMouse(i), n = this._valueMax() - this._valueMin() + 1, this.handles.each(function(e) {
                    var i = Math.abs(s - c.values(e));
                    (n > i || n === i && (e === c._lastChangedValue || c.values(e) === u.min)) && (n = i, a = t(this), o = e)
                }), r = this._start(e, o), r === !1 ? !1 : (this._mouseSliding = !0, this._handleIndex = o, a.addClass('ui-state-active').focus(), h = a.offset(), l = !t(e.target).parents().addBack().is('.ui-slider-handle'), this._clickOffset = l ? {
                    left: 0,
                    top: 0
                } : {
                    left: e.pageX - h.left - a.width() / 2,
                    top: e.pageY - h.top - a.height() / 2 - (parseInt(a.css('borderTopWidth'), 10) || 0) - (parseInt(a.css('borderBottomWidth'), 10) || 0) + (parseInt(a.css('marginTop'), 10) || 0)
                }, this.handles.hasClass('ui-state-hover') || this._slide(e, o, s), this._animateOff = !0, !0))
            },
            _mouseStart: function() {
                return !0
            },
            _mouseDrag: function(t) {
                var e = {
                        x: t.pageX,
                        y: t.pageY
                    },
                    i = this._normValueFromMouse(e);
                return this._slide(t, this._handleIndex, i), !1
            },
            _mouseStop: function(t) {
                return this.handles.removeClass('ui-state-active'),
                    this._mouseSliding = !1,
                    this._stop(t, this._handleIndex),
                    this._change(t, this._handleIndex),
                    this._handleIndex = null,
                    this._clickOffset = null,
                    this._animateOff = !1, !1
            },
            _detectOrientation: function() {
                this.orientation = 'vertical' === this.options.orientation ? 'vertical' : 'horizontal'
            },
            _normValueFromMouse: function(t) {
                var e,
                    i,
                    s,
                    n,
                    a;
                return 'horizontal' === this.orientation ? (e = this.elementSize.width, i = t.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (e = this.elementSize.height, i = t.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)),
                    s = i / e,
                s > 1 && (s = 1),
                0 > s && (s = 0),
                'vertical' === this.orientation && (s = 1 - s),
                    n = this._valueMax() - this._valueMin(),
                    a = this._valueMin() + s * n,
                    this._trimAlignValue(a)
            },
            _start: function(t, e) {
                var i = {
                    handle: this.handles[e],
                    value: this.value()
                };
                return this.options.values && this.options.values.length && (i.value = this.values(e), i.values = this.values()),
                    this._trigger('start', t, i)
            },
            _slide: function(t, e, i) {
                var s,
                    n,
                    a;
                this.options.values && this.options.values.length ? (s = this.values(e ? 0 : 1), 2 === this.options.values.length && this.options.range === !0 && (0 === e && i > s || 1 === e && s > i) && (i = s), i !== this.values(e) && (n = this.values(), n[e] = i, a = this._trigger('slide', t, {
                    handle: this.handles[e],
                    value: i,
                    values: n
                }), s = this.values(e ? 0 : 1), a !== !1 && this.values(e, i, !0))) : i !== this.value() && (a = this._trigger('slide', t, {
                    handle: this.handles[e],
                    value: i
                }), a !== !1 && this.value(i))
            },
            _stop: function(t, e) {
                var i = {
                    handle: this.handles[e],
                    value: this.value()
                };
                this.options.values && this.options.values.length && (i.value = this.values(e), i.values = this.values()),
                    this._trigger('stop', t, i)
            },
            _change: function(t, e) {
                if (!this._keySliding && !this._mouseSliding) {
                    var i = {
                        handle: this.handles[e],
                        value: this.value()
                    };
                    this.options.values && this.options.values.length && (i.value = this.values(e), i.values = this.values()),
                        this._lastChangedValue = e,
                        this._trigger('change', t, i)
                }
            },
            value: function(t) {
                return arguments.length ? (this.options.value = this._trimAlignValue(t), this._refreshValue(), void this._change(null, 0)) : this._value()
            },
            values: function(e, i) {
                var s,
                    n,
                    a;
                if (arguments.length > 1) return this.options.values[e] = this._trimAlignValue(i),
                    this._refreshValue(),
                    void this._change(null, e);
                if (!arguments.length) return this._values();
                if (!t.isArray(arguments[0])) return this.options.values && this.options.values.length ? this._values(e) : this.value();
                for (s = this.options.values, n = arguments[0], a = 0; a < s.length; a += 1) s[a] = this._trimAlignValue(n[a]),
                    this._change(null, a);
                this._refreshValue()
            },
            _setOption: function(e, i) {
                var s,
                    n = 0;
                switch ('range' === e && this.options.range === !0 && ('min' === i ? (this.options.value = this._values(0), this.options.values = null) : 'max' === i && (this.options.value = this._values(this.options.values.length - 1), this.options.values = null)), t.isArray(this.options.values) && (n = this.options.values.length), t.Widget.prototype._setOption.apply(this, arguments), e) {
                    case 'orientation':
                        this._detectOrientation(),
                            this.element.removeClass('ui-slider-horizontal ui-slider-vertical').addClass('ui-slider-' + this.orientation),
                            this._refreshValue();
                        break;
                    case 'value':
                        this._animateOff = !0,
                            this._refreshValue(),
                            this._change(null, 0),
                            this._animateOff = !1;
                        break;
                    case 'values':
                        for (this._animateOff = !0, this._refreshValue(), s = 0; n > s; s += 1) this._change(null, s);
                        this._animateOff = !1;
                        break;
                    case 'min':
                    case 'max':
                        this._animateOff = !0,
                            this._refreshValue(),
                            this._animateOff = !1;
                        break;
                    case 'range':
                        this._animateOff = !0,
                            this._refresh(),
                            this._animateOff = !1
                }
            },
            _value: function() {
                var t = this.options.value;
                return t = this._trimAlignValue(t)
            },
            _values: function(t) {
                var e,
                    i,
                    s;
                if (arguments.length) return e = this.options.values[t],
                    e = this._trimAlignValue(e);
                if (this.options.values && this.options.values.length) {
                    for (i = this.options.values.slice(), s = 0; s < i.length; s += 1) i[s] = this._trimAlignValue(i[s]);
                    return i
                }
                return []
            },
            _trimAlignValue: function(t) {
                if (t <= this._valueMin()) return this._valueMin();
                if (t >= this._valueMax()) return this._valueMax();
                var e = this.options.step > 0 ? this.options.step : 1,
                    i = (t - this._valueMin()) % e,
                    s = t - i;
                return 2 * Math.abs(i) >= e && (s += i > 0 ? e : -e),
                    parseFloat(s.toFixed(5))
            },
            _valueMin: function() {
                return this.options.min
            },
            _valueMax: function() {
                return this.options.max
            },
            _refreshValue: function() {
                var e,
                    i,
                    s,
                    n,
                    a,
                    o = this.options.range,
                    r = this.options,
                    h = this,
                    l = this._animateOff ? !1 : r.animate,
                    c = {};
                this.options.values && this.options.values.length ? this.handles.each(function(s) {
                    i = (h.values(s) - h._valueMin()) / (h._valueMax() - h._valueMin()) * 100,
                        c['horizontal' === h.orientation ? 'left' : 'bottom'] = i + '%',
                        t(this).stop(1, 1)[l ? 'animate' : 'css'](c, r.animate),
                    h.options.range === !0 && ('horizontal' === h.orientation ? (0 === s && h.range.stop(1, 1)[l ? 'animate' : 'css']({
                        left: i + '%'
                    }, r.animate), 1 === s && h.range[l ? 'animate' : 'css']({
                        width: i - e + '%'
                    }, {
                        queue: !1,
                        duration: r.animate
                    })) : (0 === s && h.range.stop(1, 1)[l ? 'animate' : 'css']({
                        bottom: i + '%'
                    }, r.animate), 1 === s && h.range[l ? 'animate' : 'css']({
                        height: i - e + '%'
                    }, {
                        queue: !1,
                        duration: r.animate
                    }))),
                        e = i
                }) : (s = this.value(), n = this._valueMin(), a = this._valueMax(), i = a !== n ? (s - n) / (a - n) * 100 : 0, c['horizontal' === this.orientation ? 'left' : 'bottom'] = i + '%', this.handle.stop(1, 1)[l ? 'animate' : 'css'](c, r.animate), 'min' === o && 'horizontal' === this.orientation && this.range.stop(1, 1)[l ? 'animate' : 'css']({
                    width: i + '%'
                }, r.animate), 'max' === o && 'horizontal' === this.orientation && this.range[l ? 'animate' : 'css']({
                    width: 100 - i + '%'
                }, {
                    queue: !1,
                    duration: r.animate
                }), 'min' === o && 'vertical' === this.orientation && this.range.stop(1, 1)[l ? 'animate' : 'css']({
                    height: i + '%'
                }, r.animate), 'max' === o && 'vertical' === this.orientation && this.range[l ? 'animate' : 'css']({
                    height: 100 - i + '%'
                }, {
                    queue: !1,
                    duration: r.animate
                }))
            },
            _handleEvents: {
                keydown: function(i) {
                    var s,
                        n,
                        a,
                        o,
                        r = t(i.target).data('ui-slider-handle-index');
                    switch (i.keyCode) {
                        case t.ui.keyCode.HOME:
                        case t.ui.keyCode.END:
                        case t.ui.keyCode.PAGE_UP:
                        case t.ui.keyCode.PAGE_DOWN:
                        case t.ui.keyCode.UP:
                        case t.ui.keyCode.RIGHT:
                        case t.ui.keyCode.DOWN:
                        case t.ui.keyCode.LEFT:
                            if (i.preventDefault(), !this._keySliding && (this._keySliding = !0, t(i.target).addClass('ui-state-active'), s = this._start(i, r), s === !1)) return
                    }
                    switch (o = this.options.step, n = a = this.options.values && this.options.values.length ? this.values(r) : this.value(), i.keyCode) {
                        case t.ui.keyCode.HOME:
                            a = this._valueMin();
                            break;
                        case t.ui.keyCode.END:
                            a = this._valueMax();
                            break;
                        case t.ui.keyCode.PAGE_UP:
                            a = this._trimAlignValue(n + (this._valueMax() - this._valueMin()) / e);
                            break;
                        case t.ui.keyCode.PAGE_DOWN:
                            a = this._trimAlignValue(n - (this._valueMax() - this._valueMin()) / e);
                            break;
                        case t.ui.keyCode.UP:
                        case t.ui.keyCode.RIGHT:
                            if (n === this._valueMax()) return;
                            a = this._trimAlignValue(n + o);
                            break;
                        case t.ui.keyCode.DOWN:
                        case t.ui.keyCode.LEFT:
                            if (n === this._valueMin()) return;
                            a = this._trimAlignValue(n - o)
                    }
                    this._slide(i, r, a)
                },
                click: function(t) {
                    t.preventDefault()
                },
                keyup: function(e) {
                    var i = t(e.target).data('ui-slider-handle-index');
                    this._keySliding && (this._keySliding = !1, this._stop(e, i), this._change(e, i), t(e.target).removeClass('ui-state-active'))
                }
            }
        })
    }(jQuery);
$(function() {
    $.ui.plugin.add('resizable', 'scroll', {
        start: function(t) {
            var e = $(this).data('ui-resizable'),
                l = e.options.scrollSensitivity,
                s = e.options.scrollDistance,
                i = e.helper.scrollParent();
            e.lastEvent = t,
                e.scrollInterval = window.setInterval(function() {
                    var t = i.offset(),
                        a = e.lastEvent.pageX - e.originalMousePosition.left;
                    t.left + i[0].offsetWidth - e.lastEvent.pageX < l && a > l / 0.2 ? (i[0].scrollLeft += s, e.originalMousePosition.left -= s, e._mouseDrag(e.lastEvent)) : e.lastEvent.pageX - t.left < l && l / -0.2 > a && (i[0].scrollLeft -= s, e.originalMousePosition.left += s, e._mouseDrag(e.lastEvent))
                }, e.options.scrollSpeed)
        },
        resize: function(t) {
            var e = $(this).data('ui-resizable');
            e.lastEvent = t
        },
        stop: function() {
            var t = $(this).data('ui-resizable');
            t.lastEvent = null,
                window.clearInterval(t.scrollInterval)
        }
    })
});
! function(e) {
    function n(n, i) {
        var s,
            c,
            r,
            l = this,
            a = n.add(l),
            d = e(window),
            f = e.tools.expose && (i.mask || i.expose),
            u = Math.random().toString().slice(10);
        f && ('string' == typeof f && (f = {
            color: f
        }), f.closeOnClick = f.closeOnEsc = !1);
        var h = i.target || n.attr('rel');
        if (c = h ? e(h) : null || n, !c.length) throw 'Could not find Overlay: ' + h;
        n && -1 == n.index(c) && n.click(function(e) {
            return l.load(e),
                e.preventDefault()
        }),
            e.extend(l, {
                load: function(n) {
                    if (l.isOpened()) return l;
                    var s = o[i.effect];
                    if (!s) throw 'Overlay: cannot find effect : "' + i.effect + '"';
                    if (i.oneInstance && e.each(t, function() {
                            this.close(n)
                        }), n = n || e.Event(), n.type = 'onBeforeLoad', a.trigger(n), n.isDefaultPrevented()) return l;
                    r = !0,
                    f && e(c).expose(f);
                    var h = i.top,
                        p = i.left,
                        k = c.outerWidth({
                            margin: !0
                        }),
                        g = c.outerHeight({
                            margin: !0
                        });
                    return 'string' == typeof h && (h = 'center' == h ? Math.max((d.height() - g) / 2, 0) : parseInt(h, 10) / 100 * d.height()),
                    'center' == p && (p = Math.max((d.width() - k) / 2, 0)),
                        s[0].call(l, {
                            top: h,
                            left: p
                        }, function() {
                            r && (n.type = 'onLoad', a.trigger(n))
                        }),
                    f && i.closeOnClick && e.mask.getMask().one('click', l.close),
                    i.closeOnClick && e(document).bind('click.' + u, function(n) {
                        e(n.target).parents(c).length || l.close(n)
                    }),
                    i.closeOnEsc && e(document).bind('keydown.' + u, function(e) {
                        27 == e.keyCode && l.close(e)
                    }),
                        l
                },
                close: function(n) {
                    return l.isOpened() ? (n = n || e.Event(), n.type = 'onBeforeClose', a.trigger(n), n.isDefaultPrevented() ? void 0 : (r = !1, o[i.effect][1].call(l, function() {
                        n.type = 'onClose',
                            a.trigger(n)
                    }), e(document).unbind('click.' + u).unbind('keydown.' + u), f && e.mask.close(), l)) : l
                },
                getOverlay: function() {
                    return c
                },
                getTrigger: function() {
                    return n
                },
                getClosers: function() {
                    return s
                },
                isOpened: function() {
                    return r
                },
                getConf: function() {
                    return i
                }
            }),
            e.each('onBeforeLoad,onStart,onLoad,onBeforeClose,onClose'.split(','), function(n, t) {
                e.isFunction(i[t]) && e(l).bind(t, i[t]),
                    l[t] = function(n) {
                        return n && e(l).bind(t, n),
                            l
                    }
            }),
            s = c.find(i.close || '.close'), !s.length && !i.close && (s = e('<a class="close"></a>'), c.prepend(s)),
            s.click(function(e) {
                l.close(e)
            }),
        i.load && l.load()
    }
    e.tools = e.tools || {
        version: 'v1.2.5'
    },
        e.tools.overlay = {
            addEffect: function(e, n, t) {
                o[e] = [
                    n,
                    t
                ]
            },
            conf: {
                close: null,
                closeOnClick: !0,
                closeOnEsc: !0,
                closeSpeed: 'fast',
                effect: 'default',
                fixed: !e.browser.msie || e.browser.version > 6,
                left: 'center',
                load: !1,
                mask: null,
                oneInstance: !0,
                speed: 'normal',
                target: null,
                top: '10%'
            }
        };
    var t = [],
        o = {};
    e.tools.overlay.addEffect('default', function(n, t) {
        var o = this.getConf(),
            i = e(window);
        o.fixed || (n.top += i.scrollTop(), n.left += i.scrollLeft()),
            n.position = o.fixed ? 'fixed' : 'absolute',
            this.getOverlay().css(n).fadeIn(o.speed, t)
    }, function(e) {
        this.getOverlay().fadeOut(this.getConf().closeSpeed, e)
    }),
        e.fn.overlay = function(o) {
            var i = this.data('overlay');
            return i ? i : (e.isFunction(o) && (o = {
                onBeforeLoad: o
            }), o = e.extend(!0, {}, e.tools.overlay.conf, o), this.each(function() {
                i = new n(e(this), o),
                    t.push(i),
                    e(this).data('overlay', i)
            }), o.api ? i : this)
        }
}(jQuery),
    function(e) {
        function n() {
            if (e.browser.msie) {
                var n = e(document).height(),
                    t = e(window).height();
                return [window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
                    20 > n - t ? t : n
                ]
            }
            return [e(document).width(),
                e(document).height()
            ]
        }

        function t(n) {
            return n ? n.call(e.mask) : void 0
        }
        e.tools = e.tools || {
            version: 'v1.2.5'
        };
        var o;
        o = e.tools.expose = {
            conf: {
                maskId: 'exposeMask',
                loadSpeed: 'slow',
                closeSpeed: 'fast',
                closeOnClick: !0,
                closeOnEsc: !0,
                zIndex: 9998,
                opacity: 0.8,
                startOpacity: 0,
                color: '#fff',
                onLoad: null,
                onClose: null
            }
        };
        var i,
            s,
            c,
            r,
            l;
        e.mask = {
            load: function(a, d) {
                if (c) return this;
                'string' == typeof a && (a = {
                    color: a
                }),
                    a = a || r,
                    r = a = e.extend(e.extend({}, o.conf), a),
                    i = e('#' + a.maskId),
                i.length || (i = e('<div/>').attr('id', a.maskId), e('body').append(i));
                var f = n();
                return i.css({
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: f[0],
                    height: f[1],
                    display: 'none',
                    opacity: a.startOpacity,
                    zIndex: a.zIndex
                }),
                a.color && i.css('backgroundColor', a.color),
                    t(a.onBeforeLoad) === !1 ? this : (a.closeOnEsc && e(document).bind('keydown.mask', function(n) {
                        27 == n.keyCode && e.mask.close(n)
                    }), a.closeOnClick && i.bind('click.mask', function(n) {
                        e.mask.close(n)
                    }), e(window).bind('resize.mask', function() {
                        e.mask.fit()
                    }), d && d.length && (l = d.eq(0).css('zIndex'), e.each(d, function() {
                        var n = e(this);
                        /relative|absolute|fixed/i.test(n.css('position')) || n.css('position', 'relative')
                    }), s = d.css({
                        zIndex: Math.max(a.zIndex + 1, 'auto' == l ? 0 : l)
                    })), i.css({
                        display: 'block'
                    }).fadeTo(a.loadSpeed, a.opacity, function() {
                        e.mask.fit(),
                            t(a.onLoad),
                            c = 'full'
                    }), c = !0, this)
            },
            close: function() {
                if (c) {
                    if (t(r.onBeforeClose) === !1) return this;
                    i.fadeOut(r.closeSpeed, function() {
                        t(r.onClose),
                        s && s.css({
                            zIndex: l
                        }),
                            c = !1
                    }),
                        e(document).unbind('keydown.mask'),
                        i.unbind('click.mask'),
                        e(window).unbind('resize.mask')
                }
                return this
            },
            fit: function() {
                if (c) {
                    var e = n();
                    i.css({
                        width: e[0],
                        height: e[1]
                    })
                }
            },
            getMask: function() {
                return i
            },
            isLoaded: function(e) {
                return e ? 'full' == c : c
            },
            getConf: function() {
                return r
            },
            getExposed: function() {
                return s
            }
        },
            e.fn.mask = function(n) {
                return e.mask.load(n),
                    this
            },
            e.fn.expose = function(n) {
                return e.mask.load(n, this),
                    this
            }
    }(jQuery);
! function(t) {
    if (t.support.touch = 'object' == typeof Touch, t.support.touch) {
        var e = t.ui.mouse.prototype,
            i = e._mouseInit;
        t.extend(e, {
            _mouseInit: function() {
                this.element.bind('touchstart.' + this.widgetName, t.proxy(this, '_touchStart')),
                    i.apply(this, arguments)
            },
            _touchStart: function(e) {
                return 'resizable' != this.widgetName || t(e.target).is('.ui-resizable-handle, .ui-resizable-e') ? 'sortable' == this.widgetName && t(e.target).is('.ui-resizable-handle, .ui-resizable-e') ? !0 : (this.element.bind('touchmove.' + this.widgetName, t.proxy(this, '_touchMove')).bind('touchend.' + this.widgetName, t.proxy(this, '_touchEnd')), this._modifyEvent(e), t(document).trigger(t.Event('mouseup')), this._mouseDown(e), !0) : !0
            },
            _touchMove: function(t) {
                this._modifyEvent(t),
                    this._mouseMove(t)
            },
            _touchEnd: function(t) {
                this.element.unbind('touchmove.' + this.widgetName).unbind('touchend.' + this.widgetName),
                    this._mouseUp(t)
            },
            _modifyEvent: function(t) {
                if (t.which = 1, 'undefined' != typeof t.originalEvent) {
                    var e = t.originalEvent.targetTouches[0];
                    t.pageX = e.clientX,
                        t.pageY = e.clientY
                }
            }
        })
    }
}(jQuery);
! function(t) {
    'use strict';
    var e = function(t, e) {
        this.init('tooltip', t, e)
    };
    e.prototype = {
        constructor: e,
        init: function(e, i, o) {
            var n,
                s,
                h,
                a,
                l;
            for (this.type = e, this.$element = t(i), this.options = this.getOptions(o), this.enabled = !0, h = this.options.trigger.split(' '), l = h.length; l--;) a = h[l],
                'click' == a ? this.$element.on('click.' + this.type, this.options.selector, t.proxy(this.toggle, this)) : 'manual' != a && (n = 'hover' == a ? 'mouseenter' : 'focus', s = 'hover' == a ? 'mouseleave' : 'blur', this.$element.on(n + '.' + this.type, this.options.selector, t.proxy(this.enter, this)), this.$element.on(s + '.' + this.type, this.options.selector, t.proxy(this.leave, this)));
            this.options.selector ? this._options = t.extend({}, this.options, {
                trigger: 'manual',
                selector: ''
            }) : this.fixTitle()
        },
        getOptions: function(e) {
            return e = t.extend({}, t.fn[this.type].defaults, this.$element.data(), e),
            e.delay && 'number' == typeof e.delay && (e.delay = {
                show: e.delay,
                hide: e.delay
            }),
                e
        },
        enter: function(e) {
            var i,
                o = t.fn[this.type].defaults,
                n = {};
            return this._options && t.each(this._options, function(t, e) {
                o[t] != e && (n[t] = e)
            }, this),
                i = t(e.currentTarget)[this.type](n).data(this.type),
                i.options.delay && i.options.delay.show ? (clearTimeout(this.timeout), i.hoverState = 'in', void(this.timeout = setTimeout(function() {
                    'in' == i.hoverState && i.show()
                }, i.options.delay.show))) : i.show()
        },
        leave: function(e) {
            var i = t(e.currentTarget)[this.type](this._options).data(this.type);
            return this.timeout && clearTimeout(this.timeout),
                i.options.delay && i.options.delay.hide ? (i.hoverState = 'out', void(this.timeout = setTimeout(function() {
                    'out' == i.hoverState && i.hide()
                }, i.options.delay.hide))) : i.hide()
        },
        show: function() {
            var e,
                i,
                o,
                n,
                s,
                h,
                a = t.Event('show');
            if (this.hasContent() && this.enabled) {
                if (this.$element.trigger(a), a.isDefaultPrevented()) return;
                switch (e = this.tip(), this.setContent(), this.options.animation && e.addClass('fade'), s = 'function' == typeof this.options.placement ? this.options.placement.call(this, e[0], this.$element[0]) : this.options.placement, e.detach().css({
                    top: 0,
                    left: 0,
                    display: 'block'
                }), this.options.container ? e.appendTo(this.options.container) : e.insertAfter(this.$element), i = this.getPosition(), o = e[0].offsetWidth, n = e[0].offsetHeight, s) {
                    case 'bottom':
                        h = {
                            top: i.top + i.height,
                            left: i.left + i.width / 2 - o / 2
                        };
                        break;
                    case 'top':
                        h = {
                            top: i.top - n,
                            left: i.left + i.width / 2 - o / 2
                        };
                        break;
                    case 'left':
                        h = {
                            top: i.top + i.height / 2 - n / 2,
                            left: i.left - o
                        };
                        break;
                    case 'right':
                        h = {
                            top: i.top + i.height / 2 - n / 2,
                            left: i.left + i.width
                        }
                }
                this.applyPlacement(h, s),
                    this.$element.trigger('shown')
            }
        },
        applyPlacement: function(t, e) {
            var i,
                o,
                n,
                s,
                h = this.tip(),
                a = h[0].offsetWidth,
                l = h[0].offsetHeight;
            h.offset(t).addClass(e).addClass('in'),
                i = h[0].offsetWidth,
                o = h[0].offsetHeight,
            'top' == e && o != l && (t.top = t.top + l - o, s = !0),
                'bottom' == e || 'top' == e ? (n = 0, t.left < 0 && (n = -2 * t.left, t.left = 0, h.offset(t), i = h[0].offsetWidth, o = h[0].offsetHeight), this.replaceArrow(n - a + i, i, 'left')) : this.replaceArrow(o - l, o, 'top'),
            s && h.offset(t)
        },
        replaceArrow: function(t, e, i) {
            this.arrow().css(i, t ? 50 * (1 - t / e) + '%' : '')
        },
        setContent: function() {
            var t = this.tip(),
                e = this.getTitle();
            t.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](e),
                t.removeClass('fade in top bottom left right')
        },
        hide: function() {
            function e() {
                var e = setTimeout(function() {
                    i.off(t.support.transition.end).detach()
                }, 500);
                i.one(t.support.transition.end, function() {
                    clearTimeout(e),
                        i.detach()
                })
            }
            var i = this.tip(),
                o = t.Event('hide');
            return this.$element.trigger(o),
                o.isDefaultPrevented() ? void 0 : (i.removeClass('in'), t.support.transition && this.$tip.hasClass('fade') ? e() : i.detach(), this.$element.trigger('hidden'), this)
        },
        fixTitle: function() {
            var t = this.$element;
            (t.attr('title') || 'string' != typeof t.attr('data-original-title')) && t.attr('data-original-title', t.attr('title') || '').attr('title', '')
        },
        hasContent: function() {
            return this.getTitle()
        },
        getPosition: function() {
            var e = this.$element[0];
            return t.extend({}, 'function' == typeof e.getBoundingClientRect ? e.getBoundingClientRect() : {
                width: e.offsetWidth,
                height: e.offsetHeight
            }, this.$element.offset())
        },
        getTitle: function() {
            var t,
                e = this.$element,
                i = this.options;
            return t = e.attr('data-original-title') || ('function' == typeof i.title ? i.title.call(e[0]) : i.title)
        },
        tip: function() {
            return this.$tip = this.$tip || t(this.options.template)
        },
        arrow: function() {
            return this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow')
        },
        validate: function() {
            this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null)
        },
        enable: function() {
            this.enabled = !0
        },
        disable: function() {
            this.enabled = !1
        },
        toggleEnabled: function() {
            this.enabled = !this.enabled
        },
        toggle: function(e) {
            var i = e ? t(e.currentTarget)[this.type](this._options).data(this.type) : this;
            i.tip().hasClass('in') ? i.hide() : i.show()
        },
        destroy: function() {
            this.hide().$element.off('.' + this.type).removeData(this.type)
        }
    };
    var i = t.fn.tooltip;
    t.fn.tooltip = function(i) {
        return this.each(function() {
            var o = t(this),
                n = o.data('tooltip'),
                s = 'object' == typeof i && i;
            n || o.data('tooltip', n = new e(this, s)),
            'string' == typeof i && n[i]()
        })
    },
        t.fn.tooltip.Constructor = e,
        t.fn.tooltip.defaults = {
            animation: !0,
            placement: 'top',
            selector: !1,
            template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
            trigger: 'hover focus',
            title: '',
            delay: 0,
            html: !1,
            container: !1
        },
        t.fn.tooltip.noConflict = function() {
            return t.fn.tooltip = i,
                this
        }
}(window.jQuery);
! function(e, t) {
    'function' == typeof define && define.amd ? define('sifter', t) : 'object' == typeof exports ? module.exports = t() : e.Sifter = t()
}(this, function() {
    var e = function(e, t) {
        this.items = e,
            this.settings = t || {
                diacritics: !0
            }
    };
    e.prototype.tokenize = function(e) {
        if (e = i(String(e || '').toLowerCase()), !e || !e.length) return [];
        var t,
            n,
            r,
            a,
            l = [],
            u = e.split(/ +/);
        for (t = 0, n = u.length; n > t; t++) {
            if (r = o(u[t]), this.settings.diacritics)
                for (a in s) s.hasOwnProperty(a) && (r = r.replace(new RegExp(a, 'g'), s[a]));
            l.push({
                string: u[t],
                regex: new RegExp(r, 'i')
            })
        }
        return l
    },
        e.prototype.iterator = function(e, t) {
            var n;
            n = r(e) ? Array.prototype.forEach || function(e) {
                for (var t = 0, n = this.length; n > t; t++) e(this[t], t, this)
            } : function(e) {
                for (var t in this) this.hasOwnProperty(t) && e(this[t], t, this)
            },
                n.apply(e, [
                    t
                ])
        },
        e.prototype.getScoreFunction = function(e, t) {
            var n,
                i,
                o,
                r;
            n = this,
                e = n.prepareSearch(e, t),
                o = e.tokens,
                i = e.options.fields,
                r = o.length;
            var s = function(e, t) {
                    var n,
                        i;
                    return e ? (e = String(e || ''), i = e.search(t.regex), -1 === i ? 0 : (n = t.string.length / e.length, 0 === i && (n += 0.5), n)) : 0
                },
                a = function() {
                    var e = i.length;
                    return e ? 1 === e ? function(e, t) {
                        return s(t[i[0]], e)
                    } : function(t, n) {
                        for (var o = 0, r = 0; e > o; o++) r += s(n[i[o]], t);
                        return r / e
                    } : function() {
                        return 0
                    }
                }();
            return r ? 1 === r ? function(e) {
                return a(o[0], e)
            } : 'and' === e.options.conjunction ? function(e) {
                for (var t, n = 0, i = 0; r > n; n++) {
                    if (t = a(o[n], e), 0 >= t) return 0;
                    i += t
                }
                return i / r
            } : function(e) {
                for (var t = 0, n = 0; r > t; t++) n += a(o[t], e);
                return n / r
            } : function() {
                return 0
            }
        },
        e.prototype.getSortFunction = function(e, n) {
            var i,
                o,
                r,
                s,
                a,
                l,
                u,
                p,
                c,
                d,
                h;
            if (r = this, e = r.prepareSearch(e, n), h = !e.query && n.sort_empty || n.sort, c = function(e, t) {
                    return '$score' === e ? t.score : r.items[t.id][e]
                }, a = [], h)
                for (i = 0, o = h.length; o > i; i++)(e.query || '$score' !== h[i].field) && a.push(h[i]);
            if (e.query) {
                for (d = !0, i = 0, o = a.length; o > i; i++)
                    if ('$score' === a[i].field) {
                        d = !1;
                        break
                    }
                d && a.unshift({
                    field: '$score',
                    direction: 'desc'
                })
            } else
                for (i = 0, o = a.length; o > i; i++)
                    if ('$score' === a[i].field) {
                        a.splice(i, 1);
                        break
                    }
            for (p = [], i = 0, o = a.length; o > i; i++) p.push('desc' === a[i].direction ? -1 : 1);
            return l = a.length,
                l ? 1 === l ? (s = a[0].field, u = p[0], function(e, n) {
                    return u * t(c(s, e), c(s, n))
                }) : function(e, n) {
                    var i,
                        o,
                        r;
                    for (i = 0; l > i; i++)
                        if (r = a[i].field, o = p[i] * t(c(r, e), c(r, n))) return o;
                    return 0
                } : null
        },
        e.prototype.prepareSearch = function(e, t) {
            if ('object' == typeof e) return e;
            t = n({}, t);
            var i = t.fields,
                o = t.sort,
                s = t.sort_empty;
            return i && !r(i) && (t.fields = [
                i
            ]),
            o && !r(o) && (t.sort = [
                o
            ]),
            s && !r(s) && (t.sort_empty = [
                s
            ]), {
                options: t,
                query: String(e || '').toLowerCase(),
                tokens: this.tokenize(e),
                total: 0,
                items: []
            }
        },
        e.prototype.search = function(e, t) {
            var n,
                i,
                o,
                r,
                s = this;
            return i = this.prepareSearch(e, t),
                t = i.options,
                e = i.query,
                r = t.score || s.getScoreFunction(i),
                e.length ? s.iterator(s.items, function(e, o) {
                    n = r(e), (t.filter === !1 || n > 0) && i.items.push({
                        score: n,
                        id: o
                    })
                }) : s.iterator(s.items, function(e, t) {
                    i.items.push({
                        score: 1,
                        id: t
                    })
                }),
                o = s.getSortFunction(i, t),
            o && i.items.sort(o),
                i.total = i.items.length,
            'number' == typeof t.limit && (i.items = i.items.slice(0, t.limit)),
                i
        };
    var t = function(e, t) {
            return 'number' == typeof e && 'number' == typeof t ? e > t ? 1 : t > e ? -1 : 0 : (e = String(e || '').toLowerCase(), t = String(t || '').toLowerCase(), e > t ? 1 : t > e ? -1 : 0)
        },
        n = function(e) {
            var t,
                n,
                i,
                o;
            for (t = 1, n = arguments.length; n > t; t++)
                if (o = arguments[t])
                    for (i in o) o.hasOwnProperty(i) && (e[i] = o[i]);
            return e
        },
        i = function(e) {
            return (e + '').replace(/^\s+|\s+$|/g, '')
        },
        o = function(e) {
            return (e + '').replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1')
        },
        r = Array.isArray || $ && $.isArray || function(e) {
                return '[object Array]' === Object.prototype.toString.call(e)
            },
        s = {
            a: '[aÀÁÂÃÄÅàáâãäå]',
            c: '[cÇçćĆčČ]',
            d: '[dđĐďĎ]',
            e: '[eÈÉÊËèéêëěĚ]',
            i: '[iÌÍÎÏìíîï]',
            n: '[nÑñňŇ]',
            o: '[oÒÓÔÕÕÖØòóôõöø]',
            r: '[rřŘ]',
            s: '[sŠš]',
            t: '[tťŤ]',
            u: '[uÙÚÛÜùúûüůŮ]',
            y: '[yŸÿýÝ]',
            z: '[zŽž]'
        };
    return e
}),
    function(e, t) {
        'function' == typeof define && define.amd ? define('microplugin', t) : 'object' == typeof exports ? module.exports = t() : e.MicroPlugin = t()
    }(this, function() {
        var e = {};
        e.mixin = function(e) {
            e.plugins = {},
                e.prototype.initializePlugins = function(e) {
                    var n,
                        i,
                        o,
                        r = this,
                        s = [];
                    if (r.plugins = {
                            names: [],
                            settings: {},
                            requested: {},
                            loaded: {}
                        }, t.isArray(e))
                        for (n = 0, i = e.length; i > n; n++) 'string' == typeof e[n] ? s.push(e[n]) : (r.plugins.settings[e[n].name] = e[n].options, s.push(e[n].name));
                    else if (e)
                        for (o in e) e.hasOwnProperty(o) && (r.plugins.settings[o] = e[o], s.push(o));
                    for (; s.length;) r.require(s.shift())
                },
                e.prototype.loadPlugin = function(t) {
                    var n = this,
                        i = n.plugins,
                        o = e.plugins[t];
                    if (!e.plugins.hasOwnProperty(t)) throw new Error('Unable to find "' + t + '" plugin');
                    i.requested[t] = !0,
                        i.loaded[t] = o.fn.apply(n, [
                            n.plugins.settings[t] || {}
                        ]),
                        i.names.push(t)
                },
                e.prototype.require = function(e) {
                    var t = this,
                        n = t.plugins;
                    if (!t.plugins.loaded.hasOwnProperty(e)) {
                        if (n.requested[e]) throw new Error('Plugin has circular dependency ("' + e + '")');
                        t.loadPlugin(e)
                    }
                    return n.loaded[e]
                },
                e.define = function(t, n) {
                    e.plugins[t] = {
                        name: t,
                        fn: n
                    }
                }
        };
        var t = {
            isArray: Array.isArray || function(e) {
                return '[object Array]' === Object.prototype.toString.call(e)
            }
        };
        return e
    }),
    function(e, t) {
        'function' == typeof define && define.amd ? define('selectize', [
            'jquery',
            'sifter',
            'microplugin'
        ], t) : 'object' == typeof exports ? module.exports = t(require('jquery'), require('sifter'), require('microplugin')) : e.Selectize = t(e.jQuery, e.Sifter, e.MicroPlugin)
    }(this, function(e, t, n) {
        'use strict';
        var i = function(e, t) {
                if ('string' != typeof t || t.length) {
                    var n = 'string' == typeof t ? new RegExp(t, 'i') : t,
                        i = function(e) {
                            var t = 0;
                            if (3 === e.nodeType) {
                                var o = e.data.search(n);
                                if (o >= 0 && e.data.length > 0) {
                                    var r = e.data.match(n),
                                        s = document.createElement('span');
                                    s.className = 'highlight';
                                    var a = e.splitText(o),
                                        l = (a.splitText(r[0].length), a.cloneNode(!0));
                                    s.appendChild(l),
                                        a.parentNode.replaceChild(s, a),
                                        t = 1
                                }
                            } else if (1 === e.nodeType && e.childNodes && !/(script|style)/i.test(e.tagName))
                                for (var u = 0; u < e.childNodes.length; ++u) u += i(e.childNodes[u]);
                            return t
                        };
                    return e.each(function() {
                        i(this)
                    })
                }
            },
            o = function() {};
        o.prototype = {
            on: function(e, t) {
                this._events = this._events || {},
                    this._events[e] = this._events[e] || [],
                    this._events[e].push(t)
            },
            off: function(e, t) {
                var n = arguments.length;
                return 0 === n ? delete this._events : 1 === n ? delete this._events[e] : (this._events = this._events || {}, void(e in this._events != !1 && this._events[e].splice(this._events[e].indexOf(t), 1)))
            },
            trigger: function(e) {
                if (this._events = this._events || {}, e in this._events != !1)
                    for (var t = 0; t < this._events[e].length; t++) this._events[e][t].apply(this, Array.prototype.slice.call(arguments, 1))
            }
        },
            o.mixin = function(e) {
                for (var t = [
                    'on',
                    'off',
                    'trigger'
                ], n = 0; n < t.length; n++) e.prototype[t[n]] = o.prototype[t[n]]
            };
        var r = /Mac/.test(navigator.userAgent),
            s = 65,
            a = 13,
            l = 27,
            u = 37,
            p = 38,
            c = 80,
            d = 39,
            h = 40,
            g = 78,
            f = 8,
            v = 46,
            m = 16,
            y = r ? 91 : 17,
            w = r ? 18 : 17,
            $ = 9,
            O = 1,
            C = 2,
            b = function(e) {
                return 'undefined' != typeof e
            },
            x = function(e) {
                return 'undefined' == typeof e || null === e ? '' : 'boolean' == typeof e ? e ? '1' : '0' : e + ''
            },
            S = function(e) {
                return (e + '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
            },
            I = function(e) {
                return (e + '').replace(/\$/g, '$$$$')
            },
            _ = {};
        _.before = function(e, t, n) {
            var i = e[t];
            e[t] = function() {
                return n.apply(e, arguments),
                    i.apply(e, arguments)
            }
        },
            _.after = function(e, t, n) {
                var i = e[t];
                e[t] = function() {
                    var t = i.apply(e, arguments);
                    return n.apply(e, arguments),
                        t
                }
            };
        var k = function(t, n) {
                if (!e.isArray(n)) return n;
                var i,
                    o,
                    r = {};
                for (i = 0, o = n.length; o > i; i++) n[i].hasOwnProperty(t) && (r[n[i][t]] = n[i]);
                return r
            },
            D = function(e) {
                var t = !1;
                return function() {
                    t || (t = !0, e.apply(this, arguments))
                }
            },
            F = function(e, t) {
                var n;
                return function() {
                    var i = this,
                        o = arguments;
                    window.clearTimeout(n),
                        n = window.setTimeout(function() {
                            e.apply(i, o)
                        }, t)
                }
            },
            A = function(e, t, n) {
                var i,
                    o = e.trigger,
                    r = {};
                e.trigger = function() {
                    var n = arguments[0];
                    return -1 === t.indexOf(n) ? o.apply(e, arguments) : void(r[n] = arguments)
                },
                    n.apply(e, []),
                    e.trigger = o;
                for (i in r) r.hasOwnProperty(i) && o.apply(e, r[i])
            },
            P = function(e, t, n, i) {
                e.on(t, n, function(t) {
                    for (var n = t.target; n && n.parentNode !== e[0];) n = n.parentNode;
                    return t.currentTarget = n,
                        i.apply(this, [
                            t
                        ])
                })
            },
            z = function(e) {
                var t = {};
                if ('selectionStart' in e) t.start = e.selectionStart,
                    t.length = e.selectionEnd - t.start;
                else if (document.selection) {
                    e.focus();
                    var n = document.selection.createRange(),
                        i = document.selection.createRange().text.length;
                    n.moveStart('character', -e.value.length),
                        t.start = n.text.length - i,
                        t.length = i
                }
                return t
            },
            T = function(e, t, n) {
                var i,
                    o,
                    r = {};
                if (n)
                    for (i = 0, o = n.length; o > i; i++) r[n[i]] = e.css(n[i]);
                else r = e.css();
                t.css(r)
            },
            q = function(t, n) {
                if (!t) return 0;
                var i = e('<test>').css({
                    position: 'absolute',
                    top: -99999,
                    left: -99999,
                    width: 'auto',
                    padding: 0,
                    whiteSpace: 'pre'
                }).text(t).appendTo('body');
                T(n, i, [
                    'letterSpacing',
                    'fontSize',
                    'fontFamily',
                    'fontWeight',
                    'textTransform'
                ]);
                var o = i.width();
                return i.remove(),
                    o
            },
            j = function(e) {
                var t = null,
                    n = function(n) {
                        var i,
                            o,
                            r,
                            s,
                            a,
                            l,
                            u,
                            p;
                        n = n || window.event || {},
                        n.metaKey || n.altKey || e.data('grow') !== !1 && (i = e.val(), n.type && 'keydown' === n.type.toLowerCase() && (o = n.keyCode, r = o >= 97 && 122 >= o || o >= 65 && 90 >= o || o >= 48 && 57 >= o || 32 === o, o === v || o === f ? (p = z(e[0]), p.length ? i = i.substring(0, p.start) + i.substring(p.start + p.length) : o === f && p.start ? i = i.substring(0, p.start - 1) + i.substring(p.start + 1) : o === v && 'undefined' != typeof p.start && (i = i.substring(0, p.start) + i.substring(p.start + 1))) : r && (l = n.shiftKey, u = String.fromCharCode(n.keyCode), u = l ? u.toUpperCase() : u.toLowerCase(), i += u)), s = e.attr('placeholder') || '', !i.length && s.length && (i = s), a = q(i, e) + 4, a !== t && (t = a, e.width(a), e.triggerHandler('resize')))
                    };
                e.on('keydown keyup update blur', n),
                    n()
            },
            N = function(n, i) {
                var o,
                    r,
                    s = this;
                r = n[0],
                    r.selectize = s,
                    o = window.getComputedStyle ? window.getComputedStyle(r, null).getPropertyValue('direction') : r.currentStyle && r.currentStyle.direction,
                    o = o || n.parents('[dir]:first').attr('dir') || '',
                    e.extend(s, {
                        settings: i,
                        $input: n,
                        tagType: 'select' === r.tagName.toLowerCase() ? O : C,
                        rtl: /rtl/i.test(o),
                        eventNS: '.selectize' + ++N.count,
                        highlightedValue: null,
                        isOpen: !1,
                        isDisabled: !1,
                        isRequired: n.is('[required]'),
                        isInvalid: !1,
                        isLocked: !1,
                        isFocused: !1,
                        isInputHidden: !1,
                        isSetup: !1,
                        isShiftDown: !1,
                        isCmdDown: !1,
                        isCtrlDown: !1,
                        ignoreFocus: !1,
                        ignoreHover: !1,
                        hasOptions: !1,
                        currentResults: null,
                        lastValue: '',
                        caretPos: 0,
                        loading: 0,
                        loadedSearches: {},
                        $activeOption: null,
                        $activeItems: [],
                        optgroups: {},
                        options: {},
                        userOptions: {},
                        items: [],
                        renderCache: {},
                        onSearchChange: F(s.onSearchChange, i.loadThrottle)
                    }),
                    s.sifter = new t(this.options, {
                        diacritics: i.diacritics
                    }),
                    e.extend(s.options, k(i.valueField, i.options)),
                    delete s.settings.options,
                    e.extend(s.optgroups, k(i.optgroupValueField, i.optgroups)),
                    delete s.settings.optgroups,
                    s.settings.mode = s.settings.mode || (1 === s.settings.maxItems ? 'single' : 'multi'),
                'boolean' != typeof s.settings.hideSelected && (s.settings.hideSelected = 'multi' === s.settings.mode),
                    s.initializePlugins(s.settings.plugins),
                    s.setupCallbacks(),
                    s.setupTemplates(),
                    s.setup()
            };
        return o.mixin(N),
            n.mixin(N),
            e.extend(N.prototype, {
                setup: function() {
                    var t,
                        n,
                        i,
                        o,
                        s,
                        a,
                        l,
                        u,
                        p,
                        c,
                        d = this,
                        h = d.settings,
                        g = d.eventNS,
                        f = e(window),
                        v = e(document);
                    l = d.settings.mode,
                        u = d.$input.attr('tabindex') || '',
                        p = d.$input.attr('class') || '',
                        t = e('<div>').addClass(h.wrapperClass).addClass(p).addClass(l),
                        n = e('<div>').addClass(h.inputClass).addClass('items').appendTo(t),
                        i = e('<input type="text" autocomplete="off" />').appendTo(n).attr('tabindex', u),
                        a = e(h.dropdownParent || t),
                        o = e('<div>').addClass(h.dropdownClass).addClass(p).addClass(l).hide().appendTo(a),
                        s = e('<div>').addClass(h.dropdownContentClass).appendTo(o),
                        t.css({
                            width: d.$input[0].style.width
                        }),
                    d.plugins.names.length && (c = 'plugin-' + d.plugins.names.join(' plugin-'), t.addClass(c), o.addClass(c)), (null === h.maxItems || h.maxItems > 1) && d.tagType === O && d.$input.attr('multiple', 'multiple'),
                    d.settings.placeholder && i.attr('placeholder', h.placeholder),
                        d.$wrapper = t,
                        d.$control = n,
                        d.$control_input = i,
                        d.$dropdown = o,
                        d.$dropdown_content = s,
                        o.on('mouseenter', '[data-selectable]', function() {
                            return d.onOptionHover.apply(d, arguments)
                        }),
                        o.on('mousedown', '[data-selectable]', function() {
                            return d.onOptionSelect.apply(d, arguments)
                        }),
                        P(n, 'mousedown', '*:not(input)', function() {
                            return d.onItemSelect.apply(d, arguments)
                        }),
                        j(i),
                        n.on({
                            mousedown: function() {
                                return d.onMouseDown.apply(d, arguments)
                            },
                            click: function() {
                                return d.onClick.apply(d, arguments)
                            }
                        }),
                        i.on({
                            mousedown: function(e) {
                                e.stopPropagation()
                            },
                            keydown: function() {
                                return d.onKeyDown.apply(d, arguments)
                            },
                            keyup: function() {
                                return d.onKeyUp.apply(d, arguments)
                            },
                            keypress: function() {
                                return d.onKeyPress.apply(d, arguments)
                            },
                            resize: function() {
                                d.positionDropdown.apply(d, [])
                            },
                            blur: function() {
                                return d.onBlur.apply(d, arguments)
                            },
                            focus: function() {
                                return d.onFocus.apply(d, arguments)
                            }
                        }),
                        v.on('keydown' + g, function(e) {
                            d.isCmdDown = e[r ? 'metaKey' : 'ctrlKey'],
                                d.isCtrlDown = e[r ? 'altKey' : 'ctrlKey'],
                                d.isShiftDown = e.shiftKey
                        }),
                        v.on('keyup' + g, function(e) {
                            e.keyCode === w && (d.isCtrlDown = !1),
                            e.keyCode === m && (d.isShiftDown = !1),
                            e.keyCode === y && (d.isCmdDown = !1)
                        }),
                        v.on('mousedown' + g, function(e) {
                            if (d.isFocused) {
                                if (e.target === d.$dropdown[0] || e.target.parentNode === d.$dropdown[0]) return !1;
                                d.$control.has(e.target).length || e.target === d.$control[0] || d.blur()
                            }
                        }),
                        f.on(['scroll' + g,
                            'resize' + g
                        ].join(' '), function() {
                            d.isOpen && d.positionDropdown.apply(d, arguments)
                        }),
                        f.on('mousemove' + g, function() {
                            d.ignoreHover = !1
                        }),
                        this.revertSettings = {
                            $children: d.$input.children().detach(),
                            tabindex: d.$input.attr('tabindex')
                        },
                        d.$input.attr('tabindex', -1).hide().after(d.$wrapper),
                    e.isArray(h.items) && (d.setValue(h.items), delete h.items),
                    d.$input[0].validity && d.$input.on('invalid' + g, function(e) {
                        e.preventDefault(),
                            d.isInvalid = !0,
                            d.refreshState()
                    }),
                        d.updateOriginalInput(),
                        d.refreshItems(),
                        d.refreshState(),
                        d.updatePlaceholder(),
                        d.isSetup = !0,
                    d.$input.is(':disabled') && d.disable(),
                        d.on('change', this.onChange),
                        d.trigger('initialize'),
                    h.preload === !0 && d.onSearchChange('')
                },
                setupTemplates: function() {
                    var t = this,
                        n = t.settings.labelField,
                        i = t.settings.optgroupLabelField,
                        o = {
                            optgroup: function(e) {
                                return '<div class="optgroup">' + e.html + '</div>'
                            },
                            optgroup_header: function(e, t) {
                                return '<div class="optgroup-header">' + t(e[i]) + '</div>'
                            },
                            option: function(e, t) {
                                return '<div class="option">' + t(e[n]) + '</div>'
                            },
                            item: function(e, t) {
                                return '<div class="item">' + t(e[n]) + '</div>'
                            },
                            option_create: function(e, t) {
                                return '<div class="create">Add <strong>' + t(e.input) + '</strong>&hellip;</div>'
                            }
                        };
                    t.settings.render = e.extend({}, o, t.settings.render)
                },
                setupCallbacks: function() {
                    var e,
                        t,
                        n = {
                            initialize: 'onInitialize',
                            change: 'onChange',
                            item_add: 'onItemAdd',
                            item_remove: 'onItemRemove',
                            clear: 'onClear',
                            option_add: 'onOptionAdd',
                            option_remove: 'onOptionRemove',
                            option_clear: 'onOptionClear',
                            dropdown_open: 'onDropdownOpen',
                            dropdown_close: 'onDropdownClose',
                            type: 'onType'
                        };
                    for (e in n) n.hasOwnProperty(e) && (t = this.settings[n[e]], t && this.on(e, t))
                },
                onClick: function(e) {
                    var t = this;
                    t.isFocused || (t.focus(), e.preventDefault())
                },
                onMouseDown: function(t) {
                    {
                        var n = this,
                            i = t.isDefaultPrevented();
                        e(t.target)
                    }
                    if (n.isFocused) {
                        if (t.target !== n.$control_input[0]) return 'single' === n.settings.mode ? n.isOpen ? n.close() : n.open() : i || n.setActiveItem(null), !1
                    } else i || window.setTimeout(function() {
                        n.focus()
                    }, 0)
                },
                onChange: function() {
                    this.$input.trigger('change')
                },
                onKeyPress: function(e) {
                    if (this.isLocked) return e && e.preventDefault();
                    var t = String.fromCharCode(e.keyCode || e.which);
                    return this.settings.create && t === this.settings.delimiter ? (this.createItem(), e.preventDefault(), !1) : void 0
                },
                onKeyDown: function(e) {
                    var t = (e.target === this.$control_input[0], this);
                    if (t.isLocked) return void(e.keyCode !== $ && e.preventDefault());
                    switch (e.keyCode) {
                        case s:
                            if (t.isCmdDown) return void t.selectAll();
                            break;
                        case l:
                            return void t.close();
                        case g:
                            if (!e.ctrlKey) break;
                        case h:
                            if (!t.isOpen && t.hasOptions) t.open();
                            else if (t.$activeOption) {
                                t.ignoreHover = !0;
                                var n = t.getAdjacentOption(t.$activeOption, 1);
                                n.length && t.setActiveOption(n, !0, !0)
                            }
                            return void e.preventDefault();
                        case c:
                            if (!e.ctrlKey) break;
                        case p:
                            if (t.$activeOption) {
                                t.ignoreHover = !0;
                                var i = t.getAdjacentOption(t.$activeOption, -1);
                                i.length && t.setActiveOption(i, !0, !0)
                            }
                            return void e.preventDefault();
                        case a:
                            return t.isOpen && t.$activeOption && t.onOptionSelect({
                                currentTarget: t.$activeOption
                            }),
                                void e.preventDefault();
                        case u:
                            return void t.advanceSelection(-1, e);
                        case d:
                            return void t.advanceSelection(1, e);
                        case $:
                            return t.isOpen && t.$activeOption && t.onOptionSelect({
                                currentTarget: t.$activeOption
                            }),
                                void(t.settings.create && t.createItem() && e.preventDefault());
                        case f:
                        case v:
                            return void t.deleteSelection(e)
                    }
                    return t.isFull() || t.isInputHidden ? void e.preventDefault() : void 0
                },
                onKeyUp: function(e) {
                    var t = this;
                    if (t.isLocked) return e && e.preventDefault();
                    var n = t.$control_input.val() || '';
                    t.lastValue !== n && (t.lastValue = n, t.onSearchChange(n), t.refreshOptions(), t.trigger('type', n))
                },
                onSearchChange: function(e) {
                    var t = this,
                        n = t.settings.load;
                    n && (t.loadedSearches.hasOwnProperty(e) || (t.loadedSearches[e] = !0, t.load(function(i) {
                        n.apply(t, [
                            e,
                            i
                        ])
                    })))
                },
                onFocus: function(e) {
                    var t = this;
                    return t.isFocused = !0,
                        t.isDisabled ? (t.blur(), e && e.preventDefault(), !1) : void(t.ignoreFocus || ('focus' === t.settings.preload && t.onSearchChange(''), t.$activeItems.length || (t.showInput(), t.setActiveItem(null), t.refreshOptions(!!t.settings.openOnFocus)), t.refreshState()))
                },
                onBlur: function() {
                    var e = this;
                    e.isFocused = !1,
                    e.ignoreFocus || (e.settings.create && e.settings.createOnBlur && e.createItem(!1), e.close(), e.setTextboxValue(''), e.setActiveItem(null), e.setActiveOption(null), e.setCaret(e.items.length), e.refreshState())
                },
                onOptionHover: function(e) {
                    this.ignoreHover || this.setActiveOption(e.currentTarget, !1)
                },
                onOptionSelect: function(t) {
                    var n,
                        i,
                        o = this;
                    t.preventDefault && (t.preventDefault(), t.stopPropagation()),
                        i = e(t.currentTarget),
                        i.hasClass('create') ? o.createItem() : (n = i.attr('data-value'), n && (o.lastQuery = null, o.setTextboxValue(''), o.addItem(n), !o.settings.hideSelected && t.type && /mouse/.test(t.type) && o.setActiveOption(o.getOption(n))))
                },
                onItemSelect: function(e) {
                    var t = this;
                    t.isLocked || 'multi' === t.settings.mode && (e.preventDefault(), t.setActiveItem(e.currentTarget, e))
                },
                load: function(e) {
                    var t = this,
                        n = t.$wrapper.addClass('loading');
                    t.loading++,
                        e.apply(t, [
                            function(e) {
                                t.loading = Math.max(t.loading - 1, 0),
                                e && e.length && (t.addOption(e), t.refreshOptions(t.isFocused && !t.isInputHidden)),
                                t.loading || n.removeClass('loading'),
                                    t.trigger('load', e)
                            }
                        ])
                },
                setTextboxValue: function(e) {
                    this.$control_input.val(e).triggerHandler('update'),
                        this.lastValue = e
                },
                getValue: function() {
                    return this.tagType === O && this.$input.attr('multiple') ? this.items : this.items.join(this.settings.delimiter)
                },
                setValue: function(e) {
                    A(this, [
                        'change'
                    ], function() {
                        this.clear(),
                            this.addItems(e)
                    })
                },
                setActiveItem: function(t, n) {
                    var i,
                        o,
                        r,
                        s,
                        a,
                        l,
                        u,
                        p,
                        c = this;
                    if ('single' !== c.settings.mode) {
                        if (t = e(t), !t.length) return e(c.$activeItems).removeClass('active'),
                            c.$activeItems = [],
                            void(c.isFocused && c.showInput());
                        if (i = n && n.type.toLowerCase(), 'mousedown' === i && c.isShiftDown && c.$activeItems.length) {
                            for (p = c.$control.children('.active:last'), s = Array.prototype.indexOf.apply(c.$control[0].childNodes, [
                                p[0]
                            ]), a = Array.prototype.indexOf.apply(c.$control[0].childNodes, [
                                t[0]
                            ]), s > a && (u = s, s = a, a = u), o = s; a >= o; o++) l = c.$control[0].childNodes[o], -1 === c.$activeItems.indexOf(l) && (e(l).addClass('active'), c.$activeItems.push(l));
                            n.preventDefault()
                        } else 'mousedown' === i && c.isCtrlDown || 'keydown' === i && this.isShiftDown ? t.hasClass('active') ? (r = c.$activeItems.indexOf(t[0]), c.$activeItems.splice(r, 1), t.removeClass('active')) : c.$activeItems.push(t.addClass('active')[0]) : (e(c.$activeItems).removeClass('active'), c.$activeItems = [
                            t.addClass('active')[0]
                        ]);
                        c.hideInput(),
                        this.isFocused || c.focus()
                    }
                },
                setActiveOption: function(t, n, i) {
                    var o,
                        r,
                        s,
                        a,
                        l,
                        u = this;
                    u.$activeOption && u.$activeOption.removeClass('active'),
                        u.$activeOption = null,
                        t = e(t),
                    t.length && (u.$activeOption = t.addClass('active'), (n || !b(n)) && (o = u.$dropdown_content.height(), r = u.$activeOption.outerHeight(!0), n = u.$dropdown_content.scrollTop() || 0, s = u.$activeOption.offset().top - u.$dropdown_content.offset().top + n, a = s, l = s - o + r, s + r > o + n ? u.$dropdown_content.stop().animate({
                        scrollTop: l
                    }, i ? u.settings.scrollDuration : 0) : n > s && u.$dropdown_content.stop().animate({
                        scrollTop: a
                    }, i ? u.settings.scrollDuration : 0)))
                },
                selectAll: function() {
                    var e = this;
                    'single' !== e.settings.mode && (e.$activeItems = Array.prototype.slice.apply(e.$control.children(':not(input)').addClass('active')), e.$activeItems.length && (e.hideInput(), e.close()), e.focus())
                },
                hideInput: function() {
                    var e = this;
                    e.setTextboxValue(''),
                        e.$control_input.css({
                            opacity: 0,
                            position: 'absolute',
                            left: e.rtl ? 10000 : -10000
                        }),
                        e.isInputHidden = !0
                },
                showInput: function() {
                    this.$control_input.css({
                        opacity: 1,
                        position: 'relative',
                        left: 0
                    }),
                        this.isInputHidden = !1
                },
                focus: function() {
                    var e = this;
                    e.isDisabled || (e.ignoreFocus = !0, e.$control_input[0].focus(), window.setTimeout(function() {
                        e.ignoreFocus = !1,
                            e.onFocus()
                    }, 0))
                },
                blur: function() {
                    this.$control_input.trigger('blur')
                },
                getScoreFunction: function(e) {
                    return this.sifter.getScoreFunction(e, this.getSearchOptions())
                },
                getSearchOptions: function() {
                    var e = this.settings,
                        t = e.sortField;
                    return 'string' == typeof t && (t = {
                        field: t
                    }), {
                        fields: e.searchField,
                        conjunction: e.searchConjunction,
                        sort: t
                    }
                },
                search: function(t) {
                    var n,
                        i,
                        o,
                        r = this,
                        s = r.settings,
                        a = this.getSearchOptions();
                    if (s.score && (o = r.settings.score.apply(this, [
                            t
                        ]), 'function' != typeof o)) throw new Error('Selectize "score" setting must be a function that returns a function');
                    if (t !== r.lastQuery ? (r.lastQuery = t, i = r.sifter.search(t, e.extend(a, {
                            score: o
                        })), r.currentResults = i) : i = e.extend(!0, {}, r.currentResults), s.hideSelected)
                        for (n = i.items.length - 1; n >= 0; n--) - 1 !== r.items.indexOf(x(i.items[n].id)) && i.items.splice(n, 1);
                    return i
                },
                refreshOptions: function(t) {
                    var n,
                        o,
                        r,
                        s,
                        a,
                        l,
                        u,
                        p,
                        c,
                        d,
                        h,
                        g,
                        f,
                        v,
                        m,
                        y;
                    'undefined' == typeof t && (t = !0);
                    var w = this,
                        $ = w.$control_input.val(),
                        O = w.search($),
                        C = w.$dropdown_content,
                        b = w.$activeOption && x(w.$activeOption.attr('data-value'));
                    if (s = O.items.length, 'number' == typeof w.settings.maxOptions && (s = Math.min(s, w.settings.maxOptions)), a = {}, w.settings.optgroupOrder)
                        for (l = w.settings.optgroupOrder, n = 0; n < l.length; n++) a[l[n]] = [];
                    else l = [];
                    for (n = 0; s > n; n++)
                        for (u = w.options[O.items[n].id], p = w.render('option', u), c = u[w.settings.optgroupField] || '', d = e.isArray(c) ? c : [
                            c
                        ], o = 0, r = d && d.length; r > o; o++) c = d[o],
                        w.optgroups.hasOwnProperty(c) || (c = ''),
                        a.hasOwnProperty(c) || (a[c] = [], l.push(c)),
                            a[c].push(p);
                    for (h = [], n = 0, s = l.length; s > n; n++) c = l[n],
                        w.optgroups.hasOwnProperty(c) && a[c].length ? (g = w.render('optgroup_header', w.optgroups[c]) || '', g += a[c].join(''), h.push(w.render('optgroup', e.extend({}, w.optgroups[c], {
                            html: g
                        })))) : h.push(a[c].join(''));
                    if (C.html(h.join('')), w.settings.highlight && O.query.length && O.tokens.length)
                        for (n = 0, s = O.tokens.length; s > n; n++) i(C, O.tokens[n].regex);
                    if (!w.settings.hideSelected)
                        for (n = 0, s = w.items.length; s > n; n++) w.getOption(w.items[n]).addClass('selected');
                    f = w.settings.create && O.query.length,
                    f && (C.prepend(w.render('option_create', {
                        input: $
                    })), y = e(C[0].childNodes[0])),
                        w.hasOptions = O.items.length > 0 || f,
                        w.hasOptions ? (O.items.length > 0 ? (m = b && w.getOption(b), m && m.length ? v = m : 'single' === w.settings.mode && w.items.length && (v = w.getOption(w.items[0])), v && v.length || (v = y && !w.settings.addPrecedence ? w.getAdjacentOption(y, 1) : C.find('[data-selectable]:first'))) : v = y, w.setActiveOption(v), t && !w.isOpen && w.open()) : (w.setActiveOption(null), t && w.isOpen && w.close())
                },
                addOption: function(t) {
                    var n,
                        i,
                        o,
                        r = this;
                    if (e.isArray(t))
                        for (n = 0, i = t.length; i > n; n++) r.addOption(t[n]);
                    else o = x(t[r.settings.valueField]),
                    o && !r.options.hasOwnProperty(o) && (r.userOptions[o] = !0, r.options[o] = t, r.lastQuery = null, r.trigger('option_add', o, t))
                },
                addOptionGroup: function(e, t) {
                    this.optgroups[e] = t,
                        this.trigger('optgroup_add', e, t)
                },
                updateOption: function(t, n) {
                    var i,
                        o,
                        r,
                        s,
                        a,
                        l,
                        u = this;
                    if (t = x(t), r = x(n[u.settings.valueField]), u.options.hasOwnProperty(t)) {
                        if (!r) throw new Error('Value must be set in option data');
                        r !== t && (delete u.options[t], s = u.items.indexOf(t), -1 !== s && u.items.splice(s, 1, r)),
                            u.options[r] = n,
                            a = u.renderCache.item,
                            l = u.renderCache.option,
                        b(a) && (delete a[t], delete a[r]),
                        b(l) && (delete l[t], delete l[r]), -1 !== u.items.indexOf(r) && (i = u.getItem(t), o = e(u.render('item', n)), i.hasClass('active') && o.addClass('active'), i.replaceWith(o)),
                        u.isOpen && u.refreshOptions(!1)
                    }
                },
                removeOption: function(e) {
                    var t = this;
                    e = x(e),
                        delete t.userOptions[e],
                        delete t.options[e],
                        t.lastQuery = null,
                        t.trigger('option_remove', e),
                        t.removeItem(e)
                },
                clearOptions: function() {
                    var e = this;
                    e.loadedSearches = {},
                        e.userOptions = {},
                        e.options = e.sifter.items = {},
                        e.lastQuery = null,
                        e.trigger('option_clear'),
                        e.clear()
                },
                getOption: function(e) {
                    return this.getElementWithValue(e, this.$dropdown_content.find('[data-selectable]'))
                },
                getAdjacentOption: function(t, n) {
                    var i = this.$dropdown.find('[data-selectable]'),
                        o = i.index(t) + n;
                    return o >= 0 && o < i.length ? i.eq(o) : e()
                },
                getElementWithValue: function(t, n) {
                    if (t = x(t))
                        for (var i = 0, o = n.length; o > i; i++)
                            if (n[i].getAttribute('data-value') === t) return e(n[i]);
                    return e()
                },
                getItem: function(e) {
                    return this.getElementWithValue(e, this.$control.children())
                },
                addItems: function(t) {
                    for (var n = e.isArray(t) ? t : [
                        t
                    ], i = 0, o = n.length; o > i; i++) this.isPending = o - 1 > i,
                        this.addItem(n[i])
                },
                addItem: function(t) {
                    A(this, [
                        'change'
                    ], function() {
                        var n,
                            i,
                            o,
                            r,
                            s = this,
                            a = s.settings.mode;
                        return t = x(t), -1 !== s.items.indexOf(t) ? void('single' === a && s.close()) : void(s.options.hasOwnProperty(t) && ('single' === a && s.clear(), 'multi' === a && s.isFull() || (n = e(s.render('item', s.options[t])), s.items.splice(s.caretPos, 0, t), s.insertAtCaret(n), s.refreshState(), s.isSetup && (o = s.$dropdown_content.find('[data-selectable]'), this.isPending || (i = s.getOption(t), r = s.getAdjacentOption(i, 1).attr('data-value'), s.refreshOptions(s.isFocused && 'single' !== a), r && s.setActiveOption(s.getOption(r))), !o.length || null !== s.settings.maxItems && s.items.length >= s.settings.maxItems ? s.close() : s.positionDropdown(), s.updatePlaceholder(), s.trigger('item_add', t, n), s.updateOriginalInput()))))
                    })
                },
                removeItem: function(e) {
                    var t,
                        n,
                        i,
                        o = this;
                    t = 'object' == typeof e ? e : o.getItem(e),
                        e = x(t.attr('data-value')),
                        n = o.items.indexOf(e), -1 !== n && (t.remove(), t.hasClass('active') && (i = o.$activeItems.indexOf(t[0]), o.$activeItems.splice(i, 1)), o.items.splice(n, 1), o.lastQuery = null, !o.settings.persist && o.userOptions.hasOwnProperty(e) && o.removeOption(e), n < o.caretPos && o.setCaret(o.caretPos - 1), o.refreshState(), o.updatePlaceholder(), o.updateOriginalInput(), o.positionDropdown(), o.trigger('item_remove', e))
                },
                createItem: function(t) {
                    var n = this,
                        i = e.trim(n.$control_input.val() || ''),
                        o = n.caretPos;
                    if (!i.length) return !1;
                    n.lock(),
                    'undefined' == typeof t && (t = !0);
                    var r = 'function' == typeof n.settings.create ? this.settings.create : function(e) {
                            var t = {};
                            return t[n.settings.labelField] = e,
                                t[n.settings.valueField] = e,
                                t
                        },
                        s = D(function(e) {
                            if (n.unlock(), e && 'object' == typeof e) {
                                var i = x(e[n.settings.valueField]);
                                i && (n.setTextboxValue(''), n.addOption(e), n.setCaret(o), n.addItem(i), n.refreshOptions(t && 'single' !== n.settings.mode))
                            }
                        }),
                        a = r.apply(this, [
                            i,
                            s
                        ]);
                    return 'undefined' != typeof a && s(a), !0
                },
                refreshItems: function() {
                    if (this.lastQuery = null, this.isSetup)
                        for (var e = 0; e < this.items.length; e++) this.addItem(this.items);
                    this.refreshState(),
                        this.updateOriginalInput()
                },
                refreshState: function() {
                    var e = this,
                        t = e.isRequired && !e.items.length;
                    t || (e.isInvalid = !1),
                        e.$control_input.prop('required', t),
                        e.refreshClasses()
                },
                refreshClasses: function() {
                    var t = this,
                        n = t.isFull(),
                        i = t.isLocked;
                    t.$wrapper.toggleClass('rtl', t.rtl),
                        t.$control.toggleClass('focus', t.isFocused).toggleClass('disabled', t.isDisabled).toggleClass('required', t.isRequired).toggleClass('invalid', t.isInvalid).toggleClass('locked', i).toggleClass('full', n).toggleClass('not-full', !n).toggleClass('input-active', t.isFocused && !t.isInputHidden).toggleClass('dropdown-active', t.isOpen).toggleClass('has-options', !e.isEmptyObject(t.options)).toggleClass('has-items', t.items.length > 0),
                        t.$control_input.data('grow', !n && !i)
                },
                isFull: function() {
                    return null !== this.settings.maxItems && this.items.length >= this.settings.maxItems
                },
                updateOriginalInput: function() {
                    var e,
                        t,
                        n,
                        i = this;
                    if ('select' === i.$input[0].tagName.toLowerCase()) {
                        for (n = [], e = 0, t = i.items.length; t > e; e++) n.push('<option value="' + S(i.items[e]) + '" selected="selected"></option>');
                        n.length || this.$input.attr('multiple') || n.push('<option value="" selected="selected"></option>'),
                            i.$input.html(n.join(''))
                    } else i.$input.val(i.getValue());
                    i.isSetup && i.trigger('change', i.$input.val())
                },
                updatePlaceholder: function() {
                    if (this.settings.placeholder) {
                        var e = this.$control_input;
                        this.items.length ? e.removeAttr('placeholder') : e.attr('placeholder', this.settings.placeholder),
                            e.triggerHandler('update')
                    }
                },
                open: function() {
                    var e = this;
                    e.isLocked || e.isOpen || 'multi' === e.settings.mode && e.isFull() || (e.focus(), e.isOpen = !0, e.refreshState(), e.$dropdown.css({
                        visibility: 'hidden',
                        display: 'block'
                    }), e.positionDropdown(), e.$dropdown.css({
                        visibility: 'visible'
                    }), e.trigger('dropdown_open', e.$dropdown))
                },
                close: function() {
                    var e = this,
                        t = e.isOpen;
                    'single' === e.settings.mode && e.items.length && e.hideInput(),
                        e.isOpen = !1,
                        e.$dropdown.hide(),
                        e.setActiveOption(null),
                        e.refreshState(),
                    t && e.trigger('dropdown_close', e.$dropdown)
                },
                positionDropdown: function() {
                    var e = this.$control,
                        t = 'body' === this.settings.dropdownParent ? e.offset() : e.position();
                    t.top += e.outerHeight(!0),
                        this.$dropdown.css({
                            width: e.outerWidth(),
                            top: t.top,
                            left: t.left
                        })
                },
                clear: function() {
                    var e = this;
                    e.items.length && (e.$control.children(':not(input)').remove(), e.items = [], e.setCaret(0), e.updatePlaceholder(), e.updateOriginalInput(), e.refreshState(), e.showInput(), e.trigger('clear'))
                },
                insertAtCaret: function(t) {
                    var n = Math.min(this.caretPos, this.items.length);
                    0 === n ? this.$control.prepend(t) : e(this.$control[0].childNodes[n]).before(t),
                        this.setCaret(n + 1)
                },
                deleteSelection: function(t) {
                    var n,
                        i,
                        o,
                        r,
                        s,
                        a,
                        l,
                        u,
                        p,
                        c = this;
                    if (o = t && t.keyCode === f ? -1 : 1, r = z(c.$control_input[0]), c.$activeOption && !c.settings.hideSelected && (l = c.getAdjacentOption(c.$activeOption, -1).attr('data-value')), s = [], c.$activeItems.length) {
                        for (p = c.$control.children('.active:' + (o > 0 ? 'last' : 'first')), a = c.$control.children(':not(input)').index(p), o > 0 && a++, n = 0, i = c.$activeItems.length; i > n; n++) s.push(e(c.$activeItems[n]).attr('data-value'));
                        t && (t.preventDefault(), t.stopPropagation())
                    } else(c.isFocused || 'single' === c.settings.mode) && c.items.length && (0 > o && 0 === r.start && 0 === r.length ? s.push(c.items[c.caretPos - 1]) : o > 0 && r.start === c.$control_input.val().length && s.push(c.items[c.caretPos]));
                    if (!s.length || 'function' == typeof c.settings.onDelete && c.settings.onDelete.apply(c, [
                            s
                        ]) === !1) return !1;
                    for ('undefined' != typeof a && c.setCaret(a); s.length;) c.removeItem(s.pop());
                    return c.showInput(),
                        c.positionDropdown(),
                        c.refreshOptions(!0),
                    l && (u = c.getOption(l), u.length && c.setActiveOption(u)), !0
                },
                advanceSelection: function(e, t) {
                    var n,
                        i,
                        o,
                        r,
                        s,
                        a,
                        l = this;
                    0 !== e && (l.rtl && (e *= -1), n = e > 0 ? 'last' : 'first', i = z(l.$control_input[0]), l.isFocused && !l.isInputHidden ? (r = l.$control_input.val().length, s = 0 > e ? 0 === i.start && 0 === i.length : i.start === r, s && !r && l.advanceCaret(e, t)) : (a = l.$control.children('.active:' + n), a.length && (o = l.$control.children(':not(input)').index(a), l.setActiveItem(null), l.setCaret(e > 0 ? o + 1 : o))))
                },
                advanceCaret: function(e, t) {
                    var n,
                        i,
                        o = this;
                    0 !== e && (n = e > 0 ? 'next' : 'prev', o.isShiftDown ? (i = o.$control_input[n](), i.length && (o.hideInput(), o.setActiveItem(i), t && t.preventDefault())) : o.setCaret(o.caretPos + e))
                },
                setCaret: function(t) {
                    var n = this;
                    t = 'single' === n.settings.mode ? n.items.length : Math.max(0, Math.min(n.items.length, t));
                    var i,
                        o,
                        r,
                        s;
                    for (r = n.$control.children(':not(input)'), i = 0, o = r.length; o > i; i++) s = e(r[i]).detach(),
                        t > i ? n.$control_input.before(s) : n.$control.append(s);
                    n.caretPos = t
                },
                lock: function() {
                    this.close(),
                        this.isLocked = !0,
                        this.refreshState()
                },
                unlock: function() {
                    this.isLocked = !1,
                        this.refreshState()
                },
                disable: function() {
                    var e = this;
                    e.$input.prop('disabled', !0),
                        e.isDisabled = !0,
                        e.lock()
                },
                enable: function() {
                    var e = this;
                    e.$input.prop('disabled', !1),
                        e.isDisabled = !1,
                        e.unlock()
                },
                destroy: function() {
                    var t = this,
                        n = t.eventNS,
                        i = t.revertSettings;
                    t.trigger('destroy'),
                        t.off(),
                        t.$wrapper.remove(),
                        t.$dropdown.remove(),
                        t.$input.html('').append(i.$children).removeAttr('tabindex').attr({
                            tabindex: i.tabindex
                        }).show(),
                        e(window).off(n),
                        e(document).off(n),
                        e(document.body).off(n),
                        delete t.$input[0].selectize
                },
                render: function(e, t) {
                    var n,
                        i,
                        o = '',
                        r = !1,
                        s = this,
                        a = /^[\t ]*<([a-z][a-z0-9\-_]*(?:\:[a-z][a-z0-9\-_]*)?)/i;
                    return ('option' === e || 'item' === e) && (n = x(t[s.settings.valueField]), r = !!n),
                        r && (b(s.renderCache[e]) || (s.renderCache[e] = {}), s.renderCache[e].hasOwnProperty(n)) ? s.renderCache[e][n] : (o = s.settings.render[e].apply(this, [
                            t,
                            S
                        ]), ('option' === e || 'option_create' === e) && (o = o.replace(a, '<$1 data-selectable')), 'optgroup' === e && (i = t[s.settings.optgroupValueField] || '', o = o.replace(a, '<$1 data-group="' + I(S(i)) + '"')), ('option' === e || 'item' === e) && (o = o.replace(a, '<$1 data-value="' + I(S(n || '')) + '"')), r && (s.renderCache[e][n] = o), o)
                }
            }), N.count = 0, N.defaults = {
            plugins: [],
            delimiter: ',',
            persist: !0,
            diacritics: !0,
            create: !1,
            createOnBlur: !1,
            highlight: !0,
            openOnFocus: !0,
            maxOptions: 1000,
            maxItems: null,
            hideSelected: null,
            addPrecedence: !1,
            preload: !1,
            scrollDuration: 60,
            loadThrottle: 300,
            dataAttr: 'data-data',
            optgroupField: 'optgroup',
            valueField: 'value',
            labelField: 'text',
            optgroupLabelField: 'label',
            optgroupValueField: 'value',
            optgroupOrder: null,
            sortField: '$order',
            searchField: [
                'text'
            ],
            searchConjunction: 'and',
            mode: null,
            wrapperClass: 'selectize-control',
            inputClass: 'selectize-input',
            dropdownClass: 'selectize-dropdown',
            dropdownContentClass: 'selectize-dropdown-content',
            dropdownParent: null,
            render: {}
        }, e.fn.selectize = function(t) {
            var n = e.fn.selectize.defaults,
                i = e.extend({}, n, t),
                o = i.dataAttr,
                r = i.labelField,
                s = i.valueField,
                a = i.optgroupField,
                l = i.optgroupLabelField,
                u = i.optgroupValueField,
                p = function(t, n) {
                    var o,
                        a,
                        l,
                        u,
                        p = e.trim(t.val() || '');
                    if (p.length) {
                        for (l = p.split(i.delimiter), o = 0, a = l.length; a > o; o++) u = {},
                            u[r] = l[o],
                            u[s] = l[o],
                            n.options[l[o]] = u;
                        n.items = l
                    }
                },
                c = function(t, n) {
                    var i,
                        p,
                        c,
                        d,
                        h = 0,
                        g = n.options,
                        f = function(e) {
                            var t = o && e.attr(o);
                            return 'string' == typeof t && t.length ? JSON.parse(t) : null
                        },
                        v = function(t, i) {
                            var o,
                                l;
                            if (t = e(t), o = t.attr('value') || '', o.length) {
                                if (g.hasOwnProperty(o)) return void(i && (g[o].optgroup ? e.isArray(g[o].optgroup) ? g[o].optgroup.push(i) : g[o].optgroup = [
                                    g[o].optgroup,
                                    i
                                ] : g[o].optgroup = i));
                                l = f(t) || {},
                                    l[r] = l[r] || t.text(),
                                    l[s] = l[s] || o,
                                    l[a] = l[a] || i,
                                    l.$order = ++h,
                                    g[o] = l,
                                t.is(':selected') && n.items.push(o)
                            }
                        },
                        m = function(t) {
                            var i,
                                o,
                                r,
                                s,
                                a;
                            for (t = e(t), r = t.attr('label'), r && (s = f(t) || {}, s[l] = r, s[u] = r, n.optgroups[r] = s), a = e('option', t), i = 0, o = a.length; o > i; i++) v(a[i], r)
                        };
                    for (n.maxItems = t.attr('multiple') ? null : 1, d = t.children(), i = 0, p = d.length; p > i; i++) c = d[i].tagName.toLowerCase(),
                        'optgroup' === c ? m(d[i]) : 'option' === c && v(d[i])
                };
            return this.each(function() {
                if (!this.selectize) {
                    var i,
                        o = e(this),
                        r = this.tagName.toLowerCase(),
                        s = {
                            placeholder: o.children('option[value=""]').text() || o.attr('placeholder'),
                            options: {},
                            optgroups: {},
                            items: []
                        };
                    'select' === r ? c(o, s) : p(o, s),
                        i = new N(o, e.extend(!0, {}, n, s, t)),
                        o.data('selectize', i),
                        o.addClass('selectized')
                }
            })
        }, e.fn.selectize.defaults = N.defaults, N.define('drag_drop', function() {
            if (!e.fn.sortable) throw new Error('The "drag_drop" plugin requires jQuery UI "sortable".');
            if ('multi' === this.settings.mode) {
                var t = this;
                t.lock = function() {
                    var e = t.lock;
                    return function() {
                        var n = t.$control.data('sortable');
                        return n && n.disable(),
                            e.apply(t, arguments)
                    }
                }(),
                    t.unlock = function() {
                        var e = t.unlock;
                        return function() {
                            var n = t.$control.data('sortable');
                            return n && n.enable(),
                                e.apply(t, arguments)
                        }
                    }(),
                    t.setup = function() {
                        var n = t.setup;
                        return function() {
                            n.apply(this, arguments);
                            var i = t.$control.sortable({
                                items: '[data-value]',
                                forcePlaceholderSize: !0,
                                disabled: t.isLocked,
                                start: function(e, t) {
                                    t.placeholder.css('width', t.helper.css('width')),
                                        i.css({
                                            overflow: 'visible'
                                        })
                                },
                                stop: function() {
                                    i.css({
                                        overflow: 'hidden'
                                    });
                                    var n = t.$activeItems ? t.$activeItems.slice() : null,
                                        o = [];
                                    i.children('[data-value]').each(function() {
                                        o.push(e(this).attr('data-value'))
                                    }),
                                        t.setValue(o),
                                        t.setActiveItem(n)
                                }
                            })
                        }
                    }()
            }
        }), N.define('dropdown_header', function(t) {
            var n = this;
            t = e.extend({
                title: 'Untitled',
                headerClass: 'selectize-dropdown-header',
                titleRowClass: 'selectize-dropdown-header-title',
                labelClass: 'selectize-dropdown-header-label',
                closeClass: 'selectize-dropdown-header-close',
                html: function(e) {
                    return '<div class="' + e.headerClass + '"><div class="' + e.titleRowClass + '"><span class="' + e.labelClass + '">' + e.title + '</span><a href="javascript:void(0)" class="' + e.closeClass + '">&times;</a></div></div>'
                }
            }, t),
                n.setup = function() {
                    var i = n.setup;
                    return function() {
                        i.apply(n, arguments),
                            n.$dropdown_header = e(t.html(t)),
                            n.$dropdown.prepend(n.$dropdown_header)
                    }
                }()
        }), N.define('optgroup_columns', function(t) {
            var n = this;
            t = e.extend({
                equalizeWidth: !0,
                equalizeHeight: !0
            }, t),
                this.getAdjacentOption = function(t, n) {
                    var i = t.closest('[data-group]').find('[data-selectable]'),
                        o = i.index(t) + n;
                    return o >= 0 && o < i.length ? i.eq(o) : e()
                },
                this.onKeyDown = function() {
                    var e = n.onKeyDown;
                    return function(t) {
                        var i,
                            o,
                            r,
                            s;
                        return !this.isOpen || t.keyCode !== u && t.keyCode !== d ? e.apply(this, arguments) : (n.ignoreHover = !0, s = this.$activeOption.closest('[data-group]'), i = s.find('[data-selectable]').index(this.$activeOption), s = t.keyCode === u ? s.prev('[data-group]') : s.next('[data-group]'), r = s.find('[data-selectable]'), o = r.eq(Math.min(r.length - 1, i)), void(o.length && this.setActiveOption(o)))
                    }
                }();
            var i = function() {
                var i,
                    o,
                    r,
                    s,
                    a,
                    l,
                    u;
                if (u = e('[data-group]', n.$dropdown_content), o = u.length, o && n.$dropdown_content.width()) {
                    if (t.equalizeHeight) {
                        for (r = 0, i = 0; o > i; i++) r = Math.max(r, u.eq(i).height());
                        u.css({
                            height: r
                        })
                    }
                    t.equalizeWidth && (l = n.$dropdown_content.innerWidth(), s = Math.round(l / o), u.css({
                        width: s
                    }), o > 1 && (a = l - s * (o - 1), u.eq(o - 1).css({
                        width: a
                    })))
                }
            };
            (t.equalizeHeight || t.equalizeWidth) && (_.after(this, 'positionDropdown', i), _.after(this, 'refreshOptions', i))
        }), N.define('remove_button', function(t) {
            if ('single' !== this.settings.mode) {
                t = e.extend({
                    label: '&times;',
                    title: 'Remove',
                    className: 'remove',
                    append: !0
                }, t);
                var n = this,
                    i = '<a href="javascript:void(0)" class="' + t.className + '" tabindex="-1" title="' + S(t.title) + '">' + t.label + '</a>',
                    o = function(e, t) {
                        var n = e.search(/(<\/[^>]+>\s*)$/);
                        return e.substring(0, n) + t + e.substring(n)
                    };
                this.setup = function() {
                    var r = n.setup;
                    return function() {
                        if (t.append) {
                            var s = n.settings.render.item;
                            n.settings.render.item = function() {
                                return o(s.apply(this, arguments), i)
                            }
                        }
                        r.apply(this, arguments),
                            this.$control.on('click', '.' + t.className, function(t) {
                                if (t.preventDefault(), !n.isLocked) {
                                    var i = e(t.currentTarget).parent();
                                    n.setActiveItem(i),
                                    n.deleteSelection() && n.setCaret(n.items.length)
                                }
                            })
                    }
                }()
            }
        }), N.define('restore_on_backspace', function(e) {
            var t = this;
            e.text = e.text || function(e) {
                return e[this.settings.labelField]
            },
                this.onKeyDown = function() {
                    var n = t.onKeyDown;
                    return function(t) {
                        var i,
                            o;
                        return t.keyCode === f && '' === this.$control_input.val() && !this.$activeItems.length && (i = this.caretPos - 1, i >= 0 && i < this.items.length) ? (o = this.options[this.items[i]], this.deleteSelection(t) && (this.setTextboxValue(e.text.apply(this, [
                            o
                        ])), this.refreshOptions(!0)), void t.preventDefault()) : n.apply(this, arguments)
                    }
                }()
        }), N
    });
! function() {
    ! function(t, e) {
        'object' == typeof exports && exports ? module.exports = e : 'function' == typeof define && define.amd ? define(e) : t.Mustache = e
    }(this, function() {
        function t(t, e) {
            return RegExp.prototype.test.call(t, e)
        }

        function e(e) {
            return !t(d, e)
        }

        function n(t) {
            return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&')
        }

        function r(t) {
            return String(t).replace(/[&<>"'\/]/g, function(t) {
                return w[t]
            })
        }

        function i(t) {
            this.string = t,
                this.tail = t,
                this.pos = 0
        }

        function o(t, e) {
            this.view = t,
                this.parent = e,
                this.clearCache()
        }

        function a() {
            this.clearCache()
        }

        function s(t) {
            function e(t, e, r) {
                if (!n[t]) {
                    var i = s(e);
                    n[t] = function(t, e) {
                        return i(t, e, r)
                    }
                }
                return n[t]
            }
            var n = {};
            return function(n, r, i) {
                for (var o, a, s = '', c = 0, l = t.length; l > c; ++c) switch (o = t[c], o[0]) {
                    case '#':
                        a = i.slice(o[3], o[5]),
                            s += n._section(o[1], r, a, e(c, o[4], i));
                        break;
                    case '^':
                        s += n._inverted(o[1], r, e(c, o[4], i));
                        break;
                    case '>':
                        s += n._partial(o[1], r);
                        break;
                    case '&':
                        s += n._name(o[1], r);
                        break;
                    case 'name':
                        s += n._escaped(o[1], r);
                        break;
                    case 'text':
                        s += o[1]
                }
                return s
            }
        }

        function c(t) {
            for (var e, n = [], r = n, i = [], o = 0, a = t.length; a > o; ++o) switch (e = t[o], e[0]) {
                case '#':
                case '^':
                    i.push(e),
                        r.push(e),
                        r = e[4] = [];
                    break;
                case '/':
                    var s = i.pop();
                    s[5] = e[2],
                        r = i.length > 0 ? i[i.length - 1][4] : n;
                    break;
                default:
                    r.push(e)
            }
            return n
        }

        function l(t) {
            for (var e, n, r = [], i = 0, o = t.length; o > i; ++i) e = t[i],
                'text' === e[0] && n && 'text' === n[0] ? (n[1] += e[1], n[3] = e[3]) : (n = e, r.push(e));
            return r
        }

        function p(t) {
            return [new RegExp(n(t[0]) + '\\s*'),
                new RegExp('\\s*' + n(t[1]))
            ]
        }
        var u = {};
        u.name = 'mustache.js',
            u.version = '0.7.2',
            u.tags = [
                '{{',
                '}}'
            ],
            u.Scanner = i,
            u.Context = o,
            u.Writer = a;
        var f = /\s*/,
            h = /\s+/,
            d = /\S/,
            m = /\s*=/,
            v = /\s*\}/,
            g = /#|\^|\/|>|\{|&|=|!/,
            y = Array.isArray || function(t) {
                    return '[object Array]' === Object.prototype.toString.call(t)
                },
            w = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                '\'': '&#39;',
                '/': '&#x2F;'
            };
        u.escape = r,
            i.prototype.eos = function() {
                return '' === this.tail
            },
            i.prototype.scan = function(t) {
                var e = this.tail.match(t);
                return e && 0 === e.index ? (this.tail = this.tail.substring(e[0].length), this.pos += e[0].length, e[0]) : ''
            },
            i.prototype.scanUntil = function(t) {
                var e,
                    n = this.tail.search(t);
                switch (n) {
                    case -1:
                        e = this.tail,
                            this.pos += this.tail.length,
                            this.tail = '';
                        break;
                    case 0:
                        e = '';
                        break;
                    default:
                        e = this.tail.substring(0, n),
                            this.tail = this.tail.substring(n),
                            this.pos += n
                }
                return e
            },
            o.make = function(t) {
                return t instanceof o ? t : new o(t)
            },
            o.prototype.clearCache = function() {
                this._cache = {}
            },
            o.prototype.push = function(t) {
                return new o(t, this)
            },
            o.prototype.lookup = function(t) {
                var e = this._cache[t];
                if (!e) {
                    if ('.' === t) e = this.view;
                    else
                        for (var n = this; n;) {
                            if (t.indexOf('.') > 0) {
                                var r = t.split('.'),
                                    i = 0;
                                for (e = n.view; e && i < r.length;) e = e[r[i++]]
                            } else e = n.view[t];
                            if (null != e) break;
                            n = n.parent
                        }
                    this._cache[t] = e
                }
                return 'function' == typeof e && (e = e.call(this.view)),
                    e
            },
            a.prototype.clearCache = function() {
                this._cache = {},
                    this._partialCache = {}
            },
            a.prototype.compile = function(t, e) {
                var n = this._cache[t];
                if (!n) {
                    var r = u.parse(t, e);
                    n = this._cache[t] = this.compileTokens(r, t)
                }
                return n
            },
            a.prototype.compilePartial = function(t, e, n) {
                var r = this.compile(e, n);
                return this._partialCache[t] = r,
                    r
            },
            a.prototype.compileTokens = function(t, e) {
                var n = s(t),
                    r = this;
                return function(t, i) {
                    if (i)
                        if ('function' == typeof i) r._loadPartial = i;
                        else
                            for (var a in i) r.compilePartial(a, i[a]);
                    return n(r, o.make(t), e)
                }
            },
            a.prototype.render = function(t, e, n) {
                return this.compile(t)(e, n)
            },
            a.prototype._section = function(t, e, n, r) {
                var i = e.lookup(t);
                switch (typeof i) {
                    case 'object':
                        if (y(i)) {
                            for (var o = '', a = 0, s = i.length; s > a; ++a) o += r(this, e.push(i[a]));
                            return o
                        }
                        return i ? r(this, e.push(i)) : '';
                    case 'function':
                        var c = this,
                            l = function(t) {
                                return c.render(t, e)
                            },
                            p = i.call(e.view, n, l);
                        return null != p ? p : '';
                    default:
                        if (i) return r(this, e)
                }
                return ''
            },
            a.prototype._inverted = function(t, e, n) {
                var r = e.lookup(t);
                return !r || y(r) && 0 === r.length ? n(this, e) : ''
            },
            a.prototype._partial = function(t, e) {
                t in this._partialCache || !this._loadPartial || this.compilePartial(t, this._loadPartial(t));
                var n = this._partialCache[t];
                return n ? n(e) : ''
            },
            a.prototype._name = function(t, e) {
                var n = e.lookup(t);
                return 'function' == typeof n && (n = n.call(e.view)),
                    null == n ? '' : String(n)
            },
            a.prototype._escaped = function(t, e) {
                return u.escape(this._name(t, e))
            },
            u.parse = function(t, r) {
                function o() {
                    if (T && !C)
                        for (; k.length;) b.splice(k.pop(), 1);
                    else k = [];
                    T = !1,
                        C = !1
                }
                if (t = t || '', r = r || u.tags, 'string' == typeof r && (r = r.split(h)), 2 !== r.length) throw new Error('Invalid tags: ' + r.join(', '));
                for (var a, s, d, y, w = p(r), _ = new i(t), x = [], b = [], k = [], T = !1, C = !1; !_.eos();) {
                    if (a = _.pos, d = _.scanUntil(w[0]))
                        for (var E = 0, U = d.length; U > E; ++E) y = d.charAt(E),
                            e(y) ? k.push(b.length) : C = !0,
                            b.push(['text',
                                y,
                                a,
                                a + 1
                            ]),
                            a += 1,
                        '\n' === y && o();
                    if (a = _.pos, !_.scan(w[0])) break;
                    if (T = !0, s = _.scan(g) || 'name', _.scan(f), '=' === s) d = _.scanUntil(m),
                        _.scan(m),
                        _.scanUntil(w[1]);
                    else if ('{' === s) {
                        var j = new RegExp('\\s*' + n('}' + r[1]));
                        d = _.scanUntil(j),
                            _.scan(v),
                            _.scanUntil(w[1]),
                            s = '&'
                    } else d = _.scanUntil(w[1]);
                    if (!_.scan(w[1])) throw new Error('Unclosed tag at ' + _.pos);
                    if ('/' === s) {
                        //x = [["#", "path", 14, 23]]
                        if (0 === x.length) throw new Error('Unopened section "' + d + '" at ' + a);
                        var P = x.pop();
                        if (P[1] !== d) throw new Error('Unclosed section "' + P[1] + '" at ' + a)
                    }
                    var $ = [
                        s,
                        d,
                        a,
                        _.pos
                    ];
                    if (b.push($), '#' === s || '^' === s) x.push($);
                    else if ('name' === s || '{' === s || '&' === s) C = !0;
                    else if ('=' === s) {
                        if (r = d.split(h), 2 !== r.length) throw new Error('Invalid tags at ' + a + ': ' + r.join(', '));
                        w = p(r)
                    }
                }
                var P = x.pop();
                if (P) throw new Error('Unclosed section "' + P[1] + '" at ' + _.pos);
                return c(l(b))
            };
        var _ = new a;
        return u.clearCache = function() {
            return _.clearCache()
        },
            u.compile = function(t, e) {
                return _.compile(t, e)
            },
            u.compilePartial = function(t, e, n) {
                return _.compilePartial(t, e, n)
            },
            u.compileTokens = function(t, e) {
                return _.compileTokens(t, e)
            },
            u.render = function(t, e, n) {
                return _.render(t, e, n)
            },
            u.to_html = function(t, e, n, r) {
                var i = u.render(t, e, n);
                return 'function' != typeof r ? i : void r(i)
            },
            u
    }()),
        function() {
            function t(t) {
                return ''.trim ? t.trim() : t.replace(/^\s+/, '').replace(/\s+$/, '')
            }
            var e = this,
                n = {
                    VERSION: '0.10.2',
                    templates: {},
                    $: 'undefined' != typeof window ? window.jQuery || window.Zepto || null : null,
                    addTemplate: function(e, r) {
                        if ('object' != typeof e) n[e] ? console.error('Invalid name: ' + e + '.') : n.templates[e] ? console.error('Template "' + e + '  " exists') : (n.templates[e] = r, n[e] = function(r, i) {
                            r = r || {};
                            var o = Mustache.to_html(n.templates[e], r, n.templates);
                            return n.$ && !i ? n.$(t(o)) : o
                        });
                        else
                            for (var i in e) this.addTemplate(i, e[i])
                    },
                    clearAll: function() {
                        for (var t in n.templates) delete n[t];
                        n.templates = {}
                    },
                    refresh: function() {
                        n.clearAll(),
                            n.grabTemplates()
                    },
                    grabTemplates: function() {
                        var e,
                            r,
                            i,
                            o = document.getElementsByTagName('script'),
                            a = [];
                        for (e = 0, r = o.length; r > e; e++) i = o[e],
                        i && i.innerHTML && i.id && ('text/html' === i.type || 'text/x-icanhaz' === i.type) && (n.addTemplate(i.id, t(i.innerHTML)), a.unshift(i));
                        for (e = 0, r = a.length; r > e; e++) a[e].parentNode.removeChild(a[e])
                    }
                };
            'undefined' != typeof exports ? ('undefined' != typeof module && module.exports && (exports = module.exports = n), exports.ich = n) : e.ich = n,
            'undefined' != typeof document && (n.$ ? n.$(function() {
                n.grabTemplates()
            }) : document.addEventListener('DOMContentLoaded', function() {
                n.grabTemplates()
            }, !0))
        }()
}();
var fabric = fabric || {
        version: '1.4.12'
    };
'undefined' != typeof exports && (exports.fabric = fabric),
    'undefined' != typeof document && 'undefined' != typeof window ? (fabric.document = document, fabric.window = window) : (fabric.document = require('jsdom').jsdom('<!DOCTYPE html><html><head></head><body></body></html>'), fabric.window = fabric.document.createWindow()),
    fabric.isTouchSupported = 'ontouchstart' in fabric.document.documentElement,
    fabric.isLikelyNode = 'undefined' != typeof Buffer && 'undefined' == typeof window,
    fabric.SHARED_ATTRIBUTES = [
        'display',
        'transform',
        'fill',
        'fill-opacity',
        'fill-rule',
        'opacity',
        'stroke',
        'stroke-dasharray',
        'stroke-linecap',
        'stroke-linejoin',
        'stroke-miterlimit',
        'stroke-opacity',
        'stroke-width'
    ],
    fabric.DPI = 96,
    function() {
        function t(t, e) {
            this.__eventListeners[t] && (e ? fabric.util.removeFromArray(this.__eventListeners[t], e) : this.__eventListeners[t].length = 0)
        }

        function e(t, e) {
            if (this.__eventListeners || (this.__eventListeners = {}), 1 === arguments.length)
                for (var i in t) this.on(i, t[i]);
            else this.__eventListeners[t] || (this.__eventListeners[t] = []),
                this.__eventListeners[t].push(e);
            return this
        }

        function i(e, i) {
            if (this.__eventListeners) {
                if (0 === arguments.length) this.__eventListeners = {};
                else if (1 === arguments.length && 'object' == typeof arguments[0])
                    for (var r in e) t.call(this, r, e[r]);
                else t.call(this, e, i);
                return this
            }
        }

        function r(t, e) {
            if (this.__eventListeners) {
                var i = this.__eventListeners[t];
                if (i) {
                    for (var r = 0, s = i.length; s > r; r++) i[r].call(this, e || {});
                    return this
                }
            }
        }
        fabric.Observable = {
            observe: e,
            stopObserving: i,
            fire: r,
            on: e,
            off: i,
            trigger: r
        }
    }(),
    fabric.Collection = {
        add: function() {
            this._objects.push.apply(this._objects, arguments);
            for (var t = 0, e = arguments.length; e > t; t++) this._onObjectAdded(arguments[t]);
            return this.renderOnAddRemove && this.renderAll(),
                this
        },
        insertAt: function(t, e, i) {
            var r = this.getObjects();
            return i ? r[e] = t : r.splice(e, 0, t),
                this._onObjectAdded(t),
            this.renderOnAddRemove && this.renderAll(),
                this
        },
        remove: function() {
            for (var t, e = this.getObjects(), i = 0, r = arguments.length; r > i; i++) t = e.indexOf(arguments[i]), -1 !== t && (e.splice(t, 1), this._onObjectRemoved(arguments[i]));
            return this.renderOnAddRemove && this.renderAll(),
                this
        },
        forEachObject: function(t, e) {
            for (var i = this.getObjects(), r = i.length; r--;) t.call(e, i[r], r, i);
            return this
        },
        getObjects: function(t) {
            return 'undefined' == typeof t ? this._objects : this._objects.filter(function(e) {
                return e.type === t
            })
        },
        item: function(t) {
            return this.getObjects()[t]
        },
        isEmpty: function() {
            return 0 === this.getObjects().length
        },
        size: function() {
            return this.getObjects().length
        },
        contains: function(t) {
            return this.getObjects().indexOf(t) > -1
        },
        complexity: function() {
            return this.getObjects().reduce(function(t, e) {
                return t += e.complexity ? e.complexity() : 0
            }, 0)
        }
    },
    function(t) {
        var e = Math.sqrt,
            i = Math.atan2,
            r = Math.PI / 180;
        fabric.util = {
            removeFromArray: function(t, e) {
                var i = t.indexOf(e);
                return -1 !== i && t.splice(i, 1),
                    t
            },
            getRandomInt: function(t, e) {
                return Math.floor(Math.random() * (e - t + 1)) + t
            },
            degreesToRadians: function(t) {
                return t * r
            },
            radiansToDegrees: function(t) {
                return t / r
            },
            rotatePoint: function(t, e, i) {
                var r = Math.sin(i),
                    s = Math.cos(i);
                t.subtractEquals(e);
                var n = t.x * s - t.y * r,
                    o = t.x * r + t.y * s;
                return new fabric.Point(n, o).addEquals(e)
            },
            transformPoint: function(t, e, i) {
                return i ? new fabric.Point(e[0] * t.x + e[1] * t.y, e[2] * t.x + e[3] * t.y) : new fabric.Point(e[0] * t.x + e[1] * t.y + e[4], e[2] * t.x + e[3] * t.y + e[5])
            },
            invertTransform: function(t) {
                var e = t.slice(),
                    i = 1 / (t[0] * t[3] - t[1] * t[2]);
                e = [
                    i * t[3], -i * t[1], -i * t[2],
                    i * t[0],
                    0,
                    0
                ];
                var r = fabric.util.transformPoint({
                    x: t[4],
                    y: t[5]
                }, e);
                return e[4] = -r.x,
                    e[5] = -r.y,
                    e
            },
            toFixed: function(t, e) {
                return parseFloat(Number(t).toFixed(e))
            },
            parseUnit: function(t) {
                var e = /\D{0,2}$/.exec(t),
                    i = parseFloat(t);
                switch (e[0]) {
                    case 'mm':
                        return i * fabric.DPI / 25.4;
                    case 'cm':
                        return i * fabric.DPI / 2.54;
                    case 'in':
                        return i * fabric.DPI;
                    case 'pt':
                        return i * fabric.DPI / 72;
                    case 'pc':
                        return i * fabric.DPI / 72 * 12;
                    default:
                        return i
                }
            },
            falseFunction: function() {
                return !1
            },
            getKlass: function(t, e) {
                return t = fabric.util.string.camelize(t.charAt(0).toUpperCase() + t.slice(1)),
                    fabric.util.resolveNamespace(e)[t]
            },
            resolveNamespace: function(e) {
                if (!e) return fabric;
                for (var i = e.split('.'), r = i.length, s = t || fabric.window, n = 0; r > n; ++n) s = s[i[n]];
                return s
            },
            loadImage: function(t, e, i, r) {
                if (!t) return void(e && e.call(i, t));
                var s = fabric.util.createImage();
                s.onload = function() {
                    e && e.call(i, s),
                        s = s.onload = s.onerror = null
                },
                    s.onerror = function() {
                        fabric.log('Error loading ' + s.src),
                        e && e.call(i, null, !0),
                            s = s.onload = s.onerror = null
                    },
                0 !== t.indexOf('data') && 'undefined' != typeof r && (s.crossOrigin = r),
                    s.src = t
            },
            enlivenObjects: function(t, e, i, r) {
                function s() {
                    ++o === a && e && e(n)
                }
                t = t || [];
                var n = [],
                    o = 0,
                    a = t.length;
                return a ? void t.forEach(function(t, e) {
                    if (!t || !t.type) return void s();
                    var o = fabric.util.getKlass(t.type, i);
                    o.async ? o.fromObject(t, function(i, o) {
                        o || (n[e] = i, r && r(t, n[e])),
                            s()
                    }) : (n[e] = o.fromObject(t), r && r(t, n[e]), s())
                }) : void(e && e(n))
            },
            groupSVGElements: function(t, e, i) {
                var r;
                return r = new fabric.PathGroup(t, e),
                'undefined' != typeof i && r.setSourcePath(i),
                    r
            },
            populateWithProperties: function(t, e, i) {
                if (i && '[object Array]' === Object.prototype.toString.call(i))
                    for (var r = 0, s = i.length; s > r; r++) i[r] in t && (e[i[r]] = t[i[r]])
            },
            drawDashedLine: function(t, r, s, n, o, a) {
                var h = n - r,
                    c = o - s,
                    l = e(h * h + c * c),
                    u = i(c, h),
                    f = a.length,
                    g = 0,
                    p = !0;
                for (t.save(), t.translate(r, s), t.moveTo(0, 0), t.rotate(u), r = 0; l > r;) r += a[g++ % f],
                r > l && (r = l),
                    t[p ? 'lineTo' : 'moveTo'](r, 0),
                    p = !p;
                t.restore()
            },
            createCanvasElement: function(t) {
                return t || (t = fabric.document.createElement('canvas')),
                t.getContext || 'undefined' == typeof G_vmlCanvasManager || G_vmlCanvasManager.initElement(t),
                    t
            },
            createImage: function() {
                return fabric.isLikelyNode ? new(require('canvas').Image) : fabric.document.createElement('img')
            },
            createAccessors: function(t) {
                for (var e = t.prototype, i = e.stateProperties.length; i--;) {
                    var r = e.stateProperties[i],
                        s = r.charAt(0).toUpperCase() + r.slice(1),
                        n = 'set' + s,
                        o = 'get' + s;
                    e[o] || (e[o] = function(t) {
                        return new Function('return this.get("' + t + '")')
                    }(r)),
                    e[n] || (e[n] = function(t) {
                        return new Function('value', 'return this.set("' + t + '", value)')
                    }(r))
                }
            },
            clipContext: function(t, e) {
                e.save(),
                    e.beginPath(),
                    t.clipTo(e),
                    e.clip()
            },
            multiplyTransformMatrices: function(t, e) {
                for (var i = [
                    [t[0],
                        t[2],
                        t[4]
                    ],
                    [
                        t[1],
                        t[3],
                        t[5]
                    ],
                    [
                        0,
                        0,
                        1
                    ]
                ], r = [
                    [e[0],
                        e[2],
                        e[4]
                    ],
                    [
                        e[1],
                        e[3],
                        e[5]
                    ],
                    [
                        0,
                        0,
                        1
                    ]
                ], s = [], n = 0; 3 > n; n++) {
                    s[n] = [];
                    for (var o = 0; 3 > o; o++) {
                        for (var a = 0, h = 0; 3 > h; h++) a += i[n][h] * r[h][o];
                        s[n][o] = a
                    }
                }
                return [s[0][0],
                    s[1][0],
                    s[0][1],
                    s[1][1],
                    s[0][2],
                    s[1][2]
                ]
            },
            getFunctionBody: function(t) {
                return (String(t).match(/function[^{]*\{([\s\S]*)\}/) || {})[1]
            },
            isTransparent: function(t, e, i, r) {
                r > 0 && (e > r ? e -= r : e = 0, i > r ? i -= r : i = 0);
                for (var s = !0, n = t.getImageData(e, i, 2 * r || 1, 2 * r || 1), o = 3, a = n.data.length; a > o; o += 4) {
                    var h = n.data[o];
                    if (s = 0 >= h, s === !1) break
                }
                return n = null,
                    s
            }
        }
    }('undefined' != typeof exports ? exports : this),
    function() {
        function t(t, r, n, o, h, c, l) {
            var u = a.call(arguments);
            if (s[u]) return s[u];
            var f = Math.PI,
                g = l * f / 180,
                p = Math.sin(g),
                d = Math.cos(g),
                v = 0,
                b = 0;
            n = Math.abs(n),
                o = Math.abs(o);
            var y = -d * t * 0.5 - p * r * 0.5,
                m = -d * r * 0.5 + p * t * 0.5,
                _ = n * n,
                C = o * o,
                x = m * m,
                w = y * y,
                O = _ * C - _ * x - C * w,
                S = 0;
            if (0 > O) {
                var j = Math.sqrt(1 - O / (_ * C));
                n *= j,
                    o *= j
            } else S = (h === c ? -1 : 1) * Math.sqrt(O / (_ * x + C * w));
            var T = S * n * m / o,
                P = -S * o * y / n,
                k = d * T - p * P + 0.5 * t,
                A = p * T + d * P + 0.5 * r,
                M = i(1, 0, (y - T) / n, (m - P) / o),
                E = i((y - T) / n, (m - P) / o, (-y - T) / n, (-m - P) / o);
            0 === c && E > 0 ? E -= 2 * f : 1 === c && 0 > E && (E += 2 * f);
            for (var D = Math.ceil(Math.abs(E / f * 2)), L = [], X = E / D, Y = 8 / 3 * Math.sin(X / 4) * Math.sin(X / 4) / Math.sin(X / 2), G = M + X, I = 0; D > I; I++) L[I] = e(M, G, d, p, n, o, k, A, Y, v, b),
                v = L[I][4],
                b = L[I][5],
                M = G,
                G += X;
            return s[u] = L,
                L
        }

        function e(t, e, i, r, s, o, h, c, l, u, f) {
            var g = a.call(arguments);
            if (n[g]) return n[g];
            var p = Math.cos(t),
                d = Math.sin(t),
                v = Math.cos(e),
                b = Math.sin(e),
                y = i * s * v - r * o * b + h,
                m = r * s * v + i * o * b + c,
                _ = u + l * (-i * s * d - r * o * p),
                C = f + l * (-r * s * d + i * o * p),
                x = y + l * (i * s * b + r * o * v),
                w = m + l * (r * s * b - i * o * v);
            return n[g] = [
                _,
                C,
                x,
                w,
                y,
                m
            ],
                n[g]
        }

        function i(t, e, i, r) {
            var s = Math.atan2(e, t),
                n = Math.atan2(r, i);
            return n >= s ? n - s : 2 * Math.PI - (s - n)
        }

        function r(t, e, i, r, s, n, h, c) {
            var l = a.call(arguments);
            if (o[l]) return o[l];
            var u,
                f,
                g,
                p,
                d,
                v,
                b,
                y,
                m = Math.sqrt,
                _ = Math.min,
                C = Math.max,
                x = Math.abs,
                w = [],
                O = [
                    [],
                    []
                ];
            f = 6 * t - 12 * i + 6 * s,
                u = -3 * t + 9 * i - 9 * s + 3 * h,
                g = 3 * i - 3 * t;
            for (var S = 0; 2 > S; ++S)
                if (S > 0 && (f = 6 * e - 12 * r + 6 * n, u = -3 * e + 9 * r - 9 * n + 3 * c, g = 3 * r - 3 * e), x(u) < 1e-12) {
                    if (x(f) < 1e-12) continue;
                    p = -g / f,
                    p > 0 && 1 > p && w.push(p)
                } else b = f * f - 4 * g * u,
                0 > b || (y = m(b), d = (-f + y) / (2 * u), d > 0 && 1 > d && w.push(d), v = (-f - y) / (2 * u), v > 0 && 1 > v && w.push(v));
            for (var j, T, P, k = w.length, A = k; k--;) p = w[k],
                P = 1 - p,
                j = P * P * P * t + 3 * P * P * p * i + 3 * P * p * p * s + p * p * p * h,
                O[0][k] = j,
                T = P * P * P * e + 3 * P * P * p * r + 3 * P * p * p * n + p * p * p * c,
                O[1][k] = T;
            O[0][A] = t,
                O[1][A] = e,
                O[0][A + 1] = h,
                O[1][A + 1] = c;
            var M = [{
                x: _.apply(null, O[0]),
                y: _.apply(null, O[1])
            }, {
                x: C.apply(null, O[0]),
                y: C.apply(null, O[1])
            }];
            return o[l] = M,
                M
        }
        var s = {},
            n = {},
            o = {},
            a = Array.prototype.join;
        fabric.util.drawArc = function(e, i, r, s) {
            for (var n = s[0], o = s[1], a = s[2], h = s[3], c = s[4], l = s[5], u = s[6], f = [
                [],
                [],
                [],
                []
            ], g = t(l - i, u - r, n, o, h, c, a), p = 0, d = g.length; d > p; p++) f[p][0] = g[p][0] + i,
                f[p][1] = g[p][1] + r,
                f[p][2] = g[p][2] + i,
                f[p][3] = g[p][3] + r,
                f[p][4] = g[p][4] + i,
                f[p][5] = g[p][5] + r,
                e.bezierCurveTo.apply(e, f[p])
        },
            fabric.util.getBoundsOfArc = function(e, i, s, n, o, a, h, c, l) {
                for (var u = 0, f = 0, g = [], p = [], d = t(c - e, l - i, s, n, a, h, o), v = 0, b = d.length; b > v; v++) g = r(u, f, d[v][0], d[v][1], d[v][2], d[v][3], d[v][4], d[v][5]),
                    g[0].x += e,
                    g[0].y += i,
                    g[1].x += e,
                    g[1].y += i,
                    p.push(g[0]),
                    p.push(g[1]),
                    u = d[v][4],
                    f = d[v][5];
                return p
            },
            fabric.util.getBoundsOfCurve = r
    }(),
    function() {
        function t(t, e) {
            for (var i = s.call(arguments, 2), r = [], n = 0, o = t.length; o > n; n++) r[n] = i.length ? t[n][e].apply(t[n], i) : t[n][e].call(t[n]);
            return r
        }

        function e(t, e) {
            return r(t, e, function(t, e) {
                return t >= e
            })
        }

        function i(t, e) {
            return r(t, e, function(t, e) {
                return e > t
            })
        }

        function r(t, e, i) {
            if (t && 0 !== t.length) {
                var r = t.length - 1,
                    s = e ? t[r][e] : t[r];
                if (e)
                    for (; r--;) i(t[r][e], s) && (s = t[r][e]);
                else
                    for (; r--;) i(t[r], s) && (s = t[r]);
                return s
            }
        }
        var s = Array.prototype.slice;
        Array.prototype.indexOf || (Array.prototype.indexOf = function(t) {
            if (void 0 === this || null === this) throw new TypeError;
            var e = Object(this),
                i = e.length >>> 0;
            if (0 === i) return -1;
            var r = 0;
            if (arguments.length > 0 && (r = Number(arguments[1]), r !== r ? r = 0 : 0 !== r && r !== Number.POSITIVE_INFINITY && r !== Number.NEGATIVE_INFINITY && (r = (r > 0 || -1) * Math.floor(Math.abs(r)))), r >= i) return -1;
            for (var s = r >= 0 ? r : Math.max(i - Math.abs(r), 0); i > s; s++)
                if (s in e && e[s] === t) return s;
            return -1
        }),
        Array.prototype.forEach || (Array.prototype.forEach = function(t, e) {
            for (var i = 0, r = this.length >>> 0; r > i; i++) i in this && t.call(e, this[i], i, this)
        }),
        Array.prototype.map || (Array.prototype.map = function(t, e) {
            for (var i = [], r = 0, s = this.length >>> 0; s > r; r++) r in this && (i[r] = t.call(e, this[r], r, this));
            return i
        }),
        Array.prototype.every || (Array.prototype.every = function(t, e) {
            for (var i = 0, r = this.length >>> 0; r > i; i++)
                if (i in this && !t.call(e, this[i], i, this)) return !1;
            return !0
        }),
        Array.prototype.some || (Array.prototype.some = function(t, e) {
            for (var i = 0, r = this.length >>> 0; r > i; i++)
                if (i in this && t.call(e, this[i], i, this)) return !0;
            return !1
        }),
        Array.prototype.filter || (Array.prototype.filter = function(t, e) {
            for (var i, r = [], s = 0, n = this.length >>> 0; n > s; s++) s in this && (i = this[s], t.call(e, i, s, this) && r.push(i));
            return r
        }),
        Array.prototype.reduce || (Array.prototype.reduce = function(t) {
            var e,
                i = this.length >>> 0,
                r = 0;
            if (arguments.length > 1) e = arguments[1];
            else
                for (;;) {
                    if (r in this) {
                        e = this[r++];
                        break
                    }
                    if (++r >= i) throw new TypeError
                }
            for (; i > r; r++) r in this && (e = t.call(null, e, this[r], r, this));
            return e
        }),
            fabric.util.array = {
                invoke: t,
                min: i,
                max: e
            }
    }(),
    function() {
        function t(t, e) {
            for (var i in e) t[i] = e[i];
            return t
        }

        function e(e) {
            return t({}, e)
        }
        fabric.util.object = {
            extend: t,
            clone: e
        }
    }(),
    function() {
        function t(t) {
            return t.replace(/-+(.)?/g, function(t, e) {
                return e ? e.toUpperCase() : ''
            })
        }

        function e(t, e) {
            return t.charAt(0).toUpperCase() + (e ? t.slice(1) : t.slice(1).toLowerCase())
        }

        function i(t) {
            return t.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&apos;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        }
        String.prototype.trim || (String.prototype.trim = function() {
            return this.replace(/^[\s\xA0]+/, '').replace(/[\s\xA0]+$/, '')
        }),
            fabric.util.string = {
                camelize: t,
                capitalize: e,
                escapeXml: i
            }
    }(),
    function() {
        var t = Array.prototype.slice,
            e = Function.prototype.apply,
            i = function() {};
        Function.prototype.bind || (Function.prototype.bind = function(r) {
            var s,
                n = this,
                o = t.call(arguments, 1);
            return s = o.length ? function() {
                return e.call(n, this instanceof i ? this : r, o.concat(t.call(arguments)))
            } : function() {
                return e.call(n, this instanceof i ? this : r, arguments)
            },
                i.prototype = this.prototype,
                s.prototype = new i,
                s
        })
    }(),
    function() {
        function t() {}

        function e(t) {
            var e = this.constructor.superclass.prototype[t];
            return arguments.length > 1 ? e.apply(this, r.call(arguments, 1)) : e.call(this)
        }

        function i() {
            function i() {
                this.initialize.apply(this, arguments)
            }
            var n = null,
                a = r.call(arguments, 0);
            'function' == typeof a[0] && (n = a.shift()),
                i.superclass = n,
                i.subclasses = [],
            n && (t.prototype = n.prototype, i.prototype = new t, n.subclasses.push(i));
            for (var h = 0, c = a.length; c > h; h++) o(i, a[h], n);
            return i.prototype.initialize || (i.prototype.initialize = s),
                i.prototype.constructor = i,
                i.prototype.callSuper = e,
                i
        }
        var r = Array.prototype.slice,
            s = function() {},
            n = function() {
                for (var t in {
                    toString: 1
                })
                    if ('toString' === t) return !1;
                return !0
            }(),
            o = function(t, e, i) {
                for (var r in e) t.prototype[r] = r in t.prototype && 'function' == typeof t.prototype[r] && (e[r] + '').indexOf('callSuper') > -1 ? function(t) {
                    return function() {
                        var r = this.constructor.superclass;
                        this.constructor.superclass = i;
                        var s = e[t].apply(this, arguments);
                        return this.constructor.superclass = r,
                            'initialize' !== t ? s : void 0
                    }
                }(r) : e[r],
                n && (e.toString !== Object.prototype.toString && (t.prototype.toString = e.toString), e.valueOf !== Object.prototype.valueOf && (t.prototype.valueOf = e.valueOf))
            };
        fabric.util.createClass = i
    }(),
    function() {
        function t(t) {
            var e,
                i,
                r = Array.prototype.slice.call(arguments, 1),
                s = r.length;
            for (i = 0; s > i; i++)
                if (e = typeof t[r[i]], !/^(?:function|object|unknown)$/.test(e)) return !1;
            return !0
        }

        function e(t, e) {
            return {
                handler: e,
                wrappedHandler: i(t, e)
            }
        }

        function i(t, e) {
            return function(i) {
                e.call(o(t), i || fabric.window.event)
            }
        }

        function r(t, e) {
            return function(i) {
                if (d[t] && d[t][e])
                    for (var r = d[t][e], s = 0, n = r.length; n > s; s++) r[s].call(this, i || fabric.window.event)
            }
        }

        function s(t, e) {
            t || (t = fabric.window.event);
            var i = t.target || (typeof t.srcElement !== h ? t.srcElement : null),
                r = fabric.util.getScrollLeftTop(i, e);
            return {
                x: v(t) + r.left,
                y: b(t) + r.top
            }
        }

        function n(t, e, i) {
            var r = 'touchend' === t.type ? 'changedTouches' : 'touches';
            return t[r] && t[r][0] ? t[r][0][e] - (t[r][0][e] - t[r][0][i]) || t[i] : t[i]
        }
        var o,
            a,
            h = 'unknown',
            c = function() {
                var t = 0;
                return function(e) {
                    return e.__uniqueID || (e.__uniqueID = 'uniqueID__' + t++)
                }
            }();
        ! function() {
            var t = {};
            o = function(e) {
                return t[e]
            },
                a = function(e, i) {
                    t[e] = i
                }
        }();
        var l,
            u,
            f = t(fabric.document.documentElement, 'addEventListener', 'removeEventListener') && t(fabric.window, 'addEventListener', 'removeEventListener'),
            g = t(fabric.document.documentElement, 'attachEvent', 'detachEvent') && t(fabric.window, 'attachEvent', 'detachEvent'),
            p = {},
            d = {};
        f ? (l = function(t, e, i) {
            t.addEventListener(e, i, !1)
        }, u = function(t, e, i) {
            t.removeEventListener(e, i, !1)
        }) : g ? (l = function(t, i, r) {
            var s = c(t);
            a(s, t),
            p[s] || (p[s] = {}),
            p[s][i] || (p[s][i] = []);
            var n = e(s, r);
            p[s][i].push(n),
                t.attachEvent('on' + i, n.wrappedHandler)
        }, u = function(t, e, i) {
            var r,
                s = c(t);
            if (p[s] && p[s][e])
                for (var n = 0, o = p[s][e].length; o > n; n++) r = p[s][e][n],
                r && r.handler === i && (t.detachEvent('on' + e, r.wrappedHandler), p[s][e][n] = null)
        }) : (l = function(t, e, i) {
            var s = c(t);
            if (d[s] || (d[s] = {}), !d[s][e]) {
                d[s][e] = [];
                var n = t['on' + e];
                n && d[s][e].push(n),
                    t['on' + e] = r(s, e)
            }
            d[s][e].push(i)
        }, u = function(t, e, i) {
            var r = c(t);
            if (d[r] && d[r][e])
                for (var s = d[r][e], n = 0, o = s.length; o > n; n++) s[n] === i && s.splice(n, 1)
        }),
            fabric.util.addListener = l,
            fabric.util.removeListener = u;
        var v = function(t) {
                return typeof t.clientX !== h ? t.clientX : 0
            },
            b = function(t) {
                return typeof t.clientY !== h ? t.clientY : 0
            };
        fabric.isTouchSupported && (v = function(t) {
            return n(t, 'pageX', 'clientX')
        }, b = function(t) {
            return n(t, 'pageY', 'clientY')
        }),
            fabric.util.getPointer = s,
            fabric.util.object.extend(fabric.util, fabric.Observable)
    }(),
    function() {
        function t(t, e) {
            var i = t.style;
            if (!i) return t;
            if ('string' == typeof e) return t.style.cssText += ';' + e,
                e.indexOf('opacity') > -1 ? n(t, e.match(/opacity:\s*(\d?\.?\d*)/)[1]) : t;
            for (var r in e)
                if ('opacity' === r) n(t, e[r]);
                else {
                    var s = 'float' === r || 'cssFloat' === r ? 'undefined' == typeof i.styleFloat ? 'cssFloat' : 'styleFloat' : r;
                    i[s] = e[r]
                }
            return t
        }
        var e = fabric.document.createElement('div'),
            i = 'string' == typeof e.style.opacity,
            r = 'string' == typeof e.style.filter,
            s = /alpha\s*\(\s*opacity\s*=\s*([^\)]+)\)/,
            n = function(t) {
                return t
            };
        i ? n = function(t, e) {
            return t.style.opacity = e,
                t
        } : r && (n = function(t, e) {
            var i = t.style;
            return t.currentStyle && !t.currentStyle.hasLayout && (i.zoom = 1),
                s.test(i.filter) ? (e = e >= 0.9999 ? '' : 'alpha(opacity=' + 100 * e + ')', i.filter = i.filter.replace(s, e)) : i.filter += ' alpha(opacity=' + 100 * e + ')',
                t
        }),
            fabric.util.setStyle = t
    }(),
    function() {
        function t(t) {
            return 'string' == typeof t ? fabric.document.getElementById(t) : t
        }

        function e(t, e) {
            var i = fabric.document.createElement(t);
            for (var r in e) 'class' === r ? i.className = e[r] : 'for' === r ? i.htmlFor = e[r] : i.setAttribute(r, e[r]);
            return i
        }

        function i(t, e) {
            t && -1 === (' ' + t.className + ' ').indexOf(' ' + e + ' ') && (t.className += (t.className ? ' ' : '') + e)
        }

        function r(t, i, r) {
            return 'string' == typeof i && (i = e(i, r)),
            t.parentNode && t.parentNode.replaceChild(i, t),
                i.appendChild(t),
                i
        }

        function s(t, e) {
            var i,
                r,
                s = 0,
                n = 0,
                o = fabric.document.documentElement,
                a = fabric.document.body || {
                        scrollLeft: 0,
                        scrollTop: 0
                    };
            for (r = t; t && t.parentNode && !i;) t = t.parentNode,
            1 === t.nodeType && 'fixed' === fabric.util.getElementStyle(t, 'position') && (i = t),
                1 === t.nodeType && r !== e && 'absolute' === fabric.util.getElementStyle(t, 'position') ? (s = 0, n = 0) : t === fabric.document ? (s = a.scrollLeft || o.scrollLeft || 0, n = a.scrollTop || o.scrollTop || 0) : (s += t.scrollLeft || 0, n += t.scrollTop || 0);
            return {
                left: s,
                top: n
            }
        }

        function n(t) {
            var e,
                i,
                r = t && t.ownerDocument,
                s = {
                    left: 0,
                    top: 0
                },
                n = {
                    left: 0,
                    top: 0
                },
                o = {
                    borderLeftWidth: 'left',
                    borderTopWidth: 'top',
                    paddingLeft: 'left',
                    paddingTop: 'top'
                };
            if (!r) return {
                left: 0,
                top: 0
            };
            for (var a in o) n[o[a]] += parseInt(l(t, a), 10) || 0;
            return e = r.documentElement,
            'undefined' != typeof t.getBoundingClientRect && (s = t.getBoundingClientRect()),
                i = fabric.util.getScrollLeftTop(t, null), {
                left: s.left + i.left - (e.clientLeft || 0) + n.left,
                top: s.top + i.top - (e.clientTop || 0) + n.top
            }
        }
        var o,
            a = Array.prototype.slice,
            h = function(t) {
                return a.call(t, 0)
            };
        try {
            o = h(fabric.document.childNodes) instanceof Array
        } catch (c) {}
        o || (h = function(t) {
            for (var e = new Array(t.length), i = t.length; i--;) e[i] = t[i];
            return e
        });
        var l;
        l = fabric.document.defaultView && fabric.document.defaultView.getComputedStyle ? function(t, e) {
            var i = fabric.document.defaultView.getComputedStyle(t, null);
            return i ? i[e] : void 0
        } : function(t, e) {
            var i = t.style[e];
            return !i && t.currentStyle && (i = t.currentStyle[e]),
                i
        },
            function() {
                function t(t) {
                    return 'undefined' != typeof t.onselectstart && (t.onselectstart = fabric.util.falseFunction),
                        r ? t.style[r] = 'none' : 'string' == typeof t.unselectable && (t.unselectable = 'on'),
                        t
                }

                function e(t) {
                    return 'undefined' != typeof t.onselectstart && (t.onselectstart = null),
                        r ? t.style[r] = '' : 'string' == typeof t.unselectable && (t.unselectable = ''),
                        t
                }
                var i = fabric.document.documentElement.style,
                    r = 'userSelect' in i ? 'userSelect' : 'MozUserSelect' in i ? 'MozUserSelect' : 'WebkitUserSelect' in i ? 'WebkitUserSelect' : 'KhtmlUserSelect' in i ? 'KhtmlUserSelect' : '';
                fabric.util.makeElementUnselectable = t,
                    fabric.util.makeElementSelectable = e
            }(),
            function() {
                function t(t, e) {
                    var i = fabric.document.getElementsByTagName('head')[0],
                        r = fabric.document.createElement('script'),
                        s = !0;
                    r.onload = r.onreadystatechange = function(t) {
                        if (s) {
                            if ('string' == typeof this.readyState && 'loaded' !== this.readyState && 'complete' !== this.readyState) return;
                            s = !1,
                                e(t || fabric.window.event),
                                r = r.onload = r.onreadystatechange = null
                        }
                    },
                        r.src = t,
                        i.appendChild(r)
                }
                fabric.util.getScript = t
            }(),
            fabric.util.getById = t,
            fabric.util.toArray = h,
            fabric.util.makeElement = e,
            fabric.util.addClass = i,
            fabric.util.wrapElement = r,
            fabric.util.getScrollLeftTop = s,
            fabric.util.getElementOffset = n,
            fabric.util.getElementStyle = l
    }(),
    function() {
        function t(t, e) {
            return t + (/\?/.test(t) ? '&' : '?') + e
        }

        function e() {}

        function i(i, s) {
            s || (s = {});
            var n,
                o = s.method ? s.method.toUpperCase() : 'GET',
                a = s.onComplete || function() {},
                h = r();
            return h.onreadystatechange = function() {
                4 === h.readyState && (a(h), h.onreadystatechange = e)
            },
            'GET' === o && (n = null, 'string' == typeof s.parameters && (i = t(i, s.parameters))),
                h.open(o, i, !0), ('POST' === o || 'PUT' === o) && h.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'),
                h.send(n),
                h
        }
        var r = function() {
            for (var t = [
                function() {
                    return new ActiveXObject('Microsoft.XMLHTTP')
                },
                function() {
                    return new ActiveXObject('Msxml2.XMLHTTP')
                },
                function() {
                    return new ActiveXObject('Msxml2.XMLHTTP.3.0')
                },
                function() {
                    return new XMLHttpRequest
                }
            ], e = t.length; e--;) try {
                var i = t[e]();
                if (i) return t[e]
            } catch (r) {}
        }();
        fabric.util.request = i
    }(),
    fabric.log = function() {},
    fabric.warn = function() {},
'undefined' != typeof console && ['log',
    'warn'
].forEach(function(t) {
        'undefined' != typeof console[t] && console[t].apply && (fabric[t] = function() {
            return console[t].apply(console, arguments)
        })
    }),
    function(t) {
        'use strict';

        function e(t, e) {
            this.x = t,
                this.y = e
        }
        var i = t.fabric || (t.fabric = {});
        return i.Point ? void i.warn('fabric.Point is already defined') : (i.Point = e, void(e.prototype = {
            constructor: e,
            add: function(t) {
                return new e(this.x + t.x, this.y + t.y)
            },
            addEquals: function(t) {
                return this.x += t.x,
                    this.y += t.y,
                    this
            },
            scalarAdd: function(t) {
                return new e(this.x + t, this.y + t)
            },
            scalarAddEquals: function(t) {
                return this.x += t,
                    this.y += t,
                    this
            },
            subtract: function(t) {
                return new e(this.x - t.x, this.y - t.y)
            },
            subtractEquals: function(t) {
                return this.x -= t.x,
                    this.y -= t.y,
                    this
            },
            scalarSubtract: function(t) {
                return new e(this.x - t, this.y - t)
            },
            scalarSubtractEquals: function(t) {
                return this.x -= t,
                    this.y -= t,
                    this
            },
            multiply: function(t) {
                return new e(this.x * t, this.y * t)
            },
            multiplyEquals: function(t) {
                return this.x *= t,
                    this.y *= t,
                    this
            },
            divide: function(t) {
                return new e(this.x / t, this.y / t)
            },
            divideEquals: function(t) {
                return this.x /= t,
                    this.y /= t,
                    this
            },
            eq: function(t) {
                return this.x === t.x && this.y === t.y
            },
            lt: function(t) {
                return this.x < t.x && this.y < t.y
            },
            lte: function(t) {
                return this.x <= t.x && this.y <= t.y
            },
            gt: function(t) {
                return this.x > t.x && this.y > t.y
            },
            gte: function(t) {
                return this.x >= t.x && this.y >= t.y
            },
            lerp: function(t, i) {
                return new e(this.x + (t.x - this.x) * i, this.y + (t.y - this.y) * i)
            },
            distanceFrom: function(t) {
                var e = this.x - t.x,
                    i = this.y - t.y;
                return Math.sqrt(e * e + i * i)
            },
            midPointFrom: function(t) {
                return new e(this.x + (t.x - this.x) / 2, this.y + (t.y - this.y) / 2)
            },
            min: function(t) {
                return new e(Math.min(this.x, t.x), Math.min(this.y, t.y))
            },
            max: function(t) {
                return new e(Math.max(this.x, t.x), Math.max(this.y, t.y))
            },
            toString: function() {
                return this.x + ',' + this.y
            },
            setXY: function(t, e) {
                this.x = t,
                    this.y = e
            },
            setFromPoint: function(t) {
                this.x = t.x,
                    this.y = t.y
            },
            swap: function(t) {
                var e = this.x,
                    i = this.y;
                this.x = t.x,
                    this.y = t.y,
                    t.x = e,
                    t.y = i
            }
        }))
    }('undefined' != typeof exports ? exports : this),
    function(t) {
        'use strict';

        function e(t) {
            this.status = t,
                this.points = []
        }
        var i = t.fabric || (t.fabric = {});
        return i.Intersection ? void i.warn('fabric.Intersection is already defined') : (i.Intersection = e, i.Intersection.prototype = {
            appendPoint: function(t) {
                this.points.push(t)
            },
            appendPoints: function(t) {
                this.points = this.points.concat(t)
            }
        }, i.Intersection.intersectLineLine = function(t, r, s, n) {
            var o,
                a = (n.x - s.x) * (t.y - s.y) - (n.y - s.y) * (t.x - s.x),
                h = (r.x - t.x) * (t.y - s.y) - (r.y - t.y) * (t.x - s.x),
                c = (n.y - s.y) * (r.x - t.x) - (n.x - s.x) * (r.y - t.y);
            if (0 !== c) {
                var l = a / c,
                    u = h / c;
                l >= 0 && 1 >= l && u >= 0 && 1 >= u ? (o = new e('Intersection'), o.points.push(new i.Point(t.x + l * (r.x - t.x), t.y + l * (r.y - t.y)))) : o = new e
            } else o = new e(0 === a || 0 === h ? 'Coincident' : 'Parallel');
            return o
        }, i.Intersection.intersectLinePolygon = function(t, i, r) {
            for (var s = new e, n = r.length, o = 0; n > o; o++) {
                var a = r[o],
                    h = r[(o + 1) % n],
                    c = e.intersectLineLine(t, i, a, h);
                s.appendPoints(c.points)
            }
            return s.points.length > 0 && (s.status = 'Intersection'),
                s
        }, i.Intersection.intersectPolygonPolygon = function(t, i) {
            for (var r = new e, s = t.length, n = 0; s > n; n++) {
                var o = t[n],
                    a = t[(n + 1) % s],
                    h = e.intersectLinePolygon(o, a, i);
                r.appendPoints(h.points)
            }
            return r.points.length > 0 && (r.status = 'Intersection'),
                r
        }, void(i.Intersection.intersectPolygonRectangle = function(t, r, s) {
            var n = r.min(s),
                o = r.max(s),
                a = new i.Point(o.x, n.y),
                h = new i.Point(n.x, o.y),
                c = e.intersectLinePolygon(n, a, t),
                l = e.intersectLinePolygon(a, o, t),
                u = e.intersectLinePolygon(o, h, t),
                f = e.intersectLinePolygon(h, n, t),
                g = new e;
            return g.appendPoints(c.points),
                g.appendPoints(l.points),
                g.appendPoints(u.points),
                g.appendPoints(f.points),
            g.points.length > 0 && (g.status = 'Intersection'),
                g
        }))
    }('undefined' != typeof exports ? exports : this),
    function(t) {
        'use strict';

        function e(t) {
            t ? this._tryParsingColor(t) : this.setSource([0,
                0,
                0,
                1
            ])
        }

        function i(t, e, i) {
            return 0 > i && (i += 1),
            i > 1 && (i -= 1),
                1 / 6 > i ? t + 6 * (e - t) * i : 0.5 > i ? e : 2 / 3 > i ? t + (e - t) * (2 / 3 - i) * 6 : t
        }
        var r = t.fabric || (t.fabric = {});
        return r.Color ? void r.warn('fabric.Color is already defined.') : (r.Color = e, r.Color.prototype = {
            _tryParsingColor: function(t) {
                var i;
                return t in e.colorNameMap && (t = e.colorNameMap[t]),
                    'transparent' === t ? void this.setSource([255,
                        255,
                        255,
                        0
                    ]) : (i = e.sourceFromHex(t), i || (i = e.sourceFromRgb(t)), i || (i = e.sourceFromHsl(t)), void(i && this.setSource(i)))
            },
            _rgbToHsl: function(t, e, i) {
                t /= 255,
                    e /= 255,
                    i /= 255;
                var s,
                    n,
                    o,
                    a = r.util.array.max([t,
                        e,
                        i
                    ]),
                    h = r.util.array.min([t,
                        e,
                        i
                    ]);
                if (o = (a + h) / 2, a === h) s = n = 0;
                else {
                    var c = a - h;
                    switch (n = o > 0.5 ? c / (2 - a - h) : c / (a + h), a) {
                        case t:
                            s = (e - i) / c + (i > e ? 6 : 0);
                            break;
                        case e:
                            s = (i - t) / c + 2;
                            break;
                        case i:
                            s = (t - e) / c + 4
                    }
                    s /= 6
                }
                return [Math.round(360 * s),
                    Math.round(100 * n),
                    Math.round(100 * o)
                ]
            },
            getSource: function() {
                return this._source
            },
            setSource: function(t) {
                this._source = t
            },
            toRgb: function() {
                var t = this.getSource();
                return 'rgb(' + t[0] + ',' + t[1] + ',' + t[2] + ')'
            },
            toRgba: function() {
                var t = this.getSource();
                return 'rgba(' + t[0] + ',' + t[1] + ',' + t[2] + ',' + t[3] + ')'
            },
            toHsl: function() {
                var t = this.getSource(),
                    e = this._rgbToHsl(t[0], t[1], t[2]);
                return 'hsl(' + e[0] + ',' + e[1] + '%,' + e[2] + '%)'
            },
            toHsla: function() {
                var t = this.getSource(),
                    e = this._rgbToHsl(t[0], t[1], t[2]);
                return 'hsla(' + e[0] + ',' + e[1] + '%,' + e[2] + '%,' + t[3] + ')'
            },
            toHex: function() {
                var t,
                    e,
                    i,
                    r = this.getSource();
                return t = r[0].toString(16),
                    t = 1 === t.length ? '0' + t : t,
                    e = r[1].toString(16),
                    e = 1 === e.length ? '0' + e : e,
                    i = r[2].toString(16),
                    i = 1 === i.length ? '0' + i : i,
                t.toUpperCase() + e.toUpperCase() + i.toUpperCase()
            },
            getAlpha: function() {
                return this.getSource()[3]
            },
            setAlpha: function(t) {
                var e = this.getSource();
                return e[3] = t,
                    this.setSource(e),
                    this
            },
            toGrayscale: function() {
                var t = this.getSource(),
                    e = parseInt((0.3 * t[0] + 0.59 * t[1] + 0.11 * t[2]).toFixed(0), 10),
                    i = t[3];
                return this.setSource([e,
                    e,
                    e,
                    i
                ]),
                    this
            },
            toBlackWhite: function(t) {
                var e = this.getSource(),
                    i = (0.3 * e[0] + 0.59 * e[1] + 0.11 * e[2]).toFixed(0),
                    r = e[3];
                return t = t || 127,
                    i = Number(i) < Number(t) ? 0 : 255,
                    this.setSource([i,
                        i,
                        i,
                        r
                    ]),
                    this
            },
            overlayWith: function(t) {
                t instanceof e || (t = new e(t));
                for (var i = [], r = this.getAlpha(), s = 0.5, n = this.getSource(), o = t.getSource(), a = 0; 3 > a; a++) i.push(Math.round(n[a] * (1 - s) + o[a] * s));
                return i[3] = r,
                    this.setSource(i),
                    this
            }
        },
            r.Color.reRGBa = /^rgba?\(\s*(\d{1,3}(?:\.\d+)?\%?)\s*,\s*(\d{1,3}(?:\.\d+)?\%?)\s*,\s*(\d{1,3}(?:\.\d+)?\%?)\s*(?:\s*,\s*(\d+(?:\.\d+)?)\s*)?\)$/,
            r.Color.reHSLa = /^hsla?\(\s*(\d{1,3})\s*,\s*(\d{1,3}\%)\s*,\s*(\d{1,3}\%)\s*(?:\s*,\s*(\d+(?:\.\d+)?)\s*)?\)$/,
            r.Color.reHex = /^#?([0-9a-f]{6}|[0-9a-f]{3})$/i,
            r.Color.colorNameMap = {
                aqua: '#00FFFF',
                black: '#000000',
                blue: '#0000FF',
                fuchsia: '#FF00FF',
                gray: '#808080',
                green: '#008000',
                lime: '#00FF00',
                maroon: '#800000',
                navy: '#000080',
                olive: '#808000',
                orange: '#FFA500',
                purple: '#800080',
                red: '#FF0000',
                silver: '#C0C0C0',
                teal: '#008080',
                white: '#FFFFFF',
                yellow: '#FFFF00'
            },
            r.Color.fromRgb = function(t) {
                return e.fromSource(e.sourceFromRgb(t))
            },
            r.Color.sourceFromRgb = function(t) {
                var i = t.match(e.reRGBa);
                if (i) {
                    var r = parseInt(i[1], 10) / (/%$/.test(i[1]) ? 100 : 1) * (/%$/.test(i[1]) ? 255 : 1),
                        s = parseInt(i[2], 10) / (/%$/.test(i[2]) ? 100 : 1) * (/%$/.test(i[2]) ? 255 : 1),
                        n = parseInt(i[3], 10) / (/%$/.test(i[3]) ? 100 : 1) * (/%$/.test(i[3]) ? 255 : 1);
                    return [parseInt(r, 10),
                        parseInt(s, 10),
                        parseInt(n, 10),
                        i[4] ? parseFloat(i[4]) : 1
                    ]
                }
            },
            r.Color.fromRgba = e.fromRgb,
            r.Color.fromHsl = function(t) {
                return e.fromSource(e.sourceFromHsl(t))
            },
            r.Color.sourceFromHsl = function(t) {
                var r = t.match(e.reHSLa);
                if (r) {
                    var s,
                        n,
                        o,
                        a = (parseFloat(r[1]) % 360 + 360) % 360 / 360,
                        h = parseFloat(r[2]) / (/%$/.test(r[2]) ? 100 : 1),
                        c = parseFloat(r[3]) / (/%$/.test(r[3]) ? 100 : 1);
                    if (0 === h) s = n = o = c;
                    else {
                        var l = 0.5 >= c ? c * (h + 1) : c + h - c * h,
                            u = 2 * c - l;
                        s = i(u, l, a + 1 / 3),
                            n = i(u, l, a),
                            o = i(u, l, a - 1 / 3)
                    }
                    return [Math.round(255 * s),
                        Math.round(255 * n),
                        Math.round(255 * o),
                        r[4] ? parseFloat(r[4]) : 1
                    ]
                }
            },
            r.Color.fromHsla = e.fromHsl,
            r.Color.fromHex = function(t) {
                return e.fromSource(e.sourceFromHex(t))
            },
            r.Color.sourceFromHex = function(t) {
                if (t.match(e.reHex)) {
                    var i = t.slice(t.indexOf('#') + 1),
                        r = 3 === i.length,
                        s = r ? i.charAt(0) + i.charAt(0) : i.substring(0, 2),
                        n = r ? i.charAt(1) + i.charAt(1) : i.substring(2, 4),
                        o = r ? i.charAt(2) + i.charAt(2) : i.substring(4, 6);
                    return [parseInt(s, 16),
                        parseInt(n, 16),
                        parseInt(o, 16),
                        1
                    ]
                }
            },
            void(r.Color.fromSource = function(t) {
                var i = new e;
                return i.setSource(t),
                    i
            }))
    }('undefined' != typeof exports ? exports : this),
    function() {
        'use strict';
        if (fabric.StaticCanvas) return void fabric.warn('fabric.StaticCanvas is already defined.');
        var t = fabric.util.object.extend,
            e = fabric.util.getElementOffset,
            i = fabric.util.removeFromArray,
            r = new Error('Could not initialize `canvas` element');
        fabric.StaticCanvas = fabric.util.createClass({
            initialize: function(t, e) {
                e || (e = {}),
                    this._initStatic(t, e),
                    fabric.StaticCanvas.activeInstance = this
            },
            backgroundColor: '',
            backgroundImage: null,
            overlayColor: '',
            overlayImage: null,
            includeDefaultValues: !0,
            stateful: !0,
            renderOnAddRemove: !0,
            clipTo: null,
            controlsAboveOverlay: !1,
            allowTouchScrolling: !1,
            imageSmoothingEnabled: !0,
            preserveObjectStacking: !1,
            viewportTransform: [
                1,
                0,
                0,
                1,
                0,
                0
            ],
            onBeforeScaleRotate: function() {},
            _initStatic: function(t, e) {
                this._objects = [],
                    this._createLowerCanvas(t),
                    this._initOptions(e),
                    this._setImageSmoothing(),
                e.overlayImage && this.setOverlayImage(e.overlayImage, this.renderAll.bind(this)),
                e.backgroundImage && this.setBackgroundImage(e.backgroundImage, this.renderAll.bind(this)),
                e.backgroundColor && this.setBackgroundColor(e.backgroundColor, this.renderAll.bind(this)),
                e.overlayColor && this.setOverlayColor(e.overlayColor, this.renderAll.bind(this)),
                    this.calcOffset()
            },
            calcOffset: function() {
                return this._offset = e(this.lowerCanvasEl),
                    this
            },
            setOverlayImage: function(t, e, i) {
                return this.__setBgOverlayImage('overlayImage', t, e, i)
            },
            setBackgroundImage: function(t, e, i) {
                return this.__setBgOverlayImage('backgroundImage', t, e, i)
            },
            setOverlayColor: function(t, e) {
                return this.__setBgOverlayColor('overlayColor', t, e)
            },
            setBackgroundColor: function(t, e) {
                return this.__setBgOverlayColor('backgroundColor', t, e)
            },
            _setImageSmoothing: function() {
                var t = this.getContext();
                t.imageSmoothingEnabled = this.imageSmoothingEnabled,
                    t.webkitImageSmoothingEnabled = this.imageSmoothingEnabled,
                    t.mozImageSmoothingEnabled = this.imageSmoothingEnabled,
                    t.msImageSmoothingEnabled = this.imageSmoothingEnabled,
                    t.oImageSmoothingEnabled = this.imageSmoothingEnabled
            },
            __setBgOverlayImage: function(t, e, i, r) {
                return 'string' == typeof e ? fabric.util.loadImage(e, function(e) {
                    this[t] = new fabric.Image(e, r),
                    i && i()
                }, this, r && r.crossOrigin) : (this[t] = e, i && i()),
                    this
            },
            __setBgOverlayColor: function(t, e, i) {
                if (e && e.source) {
                    var r = this;
                    fabric.util.loadImage(e.source, function(s) {
                        r[t] = new fabric.Pattern({
                            source: s,
                            repeat: e.repeat,
                            offsetX: e.offsetX,
                            offsetY: e.offsetY
                        }),
                        i && i()
                    })
                } else this[t] = e,
                i && i();
                return this
            },
            _createCanvasElement: function() {
                var t = fabric.document.createElement('canvas');
                if (t.style || (t.style = {}), !t) throw r;
                return this._initCanvasElement(t),
                    t
            },
            _initCanvasElement: function(t) {
                if (fabric.util.createCanvasElement(t), 'undefined' == typeof t.getContext) throw r
            },
            _initOptions: function(t) {
                for (var e in t) this[e] = t[e];
                this.width = this.width || parseInt(this.lowerCanvasEl.width, 10) || 0,
                    this.height = this.height || parseInt(this.lowerCanvasEl.height, 10) || 0,
                this.lowerCanvasEl.style && (this.lowerCanvasEl.width = this.width, this.lowerCanvasEl.height = this.height, this.lowerCanvasEl.style.width = this.width + 'px', this.lowerCanvasEl.style.height = this.height + 'px', this.viewportTransform = this.viewportTransform.slice())
            },
            _createLowerCanvas: function(t) {
                this.lowerCanvasEl = fabric.util.getById(t) || this._createCanvasElement(),
                    this._initCanvasElement(this.lowerCanvasEl),
                    fabric.util.addClass(this.lowerCanvasEl, 'lower-canvas'),
                this.interactive && this._applyCanvasStyle(this.lowerCanvasEl),
                    this.contextContainer = this.lowerCanvasEl.getContext('2d')
            },
            getWidth: function() {
                return this.width
            },
            getHeight: function() {
                return this.height
            },
            setWidth: function(t, e) {
                return this.setDimensions({
                    width: t
                }, e)
            },
            setHeight: function(t, e) {
                return this.setDimensions({
                    height: t
                }, e)
            },
            setDimensions: function(t, e) {
                var i;
                e = e || {};
                for (var r in t) i = t[r],
                e.cssOnly || (this._setBackstoreDimension(r, t[r]), i += 'px'),
                e.backstoreOnly || this._setCssDimension(r, i);
                return e.cssOnly || this.renderAll(),
                    this.calcOffset(),
                    this
            },
            _setBackstoreDimension: function(t, e) {
                return this.lowerCanvasEl[t] = e,
                this.upperCanvasEl && (this.upperCanvasEl[t] = e),
                this.cacheCanvasEl && (this.cacheCanvasEl[t] = e),
                    this[t] = e,
                    this
            },
            _setCssDimension: function(t, e) {
                return this.lowerCanvasEl.style[t] = e,
                this.upperCanvasEl && (this.upperCanvasEl.style[t] = e),
                this.wrapperEl && (this.wrapperEl.style[t] = e),
                    this
            },
            getZoom: function() {
                return Math.sqrt(this.viewportTransform[0] * this.viewportTransform[3])
            },
            setViewportTransform: function(t) {
                this.viewportTransform = t,
                    this.renderAll();
                for (var e = 0, i = this._objects.length; i > e; e++) this._objects[e].setCoords();
                return this
            },
            zoomToPoint: function(t, e) {
                var i = t;
                t = fabric.util.transformPoint(t, fabric.util.invertTransform(this.viewportTransform)),
                    this.viewportTransform[0] = e,
                    this.viewportTransform[3] = e;
                var r = fabric.util.transformPoint(t, this.viewportTransform);
                this.viewportTransform[4] += i.x - r.x,
                    this.viewportTransform[5] += i.y - r.y,
                    this.renderAll();
                for (var s = 0, n = this._objects.length; n > s; s++) this._objects[s].setCoords();
                return this
            },
            setZoom: function(t) {
                return this.zoomToPoint(new fabric.Point(0, 0), t),
                    this
            },
            absolutePan: function(t) {
                this.viewportTransform[4] = -t.x,
                    this.viewportTransform[5] = -t.y,
                    this.renderAll();
                for (var e = 0, i = this._objects.length; i > e; e++) this._objects[e].setCoords();
                return this
            },
            relativePan: function(t) {
                return this.absolutePan(new fabric.Point(-t.x - this.viewportTransform[4], -t.y - this.viewportTransform[5]))
            },
            getElement: function() {
                return this.lowerCanvasEl
            },
            getActiveObject: function() {
                return null
            },
            getActiveGroup: function() {
                return null
            },
            _draw: function(t, e) {
                if (e) {
                    t.save();
                    var i = this.viewportTransform;
                    t.transform(i[0], i[1], i[2], i[3], i[4], i[5]),
                    this._shouldRenderObject(e) && e.render(t),
                        t.restore(),
                    this.controlsAboveOverlay || e._renderControls(t)
                }
            },
            _shouldRenderObject: function(t) {
                return t ? t !== this.getActiveGroup() || !this.preserveObjectStacking : !1
            },
            _onObjectAdded: function(t) {
                this.stateful && t.setupState(),
                    t.canvas = this,
                    t.setCoords(),
                    this.fire('object:added', {
                        target: t
                    }),
                    t.fire('added')
            },
            _onObjectRemoved: function(t) {
                this.getActiveObject() === t && (this.fire('before:selection:cleared', {
                    target: t
                }), this._discardActiveObject(), this.fire('selection:cleared')),
                    this.fire('object:removed', {
                        target: t
                    }),
                    t.fire('removed')
            },
            clearContext: function(t) {
                return t.clearRect(0, 0, this.width, this.height),
                    this
            },
            getContext: function() {
                return this.contextContainer
            },
            clear: function() {
                return this._objects.length = 0,
                this.discardActiveGroup && this.discardActiveGroup(),
                this.discardActiveObject && this.discardActiveObject(),
                    this.clearContext(this.contextContainer),
                this.contextTop && this.clearContext(this.contextTop),
                    this.fire('canvas:cleared'),
                    this.renderAll(),
                    this
            },
            renderAll: function(t) {
                var e = this[t === !0 && this.interactive ? 'contextTop' : 'contextContainer'],
                    i = this.getActiveGroup();
                return this.contextTop && this.selection && !this._groupSelector && this.clearContext(this.contextTop),
                t || this.clearContext(e),
                    this.fire('before:render'),
                this.clipTo && fabric.util.clipContext(this, e),
                    this._renderBackground(e),
                    this._renderObjects(e, i),
                    this._renderActiveGroup(e, i),
                this.clipTo && e.restore(),
                    this._renderOverlay(e),
                this.controlsAboveOverlay && this.interactive && this.drawControls(e),
                    this.fire('after:render'),
                    this
            },
            _renderObjects: function(t, e) {
                var i,
                    r;
                if (!e || this.preserveObjectStacking)
                    for (i = 0, r = this._objects.length; r > i; ++i) this._draw(t, this._objects[i]);
                else
                    for (i = 0, r = this._objects.length; r > i; ++i) this._objects[i] && !e.contains(this._objects[i]) && this._draw(t, this._objects[i])
            },
            _renderActiveGroup: function(t, e) {
                if (e) {
                    var i = [];
                    this.forEachObject(function(t) {
                        e.contains(t) && i.push(t)
                    }),
                        e._set('objects', i),
                        this._draw(t, e)
                }
            },
            _renderBackground: function(t) {
                this.backgroundColor && (t.fillStyle = this.backgroundColor.toLive ? this.backgroundColor.toLive(t) : this.backgroundColor, t.fillRect(this.backgroundColor.offsetX || 0, this.backgroundColor.offsetY || 0, this.width, this.height)),
                this.backgroundImage && this._draw(t, this.backgroundImage)
            },
            _renderOverlay: function(t) {
                this.overlayColor && (t.fillStyle = this.overlayColor.toLive ? this.overlayColor.toLive(t) : this.overlayColor, t.fillRect(this.overlayColor.offsetX || 0, this.overlayColor.offsetY || 0, this.width, this.height)),
                this.overlayImage && this._draw(t, this.overlayImage)
            },
            renderTop: function() {
                var t = this.contextTop || this.contextContainer;
                this.clearContext(t),
                this.selection && this._groupSelector && this._drawSelection();
                var e = this.getActiveGroup();
                return e && e.render(t),
                    this._renderOverlay(t),
                    this.fire('after:render'),
                    this
            },
            getCenter: function() {
                return {
                    top: this.getHeight() / 2,
                    left: this.getWidth() / 2
                }
            },
            centerObjectH: function(t) {
                return this._centerObject(t, new fabric.Point(this.getCenter().left, t.getCenterPoint().y)),
                    this.renderAll(),
                    this
            },
            centerObjectV: function(t) {
                return this._centerObject(t, new fabric.Point(t.getCenterPoint().x, this.getCenter().top)),
                    this.renderAll(),
                    this
            },
            centerObject: function(t) {
                var e = this.getCenter();
                return this._centerObject(t, new fabric.Point(e.left, e.top)),
                    this.renderAll(),
                    this
            },
            _centerObject: function(t, e) {
                return t.setPositionByOrigin(e, 'center', 'center'),
                    this
            },
            toDatalessJSON: function(t) {
                return this.toDatalessObject(t)
            },
            toObject: function(t) {
                return this._toObjectMethod('toObject', t)
            },
            toDatalessObject: function(t) {
                return this._toObjectMethod('toDatalessObject', t)
            },
            _toObjectMethod: function(e, i) {
                var r = this.getActiveGroup();
                r && this.discardActiveGroup();
                var s = {
                    objects: this._toObjects(e, i)
                };
                return t(s, this.__serializeBgOverlay()),
                    fabric.util.populateWithProperties(this, s, i),
                r && (this.setActiveGroup(new fabric.Group(r.getObjects(), {
                    originX: 'center',
                    originY: 'center'
                })), r.forEachObject(function(t) {
                    t.set('active', !0)
                }), this._currentTransform && (this._currentTransform.target = this.getActiveGroup())),
                    s
            },
            _toObjects: function(t, e) {
                return this.getObjects().map(function(i) {
                    return this._toObject(i, t, e)
                }, this)
            },
            _toObject: function(t, e, i) {
                var r;
                this.includeDefaultValues || (r = t.includeDefaultValues, t.includeDefaultValues = !1);
                var s = t[e](i);
                return this.includeDefaultValues || (t.includeDefaultValues = r),
                    s
            },
            __serializeBgOverlay: function() {
                var t = {
                    background: this.backgroundColor && this.backgroundColor.toObject ? this.backgroundColor.toObject() : this.backgroundColor
                };
                return this.overlayColor && (t.overlay = this.overlayColor.toObject ? this.overlayColor.toObject() : this.overlayColor),
                this.backgroundImage && (t.backgroundImage = this.backgroundImage.toObject()),
                this.overlayImage && (t.overlayImage = this.overlayImage.toObject()),
                    t
            },
            svgViewportTransformation: !0,
            toSVG: function(t, e) {
                t || (t = {});
                var i = [];
                return this._setSVGPreamble(i, t),
                    this._setSVGHeader(i, t),
                    this._setSVGBgOverlayColor(i, 'backgroundColor'),
                    this._setSVGBgOverlayImage(i, 'backgroundImage'),
                    this._setSVGObjects(i, e),
                    this._setSVGBgOverlayColor(i, 'overlayColor'),
                    this._setSVGBgOverlayImage(i, 'overlayImage'),
                    i.push('</svg>'),
                    i.join('')
            },
            _setSVGPreamble: function(t, e) {
                e.suppressPreamble || t.push('<?xml version="1.0" encoding="', e.encoding || 'UTF-8', '" standalone="no" ?>', '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" ', '"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n')
            },
            _setSVGHeader: function(t, e) {
                var i,
                    r,
                    s;
                e.viewBox ? (i = e.viewBox.width, r = e.viewBox.height) : (i = this.width, r = this.height, this.svgViewportTransformation || (s = this.viewportTransform, i /= s[0], r /= s[3])),
                    t.push('<svg ', 'xmlns="http://www.w3.org/2000/svg" ', 'xmlns:xlink="http://www.w3.org/1999/xlink" ', 'version="1.1" ', 'width="', i, '" ', 'height="', r, '" ', this.backgroundColor && !this.backgroundColor.toLive ? 'style="background-color: ' + this.backgroundColor + '" ' : null, e.viewBox ? 'viewBox="' + e.viewBox.x + ' ' + e.viewBox.y + ' ' + e.viewBox.width + ' ' + e.viewBox.height + '" ' : null, 'xml:space="preserve">', '<desc>Created with Fabric.js ', fabric.version, '</desc>', '<defs>', fabric.createSVGFontFacesMarkup(this.getObjects()), fabric.createSVGRefElementsMarkup(this), '</defs>')
            },
            _setSVGObjects: function(t, e) {
                var i = this.getActiveGroup();
                i && this.discardActiveGroup();
                for (var r = 0, s = this.getObjects(), n = s.length; n > r; r++) t.push(s[r].toSVG(e));
                i && (this.setActiveGroup(new fabric.Group(i.getObjects())), i.forEachObject(function(t) {
                    t.set('active', !0)
                }))
            },
            _setSVGBgOverlayImage: function(t, e) {
                this[e] && this[e].toSVG && t.push(this[e].toSVG())
            },
            _setSVGBgOverlayColor: function(t, e) {
                this[e] && this[e].source ? t.push('<rect x="', this[e].offsetX, '" y="', this[e].offsetY, '" ', 'width="', 'repeat-y' === this[e].repeat || 'no-repeat' === this[e].repeat ? this[e].source.width : this.width, '" height="', 'repeat-x' === this[e].repeat || 'no-repeat' === this[e].repeat ? this[e].source.height : this.height, '" fill="url(#' + e + 'Pattern)"', '></rect>') : this[e] && 'overlayColor' === e && t.push('<rect x="0" y="0" ', 'width="', this.width, '" height="', this.height, '" fill="', this[e], '"', '></rect>')
            },
            sendToBack: function(t) {
                return i(this._objects, t),
                    this._objects.unshift(t),
                this.renderAll && this.renderAll()
            },
            bringToFront: function(t) {
                return i(this._objects, t),
                    this._objects.push(t),
                this.renderAll && this.renderAll()
            },
            sendBackwards: function(t, e) {
                var r = this._objects.indexOf(t);
                if (0 !== r) {
                    var s = this._findNewLowerIndex(t, r, e);
                    i(this._objects, t),
                        this._objects.splice(s, 0, t),
                    this.renderAll && this.renderAll()
                }
                return this
            },
            _findNewLowerIndex: function(t, e, i) {
                var r;
                if (i) {
                    r = e;
                    for (var s = e - 1; s >= 0; --s) {
                        var n = t.intersectsWithObject(this._objects[s]) || t.isContainedWithinObject(this._objects[s]) || this._objects[s].isContainedWithinObject(t);
                        if (n) {
                            r = s;
                            break
                        }
                    }
                } else r = e - 1;
                return r
            },
            bringForward: function(t, e) {
                var r = this._objects.indexOf(t);
                if (r !== this._objects.length - 1) {
                    var s = this._findNewUpperIndex(t, r, e);
                    i(this._objects, t),
                        this._objects.splice(s, 0, t),
                    this.renderAll && this.renderAll()
                }
                return this
            },
            _findNewUpperIndex: function(t, e, i) {
                var r;
                if (i) {
                    r = e;
                    for (var s = e + 1; s < this._objects.length; ++s) {
                        var n = t.intersectsWithObject(this._objects[s]) || t.isContainedWithinObject(this._objects[s]) || this._objects[s].isContainedWithinObject(t);
                        if (n) {
                            r = s;
                            break
                        }
                    }
                } else r = e + 1;
                return r
            },
            moveTo: function(t, e) {
                return i(this._objects, t),
                    this._objects.splice(e, 0, t),
                this.renderAll && this.renderAll()
            },
            dispose: function() {
                return this.clear(),
                this.interactive && this.removeListeners(),
                    this
            },
            toString: function() {
                return '#<fabric.Canvas (' + this.complexity() + '): { objects: ' + this.getObjects().length + ' }>'
            }
        }),
            t(fabric.StaticCanvas.prototype, fabric.Observable),
            t(fabric.StaticCanvas.prototype, fabric.Collection),
            t(fabric.StaticCanvas.prototype, fabric.DataURLExporter),
            t(fabric.StaticCanvas, {
                EMPTY_JSON: '{"objects": [], "background": "white"}',
                supports: function(t) {
                    var e = fabric.util.createCanvasElement();
                    if (!e || !e.getContext) return null;
                    var i = e.getContext('2d');
                    if (!i) return null;
                    switch (t) {
                        case 'getImageData':
                            return 'undefined' != typeof i.getImageData;
                        case 'setLineDash':
                            return 'undefined' != typeof i.setLineDash;
                        case 'toDataURL':
                            return 'undefined' != typeof e.toDataURL;
                        case 'toDataURLWithQuality':
                            try {
                                return e.toDataURL('image/jpeg', 0), !0
                            } catch (r) {}
                            return !1;
                        default:
                            return null
                    }
                }
            }), fabric.StaticCanvas.prototype.toJSON = fabric.StaticCanvas.prototype.toObject
    }(),
    function() {
        var t = fabric.util.getPointer,
            e = fabric.util.degreesToRadians,
            i = fabric.util.radiansToDegrees,
            r = Math.atan2,
            s = Math.abs,
            n = 0.5;
        fabric.Canvas = fabric.util.createClass(fabric.StaticCanvas, {
            initialize: function(t, e) {
                e || (e = {}),
                    this._initStatic(t, e),
                    this._initInteractive(),
                    this._createCacheCanvas(),
                    fabric.Canvas.activeInstance = this
            },
            uniScaleTransform: !1,
            centeredScaling: !1,
            centeredRotation: !1,
            interactive: !0,
            selection: !0,
            selectionColor: 'rgba(100, 100, 255, 0.3)',
            selectionDashArray: [],
            selectionBorderColor: 'rgba(255, 255, 255, 0.3)',
            selectionLineWidth: 1,
            hoverCursor: 'move',
            moveCursor: 'move',
            defaultCursor: 'default',
            freeDrawingCursor: 'crosshair',
            rotationCursor: 'crosshair',
            containerClass: 'canvas-container',
            perPixelTargetFind: !1,
            targetFindTolerance: 0,
            skipTargetFind: !1,
            _initInteractive: function() {
                this._currentTransform = null,
                    this._groupSelector = null,
                    this._initWrapperElement(),
                    this._createUpperCanvas(),
                    this._initEventListeners(),
                    this.freeDrawingBrush = fabric.PencilBrush && new fabric.PencilBrush(this),
                    this.calcOffset()
            },
            _resetCurrentTransform: function(t) {
                var e = this._currentTransform;
                e.target.set({
                    scaleX: e.original.scaleX,
                    scaleY: e.original.scaleY,
                    left: e.original.left,
                    top: e.original.top
                }),
                    this._shouldCenterTransform(t, e.target) ? 'rotate' === e.action ? this._setOriginToCenter(e.target) : ('center' !== e.originX && (e.mouseXSign = 'right' === e.originX ? -1 : 1), 'center' !== e.originY && (e.mouseYSign = 'bottom' === e.originY ? -1 : 1), e.originX = 'center', e.originY = 'center') : (e.originX = e.original.originX, e.originY = e.original.originY)
            },
            containsPoint: function(t, e) {
                var i = this.getPointer(t, !0),
                    r = this._normalizePointer(e, i);
                return e.containsPoint(r) || e._findTargetCorner(i)
            },
            _normalizePointer: function(t, e) {
                var i,
                    r = this.getActiveGroup(),
                    s = e.x,
                    n = e.y,
                    o = r && 'group' !== t.type && r.contains(t);
                return o && (i = new fabric.Point(r.left, r.top), i = fabric.util.transformPoint(i, this.viewportTransform, !0), s -= i.x, n -= i.y), {
                    x: s,
                    y: n
                }
            },
            isTargetTransparent: function(t, e, i) {
                var r = t.hasBorders,
                    s = t.transparentCorners;
                t.hasBorders = t.transparentCorners = !1,
                    this._draw(this.contextCache, t),
                    t.hasBorders = r,
                    t.transparentCorners = s;
                var n = fabric.util.isTransparent(this.contextCache, e, i, this.targetFindTolerance);
                return this.clearContext(this.contextCache),
                    n
            },
            _shouldClearSelection: function(t, e) {
                var i = this.getActiveGroup(),
                    r = this.getActiveObject();
                return !e || e && i && !i.contains(e) && i !== e && !t.shiftKey || e && !e.evented || e && !e.selectable && r && r !== e
            },
            _shouldCenterTransform: function(t, e) {
                if (e) {
                    var i,
                        r = this._currentTransform;
                    return 'scale' === r.action || 'scaleX' === r.action || 'scaleY' === r.action ? i = this.centeredScaling || e.centeredScaling : 'rotate' === r.action && (i = this.centeredRotation || e.centeredRotation),
                        i ? !t.altKey : t.altKey
                }
            },
            _getOriginFromCorner: function(t, e) {
                var i = {
                    x: t.originX,
                    y: t.originY
                };
                return 'ml' === e || 'tl' === e || 'bl' === e ? i.x = 'right' : ('mr' === e || 'tr' === e || 'br' === e) && (i.x = 'left'),
                    'tl' === e || 'mt' === e || 'tr' === e ? i.y = 'bottom' : ('bl' === e || 'mb' === e || 'br' === e) && (i.y = 'top'),
                    i
            },
            _getActionFromCorner: function(t, e) {
                var i = 'drag';
                return e && (i = 'ml' === e || 'mr' === e ? 'scaleX' : 'mt' === e || 'mb' === e ? 'scaleY' : 'mtr' === e ? 'rotate' : 'scale'),
                    i
            },
            _setupCurrentTransform: function(t, i) {
                if (i) {
                    var r = this.getPointer(t),
                        s = i._findTargetCorner(this.getPointer(t, !0)),
                        n = this._getActionFromCorner(i, s),
                        o = this._getOriginFromCorner(i, s);
                    this._currentTransform = {
                        target: i,
                        action: n,
                        scaleX: i.scaleX,
                        scaleY: i.scaleY,
                        offsetX: r.x - i.left,
                        offsetY: r.y - i.top,
                        originX: o.x,
                        originY: o.y,
                        ex: r.x,
                        ey: r.y,
                        left: i.left,
                        top: i.top,
                        theta: e(i.angle),
                        width: i.width * i.scaleX,
                        mouseXSign: 1,
                        mouseYSign: 1
                    },
                        this._currentTransform.original = {
                            left: i.left,
                            top: i.top,
                            scaleX: i.scaleX,
                            scaleY: i.scaleY,
                            originX: o.x,
                            originY: o.y
                        },
                        this._resetCurrentTransform(t)
                }
            },
            _translateObject: function(t, e) {
                var i = this._currentTransform.target;
                i.get('lockMovementX') || i.set('left', t - this._currentTransform.offsetX),
                i.get('lockMovementY') || i.set('top', e - this._currentTransform.offsetY)
            },
            _scaleObject: function(t, e, i) {
                var r = this._currentTransform,
                    s = r.target,
                    n = s.get('lockScalingX'),
                    o = s.get('lockScalingY'),
                    a = s.get('lockScalingFlip');
                if (!n || !o) {
                    var h = s.translateToOriginPoint(s.getCenterPoint(), r.originX, r.originY),
                        c = s.toLocalPoint(new fabric.Point(t, e), r.originX, r.originY);
                    this._setLocalMouse(c, r),
                        this._setObjectScale(c, r, n, o, i, a),
                        s.setPositionByOrigin(h, r.originX, r.originY)
                }
            },
            _setObjectScale: function(t, e, i, r, s, n) {
                var o = e.target,
                    a = !1,
                    h = !1,
                    c = o.stroke ? o.strokeWidth : 0;
                e.newScaleX = t.x / (o.width + c / 2),
                    e.newScaleY = t.y / (o.height + c / 2),
                n && e.newScaleX <= 0 && e.newScaleX < o.scaleX && (a = !0),
                n && e.newScaleY <= 0 && e.newScaleY < o.scaleY && (h = !0),
                    'equally' !== s || i || r ? s ? 'x' !== s || o.get('lockUniScaling') ? 'y' !== s || o.get('lockUniScaling') || h || r || o.set('scaleY', e.newScaleY) : a || i || o.set('scaleX', e.newScaleX) : (a || i || o.set('scaleX', e.newScaleX), h || r || o.set('scaleY', e.newScaleY)) : a || h || this._scaleObjectEqually(t, o, e),
                a || h || this._flipObject(e, s)
            },
            _scaleObjectEqually: function(t, e, i) {
                var r = t.y + t.x,
                    s = e.stroke ? e.strokeWidth : 0,
                    n = (e.height + s / 2) * i.original.scaleY + (e.width + s / 2) * i.original.scaleX;
                i.newScaleX = i.original.scaleX * r / n,
                    i.newScaleY = i.original.scaleY * r / n,
                    e.set('scaleX', i.newScaleX),
                    e.set('scaleY', i.newScaleY)
            },
            _flipObject: function(t, e) {
                t.newScaleX < 0 && 'y' !== e && ('left' === t.originX ? t.originX = 'right' : 'right' === t.originX && (t.originX = 'left')),
                t.newScaleY < 0 && 'x' !== e && ('top' === t.originY ? t.originY = 'bottom' : 'bottom' === t.originY && (t.originY = 'top'))
            },
            _setLocalMouse: function(t, e) {
                var i = e.target;
                'right' === e.originX ? t.x *= -1 : 'center' === e.originX && (t.x *= 2 * e.mouseXSign, t.x < 0 && (e.mouseXSign = -e.mouseXSign)),
                    'bottom' === e.originY ? t.y *= -1 : 'center' === e.originY && (t.y *= 2 * e.mouseYSign, t.y < 0 && (e.mouseYSign = -e.mouseYSign)),
                    s(t.x) > i.padding ? t.x < 0 ? t.x += i.padding : t.x -= i.padding : t.x = 0,
                    s(t.y) > i.padding ? t.y < 0 ? t.y += i.padding : t.y -= i.padding : t.y = 0
            },
            _rotateObject: function(t, e) {
                var s = this._currentTransform;
                if (!s.target.get('lockRotation')) {
                    var n = r(s.ey - s.top, s.ex - s.left),
                        o = r(e - s.top, t - s.left),
                        a = i(o - n + s.theta);
                    0 > a && (a = 360 + a),
                        s.target.angle = a % 360
                }
            },
            setCursor: function(t) {
                this.upperCanvasEl.style.cursor = t
            },
            _resetObjectTransform: function(t) {
                t.scaleX = 1,
                    t.scaleY = 1,
                    t.setAngle(0)
            },
            _drawSelection: function() {
                var t = this.contextTop,
                    e = this._groupSelector,
                    i = e.left,
                    r = e.top,
                    o = s(i),
                    a = s(r);
                if (t.fillStyle = this.selectionColor, t.fillRect(e.ex - (i > 0 ? 0 : -i), e.ey - (r > 0 ? 0 : -r), o, a), t.lineWidth = this.selectionLineWidth, t.strokeStyle = this.selectionBorderColor, this.selectionDashArray.length > 1) {
                    var h = e.ex + n - (i > 0 ? 0 : o),
                        c = e.ey + n - (r > 0 ? 0 : a);
                    t.beginPath(),
                        fabric.util.drawDashedLine(t, h, c, h + o, c, this.selectionDashArray),
                        fabric.util.drawDashedLine(t, h, c + a - 1, h + o, c + a - 1, this.selectionDashArray),
                        fabric.util.drawDashedLine(t, h, c, h, c + a, this.selectionDashArray),
                        fabric.util.drawDashedLine(t, h + o - 1, c, h + o - 1, c + a, this.selectionDashArray),
                        t.closePath(),
                        t.stroke()
                } else t.strokeRect(e.ex + n - (i > 0 ? 0 : o), e.ey + n - (r > 0 ? 0 : a), o, a)
            },
            _isLastRenderedObject: function(t) {
                return this.controlsAboveOverlay && this.lastRenderedObjectWithControlsAboveOverlay && this.lastRenderedObjectWithControlsAboveOverlay.visible && this.containsPoint(t, this.lastRenderedObjectWithControlsAboveOverlay) && this.lastRenderedObjectWithControlsAboveOverlay._findTargetCorner(this.getPointer(t, !0))
            },
            findTarget: function(t, e) {
                if (!this.skipTargetFind) {
                    if (this._isLastRenderedObject(t)) return this.lastRenderedObjectWithControlsAboveOverlay;
                    var i = this.getActiveGroup();
                    if (i && !e && this.containsPoint(t, i)) return i;
                    var r = this._searchPossibleTargets(t);
                    return this._fireOverOutEvents(r),
                        r
                }
            },
            _fireOverOutEvents: function(t) {
                t ? this._hoveredTarget !== t && (this.fire('mouse:over', {
                    target: t
                }), t.fire('mouseover'), this._hoveredTarget && (this.fire('mouse:out', {
                    target: this._hoveredTarget
                }), this._hoveredTarget.fire('mouseout')), this._hoveredTarget = t) : this._hoveredTarget && (this.fire('mouse:out', {
                    target: this._hoveredTarget
                }), this._hoveredTarget.fire('mouseout'), this._hoveredTarget = null)
            },
            _checkTarget: function(t, e, i) {
                if (e && e.visible && e.evented && this.containsPoint(t, e)) {
                    if (!this.perPixelTargetFind && !e.perPixelTargetFind || e.isEditing) return !0;
                    var r = this.isTargetTransparent(e, i.x, i.y);
                    if (!r) return !0
                }
            },
            _searchPossibleTargets: function(t) {
                for (var e, i = this.getPointer(t, !0), r = this._objects.length; r--;)
                    if (this._checkTarget(t, this._objects[r], i)) {
                        this.relatedTarget = this._objects[r],
                            e = this._objects[r];
                        break
                    }
                return e
            },
            getPointer: function(e, i, r) {
                r || (r = this.upperCanvasEl);
                var s,
                    n = t(e, r),
                    o = r.getBoundingClientRect(),
                    a = o.width || 0,
                    h = o.height || 0;
                return a && h || ('top' in o && 'bottom' in o && (h = Math.abs(o.top - o.bottom)), 'right' in o && 'left' in o && (a = Math.abs(o.right - o.left))),
                    this.calcOffset(),
                    n.x = n.x - this._offset.left,
                    n.y = n.y - this._offset.top,
                i || (n = fabric.util.transformPoint(n, fabric.util.invertTransform(this.viewportTransform))),
                    s = 0 === a || 0 === h ? {
                        width: 1,
                        height: 1
                    } : {
                        width: r.width / a,
                        height: r.height / h
                    }, {
                    x: n.x * s.width,
                    y: n.y * s.height
                }
            },
            _createUpperCanvas: function() {
                var t = this.lowerCanvasEl.className.replace(/\s*lower-canvas\s*/, '');
                this.upperCanvasEl = this._createCanvasElement(),
                    fabric.util.addClass(this.upperCanvasEl, 'upper-canvas ' + t),
                    this.wrapperEl.appendChild(this.upperCanvasEl),
                    this._copyCanvasStyle(this.lowerCanvasEl, this.upperCanvasEl),
                    this._applyCanvasStyle(this.upperCanvasEl),
                    this.contextTop = this.upperCanvasEl.getContext('2d')
            },
            _createCacheCanvas: function() {
                this.cacheCanvasEl = this._createCanvasElement(),
                    this.cacheCanvasEl.setAttribute('width', this.width),
                    this.cacheCanvasEl.setAttribute('height', this.height),
                    this.contextCache = this.cacheCanvasEl.getContext('2d')
            },
            _initWrapperElement: function() {
                this.wrapperEl = fabric.util.wrapElement(this.lowerCanvasEl, 'div', {
                    'class': this.containerClass
                }),
                    fabric.util.setStyle(this.wrapperEl, {
                        width: this.getWidth() + 'px',
                        height: this.getHeight() + 'px',
                        position: 'relative'
                    }),
                    fabric.util.makeElementUnselectable(this.wrapperEl)
            },
            _applyCanvasStyle: function(t) {
                var e = this.getWidth() || t.width,
                    i = this.getHeight() || t.height;
                fabric.util.setStyle(t, {
                    position: 'absolute',
                    width: e + 'px',
                    height: i + 'px',
                    left: 0,
                    top: 0
                }),
                    t.width = e,
                    t.height = i,
                    fabric.util.makeElementUnselectable(t)
            },
            _copyCanvasStyle: function(t, e) {
                e.style.cssText = t.style.cssText
            },
            getSelectionContext: function() {
                return this.contextTop
            },
            getSelectionElement: function() {
                return this.upperCanvasEl
            },
            _setActiveObject: function(t) {
                this._activeObject && this._activeObject.set('active', !1),
                    this._activeObject = t,
                    t.set('active', !0)
            },
            setActiveObject: function(t, e) {
                return this._setActiveObject(t),
                    this.renderAll(),
                    this.fire('object:selected', {
                        target: t,
                        e: e
                    }),
                    t.fire('selected', {
                        e: e
                    }),
                    this
            },
            getActiveObject: function() {
                return this._activeObject
            },
            _discardActiveObject: function() {
                this._activeObject && this._activeObject.set('active', !1),
                    this._activeObject = null
            },
            discardActiveObject: function(t) {
                return this._discardActiveObject(),
                    this.renderAll(),
                    this.fire('selection:cleared', {
                        e: t
                    }),
                    this
            },
            _setActiveGroup: function(t) {
                this._activeGroup = t,
                t && t.set('active', !0)
            },
            setActiveGroup: function(t, e) {
                return this._setActiveGroup(t),
                t && (this.fire('object:selected', {
                    target: t,
                    e: e
                }), t.fire('selected', {
                    e: e
                })),
                    this
            },
            getActiveGroup: function() {
                return this._activeGroup
            },
            _discardActiveGroup: function() {
                var t = this.getActiveGroup();
                t && t.destroy(),
                    this.setActiveGroup(null)
            },
            discardActiveGroup: function(t) {
                return this._discardActiveGroup(),
                    this.fire('selection:cleared', {
                        e: t
                    }),
                    this
            },
            deactivateAll: function() {
                for (var t = this.getObjects(), e = 0, i = t.length; i > e; e++) t[e].set('active', !1);
                return this._discardActiveGroup(),
                    this._discardActiveObject(),
                    this
            },
            deactivateAllWithDispatch: function(t) {
                var e = this.getActiveGroup() || this.getActiveObject();
                return e && this.fire('before:selection:cleared', {
                    target: e,
                    e: t
                }),
                    this.deactivateAll(),
                e && this.fire('selection:cleared', {
                    e: t
                }),
                    this
            },
            drawControls: function(t) {
                var e = this.getActiveGroup();
                e ? this._drawGroupControls(t, e) : this._drawObjectsControls(t)
            },
            _drawGroupControls: function(t, e) {
                e._renderControls(t)
            },
            _drawObjectsControls: function(t) {
                for (var e = 0, i = this._objects.length; i > e; ++e) this._objects[e] && this._objects[e].active && (this._objects[e]._renderControls(t), this.lastRenderedObjectWithControlsAboveOverlay = this._objects[e])
            }
        });
        for (var o in fabric.StaticCanvas) 'prototype' !== o && (fabric.Canvas[o] = fabric.StaticCanvas[o]);
        fabric.isTouchSupported && (fabric.Canvas.prototype._setCursorFromEvent = function() {}),
            fabric.Element = fabric.Canvas
    }(),
    function() {
        var t = {
                mt: 0,
                tr: 1,
                mr: 2,
                br: 3,
                mb: 4,
                bl: 5,
                ml: 6,
                tl: 7
            },
            e = fabric.util.addListener,
            i = fabric.util.removeListener;
        fabric.util.object.extend(fabric.Canvas.prototype, {
            cursorMap: [
                'n-resize',
                'ne-resize',
                'e-resize',
                'se-resize',
                's-resize',
                'sw-resize',
                'w-resize',
                'nw-resize'
            ],
            _initEventListeners: function() {
                this._bindEvents(),
                    e(fabric.window, 'resize', this._onResize),
                    e(this.upperCanvasEl, 'mousedown', this._onMouseDown),
                    e(this.upperCanvasEl, 'mousemove', this._onMouseMove),
                    e(this.upperCanvasEl, 'mousewheel', this._onMouseWheel),
                    e(this.upperCanvasEl, 'touchstart', this._onMouseDown),
                    e(this.upperCanvasEl, 'touchmove', this._onMouseMove),
                'undefined' != typeof Event && 'add' in Event && (Event.add(this.upperCanvasEl, 'gesture', this._onGesture), Event.add(this.upperCanvasEl, 'drag', this._onDrag), Event.add(this.upperCanvasEl, 'orientation', this._onOrientationChange), Event.add(this.upperCanvasEl, 'shake', this._onShake))
            },
            _bindEvents: function() {
                this._onMouseDown = this._onMouseDown.bind(this),
                    this._onMouseMove = this._onMouseMove.bind(this),
                    this._onMouseUp = this._onMouseUp.bind(this),
                    this._onResize = this._onResize.bind(this),
                    this._onGesture = this._onGesture.bind(this),
                    this._onDrag = this._onDrag.bind(this),
                    this._onShake = this._onShake.bind(this),
                    this._onOrientationChange = this._onOrientationChange.bind(this),
                    this._onMouseWheel = this._onMouseWheel.bind(this)
            },
            removeListeners: function() {
                i(fabric.window, 'resize', this._onResize),
                    i(this.upperCanvasEl, 'mousedown', this._onMouseDown),
                    i(this.upperCanvasEl, 'mousemove', this._onMouseMove),
                    i(this.upperCanvasEl, 'mousewheel', this._onMouseWheel),
                    i(this.upperCanvasEl, 'touchstart', this._onMouseDown),
                    i(this.upperCanvasEl, 'touchmove', this._onMouseMove),
                'undefined' != typeof Event && 'remove' in Event && (Event.remove(this.upperCanvasEl, 'gesture', this._onGesture), Event.remove(this.upperCanvasEl, 'drag', this._onDrag), Event.remove(this.upperCanvasEl, 'orientation', this._onOrientationChange), Event.remove(this.upperCanvasEl, 'shake', this._onShake))
            },
            _onGesture: function(t, e) {
                this.__onTransformGesture && this.__onTransformGesture(t, e)
            },
            _onDrag: function(t, e) {
                this.__onDrag && this.__onDrag(t, e)
            },
            _onMouseWheel: function(t, e) {
                this.__onMouseWheel && this.__onMouseWheel(t, e)
            },
            _onOrientationChange: function(t, e) {
                this.__onOrientationChange && this.__onOrientationChange(t, e)
            },
            _onShake: function(t, e) {
                this.__onShake && this.__onShake(t, e)
            },
            _onMouseDown: function(t) {
                this.__onMouseDown(t),
                    e(fabric.document, 'touchend', this._onMouseUp),
                    e(fabric.document, 'touchmove', this._onMouseMove),
                    i(this.upperCanvasEl, 'mousemove', this._onMouseMove),
                    i(this.upperCanvasEl, 'touchmove', this._onMouseMove),
                    'touchstart' === t.type ? i(this.upperCanvasEl, 'mousedown', this._onMouseDown) : (e(fabric.document, 'mouseup', this._onMouseUp), e(fabric.document, 'mousemove', this._onMouseMove))
            },
            _onMouseUp: function(t) {
                if (this.__onMouseUp(t), i(fabric.document, 'mouseup', this._onMouseUp), i(fabric.document, 'touchend', this._onMouseUp), i(fabric.document, 'mousemove', this._onMouseMove), i(fabric.document, 'touchmove', this._onMouseMove), e(this.upperCanvasEl, 'mousemove', this._onMouseMove), e(this.upperCanvasEl, 'touchmove', this._onMouseMove), 'touchend' === t.type) {
                    var r = this;
                    setTimeout(function() {
                        e(r.upperCanvasEl, 'mousedown', r._onMouseDown)
                    }, 400)
                }
            },
            _onMouseMove: function(t) {
                !this.allowTouchScrolling && t.preventDefault && t.preventDefault(),
                    this.__onMouseMove(t)
            },
            _onResize: function() {
                this.calcOffset()
            },
            _shouldRender: function(t, e) {
                var i = this.getActiveGroup() || this.getActiveObject();
                return !!(t && (t.isMoving || t !== i) || !t && i || !t && !i && !this._groupSelector || e && this._previousPointer && this.selection && (e.x !== this._previousPointer.x || e.y !== this._previousPointer.y))
            },
            __onMouseUp: function(t) {
                var e;
                if (this.isDrawingMode && this._isCurrentlyDrawing) return void this._onMouseUpInDrawingMode(t);
                this._currentTransform ? (this._finalizeCurrentTransform(), e = this._currentTransform.target) : e = this.findTarget(t, !0);
                var i = this._shouldRender(e, this.getPointer(t));
                this._maybeGroupObjects(t),
                e && (e.isMoving = !1),
                i && this.renderAll(),
                    this._handleCursorAndEvent(t, e)
            },
            _handleCursorAndEvent: function(t, e) {
                this._setCursorFromEvent(t, e);
                var i = this;
                setTimeout(function() {
                    i._setCursorFromEvent(t, e)
                }, 50),
                    this.fire('mouse:up', {
                        target: e,
                        e: t
                    }),
                e && e.fire('mouseup', {
                    e: t
                })
            },
            _finalizeCurrentTransform: function() {
                var t = this._currentTransform,
                    e = t.target;
                e._scaling && (e._scaling = !1),
                    e.setCoords(),
                this.stateful && e.hasStateChanged() && (this.fire('object:modified', {
                    target: e
                }), e.fire('modified')),
                    this._restoreOriginXY(e)
            },
            _restoreOriginXY: function(t) {
                if (this._previousOriginX && this._previousOriginY) {
                    var e = t.translateToOriginPoint(t.getCenterPoint(), this._previousOriginX, this._previousOriginY);
                    t.originX = this._previousOriginX,
                        t.originY = this._previousOriginY,
                        t.left = e.x,
                        t.top = e.y,
                        this._previousOriginX = null,
                        this._previousOriginY = null
                }
            },
            _onMouseDownInDrawingMode: function(t) {
                this._isCurrentlyDrawing = !0,
                    this.discardActiveObject(t).renderAll(),
                this.clipTo && fabric.util.clipContext(this, this.contextTop);
                var e = fabric.util.invertTransform(this.viewportTransform),
                    i = fabric.util.transformPoint(this.getPointer(t, !0), e);
                this.freeDrawingBrush.onMouseDown(i),
                    this.fire('mouse:down', {
                        e: t
                    })
            },
            _onMouseMoveInDrawingMode: function(t) {
                if (this._isCurrentlyDrawing) {
                    var e = fabric.util.invertTransform(this.viewportTransform),
                        i = fabric.util.transformPoint(this.getPointer(t, !0), e);
                    this.freeDrawingBrush.onMouseMove(i)
                }
                this.setCursor(this.freeDrawingCursor),
                    this.fire('mouse:move', {
                        e: t
                    })
            },
            _onMouseUpInDrawingMode: function(t) {
                this._isCurrentlyDrawing = !1,
                this.clipTo && this.contextTop.restore(),
                    this.freeDrawingBrush.onMouseUp(),
                    this.fire('mouse:up', {
                        e: t
                    })
            },
            __onMouseDown: function(t) {
                var e = 'which' in t ? 1 === t.which : 1 === t.button;
                if (e || fabric.isTouchSupported) {
                    if (this.isDrawingMode) return void this._onMouseDownInDrawingMode(t);
                    if (!this._currentTransform) {
                        var i = this.findTarget(t),
                            r = this.getPointer(t, !0);
                        this._previousPointer = r;
                        var s = this._shouldRender(i, r),
                            n = this._shouldGroup(t, i);
                        this._shouldClearSelection(t, i) ? this._clearSelection(t, i, r) : n && (this._handleGrouping(t, i), i = this.getActiveGroup()),
                        i && i.selectable && !n && (this._beforeTransform(t, i), this._setupCurrentTransform(t, i)),
                        s && this.renderAll(),
                            this.fire('mouse:down', {
                                target: i,
                                e: t
                            }),
                        i && i.fire('mousedown', {
                            e: t
                        })
                    }
                }
            },
            _beforeTransform: function(t, e) {
                var i;
                this.stateful && e.saveState(), (i = e._findTargetCorner(this.getPointer(t))) && this.onBeforeScaleRotate(e),
                e !== this.getActiveGroup() && e !== this.getActiveObject() && (this.deactivateAll(), this.setActiveObject(e, t))
            },
            _clearSelection: function(t, e, i) {
                this.deactivateAllWithDispatch(t),
                    e && e.selectable ? this.setActiveObject(e, t) : this.selection && (this._groupSelector = {
                        ex: i.x,
                        ey: i.y,
                        top: 0,
                        left: 0
                    })
            },
            _setOriginToCenter: function(t) {
                this._previousOriginX = this._currentTransform.target.originX,
                    this._previousOriginY = this._currentTransform.target.originY;
                var e = t.getCenterPoint();
                t.originX = 'center',
                    t.originY = 'center',
                    t.left = e.x,
                    t.top = e.y,
                    this._currentTransform.left = t.left,
                    this._currentTransform.top = t.top
            },
            _setCenterToOrigin: function(t) {
                var e = t.translateToOriginPoint(t.getCenterPoint(), this._previousOriginX, this._previousOriginY);
                t.originX = this._previousOriginX,
                    t.originY = this._previousOriginY,
                    t.left = e.x,
                    t.top = e.y,
                    this._previousOriginX = null,
                    this._previousOriginY = null
            },
            __onMouseMove: function(t) {
                var e,
                    i;
                if (this.isDrawingMode) return void this._onMouseMoveInDrawingMode(t);
                var r = this._groupSelector;
                r ? (i = this.getPointer(t, !0), r.left = i.x - r.ex, r.top = i.y - r.ey, this.renderTop()) : this._currentTransform ? this._transformObject(t) : (e = this.findTarget(t), !e || e && !e.selectable ? this.setCursor(this.defaultCursor) : this._setCursorFromEvent(t, e)),
                    this.fire('mouse:move', {
                        target: e,
                        e: t
                    }),
                e && e.fire('mousemove', {
                    e: t
                })
            },
            _transformObject: function(t) {
                var e = this.getPointer(t),
                    i = this._currentTransform;
                i.reset = !1,
                    i.target.isMoving = !0,
                    this._beforeScaleTransform(t, i),
                    this._performTransformAction(t, i, e),
                    this.renderAll()
            },
            _performTransformAction: function(t, e, i) {
                var r = i.x,
                    s = i.y,
                    n = e.target,
                    o = e.action;
                'rotate' === o ? (this._rotateObject(r, s), this._fire('rotating', n, t)) : 'scale' === o ? (this._onScale(t, e, r, s), this._fire('scaling', n, t)) : 'scaleX' === o ? (this._scaleObject(r, s, 'x'), this._fire('scaling', n, t)) : 'scaleY' === o ? (this._scaleObject(r, s, 'y'), this._fire('scaling', n, t)) : (this._translateObject(r, s), this._fire('moving', n, t), this.setCursor(this.moveCursor))
            },
            _fire: function(t, e, i) {
                this.fire('object:' + t, {
                    target: e,
                    e: i
                }),
                    e.fire(t, {
                        e: i
                    })
            },
            _beforeScaleTransform: function(t, e) {
                if ('scale' === e.action || 'scaleX' === e.action || 'scaleY' === e.action) {
                    var i = this._shouldCenterTransform(t, e.target);
                    (i && ('center' !== e.originX || 'center' !== e.originY) || !i && 'center' === e.originX && 'center' === e.originY) && (this._resetCurrentTransform(t), e.reset = !0)
                }
            },
            _onScale: function(t, e, i, r) {
                !t.shiftKey && !this.uniScaleTransform || e.target.get('lockUniScaling') ? (e.reset || 'scale' !== e.currentAction || this._resetCurrentTransform(t, e.target), e.currentAction = 'scaleEqually', this._scaleObject(i, r, 'equally')) : (e.currentAction = 'scale', this._scaleObject(i, r))
            },
            _setCursorFromEvent: function(t, e) {
                if (!e || !e.selectable) return this.setCursor(this.defaultCursor), !1;
                var i = this.getActiveGroup(),
                    r = e._findTargetCorner && (!i || !i.contains(e)) && e._findTargetCorner(this.getPointer(t, !0));
                return r ? this._setCornerCursor(r, e) : this.setCursor(e.hoverCursor || this.hoverCursor), !0
            },
            _setCornerCursor: function(e, i) {
                if (e in t) this.setCursor(this._getRotatedCornerCursor(e, i));
                else {
                    if ('mtr' !== e || !i.hasRotatingPoint) return this.setCursor(this.defaultCursor), !1;
                    this.setCursor(this.rotationCursor)
                }
            },
            _getRotatedCornerCursor: function(e, i) {
                var r = Math.round(i.getAngle() % 360 / 45);
                return 0 > r && (r += 8),
                    r += t[e],
                    r %= 8,
                    this.cursorMap[r]
            }
        })
    }(),
    function() {
        var t = Math.min,
            e = Math.max;
        fabric.util.object.extend(fabric.Canvas.prototype, {
            _shouldGroup: function(t, e) {
                var i = this.getActiveObject();
                return t.shiftKey && (this.getActiveGroup() || i && i !== e) && this.selection
            },
            _handleGrouping: function(t, e) {
                (e !== this.getActiveGroup() || (e = this.findTarget(t, !0), e && !e.isType('group'))) && (this.getActiveGroup() ? this._updateActiveGroup(e, t) : this._createActiveGroup(e, t), this._activeGroup && this._activeGroup.saveCoords())
            },
            _updateActiveGroup: function(t, e) {
                var i = this.getActiveGroup();
                if (i.contains(t)) {
                    if (i.removeWithUpdate(t), this._resetObjectTransform(i), t.set('active', !1), 1 === i.size()) return this.discardActiveGroup(e),
                        void this.setActiveObject(i.item(0))
                } else i.addWithUpdate(t),
                    this._resetObjectTransform(i);
                this.fire('selection:created', {
                    target: i,
                    e: e
                }),
                    i.set('active', !0)
            },
            _createActiveGroup: function(t, e) {
                if (this._activeObject && t !== this._activeObject) {
                    var i = this._createGroup(t);
                    i.addWithUpdate(),
                        this.setActiveGroup(i),
                        this._activeObject = null,
                        this.fire('selection:created', {
                            target: i,
                            e: e
                        })
                }
                t.set('active', !0)
            },
            _createGroup: function(t) {
                var e = this.getObjects(),
                    i = e.indexOf(this._activeObject) < e.indexOf(t),
                    r = i ? [
                        this._activeObject,
                        t
                    ] : [
                        t,
                        this._activeObject
                    ];
                return new fabric.Group(r, {
                    canvas: this
                })
            },
            _groupSelectedObjects: function(t) {
                var e = this._collectObjects();
                1 === e.length ? this.setActiveObject(e[0], t) : e.length > 1 && (e = new fabric.Group(e.reverse(), {
                    canvas: this
                }), e.addWithUpdate(), this.setActiveGroup(e, t), e.saveCoords(), this.fire('selection:created', {
                    target: e
                }), this.renderAll())
            },
            _collectObjects: function() {
                for (var i, r = [], s = this._groupSelector.ex, n = this._groupSelector.ey, o = s + this._groupSelector.left, a = n + this._groupSelector.top, h = new fabric.Point(t(s, o), t(n, a)), c = new fabric.Point(e(s, o), e(n, a)), l = s === o && n === a, u = this._objects.length; u-- && (i = this._objects[u], !(i && i.selectable && i.visible && (i.intersectsWithRect(h, c) || i.isContainedWithinRect(h, c) || i.containsPoint(h) || i.containsPoint(c)) && (i.set('active', !0), r.push(i), l))););
                return r
            },
            _maybeGroupObjects: function(t) {
                this.selection && this._groupSelector && this._groupSelectedObjects(t);
                var e = this.getActiveGroup();
                e && (e.setObjectsCoords().setCoords(), e.isMoving = !1, this.setCursor(this.defaultCursor)),
                    this._groupSelector = null,
                    this._currentTransform = null
            }
        })
    }(),
    fabric.util.object.extend(fabric.StaticCanvas.prototype, {
        toDataURL: function(t) {
            t || (t = {});
            var e = t.format || 'png',
                i = t.quality || 1,
                r = t.multiplier || 1,
                s = {
                    left: t.left,
                    top: t.top,
                    width: t.width,
                    height: t.height
                };
            return 1 !== r ? this.__toDataURLWithMultiplier(e, i, s, r) : this.__toDataURL(e, i, s)
        },
        __toDataURL: function(t, e, i) {
            this.renderAll(!0);
            var r = this.upperCanvasEl || this.lowerCanvasEl,
                s = this.__getCroppedCanvas(r, i);
            'jpg' === t && (t = 'jpeg');
            var n = fabric.StaticCanvas.supports('toDataURLWithQuality') ? (s || r).toDataURL('image/' + t, e) : (s || r).toDataURL('image/' + t);
            return this.contextTop && this.clearContext(this.contextTop),
                this.renderAll(),
            s && (s = null),
                n
        },
        __getCroppedCanvas: function(t, e) {
            var i,
                r,
                s = 'left' in e || 'top' in e || 'width' in e || 'height' in e;
            return s && (i = fabric.util.createCanvasElement(), r = i.getContext('2d'), i.width = e.width || this.width, i.height = e.height || this.height, r.drawImage(t, -e.left || 0, -e.top || 0)),
                i
        },
        __toDataURLWithMultiplier: function(t, e, i, r) {
            var s = this.getWidth(),
                n = this.getHeight(),
                o = s * r,
                a = n * r,
                h = this.getActiveObject(),
                c = this.getActiveGroup(),
                l = this.contextTop || this.contextContainer;
            r > 1 && this.setWidth(o).setHeight(a),
                l.scale(r, r),
            i.left && (i.left *= r),
            i.top && (i.top *= r),
                i.width ? i.width *= r : 1 > r && (i.width = o),
                i.height ? i.height *= r : 1 > r && (i.height = a),
                c ? this._tempRemoveBordersControlsFromGroup(c) : h && this.deactivateAll && this.deactivateAll(),
                this.renderAll(!0);
            var u = this.__toDataURL(t, e, i);
            return this.width = s,
                this.height = n,
                l.scale(1 / r, 1 / r),
                this.setWidth(s).setHeight(n),
                c ? this._restoreBordersControlsOnGroup(c) : h && this.setActiveObject && this.setActiveObject(h),
            this.contextTop && this.clearContext(this.contextTop),
                this.renderAll(),
                u
        },
        toDataURLWithMultiplier: function(t, e, i) {
            return this.toDataURL({
                format: t,
                multiplier: e,
                quality: i
            })
        },
        _tempRemoveBordersControlsFromGroup: function(t) {
            t.origHasControls = t.hasControls,
                t.origBorderColor = t.borderColor,
                t.hasControls = !0,
                t.borderColor = 'rgba(0,0,0,0)',
                t.forEachObject(function(t) {
                    t.origBorderColor = t.borderColor,
                        t.borderColor = 'rgba(0,0,0,0)'
                })
        },
        _restoreBordersControlsOnGroup: function(t) {
            t.hideControls = t.origHideControls,
                t.borderColor = t.origBorderColor,
                t.forEachObject(function(t) {
                    t.borderColor = t.origBorderColor,
                        delete t.origBorderColor
                })
        }
    }),
    function(t) {
        'use strict';
        var e = t.fabric || (t.fabric = {}),
            i = e.util.object.extend,
            r = e.util.toFixed,
            s = e.util.string.capitalize,
            n = e.util.degreesToRadians,
            o = e.StaticCanvas.supports('setLineDash');
        e.Object || (e.Object = e.util.createClass({
            type: 'object',
            originX: 'left',
            originY: 'top',
            top: 0,
            left: 0,
            width: 0,
            height: 0,
            scaleX: 1,
            scaleY: 1,
            flipX: !1,
            flipY: !1,
            opacity: 1,
            angle: 0,
            cornerSize: 12,
            transparentCorners: !0,
            hoverCursor: null,
            padding: 0,
            borderColor: 'rgba(102,153,255,0.75)',
            cornerColor: 'rgba(102,153,255,0.5)',
            centeredScaling: !1,
            centeredRotation: !0,
            fill: 'rgb(0,0,0)',
            fillRule: 'nonzero',
            globalCompositeOperation: 'source-over',
            backgroundColor: '',
            stroke: null,
            strokeWidth: 1,
            strokeDashArray: null,
            strokeLineCap: 'butt',
            strokeLineJoin: 'miter',
            strokeMiterLimit: 10,
            shadow: null,
            borderOpacityWhenMoving: 0.4,
            borderScaleFactor: 1,
            transformMatrix: null,
            minScaleLimit: 0.01,
            selectable: !0,
            evented: !0,
            visible: !0,
            hasControls: !0,
            hasBorders: !0,
            hasRotatingPoint: !0,
            rotatingPointOffset: 40,
            perPixelTargetFind: !1,
            includeDefaultValues: !0,
            clipTo: null,
            lockMovementX: !1,
            lockMovementY: !1,
            lockRotation: !1,
            lockScalingX: !1,
            lockScalingY: !1,
            lockUniScaling: !1,
            lockScalingFlip: !1,
            stateProperties: 'top left width height scaleX scaleY flipX flipY originX originY transformMatrix stroke strokeWidth strokeDashArray strokeLineCap strokeLineJoin strokeMiterLimit angle opacity fill fillRule globalCompositeOperation shadow clipTo visible backgroundColor'.split(' '),
            initialize: function(t) {
                t && this.setOptions(t)
            },
            _initGradient: function(t) {
                !t.fill || !t.fill.colorStops || t.fill instanceof e.Gradient || this.set('fill', new e.Gradient(t.fill))
            },
            _initPattern: function(t) {
                !t.fill || !t.fill.source || t.fill instanceof e.Pattern || this.set('fill', new e.Pattern(t.fill)), !t.stroke || !t.stroke.source || t.stroke instanceof e.Pattern || this.set('stroke', new e.Pattern(t.stroke))
            },
            _initClipping: function(t) {
                if (t.clipTo && 'string' == typeof t.clipTo) {
                    var i = e.util.getFunctionBody(t.clipTo);
                    'undefined' != typeof i && (this.clipTo = new Function('ctx', i))
                }
            },
            setOptions: function(t) {
                for (var e in t) this.set(e, t[e]);
                this._initGradient(t),
                    this._initPattern(t),
                    this._initClipping(t)
            },
            transform: function(t, e) {
                this.group && this.group.transform(t, e);
                var i = e ? this._getLeftTopCoords() : this.getCenterPoint();
                t.translate(i.x, i.y),
                    t.rotate(n(this.angle)),
                    t.scale(this.scaleX * (this.flipX ? -1 : 1), this.scaleY * (this.flipY ? -1 : 1))
            },
            toObject: function(t) {
                var i = e.Object.NUM_FRACTION_DIGITS,
                    s = {
                        type: this.type,
                        originX: this.originX,
                        originY: this.originY,
                        left: r(this.left, i),
                        top: r(this.top, i),
                        width: r(this.width, i),
                        height: r(this.height, i),
                        fill: this.fill && this.fill.toObject ? this.fill.toObject() : this.fill,
                        stroke: this.stroke && this.stroke.toObject ? this.stroke.toObject() : this.stroke,
                        strokeWidth: r(this.strokeWidth, i),
                        strokeDashArray: this.strokeDashArray,
                        strokeLineCap: this.strokeLineCap,
                        strokeLineJoin: this.strokeLineJoin,
                        strokeMiterLimit: r(this.strokeMiterLimit, i),
                        scaleX: r(this.scaleX, i),
                        scaleY: r(this.scaleY, i),
                        angle: r(this.getAngle(), i),
                        flipX: this.flipX,
                        flipY: this.flipY,
                        opacity: r(this.opacity, i),
                        shadow: this.shadow && this.shadow.toObject ? this.shadow.toObject() : this.shadow,
                        visible: this.visible,
                        clipTo: this.clipTo && String(this.clipTo),
                        backgroundColor: this.backgroundColor,
                        fillRule: this.fillRule,
                        globalCompositeOperation: this.globalCompositeOperation
                    };
                return this.includeDefaultValues || (s = this._removeDefaultValues(s)),
                    e.util.populateWithProperties(this, s, t),
                    s
            },
            toDatalessObject: function(t) {
                return this.toObject(t)
            },
            _removeDefaultValues: function(t) {
                var i = e.util.getKlass(t.type).prototype,
                    r = i.stateProperties;
                return r.forEach(function(e) {
                    t[e] === i[e] && delete t[e]
                }),
                    t
            },
            toString: function() {
                return '#<fabric.' + s(this.type) + '>'
            },
            get: function(t) {
                return this[t]
            },
            _setObject: function(t) {
                for (var e in t) this._set(e, t[e])
            },
            set: function(t, e) {
                return 'object' == typeof t ? this._setObject(t) : 'function' == typeof e && 'clipTo' !== t ? this._set(t, e(this.get(t))) : this._set(t, e),
                    this
            },
            _set: function(t, i) {
                var s = 'scaleX' === t || 'scaleY' === t;
                return s && (i = this._constrainScale(i)),
                    'scaleX' === t && 0 > i ? (this.flipX = !this.flipX, i *= -1) : 'scaleY' === t && 0 > i ? (this.flipY = !this.flipY, i *= -1) : 'width' === t || 'height' === t ? this.minScaleLimit = r(Math.min(0.1, 1 / Math.max(this.width, this.height)), 2) : 'shadow' !== t || !i || i instanceof e.Shadow || (i = new e.Shadow(i)),
                    this[t] = i,
                    this
            },
            toggle: function(t) {
                var e = this.get(t);
                return 'boolean' == typeof e && this.set(t, !e),
                    this
            },
            setSourcePath: function(t) {
                return this.sourcePath = t,
                    this
            },
            getViewportTransform: function() {
                return this.canvas && this.canvas.viewportTransform ? this.canvas.viewportTransform : [
                    1,
                    0,
                    0,
                    1,
                    0,
                    0
                ]
            },
            render: function(t, i) {
                0 !== this.width && 0 !== this.height && this.visible && (t.save(), this._setupCompositeOperation(t), i || this.transform(t), this._setStrokeStyles(t), this._setFillStyles(t), this.group && 'path-group' === this.group.type && t.translate(-this.group.width / 2, -this.group.height / 2), this.transformMatrix && t.transform.apply(t, this.transformMatrix), this._setOpacity(t), this._setShadow(t), this.clipTo && e.util.clipContext(this, t), this._render(t, i), this.clipTo && t.restore(), this._removeShadow(t), this._restoreCompositeOperation(t), t.restore())
            },
            _setOpacity: function(t) {
                this.group && this.group._setOpacity(t),
                    t.globalAlpha *= this.opacity
            },
            _setStrokeStyles: function(t) {
                this.stroke && (t.lineWidth = this.strokeWidth, t.lineCap = this.strokeLineCap, t.lineJoin = this.strokeLineJoin, t.miterLimit = this.strokeMiterLimit, t.strokeStyle = this.stroke.toLive ? this.stroke.toLive(t, this) : this.stroke)
            },
            _setFillStyles: function(t) {
                this.fill && (t.fillStyle = this.fill.toLive ? this.fill.toLive(t, this) : this.fill)
            },
            _renderControls: function(t, i) {
                var r = this.getViewportTransform();
                if (t.save(), this.active && !i) {
                    var s;
                    this.group && (s = e.util.transformPoint(this.group.getCenterPoint(), r), t.translate(s.x, s.y), t.rotate(n(this.group.angle))),
                        s = e.util.transformPoint(this.getCenterPoint(), r, null != this.group),
                    this.group && (s.x *= this.group.scaleX, s.y *= this.group.scaleY),
                        t.translate(s.x, s.y),
                        t.rotate(n(this.angle)),
                        this.drawBorders(t),
                        this.drawControls(t)
                }
                t.restore()
            },
            _setShadow: function(t) {
                this.shadow && (t.shadowColor = this.shadow.color, t.shadowBlur = this.shadow.blur, t.shadowOffsetX = this.shadow.offsetX, t.shadowOffsetY = this.shadow.offsetY)
            },
            _removeShadow: function(t) {
                this.shadow && (t.shadowColor = '', t.shadowBlur = t.shadowOffsetX = t.shadowOffsetY = 0)
            },
            _renderFill: function(t) {
                if (this.fill) {
                    if (t.save(), this.fill.gradientTransform) {
                        var e = this.fill.gradientTransform;
                        t.transform.apply(t, e)
                    }
                    this.fill.toLive && t.translate(-this.width / 2 + this.fill.offsetX || 0, -this.height / 2 + this.fill.offsetY || 0),
                        'evenodd' === this.fillRule ? t.fill('evenodd') : t.fill(),
                        t.restore(),
                    this.shadow && !this.shadow.affectStroke && this._removeShadow(t)
                }
            },
            _renderStroke: function(t) {
                if (this.stroke && 0 !== this.strokeWidth) {
                    if (t.save(), this.strokeDashArray) 1 & this.strokeDashArray.length && this.strokeDashArray.push.apply(this.strokeDashArray, this.strokeDashArray),
                        o ? (t.setLineDash(this.strokeDashArray), this._stroke && this._stroke(t)) : this._renderDashedStroke && this._renderDashedStroke(t),
                        t.stroke();
                    else {
                        if (this.stroke.gradientTransform) {
                            var e = this.stroke.gradientTransform;
                            t.transform.apply(t, e)
                        }
                        this._stroke ? this._stroke(t) : t.stroke()
                    }
                    this._removeShadow(t),
                        t.restore()
                }
            },
            clone: function(t, i) {
                return this.constructor.fromObject ? this.constructor.fromObject(this.toObject(i), t) : new e.Object(this.toObject(i))
            },
            cloneAsImage: function(t) {
                var i = this.toDataURL();
                return e.util.loadImage(i, function(i) {
                    t && t(new e.Image(i))
                }),
                    this
            },
            toDataURL: function(t) {
                t || (t = {});
                var i = e.util.createCanvasElement(),
                    r = this.getBoundingRect();
                i.width = r.width,
                    i.height = r.height,
                    e.util.wrapElement(i, 'div');
                var s = new e.Canvas(i);
                'jpg' === t.format && (t.format = 'jpeg'),
                'jpeg' === t.format && (s.backgroundColor = '#fff');
                var n = {
                    active: this.get('active'),
                    left: this.getLeft(),
                    top: this.getTop()
                };
                this.set('active', !1),
                    this.setPositionByOrigin(new e.Point(i.width / 2, i.height / 2), 'center', 'center');
                var o = this.canvas;
                s.add(this);
                var a = s.toDataURL(t);
                return this.set(n).setCoords(),
                    this.canvas = o,
                    s.dispose(),
                    s = null,
                    a
            },
            isType: function(t) {
                return this.type === t
            },
            complexity: function() {
                return 0
            },
            toJSON: function(t) {
                return this.toObject(t)
            },
            setGradient: function(t, i) {
                i || (i = {});
                var r = {
                    colorStops: []
                };
                r.type = i.type || (i.r1 || i.r2 ? 'radial' : 'linear'),
                    r.coords = {
                        x1: i.x1,
                        y1: i.y1,
                        x2: i.x2,
                        y2: i.y2
                    }, (i.r1 || i.r2) && (r.coords.r1 = i.r1, r.coords.r2 = i.r2);
                for (var s in i.colorStops) {
                    var n = new e.Color(i.colorStops[s]);
                    r.colorStops.push({
                        offset: s,
                        color: n.toRgb(),
                        opacity: n.getAlpha()
                    })
                }
                return this.set(t, e.Gradient.forObject(this, r))
            },
            setPatternFill: function(t) {
                return this.set('fill', new e.Pattern(t))
            },
            setShadow: function(t) {
                return this.set('shadow', t ? new e.Shadow(t) : null)
            },
            setColor: function(t) {
                return this.set('fill', t),
                    this
            },
            setAngle: function(t) {
                var e = ('center' !== this.originX || 'center' !== this.originY) && this.centeredRotation;
                return e && this._setOriginToCenter(),
                    this.set('angle', t),
                e && this._resetOrigin(),
                    this
            },
            centerH: function() {
                return this.canvas.centerObjectH(this),
                    this
            },
            centerV: function() {
                return this.canvas.centerObjectV(this),
                    this
            },
            center: function() {
                return this.canvas.centerObject(this),
                    this
            },
            remove: function() {
                return this.canvas.remove(this),
                    this
            },
            getLocalPointer: function(t, e) {
                e = e || this.canvas.getPointer(t);
                var i = this.translateToOriginPoint(this.getCenterPoint(), 'left', 'top');
                return {
                    x: e.x - i.x,
                    y: e.y - i.y
                }
            },
            _setupCompositeOperation: function(t) {
                this.globalCompositeOperation && (this._prevGlobalCompositeOperation = t.globalCompositeOperation, t.globalCompositeOperation = this.globalCompositeOperation)
            },
            _restoreCompositeOperation: function(t) {
                this.globalCompositeOperation && this._prevGlobalCompositeOperation && (t.globalCompositeOperation = this._prevGlobalCompositeOperation)
            }
        }), e.util.createAccessors(e.Object), e.Object.prototype.rotate = e.Object.prototype.setAngle, i(e.Object.prototype, e.Observable), e.Object.NUM_FRACTION_DIGITS = 2, e.Object.__uid = 0)
    }('undefined' != typeof exports ? exports : this),
    function() {
        var t = fabric.util.degreesToRadians;
        fabric.util.object.extend(fabric.Object.prototype, {
            translateToCenterPoint: function(e, i, r) {
                var s = e.x,
                    n = e.y,
                    o = this.stroke ? this.strokeWidth : 0;
                return 'left' === i ? s = e.x + (this.getWidth() + o * this.scaleX) / 2 : 'right' === i && (s = e.x - (this.getWidth() + o * this.scaleX) / 2),
                    'top' === r ? n = e.y + (this.getHeight() + o * this.scaleY) / 2 : 'bottom' === r && (n = e.y - (this.getHeight() + o * this.scaleY) / 2),
                    fabric.util.rotatePoint(new fabric.Point(s, n), e, t(this.angle))
            },
            translateToOriginPoint: function(e, i, r) {
                var s = e.x,
                    n = e.y,
                    o = this.stroke ? this.strokeWidth : 0;
                return 'left' === i ? s = e.x - (this.getWidth() + o * this.scaleX) / 2 : 'right' === i && (s = e.x + (this.getWidth() + o * this.scaleX) / 2),
                    'top' === r ? n = e.y - (this.getHeight() + o * this.scaleY) / 2 : 'bottom' === r && (n = e.y + (this.getHeight() + o * this.scaleY) / 2),
                    fabric.util.rotatePoint(new fabric.Point(s, n), e, t(this.angle))
            },
            getCenterPoint: function() {
                var t = new fabric.Point(this.left, this.top);
                return this.translateToCenterPoint(t, this.originX, this.originY)
            },
            getPointByOrigin: function(t, e) {
                var i = this.getCenterPoint();
                return this.translateToOriginPoint(i, t, e)
            },
            toLocalPoint: function(e, i, r) {
                var s,
                    n,
                    o = this.getCenterPoint(),
                    a = this.stroke ? this.strokeWidth : 0;
                return i && r ? (s = 'left' === i ? o.x - (this.getWidth() + a * this.scaleX) / 2 : 'right' === i ? o.x + (this.getWidth() + a * this.scaleX) / 2 : o.x, n = 'top' === r ? o.y - (this.getHeight() + a * this.scaleY) / 2 : 'bottom' === r ? o.y + (this.getHeight() + a * this.scaleY) / 2 : o.y) : (s = this.left, n = this.top),
                    fabric.util.rotatePoint(new fabric.Point(e.x, e.y), o, -t(this.angle)).subtractEquals(new fabric.Point(s, n))
            },
            setPositionByOrigin: function(t, e, i) {
                var r = this.translateToCenterPoint(t, e, i),
                    s = this.translateToOriginPoint(r, this.originX, this.originY);
                this.set('left', s.x),
                    this.set('top', s.y)
            },
            adjustPosition: function(e) {
                var i = t(this.angle),
                    r = this.getWidth() / 2,
                    s = Math.cos(i) * r,
                    n = Math.sin(i) * r,
                    o = this.getWidth(),
                    a = Math.cos(i) * o,
                    h = Math.sin(i) * o;
                'center' === this.originX && 'left' === e || 'right' === this.originX && 'center' === e ? (this.left -= s, this.top -= n) : 'left' === this.originX && 'center' === e || 'center' === this.originX && 'right' === e ? (this.left += s, this.top += n) : 'left' === this.originX && 'right' === e ? (this.left += a, this.top += h) : 'right' === this.originX && 'left' === e && (this.left -= a, this.top -= h),
                    this.setCoords(),
                    this.originX = e
            },
            _setOriginToCenter: function() {
                this._originalOriginX = this.originX,
                    this._originalOriginY = this.originY;
                var t = this.getCenterPoint();
                this.originX = 'center',
                    this.originY = 'center',
                    this.left = t.x,
                    this.top = t.y
            },
            _resetOrigin: function() {
                var t = this.translateToOriginPoint(this.getCenterPoint(), this._originalOriginX, this._originalOriginY);
                this.originX = this._originalOriginX,
                    this.originY = this._originalOriginY,
                    this.left = t.x,
                    this.top = t.y,
                    this._originalOriginX = null,
                    this._originalOriginY = null
            },
            _getLeftTopCoords: function() {
                return this.translateToOriginPoint(this.getCenterPoint(), 'left', 'center')
            }
        })
    }(),
    function() {
        var t = fabric.util.degreesToRadians;
        fabric.util.object.extend(fabric.Object.prototype, {
            oCoords: null,
            intersectsWithRect: function(t, e) {
                var i = this.oCoords,
                    r = new fabric.Point(i.tl.x, i.tl.y),
                    s = new fabric.Point(i.tr.x, i.tr.y),
                    n = new fabric.Point(i.bl.x, i.bl.y),
                    o = new fabric.Point(i.br.x, i.br.y),
                    a = fabric.Intersection.intersectPolygonRectangle([r,
                        s,
                        o,
                        n
                    ], t, e);
                return 'Intersection' === a.status
            },
            intersectsWithObject: function(t) {
                function e(t) {
                    return {
                        tl: new fabric.Point(t.tl.x, t.tl.y),
                        tr: new fabric.Point(t.tr.x, t.tr.y),
                        bl: new fabric.Point(t.bl.x, t.bl.y),
                        br: new fabric.Point(t.br.x, t.br.y)
                    }
                }
                var i = e(this.oCoords),
                    r = e(t.oCoords),
                    s = fabric.Intersection.intersectPolygonPolygon([i.tl,
                        i.tr,
                        i.br,
                        i.bl
                    ], [
                        r.tl,
                        r.tr,
                        r.br,
                        r.bl
                    ]);
                return 'Intersection' === s.status
            },
            isContainedWithinObject: function(t) {
                var e = t.getBoundingRect(),
                    i = new fabric.Point(e.left, e.top),
                    r = new fabric.Point(e.left + e.width, e.top + e.height);
                return this.isContainedWithinRect(i, r)
            },
            isContainedWithinRect: function(t, e) {
                var i = this.getBoundingRect();
                return i.left >= t.x && i.left + i.width <= e.x && i.top >= t.y && i.top + i.height <= e.y
            },
            containsPoint: function(t) {
                var e = this._getImageLines(this.oCoords),
                    i = this._findCrossPoints(t, e);
                return 0 !== i && i % 2 === 1
            },
            _getImageLines: function(t) {
                return {
                    topline: {
                        o: t.tl,
                        d: t.tr
                    },
                    rightline: {
                        o: t.tr,
                        d: t.br
                    },
                    bottomline: {
                        o: t.br,
                        d: t.bl
                    },
                    leftline: {
                        o: t.bl,
                        d: t.tl
                    }
                }
            },
            _findCrossPoints: function(t, e) {
                var i,
                    r,
                    s,
                    n,
                    o,
                    a,
                    h,
                    c = 0;
                for (var l in e)
                    if (h = e[l], !(h.o.y < t.y && h.d.y < t.y || h.o.y >= t.y && h.d.y >= t.y || (h.o.x === h.d.x && h.o.x >= t.x ? (o = h.o.x, a = t.y) : (i = 0, r = (h.d.y - h.o.y) / (h.d.x - h.o.x), s = t.y - i * t.x, n = h.o.y - r * h.o.x, o = -(s - n) / (i - r), a = s + i * o), o >= t.x && (c += 1), 2 !== c))) break;
                return c
            },
            getBoundingRectWidth: function() {
                return this.getBoundingRect().width
            },
            getBoundingRectHeight: function() {
                return this.getBoundingRect().height
            },
            getBoundingRect: function() {
                this.oCoords || this.setCoords();
                var t = [
                        this.oCoords.tl.x,
                        this.oCoords.tr.x,
                        this.oCoords.br.x,
                        this.oCoords.bl.x
                    ],
                    e = fabric.util.array.min(t),
                    i = fabric.util.array.max(t),
                    r = Math.abs(e - i),
                    s = [
                        this.oCoords.tl.y,
                        this.oCoords.tr.y,
                        this.oCoords.br.y,
                        this.oCoords.bl.y
                    ],
                    n = fabric.util.array.min(s),
                    o = fabric.util.array.max(s),
                    a = Math.abs(n - o);
                return {
                    left: e,
                    top: n,
                    width: r,
                    height: a
                }
            },
            getWidth: function() {
                return this.width * this.scaleX
            },
            getHeight: function() {
                return this.height * this.scaleY
            },
            _constrainScale: function(t) {
                return Math.abs(t) < this.minScaleLimit ? 0 > t ? -this.minScaleLimit : this.minScaleLimit : t
            },
            scale: function(t) {
                return t = this._constrainScale(t),
                0 > t && (this.flipX = !this.flipX, this.flipY = !this.flipY, t *= -1),
                    this.scaleX = t,
                    this.scaleY = t,
                    this.setCoords(),
                    this
            },
            scaleToWidth: function(t) {
                var e = this.getBoundingRectWidth() / this.getWidth();
                return this.scale(t / this.width / e)
            },
            scaleToHeight: function(t) {
                var e = this.getBoundingRectHeight() / this.getHeight();
                return this.scale(t / this.height / e)
            },
            setCoords: function() {
                var e = this.strokeWidth > 1 ? this.strokeWidth : 0,
                    i = t(this.angle),
                    r = this.getViewportTransform(),
                    s = function(t) {
                        return fabric.util.transformPoint(t, r)
                    },
                    n = this.width,
                    o = this.height,
                    a = 'round' === this.strokeLineCap || 'square' === this.strokeLineCap,
                    h = 'line' === this.type && 1 === this.width,
                    c = 'line' === this.type && 1 === this.height,
                    l = a && c || 'line' !== this.type,
                    u = a && h || 'line' !== this.type;
                h ? n = e : c && (o = e),
                l && (n += e),
                u && (o += e),
                    this.currentWidth = n * this.scaleX,
                    this.currentHeight = o * this.scaleY,
                this.currentWidth < 0 && (this.currentWidth = Math.abs(this.currentWidth));
                var f = Math.sqrt(Math.pow(this.currentWidth / 2, 2) + Math.pow(this.currentHeight / 2, 2)),
                    g = Math.atan(isFinite(this.currentHeight / this.currentWidth) ? this.currentHeight / this.currentWidth : 0),
                    p = Math.cos(g + i) * f,
                    d = Math.sin(g + i) * f,
                    v = Math.sin(i),
                    b = Math.cos(i),
                    y = this.getCenterPoint(),
                    m = new fabric.Point(this.currentWidth, this.currentHeight),
                    _ = new fabric.Point(y.x - p, y.y - d),
                    C = new fabric.Point(_.x + m.x * b, _.y + m.x * v),
                    x = new fabric.Point(_.x - m.y * v, _.y + m.y * b),
                    w = new fabric.Point(_.x + m.x / 2 * b, _.y + m.x / 2 * v),
                    O = s(_),
                    S = s(C),
                    j = s(new fabric.Point(C.x - m.y * v, C.y + m.y * b)),
                    T = s(x),
                    P = s(new fabric.Point(_.x - m.y / 2 * v, _.y + m.y / 2 * b)),
                    k = s(w),
                    A = s(new fabric.Point(C.x - m.y / 2 * v, C.y + m.y / 2 * b)),
                    M = s(new fabric.Point(x.x + m.x / 2 * b, x.y + m.x / 2 * v)),
                    E = s(new fabric.Point(w.x, w.y)),
                    D = Math.cos(g + i) * this.padding * Math.sqrt(2),
                    L = Math.sin(g + i) * this.padding * Math.sqrt(2);
                return O = O.add(new fabric.Point(-D, -L)),
                    S = S.add(new fabric.Point(L, -D)),
                    j = j.add(new fabric.Point(D, L)),
                    T = T.add(new fabric.Point(-L, D)),
                    P = P.add(new fabric.Point((-D - L) / 2, (-L + D) / 2)),
                    k = k.add(new fabric.Point((L - D) / 2, -(L + D) / 2)),
                    A = A.add(new fabric.Point((L + D) / 2, (L - D) / 2)),
                    M = M.add(new fabric.Point((D - L) / 2, (D + L) / 2)),
                    E = E.add(new fabric.Point((L - D) / 2, -(L + D) / 2)),
                    this.oCoords = {
                        tl: O,
                        tr: S,
                        br: j,
                        bl: T,
                        ml: P,
                        mt: k,
                        mr: A,
                        mb: M,
                        mtr: E
                    },
                this._setCornerCoords && this._setCornerCoords(),
                    this
            }
        })
    }(),
    fabric.util.object.extend(fabric.Object.prototype, {
        sendToBack: function() {
            return this.group ? fabric.StaticCanvas.prototype.sendToBack.call(this.group, this) : this.canvas.sendToBack(this),
                this
        },
        bringToFront: function() {
            return this.group ? fabric.StaticCanvas.prototype.bringToFront.call(this.group, this) : this.canvas.bringToFront(this),
                this
        },
        sendBackwards: function(t) {
            return this.group ? fabric.StaticCanvas.prototype.sendBackwards.call(this.group, this, t) : this.canvas.sendBackwards(this, t),
                this
        },
        bringForward: function(t) {
            return this.group ? fabric.StaticCanvas.prototype.bringForward.call(this.group, this, t) : this.canvas.bringForward(this, t),
                this
        },
        moveTo: function(t) {
            return this.group ? fabric.StaticCanvas.prototype.moveTo.call(this.group, this, t) : this.canvas.moveTo(this, t),
                this
        }
    }),
    fabric.util.object.extend(fabric.Object.prototype, {
        getSvgStyles: function() {
            var t = this.fill ? this.fill.toLive ? 'url(#SVGID_' + this.fill.id + ')' : this.fill : 'none',
                e = this.fillRule,
                i = this.stroke ? this.stroke.toLive ? 'url(#SVGID_' + this.stroke.id + ')' : this.stroke : 'none',
                r = this.strokeWidth ? this.strokeWidth : '0',
                s = this.strokeDashArray ? this.strokeDashArray.join(' ') : '',
                n = this.strokeLineCap ? this.strokeLineCap : 'butt',
                o = this.strokeLineJoin ? this.strokeLineJoin : 'miter',
                a = this.strokeMiterLimit ? this.strokeMiterLimit : '4',
                h = 'undefined' != typeof this.opacity ? this.opacity : '1',
                c = this.visible ? '' : ' visibility: hidden;',
                l = this.shadow && 'text' !== this.type ? 'filter: url(#SVGID_' + this.shadow.id + ');' : '';
            return ['stroke: ',
                i,
                '; ',
                'stroke-width: ',
                r,
                '; ',
                'stroke-dasharray: ',
                s,
                '; ',
                'stroke-linecap: ',
                n,
                '; ',
                'stroke-linejoin: ',
                o,
                '; ',
                'stroke-miterlimit: ',
                a,
                '; ',
                'fill: ',
                t,
                '; ',
                'fill-rule: ',
                e,
                '; ',
                'opacity: ',
                h,
                ';',
                l,
                c
            ].join('')
        },
        getSvgTransform: function() {
            if (this.group && 'path-group' === this.group.type) return '';
            var t = fabric.util.toFixed,
                e = this.getAngle(),
                i = !this.canvas || this.canvas.svgViewportTransformation ? this.getViewportTransform() : [
                    1,
                    0,
                    0,
                    1,
                    0,
                    0
                ],
                r = fabric.util.transformPoint(this.getCenterPoint(), i),
                s = fabric.Object.NUM_FRACTION_DIGITS,
                n = 'path-group' === this.type ? '' : 'translate(' + t(r.x, s) + ' ' + t(r.y, s) + ')',
                o = 0 !== e ? ' rotate(' + t(e, s) + ')' : '',
                a = 1 === this.scaleX && 1 === this.scaleY && 1 === i[0] && 1 === i[3] ? '' : ' scale(' + t(this.scaleX * i[0], s) + ' ' + t(this.scaleY * i[3], s) + ')',
                h = 'path-group' === this.type ? this.width * i[0] : 0,
                c = this.flipX ? ' matrix(-1 0 0 1 ' + h + ' 0) ' : '',
                l = 'path-group' === this.type ? this.height * i[3] : 0,
                u = this.flipY ? ' matrix(1 0 0 -1 0 ' + l + ')' : '';
            return [n,
                o,
                a,
                c,
                u
            ].join('')
        },
        getSvgTransformMatrix: function() {
            return this.transformMatrix ? ' matrix(' + this.transformMatrix.join(' ') + ')' : ''
        },
        _createBaseSVGMarkup: function() {
            var t = [];
            return this.fill && this.fill.toLive && t.push(this.fill.toSVG(this, !1)),
            this.stroke && this.stroke.toLive && t.push(this.stroke.toSVG(this, !1)),
            this.shadow && t.push(this.shadow.toSVG(this)),
                t
        }
    }),
    fabric.util.object.extend(fabric.Object.prototype, {
        hasStateChanged: function() {
            return this.stateProperties.some(function(t) {
                return this.get(t) !== this.originalState[t]
            }, this)
        },
        saveState: function(t) {
            return this.stateProperties.forEach(function(t) {
                this.originalState[t] = this.get(t)
            }, this),
            t && t.stateProperties && t.stateProperties.forEach(function(t) {
                this.originalState[t] = this.get(t)
            }, this),
                this
        },
        setupState: function() {
            return this.originalState = {},
                this.saveState(),
                this
        }
    }),
    function() {
        var t = fabric.util.degreesToRadians,
            e = function() {
                return 'undefined' != typeof G_vmlCanvasManager
            };
        fabric.util.object.extend(fabric.Object.prototype, {
            _controlsVisibility: null,
            _findTargetCorner: function(t) {
                if (!this.hasControls || !this.active) return !1;
                var e,
                    i,
                    r = t.x,
                    s = t.y;
                for (var n in this.oCoords)
                    if (this.isControlVisible(n) && ('mtr' !== n || this.hasRotatingPoint) && (!this.get('lockUniScaling') || 'mt' !== n && 'mr' !== n && 'mb' !== n && 'ml' !== n) && (i = this._getImageLines(this.oCoords[n].corner), e = this._findCrossPoints({
                            x: r,
                            y: s
                        }, i), 0 !== e && e % 2 === 1)) return this.__corner = n,
                        n;
                return !1
            },
            _setCornerCoords: function() {
                var e = this.oCoords,
                    i = t(this.angle),
                    r = t(45 - this.angle),
                    s = Math.sqrt(2 * Math.pow(this.cornerSize, 2)) / 2,
                    n = s * Math.cos(r),
                    o = s * Math.sin(r),
                    a = Math.sin(i),
                    h = Math.cos(i);
                e.tl.corner = {
                    tl: {
                        x: e.tl.x - o,
                        y: e.tl.y - n
                    },
                    tr: {
                        x: e.tl.x + n,
                        y: e.tl.y - o
                    },
                    bl: {
                        x: e.tl.x - n,
                        y: e.tl.y + o
                    },
                    br: {
                        x: e.tl.x + o,
                        y: e.tl.y + n
                    }
                },
                    e.tr.corner = {
                        tl: {
                            x: e.tr.x - o,
                            y: e.tr.y - n
                        },
                        tr: {
                            x: e.tr.x + n,
                            y: e.tr.y - o
                        },
                        br: {
                            x: e.tr.x + o,
                            y: e.tr.y + n
                        },
                        bl: {
                            x: e.tr.x - n,
                            y: e.tr.y + o
                        }
                    },
                    e.bl.corner = {
                        tl: {
                            x: e.bl.x - o,
                            y: e.bl.y - n
                        },
                        bl: {
                            x: e.bl.x - n,
                            y: e.bl.y + o
                        },
                        br: {
                            x: e.bl.x + o,
                            y: e.bl.y + n
                        },
                        tr: {
                            x: e.bl.x + n,
                            y: e.bl.y - o
                        }
                    },
                    e.br.corner = {
                        tr: {
                            x: e.br.x + n,
                            y: e.br.y - o
                        },
                        bl: {
                            x: e.br.x - n,
                            y: e.br.y + o
                        },
                        br: {
                            x: e.br.x + o,
                            y: e.br.y + n
                        },
                        tl: {
                            x: e.br.x - o,
                            y: e.br.y - n
                        }
                    },
                    e.ml.corner = {
                        tl: {
                            x: e.ml.x - o,
                            y: e.ml.y - n
                        },
                        tr: {
                            x: e.ml.x + n,
                            y: e.ml.y - o
                        },
                        bl: {
                            x: e.ml.x - n,
                            y: e.ml.y + o
                        },
                        br: {
                            x: e.ml.x + o,
                            y: e.ml.y + n
                        }
                    },
                    e.mt.corner = {
                        tl: {
                            x: e.mt.x - o,
                            y: e.mt.y - n
                        },
                        tr: {
                            x: e.mt.x + n,
                            y: e.mt.y - o
                        },
                        bl: {
                            x: e.mt.x - n,
                            y: e.mt.y + o
                        },
                        br: {
                            x: e.mt.x + o,
                            y: e.mt.y + n
                        }
                    },
                    e.mr.corner = {
                        tl: {
                            x: e.mr.x - o,
                            y: e.mr.y - n
                        },
                        tr: {
                            x: e.mr.x + n,
                            y: e.mr.y - o
                        },
                        bl: {
                            x: e.mr.x - n,
                            y: e.mr.y + o
                        },
                        br: {
                            x: e.mr.x + o,
                            y: e.mr.y + n
                        }
                    },
                    e.mb.corner = {
                        tl: {
                            x: e.mb.x - o,
                            y: e.mb.y - n
                        },
                        tr: {
                            x: e.mb.x + n,
                            y: e.mb.y - o
                        },
                        bl: {
                            x: e.mb.x - n,
                            y: e.mb.y + o
                        },
                        br: {
                            x: e.mb.x + o,
                            y: e.mb.y + n
                        }
                    },
                    e.mtr.corner = {
                        tl: {
                            x: e.mtr.x - o + a * this.rotatingPointOffset,
                            y: e.mtr.y - n - h * this.rotatingPointOffset
                        },
                        tr: {
                            x: e.mtr.x + n + a * this.rotatingPointOffset,
                            y: e.mtr.y - o - h * this.rotatingPointOffset
                        },
                        bl: {
                            x: e.mtr.x - n + a * this.rotatingPointOffset,
                            y: e.mtr.y + o - h * this.rotatingPointOffset
                        },
                        br: {
                            x: e.mtr.x + o + a * this.rotatingPointOffset,
                            y: e.mtr.y + n - h * this.rotatingPointOffset
                        }
                    }
            },
            drawBorders: function(t) {
                if (!this.hasBorders) return this;
                var e = this.padding,
                    i = 2 * e,
                    r = this.getViewportTransform();
                t.save(),
                    t.globalAlpha = this.isMoving ? this.borderOpacityWhenMoving : 1,
                    t.strokeStyle = this.borderColor;
                var s = 1 / this._constrainScale(this.scaleX),
                    n = 1 / this._constrainScale(this.scaleY);
                t.lineWidth = 1 / this.borderScaleFactor;
                var o = this.getWidth(),
                    a = this.getHeight(),
                    h = this.strokeWidth > 1 ? this.strokeWidth : 0,
                    c = 'round' === this.strokeLineCap || 'square' === this.strokeLineCap,
                    l = 'line' === this.type && 1 === this.width,
                    u = 'line' === this.type && 1 === this.height,
                    f = c && u || 'line' !== this.type,
                    g = c && l || 'line' !== this.type;
                l ? o = h / s : u && (a = h / n),
                f && (o += h / s),
                g && (a += h / n);
                var p = fabric.util.transformPoint(new fabric.Point(o, a), r, !0),
                    d = p.x,
                    v = p.y;
                if (this.group && (d *= this.group.scaleX, v *= this.group.scaleY), t.strokeRect(~~(-(d / 2) - e) - 0.5, ~~(-(v / 2) - e) - 0.5, ~~(d + i) + 1, ~~(v + i) + 1), this.hasRotatingPoint && this.isControlVisible('mtr') && !this.get('lockRotation') && this.hasControls) {
                    var b = (-v - 2 * e) / 2;
                    t.beginPath(),
                        t.moveTo(0, b),
                        t.lineTo(0, b - this.rotatingPointOffset),
                        t.closePath(),
                        t.stroke()
                }
                return t.restore(),
                    this
            },
            drawControls: function(t) {
                if (!this.hasControls) return this;
                var e = this.cornerSize,
                    i = e / 2,
                    r = this.getViewportTransform(),
                    s = this.strokeWidth > 1 ? this.strokeWidth : 0,
                    n = this.width,
                    o = this.height,
                    a = 'round' === this.strokeLineCap || 'square' === this.strokeLineCap,
                    h = 'line' === this.type && 1 === this.width,
                    c = 'line' === this.type && 1 === this.height,
                    l = a && c || 'line' !== this.type,
                    u = a && h || 'line' !== this.type;
                h ? n = s : c && (o = s),
                l && (n += s),
                u && (o += s),
                    n *= this.scaleX,
                    o *= this.scaleY;
                var f = fabric.util.transformPoint(new fabric.Point(n, o), r, !0),
                    g = f.x,
                    p = f.y,
                    d = -(g / 2),
                    v = -(p / 2),
                    b = this.padding,
                    y = i,
                    m = i - e,
                    _ = this.transparentCorners ? 'strokeRect' : 'fillRect';
                return t.save(),
                    t.lineWidth = 1,
                    t.globalAlpha = this.isMoving ? this.borderOpacityWhenMoving : 1,
                    t.strokeStyle = t.fillStyle = this.cornerColor,
                    this._drawControl('tl', t, _, d - y - b, v - y - b),
                    this._drawControl('tr', t, _, d + g - y + b, v - y - b),
                    this._drawControl('bl', t, _, d - y - b, v + p + m + b),
                    this._drawControl('br', t, _, d + g + m + b, v + p + m + b),
                this.get('lockUniScaling') || (this._drawControl('mt', t, _, d + g / 2 - y, v - y - b), this._drawControl('mb', t, _, d + g / 2 - y, v + p + m + b), this._drawControl('mr', t, _, d + g + m + b, v + p / 2 - y), this._drawControl('ml', t, _, d - y - b, v + p / 2 - y)),
                this.hasRotatingPoint && this._drawControl('mtr', t, _, d + g / 2 - y, v - this.rotatingPointOffset - this.cornerSize / 2 - b),
                    t.restore(),
                    this
            },
            _drawControl: function(t, i, r, s, n) {
                var o = this.cornerSize;
                this.isControlVisible(t) && (e() || this.transparentCorners || i.clearRect(s, n, o, o), i[r](s, n, o, o))
            },
            isControlVisible: function(t) {
                return this._getControlsVisibility()[t]
            },
            setControlVisible: function(t, e) {
                return this._getControlsVisibility()[t] = e,
                    this
            },
            setControlsVisibility: function(t) {
                t || (t = {});
                for (var e in t) this.setControlVisible(e, t[e]);
                return this
            },
            _getControlsVisibility: function() {
                return this._controlsVisibility || (this._controlsVisibility = {
                    tl: !0,
                    tr: !0,
                    br: !0,
                    bl: !0,
                    ml: !0,
                    mt: !0,
                    mr: !0,
                    mb: !0,
                    mtr: !0
                }),
                    this._controlsVisibility
            }
        })
    }(),
    function(t) {
        'use strict';

        function e(t, e) {
            var i = t.origin,
                r = t.axis1,
                s = t.axis2,
                n = t.dimension,
                o = e.nearest,
                a = e.center,
                h = e.farthest;
            return function() {
                switch (this.get(i)) {
                    case o:
                        return Math.min(this.get(r), this.get(s));
                    case a:
                        return Math.min(this.get(r), this.get(s)) + 0.5 * this.get(n);
                    case h:
                        return Math.max(this.get(r), this.get(s))
                }
            }
        }
        var i = t.fabric || (t.fabric = {}),
            r = i.util.object.extend,
            s = {
                x1: 1,
                x2: 1,
                y1: 1,
                y2: 1
            },
            n = i.StaticCanvas.supports('setLineDash');
        return i.Line ? void i.warn('fabric.Line is already defined') : (i.Line = i.util.createClass(i.Object, {
            type: 'line',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 0,
            initialize: function(t, e) {
                e = e || {},
                t || (t = [
                    0,
                    0,
                    0,
                    0
                ]),
                    this.callSuper('initialize', e),
                    this.set('x1', t[0]),
                    this.set('y1', t[1]),
                    this.set('x2', t[2]),
                    this.set('y2', t[3]),
                    this._setWidthHeight(e)
            },
            _setWidthHeight: function(t) {
                t || (t = {}),
                    this.width = Math.abs(this.x2 - this.x1) || 1,
                    this.height = Math.abs(this.y2 - this.y1) || 1,
                    this.left = 'left' in t ? t.left : this._getLeftToOriginX(),
                    this.top = 'top' in t ? t.top : this._getTopToOriginY()
            },
            _set: function(t, e) {
                return this.callSuper('_set', t, e),
                'undefined' != typeof s[t] && this._setWidthHeight(),
                    this
            },
            _getLeftToOriginX: e({
                origin: 'originX',
                axis1: 'x1',
                axis2: 'x2',
                dimension: 'width'
            }, {
                nearest: 'left',
                center: 'center',
                farthest: 'right'
            }),
            _getTopToOriginY: e({
                origin: 'originY',
                axis1: 'y1',
                axis2: 'y2',
                dimension: 'height'
            }, {
                nearest: 'top',
                center: 'center',
                farthest: 'bottom'
            }),
            _render: function(t, e) {
                if (t.beginPath(), e) {
                    var i = this.getCenterPoint();
                    t.translate(i.x, i.y)
                }
                if (!this.strokeDashArray || this.strokeDashArray && n) {
                    var r = this.x1 <= this.x2 ? -1 : 1,
                        s = this.y1 <= this.y2 ? -1 : 1;
                    t.moveTo(1 === this.width ? 0 : r * this.width / 2, 1 === this.height ? 0 : s * this.height / 2),
                        t.lineTo(1 === this.width ? 0 : -1 * r * this.width / 2, 1 === this.height ? 0 : -1 * s * this.height / 2)
                }
                t.lineWidth = this.strokeWidth;
                var o = t.strokeStyle;
                t.strokeStyle = this.stroke || t.fillStyle,
                this.stroke && this._renderStroke(t),
                    t.strokeStyle = o
            },
            _renderDashedStroke: function(t) {
                var e = this.x1 <= this.x2 ? -1 : 1,
                    r = this.y1 <= this.y2 ? -1 : 1,
                    s = 1 === this.width ? 0 : e * this.width / 2,
                    n = 1 === this.height ? 0 : r * this.height / 2;
                t.beginPath(),
                    i.util.drawDashedLine(t, s, n, -s, -n, this.strokeDashArray),
                    t.closePath()
            },
            toObject: function(t) {
                return r(this.callSuper('toObject', t), this.calcLinePoints())
            },
            calcLinePoints: function() {
                var t = this.x1 <= this.x2 ? -1 : 1,
                    e = this.y1 <= this.y2 ? -1 : 1,
                    i = t * this.width / 2,
                    r = e * this.height / 2,
                    s = -1 * t * this.width / 2,
                    n = -1 * e * this.height / 2;
                return {
                    x1: i,
                    x2: s,
                    y1: r,
                    y2: n
                }
            },
            toSVG: function(t) {
                var e = this._createBaseSVGMarkup(),
                    i = {
                        x1: this.x1,
                        x2: this.x2,
                        y1: this.y1,
                        y2: this.y2
                    };
                return this.group && 'path-group' === this.group.type || (i = this.calcLinePoints()),
                    e.push('<line ', 'x1="', i.x1, '" y1="', i.y1, '" x2="', i.x2, '" y2="', i.y2, '" style="', this.getSvgStyles(), '" transform="', this.getSvgTransform(), this.getSvgTransformMatrix(), '"/>\n'),
                    t ? t(e.join('')) : e.join('')
            },
            complexity: function() {
                return 1
            }
        }), void(i.Line.fromObject = function(t) {
            var e = [
                t.x1,
                t.y1,
                t.x2,
                t.y2
            ];
            return new i.Line(e, t)
        }))
    }('undefined' != typeof exports ? exports : this),
    function(t) {
        'use strict';
        var e = t.fabric || (t.fabric = {}),
            i = Math.PI,
            r = e.util.object.extend;
        return e.Circle ? void e.warn('fabric.Circle is already defined.') : (e.Circle = e.util.createClass(e.Object, {
            type: 'circle',
            radius: 0,
            startAngle: 0,
            endAngle: 2 * i,
            initialize: function(t) {
                t = t || {},
                    this.callSuper('initialize', t),
                    this.set('radius', t.radius || 0),
                    this.startAngle = t.startAngle || this.startAngle,
                    this.endAngle = t.endAngle || this.endAngle
            },
            _set: function(t, e) {
                return this.callSuper('_set', t, e),
                'radius' === t && this.setRadius(e),
                    this
            },
            toObject: function(t) {
                return r(this.callSuper('toObject', t), {
                    radius: this.get('radius'),
                    startAngle: this.startAngle,
                    endAngle: this.endAngle
                })
            },
            toSVG: function(t) {
                var e = this._createBaseSVGMarkup(),
                    r = 0,
                    s = 0,
                    n = (this.endAngle - this.startAngle) % (2 * i);
                if (0 === n) this.group && 'path-group' === this.group.type && (r = this.left + this.radius, s = this.top + this.radius),
                    e.push('<circle ', 'cx="' + r + '" cy="' + s + '" ', 'r="', this.radius, '" style="', this.getSvgStyles(), '" transform="', this.getSvgTransform(), ' ', this.getSvgTransformMatrix(), '"/>\n');
                else {
                    var o = Math.cos(this.startAngle) * this.radius,
                        a = Math.sin(this.startAngle) * this.radius,
                        h = Math.cos(this.endAngle) * this.radius,
                        c = Math.sin(this.endAngle) * this.radius,
                        l = n > i ? '1' : '0';
                    e.push('<path d="M ' + o + ' ' + a, ' A ' + this.radius + ' ' + this.radius, ' 0 ', +l + ' 1', ' ' + h + ' ' + c, '" style="', this.getSvgStyles(), '" transform="', this.getSvgTransform(), ' ', this.getSvgTransformMatrix(), '"/>\n')
                }
                return t ? t(e.join('')) : e.join('')
            },
            _render: function(t, e) {
                t.beginPath(),
                    t.arc(e ? this.left + this.radius : 0, e ? this.top + this.radius : 0, this.radius, this.startAngle, this.endAngle, !1),
                    this._renderFill(t),
                    this._renderStroke(t)
            },
            getRadiusX: function() {
                return this.get('radius') * this.get('scaleX')
            },
            getRadiusY: function() {
                return this.get('radius') * this.get('scaleY')
            },
            setRadius: function(t) {
                this.radius = t,
                    this.set('width', 2 * t).set('height', 2 * t)
            },
            complexity: function() {
                return 1
            }
        }), void(e.Circle.fromObject = function(t) {
            return new e.Circle(t)
        }))
    }('undefined' != typeof exports ? exports : this),
    function(t) {
        'use strict';
        var e = t.fabric || (t.fabric = {});
        return e.Triangle ? void e.warn('fabric.Triangle is already defined') : (e.Triangle = e.util.createClass(e.Object, {
            type: 'triangle',
            initialize: function(t) {
                t = t || {},
                    this.callSuper('initialize', t),
                    this.set('width', t.width || 100).set('height', t.height || 100)
            },
            _render: function(t) {
                var e = this.width / 2,
                    i = this.height / 2;
                t.beginPath(),
                    t.moveTo(-e, i),
                    t.lineTo(0, -i),
                    t.lineTo(e, i),
                    t.closePath(),
                    this._renderFill(t),
                    this._renderStroke(t)
            },
            _renderDashedStroke: function(t) {
                var i = this.width / 2,
                    r = this.height / 2;
                t.beginPath(),
                    e.util.drawDashedLine(t, -i, r, 0, -r, this.strokeDashArray),
                    e.util.drawDashedLine(t, 0, -r, i, r, this.strokeDashArray),
                    e.util.drawDashedLine(t, i, r, -i, r, this.strokeDashArray),
                    t.closePath()
            },
            toSVG: function(t) {
                var e = this._createBaseSVGMarkup(),
                    i = this.width / 2,
                    r = this.height / 2,
                    s = [-i + ' ' + r,
                        '0 ' + -r,
                        i + ' ' + r
                    ].join(',');
                return e.push('<polygon ', 'points="', s, '" style="', this.getSvgStyles(), '" transform="', this.getSvgTransform(), '"/>'),
                    t ? t(e.join('')) : e.join('')
            },
            complexity: function() {
                return 1
            }
        }), void(e.Triangle.fromObject = function(t) {
            return new e.Triangle(t)
        }))
    }('undefined' != typeof exports ? exports : this),
    function(t) {
        'use strict';
        var e = t.fabric || (t.fabric = {}),
            i = 2 * Math.PI,
            r = e.util.object.extend;
        return e.Ellipse ? void e.warn('fabric.Ellipse is already defined.') : (e.Ellipse = e.util.createClass(e.Object, {
            type: 'ellipse',
            rx: 0,
            ry: 0,
            initialize: function(t) {
                t = t || {},
                    this.callSuper('initialize', t),
                    this.set('rx', t.rx || 0),
                    this.set('ry', t.ry || 0)
            },
            _set: function(t, e) {
                switch (this.callSuper('_set', t, e), t) {
                    case 'rx':
                        this.rx = e,
                            this.set('width', 2 * e);
                        break;
                    case 'ry':
                        this.ry = e,
                            this.set('height', 2 * e)
                }
                return this
            },
            getRx: function() {
                return this.get('rx') * this.get('scaleX')
            },
            getRy: function() {
                return this.get('ry') * this.get('scaleY')
            },
            toObject: function(t) {
                return r(this.callSuper('toObject', t), {
                    rx: this.get('rx'),
                    ry: this.get('ry')
                })
            },
            toSVG: function(t) {
                var e = this._createBaseSVGMarkup(),
                    i = 0,
                    r = 0;
                return this.group && 'path-group' === this.group.type && (i = this.left + this.rx, r = this.top + this.ry),
                    e.push('<ellipse ', 'cx="', i, '" cy="', r, '" ', 'rx="', this.rx, '" ry="', this.ry, '" style="', this.getSvgStyles(), '" transform="', this.getSvgTransform(), this.getSvgTransformMatrix(), '"/>\n'),
                    t ? t(e.join('')) : e.join('')
            },
            _render: function(t, e) {
                t.beginPath(),
                    t.save(),
                    t.transform(1, 0, 0, this.ry / this.rx, 0, 0),
                    t.arc(e ? this.left + this.rx : 0, e ? (this.top + this.ry) * this.rx / this.ry : 0, this.rx, 0, i, !1),
                    t.restore(),
                    this._renderFill(t),
                    this._renderStroke(t)
            },
            complexity: function() {
                return 1
            }
        }), void(e.Ellipse.fromObject = function(t) {
            return new e.Ellipse(t)
        }))
    }('undefined' != typeof exports ? exports : this),
    function(t) {
        'use strict';
        var e = t.fabric || (t.fabric = {}),
            i = e.util.object.extend;
        if (e.Rect) return void console.warn('fabric.Rect is already defined');
        var r = e.Object.prototype.stateProperties.concat();
        r.push('rx', 'ry', 'x', 'y'),
            e.Rect = e.util.createClass(e.Object, {
                stateProperties: r,
                type: 'rect',
                rx: 0,
                ry: 0,
                strokeDashArray: null,
                initialize: function(t) {
                    t = t || {},
                        this.callSuper('initialize', t),
                        this._initRxRy()
                },
                _initRxRy: function() {
                    this.rx && !this.ry ? this.ry = this.rx : this.ry && !this.rx && (this.rx = this.ry)
                },
                _render: function(t, e) {
                    if (1 === this.width && 1 === this.height) return void t.fillRect(0, 0, 1, 1);
                    var i = this.rx ? Math.min(this.rx, this.width / 2) : 0,
                        r = this.ry ? Math.min(this.ry, this.height / 2) : 0,
                        s = this.width,
                        n = this.height,
                        o = e ? this.left : -this.width / 2,
                        a = e ? this.top : -this.height / 2,
                        h = 0 !== i || 0 !== r,
                        c = 0.4477152502;
                    t.beginPath(),
                        t.moveTo(o + i, a),
                        t.lineTo(o + s - i, a),
                    h && t.bezierCurveTo(o + s - c * i, a, o + s, a + c * r, o + s, a + r),
                        t.lineTo(o + s, a + n - r),
                    h && t.bezierCurveTo(o + s, a + n - c * r, o + s - c * i, a + n, o + s - i, a + n),
                        t.lineTo(o + i, a + n),
                    h && t.bezierCurveTo(o + c * i, a + n, o, a + n - c * r, o, a + n - r),
                        t.lineTo(o, a + r),
                    h && t.bezierCurveTo(o, a + c * r, o + c * i, a, o + i, a),
                        t.closePath(),
                        this._renderFill(t),
                        this._renderStroke(t)
                },
                _renderDashedStroke: function(t) {
                    var i = -this.width / 2,
                        r = -this.height / 2,
                        s = this.width,
                        n = this.height;
                    t.beginPath(),
                        e.util.drawDashedLine(t, i, r, i + s, r, this.strokeDashArray),
                        e.util.drawDashedLine(t, i + s, r, i + s, r + n, this.strokeDashArray),
                        e.util.drawDashedLine(t, i + s, r + n, i, r + n, this.strokeDashArray),
                        e.util.drawDashedLine(t, i, r + n, i, r, this.strokeDashArray),
                        t.closePath()
                },
                toObject: function(t) {
                    var e = i(this.callSuper('toObject', t), {
                        rx: this.get('rx') || 0,
                        ry: this.get('ry') || 0
                    });
                    return this.includeDefaultValues || this._removeDefaultValues(e),
                        e
                },
                toSVG: function(t) {
                    var e = this._createBaseSVGMarkup(),
                        i = this.left,
                        r = this.top;
                    return this.group && 'path-group' === this.group.type || (i = -this.width / 2, r = -this.height / 2),
                        e.push('<rect ', 'x="', i, '" y="', r, '" rx="', this.get('rx'), '" ry="', this.get('ry'), '" width="', this.width, '" height="', this.height, '" style="', this.getSvgStyles(), '" transform="', this.getSvgTransform(), this.getSvgTransformMatrix(), '"/>\n'),
                        t ? t(e.join('')) : e.join('')
                },
                complexity: function() {
                    return 1
                }
            }),
            e.Rect.fromObject = function(t) {
                return new e.Rect(t)
            }
    }('undefined' != typeof exports ? exports : this),
    function(t) {
        'use strict';
        var e = t.fabric || (t.fabric = {});
        return e.Polyline ? void e.warn('fabric.Polyline is already defined') : (e.Polyline = e.util.createClass(e.Object, {
            type: 'polyline',
            points: null,
            minX: 0,
            minY: 0,
            initialize: function(t, i) {
                return e.Polygon.prototype.initialize.call(this, t, i)
            },
            _calcDimensions: function() {
                return e.Polygon.prototype._calcDimensions.call(this)
            },
            _applyPointOffset: function() {
                return e.Polygon.prototype._applyPointOffset.call(this)
            },
            toObject: function(t) {
                return e.Polygon.prototype.toObject.call(this, t)
            },
            toSVG: function(t) {
                return e.Polygon.prototype.toSVG.call(this, t)
            },
            _render: function(t) {
                e.Polygon.prototype.commonRender.call(this, t),
                    this._renderFill(t),
                    this._renderStroke(t)
            },
            _renderDashedStroke: function(t) {
                var i,
                    r;
                t.beginPath();
                for (var s = 0, n = this.points.length; n > s; s++) i = this.points[s],
                    r = this.points[s + 1] || i,
                    e.util.drawDashedLine(t, i.x, i.y, r.x, r.y, this.strokeDashArray)
            },
            complexity: function() {
                return this.get('points').length
            }
        }), void(e.Polyline.fromObject = function(t) {
            var i = t.points;
            return new e.Polyline(i, t, !0)
        }))
    }('undefined' != typeof exports ? exports : this),
    function(t) {
        'use strict';
        var e = t.fabric || (t.fabric = {}),
            i = e.util.object.extend,
            r = e.util.array.min,
            s = e.util.array.max,
            n = e.util.toFixed;
        return e.Polygon ? void e.warn('fabric.Polygon is already defined') : (e.Polygon = e.util.createClass(e.Object, {
            type: 'polygon',
            points: null,
            minX: 0,
            minY: 0,
            initialize: function(t, e) {
                e = e || {},
                    this.points = t,
                    this.callSuper('initialize', e),
                    this._calcDimensions(),
                'top' in e || (this.top = this.minY),
                'left' in e || (this.left = this.minX)
            },
            _calcDimensions: function() {
                var t = this.points,
                    e = r(t, 'x'),
                    i = r(t, 'y'),
                    n = s(t, 'x'),
                    o = s(t, 'y');
                this.width = n - e || 1,
                    this.height = o - i || 1,
                    this.minX = e,
                    this.minY = i
            },
            _applyPointOffset: function() {
                this.points.forEach(function(t) {
                    t.x -= this.minX + this.width / 2,
                        t.y -= this.minY + this.height / 2
                }, this)
            },
            toObject: function(t) {
                return i(this.callSuper('toObject', t), {
                    points: this.points.concat()
                })
            },
            toSVG: function(t) {
                for (var e = [], i = this._createBaseSVGMarkup(), r = 0, s = this.points.length; s > r; r++) e.push(n(this.points[r].x, 2), ',', n(this.points[r].y, 2), ' ');
                return i.push('<', this.type, ' ', 'points="', e.join(''), '" style="', this.getSvgStyles(), '" transform="', this.getSvgTransform(), ' ', this.getSvgTransformMatrix(), '"/>\n'),
                    t ? t(i.join('')) : i.join('')
            },
            _render: function(t) {
                this.commonRender(t),
                    this._renderFill(t), (this.stroke || this.strokeDashArray) && (t.closePath(), this._renderStroke(t))
            },
            commonRender: function(t) {
                var e;
                t.beginPath(),
                this._applyPointOffset && (this.group && 'path-group' === this.group.type || this._applyPointOffset(), this._applyPointOffset = null),
                    t.moveTo(this.points[0].x, this.points[0].y);
                for (var i = 0, r = this.points.length; r > i; i++) e = this.points[i],
                    t.lineTo(e.x, e.y)
            },
            _renderDashedStroke: function(t) {
                e.Polyline.prototype._renderDashedStroke.call(this, t),
                    t.closePath()
            },
            complexity: function() {
                return this.points.length
            }
        }), void(e.Polygon.fromObject = function(t) {
            return new e.Polygon(t.points, t, !0)
        }))
    }('undefined' != typeof exports ? exports : this),
    function(t) {
        'use strict';
        var e = t.fabric || (t.fabric = {}),
            i = e.util.array.min,
            r = e.util.array.max,
            s = e.util.object.extend,
            n = Object.prototype.toString,
            o = e.util.drawArc,
            a = {
                m: 2,
                l: 2,
                h: 1,
                v: 1,
                c: 6,
                s: 4,
                q: 4,
                t: 2,
                a: 7
            },
            h = {
                m: 'l',
                M: 'L'
            };
        return e.Path ? void e.warn('fabric.Path is already defined') : (e.Path = e.util.createClass(e.Object, {
            type: 'path',
            path: null,
            minX: 0,
            minY: 0,
            initialize: function(t, e) {
                if (e = e || {}, this.setOptions(e), !t) throw new Error('`path` argument is required');
                var i = '[object Array]' === n.call(t);
                if (this.path = i ? t : t.match && t.match(/[mzlhvcsqta][^mzlhvcsqta]*/gi), this.path) {
                    i || (this.path = this._parsePath());
                    var r = this._parseDimensions();
                    this.minX = r.left,
                        this.minY = r.top,
                        this.width = r.width,
                        this.height = r.height,
                        this.top = this.top || this.minY,
                        this.left = this.left || this.minX,
                        this.pathOffset = this.pathOffset || {
                            x: this.minX + this.width / 2,
                            y: this.minY + this.height / 2
                        },
                    e.sourcePath && this.setSourcePath(e.sourcePath)
                }
            },
            _render: function(t) {
                var e,
                    i,
                    r,
                    s,
                    n,
                    a = null,
                    h = 0,
                    c = 0,
                    l = 0,
                    u = 0,
                    f = 0,
                    g = 0,
                    p = -this.pathOffset.x,
                    d = -this.pathOffset.y;
                this.group && 'path-group' === this.group.type && (p = 0, d = 0),
                    t.beginPath();
                for (var v = 0, b = this.path.length; b > v; ++v) {
                    switch (e = this.path[v], e[0]) {
                        case 'l':
                            l += e[1],
                                u += e[2],
                                t.lineTo(l + p, u + d);
                            break;
                        case 'L':
                            l = e[1],
                                u = e[2],
                                t.lineTo(l + p, u + d);
                            break;
                        case 'h':
                            l += e[1],
                                t.lineTo(l + p, u + d);
                            break;
                        case 'H':
                            l = e[1],
                                t.lineTo(l + p, u + d);
                            break;
                        case 'v':
                            u += e[1],
                                t.lineTo(l + p, u + d);
                            break;
                        case 'V':
                            u = e[1],
                                t.lineTo(l + p, u + d);
                            break;
                        case 'm':
                            l += e[1],
                                u += e[2],
                                h = l,
                                c = u,
                                t.moveTo(l + p, u + d);
                            break;
                        case 'M':
                            l = e[1],
                                u = e[2],
                                h = l,
                                c = u,
                                t.moveTo(l + p, u + d);
                            break;
                        case 'c':
                            i = l + e[5],
                                r = u + e[6],
                                f = l + e[3],
                                g = u + e[4],
                                t.bezierCurveTo(l + e[1] + p, u + e[2] + d, f + p, g + d, i + p, r + d),
                                l = i,
                                u = r;
                            break;
                        case 'C':
                            l = e[5],
                                u = e[6],
                                f = e[3],
                                g = e[4],
                                t.bezierCurveTo(e[1] + p, e[2] + d, f + p, g + d, l + p, u + d);
                            break;
                        case 's':
                            i = l + e[3],
                                r = u + e[4],
                                f = f ? 2 * l - f : l,
                                g = g ? 2 * u - g : u,
                                t.bezierCurveTo(f + p, g + d, l + e[1] + p, u + e[2] + d, i + p, r + d),
                                f = l + e[1],
                                g = u + e[2],
                                l = i,
                                u = r;
                            break;
                        case 'S':
                            i = e[3],
                                r = e[4],
                                f = 2 * l - f,
                                g = 2 * u - g,
                                t.bezierCurveTo(f + p, g + d, e[1] + p, e[2] + d, i + p, r + d),
                                l = i,
                                u = r,
                                f = e[1],
                                g = e[2];
                            break;
                        case 'q':
                            i = l + e[3],
                                r = u + e[4],
                                f = l + e[1],
                                g = u + e[2],
                                t.quadraticCurveTo(f + p, g + d, i + p, r + d),
                                l = i,
                                u = r;
                            break;
                        case 'Q':
                            i = e[3],
                                r = e[4],
                                t.quadraticCurveTo(e[1] + p, e[2] + d, i + p, r + d),
                                l = i,
                                u = r,
                                f = e[1],
                                g = e[2];
                            break;
                        case 't':
                            i = l + e[1],
                                r = u + e[2],
                                null === a[0].match(/[QqTt]/) ? (f = l, g = u) : 't' === a[0] ? (f = 2 * l - s, g = 2 * u - n) : 'q' === a[0] && (f = 2 * l - f, g = 2 * u - g),
                                s = f,
                                n = g,
                                t.quadraticCurveTo(f + p, g + d, i + p, r + d),
                                l = i,
                                u = r,
                                f = l + e[1],
                                g = u + e[2];
                            break;
                        case 'T':
                            i = e[1],
                                r = e[2],
                                f = 2 * l - f,
                                g = 2 * u - g,
                                t.quadraticCurveTo(f + p, g + d, i + p, r + d),
                                l = i,
                                u = r;
                            break;
                        case 'a':
                            o(t, l + p, u + d, [
                                e[1],
                                e[2],
                                e[3],
                                e[4],
                                e[5],
                                e[6] + l + p,
                                e[7] + u + d
                            ]),
                                l += e[6],
                                u += e[7];
                            break;
                        case 'A':
                            o(t, l + p, u + d, [
                                e[1],
                                e[2],
                                e[3],
                                e[4],
                                e[5],
                                e[6] + p,
                                e[7] + d
                            ]),
                                l = e[6],
                                u = e[7];
                            break;
                        case 'z':
                        case 'Z':
                            l = h,
                                u = c,
                                t.closePath()
                    }
                    a = e
                }
                this._renderFill(t),
                    this._renderStroke(t)
            },
            render: function(t, i) {
                this.visible && (t.save(), this._setupCompositeOperation(t), i || this.transform(t), this._setStrokeStyles(t), this._setFillStyles(t), this.group && 'path-group' === this.group.type && t.translate(-this.group.width / 2, -this.group.height / 2), this.transformMatrix && t.transform.apply(t, this.transformMatrix), this._setOpacity(t), this._setShadow(t), this.clipTo && e.util.clipContext(this, t), this._render(t, i), this.clipTo && t.restore(), this._removeShadow(t), this._restoreCompositeOperation(t), t.restore())
            },
            toString: function() {
                return '#<fabric.Path (' + this.complexity() + '): { "top": ' + this.top + ', "left": ' + this.left + ' }>'
            },
            toObject: function(t) {
                var e = s(this.callSuper('toObject', t), {
                    path: this.path.map(function(t) {
                        return t.slice()
                    }),
                    pathOffset: this.pathOffset
                });
                return this.sourcePath && (e.sourcePath = this.sourcePath),
                this.transformMatrix && (e.transformMatrix = this.transformMatrix),
                    e
            },
            toDatalessObject: function(t) {
                var e = this.toObject(t);
                return this.sourcePath && (e.path = this.sourcePath),
                    delete e.sourcePath,
                    e
            },
            toSVG: function(t) {
                for (var e = [], i = this._createBaseSVGMarkup(), r = '', s = 0, n = this.path.length; n > s; s++) e.push(this.path[s].join(' '));
                var o = e.join(' ');
                return this.group && 'path-group' === this.group.type || (r = 'translate(' + -this.pathOffset.x + ', ' + -this.pathOffset.y + ')'),
                    i.push('<path ', 'd="', o, '" style="', this.getSvgStyles(), '" transform="', this.getSvgTransform(), r, this.getSvgTransformMatrix(), '" stroke-linecap="round" ', '/>\n'),
                    t ? t(i.join('')) : i.join('')
            },
            complexity: function() {
                return this.path.length
            },
            _parsePath: function() {
                for (var t, e, i, r, s, n = [], o = [], c = /([-+]?((\d+\.\d+)|((\d+)|(\.\d+)))(?:e[-+]?\d+)?)/gi, l = 0, u = this.path.length; u > l; l++) {
                    for (t = this.path[l], r = t.slice(1).trim(), o.length = 0; i = c.exec(r);) o.push(i[0]);
                    s = [
                        t.charAt(0)
                    ];
                    for (var f = 0, g = o.length; g > f; f++) e = parseFloat(o[f]),
                    isNaN(e) || s.push(e);
                    var p = s[0],
                        d = a[p.toLowerCase()],
                        v = h[p] || p;
                    if (s.length - 1 > d)
                        for (var b = 1, y = s.length; y > b; b += d) n.push([p].concat(s.slice(b, b + d))),
                            p = v;
                    else n.push(s)
                }
                return n
            },
            _parseDimensions: function() {
                for (var t, s, n, o, a, h, c = [], l = [], u = null, f = 0, g = 0, p = 0, d = 0, v = 0, b = 0, y = 0, m = this.path.length; m > y; ++y) {
                    switch (t = this.path[y], t[0]) {
                        case 'l':
                            p += t[1],
                                d += t[2],
                                h = [];
                            break;
                        case 'L':
                            p = t[1],
                                d = t[2],
                                h = [];
                            break;
                        case 'h':
                            p += t[1],
                                h = [];
                            break;
                        case 'H':
                            p = t[1],
                                h = [];
                            break;
                        case 'v':
                            d += t[1],
                                h = [];
                            break;
                        case 'V':
                            d = t[1],
                                h = [];
                            break;
                        case 'm':
                            p += t[1],
                                d += t[2],
                                f = p,
                                g = d,
                                h = [];
                            break;
                        case 'M':
                            p = t[1],
                                d = t[2],
                                f = p,
                                g = d,
                                h = [];
                            break;
                        case 'c':
                            s = p + t[5],
                                n = d + t[6],
                                v = p + t[3],
                                b = d + t[4],
                                h = e.util.getBoundsOfCurve(p, d, p + t[1], d + t[2], v, b, s, n),
                                p = s,
                                d = n;
                            break;
                        case 'C':
                            p = t[5],
                                d = t[6],
                                v = t[3],
                                b = t[4],
                                h = e.util.getBoundsOfCurve(p, d, t[1], t[2], v, b, p, d);
                            break;
                        case 's':
                            s = p + t[3],
                                n = d + t[4],
                                v = v ? 2 * p - v : p,
                                b = b ? 2 * d - b : d,
                                h = e.util.getBoundsOfCurve(p, d, v, b, p + t[1], d + t[2], s, n),
                                v = p + t[1],
                                b = d + t[2],
                                p = s,
                                d = n;
                            break;
                        case 'S':
                            s = t[3],
                                n = t[4],
                                v = 2 * p - v,
                                b = 2 * d - b,
                                h = e.util.getBoundsOfCurve(p, d, v, b, t[1], t[2], s, n),
                                p = s,
                                d = n,
                                v = t[1],
                                b = t[2];
                            break;
                        case 'q':
                            s = p + t[3],
                                n = d + t[4],
                                v = p + t[1],
                                b = d + t[2],
                                h = e.util.getBoundsOfCurve(p, d, v, b, v, b, s, n),
                                p = s,
                                d = n;
                            break;
                        case 'Q':
                            v = t[1],
                                b = t[2],
                                h = e.util.getBoundsOfCurve(p, d, v, b, v, b, t[3], t[4]),
                                p = t[3],
                                d = t[4];
                            break;
                        case 't':
                            s = p + t[1],
                                n = d + t[2],
                                null === u[0].match(/[QqTt]/) ? (v = p, b = d) : 't' === u[0] ? (v = 2 * p - o, b = 2 * d - a) : 'q' === u[0] && (v = 2 * p - v, b = 2 * d - b),
                                o = v,
                                a = b,
                                h = e.util.getBoundsOfCurve(p, d, v, b, v, b, s, n),
                                p = s,
                                d = n,
                                v = p + t[1],
                                b = d + t[2];
                            break;
                        case 'T':
                            s = t[1],
                                n = t[2],
                                v = 2 * p - v,
                                b = 2 * d - b,
                                h = e.util.getBoundsOfCurve(p, d, v, b, v, b, s, n),
                                p = s,
                                d = n;
                            break;
                        case 'a':
                            h = e.util.getBoundsOfArc(p, d, t[1], t[2], t[3], t[4], t[5], t[6] + p, t[7] + d),
                                p += t[6],
                                d += t[7];
                            break;
                        case 'A':
                            h = e.util.getBoundsOfArc(p, d, t[1], t[2], t[3], t[4], t[5], t[6], t[7]),
                                p = t[6],
                                d = t[7];
                            break;
                        case 'z':
                        case 'Z':
                            p = f,
                                d = g
                    }
                    u = t,
                        h.forEach(function(t) {
                            c.push(t.x),
                                l.push(t.y)
                        }),
                        c.push(p),
                        l.push(d)
                }
                var _ = i(c),
                    C = i(l),
                    x = r(c),
                    w = r(l),
                    O = x - _,
                    S = w - C,
                    j = {
                        left: _,
                        top: C,
                        width: O,
                        height: S
                    };
                return j
            }
        }),
            e.Path.fromObject = function(t, i) {
                'string' == typeof t.path ? e.loadSVGFromURL(t.path, function(r) {
                    var s = r[0],
                        n = t.path;
                    delete t.path,
                        e.util.object.extend(s, t),
                        s.setSourcePath(n),
                        i(s)
                }) : i(new e.Path(t.path, t))
            },
            void(e.Path.async = !0))
    }('undefined' != typeof exports ? exports : this),
    function(t) {
        'use strict';
        var e = t.fabric || (t.fabric = {}),
            i = e.util.object.extend,
            r = e.util.array.invoke,
            s = e.Object.prototype.toObject;
        return e.PathGroup ? void e.warn('fabric.PathGroup is already defined') : (e.PathGroup = e.util.createClass(e.Path, {
            type: 'path-group',
            fill: '',
            initialize: function(t, e) {
                e = e || {},
                    this.paths = t || [];
                for (var i = this.paths.length; i--;) this.paths[i].group = this;
                this.setOptions(e),
                e.widthAttr && (this.scaleX = e.widthAttr / e.width),
                e.heightAttr && (this.scaleY = e.heightAttr / e.height),
                    this.setCoords(),
                e.sourcePath && this.setSourcePath(e.sourcePath)
            },
            render: function(t) {
                if (this.visible) {
                    t.save();
                    var i = this.transformMatrix;
                    i && t.transform(i[0], i[1], i[2], i[3], i[4], i[5]),
                        this.transform(t),
                        this._setShadow(t),
                    this.clipTo && e.util.clipContext(this, t);
                    for (var r = 0, s = this.paths.length; s > r; ++r) this.paths[r].render(t, !0);
                    this.clipTo && t.restore(),
                        this._removeShadow(t),
                        t.restore()
                }
            },
            _set: function(t, e) {
                if ('fill' === t && e && this.isSameColor())
                    for (var i = this.paths.length; i--;) this.paths[i]._set(t, e);
                return this.callSuper('_set', t, e)
            },
            toObject: function(t) {
                var e = i(s.call(this, t), {
                    paths: r(this.getObjects(), 'toObject', t)
                });
                return this.sourcePath && (e.sourcePath = this.sourcePath),
                    e
            },
            toDatalessObject: function(t) {
                var e = this.toObject(t);
                return this.sourcePath && (e.paths = this.sourcePath),
                    e
            },
            toSVG: function(t) {
                for (var e = this.getObjects(), i = 'translate(' + this.left + ' ' + this.top + ')', r = [
                    '<g ',
                    'style="',
                    this.getSvgStyles(),
                    '" ',
                    'transform="',
                    i,
                    this.getSvgTransform(),
                    '" ',
                    '>\n'
                ], s = 0, n = e.length; n > s; s++) r.push(e[s].toSVG(t));
                return r.push('</g>\n'),
                    t ? t(r.join('')) : r.join('')
            },
            toString: function() {
                return '#<fabric.PathGroup (' + this.complexity() + '): { top: ' + this.top + ', left: ' + this.left + ' }>'
            },
            isSameColor: function() {
                var t = (this.getObjects()[0].get('fill') || '').toLowerCase();
                return this.getObjects().every(function(e) {
                    return (e.get('fill') || '').toLowerCase() === t
                })
            },
            complexity: function() {
                return this.paths.reduce(function(t, e) {
                    return t + (e && e.complexity ? e.complexity() : 0)
                }, 0)
            },
            getObjects: function() {
                return this.paths
            }
        }), e.PathGroup.fromObject = function(t, i) {
            'string' == typeof t.paths ? e.loadSVGFromURL(t.paths, function(r) {
                var s = t.paths;
                delete t.paths;
                var n = e.util.groupSVGElements(r, t, s);
                i(n)
            }) : e.util.enlivenObjects(t.paths, function(r) {
                delete t.paths,
                    i(new e.PathGroup(r, t))
            })
        }, void(e.PathGroup.async = !0))
    }('undefined' != typeof exports ? exports : this),
    function(t) {
        'use strict';
        var e = t.fabric || (t.fabric = {}),
            i = e.util.object.extend,
            r = e.util.array.min,
            s = e.util.array.max,
            n = e.util.array.invoke;
        if (!e.Group) {
            var o = {
                lockMovementX: !0,
                lockMovementY: !0,
                lockRotation: !0,
                lockScalingX: !0,
                lockScalingY: !0,
                lockUniScaling: !0
            };
            e.Group = e.util.createClass(e.Object, e.Collection, {
                type: 'group',
                initialize: function(t, e) {
                    e = e || {},
                        this._objects = t || [];
                    for (var r = this._objects.length; r--;) this._objects[r].group = this;
                    this.originalState = {},
                        this.callSuper('initialize'),
                    e.originX && (this.originX = e.originX),
                    e.originY && (this.originY = e.originY),
                        this._calcBounds(),
                        this._updateObjectsCoords(),
                    e && i(this, e),
                        this.setCoords(),
                        this.saveCoords()
                },
                _updateObjectsCoords: function() {
                    this.forEachObject(this._updateObjectCoords, this)
                },
                _updateObjectCoords: function(t) {
                    var e = t.getLeft(),
                        i = t.getTop(),
                        r = this.getCenterPoint();
                    t.set({
                        originalLeft: e,
                        originalTop: i,
                        left: e - r.x,
                        top: i - r.y
                    }),
                        t.setCoords(),
                        t.__origHasControls = t.hasControls,
                        t.hasControls = !1
                },
                toString: function() {
                    return '#<fabric.Group: (' + this.complexity() + ')>'
                },
                addWithUpdate: function(t) {
                    return this._restoreObjectsState(),
                    t && (this._objects.push(t), t.group = this),
                        this.forEachObject(this._setObjectActive, this),
                        this._calcBounds(),
                        this._updateObjectsCoords(),
                        this
                },
                _setObjectActive: function(t) {
                    t.set('active', !0),
                        t.group = this
                },
                removeWithUpdate: function(t) {
                    return this._moveFlippedObject(t),
                        this._restoreObjectsState(),
                        this.forEachObject(this._setObjectActive, this),
                        this.remove(t),
                        this._calcBounds(),
                        this._updateObjectsCoords(),
                        this
                },
                _onObjectAdded: function(t) {
                    t.group = this
                },
                _onObjectRemoved: function(t) {
                    delete t.group,
                        t.set('active', !1)
                },
                delegatedProperties: {
                    fill: !0,
                    opacity: !0,
                    fontFamily: !0,
                    fontWeight: !0,
                    fontSize: !0,
                    fontStyle: !0,
                    lineHeight: !0,
                    textDecoration: !0,
                    textAlign: !0,
                    backgroundColor: !0
                },
                _set: function(t, e) {
                    if (t in this.delegatedProperties) {
                        var i = this._objects.length;
                        for (this[t] = e; i--;) this._objects[i].set(t, e)
                    } else this[t] = e
                },
                toObject: function(t) {
                    return i(this.callSuper('toObject', t), {
                        objects: n(this._objects, 'toObject', t)
                    })
                },
                render: function(t) {
                    if (this.visible) {
                        t.save(),
                        this.clipTo && e.util.clipContext(this, t);
                        for (var i = 0, r = this._objects.length; r > i; i++) this._renderObject(this._objects[i], t);
                        this.clipTo && t.restore(),
                            t.restore()
                    }
                },
                _renderControls: function(t, e) {
                    this.callSuper('_renderControls', t, e);
                    for (var i = 0, r = this._objects.length; r > i; i++) this._objects[i]._renderControls(t)
                },
                _renderObject: function(t, e) {
                    var i = t.hasRotatingPoint;
                    t.visible && (t.hasRotatingPoint = !1, t.render(e), t.hasRotatingPoint = i)
                },
                _restoreObjectsState: function() {
                    return this._objects.forEach(this._restoreObjectState, this),
                        this
                },
                _moveFlippedObject: function(t) {
                    var e = t.get('originX'),
                        i = t.get('originY'),
                        r = t.getCenterPoint();
                    t.set({
                        originX: 'center',
                        originY: 'center',
                        left: r.x,
                        top: r.y
                    }),
                        this._toggleFlipping(t);
                    var s = t.getPointByOrigin(e, i);
                    return t.set({
                        originX: e,
                        originY: i,
                        left: s.x,
                        top: s.y
                    }),
                        this
                },
                _toggleFlipping: function(t) {
                    this.flipX && (t.toggle('flipX'), t.set('left', -t.get('left')), t.setAngle(-t.getAngle())),
                    this.flipY && (t.toggle('flipY'), t.set('top', -t.get('top')), t.setAngle(-t.getAngle()))
                },
                _restoreObjectState: function(t) {
                    return this._setObjectPosition(t),
                        t.setCoords(),
                        t.hasControls = t.__origHasControls,
                        delete t.__origHasControls,
                        t.set('active', !1),
                        t.setCoords(),
                        delete t.group,
                        this
                },
                _setObjectPosition: function(t) {
                    var e = this.getCenterPoint(),
                        i = this._getRotatedLeftTop(t);
                    t.set({
                        angle: t.getAngle() + this.getAngle(),
                        left: e.x + i.left,
                        top: e.y + i.top,
                        scaleX: t.get('scaleX') * this.get('scaleX'),
                        scaleY: t.get('scaleY') * this.get('scaleY')
                    })
                },
                _getRotatedLeftTop: function(t) {
                    var e = this.getAngle() * (Math.PI / 180);
                    return {
                        left: -Math.sin(e) * t.getTop() * this.get('scaleY') + Math.cos(e) * t.getLeft() * this.get('scaleX'),
                        top: Math.cos(e) * t.getTop() * this.get('scaleY') + Math.sin(e) * t.getLeft() * this.get('scaleX')
                    }
                },
                destroy: function() {
                    return this._objects.forEach(this._moveFlippedObject, this),
                        this._restoreObjectsState()
                },
                saveCoords: function() {
                    return this._originalLeft = this.get('left'),
                        this._originalTop = this.get('top'),
                        this
                },
                hasMoved: function() {
                    return this._originalLeft !== this.get('left') || this._originalTop !== this.get('top')
                },
                setObjectsCoords: function() {
                    return this.forEachObject(function(t) {
                        t.setCoords()
                    }),
                        this
                },
                _calcBounds: function(t) {
                    for (var e, i = [], r = [], s = 0, n = this._objects.length; n > s; ++s) {
                        e = this._objects[s],
                            e.setCoords();
                        for (var o in e.oCoords) i.push(e.oCoords[o].x),
                            r.push(e.oCoords[o].y)
                    }
                    this.set(this._getBounds(i, r, t))
                },
                _getBounds: function(t, i, n) {
                    var o = e.util.invertTransform(this.getViewportTransform()),
                        a = e.util.transformPoint(new e.Point(r(t), r(i)), o),
                        h = e.util.transformPoint(new e.Point(s(t), s(i)), o),
                        c = {
                            width: h.x - a.x || 0,
                            height: h.y - a.y || 0
                        };
                    return n || (c.left = a.x || 0, c.top = a.y || 0, 'center' === this.originX && (c.left += c.width / 2), 'right' === this.originX && (c.left += c.width), 'center' === this.originY && (c.top += c.height / 2), 'bottom' === this.originY && (c.top += c.height)),
                        c
                },
                toSVG: function(t) {
                    for (var e = [
                        '<g ',
                        'transform="',
                        this.getSvgTransform(),
                        '">\n'
                    ], i = 0, r = this._objects.length; r > i; i++) e.push(this._objects[i].toSVG(t));
                    return e.push('</g>\n'),
                        t ? t(e.join('')) : e.join('')
                },
                get: function(t) {
                    if (t in o) {
                        if (this[t]) return this[t];
                        for (var e = 0, i = this._objects.length; i > e; e++)
                            if (this._objects[e][t]) return !0;
                        return !1
                    }
                    return t in this.delegatedProperties ? this._objects[0] && this._objects[0].get(t) : this[t]
                }
            }),
                e.Group.fromObject = function(t, i) {
                    e.util.enlivenObjects(t.objects, function(r) {
                        delete t.objects,
                        i && i(new e.Group(r, t))
                    })
                },
                e.Group.async = !0
        }
    }('undefined' != typeof exports ? exports : this),
    function(t) {
        'use strict';
        var e = fabric.util.object.extend;
        return t.fabric || (t.fabric = {}),
            t.fabric.Image ? void fabric.warn('fabric.Image is already defined.') : (fabric.Image = fabric.util.createClass(fabric.Object, {
                type: 'image',
                crossOrigin: '',
                alignX: 'none',
                alignY: 'none',
                meetOrSlice: 'meet',
                initialize: function(t, e) {
                    e || (e = {}),
                        this.filters = [],
                        this.callSuper('initialize', e),
                        this._initElement(t, e),
                        this._initConfig(e),
                    e.filters && (this.filters = e.filters, this.applyFilters())
                },
                getElement: function() {
                    return this._element
                },
                setElement: function(t, e, i) {
                    return this._element = t,
                        this._originalElement = t,
                        this._initConfig(i),
                        0 !== this.filters.length ? this.applyFilters(e) : e && e(),
                        this
                },
                setCrossOrigin: function(t) {
                    return this.crossOrigin = t,
                        this._element.crossOrigin = t,
                        this
                },
                getOriginalSize: function() {
                    var t = this.getElement();
                    return {
                        width: t.width,
                        height: t.height
                    }
                },
                _stroke: function(t) {
                    t.save(),
                        this._setStrokeStyles(t),
                        t.beginPath(),
                        t.strokeRect(-this.width / 2, -this.height / 2, this.width, this.height),
                        t.closePath(),
                        t.restore()
                },
                _renderDashedStroke: function(t) {
                    var e = -this.width / 2,
                        i = -this.height / 2,
                        r = this.width,
                        s = this.height;
                    t.save(),
                        this._setStrokeStyles(t),
                        t.beginPath(),
                        fabric.util.drawDashedLine(t, e, i, e + r, i, this.strokeDashArray),
                        fabric.util.drawDashedLine(t, e + r, i, e + r, i + s, this.strokeDashArray),
                        fabric.util.drawDashedLine(t, e + r, i + s, e, i + s, this.strokeDashArray),
                        fabric.util.drawDashedLine(t, e, i + s, e, i, this.strokeDashArray),
                        t.closePath(),
                        t.restore()
                },
                toObject: function(t) {
                    return e(this.callSuper('toObject', t), {
                        src: this._originalElement.src || this._originalElement._src,
                        filters: this.filters.map(function(t) {
                            return t && t.toObject()
                        }),
                        crossOrigin: this.crossOrigin,
                        alignX: this.alignX,
                        alignY: this.alignY,
                        meetOrSlice: this.meetOrSlice
                    })
                },
                toSVG: function(t) {
                    var e = [],
                        i = -this.width / 2,
                        r = -this.height / 2,
                        s = 'none';
                    if (this.group && 'path-group' === this.group.type && (i = this.left, r = this.top), 'none' !== this.alignX && 'none' !== this.alignY && (s = 'x' + this.alignX + 'Y' + this.alignY + ' ' + this.meetOrSlice), e.push('<g transform="', this.getSvgTransform(), this.getSvgTransformMatrix(), '">\n', '<image xlink:href="', this.getSvgSrc(), '" x="', i, '" y="', r, '" style="', this.getSvgStyles(), '" width="', this.width, '" height="', this.height, '" preserveAspectRatio="', s, '"', '></image>\n'), this.stroke || this.strokeDashArray) {
                        var n = this.fill;
                        this.fill = null,
                            e.push('<rect ', 'x="', i, '" y="', r, '" width="', this.width, '" height="', this.height, '" style="', this.getSvgStyles(), '"/>\n'),
                            this.fill = n
                    }
                    return e.push('</g>\n'),
                        t ? t(e.join('')) : e.join('')
                },
                getSrc: function() {
                    return this.getElement() ? this.getElement().src || this.getElement()._src : void 0
                },
                setSrc: function(t, e, i) {
                    fabric.util.loadImage(t, function(t) {
                        return this.setElement(t, e, i)
                    }, this, i && i.crossOrigin)
                },
                toString: function() {
                    return '#<fabric.Image: { src: "' + this.getSrc() + '" }>'
                },
                clone: function(t, e) {
                    this.constructor.fromObject(this.toObject(e), t)
                },
                applyFilters: function(t) {
                    if (this._originalElement) {
                        if (0 === this.filters.length) return this._element = this._originalElement,
                            void(t && t());
                        var e = this._originalElement,
                            i = fabric.util.createCanvasElement(),
                            r = fabric.util.createImage(),
                            s = this;
                        return i.width = e.width,
                            i.height = e.height,
                            i.getContext('2d').drawImage(e, 0, 0, e.width, e.height),
                            this.filters.forEach(function(t) {
                                t && t.applyTo(i)
                            }),
                            r.width = e.width,
                            r.height = e.height,
                            fabric.isLikelyNode ? (r.src = i.toBuffer(void 0, fabric.Image.pngCompression), s._element = r, t && t()) : (r.onload = function() {
                                s._element = r,
                                t && t(),
                                    r.onload = i = e = null
                            }, r.src = i.toDataURL('image/png')),
                            this
                    }
                },
                _render: function(t, e) {
                    var i,
                        r,
                        s = this._findMargins();
                    i = e ? this.left : -this.width / 2,
                        r = e ? this.top : -this.height / 2,
                    'slice' === this.meetOrSlice && (t.beginPath(), t.rect(i, r, this.width, this.height), t.clip()),
                    this._element && t.drawImage(this._element, i + s.marginX, r + s.marginY, s.width, s.height),
                        this._renderStroke(t)
                },
                _findMargins: function() {
                    var t,
                        e,
                        i = this.width,
                        r = this.height,
                        s = 0,
                        n = 0;
                    return ('none' !== this.alignX || 'none' !== this.alignY) && (t = [
                        this.width / this._element.width,
                        this.height / this._element.height
                    ], e = 'meet' === this.meetOrSlice ? Math.min.apply(null, t) : Math.max.apply(null, t), i = this._element.width * e, r = this._element.height * e, 'Mid' === this.alignX && (s = (this.width - i) / 2), 'Max' === this.alignX && (s = this.width - i), 'Mid' === this.alignY && (n = (this.height - r) / 2), 'Max' === this.alignY && (n = this.height - r)), {
                        width: i,
                        height: r,
                        marginX: s,
                        marginY: n
                    }
                },
                _resetWidthHeight: function() {
                    var t = this.getElement();
                    this.set('width', t.width),
                        this.set('height', t.height)
                },
                _initElement: function(t) {
                    this.setElement(fabric.util.getById(t)),
                        fabric.util.addClass(this.getElement(), fabric.Image.CSS_CANVAS)
                },
                _initConfig: function(t) {
                    t || (t = {}),
                        this.setOptions(t),
                        this._setWidthHeight(t),
                    this._element && this.crossOrigin && (this._element.crossOrigin = this.crossOrigin)
                },
                _initFilters: function(t, e) {
                    t.filters && t.filters.length ? fabric.util.enlivenObjects(t.filters, function(t) {
                        e && e(t)
                    }, 'fabric.Image.filters') : e && e()
                },
                _setWidthHeight: function(t) {
                    this.width = 'width' in t ? t.width : this.getElement() ? this.getElement().width || 0 : 0,
                        this.height = 'height' in t ? t.height : this.getElement() ? this.getElement().height || 0 : 0
                },
                complexity: function() {
                    return 1
                }
            }), fabric.Image.CSS_CANVAS = 'canvas-img', fabric.Image.prototype.getSvgSrc = fabric.Image.prototype.getSrc, fabric.Image.fromObject = function(t, e) {
                fabric.util.loadImage(t.src, function(i) {
                    fabric.Image.prototype._initFilters.call(t, t, function(r) {
                        t.filters = r || [];
                        var s = new fabric.Image(i, t);
                        e && e(s)
                    })
                }, null, t.crossOrigin)
            }, fabric.Image.fromURL = function(t, e, i) {
                fabric.util.loadImage(t, function(t) {
                    e(new fabric.Image(t, i))
                }, null, i && i.crossOrigin)
            }, fabric.Image.async = !0, void(fabric.Image.pngCompression = 1))
    }('undefined' != typeof exports ? exports : this);