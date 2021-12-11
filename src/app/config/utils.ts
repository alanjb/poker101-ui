export const getEnv = () => {
  if (process.env.NODE_ENV === 'production') {
    return 'https://ec2-3-88-99-17.compute-1.amazonaws.com';
  } 
  else {
    return 'http://localhost:8000';
  }
}