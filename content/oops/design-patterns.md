# Design Patterns

**Design patterns** are reusable solutions to commonly occurring problems in software design. They are not code — they are templates.

## Creational Patterns

### Singleton
Ensures a class has **only one instance** and provides a global access point.

```java
public class DatabaseConnection {
    private static DatabaseConnection instance;

    private DatabaseConnection() {}

    public static DatabaseConnection getInstance() {
        if (instance == null) {
            instance = new DatabaseConnection();
        }
        return instance;
    }
}
```
**Use case:** DB connection, logging, config manager

---

### Factory Method
Defines an interface for creating objects, but lets **subclasses decide** which class to instantiate.

```java
interface Animal { void speak(); }
class Dog implements Animal { public void speak() { System.out.println("Woof"); } }
class Cat implements Animal { public void speak() { System.out.println("Meow"); } }

class AnimalFactory {
    public static Animal create(String type) {
        return switch(type) {
            case "dog" -> new Dog();
            case "cat" -> new Cat();
            default -> throw new IllegalArgumentException();
        };
    }
}
```

---

### Builder
Separates the construction of a complex object from its representation.

```java
Person p = new Person.Builder()
    .name("Abhishek")
    .age(21)
    .city("Pune")
    .build();
```

## Structural Patterns

### Adapter
Converts the interface of one class into an interface clients expect — **"wrapper"**.

### Decorator
Adds responsibilities to objects **dynamically** without subclassing.

```java
// InputStream → BufferedInputStream → DataInputStream
InputStream in = new DataInputStream(new BufferedInputStream(new FileInputStream("file.txt")));
```

### Facade
Provides a **simplified interface** to a complex subsystem.

## Behavioral Patterns

### Observer (Pub-Sub)
Defines a one-to-many dependency — when one object changes state, all its dependents are notified.

```java
// YouTube Channel → Subscribers
// Event listeners in JavaScript
document.addEventListener('click', handler);
```

### Strategy
Defines a family of algorithms, encapsulates each one, and makes them **interchangeable**.

```java
// Sorting strategy: BubbleSort, QuickSort, MergeSort
// Payment strategy: CreditCard, PayPal, UPI
```

### Command
Encapsulates a **request as an object**, enabling undo/redo operations.

## Interview Tips

- Singleton → ask about thread safety (`synchronized`)
- Factory vs Abstract Factory — Factory for one product, Abstract Factory for families
- Decorator vs Inheritance — Decorator is more flexible at runtime
- Observer → used in React state management, event systems
