import * as yup from 'yup';

export function createSchema(countries: string[]) {
  return yup.object({
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
    country: yup.string().required().oneOf(countries, 'Select country'),
    image: yup
      .mixed<FileList>()
      .required('This is required field')
      .test('type', 'Must be jpeg or png', (value) => {
        return (
          value &&
          value.length > 0 &&
          ['image/jpeg', 'image/png'].includes(value[0].type)
        );
      })
      .test('Size', 'Must be less 2 Mb', (value) => {
        return (
          value && value.length > 0 && (value as FileList)[0].size < 2097152
        );
      }),
  });
}
