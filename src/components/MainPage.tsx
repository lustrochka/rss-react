import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

function MainPage() {
  const data = useSelector((state: RootState) => state.data.data);
  const data2 = useSelector((state: RootState) => state.data2.data);
  const isSubmitted = data.name.length > 0;
  const isSubmitted2 = data2.name.length > 0;

  return (
    <div className="main-page">
      <div className="form">
        <NavLink to="/form1">form</NavLink>
        {isSubmitted && (
          <div className="form-data">
            <p>Name: {data.name}</p>
            <p>Age: {data.age}</p>
            <p>E-mail: {data.email}</p>
            <p>Password: {data.password}</p>
            <p>Gender: {data.gender}</p>
          </div>
        )}
      </div>
      <div className="form">
        <NavLink to="/form2">another form</NavLink>
        {isSubmitted2 && (
          <div className="form-data">
            <p>Name: {data2.name}</p>
            <p>Age: {data2.age}</p>
            <p>E-mail: {data2.email}</p>
            <p>Password: {data2.password}</p>
            <p>Gender: {data2.gender}</p>
            <div>
              <p>Uploaded Image:</p>
              <img src={data2.image} alt="Uploaded" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MainPage;
