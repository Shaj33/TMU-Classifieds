import pymongo
import datetime
import base64
import platform
import tempfile
from faker import Faker
from faker.providers import currency
from faker_file.providers.png_file import GraphicPngFileProvider

fake = Faker()
fake.add_provider(currency)
fake.add_provider(GraphicPngFileProvider)

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
  "date": datetime.datetime.strptime("2024-01-02T05:00:00.000Z", '%Y-%m-%dT%H:%M:%S.%f%z'),
  "postId": 1 
},
{
  "content": "Hello",
  "userId1": 100,
  "userId2": 101,
  "date": datetime.datetime.strptime("2024-01-02T06:00:00.000Z", '%Y-%m-%dT%H:%M:%S.%f%z'),
  "postId": 1  
},
{
  "content": "No",
  "userId1": 101,
  "userId2": 100,
  "date": datetime.datetime.strptime("2024-01-02T07:00:00.000Z", '%Y-%m-%dT%H:%M:%S.%f%z'),
  "postId": 1 
},
{
  "content": "Hello",
  "userId1": 100,
  "userId2": 102,
  "date": datetime.datetime.strptime("2024-01-02T06:00:00.000Z", '%Y-%m-%dT%H:%M:%S.%f%z'),
  "postId": 2  
},
{
  "content": "Hello",
  "userId1": 103,
  "userId2": 100,
  "date": datetime.datetime.strptime("2024-01-02T06:00:00.000Z", '%Y-%m-%dT%H:%M:%S.%f%z'),
  "postId": 3  
}]

ad_1={
    'id': 1,
    'user_id': 1,
    'type': 'Wanted',
    'title': 'Looking for textbook',
    'content': 'looking for Intro to CS first edition',
    'location': 'Toronto',
    'picture': None,
    'date': 'January 1, 2024',
    'is_open': True
}

ad_2={
    'id': 2,
    'user_id': 1,
    'type': 'Sale',
    'title': 'Selling calculator',
    'content': 'I want to get rid of my calculator',
    'location': 'Toronto',
    'price': '$5',
    'picture': None,
    'date': 'November 11, 2020',
    'is_open': True
}

ad_3={
    'id': 3,
    'user_id': 1,
    'type': 'Academic',
    'title': 'Offering tutoring services',
    'content': 'Willing to teach math and computer science',
    'location': 'Toronto',
    'price': '$15',
    'picture': None,
    'date': 'October 12, 2010',
    'is_open': True
}

messages.insert_many(messagesList)
ads.insert_many([ad_1, ad_2, ad_3])

for _ in range(20):
    png_file_path = fake.graphic_png_file()

    file_path = tempfile.gettempdir()+'/'+png_file_path if platform.system() == 'Windows' else png_file_path
    with open(file_path, 'rb') as f:
      png_data = f.read()

    ad = {
        'id': fake.unique.pyint(),
        'user_id': fake.unique.pyint(),
        'type': fake.random_element(elements=('Academic', 'Sale', 'Wanted')),
        'title': fake.sentence(),
        'content': fake.paragraph(),
        'location': fake.address(),
        'date': fake.date_time_this_decade(before_now=True, after_now=False).strftime("%B %d, %Y"),
        'price': fake.pricetag(),  # Random price
        'picture': base64.b64encode(png_data).decode('utf-8') if fake.boolean() else None,
        'is_open': fake.boolean(chance_of_getting_true=80),
    }
    ads.insert_one(ad)


new_db.command("collMod", "messages", validator=message_validator)