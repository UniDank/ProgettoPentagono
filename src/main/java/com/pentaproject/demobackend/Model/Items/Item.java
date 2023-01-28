package com.pentaproject.demobackend.Model.Items;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Objects;

/* JSON EXAMPLE
{
  "Name": "Healing potion",
  "Type": "HP",
  "Value": 10,
  "Quantity": 2
} */
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Document("Item")
public class Item {
    private String name;
    private String type;
    private Integer value;
    private Integer quantity;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Item item = (Item) o;
        return Objects.equals(name, item.name) && Objects.equals(type, item.type) && Objects.equals(value, item.value) && Objects.equals(quantity, item.quantity);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, type, value, quantity);
    }

    @Override
    public String toString() {
        return "Item{" +
                "name='" + name + '\'' +
                ", type='" + type + '\'' +
                ", value=" + value +
                ", quantity=" + quantity +
                '}';
    }
}
