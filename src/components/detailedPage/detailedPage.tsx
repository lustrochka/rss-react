import { useOutletContext, useSearchParams } from 'react-router-dom';
import './details.scss';
import { Loader } from '../loader';
import { useGetObjectQuery } from '../../api/api';

export function DetailedPage() {
  const [id]: [id: string] = useOutletContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, error, isLoading } = useGetObjectQuery(id);

  const changeUrl = () => {
    searchParams.delete('details');
    setSearchParams(searchParams);
  };

  return (
    <div className="details">
      <div className="close-button" onClick={changeUrl}>
        ✖
      </div>
      <div className="details-item">
        {isLoading && <Loader />}
        {error && <div>Something went wrong...</div>}
        {data && (
          <>
            <h2>{data.astronomicalObject.name}</h2>
            <div>{data.astronomicalObject.astronomicalObjectType}</div>
            {data.astronomicalObject.location && (
              <div>{`${data.astronomicalObject.location.name}, ${data.astronomicalObject.location.location.name}`}</div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
