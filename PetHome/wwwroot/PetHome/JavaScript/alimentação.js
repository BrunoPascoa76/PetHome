$(document).ready(function () {
    var status = localStorage.getItem("is_logged_in")
    var pet = localStorage.getItem("current_account")
    var conta = localStorage.getItem(pet)
    if (status == "1") {
        conta = conta.split(",")
        $(".pet_race").each(function () {
            var texto = $(this).text()
            texto += conta[7]
            $(this).text(texto)
        })
    }
    var status = localStorage.getItem("is_logged_in")
    var timeleft = 4
    if (status == "0" || status==null) {
        $("#redirect_warning").addClass("d-block")
        $("#redirect_warning").removeClass("d-none")
        var redirectTimer = setInterval(function () {
            if (timeleft <= -1) {
                clearInterval(redirectTimer);
                location.href = "login.html"
            } else {
                $("#redirect_time").html(timeleft + " ");
            }
            timeleft -= 1;
        }, 1000);
    }
    else {
        $("#resto").addClass("d-block")
        $("#resto").removeClass("d-none")
    }

    var status = localStorage.getItem("is_logged_in")
    var pet = localStorage.getItem("current_account")
    var conta = localStorage.getItem(pet)
    if (status == "1") {
        conta = conta.split(",")
        var especie = conta[6]
    }
    switch (especie) {
        case "Cão":
            $("#Cão_div").addClass("d-block")
            $("#Cão_div").removeClass("d-none")
            break
        case "Gato":
            $("#Gato_div").addClass("d-block")
            $("#Gato_div").removeClass("d-none")
            break
        case "Pássaro":
            $("#Pássaro_div").addClass("d-block")
            $("#Pássaro_div").removeClass("d-none")
            break
        case "Peixe":
            $("#Peixe_div").addClass("d-block")
            $("#Peixe_div").removeClass("d-none")
            break
    }
    $(".aderir").click(function () {
        var alimento = $(this).val()
        if (conta.length >= 11) {
            conta[10] = alimento
        }
        else {conta.push(alimento)}
        conta.splice(11, 1)
        localStorage.setItem(pet, conta)
        location.href="index.html"
    })
})

