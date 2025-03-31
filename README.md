# n8n-nodes-weedb

A custom [n8n](https://n8n.io/) node that integrates with **WeeDB**, a lightweight, file-based local JSON database.

## 🌟 Features
- Lightweight local storage
- Simple CRUD operations
- Key-Value store support
- Fully asynchronous and dependency-free
- Singleton access pattern
- Fast and reliable for small-scale workflows

## 📦 Installation
```bash
npm install n8n-nodes-weedb
```

## 🛠 Usage
After installing the node, you'll be able to:
- Perform CRUD on structured items
- Store and retrieve key-value data
- Search keys using regex patterns

WeeDB stores data in a local `.json` file, making it suitable for quick, temporary data storage in automation workflows.

## ✨ Example Use Cases
- Store temporary user sessions
- Cache external API responses
- Maintain key-value settings between executions

## ✅ Test Coverage
All core functionalities of WeeDB are covered by automated integration tests:

- ✔️ Item creation, reading, updating, deletion
- ✔️ Listing and verifying items
- ✔️ Key-value set/get/remove operations
- ✔️ Key pattern search using RegExp

To run the tests:
```bash
node test_runner.js
```
Successful output will confirm all logic paths are covered.

## 👨‍💻 Author
Created and maintained by **Hossein Khoshraftar**  
GitHub: [@hkhoshraftar2](https://github.com/hkhoshraftar2)

## 📄 License
MIT License
