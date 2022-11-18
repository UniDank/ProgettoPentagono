package com.pentaproject.demobackend.Repositories;

import com.pentaproject.demobackend.Model.Enemy;

import java.util.Collection;
import java.util.List;

public interface IEnemyRepository {
    List<Enemy> findAll();
    void saveAll(Collection<? extends Enemy> collections);
    void deleteAll();
}

