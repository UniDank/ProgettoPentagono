package com.pentaproject.demobackend.Services;

import com.pentaproject.demobackend.Model.Heroes.Hero;
import com.pentaproject.demobackend.Model.Items.Item;
import com.pentaproject.demobackend.Model.Party.Party;
import com.pentaproject.demobackend.Repositories.PartyRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class PartyService {
    private PartyRepository rep;
    private static int value;

    public void insertParty(Party party){
        rep.insert(party);
    }

    public Party getParty(int id){
        return rep.findById(id).orElse(null);
    }

    public Party generateParty(List<Hero> heroList, List<Item> bag){
        return new Party(value++,heroList,bag);
    }


}
