var vm = function () {
    var self = this
    self.vaccines = ko.observableArray(["Nenhuma"])
    self.diagnostics = ko.observableArray(["Saudável"])
}

$(document).ready(function () {
    var viewmodel = new vm()
    ko.applyBindings(viewmodel)
    var status = localStorage.getItem("is_logged_in")
    var pet = localStorage.getItem("current_account")
    var conta = localStorage.getItem(pet)
    if (status == "1") {
        conta = conta.split(",")
        if (conta.length > 9) {
            var sub_text = conta[9].split("_")
            $("#subscription").text(sub_text[0] + " " + sub_text[1])
            if (conta.length > 10) {
                var sub_text_2 = conta[10].split("_")
                var text = ""
                for (i in sub_text_2) {
                    text += " "
                    text += sub_text_2[i]
                }
                $("#food").text(text)
            }
        }
        $("#name").text(conta[4])
        $("#age").text(conta[5])
        $("#specie").text(conta[6])
        $("#race").text(conta[7])
        $("#sex").text(conta[8])
    }
    var vaccines = localStorage.getItem("vaccines_" + pet)
    if (vaccines != null) {
        vaccines = vaccines.split(",")
        viewmodel.vaccines(vaccines)
    }
    var diagnostics = localStorage.getItem("diagnostics_" + pet)
    if (diagnostics != null) {
        diagnostics = diagnostics.split(",")
        diagnostics = diagnostics.slice(-5) //obter últimos 5 diagnósticos (para não ficar muito cheio)
        viewmodel.diagnostics(diagnostics)
    }
    var date = localStorage.getItem("schedule_date_" + pet)
    var hour = localStorage.getItem("schedule_hour_" + pet)
    if (date != null) {
        $("#schedule").text(date + ", às " + hour)
    }
    else {
        $("#schedule").text("Nenhuma")
    }
})

function sub_redirect() {
    location.href = "subscrição.html"
}
