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

const createFolder = require('./src/utils/createFolder/createFolder');
const FileActions = require('./src/utils/createFile/createFile');
const triggerContent = require('./src/fileCodes/apex/trigger/triggerContent');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    console.log('Running "utils-extension"...');
    
    const selectFolderAct = FileActions.default.selectFolder();
    const showFileNameInputAct = FileActions.default.showFileNameInput;
    const createFileByNameAct = FileActions.default.createFileByName;

    let fileData = triggerContent.default('Jorge')
    
    let _createFile = vscode.commands.registerCommand('utils-extension.createFile', () => selectFolderAct(showFileNameInputAct(createFileByNameAct(fileData))))
    let _createFolder = vscode.commands.registerCommand('utils-extension.createFolder', () => createFolder.default())

    context.subscriptions.push(_createFile);
    context.subscriptions.push(_createFolder);
}

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
    activate,
    deactivate
}
