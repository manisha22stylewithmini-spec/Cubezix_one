/* Inner service pages (ONE ERP modules). Same structure for every module; add an entry per module.
   Rendered by assets/js/sv.js. Content comes from the ERP copy and the current cubezixone.com module tabs. */
window.SV = {
  finance: {
    name: "Finance", parent: ["ONE ERP", "erp.html"],
    eyebrow: "ONE ERP · Finance",
    title: 'Clarity and control for <span class="grad">every transaction.</span>',
    lead: "Every dirham in and out, matched to your books as it goes. Real-time clarity across your whole financial picture, with the one line it can't place waiting for you.",
    note: "[Finance module details to be confirmed by CubeZix.]",
    stats: { foot: "Figures from cubezix.com. [Confirm for CubeZixONE.]", items: [["50", "%", "faster financial closing", 50, "0", "100%"], ["80", "%", "fewer manual entry errors", 80, "0", "100%"], ["100", "%", "visibility of cash flow and budgets", 100, "0", "100%"]] },
    hero: { title: "Bank lines", sub: "Today · Current account", rows: [["Harbour Line Freight", "AED 8,640.00", "INV-2026-0544"], ["Gulf Pack Supplies", "AED 4,120.00", "BILL-2026-0231"], ["Marina Dental Group", "AED 12,500.00", "INV-2026-0551"], ["Al Noor Trading", "AED 3,980.00", "INV-2026-0547"], ["Unknown sender", "AED 1,260.00", ""]] },
    features: {
      eyebrow: "What Finance covers", title: 'Six jobs, done from <span class="t-acc">one set of books.</span>', sub: "Everything an accounts team does each day, kept on the same records as sales, purchasing and payroll.",
      list: [
        ["General ledger", "Manage your general ledger from one screen.", ["Every posting from every module lands here", "Accounts, journals and a trial balance in one view", "Drill from a total down to the line behind it"]],
        ["Bank matching", "Bank lines matched to invoices and bills as they arrive.", ["Rules match the routine lines automatically", "The one line it can't place comes to you", "Matched lines post to the ledger on their own"]],
        ["Payables and receivables", "Track what you owe and what you're owed.", ["Ageing by customer and by supplier", "Reminders for overdue invoices", "Each payment matched against its invoice"]],
        ["Tax and currencies", "Automate tax, with multi-currency support.", ["VAT on every invoice, your TRN on every document", "Invoices and payments in AED, SAR and USD [and other currencies]", "The VAT return prepared for review"]],
        ["Fixed assets", "Control your complete asset portfolio with ease.", ["Every asset registered with its cost and date", "[Depreciation calculated and posted for you]", "Disposals and transfers kept on the record"]],
        ["Live reports", "Live financial reports and analytics.", ["Profit and loss, balance sheet and cash flow, always current", "Budgets against actuals", "Export for your accountant or an audit"]],
      ],
    },
    travel: { eyebrow: "How money travels", title: 'One entry, and every book that needs it <span class="t-acc">already knows.</span>', sub: "Pick something that happens in your finance day and watch where it goes." },
    events: [
      ["A bank line arrives", ["Finance", "Bank"], ["Bank line received", "Matched to invoice", "Posted to ledger"]],
      ["A customer pays an invoice", ["Sales", "Finance"], ["Payment received", "Invoice marked paid", "Receivable cleared", "Ledger updated"]],
      ["A supplier invoice arrives", ["Procurement", "Finance"], ["Invoice received", "Checked against the PO", "Budget owner approves", "Scheduled for payment"]],
      ["Payroll is run", ["Payroll", "Finance"], ["Run checked", "Journal posted", "WPS file prepared"]],
      ["A VAT return is due", ["Finance", "Tax"], ["Period closes", "VAT totals prepared", "Return ready for review"]],
      ["Month-end close", ["Finance"], ["Bank lines matched", "Accruals posted", "Reports locked"]],
    ],
    night: { eyebrow: "The night shift", title: 'While you sleep, the books <span class="t-acc">keep balancing.</span>', sub: "Matching, reminders and checks run on their own. In the morning there is a short list of what needs you.", items: [["18:20", "Bank", "31 bank lines matched to their invoices by your rules"], ["19:05", "Receivables", "Reminders sent for 4 overdue invoices"], ["21:00", "Ledger", "Nightly postings checked and balanced"], ["23:40", "VAT", "VAT checked on 212 invoices"], ["02:15", "Assets", "Monthly depreciation posted"], ["05:30", "Payables", "2 supplier statements reconciled"]] },
    uae: {
      eyebrow: "The UAE, built in", title: 'VAT, e-invoicing and currencies are <span class="t-acc">not add-ons.</span>', sub: "The rules your accountant already watches, kept on every invoice and every report.",
      list: [
        ["VAT", "The 5% standard rate on every invoice, your TRN on every document, and the quarterly return prepared for review.", ["Standard rate 5% since 1 January 2018", "Registration required above AED 375,000 of taxable supplies and imports in 12 months", "Return and payment due 28 days after each tax period, usually quarterly", "The VAT shown in AED on every tax invoice"]],
        ["Corporate tax", "[Corporate-tax reporting.]", ["0% up to AED 375,000 of taxable income, 9% above it, for financial years from 1 June 2023", "Return and payment due nine months after the year end", "Small Business Relief for revenue of AED 3m or less, now for tax periods ending on or before 31 December 2029"]],
        ["E-invoicing", "[ONE ERP's readiness for the UAE e-invoicing system, and its accredited service provider.]", ["Structured XML invoices (Peppol, PINT-AE) exchanged through accredited service providers; a PDF no longer counts", "Revenue of AED 50m or more: provider appointed by 30 October 2026, live from 1 January 2027", "Everyone else: by 31 March 2027, live from 1 July 2027", "Business and government sales; sales to consumers excluded for now"]],
        ["Currencies", "AED as the base; invoices, payments and reports in AED, SAR and USD [and other currencies].", ["Demo rates: USD 1 = AED 3.6725 = SAR 3.75"]],
      ],
    },
    related: { eyebrow: "Works with the rest", title: 'Finance is where every module <span class="t-acc">comes to rest.</span>', sub: "Each of these posts to the ledger by itself, so nothing is typed twice.", items: [
      ["doc", "Sales", "Quotes become invoices. The price agreed is the price invoiced, and nothing delivered goes unbilled.", "erp-sales.html"],
      ["cart", "Procurement", "Supplier invoices are checked against budget before they reach the ledger.", "erp-procurement.html"],
      ["wallet", "Payroll", "Pay runs post their journal here, with the WPS file prepared.", "erp-payroll.html"],
      ["box", "Inventory", "Stock moves update its value in the books as they happen.", "erp-inventory.html"],
    ] },
    steps: [["Walk through it", "A demo using your own chart of accounts and a real bank statement, not a generic tour.", "Day 1"], ["We move you in", "We bring across opening balances, customers and suppliers, set up VAT, roles and approvals, and check the balances with you.", "Week 1 to [x]"], ["Go live, and after", "Your dedicated contact stays on after launch, so every question goes to one person who knows your setup.", "Then, every day"]],
    faq: [["Does it handle UAE VAT?", "Yes. 5% VAT on every invoice with your TRN on every document, and the return prepared for review."], ["Can we invoice in other currencies?", "Yes. AED is the base, with invoices, payments and reports in AED, SAR and USD [and other currencies]."], ["Does it connect to our bank?", "Bank lines come in and are matched to your invoices by rules. The one it can't place comes to you. [Confirm which bank connections are supported.]"], ["Can our accountant get what they need?", "Yes. Reports can be exported for your accountant or a tax audit. [Confirm export formats.]"], ["Can we bring in our opening balances?", "Yes. We bring across balances, customers and suppliers and check them with you before you go live."], ["Can we use Finance on its own?", "Finance can run with the rest of ONE ERP, so everything posts by itself. [Confirm whether it can run on its own.]"]],
    prev: ["Procurement", "erp-procurement.html"], next: ["Payroll", "erp-payroll.html"],
  },
};
