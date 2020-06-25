const generateAction = (namespace) => ({
  request: `${namespace}/request`,
  success: `${namespace}/success`,
  update: `${namespace}/update`,
  sort: `${namespace}/sort`,
});

export const cards = generateAction('cards');
export const currentPairs = generateAction('currentPairs');
export const allPairs = generateAction('allPairs');
