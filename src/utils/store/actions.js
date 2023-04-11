export const ADD_NODE = 'ADD_NODE';
export const EDIT_NODE = 'EDIT_NODE';
export const DELETE_NODE = 'DELETE_NODE';

export const addNode = (parentId) => ({
  type: ADD_NODE,
  parentId,
});

export const editNode = (nodeId, newName) => ({
  type: EDIT_NODE,
  nodeId,
  newName,
});

export const deleteNode = (nodeId) => ({
  type: DELETE_NODE,
  nodeId,
});
