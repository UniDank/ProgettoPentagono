package com.pentaproject.demobackend.Model.Enemies;

import com.pentaproject.demobackend.Model.ClassType;
import com.pentaproject.demobackend.Utils.EnemyCloning.EnemyPrototype;

import lombok.*;

import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Objects;


@Setter
@Getter
@Document("enemy")
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Enemy  implements EnemyPrototype {
    private String name;
    private Integer health;
    private Integer mana;
    private Integer attack;
    private Integer defense;
    //private List<Ability> abilitiesList;
    private Integer agility;
    private Integer range;
    private Integer expReward;
    private ClassType category;

    private Enemy(Enemy clone){
        this.name = clone.name;
        this.health = clone.health;
        this.mana = clone.mana;
        this.attack = clone.attack;
        this.defense = clone.defense;
        //this.abilitiesList = clone.getAbilitiesList().stream().toList();
        this.category = clone.category;
        this.range = clone.range;
        this.agility = clone.agility;
        this.expReward = clone.expReward;
    }

    @Override
    public EnemyPrototype clone() {
        return new Enemy(this);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Enemy enemy = (Enemy) o;
        return Objects.equals(name, enemy.name) && Objects.equals(health, enemy.health) && Objects.equals(mana, enemy.mana) && Objects.equals(attack, enemy.attack) && Objects.equals(defense, enemy.defense) && Objects.equals(agility, enemy.agility) && Objects.equals(range, enemy.range) && Objects.equals(expReward, enemy.expReward) && category == enemy.category;
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, health, mana, attack, defense, agility, range, expReward, category);
    }
}
