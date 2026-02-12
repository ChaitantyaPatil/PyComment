# PyComment

**PyComment** is a VS Code extension that helps you generate stylish, designer-quality comment blocks for your Python code. Whether you need a standard header, a decorative divider, or an emoji-enhanced warning block, PyComment has you covered with over 30+ unique styles.

## Features

- **30+ Comment Styles**: Choose from Box, Unicode, Arrow, Emoji, Corporate, and many more styles.
- **Context Aware**: Right-click in any Python file to insert a comment block instantly.
- **Auto-Sizing**: Comment blocks automatically adjust their width based on your title length.
- **Customizable**: Set your preferred default width or disable emoji styles if you prefer a cleaner look.
- **Quick Access**: Use `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac) and search for "PyComment".

## Usage

1. **Insert a Comment Block**:
   - Open a Python file.
   - Right-click and select **Insert Python Comment Block**.
   - OR run the command **PyComment: Insert Python Comment Block** from the Command Palette.
   - Select a style from the list.
   - Enter your section title.
   - The formatted comment block is inserted at your cursor!

2. **Insert a Random Style**:
   - Feeling adventurous? Run **PyComment: Random Comment Style** to get a surprise style.

## Extension Settings

This extension contributes the following settings:

* `pycomment.defaultBlockWidth`: Sets the default width for comment blocks (default: 60).
* `pycomment.enableEmojiStyles`: Enable/disable emoji-based comment styles (default: true).
* `pycomment.defaultStyle`: Pre-select a specifc style ID to skip the selection menu (leave empty to always ask).

## Known Issues

- Multi-line titles are not yet supported (text will be centered on a single line).

## Release Notes

### 1.0.0
- Initial release of PyComment.
- Added 30+ comment styles.
- Added support for custom block width.

---

**Enjoy coding with style!**
