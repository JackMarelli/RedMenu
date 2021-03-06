from . import views
from . import admin_views
from django.urls import path, include
from django.views.generic.base import RedirectView

app_name = "ordinibar"

urlpatterns = [
    path('logout', views.logoutView, name = "logout"),
    path('register', views.registerView, name = "register"),
    #user pages
    path("", views.indexView, name = "index"),
    path('login', views.loginView, name = 'login' ),
    path('index/getitemlist', views.getProdottiView, name = 'get_item_list'),
    path('ordine', views.ordineView, name = 'ordine'),
    path('ordine/inviaordine', views.inviaOrdine, name = "invia_ordine"),
    path('account', views.accountView, name = 'account'),
    path('ordineconfermato', views.ordineConfermatoView, name = 'ordine_confermato'),
    path('ordineconfermato/getlastpk', views.getLastUserOrder, name = 'get_last_pk'),
    path('ordineconfermato/getlastorderinformations', views.getLastUserOrderInformations, name = 'get_last_order_informations'),
    path('cronologia', views.cronologiaView, name = 'cronologia'),
    path('cronologia/getCronologiaOrdini', views.getCronologiaOrdini, name = "get_cronologia_ordini"),
    #admin pages
    path('administration', admin_views.indexAdminView, name = 'index_admin'),
    path('administration/orderlist', admin_views.orderListAdminView, name= 'order_list_admin'),
    path('administration/ordineaccettato', admin_views.OrdineAccettatoView, name = 'ordine_accettato_admin'),
    path('administration/ordine', admin_views.OrdineView , name = 'ordine_admin'),
    path('administration/qrscanner', admin_views.QrScannerView, name = 'qr_scanner'),
    path('administration/getorderliststatus', admin_views.getOrderListStatus, name = 'order_list_status'),
    path('administration/getorderproductslist', admin_views.getOrderProductsList, name = 'order_product_list'),
    path('administration/changeorderstatus', admin_views.changeOrderState, name = "change_order_status"),
    path('administration/productlist', admin_views.productListView, name = "order_list_view"),
    path('administration/productdetails', admin_views.viewProductDetailsView, name = "product_details"),
    path('administration/addproduct',admin_views.aggiungiProdotto, name = "add_product"),
    path('administration/modificaprodotto/<id>/', admin_views.modificaProdottoView, name = "modifica_prodotto"),
    path('administration/removeproduct', admin_views.rimuoviProdotto, name = "rimuovi_prodotto"),
]

