package com.pentaproject.demobackend.Repositories;

import com.pentaproject.demobackend.Model.Enemies.Enemy;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;



import java.util.List;

public interface EnemyRepository extends MongoRepository<Enemy,Integer> {
    
    /***
     * Metodo per trovare nemici template dal DB
     * @param names array di nomi
     * @return List di Enemy
     * */
    
    @Query("{'name': {'$in': ?0}}")
    List<Enemy> findBy(String[] names);
    Enemy findByName(String Name);
    Enemy deleteByName(String Name);
}
