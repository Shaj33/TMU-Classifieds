from django.http import HttpResponse
from django.http import JsonResponse
from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from bson.json_util import dumps
import pymongo
from .forms import RegistrationForm
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.permissions import IsAuthenticated
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

@api_view(['POST', 'OPTIONS'])
def register(request):
    if request.method == 'POST':
        form = RegistrationForm(request.POST)
        if form.is_valid():
            form.save()
            return Response({'message': 'Registration successful'}, status=status.HTTP_201_CREATED)
        else:
            return Response(form.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'OPTIONS':
        # Handle OPTIONS request (e.g., return allowed methods)
        return Response({'message': 'Allowed methods: POST'}, status=status.HTTP_200_OK)

@api_view(['POST'])
def user_login(request):
    if request.method == 'POST':
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)
        if user:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({'token': token.key, 'username': user.username}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
    else:
        return Response({'error': 'Method not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    
@api_view(['POST'])
def user_logout(request):
    try:
        token = request.data.get('token')
        token = Token.objects.get(key=token)
        token.delete()
        return Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)
    except Token.DoesNotExist:
        return Response({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
@authentication_classes([TokenAuthentication, SessionAuthentication])
@permission_classes([IsAuthenticated])
def sensitive_endpoint(request):
    # Your sensitive logic here
    return Response({'message': 'This is a sensitive endpoint'}, status=status.HTTP_200_OK)

@api_view(['GET'])
def public_endpoint(request):
    # Public endpoint logic
    return Response({'message': 'This is a public endpoint'}, status=status.HTTP_200_OK)

client = pymongo.MongoClient('mongodb://localhost:27017/mainDB')
#Define DB Name
dbname = client['mainDB']

#Define Collection
collection = dbname['users']

@api_view(['GET'])
def get_users(request):
    users = collection.find({})
    user_list = []
    for user in users:
        user_list.append(user)
    return Response({'users': user_list}, status=status.HTTP_200_OK)

@api_view(['POST'])
def add_user(request):
    user_data = request.data
    result = collection.insert_one(user_data)
    return Response({'message': 'User added successfully', 'user_id': str(result.inserted_id)}, status=status.HTTP_201_CREATED)


msgList = dbname['messages']


mascot_1={
    'id': 1,
    "Name": "Sammy"
}

collection.insert_one(mascot_1)

user_details = collection.find({})

for r in user_details:
    print(r['Name'])