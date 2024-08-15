import { useRef } from 'react';
import { setData } from '../store/slices/Form1Slice';
import { useDispatch } from 'react-redux';

function Form() {
  const inputRefName = useRef<HTMLInputElement>(null);
  const inputRefAge = useRef<HTMLInputElement>(null);
  const inputRefEmail = useRef<HTMLInputElement>(null);
  const inputRefPass = useRef<HTMLInputElement>(null);
  const inputRefPass2 = useRef<HTMLInputElement>(null);
  const inputRefSex = useRef<HTMLSelectElement>(null);
  const inputRefAccept = useRef<HTMLInputElement>(null);
  const inputRefImg = useRef<HTMLInputElement>(null);
  const inputRefError = useRef<HTMLParagraphElement>(null);
  const dispatch = useDispatch();
  const checkData = () => {
    const validName = /(?=.*[A-Z])/.test(inputRefName.current!.value);
    const age = Number(inputRefAge.current!.value);
    const validEmail = /\S+@\S+\.([A-Za-z]{2,4})$/.test(
      inputRefEmail.current!.value
    );
    const validAge = Number.isFinite(age) && age > 0;
    const validPass = /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])/.test(
      inputRefPass.current!.value
    );
    const matchPass =
      inputRefPass.current!.value == inputRefPass2.current!.value;
    const validTC = inputRefAccept.current!.checked;
    const image = inputRefImg.current!.files;
    const validImg =
      image && image.length > 0 ? image[0].size < 2097152 : false;
    return (
      validName &&
      validEmail &&
      validAge &&
      validPass &&
      matchPass &&
      validTC &&
      validImg
    );
  };
  const onSubmit = () => {
    if (checkData()) {
      inputRefError.current!.textContent = '';
      dispatch(
        setData({
          name: inputRefName.current!.value,
          age: inputRefAge.current!.value,
          email: inputRefEmail.current!.value,
          password: inputRefPass.current!.value,
          gender: inputRefSex.current!.value,
        })
      );
    }
    inputRefError.current!.textContent = 'Invalid data';
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
        </div>
        <div>
          <label htmlFor="age">Age: </label>
          <input id="age" type="number" ref={inputRefAge}></input>
        </div>
        <div>
          <label htmlFor="email">E-mail: </label>
          <input id="email" type="email" ref={inputRefEmail}></input>
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input id="password" type="password" ref={inputRefPass}></input>
        </div>
        <div>
          <label htmlFor="password2">Confirm Password: </label>
          <input id="password2" type="password" ref={inputRefPass2}></input>
        </div>
        <div>
          <label htmlFor="gender">Gender: </label>
          <select id="gender" ref={inputRefSex}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="accept">accept T&C </label>
          <input id="accept" type="checkbox" ref={inputRefAccept}></input>
        </div>
        <div>
          <input
            type="file"
            ref={inputRefImg}
            accept="image/png, image/jpeg"
          ></input>
        </div>
        <button type="submit">Submit</button>
      </form>
      <p ref={inputRefError}></p>
    </div>
  );
}

export default Form;
