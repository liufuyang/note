# Red-Black BSTs

[Link](https://d3c33hcgiwev3.cloudfront.net/_806d02702c594a8d442f4e96711a454c_33BalancedSearchTrees.pdf?Expires=1644278400&Signature=a~f3tXIlpYFHCxqV6MFHIrtUJlxzyYLA7lxA~02nPxRVxw~wbMjYEXMgjbrGe9OfcwCFWV033Qto9qAYGC1nHjJzcniKiR6B~tdex8AbwljcxrufwnXHnTFSGQRrPI9Ntykw8JWCbteGKmIZJ3V5TDzMeCtQqOERSYpYEsyfxVQ_&Key-Pair-Id=APKAJLTNE6QMUY6HBC5A) to course presentations.

BTS - binary search tree is a very good data structure
that has fast insert and search property. One key point
in making a BST to work well for any cases is to keep
the tree balanced, or to keep the height of tree as 
low as possible. This is achieved via algorithms such
as `2-3 tree` and `Red-Black tree` (which is a different
representation of 2-3 tree).

## 2-3 tree
Allow 1 or 2 keys per node. 
* 2-node: one key, two children.
* 3-node: two keys, three children.
* 4-node: a special temporary condition, 4 children, only exist
for a short time while inserting

> Guaranteed logarithmic performance for search and insert,
> worst case: \\(height \leq c log_{2}(n) \\)

<img width="400" src="https://user-images.githubusercontent.com/161689/152679142-1ec460d7-ac7b-40ed-ad2e-99bbffa467b9.png"/>

Insertion into a 3-node at bottom.
- Add new key to 3-node to create temporary 4-node.
- Move middle key in 4-node into parent.
- Repeat up the tree, as necessary. 
- If you reach the root and it's a 4-node, split it into three 2-nodes.

<img width="600" src="https://user-images.githubusercontent.com/161689/152679344-db35d723-277d-4082-b920-f42c7cd212cb.png"/>

## Left-leaning red-black BSTs (Guibas-Sedgewick 1979 and Sedgewick 2007)
Idea: ensure that hight always O(log N) (best possible)

<img width="600" src="https://user-images.githubusercontent.com/161689/152679596-37d0522d-a4ef-4fac-80e1-24e521a608de.png"/>

A Red-Black BST that has rules:
- each node `red` or `black`
- root is always black
- no red nodes in a row
  - red node => only black children
- every root-Null path (like in an unsuccessful search) has the same number of black nodes
- red links lean left

>> Left-leaning red-black BSTs: 1-1 correspondence with 2-3 trees

>> Hight Guarantee: if it is a red-black tree with n nodes,
then it has \\(height \leq 2 log_{2}(n + 1) \\)

<img width="600" src="https://user-images.githubusercontent.com/161689/152679725-09e13abf-7e23-4add-9115-da159026c59d.png"/>

>> Every root to leaf path has the same number of black nodes

<iframe width="640" height="360"
src="https://www.youtube.com/embed/YPnFn-LOPLY"
frameborder="0" allow="accelerometer; autoplay; clipboard-write;
encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
</iframe>

Sedgewick's friend wrote him a late night email
telling him in this show they actually got the line
for Red-Black tree correct. 
(And I don't think that helps with the ladies :) )

<details>
  <summary>Click to see scripts...</summary>
  <img width="600" src="https://user-images.githubusercontent.com/161689/152861051-1ca05eb1-17b6-4b12-bc73-1f19949c446a.png" />
</details>

## Achieved by 3 basic operations

- Left Rotation
- Right Rotation
- Flip Colors

<img width="600" src="https://user-images.githubusercontent.com/161689/152679888-dcb6aa7b-1eaa-412c-8fba-9fe60b2e07ff.png"/>
<img width="600" src="https://user-images.githubusercontent.com/161689/152679920-8546ea77-4396-4e63-ab8f-8dc90110975b.png"/>
