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
    postId = int(request.query_params['postId'])
    userMessages = []

    query = { 'postId': postId, '$or': [{'userId1': userId, 'userId2': friendId}, {'userId1': friendId, 'userId2': userId}]}
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
        postId = msg['postId']
        friend = msg['userId1'] if msg['userId2'] == userId else msg['userId2']
        if not (postId, friend) in recent_msg:
            recent_msg[(postId, friend)] = msg
        elif msg['date'] > recent_msg[(postId, friend)]['date']:
            recent_msg[(postId, friend)] = msg

    for msgKey in recent_msg:
        msg = recent_msg[msgKey]
        postId, friend = msgKey
        userMessages.append({
            'content': msg['content'],
            'userId': userId,
            'friendId': friend,
            'date': msg['date'],
            'postId': postId,
            'postTitle': ad_collection.find_one({'id': postId}, {'_id': False})['title']
        })

    return JsonResponse(list(userMessages), safe=False)


@api_view(['POST'])
def send_txt_message(request):   

    new_post = {
        'userId1': request.data['userId'],
        'userId2': request.data['friendId'],
        'content': request.data['content'],
        'date': dt.fromtimestamp(request.data['date']/1e3),
        'postId': request.data['postId']
    }

    msgList.insert_one(new_post)
    return Response()

# Create your views here.
def index(request):
    return HttpResponse("<h1>Hello and welcome to my <u>Django App</u> project!</h1>")

@api_view(['GET'])
def get_all_ad_listings(request):
    ads = ad_collection.find({}, {'_id': False})

    return JsonResponse(list(ads), safe=False)

@api_view(['GET'])
def get_single_ad_listing(request):
    ad = ad_collection.find_one({'id': int(request.query_params['postId'])}, {'_id': False})

    return JsonResponse(ad, safe=False)

client = pymongo.MongoClient('mongodb://localhost:27017/mainDB')
#Define DB Name
dbname = client['mainDB']

#Define Collection
collection = dbname['User']
ad_collection = dbname['Ads']

msgList = dbname['messages']


mascot_1={
    'id': 1,
    "Name": "Sammy"
}

collection.insert_one(mascot_1)

user_details = collection.find({})

for r in user_details:
    print(r['Name'])
