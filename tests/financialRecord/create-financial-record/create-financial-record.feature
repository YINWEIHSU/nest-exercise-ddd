# This is a Gherkin feature file https://cucumber.io/docs/gherkin/reference/

Feature: Create a financial record

    Scenario: I can create a financial record
        Given financial record profile data
            | subsidiaryId | counterpartyId | subAccountId | date | currencyCode | exchangeRate | amount | twdAmount| accrualVoucherNumber | actualVoucherNumber | invoiceNumber | uniformInvoiceNumber | invoiceDate | note |
            | 4 | 10 | 7 | 2025-02-25 | USD | 28.12 | 1000 | 2811 | 20250225001 | 20250225002 | 202512341234 | NV12341234 | 2025-02-25 | 此為測試資料 |
        When I send a request to create a financial record
        Then I receive my financial record ID
