export function formatRequestQuery<TModel>(model: TModel) {
  const parameters: string[] = [];

  Object.keys(model).forEach((key) => {
    if (model[key]) {
      if (Array.isArray(model[key])) {
        parameters.push(model[key].map((x) => `${key}=${x}`));
      } else {
        parameters.push(`${key}=${model[key]}`);
      }
    }
  });

  return parameters.join('&');
}
