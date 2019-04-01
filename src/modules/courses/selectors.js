// @flow
export const getCourseList = (state: any) => state.courses.courseList;
export const getSessionList = (state: any) => {
  if (state.courses.sessionList[0]) {
    return state.courses.sessionList[0].sessions;
  }
  return [];
};

export const getSessionCount = (state: any) => {
  const sessionList = getSessionList(state);
  return sessionList.length;
};

export const getCourseCount = (state: any) => {
  const courseList = getCourseList(state);
  return courseList.length;
};
