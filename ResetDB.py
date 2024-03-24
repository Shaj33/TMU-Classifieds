import pymongo
import datetime

client = pymongo.MongoClient('mongodb://localhost:27017')
client.drop_database('mainDB')

new_db = client['mainDB']

messages = new_db['messages']
ads = new_db['Ads']


message_validator = {
  '$jsonSchema': {
    'required': [
      'content',
      'userId1',
      'userId2',
      'date'
    ],
    'properties': {
      'content': {
        'bsonType': 'string'
      },
      'userId1': {
        'bsonType': 'int'
      },
      'userId2': {
        'bsonType': 'int'
      },
      'date': {
        'bsonType': 'date'
      }
    }
  }
}

messagesList = [{
  "content": "Hi",
  "userId1": 100,
  "userId2": 101,
  "date": datetime.datetime.strptime("2024-01-02T05:00:00.000Z", '%Y-%m-%dT%H:%M:%S.%f%z') 
},
{
  "content": "Hello",
  "userId1": 100,
  "userId2": 101,
  "date": datetime.datetime.strptime("2024-01-02T06:00:00.000Z", '%Y-%m-%dT%H:%M:%S.%f%z') 
},
{
  "content": "No",
  "userId1": 101,
  "userId2": 100,
  "date": datetime.datetime.strptime("2024-01-02T07:00:00.000Z", '%Y-%m-%dT%H:%M:%S.%f%z') 
},
{
  "content": "Hello",
  "userId1": 100,
  "userId2": 102,
  "date": datetime.datetime.strptime("2024-01-02T06:00:00.000Z", '%Y-%m-%dT%H:%M:%S.%f%z') 
},
{
  "content": "Hello",
  "userId1": 103,
  "userId2": 100,
  "date": datetime.datetime.strptime("2024-01-02T06:00:00.000Z", '%Y-%m-%dT%H:%M:%S.%f%z') 
}]

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

messages.insert_many(messagesList)
ads.insert_many([ad_1, ad_2, ad_3])


new_db.command("collMod", "messages", validator=message_validator)