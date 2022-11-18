package com.pentaproject.demobackend.Repositories;

import com.pentaproject.demobackend.Model.Enemy;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.List;
@Component
public class EnemyRepository implements IEnemyRepository {
    @Autowired
    private MongoTemplate mongoTemplate;
    private final Logger logger = LoggerFactory.getLogger(EnemyRepository.class);



    @Override
    public List<Enemy> findAll() {
        logger.info("Ricerca di tutti le entità");
        return mongoTemplate.findAll(Enemy.class);
    }

    @Override
    public void saveAll(Collection<? extends Enemy> collections) {
        logger.info("Inserimento di un insieme di entità");
        mongoTemplate.insertAll(collections);
    }

    @Override
    public void deleteAll() {
        logger.info("Eliminazione di una intera collezione di entità");
        mongoTemplate.dropCollection(Enemy.class);
    }
}
