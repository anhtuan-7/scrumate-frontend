import {
  Chip,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
} from '@material-tailwind/react';
import { GoGitBranch } from 'react-icons/go';
import {
  HiBars3,
  HiInbox,
  HiOutlinePresentationChartBar,
} from 'react-icons/hi2';
import { PiKanban } from 'react-icons/pi';
import { TfiDashboard } from 'react-icons/tfi';

import SideBar from '../../components/Sidebar';

const ProjectSidebar = () => {
  return (
    <SideBar title="Project's name here">
      <ListItem>
        <ListItemPrefix>
          <HiOutlinePresentationChartBar className="h-5 w-5" />
        </ListItemPrefix>
        Product Backlog
      </ListItem>
      <ListItem>
        <ListItemPrefix>
          <HiBars3 className="h-5 w-5" />
        </ListItemPrefix>
        Sprint Backlog
      </ListItem>
      <ListItem>
        <ListItemPrefix>
          <PiKanban className="h-5 w-5" />
        </ListItemPrefix>
        My Kanban
      </ListItem>
      <ListItem>
        <ListItemPrefix>
          <HiInbox className="h-5 w-5" />
        </ListItemPrefix>
        Notification
        <ListItemSuffix>
          <Chip
            value="14"
            size="sm"
            variant="ghost"
            color="blue-gray"
            className="rounded-full"
          />
        </ListItemSuffix>
      </ListItem>
      <ListItem>
        <ListItemPrefix>
          <GoGitBranch className="h-5 w-5" />
        </ListItemPrefix>
        Repository
      </ListItem>
      <ListItem>
        <ListItemPrefix>
          <TfiDashboard className="h-5 w-5" />
        </ListItemPrefix>
        Dashboard
      </ListItem>
    </SideBar>
  );
};

export default ProjectSidebar;
