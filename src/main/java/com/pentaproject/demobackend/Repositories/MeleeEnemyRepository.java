package com.pentaproject.demobackend.Repositories;

import com.pentaproject.demobackend.Model.Enemies.MeleeEnemy;
import org.springframework.data.mongodb.repository.MongoRepository;




public interface MeleeEnemyRepository extends MongoRepository<MeleeEnemy, Integer> {

}