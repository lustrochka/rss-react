import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { setSelected } from '../../store/slices/selectedSlice';
import './flyout.scss';

export default function Flyout() {
  const dispatch = useDispatch();
  const selectedItems: number[] = useSelector(
    (state: RootState) => state.selected.selected
  );

  return (
    <>
      {selectedItems.length > 0 && (
        <div className="flyout">
          <h3>
            {selectedItems.length} item{selectedItems.length > 1 && 's'}{' '}
            selected
          </h3>
          <button onClick={() => dispatch(setSelected([]))}>
            Unselect all
          </button>
        </div>
      )}
    </>
  );
}
