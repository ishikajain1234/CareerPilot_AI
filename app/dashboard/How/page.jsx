"use client";

import React, {useState} from "react";

const subjectQuestions = [
  {
    id: "dsa",
    name: "Data Structures & Algorithms",
    questions: [
      {
        id: 1,
        question: "What is a data structure, and why is it important?",
        answer:
          "A data structure is a way of organizing and storing data in a computer so that it can be accessed and modified efficiently. It's crucial because the choice of data structure affects the efficiency of algorithms and the overall performance of a program, especially with large datasets.",
      },
      {
        id: 2,
        question: "Explain the concept of time and space complexity.",
        answer:
          "Time complexity measures the amount of time taken by an algorithm to run as a function of the input size. Space complexity measures the amount of memory an algorithm uses. Both are expressed using Big O notation to describe the growth rate.",
      },
      {
        id: 3,
        question: "What is the difference between an array and a linked list?",
        answer:
          "An array stores elements in contiguous memory locations, allowing O(1) random access but O(n) for insertions/deletions. A linked list stores elements non-contiguously, using pointers to connect nodes; it offers O(1) for insertions/deletions at specific points (if the node is known) but O(n) for random access.",
      },
      {
        id: 4,
        question:
          "Describe the concept of recursion and its typical applications.",
        answer:
          "Recursion is a programming technique where a function calls itself directly or indirectly to solve a problem by breaking it down into smaller, similar sub-problems. Typical applications include tree/graph traversals, factorial calculation, Fibonacci series, and quick/merge sort.",
      },
      {
        id: 5,
        question: "What is a hash table? How does collision resolution work?",
        answer:
          "A hash table is a data structure that maps keys to values for efficient retrieval. It uses a hash function to compute an index into an array of buckets or slots. Collision resolution handles cases where different keys hash to the same index, commonly using techniques like separate chaining (linked lists at each bucket) or open addressing (probing for the next available slot).",
      },
      {
        id: 6,
        question:
          "Explain the difference between BFS and DFS graph traversals.",
        answer:
          "BFS (Breadth-First Search) explores all the neighbor nodes at the present depth level before moving on to nodes at the next depth level (uses a queue). DFS (Depth-First Search) explores as far as possible along each branch before backtracking (uses a stack or recursion).",
      },
      {
        id: 7,
        question:
          "What are the common sorting algorithms, and when would you use them?",
        answer:
          "Common sorting algorithms include Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, Quick Sort, and Heap Sort. Merge Sort is good for large datasets and external sorting. Quick Sort is often fastest in practice for in-memory arrays. Insertion Sort is efficient for nearly sorted data or small arrays.",
      },
      {
        id: 8,
        question:
          "What is a binary search tree (BST)? What are its properties?",
        answer:
          "A BST is a rooted binary tree data structure whose nodes each have a key and an associated value, with the properties that the key in each node is greater than or equal to any key in the left subtree and less than or equal to any key in the right subtree. This property allows for efficient searching, insertion, and deletion.",
      },
      {
        id: 9,
        question: "When would you use a stack versus a queue?",
        answer:
          "A stack (LIFO - Last In, First Out) is used for tasks like function call management (call stack), undo/redo functionality, and expression evaluation. A queue (FIFO - First In, First Out) is used for task scheduling, managing shared resources, and BFS graph traversal.",
      },
      {
        id: 10,
        question: "Explain the concept of dynamic programming with an example.",
        answer:
          "Dynamic programming is an optimization technique that solves complex problems by breaking them into simpler overlapping subproblems and storing the results of subproblems to avoid redundant computations. A classic example is calculating the Nth Fibonacci number or solving the knapsack problem.",
      },
    ],
  },
  {
    id: "react",
    name: "React",
    questions: [
      {
        id: 1,
        question: "What is React, and what are its key features?",
        answer:
          "React is a JavaScript library for building user interfaces, primarily single-page applications. Key features include declarative views, component-based architecture, virtual DOM for efficient updates, JSX for writing UI, and a one-way data flow.",
      },
      {
        id: 2,
        question: "Explain the Virtual DOM and how React uses it.",
        answer:
          "The Virtual DOM is a lightweight copy of the actual DOM. When state changes in a React component, React first updates the Virtual DOM, then efficiently calculates the minimal changes needed to the real DOM using a diffing algorithm, leading to faster updates and better performance.",
      },
      {
        id: 3,
        question: "What are React Hooks? Name some common ones.",
        answer:
          "React Hooks are functions that let you 'hook into' React state and lifecycle features from function components. They were introduced to allow functional components to have state and side effects without writing class components. Common hooks include `useState`, `useEffect`, `useContext`, `useReducer`, `useRef`, and `useMemo`.",
      },
      {
        id: 4,
        question: "What is the difference between state and props in React?",
        answer:
          "State is internal to a component, managed within it, and can change over time (mutable). Props are external, passed down from parent components, read-only, and used for communication between components (immutable).",
      },
      {
        id: 5,
        question: "Explain the lifecycle methods of a React component.",
        answer:
          "For class components, lifecycle methods include `componentDidMount` (after rendering), `componentDidUpdate` (after updates), and `componentWillUnmount` (before unmounting). For functional components, `useEffect` hook handles similar lifecycle concerns.",
      },
      {
        id: 6,
        question: "What is JSX, and why do we use it in React?",
        answer:
          "JSX (JavaScript XML) is a syntax extension for JavaScript that allows you to write HTML-like code within your JavaScript. It's used in React because it makes writing and understanding UI code more intuitive and readable, and it gets transpiled into `React.createElement()` calls.",
      },
      {
        id: 7,
        question: "How do you handle events in React?",
        answer:
          "Events in React are handled using synthetic events, which are cross-browser wrappers around the browser's native event system. You attach event handlers directly to elements using camelCase (e.g., `onClick`, `onChange`). Event handlers receive a synthetic event object.",
      },
      {
        id: 8,
        question: "What is context API in React and when would you use it?",
        answer:
          "The Context API provides a way to pass data through the component tree without having to pass props down manually at every level (prop drilling). It's useful for 'global' data like user authentication, themes, or language preferences that many components need to access.",
      },
      {
        id: 9,
        question: "Describe controlled and uncontrolled components.",
        answer:
          "Controlled components have their form data handled by React state. The state is the 'single source of truth'. Uncontrolled components handle their own form data internally (like traditional HTML forms), typically using a `ref` to get their current value.",
      },
      {
        id: 10,
        question: "What is a higher-order component (HOC)?",
        answer:
          "A Higher-Order Component (HOC) is an advanced technique in React for reusing component logic. HOCs are functions that take a component as an argument and return a new component with enhanced functionalities. They are often used for cross-cutting concerns like data fetching or authentication.",
      },
    ],
  },
  {
    id: "node",
    name: "Node.js",
    questions: [
      {
        id: 1,
        question: "What is Node.js, and what are its key features?",
        answer:
          "Node.js is an open-source, cross-platform JavaScript runtime environment that executes JavaScript code outside a web browser. Key features include its non-blocking, event-driven I/O model, single-threaded but highly scalable nature, and its use of the V8 JavaScript engine.",
      },
      {
        id: 2,
        question: "Explain the event loop in Node.js.",
        answer:
          "The event loop is a core concept in Node.js that handles asynchronous operations. It continuously checks the call stack for executable code and, if empty, processes messages from the message queue (callback queue), allowing Node.js to perform non-blocking I/O operations despite being single-threaded.",
      },
      {
        id: 3,
        question: "What is NPM? How is it used?",
        answer:
          "NPM (Node Package Manager) is the default package manager for Node.js. It's used to install, share, and manage packages (libraries and modules) for Node.js projects, making it easy to include external dependencies.",
      },
      {
        id: 4,
        question: "Describe the difference between `require` and `import`.",
        answer:
          "`require` is a CommonJS module loading system used in Node.js, which loads modules synchronously. `import` is an ES Modules (ESM) syntax, which is the standard for JavaScript modules, and supports asynchronous loading, often used with `type: 'module'` in `package.json`.",
      },
      {
        id: 5,
        question: "What are middleware functions in Express.js?",
        answer:
          "Middleware functions in Express.js are functions that have access to the request object (`req`), the response object (`res`), and the `next` middleware function in the application’s request-response cycle. They can execute code, make changes to req/res objects, end the req/res cycle, or call the next middleware.",
      },
      {
        id: 6,
        question: "How do you handle asynchronous operations in Node.js?",
        answer:
          "Asynchronous operations in Node.js are handled primarily using callbacks, Promises, and async/await. Callbacks were the traditional way, Promises provide a more structured approach to chaining async operations, and async/await offers a more synchronous-like syntax on top of Promises.",
      },
      {
        id: 7,
        question: "What is `package.json` and its importance?",
        answer:
          "`package.json` is a manifest file for a Node.js project. It contains metadata about the project (name, version, author), scripts for common tasks, and a list of dependencies (`dependencies` for production, `devDependencies` for development), ensuring project consistency and reproducibility.",
      },
      {
        id: 8,
        question: "Explain the concept of streams in Node.js.",
        answer:
          "Streams are objects that let you read data from a source or write data to a destination in a continuous fashion. They are especially useful for handling large amounts of data (like files or network requests) in chunks, rather than loading everything into memory at once, which improves performance and memory efficiency.",
      },
      {
        id: 9,
        question: "What is `process.nextTick()` and `setImmediate()`?",
        answer:
          "`process.nextTick()` schedules a callback function to be executed on the next turn of the event loop, before any I/O operations. `setImmediate()` schedules a callback to be executed after the current poll phase finishes, making it generally execute after `nextTick` calls.",
      },
      {
        id: 10,
        question: "How can you secure a Node.js application?",
        answer:
          "Securing a Node.js application involves several practices: input validation, sanitizing data, using HTTPS, implementing authentication/authorization (e.g., JWT), protecting against common attacks (XSS, CSRF, SQL injection), regularly updating dependencies, and proper error handling to avoid exposing sensitive information.",
      },
    ],
  },
  {
    id: "os",
    name: "Operating Systems",
    questions: [
      {
        id: 1,
        question:
          "What is an Operating System, and what are its main functions?",
        answer:
          "An Operating System (OS) is software that manages computer hardware and software resources and provides common services for computer programs. Its main functions include process management, memory management, file system management, I/O management, and security.",
      },
      {
        id: 2,
        question: "Explain the concept of processes and threads.",
        answer:
          "A process is an instance of a computer program that is being executed. It's an independent execution unit with its own memory space. A thread is a lightweight unit of execution within a process. Multiple threads can exist within one process and share its resources, enabling concurrency.",
      },
      {
        id: 3,
        question: "What is a deadlock? How can it be prevented or avoided?",
        answer:
          "Deadlock is a situation where two or more processes are blocked indefinitely, each waiting for a resource held by another. It can be prevented by breaking one of the four necessary conditions (mutual exclusion, hold and wait, no preemption, circular wait) or avoided using algorithms like the Banker's algorithm.",
      },
      {
        id: 4,
        question: "Describe different types of OS scheduling algorithms.",
        answer:
          "OS scheduling algorithms determine which process gets the CPU at any given time. Common types include FCFS (First-Come, First-Served), SJF (Shortest Job First), Priority Scheduling, Round Robin, and Multilevel Queue Scheduling. Each has pros and cons regarding throughput, turnaround time, and response time.",
      },
      {
        id: 5,
        question: "What is virtual memory? Why is it used?",
        answer:
          "Virtual memory is a memory management technique that allows the execution of processes that are not entirely in main memory. It creates the illusion that processes have a large, contiguous address space. It's used to run programs larger than physical memory, allow more programs to run concurrently, and simplify memory management.",
      },
      {
        id: 6,
        question: "Explain the concept of paging and segmentation.",
        answer:
          "Paging is a memory management scheme that divides logical memory into fixed-size blocks (pages) and physical memory into same-size blocks (frames). Segmentation divides logical memory into variable-sized logical units (segments) based on program structure. Both aim to enable efficient memory utilization and protection.",
      },
      {
        id: 7,
        question:
          "What is a semaphore, and how is it used for process synchronization?",
        answer:
          "A semaphore is a synchronization primitive used to control access to common resources in a concurrent system. It's essentially an integer variable that is accessed only through two atomic operations: `wait()` (or `P()`) which decrements it, and `signal()` (or `V()`) which increments it. It prevents race conditions and ensures mutual exclusion.",
      },
      {
        id: 8,
        question: "Differentiate between user-level and kernel-level threads.",
        answer:
          "User-level threads are managed by the application without kernel involvement, making them faster to create and switch. Kernel-level threads are managed by the operating system, allowing true concurrency on multi-core systems and blocking only the specific thread that made a blocking system call.",
      },
      {
        id: 9,
        question: "What is a file system? What are its common operations?",
        answer:
          "A file system is a method and data structure that an operating system uses to control how data is stored and retrieved. It organizes files and directories. Common operations include creating, deleting, opening, closing, reading, and writing files; and managing directories (creating, deleting, listing).",
      },
      {
        id: 10,
        question: "Explain the concept of caching in operating systems.",
        answer:
          "Caching involves storing frequently accessed data in a faster storage medium (cache) to reduce access time to slower storage. In OS, CPU caches store frequently used instructions/data, disk caches (buffer cache) store disk blocks, and page caches store recently accessed memory pages to speed up I/O operations.",
      },
    ],
  },
  {
    id: "dbms",
    name: "DBMS",
    questions: [
      {
        id: 1,
        question: "What is a DBMS? What are its advantages?",
        answer:
          "A Database Management System (DBMS) is software that allows users to define, create, maintain, and control access to a database. Advantages include data independence, reduced data redundancy, improved data consistency, enhanced data security, better data integration, and efficient data access.",
      },
      {
        id: 2,
        question: "Explain the ACID properties in DBMS.",
        answer:
          "ACID stands for Atomicity, Consistency, Isolation, and Durability – properties that guarantee reliable transaction processing. Atomicity ensures all or nothing; Consistency ensures transactions bring the database from one valid state to another; Isolation ensures concurrent transactions don't interfere; Durability ensures committed changes persist.",
      },
      {
        id: 3,
        question: "What are different types of keys in a relational database?",
        answer:
          "Different types of keys include: Primary Key (uniquely identifies each record), Candidate Key (a minimal superkey), Super Key (uniquely identifies records), Foreign Key (links two tables by referencing a primary key in another table), and Unique Key (similar to primary key but can allow one NULL).",
      },
      {
        id: 4,
        question:
          "Explain normalization in DBMS and its different normal forms.",
        answer:
          "Normalization is a process of organizing the columns and tables of a relational database to minimize data redundancy and improve data integrity. Normal forms (1NF, 2NF, 3NF, BCNF) are guidelines for achieving this, progressively reducing anomalies (insertion, update, deletion).",
      },
      {
        id: 5,
        question: "What is a transaction in DBMS? What are its states?",
        answer:
          "A transaction is a single logical unit of work that accesses and potentially modifies the contents of a database. Its states include active, partially committed, committed, failed, and aborted.",
      },
      {
        id: 6,
        question: "Differentiate between DDL, DML, DCL, and TCL commands.",
        answer:
          "DDL (Data Definition Language) for defining database structure (CREATE, ALTER, DROP). DML (Data Manipulation Language) for managing data within objects (SELECT, INSERT, UPDATE, DELETE). DCL (Data Control Language) for permissions (GRANT, REVOKE). TCL (Transaction Control Language) for managing transactions (COMMIT, ROLLBACK, SAVEPOINT).",
      },
      {
        id: 7,
        question:
          "What is indexing in DBMS? What are its advantages and disadvantages?",
        answer:
          "Indexing is a data structure technique used to quickly locate and access data in a database. Advantages include faster data retrieval (SELECT queries). Disadvantages include increased storage space, slower data modification (INSERT, UPDATE, DELETE) as indexes also need to be updated, and overhead in managing indexes.",
      },
      {
        id: 8,
        question: "Explain the concept of joins in SQL.",
        answer:
          "Joins are used to combine rows from two or more tables based on a related column between them. Common types include INNER JOIN (returns matching rows), LEFT JOIN (returns all rows from left table, matching from right), RIGHT JOIN (returns all rows from right table, matching from left), and FULL JOIN (returns all rows when there is a match in one of the tables).",
      },
      {
        id: 9,
        question: "What is a stored procedure? What are its benefits?",
        answer:
          "A stored procedure is a prepared SQL code that you can save and reuse. Benefits include improved performance (pre-compiled), reduced network traffic, enhanced security (users can access data without direct table permissions), and code reusability.",
      },
      {
        id: 10,
        question: "What is concurrency control in DBMS?",
        answer:
          "Concurrency control is a mechanism used to manage simultaneous execution of transactions in a multi-user database system to ensure data integrity and consistency. Techniques include locking (e.g., two-phase locking), timestamping, and optimistic concurrency control.",
      },
    ],
  },
  {
    id: "cn",
    name: "Computer Networks",
    questions: [
      {
        id: 1,
        question:
          "What is a computer network, and what are its basic components?",
        answer:
          "A computer network is a collection of interconnected computing devices that can exchange data and share resources. Basic components include hosts (computers, servers), network devices (routers, switches, hubs), transmission media (cables, wireless), and network protocols.",
      },
      {
        id: 2,
        question: "Explain the OSI model and its layers.",
        answer:
          "The OSI (Open Systems Interconnection) model is a conceptual framework that standardizes the functions of a telecommunication or computing system into seven abstract layers: Physical, Data Link, Network, Transport, Session, Presentation, and Application. Each layer performs specific functions and communicates with layers above and below it.",
      },
      {
        id: 3,
        question: "What is the difference between TCP and UDP?",
        answer:
          "TCP (Transmission Control Protocol) is a connection-oriented, reliable, ordered, and error-checked protocol (e.g., for web Browse, email). UDP (User Datagram Protocol) is a connectionless, unreliable, faster protocol without error checking (e.g., for streaming video, gaming, DNS queries).",
      },
      {
        id: 4,
        question: "What is an IP address? Differentiate between IPv4 and IPv6.",
        answer:
          "An IP (Internet Protocol) address is a numerical label assigned to each device connected to a computer network that uses the Internet Protocol for communication. IPv4 uses 32-bit addresses (e.g., 192.168.1.1), while IPv6 uses 128-bit addresses, offering a vast increase in available addresses and improved features.",
      },
      {
        id: 5,
        question: "Explain the concept of routing and routing protocols.",
        answer:
          "Routing is the process of selecting a path across one or more networks. Routers use routing protocols (e.g., RIP, OSPF, BGP) to exchange information about network topology and determine the best paths for data packets to reach their destinations.",
      },
      {
        id: 6,
        question: "What is DNS? How does it work?",
        answer:
          "DNS (Domain Name System) is a hierarchical and decentralized naming system for computers, services, or any resource connected to the Internet or a private network. It translates human-readable domain names (e.g., google.com) into numerical IP addresses that computers use to identify each other.",
      },
      {
        id: 7,
        question: "Differentiate between a hub, switch, and router.",
        answer:
          "A hub is a basic network device that connects multiple devices but broadcasts data to all ports (collision domain). A switch is smarter, sending data only to the intended destination using MAC addresses (multiple collision domains). A router connects different networks and forwards data packets between them using IP addresses.",
      },
      {
        id: 8,
        question: "What is a firewall, and what is its purpose?",
        answer:
          "A firewall is a network security system that monitors and controls incoming and outgoing network traffic based on predetermined security rules. Its purpose is to establish a barrier between a trusted internal network and untrusted external networks (like the internet) to prevent unauthorized access and cyber threats.",
      },
      {
        id: 9,
        question: "Explain the three-way handshake in TCP.",
        answer:
          "The three-way handshake is the process used by TCP to establish a connection. 1. SYN (Synchronize Sequence Number): Client sends SYN to server. 2. SYN-ACK (Synchronize-Acknowledgement): Server sends SYN-ACK to client. 3. ACK (Acknowledgement): Client sends ACK to server. After this, data transfer can begin.",
      },
      {
        id: 10,
        question: "What are common network topologies?",
        answer:
          "Common network topologies include Bus (all devices share a single cable), Star (all devices connect to a central hub/switch), Ring (devices connect in a circular fashion), Mesh (every device connects to every other device), and Hybrid (combination of multiple topologies).",
      },
    ],
  },
  {
    id: "oops",
    name: "Object-Oriented Programming (OOPs)",
    questions: [
      {
        id: 1,
        question: "What is Object-Oriented Programming (OOP)?",
        answer:
          "Object-Oriented Programming (OOP) is a programming paradigm based on the concept of 'objects', which can contain data (attributes/properties) and code (methods/behaviors). It aims to model real-world entities into software objects.",
      },
      {
        id: 2,
        question: "Explain the four pillars (principles) of OOP.",
        answer:
          "The four pillars are: 1. Encapsulation: Bundling data and methods that operate on the data within a single unit (object), hiding internal implementation. 2. Abstraction: Showing only essential information and hiding complex details. 3. Inheritance: A mechanism where a new class (subclass) derives properties and behavior from an existing class (superclass). 4. Polymorphism: The ability of an object to take on many forms, allowing a single interface to represent different underlying forms (e.g., method overriding/overloading).",
      },
      {
        id: 3,
        question: "What is a class and an object?",
        answer:
          "A class is a blueprint or a template for creating objects. It defines the properties (attributes) and behaviors (methods) that objects of that class will have. An object is an instance of a class, a concrete entity created based on the class blueprint.",
      },
      {
        id: 4,
        question: "Differentiate between Abstraction and Encapsulation.",
        answer:
          "Abstraction focuses on 'what' the object does, hiding complex implementation details from the user. Encapsulation focuses on 'how' the object achieves its functionality, by bundling data and methods together and restricting direct access to internal data.",
      },
      {
        id: 5,
        question:
          "What is Inheritance? Explain different types of inheritance.",
        answer:
          "Inheritance is an OOP mechanism where one class (child/derived class) acquires the properties and behaviors of another class (parent/base class). Types include Single, Multilevel, Hierarchical, and (in some languages) Multiple inheritance (though often avoided or handled via interfaces due to the 'diamond problem').",
      },
      {
        id: 6,
        question: "Explain Polymorphism with an example.",
        answer:
          "Polymorphism means 'many forms'. It allows objects of different classes to be treated as objects of a common type. Example: Method Overloading (same method name, different parameters) and Method Overriding (subclass provides a specific implementation for a method already defined in its superclass).",
      },
      {
        id: 7,
        question: "What is Method Overloading vs. Method Overriding?",
        answer:
          "Method Overloading: Multiple methods in the same class have the same name but different parameters (number, type, or order). It's compile-time polymorphism. Method Overriding: A subclass provides its own implementation of a method that is already defined in its superclass. It's run-time polymorphism.",
      },
      {
        id: 8,
        question: "What is an interface in OOP?",
        answer:
          "An interface is a blueprint of a class. It can contain method signatures but no implementation. It defines a contract that any class implementing it must adhere to, providing a way to achieve abstraction and multiple inheritance-like behavior in languages that don't support direct multiple inheritance.",
      },
      {
        id: 9,
        question: "What is a constructor? What are its rules?",
        answer:
          "A constructor is a special method in a class that is automatically called when an object of that class is created. Its purpose is to initialize the object's state. Rules typically include: same name as the class, no return type, can be overloaded, and cannot be inherited.",
      },
      {
        id: 10,
        question: "Differentiate between an Abstract Class and an Interface.",
        answer:
          "Abstract Class: Can have both abstract (no implementation) and concrete (with implementation) methods. Can have instance variables. A class can inherit from only one abstract class. Interface: Contains only abstract methods (before Java 8/9). All methods are implicitly public and abstract. Can only have constants (static final variables). A class can implement multiple interfaces.",
      },
    ],
  },
  {
    id: "sysdesign",
    name: "System Design",
    questions: [
      {
        id: 1,
        question: "What is System Design, and why is it important for SDEs?",
        answer:
          "System Design involves designing the architecture of a software system to meet specific requirements. It's crucial for SDEs as it demonstrates the ability to think at a high level, consider scalability, reliability, performance, and maintainability, and make informed architectural decisions.",
      },
      {
        id: 2,
        question:
          "What are the key considerations when designing a scalable system?",
        answer:
          "Key considerations include: Load Balancing, Database Scaling (sharding, replication), Caching (CDN, in-memory), Asynchronous Communication (message queues), Stateless Services, Horizontal Scaling, Microservices architecture, and API Gateways.",
      },
      {
        id: 3,
        question:
          "Explain the difference between vertical and horizontal scaling.",
        answer:
          "Vertical scaling (scaling up) involves increasing the resources of a single server (e.g., more CPU, RAM). Horizontal scaling (scaling out) involves adding more servers to distribute the load. Horizontal scaling is generally preferred for large, distributed systems due to better fault tolerance and cost-effectiveness.",
      },
      {
        id: 4,
        question: "What is a Load Balancer, and what are its types?",
        answer:
          "A Load Balancer distributes incoming network traffic across multiple servers to ensure no single server is overloaded, improving responsiveness and availability. Types include: Layer 4 (TCP/UDP) and Layer 7 (HTTP/HTTPS) load balancers, and can be hardware-based or software-based.",
      },
      {
        id: 5,
        question:
          "How does caching improve system performance? Provide examples.",
        answer:
          "Caching stores frequently accessed data in a faster, temporary storage location (cache) closer to the user or application. This reduces latency and database load. Examples include CDN (Content Delivery Network) for static assets, Redis/Memcached for database query results, and browser caches for web content.",
      },
      {
        id: 6,
        question: "What are microservices, and what are their pros and cons?",
        answer:
          "Microservices are an architectural style where an application is built as a collection of small, independent services, each running in its own process and communicating via lightweight mechanisms. Pros: independent deployment, scalability, technology diversity. Cons: increased complexity, distributed data management, operational overhead.",
      },
      {
        id: 7,
        question: "Explain eventual consistency in distributed systems.",
        answer:
          "Eventual consistency is a consistency model where, if no new updates are made to a given data item, eventually all accesses to that item will return the last updated value. This model prioritizes availability and partition tolerance over strong consistency, commonly found in NoSQL databases.",
      },
      {
        id: 8,
        question: "What is a message queue, and when would you use it?",
        answer:
          "A message queue is a form of asynchronous service-to-service communication used in serverless and microservices architectures. It enables loosely coupled, fault-tolerant systems by allowing components to communicate without direct dependencies. Use cases: task offloading, batch processing, decoupling services, handling bursts of traffic.",
      },
      {
        id: 9,
        question: "How would you design a URL shortening service?",
        answer:
          "Key components: Hash generation (unique, short code for long URL), Storage (NoSQL for high write/read throughput, e.g., Cassandra/Redis), Redirection service (301/302 HTTP redirect), Scalability (load balancers, distributed database). Collision resolution for hash generation is critical.",
      },
      {
        id: 10,
        question:
          "Discuss different types of databases (SQL vs. NoSQL) and when to use each.",
        answer:
          "SQL (Relational) databases (e.g., MySQL, PostgreSQL) are good for structured data, ACID compliance, and complex queries (joins). NoSQL (Non-relational) databases (e.g., MongoDB, Cassandra, Redis) are better for unstructured/semi-structured data, high scalability, flexible schemas, and high throughput (e.g., for big data, real-time web apps). The choice depends on data structure, scalability needs, and consistency requirements.",
      },
    ],
  },
  {
    id: "ood",
    name: "Object-Oriented Design (OOD)",
    questions: [
      {
        id: 1,
        question: "What is Object-Oriented Design (OOD)?",
        answer:
          "Object-Oriented Design (OOD) is the process of planning a system of interacting objects to solve a software problem. It involves identifying classes, their attributes, methods, and relationships to model the system efficiently and robustly, leveraging OOP principles.",
      },
      {
        id: 2,
        question: "Explain the SOLID principles of OOD.",
        answer:
          "SOLID is an acronym for 5 design principles: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion. They help build maintainable, flexible, and scalable software by guiding how classes and modules should be designed.",
      },
      {
        id: 3,
        question: "What are Design Patterns? Give an example.",
        answer:
          "Design Patterns are reusable solutions to common problems in software design. They are not direct code but rather templates for how to solve problems that can be adapted to specific situations. Example: Singleton Pattern (ensures a class has only one instance), Factory Method (creates objects without specifying the exact class), Observer Pattern (defines a one-to-many dependency).",
      },
      {
        id: 4,
        question: "Differentiate between Composition and Inheritance.",
        answer:
          "Inheritance is an 'is-a' relationship (e.g., a Car IS-A Vehicle). Composition is a 'has-a' relationship (e.g., a Car HAS-A Engine). Composition is generally favored over inheritance for flexibility, reusability, and reducing tight coupling, especially for 'has-a' scenarios.",
      },
      {
        id: 5,
        question: "When would you use an Abstract Class versus an Interface?",
        answer:
          "Use an **Abstract Class** when you want to provide a base class with some default implementation, shared state, or a common structure for related classes, and you want to enforce that subclasses extend from it. Use an **Interface** when you want to define a contract for behavior that unrelated classes can implement, promoting loose coupling and supporting 'multiple inheritance' of behavior.",
      },
      {
        id: 6,
        question: "Explain the Single Responsibility Principle (SRP).",
        answer:
          "SRP states that a class should have only one reason to change, meaning it should have only one responsibility or one specific job. Adhering to SRP makes classes more cohesive, easier to understand, test, and maintain, and less prone to side effects from changes.",
      },
      {
        id: 7,
        question: "What is Dependency Injection? Why is it useful?",
        answer:
          "Dependency Injection (DI) is a technique where an object receives its dependencies from an external source rather than creating them itself. It's useful for promoting loose coupling, making code more modular, testable, and easier to manage, especially in complex applications.",
      },
      {
        id: 8,
        question: "Describe the Factory Method design pattern.",
        answer:
          "The Factory Method pattern provides an interface for creating objects in a superclass, but allows subclasses to alter the type of objects that will be created. It's useful when a class can't anticipate the class of objects it needs to create, or when subclasses might need to specify objects to be created.",
      },
      {
        id: 9,
        question: "What is the Observer pattern, and where is it applied?",
        answer:
          "The Observer pattern defines a one-to-many dependency between objects. When one object (the subject) changes state, all its dependents (observers) are notified and updated automatically. It's widely used in event handling systems, GUI programming, and reactive programming frameworks.",
      },
      {
        id: 10,
        question: "How do you achieve loose coupling and high cohesion in OOD?",
        answer:
          "Loose coupling means components are independent and have minimal knowledge of each other, achieved through interfaces, dependency injection, and message queues. High cohesion means elements within a module belong together and work towards a single, well-defined purpose (e.g., through SRP). Both are desirable for maintainable and flexible systems.",
      },
    ],
  },
  {
    id: "testing",
    name: "Testing",
    questions: [
      {
        id: 1,
        question: "What are the different levels of software testing?",
        answer:
          "The main levels are: Unit Testing (individual components/functions), Integration Testing (interactions between integrated units), System Testing (testing the complete system against requirements), and Acceptance Testing (verifying system readiness for delivery, often by users).",
      },
      {
        id: 2,
        question: "Differentiate between Black Box and White Box testing.",
        answer:
          "Black Box testing tests the functionality of an application without knowing its internal structure/code (focus on input/output). White Box testing (or 'clear box') tests the internal structure, design, and implementation of the system (requires knowledge of code).",
      },
      {
        id: 3,
        question: "What is Unit Testing? Why is it important?",
        answer:
          "Unit testing is a level of software testing where individual units or components of a software are tested in isolation. It's important because it helps catch bugs early, makes debugging easier, improves code quality, facilitates refactoring, and acts as documentation for the code.",
      },
      {
        id: 4,
        question: "Explain TDD (Test-Driven Development).",
        answer:
          "TDD is a software development approach where tests are written *before* the code. The cycle is: 1. Write a failing test. 2. Write minimal code to pass the test. 3. Refactor the code. This ensures code is thoroughly tested and often leads to better design.",
      },
      {
        id: 5,
        question: "What are the types of performance testing?",
        answer:
          "Types include: Load Testing (testing system behavior under specific load), Stress Testing (testing beyond normal operational limits to find breaking point), Spike Testing (sudden large increases in load), Soak Testing (long duration to detect memory leaks), and Scalability Testing (measuring ability to scale up/down).",
      },
      {
        id: 6,
        question: "What is Regression Testing?",
        answer:
          "Regression testing is a type of software testing that verifies whether recent program or code changes have adversely affected existing features. It ensures that new code does not introduce new bugs into previously working functionalities.",
      },
      {
        id: 7,
        question: "Describe the concept of 'mocking' in testing.",
        answer:
          "Mocking involves creating simulated objects that mimic the behavior of real objects. It's used in unit testing to isolate the code being tested from its dependencies (e.g., databases, external APIs), making tests faster, more reliable, and reproducible.",
      },
      {
        id: 8,
        question: "What is CI/CD, and how does testing fit into it?",
        answer:
          "CI/CD (Continuous Integration/Continuous Delivery/Deployment) is a set of practices that automate software delivery. Testing is a crucial part: Automated unit, integration, and even some system tests are run automatically in the CI pipeline upon every code commit, ensuring rapid feedback and preventing integration issues.",
      },
      {
        id: 9,
        question: "What is 'Test Coverage' and why is it important?",
        answer:
          "Test coverage is a metric that measures the amount of code executed by tests. It indicates how much of your codebase is being exercised by your test suite. High test coverage (e.g., statement, branch, function coverage) is generally desirable as it reduces the risk of undetected bugs, though 100% coverage doesn't guarantee bug-free software.",
      },
      {
        id: 10,
        question:
          "Differentiate between functional and non-functional testing.",
        answer:
          "Functional testing verifies that the system performs its specified functions correctly (e.g., login works, data saved). Non-functional testing evaluates system attributes not related to specific functions, such as performance, usability, reliability, security, and scalability.",
      },
    ],
  },
  {
    id: "cloud",
    name: "Cloud Computing",
    questions: [
      {
        id: 1,
        question: "What is Cloud Computing? What are its benefits?",
        answer:
          "Cloud computing delivers on-demand computing services—from applications to storage and processing power—typically over the internet with pay-as-you-go pricing. Benefits include cost savings, scalability, flexibility, reliability, global accessibility, and reduced operational overhead.",
      },
      {
        id: 2,
        question:
          "Explain the different service models of Cloud Computing (IaaS, PaaS, SaaS).",
        answer:
          "IaaS (Infrastructure as a Service): Provides virtualized computing resources over the internet (e.g., EC2, Azure VMs). PaaS (Platform as a Service): Provides a platform allowing customers to develop, run, and manage applications without the complexity of building and maintaining infrastructure (e.g., Heroku, AWS Elastic Beanstalk). SaaS (Software as a Service): Provides ready-to-use software applications over the internet (e.g., Salesforce, Gmail).",
      },
      {
        id: 3,
        question: "Differentiate between Public, Private, and Hybrid Cloud.",
        answer:
          "Public Cloud: Services offered by third-party providers over the public internet (e.g., AWS, Azure, GCP). Private Cloud: Dedicated cloud infrastructure used exclusively by a single organization, either on-premise or managed by a third party. Hybrid Cloud: A mix of public and private clouds, allowing data and applications to move between them.",
      },
      {
        id: 4,
        question: "What are Serverless Computing and FaaS?",
        answer:
          "Serverless computing is a cloud execution model where the cloud provider dynamically manages the allocation and provisioning of servers. Developers only write and deploy code (functions) and pay only for the compute time consumed. FaaS (Functions as a Service) is a category of serverless computing that allows developers to run code in response to events without provisioning or managing servers (e.g., AWS Lambda, Azure Functions).",
      },
      {
        id: 5,
        question:
          "Explain the concept of 'Regions' and 'Availability Zones' in AWS (or similar cloud providers).",
        answer:
          "Regions are distinct geographic areas where cloud providers have their data centers, designed for isolation and fault tolerance. Availability Zones (AZs) are isolated locations within a region, each with its own power, cooling, and networking. They are physically separate and connected by low-latency links, providing high availability and fault tolerance within a region.",
      },
      {
        id: 6,
        question: "What is DevOps, and how does Cloud Computing enable it?",
        answer:
          "DevOps is a set of practices that combines software development (Dev) and IT operations (Ops) to shorten the systems development life cycle and provide continuous delivery with high software quality. Cloud computing enables DevOps by providing on-demand, programmable infrastructure, automation tools, and scalable resources, facilitating faster deployment, testing, and scaling.",
      },
      {
        id: 7,
        question:
          "What are containers (e.g., Docker) and why are they used in cloud deployments?",
        answer:
          "Containers (like Docker) package an application and all its dependencies (libraries, frameworks, configuration files) into a single, isolated unit. They are lightweight, portable, and ensure consistency across different environments (development, testing, production), making deployment and scaling much easier and more reliable in cloud environments.",
      },
      {
        id: 8,
        question: "What is Infrastructure as Code (IaC)? Give an example.",
        answer:
          "Infrastructure as Code (IaC) is the management of infrastructure (networks, virtual machines, load balancers, etc.) in a descriptive model, using the same versioning and development practices as for application code. Example: Terraform, AWS CloudFormation, Azure Resource Manager templates. It enables automation, consistency, and reproducibility.",
      },
      {
        id: 9,
        question: "How do you ensure security in cloud environments?",
        answer:
          "Cloud security involves shared responsibility (provider secures infrastructure, user secures data/applications). Measures include: Identity and Access Management (IAM), network security (VPCs, security groups, firewalls), data encryption (at rest and in transit), regular security audits, compliance adherence, and threat detection/response tools.",
      },
      {
        id: 10,
        question: "Discuss the concept of Auto Scaling.",
        answer:
          "Auto Scaling is a cloud computing feature that automatically adjusts the compute capacity of an application or service based on defined conditions (e.g., CPU utilization, network traffic). It helps maintain application availability and performance while optimizing costs by adding or removing resources as needed.",
      },
    ],
  },
  {
    id: "security",
    name: "Security",
    questions: [
      {
        id: 1,
        question: "What is the importance of security in software development?",
        answer:
          "Security in software development ensures that applications are protected against unauthorized access, data breaches, and other cyber threats. It's crucial for protecting sensitive data, maintaining user trust, ensuring compliance with regulations, and avoiding financial and reputational damage.",
      },
      {
        id: 2,
        question: "Explain SQL Injection and how to prevent it.",
        answer:
          "SQL Injection is a code injection technique used to attack data-driven applications, in which malicious SQL statements are inserted into an entry field for execution. Prevention: Use parameterized queries (prepared statements), stored procedures, ORMs (Object-Relational Mappers), and validate/sanitize all user input.",
      },
      {
        id: 3,
        question:
          "What is Cross-Site Scripting (XSS)? How can it be mitigated?",
        answer:
          "XSS attacks inject malicious client-side scripts into web pages viewed by other users. Mitigation: **Input validation** (e.g., escaping HTML characters), **Output encoding** (converting potentially malicious characters into harmless entities), using **Content Security Policy (CSP)** headers, and client-side sanitization libraries.",
      },
      {
        id: 4,
        question:
          "What is CSRF (Cross-Site Request Forgery) and how to prevent it?",
        answer:
          "CSRF is an attack that forces an end user to execute unwanted actions on a web application in which they're currently authenticated. Prevention: **CSRF tokens** (unique, unpredictable token included in forms), **SameSite cookies**, checking the `Referer` header, and user re-authentication for sensitive actions.",
      },
      {
        id: 5,
        question: "Differentiate between Symmetric and Asymmetric Encryption.",
        answer:
          "Symmetric encryption uses a single, shared secret key for both encryption and decryption (faster, used for bulk data). Asymmetric encryption (public-key cryptography) uses a pair of keys: a public key for encryption and a private key for decryption (slower, used for key exchange, digital signatures).",
      },
      {
        id: 6,
        question: "Explain the role of HTTPS in web security.",
        answer:
          "HTTPS (Hypertext Transfer Protocol Secure) is the secure version of HTTP, using SSL/TLS encryption. It encrypts communication between a web browser and a server, protecting data from eavesdropping, tampering, and forgery, ensuring data integrity and confidentiality.",
      },
      {
        id: 7,
        question: "What is authentication vs. authorization?",
        answer:
          "Authentication is the process of verifying who a user is (e.g., username/password). Authorization is the process of determining what a user is allowed to do after they have been authenticated (e.g., access certain resources, perform specific actions).",
      },
      {
        id: 8,
        question: "What are best practices for storing user passwords?",
        answer:
          "Never store passwords in plain text. Always hash them using strong, slow hashing algorithms (e.g., bcrypt, Argon2, scrypt) with a unique salt for each password. Avoid MD5 or SHA-1. Regularly rotate salts and consider multi-factor authentication (MFA).",
      },
      {
        id: 9,
        question: "What is an API Gateway in the context of security?",
        answer:
          "An API Gateway acts as a single entry point for all API calls from clients to backend services. In terms of security, it can enforce authentication, authorization, rate limiting, logging, and act as a firewall, centralizing security concerns and protecting backend services from direct exposure.",
      },
      {
        id: 10,
        question: "Explain the principle of Least Privilege.",
        answer:
          "The Principle of Least Privilege states that users, programs, or processes should be granted only the minimum necessary access rights to perform their job or function. This reduces the attack surface and limits the potential damage from compromised accounts or systems.",
      },
    ],
  },
];

