var vm = function () {
    var self = this
    self.minHour = ko.observable()
    self.date = ko.observable()
    self.time=ko.observable()
}
document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth'
    });
    calendar.render();
});
$(document).ready(function () {
    var viewModel = new vm()
    ko.applyBindings(viewModel)
    var petName = localStorage.getItem("current_account")
    $("#calendar").on("click", ".fc-day-future", function () {
        var date = $(this).attr("data-date")
        var today = new Date()
        var hour = today.getHours() + 2
        if (hour >= 18) {
            alert("Erro! Não recebemos marcações de consultas a partir das " + hour + ", por favor escolha outro dia.")
        }
        else {
            viewModel.date(date)
            viewModel.minHour(Math.max(hour, 8) + ":" + "00")
            $("#staticBackdrop").modal("show")
        }
    })

    $("#calendar").on("click", ".fc-day-past", function () {
        alert("Erro! Por favor escolha um dia a partir de hoje")
    })

    $("#schedule_btn").click(function () {
        if (viewModel.time() == undefined) {
            alert("Erro! por favor escolha uma hora!")
        }
        else {
            localStorage.setItem("schedule_date_" + petName, viewModel.date())
            localStorage.setItem("schedule_hour_" + petName, viewModel.time())
            location.href="index.html"
        }
    })
})