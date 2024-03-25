from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
import pymongo
import uuid

@api_view(['GET'])
def hello_world(request):
    return Response({'message': 'Hello, world!'})

@api_view(['POST'])
def post_ad(request):
    new_ad = {
        'user_id': request.data['userId'],
        'type': request.data['type'],
        'title': request.data['title'],
        'content': request.data['content'],
        'location': request.data['location'],
        'price': request.data['price']
    }

    ads.insert_one(new_ad)
    return Response()

# Create your views here.
def index(request):
    return HttpResponse("<h1>Hello and welcome to my <u>Django App</u> project!</h1>")

client = pymongo.MongoClient('mongodb://localhost:27017/mainDB')
#Define DB Name
dbname = client['mainDB']

#Define Collection
collection = dbname['User']
ads = dbname['Ads']

mascot_1={
    'id': 1,
    "Name": "Sammy"
}




collection.insert_one(mascot_1)

user_details = collection.find({})
ad_list = ads.find({})
for ad in ad_list:
    print(ad)

for r in user_details:
    print(r['Name'])

