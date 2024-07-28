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

  const convertToCSV = () => {
    const keys = Object.keys(Object.values(selectedItems)[0]).join(',');
    const values = Object.values(selectedItems).map((item) =>
      Object.values(item).join(',')
    );
    return [keys, ...values].join('\n');
  };

  const downloadCSV = () => {
    const csv = convertToCSV();
    const blob = new Blob([csv], { type: 'text/csv' });
    return URL.createObjectURL(blob);
  };

  return (
    <>
      {Object.keys(selectedItems).length > 0 && (
        <div className="flyout">
          <h3 className="flyout__title">
            {Object.keys(selectedItems).length} item
            {Object.keys(selectedItems).length > 1 && 's'} selected
          </h3>
          <div className="flyout__buttons">
            <button onClick={() => dispatch(setSelected([]))}>
              Unselect all
            </button>
            <a href={downloadCSV()} download="astronomical objects.csv">
              <button>Download</button>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
