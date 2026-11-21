# Git reset --hard HEAD~1

Practice rewinding one commit in [GitQuest's](https://georgefifth.github.io/gitquest/) disposable `time travel` level. Earlier levels unlock it. This command can discard real work, so use the game before trying it in a project.

## What the command does

`HEAD` names the current commit. `HEAD~1` names its first parent. `git reset --hard HEAD~1` moves the current branch to that parent and updates tracked files and the index to match it.

Imagine `A → B → C`, with `main` at `C`. Run the command on `main`, and its label moves to `B`. `C` is no longer on that branch. Tracked edits made after `B` are discarded from your working files. Untracked files usually remain. By contrast, `git reset --hard HEAD` keeps the branch at the same commit and discards tracked, uncommitted changes.

## Practice the reset

1. Open `time travel` and confirm that the level starts on `main`. Check the graph before typing.
2. Run `git reset --hard HEAD~1` in the game terminal. Watch `main` move to its parent.
3. Name the commit that lost the `main` label. Compare the graph with the target. Reset the level and predict the result again.

Before using this command in a real repository, run `git status` and `git log --oneline -3`. Check the branch and decide whether you need the current tracked changes. To undo a shared commit without rewriting its branch, `git revert` creates an inverse commit. If you reset the wrong commit, `git reflog` may show the earlier tip while Git retains it. It cannot promise recovery of discarded uncommitted edits. Read the [official Git reset reference](https://git-scm.com/docs/git-reset) for each mode's effect.

GitQuest's simulated repository cannot change your computer's files or push a rewritten branch. Make a backup branch before testing the command on important local work.

More: [Rebase practice](git-rebase-practice.md), [GitQuest source](https://github.com/Georgefifth/gitquest).

Site version: https://georgefifth.xyz/git-reset-hard-head-1
