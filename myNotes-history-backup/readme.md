推送代码到GitHub

1. 推送到github
``` python
# 比如你想写关于 docker 的笔记
git checkout -b docs/docker-notes

git add .
git commit -m "添加docker笔记"

git push -u origin docs/docker-notes
```
2. 在github中合并
- 在 GitHub 页面点击 "Compare & pull request"
- 点击 "Merge" 把代码合并进 master
