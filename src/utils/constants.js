const BASE_URL = 'http://localhost:8080/api/v1';

const issueTypeOptions = [
  { value: 'bug', label: 'Bug' },
  { value: 'task', label: 'Task' },
  { value: 'story', label: 'Story' },
];

const issueStatusOptions = [
  { value: 'to-do', label: 'To do' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'done', label: 'Done' },
];

const issuePriorityOptions = [
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
  { value: 'best-effort', label: 'Best Effort' },
];

const groupUserRoleOptions = [
  { value: 'member', label: 'Member' },
  { value: 'project-admin', label: 'Project Admin' },
  { value: 'group-admin', label: 'Group Admin' },
  { value: 'inactive', label: 'Inactive' },
];

export {
  BASE_URL,
  issueStatusOptions,
  issueTypeOptions,
  issuePriorityOptions,
  groupUserRoleOptions,
};
