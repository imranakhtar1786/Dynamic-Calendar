from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime, timedelta
from bson import ObjectId
from app.database import events_collection
from app.models import Event,EventResponse
import uuid
router = APIRouter()

@router.post("/events/", response_model=Event)
async def create_event(event: Event):
    event_dict = event.dict(exclude_unset=True)
    unique_id = str(ObjectId())
    event_dict["_id"]=unique_id
    result = events_collection.insert_one(event_dict)
    event_dict["id"] = str(result.inserted_id)
    return event_dict

@router.get("/events/{event_id}", response_model=Event)
async def get_event(event_id: str):
    event = events_collection.find_one({"_id": ObjectId(event_id)})
    if event is None:
        raise HTTPException(status_code=404, detail="Event not found")
    event["id"] = str(event["_id"])
    return Event(**event)

@router.put("/events/{event_id}", response_model=Event)
async def update_event(event_id: str, event: Event):
    event_dict = event.dict(exclude_unset=True)
    result = events_collection.update_one(
        {"_id": ObjectId(event_id)}, {"$set": event_dict}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Event not found")
    event_dict["id"] = event_id
    return event_dict

@router.delete("/events/{event_id}")
async def delete_event(event_id: str):
    result = events_collection.delete_one({"_id": event_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Event not found")
    return {"detail": "Event deleted"}

@router.get("/events/view/day/", response_model=List[EventResponse])
async def get_events_for_day(date: datetime):
    start_of_day = datetime(date.year, date.month, date.day)
    end_of_day = start_of_day + timedelta(days=1)
    events = events_collection.find({
        "reminder_Time": {"$gte": start_of_day, "$lt": end_of_day}
    }).sort("reminder_Time", -1)
    return [
        EventResponse(
            id=str(event["_id"]),
            title=event["title"],
            description=event.get("description"),
            reminder_Time=event["reminder_Time"],
            event_Type=event["event_Type"],
            recurring=event.get("recurring", False)
        ) for event in events
    ]

@router.get("/events/view/week/", response_model=List[EventResponse])
async def get_events_for_week(date: datetime):
    start_of_week = date - timedelta(days=date.weekday())
    end_of_week = start_of_week + timedelta(days=7)
    events = events_collection.find({
        "reminder_Time": {"$gte": start_of_week, "$lt": end_of_week}
    }).sort("reminder_Time", -1)
    return [
        EventResponse(
            id=str(event["_id"]),
            title=event["title"],
            description=event.get("description"),
            reminder_Time=event["reminder_Time"],
            event_Type=event["event_Type"],
            recurring=event.get("recurring", False)
        ) for event in events
    ]

@router.get("/events/view/month/", response_model=List[EventResponse])
async def get_events_for_month(date: datetime):
    start_of_month = datetime(date.year, date.month, 1)
    if date.month == 12:
        start_of_next_month = datetime(date.year + 1, 1, 1)
    else:
        start_of_next_month = datetime(date.year, date.month + 1, 1)
    events = events_collection.find({
        "reminder_Time": {"$gte": start_of_month, "$lt": start_of_next_month}
    }).sort("reminder_Time", -1)
    # events=events_collection.find()
    return [
        EventResponse(
            id=str(event["_id"]),
            title=event["title"],
            description=event.get("description"),
            reminder_Time=event["reminder_Time"],
            event_Type=event["event_Type"],
            recurring=event.get("recurring", False)
        ) for event in events
    ]
