package com.pentaproject.demobackend.Repositories;

import com.pentaproject.demobackend.Model.Enemies.Enemy;
import com.pentaproject.demobackend.Model.Enemies.EnemyType;
import com.pentaproject.demobackend.Model.Party.Party;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface PartyRepository extends MongoRepository<Party, Integer> {

}
