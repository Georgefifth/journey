# Six Git practice exercises

Open [GitQuest](https://georgefifth.github.io/gitquest/) and work through its levels in order. Before each command, predict the graph. Compare the result with each check. Use the hint and answer only when needed. The game uses simulated repositories and will not change your local files.

## 1. Make a commit you can find

**Task:** Initialize the empty repository, add a README, and commit it. **Check:** One commit appears; your branch points to it; no change remains staged. **Hint:** Stage the file before committing. **Answer:** `git init`, create `README.md`, `git add README.md`, then `git commit -m "Add README"`.

## 2. Leave main where it is

**Task:** In `branching out`, create `feature`, switch to it, and commit a change. **Check:** `feature` moves to the new commit, while `main` stays put. **Hint:** `git switch -c feature` creates and selects the branch. **Answer:** Switch to `feature`, add and stage a small file, then commit it. Check your current branch if `main` moved.

## 3. Join two lines of work

**Task:** In `the merge`, bring `experiment` into `main`. **Check:** The new merge commit has two parents, and both histories remain. **Hint:** The level starts on `main`. **Answer:** Run `git merge experiment` and inspect the target graph.

## 4. Resolve a conflict deliberately

**Task:** In `conflict resolution`, try the merge and read the markers. **Check:** `config.txt` contains exactly `v2`; no markers remain; both histories join. **Hint:** Edit the file, stage it, and complete the merge. **Answer:** Run `git merge tuning`, replace `config.txt` with `v2`, run `git add config.txt`, and commit.

## 5. Mark the release point

**Task:** In `tag, you're it`, tag the first of three commits `v0.1`. **Check:** The tag stays on the first commit while `main` points to the third. **Hint:** Tags mark a point; branches move with commits. **Answer:** Run `git tag v0.1 HEAD~2`.

## 6. Read a remote before pushing

**Task:** In `ship it`, add the simulated `origin` and push `main`. **Check:** The remote branch points to the expected commit. **Hint:** Name both the destination and branch. **Answer:** Run `git remote add origin https://gitquest.dev/repo.git`, then `git push origin main`. That URL belongs only to the simulation.

**Finish check:** Explain staged file versus commit, branch versus tag, and local versus remote branch. Then replay your hardest exercise without the answer. Real Git also holds uncommitted files and team changes, so repeat these skills in a disposable local repository before important work.

Official references: [git add](https://git-scm.com/docs/git-add), [git merge](https://git-scm.com/docs/git-merge), [git tag](https://git-scm.com/docs/git-tag), and [git push](https://git-scm.com/docs/git-push).

Site version: https://georgefifth.xyz/git-practice-exercises
