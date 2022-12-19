package com.pentaproject.demobackend.Services;

import com.pentaproject.demobackend.Model.Heroes.Hero;
import com.pentaproject.demobackend.Repositories.HeroRepository;
import org.springframework.stereotype.Service;


/**
 * Classe Service per la gestione della logica relativa agli oggetti di tipo hero
 * @version 1.0
 * @author Marco
 * */

@Service
public class HeroService {
    private HeroRepository rep;


    public void insertHero(Hero hero){
        rep.insert(hero);
    }

    public Hero getHero(int id){
        return rep.findById(id).orElse(null);
    }

    public Hero generateHero(String name,Integer attack, Integer defence , Integer life, Integer mana){
        return new Hero(name,attack,defence,life,mana);
    }

    public void insertAbility(Hero hero) {

    }
}
