# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

## [2024-06-14]
### Notes:
- Need to change checking condition for services, userTransactionStatus from id to transactionId AND userId

## [2024-06-13]

- REVIEW and revise API table for relate thing to transaction again.
- PLAN and CREATE Debug page (Show transaction's sequence for user)
- Add table UserTransactionStatus For tracking, Updating user status
- Add Logging Status to handle when status is appear, change and dissappear for table
  - Offers, Transaction, Payments, AdminManagement and UserTransactionStatus.
- Complete Plan, Clear concept, Re schema of some table again to handle more data value (most from ENUM to VARCHAR(255))
- implement src/processes process manager to controll flow of transactions.

## [2024-06-12]

- Add table statusHistory: to track our trasaction, offers, payment, and adminMagement book process
- Do store procedure think then review our main flow again. To made it seamless and no need to adjust lated.
- modify status column for transaction, offers, payment, adminManagement for handle more status for sub process
- Add address user. To store destincation for users table.

## [2024-06-11]

### Knowledge

- Express file upload lib.
- POSTMAN can loop POST API or ASK CHAT -> for images we fix images name with fix path

### Added

- Complete Offer Management API
- Plan to validate value by use `express-validator`

### Changed

- File naming convention from xxCccBbb to xxCcc.bbb.ts for readability

### Fixed

- Got Problem when wrong ordering routes at book management routes.
- All req.params, req.body that use wrong.
- Merge LogSettings into Log // Interfaces

## [2024-06-10]

### Added

- Complete Book management API
- Update POSTMAN

## [2024-06-09]

### Added

- Complete User Auth API Features
- Create Postman to test user auth API
- Complete User Management API Features
- Create Postman to test user management API
- Refactor code
- Seperate table images with users, books
- Add POSTMAN.json
- Add Transition to services that write to DB for ensure all operations success before write DB.
- Add Book Management Services

### Noted

- Get All book with params (Filter, Search) not implement yet need advice

## [2024-06-08]

### Added

- Add Main Flow API
- Add Interface
- Add Example Data look like
- Prepared to prepare API
- Plan Validate Middleware
- Add Address table FK (usersuserId)
- Adjust Column, and type of Table
- Plan to build Logging system (LogTable, LogSettings)

## [2024-06-05]

### Added

- Add User Activities List
- Add User API List
- Mapping User Activities List to API
