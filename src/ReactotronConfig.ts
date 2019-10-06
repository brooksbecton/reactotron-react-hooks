import Reactotron from "reactotron-react-js";
import { plugin } from "./reactotron-react-hooks";
Reactotron.configure()
  .use(plugin)
  .connect();
