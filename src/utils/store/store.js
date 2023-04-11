import { createStore } from 'redux';
import { ADD_NODE, EDIT_NODE, DELETE_NODE } from './actions';
import { jsonData } from '../constants/jsonData';

const initialState = jsonData;

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NODE: {
      const newNodeId = state.nodes.reduce((maxId, node) => Math.max(maxId, node.id), 0) + 1;
      const newNode = {
        id: newNodeId,
        name: `Node ${newNodeId}`,
        parent_node: action.parentId,
      };
      return { nodes: [...state.nodes, newNode] };
    }

    case EDIT_NODE: {
      return {
        nodes: state.nodes.map((node) =>
          node.id === action.nodeId ? { ...node, name: action.newName } : node
        ),
      };
    }

    case DELETE_NODE: {
      const deleteNodesRecursive = (nodes, id) => {
        const childNodes = nodes.filter((node) => node.parent_node === id).map((node) => node.id);
        childNodes.forEach((childId) => deleteNodesRecursive(nodes, childId));
        return nodes.filter((node) => node.id !== id);
      };

      return { nodes: deleteNodesRecursive(state.nodes, action.nodeId) };
    }

    default:
      return state;
  }
};


const store = createStore(reducer);

export default store;
