var primaryKeyAttributo = localStorage.getItem("primaryKey");

function loadInizio() {

    $.ajaxSetup({
        headers: {
            "X-CSRFToken": getCookie("csrftoken")
        }
    });

    request_obj = {
        pk: primaryKeyAttributo,
    }

    $.ajax({
        url: "/administration/getorderproductslist",
        type: "POST",
        data: JSON.stringify(request_obj),
        success: function (response) {
            //alert(JSON.stringify(response))
            CaricaPagina(response);
        }
    });
}


function CaricaPagina(obj) {
    ;
    //Si visualizzano le informazioni relative all'ordine, già note perché passate dalla pagina precedente
    document.getElementById("titoloOrdine").innerHTML = localStorage.getItem("nome");
    document.getElementById("prezzo").innerHTML = localStorage.getItem("prezzo") + "€";
    document.getElementById("orario").innerHTML = localStorage.getItem("orario");

    const prodotti = obj.prodotti;
    var numeroKetchup = obj.ketchup;
    var numeroMaionese = obj.maionesi;

    document.getElementById("numeroKetchup").innerHTML = numeroKetchup;
    document.getElementById("numeroMaionese").innerHTML = numeroMaionese;

    for (let index = 0; index < prodotti.length; index++) {

        if (prodotti[index] != null) {
            //Si prendono i valori di nome, prezzo e quantita per l'oggetto attuale
            var nomeAttributo = prodotti[index].nome;
            var prezzoAttributo = prodotti[index].prezzo;
            var quantitaAttributo = prodotti[index].quantita;

            //Si creano i DIV
            const divSpalma = document.createElement("div");
            const divProp = document.createElement("div");
            const divNome = document.createElement("div");
            const divPrezzo = document.createElement("div");
            const divQuantita = document.createElement("div");

            //Si impostano le classi e i valori ai DIV
            divSpalma.setAttribute("class", "spalma");
            divProp.setAttribute("class", "prop");
            divNome.setAttribute("class", "nome");
            divNome.innerHTML = nomeAttributo;
            divPrezzo.setAttribute("class", "prezzo");
            divPrezzo.innerHTML = prezzoAttributo + "€";
            divQuantita.setAttribute("class", "quantity");
            divQuantita.innerHTML = quantitaAttributo;

            //Si inseriscono i DIV nel body
            var divLista = document.querySelector(".lista");
            divLista.appendChild(divSpalma);
            divSpalma.appendChild(divProp);
            divProp.appendChild(divNome);
            divProp.appendChild(divPrezzo);
            divSpalma.appendChild(divQuantita);
        }
    }

    //Si decide quale struttura di bottoni creare e la si crea
    /*
        STRUTTURE ESSERE TIPO:
        <div class="spalma">
            <div class="btn btnred" id="accetta">
                <div>Accetta</div>
            </div>
            <div class="btn btngray" id="rifiuta">
                <div>Rifiuta</div>
            </div>
        </div>

        <div class="centra">
            <div class="btn btnred cursorpointer" id="accetta">
                <div>Completa</div>
            </div>
        </div>
    */

    if (localStorage.getItem("stato") == "todo") {
        //Si creano i DIV
        const divSpalma = document.createElement("div");
        const divBottoneRosso = document.createElement("div");
        const divAccetta = document.createElement("div");
        const divBottoneGrigio = document.createElement("div");
        const divRifiuta = document.createElement("div");

        //Si impostano le classi e i valori ai DIV
        divSpalma.setAttribute("class", "spalma");
        divBottoneRosso.setAttribute("class", "btn btnred");
        divBottoneRosso.setAttribute("id", "accetta");
        divBottoneRosso.setAttribute("onclick", "Accetta()");
        divAccetta.innerHTML = "Accetta";
        divBottoneGrigio.setAttribute("class", "btn btngray");
        divBottoneGrigio.setAttribute("id", "rifiuta");
        divBottoneGrigio.setAttribute("onclick", "Rifiuta()");
        divRifiuta.innerHTML = "Rifiuta";

        //Si inseriscono i DIV nel body
        var divBottoni = document.querySelector("#bottone");
        divBottoni.appendChild(divSpalma);
        divSpalma.appendChild(divBottoneRosso);
        divBottoneRosso.appendChild(divAccetta);
        divSpalma.appendChild(divBottoneGrigio);
        divBottoneGrigio.appendChild(divRifiuta);
    }
    else {
        //Si creano i DIV
        const divCentra = document.createElement("div");
        const divCursorPointer = document.createElement("div");
        const divCompleta = document.createElement("div");

        //Si impostano le classi e i valori ai DIV
        divCentra.setAttribute("class", "centra");
        divCursorPointer.setAttribute("class", "btn btnred cursorpointer");
        divCursorPointer.setAttribute("id", "accetta");
        divCursorPointer.setAttribute("onclick", "Completa()");
        divCompleta.innerHTML = "Completa";

        //Si inseriscono i DIV nel body
        var divBottoni = document.querySelector("#bottone");
        divBottoni.appendChild(divCentra);
        divCentra.appendChild(divCursorPointer);
        divCursorPointer.appendChild(divCompleta);
    }
}

function Accetta() {
    $.ajaxSetup({
        headers: {
            "X-CSRFToken": getCookie("csrftoken")
        }
    });

    request_obj = {
        pk: primaryKeyAttributo,
        new_state: "doing",
    }

    $.ajax({
        url: "/administration/changeorderstatus",
        type: "POST",
        data: JSON.stringify(request_obj),
    });
    window.location.href = "/administration/orderlist";
}

function Rifiuta() {
    $.ajaxSetup({
        headers: {
            "X-CSRFToken": getCookie("csrftoken")
        }
    });

    request_obj = {
        pk: primaryKeyAttributo,
        new_state: "refused",
    }

    $.ajax({
        url: "/administration/changeorderstatus",
        type: "POST",
        data: JSON.stringify(request_obj),
    });
    window.location.href = "/administration/orderlist";
}

function Completa() {
    $.ajaxSetup({
        headers: {
            "X-CSRFToken": getCookie("csrftoken")
        }
    });

    request_obj = {
        pk: primaryKeyAttributo,
        new_state: "done",
    }

    $.ajax({
        url: "/administration/changeorderstatus",
        type: "POST",
        data: JSON.stringify(request_obj),
    });
    window.location.href = "/administration/orderlist";
}

//TODO: Aggiungere le funzioni vere e proprie ai bottoni
function getCookie(name) {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    } else {
        begin += 2;
    }
    var end = document.cookie.indexOf(";", begin);
    if (end == -1) {
        end = dc.length;
    }
    return unescape(dc.substring(begin + prefix.length, end));
}