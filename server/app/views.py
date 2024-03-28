from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
import pymongo

@api_view(['GET'])
def hello_world(request):
    return Response({'message': 'Hello, world!'})

# Create your views here.
def index(request):
    return HttpResponse("<h1>Hello and welcome to my <u>Django App</u> project!</h1>")

@api_view(['GET'])
def get_all_ad_listings(request):
    ads = ad_collection.find({}, {'_id': False})

    return JsonResponse(list(ads), safe=False)

client = pymongo.MongoClient('mongodb://localhost:27017/mainDB')
#Define DB Name
dbname = client['mainDB']

#Define Collection
collection = dbname['User']
ad_collection = dbname['Ads']

mascot_1={
    'id': 1,
    "Name": "Sammy"
}




# collection.insert_one(mascot_1)

user_details = collection.find({})

for r in user_details:
    print(r['Name'])
