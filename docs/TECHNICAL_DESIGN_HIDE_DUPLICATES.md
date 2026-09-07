# Technical Design Document — Hide Already-Added Tracks From Search Results

**Project:** Jammming (Codecademy Full-Stack Engineer, React Part II — Portfolio Project Part Two)
**Feature:** Only display songs not currently present in the playlist in the search results
**Author:** Az (with Hermes)
**Status:** Implemented

## 1. Overview

### Problem

When a user builds a playlist in Jammming, the search results continue to show tracks that are already in the playlist. Users can accidentally add the same song twice (the current `addTrack` silently rejects duplicates, so the click appears to "do nothing"), which is confusing.

### Proposed Solution

Filter the search results at render time so any track that already exists in the current playlist (matched by `id`) is hidden from the results list. When the user removes the track from the playlist, it immediately reappears in the results (if it still matches the last search).

### User Stories

- As a user, I want search results to exclude songs already in my playlist, so that I don't accidentally try to add duplicates.
- As a user, I want a song to reappear in the results when I remove it from my playlist, so that I can re-add it if I removed it by mistake.

## 2. Design

### Approach chosen: derived (computed) state at the root component

`App` computes `visibleResults = searchResults.filter(r => !playlistTracks.some(p => p.id === r.id))` and passes `visibleResults` to `<SearchResults />`. `searchResults` (the source) is never mutated.

### Alternatives considered

1. **Filter at the last moment inside `SearchResults`** — rejected: hides the rule from the component that owns both lists (`App`), and `SearchResults` would need the playlist as an extra prop anyway.
2. **Remove from `searchResults` in `addTrack`** — rejected: destroys source data; when the user removes the track from the playlist it would be gone from results too (until a new search), breaking the second user story.
3. **Duplicate-ID guard only (status quo)** — kept as a safety net, but it doesn't communicate anything to the user.

### Why derived state

- Single source of truth preserved (`searchResults` unchanged).
- Zero extra state to synchronize — the filtered list is recomputed by React on every render of `App`.
- Symmetric behavior: add hides the row; remove reveals it again automatically.

## 3. Implementation

### Affected files

- `src/components/App/App.jsx` — compute and pass `visibleResults` to `SearchResults`.

### Code

```jsx
const visibleResults = searchResults.filter(
  (result) => !playlistTracks.some((track) => track.id === result.id)
);

// in JSX:
<SearchResults searchResults={visibleResults} onAdd={addTrack} />
```

### Edge cases

| Case | Behavior |
|---|---|
| Track added, then removed from playlist | Reappears in results on next render (source list intact) |
| Two tracks with same name, different IDs | Both shown (correct — distinct Spotify tracks) |
| Playlist saved and reset | Playlist empties → all results visible again |
| Empty search | Empty results — filter is a no-op |

### Complexity

O(n·m) per render (n results, m playlist tracks). Both are user-scale (< a few hundred) — negligible; no memoization required. If results were paginated in future, wrap in `useMemo` on `[searchResults, playlistTracks]`.

## 4. Testing Plan

- [x] Search returns tracks; add one — row disappears from results immediately
- [x] Remove it from playlist — row reappears in results
- [x] Add all results — results list shows empty state, playlist has all
- [x] Save playlist (mock) — playlist resets, results repopulate
- [x] Duplicate guard in `addTrack` retained (defense in depth)

## 5. Future Work

- Toggle setting: "show duplicates with an 'In playlist' badge" instead of hiding
- `useMemo` if result sets grow
