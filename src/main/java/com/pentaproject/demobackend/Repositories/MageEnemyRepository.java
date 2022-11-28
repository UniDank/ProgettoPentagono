package com.pentaproject.demobackend.Repositories;

import com.pentaproject.demobackend.Model.Enemies.MageEnemy;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MageEnemyRepository extends MongoRepository<MageEnemy,Integer> {
}
