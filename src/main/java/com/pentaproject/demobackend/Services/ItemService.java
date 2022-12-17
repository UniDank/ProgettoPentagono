package com.pentaproject.demobackend.Services;

import com.pentaproject.demobackend.Model.Heroes.Hero;
import com.pentaproject.demobackend.Model.Items.Item;
import com.pentaproject.demobackend.Repositories.ItemRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ItemService {
    private ItemRepository rep;
    private static int value;

    public void insertItem(Item item){
        rep.insert(item);
    }

    public Item getItem(int id){
        return rep.findById(id).orElse(null);
    }

    public Item generateItem(
     String name,
     String type,
     Integer value,
     Integer quantity){
        return new Item(Integer.toString(ItemService.value++),name,type,value,quantity);
    }
}
