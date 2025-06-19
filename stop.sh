#!/bin/bash

SESSION="minebot"

tmux has-session -t "$SESSION" 2>/dev/null
if [ $? != 0 ]; then
  tmux new-session -d -s "$SESSION"
fi

tmux send-keys -t "$SESSION" C-c
tmux send-keys -t "$SESSION" "clear" Enter
