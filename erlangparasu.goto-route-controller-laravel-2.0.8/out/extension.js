/**
 * Copyright 2019 ErlangParasu
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// Created by Erlang Parasu 2019
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
// This method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Extension "laravel-goto-controller-route" is now active!');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    // let disposableC = vscode.commands.registerCommand('enableLaravelRouteClassOpener', () => {
    // 	// The code you place here will be executed every time your command is executed
    // 	// Display a message box to the user
    // 	vscode.window.showInformationMessage('laravel-goto-controller-route enabled!');
    // });
    let mThenableProgress;
    let mIntervalId;
    let mResolve;
    let mReject;
    let disposableA = vscode.commands.registerTextEditorCommand('extension.openControllerClassFile', (textEditor, edit, args) => {
        try {
            mReject(new Error('CancelProgress'));
        }
        catch (e) {
            // Do nothing.
        }
        mThenableProgress = vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: "Laravel: Finding controller declaration"
        }, (progress, token) => {
            return new Promise((resolve, reject) => {
                try {
                    mReject(new Error('CancelProgress'));
                }
                catch (e) {
                    // Do nothing.
                }
                mResolve = resolve; // To stop progress indicator later
                mReject = reject; // To stop progress indicator later
                let textLine = textEditor.document.lineAt(textEditor.selection.start);
                // let str: string = textEditor.document.getText(textEditor.selection);
                // vscode.window.showInformationMessage(textLine.text);
                let strUri = textEditor.document.uri.path;
                if (strUri.indexOf('routes') == -1) {
                    // This file is not inside routes directory
                    vscode.window.showInformationMessage('This file is not inside routes directory');
                    reject(new Error('NotInsideRoutesDirectory'));
                    return;
                }
                if ((strUri.indexOf('web.php') != -1) || (strUri.indexOf('api.php') != -1)) {
                    // OK
                }
                else {
                    // This file is not web.php or api.php
                    vscode.window.showInformationMessage('This file is not web.php or api.php');
                    reject(new Error('NotWebPhpOrApiPhp'));
                    return;
                }
                if (textEditor.document.getText().indexOf('Route::') == -1) {
                    // No route declaration found in this file
                    vscode.window.showInformationMessage('No route declaration found in this file');
                    reject(new Error('NoRouteDeclarationFound'));
                    return;
                }
                let activeEditor = textEditor;
                // const text = activeEditor.document.getText();
                const text = textLine.text;
                // const smallNumbers: vscode.DecorationOptions[] = [];
                // const largeNumbers: vscode.DecorationOptions[] = [];
                let isFound = false;
                let match;
                const regEx = /'([a-zA-Z\\]+)\w+Controller(@\w+)?'/g;
                while (match = regEx.exec(text)) {
                    const startPos = activeEditor.document.positionAt(match.index);
                    const endPos = activeEditor.document.positionAt(match.index + match[0].length);
                    const decoration = { range: new vscode.Range(startPos, endPos), hoverMessage: 'File **' + match[0] + '**' };
                    // if (match[0].length < 3) {
                    // smallNumbers.push(decoration);
                    // } else {
                    // largeNumbers.push(decoration);
                    // }
                    let strResultMatch = match[0];
                    // vscode.window.showInformationMessage(strResultMatch);
                    // progress.report({ increment: 1, message: "..." });
                    parsePhpClassAndMethod(strResultMatch, resolve, reject, progress, token)
                        .then(() => {
                        //
                    })
                        .catch((reason) => {
                        try {
                            mReject(reason);
                        }
                        catch (e) {
                            // Do nothing.
                        }
                    })
                        .finally(() => {
                        //
                    });
                    ;
                    isFound = true;
                    break;
                }
                if (!isFound) {
                    reject(new Error('NoMatch'));
                }
            });
        });
        mThenableProgress.then((value) => {
            console.log('progress onFulfilled', value);
        }, (reason) => {
            console.log('progress onRejected', reason);
        });
    });
    let disposableB = vscode.commands.registerTextEditorCommand('extension.openRoutesDeclarationFile', (textEditor, edit, args) => {
        try {
            mReject(new Error('CancelProgress'));
        }
        catch (e) {
            // Do nothing.
        }
        let progressOptions = {
            location: vscode.ProgressLocation.Notification,
            title: "Laravel: Finding route declaration"
        };
        mThenableProgress = vscode.window.withProgress(progressOptions, (progress, token) => {
            return new Promise((resolve, reject) => {
                try {
                    mReject(new Error('CancelProgress'));
                }
                catch (e) {
                    // Do nothing.
                }
                mResolve = resolve;
                mReject = reject;
                // progress.report({ increment: 1, message: "..." });
                handleTextEditorCommand(textEditor, edit, args, resolve, reject, progress, token)
                    .then(() => {
                    //
                })
                    .catch((reason) => {
                    try {
                        mReject(reason);
                    }
                    catch (e) {
                        // Do nothing.
                    }
                })
                    .finally(() => {
                    //
                });
            });
        });
        mThenableProgress.then((value) => {
            console.log('progress onFulfilled', value);
        }, (reason) => {
            console.log('progress onRejected', reason);
        });
    });
    function handleTextEditorCommand(textEditor, edit, args, resolveParent, rejectParent, progressParent, tokenParent) {
        return __awaiter(this, void 0, void 0, function* () {
            let textLine = textEditor.document.lineAt(textEditor.selection.start);
            // let str: string = textEditor.document.getText(textEditor.selection);
            // vscode.window.showInformationMessage(textLine.text);
            let activeEditor = textEditor;
            // const text = activeEditor.document.getText();
            const text = textLine.text;
            const smallNumbers = [];
            const largeNumbers = [];
            // let selection = null;
            let textDocument = textEditor.document;
            let docText = textDocument.getText();
            // 1. Is PHP File?
            if (docText.indexOf('<?php') == 0) {
                // OK
            }
            else {
                // Not PHP File
                rejectParent(new Error('NotPhpFile'));
                return;
            }
            // 2. Find Namespace
            let strNamespacePrefix = '';
            let namespacePosition = docText.indexOf('namespace App\\Http\\Controllers' + strNamespacePrefix);
            // console.log("TCL: activate -> namespacePosition", namespacePosition)
            if (namespacePosition == -1) {
                // Not Found
                rejectParent(new Error('NamespaceNotFound'));
                return;
            }
            let positionNamespaceStart = textDocument.positionAt(namespacePosition + 'namespace App\\Http\\Controllers'.length);
            let lineNamespace = textDocument.lineAt(positionNamespaceStart);
            // console.log("TCL: activate -> lineNamespace", lineNamespace)
            let namespaceCommaPosition = lineNamespace.text.indexOf(';') + namespacePosition;
            // console.log("TCL: activate -> namespaceCommaPosition", namespaceCommaPosition)
            let positionNamespaceEnd = textDocument.positionAt(namespaceCommaPosition);
            // Note: get string like: "\Api\Home"
            let strNameSpaceShort = textDocument.getText(new vscode.Range(positionNamespaceStart, positionNamespaceEnd));
            // vscode.window.showInformationMessage(strNameSpaceShort);
            // console.log("TCL: activate -> positionNamespaceStart", positionNamespaceStart)
            // console.log("TCL: activate -> positionNamespaceEnd", positionNamespaceEnd)
            // console.log("TCL: activate -> strNameSpaceShort ###>", strNameSpaceShort, "<###")
            // Note: get string like: "Api\Home"
            if (strNameSpaceShort.indexOf('\\') == 0) {
                strNameSpaceShort = strNameSpaceShort.substr(1);
            }
            // vscode.window.showInformationMessage(strNameSpaceShort);
            let strClassName = parseClassName(textDocument); // Note: "BookController"
            // Note: "Api\Home\BookController"
            let strNamespaceWithClass = strNameSpaceShort + '\\' + strClassName;
            // Remove backslash (for empty namespace)
            if (strNamespaceWithClass.indexOf('\\') == 0) {
                strNamespaceWithClass = strNamespaceWithClass.substr(1);
            }
            // Find method name recursively upward until we found the method name
            let parsedMethodName = '';
            let tempPositionCursor = textEditor.selection.start;
            let dooLoop = true;
            while (dooLoop) {
                if (textLine.lineNumber == 1) {
                    dooLoop = false;
                    break;
                }
                else {
                    parsedMethodName = parseMethodName(textLine).trim();
                    if (parsedMethodName.length == 0) {
                        tempPositionCursor = tempPositionCursor.translate(-1);
                        textLine = textEditor.document.lineAt(tempPositionCursor);
                    }
                    else {
                        dooLoop = false;
                        break;
                    }
                }
            }
            let strFullNamespaceWithClassWithMethod = strNamespaceWithClass + "@" + parsedMethodName;
            // vscode.window.showInformationMessage(strFullNamespaceWithClassWithMethod);
            let urisAll = [];
            let uris1 = yield vscode.workspace.findFiles('routes/web.php', 'vendor,node_modules');
            let uris2 = yield vscode.workspace.findFiles('routes/api.php', 'vendor,node_modules');
            urisAll.push(...uris1);
            urisAll.push(...uris2);
            yield handleEe(urisAll, strFullNamespaceWithClassWithMethod, resolveParent, rejectParent, progressParent, tokenParent);
        });
    }
    function handleEe(uris, strFullNamespaceWithClassWithMethod, resolveParent, rejectParent, progressParent, tokenParent) {
        return __awaiter(this, void 0, void 0, function* () {
            // Note: uris length is exactly 2 (web.php and api.php)
            let arrResult = [];
            for (let i = 0; i < uris.length; i++) {
                const uri = uris[i];
                let filePath = uri.toString();
                console.log('Scanning file:', filePath);
                // vscode.window.showInformationMessage(JSON.stringify(filePath));
                // TODO: replace with async and await...
                let textDocument = yield vscode.workspace.openTextDocument(uri);
                // let selection = null;
                let docText = textDocument.getText();
                // 1. Is PHP File?
                if (docText.indexOf('<?php') == 0) {
                    // OK
                }
                else {
                    // Not PHP File
                    // rejectParent(new Error('NotPhpFile'));
                    continue;
                }
                // TODO: Find text again using fullEndPosition as offset...
                let tempOffset = 0;
                while (true) {
                    // 2. Try to find text: example: "'Api\Home\BookController@index'"
                    let fullStartPosition = docText.indexOf("'" + strFullNamespaceWithClassWithMethod + "'", tempOffset);
                    if (fullStartPosition == -1) {
                        // Not found
                        // rejectParent(new Error('ClassAndMethodTextNotFound'));
                        break;
                    }
                    let fullEndPosition = fullStartPosition + (("'" + strFullNamespaceWithClassWithMethod + "'").length);
                    tempOffset = fullEndPosition;
                    let positionStart = textDocument.positionAt(fullStartPosition + 1);
                    // let line: vscode.TextLine = textDocument.lineAt(positionStart.line);
                    let positionEnd = textDocument.positionAt(fullEndPosition - 1);
                    // Note: "Api\Home\BookController@index"
                    let ee = textDocument.getText(new vscode.Range(positionStart, positionEnd));
                    // console.log("TCL: activate -> ee", ee);
                    arrResult.push({
                        uri: textDocument.uri,
                        positionStart: positionStart,
                        positionEnd: positionEnd
                    });
                }
            }
            console.log(arrResult);
            if (arrResult.length == 1) {
                for (let i = 0; i < arrResult.length; i++) {
                    const rec = arrResult[i];
                    let showOptions = {
                        viewColumn: undefined,
                        preserveFocus: false,
                        preview: true,
                        selection: new vscode.Range(rec.positionStart, rec.positionEnd),
                    };
                    vscode.window.showTextDocument(rec.uri, showOptions);
                    break;
                }
            }
            else if (arrResult.length > 1) {
                let arrStrPath = [];
                for (let x = 0; x < arrResult.length; x++) {
                    const rec = arrResult[x];
                    let strOption = '';
                    strOption += rec.uri.path;
                    strOption += ' ';
                    strOption += ' - Line: ';
                    strOption += (rec.positionStart.line + 1).toString();
                    arrStrPath.push(strOption);
                }
                vscode.window.showQuickPick(arrStrPath, {
                    placeHolder: "" + strFullNamespaceWithClassWithMethod + "",
                    ignoreFocusOut: true,
                    canPickMany: false,
                }).then((value) => {
                    for (let i = 0; i < arrResult.length; i++) {
                        const rec = arrResult[i];
                        let strOption = '';
                        strOption += rec.uri.path;
                        strOption += ' ';
                        strOption += ' - Line: ';
                        strOption += (rec.positionStart.line + 1).toString();
                        if (value === strOption) {
                            let showOptions = {
                                viewColumn: undefined,
                                preserveFocus: false,
                                preview: true,
                                selection: new vscode.Range(rec.positionStart, rec.positionEnd),
                            };
                            vscode.window.showTextDocument(rec.uri, showOptions);
                            break;
                        }
                    }
                }, (reason) => {
                    console.log('onrejected:', reason);
                });
            }
            progressParent.report({ increment: 99, message: "Done" });
            console.log('console Done');
            resolveParent('ResolveFindingDone');
        });
    }
    function parsePhpClassAndMethod(str, resolveParent, // To stop progress indicator later
    rejectParent, // To stop progress indicator later
    progressParent, tokenParent) {
        return __awaiter(this, void 0, void 0, function* () {
            let strFiltered = str.replace(/[,]/g, '')
                .trim()
                .replace(/[\']/g, '')
                .replace(/["]/g, '')
                .trim();
            // vscode.window.showInformationMessage(strFiltered);
            let strPhpNamespace = '';
            let strPhpMethodName = '';
            if (strFiltered.indexOf('@') == -1) {
                // Controller Only
                strPhpNamespace = strFiltered;
            }
            else {
                // Controller with Method Name
                let arrStr = strFiltered.split('@');
                strPhpNamespace = arrStr[0]; // Api\Some\Other\OneController
                strPhpMethodName = arrStr[1];
            }
            // vscode.window.showInformationMessage(strPhpNamespace);
            // vscode.window.showInformationMessage('Going to method: ' + strPhpMethodName + '()');
            let arrStrPhpNamespace = strPhpNamespace.split('\\'); // [Api,Some,Other,OneController] or [OneController]
            let strFilenamePrefix = arrStrPhpNamespace[arrStrPhpNamespace.length - 1]; // OneController
            // vscode.window.showInformationMessage(strFilenamePrefix);
            let arrResult = [];
            let uris = yield vscode.workspace.findFiles('app/**/' + strFilenamePrefix + '.php', 'vendor,node_modules');
            for (let i = 0; i < uris.length; i++) {
                const uri = uris[i];
                let filePath = uri.toString();
                console.log('Scanning file:', filePath);
                // vscode.window.showInformationMessage(JSON.stringify(filePath));
                let textDocument = yield vscode.workspace.openTextDocument(uri);
                // let selection = null;
                let docText = textDocument.getText();
                // 1. Is PHP File?
                if (docText.indexOf('<?php') == 0) {
                    // OK
                }
                else {
                    // Not PHP File
                    // rejectParent(new Error('NotPhpFile'));
                    continue;
                }
                // 2. Find Namespace
                let strNamespacePrefix = '';
                let namespacePosition = docText.indexOf('namespace App\\Http\\Controllers' + strNamespacePrefix);
                if (namespacePosition == -1) {
                    // Not Found
                    // rejectParent(new Error('NamespaceNotFound'));
                    continue;
                }
                // 3. Find Exact Namespace;
                // Note: In php file will look like: "namespace App\Http\Controllers\Api\Some\Other;"
                let arrNamespaceWithoutClassName = arrStrPhpNamespace.slice(0, -1); // [Api,Some,Other]
                let strExtraSeparator = '\\';
                if (arrStrPhpNamespace.length == 1) {
                    strExtraSeparator = ''; // If only classname available
                }
                let strFullNamespace = 'namespace App\\Http\\Controllers' + strExtraSeparator + arrNamespaceWithoutClassName.join('\\') + ';';
                // vscode.window.showInformationMessage(strFullNamespace);
                let exactNamespacePosition = docText.indexOf(strFullNamespace);
                if (exactNamespacePosition == -1) {
                    // Not Found
                    // rejectParent(new Error('ExactNamespaceNotFound'));
                    continue;
                }
                // 4. Find Class Name
                let classNamePosition = docText.indexOf('class ' + strFilenamePrefix + ' ');
                if (classNamePosition == -1) {
                    // Not Found
                    // rejectParent(new Error('ClassNameNotFound'));
                    continue;
                }
                // 5. Find Method Name
                // To highlight the class name (Default)
                let posStart = textDocument.positionAt(classNamePosition + 'class '.length);
                let posEnd = textDocument.positionAt('class '.length + classNamePosition + strPhpMethodName.length);
                // To highlight the method name
                if (strPhpMethodName.length > 0) {
                    let methodPosition = docText.indexOf(' function ' + strPhpMethodName + '(');
                    // vscode.window.showInformationMessage(JSON.stringify(methodPosition));
                    if (methodPosition == -1) {
                        // Method name Not Found
                        // rejectParent(new Error('MethodNameNotFound'));
                        continue;
                    }
                    else {
                        // Method name Found
                        posStart = textDocument.positionAt(methodPosition + ' function '.length);
                        posEnd = textDocument.positionAt(' function '.length + methodPosition + strPhpMethodName.length);
                    }
                }
                // vscode.window.showInformationMessage(strPhpNamespace);
                arrResult.push({
                    uri: textDocument.uri,
                    positionStart: posStart,
                    positionEnd: posStart
                });
            }
            // console.log(arrResult);
            if (arrResult.length == 1) {
                for (let i = 0; i < arrResult.length; i++) {
                    const rec = arrResult[i];
                    let showOptions = {
                        viewColumn: undefined,
                        preserveFocus: false,
                        preview: true,
                        selection: new vscode.Range(rec.positionStart, rec.positionEnd),
                    };
                    vscode.window.showTextDocument(rec.uri, showOptions);
                    break;
                }
            }
            else if (arrResult.length > 1) {
                let arrStrPath = [];
                for (let x = 0; x < arrResult.length; x++) {
                    const rec = arrResult[x];
                    arrStrPath.push(rec.uri.path);
                }
                vscode.window.showQuickPick(arrStrPath, {
                    ignoreFocusOut: true,
                    canPickMany: false,
                }).then((value) => {
                    for (let i = 0; i < arrResult.length; i++) {
                        const rec = arrResult[i];
                        if (value === rec.uri.path) {
                            let showOptions = {
                                viewColumn: undefined,
                                preserveFocus: false,
                                preview: true,
                                selection: new vscode.Range(rec.positionStart, rec.positionEnd),
                            };
                            vscode.window.showTextDocument(rec.uri, showOptions);
                            break;
                        }
                    }
                }, (reason) => {
                    console.log('onrejected:', reason);
                });
            }
            progressParent.report({ increment: 99, message: "Done" });
            console.log('console Done');
            resolveParent('ResolveFindingDone');
        });
    }
    function parseClassName(textDocument) {
        let strDocument = textDocument.getText();
        const regEx = /class \w+Controller /g;
        let match;
        while (match = regEx.exec(strDocument)) {
            // Note: "class SomeThingController"
            const startPos = textDocument.positionAt(match.index);
            const endPos = textDocument.positionAt(match.index + match[0].length);
            // const decoration = { range: new vscode.Range(startPos, endPos), hoverMessage: 'File **' + match[0] + '**' };
            let strMatch = match[0];
            strMatch = strMatch.replace('class', '');
            strMatch = strMatch.trim();
            // vscode.window.showInformationMessage(strMatch);
            return strMatch;
        }
        return '';
    }
    function parseMethodName(textLine) {
        let strDocument = textLine.text;
        const regEx = / public function \w+\(/g;
        let match;
        while (match = regEx.exec(strDocument)) {
            let strMatch = match[0]; // Note: " public function index("
            strMatch = strMatch.replace('public', '')
                .replace('function', '')
                .replace('(', '')
                .trim();
            // Note: "index"
            // vscode.window.showInformationMessage(strMatch);
            return strMatch;
        }
        return '';
    }
    // ------------------------------------------------------------------------
    console.log('Decorator sample is activated');
    let timeout = undefined;
    // Create a decorator type that we use to decorate small numbers
    const smallNumberDecorationType = vscode.window.createTextEditorDecorationType({
        borderWidth: '1px',
        borderStyle: 'solid',
        // overviewRulerColor: 'blue',
        overviewRulerLane: vscode.OverviewRulerLane.Right,
        light: {
            // This color will be used in light color themes
            borderColor: 'darkblue',
            borderRadius: '8px'
            // cursor: 'pointer'
        },
        dark: {
            // This color will be used in dark color themes
            borderColor: 'rgba(255, 255, 255, 0.5)',
            borderRadius: '8px'
            // cursor: 'pointer'
        }
    });
    // Create a decorator type that we use to decorate large numbers
    const largeNumberDecorationType = vscode.window.createTextEditorDecorationType({
        cursor: 'crosshair',
        // Use a themable color. See package.json for the declaration and default values.
        backgroundColor: { id: 'myextension.largeNumberBackground' }
    });
    let activeEditor = vscode.window.activeTextEditor;
    function updateDecorations() {
        if (!activeEditor) {
            return;
        }
        const text = activeEditor.document.getText();
        const smallNumbers = [];
        const largeNumbers = [];
        let match;
        const regEx = /'([a-zA-Z\\]+)\w+Controller(@\w+)?'/g;
        while (match = regEx.exec(text)) {
            const startPos = activeEditor.document.positionAt(match.index);
            const endPos = activeEditor.document.positionAt(match.index + match[0].length);
            const decoration = { range: new vscode.Range(startPos, endPos), hoverMessage: 'File **' + match[0] + '**' };
            // if (match[0].length < 3) {
            smallNumbers.push(decoration);
            // } else {
            // largeNumbers.push(decoration);
            // }
        }
        activeEditor.setDecorations(smallNumberDecorationType, smallNumbers);
        activeEditor.setDecorations(largeNumberDecorationType, largeNumbers);
    }
    function triggerUpdateDecorations() {
        if (timeout) {
            clearTimeout(timeout);
            timeout = undefined;
        }
        timeout = setTimeout(updateDecorations, 500);
    }
    if (activeEditor) {
        // triggerUpdateDecorations();
    }
    vscode.window.onDidChangeActiveTextEditor(editor => {
        activeEditor = editor;
        if (editor) {
            // triggerUpdateDecorations();
        }
    }, null, context.subscriptions);
    vscode.workspace.onDidChangeTextDocument(event => {
        if (activeEditor && event.document === activeEditor.document) {
            // triggerUpdateDecorations();
        }
    }, null, context.subscriptions);
    //
    context.subscriptions.push(disposableA);
    context.subscriptions.push(disposableB);
    // context.subscriptions.push(disposableC);
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
exports.activate = activate;
// This method is called when your extension is deactivated
function deactivate() {
    //
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map