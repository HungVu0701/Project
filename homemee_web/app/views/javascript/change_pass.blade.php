<script type="text/javascript">
    $.validator.addMethod(
            "strongPassword",
            function(value, element) {
             return /[a-z]/.test(value) && /[A-Z]/.test(value)
                && /\d/.test(value) && /[!@#$%^&*()_=\[\]{};':"\\|,.<>\/?+-]/.test(value)
            },
            "{{ trans('lang.not_strong_password') }}"
    );

    $("#form-change-password-first").validate({
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
                strongPassword: true
            },
            confirm_new_password: {
                required: true,
                maxlength: 100,
                minlength: 8,
                equalTo: "#new_password_a",
                strongPassword: true
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
                equalTo : '{{ trans('lang.error_password_match') }}'
            }
        },

        submitHandler: function(form) {
            var postData = $("#form-change-password-first").serializeArray();
            visionone_ajax({
                url: "/users/{{Session::get('user_id')}}/change_password",
                type: "POST",
                data: postData,
                success: function (data, textStatus, jqXHR) {
                    showNotify(data, function() {
                        window.location.href = "/";
                    });
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    $.notify("{{trans('lang.error')}}", "error");
                }
            });
        }
    });
 </script>