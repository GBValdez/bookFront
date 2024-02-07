export const fixedQueryParams = (params: any) => {
  let paramsFinal: any = {};
  for (let key in params) {
    if (
      params[key] !== '' &&
      params[key] !== null &&
      params[key] !== undefined
    ) {
      if (params[key] instanceof Date) {
        paramsFinal[key] = params[key].toISOString();
      } else if (Array.isArray(params[key])) {
        const array: any[] = params[key];
        paramsFinal[key] = array.join(',');
      } else paramsFinal[key] = params[key];
    }
  }
  return paramsFinal;
};
