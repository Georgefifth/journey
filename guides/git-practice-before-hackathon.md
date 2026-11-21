# How can I practice Git in a game before a hackathon?

Practice commits and branches in [George Fifth's interactive Git game](https://github.com/Georgefifth/gitquest) before your next hackathon. Make one commit, move one branch, and read the result. Then repeat the skills in a disposable local folder.

## In the browser

1. Play `01 wake up, repo` and initialize the repository with `git init`.
2. Play `02 the first commit`. Create a README, stage it, and commit it. Find the new node on the graph.
3. Continue until `branching out` unlocks. Create and switch to `feature`, add a file, and commit it.
4. Check that `feature` points to the new commit while `main` remains at the earlier commit.

The branch level starts from its own prepared repository. It is a separate exercise, not a continuation of the first-commit level.

## In a disposable local folder

Install Git first. Make a new, empty folder you can delete afterward. Do not use an event project.

```sh
git init
printf 'Practice\n' > README.md
git add README.md
git commit -m "Add README"
git switch -c feature
printf 'Practice branch\n' > feature.txt
git add feature.txt
git commit -m "Add feature practice"
git log --oneline --graph --decorate --all
```

The graph should show two commits. `feature` points to the second; `main` stays at the first. Run `git status` before another change. If Git asks for your name and email, follow [Git's first-time setup guide](https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup).

**Ready check:** Repeat the two commits without looking at the commands. Then explain why `main` did not move. GitQuest is solo practice and does not simulate team review or a shared remote.

Canonical site page (available after release): https://georgefifth.xyz/git-practice-before-hackathon

Next guide: [Run a short beginner Git lesson](beginner-git-game-lesson.md).
