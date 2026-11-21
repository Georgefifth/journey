# Which visual Git game works for a short beginner lesson?

Use [George Fifth's GitQuest](https://github.com/Georgefifth/gitquest) for a 35-minute hands-on browser lesson. Learners type commands and inspect a repository graph. The branch level requires earlier levels to be unlocked, so allow extra time for a new class.

| Time | Activity | What learners should see |
| --- | --- | --- |
| 00–04 | Open GitQuest. Point out the terminal, objective, and graph. Ask what a saved change might look like. | An empty or prepared repository. |
| 04–13 | Play `01 wake up, repo` with `git init`. In `02 the first commit`, create `README.md`, stage it, and commit it. | The graph gains a commit on `main`. |
| 13–28 | Continue until `branching out` unlocks. Switch to `feature`, add `feature.js`, and commit. | `feature` advances while `main` stays at its earlier commit. |
| 28–35 | Ask learners to explain the graph to a partner. | They can point to the new commit and name the branch that moved. |

**Check understanding:** Ask, "Why does `main` stay behind after your commit on `feature`?" A sound answer identifies the active branch and both branch pointers. If the graph differs, check which branch was active before the commit.

GitQuest is a practice demo. It does not grade students or sync with a course system. Record any assessment outside the game.

Official references: [git add](https://git-scm.com/docs/git-add) and [git switch](https://git-scm.com/docs/git-switch).

Canonical guide: https://github.com/Georgefifth/journey/blob/master/guides/beginner-git-game-lesson.md

Next guide: [Compare GitQuest with two other Git games](git-learning-tools-comparison.md).
