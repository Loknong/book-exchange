## TRANSITIONS, ADMIN, PAYMENTS

| Description                               | API Endpoint                                      | Method | Request Part       | Example                                                                                 |
|-------------------------------------------|---------------------------------------------------|--------|--------------------|-----------------------------------------------------------------------------------------|
| Create a new transaction after an offer   | /api/transactions                                 | POST   | Body               | {"offerId": 1, "status": "PENDING"}                                                     |
| Get a list of all transactions for a user | /api/transactions                                 | GET    | Query Params       | /api/transactions?userId=2                                                              |
| Get details of a specific transaction     | /api/transactions/:transactionId                  | GET    | Params             | /api/transactions/1                                                                     |
| Update status of a transaction            | /api/transactions/:transactionId                  | PUT    | Params, Body       | /api/transactions/1 {"status": "COMPLETED"}                                             |
| Get tracking information for a transaction| /api/transactions/:transactionId/tracking         | GET    | Params             | /api/transactions/1/tracking                                                            |
| Approve a transaction (admin use)         | /api/admin/transactions/:transactionId/approve    | PUT    | Params             | /api/admin/transactions/1/approve                                                       |
| Reject a transaction (admin use)          | /api/admin/transactions/:transactionId/reject     | PUT    | Params             | /api/admin/transactions/1/reject                                                        |
| Confirm transaction status                | /api/transactions/:transactionId/confirm          | PUT    | Params, Body       | /api/transactions/1/confirm {"status": "CONFIRMED"}                                     |
| Create a payment for a transaction        | /api/payments                                     | POST   | Body               | {"transactionId": 1, "status": "PENDING"}                                               |
| Update payment status                     | /api/payments/:paymentId                          | PUT    | Params, Body       | /api/payments/1 {"status": "COMPLETED"}                                                 |
| Users provide payment evidence            | /api/payments/:paymentId/evidence                 | PUT    | Params, Body       | /api/payments/1/evidence {"evidence": "URL-to-evidence"}                                |
| Admin verifies payment                    | /api/admin/payments/:paymentId/verify             | PUT    | Params, Body       | /api/admin/payments/1/verify {"status": "VERIFIED"}                                     |
| Admin updates address                     | /api/admin/transactions/:transactionId/address    | PUT    | Params, Body       | /api/admin/transactions/1/address {"address": "New Address"}                            |
| Admin receives books                      | /api/admin/transactions/:transactionId/received   | PUT    | Params, Body       | /api/admin/transactions/1/received {"status": "RECEIVED_BOOKS"}                         |
| Admin ships books to users                | /api/admin/transactions/:transactionId/ship       | PUT    | Params, Body       | /api/admin/transactions/1/ship {"status": "SHIPPED_TO_USERS"}                           |
| Users confirm receipt of books            | /api/transactions/:transactionId/confirm-receipt  | PUT    | Params, Body       | /api/transactions/1/confirm-receipt {"status": "BOOKS_RECEIVED"}                        |
| Complete transaction                      | /api/transactions/:transactionId/complete         | PUT    | Params, Body       | /api/transactions/1/complete {"status": "COMPLETED"}                                    |


## Notification Management
| Description                        | API Endpoint                          | Method | Request Part | Example                                    |
|------------------------------------|---------------------------------------|--------|--------------|--------------------------------------------|
| Get all notifications for a user   | /api/notifications                    | GET    | Query Params | /api/notifications?userId=2                |
| Mark a notification as read        | /api/notifications/:notificationId    | PUT    | Params       | /api/notifications/1                       |

## Ranking and Statistics
| Description                       | API Endpoint                      | Method | Request Part | Example                        |
|-----------------------------------|-----------------------------------|--------|--------------|--------------------------------|
| Get top 10 books for each genre   | /api/rankings/:genreId            | GET    | Params       | /api/rankings/1                |
| Get various statistics            | /api/statistics                   | GET    | None         |                                |
| Get user activity statistics      | /api/statistics/user-activity     | GET    | None         |                                |


## Admin Management
| Description                           | API Endpoint                                    | Method | Request Part | Example                                          |
|---------------------------------------|-------------------------------------------------|--------|--------------|--------------------------------------------------|
| Get all books (including private)     | /api/admin/books                                | GET    | None         |                                                  |
| Get all offers                        | /api/admin/offers                               | GET    | None         |                                                  |
| Get all transactions                  | /api/admin/transactions                         | GET    | None         |                                                  |
| Manage book statuses in transactions  | /api/admin/transactions/:transactionId          | PUT    | Params, Body | /api/admin/transactions/1 {"adminStatus": "RECEIVED"} |
