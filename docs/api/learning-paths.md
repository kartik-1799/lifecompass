# Learning Paths API

## Create Learning Path

```
POST /api/v1/learning-paths
```

Headers:
```
Authorization: Bearer <token>
```

Request Body:
```json
{
  "title": "My Learning Path",
  "description": "Description of my learning path",
  "category": "Technology"
}
```
