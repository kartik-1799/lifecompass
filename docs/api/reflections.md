# Reflections API

## Create Reflection

```
POST /api/v1/reflections
```

Headers:
```
Authorization: Bearer <token>
```

Request Body:
```json
{
  "title": "Today's Reflection",
  "content": "Reflection content",
  "mood": "great"
}
```
