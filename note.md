next after you got this data 
I think you can create new project construct by not follow my old data

our app is book-exchange app so at first user enter to our app, he will go to explore page
this page will have input search bar to search a book by book title, author in one input tab
next in this page will have categories that will show all genres of book and number of book for each genres
next is recently added 
will show lasted book and can see all to see lasted 100 added book
and next is most vied to see top 100 book view 
for month, week , day

this is explore section
then when user Is interest in some book he can click that book
then will go to book details pages
by have that books detail, owner 
if user is login card will have make offers button, if not will have button register to redirect to register process.
in register process it just basic register and login page (we call auth section).
after he complete will redirect back to that book detail page again.

then when he press make offers. it will show list of our books. by also can search and filter  sort like explore page (I forgot to tell you but in explore we also have features like this too)

after we see list of our app we can select one to exchange.
This will enter to Exchange process(for table like offers, transactions, adminMangaeent, userMangementStatus we can follow old flow chart for this features)

back to user thing
we have 1st explore page to view , search book and click to see book detail
then we have exchange page to manage and see our exchange status, take action with status

next is We call Profile/User area
I will list the thing that user can to then you group and give good name for it
- View user detail., update user profile, profile image , user address, select userAddress (we can add more than one then can select what we need to use). adjust some profile/ user data.  User can add book, update book, delete book, view own inventory books 
view all his exchange status that he have , and can manage it (maybe it same with exahcnage page) 
.... you can add more if I miss something 

