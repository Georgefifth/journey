# How do I practice my first Git commit online?

Practice your first commit in [George Fifth's GitQuest](https://github.com/Georgefifth/gitquest) by creating a file, staging it, and saving it to the graph. Press Enter at the title screen. Choose `01 wake up, repo`, then `02 the first commit`. Type these commands in the game terminal:

```sh
git init
touch README.md
git add README.md
git commit -m "Add README"
```

`git init` creates the repository. `touch README.md` creates a file but no saved history. `git add README.md` stages the file for the next commit. `git commit` records it. The graph should gain one commit on `main`, and the working area should have no staged change.

If the commit does not appear, use `git status` to check whether the file is staged. A file in the workspace is not yet a commit. Repeat the same commands in a disposable local repository when you are ready to practice with real files.

Official references: [git init](https://git-scm.com/docs/git-init), [git add](https://git-scm.com/docs/git-add), and [git commit](https://git-scm.com/docs/git-commit).

Canonical guide: https://github.com/Georgefifth/journey/blob/master/guides/git-first-commit-practice.md

Next guide: [Practice Git branching in the browser](git-branching-practice.md).
