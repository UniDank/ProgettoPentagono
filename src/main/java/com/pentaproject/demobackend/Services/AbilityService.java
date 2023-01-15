package com.pentaproject.demobackend.Services;

import com.pentaproject.demobackend.Model.Abilities.Ability;
import com.pentaproject.demobackend.Repositories.AbilityRepository;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

/**
 * Classe Service per la gestione della logica relativa agli oggetti di tipo ability
 * Non in uso in questa versione
 * @version 1.0
 * @author Marco
 * */

@Service
public class AbilityService {
    private AbilityRepository rep;
    public void insertAbility(Ability ability) {
    }

    public Ability getAbility(int id) throws NoSuchElementException {
        return rep.findById(id).orElseThrow(NoSuchElementException::new);
    }
}
