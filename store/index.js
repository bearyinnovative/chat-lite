import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import {
  namespace as chatLibNamespace,
  createReducer as createChatLibReducer,
  replaceIMState,
} from "@didi/chat-lib/dist/redux";
import { im } from "../im";

export const store = configureStore({
  reducer: {
    [chatLibNamespace]: createChatLibReducer(im.stateful.getState()),
  },
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [replaceIMState.type],
      ignoredPaths: [chatLibNamespace]
    }
  })
});

im.stateful.subscribe((state, changed) => {
  store.dispatch(
    replaceIMState(
      changed.map((changed) => changed.type),
      state
    )
  );
});
