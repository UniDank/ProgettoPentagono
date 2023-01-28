package com.pentaproject.demobackend.Model.Stage;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


@AllArgsConstructor
@Setter
@Getter
@ToString
public class Stage {
    private int id;
    private String Attack;
    private String Defense;
    private String Health;
    private String ExpGained;
    private String Agility;
    private boolean Boss;
    private int Clone;
    private String Entity;
    private int Enemies;

}
