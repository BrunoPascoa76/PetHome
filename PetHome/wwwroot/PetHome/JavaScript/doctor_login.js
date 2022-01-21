$(document).ready(function () {
    localStorage.setItem(17345, ["José Almeida", "código secreto"])
    $("#doctor_submit").click(function () {
        $("div[id*='error']").addClass("d-none")
        $("div[id*='error']").removeClass("d-block")
        var isValid = true
        var id = $("#doctor_id").val()
        var code = $("#doctor_code").val()
        if (id.length == 0) {
            $("#id_error_2").addClass("d-block")
            $("#id_error_2").removeClass("d-none")
            isValid = false
        }
        if (code.length == 0) {
            $("#code_error_2").addClass("d-block")
            $("#code_error_2").removeClass("d-none")
            isValid = false
        }
        var found = localStorage.getItem(id)
        if (isValid == true) {
            if (found == null) {
                $("#404_error_1").addClass("d-block")
                $("#404_error_1").removeClass("d-none")
                isValid = false
            }
            else {
                found = found.split(",")
                if (found[1] != code) {
                    $("#404_error_1").addClass("d-block")
                    $("#404_error_1").removeClass("d-none")
                    isValid = false
                }
            }
        }
        if (isValid == true) {
            localStorage.setItem("doctor_current", found[0])
            location.href="doutor.html"
        }
    })
    $(".lock-icon").hover(function () {
        $(this).addClass("fa-unlock-alt")
        $(this).removeClass("fa-lock")
    },
    function () {
        $(this).removeClass("fa-unlock-alt")
        $(this).addClass("fa-lock")
        })

    $(".lock-btn").hover(function () {
        console.log("yay")
        $(".lock-icon-2").addClass("fa-unlock-alt")
        $(".lock-icon-2").removeClass("fa-lock")
    }, function () {
        $(".lock-icon-2").removeClass("fa-unlock-alt")
        $(".lock-icon-2").addClass("fa-lock")
        })
})