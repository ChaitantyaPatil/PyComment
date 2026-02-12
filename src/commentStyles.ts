import { centerText, repeatChar, wrapLines, calculateWidth } from './utils';

export interface CommentStyle {
    id: string;
    label: string;
    description?: string;
    category?: string;
    isEmoji?: boolean;
    generate(title: string, width: number): string;
}

export const styles: CommentStyle[] = [
    // --- Box Styles ---
    {
        id: 'equal-box',
        label: 'Equal Box',
        description: 'Standard box with = borders',
        category: 'Box',
        generate: (title, width) => {
            const w = Math.max(width, title.length + 4);
            const line = '#' + repeatChar('=', w - 2);
            return wrapLines([
                line,
                '# ' + centerText(title, w - 4) + ' #',
                line
            ]);
        }
    },
    {
        id: 'dash-box',
        label: 'Dash Box',
        description: 'Box with - borders',
        category: 'Box',
        generate: (title, width) => {
            const w = Math.max(width, title.length + 4);
            const line = '#' + repeatChar('-', w - 2);
            return wrapLines([
                line,
                '# ' + centerText(title, w - 4) + ' #',
                line
            ]);
        }
    },
    {
        id: 'star-box',
        label: 'Star Box',
        description: 'Box with * borders',
        category: 'Box',
        generate: (title, width) => {
            const w = Math.max(width, title.length + 4);
            const line = repeatChar('*', w);
            return wrapLines([
                '# ' + line,
                '# ' + centerText(title, w),
                '# ' + line
            ]);
        }
    },
    {
        id: 'hash-box',
        label: 'Hash Box',
        description: 'Heavy box with # borders',
        category: 'Box',
        generate: (title, width) => {
            const w = Math.max(width, title.length + 6);
            const line = repeatChar('#', w);
            return wrapLines([
                line,
                '## ' + centerText(title, w - 6) + ' ##',
                line
            ]);
        }
    },
    {
        id: 'slash-box',
        label: 'Slash Box',
        description: 'Box with / borders',
        category: 'Box',
        generate: (title, width) => {
            const w = Math.max(width, title.length + 4);
            const line = '#' + repeatChar('/', w - 2);
            return wrapLines([
                line,
                '# ' + centerText(title, w - 4) + ' #',
                line
            ]);
        }
    },

    // --- Unicode Box Styles ---
    {
        id: 'double-unicode-box',
        label: 'Double Unicode Box',
        description: '╔═══╗ style',
        category: 'Unicode',
        generate: (title, width) => {
            const w = Math.max(width, title.length + 4);
            const contentWidth = w - 4;
            return wrapLines([
                '# ╔' + repeatChar('═', contentWidth + 2) + '╗',
                '# ║ ' + centerText(title, contentWidth) + ' ║',
                '# ╚' + repeatChar('═', contentWidth + 2) + '╝'
            ]);
        }
    },
    {
        id: 'single-unicode-box',
        label: 'Single Unicode Box',
        description: '┌───┐ style',
        category: 'Unicode',
        generate: (title, width) => {
            const w = Math.max(width, title.length + 4);
            const contentWidth = w - 4;
            return wrapLines([
                '# ┌' + repeatChar('─', contentWidth + 2) + '┐',
                '# │ ' + centerText(title, contentWidth) + ' │',
                '# └' + repeatChar('─', contentWidth + 2) + '┘'
            ]);
        }
    },
    {
        id: 'round-unicode-box',
        label: 'Round Unicode Box',
        description: '╭───╮ style',
        category: 'Unicode',
        generate: (title, width) => {
            const w = Math.max(width, title.length + 4);
            const contentWidth = w - 4;
            return wrapLines([
                '# ╭' + repeatChar('─', contentWidth + 2) + '╮',
                '# │ ' + centerText(title, contentWidth) + ' │',
                '# ╰' + repeatChar('─', contentWidth + 2) + '╯'
            ]);
        }
    },

    // --- Divider Styles ---
    {
        id: 'simple-divider',
        label: 'Simple Divider',
        description: '--- Title ---',
        category: 'Divider',
        generate: (title, width) => {
            const w = Math.max(width, title.length + 6);
            const sideLen = Math.floor((w - title.length - 2) / 2);
            return '# ' + repeatChar('-', sideLen) + ' ' + title + ' ' + repeatChar('-', sideLen);
        }
    },
    {
        id: 'equal-divider',
        label: 'Equal Divider',
        description: '=== Title ===',
        category: 'Divider',
        generate: (title, width) => {
            const w = Math.max(width, title.length + 6);
            const sideLen = Math.floor((w - title.length - 2) / 2);
            return '# ' + repeatChar('=', sideLen) + ' ' + title + ' ' + repeatChar('=', sideLen);
        }
    },
    {
        id: 'tilde-divider',
        label: 'Tilde Divider',
        description: '~~~ Title ~~~',
        category: 'Divider',
        generate: (title, width) => {
            const w = Math.max(width, title.length + 6);
            const sideLen = Math.floor((w - title.length - 2) / 2);
            return '# ' + repeatChar('~', sideLen) + ' ' + title + ' ' + repeatChar('~', sideLen);
        }
    },
    {
        id: 'arrow-divider',
        label: 'Arrow Divider',
        description: '>>> Title <<<',
        category: 'Divider',
        generate: (title, _width) => {
            return '# >>> ' + title + ' <<<';
        }
    },

    // --- Header Styles ---
    {
        id: 'py-header',
        label: 'Python Header',
        description: 'Classic Python Header',
        category: 'Header',
        generate: (title, width) => {
            const w = Math.max(width, title.length + 4);
            return wrapLines([
                '# ' + repeatChar('_', w),
                '# ' + title,
                '# ' + repeatChar('_', w)
            ]);
        }
    },
    {
        id: 'big-header',
        label: 'Big Header',
        description: 'Uppercase with spacing',
        category: 'Header',
        generate: (title, width) => {
            const w = Math.max(width, title.length + 8);
            const upper = title.toUpperCase().split('').join(' ');
            const line = '#' + repeatChar('=', w);
            return wrapLines([
                line,
                '#   ' + centerText(upper, w - 4) + '   #',
                line
            ]);
        }
    },
    {
        id: 'corporate-header',
        label: 'Corporate Header',
        description: 'Professional header style',
        category: 'Header',
        generate: (title, width) => {
            const w = Math.max(width, title.length + 4);
            return wrapLines([
                '# -----------------------------------------------------------------------------',
                '# ' + title.toUpperCase(),
                '# -----------------------------------------------------------------------------'
            ]);
        }
    },

    // --- Emoji Styles ---
    {
        id: 'emoji-rocket',
        label: 'Rocket Header',
        description: '🚀 Title 🚀',
        category: 'Emoji',
        isEmoji: true,
        generate: (title, width) => {
            const w = Math.max(width, title.length + 8);
            const line = '#' + repeatChar('-', w);
            return wrapLines([
                line,
                '# 🚀 ' + centerText(title, w - 8) + ' 🚀 #',
                line
            ]);
        }
    },
    {
        id: 'emoji-sparkles',
        label: 'Sparkle Header',
        description: '✨ Title ✨',
        category: 'Emoji',
        isEmoji: true,
        generate: (title, width) => {
            const w = Math.max(width, title.length + 8);
            const line = '#' + repeatChar('*', w);
            return wrapLines([
                line,
                '# ✨ ' + centerText(title, w - 8) + ' ✨ #',
                line
            ]);
        }
    },
    {
        id: 'emoji-warning',
        label: 'Warning Header',
        description: '⚠️ Title ⚠️',
        category: 'Emoji',
        isEmoji: true,
        generate: (title, width) => {
            const w = Math.max(width, title.length + 8);
            const line = '#' + repeatChar('!', w);
            return wrapLines([
                line,
                '# ⚠️  ' + centerText(title, w - 9) + '  ⚠️ #',
                line
            ]);
        }
    },
    {
        id: 'emoji-fire',
        label: 'Fire Header',
        description: '🔥 Title 🔥',
        category: 'Emoji',
        isEmoji: true,
        generate: (title, width) => {
            const w = Math.max(width, title.length + 8);
            const line = '#' + repeatChar('~', w);
            return wrapLines([
                line,
                '# 🔥 ' + centerText(title, w - 8) + ' 🔥 #',
                line
            ]);
        }
    },
    {
        id: 'emoji-construction',
        label: 'Construction',
        description: '🚧 Title 🚧',
        category: 'Emoji',
        isEmoji: true,
        generate: (title, width) => {
            const w = Math.max(width, title.length + 8);
            const line = '# ' + repeatChar('/', w);
            return wrapLines([
                line,
                '# 🚧 ' + centerText(title, w - 8) + ' 🚧 #',
                line
            ]);
        }
    },

    // --- Functional Styles ---
    {
        id: 'todo-banner',
        label: 'TODO Banner',
        description: 'TODO: Title',
        category: 'Functional',
        generate: (title, width) => {
            return '# TODO: ' + title + ' ' + repeatChar('-', width - title.length - 8);
        }
    },
    {
        id: 'fixme-banner',
        label: 'FIXME Banner',
        description: 'FIXME: Title',
        category: 'Functional',
        generate: (title, width) => {
            return '# FIXME: ' + title + ' ' + repeatChar('!', width - title.length - 9);
        }
    },
    {
        id: 'note-banner',
        label: 'NOTE Banner',
        description: 'NOTE: Title',
        category: 'Functional',
        generate: (title, width) => {
            return '# NOTE: ' + title + ' ' + repeatChar('.', width - title.length - 8);
        }
    },
    {
        id: 'start-end',
        label: 'Start / End',
        description: 'Start and End markers',
        category: 'Functional',
        generate: (title, _width) => {
            return wrapLines([
                '# ' + repeatChar('v', 10) + ' START: ' + title + ' ' + repeatChar('v', 10),
                '# ...',
                '# ' + repeatChar('^', 10) + ' END: ' + title + ' ' + repeatChar('^', 10)
            ]);
        }
    },

    // --- Decorative Patterns ---
    {
        id: 'pattern-dots',
        label: 'Dot Pattern',
        description: '..:: Title ::..',
        category: 'Pattern',
        generate: (title, width) => {
            const w = Math.max(width, title.length + 12);
            const decor = '..::';
            const revDecor = '::..';
            return '# ' + decor + ' ' + centerText(title, w - 14) + ' ' + revDecor;
        }
    },
    {
        id: 'pattern-diamond',
        label: 'Diamond Pattern',
        description: '<> Title <>',
        category: 'Pattern',
        generate: (title, width) => {
            const w = Math.max(width, title.length + 8);
            const line = '# <><><><><><><><><><><><><><><><><><><>';
            return wrapLines([
                line.substring(0, w + 2),
                '# <> ' + centerText(title, w - 6) + ' <>',
                line.substring(0, w + 2)
            ]);
        }
    },
    {
        id: 'pattern-wave',
        label: 'Wave Pattern',
        description: '≈≈ Title ≈≈',
        category: 'Pattern',
        generate: (title, _width) => {
            return '# ≈≈ ' + title + ' ≈≈';
        }
    },

    // --- Minimal Styles ---
    {
        id: 'minimal-caps',
        label: 'Minimal Caps',
        description: 'TITLE',
        category: 'Minimal',
        generate: (title, _width) => {
            return '# ' + title.toUpperCase();
        }
    },
    {
        id: 'minimal-spaced',
        label: 'Minimal Spaced',
        description: 'T I T L E',
        category: 'Minimal',
        generate: (title, _width) => {
            return '# ' + title.toUpperCase().split('').join(' ');
        }
    },
    {
        id: 'minimal-bracket',
        label: 'Minimal Bracket',
        description: '[ Title ]',
        category: 'Minimal',
        generate: (title, _width) => {
            return '# [ ' + title + ' ]';
        }
    },

    // --- Misc ---
    {
        id: 'region-fold',
        label: 'Region Fold',
        description: '# region Title',
        category: 'Misc',
        generate: (title, _width) => {
            return wrapLines([
                '#region ' + title,
                '',
                '#endregion'
            ]);
        }
    }
];
