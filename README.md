## API Reference

#### Auth Register

```http
  POST /api/register
```

| Parameter         | Type     | Description   |
| :---------------- | :------- | :------------ |
| `fullName`        | `string` | **Required**. |
| `email`           | `string` | **Required**. |
| `username`        | `string` | **Required**. |
| `password`        | `string` | **Required**. |
| `confirmPassword` | `string` | **Required**. |

#### Auth Login

```http
  POST /api/login
```

| Parameter  | Type     | Description   |
| :--------- | :------- | :------------ |
| `username` | `string` | **Required**. |
| `password` | `string` | **Required**. |

#### Auth Me

```http
  GET /api/me
```

| Parameter    | Type       | Description |
| :----------- | :--------- | :---------- |
| `_id_`       | `string`   |             |
| `fullName`   | `string`   |             |
| `email `     | `string`   |             |
| `username`   | `string`   |             |
| `userImage`  | `string`   |             |
| `userStatus` | `string`   |             |
| `created_at` | `datetime` |             |
| `updated_at` | `datetime` |             |

#### Update User

```http
  PUT /api/user
```

| Parameter   | Type     | Description   |
| :---------- | :------- | :------------ |
| `fullName`  | `string` | **Required**. |
| `email `    | `string` | **Required**. |
| `username`  | `string` | **Required**. |
| `userImage` | `file`   |               |
