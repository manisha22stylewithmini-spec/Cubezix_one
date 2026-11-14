/* ONE Desk inner pages: one short page per feature. Rendered by assets/js/dk.js */
(function () {
  const note = "[ONE Desk details to be confirmed by CubeZix.]";
  const ORDER = [["requests", "Four ways to ask", "desk-requests.html"], ["routing", "The right team and person", "desk-routing.html"], ["sla", "A time to reply and fix", "desk-sla.html"], ["chat", "Chat in the ticket", "desk-chat.html"], ["kb", "Knowledge base", "desk-knowledge-base.html"], ["portal", "Customer portal", "desk-portal.html"]];
  const P = {
    requests: {
      eyebrow: "ONE Desk · Four ways to ask", title: 'Four ways to ask. <span class="grad">One queue to answer.</span>',
      lead: "Email, the customer portal, chat or the device agent: however someone asks, the request lands in one queue, so nothing lives in a personal inbox.",
      hero: { title: "New requests", sub: "Today · All channels", to: "New", verb: "routed", rows: [["Fatima, HR", "Email · Laptop will not charge", "IT support"], ["Marina Dental", "Portal · Invoice query", "Billing"], ["Al Noor Trading", "Chat · Delivery date", "Sales"], ["Device AST-0187", "Agent · Battery fault", "IT support"], ["Unknown sender", "Email · No subject", ""]] },
      what: { eyebrow: "What it does", title: 'Every way in, <span class="t-acc">the same place out.</span>', sub: "People ask the way that suits them. Your team answers from one list.", list: [
        ["Email", "Customers write as they always do.", ["Each email becomes a ticket", "Subject and attachments kept", "Replies go back by email"]],
        ["One queue", "Portal, chat and email, side by side.", ["Every channel in one list", "Nothing in a personal inbox", "The channel shown on each ticket"]],
        ["Device agent", "A device reports its own faults.", ["The fault becomes a ticket", "Linked to the device record", "Engineers see what went wrong"]],
      ] },
      steps: [["It arrives", "However it was sent, the request becomes a ticket with the sender, the subject and any files.", "Seconds"], ["It is sorted", "Rules read it and send it to the right team, then to one person.", "Automatic"], ["It is answered", "The owner replies from the ticket and the customer gets it the way they asked.", "On time"]],
      faq: [["Which channels does it support?", "Email, the customer portal, chat and the device agent. [Confirm channel details.]"], ["Do replies go back the same way?", "Replies go back the way the request came in. [Confirm per channel.]"], ["What is the device agent?", "A small agent on a device that raises a ticket when it finds a fault. [Confirm what it reports.]"], ["Can we use our own support address?", "Yes. We connect your support address during set-up. [Confirm mail systems supported.]"]],
    },
    routing: {
      eyebrow: "ONE Desk · The right team and person", title: 'The right team, <span class="grad">then the right person.</span>',
      lead: "Rules read each request and send it to a team, then to one engineer, so everyone knows whose it is.",
      hero: { title: "Unassigned tickets", sub: "Today · Routing rules", to: "Unassigned", verb: "assigned", rows: [["Laptop will not charge", "Fatima, HR", "IT · Omar"], ["Invoice query", "Marina Dental", "Billing · Hana"], ["Delivery date", "Al Noor Trading", "Sales · Aisha"], ["Printer offline", "Harbour Line", "IT · Omar"], ["Request with no subject", "Unknown sender", ""]] },
      what: { eyebrow: "What it does", title: 'Whose it is, <span class="t-acc">never in doubt.</span>', sub: "Every ticket has one owner at a time, and you can see how it got to them.", list: [
        ["Rules", "Tell ONE Desk how your team is organised.", ["By channel, subject or customer", "By priority or by skill", "Applied the moment a ticket arrives"]],
        ["Teams and people", "A team first, then one engineer.", ["The right queue for each request", "One owner shown on the ticket", "Workload visible to the team lead"]],
        ["History kept", "Reassign without losing the story.", ["Who had it, and when", "Why it moved", "Nothing starts again from zero"]],
      ] },
      steps: [["Rules read it", "By channel, subject, customer or priority.", "Automatic"], ["A team takes it", "The request lands in the right team's queue.", "Seconds"], ["One person owns it", "An engineer is picked, and the ticket shows who.", "Always one"]],
      faq: [["Can a ticket have two owners?", "One owner at a time, with the history of who had it before."], ["Can we assign by skill or round-robin?", "Yes. [Confirm assignment methods.]"], ["What if nobody picks it up?", "It is flagged, and a late ticket goes to the team lead."], ["Can we reassign a ticket?", "Yes, with the history kept."]],
    },
    sla: {
      eyebrow: "ONE Desk · A time to reply and fix", title: 'A time to reply, a time to fix. <span class="grad">Late goes to the team lead.</span>',
      lead: "Every ticket carries a reply time and a fix time. One about to run late is flagged, and a late one goes to the team lead.",
      hero: { title: "Tickets by deadline", sub: "Today · SLA clocks", to: "At risk", verb: "on time", rows: [["Laptop will not charge", "Reply due in 12 min", "Replied · 09:12"], ["VPN not connecting", "Fix due 14:00", "Fixed · 09:30"], ["Invoice query", "Reply due in 40 min", "Replied · 09:35"], ["Printer offline", "Fix due 17:00", "Fixed · 09:50"], ["Server alert", "Reply 2 hours late", ""]] },
      what: { eyebrow: "What it does", title: 'Clocks that <span class="t-acc">run themselves.</span>', sub: "Set the times once. ONE Desk watches them for you.", list: [
        ["Reply and fix times", "Two clocks on every ticket.", ["Set by priority", "Visible to the owner and the customer", "A ticket at risk is flagged before it is late"]],
        ["Business hours", "Clocks follow your working week.", ["You set the hours", "Timers pause outside them", "Holidays can be added"]],
        ["Escalation", "Late tickets go up, not unnoticed.", ["The owner is reminded first", "Then the team lead is told", "Every step on the record"]],
      ] },
      steps: [["Priority sets the clock", "Low, High or Urgent each carry a reply time and a fix time.", "Per priority"], ["Timers run in your hours", "Clocks follow the business hours you set.", "Your hours"], ["Late goes up", "A ticket at risk is flagged, a late one goes to the team lead.", "Automatic"]],
      faq: [["How are the times set?", "By priority: each carries a reply time and a fix time. [Confirm default times.]"], ["Do timers stop outside working hours?", "Clocks run in the business hours you set."], ["Who hears when a ticket is late?", "The owner first, then the team lead."], ["Can we report on response times?", "[Confirm reporting available.]"]],
    },
    chat: {
      eyebrow: "ONE Desk · Chat in the ticket", title: 'Every message and file <span class="grad">stays with the ticket.</span>',
      lead: "Replies, internal notes and attachments live on the ticket, so whoever picks it up next reads the whole story.",
      hero: { title: "Open conversations", sub: "Today · Replies waiting", to: "Waiting", verb: "answered", rows: [["Fatima, HR", "Laptop will not charge", "Replied · 09:12"], ["Marina Dental", "Invoice query", "Replied · 09:31"], ["Al Noor Trading", "Delivery date", "Replied · 09:44"], ["Harbour Line", "Printer offline", "Replied · 09:58"], ["Unknown sender", "Attachment only", ""]] },
      what: { eyebrow: "What it does", title: 'One thread, <span class="t-acc">the whole story.</span>', sub: "Customers and staff talk in the same place, with the files beside the words.", list: [
        ["Replies", "Talk to the customer from the ticket.", ["Replies go out by the channel they used", "Canned replies for common questions", "Every message shows who and when"]],
        ["Internal notes", "Talk to each other without the customer seeing.", ["Private notes stay on the ticket", "Mention a colleague", "Never sent by mistake"]],
        ["Files and history", "Nothing gets lost in an inbox.", ["Attachments kept with the ticket", "A full timeline of changes", "Whoever picks it up reads it all"]],
      ] },
      steps: [["The customer writes", "The message lands on the ticket with its files.", "Instant"], ["The team talks", "Internal notes stay private, replies go to the customer.", "Private or public"], ["Nothing is lost", "Whoever picks it up next reads the whole story.", "Always"]],
      faq: [["Can staff add private notes?", "Yes. Internal notes stay on the ticket and are not sent to the customer."], ["Can customers attach files?", "Yes. Files stay with the ticket. [Confirm size limits.]"], ["Are there canned replies?", "[Confirm canned replies.]"], ["Can we see who said what?", "Yes. Every message shows who sent it and when."]],
    },
    kb: {
      eyebrow: "ONE Desk · Knowledge base", title: 'Written answers <span class="grad">people find themselves.</span>',
      lead: "A solved ticket can become an article. The next person with the same question finds it before they ask.",
      hero: { title: "Questions asked", sub: "Today · Self-service", to: "Asked", verb: "answered", rows: [["How do I reset my VPN?", "Fatima, HR", "Article found"], ["Where is my invoice?", "Marina Dental", "Article found"], ["How do I add a user?", "Al Noor Trading", "Article found"], ["Printer set-up", "Harbour Line", "Article found"], ["Warranty claims", "Unknown sender", ""]] },
      what: { eyebrow: "What it does", title: 'From a solved ticket <span class="t-acc">to a written answer.</span>', sub: "Answer a question once. Let the article answer it after that.", list: [
        ["Search", "Customers and staff find answers fast.", ["Search across every article", "Results before a ticket is raised", "Popular answers rise to the top"]],
        ["Draft from a ticket", "The answer is already written.", ["A solved ticket becomes a draft", "You review and publish", "The source ticket stays linked"]],
        ["Categories", "Keep answers where people look.", ["Articles by topic", "Drafts kept apart from published", "Out-of-date ones flagged"]],
      ] },
      steps: [["Solve the ticket", "The answer is already written in the thread.", "One click"], ["Turn it into an article", "The reply becomes a draft you review and publish.", "Draft"], ["Customers find it", "The next person finds it before they ask.", "Self-serve"]],
      faq: [["Can an article come from a ticket?", "Yes. A solved ticket can become a draft article."], ["Who can write articles?", "Anyone you allow. [Confirm roles.]"], ["Is the knowledge base public?", "It can be shown in the customer portal. [Confirm visibility settings.]"], ["Can articles be searched?", "Yes. Customers and staff can search them."]],
    },
    portal: {
      eyebrow: "ONE Desk · Customer portal", title: 'Customers follow their own tickets, <span class="grad">without phoning to ask.</span>',
      lead: "Customers log in, see where their request stands and add details, so your team answers fewer \"any news?\" calls.",
      hero: { title: "Customer tickets", sub: "Today · Portal", to: "Open", verb: "updated", rows: [["Laptop will not charge", "Marina Dental", "In progress"], ["VPN not connecting", "Marina Dental", "Solved"], ["Invoice query", "Al Noor Trading", "Replied"], ["Printer offline", "Harbour Line", "In progress"], ["Delivery date", "Gulf Pack", ""]] },
      what: { eyebrow: "What it does", title: 'Their tickets, <span class="t-acc">your branding.</span>', sub: "A place for customers to follow and add to their own requests.", list: [
        ["Their tickets", "Every request, with its status.", ["Login and ticket status", "Updates in one thread", "Solved ones kept for reference"]],
        ["Add details", "Answer questions without a phone call.", ["Add a comment or a file", "Goes straight onto the ticket", "The owner is told at once"]],
        ["Your branding", "It looks like your company.", ["Your name, logo and colours", "On your own address", "The knowledge base beside it"]],
      ] },
      steps: [["They log in", "Customers sign in to a portal with your name on it.", "Secure"], ["They see the status", "Every ticket shows where it stands.", "Live"], ["They add what's missing", "Details and files go straight onto the ticket.", "Instant"]],
      faq: [["Can customers see all their tickets?", "They see their own tickets. [Confirm company-level visibility.]"], ["Can we brand the portal?", "Yes. [Confirm branding options.]"], ["Can customers raise new tickets there?", "Yes, from the portal. [Confirm.]"], ["Does the portal show the knowledge base?", "It can. [Confirm.]"]],
    },
  };
  Object.keys(P).forEach((k, i, a) => { const o = ORDER.findIndex((x) => x[0] === k); P[k].key = k; P[k].parent = ["ONE Desk", "desk.html"]; P[k].file = ORDER[o][2]; P[k].name = ORDER[o][1]; P[k].note = note; P[k].prev = ORDER[(o + ORDER.length - 1) % ORDER.length].slice(1); P[k].next = ORDER[(o + 1) % ORDER.length].slice(1); P[k].more = ORDER.filter((x) => x[0] !== k).map((x) => [x[1], x[2]]); });
  window.DK = P;
})();
