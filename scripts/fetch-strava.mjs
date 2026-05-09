// scripts/fetch-strava.mjs
// Runs at build time to fetch Strava data and write it to a static JSON file
// that the Angular app reads at runtime.

import { writeFileSync, mkdirSync } from 'fs';
import { loadEnv } from 'vite';

// LOCAL TESTING
// const env = loadEnv('', process.cwd(), 'STRAVA');
// process.env.STRAVA_CLIENT_ID     = env.STRAVA_CLIENT_ID;
// process.env.STRAVA_CLIENT_SECRET = env.STRAVA_CLIENT_SECRET;
// process.env.STRAVA_REFRESH_TOKEN = env.STRAVA_REFRESH_TOKEN;

const { STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET, STRAVA_REFRESH_TOKEN } = process.env;

if (!STRAVA_CLIENT_ID || !STRAVA_CLIENT_SECRET || !STRAVA_REFRESH_TOKEN) {
  console.error('Missing Strava environment variables.');
  process.exit(1);
}

// ── 1. Exchange refresh token for a fresh access token ─────────────────────
const tokenRes = await fetch('https://www.strava.com/oauth/token', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    client_id:     STRAVA_CLIENT_ID,
    client_secret: STRAVA_CLIENT_SECRET,
    refresh_token: STRAVA_REFRESH_TOKEN,
    grant_type:    'refresh_token',
  }),
});

if (!tokenRes.ok) {
  console.error('Failed to refresh Strava token:', await tokenRes.text());
  process.exit(1);
}

const { access_token } = await tokenRes.json();

// ── 2. Fetch recent activities (last 10) ───────────────────────────────────
const activitiesRes = await fetch(
  'https://www.strava.com/api/v3/athlete/activities?per_page=10',
  { headers: { Authorization: `Bearer ${access_token}` } }
);

if (!activitiesRes.ok) {
  console.error('Failed to fetch Strava activities:', await activitiesRes.text());
  process.exit(1);
}

const activities = await activitiesRes.json();

const athleteRes = await fetch(
  'https://www.strava.com/api/v3/athlete',
  { headers: { Authorization: `Bearer ${access_token}` } }
);

if (!athleteRes.ok) {
  console.error('Failed to fetch Athlete profile:', await athleteRes.text());
  process.exit(1);
}

const athlete = await athleteRes.json();

// ── 3. Fetch weekly stats ──────────────────────────────────────────────────
const statsRes = await fetch(
  `https://www.strava.com/api/v3/athletes/${athlete.id}/stats`,
  { headers: { Authorization: `Bearer ${access_token}` } }
);

if (!statsRes.ok) {
  console.error('Failed to fetch Strava stats:', await statsRes.text());
  process.exit(1);
}

const stats = await statsRes.json();

// ── 4. Shape the data ──────────────────────────────────────────────────────
const output = {
  generatedAt: new Date().toISOString(),
  profile: {
    firstname:      athlete.firstname,
    lastname:       athlete.lastname,
    profile_medium: athlete.profile_medium,
    city:           athlete.city,
    state:          athlete.state,
  },
  weeklyStats: {
    distance:       stats.recent_run_totals.distance + stats.recent_ride_totals.distance,
    moving_time:    stats.recent_run_totals.moving_time + stats.recent_ride_totals.moving_time,
    elevation_gain: stats.recent_run_totals.elevation_gain + stats.recent_ride_totals.elevation_gain,
    activity_count: stats.recent_run_totals.count + stats.recent_ride_totals.count,
  },
  recentActivities: activities.slice(0, 3).map(a => ({
    id:                   a.id,
    name:                 a.name,
    type:                 a.type,
    distance:             a.distance,
    moving_time:          a.moving_time,
    elapsed_time:         a.elapsed_time,
    total_elevation_gain: a.total_elevation_gain,
    start_date:           a.start_date,
    average_speed:        a.average_speed,
    average_heartrate:    a.average_heartrate,
  })),
};

// ── 5. Write to public assets ──────────────────────────────────────────────
mkdirSync('public', { recursive: true });
writeFileSync('public/strava.json', JSON.stringify(output, null, 2));

console.log(`✅ Strava data written to public/strava.json`);
console.log(`   Activities: ${output.recentActivities.length}`);
console.log(`   Weekly distance: ${(output.weeklyStats.distance / 1000).toFixed(1)} km`);
