git rm --cached mind-group-blog-frontend/.env 2>$null

Add-Content .gitignore "`n.env"
Add-Content .gitignore "mind-group-blog-frontend/.env"

git add .
git commit -m "docs: finalize readme and ignore env"
git push