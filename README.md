# Jammming

A React web application that lets users search the Spotify library, build a custom playlist, and save it to their Spotify account. Built for the Codecademy Full-Stack Engineer career path (React Part II portfolio project).

## Purpose

Practice building a component-based React application that integrates with a third-party API (Spotify Web API), including user authentication (implicit grant), search, and writing data back to a user's account.

## Technologies Used

- React 18 (functional components + hooks)
- Vite (dev server & build tool)
- Spotify Web API (`/authorize` implicit grant, `/v1/search`, `/v1/me`, playlists endpoints)
- Git & GitHub for version control

## Features

- Search songs by title (via Spotify `/v1/search?type=track`)
- Results show track name, artist, and album
- Add tracks from results to a custom playlist (+)
- Remove tracks from the playlist (-)
- Rename the playlist inline
- Save the playlist to the signed-in Spotify account (creates playlist + adds tracks)
- Playlist resets after saving

## Setup

1. `npm install`
2. Register an application at the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard) and paste your client ID into `src/util/Spotify.js` (`clientId`). Set the app's redirect URI to `http://localhost:5173/`.
3. `npm run dev` and open the printed localhost URL.
4. Sign in with your Spotify account when prompted to enable search and saving.

## Future Work

- Search by artist/genre as well as title
- Playlist preview playback (30-second previews)
- Multiple local playlists
- Migrate to Authorization Code with PKCE flow

## Notes

The Spotify client ID is intentionally left as a placeholder — register your own (free) at the Spotify Developer Dashboard to enable live API calls. The UI ships with mock track data so the component tree renders without credentials.
