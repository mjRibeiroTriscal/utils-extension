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
// const triggerContent = require('./src/fileCodes/apex/trigger/triggerContent');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    console.log('Running "utils-extension"...');

    let rootPath = vscode.workspace.workspaceFolders[0].uri.path.toString().split(":")[1]
    
    let _createFile = createFileAction(rootPath, 'utils-extension.createFile');
    let _trigger = createFileAction(rootPath, 'utils-extension.trigger');
    let _triggerFactory = createFileAction(rootPath, 'utils-extension.triggerFactory');
    let _triggerTR = createFileAction(rootPath, 'utils-extension.triggerTR');
    let _triggerSDK = createFileAction(rootPath, 'utils-extension.triggerSDK');
    let _createFolder = vscode.commands.registerCommand('utils-extension.createFolder', () => createFolder.default())

    context.subscriptions.push(_createFile);
    context.subscriptions.push(_trigger);
    context.subscriptions.push(_triggerFactory);
    context.subscriptions.push(_triggerTR);
    context.subscriptions.push(_triggerSDK);
    context.subscriptions.push(_createFolder);
}

// this method is called when your extension is deactivated
function deactivate(){}

let createFileAction = (rootPath, cmdToRegister) => {
    let folder = 'force-app/main/default'
    const selectFolderAct = FileActions.default.selectFolder(`${rootPath}/${folder}`);
    const showFileNameInputAct = FileActions.default.showFileNameInput;
    const createFileByNameAct = FileActions.default.createFileByName;
    
    if(cmdToRegister == "utils-extension.createFile")
    { return vscode.commands.registerCommand(cmdToRegister, () => selectFolderAct(showFileNameInputAct(createFileByNameAct('', cmdToRegister, `${rootPath}/${folder}`), false, "Nome do arquivo. (Ex.: GerarLogs.cls)")))}
    else
    { return vscode.commands.registerCommand(cmdToRegister, () => showFileNameInputAct(createFileByNameAct('cls', cmdToRegister), false, 'Nome do arquivo. (Ex.: GerarLogs)')(folder)); }
}

module.exports = {
    activate,
    deactivate
}
