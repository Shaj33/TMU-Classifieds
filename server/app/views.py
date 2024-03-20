from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
import pymongo
from bson.json_util import dumps

@api_view(['GET'])
def hello_world(request):
    return Response({'message': 'Hello, world!'})

@api_view(['GET'])
def get_all_lists(request):

    print(request.query_params)

    userId = int(request.query_params['userId'])
    userMessages = []

    query = { '$or': [{'userId1': userId}, {'userId2': userId}]}
    queryFields = {'_id': False}

    msgs = msgList.find(query, queryFields)

    for msg in msgs:
        userMessages.append({
            'content': msg['content'],
            'userId1': msg['userId1'],
            'userId2': msg['userId2'],
            'date': msg['date']
        })

    return JsonResponse(list(userMessages), safe=False)

@api_view(['POST'])
def send_txt_message(request):

   

    collection.insert_one(mascot_1)
    del mascot_1["_id"]
    return Response()

# Create your views here.
def index(request):
    return HttpResponse("<h1>Hello and welcome to my <u>Django App</u> project!</h1>")

client = pymongo.MongoClient('mongodb://localhost:27017/mainDB')
#Define DB Name
dbname = client['mainDB']

#Define Collection
collection = dbname['User']

msgList = dbname['messages']


mascot_1={
    'id': 1,
    "Name": "Sammy"
}

#collection.insert_one(mascot_1)

user_details = collection.find({})

for r in user_details:
    print(r['Name'])