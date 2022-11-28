package com.pentaproject.demobackend.Repositories;

import com.pentaproject.demobackend.Model.Abilities.Ability;
import lombok.NonNull;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface AbilityRepository extends MongoRepository<Ability,Integer> {
    @Override
    @NonNull
    List<Ability> findAll();
}
