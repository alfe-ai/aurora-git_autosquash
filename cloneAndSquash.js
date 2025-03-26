const simpleGit = require('simple-git');
const fs = require('fs-extra');
const path = require('path');

module.exports = async function cloneAndSquash(source, destination, skipClone) {
    const git = simpleGit();

    try {
        if (!skipClone) {
            // Perform a fresh clone, which sets the remote from the source
            await git.clone(source, destination);
        } else {
            // Skip clone, keep existing .git from destination, exclude .git from source
            // Remove everything except .git from destination
            const items = await fs.readdir(destination);
            for (const item of items) {
                if (item !== '.git') {
                    await fs.remove(path.join(destination, item));
                }
            }

            // Copy everything from source except .git to preserve the existing remote on destination
            await fs.copy(source, destination, {
                overwrite: true,
                filter: (src) => path.basename(src) !== '.git'
            });
        }

        await git.cwd(destination);
        await git.checkout(['-B', 'squash_branch']);

        const logs = await git.log();
        if (logs.total > 1) {
            await git.reset(['--hard', 'HEAD~1']);
        } else {
            console.log('No previous commit. Skipping reset.');
        }

        await git.add('.');
        await git.commit('Squashed commit');
    } catch (err) {
        console.log('An error occurred: ', err);
    }
}
