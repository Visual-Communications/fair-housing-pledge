# API

## Pledges

| Route              | HTTP Method | Route Handler Callback | Description              |
| :---               | :---        | :---                   | :---                     |
| `/api/pledges`     | `GET`       | `getPledges()`         | Gets all pledges         |
| `/api/pledges`     | `POST`      | `createPledge()`       | Creates a pledge         |
| `/api/pledges`     | `PUT`       | `updatePledges()`      | Updates multiple pledges |
| `/api/pledges`     | `DELETE`    | `deletePledges()`      | Deletes multiple pledges |
| `/api/pledges/:id` | `GET`       | `getPledge()`          | Gets a pledge            |
| `/api/pledges/:id` | `PUT`       | `updatePledge()`       | Updates a pledge         |
| `/api/pledges/:id` | `DELETE`    | `deletePledge()`       | Deletes a pledge         |
