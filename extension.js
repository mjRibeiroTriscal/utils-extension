/**
    * @description      : 
    * @author           : Mario Jorge
    * @group            : 
    * @created          : 07/05/2021 - 15:15:07
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 07/05/2021
    * - Author          : Mario Jorge
    * - Modification    : 
**/

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

const createFolder = require('./src/utils/createFolder/createFolder')
const createFile = require('./src/utils/createFile/createFile')

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "utils-extension" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('utils-extension.createFile', function () {
		
		const htmlContent = `<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Document</title>
	</head>
	<body>
		Content Here... ${new Date()}
	</body>
</html>`;

		// console.log(vscode.workspace.workspaceFolders)

		const folderPath = vscode.workspace.workspaceFolders[0].uri.path.toString().split(":")[1];

		// fs.writeFile(path.join(folderPath, "index.html"), htmlContent, err => {
		// 	if (err) {
		// 		console.log(err)
		// 		return vscode.window.showErrorMessage('Failed to create BoilerPlate HTML file!');
		// 	}
		// 	vscode.window.showInformationMessage('Created BoilerPlate HTML file!');
		// })

		createFile.default()		
	});
	
	let disposable2 = vscode.commands.registerCommand('utils-extension.createFolder', function () {
		// const root = vscode.workspace.workspaceFolders[0].uri.path.toString().split(":")[1];
		// vscode.window.showInputBox().then(text => {
		// 	if (!fs.existsSync(`${root}/${text}`)) {
		// 		fs.mkdirSync(`${root}/${text}`)
		// 	}
		// })
		createFolder.default()
	});

	context.subscriptions.push(disposable);
	context.subscriptions.push(disposable2);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
