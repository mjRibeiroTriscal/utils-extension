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
 * @description Método responsável pela criação de arquivos (Será, geralmente, usado em conjunto com métodos complementáres).
 * @author Mario Jorge | 10/05/2021
 * @param rootPath<String>
**/
const createFile = async (rootPath = vscode.workspace.workspaceFolders[0].uri.path.toString().split(":")[1]) => {
    // console.log(vscode.workspace.workspaceFolders)

    //* Passar rota da pasta como parametro, senão, será "Root" por default.
    // const rootPath = vscode.workspace.workspaceFolders[0].uri.path.toString().split(":")[1];

    //* Abre o windows explorer
    // vscode.window.showOpenDialog({filters:{'TypeScript:':['ts','tsx']}})

    //* Abre picklist no VSCode
    // vscode.window.showQuickPick(['Mario', 'Oliveira']).then(res => {
    //     console.log(res)
    // })

    //* Testing Open File Functionality (Success)
    // let what = await vscode.window.showInputBox({ placeHolder: 'File Name' });
    // if (what) {
    //     try { vscode.workspace.openTextDocument('C:'+rootPath+'/'+what).then(res => vscode.window.showTextDocument(res, { preview: false }))}
    //     catch(err) { console.log(err) }
    // }

    //* -----------------------------------------------------------

    //* Getting all of folders inside root directory
    fs.readdir(rootPath, (err, files) => {
        if (err) return;
        // Lista de pastas que aparecerão na picklist
        let folders = [];
        // Varrer arquivos do diretório (rootPath) e validar de são folders (e não files)
        files.forEach(file => {
            let isDir = fs.lstatSync(`${rootPath}/${file}`).isDirectory()
            if(isDir) { folders.push(file) }
        })
        //* Abre picklist no VSCode para selecionar path de criação do arquivo
        vscode.window.showQuickPick(folders).then(res => {
            // Abre Input no VSCode
            vscode.window.showInputBox({ignoreFocusOut:true,prompt:'Insert file name.'})
            .then(fileName => {
                // Verificar se diretorio/arquivo existe
                if (!fs.existsSync(path.join(`${rootPath}/${res}`, fileName))) {
                    let onlyOneDot = fileName.split('.').length > 1 && fileName.split('.').length < 4
                    let isNameValid = !fileName.includes(" ") && fileName.includes('.')
                    // Verificar de nome do arquivo é válido
                    if (onlyOneDot && isNameValid) {
                        // Criar arquivo (caso não haja erro)
                        fs.writeFile(path.join(`${rootPath}/${res}`, fileName), "", err => {
                            if (err) {
                                console.log(err)
                                return vscode.window.showErrorMessage('Failed to create file!');
                            }
                            vscode.window.showInformationMessage(`Created file: ${fileName}`);
                            // Abrir arquivo criado
                            try {
                                vscode.workspace.openTextDocument(`C:${rootPath}/${res}/${fileName}`).then(res => {
                                    vscode.window.showTextDocument(res, { preview: true });
                                })
                            } catch(err) {
                                console.log(err)
                                return vscode.window.showErrorMessage('Failed to open file!');
                            }
                        })
                    } else {
                        // Caso o nome do arquivo seja inválido, iniciar recursividade (mostrar mensagem de erro)
                        createFile()
                        return vscode.window.showErrorMessage('Invalid Name!');
                    }
                } else {
                    return vscode.window.showErrorMessage('Failed to create file! (Already exists)');
                }
            })
        })
    })
}

exports.default = createFile