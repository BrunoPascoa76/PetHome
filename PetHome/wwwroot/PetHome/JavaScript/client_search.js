var vm = function () {
    var self = this
    self.accounts = ko.observableArray([])
    self.vaccines = ko.observableArray([])
    self.diagnostics = ko.observableArray([])
    self.present = function () {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd;
        }

        if (mm < 10) {
            mm = '0' + mm;
        }

        today = yyyy + '-' + mm + '-' + dd;
        return today
    }
}
var petName = ""
$(document).ready(function () {
    var viewmodel = new vm()
    ko.applyBindings(viewmodel)
    $(".doctor_name").text(localStorage.getItem("doctor_current"))
    $("#search").click(function () {
        //resetar dados do viewmodel
        viewmodel.accounts([])
        viewmodel.vaccines([])
        viewmodel.diagnostics([])
        //atualizar viewmodel
        var result = $("#search-input").val()
        var accounts = localStorage.getItem("all_accounts")
        if (accounts != null) {
            accounts = accounts.split(",")
            filtered = accounts.filter(function (item) {
                return item.includes(result)
            })
            if (filtered.length == 0) {
                alert("Erro! Conta não encontrada")
            }
            else {
                filtered.forEach(function (item) {
                    var details = localStorage.getItem(item)
                    details = details.split(",")
                    //dados preenchidos pelo utilizador
                    switch (details.length) {
                        case 11:
                            var subscription = details[9].split("_")
                            var foodType = details[10].split("_")
                            viewmodel.accounts.push({
                                "humanName": details[0],
                                "humanEmail": details[1],
                                "petName": details[4],
                                "petAge": details[5] + " anos",
                                "petSpecie": details[6],
                                "petRace": details[7],
                                "petSex": details[8],
                                "subscription": subscription[0] + " " + subscription[1],
                                "foodType": foodType[0] + " " + foodType[1],
                                "dia": localStorage.getItem("schedule_date_" + details[4]),
                                "hora": localStorage.getItem("schedule_hour_" + details[4])
                            })
                            break
                        case 10:
                            var subscription = details[9].split("_")
                            viewmodel.accounts.push({
                                "humanName": details[0],
                                "humanEmail": details[1],
                                "petName": details[4],
                                "petAge": details[5] + " anos",
                                "petSpecie": details[6],
                                "petRace": details[7],
                                "petSex": details[8],
                                "subscription": subscription[0] + " " + subscription[1],
                                "foodType": "N/A",
                                "dia": localStorage.getItem("schedule_date_" + details[4]),
                                "hora": localStorage.getItem("schedule_hour_" + details[4])
                            })
                            break
                        case 9:
                            viewmodel.accounts.push({
                                "humanName": details[0],
                                "humanEmail": details[1],
                                "petName": details[4],
                                "petAge": details[5] + " anos",
                                "petSpecie": details[6],
                                "petRace": details[7],
                                "petSex": details[8],
                                "subscription": "N/A",
                                "foodType": "N/A",
                                "dia": ko.observable(localStorage.getItem("schedule_date_" + details[4])),
                                "hora": ko.observable(localStorage.getItem("schedule_hour_" + details[4]))
                            })
                            break

                    }
                })

            }
        }
        else { alert("Erro! Nenhuma conta detetada no sistema") }
    })
    //vacinas
    $(".main").on("click", ".vaccine_btn", function () {
        petName = $(this).val()
        viewmodel.vaccines([])
        var vaccines = localStorage.getItem("vaccines_" + petName)
        if (vaccines != null && vaccines != "") {
            vaccines = vaccines.split(",")
            viewmodel.vaccines(vaccines)
        }
    })

    $("#vaccine_modal").on("click", ".remove_btn", function () {
        var vaccineName = $(this).val()
        var vaccines = localStorage.getItem("vaccines_" + petName)
        if (vaccines != null) {
            vaccines = vaccines.split(",")
            vaccines = vaccines.filter(function (item) { return item != vaccineName })
            viewmodel.vaccines(vaccines)
            if (vaccines.length == 0) { localStorage.removeItem("vaccines_" + petName) }
            else { localStorage.setItem("vaccines_" + petName, vaccines) }
        }
    })

    $("#add_btn").click(function () {
        var vaccines = localStorage.getItem("vaccines_" + petName)
        if (vaccines != null) {
            vaccines = vaccines.split(",")
        }
        else { vaccines = [] }
        var newVaccine = $("#add-input").val()
        vaccines.push(newVaccine)
        viewmodel.vaccines(vaccines)
        console.log(localStorage.getItem("vaccines_" + petName))
        localStorage.setItem("vaccines_" + petName, vaccines)
    })
    //diagnósticos
    $(".main").on("click", ".diagnostic_btn", function () {
        petName = $(this).val()
        viewmodel.diagnostics([])
        var diagnostics = localStorage.getItem("diagnostics_" + petName)
        if (diagnostics != null && diagnostics != "") {
            diagnostics = diagnostics.split(",")
            viewmodel.diagnostics(diagnostics)
        }
    })

    $("#diagnostic_modal").on("click", ".remove_btn_2", function () {
        var diagnosticName = $(this).val()
        var diagnostics = localStorage.getItem("diagnostics_" + petName)
        if (diagnostics != null) {
            diagnostics = diagnostics.split(",")
            diagnostics = diagnostics.filter(function (item) { return item != diagnosticName })
            viewmodel.diagnostics(diagnostics)
            if (diagnostics.length == 0) { localStorage.removeItem("diagnostics_" + petName) }
            else { localStorage.setItem("diagnostics_" + petName, diagnostics) }
        }
    })

    $("#add_btn_2").click(function () {
        var diagnostics = localStorage.getItem("diagnostics_" + petName)
        if (diagnostics != null) {
            diagnostics = diagnostics.split(",")
        }
        else { diagnostics = [] }
        var newDiagnostic = $("#add-input-2").val()
        var today = new Date()
        var newDiagnostic = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate() + "   " + newDiagnostic
        diagnostics.push(newDiagnostic)
        viewmodel.diagnostics(diagnostics)
        console.log(localStorage.getItem("diagnostics_" + petName))
        localStorage.setItem("diagnostics_" + petName, diagnostics)
    })
    //marcar consulta
    $(".main").on("click", ".schedule_btn", function () {
        petName = $(this).val()
        var dia = $("#date_" + petName).val()
        var hora = $("#time_" + petName).val()
        if (dia == "" || hora == "") {
            alert("Erro! Por favor escolha um dia e uma hora.")
        }
        else {
            localStorage.setItem("schedule_date_" + petName, dia)
            localStorage.setItem("schedule_hour_" + petName, hora)
            alert("Consulta marcada com sucesso.")
        }
    })
})


