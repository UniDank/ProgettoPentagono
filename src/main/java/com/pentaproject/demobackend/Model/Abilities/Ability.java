package com.pentaproject.demobackend.Model.Abilities;



import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document("abilities")
@AllArgsConstructor
public class Ability {
    @Id
    private int id;
    private String name;
    private Integer manacost;
    private String Description;
}
