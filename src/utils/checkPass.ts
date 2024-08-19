export default function checkPass(pass: string) {
  const numberRegex = /\d/;
  const upperCaseRegex = /[A-Z]/;
  const lowerCaseRegex = /[a-z]/;
  const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

  const hasNumber = numberRegex.test(pass);
  const hasUpperCase = upperCaseRegex.test(pass);
  const hasLowerCase = lowerCaseRegex.test(pass);
  const hasSpecialChar = specialCharRegex.test(pass);

  const criteriaNum = [
    hasNumber,
    hasUpperCase,
    hasLowerCase,
    hasSpecialChar,
  ].filter(Boolean).length;

  switch (criteriaNum) {
    case 1:
      return 'Weak';
    case 2:
      return 'Fair';
    case 3:
      return 'Strong';
    case 4:
      return 'Very Strong';
    default:
      return '';
  }
}
