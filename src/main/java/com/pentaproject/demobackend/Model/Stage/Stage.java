package com.pentaproject.demobackend.Model.Stage;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;


@AllArgsConstructor
@Setter
@Getter
public class Stage {
    private int id;
    private String Attack;
    private String Defence;
    private String Life;
    private Integer Enemies;

}
