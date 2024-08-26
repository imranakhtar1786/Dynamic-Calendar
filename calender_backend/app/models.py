from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class Event(BaseModel):
    _id:str
    title: str
    description: Optional[str]
    reminder_Time: datetime
    event_Type: str
    recurring: Optional[bool] = False
    
class EventResponse(BaseModel):
    id: str
    title: str
    description: Optional[str]
    reminder_Time: datetime
    event_Type: str
    recurring: Optional[bool] = False