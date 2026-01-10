const dRow = [-1, 0, 1, 0];
const dCol = [0, 1, 0, -1];

function isValid(vis, row, col, n, m) {
  if (row < 0 || col < 0 || row >= n || col >= m) return false;
  if (vis[row][col]) return false;
  return true;
}

export function BFS(grid, src, dest) {
  const visited=[];
  const n = grid.length;
  const m = grid[0].length;
  const queue = [];
  const vis = Array.from({ length: n }, () => Array(m).fill(false));
  const [row, col] = src;
  const [row2, col2] = dest;
  const path = Array.from({ length: n }, () => Array(m).fill(null));

  queue.push([row, col]);
  vis[row][col] = true;

  while (queue.length) {
    const [x, y] = queue.shift();
    visited.push([x,y]);
    if (x === row2 && y === col2) {
      return visited;
    }

    for (let i = 0; i < 4; i++) {
      const adjx = x + dRow[i];
      const adjy = y + dCol[i];

      if (isValid(vis, adjx, adjy, n, m)) {
        if (grid[adjx][adjy].iswall) continue;
        queue.push([adjx, adjy]);
        vis[adjx][adjy] = true;
        path[adjx][adjy] = [x, y];
      }
    }
  }

  return []; 
}


export function dijkstra(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  startNode.dist = 0;
  let unvisitedNodes = getAllNodes(grid);
  while (unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();
    if (closestNode.iswall) continue;
    if (closestNode.dist === Infinity) return visitedNodesInOrder;
    closestNode.isvisited = true;
    visitedNodesInOrder.push(closestNode);
    if (closestNode === finishNode) return visitedNodesInOrder;
    updateUnvisitedNeighbors(closestNode, grid);
  }
  return [];
}

function sortNodesByDistance(unvisitedNodes) {
  return unvisitedNodes.sort((nodeA, nodeB) => nodeA.dist - nodeB.dist);
}

function updateUnvisitedNeighbors(node, grid) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.dist = node.dist + 1;
    neighbor.prev= node;
  }
}

function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const {col, row} = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter(neighbor => !neighbor.isvisited);
}

function getAllNodes(grid) {
  const nodes = [];
  for (const rows of grid) {
    for (const node of rows) {
      nodes.push(node);
    }
  }
  return nodes;
}

export function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.prev;
  }
  return nodesInShortestPathOrder;
}