# MediGarden · Phone app for GitHub Pages

MediGarden is an installable classroom prototype for GTSU2037. It uses fictional school data. Check-ins, settings and simulated referrals stay in the current browser.

## Publish on GitHub Pages

1. Extract the ZIP and open [gooogle7d9/hahahayeahyeah](https://github.com/gooogle7d9/hahahayeahyeah) or your own repository.
2. In **Code**, open the branch and folder that GitHub Pages serves. For the existing root layout, use `main` and stay in the repository root.
3. Select **Add file → Upload files**. Drag in the files inside the extracted folder so that `index.html`, `manifest.webmanifest`, `sw.js` and the other files sit together. Select **Commit changes**. The empty `.nojekyll` file is optional if your picker hides it.
4. In **Settings → Pages**, select **Deploy from a branch**, then `main` and **/ (root)**. If Pages already serves another publishing folder, keep that setting and upload the files there.
5. Check **Actions** for the completed Pages deployment. Open the published HTTPS link from **Settings → Pages**.

See the [GitHub Pages publishing guide](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Install on a phone

- **iPhone** · In Safari, open the HTTPS app link. Tap Share, then **Add to Home Screen**. If Safari shows an **Open as Web App** toggle, leave it on.
- **Android** · In Chrome, open the HTTPS app link. Use **More → Install app** within MediGarden or choose **Install app** in Chrome’s menu.
- Once the app has loaded and cached successfully, the main screens can reopen offline. The online support link and downloads still need a connection.

For a classroom demonstration on a desktop browser, open the app and use the centered phone frame. Scroll inside the screen. On phones and in standalone mode, the app fits the display. Installation and offline caching require an HTTPS deployment.

## Present the user flow

Open `flow.html` on the published site, or choose **More → User flow demonstration** in MediGarden. Click a flow-map node or top tab to open that step in the live phone preview. The preview uses temporary fictional data. Stay in the same tab to show a completed Clear the Fog session add a garden drop or the 14-day streak create a follow-up automatically.

## Demonstrate the home-screen widget

Select **Home Screen Widget** in the flow demo, or **More → Home screen widget** in the app. Tap one of the five moods. The widget confirms the check-in without leaving the preview. Select **See your reset** to open Today and continue. Both screens use the same diary in the current browser. The home-screen widget is a web prototype of the phone experience. Installing the web app creates an app icon.

## Demonstrate the phone app

1. Pick **Low** or **Very low** on Today. The support menu offers **Clear the Fog**, online counselling and **Skip for now**.
2. Open **Calendar → Import sample .ics** to demonstrate the school calendar, then return to **Today → Coming up**. Homework and quiz entries include **Clear the Fog**.
3. Start **Clear the Fog** and follow the 4-second inhale, 2-second pause and 6-second exhale. The hands-free option follows the same timing. Completing all seven rounds adds +1 anonymous garden energy.

Use **Preview Teacher View** on Today to compare staff views and see consecutive low-mood days. The **Review** tab shows an average, daily trend and diary for the selected month.

Use **EEG off** on Today to connect a compatible Muse 2 headset from Chrome on Android or a computer with Bluetooth, or enable a simulated waveform during Clear the Fog. Real readings are displayed only during the practice and are never saved. The **Privacy & Consent** notice explains that teachers and school social workers can see new check-ins and saved notes. Its checkbox records that the notice was read. Earlier private entries keep their original visibility.

Both **Low** and **Very low** count toward a streak. A missed day breaks the streak. At seven consecutive days, the app shows private support options. At fourteen consecutive low check-ins under the current data notice, the teacher and school social worker receive a named demo alert automatically. The social-worker queue includes the streak and recent mood trend. Acknowledging the notice is optional and has no effect on follow-up. The prototype evaluates rules while open and stores the simulation in the current browser.

Use **Calendar → Upload calendar file** for an iCalendar export (.ics) or a CSV. **Use a school calendar link** accepts an authorised, browser-accessible HTTPS iCalendar feed, including a school eClass feed if the school supplies one. The app refreshes the feed on demand and stores extracted events. It does not store the URL. An export is the fallback if the school feed is private or disallows browser requests. Import can read individual calendar events and tasks with dates. Recurrence rules are not expanded.

Calendar CSV columns are `date,title,type`. Use `YYYY-MM-DD` and event types `exam`, `work`, `grades` or `event`. The app supports imported and manually entered results dates.  Direct eClass account authentication, live class sharing and actual referrals are outside this classroom prototype.

## Files

- `index.html`, `style.css`, `app.js` · Main app
- `school-calendar.js`, `muse-eeg.js` · Calendar import and optional Web Bluetooth headset support
- `flow.html`, `flow.css`, `flow.js` · Clickable flow map and phone preview
- `manifest.webmanifest`, `sw.js`, `icon-192.png`, `icon-512.png` · Installation and offline shell
- `open-up-hero.webp`, `garden.webp`, `moods.webp` · Greeting artwork, class garden artwork and illustrated mood icons
- `mood-campus-figma-flow.svg` · Importable storyboard
- `README.md`, `.nojekyll` · Deployment guide and optional Pages marker
