from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
db = client["calendar_db"]

events_collection = db["events"]