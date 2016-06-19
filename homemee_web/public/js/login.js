/**
 * Created by sangnv7 on 1/13/2015.
 */
$("#form-login").submit(function(){
    var isFormValid = true;

    $("#password").each(function(){
        if ($.trim($(this).val()).length == 0){
            $(this).addClass("highlight");
            $(this).focus();
            isFormValid = false;
        }
        else{
            $(this).removeClass("highlight");
        }
    });

    $("#email").each(function(){
        if ($.trim($(this).val()).length == 0){
            $(this).addClass("highlight");
            $(this).focus();
            isFormValid = false;
        }
        else{
            $(this).removeClass("highlight");
        }
    });
    return isFormValid;
});