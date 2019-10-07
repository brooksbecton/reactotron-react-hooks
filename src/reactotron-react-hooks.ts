import { Reactotron } from "reactotron-core-client";

interface IStateValuesSubscribe {
  type: string;
  payload: {
    paths: string[];
    type: string;
  };
}

export function plugin(reactotron: Reactotron) {
  let _state: any = null;
  const COMMAND_MAP: { [name: string]: (command: any) => void } = {
    // When an "Action" occurs.
    "state.action.complete": () => _state,

    // When a backup is requested. This sends the current state.
    // This one might be hard to handle in hooks I suspect.
    "state.backup.response": () => _state,
    "state.values.subscribe": (action: IStateValuesSubscribe) => {
      if (action.payload.paths.length > 0) {
        // const allPathsState = action.payload.paths.reduce(
        //   (results: any, path) => {
        //     const pathState = _state[path] || {};
        //     return results.push({ path, value: pathState});
        //   },
        //   [],
        // );
        // reactotron.stateValuesChange({});
      }
      sendSubscriptions(_state);
    },
  };

  function sendSubscriptions(state: { [key: string]: number }) {
    const subscriptions = Object.keys(state).map(key => ({
      path: key,
      value: state[key],
    }));
    reactotron.stateValuesChange(subscriptions);
  }

  function onCommand(command: any) {
    console.log(command);
    // lookup the command and execute
    const handler = COMMAND_MAP[command && command.type];
    handler && handler(command);
  }

  function trackState(state: any) {
    const elapsed = reactotron.startTimer();

    const ms = elapsed();
    _state = state;
    reactotron.send("state.action.complete", {
      name: "name",
      action: "Change",
      ms: ms,
    });
    sendSubscriptions(_state);
  }

  return {
    // Fires when we receive a command from the Reactotron app.
    onCommand,

    // All keys in this object will be attached to the main Reactotron instance
    // and available to be called directly.
    features: { trackState },
  };
}
