import React, { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';
import './App.css';

function App() {
  const [searchResults, setSearchResults] = useState([
    {
      name: 'Tiny Dancer',
      artist: 'Elton John',
      album: 'Madman Across The Water',
      id: 1,
      uri: 'spotify:track:2ta8992r',
    },
    {
      name: 'Tiny Dancer',
      artist: 'Tim McGraw',
      album: 'Love Story',
      id: 2,
      uri: 'spotify:track:4ta8992s',
    },
    {
      name: 'Tiny Dancer',
      artist: 'Rockabye Baby!',
      album: 'Lullaby Renditions of Elton John',
      id: 3,
      uri: 'spotify:track:6ta8992t',
    },
  ]);
  const [playlistName, setPlaylistName] = useState('New Playlist');
  const [playlistTracks, setPlaylistTracks] = useState([
    {
      name: 'Stronger',
      artist: 'Britney Spears',
      album: 'Oops!... I Did It Again',
      id: 4,
      uri: 'spotify:track:8ta8992u',
    },
    {
      name: 'So Emotional',
      artist: 'Whitney Houston',
      album: 'Whitney',
      id: 5,
      uri: 'spotify:track:1ta8992v',
    },
  ]);

  function addTrack(track) {
    if (playlistTracks.find((savedTrack) => savedTrack.id === track.id)) {
      return;
    }
    setPlaylistTracks([...playlistTracks, track]);
  }

  function removeTrack(track) {
    setPlaylistTracks(
      playlistTracks.filter((savedTrack) => savedTrack.id !== track.id)
    );
  }

  function updatePlaylistName(name) {
    setPlaylistName(name);
  }

  function savePlaylist() {
    const trackURIs = playlistTracks.map((track) => track.uri);
    Spotify.savePlaylist(playlistName, trackURIs).then(() => {
      setPlaylistName('New Playlist');
      setPlaylistTracks([]);
    });
  }

  function search(term) {
    Spotify.search(term).then((searchResults) => {
      setSearchResults(searchResults);
    });
  }

  return (
    <div>
      <h1>
        Ja<span className="highlight">mmm</span>ing
      </h1>
      <div className="App">
        <SearchBar onSearch={search} />
        <div className="App-playlist">
          <SearchResults searchResults={searchResults} onAdd={addTrack} />
          <Playlist
            playlistName={playlistName}
            playlistTracks={playlistTracks}
            onRemove={removeTrack}
            onNameChange={updatePlaylistName}
            onSave={savePlaylist}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
