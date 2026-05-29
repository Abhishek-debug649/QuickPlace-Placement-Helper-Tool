# Module 2: Encapsulation

## Definition
Bundling data (attributes) and the methods that operate on that data together into a single unit (class), and **RESTRICTING direct access** to internal details from the outside world.

> **ANALOGY 1:** Medicine capsule — all active ingredients are hidden inside a capsule. You don't need to know what's inside; you just take it.
> 
> **ANALOGY 2:** ATM Machine — you interact through a defined interface (card slot, buttons, screen). You can't directly access the internal cash vault or software. The internals are encapsulated.

---

## Access Modifiers

- `public`: Accessible from anywhere
- `private`: Accessible only within the same class
- `protected`: Accessible within class + subclasses (inheritance)
- `default`: Accessible within the same package (Java-specific)

| Modifier | Same Class | Same Package | Subclass (diff pkg) | Outside Package |
| --- | --- | --- | --- | --- |
| **public** | YES | YES | YES | YES |
| **protected**| YES | YES | YES | NO |
| **default** | YES | YES | NO | NO |
| **private** | YES | NO | NO | NO |

---

## Getters and Setters
Since attributes are private (encapsulated), we expose controlled access through getter (read) and setter (write) methods.

**EXAMPLE:**
```python
class BankAccount:
    def __init__(self):
        self.__balance = 0  # private (double underscore in Python)

    def get_balance(self):         # GETTER
        return self.__balance

    def deposit(self, amount):     # SETTER (with validation)
        if amount > 0:
            self.__balance += amount

    def withdraw(self, amount):    # SETTER (with validation)
        if 0 < amount <= self.__balance:
            self.__balance -= amount
        else:
            print("Insufficient funds!")

account = BankAccount()
account.deposit(1000)
print(account.get_balance())  # 1000
# account.__balance = -99999  # ERROR — private!
```

---

## Benefits of Encapsulation
- **Data protection:** e.g., balance can't go negative — validation is placed in the setter.
- **Flexibility:** Change internal implementation without breaking outside code.
- **Maintainability:** Changes are local to the class.