this is flow from exchange if you forgot this is main flor for exchange
```mermaid
sequenceDiagram
    participant User
    participant OffersTable as Offers Table
    participant TransactionsTable as Transactions Table
    participant PaymentsTable as Payments Table
    participant UserTransactionStatusTable as User Transaction Status Table
    participant AdminManagementTable as Admin Management Table
    participant NotificationSystem as Notification System
    participant LoggingSystem as Logging System
    participant Admin

    User->>OffersTable: Insert into offers (status: PENDING)
    OffersTable->>NotificationSystem: Notify book owner
    OffersTable->>LoggingSystem: Log offer creation
    
    alt Owner Rejects
        Owner->>OffersTable: Update offers (status: REJECTED)
        OffersTable->>NotificationSystem: Notify interested user
        OffersTable->>LoggingSystem: Log rejection
    else Owner Accepts
        Owner->>OffersTable: Update offers (status: ACCEPTED)
        OffersTable->>TransactionsTable: Insert into transactions (status: PENDING)
        TransactionsTable->>NotificationSystem: Notify both users about transaction creation
        TransactionsTable->>LoggingSystem: Log transaction creation
        
        User->>UserTransactionStatusTable: Insert into UTT (status: PENDING) for both users
        
        alt Any User Cancels
            User->>UserTransactionStatusTable: Update UTT (status: CANCELED)
            UserTransactionStatusTable->>TransactionsTable: Update transactions (status: CANCELED)
            TransactionsTable->>NotificationSystem: Notify both users
            TransactionsTable->>LoggingSystem: Log cancellation
        else Both Users Confirm
            User->>UserTransactionStatusTable: Update UTT (status: CONFIRMED) for both users
            UserTransactionStatusTable->>TransactionsTable: Update transactions (status: CONFIRMED)
            TransactionsTable->>NotificationSystem: Notify both users
            TransactionsTable->>LoggingSystem: Log confirmation
            
            User->>PaymentsTable: Insert into payments (status: PENDING)
            PaymentsTable->>TransactionsTable: Update transactions (status: PAYMENT_PENDING)
            PaymentsTable->>NotificationSystem: Notify both users with payment details
            PaymentsTable->>LoggingSystem: Log payment creation
            
            User->>UserTransactionStatusTable: Update UTT (status: USER_PAYMENT_PENDING)
            
            User->>PaymentsTable: Update payments (status: PENDING, evidence: submitted)
            PaymentsTable->>AdminManagementTable: Insert into admin management (status: CHECKING_PAYMENT_EVIDENCE)
            PaymentsTable->>UserTransactionStatusTable: Update UTT (status: WAITING_CHECK_EVIDENCE)
            PaymentsTable->>TransactionsTable: Update transactions (status: PAYMENT_IN_PROGRESS)
            PaymentsTable->>NotificationSystem: Notify admin
            PaymentsTable->>LoggingSystem: Log payment submission
            
            Admin->>AdminManagementTable: Update admin management (status: CHECKED_PAYMENT_COMPLETED)
            
            alt Payment Fails
                Admin->>PaymentsTable: Update payments (status: FAILED)
                PaymentsTable->>TransactionsTable: Update transactions (status: PAYMENT_FAILED)
                PaymentsTable->>UserTransactionStatusTable: Update UTT (status: PAYMENT_FAILED)
                PaymentsTable->>NotificationSystem: Notify both users
                PaymentsTable->>LoggingSystem: Log payment failure
            else Payment Succeeds
                Admin->>PaymentsTable: Update payments (status: COMPLETED)
                PaymentsTable->>TransactionsTable: Update transactions (status: PAYMENT_COMPLETED)
                PaymentsTable->>UserTransactionStatusTable: Update UTT (status: PAYMENT_SUCCESS)
                PaymentsTable->>NotificationSystem: Notify both users
                PaymentsTable->>LoggingSystem: Log payment success
                
                Admin->>TransactionsTable: Update transactions (status: SEND_BOOK_TO_ADMIN)
                TransactionsTable->>AdminManagementTable: Update admin management (status: SENDING_ADDRESS)
                TransactionsTable->>UserTransactionStatusTable: Update UTT (status: RECEIVED_ADDRESS)
                TransactionsTable->>NotificationSystem: Notify both users with admin's address
                TransactionsTable->>LoggingSystem: Log address sent
                
                User->>UserTransactionStatusTable: Update UTT (status: SENDING_BOOK)
                User->>AdminManagementTable: Update admin management (status: WAITING_BOOK)
                User->>NotificationSystem: Notify admin
                User->>LoggingSystem: Log book shipment
                
                Admin->>AdminManagementTable: Update admin management (status: RECEIVED_BOOK)
                Admin->>UserTransactionStatusTable: Update UTT (status: SEND_BOOK_COMPLETED)
                Admin->>TransactionsTable: Update transactions (status: SEND_BOOK_COMPLETED) after both books received
                Admin->>NotificationSystem: Notify users about book receipt
                Admin->>LoggingSystem: Log book receipt
                
                Admin->>AdminManagementTable: Update admin management (status: SENDING_BOOK_TO_USER)
                Admin->>UserTransactionStatusTable: Update UTT (status: WAITING_RECEIVED_BOOK)
                Admin->>TransactionsTable: Update transactions (status: SEND_BOOK_TO_USER)
                Admin->>NotificationSystem: Notify users about book shipment
                Admin->>LoggingSystem: Log book shipment
                
                User->>UserTransactionStatusTable: Update UTT (status: RECEIVED_BOOK)
                User->>AdminManagementTable: Update admin management (status: COMPLETED)
                
                alt Both Users Confirm Receipt
                    User->>TransactionsTable: Update transactions (status: COMPLETED)
                    TransactionsTable->>NotificationSystem: Notify completion
                    TransactionsTable->>LoggingSystem: Log transaction completion
                end
            end
        end
    end

```

status change chart
## User states flowchart

