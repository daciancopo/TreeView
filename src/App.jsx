import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addNode, editNode, deleteNode } from "./utils/store/actions";
import { jsonData } from './utils/constants/jsonData';
import TreeView from './components/organisms/TreeView/TreeView';
import Modal from './components/molecules/Modal/Modal';
import './App.css'

function App() {

  const [data, setData] = useState(jsonData);
  const [newName, setNewName] = useState("")
  const [modalState, setModalState] = useState({
    isOpen: false,
    title: '',
    action: null,
    selectedNodeId: null,
  });

  // Count children nodes to be displayed on the parent node
  const countChildren = (nodeId) => {
    const directChildren = data.nodes.filter((node) => node.parent_node === nodeId);
    const childrenCount = directChildren.reduce(
      (count, child) => count + countChildren(data.nodes, child.id),
      directChildren.length
    );
    return childrenCount;
  };

  // Handle Add, Edit and Delete Modal View and Submit functionalities
  const handleAdd = (parentId) => {
    setModalState({
      isOpen: true,
      title: 'Add Node',
      action: 'add',
      selectedNodeId: parentId,
    });
  };

  const handleEdit = (nodeId) => {
    setModalState({
      isOpen: true,
      title: 'Edit Node',
      action: 'edit',
      selectedNodeId: nodeId,
    });
  };

  const handleDelete = (nodeId) => {
    setModalState({
      isOpen: true,
      title: 'Delete Node',
      action: 'delete',
      selectedNodeId: nodeId,
    });
  };

  const handleModalSubmit = () => {
    modalState.action === 'add' && handleAddAction(modalState.selectedNodeId);
    modalState.action === 'edit' && handleEditAction(modalState.selectedNodeId);
    modalState.action === 'delete' && handleDeleteAction(modalState.selectedNodeId);
    closeModal();
  }

  const closeModal = () => {
    setModalState({ ...modalState, isOpen: false });
  };

  // Handle Add, Edit and Delete functionalities

  const handleAddAction = (parentId) => {
    const newNodeId = data.nodes.reduce((maxId, node) => Math.max(maxId, node.id), 0) + 1;
    const newNode = {
      id: newNodeId,
      name: `Node ${newNodeId}`,
      parent_node: parentId,
    };
    setData({ nodes: [...data.nodes, newNode] });
  };
  
  const handleEditAction = (nodeId) => {
      setData({
        nodes: data.nodes.map((node) => (node.id === nodeId ? { ...node, name: newName } : node)),
      });
  };

  const handleDeleteAction = (nodeId) => {
    const deleteNodesRecursive = (id) => {
      const childNodes = data.nodes.filter((node) => node.parent_node === id).map((node) => node.id);
      childNodes.forEach(deleteNodesRecursive);
      setData((prevState) => ({ nodes: prevState.nodes.filter((node) => node.id !== id) }));
    };

    deleteNodesRecursive(nodeId);
  };

  return (
    <div className="App">
      <TreeView
        nodes={data.nodes}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        countChildren={countChildren}
      />
      <Modal
        isOpen={modalState.isOpen}
        title={modalState.title}
        onClose={closeModal}
        onSubmit={handleModalSubmit}
        >
        {modalState.action === 'add' && <p className='action-text'>Add a new node as a child of {data.nodes.find((node) => node.id === modalState.selectedNodeId)?.name} ( node {modalState.selectedNodeId} )</p>}
        {modalState.action === 'edit' && (
          <div className='action-edit'>
            <p className='action-text'>Edit the name of node {modalState.selectedNodeId}:</p>
            <input className='action-input' type="text" defaultValue={data.nodes.find((node) => node.id === modalState.selectedNodeId)?.name} onChange={(e) => setNewName(e.target.value)} />
          </div>
        )}
        {modalState.action === 'delete' && (
          <p className='action-text'>
            Are you sure you want to delete {data.nodes.find((node) => node.id === modalState.selectedNodeId)?.name} ( node {modalState.selectedNodeId} ) and all its children nodes?
          </p>
        )}
      </Modal>
    </div>
  );
}

export default App
