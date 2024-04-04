from django.http import HttpResponse
from django.http import JsonResponse
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
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
from django.contrib.auth.models import User

@api_view(['GET'])
def hello_world(request):
    return Response({'message': 'Hello, world!'})

@api_view(['GET'])
def get_msgs_lists(request):
    userId = Token.objects.get(key=request.query_params['userId']).user_id
    friendId = int(request.query_params['friendId'])
    postId = int(request.query_params['postId'])
    try:
        friendUser = User.objects.get(id=friendId).username
    except:
        friendUser = friendId
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

    response = {'user': userId, 'friendUser': friendUser, 'messages': list(userMessages)}

    return JsonResponse(response, safe=False)

@api_view(['GET'])
def get_most_recent_all(request):

    userId = Token.objects.get(key=request.query_params['userId']).user_id
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
        try: 
            friendUser = User.objects.get(id=friend).username
        except:
            friendUser = friend 

        userMessages.append({
            'content': msg['content'],
            'userId': userId,
            'friendId': friend,
            'friendUser': friendUser,
            'date': msg['date'],
            'postId': postId,
            'postTitle': ad_collection.find_one({'id': postId}, {'_id': False})['title']
        })

    return JsonResponse(list(userMessages), safe=False)


@api_view(['POST'])
def send_txt_message(request):   

    userId = Token.objects.get(key=request.data['userId']).user_id

    new_post = {
        'userId1': int(userId),
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
            return Response({'token': token.key, 'username': user.username, 'userId': User.objects.get(username=user.username).id}, status=status.HTTP_200_OK)
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

@api_view(['GET'])
def get_all_users(request):
    users = User.objects.all()
    data = [{'id': user.id, 'username': user.username, 'email': user.email} for user in users]
    return JsonResponse(data, safe=False)

@api_view(['GET'])
def get_is_user_staff(request):
    try:
        user_id = Token.objects.get(key=request.query_params['userId']).user_id
        user = User.objects.filter(id=user_id).first()
        if not user:
            return JsonResponse({'error': 'User not found'}, status=404)

        # return if the user is a staff
        return JsonResponse({'is_staff': user.is_staff})
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

@api_view(['DELETE'])
def delete_user(request, user_id):
    try:
        # Check if the user exists
        user = User.objects.filter(id=user_id).first()
        if not user:
            return JsonResponse({'error': 'User not found'}, status=404)

        # Delete the user
        user.delete()

        return JsonResponse({'message': 'User deleted successfully'})
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

@api_view(['GET'])
def get_all_ad_listings(request):
    ads = ad_collection.find({}, {'_id': False})
    ads_response = []

    for ad in ads:
        try:
            ad['username'] = User.objects.get(id=ad['user_id']).username
        except:
            ad['username'] = ad['user_id']
        ads_response.append(ad)

    return JsonResponse(ads_response, safe=False)


@api_view(['POST'])
def post_ad(request):
    try: 
        last_id = ad_collection.find({}, {"id": 1}, sort=[('id', -1)]).limit(1).next()
        new_id = last_id['id'] + 1
    except:
        new_id = 1

    user_Id = Token.objects.get(key=request.data['userId']).user_id

    new_ad = {
        'id': new_id,
        'user_id': user_Id,
        'type': request.data['type'],
        'title': request.data['title'],
        'content': request.data['content'],
        'location': request.data['location'],
        'price': request.data['price'],
        'picture': request.data['picture'],
        'date': request.data['date'],
        'is_open': True
    }

    ad_collection.insert_one(new_ad)
    return Response()



@api_view(['PUT'])
def close_ad(request, ad_id):
    try:
        ad = ad_collection.find_one({'id': ad_id})
        if not ad:
            return JsonResponse({'error': 'Ad not found'}, status=404)

        ad_collection.update_one({'id': ad_id}, {'$set': {'is_open': False}})

        return JsonResponse({'message': 'Ad closed Successfully'})
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


@api_view(['DELETE'])
def delete_ad(request, ad_id):
    try:
        ad = ad_collection.find_one({'id': ad_id})
        if not ad:
            return JsonResponse({'error': 'Ad not found'}, status=404)

        ad_collection.delete_one({'id': ad_id})

        return JsonResponse({'message': 'Ad deleted successfully'})
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

@api_view(['GET'])
def get_single_ad_listing(request):
    ad = ad_collection.find_one({'id': int(request.query_params['postId'])}, {'_id': False})
    print(ad['user_id'] == Token.objects.get(key=request.query_params['userId']).user_id)
    ad['isOwner'] = True if ad['user_id'] == Token.objects.get(key=request.query_params['userId']).user_id else False

    return JsonResponse(ad, safe=False)

client = pymongo.MongoClient('mongodb://localhost:27017/mainDB')
#Define DB Name
dbname = client['mainDB']

#Define Collection
ad_collection = dbname['Ads']
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