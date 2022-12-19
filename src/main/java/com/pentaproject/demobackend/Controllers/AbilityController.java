package com.pentaproject.demobackend.Controllers;


import com.pentaproject.demobackend.Controllers.FormatResponse.ApiResponse;
import com.pentaproject.demobackend.Model.Abilities.Ability;
import com.pentaproject.demobackend.Model.Party.Party;
import com.pentaproject.demobackend.Services.AbilityService;
import com.pentaproject.demobackend.Services.PartyService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
