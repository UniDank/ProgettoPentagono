package com.pentaproject.demobackend.Repositories;

import com.pentaproject.demobackend.Model.Enemies.Enemy;
import com.pentaproject.demobackend.Model.Enemies.EnemyType;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface EnemyRepository extends MongoRepository<Enemy,Integer> {
    List<Enemy> findAllByCategory(EnemyType category);
}
