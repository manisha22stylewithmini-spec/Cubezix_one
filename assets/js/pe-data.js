/* ONE People inner pages: one short page per feature. Rendered by assets/js/fp.js */
(function () {
  const note = "[ONE People runs on its own, or with ONE ERP.]";
  const ORDER = [["record", "Employee record", "people-record.html"], ["leave", "Leave", "people-leave.html"], ["expenses", "Expense claims", "people-expenses.html"], ["attendance", "Attendance and check-in", "people-attendance.html"], ["payroll", "Payroll", "people-payroll.html"], ["payslip", "Payslips", "people-payslips.html"], ["recruitment", "Recruitment", "people-recruitment.html"], ["requirements", "Requirements", "people-requirements.html"], ["onboarding", "Onboarding", "people-onboarding.html"]];
  const R = (a, b, c) => [a, b, c];
  const P = {
    record: {
      eyebrow: "ONE People · Employee record", title: 'One file for <span class="grad">every employee.</span>',
      lead: "Details, documents and history in one file, so nobody hunts through folders when someone asks.",
      hero: { title: "New employees", sub: "This month · HR", to: "Draft", verb: "created", rows: [R("Fatima Al Ali", "HR officer · starts 3 Feb", "EMP-0044"), R("Omar Khan", "Engineer · starts 3 Feb", "EMP-0045"), R("Aisha Rahman", "Accountant · starts 10 Feb", "EMP-0046"), R("Youssef Nasser", "Driver · starts 10 Feb", "EMP-0047"), R("Hana Nasser", "No documents yet", "")] },
      what: { eyebrow: "What it does", title: 'Everything about a person, <span class="t-acc">in one place.</span>', sub: "Create the record once. Everything that follows is added to it.", list: [
        ["Details", "Who they are and how to reach them.", ["Name, role and manager", "Contact and emergency details", "Bank details for payroll"]],
        ["Documents", "Contracts, IDs and visas, with their dates.", ["Stored with the person", "Expiry dates watched for you", "The date reaches the right person"]],
        ["History", "Every change, kept.", ["Role and pay changes", "Who changed what, and when", "Nothing overwritten"]],
      ] },
      steps: [["Create the record", "Start from a hire, or from a form.", "Minutes"], ["Add the documents", "Upload contracts, IDs and visas, with their dates.", "Once"], ["Keep it current", "Changes are added to the history, never over it.", "Always"]],
      faq: [["What goes in an employee record?", "Details, documents, contracts, bank details and history. [Confirm fields.]"], ["Does it watch expiry dates?", "Yes. The date reaches the person who can act on it before it lapses."], ["Can employees update their own details?", "[Confirm employee self-service.]"], ["Can we import our current staff list?", "Yes. [Confirm formats.]"]],
    },
    leave: {
      eyebrow: "ONE People · Leave", title: 'Asked for in the app, <span class="grad">approved by the manager.</span>',
      lead: "A request carries the balance and the team calendar, so the manager decides with the facts.",
      hero: { title: "Leave requests", sub: "This week · Your team", to: "Pending", verb: "decided", rows: [R("Omar Khan", "2 to 6 Nov · 4 days", "Approved"), R("Fatima Al Ali", "10 Nov · 1 day", "Approved"), R("Aisha Rahman", "17 to 21 Nov · 5 days", "Approved"), R("Youssef Nasser", "24 Nov · 1 day", "Approved"), R("Hana Nasser", "1 to 12 Dec · 10 days", "")] },
      what: { eyebrow: "What it does", title: 'A request, a balance, <span class="t-acc">a decision.</span>', sub: "No emails, no spreadsheets, no guessing who is away.", list: [
        ["Request in the app", "Two taps from the employee.", ["Pick the dates and the type", "The balance shown before sending", "Sent to the right manager"]],
        ["Balance and calendar", "The facts beside the request.", ["Days left, always current", "Who else is away that week", "Public holidays included"]],
        ["Approval", "Decided in one place.", ["Approve or decline with a reason", "Balances updated at once", "Passed to payroll if unpaid"]],
      ] },
      steps: [["They ask", "The employee picks dates in the app.", "Two taps"], ["The manager decides", "The balance and the team calendar are beside the request.", "One place"], ["Everything updates", "Balance, calendar and payroll follow the decision.", "Automatic"]],
      faq: [["Can employees ask from their phone?", "Yes. Requests are made in the app."], ["Does the manager see who else is away?", "Yes. The team calendar sits beside the request."], ["Does unpaid leave reach payroll?", "Yes. It is passed to the pay run. [Confirm.]"], ["Can we set our own leave types?", "[Confirm leave types.]"]],
    },
    expenses: {
      eyebrow: "ONE People · Expense claims", title: 'A photo of the receipt, <span class="grad">and the claim is made.</span>',
      lead: "People photograph the receipt and submit it. The manager sees the amount and the receipt together.",
      hero: { title: "Expense claims", sub: "This month · To approve", to: "To approve", verb: "approved", rows: [R("Maria Santos", "Lunch · AED 240.00", "Approved"), R("Omar Khan", "Taxi · AED 86.00", "Approved"), R("Aisha Rahman", "Parking · AED 40.00", "Approved"), R("Youssef Nasser", "Fuel · AED 180.00", "Approved"), R("Hana Nasser", "Hotel · AED 1,450.00", "")] },
      what: { eyebrow: "What it does", title: 'From receipt to reimbursed, <span class="t-acc">without paperwork.</span>', sub: "The claim is made where the expense happened.", list: [
        ["Photo of the receipt", "Snap it, submit it.", ["Photo attached to the claim", "Amount and category added", "VAT shown separately"]],
        ["Approval", "The manager sees the receipt and the amount together.", ["Approve or return with a note", "Limits by role", "Nothing waits unseen"]],
        ["Reimbursement", "Paid with the next pay run.", ["Approved claims collected", "Added to payroll", "A record for your accountant"]],
      ] },
      steps: [["Snap the receipt", "The photo and the amount go on the claim.", "In the app"], ["The manager approves", "They see the amount and the receipt together.", "One tap"], ["It is paid", "Approved claims go out with the next pay run.", "Monthly"]],
      faq: [["Can people claim from their phone?", "Yes. A photo of the receipt is enough."], ["Can we set spending limits?", "[Confirm limits by role.]"], ["How are claims paid?", "With the next pay run. [Confirm.]"], ["Is VAT recorded?", "[Confirm VAT handling on claims.]"]],
    },
    attendance: {
      eyebrow: "ONE People · Attendance and check-in", title: 'The app checks people in <span class="grad">when they arrive.</span>',
      lead: "People are checked in as they arrive, and the late or missing ones are listed for the manager.",
      hero: { title: "Today's check-ins", sub: "Today · Main office", to: "Not in", verb: "checked in", rows: [R("Aisha Rahman", "Shift 08:30", "In · 08:24"), R("Omar Khan", "Shift 08:30", "In · 08:29"), R("Fatima Al Ali", "Shift 09:00", "In · 08:52"), R("Youssef Nasser", "Shift 09:00", "In · 08:58"), R("Hana Nasser", "Shift 09:00 · not in yet", "")] },
      what: { eyebrow: "What it does", title: 'Attendance that <span class="t-acc">records itself.</span>', sub: "No sign-in sheet, no timesheet to chase.", list: [
        ["Auto check-in", "The app notices when you arrive.", ["Checked in at the workplace", "Late arrivals listed", "Missing check-ins flagged"]],
        ["Shifts", "Each person on their own pattern.", ["Shifts and rosters", "Changes shared at once", "Overtime counted"]],
        ["Timesheets", "Hours collected for payroll.", ["Daily and monthly totals", "Overtime and absences", "Passed to the pay run"]],
      ] },
      steps: [["They arrive", "The app checks them in at the workplace.", "Automatic"], ["The late are listed", "The manager sees who is late or missing.", "Live"], ["Hours go to payroll", "Totals reach the pay run without retyping.", "Monthly"]],
      faq: [["How does auto check-in work?", "The app checks people in when they arrive at the workplace. [Confirm how location is used.]"], ["Can we use shifts?", "Yes. [Confirm rosters.]"], ["Do hours reach payroll?", "Yes. Timesheets feed the pay run."], ["Can people check in manually?", "[Confirm manual check-in.]"]],
    },
    payroll: {
      eyebrow: "ONE People · Payroll", title: 'One run a month, <span class="grad">checked before it goes.</span>',
      lead: "Payroll is prepared from the same file, held until every employee has bank details, with the WPS file ready for your bank.",
      hero: { title: "October payroll", sub: "Pay run · 25 employees", to: "Checking", verb: "ready", rows: [R("Aisha Rahman", "AED 14,200.00", "Bank details ✓"), R("Omar Khan", "AED 9,800.00", "Bank details ✓"), R("Fatima Al Ali", "AED 11,500.00", "Bank details ✓"), R("Youssef Nasser", "AED 8,250.00", "Bank details ✓"), R("Maria Santos", "AED 7,900.00 · bank details missing", "")] },
      what: { eyebrow: "What it does", title: 'From the file to the bank, <span class="t-acc">in one run.</span>', sub: "Salary, leave and attendance all come from the employee record.", list: [
        ["Pay runs", "Prepared, checked, approved, paid.", ["Prepared from the employee file", "Held until bank details are complete", "Approved by the right person"]],
        ["WPS", "Salary files for the Wage Protection System, prepared from the payroll run and held until every employee has bank details.", ["Wages paid through MOHRE-approved banks, exchange houses and financial institutions", "Since 1 June 2020, due on the 1st of each month with no grace period; sanctions start within days"]],
        ["Gratuity", "[End-of-service gratuity accrued for each employee, every month.]", ["After a year's service: 21 days' basic wage for each of the first five years, 30 days for each year after, capped at two years' wage, paid within 14 days of the contract ending (Federal Decree-Law 33 of 2021)"]],
      ] },
      steps: [["Prepare", "Salaries, leave and overtime come from the records.", "Automatic"], ["Check", "The run is held until every employee has bank details.", "Before it goes"], ["Pay", "The WPS file is ready and payslips go out.", "On the 1st"]],
      faq: [["Does it prepare the WPS file?", "Yes. It is prepared from the payroll run and held until every employee has bank details."], ["Does it accrue gratuity?", "Yes, every month. [Confirm calculation rules.]"], ["What if bank details are missing?", "The run is held and the right person is told."], ["Does payroll post to Finance?", "Yes, when used with ONE ERP."]],
    },
    payslip: {
      eyebrow: "ONE People · Payslips", title: 'A payslip for everyone, <span class="grad">every month.</span>',
      lead: "Each payslip comes from the run itself, shows how the figure was reached and is kept on the employee's file.",
      hero: { title: "October payslips", sub: "Pay run · 25 employees", to: "Drafted", verb: "sent", rows: [R("Aisha Rahman", "Net AED 12,400.00", "Sent · 09:00"), R("Omar Khan", "Net AED 8,900.00", "Sent · 09:00"), R("Fatima Al Ali", "Net AED 10,150.00", "Sent · 09:00"), R("Youssef Nasser", "Net AED 7,600.00", "Sent · 09:00"), R("Maria Santos", "Waiting for the run", "")] },
      what: { eyebrow: "What it does", title: 'Clear to read, <span class="t-acc">easy to find.</span>', sub: "Every figure explained, every month kept.", list: [
        ["The payslip", "One page, everything on it.", ["Net pay at the top", "Basic, allowances and deductions", "Month and employee clearly shown"]],
        ["Breakdown", "How the figure was reached.", ["Where each amount comes from", "Leave and advances explained", "Employer cost kept for HR"]],
        ["Sent to everyone", "No one asks for a copy.", ["Sent from the run itself", "Available in the app", "Kept on the file"]],
      ] },
      steps: [["The run is approved", "Figures are final.", "Once"], ["Payslips are made", "One for each employee, from the run itself.", "Automatic"], ["Everyone has theirs", "Sent and kept in the app and on the file.", "Same day"]],
      faq: [["Where do employees find their payslips?", "In the app, and on their file."], ["Can payslips show deductions?", "Yes. Every deduction is explained."], ["Are old payslips kept?", "Yes, on the employee's file."], ["Can payslips be sent by email?", "[Confirm delivery options.]"]],
    },
    recruitment: {
      eyebrow: "ONE People · Recruitment", title: 'From the first applicant <span class="grad">to the first day.</span>',
      lead: "Applicants, interviews and offers sit in one place, and a hire becomes an employee file.",
      hero: { title: "Open vacancies", sub: "This month · Hiring", to: "Open", verb: "progressed", rows: [R("Accountant", "6 applicants", "2 interviews"), R("Sales executive", "9 applicants", "3 interviews"), R("Driver", "4 applicants", "1 interview"), R("HR officer", "5 applicants", "Offer sent"), R("Warehouse supervisor", "No applicants yet", "")] },
      what: { eyebrow: "What it does", title: 'Every candidate, <span class="t-acc">one clear stage.</span>', sub: "See the whole pipeline, and who needs a reply.", list: [
        ["Vacancies and applicants", "A board for every role.", ["Applicants by stage", "CVs kept with the person", "Nobody waits without a reply"]],
        ["Interviews", "Times, people and notes.", ["Slots offered and booked", "Notes kept per interview", "Feedback in one place"]],
        ["Offers", "A yes becomes a file.", ["Offer letters from templates", "Accepted offers create the record", "Ready for onboarding"]],
      ] },
      steps: [["Applicants arrive", "Each one lands on the vacancy's board.", "Any source"], ["They are interviewed", "Slots, panels and notes in one place.", "Tracked"], ["One is hired", "The offer is accepted and the employee file is created.", "Same record"]],
      faq: [["Can we advertise vacancies from here?", "[Confirm job posting options.]"], ["Does a hire become an employee?", "Yes. An accepted offer creates the employee file."], ["Can we keep notes on interviews?", "Yes, per interview."], ["Can offers use templates?", "Yes. [Confirm with ONE Sign.]"]],
    },
    requirements: {
      eyebrow: "ONE People · Requirements", title: 'A hire starts with <span class="grad">a clear requirement.</span>',
      lead: "Managers ask for a hire, finance and HR agree it, and the role is ready to advertise with what it needs written down.",
      hero: { title: "Hiring requests", sub: "This quarter · Managers", to: "Requested", verb: "approved", rows: [R("Accountant", "Finance · 1 role", "Approved"), R("Sales executive", "Sales · 2 roles", "Approved"), R("Driver", "Operations · 1 role", "Approved"), R("Support engineer", "IT · 1 role", "Approved"), R("Marketing lead", "Marketing · 1 role", "")] },
      what: { eyebrow: "What it does", title: 'Agree the role <span class="t-acc">before you hire.</span>', sub: "Headcount, budget and the skills needed, decided once.", list: [
        ["Request a hire", "Any manager can ask.", ["A short form with the reason", "Department and budget shown", "Sent for approval at once"]],
        ["Approve the headcount", "The right people say yes.", ["HR and finance both see it", "Approved against budget", "Kept as a decision on record"]],
        ["Job requirements", "What the person needs to have.", ["Skills and experience", "Language and visa status", "Carried into the vacancy"]],
      ] },
      steps: [["A manager asks", "A short request for a role.", "In the app"], ["It is agreed", "HR and finance approve the headcount and budget.", "On record"], ["It becomes a vacancy", "The requirements carry into the advert.", "No retyping"]],
      faq: [["Who can request a hire?", "Any manager you allow. [Confirm roles.]"], ["Is the budget checked?", "Yes, when used with ONE ERP. [Confirm.]"], ["Do requirements carry into recruitment?", "Yes, into the vacancy."], ["Can requests be declined?", "Yes, with a reason."]],
    },
    onboarding: {
      eyebrow: "ONE People · Onboarding", title: 'A first day that <span class="grad">is ready before they are.</span>',
      lead: "A hire becomes an employee file with a first-day checklist, so accounts, equipment and paperwork are waiting.",
      hero: { title: "Onboarding · Fatima Al Ali", sub: "Starts 3 Feb · HR officer", to: "To do", verb: "done", rows: [R("Contract signed", "HR", "Done"), R("Emirates ID uploaded", "Fatima", "Done"), R("Email account created", "IT", "Done"), R("Laptop assigned", "IT", "Done"), R("Orientation booked", "HR", "")] },
      what: { eyebrow: "What it does", title: 'Nothing forgotten, <span class="t-acc">nobody waiting.</span>', sub: "Every team knows what to do, and when.", list: [
        ["First-day checklist", "One list, shared across teams.", ["Tasks for HR, IT and the manager", "Each with a due date", "Progress visible to all"]],
        ["Accounts and equipment", "Ready on day one.", ["Accounts requested at once", "Devices assigned from stock", "Access set up before arrival"]],
        ["Welcome", "A good first impression.", ["A message from the manager", "Day-one plan in the app", "Questions answered early"]],
      ] },
      steps: [["The offer is accepted", "The employee file and the checklist are created.", "Automatic"], ["Teams prepare", "HR, IT and the manager tick off their tasks.", "In parallel"], ["Day one", "Everything is ready, and the new joiner knows what to expect.", "Smooth"]],
      faq: [["Does onboarding start automatically?", "Yes, from an accepted offer."], ["Can IT assign equipment here?", "Yes. [Confirm link to ONE Assets.]"], ["Can we set our own checklists?", "Yes. [Confirm checklist templates.]"], ["Can the new joiner see their plan?", "Yes, in the app."]],
    },
  };
  Object.keys(P).forEach((k) => { const o = ORDER.findIndex((x) => x[0] === k); P[k].key = "pe-" + k; P[k].file = ORDER[o][2]; P[k].name = ORDER[o][1]; P[k].note = note; P[k].parent = ["ONE People", "people.html"]; P[k].prev = ORDER[(o + ORDER.length - 1) % ORDER.length].slice(1); P[k].next = ORDER[(o + 1) % ORDER.length].slice(1); P[k].more = ORDER.filter((x) => x[0] !== k).map((x) => [x[1], x[2]]); });
  window.PE = P;
})();
