import React, { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Driver } from './Create';
import axios from 'axios';

interface DisplayAndEditProps {
  deleteDriverAndUpdateCount: (id: number) => void;
}

export const DisplayAndEdit: React.FC<DisplayAndEditProps> = ({ deleteDriverAndUpdateCount }) => {
  const [APIdata, setAPIData] = useState<Driver[]>([]);
  const [editID, setEditID] = useState<number | null>(null);
  const [driverName, setDriverName] = useState('');
  const [racesWon, setRacesWon] = useState(0);
  const [favTrack, setFavTrack] = useState('');
  const [teamName, setTeamName] = useState('');
  const [photoURL, setPhotoUrl] = useState('');
  const [, setCreatedAt] = useState(new Date().toLocaleString());

  // Get the initial data when the page loads
  useEffect(() => {
    axios.get<Driver[]>('http://localhost:3002/drivers').then((response) => {
      const driversWithDate = response.data.map((driver) => ({
        ...driver,
        createdAt: new Date(driver.createdAt).toLocaleString(),
      }));
      setAPIData(driversWithDate);
    });
  }, []);

  // Set the inputs when editing a driver(the value that already is there)
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

  // Driver edit
  const editDriver = () => {
    if (editID) {
      // Store the driver in originalDriver(this is for accesing createdAt, we want it to stay the same always)
      const originalDriver = APIdata.find((driver) => driver.id === editID);

      // Put the edit info in the db
      if (originalDriver) {
        axios
          .put(`http://localhost:3002/drivers/${editID}`, {
            driverName,
            racesWon,
            favTrack,
            teamName,
            photoURL,
            createdAt: originalDriver.createdAt,
          })
          // Update the state with the edited driver
          .then(() => {
            setAPIData((prevData) => {
              const updatedData = prevData.map((driver) =>
                driver.id === editID ? { ...driver, driverName, racesWon, favTrack, teamName, photoURL } : driver
              );
              return updatedData;
            });
            setEditID(null);
          });
      }
    }
  };

  // Driver delete
  const deleteDriver = (id: number) => {
    axios.delete(`http://localhost:3002/drivers/${id}`).then(() => {
      deleteDriverAndUpdateCount(id);
      setAPIData((prevData) => prevData.filter((driver) => driver.id !== id));
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
                <p className='heading-2'>{formatDistanceToNow(new Date(data.createdAt))} ago</p>
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
