if ! pgrep -u "$USER" ssh-agent > /dev/null; then
  eval $(ssh-agent -s)
fi

ssh-add -q ~/.ssh/id_rsa </dev/null