function onload_function(){
    load_modal_email();
    load_modal_password();
}

function load_modal_email() {
    var modal = document.getElementById("email_modal");
    var btn = document.getElementById("change_email");
    var span = document.getElementById("close_email");
    btn.onclick = function () {
        modal.style.display = "block";
    }
    span.onclick = function () {
        modal.style.display = "none";
    }
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

function load_modal_password() {
    var modal = document.getElementById("password_modal");
    var btn = document.getElementById("change_password");
    var span = document.getElementById("close_password");
    btn.onclick = function () {
        modal.style.display = "block";
    }
    span.onclick = function () {
        modal.style.display = "none";
    }
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}