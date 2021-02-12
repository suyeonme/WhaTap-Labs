export const WIDTH: number = 500;
export const HEIGHT: number = 300;

export const updateObject = (
  oldState: object,
  updatedState: object
): object => {
  return {
    ...oldState,
    ...updatedState,
  };
};
