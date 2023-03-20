export const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
export const findUserIndex = (player, store) => store.usersState.findIndex((current) => current.id === player);
export const findUser = (player, store) => store.usersState.find((current) => current.id === player);



