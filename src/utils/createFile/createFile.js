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
 * @param folderPath<String>
**/
const createFile = (folderPath = vscode.workspace.workspaceFolders[0].uri.path.toString().split(":")[1]) => {
    console.log(vscode.workspace.workspaceFolders)

    // Passar rota da pasta como parametro
    // const folderPath = vscode.workspace.workspaceFolders[0].uri.path.toString().split(":")[1];
    
    // Abre o windows explorer
    // vscode.window.showOpenDialog({filters:{'TypeScript:':['ts','tsx']}})

    // Abre picklist no VSCode
    // vscode.window.showQuickPick(['Mario','Oliveira']).then(res => {
    //     console.log(res)
    // })

    // Abre Input no VSCode
    vscode.window.showInputBox({ignoreFocusOut:true,prompt:'Mario Jorge'})
    .then(fileName => {
        // Verificar se diretorio/arquivo existe
        if (!fs.existsSync(path.join(folderPath, fileName))) {
            let onlyOneDot = fileName.split('.').length > 1 && fileName.split('.').length < 4
            let isNameValid = !fileName.includes(" ") && fileName.includes('.')
            // Verificar de nome do arquivo é válido
            if (onlyOneDot && isNameValid) {
                // Criar arquivo (caso não haja erro)
                fs.writeFile(path.join(folderPath, fileName), "", err => {
                    if (err) {
                        console.log(err)
                        return vscode.window.showErrorMessage('Failed to create file!');
                    }
                    vscode.window.showInformationMessage(`Created file! (${fileName})`);
                })
            } else {
                // Caso o nome do arquivo seja inválido, iniciar recursividade (mostrar mensagem de erro)
                createFile()
                return vscode.window.showErrorMessage('Invalid Name!');
            }
        }
    })
}

exports.default = createFile