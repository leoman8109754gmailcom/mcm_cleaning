Serverless booking function

This project includes a Netlify-style serverless function at `netlify/functions/submit-booking.js`.

Behavior
- Accepts POST JSON with { name, phone, service, date, notes }
- If `SENDGRID_API_KEY` is set in the environment it will attempt to send an email to `NOTIFY_EMAIL` (FROM=FROM_EMAIL)
- Otherwise it appends bookings to `/tmp/bookings.json` (for demo/testing)

Local testing
- Install Netlify CLI: `npm i -g netlify-cli`
- Run: `netlify dev` from the `my-react-app` folder. The function will be available at `/.netlify/functions/submit-booking`.

Env variables (recommended when deploying)
- SENDGRID_API_KEY - optional - SendGrid API key to send notification emails
- NOTIFY_EMAIL - email to receive bookings (default: owner@example.com)
- FROM_EMAIL - from address for outgoing emails (default: no-reply@example.com)

Supabase
- If you want to use Supabase for bookings set the following Vite env variables in your deployment or local `.env`:
	- VITE_SUPABASE_URL
	- VITE_SUPABASE_ANON_KEY

Do NOT commit your anon key or any secret tokens to this repository. Use `.env` locally (it's ignored) or the deploy platform's secret settings.

Server-side Supabase inserts (recommended)
- If your table uses Row Level Security (RLS) you should insert bookings server-side using a Supabase service role key. Add these env vars to your serverless environment:
	- SUPABASE_URL
	- SUPABASE_SERVICE_ROLE_KEY

WARNING: Keep the service role key secret — do not expose it to the client or commit it to source control. Use it only in serverless functions or secure server environments.

Security
- Do not commit your SENDGRID_API_KEY to the repo. Use environment variables in your deploy platform.

Replace the fallback with a proper database or integration (Supabase, Airtable, etc.) for production.
