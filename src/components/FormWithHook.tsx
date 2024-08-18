import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { setData2 } from '../store/slices/Form2Slice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createSchema } from '../utils/schema';
import convertToBase64 from '../utils/convertToBase64';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { RootState } from '../store/store';
import { FormInput } from '../types';

function FormWithHook() {
  const COUNTRIES = useSelector((state: RootState) => state.countries);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<FormInput>({
    resolver: yupResolver<FormInput>(createSchema(COUNTRIES)),
    mode: 'onChange',
  });
  const [countryInput, setCountryInput] = useState('');
  const [filteredCountries, setFilteredCountries] = useState(COUNTRIES);
  const [isSelecting, setIsSelecting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountryInput(e.target.value);
    setIsSelecting(true);

    const filtered = COUNTRIES.filter((country) =>
      country.toLowerCase().startsWith(e.target.value.toLowerCase())
    );
    setFilteredCountries(filtered);
  };

  const handleSelect = (country: string) => {
    setCountryInput(country);
    setIsSelecting(false);
    setFilteredCountries(COUNTRIES);
  };

  async function onSubmit(data: FormInput) {
    const convertedImage = await convertToBase64(data.image[0]);
    dispatch(setData2({ ...data, image: convertedImage }));
    navigate('/');
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Name: </label>
          <input id="name" type="text" {...register('name')}></input>
          {errors.name && <p>{errors.name.message}</p>}
        </div>
        <div>
          <label>Age: </label>
          <input type="number" {...register('age')}></input>
          {errors.age && <p>{errors.age.message}</p>}
        </div>
        <div>
          <label>E-mail: </label>
          <input type="email" {...register('email')}></input>
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <label>Password: </label>
          <input type="password" {...register('password')}></input>
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <div>
          <label>Confirm Password: </label>
          <input type="password" {...register('password2')}></input>
          {errors.password2 && <p>{errors.password2.message}</p>}
        </div>
        <div>
          <label>Gender: </label>
          <select {...register('gender')}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="country">Country: </label>
          <input
            {...register('country')}
            id="country"
            type="text"
            value={countryInput}
            autoComplete="off"
            onChange={handleChange}
          />
          {isSelecting && (
            <li>
              {filteredCountries.map((country) => (
                <ul key={country} onClick={() => handleSelect(country)}>
                  {country}
                </ul>
              ))}
            </li>
          )}
          {JSON.stringify(errors)}
          {errors.country && <p>{errors.country.message}</p>}
        </div>

        <div>
          <label>accept T&C </label>
          <input type="checkbox" {...register('accept')}></input>
          {errors.accept && <p>{errors.accept.message}</p>}
        </div>
        <div>
          <input type="file" {...register('image')}></input>
          {errors.image && <p>{errors.image.message}</p>}
        </div>

        <button type="submit" disabled={!isValid}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default FormWithHook;
