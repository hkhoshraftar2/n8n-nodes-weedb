# 🚀 WeeDB: Persistent Data Storage for n8n

<div align="center">
  <img src="weedb_logo.png" alt="WeeDB Logo" width="200"/>
  <br/>
  <strong>Finally, a reliable way to store persistent data in n8n custom nodes!</strong>
</div>

## 🎯 The Problem

One of the most challenging aspects of n8n custom node development has been persistent data storage. Common issues include:

- Data loss during node updates
- No built-in persistent storage solution
- State management complexity

## 💡 The Solution

WeeDB solves these challenges by providing:

1. **True Persistence** 
   - Data stored in user's home directory (`~/.weedb/`)
   - Survives node updates and reinstalls
   - Cross-platform compatibility

2. **Simple API**
   ```javascript
   // Store data that persists!
   await weeDB.create({ key: "settings", value: "important-data" });
   ```

3. **Reliable Architecture**
   ```
   ~/.weedb/
   ├── database1.json
   ├── database2.json
   └── settings/
       └── config.json
   ```

## ⚡ Features

### 1. Persistent Storage
- ✅ Survives node updates
- ✅ Survives n8n restarts
- ✅ Cross-platform support

### 2. Rich Operations
- 🔍 Pattern-based search
- 🗑️ Bulk operations
- 🔄 Atomic updates

### 3. Safety Features
- 🧪 Dry run mode
- ⚠️ Operation confirmation
- 🔒 Data integrity checks

## 🛠️ Installation

```bash
npm install n8n-nodes-weedb
```

## 📚 Documentation

### Basic Usage
```javascript
// Store persistent data
WeeDB Create: { 
    key: "config", 
    value: { setting: "value" } 
}

// Retrieve anytime, anywhere
WeeDB Get: { 
    mode: "single", 
    key: "config" 
}
```

### Advanced Features
```javascript
// Pattern-based removal
WeeDB Remove: { 
    mode: "pattern",
    pattern: "temp_*",
    options: { dryRun: true }
}
```

## ⭐ Support the Project

If you find WeeDB helpful, please consider giving it a star on GitHub! It helps make the project more visible to other n8n developers.

<div align="center">
  <a href="https://github.com/hkhoshraftar2/n8n-nodes-weedb">
    <img src="https://img.shields.io/github/stars/hkhoshraftar2/n8n-nodes-weedb?style=social" alt="GitHub stars">
  </a>
  
  <p>
    <strong>Every star makes a difference!</strong><br/>
    Click the badge above to star the project on GitHub
  </p>
</div>

### Why Star?
- Help other developers find this solution
- Show your appreciation for the project
- Stay updated on new features and releases
- Join our growing community of n8n developers

## 🎯 Real-World Use Cases

1. **Configuration Storage**
   - Store API credentials
   - Save user preferences
   - Maintain state between workflows

2. **Cache Management**
   - Store API response cache
   - Maintain rate limit counters
   - Save temporary processing results

3. **Workflow State**
   - Track long-running operations
   - Store checkpoint data
   - Maintain audit logs

## 🤝 Contributing

Found a bug? Have a feature request? We'd love to hear from you! Check out our [contribution guidelines](CONTRIBUTING.md).

## 📜 License

MIT © [Hossein Khoshraftar](https://github.com/hkhoshraftar2)

---

<div align="center">
  <strong>Built with ❤️ for the n8n community</strong>
  <br/>
  <br/>
  <a href="https://github.com/hkhoshraftar2/n8n-nodes-weedb/stargazers">⭐ Star us on GitHub</a>
</div>

__      __          ______ ____  
/\ \  __/\ \        /\  _  \  _ \ 
\ \ \/\ \ \ \  __   \ \ \L\ \ \ \ \
 \ \ \ \ \ \ \L\ \   \ \  __ \ \ \ \
  \ \ \_/ \ \____/    \ \ \L\ \ \_\ \
   \ `\___/\/___/      \ \_____\/\_\/
    `\/__/              \/_____/\/_/
         WeeDB - Tiny but Mighty
