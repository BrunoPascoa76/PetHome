$(document).ready(function () {
    var status = localStorage.getItem("is_logged_in")
    var pet = localStorage.getItem("current_account")
    var conta = localStorage.getItem(pet)
    if (status=="1") {
        conta = conta.split(",")
        $(".dropdown").addClass("d-block")
        $(".dropdown").removeClass("d-none")
        $(".drop_name").text(conta[0])
        $(".log").removeClass("d-block")
        $(".log").addClass("d-none")
        }
        else {
            $(".dropdown").addClass("d-none")
            $(".dropdown").removeClass("d-block")
            $(".log").removeClass("d-none")
            $(".log").addClass("d-block")
    }
})
function log_out() {
    localStorage.setItem("is_logged_in", 0)
    location.reload()
}