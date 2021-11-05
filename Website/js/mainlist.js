//json dal server (qui è di esempio)
var json = '[{"nome":"Panino","prezzo":"2","aggiunte":true},{"nome":"Pizza_con_patatine","prezzo":"2,50","aggiunte":false},{"nome":"Panzerotto","prezzo":"1,50","aggiunte":false}]';
//metodo per fare il parse del JSON
const obj = JSON.parse(json);
//numero di oggetti presenti nel JSON
var lunghezza = 0;
//ciclo foreach per prendere la lunghezza del JSON
obj.forEach(element => {
    lunghezza++;
});

//vettore per le quantità di ogni singolo elemento
var quantita = [];
var x = 0;
//imposto tutti gli elementi del vettore a 0
for (let index = 0; index < lunghezza; index++) {
    quantita[index] = x;
}

//vettore di oggetti dove salvare i prodotti
var vettOggSaving = [{}];
vettOggSaving[0] = null;

function SalvaInLocalStorage(index) {
    localStorage.clear();

    if (quantita[index] == 0) {
        vettOggSaving[index].quantita = 0;
        checkZEROTWO();
        vettOggSaving[index] = null;
    }
    else {
        var myObj = { "nome": obj[index].nome, "prezzo": obj[index].prezzo, "quantita": quantita[index], "aggiunte": obj[index].aggiunte};
        vettOggSaving[index] = myObj;
    }
    var jsonDaX = JSON.stringify(vettOggSaving);
    localStorage.setItem("json", jsonDaX);
}
function incrementa(nome) { //il parametro è l'id del div contenete la quantità del determinato prodotto
    for (var i = 0; i < lunghezza; i++) {
        if (obj[i].nome == nome) {
            quantita[i] = quantita[i] + 1;
            var tmp = "#" + nome;
            var bloccoNumero = document.querySelector(tmp)
            bloccoNumero.textContent = quantita[i];
            document.getElementById("coso").style.visibility = "visible";
            SalvaInLocalStorage(i);
            break;
        }
    }

}
function decrementa(nome) {  //il parametro è l'id del div contenete la quantità del determinato prodotto
    for (var i = 0; i < lunghezza; i++) {
        if (obj[i].nome == nome) {
            if (quantita[i] > 0) {
                var tmp = "#" + nome;
                var bloccoNumero = document.querySelector(tmp)
                quantita[i] = quantita[i] - 1;
                bloccoNumero.textContent = quantita[i];
                SalvaInLocalStorage(i);
            }
            break;
        }
    }

}
function CaricaPagina() {
    /*
    //pulisco il localStorage per essere sicuro che sia libero
    localStorage.clear();
    */

    //creo gli elementi in base alla lunghezza del JSON passato dal server
    for (let index = 0; index < lunghezza; index++) {
        //Prendo il nome del prodotto passato dal JSON. ES: Panino
        var nomeAttributo = obj[index].nome;
        //Prendo il prezzo del prodotto passato dal JSON. ES: 50
        var prezzoAttributo = obj[index].prezzo; //es: 1

        const divProdotto = document.createElement("div");
        const divProp = document.createElement("div");
        const divNome = document.createElement("div");
        const divPrezzo = document.createElement("div");
        const divQuantita = document.createElement("div");
        const divPiu = document.createElement("div");
        const immaginePiu = document.createElement("img");
        const divNumero = document.createElement("div");
        const divMeno = document.createElement("div");
        const immagineMeno = document.createElement("img");

        //imposto le classi ai div in base al CSS 
        divProdotto.setAttribute("class", "prodotto");
        divProp.setAttribute("class", "prop");
        divNome.setAttribute("class", "nome");
        divNome.innerHTML = nomeAttributo;//aggiungo al div del nome il nome del prodotto
        divPrezzo.setAttribute("class", "prezzo");
        divPrezzo.innerHTML = prezzoAttributo + "€";//aggiungo al div del prezzo il prezzo del prodotto

        //continuo a impostare le classi ai div
        divQuantita.setAttribute("class", "quantity");
        divMeno.setAttribute("class", "minus");
        immagineMeno.setAttribute("src", "../images/minusicon.png");
        divNumero.setAttribute("class", "number");
        //imposto l'id del div contenente la quantità di quel determinato prodotto, così posso modificare il numero in base al nome del prodotto
        divNumero.setAttribute("id", nomeAttributo);
        divNumero.innerHTML = 0;//imposto la quantità di base
        divPiu.setAttribute("class", "plus");
        immaginePiu.setAttribute("src", "../images/plusicon.svg");//metto il path delle immagini

        var funzione = "incrementa('" + nomeAttributo + "')";//imposto le funzioni da mettere nell'onclick delle immagini
        immaginePiu.setAttribute('onclick', funzione);


        //aggiunti attributi ai bottoni per decremento
        funzione = "decrementa('" + nomeAttributo + "')";
        immagineMeno.setAttribute('onclick', funzione);


        //ora vado a inserire gli elementi nel body
        var divLista = document.querySelector(".lista");

        divLista.appendChild(divProdotto);
        divProdotto.appendChild(divProp);
        divProp.appendChild(divNome);
        divProp.appendChild(divPrezzo);
        divProdotto.appendChild(divQuantita);
        divQuantita.appendChild(divMeno);
        divMeno.appendChild(immagineMeno);
        divQuantita.appendChild(divNumero);
        divQuantita.appendChild(divPiu);
        divPiu.appendChild(immaginePiu);
        
    }
    caricaDaPagOrdine();
}
function caricaDaPagOrdine() {
    var carica = localStorage.getItem("caricaDaLocalStorage");
    if (carica == "true") {
        localStorage.setItem("caricaDaLocalStorage",false);
        vettOggSaving = JSON.parse(localStorage.getItem("json"));
        for (var i = 0; i < vettOggSaving.length; i++) {
            if(vettOggSaving[i] != null){
                quantita[i] =        vettOggSaving[i].quantita;
                var tmp = "#" + vettOggSaving[i].nome;
                var bloccoNumero = document.querySelector(tmp)
                bloccoNumero.textContent = vettOggSaving[i].quantita;
            }
        }
    }
}
function checkZEROTWO(){
    let evilRammus = "ok";
    for (let i = 0; i < vettOggSaving.length; i++) {
        if(vettOggSaving != null){
            if(vettOggSaving[i].quantita != 0  ){
                evilRammus = "not ok";
                break;
            }
        }
        else{
            break;
        }
        
    }
    if(evilRammus == "ok"){
        document.getElementById("coso").style.visibility = "hidden";
    }
}