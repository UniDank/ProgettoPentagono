package com.pentaproject.demobackend.Repositories;

import com.pentaproject.demobackend.Entity.Enemy;

import java.util.Collection;
import java.util.List;

public interface EnemyRepository {
    List<Enemy> findAll();
    void saveAll(Collection<? extends Enemy> collections);
    void deleteAll();
}

