package com.pentaproject.demobackend.Controllers;

import com.pentaproject.demobackend.Controllers.FormatResponse.ApiResponse;
import com.pentaproject.demobackend.Model.Party.Party;
import com.pentaproject.demobackend.Services.PartyService;
import jakarta.servlet.http.Part;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;

/* {
        "Party": {
            "Members": [
            {
                //Hero
            }],
            "Bag": [
            {
               //Item
            }]
     }
 */

@Controller
@AllArgsConstructor
public class PartyController {

    private PartyService partyService;

    public ApiResponse<Party> getParty(int id){
        //TODO: Gestione degli errori
        return new ApiResponse<>(HttpStatus.OK,partyService.getParty(id));
    }

    public ApiResponse<?> setParty(Party party){
        //TODO: gestione degli errori
        partyService.insertParty(party);
        return new ApiResponse<>(HttpStatus.OK,"");
    }

}