const QuestionsPage = () => {
  const [activeSubjectId, setActiveSubjectId] = useState(null);

  const handleSubjectClick = (subjectId) => {
    setActiveSubjectId(activeSubjectId === subjectId ? null : subjectId);
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-white rounded-xl shadow-lg mt-10">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Interview Preparation
      </h1>

      {/* Subject Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {subjectQuestions.map((subject) => (
          <div
            key={subject.id}
            className={`
              p-6 rounded-lg cursor-pointer flex items-center justify-center text-center
              border border-gray-300 transition-all duration-300 ease-in-out
              ${
                activeSubjectId === subject.id
                  ? "bg-gray-700 text-white shadow-lg scale-105"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200 hover:shadow-md"
              }
            `}
            onClick={() => handleSubjectClick(subject.id)}
          >
            <h2 className="text-xl font-semibold">{subject.name}</h2>
          </div>
        ))}
      </div>

      {/* Questions Display Area */}
      <div className="space-y-4">
        {subjectQuestions.map((subject) => (
          <div key={subject.id}>
            {activeSubjectId === subject.id && (
              <div
                className={`grid transition-all duration-500 ease-in-out ${
                  activeSubjectId === subject.id
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden p-4 bg-white border border-gray-300 rounded-lg shadow-md">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
                    {subject.name} Questions
                  </h2>
                  <div className="space-y-4">
                    {subject.questions.map((q) => (
                      <div
                        key={q.id}
                        className="border border-gray-200 p-4 rounded-md bg-white shadow-sm"
                      >
                        <h3 className="text-lg font-medium text-gray-700 mb-2">
                          Q{q.id}. {q.question}
                        </h3>
                        <p className="text-gray-600 pl-3 border-l-4 border-gray-400">
                          {q.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionsPage;
