package com.pentaproject.demobackend.Repositories;

import com.pentaproject.demobackend.Model.Abilities.Ability;
import lombok.NonNull;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;


public interface AbilityRepository extends MongoRepository<Ability,Integer> {
    @Override
    @NonNull
    List<Ability> findAll();
    default List<Ability> getDistinctAbilityRandom(){
        //todo:
        //  >Avendo N abilità nel DB randomizzo un numbero da 0 ad N-1 in maniera distinct
        //  >Lo salvo in locale
        //  >Ripeto finché non ho fullato gli slot abilità
        //  >Query $in dell'array con gli ID ottenuti
        //  >Estratto l'obj dal DB e lo inserisco nella lista abilità del PG
        //todo: controllo dei numeri random generati
        return null;
    }
}
