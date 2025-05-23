# 📝 Vi editor tips

## Moving
```
w   move to beginning of next word
b   move to previous beginning of word
e   move to end of word
ge  move to previous end of word

gg  move to first line
G   move to last line
12gg or 12G moves to line 12

0   move to beginning of line
$   move to end of line
_   🔥 move to first non-blank character of the line
g_  move to last non-blank character of the line

g;  🔥 jump to the place of last edit. can be quite helpful while debugging or editing files.

%   move to the matching part of a (, [ or {
[{  move to the first enclosure of { above

Ctrl-D  🔥 move half-page down
Ctrl-U  🔥 move half-page up
Ctrl-B  page up
Ctrl-F  page down
Ctrl-O  🔥 jump to last (older) cursor position
Ctrl-I  🔥 jump to next cursor position (after Ctrl-O)
Ctrl-Y  move view pane up
Ctrl-E  move view pane down

n   🔥 next matching search pattern
N   previous matching search pattern
*   🔥 next whole word under cursor
#   previous whole word under cursor
g*  next matching search (not whole word) pattern under cursor
g#  previous matching search (not whole word) pattern under cursor
gd  🔥 go to definition/first occurrence of the word under cursor

fX  fall onto to next 'X', in the same line (X is any character)
FX  fall to previous 'X' (f and F put the cursor on X)
tX  til next 'X' (similar to above, but cursor is before X)
TX  til previous 'X' (cursor is behind X)

J   join, move next line below to the end of current line (but adds a space)
Jx  join like above, and remove the added space.
```

For ideavimrc, one can set up some extra actions such as moving to previous or next error locatoin
```
nnoremap g[ :action GotoPreviousError<CR>
nnoremap g] :action GotoNextError<CR>
```

## Editing
```
i, a, A, o, O   into insert mode in different locations
r, R            replace char or word

ci"             change inside quotes
di"             delete inside quotes

ca"             change around quotes, include quotes
da"             delete around quotes

d0              delete till be beginning of current line
d$, D           delete till the end of current line

u               undo
Ctrl-r          redo

>>              indent the current line
>iB, >i}        indent the current Block

,, (2 comma)    🔧 customized to add a ; at the end of the line
                inoremap <leader>, <C-o>A;<ESC>
                innoremap <leader>, A;<ESC>
```

### [vim-surround](https://github.com/tpope/vim-surround)
```
ysiw"           add " surround in word
cs"'            change surround " to '
ds"             delete surround "
```

### [ReplaceWithRegister](https://github.com/JetBrains/ideavim/blob/master/doc/IdeaVim%20Plugins.md#replacewithregister-adds-two-in-one-command-that-replaces-text-with-the-contents-of-a-register)
```
griw            Replace in word by previously yanked or deleted stuff
gr$             Replace from the cursor position to the end of the line
```

## Folding
```
zo              Open one fold under the cursor.
zO              Open folds, recursively.
zc              Close one fold under the cursor.
zC              Close folds, recursively.

zM              Close all folds: set 'foldlevel' to 0. 'foldenable' will be set.
zR              Open all folds. This sets 'foldlevel' to highest fold level.
```

For ideavim, set up as such:
```
nnoremap zC :action CollapseRegionRecursively<CR>
nnoremap zO :action ExpandRegionRecursively<CR>
```


## Options
```
:noh           turn off highlight
:set hls       highlight all matching phrases
:set ic        set ignore case for search
:set noic      set not ignore case again
:set invic     use inv to invert the option - f.g. ic here
```

## Search stuff
```
/              find pattern
n              go to next found pattern

:! grep -rin -A2 -B2 --color --include=\*.md . -e 'yank'
                             use a grep command to show what md files from
                             current directory contains word 'yank' or 'Yank'
                             r: recursive, n: show line number, i: ignore case
```

