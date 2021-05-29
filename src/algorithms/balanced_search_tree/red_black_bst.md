# Red-Black BSTs

Idea: ensure that hight always O(log N) (best possible)

4 rules:
- each node `red` or `black`
- root is always black
- no red nodes in a row
  - red node => only black children
- every root-Null path (like in a unsuccessful search) has same number of black nodes

Hight Guarantee: if it is a red-black tree with n nodes,
then it has \\(height \leq 2 log_{2}(n + 1) \\)

## Rotations

- Left Rotation
- Right Rotation
