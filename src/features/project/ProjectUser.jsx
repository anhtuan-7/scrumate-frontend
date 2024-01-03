import { Button, Input, Spinner, Typography } from '@material-tailwind/react';
import { useState } from 'react';
import { FiSearch, FiUserPlus } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { useOutletContext } from 'react-router-dom';

import Pagination from '../../components/Pagination';
import Table from '../../components/Table';
import formatISODate from '../../utils/dateFormat';
import ProjectUserAddForm from './ProjectUserAddForm';
import ProjectUserRole from './ProjectUserRole';
import { useGetProjectUserListQuery } from './projectUserApi';

const ProjectUser = () => {
  const { user } = useSelector((state) => state.status);
  const project = useOutletContext();
  const [page, setPage] = useState(1);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const {
    data: response,
    isFetching,
    error,
  } = useGetProjectUserListQuery({
    projectId: project.id,
    page,
  });

  const clickHandler = () => setShowCreateForm(!showCreateForm);

  let content;
  if (isFetching)
    content = <Spinner className="inline-block h-8 w-8" color="blue" />;
  else if (error) console.log(error);
  else if (response) {
    const { members } = response.data;

    const tableConfig = [
      {
        label: 'Name',
        render: (member) => (
          <Typography variant="small" color="blue-gray" className="font-normal">
            {member.name}
          </Typography>
        ),
      },
      {
        label: 'Email',
        render: (member) => (
          <Typography variant="small" color="blue-gray" className="font-normal">
            {member.email}
          </Typography>
        ),
      },
      {
        label: 'Role',
        render: (member) => {
          const disable =
            member.id === user.id ||
            project.projectUser.role !== 'scrum-master';
          return <ProjectUserRole member={member} disable={disable} />;
        },
      },
      {
        label: 'Joined at',
        render: (member) => (
          <Typography variant="small" color="blue-gray" className="font-normal">
            {formatISODate(member.project.joinedAt)}
          </Typography>
        ),
      },
      {
        label: 'Last accessed',
        render: (member) => (
          <Typography variant="small" color="blue-gray" className="font-normal">
            {formatISODate(member.project.lastAccessed)}
          </Typography>
        ),
      },
    ];

    content = (
      <div className="flex flex-col items-center gap-9">
        <Table config={tableConfig} data={members} />
        <Pagination
          currentPage={page}
          setCurrentPage={setPage}
          lastPage={Math.ceil(response.total / 10)}
        />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-6 flex items-center justify-between">
        <ProjectUserAddForm
          open={showCreateForm}
          handler={clickHandler}
          project={project}
        />
        <div>
          <Input color="blue" label="Search" icon={<FiSearch />} />
        </div>
        <Button
          color="blue"
          className="flex w-36 items-center justify-center gap-2 p-3"
          onClick={clickHandler}
        >
          <FiUserPlus className="text-lg" />
          New Member
        </Button>
      </div>
      <div>{content}</div>
    </div>
  );
};

export default ProjectUser;
