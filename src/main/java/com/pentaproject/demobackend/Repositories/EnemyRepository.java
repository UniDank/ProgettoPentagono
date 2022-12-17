package com.pentaproject.demobackend.Repositories;

import com.pentaproject.demobackend.Model.Enemies.Enemy;
import com.pentaproject.demobackend.Model.Enemies.EnemyType;
import org.springframework.data.mongodb.repository.MongoRepository;
<<<<<<< HEAD

import java.util.List;

public interface EnemyRepository extends MongoRepository<Enemy,Integer> {
    List<Enemy> findAllByCategory(EnemyType category);
}
=======
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface EnemyRepository extends MongoRepository<Enemy, Integer> {
   List<Enemy> findAllByCategory(EnemyType category);
}
>>>>>>> cf87675 (Create le relative classi per i servizi e repositori per ogni tipo di modello.)
