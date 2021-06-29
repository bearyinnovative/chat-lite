import { createStatefulIM } from '@didi/chat-lib/dist/createIM';
import { store } from './store/index';
import { replaceIMState } from '@didi/chat-lib/dist/redux';

export const im = createStatefulIM({
  apiBase: 'http://poc.saas.bearychat.com/',
  haloRegistry: 'http://haloreg.saas.bearychat.com/get_halo_info',
  locale: 'zh-CN',
});

im.stateful.subscribe((state, changed) => {
  store.dispatch(
    replaceIMState(
      changed.map((changed) => changed.type),
      state
    )
  );
});

im.stateful.subscribe((_, changedList) => {
  if (process.env.NODE_ENV === 'development') {
    console.group(`[chat-lib] batched reducers, length ${changedList.length}`);
    for (const changed of changedList) {
      console.log(`${changed.type[0]}.${changed.type[1]}`, changed);
    }
    console.groupEnd();
  }
});
