# Pledge Results

To download the pledge results from the database, order alphabetically, strip duplicates, and save as a CSV file:

1. Update local environment variable in `.env`:
  - Set `SITE_URL` to the live production website URL
  - Set `DB_STRING` to the live production database URL
2. Run the local API server: `npm run serve:server`
3. In another terminal window, run `npm run pledge:results`

The file will be saved to `./scratch/db/pledge-results.csv`.

## Recurring Task

Every Monday morning, download the pledge results and email the total count and the CSV file as an attachment to this group of people (as of June 23, 2020):

- Lovelace, Bonnie Sue <BonnieSue.Lovelace@realogy.com>
- Goeman, Mary Teresa <Mary.Goeman@realogy.com>
- Gruca, Ken <Ken.Gruca@realogy.com>
- Kroplewski, Nicole <Nicole.Kroplewski@cbhomeoffice.com>
- Rosario, Elizabeth <Elizabeth.Rosario@cbhomeoffice.com>
- Montiel, Christian <Christian.Montiel@cbhomeoffice.com>

### TODO

1. Automate sending the email

This could be automated (instead of downloading the pledge results as a CSV file and manually emailing it) by writing a script that attaches the data to an email as a CSV attachment, and sends it via SendGrid. The body or subject line of the email could include the total count. The data would need to be converted to Base64, as outlined here: https://ashiknesin.com/blog/send-email-attachments-sendgrid/

2. Automate the whole thing

The whole thing could be run automatically every Monday morning by a Node CRON job, a GitHub Action, a CloudFlare Worker, or something similar. Just don't forget that such an automation exists... in case recipients ever ask to be removed from the distribution, or if they ask to cancel the distribution altogether.