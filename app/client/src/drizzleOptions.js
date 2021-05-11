import { Drizzle } from "@drizzle/store";

import EventMain from "./contracts/EventMain.json";

const options = {
  contracts: [EventMain],
};
const drizzle = new Drizzle(options);
