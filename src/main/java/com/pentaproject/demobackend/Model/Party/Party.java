package com.pentaproject.demobackend.Model.Party;

import com.pentaproject.demobackend.Model.Heroes.Hero;
import com.pentaproject.demobackend.Model.Items.Item;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
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
                ", Members=" + Members +
                ", Bag=" + Bag +
                '}';
    }
}
