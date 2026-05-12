# Inheritance in OOP

**Inheritance** is a mechanism where a new class (**child/derived class**) acquires the properties and behaviors of an existing class (**parent/base class**).

## Types of Inheritance

### Single Inheritance
```java
class Animal {
    void eat() { System.out.println("Eating..."); }
}
class Dog extends Animal {
    void bark() { System.out.println("Barking..."); }
}
```

### Multilevel Inheritance
```java
class Animal → class Dog → class GoldenRetriever
```

### Hierarchical Inheritance
```java
class Animal → class Dog
class Animal → class Cat
class Animal → class Bird
```

### Multiple Inheritance
A class inheriting from more than one parent.  
⚠️ **Java does NOT support multiple class inheritance** (Diamond Problem).  
Java solves this via **interfaces**.

### Hybrid Inheritance
Combination of two or more types of inheritance.

## Key Keywords (Java)

```java
class Parent {
    int x = 10;
    void show() { System.out.println("Parent: " + x); }
}

class Child extends Parent {
    int x = 20; // Hides parent's x

    void show() {
        super.show();             // Call parent method
        System.out.println("Child: " + x);
        System.out.println("Parent x via super: " + super.x);
    }
}
```

## `super` keyword
- `super.method()` — calls the parent class method
- `super(args)` — calls the parent class constructor (must be first line)
- `super.field` — accesses the parent class field

## Method Overriding vs Overloading

| | Overriding | Overloading |
|---|---|---|
| **Definition** | Redefining parent method in child | Same method name, different parameters |
| **Polymorphism** | Runtime | Compile-time |
| **Return type** | Must be same (or covariant) | Can differ |
| **Keyword** | `@Override` | N/A |

```java
// Overriding (runtime polymorphism)
@Override
void sound() { System.out.println("Woof"); }

// Overloading (compile-time polymorphism)
int add(int a, int b) { return a + b; }
double add(double a, double b) { return a + b; }
```

## The Diamond Problem

```
        A
       / \
      B   C
       \ /
        D  ← D inherits from both B and C which both inherit from A
```

Java uses **interfaces** with `default` methods + explicit override to resolve this.

## IS-A vs HAS-A Relationship

- **IS-A** → Inheritance (`Dog IS-A Animal`)
- **HAS-A** → Composition (`Car HAS-A Engine`)

> Prefer **composition over inheritance** in practice — it's more flexible and avoids tight coupling.
