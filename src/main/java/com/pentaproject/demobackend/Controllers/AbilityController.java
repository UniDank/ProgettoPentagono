package com.pentaproject.demobackend.Controllers;
import com.pentaproject.demobackend.Controllers.FormatResponse.ApiResponse;
import com.pentaproject.demobackend.Model.Abilities.Ability;
import com.pentaproject.demobackend.Services.AbilityService;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;



/**
 * Non in uso in questa versione
 * */

@AllArgsConstructor
@Controller
public class AbilityController {
    private AbilityService abilityService;

    public ApiResponse<Ability> getAbility(int id){
        //TODO: Gestione degli errori
        return new ApiResponse<>(HttpStatus.OK,abilityService.getAbility(id));
    }

    public ApiResponse<?> setAbility(Ability ability){
        //TODO: gestione degli errori
        abilityService.insertAbility(ability);
        return new ApiResponse<>(HttpStatus.OK,"");
    }
}
