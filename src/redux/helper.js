import { boundsMargin } from '../engines/bounds';

export const findMountedId = binders => {
  const firstMounted = findMounted(binders);
  return firstMounted ? firstMounted.id : undefined;
};

export const findMounted = binders => binders.find(binder => binder.mounted);

export const findBinder = (binders, binderId) =>
  binders.find(binder => binder.id === binderId);

export const updateBinder = (binders, binder) => {
  const index = binders.findIndex(s => s.id === binder.id);
  Object.assign(binders[index], binder);
  return binders;
};

export const computeAddingBinder = (binders, binder) => {
  const freshBinders = addBinder(binders, binder);
  return binder.active
    ? computeMountBinder(freshBinders, binder)
    : freshBinders;
};

export const addBinder = (binders, binder) => [
  ...binders,
  { ...binder, sleep: false },
];

export const computeMountBinder = (binders, binder) =>
  isBinderShouldMount(binders, binder)
    ? mountBinder(binders, binder.id)
    : unsleepBinder(binders, binder.id);

export const isBinderShouldMount = (binders, binder) => {
  const mountedBinder = findMounted(binders);
  return !mountedBinder || binder.priority >= mountedBinder.priority;
};

export const mountBinder = (binders, binderId) =>
  binders.map(binder => {
    const formatedBinder = {
      ...binder,
      mounted: binder.id === binderId,
    };
    if (binder.id === binderId) {
      formatedBinder.mountedTime = Date.now();
      formatedBinder.sleep = false;
    }
    return formatedBinder;
  });

export const unsleepBinder = (binders, binderId) =>
  binders.map(
    binder =>
      !binder.memory
        ? binder
        : {
            ...binder,
            sleep: binder.id === binderId ? false : binder.sleep,
          }
  );

export const computeResetBinder = (
  originalState,
  binderId,
  wishedId,
  forced
) => {
  const { elements, selectedId } = originalState;
  if (elements.length === 0) return;
  const newSelectedId = wishedId || elements[0].id;
  const bounds = boundsMargin(
    newSelectedId,
    originalState,
    {
      visibilityOffset: 0,
    },
    forced
  );
  return {
    id: binderId,
    selectedId: newSelectedId,
    hasMoved: true,
    prevEl: elements.find(e => e.id === selectedId),
    nextEl: elements.find(e => e.id === newSelectedId),
    prevDir: null,
    elements: bounds.elements,
    marginLeft: bounds.marginLeft,
    marginTop: bounds.marginTop,
  };
};

export const computeRemoveBinder = (binders, binderId, force) => {
  const freshBinders = removeBinder(binders, binderId, force);
  return !hasMountedBinder(freshBinders)
    ? mountfreshestBinder(freshBinders)
    : freshBinders;
};

export const removeBinder = (binders, binderId, force = false) => {
  const binder = binders.find(binder => binder.id === binderId);
  if (binder && (force || !binder.memory)) {
    return binders.filter(binder => binder.id !== binderId);
  }
  return binders.map(binder => ({
    ...binder,
    mounted: binder.id === binderId ? false : binder.mounted,
    sleep: binder.id === binderId ? true : binder.sleep,
  }));
};

export const hasMountedBinder = binders =>
  binders.some(binder => binder.mounted);

export const mountfreshestBinder = binders => {
  const awakenBinders = binders.filter(binder => !binder.sleep);
  if (awakenBinders.length === 0) return binders;
  const onceMountedBinders = awakenBinders.filter(binder => binder.mountedTime);
  const freshestBinder =
    onceMountedBinders.length === 0
      ? awakenBinders.reduce(
          (prev, current) =>
            prev.priority > current.priority ? prev : current,
          awakenBinders[0]
        )
      : onceMountedBinders.reduce(
          (prev, current) =>
            prev.mountedTime > current.mountedTime ? prev : current,
          onceMountedBinders[0]
        );
  freshestBinder.mounted = true;
  return mountBinder(binders, freshestBinder.id);
};

export const buildCurrent = (binders, current) => {
  const mountedbinder = findMounted(binders);
  return {
    binderId: mountedbinder ? mountedbinder.id : current.binderId,
    selectedId: mountedbinder ? mountedbinder.selectedId : current.selectedId,
  };
};

export const buildBinderFromProps = (props, type) => ({
  id: props.id,
  active: props.active,
  type,
  selector: props.selector,
  gap: props.gap,
  boundedGap: props.boundedGap,
  topGap: props.topGap,
  rightGap: props.rightGap,
  leftGap: props.leftGap,
  downGap: props.downGap,
  strategy: props.strategy,
  memory: props.memory,
  position: props.position,
  priority: props.priority,
  prevDir: props.prevDir,
  elements: [],
  hasMoved: false,
  marginLeft: 0,
  marginTop: 0,
});

export const buildCarsouelFromProps = (props, type) => ({
  id: props.id,
  type,
  active: props.active,
  circular: props.circular,
  size: props.size,
  index: props.index,
  memory: props.memory,
  priority: props.priority,
  elements: [],
});
