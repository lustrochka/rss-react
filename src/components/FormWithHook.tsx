import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { setData2 } from '../store/slices/Form2Slice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

interface FormInput {
  name: string;
  age: number;
  email: string;
  password: string;
  password2: string;
  accept: boolean;
  image: FileList;
  gender: string;
}

const schema = yup.object({
  name: yup
    .string()
    .required('Name is a required field')
    .matches(/(?=.*[A-Z])/, 'Must have at least one uppercase letter'),
  age: yup
    .number()
    .required('Age is a required field')
    .typeError('Must be a number')
    .test('Is positive?', 'Invalid age', (value) => value > 0),
  email: yup
    .string()
    .required('E-mail is a required field')
    .matches(/\S+@\S+\.([A-Za-z]{2,4})$/, 'Invalid e-mail'),
  password: yup
    .string()
    .required('Password is a required field')
    .matches(
      /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])/,
      'Must have digit, special character, lowercase letter, uppercase letter'
    ),
  password2: yup
    .string()
    .required('Password is a required field')
    .oneOf([yup.ref('password')], "Passwords don't match"),
  accept: yup
    .boolean()
    .required()
    .oneOf([true], 'You must accept the terms and conditions'),
  gender: yup.string().required(),
  image: yup
    .mixed<FileList>()
    .required('This is required field')
    .test('type', 'Must be jpeg or png', (value) => {
      return (
        value &&
        ((value as FileList)[0].type === 'image/jpeg' ||
          (value as FileList)[0].type === 'image/png')
      );
    })
    .test('Size', 'Must be less 2 Mb', (value) => {
      return value && (value as FileList)[0].size < 2097152;
    }),
});

function FormWithHook() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<FormInput>({
    resolver: yupResolver<FormInput>(schema),
    mode: 'onChange',
  });

  function convertToBase64(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

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
