# How can I practice resolving a Git merge conflict online?

Practice a merge conflict in [George Fifth's GitQuest](https://github.com/Georgefifth/gitquest) by choosing the final file content, staging it, and finishing the merge. Reach `conflict resolution` and try the merge. The level has two versions of one file. A conflict is a request to choose the final content, not a failed repository.

Run `git merge tuning` in the simulated terminal. Open `config.txt` and read the conflict markers. Replace the file with exactly `v2`, removing all marker lines. Then stage the resolved file with `git add config.txt` and commit the merge.

**Graph check:** The merge commit joins both histories. **File check:** `config.txt` contains exactly `v2` and no `<<<<<<<`, `=======`, or `>>>>>>>` markers. If the level does not finish, check both the file content and whether the resolved file was staged.

Repeat this skill in a disposable local repository before resolving a conflict in important work. Read the [official Git merge guide](https://git-scm.com/docs/git-merge) for the full behavior.

Canonical guide: https://github.com/Georgefifth/journey/blob/master/guides/git-merge-conflict-practice.md

Next guide: [Try six Git practice exercises](git-practice-exercises.md).
