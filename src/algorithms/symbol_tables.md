# Symbol tables

Key-value pair abstraction - Map/Dictionary
- key -> value
- insert
- search/get
- delete

## Binary search tree (BST)
- Each node has a key
- For every key: 
  - Larger than all keys in its left subtree
  - Smaller than all keys in its right subtree

![image](https://user-images.githubusercontent.com/161689/118122782-99947400-b3f3-11eb-8cb6-6d8b44431cf9.png)


![image](https://user-images.githubusercontent.com/161689/118122841-b466e880-b3f3-11eb-937d-8ecf53afb509.png)

![image](https://user-images.githubusercontent.com/161689/118122888-c3e63180-b3f3-11eb-9265-abe6c318b8e6.png)

![image](https://user-images.githubusercontent.com/161689/118122925-d496a780-b3f3-11eb-918e-fc6e232de6e8.png)

![floor](https://user-images.githubusercontent.com/161689/118124959-a4043d00-b3f6-11eb-812a-d2e0e7076cd1.png)

![count](https://user-images.githubusercontent.com/161689/118125294-12e19600-b3f7-11eb-8615-fb16fe62ab9e.png)

![rank](https://user-images.githubusercontent.com/161689/118125409-34db1880-b3f7-11eb-8374-c6fefe5a67c9.png)

![shape](https://user-images.githubusercontent.com/161689/118123893-27249380-b3f5-11eb-9ff4-4e1bbf08ff02.png)

![image](https://user-images.githubusercontent.com/161689/118124296-aca84380-b3f5-11eb-8501-260df1c7a6c7.png)

![in order traversal](https://user-images.githubusercontent.com/161689/118125483-55a36e00-b3f7-11eb-8fa7-8c3a672b5d4a.png)

![image](https://user-images.githubusercontent.com/161689/118125866-d4001000-b3f7-11eb-9237-0759e7db1ddb.png)

![Summary](https://user-images.githubusercontent.com/161689/118126011-ff82fa80-b3f7-11eb-9ccf-907e62157358.png)


So with BST the drawback includes:
- No good guarantee that if insertion has order, the tree will be imbalanced. (The red black tree can help)
- when deleting: the order of growth of the expected height of a binary search tree with n keys after a long intermixed sequence of random insertions and random Hibbard deletions is: `sqrt(N)`. This currently is not optimized to `log N` and it is an open question.

---

### Notes on delete

![0 child](https://user-images.githubusercontent.com/161689/118127981-9bae0100-b3fa-11eb-8915-0780634e3ba9.png)

![1 child](https://user-images.githubusercontent.com/161689/118128059-b3858500-b3fa-11eb-8159-2ecb4068784f.png)

![2 child](https://user-images.githubusercontent.com/161689/118128101-c13b0a80-b3fa-11eb-8f90-5288c73a1dd9.png)

![image](https://user-images.githubusercontent.com/161689/118128303-00695b80-b3fb-11eb-853e-558aaa3c1e92.png)

![image](https://user-images.githubusercontent.com/161689/118128349-0e1ee100-b3fb-11eb-81c3-8f3ddf449ca4.png)

![image](https://user-images.githubusercontent.com/161689/118128749-9d2bf900-b3fb-11eb-8881-0e36c1324f31.png)

