package com.pentaproject.demobackend.Services;

import com.pentaproject.demobackend.Model.Enemies.Enemy;
import com.pentaproject.demobackend.Model.Enemies.EnemyType;
import com.pentaproject.demobackend.Repositories.EnemyRepository;
import lombok.AllArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;


import java.util.List;
@Service
@AllArgsConstructor
public class EnemyService {
    private EnemyRepository rep;
    public List<Enemy> getEnemies(){
        return rep.findAll();
    }

    public List<Enemy> getEnemiesByType(String type) throws IllegalArgumentException, NullPointerException {
        EnemyType enemyType = EnemyType.valueOf(EnemyType.class,type);
        System.out.println(enemyType);
        return rep.findAllByCategory(enemyType);
    }
}
