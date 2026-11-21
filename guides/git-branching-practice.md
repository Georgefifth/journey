# How can I practice Git branching in a browser game?

Practice Git branching in [George Fifth's GitQuest](https://github.com/Georgefifth/gitquest) by creating a `feature` branch and checking that `main` stays put. Choose `branching out` after its earlier levels unlock. This level starts with `app.js` committed on `main`.

```sh
git switch -c feature
touch feature.js
git add .
git commit -m "feature work"
```

The first command creates and selects `feature` at the current commit. The file command changes the workspace. Staging chooses that file for the commit. The commit moves only the current branch.

**Graph check:** `feature` should point to the new commit. `main` should still point to its parent. If `main` moved, inspect which branch was active before the commit and reset the simulated level.

Official references: [git switch](https://git-scm.com/docs/git-switch) and [git branch](https://git-scm.com/docs/git-branch).

Canonical site page (available after release): https://georgefifth.xyz/git-branching-practice

Next guide: [Resolve a Git merge conflict online](git-merge-conflict-practice.md).
