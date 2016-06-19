<script type="text/javascript">
    $('.projectActionVisionone').on('change', function () {
        window.location.href = this.value;
    });

    $.validator.addMethod(
            "strongPass",
            function (value, element) {
                return /[a-z]/.test(value) && /[A-Z]/.test(value)
                        && /\d/.test(value) && /[!@#$%^&*()_=\[\]{};':"\\|,.<>\/?+-]/.test(value)
            },
            "{{ trans('lang.not_strong_password') }}"
    );

    $("#form-change-password").validate({
        rules: {
            old_password: {
                required: true,
                maxlength: 100,
                minlength: 8
            },
            new_password: {
                required: true,
                maxlength: 100,
                minlength: 8,
                strongPass: true
            },
            confirm_new_password: {
                required: true,
                maxlength: 100,
                minlength: 8,
                equalTo: "#new_password",
                strongPass: true
            }
        },
        messages: {
            old_password: {
                required: '{{ trans('lang.error_required') }}',
                maxlength: '{{ trans('lang.error_maxlength') }}'
            },
            new_password: {
                required: '{{ trans('lang.error_required') }}',
                maxlength: '{{ trans('lang.error_maxlength') }}'
            },
            confirm_new_password: {
                required: '{{ trans('lang.error_required') }}',
                maxlength: '{{ trans('lang.error_maxlength') }}',
                equalTo: '{{ trans('lang.error_password_match') }}'
            }
        },

        submitHandler: function (form) {
            var postData = $("#form-change-password").serializeArray();
            isFormChangePasswordShow = false;
            $('#change_password_modal').modal('hide');
            visionone_ajax({
                url: "/users/{{Session::get('user_id')}}/change_password",
                type: "POST",
                data: postData,
                success: function (data, textStatus, jqXHR) {
                    showNotify(data, function () {

                    });
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    showNotify(data, function () {
                    });
                }
            });
        }
    });
</script>

@if(\Session::get('language',1) == 0)
    <script src="{{ URL::asset('js/locale/bootstrap-table-vi-VN.min.js') }}"></script>
    <script src="{{ URL::asset('js/locale/bootstrap-select-vi-VN.min.js') }}"></script>
    <script src="{{ URL::asset('js/locale/messages_vi.js') }}"></script>
{{--    <script src="{{ URL::asset('js/locale/dhtmlx-vi-VN.min.js') }}"></script>--}}
@endif