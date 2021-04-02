export interface Action<Type = any> {
  type: Type;
  payload?: any;
}

interface ActionTypes {
  [key: string]: string;
}

interface ReducerPayload {
  [key: string]: string[];
}

// Return a object with actions to be called from dispatch.
export const createActions = <ActionPayload>(
  actionTypes: ActionTypes,
  reducerPayload: ReducerPayload,
): ActionPayload => {
  const actions: any = {};

  Object.entries(actionTypes).forEach(([key, value]) => {
    actions[key] = (...args: any[]) => {
      const propsArray: string[] = reducerPayload[key];

      const result = {
        type: value,
        payload: {},
      };

      if (propsArray) {
        propsArray?.forEach((val, index) => {
          result.payload = { ...result.payload, [val]: args[index] };
        });
      }

      return result;
    };
  });

  return actions;
};
