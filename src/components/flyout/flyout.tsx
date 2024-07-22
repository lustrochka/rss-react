import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { setSelected } from '../../store/slices/selectedSlice';
import { ISelectedItems } from '../../types';
import './flyout.scss';

export default function Flyout() {
  const dispatch = useDispatch();
  const selectedItems: ISelectedItems = useSelector(
    (state: RootState) => state.selected.selected
  );

  return (
    <>
      {Object.keys(selectedItems).length > 0 && (
        <div className="flyout">
          <h3>
            {Object.keys(selectedItems).length} item
            {Object.keys(selectedItems).length > 1 && 's'} selected
          </h3>
          <button onClick={() => dispatch(setSelected([]))}>
            Unselect all
          </button>
          <button onClick={() => console.log(selectedItems)}>Download</button>
        </div>
      )}
    </>
  );
}
