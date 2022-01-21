function signUp() {
    var input_array = []
    $("input").each(function () {
        input_array.push($(this).val())
    })
    input_array = input_array.slice(0, 6)
    input_array.push($("select").val())
    input_array.push($("#pet_race").val())
    input_array.push($("input[name='pet_sex']:checked").val())
    if (verify_1()) {
        localStorage.setItem(input_array[4], input_array.slice(0, 9))
        localStorage.setItem("current_account", input_array[4])
        localStorage.setItem("is_logged_in", 1)
        var accounts = localStorage.getItem("all_accounts")
        if (accounts == null) { accounts = [] }
        else { accounts = accounts.split(",") }
        accounts.push($("#pet_name").val())
        localStorage.setItem("all_accounts", accounts)
        location.href="subscrição.html"
    }
}

function Login() {
    clean_2()
    var input_array = []
    $("input").each(function () {
        input_array.push($(this).val())
    })
    input_array = input_array.slice(11, 13)
   
    if (verify_2(input_array)) {
        var conta = localStorage.getItem(input_array[0])
        if (conta != null) {
            conta = conta.split(",")
            if (conta[2] == input_array[1]) {
                localStorage.setItem("is_logged_in", 1)
                localStorage.setItem("current_account", input_array[0])
                location.href = "index.html"
            }
            else { show_error(10) }
        }

        else { show_error(10) }
    }
}

function verify_1() {
    var valid = true
    var input_array = []
    $("input").each(function () {
        input_array.push($(this).val())
    })
    input_array = input_array.slice(0, 7)
    clean_1()
    verify_repeat(input_array[4])
    for (i = 0; i < 6; i++) {
        if (input_array[i] == "") {
            if (i == 5) { show_error(6) }
            else { show_error(i) }
            valid = false
        }
    }
    if (input_array[6] == "") {
        show_error(8)
        valid = false
    }
    if ($("option:selected").val() == 0) {
        show_error(7)
        valid = false
    }
    if (input_array[2] != input_array[3]) {
        valid = false
        show_error(3)
    }
    if ($("input[name='pet_sex']:checked").length == 0) {
        valid = false
        show_error(9)
    }
    return valid
}

function verify_2(input_array) {
    var valid = true
    var error_array = $(".error_div")
    error_array = error_array.slice(10, 13)
    for (i = 0; i < input_array.length; i++) {
        if (input_array[i] == "") {
            show_error(parseInt(i) + 11)
            valid = false
        }
    }
    return valid
}

function verify_repeat(a) {
    if (a in localStorage) {
        show_error(5)
    }
}

function clean_1() {
    var error_array = $(".error_div")
    error_array = error_array.slice(0, 10)
    for (i = 0; i < error_array.length; i++) {
        var current = error_array[i]
        $(current).addClass("d-none")
        $(current).removeClass("d-block")
    }
}

function clean_2() {
    var error_array = $(".error_div")
    error_array = error_array.slice(10, 13)
    for (i = 0; i < error_array.length; i++) {
        var current = error_array[i]
        $(current).addClass("d-none")
        $(current).removeClass("d-block")
    }
}

function c_storage() {
    localStorage.clear()
    location.href = "index.html"
}

function show_error(a) {
    var error_array = $(".error_div")
    var current = error_array[a]
    $(current).addClass("d-block")
    $(current).removeClass("d-none")
}
