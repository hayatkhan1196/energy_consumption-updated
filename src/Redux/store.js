import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./reducers/User";
import navTabReducer from "./reducers/NavTab";
import loginReducer from "./reducers/Login";
import socketSlice from "./reducers/live-tracking/Socket";
import vehiclesSlice from "./reducers/live-tracking/getVehicleStatus";
import deviceSlice from "./reducers/live-tracking/fetchVehicleLocation";
// import geoFenceSlice from "./reducers/geoFence/geoFence";
import devicesReplyHistory from "./reducers/reply-history/fetchDataDevices";
// import updateGeoFenceSlice from "./reducers/geoFence/putGeoFence";
// import addGeoFenceSlice from "./reducers/geoFence/postGeoFence";
import resetPasswordSlice from "./reducers/forgotPassword/forgotPassward";
import energyConsumptionReducer from "./reducers/EnergyConsumption/EnergyConsumption";
import LightControllerReducer from "./reducers/LightController/lightController";
import getLiveLatestReducer from "./reducers/EnergyConsumption/getEnergyConsumptionReducer";
import policyReducer from "./reducers/policyData/policyData";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, navTabReducer);

const rootReducer = combineReducers({
  navTab: persistedReducer,
  user: userReducer,
  auth: loginReducer,
  getVehicle: vehiclesSlice,
  fetchVehicle: deviceSlice,
  socket: socketSlice,
  replyHistoryDevices: devicesReplyHistory,
  // geoFence: geoFenceSlice,
  // updateGeoFenceSlice: updateGeoFenceSlice,
  // addGeoFenceSlice: addGeoFenceSlice,
  resetPassword: resetPasswordSlice,
  energyConsumptionOnOff: energyConsumptionReducer,
  getLiveLatestEnergyData: getLiveLatestReducer,
  lightController: LightControllerReducer,
  policies: policyReducer,
});
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },

    }),
});
