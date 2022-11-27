package com.pentaproject.demobackend.Repositories;

import com.pentaproject.demobackend.Model.Enemy;
import lombok.NonNull;
import org.springframework.data.mongodb.repository.MongoRepository;


import java.util.List;

public interface EnemyRepository extends MongoRepository<Enemy,String> {
    @Override
    @NonNull
    List<Enemy> findAll();
}