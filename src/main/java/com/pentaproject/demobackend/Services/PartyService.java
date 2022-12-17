package com.pentaproject.demobackend.Services;

import com.pentaproject.demobackend.Model.Heroes.Hero;
import com.pentaproject.demobackend.Model.Items.Item;
import com.pentaproject.demobackend.Model.Party.Party;
import com.pentaproject.demobackend.Repositories.PartyRepository;
import lombok.AllArgsConstructor;
import lombok.NonNull;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
/**
 * Classe Service per la gestione della logica relativa agli oggetti di tipo party
 * @version 1.0
 * @author Marco
 * */

@Service
@AllArgsConstructor
public class PartyService {
    private PartyRepository rep;
    private static int value;

    /**
     * Metodo per inserire un oggetto party all'interno del db.
     *
     * @param party non deve essere null
     * */
    public void insertParty(@NonNull Party party){
        rep.insert(party);
    }

    /**
     * Metodo per ottenere dal db un oggetto party indicando il suo id.
     * @param id id dell'oggetto in db
     * @throws NoSuchElementException Quando non esiste il valore cercato nel db.
     * */
    public Party getParty(int id) throws NoSuchElementException {
        return rep.findById(id).orElseThrow(NoSuchElementException::new);
    }

    /**
     * Permette di generare un oggetto party
     * @param bag lista di Item
     * @param heroList lista di Hero
     * */
    public Party generateParty(List<Hero> heroList, List<Item> bag) {
        return new Party(value++, heroList, bag);
    }
}


