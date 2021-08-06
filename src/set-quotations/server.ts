import { initializeApp } from './app';

initializeApp().listen(process.env.PORT, () => {
  console.info(`Service is running on port ${process.env.PORT}`);
});
