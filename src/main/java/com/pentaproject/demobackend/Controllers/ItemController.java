package com.pentaproject.demobackend.Controllers;

import com.pentaproject.demobackend.Controllers.FormatResponse.ApiResponse;
import com.pentaproject.demobackend.Model.Items.Item;

import com.pentaproject.demobackend.Services.ItemService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;


/**
 * Non in uso in questa versione
 * */

@Controller
public class ItemController {
    private ItemService itemService;

    public ApiResponse<Item> getItem(int id){
        //TODO: Gestione degli errori
        return new ApiResponse<>(HttpStatus.OK,itemService.getItem(id));
    }

    public ApiResponse<Item> setItem(Item item){
        //TODO: gestione degli errori
        itemService.insertAbility(item);
        return new ApiResponse<>(HttpStatus.OK,"");
    }
}
