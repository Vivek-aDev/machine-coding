export const saveBoard = (nodes, edges) => {
  localStorage.setItem("kanban-nodes", JSON.stringify(nodes));
  localStorage.setItem("kanban-edges", JSON.stringify(edges));
};

export const loadBoard = () => {
  const nodes = JSON.parse(localStorage.getItem("kanban-nodes")) || [];
  const edges = JSON.parse(localStorage.getItem("kanban-edges")) || [];
  return { nodes, edges };
};