## Replace/Substitue stuff
```
To substitute new for the first old in a line type
~~~ cmd
        :s/old/new
~~~
    To substitute new for all 'old's on a line type

~~~ cmd
        :s/old/new/g
~~~
    To substitute phrases between two line #'s type

~~~ cmd
        :#,#s/old/new/g
~~~
    To substitute all occurrences in the file type

~~~ cmd
        :%s/old/new/g
~~~
    To ask for confirmation each time add 'c'

~~~ cmd
        :%s/old/new/gc
~~~
```

## Copy Paste stuff

How to select a word, copy it and replace another word.
```
yiw	    Yank inner word (copy word under cursor, say "first").
...	    Move the cursor to another word (say "second").
viwp	Select "second", then replace it with "first".
...	    Move the cursor to another word (say "third").
viw"0p	Select "third", then replace it with "first".

🔥 Copy a word and paste it over other words:

yiw	    Yank inner word (copy word under cursor, say "first").
...	    Move the cursor to another word (say "second").
ciw Ctrl-R 0 Esc	🔥Change "second", replacing it with "first".
...	    Move the cursor to another word (say "third").
.	    Repeat the operation (change word and replace it with "first").
...	    Move the cursor to another word and press . to repeat the change.

Copy text in quotes, and paste it over other quoted text:

yi"	    Yank inner text (text containing cursor which is in quotes).
...	    Move the cursor to other quoted text.
ci" Ctrl-R 0 Esc	🔥Change the quoted text, replacing it with the copied text.
...	    Move the cursor to more quoted text.
.	    Repeat the operation (change the quoted text and replace it with the copy).
...	    Move the cursor to more quoted text and press . to repeat the change.

Copy a line and paste it over other lines:

yy	    Yank current line (say "first line").
...	    Move the cursor to another line (say "second line").
Vp	    Select "second line", then replace it with "first line".
...	    Move the cursor to another line (say "third line").
V"0p    Select "third line", then replace it with "first line".

Deleting, changing and yanking text copies the affected text to the unnamed register (""). Yanking text also copies the text to register 0 ("0). So the command yiw copies the current word to "" and to "0.

yl /vy/xu     Yank current character. Composing the yank operation with the so often used "one character to the right" motion
```

## Window and Tab
```
Ctrl-W s   split window horiontally, can be used with ctrlpvim after Ctrl-P to open file
Ctrl-W v   split window vertically, can be used with ctrlpvim after Ctrl-P to open file

Ctrl-W l   jump to the window on the right

Ctrl-W x   switch current window with next one

gt         move to the tab after
gT         move to the tab before
gt3        move to tab number 3
```

## Group change
```
Ctrl-V,  then move to select, then Shift-<action>, then ESC 
```

## Commenting
With plugin:
* Plug 'scrooloose/nerdcommenter'
```
[count]<leader>cc |NERDCommenterComment|   Comment out the current line or text selected in visual mode.
[count]<leader>cn |NERDCommenterNested|    Same as cc but forces nesting.
[count]<leader>c<space> |NERDCommenterToggle|  Comment Toggle

[count] gcc     🔧 comment toggle, need a special setup, see my mac-settings repo's config files.
```

For IntelliJ's ideavim plugin, add `set commentary` in it's config file.
If in IntelliJ with the ideavim plugin, use `gcc` to comment.

## Turn off search highlight
```
:noh
```

## Spell check with NeoVim
```
z=     give suggestions
zg     add it as a good word
zw     add it as a wrong word
```

## Plugin NERDTree
```
,t      focus on tree view
Ctrl-t  toggle tree view

Ctrl-j  🔧 customized - :NERDTreeFind
,n      🔧 customized - :NERDTreeFind
```

## PlugIn CtrlP to find and open files
```
F5               refresh files
Ctrl-p           open serach
Ctrl-p Ctrl-s/v  open in new window
Ctrl-p Ctrl-t    open in new tab

,p               🔧 only search in buffered files
                 # above command is customized via setting:
                 # nnoremap <leader>p :CtrlPBuffer<CR> 
```

