package com.pentaproject.demobackend.Model.Heroes;


import com.pentaproject.demobackend.Model.ClassType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Objects;


@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Document("Hero")
public class Hero {
    private String name;
    private Integer attack;
    private Integer defense;
    private Integer health;
    private Integer mana;
    private Integer agility;
    private Integer aps;
    private Integer range;
    private ClassType category;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Hero hero = (Hero) o;
        return Objects.equals(name, hero.name) && Objects.equals(attack, hero.attack) && Objects.equals(defense, hero.defense) && Objects.equals(health, hero.health) && Objects.equals(mana, hero.mana) && Objects.equals(agility, hero.agility) && Objects.equals(aps, hero.aps) && Objects.equals(range, hero.range) && category == hero.category;
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, attack, defense, health, mana, agility, aps, range, category);
    }

    @Override
    public String toString() {
        return "Hero{" +
                "name='" + name + '\'' +
                ", attack=" + attack +
                ", defense=" + defense +
                ", health=" + health +
                ", mana=" + mana +
                ", agility=" + agility +
                ", aps=" + aps +
                ", range=" + range +
                ", category=" + category +
                '}';
    }
}
