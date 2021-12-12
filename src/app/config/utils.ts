export const getEnv = () => {
  if (process.env.NODE_ENV === 'production') {
    return 'https://swe681game-api.net';
  } 
  else {
    return 'http://localhost:8000';
  }
}