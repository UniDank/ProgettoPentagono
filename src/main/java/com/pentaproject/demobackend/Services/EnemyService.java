package com.pentaproject.demobackend.Services;

import com.pentaproject.demobackend.Model.Abilities.Ability;
import com.pentaproject.demobackend.Model.Enemies.Enemy;
import com.pentaproject.demobackend.Model.Enemies.EnemyType;
import com.pentaproject.demobackend.Repositories.EnemyRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;


import java.util.List;
@Service
@AllArgsConstructor
public class EnemyService {
    private EnemyRepository rep;
    private static int value;

    public void insertEnemy(Enemy enemy){
        rep.insert(enemy);
    }

    public Enemy getEnemy(int id){
        return rep.findById(id).orElse(null);
    }

    public Enemy generateEnemy(String name,
    Integer life,
    Integer mana,
    Integer attack,
    Integer defence,
    List<Ability> abilitiesList,
    EnemyType category){
        return new Enemy(EnemyService.value++,name,life,mana,attack,defence,abilitiesList,category);
    }

    public List<Enemy> getEnemies() {
        return rep.findAll();
    }

    public List<Enemy> getEnemiesByType(String type) {
        EnemyType type1 = EnemyType.valueOf(EnemyType.class, type);
        return rep.findAllByCategory(type1);
    }
}
