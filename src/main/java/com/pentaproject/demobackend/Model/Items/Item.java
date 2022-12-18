package com.pentaproject.demobackend.Model.Items;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

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
    @Id
    private String id;
    private String name;
    private String type;
    private Integer value;
    private Integer quantity;
}
