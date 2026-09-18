"""Application constants for marketing activities."""

ACTIVITY_CATEGORIES = ["promotions", "content", "focuses"]

CATEGORY_CODES = {
    "promotions": 6,
    "content": 7,
    "focuses": 8,
}

ACTIVITY_TYPES = {
    "email_send": {"category": "promotions", "color": "#4F46E5"},
    "sms_send": {"category": "promotions", "color": "#0891B2"},
    "content_publish": {"category": "content", "color": "#16A34A"},
    "focus_campaign": {"category": "focuses", "color": "#EA580C"},
}

DYNAMIC_FIELDS_BY_TYPE = {
    "email_send": ["subject_line"],
    "sms_send": ["message_preview"],
    "content_publish": ["channel"],
    "focus_campaign": ["focus_area"],
}
