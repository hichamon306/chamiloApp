// @flow
export const getCourseList = (state: any) => state.courses.courseList;
export const getSessionList = (state: any) => {
  if (state.courses.sessionList[0]) {
    return state.courses.sessionList[0].sessions;
  }
  return [];
};
