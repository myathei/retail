// src/utils/index.ts

export function valueUpdater(updaterOrValue: any, state: any) {
    if (typeof updaterOrValue === 'function') {
      state.value = updaterOrValue(state.value);
    } else {
      state.value = updaterOrValue;
    }
  }
  