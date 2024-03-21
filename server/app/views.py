from django.shortcuts import render
from django.http import HttpResponse
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
collection2 = dbname['Ads']

mascot_1={
    'id': 1,
    "Name": "Sammy"
}

ad_1={
    'id': 1,
    'user_id': 1,
    'type': 'Wanted',
    'title': 'Looking for textbook',
    'content': 'looking for Intro to CS first edition',
    'location': 'Toronto'
}

ad_2={
    'id': 2,
    'user_id': 1,
    'type': 'For Sale',
    'title': 'Selling calculator',
    'content': 'I want to get rid of my calculator',
    'location': 'Toronto',
    'price': 5
}

ad_3={
    'id': 3,
    'user_id': 1,
    'type': 'Services',
    'title': 'Offering tutoring services',
    'content': 'Willing to teach math and computer science',
    'location': 'Toronto',
    'price': 15
}


collection.insert_one(mascot_1)
collection2.insert_many([ad_1, ad_2, ad_3])

user_details = collection.find({})
ad_details = collection2.find({})

for r in user_details:
    print(r['Name'])

for ad in ad_details:
    print(ad)