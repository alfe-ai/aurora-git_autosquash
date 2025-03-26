```markdown
# aurora-git_autosquash

A NodeJS project to squash a git repo into another git repo. This project takes in the local paths of two git repositories and squashes the history of the first repository into the second repository.

## Usage

Run the script by executing:

```sh
node index.js --source=/path/to/source/repo --dest=/path/to/dest/repo
```

Replace `/path/to/source/repo` and `/path/to/dest/repo` with the actual local paths to your repositories.

If you already have the repositories on disk and do not want to clone again, you can use:
```sh
node index.js --source=/path/to/source/repo --dest=/path/to/dest/repo --skipClone
```
```
