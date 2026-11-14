/* ONE Assets inner pages: one short page per step of the process. Rendered by assets/js/fp.js */
(function () {
  const note = "ONE Assets is coming soon. [Details to be confirmed by CubeZix.]";
  const ORDER = [["record", "Record", "assets-record.html"], ["handover", "Hand over", "assets-handover.html"], ["lookup", "Look up", "assets-lookup.html"], ["care", "Look after", "assets-care.html"], ["return", "Return", "assets-return.html"]];
  const P = {
    record: {
      eyebrow: "ONE Assets · Record", title: 'Every item gets <span class="grad">one record.</span>',
      lead: "Each laptop, phone and screen gets one record with its serial number, price, supplier and warranty end date, from the day it arrives.",
      hero: { title: "Items added today", sub: "Today · Store room", to: "New", verb: "recorded", rows: [["MacBook Pro 14\"", "Serial C02••••9KQ", "AST-0187"], ["iPhone 15", "Serial F17••••3LM", "AST-0192"], ["Dell Latitude", "Serial 7XK••••2PQ", "AST-0204"], ["iPad Air", "Serial DMP••••8RT", "AST-0219"], ["Unlabelled monitor", "No serial yet", ""]] },
      what: { eyebrow: "What it does", title: 'One item, <span class="t-acc">everything about it.</span>', sub: "Start the record when the box arrives. Everything that happens later is added to it.", list: [
        ["Serial and supplier", "Who made it, who sold it, which one it is.", ["Serial number and model", "Supplier and invoice", "Photo and notes"]],
        ["Price and warranty", "What it cost and how long it is covered.", ["Purchase price and date", "Warranty end date", "Linked to the purchase"]],
        ["Labels you can scan", "Find the record from the item itself.", ["Printed barcode labels", "Scan to open the record", "Nothing typed by hand"]],
      ] },
      steps: [["It arrives", "A new device is added by scanning its box or typing its serial.", "Minutes"], ["The record is made", "Price, supplier and warranty are filled from the purchase.", "Automatic"], ["It is labelled", "A label is printed and the item goes to its place.", "Ready"]],
      faq: [["What goes on an item's record?", "Serial number, model, price, supplier, warranty end date, photo and notes. [Confirm fields.]"], ["Can records be filled from a purchase?", "Yes, when purchases are made in ONE ERP. [Confirm.]"], ["Can we print labels?", "Yes. [Confirm label formats and printers.]"], ["Can we import our current list?", "Yes. We bring across the list you keep today. [Confirm formats.]"]],
    },
    handover: {
      eyebrow: "ONE Assets · Hand over", title: 'Signed for by <span class="grad">the person who receives it.</span>',
      lead: "The person receiving a device signs for it, so who holds what is never a guess.",
      hero: { title: "Hand-overs this week", sub: "This week · IT desk", to: "To sign", verb: "signed", rows: [["Omar Khan", "iPhone 15 · AST-0192", "Signed 3 Feb"], ["Aisha Rahman", "MacBook Pro · AST-0187", "Signed 3 Feb"], ["Fatima Al Ali", "iPad Air · AST-0219", "Signed 4 Feb"], ["Youssef Nasser", "Dell Latitude · AST-0204", "Signed 4 Feb"], ["Hana Nasser", "Monitor · AST-0221", ""]] },
      what: { eyebrow: "What it does", title: 'A signature, <span class="t-acc">and a record of it.</span>', sub: "The device changes hands once, with proof on both sides.", list: [
        ["Sign on receipt", "The receiver signs, in the browser or the app.", ["Drawn or typed signature", "Date and time kept", "Copy kept with the record"]],
        ["Condition noted", "What it looked like on the way out.", ["A short checklist for each item", "Scratches and extras noted", "Compared on the way back"]],
        ["Always know who has it", "The holder is on the record.", ["Current holder, always shown", "History of every holder", "Searchable by person"]],
      ] },
      steps: [["Assign it", "Pick the item and the person who will hold it.", "A click"], ["They sign", "The person signs for it on a phone or at the desk.", "Seconds"], ["It is on record", "The holder, the date and the condition are saved.", "Done"]],
      faq: [["How does the receiver sign?", "In the browser or the app. [Confirm signature options.]"], ["Does a hand-over need approval?", "[Confirm approval options.]"], ["Can we see who held an item before?", "Yes. The history of every holder stays on the record."], ["Can it use ONE Sign?", "[Confirm whether hand-overs use ONE Sign.]"]],
    },
    lookup: {
      eyebrow: "ONE Assets · Look up", title: 'Find any item, <span class="grad">and who has it.</span>',
      lead: "Know where everything is, and count it. Each item has a location, and a stock-take compares what the record says with what is on the shelf.",
      hero: { title: "Stock-take", sub: "Store room · 41 items", to: "Counting", verb: "counted", rows: [["Laptops", "12 on the record", "12 counted"], ["Phones", "9 on the record", "9 counted"], ["Screens", "14 on the record", "14 counted"], ["Tablets", "5 on the record", "5 counted"], ["Chargers", "1 fewer than the record", ""]] },
      what: { eyebrow: "What it does", title: 'Where everything is, <span class="t-acc">in seconds.</span>', sub: "Search the record, see the location, and check it against the shelf.", list: [
        ["Search", "Type a name, a serial or a person.", ["Find by serial, model or holder", "Open the record at once", "See the whole history"]],
        ["Locations", "Every item has a place.", ["Offices, stores and desks", "Items by location", "Moves between them tracked"]],
        ["Stock-take", "Count, compare and fix.", ["Counts compared with the record", "Differences listed", "Adjustments approved and logged"]],
      ] },
      steps: [["Search", "Find an item by serial, model, location or holder.", "Seconds"], ["Count", "Walk a location with the app and scan what is there.", "Minutes"], ["Compare", "Differences are listed and approved, never silently fixed.", "On record"]],
      faq: [["Can we search by serial number?", "Yes. You can also search by model, location or holder."], ["Can we count with a phone?", "[Confirm scanning on mobile.]"], ["What happens to differences?", "They are listed and approved, then logged."], ["Can items be in more than one location?", "An item is in one place at a time, with its moves tracked."]],
    },
    care: {
      eyebrow: "ONE Assets · Look after", title: 'Repairs, tickets and warranties, <span class="grad">kept on its record.</span>',
      lead: "Every repair, ticket and part stays on the item's own history, and the warranty date that is about to lapse is raised before it does.",
      hero: { title: "Items needing care", sub: "Next 30 days · All items", to: "Needs care", verb: "handled", rows: [["ThinkPad T14", "In repair · back 22 Nov", "Booked in"], ["Dell Latitude", "Warranty ends 14 Dec", "Renewal task"], ["iPhone 15", "Screen cracked", "Ticket opened"], ["iPad Air", "Battery health 71%", "Check booked"], ["Old monitor", "Out of warranty", ""]] },
      what: { eyebrow: "What it does", title: 'Its whole life, <span class="t-acc">on one page.</span>', sub: "What went wrong, what was done and what it cost, kept with the item.", list: [
        ["Repairs", "From the fault to back in use.", ["Reported, in repair, back in use", "Cost and parts per repair", "A replacement logged on the same record"]],
        ["Tickets and parts", "Support requests linked to the item.", ["Tickets from ONE Desk on the record", "Parts used and cost", "Every fix explained"]],
        ["Warranties", "Dates raised before they lapse.", ["Warranties, licences and contracts", "A reminder to the owner", "A renewal task opened"]],
      ] },
      steps: [["A fault is reported", "A person or a ticket reports it, and the item's record opens.", "Anyone"], ["It is repaired", "The repair, the cost and the parts are added as it happens.", "On record"], ["It goes back", "The item returns to its holder, with the history intact.", "Back in use"]],
      faq: [["Are repairs kept on the item?", "Yes. Every repair, ticket and part stays on the item's own history."], ["Does it warn us before a warranty ends?", "Yes. The date is raised to the owner before it lapses. [Confirm reminder timing.]"], ["Does it link to support tickets?", "[Confirm the link to ONE Desk.]"], ["Can we see repair costs?", "Yes. Cost is kept per repair and per item."]],
    },
    return: {
      eyebrow: "ONE Assets · Return", title: 'Handed back when <span class="grad">someone leaves.</span>',
      lead: "When someone leaves, a checklist lists what they hold, and each item is handed back and checked.",
      hero: { title: "Return checklist · Sara Reyes", sub: "Last day · 30 Nov", to: "To return", verb: "returned", rows: [["Sara Reyes", "Laptop · AST-0211", "Returned"], ["Sara Reyes", "Phone · AST-0188", "Returned"], ["Sara Reyes", "Access badge", "Returned"], ["Sara Reyes", "Charger and case", "Returned"], ["Sara Reyes", "Monitor · AST-0221", ""]] },
      what: { eyebrow: "What it does", title: 'Nothing leaves <span class="t-acc">with them.</span>', sub: "The checklist is made from the record, so nothing is forgotten.", list: [
        ["Checklist", "Everything they hold, in one list.", ["Made from the records", "Each item ticked off", "Anything missing stays flagged"]],
        ["Condition check", "Compared with the day it went out.", ["Screen, battery and accessories", "Differences noted", "Cost of damage recorded"]],
        ["Ready for the next person", "Back in stock, ready to go.", ["Wiped and reset", "Returned to the store room", "Handed to the next holder"]],
      ] },
      steps: [["The last day is set", "A checklist appears with everything the person holds.", "Automatic"], ["Items come back", "Each one is handed in, checked and ticked off.", "One by one"], ["Records are cleared", "The items return to stock and the holder is cleared.", "Done"]],
      faq: [["How does the checklist know what someone holds?", "It is made from the item records and who each item is assigned to."], ["What if an item isn't returned?", "It stays flagged on the checklist and on the person's record."], ["Can it link to HR?", "[Confirm the link to ONE People or HR.]"], ["Can returned items be reassigned?", "Yes. They go back to stock and can be handed to the next person."]],
    },
  };
  Object.keys(P).forEach((k) => { const o = ORDER.findIndex((x) => x[0] === k); P[k].key = k; P[k].file = ORDER[o][2]; P[k].name = ORDER[o][1]; P[k].note = note; P[k].parent = ["ONE Assets", "assets.html"]; P[k].prev = ORDER[(o + ORDER.length - 1) % ORDER.length].slice(1); P[k].next = ORDER[(o + 1) % ORDER.length].slice(1); P[k].more = ORDER.filter((x) => x[0] !== k).map((x) => [x[1], x[2]]); });
  window.AS = P;
})();
