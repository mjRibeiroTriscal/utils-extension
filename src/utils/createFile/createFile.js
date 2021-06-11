/**
    * @description      : 
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

/**
 * @description Métodos responsáveis pela criação de arquivos (Serão, geralmente, usados em conjunto com métodos complementáres).
 * @author Mario Jorge | 10/05/2021
 * @param rootPath<String>
**/
const FileActions = {
    createFileByName: function (fileData = '', rootPath = vscode.workspace.workspaceFolders[0].uri.path.toString().split(":")[1]) {
        return function (specificPath, fileName) {
            // Verificar se diretorio/arquivo existe
            if (!fs.existsSync(path.join(`${rootPath}/${specificPath}`, fileName))) {
                let onlyOneDot = fileName.split('.').length > 1 && fileName.split('.').length < 4
                let isNameValid = !fileName.includes(" ") && fileName.includes('.')
                // Verificar de nome do arquivo é válido
                if (onlyOneDot && isNameValid) {
                    // Criar arquivo (caso não haja erro)
                    fs.writeFile(path.join(`${rootPath}/${specificPath}`, fileName), fileData, err => {
                        if (err) {
                            console.log(err)
                            return vscode.window.showErrorMessage('Failed to create file!');
                        }
                        vscode.window.showInformationMessage(`File created Successfully! (${fileName})`);
                        // Abrir arquivo criado
                        try {
                            vscode.workspace.openTextDocument(`${process.env.HOMEDRIVE}${rootPath}/${specificPath}/${fileName}`).then(doc => {
                                vscode.window.showTextDocument(doc, { preview: true });
                            })
                        } catch (err) {
                            console.log(err)
                            return vscode.window.showErrorMessage('Failed to open file!');
                        }
                    })
                } else {
                    // Caso o nome do arquivo seja inválido, iniciar recursividade (mostrar mensagem de erro)
                    this.createFileByName(rootPath);
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
                    console.log(folder + '/' + fileName)
                    callback(folder, fileName)
                })
        }
    },
    selectFolder: function (rootPath = vscode.workspace.workspaceFolders[0].uri.path.toString().split(":")[1]) {
        return function (callback = undefined) {
            fs.readdir(rootPath, (err, files) => {
                if (err) return;
                let folders = [];
                files.forEach(file => {
                    let isDir = fs.lstatSync(`${rootPath}/${file}`).isDirectory()
                    if (isDir) { folders.push(file) }
                })
                vscode.window.showQuickPick(folders).then(res => {
                    console.log(res)
                    callback ? callback(res) : null;
                })
            })
        }
    }
}

exports.default = FileActions