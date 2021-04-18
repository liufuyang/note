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
```
`let mapleader = ","` can set leader key as `,`

## Turn off search highlight
```
:noh
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

Ctrl-b           🔧 only search in buffered files
                 # above command is customized via setting:
                 # nnoremap <C-b> :CtrlPBuffer<CR> 
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

gb         🔧 go to definition
gy         🔧 go to type definition
gi         🔧 go to implementation
gr         🔧 references
```
