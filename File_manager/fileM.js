// To run this program globaly in this machine use this 'Shebang' and also add the bin
// #!/usr/bin/env node

import * as readline from 'node:readline/promises';
// for file and folder path
import path from 'node:path'
// For the teminal input 'stdin' and output 'stdout'
import {stdin,stdout} from 'node:process';
import * as fs from 'node:fs/promises'
import chalk from 'chalk';


// Create a interface for input and output in terminal
const rl=readline.createInterface({
    input: stdin,
    output:stdout,
})

// Create menu fuction to show the menu of the files 
async function menu(){
    console.clear()// To start the loop again with no content
    console.log(chalk.blue.bold('📂File system manager.'))

    // Define a array to store the options list
    const options=[
        'Create Folder',
        'Create File',
        'Write to File',
        'Delete File',
        'Delete Folder',
        'List Items',
        'Exite'
    ]
    // console.log(options)

    // To print in terminal fist loop and the log
    options.forEach((opt,i)=>{
        console.log(chalk.yellow(`${i+1}`)  +  chalk.white (` ${opt}`));
    })

    // To ask the question to the user
    const Ans=await rl.question(chalk.cyan('Choose your option:'));
    // console.log("Answer:",Ans)

    // Use a switch statement to perform all the folder features
    switch(Ans){
        case '1':
            const folderPath= await rl.question(chalk.cyan("Folder Path:"));
            async function CreateFolder(folderName){
                await fs.mkdir(folderName,{recursive:true});
            }
            await CreateFolder(folderPath);
            console.log(chalk.green('✅ Folder created.'));
            break;

            // To create a file from the cli OR terminal.
        case '2':
            const filePath=await rl.question(chalk.cyan("File path:"));
            const initialContent=await rl.question(chalk.cyan("Initial Content:"));// To store the user written content in cli

            async function CreateFile(fileName,content){
                await fs.writeFile(fileName,content);
            }
            await CreateFile(filePath ,initialContent);
            console.log(chalk.green("✅File created."));
            break;

            // Write to file the content
        case '3':
            const appendFilePath= await rl.question(chalk.cyan('File path:'))
            const appendContent=await rl.question(chalk.cyan('ContentToAppend:'))

            async function writeToFile(fileName,content){
                await fs.appendFile(fileName,content);
            }
            await writeToFile(appendFilePath,`\n${appendContent}`)
            console.log(chalk.green("✅The content is added to the file."));
            break;

            // To delet the file 
        case '4':
            const deleteFilePath= await rl.question(chalk.cyan('File path to delete:'))
            async function DeleteFile(filePath) {
                await fs.unlink(filePath)
                
            }
            await DeleteFile(deleteFilePath)
             console.log(chalk.green("✅File is deleted successfully."));
             break;

             // To delete the folder
        case '5':
            const deleteFolderPath= await rl.question(chalk.cyan('Folder Path to Delete:'));
            async function deleteFolder(FolderPath){
                await fs.rm(FolderPath,{recursive:true})
            } 
            await deleteFolder(deleteFolderPath);
            console.log(chalk.green("✅Folder is deleted successfully."));
            break;

            // To Get the list items from the folder
        case '6':
            const listPath= await rl.question(chalk.cyan('Folder Path(Enter for current)'))
            // './' give the current directory bydefault
            async function listItems(pathList='./') {
                const items=await fs.readdir(pathList,{withFileTypes : true})// withFileTypes give the type of the file

                // console.log(items)
                return items.map(items=>{
                  return{
                    name: items.name,
                    type: items.isDirectory()? 'Folder': 'File',
                    path: path.join(import.meta.dirname,items.name)
                  }
                })
            }
            const Items =await listItems(listPath|| './');
            
            console.log(chalk.green("\n Contents:"));
            Items.forEach((item)=>{
                const icon=item.type=='Folder'?'📂':'📄'
                console.log(`${icon} ${chalk.yellow( item.name)}`)
            })

            console.log(chalk.green("✅Get all the list items and path."));
            break;


            // To exit from the program
        case '7':
            // Close the read line interface 
            rl.close();
            return;

            // Use default to print the warning
        default:
            console.log(chalk.red('⚠️Invalide input.'))

        }
        await rl.question(chalk.gray('\nPress Enter to continue...'))
        // This is call recursive call (Function call inside the function.)
        menu()// We have to clear the previous data to show the terminal action at a time 
}             
            



menu();