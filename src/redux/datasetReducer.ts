import { SET_ITEM_TO_DATASET_REDUCER } from "./constants";
import initialState from "./initialState";

const itemToDataset = (state: any, action: any) => {
  let { data, dataset_name, options = { key: "" } } = action;

  if (!dataset_name) throw "dataset_name is required";

  if (!!options["key"]) state[dataset_name][options.key] = data;
  else state[dataset_name] = data;

  state = { ...state };
  if (action?.["options"]?.["debug"])
    console.log("REDUCERS - itemToDataset ===> ", { data, state });
  return state;
};

const itemToDatasetList = (state: any, action: any) => {
  let { data, dataset_name } = action;
  if (!Array.isArray(data)) data = [data];

  for (let item of data)
    if (!!item["id"]) {
      if (!state[dataset_name]) state[dataset_name] = {};
      state[dataset_name][item.id] = item;
    }
  if (action?.["options"]?.["debug"])
    console.log("REDUCERS - itemToDatasetList ===> ", { data, state });
  state = { ...state };

  return state;
};

const multipleItemsToDataset = (state: any, action: any) => {
  for (let act of action["actions"]) state = datasetHandler(state, act);
  return state;
};

const datasetHandler = (state: any, action: any) => {
  if (action?.["options"]?.["debug"])
    console.log("REDUCERS - datasetHandler ===> ", { action });

  let {
    type = "single",
    multiple = false,
    replace_list = false,
  } = action["options"];

  if (multiple) state = multipleItemsToDataset(state, action);
  else if (type === "list") state = itemToDatasetList(state, action);
  else if (type === "single") state = itemToDataset(state, action);

  return state;
};

let datasetReducer = (state = initialState, action: any) => {
  if (action?.["options"]?.["debug"])
    console.log("REDUCERS - datasetReducer ===> ", { action });

  switch (action.type) {
    case SET_ITEM_TO_DATASET_REDUCER:
      state = datasetHandler(state, action);
      break;
  }
  return state;
};
export default datasetReducer;
