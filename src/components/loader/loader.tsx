import './loader.scss';

export function Loader() {
  return (
    <div className="loading">
      {[1, 2, 3, 4, 5].map((_, index) => (
        <div key={index} className="bubble"></div>
      ))}
    </div>
  );
}
