# Module 3: Abstraction

## Definition
Hiding COMPLEXITY and showing only the ESSENTIAL features of an object. The user knows WHAT something does, but not HOW it does it.

> **ANALOGY 1:** Driving a car — you press the accelerator to go faster. You don't need to know about the fuel injection, combustion, or gear mechanisms. The complexity is abstracted away.
> 
> **ANALOGY 2:** TV Remote — you press "Volume Up." You don't need to understand the infrared signals, decoder chips, or circuits inside.

**Abstraction vs Encapsulation:**
- **Encapsulation:** HIDES data (access control with private/public)
- **Abstraction:** HIDES complexity (shows simplified interface)
- *(They often work together but are conceptually different.)*

---

## How to Achieve Abstraction

### 1. ABSTRACT CLASS
- Cannot be instantiated (cannot create objects of it directly)
- Can have both abstract methods (no body) and concrete methods (with body)
- **Use when:** Classes share some common behavior but each has unique implementations

**EXAMPLE (Abstract Class):**
```python
# abstract class
class Shape:            # cannot instantiate Shape directly
    def area(self):     # abstract method — must be overridden
        raise NotImplementedError

    def describe(self):  # concrete method — shared by all shapes
        print("I am a shape")

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius
    def area(self):
        return 3.14 * self.radius ** 2

class Rectangle(Shape):
    def __init__(self, l, w):
        self.l, self.w = l, w
    def area(self):
        return self.l * self.w

shapes = [Circle(5), Rectangle(4, 6)]
for s in shapes:
    print(s.area())  # each shape knows how to calculate its own area
```

### 2. INTERFACE
- 100% abstraction (all methods are abstract by default — in Java)
- Cannot have instance variables (only constants)
- A class can implement multiple interfaces (solves multiple inheritance)
- **Use when:** Defining a contract/capability

**EXAMPLE (Interface concept):**
```java
// Interface: "can be driven" contract
interface Drivable {
    void accelerate();
    void brake();
    void steer();
}

class Car implements Drivable { /* implementations */ }
class Truck implements Drivable { /* implementations */ }
class Boat implements Drivable { /* implementations */ }  // boats can also be "driven"
```
