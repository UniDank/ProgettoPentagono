package com.pentaproject.demobackend.Repositories;

import com.pentaproject.demobackend.Model.Enemies.Enemy;
import com.pentaproject.demobackend.Model.Enemies.EnemyType;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;


import java.util.List;

public interface EnemyRepository extends MongoRepository<Enemy,Integer> {
    List<Enemy> findAllByCategory(EnemyType category);
    @Query("{life : { $gte: ?0, $lte: ?1 }, defence: { $gte: ?2, $lte: ?3}, attack: { $gte: ?4, $lte:?5 } }")
    List<Enemy> findEnemiesByLifeBetweenAndDefenceBetweenAndAttackBetween(Integer lifemin, Integer lifemax, Integer defencemin, Integer defancemax, Integer attackmin, Integer attackmax);

}
