from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.core.validators import RegexValidator
from .models import CustomUser

class RegistrationForm(UserCreationForm):
    email = forms.EmailField(required=True, validators=[RegexValidator(
        regex=r'@torontomu\.ca$',
        message='Email must end with @torontomu.ca'
    )])

    class Meta:
        model = CustomUser
        fields = ('username', 'email', 'password1', 'password2')

    def clean_email(self):
        email = self.cleaned_data.get('email')
        if not email.endswith('@torontomu.ca'):
            raise forms.ValidationError("Only TMU email addresses are allowed.")
        return email

    def save(self, commit=True):
        user = super(RegistrationForm, self).save(commit=False)
        user.email = self.cleaned_data['email']
        if commit:
            user.save()
        return user