```mermaid

graph TD
    PENDING -->|User confirms| CONFIRMED
    PENDING -->|User cancels| CANCELED
    CONFIRMED -->|Payment initiated| USER_PAYMENT_PENDING
    USER_PAYMENT_PENDING -->|Payment evidence submitted| WAITING_CHECK_EVIDENCE
    WAITING_CHECK_EVIDENCE -->|Payment successful| PAYMENT_SUCCESS
    WAITING_CHECK_EVIDENCE -->|Payment failed| PAYMENT_FAILED
    PAYMENT_SUCCESS -->|Address received| RECEIVED_ADDRESS
    RECEIVED_ADDRESS -->|User sends book| SENDING_BOOK
    SENDING_BOOK -->|Book sent| SEND_BOOK_COMPLETED
    SEND_BOOK_COMPLETED -->|Waiting for book receipt| WAITING_RECEIVED_BOOK
    WAITING_RECEIVED_BOOK -->|Book received| RECEIVED_BOOK


```

## Admin States Flowchart

```mermaid

graph TD
    CHECKING_PAYMENT_EVIDENCE -->|Evidence checked| CHECKED_PAYMENT_COMPLETED
    CHECKED_PAYMENT_COMPLETED -->|Address sent| SENDING_ADDRESS
    SENDING_ADDRESS -->|Book waiting| WAITING_BOOK
    WAITING_BOOK -->|Book received| RECEIVED_BOOK
    RECEIVED_BOOK -->|Book sent to user| SENDING_BOOK_TO_USER
    SENDING_BOOK_TO_USER -->|Process completed| COMPLETED


```

## Transaction States Flowchart

```mermaid
graph TD
    PENDING -->|Both users confirm| CONFIRMED
    CONFIRMED -->|Payment details created| PAYMENT_PENDING
    PAYMENT_PENDING -->|Payment in progress| PAYMENT_IN_PROGRESS
    PAYMENT_IN_PROGRESS -->|Payment completed| PAYMENT_COMPLETED
    PAYMENT_IN_PROGRESS -->|Payment failed| PAYMENT_FAILED
    PAYMENT_COMPLETED -->|Address sent| ADDRESS_SENT
    ADDRESS_SENT -->|Book received by admin| BOOK_RECEIVED
    BOOK_RECEIVED -->|Book processing| BOOK_PROCESSING
    BOOK_PROCESSING -->|Transaction completed| COMPLETED
    PENDING -->|Any user cancels| CANCELED



```

# Combined State Flowchart

```mermaid
graph TD
    User1[Offer Book: PENDING] -->|User Action<br>Accepted| User2[ACCEPTED]
    User1 -->|User Action<br>Rejected| User3[REJECTED]
    User2 -->|Automatic<br>Transaction created| Trans1[PENDING]
    Trans1 -->|User Action<br>Both users confirm| Trans2[CONFIRMED]
    Trans2 -->|Automatic<br>Payment details created| Payment1[PENDING]
    Payment1 -->|User Action<br>Payment in progress| Payment2[PAYMENT_IN_PROGRESS]
    Payment2 -->|User Action<br>Payment completed| Payment3[PAYMENT_COMPLETED]
    Payment2 -->|User Action<br>Payment failed| Payment4[PAYMENT_FAILED]
    Payment3 -->|Automatic<br>Address sent| Trans3[ADDRESS_SENT]
    Trans3 -->|User Action<br>User received address| UTT3[RECEIVED_ADDRESS]
    UTT3 -->|User Action<br>User sends book| UTT4[SENDING_BOOK]
    UTT4 -->|Automatic<br>Admin waiting for book| Admin1[WAITING_BOOK]
    Admin1 -->|Admin Action<br>Admin received book| Admin2[RECEIVED_BOOK]
    Admin2 -->|Automatic<br>User transaction completed| UTT5[SEND_BOOK_COMPLETED]
    Admin2 -->|Automatic<br>Transaction completed| Trans4[SEND_BOOK_COMPLETED]
    Admin2 -->|Admin Action<br>Admin sends book to user| Admin3[SENDING_BOOK_TO_USER]
    Admin3 -->|Automatic<br>User waiting for book| UTT6[WAITING_RECEIVED_BOOK]
    UTT6 -->|User Action<br>User received book| UTT7[RECEIVED_BOOK]
    UTT7 -->|Automatic<br>Transaction completed| Trans5[COMPLETED]


```
