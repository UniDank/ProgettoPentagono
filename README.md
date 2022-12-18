# Penta Quest

🥳 RPG Game in TypeScript, Phaser and Vue with Java Spring Boot as back-end.

## Features

📦 Out of the box  
🌱 Extensible, really simple directory structure  
💪 Support using Node.js API in Electron-Renderer  
🖥 It's easy to implement multiple windows  

## Directory

```diff
  ├─┬ electron
  │ ├─┬ main
  │ │ └── index.ts    entry of Electron-Main
  │ └─┬ preload
  │   └── index.ts    entry of Preload-Scripts
  ├─┬ src
  │ └── main.ts       entry of Electron-Renderer
  ├── index.html
  ├── package.json
  └── vite.config.ts
```