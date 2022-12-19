package com.pentaproject.demobackend.Controllers;

import com.pentaproject.demobackend.Controllers.FormatResponse.ApiResponse;
import com.pentaproject.demobackend.Model.Abilities.Ability;
import com.pentaproject.demobackend.Model.Heroes.Hero;
import com.pentaproject.demobackend.Services.AbilityService;
import com.pentaproject.demobackend.Services.HeroService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;

@Controller
public class HeroController {

    private HeroService heroService;

    public ApiResponse<Hero> getHero(int id){
        //TODO: Gestione degli errori
        return new ApiResponse<>(HttpStatus.OK,heroService.getHero(id));
    }

    public ApiResponse<Hero> setHero(Hero hero){
        //TODO: gestione degli errori
        heroService.insertAbility(hero);
        return new ApiResponse<>(HttpStatus.OK,"");
    }
}
