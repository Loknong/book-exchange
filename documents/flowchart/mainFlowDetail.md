# Main Flow In detail list

TransactionsStatus :
| PENDING, COMFIRMED, PAYMENY_PENDING, PAYMENT_IN_PROGRESS, PAYMENT_COMPLETED, PAYMENY_FAILED, ADDRESS_SENT,
| BOOK_RECEIVED, BOOK_PROCESSING, COMPLETED, CANCELED

UserTransactionStatus :
|

AdminManagemnt:
| PENDING, SENT_TO_USER, RECEIVED, COMPLETED

Payments
| PENDING, COMPLETED, FAILED

Offers
| PENDING, ACCEPTED, REJECTED

### We focus on status for offers, transactions, userTransactionStatus, payments and adminManagements

1. User on main pages searching for a book, now his/her interest in the books. be click offer button
2. That button will make offers to book's owner. UPDATE table offers with status: PENDING
3. Then our notification system stamp it and noti to book's owner "Someone interest in his book"
4. Owner book have option ACCEPTED, REJECTED
   4.1 His Rejected -> We end flow at this, not craete transaciotn -> Update offers STATUS: REJECTED
   4.2 His ACCEPTED -> We INSERT INTO Transactions STATUS : PENDING -> STAMP, Loggin and Notif tables -> also make NOTI to both ours transaction is created
5. After noti will let both know a trasaction, offers summary detail. so need both CONFIRMED / CANCEL before sending we will INSERT INTO UserTransacitonStatus 2 rows (1 user 1 row) with STATUS : PENDING for both // At this table we will do paralel two row
    5.1 If anyone CANCEL -> UPDATE UserTransactionStatus , Status : CANCELD -> Update Transactions table status : CANCELED -> Ending Transactions process here.
    5.2 If both CONFIRMED (this will update for each about STATUS at UserTransactionTable let's say UTT.) -> UPDATE Transaction STATUS : CONFIRMED.
6. For CONFIRM, CANCELED also noti to let everyone know actually after action we will + noti system and + loggin system into it as default.
7. On this seq. mean trnascation is confirm status,we create payment detail by INSERT INTO payment with status : PENDING., also update our transaction status into PAYMENT_PENDING.
8. Send noti to both users know payment was create with payment detail and payment form.
9. Update status to UTT. for each user from  Confirm to USER_PAYMENT_PENDING
10. User Need to pay to payment detail that received then upload evidence. then press submit.
11. When User send it will INSERT INTO adminManagement. STATUS : CHECKING_PAYMENT_EVIDENCE.
11. This will update payment detail to admin section, for user UPDATE UTT. to WAITING_CHECK_EVIDENCE.
12. Before someone user send payment evidence our Transactions status update to PAYMENT_IN_PROGRESS.
13. Admin will check user payment evidence and will update to UTT COMPLETED_PAYMENT or FAILED_PAYMENT, ALSO UPDATE TO AdminMangement too. even success or failed admin will check to CHECKED_PAYMENT_COMPLETED
    13.1 IF SOMEONE FAILED_PAYMENT -> trasaction update status : PAYMENT_FAILED, UTT also PAYMENT_FAILED.
    13.2 IF Success will update UTT PAYMENT_SUCCESS, if but success then UPDATE TRANSCATION INTO PAYMENT_COMPLETED
14. NOTI also let everyone know
15. AFTER THAT 5 aroudn 5 minutes admin will send addres of admin to both user, tranasction UPDATE status : SEND_BOOK_TOADMIN
16. AdminManagemnet status update status : SENDING_ADDRESS, UTT that receive address update to RECEIVED_ADDRESS.
17. User need to send book to admin with that address, after send press sending it will update UTT TO SENDING_BOOK , Also update ADMIN into WAITING_BOOK.
18. After Admin RECEIVED book admin will update to RECEIVED_BOOK, UTT for that user will udpate to SEND_BOOK_COMPLETED.
19. After admin received both book. system will genereate some code that can print I will place it to book via paper. this code can input or scan in user profile form will active accept book. and check with backend to let me know he received book. then update credit score to user. So afeter received both book. UPDATE transasction to SEND_BOOK_COMPLETED.
20. After gen code and put it on book. Admin will send book to user address. AdminMangemnte update status : SENDING_BOOK_ENDUSER , UTT status : WATING_RECEIVED_BOOK, transcation SEND_BOOK_TOUSER
21. AFTER RECEIVED user need to scan when scan, or input code to system . Update UTT status : RECEIVED BOOK, ADMIN : COMPLETED.
22. IF both RECEIVED, TRANSCATION WILL STATUS TO COMPLETED

NOTED: I think I miss some noti and logging feature need you complete, but let you know every action it need noti and logging after that 




Ask 1. I need you review my plan again. Check what point we can improve. Then after it ok summary state of each table for me.
(status of each table) waiting stat for USER ,SYSTEM , ADMIN action that they do in this system. also need you improve wording for each status too.
Ask 2 , Is we really need to seperate adminMangement Table or not I think it can use only UTT. give me reason, pro cons from have , havnet.
Ask 3 . I will use that state to create flowchart fomr status so I can tracking it I will use that flowchart in frontned and blinking at state that currently on. (No need code I can do myself but need list of whole state)
Ask 4. I need state for , User, Admin, our transaction and big state that combine whole state together 
ask 5 if possion create flow chart for me only status changign and reason of changeing to me for user, transaction ,admin and whohle

NOTED: Im really need your improve my flow, process. no need to follow my flow you can improve it better better.