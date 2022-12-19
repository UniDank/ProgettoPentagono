package com.pentaproject.demobackend.Model.Heroes;


import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;



@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Document("Hero")
public class Hero {
    private String name;
    private Integer attack;
    private Integer defence;
    private Integer life;
    private Integer Mana;
}
