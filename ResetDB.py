import pymongo
import datetime

client = pymongo.MongoClient('mongodb://localhost:27017')
client.drop_database('mainDB')

new_db = client['mainDB']

messages = new_db['messages']

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

messages.insert_many(messagesList)

new_db.command("collMod", "messages", validator=message_validator)