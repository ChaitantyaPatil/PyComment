import * as vscode from 'vscode';
import { styles, CommentStyle } from './commentStyles';
import { calculateWidth } from './utils';

export function activate(context: vscode.ExtensionContext) {

    // 1. Command: Insert Python Comment Block
    let insertDisposable = vscode.commands.registerCommand('pycomment.insertCommentBlock', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No active editor found!');
            return;
        }

        const config = vscode.workspace.getConfiguration('pycomment');
        const enableEmoji = config.get<boolean>('enableEmojiStyles', true);
        const defaultWidth = config.get<number>('defaultBlockWidth', 60);
        const preselectedStyleId = config.get<string>('defaultStyle', '');

        // Filter styles based on settings
        let availableStyles = styles;
        if (!enableEmoji) {
            availableStyles = styles.filter(s => !s.isEmoji);
        }

        let selectedStyle: CommentStyle | undefined;

        // Check if a default style is set and valid
        if (preselectedStyleId) {
            selectedStyle = availableStyles.find(s => s.id === preselectedStyleId);
        }

        // If no default style or invalid, ask user
        if (!selectedStyle) {
            const items = availableStyles.map(s => ({
                label: s.isEmoji ? `${s.label} (Emoji)` : s.label,
                description: s.description,
                detail: s.category,
                styleObj: s
            }));

            const selection = await vscode.window.showQuickPick(items, {
                placeHolder: 'Select a comment style'
            });

            if (!selection) return; // User cancelled
            selectedStyle = selection.styleObj;
        }

        // Ask for Title
        const title = await vscode.window.showInputBox({
            prompt: 'Enter the comment title',
            placeHolder: 'Section Title'
        });

        if (!title) return; // User cancelled or empty (optional: allow empty?)

        // Generate Block
        const width = calculateWidth(title, defaultWidth);
        const commentBlock = selectedStyle.generate(title, width);

        // Insert at Cursor
        editor.edit(editBuilder => {
            editBuilder.insert(editor.selection.active, commentBlock + '\n');
        });
    });

    // 2. Command: Random Comment Style
    let randomDisposable = vscode.commands.registerCommand('pycomment.randomComment', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No active editor found!');
            return;
        }

        const config = vscode.workspace.getConfiguration('pycomment');
        const enableEmoji = config.get<boolean>('enableEmojiStyles', true);
        const defaultWidth = config.get<number>('defaultBlockWidth', 60);

        let availableStyles = styles;
        if (!enableEmoji) {
            availableStyles = styles.filter(s => !s.isEmoji);
        }

        const randomStyle = availableStyles[Math.floor(Math.random() * availableStyles.length)];

        const title = await vscode.window.showInputBox({
            prompt: `Enter title for random style (${randomStyle.label})`,
            placeHolder: 'Section Title'
        });

        if (!title) return;

        const width = calculateWidth(title, defaultWidth);
        const commentBlock = randomStyle.generate(title, width);

        editor.edit(editBuilder => {
            editBuilder.insert(editor.selection.active, commentBlock + '\n');
        });
    });

    // 3. Command: Favorite Styles (Placeholder logic - uses WorkspaceState)
    let favoritesDisposable = vscode.commands.registerCommand('pycomment.favoriteStyles', async () => {
        vscode.window.showInformationMessage('Favorites feature coming soon!');
        // Logic would involve:
        // 1. Reading context.workspaceState.get('favorites')
        // 2. Showing QuickPick of favorite styles
        // 3. Or showing all styles and allowing "add to favorites" (needs a custom UI or multi-step input)
    });

    context.subscriptions.push(insertDisposable);
    context.subscriptions.push(randomDisposable);
    context.subscriptions.push(favoritesDisposable);
}

export function deactivate() { }
