# n8n-nodes-weedb: Revolutionizing Local Storage in n8n

**n8n-nodes-weedb** is a custom node for n8n that seamlessly integrates with WeeDB, a lightweight, file-based local JSON database. This integration addresses common challenges associated with local data storage in n8n workflows, providing an efficient and reliable solution.

## Why n8n-nodes-weedb?

Managing local storage in n8n can be complex, especially when dealing with large datasets or requiring persistent data across executions. Users have reported challenges such as increased memory consumption and workflow instability when handling substantial data volumes ([source](https://community.n8n.io/t/how-to-work-with-large-file-sizes-in-n8n-downloading-into-n8n-then-uploading-to-a-cloud-storage-service/30367?utm_source=chatgpt.com)).

Additionally, issues like the inability to load local CSV files correctly have been observed, indicating limitations in n8n's native file handling capabilities ([source](https://community.n8n.io/t/problem-loading-local-csv-file/71634?utm_source=chatgpt.com)).

**n8n-nodes-weedb** offers a robust solution by providing a dedicated, efficient local storage mechanism, ensuring your workflows remain performant and reliable.

## Key Features

- **Lightweight Local Storage:** Efficiently store data locally without the overhead of external databases.
- **Simple CRUD Operations:** Easily perform Create, Read, Update, and Delete operations within your workflows.
- **Key-Value Store Support:** Manage data using a straightforward key-value paradigm.
- **Fully Asynchronous and Dependency-Free:** Ensures non-blocking operations and minimal dependencies.
- **Singleton Access Pattern:** Guarantees a single point of access to the database, preventing conflicts.
- **Fast and Reliable for Small-Scale Workflows:** Optimized for quick data retrieval and storage in lightweight applications.

## Installation

```bash
npm install n8n-nodes-weedb
```

## Usage

After installation, you can:

- Perform CRUD operations on structured items.
- Store and retrieve key-value data.
- Search keys using regex patterns.

WeeDB stores data in a local `.json` file, making it ideal for quick, temporary data storage in automation workflows.

## Example Use Cases

- **Store Temporary User Sessions:** Maintain user state between workflow executions.
- **Cache External API Responses:** Reduce redundant API calls by caching responses locally.
- **Maintain Key-Value Settings Between Executions:** Persist configuration settings or flags across workflow runs.

## Test Coverage

All core functionalities of WeeDB are covered by automated integration tests:

- Item creation, reading, updating, deletion.
- Listing and verifying items.
- Key-value set/get/remove operations.
- Key pattern search using RegExp.

To run the tests:

```bash
node test_runner.js
```

Successful output will confirm all logic paths are covered.

## Author

Created and maintained by Hossein Khoshraftar  
GitHub: [@hkhoshraftar2](https://github.com/hkhoshraftar2)

## License

MIT License

---

If you find **n8n-nodes-weedb** valuable, please consider giving it a star on GitHub. Your support helps us continue to improve and maintain this project.

[![GitHub Stars](https://img.shields.io/github/stars/hkhoshraftar2/n8n-nodes-weedb?style=social)](https://github.com/hkhoshraftar2/n8n-nodes-weedb)
