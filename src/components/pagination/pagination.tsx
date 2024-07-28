import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import './pagination.scss';

export default function Pagination() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const isLast = useSelector((state: RootState) => state.isLast.isLast);
  const increasePage = () => {
    setSearchParams({ page: `${page + 1}` });
  };
  const decreasePage = () => {
    setSearchParams({ page: `${page - 1}` });
  };

  return (
    <>
      <div className="pagination">
        <div
          className="prev-button"
          onClick={() => {
            if (page !== 1) decreasePage();
          }}
        >
          🠘
        </div>
        <div>{page}</div>
        <div
          className="next-button"
          onClick={() => {
            if (!isLast) increasePage();
          }}
        >
          🠚
        </div>
      </div>
    </>
  );
}
