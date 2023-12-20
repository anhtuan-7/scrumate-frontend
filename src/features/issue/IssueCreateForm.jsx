import {
  Card,
  CardBody,
  Chip,
  IconButton,
  Input,
} from '@material-tailwind/react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { GoSync } from 'react-icons/go';
import { IoIosCheckmark, IoMdClose } from 'react-icons/io';
import { PiCodeLight } from 'react-icons/pi';
import { RiDraggable, RiMoreLine } from 'react-icons/ri';

import Toast, { FireErrorToast } from '../../components/Toast';
import { useCreateIssueMutation } from '../issue/issueApi';

const IssueCreateForm = ({ projectId, sprintId, handler }) => {
  const [title, setTitle] = useState(undefined);
  const [createIssue, { isLoading }] = useCreateIssueMutation();

  const handleSubmit = () => {
    createIssue({ projectId, title, sprintId: sprintId || null })
      .unwrap()
      .then(() => {
        Toast.fire({
          icon: 'success',
          title: 'Create New Issue Successfully',
        });
      })
      .catch((error) => FireErrorToast(error))
      .finally(() => {
        handler(false);
      });
  };

  return (
    <Card className="mb-3 rounded-lg border-2 border-blue-200">
      <CardBody className="p-1">
        <div className="grid grid-cols-2 items-center">
          <div className="flex items-center gap-3">
            <RiDraggable className="text-lg" />
            <PiCodeLight className="text-xl text-blue-500" />
            <div className="flex w-full gap-3">
              <Input
                className="!border !border-gray-300"
                labelProps={{ className: 'hidden' }}
                containerProps={{ className: 'h-8' }}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="New Issue"
              />
              <IconButton size="sm" color="blue" onClick={handleSubmit}>
                {isLoading ? (
                  <GoSync className="animate-spin" />
                ) : (
                  <IoIosCheckmark className="text-lg" />
                )}
              </IconButton>
              <IconButton
                size="sm"
                color="blue-gray"
                onClick={() => handler(false)}
              >
                <IoMdClose />
              </IconButton>
            </div>
          </div>
          <div className="flex items-center gap-3 justify-self-end">
            <Chip
              value="Medium"
              size="sm"
              className="bg-yellow-900 text-white"
            />
            <Chip value="To do" color="pink" size="sm" />
            <IconButton variant="text" size="sm" disabled>
              <RiMoreLine className="text-lg" />
            </IconButton>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

IssueCreateForm.propTypes = {
  handler: PropTypes.func.isRequired,
  projectId: PropTypes.number.isRequired,
  sprintId: PropTypes.number,
};

export default IssueCreateForm;
