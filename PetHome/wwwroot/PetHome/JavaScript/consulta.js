var vm = function () {
    var self = this
    self.minHour = ko.observable()
    self.date = ko.observable()
    self.time = ko.observable()
}

$(document).ready(function () {
    var viewModel = new vm()
    ko.applyBindings(viewModel)

    var monthMap = {
        Jan: "01",
        Feb: "02",
        Mar: "03",
        Apr: "04",
        May: "05",
        Jun: "06",
        Jul: "07",
        Aug: "08",
        Sep: "09",
        Oct: "10",
        Nov: "11",
        Dec: "12"
    }

    $("#calendar").calendar({
        onClickDate: function (date) {
            date = String(date).split(" ")
            $("#calendar").updateCalendarOptions({
                date: monthMap[date[1]] + "/" + date[2]+"/"+date[3]
            })
            date= date[2]+"/"+monthMap[date[1]]+"/"+date[3]
            viewModel.date(date)
            $("#staticBackdrop").modal("show")
        }
    })
var petName = localStorage.getItem("current_account")

    $("#schedule_btn").click(function () {
    console.log(viewModel.time(),$("#time_chooser").val())
    if (viewModel.time() == undefined) {
        alert("Erro! por favor escolha uma hora!")
    }
    else {
        localStorage.setItem("schedule_date_" + petName, viewModel.date())
        localStorage.setItem("schedule_hour_" + petName, viewModel.time())
        location.href = "index.html"
        }
        
})
})