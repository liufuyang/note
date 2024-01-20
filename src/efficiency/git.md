# Git tips

```
# only show logs related to main and a branch-a
git lg main..branch-a

# without checking out any branch, push local branch a to b
git push . branc-a:branch-b <-f>

# without checking out any branch, pull/fetch remote to local branch
(not on main)
git fetch origin main:main
git pull origin main:main

# without checking out branch-top, rebase branch-top onto branch-base
# in the end checking out branch-top (so it still checks out behind the scene)
# assuming main(outdated) ---> branch-a --.--.--> branch-b, and main is outdated, one can do
(at some branch-b)

git fetch origin main:main
git rebase main branch-a           # which will checkout branch-a

(on branch-a)
git rebase branch-a branch-b <-i>  # usually works, if conflicts due to "duplicated" commits, use -i to drop duplicated commits

(on branch-b now)
# Ends up like: main(updated) ---> branch-a' --.--.--> branch-b'
# And of course the hashes are all changed now for those branches.
```