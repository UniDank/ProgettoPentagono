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
    private List<Hero> Members;
    private List<Item> Bag;
}
