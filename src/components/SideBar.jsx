import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import {
  HiOutlinePresentationChartBar,
  HiBars3,
  HiInbox,
} from "react-icons/hi2";
import { TfiDashboard } from "react-icons/tfi";
import { PiKanban } from "react-icons/pi";
import { GoGitBranch } from "react-icons/go";

const SideBar = () => {
  return (
    <Card className="h-screen min-w-fit bg-white backdrop-saturate-200 backdrop-blur-2xl bg-opacity-80 rounded-none shadow-none border-r border-gray-300 p-3">
      <List className="grid items-center gap-3">
        <div className="p-3">
          <Typography variant="h5">Hệ thống gì đó có cái tên dài</Typography>
        </div>
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
      </List>
    </Card>
  );
};

export default SideBar;
