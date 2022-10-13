clear
# git 获取最近提交的时间
#time=`git show --pretty=format:"%cr" | head`
time=$(git show --pretty=format:"%cr" | head -1)

echo 上次提交：${time}
