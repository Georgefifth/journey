# Practice Git rebase online

Put a feature commit after `main`'s latest commit in [GitQuest](https://georgefifth.github.io/gitquest/). The game's `linear dream` level has a disposable repository. Earlier levels unlock it.

## The mission

The level starts with two branches from one base commit. `feature` contains `feature work`. `main` contains `main advances`. Make one line of history: base, then `main advances`, then the replayed feature work. Finish on `feature`.

1. Run `git switch feature`. Check the branch label in the graph. Rebase changes the branch you are on.
2. Run `git rebase main`. The graph should show `feature` at the newest commit and `main` one commit behind it.

**Graph check:** Before rebase, the two new commits share a parent. After rebase, the feature change has a new parent above `main advances`. Its message and change may look familiar, but its commit identity changes. The game checks the graph, not the command text. Rebasing `main` onto `feature` moves the wrong branch.

## Use it in a real repository

A rebase can update a local feature branch before review. It rewrites commit identities, so ask your team before rebasing a shared branch. Run `git status` and save unfinished work first. If a conflict stops the rebase, resolve the file, stage it, and run `git rebase --continue`. Run `git rebase --abort` to return to the earlier state. Read the [official Git rebase reference](https://git-scm.com/docs/git-rebase) before using it on important work.

If the game level does not finish, confirm that you are on `feature` and compare both branch labels with the target graph. Resetting the level affects only GitQuest's simulated repository. Try the same sequence later in a disposable local repository.

More: [Git branching practice](git-branching-practice.md), [Git merge conflict practice](git-merge-conflict-practice.md), [GitQuest source](https://github.com/Georgefifth/gitquest).

Site version: https://georgefifth.xyz/git-rebase-practice
