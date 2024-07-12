import axios from 'axios';
import { useEffect, useState } from 'react';
import { useOutletContext, useSearchParams } from 'react-router-dom';
import './details.scss';
import { Loader } from '../loader';

export function DetailedPage() {
  const [id]: [id: string] = useOutletContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [location, setLocation] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    search();
  }, []);

  const changeUrl = () => {
    searchParams.delete('details');
    setSearchParams(searchParams);
  };

  const search = () => {
    const BASE_URL = 'http://stapi.co/api/v1/rest/astronomicalObject';
    axios
      .get(BASE_URL, {
        params: { uid: id },
      })
      .then((res) => {
        setIsLoading(false);
        const data = res.data.astronomicalObject;
        setName(data.name);
        setType(data.astronomicalObjectType);
        if (data.location)
          setLocation(`${data.location.name}, ${data.location.location.name}`);
      })
      .catch(() => {
        throw new Error('Wrong item number');
      });
  };

  return (
    <div className="details">
      <div className="close-button" onClick={changeUrl}>
        ✖
      </div>
      <div className="details-item">
        {isLoading && <Loader class="loading" />}
        <h2>{name}</h2>
        <div>{type}</div>
        <div>{location}</div>
      </div>
    </div>
  );
}
