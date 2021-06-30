import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import {
  namespace as chatLibNamespace,
  createReducer as createChatLibReducer,
  replaceIMState,
} from "@dididc/chat-lib/dist/redux";
// import { im } from "../im";

export const store = configureStore({
  reducer: {
    [chatLibNamespace]: createChatLibReducer(),
  },
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [replaceIMState.type],
      ignoredPaths: [chatLibNamespace]
    }
  })
});
