# Goals API

## Create Goal

```
POST /api/v1/goals
```

Headers:
```
Authorization: Bearer <token>
```

Request Body:
```json
{
  "title": "My Goal",
  "description": "Goal description",
  "category": "Personal",
  "priority": "high"
}
```
