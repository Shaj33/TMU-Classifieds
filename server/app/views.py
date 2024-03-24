from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.forms import AuthenticationForm
from django.contrib import messages
from rest_framework.decorators import api_view
from rest_framework.response import Response
import pymongo

@api_view(['GET'])
def hello_world(request):
    return Response({'message': 'Hello, world!'})

# Create your views here.
def index(request):
    return HttpResponse("<h1>Hello and welcome to my <u>Django App</u> project!</h1>")

client = pymongo.MongoClient('mongodb://localhost:27017/mainDB')
#Define DB Name
dbname = client['mainDB']

#Define Collection
collection = dbname['User']

mascot_1={
    'id': 1,
    "Name": "Sammy"
}

collection.insert_one(mascot_1)

user_details = collection.find({})

for r in user_details:
    print(r['Name'])

# New login view
def user_login(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('index')  # Redirect to your desired page after login
        else:
            messages.error(request, 'Invalid username or password.')
    else:
        form = AuthenticationForm()
    return render(request, 'login.html', {'form': form})

# New logout view
def user_logout(request):
    logout(request)
    return redirect('index')  # Redirect to your desired page after logout