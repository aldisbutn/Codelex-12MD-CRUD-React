import { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Driver } from './Create';
import axios from 'axios';


export const DisplayAndEdit = () => {
  const [APIdata, setAPIData] = useState<Driver[]>([]);
  const [, setID] = useState<number | null>(null);
  const [editID, setEditID] = useState<number | null>(null);
  const [driverName, setDriverName] = useState('');
  const [racesWon, setRacesWon] = useState(0);
  const [favTrack, setFavTrack] = useState('');
  const [teamName, setTeamName] = useState('');
  const [photoURL, setPhotoUrl] = useState('');
  const [createdAt, setCreatedAt] = useState(new Date());

  useEffect(() => {
    setID(Number(localStorage.getItem('ID')));
    setDriverName(localStorage.getItem('Driver Name') || '');
    setRacesWon(Number(localStorage.getItem('Races Won')) || 0);
    setFavTrack(localStorage.getItem('Favorite Track') || '');
    setTeamName(localStorage.getItem('Team Name') || '');
    setPhotoUrl(localStorage.getItem('Photo URL') || '');
  }, []);

  useEffect(() => {
    axios.get<Driver[]>('http://localhost:3000/drivers').then((response) => {
      const driversWithDate = response.data.map((driver) => ({
        ...driver,
        createdAt: new Date(driver.createdAt),
      }));
      setAPIData(driversWithDate);
    });
  }, []);

  const setDriver = (data: Driver) => {
    const { id, driverName, racesWon, favTrack, teamName, photoURL, createdAt } = data;
    setEditID(id);
    setDriverName(driverName);
    setRacesWon(racesWon);
    setFavTrack(favTrack);
    setTeamName(teamName);
    setPhotoUrl(photoURL);
    setCreatedAt(createdAt);
  };

  const editDriver = () => {
    if (editID) {
      const originalDriver = APIdata.find((driver) => driver.id === editID);
  
      if (originalDriver) {
        axios
          .put(`http://localhost:3000/drivers/${editID}`, {
            driverName,
            racesWon,
            favTrack,
            teamName,
            photoURL,
            createdAt: originalDriver.createdAt
          })
          .then(() => {
            axios.get<Driver[]>('http://localhost:3000/drivers').then((response) => setAPIData(response.data));
            setEditID(null);
          });
      }
    }
  };
  

  const deleteDriver = (id: number) => {
    axios.delete(`http://localhost:3000/drivers/${id}`).then(() => {
      axios.get<Driver[]>('http://localhost:3000/drivers').then((response) => setAPIData(response.data));
    });
  };

  return (
    <div className='driver-wrapper'>
      {APIdata.map((data) => (
        <div key={data.id} className='driver-item__wrapper'>
          {editID === data.id ? (
            <div className='driver-item'>
              <div className='edit-form__wrapper'>
                <input type='text' value={driverName} onChange={(e) => setDriverName(e.target.value)} />
                <input type='number' value={racesWon} onChange={(e) => setRacesWon(Number(e.target.value))} />
                <input type='text' value={favTrack} onChange={(e) => setFavTrack(e.target.value)} />
                <input type='text' value={teamName} onChange={(e) => setTeamName(e.target.value)} />
                <input type='text' value={photoURL} onChange={(e) => setPhotoUrl(e.target.value)} />
              </div>
              <button onClick={editDriver}>Save</button>
            </div>
          ) : (
            <div className='driver-item'>
              <div className='photo-wrapper'>
                <img src={data.photoURL} className='photoURL' alt='${driver.name}' />
              </div>
              <div className='driver-info__wrapper'>
                <h2 className='heading-main'>Driver Name</h2>
                <h3 className='heading-1'>{data.driverName}</h3>
                <hr />
                <h2 className='heading-3'>Number of Races Won</h2>
                <h3 className='heading-2'>{data.racesWon}</h3>
                <hr />
                <h2 className='heading-3'>Favorite Track</h2>
                <h3 className='heading-2'>{data.favTrack}</h3>
                <hr />
                <h2 className='heading-3'>Racing Team</h2>
                <h3 className='heading-2'>{data.teamName}</h3>
                <hr />
                <h2 className='heading-3'>Joined the Site</h2>
                <p className='heading-2'>{formatDistanceToNow(data.createdAt)} ago</p>
              </div>
              <div className='button__wrapper'>
                <button onClick={() => deleteDriver(data.id)}>Delete</button>
                <button onClick={() => setDriver(data)}>Edit</button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
