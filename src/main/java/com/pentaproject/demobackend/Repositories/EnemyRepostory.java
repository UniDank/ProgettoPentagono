package com.pentaproject.demobackend.Repositories;

import com.pentaproject.demobackend.Entity.Enemy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.List;
@Component
public class EnemyRepostory implements EnemyRepository {
    @Autowired
    MongoTemplate mongoTemplate;



    @Override
    public List<Enemy> findAll() {
        return mongoTemplate.findAll(Enemy.class);
    }

    @Override
    public void saveAll(Collection<? extends Enemy> collections) {
        mongoTemplate.insertAll(collections);
    }

    @Override
    public void deleteAll() {
        mongoTemplate.dropCollection(Enemy.class);
    }
}
