import { useState } from 'react';
import axios from 'axios';

export type Driver = {
  id: number;
  driverName: string;
  racesWon: number;
  favTrack: string;
  teamName: string;
  photoURL: string;
  createdAt: Date;
};

export const Create = () => {
  const [driverName, setDriverName] = useState('');
  const [racesWon, setRacesWon] = useState(0);
  const [favTrack, setFavTrack] = useState('');
  const [teamName, setTeamName] = useState('');
  const [photoURL, setPhotoUrl] = useState('');

  const postDriver = () => {
    axios.post<Driver>('http://localhost:3000/drivers', {
      driverName: driverName,
      racesWon: racesWon,
      favTrack: favTrack,
      teamName: teamName,
      photoURL: photoURL,
      createdAt: new Date(),
    });
  };

  return (
    <div className='input-form__wrapper'>
      <form>
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
