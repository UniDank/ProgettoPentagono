package com.pentaproject.demobackend.Model.Enemies;

import com.pentaproject.demobackend.Model.Abilities.Ability;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


import java.util.ArrayList;
import java.util.List;



//todo: creare una classe astratta entità per favorire la creazione dei nemici tramiti abstract factory method + prototype.

@Setter
@Getter
@Document("enemy")
@AllArgsConstructor
public class Enemy {
    @Id
    private int id;
    private String name;
    private EnemyType category;
    private Integer life;
    private Integer mana;
    private Integer attack;
    private Integer Defence;
    private List<Ability> abilitiesList;

}