## PlugIn VimTest
```
Plug 'vim-test/vim-test'
https://github.com/vim-test/vim-test
:TestNearest run nearest test
:TestFile    run all test in file
:TestSuite   run the whole test suite
:TestLast    run last test
:TestVisit   visit the test file from which you last run your tests
```

## 🔧 Customized COC shortcut
```
Ctrl-l     🔧 reformat file
Ctrl-space    give suggestions

gb         🔧 go to definition
gy         🔧 go to type definition
gi         🔧 go to implementation
gr         🔧 references

gp         go to previous issue
gå         go to next issue

K          show documentation
```

---

# Tmux

## Window and Pane
```
Ctrl-b c      create window
Ctrl-b n/p    go to next or previous window
Ctrl-b w      list all windows
Ctrl-b 0/1..  go to window number 0/1/...

Ctrl-b %      split horisontal pane
Ctrl-b "      split vertical pane
Ctrl-b o      go to next pane
```

## Tmux Session
```
tmux new -s <name>   create new session
Ctrl-b d             detach session
Ctrl-b x             kill current session
tmux ls              list sessions

tmux kill-session -t [name]
tmux rename-session [-t current-name] [new-name]
Ctrl-b $             to rename session while in tmux
```

---

# .ideavimrc

An .ideavimrc example which I have been using for a few years.
```vimrc
" .ideavimrc is a configuration file for IdeaVim plugin. It uses
" the same commands as the original .vimrc configuration.
" You can find a list of commands here: https://jb.gg/h38q75
" Find more examples here: https://jb.gg/share-ideavimrc
" Default key maps:
" https://github.com/JetBrains/ideavim/blob/master/src/main/java/com/maddyhome/idea/vim/package-info.java

" https://github.com/JetBrains/ideavim/blob/master/doc/IdeaVim%20Plugins.md

" set clipboard+=unnamedplus

" set <leader> to <space>
let mapleader = " "

" https://stackoverflow.com/questions/48885527/only-associate-register-0-with-system-clipboard-in-vim
nnoremap <leader>y "+y
vnoremap <leader>y "+y
nnoremap <leader>p "+p
vnoremap <leader>p "+p

" https://github.com/TheBlob42/idea-which-key?tab=readme-ov-file#installation
" install which-key IntelliJ plugin
set which-key
set notimeout
" install vim sneak IntelliJ plugin
set sneak
" install vim quickscope IntelliJ plugin, here I turned it off.
set noquickscope

"" -- Suggested options --
" Show a few lines of context around the cursor. Note that this makes the
" text scroll if you mouse-click near the start or end of the window.
set scrolloff=5

" Do incremental searching.
set incsearch

" Don't use Ex mode, use Q for formatting.
map Q gq

" --- Enable IdeaVim plugins https://jb.gg/ideavim-plugins

" Highlight copied text
Plug 'machakann/vim-highlightedyank'
" Commentary plugin
Plug 'tpope/vim-commentary'
Plug 'tpope/vim-surround'
" using <gr> to do replace from previous yank, instead of "_d or "0p ... 
Plug 'vim-scripts/ReplaceWithRegister'

"" -- Map IDE actions to IdeaVim -- https://jb.gg/abva4t
"" Map \r to the Reformat Code action
map <leader>cf <Action>(ShowReformatFileDialog)
map <leader>cF <Action>(ReformatCode)

map <leader>v <C-v>

"" Map <leader>d to start debug
"map <leader>d <Action>(Debug)

"" Map \b to toggle the breakpoint on the current line
"map \b <Action>(ToggleLineBreakpoint)

nnoremap zC :action CollapseRegionRecursively<CR>
nnoremap zO :action ExpandRegionRecursively<CR>

nmap gy :action GotoTypeDeclaration<CR>

" simple spider
" https://stackoverflow.com/questions/71631159/ideavim-move-between-words-in-camel-case-word

map <leader>w [w
map <leader>b [b
map <leader>e ]w

" set bookmark
ideamarks on

" set go to next issue
nnoremap g[ :action GotoPreviousError<CR>
nnoremap g] :action GotoNextError<CR>

```

