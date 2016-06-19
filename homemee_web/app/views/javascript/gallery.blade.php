<script type="text/javascript">
    $(function () {
        'use strict';
        $.fn.permissionSlider = function (e, n, t) {
            var i = this.closest('tr').data('permission-level');
            return this.slider({
                range: 'min',
                value: i || e,
                min: e,
                max: n,
                stop: function (e, n) {
                    var i = $(this),
                            o = i.closest('tr'),
                            a = o.data('pk');
                    if (o.data('permission-level', n.value), 'undefined' != typeof a && !isNaN(a)) {
                        i.addClass('ui-slider-active');
                        var l = [
                            {
                                pk: a,
                                permission: n.value
                            }
                        ];
                        $.postJSON(t, l, function () {
                            i.removeClass('ui-slider-active')
                        }, function () {
                            alert(gettext('Unable to change permission.')),
                                    location.reload()
                        })
                    }
                }
            })
        },
        $.extend(Selectize.prototype, {
            addAllItems: function (e) {
                var n = this,
                        t = Object.keys(this.options);
                t.splice(t.indexOf(e), 1),
                        t.forEach(function (e) {
                            n.addItem(e)
                        }),
                        n.removeItem(e)
            }
        });
        var e = {};
        e.bindToElement = function (e, n) {
            var t = {};
            $.extend(t, n);
            var i = $(e),
                    o = null;
            t.minSlider = i.data('min-slider'),
                    t.maxSlider = i.data('max-slider');
            var a = i.data('endpoint-update'),
                l = i.data('endpoint-remove'),
                s = i.data('endpoint-list'),
                r = null,
                c = function (e, n) {
                    $.ajax(s, {
                        cache: !1,
                        success: function (n) {
                            n.forEach(function (e, t) {
                                e.name.length >= 22 && (n[t].name = e.name.slice(0, 19) + '...')
                            }),
                            e && e(n)
                        },
                        error: function (e) {
                            n && n(e)
                        }
                    })
                },
                d = function () {
                    r = null,
                            o = i.find('select.objects-list').selectize({
                                maxItems: null,
                                labelField: 'name',
                                searchField: [
                                    'name',
                                    'email'
                                ],
                                highlight: !1,
                                valueField: 'pk',
                                plugins: [
                                    'remove_button'
                                ],
                                options: [
                                    {
                                        pk: 'all',
                                        name: gettext('All remaining options...')
                                    }
                                ],
                                preload: !0,
                                load: function (e, n) {
                                    null === r ? c(function (e) {
                                        r = e,
                                                n(r)
                                    }) : n(r)
                                },
                                onItemAdd: function (e) {
                                    'all' === e && this.addAllItems('all')
                                }
                            }),
                            i.find('tr .permission-slider').each(function () {
                                $(this).permissionSlider(t.minSlider, t.maxSlider, a)
                            })
                };
            i.on('click', 'button.add-objects', function () {
                var e = $(this),
                        n = i.find('tr.objects').data('permission-level'),
                        t = o[0].selectize.getValue();
                if (0 !== t.length && 0 !== n.length) {
                    var l = t.map(function (e) {
                        return {
                            pk: e,
                            permission: n
                        }
                    });
                    $.postJSON(a, l, function () {
                        e.data('inplace') ? i.trigger('add') : location.reload()
                    }, function (e) {
                        console.error(e)
                    })
                }
            }),
                i.on('click', 'tr.object a.removed', function (e) {
                    e.preventDefault();
                    var n = $(this).closest('tr'),
                            t = [
                                n.data('pk')
                            ];
                    $.postJSON(l, t, function () {
                        r = null,
                                o[0].selectize.load(c),
                                n.fadeOut(function () {
                                    n.remove()
                                })
                    }, function (e) {
                        console.error(e)
                    })
                }),
                i.on('click', 'input[type=checkbox]', function () {
                    var e,
                            n = $(this).closest('tr'),
                            t = n.data('pk'),
                            i = [];
                    n.find('input[type=checkbox]').each(function (e, n) {
                        n.checked && i.push(e + 1)
                    }),
                            'undefined' == typeof t || isNaN(t) ? n.data('permission-level', i) : (e = [
                                {
                                    pk: t,
                                    permission: i
                                }
                            ], $.postJSON(a, e, null, function () {
                                alert(gettext('Unable to change permission.')),
                                        location.reload()
                            }))
                }),
                i.on('refresh', function () {
                    d()
                }),
                d()
        },
        window.ACLPermissions = e
    });
    var Utils = new function () {
        this.get_cookie = function (e) {
            var t = null;
            if (document.cookie && '' != document.cookie) for (var a = document.cookie.split(';'), r = 0; r < a.length; r++) {
                var n = jQuery.trim(a[r]);
                if (n.substring(0, e.length + 1) == e + '=') {
                    t = decodeURIComponent(n.substring(e.length + 1));
                    break
                }
            }
            return t
        }
            },
            Library = new function () {
                var e = [],
                    t = 0,
                    a = 0,
                    r = 0,
                    n = !1,
                    i = null,
                    o = null,
                    s = 0,
                    d = function (t) {
                        $('.file-progress[data-index=' + t + ']').fadeOut();
                        for (var a = 0; a < e.length; a++) e[a].index === t && e.splice(a, 1);
                        o && 4 !== o.readyState && s === t && (o.userAbort = !0, o.abort(), p($('#panel-library'), !0))
                    },
                    l = function (t) {
                        for (var a = $('#panel-library'), n = 0; n < t.length; n++) e.push({
                            index: r + n,
                            type: 'media',
                            file: t[n],
                            destination: a.data('pk')
                        });
                        r += t.length,
                                p(a)
                    },
                    p = function (t, a) {
                        if (!n || a) {
                            if (n || (n = !0, t.trigger('upload.start')), e.length <= 0) return n = !1,
                                    void t.trigger('upload.end');
                            var r = e.shift();
                            if ('media' === r.type && !r.file.name.toLowerCase().match(/(jpe?g|png|mpe?g|avi|mp4)$/)) {
                                console.log("error");
                                $.notify('{{trans('lang.file_extension_not_supported')}}', "error");
                                return t.trigger('upload.error', {
                                    index: r.index,
                                    type: r.type,
                                    file: r.file,
                                    status: 'error',
                                    message: "{{trans('lang.file_extension_not_supported')}}"
                                }),
                                        void window.setTimeout(function () {
                                            p(t, !0)
                                        }, 10);
                            }
                            //cuongbm
                            var url = '/contents/' + $('#panel-library').data('pk') + '/upload';
                            o = new XMLHttpRequest,
                                    o.open('POST', url, !0),
//                                    o.setRequestHeader('X-CSRFToken', Utils.get_cookie('csrftoken')),
                                    o.setRequestHeader('Api-Token', '{{\Session::get("token")}}'),
                                    o.upload.addEventListener('progress', function (e) {
                                        e.lengthComputable ? t.trigger('upload.progress', [
                                            e.loaded,
                                            e.total,
                                            r.index
                                        ]) : t.trigger('upload.progress', [
                                            100,
                                            100,
                                            r.index
                                        ])
                                    }, !1),
                                    o.onreadystatechange = function () {
                                        if (4 === o.readyState && !o.userAbort) {
                                            var e = {
                                                index: r.index,
                                                type: r.type,
                                                file: r.file,
                                                status: 'error',
                                                message: gettext("{{trans('lang.cannot_contact_server')}}")
                                            };
                                            showNotify(JSON.parse(o.response));
                                            200 == o.status && $.extend(e, JSON.parse(o.responseText)),
                                                //cuongbm
                                                    e.status === 200 ? e.status = 'success' : e.status = e.status,
                                                    t.trigger('upload.' + e.status, e),
                                                    window.setTimeout(function () {
                                                        p(t, !0)
                                                    }, 10)
                                        }
                                    };
                            var i = new FormData;
                            i.append('path', r.destination),
                                    i.append('name', r.file.name),
                                    i.append('file', r.file),
                                    o.send(i),
                                    t.trigger('upload.item', [
                                        r.index
                                    ])
                        }
                    },
                    u = function (e, t) {
                        var a = $('<ul class="files ui-helper-clearfix">');
                        $.each(e.files, function (e, t) {
                            t.naturalType = {
                                dir: gettext("{{trans('lang.folder')}}"),
                                image: gettext("{{trans('lang.image')}}"),
                                url: gettext("{{trans('lang.url')}}"),
                                video: gettext("{{trans('lang.video')}}"),
                                'file-audio': gettext("{{trans('lang.audio')}}"),
                                'file-swf': gettext("{{trans('lang.adobe_flash')}}")
                            }
                            [
                            t.type
                            ] || gettext("{{trans('lang.other')}}"),
                            ('other' == t.type || 'Folder' == t.type || 'image' == t.type || 'video' == t.type || 'url' == t.type) && 'undefined' != typeof t.thumb && (t.thumbAvailable = !0),
                            t.naturalSize = function () {
                                if ('dir' == t.type) return '-';
                                var e = Math.log(t.size) / Math.log(1000) | 0;
                                return (t.size / Math.pow(1000, e)).toFixed(2) + ' ' + (e ? 'KMGTPEZY'[--e] + 'B' : 'Bytes')
                            },
                            t.naturalDate = function () {
                                return (t.created_at);//.format('L LT')
                            },
                            t.mpath = JSON.stringify(t.mpath),
                            a.append(ich['library-item'](t))
                        }),
                        $('.filebrowser .loading').addClass('hidden'),
                        $('#library-content').find('ul.files').replaceWith(a),
                        e.files.length > 0 ? (t && $('.filebrowser').removeClass('search'), $('.filebrowser').removeClass('empty')) : (t && $('.filebrowser').addClass('search'), $('.filebrowser').addClass('empty'))
                    };
                this.Create = function () {
                    $('.btn-home').on('click', function () {
                        return Library.navigate($(this).data('pk')),
                            !1
                    }),
                    $('#breadcrumb').on('click', 'li', function () {
                        return Library.navigate($(this).data('pk')),
                                !1
                    });
                    var n = document.getElementById('panel-library');
                    document.body.ondragenter = function (e) {
                        e.stopPropagation(),
                                e.preventDefault(),
                                $('.filebrowser .drop-message').removeClass('hidden')
                    },
                    document.body.ondragover = function (e) {
                        e.stopPropagation(),
                                e.preventDefault()
                    },
                    document.body.ondragleave = function (e) {
                        var t = $(e.target);
                        t.hasClass('drop-message') && $('.filebrowser .drop-message').addClass('hidden')
                    },
                    document.body.ondrop = function (e) {
                        e.stopPropagation(),
                                e.preventDefault(),
                                $('.filebrowser .drop-message').addClass('hidden')
                    },
                    n.ondrop = function (e) {
                        return e.preventDefault(),
                                e.stopPropagation(),
                                $('.filebrowser .drop-message').addClass('hidden'),
                        e.dataTransfer && l(e.dataTransfer.files || []),
                                !1
                    },
                    $(n).on('upload.start', function () {
                        $('.panel-tip').removeClass('hidden')
                    }),
                    $(n).on('upload.item', function (e, t) {
                        var a = $('li[data-index=' + t + ']');
                        a.find('.upload-progress').removeClass('hidden').progressbar({
                            value: 0
                        }),
                                s = t
                    }),
                    $(n).on('upload.progress', function (e, t, a, r) {
                        var n = $('li[data-index=' + r + ']'),
                                i = 100 * t / a;
                        n.find('.upload-progress').progressbar({
                            value: i
                        })
                    }),
                    $(n).on('upload.end', function () {
                        var e = $('.panel-tip').addClass('hidden');
                        e.find('.upload-list').empty(),
                                r = 0,
                                a = 0,
                                t = 0
                    }),
                    $(n).on('upload.success', function (e, t) {
                        $('li[data-index=' + t.index + ']').remove();
                        Library.refresh()
                    }),
                    $('#file-upload').on('change', function (e) {
                        var t = e.target.files;
                        t.length > 0 && l(t)
                    }),
                    $('.button.upload').on('click', function (e) {
                        e.preventDefault(),
                                e.stopPropagation(),
                                $('#file-upload').click()
                    }),
                    $(n).on('click', '.cancel-upload', function (e) {
                        var t = $(this).parent().data('index');
                        d(t),
                                e.preventDefault(),
                                e.stopPropagation()
                    }),
                    e.push = function (e) {
                        var t,
                                a = Array.prototype.push;
                        return t = ich['file-progress'](e),
                                $('.upload-list').append(t),
                                a.call(this, e)
                    }
                },
                this.remove = function (e, t) {
                    // cuongbm
                    if (e.length <= 0) {
                        return void 0;
                    } else {
                        var data = {id: e};
                        visionone_ajax({
                            url: '/contents/' + $('#panel-library').data('pk') + '/delete',
                            type: "POST",
                            data: (data),
                            success: function (data, textStatus, jqXHR) {
                                showNotify(data, null);
                                Library.refresh();
                            },
                            async: false,
                            error: function (jqXHR, textStatus, errorThrown) {
                                $.notify("{{trans('lang.error')}}", "error");
                            }
                        })
                        {{--$.postJSON('/contents/' + $('#panel-library').data('pk') + '/delete', data, function (t) {--}}
                            {{--showNotify(t, null);--}}
                            {{--Library.refresh();--}}
                        {{--}, function (e) {--}}
                            {{--$.notify("{{trans('lang.error')}}", "error");--}}
                        {{--})--}}
                    }
                },
                this.move = function (e, t, a) {
                    // cuongbm
                    if (e.length <= 0) {
                        return void 0;
                    } else {
                        var data = {idFiles: e};
                        visionone_ajax({
                            url: '/contents/'+ t + '/move',
                            type: "POST",
                            data: data,
                            success: function (t, textStatus, jqXHR) {
                                showNotify(t, null);
                                Library.refresh();
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                $.notify("{{trans('lang.error')}}", "error");
                            }
                        });
                    }
                },
                this.rename = function (e, t, a) {
                    // cuongbm
                    var data = {'id': e, 'org_name': t}
                    return visionone_ajax({
                        url: '/contents/' + e + '/rename',
                        type: "POST",
                        data: data,
                        success: function (data, textStatus, jqXHR) {
                            showNotify(data, null);
                            Library.refresh();
                        },
                        async: false,
                        error: function (jqXHR, textStatus, errorThrown) {
                            $.notify("{{trans('lang.error')}}", "error");
                        }
                    })
                    {{--return $.postJSON('/contents/' + e + '/rename', {--}}
                        {{--'id': e,--}}
                        {{--'org_name': t--}}
                    {{--}, function (t) {--}}
                        {{--showNotify(t, null);--}}
                        {{--Library.refresh();--}}
                    {{--}, function (e) {--}}
                        {{--$.notify("{{trans('lang.error')}}", "error");--}}
                    {{--})--}}
                },
                this.duplicate = function (e, t) {
                    return $.postJSON('/media/api/duplicate', [
                        e
                    ], t)
                },
                this.create_dir = function (e, t) {
                    var data = {name: e};
                    return visionone_ajax({
                        url: '/contents/' + $('#panel-library').data('pk') + '/folder',
                        type: "POST",
                        data: data,
                        success: function (data, textStatus, jqXHR) {
                            showNotify(data, null);
                            Library.refresh();
                        },
                        async: false,
                        error: function (jqXHR, textStatus, errorThrown) {
                            $.notify("{{trans('lang.error')}}", "error");
                        }
                    })
                    {{--$.postJSON('/contents/' + $('#panel-library').data('pk') + '/folder', {--}}
                        {{--name: e--}}
                    {{--}, function (t) {--}}
                        {{--showNotify(t, null);--}}
                        {{--Library.refresh();--}}
                    {{--}, function (e) {--}}
                        {{--$.notify("{{trans('lang.error')}}", "error");--}}
                    {{--})--}}
                },
                this.navigate = function (e) {
                    Library.change_directory(e, function (t) {
                        for (var a = '', r = 0; r < t.path.length; r++) a += t.path[r].name + '/';
                        $('#library-content').trigger('navigation', [
                            e,
                            a
                        ])
                    })
                },
                this.change_directory = function (e, t) {
                    e || (e = $('#panel-library').data('rootPk')),
                    $('#panel-library').data('pk') !== e && ($('#panel-library').data('pk', e), Library.refresh(t))
                },
                this.refresh = function (e) {
                    //cuongbm
                    var t = '/contents/'+ $('#panel-library').data('pk') + '/list';
                    i && 4 != i.readyState && i.abort(),
                        $('.filebrowser .loading').removeClass('hidden'),
                        i = visionone_ajax({
                            url: t,
                            type: "GET",
                            data: null,
                            success: function (t, textStatus, jqXHR) {
                                showNotify(t, function () {
                                    t = t.data;
                                    $('#panel-library').data('pk', t.pk),
                                    e && e(t);
                                    var a = $('#breadcrumb');
                                    a.empty().append(ich['breadcrumb-item'](t));
                                    var r = a.parent().width();
                                    a.find('span').each(function () {
                                        return a.width() < r ? !1 : void $(this).text('...')
                                    }),
                                            u(t);
                                    var n = Math.round(t.quota_used / t.quota_total * 100);
                                    $('.remaining-space').toggleClass('warning', n > 90).find('em').text(n + '%'),
                                            $('#filter-media').trigger('keyup'),
                                            $('#library-content').trigger('refresh'),
                                            $('.navigation-options').show(),
                                            $('.search-options').hide()
                                });
                            },
                            async: false,
                            error: function (jqXHR, textStatus, errorThrown) {
                                $.notify("{{trans('lang.error')}}", "error");
                            }
                        })
                        {{--i = $.getJSON(t, function (t) {--}}
                            {{--showNotify(t, function () {--}}
                                {{--t = t.data;--}}
                                {{--$('#panel-library').data('pk', t.pk),--}}
                                {{--e && e(t);--}}
                                {{--var a = $('#breadcrumb');--}}
                                {{--a.empty().append(ich['breadcrumb-item'](t));--}}
                                {{--var r = a.parent().width();--}}
                                {{--a.find('span').each(function () {--}}
                                    {{--return a.width() < r ? !1 : void $(this).text('...')--}}
                                {{--}),--}}
                                        {{--u(t);--}}
                                {{--var n = Math.round(t.quota_used / t.quota_total * 100);--}}
                                {{--$('.remaining-space').toggleClass('warning', n > 90).find('em').text(n + '%'),--}}
                                        {{--$('#filter-media').trigger('keyup'),--}}
                                        {{--$('#library-content').trigger('refresh'),--}}
                                        {{--$('.navigation-options').show(),--}}
                                        {{--$('.search-options').hide()--}}
                            {{--});--}}
                        {{--}, function (t) {--}}
                            {{--$.notify("{{trans('lang.error')}}", "error");--}}
                        {{--})--}}
                },
                this.search = function (e) {
                    if (void 0 === e || 0 === e.length) return void this.refresh();
                    //cuongbm
                    var t = '/contents/' + $('#panel-library').data('pk') + '/list?search=' + e;
                    visionone_ajax({
                        url: t,
                        type: "GET",
                        data: "",
                        success: function (e) {
                            showNotify(e, function () {
                                e = e.data;
                                u(e, !0),
                                        $('.navigation-options').hide(),
                                        $('.search-options').show(),
                                        $('#library-content').trigger('refresh')
                            });

                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            $.notify("{{trans('lang.error')}}", "error");
                        }
                    });
                }
            };
    $(function () {
        function e(e) {
            var t,
                    i,
                    o = e;
            return i = e.split('.'),
            i.length > 1 && (t = i.pop(), o = e.slice(0, -(t.length + 1))),
                    o
        }

        function t(e) {
            var t = e % 2 === 0 ? 'grid-view' : 'list-view';
            $('li[data-view=' + t + ']').addClass('pressed'),
            e - 2 > 0 && (t = t.concat(' view-info'), $('li[data-view=view-info]').addClass('pressed')),
                    $('.filebrowser').addClass(t)
        }

        function i() {
            var e = $('.files li').length,
                    t = $('.files li.selected').length;
            t > 0 ? (t === e ? $('.files-header .select-all').removeClass('indeterminate').addClass('selected') : $('.files-header .select-all').removeClass('selected').addClass('indeterminate'), $('.library-sidebar').addClass('show-info'), $('.button.move, .button.delete, .button.create-campaign').removeClass('hidden')) : ($('.files-header .select-all').removeClass('selected indeterminate'), $('.library-sidebar').removeClass('show-info'), $('.button.move, .button.delete, .button.create-campaign').addClass('hidden'))
        }

        function o() {
            var e = $('#library-content');
            e.height(Math.max($('body').height() - (e.offset().top + 120), 300))
        }

        function a(e, t) {
            var i = $('.notification ul');
            i.append($('<li>').html(t)),
                    $('.notification').addClass(e).fadeTo(500, 1, function () {
                        i.slideDown('fast').removeClass('collapsed');
                        var e = i.find('li').last();
                        window.setTimeout(function () {
                            e.slideToggle('fast', function () {
                                $(this).remove()
                            })
                        }, 5000),
                                window.clearTimeout(n),
                                n = window.setTimeout(function () {
                                    $('.close-notification').trigger('click')
                                }, 5000)
                    })
        }

        var n;
        var isShowCreateFolder = false;
        var isShowRename = false;
        var isShowDelete = false;
        $('.button.move').on('click', function () {
            var e = [];
            $('.filebrowser .files li.selected').each(function () {
                e.push($(this).data())
            });
            var t = ich['move-popover']({
                files: e
            });
            t.appendTo('body').overlay({
                mask: {
                    color: '#000',
                    loadSpeed: 200,
                    opacity: 0.5
                },
                left: 'center',
                top: '15%',
                fixed: !1,
                closeOnClick: !1,
                closeOnEsc: !0,
                load: !0
            }).on('onClose', function () {
                t.remove()
            });
            var i = t.find('select[name=move-destination]').selectize({
                labelField: 'name',
                searchField: [
                    'name'
                ],
                sortField: 'name',
                valueField: 'pk',
                preload: !0,
                load: function (e, t) {
                    $.getJSON('/media/api/directory/list', function (e) {
                        t(e.folders)
                    })
                }
            });
            return t.find('.proceed').on('click', function () {
                if (i.val()) {
                    var t = e.map(function (e) {
                        return e.pk
                    });
                    Library.move(t, i.val(), function (e) {
                        a(e.status, gettext(e.message)),
                                Library.refresh()
                    })
                }
            }),
            !1
        }),
        $('.button.delete').on('click', function (e) {
            e.preventDefault();
            var o = [];
            $('.filebrowser .files li.selected').each(function () {
                o.push($(this).data('pk'))
            });
            var n = gettext("{{trans('lang.do_you_want_to_delete_files')}}");
            var label = interpolate(n, [
                o.length
            ]);
//            console.log(label);
            $('#answer_label').text(label);
            $('button, input[type=submit]').attr('disabled',false);
            $('#deleteModal').modal('show');
            isShowDelete = true;
            $('#deleteModal').on('keyup', function (e) {
                if(13 === e.keyCode && isShowDelete) {
                    e.preventDefault();
                    $('#delete_content_bt').trigger('click')
                }
            });
        }),
        $('#delete_content_bt').on('click', function (e) {
            e.preventDefault();
            var i, o = [];
            $('.filebrowser .files li.selected').each(function () {
                o.push($(this).data('pk'))
            });
//            console.log(o);
            if (o.length > 0) {
                $('#delete_content_bt, input[type=submit]').attr('disabled',true);
                $('#deleteModal').modal('hide');
                isShowDelete = false;

                Library.remove(o, function (e) {
                    {{--var t = '';--}}
                    {{--'200' == e.status ? t = gettext("{{trans('lang.file_deleted')}}") : (t = gettext("{{trans('lang.unable_to_delete')}}"), t = interpolate(t, [--}}
                        {{--e.message--}}
                    {{--])),--}}
                    {{--a(e.status, t),--}}
                    Library.refresh()
                })
            }
        }),
        {{--$('.button.delete').on('click', function (e) {--}}
            {{--var t, i, o = [];--}}
            {{--if (e.preventDefault(), e.stopPropagation(), i = function () {--}}
                {{--Library.remove(o, function (e) {--}}
                    {{--var t = '';--}}
                    {{--'200' == e.status ? t = gettext("{{trans('lang.file_deleted')}}") : (t = gettext("{{trans('lang.unable_to_delete')}}"), t = interpolate(t, [--}}
                        {{--e.message--}}
                    {{--])),--}}
                    {{--a(e.status, t),--}}
                    {{--Library.refresh()--}}
                {{--})--}}
            {{--}, $('.filebrowser .files li.selected').each(function () {--}}
                {{--o.push($(this).data('pk'))--}}
            {{--}), o.length > 0) {--}}
                {{--t = $('.dialogbox');--}}
                {{--var n = gettext("{{trans('lang.are_you_sure_you_want_to_delete_files')}}");--}}
                {{--n = interpolate(n, [--}}
                    {{--o.length--}}
                {{--]),--}}
                {{--t.find('h3').text(gettext("{{trans('lang.delete')}}")),--}}
                {{--t.find('.dialog-content p').text(n),--}}
                {{--$('.dialog-buttons button:last-of-type').off('click.custom').on('click.custom', function () {--}}
                    {{--i()--}}
                {{--}),--}}
                {{--$('.dialogbox').overlay().load()--}}
            {{--}--}}
        {{--}),--}}
        $('.button.create-campaign').on('click', function () {
            var e = $(this),
                    t = [];
            $('.filebrowser .files li.selected').each(function () {
                t.push($(this).data())
            });
            var i = ich['create-campaign-popover']();
            i.appendTo('body').overlay({
                mask: {
                    color: '#000',
                    loadSpeed: 200,
                    opacity: 0.5
                },
                left: 'center',
                top: '15%',
                fixed: !1,
                closeOnClick: !1,
                closeOnEsc: !0,
                load: !0
            }).on('onClose', function () {
                i.remove()
            });
            var o = i.find('.proceed'),
                a = $('#campaign-title'),
                n = $('#image-duration');
            return i.on('keyup', '#campaign-title, #image-duration', function () {
                a.val() && n.val() ? o.prop('disabled', !1) : o.prop('disabled', !0)
            }),
            n.on('keypress', function (e) {
                var t = window.event ? e.keyCode : e.which;
                (48 > t || t > 57) && (0 == t || 8 == t || 13 == t || e.ctrlKey || e.preventDefault())
            }),
            i.find('.proceed').on('click', function () {
                var i = t.map(function (e) {
                        return e.pk
                    }),
                    o = a.val(),
                    s = n.val();
                $.postJSON(e.data('endpoint'), {
                    title: o,
                    duration: s,
                    filelist: i
                }, function (e) {
                    window.location = e.redirect_to
                }, function () {
                    alert(gettext("{{trans('lang.unable_create_layout')}}"))
                })
            }),
            !1
        }),
        $('.file-info').on('click', '.button.acl', function (e) {
            e.preventDefault();
            var t = $(this).data('pk');
            $.getJSON('/media/api/permissions/' + t + '/list', function (e) {
                var i = ich['filebrowser-acl-dialogbox']({
                    users: e,
                    listUrl: '/media/api/permissions/' + t + '/users',
                    updateUrl: '/media/api/permissions/' + t + '/update',
                    removeUrl: '/media/api/permissions/' + t + '/remove'
                }),
                o = i.find('.permissions');
                ACLPermissions.bindToElement(o),
                o.on('add', function () {
                    $.getJSON('/media/api/permissions/' + t + '/list', function (e) {
                        var t = ich['filebrowser-acl-dialogbox']({
                            users: e
                        });
                        o.find('tbody').replaceWith(t.find('.permissions tbody') [0]),
                                o.trigger('refresh')
                    })
                }),
                i.appendTo('body').overlay({
                    mask: {
                        color: '#000',
                        loadSpeed: 200,
                        opacity: 0.5
                    },
                    left: 'center',
                    top: '15%',
                    fixed: !1,
                    closeOnClick: !1,
                    closeOnEsc: !0,
                    load: !0
                }).on('onClose', function () {
                    i.remove()
                })
            })
        }),
        $('.file-info').on('click', '.btn-duplicate', function (e) {
            e.preventDefault();
            var t = $(this).data('pk');
            Library.duplicate(t, function (e) {
                a(e.status, e.message),
                    Library.refresh()
            })
        }),
        $('.file-info').on('click', '.btn-rename', function (t) {
            t.preventDefault();
            var i = $(this).data('pk'),
                o = e($('.files li[data-pk=' + i + ']').attr('data-name'));
            $('#rename-input').val(o);
            $('#oldname-input').val(o);
            $('#selected_pk').val(i);
            $('button, input[type=submit]').attr('disabled',false);
            $('#renameModal').modal('show');
            isShowRename = true;
            $('#renameModal').on('onClose', function () {
                $('#renameModal').modal('hide');
                isShowRename = false;
            });
            $('.btn-default').on('click', function () {
                $('#renameModal').modal('hide');
            });
            $('#rename-input').select();

            $('#rename-input').focus().on('keyup', function (e) {
                if(13 === e.keyCode && isShowRename) {
                    e.preventDefault();
                    $('#rename-bt').trigger('click')
                }
            });
        }),
        $('#rename-bt').on('click', function (t) {
            $('#rename-bt, input[type=submit]').attr('disabled',false);
            $('#renameModal').modal('hide');
            isShowRename = false;
            t.preventDefault();
            var i = $('#selected_pk').val(),
                o = e($('.files li[data-pk=' + i + ']').attr('data-name'));
            var name = $('#rename-input').val().replace(/(^\.*|[\/\\])/g, '').trim();
            var oldName = $('#oldname-input').val();
            if (name == null || name == "") {
                $.notify("{{trans('lang.empty_name')}}", "error");
                return;
            } else {
                if (name == oldName) {
                    $.notify("{{trans('lang.name_not_change')}}", "error");
                    return;
                }
            }
            name && name !== o && Library.rename(i, name, function (e) {
                a(e.status, gettext(e.message)),
                Library.refresh()
            })
        }),
        $('.files-header .select-all').on('click', function () {
            var e = $(this);
            e.is('.selected') ? $('.files li').removeClass('selected') : $('.files li').addClass('selected'),
                i()
        }),
        $('.view-toggle').on('click', 'li', function () {
            var e = $(this),
                t = [];
            e.parent().hasClass('info') ? (e.toggleClass('pressed'), $('.filebrowser').toggleClass(e.data('view'))) : (e.addClass('pressed').siblings().each(function () {
                t.push($(this).data('view'))
            }).removeClass('pressed'), $('.filebrowser').removeClass(t.join(' ')).addClass(e.data('view'))),
                o()
        }),
        $('form.search').on('submit', function (e) {
            Library.search($.trim($(this).find('input[id=search-media]').val())),
                $(this).data('disable-on-submit', !1),
                $(this).find('input[type=submit]').prop('disabled', !1),
                e.preventDefault()
        }),
        $('input[id=search-media]').on('keyup', function (e) {
            var t = e.keyCode;
            27 === t && '' !== $(this).val() && ($(this).val(''), Library.refresh())
        }),
        $('.link-clear').on('click', function (e) {
            e.preventDefault(),
            $('#search-media').val(''),
            Library.refresh()
        }),
        $('.btn-create-folder').on('click', function (e) {
            e.preventDefault();
//            $('#form-create-folder')[0].reset();
            $('#create_folder_bt').attr('disabled',false);
            $('#folder_name').val("");
            $('#folderModal').modal('show');
            isShowCreateFolder = true;
            $('#folder_name').focus().on('keyup', function (e) {
                if(13 === e.keyCode && isShowCreateFolder) {
                    isShowCreateFolder = false;
                    e.preventDefault();
                    $('#create_folder_bt').attr('disabled',true);
                    $('#create_folder_bt').trigger('click')
                }
            });
        }),
        $('#create_folder_bt').on('click', function (t) {
            $('#create_folder_bt').attr('disabled',true);
            t.preventDefault();
            var e = $('#folder_name').val().replace(/\.\.\/?[^\/]*/g, '').trim();
            if (e == "") {
                isShowCreateFolder = true;
                $.notify('{{trans('lang.folder_name_must_not_empty')}}', "error");
                $('#create_folder_bt').attr('disabled',false);
            } else {
                $('#folderModal').modal('hide');
                isShowCreateFolder = false;
                Library.create_dir(e, function (e) {
                    {{--var t = '';--}}
                    {{--'error' === e.status ? (t = gettext("{{trans('lang.unable_create_folder')}}"), t = interpolate(t, [e.message])) : t = e.message,--}}
                    {{--a(e.status, t),--}}
                    Library.refresh()
                })
            }
        }),
        $('.toggle-notification-list').on('click', function () {
            return $('.notification ul').slideToggle('fast').toggleClass('collapsed'),
                    !1
        }),
        $('.close-notification').on('click', function (e) {
            e.preventDefault(),
                    $('.notification').fadeTo(500, 0, function () {
                        $(this).addClass('collapsed').css('display', 'none').removeClass('error success').find('ul').empty()
                    }),
                    window.clearTimeout(n)
        }),
        $('.dialogbox').overlay({
            mask: {
                color: '#000',
                loadSpeed: 200,
                opacity: 0.5
            },
            left: 'center',
            top: '15%',
            closeOnClick: !1,
            closeOnEsc: !0,
            load: !1
        });
        var s = !1;
        $('#panel-library').on('upload.start', function () {
            s = !0
        }).on('upload.end', function () {
            s = !1
        }).on('upload.success', function (e, t) {
            a(t.status, t.message);
        }).on('upload.error', function (e, t) {
            var i = gettext("{{trans('lang.error_uploading')}}") + ' <strong>' + t.file.name + '</strong>: ' + t.message;
            a(t.status, i),
                    $('li[data-index="' + t.index + '"]').remove();
        });
        var l = $('#library-content');
        l.on('refresh', function () {
            i(),
            $(this).find('ul li').draggable({
                cursor: 'move',
                cursorAt: {
                    top: 26,
                    left: 22
                },
                helper: function (e) {
                    var t = $(e.currentTarget),
                            i = t.find('.item-thumb').css('backgroundImage'),
                            o = ich['draggable-helper']({
                                pk: t.data('pk'),
                                bg: i
                            });
                    return o.appendTo(document.body),
                            o
                },
                zIndex: 2700,
                scroll: !0,
                delay: 200,
                start: function (e, t) {
                    var i = $('ul.files li.selected').length;
                    $(e.currentTarget).hasClass('selected') || i++,
                            t.helper.attr('data-files', i)
                },
                stop: function () {
                }
            }).filter(function () {
                return 'dir' === $(this).data('type')
            }).add('.btn-home, #breadcrumb li').each(function () {
                $(this).droppable({
                    greedy: !0,
                    hoverClass: 'hover',
                    tolerance: 'pointer',
                    drop: function (e, t) {
                        var i,
                            o = [],
                            n = t.helper.data('pk'),
                            s = $(e.target).data('pk');
                        n && n !== s && o.push(n),
                            $('.filebrowser .files li.selected').each(function () {
                                i = $(this).data('pk'),
                                i !== s && i != n && o.push(i)
                            }),
                            $('.dialogbox h3').text(gettext("{{trans('lang.move')}}")),
                            $('.dialog-buttons button:first-of-type').off('click.custom').on('click.custom', function () {
                                t.helper.css({
                                    top: '',
                                    left: ''
                                })
                            }),
                            Library.move(o, s, function (e) {
                                a(e.status, gettext(e.message)),
                                        Library.refresh()
                            })
                    }
                })
            })
        }),
        l.on('navigation', function (e, t, i) {
            $('.notification').fadeTo(500, 0, function () {
                $(this).addClass('collapsed').css('display', 'none').find('ul').empty()
            })
        }),
        l.on('click', '.files li', function (e) {
            var t = $(this);
            $(e.target).is('.checkbox') ? t.toggleClass('selected') : t.addClass('selected').siblings().removeClass('selected'),
                    i(),
                    t.showInfo()
        }),
        l.on('dblclick', 'li', function () {
            var e = $(this);
            'dir' === e.data('type') && Library.navigate(e.data('pk'))
        }),
        window.addEventListener('resize', $.debounce(o, 300)),
        window.addEventListener('beforeunload', null
        {{--function (e) {--}}
            {{--var t,--}}
                    {{--i = $('.filebrowser');--}}
            {{--return i.hasClass('list-view') ? t = 1 : i.hasClass('grid-view') && (t = 2),--}}
            {{--i.hasClass('view-info') && (t += 2),--}}
                    {{--window.localStorage.setItem('filebstate', t),--}}
                    {{--s ? e.returnValue = gettext("{{trans('lang.leave_page_content')}}") : void 0--}}
        {{--}--}}
        ),
        window.addEventListener('popstate', function (e) {
//        (e.state || '/media/list/' == location.pathname) &&
            Library.change_directory(e.state ? e.state.pk : null)
        }),
        t(localStorage.getItem('filebstate') || 4),
        $('.filebrowser').removeClass('hidden'),
        Library.Create(),
        Library.refresh(),
        o()
    }),
    $.fn.showInfo = function () {
        var e = $(this),
                t = $.extend({}, e.data());
        t.showRenameButton = !0,
            'dir' !== t.type ? t.downloadURL = '/contents/' + e.data('pk') + '/download' : (t.showRenameButton = !1, t.showACLButton = !1, t.home || t['public'] || (t.showRenameButton = !0, t.showACLButton = 2 === t.mpath.length, t.directoryPk = e.data('pk'))),
            $('.library-sidebar .file-info').html(ich['file-info'](t))
    };
</script>