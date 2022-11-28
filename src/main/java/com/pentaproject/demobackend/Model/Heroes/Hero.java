package com.pentaproject.demobackend.Model.Heroes;


import com.pentaproject.demobackend.Model.Abilities.Ability;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;


@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Document("Hero")
public class Hero {
    @Id
    private String id;
    private String name;
    private Integer life;
    private Integer mana;
    private Integer attack;
    private Integer defence;
    private Integer xp;
    private List<Ability> abilitiesList;
}
