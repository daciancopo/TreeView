import React from 'react';
import TreeNode from '../../molecules/TreeNode/TreeNode';
import "./TreeView.css"

const createTree = (nodes, parentId, onAdd, onEdit, onDelete, countChildren) => {
  const treeNodes = nodes.filter((node) => node.parent_node === parentId)
  .map((node) => {
    const children = createTree(nodes, node.id, onAdd, onEdit, onDelete, countChildren);
    return (
        <TreeNode
          key={node.id}
          node={node}
          children={children}
          onAdd={onAdd}
          onEdit={onEdit}
          onDelete={onDelete}
          countChildren={countChildren}
          />
    );
  });

  return treeNodes;
};

const TreeView = ({ nodes, onAdd, onEdit, onDelete, countChildren }) => {
  const tree = createTree(nodes, null, onAdd, onEdit, onDelete, countChildren);
  return (
    <div className='tree-view'>
      <div className='tree tree-node'>{tree}</div>
    </div>
  );
};

export default TreeView;
