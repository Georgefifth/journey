# Git tag example: mark a commit and check the graph

**Summary:** Create a lightweight Git tag, check its target, and watch it stay put as the branch moves. This [GitHub guide](https://github.com/Georgefifth/journey/blob/master/guides/git-tag-example.md) is the current public version. The [site version](https://georgefifth.xyz/git-tag-example) awaits release.

Here is one Git tag example you can inspect:

```bash
git log --oneline -3
git tag v1.0
git tag
git log --oneline --decorate -3
```

`git tag v1.0` marks the current `HEAD` commit. The next command lists local tags. The decorated log shows `tag: v1.0` beside the commit it names. A tag is a fixed name for a commit. A branch name moves as you add commits; a tag normally stays where you placed it.

## Check the target before you tag

Run `git status` and `git log --oneline -3`. Decide which commit is the milestone. If it is the current commit, use `git tag v1.0`. If it is the first parent, use `git tag v1.0 HEAD~1`. The graph or log should show the intended commit before you name it.

Imagine commits `A → B → C` with `main` at `C`. `git tag v1.0 HEAD~1` places the tag at `B`. A new commit `D` moves `main` forward, but `v1.0` still marks `B`. This is the difference between a release marker and a branch that receives new work.

## Practice the visible version in GitQuest

[GitQuest](https://github.com/Georgefifth/gitquest) is George Fifth's browser Git game. Its simulated repository shows commits, branches, and tags on a graph. The public demo currently returns 404 because GitHub Pages is disabled. Clone its source, run `python3 -m http.server 8000` in that folder, and open `http://localhost:8000/`.

1. Reach the tagging level. Earlier levels introduce commits and branches.
2. Read the target graph. This level asks you to mark the first of three commits.
3. Enter `git tag v0.1 HEAD~2` to mark that first commit.
4. Look for the tag label beside the chosen commit. Run `git tag` to list it.
5. Make another commit and compare labels. The branch moves; the tag stays.

The game supports lightweight tags and lets you see their position. It does not teach annotated release tags or simulate pushing tags. Use a real disposable repository for those steps.

## When an annotated tag fits better

An annotated tag stores a message and tagger details. It is useful when you want a named release with context. In a real repository, run:

```bash
git tag -a v1.0 -m "Release 1.0"
git show v1.0
```

The first command creates the tag on `HEAD`. The second lets you inspect its target and message. Use `git tag -a v1.0 HEAD~1 -m "Release 1.0"` only after checking that earlier commit. The [official Git tagging chapter](https://git-scm.com/book/en/v2/Git-Basics-Tagging) explains lightweight and annotated tags.

## Sharing and correcting a tag

A normal branch push does not automatically share your local tag. After checking its target, `git push origin v1.0` sends that tag to `origin`. GitQuest's simulated push handles branches, not tags. Do this only in a real repository you control.

If you marked the wrong commit, inspect it with `git show v1.0`. Remove the local tag with `git tag -d v1.0`, then create it at the right commit. A shared tag needs a coordinated correction because others may already have fetched it. The [Git tag manual](https://git-scm.com/docs/git-tag) gives full command options.

## What to practice next

Try the [six Git practice exercises](git-practice-exercises.md) for a longer graph workout. The [Git branching guide](git-branching-practice.md) shows why a branch label moves while a tag does not. The [guide index](README.md) links the rest.
