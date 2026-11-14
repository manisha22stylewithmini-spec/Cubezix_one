/* ONE Sign inner pages: one short page per feature. Rendered by assets/js/fp.js */
(function () {
  const note = "[ONE Sign details to be confirmed by CubeZix.]";
  const ORDER = [["anywhere", "Sign anywhere", "sign-anywhere.html"], ["order", "Signing order", "sign-order.html"], ["reminders", "Reminders", "sign-reminders.html"], ["templates", "Templates", "sign-templates.html"], ["audit", "Audit trail", "sign-audit.html"], ["stamp", "Company stamp", "sign-stamp.html"]];
  const R = (a, b, c) => [a, b, c];
  const P = {
    anywhere: {
      eyebrow: "ONE Sign · Sign anywhere", title: 'Sign on any device, <span class="grad">in the browser or the app.</span>',
      lead: "The signer opens a link, reads the document and signs on a phone, tablet or laptop.",
      hero: { title: "Documents sent today", sub: "Today · Waiting for signatures", to: "Sent", verb: "signed", rows: [R("Harbour Line Freight", "Supplier agreement", "Signed 09:44"), R("Marina Dental Group", "Service contract", "Signed 10:12"), R("Al Noor Trading", "NDA", "Signed 10:31"), R("Omar Khan", "Offer letter", "Signed 11:05"), R("Gulf Pack Supplies", "Price agreement", "")] },
      what: { eyebrow: "What it does", title: 'No printer, no scanner, <span class="t-acc">no waiting.</span>', sub: "The signer needs only the link.", list: [
        ["Browser or app", "Open, read, sign.", ["A link opens in any browser", "Or sign in the app", "No account needed to sign [confirm]"]],
        ["Drawn or typed", "A signature in the style they choose.", ["Draw with a finger or a mouse", "Or type their name", "Initials where you need them"]],
        ["Any device", "Phone, tablet or laptop.", ["The page fits the screen", "The same document everywhere", "Signed copy sent to everyone"]],
      ] },
      steps: [["Send the link", "The signer gets an email or a message with a link.", "A click"], ["They sign", "On any device, in the browser or the app.", "Seconds"], ["Everyone gets a copy", "The signed document goes to all, and is filed.", "Instant"]],
      faq: [["Does the signer need an account?", "[Confirm whether an account is needed to sign.]"], ["Can they sign on a phone?", "Yes. Any device works."], ["Can they type instead of drawing?", "Yes. Drawn or typed."], ["Can we add initials?", "Yes, where you place them."]],
    },
    order: {
      eyebrow: "ONE Sign · Signing order", title: 'Each person signs in turn, <span class="grad">nobody is skipped.</span>',
      lead: "A document goes to the first signer, then the next, so approvals happen in the order you set.",
      hero: { title: "Supplier agreement", sub: "DOC-2026-0214 · 3 signers", to: "Waiting", verb: "signed", rows: [R("Omar, Owner", "Signer 1", "Signed 09:41"), R("Aisha, Finance", "Signer 2", "Signed 09:44"), R("Hana, Legal", "Signer 3", "Signed 10:02"), R("Gulf Pack Supplies", "Signer 4", "Signed 11:20"), R("Harbour Line Freight", "Signer 5 · not yet sent", "")] },
      what: { eyebrow: "What it does", title: 'The right order, <span class="t-acc">every time.</span>', sub: "Set who signs when, and ONE Sign makes it happen.", list: [
        ["Who signs first", "One after another.", ["Order set when you send", "The next signer is told at once", "Nobody signs out of turn"]],
        ["Roles and deadlines", "Each step has an owner and a date.", ["Signer, approver or viewer", "A deadline per step", "Visible to the sender"]],
        ["Decline with a reason", "A no is a clear no.", ["Declined with a reason", "The sender is told", "The document can be reopened"]],
      ] },
      steps: [["Set the order", "Add the signers in the order they should sign.", "Once"], ["It moves on its own", "Each signer is told when it is their turn.", "Automatic"], ["It finishes", "The last signature closes the document.", "Filed"]],
      faq: [["Can we change the order after sending?", "[Confirm editing after sending.]"], ["What if someone declines?", "They give a reason, the sender is told and the document can be reopened."], ["Can some people only view?", "Yes. Roles include signer, approver and viewer. [Confirm roles.]"], ["Can signers be in different companies?", "Yes."]],
    },
    reminders: {
      eyebrow: "ONE Sign · Reminders", title: 'A nudge before a document <span class="grad">goes stale.</span>',
      lead: "A document waiting too long sends a reminder to the signer and tells you, before the deal cools.",
      hero: { title: "Documents waiting", sub: "Today · Reminders", to: "Waiting", verb: "nudged", rows: [R("Al Noor Trading", "NDA · waiting 3 days", "Reminded · 10:00"), R("Gulf Pack Supplies", "Price agreement · 2 days", "Reminded · 10:00"), R("Harbour Line Freight", "Service contract · 4 days", "Reminded · 10:00"), R("Marina Dental Group", "Renewal · 3 days", "Reminded · 10:00"), R("Sara's Bakery", "Order form · 6 days", "")] },
      what: { eyebrow: "What it does", title: 'Follow-ups that <span class="t-acc">send themselves.</span>', sub: "Nobody has to remember to chase.", list: [
        ["A nudge before it goes stale", "The signer is reminded politely.", ["A message to the signer", "Their link included", "Stops when they sign"]],
        ["The schedule", "When and how often.", ["After 3 days, then every 2", "Quiet outside working hours", "Set per document or per template"]],
        ["Tell the sender", "You hear before the deal cools.", ["A note when a reminder goes", "A flag on documents waiting too long", "A list each morning"]],
      ] },
      steps: [["A document waits", "ONE Sign watches how long it has been.", "Always"], ["A reminder goes", "The signer is nudged on your schedule.", "Automatic"], ["You are told", "The sender sees which documents are still waiting.", "Daily"]],
      faq: [["How often are reminders sent?", "On a schedule you set. [Confirm defaults.]"], ["Do reminders stop once signed?", "Yes."], ["Can we send one now?", "Yes. You can resend at any time."], ["Do documents expire?", "[Confirm expiry options.]"]],
    },
    templates: {
      eyebrow: "ONE Sign · Templates", title: 'Contracts and letters, <span class="grad">ready to send.</span>',
      lead: "Offer letters, NDAs and supplier agreements are set up once, with their fields, roles and order, ready to send in a click.",
      hero: { title: "Templates", sub: "Your library · 6 templates", to: "Draft", verb: "ready", rows: [R("Offer letter", "6 fields · used 12 times", "Ready"), R("NDA", "4 fields · used 31 times", "Ready"), R("Supplier agreement", "9 fields · used 8 times", "Ready"), R("Service contract", "7 fields · used 5 times", "Ready"), R("Lease renewal", "Fields not set yet", "")] },
      what: { eyebrow: "What it does", title: 'Set it up once, <span class="t-acc">send it for ever.</span>', sub: "The boring parts are done before you start.", list: [
        ["Ready to send", "Pick a template, add the names.", ["Your own library", "Used in one click", "Updated in one place"]],
        ["Fields and roles", "Who fills what, who signs where.", ["Text, date and signature fields", "Roles pre-set", "Signing order built in"]],
        ["Folders", "Everything kept tidy.", ["Templates by team or type", "Signed copies filed by customer", "Easy to find later"]],
      ] },
      steps: [["Build it once", "Add the text, the fields and the roles.", "Minutes"], ["Send in a click", "Pick it, add the signers, send.", "Seconds"], ["Improve it", "Change the template and every new send uses it.", "One place"]],
      faq: [["Can we upload our own documents?", "Yes. [Confirm file types.]"], ["Can fields be filled from our records?", "[Confirm with ONE ERP or ONE People.]"], ["Can templates have a signing order?", "Yes."], ["Who can edit templates?", "Anyone you allow. [Confirm roles.]"]],
    },
    audit: {
      eyebrow: "ONE Sign · Audit trail", title: 'Who signed what, <span class="grad">when and from where.</span>',
      lead: "Every open, signature and stamp is recorded with the time and place, and kept with the signed document.",
      hero: { title: "Audit trail", sub: "DOC-2026-0201 · Supplier agreement", to: "Recording", verb: "recorded", rows: [R("Document sent", "Omar, Owner · 09:10", "Recorded"), R("Opened", "Dubai, UAE · 09:41", "Recorded"), R("Signed", "Dubai, UAE · 09:44", "Recorded"), R("Stamp applied", "Aisha, Finance · 09:45", "Recorded"), R("Certificate", "Sealing", "")] },
      what: { eyebrow: "What it does", title: 'Proof you can <span class="t-acc">show anyone.</span>', sub: "A full record, kept with the document, for an audit or a dispute.", list: [
        ["Who, when and where", "Every step, time-stamped.", ["Opened, signed and stamped", "Time and place of each", "Who did it"]],
        ["Versions kept", "What was signed, exactly.", ["Every version stored", "Changes shown", "The signed one is locked"]],
        ["A sealed certificate", "The trail, sealed at the end.", ["Issued when the last person signs", "Kept with the document", "Easy to share"]],
      ] },
      steps: [["Every step is logged", "Open, sign, stamp: each with a time and a place.", "Automatic"], ["The document is sealed", "The last signature locks the file.", "Final"], ["The trail stays", "A certificate is kept with the signed copy.", "For good"]],
      faq: [["What does the audit trail record?", "Opens, signatures and stamps, with the time and place. [Confirm exactly what is logged.]"], ["Can we share the trail?", "Yes, with the signed document."], ["Are signatures legally valid in the UAE?", "[Legal validity of e-signatures under UAE law to be confirmed.]"], ["Can the trail be changed?", "No. It is sealed with the document."]],
    },
    stamp: {
      eyebrow: "ONE Sign · Company stamp", title: 'Your stamp, <span class="grad">applied once and kept safe.</span>',
      lead: "The stamp is uploaded once, kept safe and applied by the people you allow, and every use is logged.",
      hero: { title: "Stamp requests", sub: "Today · Company stamp", to: "Requested", verb: "stamped", rows: [R("Supplier agreement", "Asked by Hana, Finance", "Applied 11:21"), R("Offer letter", "Asked by Omar, HR", "Applied 11:34"), R("Service contract", "Asked by Aisha, Sales", "Applied 12:02"), R("NDA", "Asked by Hana, Legal", "Applied 12:15"), R("Lease renewal", "Asked by Youssef, Admin", "")] },
      what: { eyebrow: "What it does", title: 'The stamp stays <span class="t-acc">in the right hands.</span>', sub: "It looks the same every time, and you know who used it.", list: [
        ["Your stamp", "Uploaded once, applied everywhere.", ["Your company's own stamp", "Placed on the document", "Same quality every time"]],
        ["Who may apply it", "Only the people you allow.", ["Permissions by person", "Optional approval first", "Never on a shared file"]],
        ["Every use logged", "A record of each stamp.", ["Who, which document, when", "Visible to the owner", "Kept with the audit trail"]],
      ] },
      steps: [["Upload the stamp", "Once, by the owner.", "Once"], ["Allow the people", "Choose who may apply it, and whether to ask first.", "Your rules"], ["Apply and log", "Each use is placed on the document and recorded.", "Every time"]],
      faq: [["Where is the stamp kept?", "Safely, and only applied by people you allow. [Confirm storage.]"], ["Can we ask for approval before stamping?", "Yes. [Confirm approval option.]"], ["Can we see who used it?", "Yes. Every use is logged."], ["Can we have more than one stamp?", "[Confirm multiple stamps.]"]],
    },
  };
  Object.keys(P).forEach((k) => { const o = ORDER.findIndex((x) => x[0] === k); P[k].key = "sg-" + k; P[k].file = ORDER[o][2]; P[k].name = ORDER[o][1]; P[k].note = note; P[k].parent = ["ONE Sign", "sign.html"]; P[k].prev = ORDER[(o + ORDER.length - 1) % ORDER.length].slice(1); P[k].next = ORDER[(o + 1) % ORDER.length].slice(1); P[k].more = ORDER.filter((x) => x[0] !== k).map((x) => [x[1], x[2]]); });
  window.SG = P;
})();
