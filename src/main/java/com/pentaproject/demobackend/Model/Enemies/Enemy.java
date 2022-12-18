package com.pentaproject.demobackend.Model.Enemies;

import com.pentaproject.demobackend.Model.Abilities.Ability;

import com.pentaproject.demobackend.Utils.EnemyCloning.EnemyPrototype;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.*;
import org.springframework.boot.autoconfigure.web.WebProperties;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


import java.util.List;
import java.util.Objects;


//todo: creare una classe astratta entità per favorire la creazione dei nemici tramiti abstract factory method + prototype.

@Setter
@Getter
@Document("enemy")
@AllArgsConstructor
@NoArgsConstructor
public class Enemy implements EnemyPrototype {
    private String name;
    private Integer life;
    private Integer mana;
    private Integer attack;
    private Integer defence;
    private List<Ability> abilitiesList;
    private EnemyType category;

    private Enemy(Enemy clone){
        this.name = clone.name;
        this.life = clone.life;
        this.mana = clone.mana;
        this.attack = clone.attack;
        this.defence = clone.defence;
        this.abilitiesList = clone.getAbilitiesList().stream().toList();
        this.category = clone.category;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Enemy enemy = (Enemy) o;
        return Objects.equals(name, enemy.name) && Objects.equals(life, enemy.life) && Objects.equals(mana, enemy.mana) && Objects.equals(attack, enemy.attack) && Objects.equals(defence, enemy.defence) && Objects.equals(abilitiesList, enemy.abilitiesList) && category == enemy.category;
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, life, mana, attack, defence, abilitiesList, category);
    }

    @Override
    public EnemyPrototype clone() {
        return new Enemy(this);
    }
}


