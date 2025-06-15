// The FileNode Interface
export interface FileNode {
    id: string; 
    name: string;
    type: 'file' | 'folder';
    children?: FileNode[];
}

// Mock Data for our File System
export const MOCK_FILE_SYSTEM: FileNode[] = [
    {
        id: 'root-src',
        name: 'src',
        type: 'folder',
        children: [
            {
                id: 'folder-app',
                name: 'app',
                type: 'folder',
                children: [
                    { id: 'folder-core', name: 'core', type: 'folder', children: [] },
                    { id: 'folder-shared', name: 'shared', type: 'folder', children: [] },
                    { id: 'file-app-component-ts', name: 'app.component.ts', type: 'file' },
                    { id: 'file-app-module-ts', name: 'app.module.ts', type: 'file' },
                ],
            },
            { id: 'folder-assets', name: 'assets', type: 'folder', children: [] },
            { id: 'file-index-html', name: 'index.html', type: 'file' },
            { id: 'file-main-ts', name: 'main.ts', type: 'file' },
        ],
    },
    {
        id: 'root-public',
        name: 'public',
        type: 'folder',
        children: [
            { id: 'folder-images', name: 'images', type: 'folder', children: [] },
            { id: 'file-data-json', name: 'data.json', type: 'file' },
        ],
    },
    { id: 'root-readme', name: 'README.md', type: 'file' },
    { id: 'root-package-json', name: 'package.json', type: 'file' },
];