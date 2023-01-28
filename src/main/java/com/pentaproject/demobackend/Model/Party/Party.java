package com.pentaproject.demobackend.Model.Party;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.pentaproject.demobackend.Model.Heroes.Hero;
import com.pentaproject.demobackend.Model.Items.Item;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.Objects;
/* {
        "id_stage": 0,
        "Party": {
            "Members": [
                {
                   //Hero
                }
             ],
            "Bag": [
                {
                   //Item
                }
            ]
     }
 */


@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Document("Party")
public class Party {
    private int id_stage; 
    private List<Hero> Members;
    private List<Item> Bag;

    @Override
    public String toString() {
        return "Party{" +
                "id_stage=" + id_stage +
                ", Members=" + Members.toString() +
                ", Bag=" + Bag.toString() +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Party party = (Party) o;
        return id_stage == party.id_stage && Members.equals(party.Members) && Bag.equals(party.Bag);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id_stage, Members, Bag);
    }
}
