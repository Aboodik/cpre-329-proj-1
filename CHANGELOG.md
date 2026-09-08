# Chalo Ghume — Fix Log

Everything fixed or added across this session, organized by feature area.

## Authentication

- **Fixed** — Firebase project had zero working sign-in methods. Phone Auth
  needs the paid Blaze plan; Email/Password and Anonymous were simply
  switched off in console. Moved to a project we own with Phone +
  Email/Password enabled, an SMS region policy allowing India, and a
  registered test phone number so OTP works without spending money.
  (`src/01_firebase/config_firebase.js`)
- **Fixed** — OTP failures were invisible. Both the send-code and
  verify-code error handlers were empty (just comments) — a failed attempt
  looked exactly like a hang. Both now show the real Firebase error
  message. (`src/Pages/Login.jsx`, `src/Pages/Register.jsx`)
- **Fixed** — Navbar never reflected login state. It always showed
  "SignIn," logged in or not, with no way to log out from the header. Now
  reads the auth store and shows the signed-in user's name plus a working
  Log out control. (`src/Components/Navbar.jsx`)
- **Fixed** — Session didn't survive a page refresh. The `localStorage`
  writes that back the persisted-login check were commented out in the
  login action. (`src/Redux/Authantication/auth.action.js`)
- **Polish** — Register's two steps had the same button label ("Next" on
  both), which made the second step look inert. Relabeled to "Verify OTP."
  (`src/Pages/Register.jsx`)
- **Polish** — Loose equality (`==`) tightened to strict (`===`) when
  matching an entered phone number against known users.
  (`src/Pages/Login.jsx`)

## Flights

- **Fixed** — Search results never rendered at all. The results list
  queried a now-dead third-party demo API with a malformed query string (a
  stray "?" broke the price filter) and never filtered by origin/destination.
  Rewritten to query the local API using the actual search terms.
  (`src/Pages/Flights/FlightList.jsx`)
- **Fixed** — Search button erased its own inputs. Clicking Search reset
  the from/to fields on click and never passed them to the results page.
  (`src/Pages/Flights/Flight.jsx`)
- **Fixed** — Default price filter hid valid flights. It defaulted to the
  ₹7,000–8,000 bucket, so a ₹6,999 fare was invisible before touching a
  single filter. Defaults to no filter now. (`src/Pages/Flights/SideBar.jsx`)
- **Fixed** — "Book Now" posted to the wrong port (`:8000` instead of
  `:8080`). The failure was swallowed (commented-out `.then`/`.catch`), so
  a fake success toast fired regardless of whether the booking saved.
  (`src/Pages/Flights/FlightCard.jsx`)

## Hotels & Cart

- **Fixed** — Hotel search, list, and booking all hit a dead host
  (`happy-sunglasses-eel.cyclic.app` — cyclic.sh shut down in 2024).
  Redirected to the local API. (`src/Redux/StayReducer/action.js`)
- **Fixed** — Hotel location always rendered blank. Read `hotel.location`,
  a field that doesn't exist on hotel records — the real field is `place`.
  (`src/Pages/Stay/StayData.jsx`)
- **Fixed** — "We have 5 left" button actually deleted the hotel from the
  list. There was no booking action for hotels at all. Replaced with a
  real "Book Now" that adds the hotel to the cart.
  (`src/Pages/Stay/StayData.jsx`)
- **New** — Cart page. Didn't exist in any form — `flightcart`/`hotelcart`
  could be written to but nothing ever read them back for display. Built
  the page and added it to the nav. (`src/Pages/Cart.jsx`)
- **Fixed** — Checkout's "Complete Booking" button had no `onClick` at
  all — the whole page was static markup. Now reads the live cart, files a
  real booking, and clears it. (`src/Pages/CheckoutPage.jsx`)
- **Fixed** — Holiday-package search hit the same dead cyclic.app host as
  the hotel endpoints. (`src/Pages/ThingsTodo/Destination.jsx`)

## Admin Panel

- **Fixed** — Dashboard's "View" links mostly went nowhere. Flights
  pointed at a route that didn't exist, Users looped back to the dashboard
  itself, Giftcards and Packages pointed at routes never built — only
  Hotels actually worked. (`src/Pages/Admin/AdminDashboard.jsx`)
- **Polish** — Sidebar "Home" link renamed to "Dashboard" across every
  admin page — it linked to the page you were often already on, which read
  as broken.
- **Fixed** — Edit was a dead button with no action to call. Neither
  Flights' nor Hotels' Edit button had an `onClick`, and no update/PATCH
  action existed for either resource. Added `updateFlight`/`updateHotel`
  and wired Edit into a pre-filled Add form.
  (`AdminFlight.jsx`, `AdminStay.jsx`, `AdminProducts.jsx`, `AllHotels.jsx`,
  `Redux/AdminFlights/*`, `Redux/AdminHotel/*`)
- **Fixed** — Flight delete request was malformed: sent as a query string
  instead of a path segment, and called `.json()` on an axios response
  (axios already parses to `.data`) — that line threw and was silently
  swallowed, so delete never actually worked.
  (`src/Redux/AdminFlights/action.js`)
- **New** — Users page. No admin view of registered users existed at all.
  (`src/Pages/Admin/AdminUsers.jsx`)
- **New** — Bookings page. No concept of a confirmed booking existed
  anywhere — checkout used to just delete the cart, leaving nothing to
  show. Added a permanent `bookings` record written at checkout time,
  separate from the live cart, and a page to read it.
  (`AdminBookings.jsx`, `CheckoutPage.jsx`, `db.json`)

## Data Layer

- **Fixed** — json-server's pagination params are unreliable on this
  version: `_limit` without `_page` returns an empty array outright, and
  `_page` alone wraps the response as `{ data: [...] }` instead of a plain
  array. Every list fetch using either param was silently broken.
  Standardized on fetching the full filtered list and
  paginating/sorting client-side.
  (`Redux/AdminFlights/action.js`, `Redux/AdminHotel/action.js`,
  `Redux/StayReducer/action.js`, `Flights/FlightList.jsx`)

## Totals

- 30 files touched
- 19 bugs fixed
- 3 new pages
- 4 dead third-party endpoints redirected to the local API

## Worth noting in your report

- **OTP is demo-mode by design, not a shortcut.** Real SMS delivery needs
  the Firebase Blaze plan; this project has Phone Auth enabled with a
  registered test number instead, so verification runs through real
  Firebase Auth but doesn't send an actual text.
- **Giftcards and Packages have no admin management page.** They weren't
  part of the required admin feature set, so the dashboard's dead links to
  them were removed rather than built out.
- **The Admin Login link has no credential check.** It's a plain link into
  `/admin` — not part of the original required feature set, left as-is to
  avoid scope creep.
