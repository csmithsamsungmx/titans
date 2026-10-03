# Activate shared sales
1. Open the 2026 Black Friday Incentive spreadsheet.
2. Select Extensions → Apps Script.
3. Replace the default Code.gs contents with the complete Code.gs file from this folder and save.
4. Select Deploy → New deployment → Web app.
5. Set Execute as to Me and Who has access to Anyone.
6. Click Deploy and authorize the script to read this spreadsheet.
7. Copy the Web app URL ending in /exec and send it to ChatGPT. ChatGPT will put it in config.json so the existing GitHub Pages link syncs.
The Web app URL also opens the complete four-group website immediately.
Update total units in column B of JBHIFI Live Sales. Blank means awaiting figures; 0 means confirmed zero sales.
The spreadsheet sharing settings are unchanged. The web app publishes only the 24 store names, targets, cut-ins and sales from the two JBHIFI tabs. It has no public write endpoint.
If you change Code.gs later, edit the existing deployment to use a new version.
