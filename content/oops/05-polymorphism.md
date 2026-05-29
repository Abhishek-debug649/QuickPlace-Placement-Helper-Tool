# Module 5: Polymorphism

## Definition
"Poly" = many, "morphism" = forms. One interface, many implementations. The ability of different objects to respond to the same method call in different ways.

> **ANALOGY 1:** "Make a sound" — Ask a Dog, Cat, and Duck to "make a sound": Dog says "Woof," Cat says "Meow," Duck says "Quack." Same message ("make a sound"), different responses based on type.
> 
> **ANALOGY 2:** "+" operator in Python:
> - `5 + 3 = 8` (integer addition)
> - `"Hello" + " World" = "Hello World"` (string concatenation)
> Same operator, different behavior based on data type.

---

## Types of Polymorphism

### 1. COMPILE-TIME POLYMORPHISM (Static/Early Binding) = Method Overloading
**DEFINITION:** Same method name, different parameter lists within the SAME class. Resolved at COMPILE TIME.

> **ANALOGY:** A barista who can "make_drink" can handle:
> - `make_drink("espresso")` → makes espresso
> - `make_drink("latte", "oat_milk")` → makes oat latte
> - `make_drink("tea", "green", 2)` → makes 2 cups of green tea
> Same name, different parameters!

**EXAMPLE (Java):**
```java
class Calculator {
    int add(int a, int b) { return a + b; }
    double add(double a, double b) { return a + b; }     // overloaded
    int add(int a, int b, int c) { return a + b + c; }   // overloaded
}
Calculator c = new Calculator();
c.add(3, 4);       // → 7 (calls int version)
c.add(3.0, 4.0);   // → 7.0 (calls double version)
c.add(1, 2, 3);    // → 6 (calls 3-param version)
```
*(NOTE: Python doesn't truly support overloading (last definition wins), but you can achieve it with default parameters or *args.)*

### 2. RUNTIME POLYMORPHISM (Dynamic/Late Binding) = Method Overriding
**DEFINITION:** Child class provides a specific implementation of a method already defined in the parent class. Resolved at RUNTIME.

> **ANALOGY:** A payment system — you call `process_payment()` on any payment method (CreditCard, UPI, NetBanking). Each behaves differently, but you call the same method.

**EXAMPLE:**
```python
class Animal:
    def speak(self):
        return "..."

class Dog(Animal):
    def speak(self):     # OVERRIDE — same signature, new implementation
        return "Woof!"

class Cat(Animal):
    def speak(self):
        return "Meow!"

class Duck(Animal):
    def speak(self):
        return "Quack!"

# RUNTIME POLYMORPHISM in action:
animals = [Dog(), Cat(), Duck(), Animal()]
for animal in animals:
    print(animal.speak())  # Calls the correct version at runtime!
# Output: Woof! Meow! Quack! ...
```

**RULES FOR OVERRIDING:**
- Same method name and parameters as in parent
- Return type must be same or covariant (subtype)
- Access modifier can't be more restrictive than parent's
- Cannot override static or final methods (Java)

---

## Overloading vs Overriding

| Feature | Overloading | Overriding |
| --- | --- | --- |
| **When** | Compile time | Runtime |
| **Class** | Same class | Parent + Child class |
| **Parameters** | Must differ | Must be same |
| **Return Type** | Can differ | Must be same/covariant |
| **Purpose** | Multiple versions of same method | Different behavior for same method name |
