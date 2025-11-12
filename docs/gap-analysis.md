# Gap Analysis vs SRS

## Student (6.1)
- Account lifecycle: login, register, recovery (find account + OTP flow), change password/profile.
- Learning dashboard: overview widgets, reminders, announcements.
- Learning content: browse lectures, detail view with purchase/download, rating & feedback.
- Exercises & tests: practice sets, timed assessments, submission summary, result history.
- Progress tracking: charts for scores, completion, recommendations.
- Teacher interaction: messaging, livestream schedule, Q&A threads.
- Competitions: catalog, registration workflow, match brackets, leaderboard, result details.
- Marketplace: cart/payment, purchase history, document downloads, invoices.
- Issue reporting: structured form with status tracking.
- Notifications: email/SMS preferences, in-app center, reminder scheduling.

## Teacher (6.2)
- Account management: profile, security (password/OTP).
- Content lifecycle: upload wizard, metadata, pricing, approval status, versioning.
- Student management: rosters, segmentation, progress analytics, import/export.
- Assessment & grading: submission inbox, rubric scoring, feedback templates.
- Scheduling: calendar for classes/tests, push reminders, integration with livestream.
- Personalisation: learning paths, cohort analytics, content recommendations.
- Communication: group chat threads, broadcast announcements, complaint resolution.
- Revenue: sales dashboard, withdrawal requests, payout timeline.

## Admin (6.3)
- Account governance: create/edit/disable users, password reset, filters, bulk actions.
- Content moderation: queue, reviewers, escalation, audit trail.
- Permission matrix: role catalog, capability toggles, history log.
- Analytics & revenue: platform KPIs, drill-down by subject, exportable reports.
- Transactions: payment verification, dispute handling, reconciliation.
- System monitoring: error queues, status, resolution workflow.
- Global notifications: compose, audience targeting, delivery log, templates.

## Observations
- Current prototype covers part of student dashboard, content browsing, exercises, forum, payment.
- Teacher flows limited to content table; lacking upload wizard, student analytics, communications.
- Admin dashboard displays static mockups; CRUD interactions, monitoring workflows, permission editing not implemented.
- Auth flows use simple prompts; no dedicated recovery/OTP UI states.

## Next Steps
1. Design detailed wireframes/components per gap.
2. Implement shared data layer (mock JSON) and modular JS managers.
3. Build dedicated pages for major flows (tests, competitions, student management, admin monitoring, etc.).
4. Enhance auth UX with modal sequences for recovery & OTP.
5. Update navigation + theming for new sections.
6. Document usage + demo scenarios.