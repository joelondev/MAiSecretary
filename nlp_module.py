import spacy
from datetime import datetime, timedelta

# Load NLP model
nlp = spacy.load("en_core_web_sm")

def parse_task_description(description):
    doc = nlp(description)
    task_details = {
        "action": None,
        "subject": None,
        "time": None
    }

    for token in doc:
        if token.pos_ == "VERB":
            task_details["action"] = token.text
        elif token.pos_ == "NOUN":
            task_details["subject"] = token.text
        elif token.ent_type_ == "TIME":
            task_details["time"] = token.text

    return task_details

def schedule_task(task_description):
    details = parse_task_description(task_description)
    start_time = datetime.now() + timedelta(hours=1)  # Default: 1 hour from now
    end_time = start_time + timedelta(hours=1)  # Default: 1-hour duration

    return {
        "task": details["subject"],
        "start_time": start_time.isoformat(),
        "end_time": end_time.isoformat()
    }