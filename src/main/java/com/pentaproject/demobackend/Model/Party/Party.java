package com.pentaproject.demobackend.Model.Party;

import com.pentaproject.demobackend.Model.Heroes.Hero;
import com.pentaproject.demobackend.Model.Items.Item;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
/* {
        "Party": {
        "Members": [
        {
            //Hero
        }],
        "Bag": [
        {
           //Item
        }]}
 */


@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Document("Party")
public class Party {
    @Id
    private int id; //cosi da poter sapere fare il fetch del primo elemento
    private List<Hero> Members;
    private List<Item> Bag;

    @Override
    public String toString() {
        return "id=" + id +
                ", Members=" + Members +
                ", Bag=" + Bag
                ;
    }
}
