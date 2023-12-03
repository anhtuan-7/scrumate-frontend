import { Typography } from '@material-tailwind/react';
import { Button, Option, Select } from '@material-tailwind/react';
import { Fragment, useState } from 'react';
import { HiOutlinePlusCircle } from 'react-icons/hi2';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Skeleton from '../../components/Skeleton';
import Toast from '../../components/Toast';
import ProjectCreateForm from '../project/ProjectCreateForm';
import { useGetProjectListQuery } from '../project/projectApi';
import ProjectItem from '../project/projectItem';

const GroupProjectList = () => {
  const [sort, setSort] = useState('lastAccessed');
  const { groupId } = useParams();
  const { user } = useSelector((state) => state.status);
  const { data, isFetching, error } = useGetProjectListQuery({
    userId: user.id,
    groupId: groupId,
  });
  const [showCreateForm, setShowCreateForm] = useState(false);

  const clickHandler = () => setShowCreateForm(!showCreateForm);

  let content;
  if (isFetching)
    content = (
      <Fragment>
        <Skeleton times={1} className="h-64 w-full" />
        <Skeleton times={1} className="h-64 w-full" />
        <Skeleton times={1} className="h-64 w-full" />
        <Skeleton times={1} className="h-64 w-full" />
      </Fragment>
    );
  else if (error) {
    Toast.fire({
      icon: 'error',
      title: error.data.message,
    });
  } else if (data) {
    const { projects } = data.data;
    if (projects.length === 0)
      content = (
        <Typography className="col-span-3">
          You are not a member of any projects yet
        </Typography>
      );
    else
      content = projects.map((project) => (
        <ProjectItem key={project.id} project={project} />
      ));
  }

  return (
    <Fragment>
      <ProjectCreateForm
        open={showCreateForm}
        handler={clickHandler}
        groupId={groupId}
      />
      <div className="grid w-full grid-cols-1 gap-4">
        <div className="flex w-full items-center justify-between">
          <div className="mr-6">
            <Select
              variant="outlined"
              label="Sort by"
              value={sort}
              onChange={(value) => {
                setSort(value);
              }}
            >
              <Option value="lastAccessed">Last accessed</Option>
              <Option value="joinedAt">Last joined</Option>
            </Select>
          </div>
          <Button
            color="blue"
            className="flex w-36 items-center justify-center gap-2 p-3"
            onClick={clickHandler}
          >
            <HiOutlinePlusCircle className="text-xl" /> New Project
          </Button>
        </div>
        <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {content}
        </div>
      </div>
    </Fragment>
  );
};

export default GroupProjectList;
