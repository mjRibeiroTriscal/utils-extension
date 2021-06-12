/**
    * @description      : Classe com métodos responsáveis pela criação de arquivos (Serão, geralmente, usados em conjunto com métodos complementáres).
    * @author           : Mario Jorge
    * @group            : 
    * @created          : 10/05/2021 - 18:06:32
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 10/05/2021
    * - Author          : Mario Jorge
    * - Modification    : 
**/

const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

const triggerContent = require('../../fileCodes/apex/trigger/triggerContent');

const filesData = {
    fileDataContent: (cmdToRegistered, fileName) => {
        const fileData = {
            // General File
            "utils-extension.createFile": () => {
                let data = '';
                return {data, folder: ''};
            },
            // Trigger Package
            "utils-extension.trigger": () => {
                let data = ''; // triggerContent.default.(sourceTriggerfileName);
                return {data, folder: '/triggers'};
            },
            "utils-extension.triggerFactory": () => {
                let data = '';
                return {data, folder: '/classes'};
            },
            "utils-extension.triggerTR": () => {
                let data = triggerContent.default.sourceTR(fileName);
                return {data, folder: '/classes'};
            },
            "utils-extension.triggerSDK": () => {
                let data = '';
                return {data, folder: '/classes'};
            },
            "utils-extension.triggerMetaData": () => {
                let data = '';
                return {data, folder: '/classes'};
            },
        }
    
        let data = fileData[cmdToRegistered]()
    
        return data;
    }
}

const FileActions = {
    createFileByName: function (extension = '', cmdToRegistered, rootPath = vscode.workspace.workspaceFolders[0].uri.path.toString().split(":")[1]) {
        return function (specificPath, fileName) {
            const {data, folder} = filesData.fileDataContent(cmdToRegistered, fileName)
            // Verificar se diretorio/arquivo existe
            if (!fs.existsSync(path.join(`${rootPath}/${specificPath}${folder}`, fileName))) {
                extension!='' ? fileName = `${fileName}.${extension}` : null;
                let onlyOneDot = fileName.split('.').length > 1 && fileName.split('.').length < 4
                let isNameValid = !fileName.includes(" ") && fileName.includes('.')
                let isNameValidWExt = !fileName.replace(`.${extension}`, "").includes(" ") && fileName.replace(`.${extension}`, "").includes('.')
                if(extension!='' && !isNameValidWExt) {
                    // Nome sem extensão.
                    // Caso o nome do arquivo seja inválido, iniciar recursividade (mostrar mensagem de erro)
                    // FileActions.createFileByName(extension, cmdToRegistered, rootPath)(specificPath, fileName)
                    return vscode.window.showErrorMessage('Failed to create file! (Already exists)');
                }
                // Verificar de nome do arquivo é válido
                if (onlyOneDot && isNameValid) {
                    // Criar arquivo (caso não haja erro)
                    fs.writeFile(path.join(`${rootPath}/${specificPath}${folder}`, fileName), data, err => {
                        if (err) {
                            console.log(err)
                            return vscode.window.showErrorMessage('Failed to create file!');
                        }
                        vscode.window.showInformationMessage(`File created Successfully! (${fileName})`);
                        // Abrir arquivo criado
                        try {
                            vscode.workspace.openTextDocument(`${process.env.HOMEDRIVE}${rootPath}/${specificPath}${folder}/${fileName}`).then(doc => {
                                vscode.window.showTextDocument(doc, { preview: true });
                            })
                        } catch (err) {
                            console.log(err)
                            return vscode.window.showErrorMessage('Failed to open file!');
                        }
                    })
                } else {
                    // Caso o nome do arquivo seja inválido, iniciar recursividade (mostrar mensagem de erro)
                    // FileActions.createFileByName(extension, cmdToRegistered, rootPath)(specificPath, fileName)
                    return vscode.window.showErrorMessage('Invalid Name!');
                }
            } else {
                return vscode.window.showErrorMessage('Failed to create file! (Already exists)');
            }
        }
    },
    showFileNameInput: function (callback = undefined, ignoreFocusOut = true, prompt = 'Insert file name.') {
        return function (folder) {
            vscode.window.showInputBox({ ignoreFocusOut, prompt })
                .then(fileName => {
                    console.log(folder + ' / ' + fileName)
                    callback(folder, fileName)
                })
        }
    },
    selectFolder: function (rootPath = vscode.workspace.workspaceFolders[0].uri.path.toString().split(":")[1]) {
        return function (callback = undefined) {
            fs.readdir(rootPath, (err, files) => {
                if (err) console.log(err);
                let folders = [];
                files.forEach(file => {
                    let isDir = fs.lstatSync(`${rootPath}/${file}`).isDirectory()
                    if (isDir) { folders.push(file) }
                })
                console.log(folders)
                vscode.window.showQuickPick(folders).then(res => {
                    console.log(res)
                    callback ? callback(res) : null;
                })
            })
        }
    }
}

exports.default = FileActions