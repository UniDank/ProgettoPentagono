package com.pentaproject.demobackend.Model.Enemies;

import com.pentaproject.demobackend.Model.Abilities.Ability;
import io.github.kaiso.relmongo.annotation.CascadeType;
import io.github.kaiso.relmongo.annotation.FetchType;
import io.github.kaiso.relmongo.annotation.JoinProperty;
import io.github.kaiso.relmongo.annotation.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Collection;
import java.util.List;

@Setter
@Getter
@Document("mageenemy")
@AllArgsConstructor
public class MageEnemy {
    @Id
    private int id;
    private String name;
    private Integer life;
    private Integer Mana;
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    @JoinProperty(name="abilities")
    private List<Ability> abilitiesList;
}
