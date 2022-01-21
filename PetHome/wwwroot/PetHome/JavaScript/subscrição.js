$(document).ready(function () {
    $(".subscription").click(function () {
        var subscrição = $(this).val()
        var pet = localStorage.getItem("current_account")
        var conta = localStorage.getItem(pet)
        conta = conta.split(",")
        if (conta.length < 10) {
            conta.push(subscrição)
        }
        else { conta[9] = subscrição }
        localStorage.setItem(pet, conta)
        location.href="index.html"
    })
})