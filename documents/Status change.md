## User states flowchart

```mermaid

graph TD
    PENDING --> CONFIRMED
    PENDING --> CANCELED
    CONFIRMED --> USER_PAYMENT_PENDING
    USER_PAYMENT_PENDING --> WAITING_CHECK_EVIDENCE
    WAITING_CHECK_EVIDENCE --> PAYMENT_SUCCESS
    WAITING_CHECK_EVIDENCE --> PAYMENT_FAILED
    PAYMENT_SUCCESS --> RECEIVED_ADDRESS
    RECEIVED_ADDRESS --> SENDING_BOOK
    SENDING_BOOK --> SEND_BOOK_COMPLETED
    SEND_BOOK_COMPLETED --> WAITING_RECEIVED_BOOK
    WAITING_RECEIVED_BOOK --> RECEIVED_BOOK

```

## Admin States Flowchart

``` mermaid 

graph TD
    CHECKING_PAYMENT_EVIDENCE --> CHECKED_PAYMENT_COMPLETED
    CHECKED_PAYMENT_COMPLETED --> SENDING_ADDRESS
    SENDING_ADDRESS --> WAITING_BOOK
    WAITING_BOOK --> RECEIVED_BOOK
    RECEIVED_BOOK --> SENDING_BOOK_TO_USER
    SENDING_BOOK_TO_USER --> COMPLETED

``` 

## Transaction States Flowchart

``` mermaid 

graph TD
    PENDING --> CONFIRMED
    CONFIRMED --> PAYMENT_PENDING
    PAYMENT_PENDING --> PAYMENT_IN_PROGRESS
    PAYMENT_IN_PROGRESS --> PAYMENT_COMPLETED
    PAYMENT_IN_PROGRESS --> PAYMENT_FAILED
    PAYMENT_COMPLETED --> ADDRESS_SENT
    ADDRESS_SENT --> BOOK_RECEIVED
    BOOK_RECEIVED --> BOOK_PROCESSING
    BOOK_PROCESSING --> COMPLETED
    PENDING --> CANCELED


``` 

# Combined State Flowchart
``` mermaid 
graph TD
    User1[Offer Book: PENDING] --> User2[Accept Offer: ACCEPTED]
    User1 --> User3[Reject Offer: REJECTED]
    User2 --> Trans1[Transaction: PENDING]
    Trans1 --> Trans2[Transaction: CONFIRMED]
    User2 --> UTT1[User Transaction Status: PENDING]
    UTT1 --> UTT2[User Transaction Status: CONFIRMED]
    UTT2 --> Payment1[Payment: PENDING]
    Payment1 --> Payment2[Payment: PAYMENT_IN_PROGRESS]
    Payment2 --> Payment3[Payment: PAYMENT_COMPLETED]
    Payment2 --> Payment4[Payment: PAYMENT_FAILED]
    Payment3 --> Trans3[Transaction: ADDRESS_SENT]
    Trans3 --> UTT3[User Transaction Status: RECEIVED_ADDRESS]
    UTT3 --> UTT4[User Transaction Status: SENDING_BOOK]
    UTT4 --> Admin1[Admin Management: WAITING_BOOK]
    Admin1 --> Admin2[Admin Management: RECEIVED_BOOK]
    Admin2 --> UTT5[User Transaction Status: SEND_BOOK_COMPLETED]
    Admin2 --> Trans4[Transaction: SEND_BOOK_COMPLETED]
    Trans4 --> Admin3[Admin Management: SENDING_BOOK_TO_USER]
    Admin3 --> UTT6[User Transaction Status: WAITING_RECEIVED_BOOK]
    UTT6 --> UTT7[User Transaction Status: RECEIVED_BOOK]
    UTT7 --> Trans5[Transaction: COMPLETED]

``` 