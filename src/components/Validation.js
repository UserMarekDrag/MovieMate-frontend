export const validateRegister = (username, email, password, confirmPassword, acceptTerms) => {
  let newErrors = {};

  // username validation
  if (!username) newErrors.username = 'Username is required.';

  // email validation
  if (!email) newErrors.email = 'Email is required.';
  else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is not valid.';

  // password validation
  if (!password) newErrors.password = 'Password is required.';
  else if (password.length < 8) newErrors.password = 'Password should be at least 8 characters long.';

  // confirmPassword validation
  if (password !== confirmPassword) newErrors.confirmPassword = 'The passwords do not match.';

  // acceptTerms validation
  if (!acceptTerms) newErrors.acceptTerms = 'You must accept the terms and conditions.';


  // if newErrors is empty return null, else return errors
  return Object.keys(newErrors).length === 0 ? null : newErrors;
};
