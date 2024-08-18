import { useRef } from 'react';
import { setData } from '../store/slices/Form1Slice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { createSchema } from '../utils/schema';
import { FormInput } from '../types';
import convertToBase64 from '../utils/convertToBase64';
import { RootState } from '../store/store';
import * as yup from 'yup';

interface IFormErrors {
  name: string;
  age: string;
  email: string;
  password: string;
  password2: string;
  gender: string;
  country: string;
  accept: string;
  image: string;
}

function Form() {
  const COUNTRIES = useSelector((state: RootState) => state.countries);
  const inputRefName = useRef<HTMLInputElement>(null);
  const inputRefAge = useRef<HTMLInputElement>(null);
  const inputRefEmail = useRef<HTMLInputElement>(null);
  const inputRefPass = useRef<HTMLInputElement>(null);
  const inputRefPass2 = useRef<HTMLInputElement>(null);
  const inputRefSex = useRef<HTMLSelectElement>(null);
  const inputRefAccept = useRef<HTMLInputElement>(null);
  const inputRefImg = useRef<HTMLInputElement>(null);
  const inputRefCountry = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<IFormErrors>({
    name: '',
    age: '',
    email: '',
    password: '',
    password2: '',
    gender: '',
    country: '',
    accept: '',
    image: '',
  });
  const [filteredCountries, setFilteredCountries] = useState(COUNTRIES);
  const [isSelecting, setIsSelecting] = useState(false);

  const handleChange = () => {
    if (inputRefCountry.current) {
      const value = inputRefCountry.current.value;
      setIsSelecting(true);

      const filtered = COUNTRIES.filter((country) =>
        country.toLowerCase().startsWith(value.toLowerCase())
      );
      setFilteredCountries(filtered);
    }
  };

  const handleSelect = (country: string) => {
    if (inputRefCountry.current) {
      inputRefCountry.current.value = country;
    }
    setIsSelecting(false);
    setFilteredCountries(COUNTRIES);
  };

  const onSubmit = async () => {
    const formData = {
      name: inputRefName.current!.value || '',
      age: inputRefAge.current!.value || '',
      email: inputRefEmail.current!.value || '',
      password: inputRefPass.current!.value || '',
      password2: inputRefPass2.current!.value || '',
      gender: inputRefSex.current!.value || '',
      country: inputRefCountry.current!.value || '',
      accept: inputRefAccept.current!.checked || false,
      image: inputRefImg.current!.files || [],
    };

    try {
      await createSchema(COUNTRIES).validate(formData, { abortEarly: false });
      let convertedImage;
      if (formData.image)
        convertedImage = await convertToBase64(formData.image[0]);
      dispatch(setData({ ...formData, image: convertedImage }));
      setErrors({
        name: '',
        age: '',
        email: '',
        password: '',
        password2: '',
        gender: '',
        country: '',
        accept: '',
        image: '',
      });
      navigate('/');
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const errorMsges: IFormErrors = err.inner.reduce(
          (acc, error) => {
            if (error.path)
              acc[error.path as keyof IFormErrors] = error.message;
            return acc;
          },
          {
            name: '',
            age: '',
            email: '',
            password: '',
            password2: '',
            gender: '',
            accept: '',
            image: '',
            country: '',
          }
        );
        setErrors(errorMsges);
      }
    }
  };
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <div>
          <label htmlFor="name">Name: </label>
          <input id="name" type="text" ref={inputRefName}></input>
          <p className="error-message">{errors.name || ''}</p>
        </div>
        <div>
          <label htmlFor="age">Age: </label>
          <input id="age" type="number" ref={inputRefAge}></input>
          <p className="error-message">{errors.age || ''}</p>
        </div>
        <div>
          <label htmlFor="email">E-mail: </label>
          <input id="email" type="email" ref={inputRefEmail}></input>
          <p className="error-message">{errors.email || ''}</p>
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input id="password" type="password" ref={inputRefPass}></input>
          <p className="error-message">{errors.password || ''}</p>
        </div>
        <div>
          <label htmlFor="password2">Confirm Password: </label>
          <input id="password2" type="password" ref={inputRefPass2}></input>
          <p className="error-message">{errors.password2 || ''}</p>
        </div>
        <div>
          <label htmlFor="gender">Gender: </label>
          <select id="gender" ref={inputRefSex}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <p className="error-message">{errors.gender || ''}</p>
        </div>
        <div>
          <label htmlFor="country">Country: </label>
          <input
            id="country"
            type="text"
            autoComplete="off"
            onChange={handleChange}
            ref={inputRefCountry}
          />
          {isSelecting && (
            <ul className="country-list">
              {filteredCountries.map((country) => (
                <li
                  className="country-list"
                  key={country}
                  onClick={() => handleSelect(country)}
                >
                  {country}
                </li>
              ))}
            </ul>
          )}
          <p className="error-message">{errors.country || ''}</p>
        </div>
        <div>
          <label htmlFor="accept">accept T&C </label>
          <input id="accept" type="checkbox" ref={inputRefAccept}></input>
          <p className="error-message">{errors.accept || ''}</p>
        </div>
        <div>
          <input
            type="file"
            ref={inputRefImg}
            accept="image/png, image/jpeg"
          ></input>
          <p className="error-message">{errors.image || ''}</p>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Form;
