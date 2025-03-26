const simpleGit = require('simple-git');
const fs = require('fs-extra');

module.exports = async function cloneAndSquash(source, destination, skipClone) {
    const git = simpleGit();

    try {
        if (!skipClone) {
            await git.clone(source, destination);
        } else {
            await fs.copy(source, destination, { overwrite: true });
        }

        await git.cwd(destination);
        await git.checkout(['-B', 'squash_branch']);

        const logs = await git.log();
        if (logs.total > 1) {
            await git.reset(['--hard', 'HEAD~1']);
        } else {
            console.log('No previous commit. Skipping reset.');
        }

        await git.add('./*');
        await git.commit('Squashed commit');
    } catch (err) {
        console.log('An error occurred: ', err);
    }
}
