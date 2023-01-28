package com.pentaproject.demobackend.Controllers;

import com.pentaproject.demobackend.Controllers.FormatResponse.ApiResponse;
import com.pentaproject.demobackend.Model.Party.Party;
import com.pentaproject.demobackend.Services.PartyService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;

import java.util.NoSuchElementException;

/* {
        "Party": {
            "Members": [
            {
                //Hero
            }],
            "Bag": [
            {
               //Item
            }],
         "currentProgression": 0,
     }
 */

/**
 * Classe controller per gestire le richieste dell'oggetto party
 * @version 1.0
 * @author Marco
 * */

@Controller
@AllArgsConstructor
public class PartyController {

    private PartyService partyService;

    public ApiResponse<Party> getParty(){
        Party alfa;
        try{
            alfa = partyService.getParty();
            return new ApiResponse<>(HttpStatus.OK,alfa);
        }
        catch (NoSuchElementException ex){
            return new ApiResponse<>(HttpStatus.NOT_FOUND,"Non esiste il party");
        }
    }

    public ApiResponse<?> setParty(Party party){
        if(party == null) 
            return new ApiResponse<>(HttpStatus.BAD_REQUEST,"Body invalido");
        partyService.deleteParty();
        partyService.insertParty(party);
        return new ApiResponse<>(HttpStatus.OK,"");
    }

}
