package com.pentaproject.demobackend.Controllers;

import com.pentaproject.demobackend.Controllers.FormatResponse.ApiResponse;
import com.pentaproject.demobackend.Model.Save.Save;
import com.pentaproject.demobackend.Services.SaveService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;

import java.util.NoSuchElementException;


/**
 * Classe controller per gestire le richieste dell'oggetto save
 * @version 1.0
 * @author Marco
 * */
@AllArgsConstructor
@Controller
public class SaveController {
    private SaveService saveService;
    
    public ApiResponse<Save> getSave(){
        Save save;
        try
        {
            save = saveService.getSave();
            return new ApiResponse<>(HttpStatus.OK,save);
        }
        catch (NoSuchElementException ex){
            return new ApiResponse<>(HttpStatus.NOT_FOUND, "Salvataggio non trovato!");    
        }
        
    }
    
    public ApiResponse<?> setSave(Save save){
        if(save == null) return new ApiResponse<>(HttpStatus.BAD_REQUEST,"Body non valido");
        saveService.removeSave();
        saveService.insertSave(save);
        return new ApiResponse<>(HttpStatus.OK,"");
    }
    
}
