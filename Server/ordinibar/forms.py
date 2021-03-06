from django import forms
from django.contrib.auth.forms import AuthenticationForm
from django.forms.widgets import PasswordInput, TextInput

#form per il login dell'utente
class UserLoginForm(AuthenticationForm):
    username = forms.CharField(widget=TextInput(attrs={'class':'validate','placeholder': 'Username'}))
    password = forms.CharField(widget=PasswordInput(attrs={'placeholder':'Password',}))

#form per il cambio della password dell'utente
class ChangePasswordForm(forms.Form):
    vecchia_password = forms.CharField(widget=PasswordInput(attrs={'placeholder':'Vecchia password',}))
    nuova_password = forms.CharField(widget=PasswordInput(attrs={'placeholder':'Nuova password',}))
    conferma_password = forms.CharField(widget=PasswordInput(attrs={'placeholder':'Conferma password',}))

#form per la registrazione dell'utente
class UserRegisterForm(forms.Form):
    username = forms.CharField(widget=TextInput(attrs={'placeholder': 'Username'}))
    email = forms.EmailField(widget=TextInput(attrs={'placeholder': 'Email'}))
    password = forms.CharField(widget=PasswordInput(attrs={'placeholder': 'Password'}))
    conferma_password = forms.CharField(widget=PasswordInput(attrs={'placeholder': 'Conferma password'}))

#form per aggiungere un prodotto
class AddProductForm(forms.Form):
    nome = forms.CharField(required=True)
    prezzo = forms.FloatField(required=False)
    TIPO_CHOICES=[('Dolce','Dolce'),('Salato','Salato'),]
    tipo = forms.ChoiceField(choices=TIPO_CHOICES, widget=forms.RadioSelect, required=True)
    aggiunte = forms.MultipleChoiceField(choices=[('Aggiunte', 'Aggiunte')], widget=forms.CheckboxSelectMultiple, required=False)
