```javascript
const simpleGit = require('simple-git');

module.exports = async function cloneAndSquash(source, destination, skipClone) {
    const git = simpleGit();

    try {
        if (!skipClone) {
            await git.clone(source, destination);
        }
        await git.cwd(destination);
        await git.checkout(['-b', 'squash_branch']);
        await git.reset(['--hard', 'HEAD~1']);
        await git.add('./*');
        await git.commit('Squashed commit');
    } catch (err) {
        console.log('An error occurred: ', err);
    }
}
```
