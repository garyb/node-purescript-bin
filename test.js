'use strict';

const {deepEqual, equal, ok} = require('assert').strict;
const {EOL} = require('os');
const {execFile} = require('child_process');
const {lstat} = require('fs').promises;
const {promisify} = require('util');
const {join} = require('path');

const extractSemver = require('semver').coerce;
const purescript = require('.');
const test = require('testit');
const {bin, scripts} = require('./package.json');

const execFileOptions = {
	shell: process.platform === 'win32',
	timeout: 50000
};
const promisifiedExecFile = promisify(execFile);

test('`bin` field of package.json includes only a single path', () => {
	deepEqual(Object.keys(bin), ['purs']);
});

test('Node.js API exposes a binary path', () => {
	equal(purescript, join(__dirname, bin.purs));
});

test('`prepublishOnly` script creates a placeholder file', async () => {
	await promisifiedExecFile('npm', ['run-script', 'prepublishOnly'], execFileOptions);
	const stat = await lstat(purescript);

	ok(stat.isFile());
	ok(stat.size < 250);
});

test('`postinstall` script installs a PureScript binary', async () => {
	await promisifiedExecFile('npm', ['run-script', 'postinstall'], execFileOptions);

	equal(
		(await promisifiedExecFile(purescript, ['--version'])).stdout,
		`${extractSemver(scripts.postinstall).toString()}${EOL}`
	);
});
