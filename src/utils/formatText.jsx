import { Chip } from '@material-tailwind/react';
import { CiBookmarkCheck } from 'react-icons/ci';
import { GiBugNet } from 'react-icons/gi';
import { PiCodeLight } from 'react-icons/pi';

function formatType(type) {
  switch (type) {
    case 'task':
      return <PiCodeLight className="text-xl text-blue-500" />;
    case 'bug':
      return <GiBugNet className="text-xl text-red-500" />;
    case 'story':
      return <CiBookmarkCheck className="text-xl text-green-500" />;
  }
}

function formatStatus(status) {
  switch (status) {
    case 'to-do':
      return <Chip value="To do" color="pink" size="sm" />;
    case 'in-progress':
      return <Chip value="In Progress" color="blue" size="sm" />;
    case 'done':
      return <Chip value="Done" color="teal" size="sm" />;
  }
}

function formatPriority(priority) {
  switch (priority) {
    case 'low':
      return (
        <Chip value="Low" color="blue-gray" size="sm" className="inline" />
      );
    case 'medium':
      return (
        <Chip
          value="Medium"
          size="sm"
          className="inline bg-yellow-900 text-white"
        />
      );
    case 'high':
      return <Chip value="High" color="pink" size="sm" className="inline" />;
    case 'best-effort':
      return (
        <Chip value="Best Effort" color="red" size="sm" className="inline" />
      );
  }
}

export { formatPriority, formatStatus, formatType };
