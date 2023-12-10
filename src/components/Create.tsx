import React, { useState, useEffect } from 'react';
import axios from 'axios';

export type Driver = {
  id: number;
  driverName: string;
  racesWon: number;
  favTrack: string;
  teamName: string;
  photoURL: string;
  createdAt: string;
};

export const Create = () => {
  const [driverName, setDriverName] = useState('');
  const [racesWon, setRacesWon] = useState(0);
  const [favTrack, setFavTrack] = useState('');
  const [teamName, setTeamName] = useState('');
  const [photoURL, setPhotoUrl] = useState('');
  const [createdAt] = useState(new Date().toLocaleString());
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Post the driver to the db and clear the inputs
  const postDriver = () => {
    axios
      .post<Driver>('http://localhost:3002/drivers', {
        driverName: driverName,
        racesWon: racesWon,
        favTrack: favTrack,
        teamName: teamName,
        photoURL: photoURL,
        createdAt: createdAt,
      })
      .then(() => {
        setFormSubmitted(true);
        setDriverName('');
        setRacesWon(0);
        setFavTrack('');
        setTeamName('');
        setPhotoUrl('');
      });
  };

  // Reload the page when the form is submitted
  useEffect(() => {
    if (formSubmitted) {
      window.location.reload();
    }
  }, [formSubmitted]);

  return (
    <div className='create__wrapper'>
      <hr />
      <h1>Register a Driver!</h1>
      <form className='input-form__wrapper'>
        <input
          className='input'
          type='text'
          name='driverName'
          placeholder='Full Name'
          onChange={(e) => setDriverName(e.target.value)}
          required
        />
        <input
          className='input'
          type='number'
          name='racesWon'
          placeholder='Races Won'
          onChange={(e) => setRacesWon(e.target.valueAsNumber)}
          required
        />
        <input
          className='input'
          type='text'
          name='favTrack'
          placeholder='Favorite Track'
          onChange={(e) => setFavTrack(e.target.value)}
          required
        />
        <input
          className='input'
          type='text'
          name='teamName'
          placeholder='Team Name'
          onChange={(e) => setTeamName(e.target.value)}
          required
        />
        <input
          className='input'
          type='text'
          name='photoUrl'
          placeholder='Photo URL'
          onChange={(e) => setPhotoUrl(e.target.value)}
          required
        />
        <button onClick={postDriver} type='button'>
          Register driver
        </button>
      </form>
    </div>
  );
};
