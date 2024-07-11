import imgUrl from '../assets/PIWO.svg';

interface IMyProps {
  class: string;
}

export function Loader(props: IMyProps) {
  return (
    <div className={props.class}>
      {[1, 2, 3, 4, 5].map((_, index) => (
        <div key={index}>
          <img src={imgUrl} className="bubble"></img>
        </div>
      ))}
    </div>
  );
}
