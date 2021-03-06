from ordinibar import admin_views
from . import views
from . import admin_views
from django.urls import path

app_name = 'ordinibar'
urlpatterns = [
    #Urls
    path("login", views.loginView, name = "login"),
    path("logout", views.logoutView, name = "logout"),
    path("register", views.registerView, name = "register"),
    path("", views.indexView, name = "index"),
    path("ordine",views.ordineView, name = "ordine"),
    path("ordine/addordine", views.addOrdineView, name = "add_ordine"),
    path("ordineconfirmed", views.ordineConfirmedView, name="ordine_confirmed"),
    path("account", views.accountView, name = "account"),
    path("cronologia", views.cronologiaView, name ="cronologia"),
    #ADMIN URLS
    path("bivio", admin_views.bivioView, name = "bivio"),
    path("listaordini",admin_views.listaOrdiniView, name = "lista_ordini"),
    path("ordinedaaccettare/<id>/",admin_views.viewOrdineDaAccettareDetail, name = "ordine_da_accettare"),
    path("changeorderstatus", admin_views.changeOrderStatus, name = "change_order_status"),
    path("qrscanner", admin_views.QrScannerView, name = "qr_scanner"),
    path("listaprodotti", admin_views.ListaProdottiView, name = "lista_prodotti"),
    path("prodotto/<id>/", admin_views.ChangeProductView, name = "cambia_prodotto"),
    path("eliminaprodotto",admin_views.deleteProduct, name = "elimina_prodotto"),
    path("cambianomeprodotto", admin_views.cambiaNome, name = "cambia_nome_prodotto"),
    path("cambiaprezzoprodotto", admin_views.cambiaPrezzo, name = "cambia_prezzo_prodotto"),
    path("setaggiunte", admin_views.setAggiunte, name = "set_aggiunte"),
    path("aggiungiprodotto",admin_views.AggiungiProdottoView, name = "aggiungi_prodotto"),
    path("addnewproduct",admin_views.AddNewProduct, name = "add_new_product"),
    path("cronologiaordini", admin_views.cronologiaView, name = "cronologia_ordini"),
]