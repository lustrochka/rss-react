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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<IFormErrors>({
    name: '',
    age: '',
    email: '',
    password: '',
    password2: '',
    gender: '',
    accept: '',
    image: '',
  });

  const onSubmit = async () => {
    const formData = {
      name: inputRefName.current!.value || '',
      age: inputRefAge.current!.value || '',
      email: inputRefEmail.current!.value || '',
      password: inputRefPass.current!.value || '',
      password2: inputRefPass2.current!.value || '',
      gender: inputRefSex.current!.value || '',
      accept: inputRefAccept.current!.checked || false,
      image: inputRefImg.current!.files || [],
    };

    try {
      await createSchema(COUNTRIES).validate(formData, { abortEarly: false });
      let convertedImage;
      if (formData.image)
        convertedImage = await convertToBase64(formData.image[0]);
      dispatch(setData({ ...formData, image: convertedImage }));
      navigate('/');
    } catch (err) {
      console.log(err);
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
          {errors.name && <p>{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="age">Age: </label>
          <input id="age" type="number" ref={inputRefAge}></input>
          {errors.age && <p>{errors.age}</p>}
        </div>
        <div>
          <label htmlFor="email">E-mail: </label>
          <input id="email" type="email" ref={inputRefEmail}></input>
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input id="password" type="password" ref={inputRefPass}></input>
          {errors.password && <p>{errors.password}</p>}
        </div>
        <div>
          <label htmlFor="password2">Confirm Password: </label>
          <input id="password2" type="password" ref={inputRefPass2}></input>
          {errors.password2 && <p>{errors.password2}</p>}
        </div>
        <div>
          <label htmlFor="gender">Gender: </label>
          <select id="gender" ref={inputRefSex}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && <p>{errors.gender}</p>}
        </div>
        <div>
          <label htmlFor="accept">accept T&C </label>
          <input id="accept" type="checkbox" ref={inputRefAccept}></input>
          {errors.accept && <p>{errors.accept}</p>}
        </div>
        <div>
          <input
            type="file"
            ref={inputRefImg}
            accept="image/png, image/jpeg"
          ></input>
          {errors.image && <p>{errors.image}</p>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Form;
