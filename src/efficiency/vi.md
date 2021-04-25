# Vi editor tips

## Moving
```
w   move to beginning of next word
b   move to previous beginning of word
e   move to end of word
gg  move to first line
G   move to last line
12gg or 12G moves to line 12

0   move to beginning of line
$   move to end of line
_   🔥 move to first non-blank character of the line
g_  move to last non-blank character of the line

g;  🔥 jump to the place of last edit. can be quite helpful while debugging or editing files.

Ctrl-D  move half-page down
Ctrl-U  move half-page up
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

