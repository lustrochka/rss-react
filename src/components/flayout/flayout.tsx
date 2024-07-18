import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
//import { useState } from 'react';
//import { setSelected } from '../../store/slices/selectedSlice';
import './flayout.scss';

export default function Flayout() {
  //const dispatch = useDispatch();
  const selectedItems: number[] = useSelector(
    (state: RootState) => state.selected.selected
  );

  return (
    <>
      {selectedItems.length > 0 && (
        <div className="flayout">
          <h3>
            {selectedItems.length} item{selectedItems.length > 1 && 's'}{' '}
            selected
          </h3>
        </div>
      )}
    </>
  );
}
