<script type="application/javascript">
    function render() {
        visionone_ajax({
            url: "/reports/admin_info",
            type: "GET",
            data: null,
            success: function (data, textStatus, jqXHR) {
                showNotify(data, function () {
                    $.each(Object.keys(data.data), function (index, item) {
                        $("#" + item).text(data.data[item]);
                    });
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $.notify("{{trans('lang.error')}}", "error");
            }
        });
    }

    render();
</script>