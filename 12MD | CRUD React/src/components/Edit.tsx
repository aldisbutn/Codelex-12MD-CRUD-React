import { useState, useEffect } from 'react';
import axios from 'axios';
import { Driver } from './create';


export const Edit = () => {
  const [APIdata, setAPIData] = useState<Driver[]>([]);
  const [, setID] = useState<number | null>(null);
  const [editID, setEditID] = useState<number | null>(null);
  const [driverName, setDriverName] = useState('');
  const [racesWon, setRacesWon] = useState(0);
  const [favTrack, setFavTrack] = useState('');
  const [teamName, setTeamName] = useState('');
  const [photoURL, setPhotoUrl] = useState('');

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
    const { id, driverName, racesWon, favTrack, teamName, photoURL } = data;
    setEditID(id);
    setDriverName(driverName);
    setRacesWon(racesWon);
    setFavTrack(favTrack);
    setTeamName(teamName);
    setPhotoUrl(photoURL);
  };

  const editDriver = () => {
    if (editID) {
      axios
        .put(`http://localhost:3000/drivers/${editID}`, {
          driverName,
          racesWon,
          favTrack,
          teamName,
          photoURL,
        })
        .then(() => {
          axios.get<Driver[]>('http://localhost:3000/drivers').then((response) => setAPIData(response.data));
          setEditID(null);
        });
    }
  };

  const deleteDriver = (id: number) => {
    axios.delete(`http://localhost:3000/drivers/${id}`).then(() => {
      axios.get<Driver[]>('http://localhost:3000/drivers').then((response) => setAPIData(response.data));
    });
  };

  return (
    <div>
      {APIdata.map((data) => (
        <div key={data.id}>
          {editID === data.id ? (
            <div>
              <input type='text' value={driverName} onChange={(e) => setDriverName(e.target.value)} />
              <input type='number' value={racesWon} onChange={(e) => setRacesWon(Number(e.target.value))} />
              <input type='text' value={favTrack} onChange={(e) => setFavTrack(e.target.value)} />
              <input type='text' value={teamName} onChange={(e) => setTeamName(e.target.value)} />
              <input type='text' value={photoURL} onChange={(e) => setPhotoUrl(e.target.value)} />
              <button onClick={editDriver}>Save</button>
            </div>
          ) : (
            <div>
              <h3>{data.driverName}</h3>
              <h3>{data.racesWon}</h3>
              <h3>{data.favTrack}</h3>
              <h3>{data.teamName}</h3>
              <p>Created  ago</p>
              <div>
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
