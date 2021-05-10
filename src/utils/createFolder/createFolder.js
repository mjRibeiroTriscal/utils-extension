/**
    * @description      : 
    * @author           : Mario Jorge
    * @group            : 
    * @created          : 07/05/2021 - 17:51:44
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 10/05/2021
    * - Author          : Mario Jorge
    * - Modification    : 
**/

const vscode = require('vscode');
const fs = require('fs');

/**
 * @description Método responsável pela criação de diretórios (Será, geralmente, usado em conjunto com métodos complementáres).
 * @author Mario Jorge | 07/05/2021
**/
const createFolder = () => {
    const root = vscode.workspace.workspaceFolders[0].uri.path.toString().split(":")[1];
    let route = root;
    // Abre Input no VSCode
    vscode.window.showInputBox().then(text => {
        // Verificar se diretorio existe
        if (!fs.existsSync(`${root}/${text}`)) {
            // Criar diretorio (caso não haja erro)
            fs.mkdirSync(`${root}/${text}`)
            route = `${root}/${text}`
        }
    })
    // Retornar rota para uso futuro
    // * Validar se o melhor é retornar null/undefined ou o valor de
    // * "root", caso diretório não seja criado por algum motivo.
    return route
}

exports.default = createFolder