# SVN
## 忽略已提交的文件

```pwsh
# 1. 移除已提交的文件夹（保留本地）
svn delete --keep-local my_folder

# 2. 提交删除操作
svn commit -m "移除 my_folder"

# 3. update
svn update .

# 4. 设置忽略规则（假设当前目录是父目录）
svn propset svn:ignore "my_folder" .

# 5. 提交忽略规则
svn commit -m "忽略 my_folder"
```
