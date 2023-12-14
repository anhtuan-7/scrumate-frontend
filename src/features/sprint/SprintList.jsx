import { Button } from '@material-tailwind/react';

const SprintList = () => {
  const sprints = <div>Sprint List</div>;

  return (
    <div className="w-full">
      <div>
        <Button color="blue" size="sm">
          Create Sprint
        </Button>
      </div>
      {sprints}
    </div>
  );
};
SprintList.propTypes = {};

export default SprintList;
