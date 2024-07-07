## API LIST

### Exchange Process

1. Create Offer
   - `POST /exchnage/offers`
2. Update Offer
   - `POST /exchange/offers/:offerId`
3. Initiate Transaction
   - `POST /exchange/transactions`
4. Update Transacion Stauts
   - `PUT /exchange/transacions/:transacionId`
5. Initiate Payment
   - `POST /exchange/payments`
6. Update Payment Status
   - `PUT /exchange/payments/:paymentId`
7. Check Payment Evidence
   - `PUT /exchange/admin/checkPayment/:paymentId`
8. Receuive Book
   - `PUT /exchange/admin/receiveBook/:transacionId`
9. Send Book to User
   - `PUT /exchange/admin/sendBook/:transacionId`
10. Create User Transacion Status
    - `POST /exchange/user-transtaion-status`
11. Update User Transacion Status
    - `PUT /exchange/user-transacion-status/:userId`
12. Get Offers
    - `GET /exchange/offers/:userId`
13. Get Payment Status
    - `GET /exchange/pagments/:paymentId`
14. Get Transacion Status
    - `GET /exchange/transacions/:transacionId`
15. Track Exchange
    - `GET /exchange/tracking/:exchangeId`
16. Get Exchange History
    - `GET /exchange/tracking/history/:exchangeId`
17. Notify User
    - `POST /exchange/notifications`
18. Get Notificaions
    - `GET /exchange/notificaions/:userId`
19. Manage Users
    - `GET /echange/admin/users`
