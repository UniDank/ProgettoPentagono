package com.pentaproject.demobackend.Controllers.FormatResponse;

import lombok.Getter;
import lombok.NonNull;
import org.springframework.http.HttpStatus;
import org.springframework.lang.Nullable;

/**
 * Classe per formattare il json.
 * Causato dal fatto che spring sfruttando jackson, trasforma oggetto restituito in un json semplice (un oggetto con un array di elementi)
 *
 * @author Marco
 * @version 0.1
 *  */

@Getter
public class ApiResponse<T> {
    /**
     * @param status Descrive HttpCode*/
    private final String status;
    /**
     * @param errorhttp Descrive HttpError*/
    private String errorhttp;
    /**
     * @param errormessage Descrive la stringa di errore, puo essere personalizzata */
    private String errormessage;
    /**
     * @param data Descrive il dato da inviare al json*/
    private T data;

    public ApiResponse(@NonNull HttpStatus status, @NonNull T data, @Nullable String errormessage){
        this.status = Integer.toString(status.value());
        if(status.isError()){
            this.errormessage = errormessage;
            this.errorhttp = status.name();
            return;
        }
        this.data = data;
    }

    public ApiResponse(@NonNull HttpStatus status, @NonNull T data){
        this.status = Integer.toString(status.value());
        if(status.isError()){
            this.errormessage = status.getReasonPhrase();
            this.errorhttp = status.name();
            return;
        }
        this.data = data;
    }


}
