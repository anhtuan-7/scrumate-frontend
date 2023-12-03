import { Spinner, Typography } from '@material-tailwind/react';

const LoadingScreen = () => {
  return (
    <div className="mx-auto flex min-h-screen flex-col items-center justify-center">
      <div className="flex items-center gap-3 p-6">
        <Spinner className="inline-block h-8 w-8" color="blue" />
        <Typography variant="h2" color="blue" className="inline-block">
          Just a moment
        </Typography>
      </div>
    </div>
  );
};

export default LoadingScreen;
