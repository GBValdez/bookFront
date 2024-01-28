export type clickType = string | (() => void);
export interface sideMenuInterface {
  text: string;
  icon: string;
  click?: clickType;
  child?: sideMenuInterface[];
  openChild?: boolean;
  present?: boolean;
  show?: boolean;
}
//int4rfqa
