package com.pentaproject.demobackend.Repositories;

import com.pentaproject.demobackend.Model.Enemies.Enemy;

import org.springframework.data.mongodb.repository.MongoRepository;




public interface EnemyRepository extends MongoRepository<Enemy, Integer> {

}