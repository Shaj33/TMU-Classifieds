from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from bson.json_util import dumps
import pymongo
from datetime import datetime as dt

@api_view(['GET'])
def hello_world(request):
    return Response({'message': 'Hello, world!'})

@api_view(['GET'])
def get_all_lists(request):


    userId = int(request.query_params['userId'])
    friendId = int(request.query_params['friendId'])
    userMessages = []

    query = { '$or': [{'userId1': userId, 'userId2': friendId}, {'userId1': friendId, 'userId2': userId}]}
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

@api_view(['GET'])
def get_most_recent_all(request):

    userId = int(request.query_params['userId'])
    userMessages = []

    query = { '$or': [{'userId1': userId}, {'userId2': userId}] }
    queryFields = {'_id': False}

    msgs = msgList.find(query, queryFields)

    recent_msg = {}

    for msg in msgs:
        friend = msg['userId1'] if msg['userId2'] == userId else msg['userId2']
        if not friend in recent_msg:
            recent_msg[friend] = msg
        elif msg['date'] > recent_msg[friend]['date']:
            recent_msg[friend] = msg


    print(recent_msg)

    for msgKey in recent_msg:
        msg = recent_msg[msgKey]
        userMessages.append({
            'content': msg['content'],
            'userId': userId,
            'friendId': msgKey,
            'date': msg['date']
        })

    return JsonResponse(list(userMessages), safe=False)


@api_view(['POST'])
def send_txt_message(request):   
    print(type(request.data['date']))

    new_post = {
        'userId1': request.data['userId'],
        'userId2': request.data['friendId'],
        'content': request.data['content'],
        'date': dt.fromtimestamp(request.data['date']/1e3)
    }

    msgList.insert_one(new_post)
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