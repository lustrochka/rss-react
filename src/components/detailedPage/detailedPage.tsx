import React from 'react';
import { IObjectResponse } from '../../types';
import CloseButton from './closeButton';

interface IDetailsData {
  data: { data: Partial<IObjectResponse> };
}

export function DetailedPage({ data }: IDetailsData) {
  const checkLocation = (location) => {
    if (!location) {
      return '';
    } else if (!location.location) {
      return `${location.name}`;
    }
    return `${location.name}, ${location.location.name}`;
  };

  return (
    <div className="details">
      <CloseButton></CloseButton>
      <div className="details__item">
        {data && (
          <>
            <h2>{data?.data?.astronomicalObject?.name || ''}</h2>
            <div>
              {data?.data?.astronomicalObject?.astronomicalObjectType || ''}
            </div>
            {data?.data?.astronomicalObject?.location && (
              <div>{`${checkLocation(data?.data?.astronomicalObject?.location)}`}</div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
