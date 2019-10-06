declare module "reactotron-core-client" {
  // eslint-disable-next-line import/export
  export interface Reactotron {
    stateValuesChange: (newState: any) => void;
  }
}
