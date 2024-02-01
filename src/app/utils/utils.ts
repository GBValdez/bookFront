export const fixedQueryParams = (params: any) => {
  let paramsFinal: any = {};
  for (let key in params) {
    if (
      params[key] !== '' &&
      params[key] !== null &&
      params[key] !== undefined
    ) {
      paramsFinal[key] = params[key];
    }
  }
  return paramsFinal;
};
