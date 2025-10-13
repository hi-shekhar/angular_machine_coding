export type TaskStatus = 'Pending' | 'InProgress' | 'Completed';

export interface Project {
  id: string;
  name: string;
  status: TaskStatus;
}

export const projects: Project[] = [
  {
    id: 'infinite-scroll',
    name: 'Infinite Scroll',
    status: 'Completed',
  },
  {
    id: 'otp-input',
    name: 'OTP Input',
    status: 'Completed',
  },
  {
    id: 'star-rating',
    name: 'Star Rating',
    status: 'Completed',
  },
  {
    id: 'file-explorer',
    name: 'File Explorer',
    status: 'Completed',
  },
  {
    id: 'loader',
    name: 'Loader',
    status: 'Completed',
  },
  {
    id: 'typeahead',
    name: 'Typeahead',
    status: 'Completed',
  },
  {
    id: 'stopwatch',
    name: 'Stop Watch',
    status: 'Completed',
  },
  {
    id: 'reactive-form',
    name: 'Reactive Form',
    status: 'Completed',
  },
  {
    id: 'dynamic',
    name: 'Dynamic Component',
    status: 'Completed',
  },
  {
    id: 'ng-template',
    name: 'NgTemplate',
    status: 'Completed',
  },
  {
    id: 'accordion',
    name: 'Accordion',
    status: 'Pending',
  },
  {
    id: 'tic-tac-toe',
    name: 'Tic-Tac-Toe',
    status: 'Pending',
  },
];
