import { useSearchParams } from 'react-router-dom';

interface IMyProps {
  isLast: boolean;
}

export default function Pagination(props: IMyProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
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
          onClick={() => {
            if (page !== 1) decreasePage();
          }}
        >
          🠘
        </div>
        <div>{page}</div>
        <div
          onClick={() => {
            if (!props.isLast) increasePage();
          }}
        >
          🠚
        </div>
      </div>
    </>
  );
}
